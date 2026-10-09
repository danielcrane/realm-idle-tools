/* Isolated adaptive planner; the stable model supplies the game rules. */
(function(root){
 'use strict';
 const M=typeof module!=='undefined'?require('../xp-model.js'):XPModel,R=M.rules;
 const defaults={...M.defaults,autoBlessing:false,autoTool:false,autoNode:false,toolPolicy:'owned',infinitePotions:false,infiniteCandies:false};
 const active=s=>s.skill==='Divinity'&&s.autoBlessing||M.kind(s.skill)==='gathering'&&(s.autoTool||s.autoNode);
 function resolve(input,level=Number(input.from)){
  const s={...defaults,...M.migrate(input),from:level};
  if(s.skill==='Divinity'&&s.autoBlessing)s.blessing=M.relevantBlessings(s.skill).filter(b=>b.level<=level).sort((a,b)=>(b.effect.xp_boost||0)-(a.effect.xp_boost||0))[0].name;
  if(M.kind(s.skill)==='gathering'){
   if(s.autoNode)s.action=M.actions.filter(a=>a.skill===s.skill&&a.level<=level).sort((a,b)=>b.level-a.level||b.xp-a.xp)[0].id;
   if(s.autoTool){
    const catalog=M.data.tools[M.skillId(s.skill)],pool=[...(s.toolPool||[]),{name:s.tool,rarity:s.toolRarity}];
    if(s.toolPolicy==='shop')pool.push(...catalog.filter(t=>!t.drop).map(t=>({name:t.name,rarity:'Common'})));
    const choices=pool.filter(t=>catalog.some(c=>c.name===t.name&&c.level<=level)&&M.options.rarities.some(r=>r.name===t.rarity));
    if(!choices.length)throw Error('No recorded tool is usable at this level. Choose a tool or allow Common shop tools.');
    const score=t=>M.stats(M.prepare({...s,tool:t.name,toolRarity:t.rarity,currentXp:0,to:130}),{},0,0).speed;
    choices.sort((a,b)=>score(b)-score(a));s.tool=choices[0].name;s.toolRarity=choices[0].rarity;
   }
  }
  return s;
 }
 function run(input,finite){
  const initial=resolve(input),p0=M.prepare(initial),weather=finite?M.weatherSpan(initial,p0.start,p0.end):M.weatherAt(initial,p0.start);
  const cx=finite?M.candyAverage(initial.xpCandy,p0.xpCount,p0.start,p0.hours):M.tiers[initial.xpCandy].bonus*M.strengthAt(p0.start);
  const cs=M.kind(initial.skill)==='gathering'?(finite?M.candyAverage(initial.speedCandy,p0.speedCount,p0.start,p0.hours):M.tiers[initial.speedCandy].bonus*M.strengthAt(p0.start)):0;
  let total=p0.startXp,count=0,used=0,speedMs=p0.speedMs,xpMs=p0.xpMs,usedMinutes=0,boosted=0;
  const materials={},route=[],span=finite?p0.hours*3600000:Infinity,target=finite?Infinity:p0.startXp+p0.required;
  for(let guard=0;guard<400&&total<target;guard++){
   const level=R.getLevel(total),s=resolve({...initial,currentXp:level===130?0:total-R.getXPFor(level),to:130},level),p=M.prepare(s);
   const speedOn=!finite||speedMs>0,xpOn=!finite||xpMs>0;
   const st=M.stats(p,weather,cx,cs,speedOn,xpOn),tm=M.timing(p.a.time,st.speed,finite?'offline':s.timingMode,p.k);
   let max=Math.floor(Math.max(0,span-used)/tm.interval);
   if(finite&&p.potion.value&&speedOn)max=Math.min(max,Math.floor(speedMs/tm.interval));
   if(finite&&p.xpPotion.value&&xpOn)max=Math.min(max,Math.floor(xpMs/tm.interval));
   if(finite&&s.limitMaterials)for(const [name,qty]of Object.entries(p.a.input))max=Math.min(max,Math.floor((Number(s.inventory[name]??0)-(materials[name]||0))/qty/tm.batch));
   if(max<=0){
    let expired=false;if(finite&&p.potion.value&&speedOn&&speedMs<tm.interval){speedMs=0;expired=true;}if(finite&&p.xpPotion.value&&xpOn&&xpMs<tm.interval){xpMs=0;expired=true;}if(expired)continue;break;
   }
   const gain=batches=>{const n=batches*tm.batch;return n*p.a.xp*st.xpMult+M.petXp(p,n,(finite||s.timingMode==='offline')?st.xpAll:st.xpMult,finite);};
   const boundary=Math.min(target,level<130?R.getXPFor(level+1):Infinity);
   let n=max;
   if(Number.isFinite(boundary)){
    let hi=1;while(hi<max&&gain(hi)<boundary-total)hi=Math.min(max,hi*2);
    let lo=1;while(lo<hi){const mid=Math.floor((lo+hi)/2);if(gain(mid)>=boundary-total)hi=mid;else lo=mid+1;}n=lo;
   }
   if(!Number.isFinite(n))throw Error('The plan could not find a finite target.');
   const actions=n*tm.batch,xp=gain(n),key=[p.a.id,s.tool,s.toolRarity,s.blessing].join('|');
   let row=route.at(-1);if(!row||row.key!==key){row={key,level,action:p.a.name,tool:p.k==='gathering'?s.tool+' ('+s.toolRarity+')':'—',blessing:s.blessing,actions:0,hours:0,xp:0};route.push(row);}
   row.actions+=actions;row.hours+=n*tm.interval/3600000;row.xp+=xp;
   count+=actions;total+=xp;used+=n*tm.interval;
   if(finite&&p.potion.value&&speedOn){speedMs=Math.max(0,speedMs-n*tm.interval);usedMinutes+=n*tm.interval/60000;}
   if(finite&&p.xpPotion.value&&xpOn){xpMs=Math.max(0,xpMs-n*tm.interval);boosted+=actions;}
   for(const [name,qty]of Object.entries(p.a.input))materials[name]=(materials[name]||0)+qty*actions;
  }
  const exhausted=finite&&initial.limitMaterials&&Object.entries(p0.a.input).some(([name,qty])=>Number(initial.inventory[name]??0)-(materials[name]||0)<qty);
  return {count,xp:total-p0.startXp,level:R.getLevel(total),successful:0,usedHours:used/3600000,usedMinutes:finite&&p0.potion.value?Math.min(p0.speedMs,span)/60000:usedMinutes,boosted,avgXp:cx,avgSpeed:cs,weather,materialLimited:exhausted,reason:exhausted?'Input materials exhausted':'Session time used',remainingSpeedMinutes:p0.potion.value?Math.max(0,p0.speedMs-span)/60000:0,remainingXpMinutes:p0.xpPotion.value?Math.max(0,p0.xpMs-span)/60000:0,materials,route};
 }
 function calculate(input){
  if(input.targetPlan)return toTarget(input);
  const s=resolve(input),result=M.calculate(s);result.resolved=s;
  if(!active(s))return result;
  const target=run(s,false),session=run(s,true);
  Object.assign(result,{targetHours:target.usedHours,neededActions:target.count,session,sessionActions:session.count,sessionXp:session.xp,targetRoute:target.route});
  result.materials=result.materials.map(row=>({...row,needed:target.materials[row.name]||0,session:session.materials[row.name]||0}));
  result.warnings.push('Adaptive plan: upgrades occur after a completed action or batch crosses an unlock. Switching is assumed immediate and requires you to change activity in the game. Pet rounding is applied per level segment; this is a planning estimate, not a replay of one unattended offline session.');
  return result;
 }
 function toTarget(input){
  const s=resolve({...input,targetPlan:false,sessionHours:0}),initial=calculate(s);
  const atStart={...s};
  for(const [potion,charges]of [['gatheringPotion','gatheringMinutes'],['productionPotion','productionMinutes'],['xpPotion','xpMinutes']])if(!s.infinitePotions&&Number(s[charges])===0)atStart[potion]='None';
  for(const [candy,count]of [['xpCandy','xpCandyCount'],['speedCandy','speedCandyCount']])if(!s.infiniteCandies&&Number(s[count])===0)atStart[candy]='None';
  const startStats=M.calculate(atStart);for(const field of ['rate','baseRate','xp','expectedXp','seconds','xpFactors','speedFactors','extra','success','candyXp','candySpeed'])initial[field]=startStats[field];
  const evaluate=(hours,limited=false)=>{const state={...s,sessionHours:hours,limitMaterials:limited&&s.limitMaterials};return active(state)?run(state,true):M.calculate(state).session;};
  let low=0,high=Math.min(87600,Math.max(1/3600,initial.targetHours)),session=evaluate(high);
  while(session.xp<initial.required&&high<87600){low=high;high=Math.min(87600,high*2);session=evaluate(high);}
  if(initial.required===0){high=0;session=evaluate(0);}
  else if(session.xp>=initial.required){
   for(let i=0;i<48&&high-low>1/3600000;i++){const mid=(low+high)/2,value=evaluate(mid);if(value.xp>=initial.required){high=mid;session=value;}else low=mid;}
   session=evaluate(high);
  }
  const needed=session,actual=s.limitMaterials?evaluate(high,true):session;
  const reached=actual.xp>=initial.required;
  Object.assign(initial,{targetReached:reached,targetHours:reached?high:null,neededActions:needed.count,session:actual,sessionActions:actual.count,sessionXp:actual.xp,hours:high,avgXp:actual.avgXp,avgSpeed:actual.avgSpeed,targetRoute:needed.route});
  initial.materials=initial.materials.map(row=>({...row,needed:needed.materials?.[row.name]??row.qty*needed.count,session:actual.materials?.[row.name]??row.qty*actual.count}));
  initial.warnings=initial.warnings.filter(w=>!w.startsWith('Adaptive plan:'));
  if(!reached&&!actual.materialLimited)initial.warnings.push('The target is beyond the supported ten-year planning horizon.');
  return initial;
 }
 const api={...M,defaults,calculate,resolve,run,active};if(typeof module!=='undefined')module.exports=api;else root.XPPrototype=api;
})(globalThis);
