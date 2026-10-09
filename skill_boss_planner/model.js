'use strict';
const SkillBossModel=(()=>{
 const S=typeof module!=='undefined'?require('./source-data.js'):SkillBossSource;
 const X=typeof module!=='undefined'?require('../xp/source-data.js'):{data:XP_GAME_DATA,rules:XPSource};
 const G=X.data,R=X.rules,C=S.config,slots=['helm','body','legs','boots','gloves'];
 const none={name:'None',bonus:{},effect:{},level:1,value:0};
 const options={blessings:[none,...G.blessings.filter(x=>x.effect.tool_speed)],potions:[none,...G.potions.filter(x=>x.stat==='gathering_speed')],amulets:[none,...G.gear.filter(x=>x.gathSpeed)]};
 const pets=skill=>[none,...G.pets.filter(x=>x.bonus.tool_speed||x.bonus.blessing_power||(x.skill===skill&&x.bonus.skill_speed))];
 const armor=(skill,slot)=>[none,...G.gear.filter(x=>x.skillOf===skill&&x.slot===slot)];
 const defaults={boss:'skill_boss_treant',level:130,tool:'Copper Axe',toolRarity:'Common',amulet:'None',amuletRarity:'Common',pet:'None',blessing:'None',divinity:130,potion:'None',potionMinutes:4,community:0,candy:'None',candyMinutes:30,weatherMode:'manual',season:'winter',weather:'sunny',mode:'active',attempts:5,used:0,ticks:200,remaining:200,banked:0,awaySeconds:120,reload:false,prior:0,best:0,start:'2026-10-02T12:00',...Object.fromEntries(slots.flatMap(k=>[[k,'None'],[k+'Rarity','Common']]))};
 function num(v,label,min,max,integer=false){const n=Number(v);if(v===''||!Number.isFinite(n)||n<min||n>max||(integer&&!Number.isInteger(n)))throw Error(`${label}: enter ${integer?'a whole number':'a number'} from ${min} to ${max}.`);return n;}
 function pick(list,name){const v=list.find(x=>x.name===name);if(!v)throw Error('Invalid selection: '+name);return v;}
 function prepare(input){
  const s={...defaults,...input,weatherMode:'manual'},boss=S.bosses.find(b=>b.id===s.boss);if(!boss)throw Error('Choose a boss.');
  if(s.tool==='None')throw Error('Select a gathering tool. Your profile has no tool recorded for this skill.');
  const level=num(s.level,'Gathering level',1,130,true),tool=pick(G.tools[boss.skill],s.tool),pet=pick(pets(boss.skill),s.pet),blessing=pick(options.blessings,s.blessing);
  if(level<tool.level)throw Error(`${tool.name} requires ${boss.skill} level ${tool.level}.`);
  if(num(s.divinity,'Divinity level',1,130,true)<blessing.level)throw Error(`${blessing.name} requires Divinity level ${blessing.level}.`);
  const rarity=name=>pick(G.rarities,name).mult,scale=(p,key,sc,r)=>p[key]?(p[key]+(rarity(r)-1)*(p[sc]||0)):0;
  let gear=scale(pick(options.amulets,s.amulet),'gathSpeed','gathScale',s.amuletRarity),pieces=boss.tools.includes(tool.name)?1:0;
  for(const slot of slots){const a=pick(armor(boss.skill,slot),s[slot]);gear+=scale(a,'skillSpeed','skillScale',s[slot+'Rarity']);if(a.bossSet===boss.id)pieces++;}
  const set=pieces>=6?.15:pieces>=3?.05:0;gear+=set;
  const community=num(s.community,'Community completion',0,100);if(![0,25,50,75,100].includes(community))throw Error('Choose a Community Centre tier.');
  const factors={Tool:tool.speed*(1+(rarity(s.toolRarity)-1)*.25),Blessing:1+(blessing.effect.tool_speed||0)*(1+(pet.skill==='divinity'?(pet.bonus.blessing_power||0):0)),Pet:1+(pet.bonus.tool_speed||0)+(pet.skill===boss.skill?(pet.bonus.skill_speed||0):0),'Equipment + set':1+gear,Potion:1+pick(options.potions,s.potion).value,Community:community>=25?1.05:1};
  const start=Date.parse(s.start+'Z');if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(s.start)||!Number.isFinite(start)||new Date(start).toISOString().slice(0,16)!==s.start||start<Date.UTC(2020,0,1)||start>=Date.UTC(2101,0,1))throw Error('Choose a UTC date from 2020 through 2100.');
  if(s.weatherMode!=='manual'||!R.SEASONS[s.season]||!R.WEATHERS[s.weather])throw Error('Choose valid weather.');
  if(s.candy!=='None'&&!G.candies[s.candy])throw Error('Choose a candy tier.');
  const potionMinutes=num(s.potionMinutes,'Potion minutes remaining',0,1e8);
  const candyMinutes=num(s.candyMinutes,'Candy minutes remaining',0,100000);
  if(!['active','away'].includes(s.mode))throw Error('Choose an attempt mode.');
  const used=num(s.used,'Attempts already used',0,5,true),attempts=num(s.attempts,'Planned attempts',0,5,true),ticks=num(s.ticks,'Ticks per attempt',1,200,true),remaining=num(s.remaining,'Ticks remaining',1,200,true),banked=num(s.banked,'Damage already in away attempt',0,4e7,true),awaySeconds=num(s.awaySeconds,'Time away',0,604800),prior=num(s.prior,'Previous weekly damage',0,4e7,true),best=num(s.best,'Previous best attempt',0,4e7,true);
  if(s.mode==='active'&&attempts+used>5)throw Error('Planned attempts plus used attempts cannot exceed five.');
  if(best>prior)throw Error('Previous best attempt cannot exceed previous weekly damage.');
  if(s.mode==='away'&&(banked>prior||used<1))throw Error('Include the reserved away attempt in attempts used, and its banked damage in previous weekly damage.');
  return {s,boss,level,tool,pet,factors,pieces,set,start,candyMinutes,potionMinutes,used,attempts,ticks,remaining,banked,awaySeconds,prior,best};
 }
 function stats(p,t){const weather=(R.SEASONS[p.s.season].bonus.gather_speed||0)+(R.WEATHERS[p.s.weather].bonus.gather_speed||0);const candy=p.s.candy!=='None'&&t<p.start+p.candyMinutes*60000?G.candies[p.s.candy].gather*R.candyStrengthAt(t,'halloween'):0;const factors={...p.factors,Potion:t<p.start+p.potionMinutes*60000?p.factors.Potion:1,Weather:1+weather,Candy:1+candy};const speed=Object.values(factors).reduce((a,b)=>a*b,1);return {factors,speed,tick:Math.max(1,Math.floor(speed*C.dmgPerSpeed))};}
 function reward(boss,damage){const c=S.chest(boss,damage),probs=[0,0,0];probs[c.band]=c.chance;if(c.fallback)probs[c.fallback.band]=(1-c.chance)*c.fallback.chance;return {...c,probs,none:1-probs.reduce((a,b)=>a+b,0)};}
 function rotation(t){const week=Math.floor(t/(7*24*60*60*1000));return {week,start:week*(7*24*60*60*1000),end:(week+1)*(7*24*60*60*1000),boss:S.bossFor(week),next:S.bossFor(week+1)};}
 function calculate(input){
  const p=prepare(input),st=stats(p,p.start),rot=rotation(p.start),runs=[];let t=p.start,added=0,spent=0;
  if(p.s.mode==='active'){
   for(let i=0;i<p.attempts&&t<rot.end;i++){let dmg=0,n=0;for(;n<p.ticks;n++){t+=600;if(t>=rot.end)break;dmg+=stats(p,t).tick;}spent+=n;added+=dmg;runs.push({damage:dmg,ticks:n,complete:true,reward:reward(p.boss,dmg)});}
  }else{const n=Math.min(p.remaining,Math.floor(p.awaySeconds*1000/600)),rate=p.s.reload?Math.min(st.tick,40000):st.tick;spent=n;added=n*rate;runs.push({damage:p.banked+added,ticks:n,complete:n===p.remaining,reward:reward(p.boss,p.banked+added)});}
  const finished=runs.filter(r=>r.complete),best=Math.max(p.best,...finished.map(r=>r.damage)),total=p.prior+added,capped=Math.min(C.weekDmgCap,total),expected=[0,0,0];let noChest=1;
  for(const r of finished){r.reward.probs.forEach((v,i)=>expected[i]+=v);noChest*=r.reward.none;}
  const first=runs[0],damage=first?.damage||0,band=reward(p.boss,damage).band,target=band<2?C.chestBands[band].upTo:null,requiredTick=target?Math.ceil((target-(p.s.mode==='away'?p.banked:0))/(p.s.mode==='away'?p.remaining:p.ticks)):null;
  return {...p,...st,rotation:rot,runs,added,total,capped,capRemaining:Math.max(0,C.weekDmgCap-capped),best,bestChest:reward(p.boss,best),expected,anyChest:1-noChest,spent,first,next:target?{target,missing:Math.max(0,target-damage),tick:Math.max(1,requiredTick),speed:Math.max(1,requiredTick)/C.dmgPerSpeed}:null};
 }
 function calculateAttempt(input){
  const s={...input,weatherMode:'manual',mode:'active',attempts:1,used:0,ticks:200,remaining:200,banked:0,awaySeconds:120,reload:false,prior:0,best:0,potionMinutes:4,candyMinutes:30,start:new Date().toISOString().slice(0,16)};
  const p=prepare(s),st=stats(p,p.start);
  st.factors.Candy=1+(s.candy==='None'?0:G.candies[s.candy].gather*(s.eventActive?1:.5));
  st.speed=Object.values(st.factors).reduce((a,b)=>a*b,1);st.tick=Math.max(1,Math.floor(st.speed*C.dmgPerSpeed));
  const damage=st.tick*C.attemptTicks,roll=reward(p.boss,damage),target=roll.band<2?C.chestBands[roll.band].upTo:null;
  return {...p,...st,rotation:rotation(p.start),first:{damage,ticks:C.attemptTicks,complete:true,reward:roll},next:target?{target,missing:target-damage,tick:Math.ceil(target/C.attemptTicks),speed:Math.ceil(target/C.attemptTicks)/C.dmgPerSpeed}:null};
 }
 return {calculateAttempt,S,G,R,options,slots,pets,armor,defaults,prepare,stats,reward,rotation,calculate};
})();
if(typeof module!=='undefined')module.exports=SkillBossModel;
