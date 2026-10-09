'use strict';
const XPModel = (() => {
  const source=typeof module!=='undefined'?require('./source-data.js'):{data:XP_GAME_DATA,rules:XPSource};
  const G=source.data,R=source.rules;
  const none={name:'None',bonus:{},effect:{},value:0,attacks:0,level:1};
  const options={
    skills:Object.values(G.skills),blessings:[none,...G.blessings],pets:[none,...G.pets],
    rarities:G.rarities,amulets:[none,...G.gear.filter(g=>g.slot==='amulet')],
    gatheringPotions:[none,...G.potions.filter(p=>p.stat==='gathering_speed')],
    productionPotions:[none,...G.potions.filter(p=>p.stat==='production_speed')],
    xpPotions:[none,...G.potions.filter(p=>p.stat==='gathering_xp_boost')],
    seasons:[{name:'None',id:'none'},...Object.entries(R.SEASONS).map(([id,v])=>({id,...v}))],
    weather:[{name:'None',id:'none'},...Object.entries(R.WEATHERS).map(([id,v])=>({id,...v}))],
    community:[0,25,50,75,100].map(n=>({name:n+'%',value:String(n)}))
  };
  const actions=G.actions.map(a=>({...a,seconds:a.time/1000}));
  const tiers={None:{bonus:0,minutes:0},...Object.fromEntries(Object.entries(G.candies).map(([name,t])=>[name,{bonus:t.xp,minutes:t.mins}]))};
  const defaults={
    skill:'Woodcutting',action:'woodcutting|Tree',from:1,to:10,currentXp:0,vip:true,vipPlus:true,
    timingMode:'offline',weatherMode:'manual',season:'none',weather:'none',community:'100',divinityLevel:130,
    blessing:'None',pet:'None',gatheringPotion:'None',productionPotion:'None',xpPotion:'None',
    gatheringMinutes:4,productionMinutes:4,xpMinutes:4,
    tool:'Copper Axe',toolRarity:'Common',amulet:'None',amuletRarity:'Common',ring1:'None',ring2:'None',
    customXp1:0,customXp2:0,customXp3:0,customGather:0,customProd:0,
    xpCandy:'None',speedCandy:'None',xpCandyCount:1,speedCandyCount:1,sessionHours:8,start:'2026-10-01T00:00',
    limitMaterials:false,inventory:{},
    armorHelm:'None',armorBody:'None',armorLegs:'None',armorBoots:'None',armorGloves:'None',
    rarityHelm:'Common',rarityBody:'Common',rarityLegs:'Common',rarityBoots:'Common',rarityGloves:'Common'
  };
  const slots={Helm:'helm',Body:'body',Legs:'legs',Boots:'boots',Gloves:'gloves'};
  const skillId=skill=>Object.keys(G.skills).find(k=>G.skills[k]===skill);
  const kind=skill=>['Woodcutting','Mining','Fishing'].includes(skill)?'gathering':['Cooking','Smithing','Crafting','Alchemy','Arcane Arts'].includes(skill)?'production':skill.toLowerCase();
  function relevantBlessings(skill){const k=kind(skill);return options.blessings.filter(p=>p.name==='None'||p.effect.xp_boost||(k==='gathering'&&p.effect.tool_speed)||(k==='production'&&p.effect.craft_speed)||(k==='thieving'&&p.effect.thieving_success));}
  function relevantPets(skill){const k=kind(skill),id=skillId(skill);return options.pets.filter(p=>p.name==='None'||p.bonus.xp_boost||p.bonus.blessing_power||(k==='gathering'&&p.bonus.tool_speed)||(k==='production'&&p.bonus.production_speed)||(k==='divinity'&&p.bonus.divinity_xp_boost)||(p.skill===id&&Object.keys(p.bonus).some(key=>['skill_speed','wc_double','wc_triple','fish_bonus','mining_coal','thieving_success'].includes(key)||key.endsWith('_extra'))));}
  function armorOptions(skill,slot){return [none,...G.gear.filter(g=>g.slot===slot&&g.skillOf===skillId(skill))];}
  function number(v,label,min=0,max=1e15,integer=false){if(v===''||!Number.isFinite(Number(v))||Number(v)<min||Number(v)>max||(integer&&!Number.isInteger(Number(v))))throw Error(label+' must be '+(integer?'a whole number ':'')+'between '+min+' and '+max+'.');return Number(v);}
  function select(list,name){const o=list.find(o=>o.name===name||o.id===name);if(!o)throw Error('Choose a valid option: '+name);return o;}
  function strengthAt(t){return R.candyStrengthAt(t,'halloween');}
  function strengthOver(start,end){return R.candyStrengthOver(start,end,'halloween');}
  function candyAverage(tier,count,start,hours){if(!tiers[tier])throw Error('Choose a valid candy.');if(!hours||!tiers[tier].bonus)return 0;const duration=Math.min(hours*3600000,tiers[tier].minutes*60000*count);return tiers[tier].bonus*duration/(hours*3600000)*strengthOver(start,start+duration);}
  function weatherAt(s,t){const season=select(options.seasons,s.season),weather=select(options.weather,s.weather);if((weather.id==='snow'&&season.id!=='winter')||(weather.id==='heatwave'&&season.id!=='summer'))throw Error('Snow requires Winter; Heatwave requires Summer.');const out={};for(const b of [season.bonus||{},weather.bonus||{}])for(const [key,v]of Object.entries(b))out[key]=(out[key]||0)+v;return out;}
  function weatherSpan(s,start,end){return weatherAt(s,start);}
  // Matches source calculator ticks and offline production batching. Gathering is unbatched offline.
  function timing(time,speed,mode,category){const raw=Math.max(1,Math.floor(time/speed));const batch=(mode==='online'||category==='production')&&raw<1000?Math.ceil(1000/raw):1;const interval=mode==='online'?Math.ceil(raw*batch/100)*100:raw*batch;return {batch,interval,seconds:interval/batch/1000};}
  function migrate(input={}){
    const s={...input,weatherMode:'manual'};
    for(const prefix of ['gathering','production','xp']){
      const old=prefix+'Charges',key=prefix+'Minutes',p=G.potions.find(p=>p.name===s[prefix+'Potion']);
      if(s[key]===undefined&&s[old]!==undefined)s[key]=p?Math.min(1000,Math.max(0,Number(s[old]))/p.attacks)*p.duration/60000:0;
      delete s[old];
    }
    return s;
  }
  function prepare(input){
    const s={...defaults,...migrate(input)},a=actions.find(a=>a.id===s.action&&a.skill===s.skill);if(!a)throw Error('Choose a timed action for this skill.');
    const from=number(s.from,'Starting level',1,130,true),to=number(s.to,'Target level',from,130,true),current=number(s.currentXp,'Current XP');
    if(from<130&&current>=R.getXPFor(from+1)-R.getXPFor(from))throw Error('Current XP must be less than the XP needed for the next level.');
    if(from===130&&current!==0)throw Error('Use 0 current XP at the level cap.');
    if(from<a.level)throw Error(a.name+' requires '+s.skill+' level '+a.level+'.');
    const k=kind(s.skill),id=a.skillId;
    if(!['offline','online'].includes(s.timingMode)||s.weatherMode!=='manual')throw Error('Choose valid timing and weather modes.');
    const blessing=select(relevantBlessings(s.skill),s.blessing),pet=select(relevantPets(s.skill),s.pet);
    const divinity=s.skill==='Divinity'?from:number(s.divinityLevel,'Divinity level',1,130,true);
    if(divinity<blessing.level)throw Error(blessing.name+' requires Divinity level '+blessing.level+'.');
    const pray=Object.fromEntries(Object.entries(blessing.effect).map(([key,v])=>[key,v*(1+(pet.bonus.blessing_power||0))]));
    const rarity=name=>select(G.rarities,name).mult,scaled=(g,key,scale,r)=>g[key]?(g[key]+(rarity(r)-1)*(g[scale]||0)):0;
    const gear={gather:k==='gathering'?number(s.customGather,'Other gathering gear (%)',0,1000)/100:0,prod:k==='production'?number(s.customProd,'Other production gear (%)',0,1000)/100:0,xp:0};
    const amulet=select(options.amulets,s.amulet);gear.gather+=scaled(amulet,'gathSpeed','gathScale',s.amuletRarity);gear.prod+=scaled(amulet,'prodSpeed','prodScale',s.amuletRarity);
    const ring=G.gear.find(g=>g.name==='Pearl Ring');
    for(const name of [s.ring1,s.ring2])if(name!=='None')gear.xp+=scaled(ring,'skillXp','skillXpScale',name);
    let setCount=0,tool={speed:1},setSpeed=0,perks=pet.skill===id?{...pet.bonus}:{};
    if(k==='gathering'){
      tool=select(G.tools[id],s.tool);if(from<tool.level)throw Error(tool.name+' requires '+s.skill+' level '+tool.level+'.');
      const set=G.sets.find(x=>x.skill===id);
      for(const [field,slot]of Object.entries(slots)){const armor=select(armorOptions(s.skill,slot),s['armor'+field]);if(armor.name!=='None'){if(from<(armor.level||1))throw Error(armor.name+' requires level '+armor.level+'.');gear.gather+=scaled(armor,'skillSpeed','skillScale',s['rarity'+field]);if(armor.bossSet===set.id)setCount++;}}
      if(set.tools.includes(tool.name))setCount++;
      setSpeed=setCount>=6?.15:setCount>=3?.05:0;gear.gather+=setSpeed;
      if(setCount>=6){const b=G.pets.find(p=>p.name===set.pet).bonus;for(const key of ['wc_triple','fish_pearl','mine_gem'])if(b[key])perks[key]=(perks[key]||0)+b[key]/2;}
      tool={...tool,speed:tool.speed*(1+(rarity(s.toolRarity)-1)*.25)};
    }
    const customXp=['customXp1','customXp2','customXp3'].reduce((m,key)=>m*(1+number(s[key],key,0,1000)/100),1);
    const cc=number(s.community,'Community Center',0,100);if(![0,25,50,75,100].includes(cc))throw Error('Choose a Community Center tier.');
    const potion=select(k==='gathering'?options.gatheringPotions:options.productionPotions,k==='gathering'?s.gatheringPotion:k==='production'?s.productionPotion:'None');
    const xpPotion=select(options.xpPotions,k==='gathering'?s.xpPotion:'None');
    const speedMs=s.infinitePotions?Infinity:number(k==='gathering'?s.gatheringMinutes:s.productionMinutes,'Speed potion minutes',0,1e12)*60000,xpMs=s.infinitePotions?Infinity:number(s.xpMinutes,'XP potion minutes',0,1e12)*60000;
    const start=Date.parse(s.start+'Z');if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(s.start)||!Number.isFinite(start)||new Date(start).toISOString().slice(0,16)!==s.start||start<Date.UTC(2020,0,1)||start>=Date.UTC(2101,0,1))throw Error('Choose a valid UTC date from 2020 through 2100.');
    const hours=number(s.sessionHours,'Session hours',0,87600),end=start+hours*3600000;if(end>=Date.UTC(2102,0,1))throw Error('Session end must be before 2102.');
    for(const key of ['xpCandy','speedCandy'])if(!tiers[s[key]])throw Error('Choose a valid candy tier.');
    const xpCount=s.infiniteCandies?Infinity:number(s.xpCandyCount,'XP candy quantity',0,1e9,true),speedCount=s.infiniteCandies?Infinity:number(s.speedCandyCount,'Speed candy quantity',0,1e9,true);
    let available=Infinity;const inputs=Object.entries(a.input);
    if(s.limitMaterials&&inputs.length)available=Math.min(...inputs.map(([name,qty])=>Math.floor(number(s.inventory[name]??0,'Available '+name,0,1e15,true)/qty)));
    return {s,a,k,id,from,to,startXp:R.getXPFor(from)+current,required:Math.max(0,R.getXPFor(to)-R.getXPFor(from)-current),pet,pray,gear,tool,perks,setCount,setSpeed,customXp,cc,potion,xpPotion,speedMs,xpMs,start,end,hours,xpCount,speedCount,available};
  }
  function stats(p,weather,candyXp,candySpeed,speedPotion=true,xpPotion=true){
    const {s,k,pet,pray,gear,cc}=p,b=pet.bonus;
    const xpFactors={'VIP':1+(s.vip?.25:0)+(s.vipPlus?.5:0),'Blessing':1+(pray.xp_boost||0),'Pet':(1+(b.xp_boost||0))*(1+(k==='divinity'?(b.divinity_xp_boost||0):0)),'Equipment':1+gear.xp,'Weather':1+(weather.xp||0),'Divinity weather':1+(k==='divinity'?(weather.divinity_xp||0):0),'Community Center':cc>=75?1.05:1,'Custom XP':p.customXp,'XP candy':1+candyXp};
    const product=o=>Object.values(o).reduce((a,b)=>a*b,1),xpAll=product(xpFactors);
    xpFactors['XP potion']=1+(xpPotion?p.xpPotion.value:0);
    let speedFactors={'Fixed action time':1};
    if(k==='gathering')speedFactors={'Tool':p.tool.speed,'Blessing':1+(pray.tool_speed||0),'Pet':1+(b.tool_speed||0)+(pet.skill===p.id?(b.skill_speed||0):0),'Equipment + set':1+gear.gather,'Weather':1+(weather.gather_speed||0),'Community Center':cc>=25?1.05:1,'Speed potion':1+(speedPotion?p.potion.value:0),'Speed candy':1+candySpeed};
    if(k==='production')speedFactors={'Blessing':1+(pray.craft_speed||0),'Pet':1+(b.production_speed||0),'Equipment':1+gear.prod,'Weather':1+(weather.process_speed||0),'Community Center':cc>=50?1.05:1,'Speed potion':1+(speedPotion?p.potion.value:0),'Speed candy':1+candySpeed};
    return {xpFactors,speedFactors,xpAll,xpMult:product(xpFactors),speed:product(speedFactors),successBonus:(pray.thieving_success||0)+(p.perks.thieving_success||0)+(weather.thieving||0)};
  }
  function petXp(p,count,mult,offline=false){
    const b=p.perks,a=p.a,round=x=>offline?Math.round(x):x;
    if(p.k==='production'){const chance=Object.entries(b).find(([key])=>key.endsWith('_extra'))?.[1]||0;return round(count*chance)*a.xp*mult;}
    // Source precedence is deliberate: a skill-pet branch wins over a different set perk.
    if(p.id==='woodcutting'&&b.wc_double)return round(count*b.wc_double)*a.xp*mult;
    if(p.id==='fishing'&&b.fish_bonus){const list=actions.filter(a=>a.skill==='Fishing'),i=list.findIndex(x=>x.id===a.id),next=list[Math.min(i+1,list.length-1)];return round(count*b.fish_bonus)*next.xp*mult;}
    if(p.id==='mining'&&b.mining_coal){const list=actions.filter(a=>a.skill==='Mining'),coal=list.find(a=>a.output==='Coal');return round(count*b.mining_coal*a.level/list.at(-1).level)*coal.xp*mult;}
    if(p.id==='woodcutting'&&b.wc_triple)return count*b.wc_triple*2*a.xp*mult;
    return 0;
  }
  function success(level,unlock,bonus){return Math.min(bonus>0?1:.95,Math.max(.05,.5+(level-unlock)*.045+bonus));}
  function thieving(startXp,attempts,action,mult,bonus,targetXp=Infinity){
    let xp=startXp,remaining=attempts,count=0,successful=0;
    for(let guard=0;remaining>=1&&xp<targetXp&&guard<260;guard++){
      const level=R.getLevel(xp),prob=success(level,action.level,bonus),gain=action.xp*mult*prob;
      const boundary=Math.min(targetXp,level<130?R.getXPFor(level+1):Infinity);
      const chunk=Math.min(remaining,Number.isFinite(boundary)?Math.max(1,Math.ceil((boundary-xp)/gain)):remaining);
      xp+=chunk*gain;count+=chunk;successful+=chunk*prob;remaining-=chunk;
    }
    return {xp:xp-startXp,count,successful:Math.round(successful)};
  }
  function maintained(p,weather,candyXp,candySpeed){
    const st=stats(p,weather,candyXp,candySpeed),tm=timing(p.a.time,st.speed,p.s.timingMode,p.k);
    const chance=p.k==='thieving'?success(p.from,p.a.level,st.successBonus):1;
    const extraXp=petXp(p,1,p.s.timingMode==='offline'&&p.k==='gathering'?st.xpAll:st.xpMult),perAction=p.a.xp*st.xpMult*chance+extraXp;
    let count=p.k==='thieving'?thieving(p.startXp,Infinity,p.a,st.xpMult,st.successBonus,p.startXp+p.required).count:Math.ceil(p.required/perAction);
    count=Math.ceil(count/tm.batch)*tm.batch;
    return {...st,...tm,xp:p.a.xp*st.xpMult,perAction,extraXp,chance,rate:perAction*3600/tm.seconds,count,hours:count/tm.batch*tm.interval/3600000};
  }
  function finiteSession(p){
    const weather=weatherSpan(p.s,p.start,p.end),avgXp=candyAverage(p.s.xpCandy,p.xpCount,p.start,p.hours),avgSpeed=['gathering','production'].includes(p.k)?candyAverage(p.s.speedCandy,p.speedCount,p.start,p.hours):0;
    const st=stats(p,weather,avgXp,avgSpeed,true,false),slow=stats(p,weather,avgXp,avgSpeed,false,false),fastTiming=timing(p.a.time,st.speed,'offline',p.k),slowTiming=timing(p.a.time,slow.speed,'offline',p.k),span=p.hours*3600000;
    let count=0,used=0,usedMinutes=0,boosted=0,xp=0,successful=0;
    if(p.k==='gathering'){
      const fast=p.potion.value?Math.floor(Math.min(span,p.speedMs)/fastTiming.interval):0;
      used=fast*fastTiming.interval;const fastTime=used;usedMinutes=p.potion.value?Math.min(span,p.speedMs)/60000:0;
      const normal=Math.floor(Math.max(0,span-used)/slowTiming.interval);count=fast+normal;used+=normal*slowTiming.interval;
      const xpSpan=Math.min(span,p.xpMs);boosted=p.xpPotion.value?Math.min(count,xpSpan<=fastTime?Math.floor(xpSpan/fastTiming.interval):fast+Math.floor((xpSpan-fastTime)/slowTiming.interval)):0;
      xp=p.a.xp*st.xpAll*(count+boosted*p.xpPotion.value)+petXp(p,count,st.xpAll,true);
    }else if(p.k==='production'){
      const fast=p.potion.value?Math.min(p.available,Math.floor(Math.min(span,p.speedMs)/fastTiming.interval)*fastTiming.batch):0;
      used=Math.ceil(fast/fastTiming.batch)*fastTiming.interval;
      const normal=Math.min(p.available-fast,Math.floor(Math.max(0,span-used)/slowTiming.interval)*slowTiming.batch);
      count=fast+normal;used+=Math.ceil(normal/slowTiming.batch)*slowTiming.interval;
      xp=p.a.xp*st.xpAll*count+petXp(p,count,st.xpAll,true);
    }else{
      count=Math.min(p.available,Math.floor(span/p.a.time));used=count*p.a.time;
      if(p.k==='thieving'){const result=thieving(p.startXp,count,p.a,st.xpAll,st.successBonus);xp=result.xp;successful=result.successful;}
      else xp=p.a.xp*st.xpAll*count;
    }
    if(p.k==='production'&&p.potion.value)usedMinutes=Math.min(used,p.speedMs)/60000;
    const materialLimited=Number.isFinite(p.available)&&count>=p.available;
    return {count,xp,level:R.getLevel(p.startXp+xp),successful,usedHours:used/3600000,usedMinutes,boosted,avgXp,avgSpeed,weather,materialLimited,
      reason:materialLimited?'Input materials exhausted':'Session time used',remainingSpeedMinutes:p.potion.value?Math.max(0,p.speedMs-(p.k==='gathering'?span:used))/60000:0,remainingXpMinutes:p.xpPotion.value?Math.max(0,p.xpMs-span)/60000:0};
  }
  function calculate(input){
    const p=prepare(input),weather=weatherAt(p.s,p.start),strength=strengthAt(p.start),candyXp=tiers[p.s.xpCandy].bonus*strength,candySpeed=['gathering','production'].includes(p.k)?tiers[p.s.speedCandy].bonus*strength:0;
    const base=maintained(p,weather,0,0),rate=maintained(p,weather,candyXp,candySpeed),session=finiteSession(p),warnings=[];
    if(candyXp&&[p.s.customXp1,p.s.customXp2,p.s.customXp3].some(v=>Number(v)>0))warnings.push('Remove any custom XP bonus that already represents candy to avoid counting it twice.');
    if(p.k!=='gathering')warnings.push('4.1.3.8 background-return bug: another active skill can drain paused gathering potions. This clean offline estimate does not reproduce that unrelated-effect loss.');
    if(p.k==='thieving')warnings.push('XP/hour is the starting-level rate. Target time and session XP update success chance as you level.');
    if(p.k==='gathering'&&p.xpPotion.value)warnings.push('Offline bonus-resource pet XP does not receive the gathering XP potion multiplier. The session follows that source rule.');
    return {action:p.a,required:p.required,baseRate:base.rate,rate:rate.rate,xp:rate.xp,expectedXp:rate.perAction,seconds:rate.seconds,neededActions:rate.count,targetHours:rate.hours,
      xpFactors:rate.xpFactors,speedFactors:rate.speedFactors,extra:rate.extraXp/(p.a.xp*rate.xpMult),success:rate.chance,
      currentStrength:strength,candyXp,candySpeed,avgXp:session.avgXp,avgSpeed:session.avgSpeed,hours:p.hours,sessionActions:session.count,sessionXp:session.xp,session,
      weatherName:select(options.seasons,p.s.season).name+' / '+select(options.weather,p.s.weather).name,
      setCount:p.setCount,setSpeed:p.setSpeed,start:p.start,end:p.end,materials:Object.entries(p.a.input).map(([name,qty])=>({name,qty,needed:qty*rate.count,session:qty*session.count})),warnings};
  }
  const snapshot={...defaults};
  return {data:G,rules:R,options,actions,tiers,defaults,migrate,snapshot,slots,kind,skillId,relevantPets,relevantBlessings,armorOptions,calculate,prepare,stats,petXp,success,thieving,timing,weatherAt,weatherSpan,strengthAt,strengthOver,candyAverage};
})();
if(typeof module!=='undefined')module.exports=XPModel;
