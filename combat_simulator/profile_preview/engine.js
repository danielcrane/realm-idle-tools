(function(root){
'use strict';
const R=typeof module!=='undefined'?require('../source-rules.js'):root.RealmRules;
const slots=['weapon','shield','helm','body','legs','boots','gloves','ring1','ring2','cape','ammo','amulet','pet'];
const skillNames=['attack','strength','defense','ranged','magic','divinity'];
const combatBlessingStats=new Set(['atk','str','def','rng','rngBonus','mag','lifesteal','hp_regen','boss_dmg','dmg_reduction','dmg_increase','luck','xp_boost']);
const combatBlessings=[...R.PRAYERS,...R.TOME_UNLOCKED_PRAYERS].filter(p=>Object.keys(p.effect).some(k=>combatBlessingStats.has(k)));
const boneNames=new Set(R.BONE_TYPES.map(b=>b.name));
const combatPetStats=new Set(['atk','str','def','rng','mag','atk_pct','str_pct','def_pct','rng_pct','mag_pct','lifesteal','hp_per_tick','flat_dmg','walk_speed','luck','xp_boost','gold_boost','bone_double','blessing_power']);
// Group by the complete effect and skill context, never just the display text.
const petGroups=(()=>{
 const groups=new Map();
 for(const pet of [...R.EVENT_PETS,...R.BOSS_PETS,...R.SKILL_PETS,...R.MONSTER_PETS]){
  if(!Object.keys(pet.bonus||{}).some(k=>combatPetStats.has(k)))continue;
  const key=JSON.stringify([pet.skill||null,Object.entries(pet.bonus||{}).sort(([a],[b])=>a.localeCompare(b))]);
  if(!groups.has(key))groups.set(key,[]);
  groups.get(key).push(pet);
 }
 return [...groups.values()].map(pets=>{
  const canonical=pets.find(p=>!p.eventOnly&&!p.iapOnly)||pets[0];
  const aliases=[...new Set(pets.flatMap(p=>[p.name,...(p.recolor?[p.recolor.name]:[])]))].filter(n=>n!==canonical.name);
  return {...canonical,aliases};
 });
})();
const canonicalPets=new Map(petGroups.flatMap(p=>[p.name,...p.aliases].map(n=>[n,p.name])));
const clone=x=>JSON.parse(JSON.stringify(x));
const num=(v,d,min,max)=>Number.isFinite(Number(v))?Math.max(min,Math.min(max,Number(v))):d;
function rng(seed){let x=seed>>>0;return ()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
function defaults(){return {version:1,levels:{attack:30,strength:30,defense:30,ranged:30,magic:30,divinity:130},equip:Object.fromEntries(slots.map(slot=>[slot,null])),rarities:{},prayer:'',zone:'meadow',target:'guard',mode:'active',minutes:60,trials:48,seed:4136,hpPercent:100,autoEat:true,threshold:50,foodWorstFirst:false,foods:[{name:'Cooked Salmon',qty:1000}],ammo:[],infiniteFood:false,infiniteAmmo:false,ammoWorstFirst:false,infinitePotions:false,infiniteCandies:false,potions:[],candy:'',candyMinutes:60,candyStrength:0.5,weather:'none',season:'none',museum:{},museumMode:'manual',collection:{},killLog:{},bosses:[],vip:true,vip2:true,communityTier:4,communityXP:.05,communityDrops:.05,progression:false};}
function normalize(raw={}){
 const c={...defaults(),...clone(raw)};
 c.levels=Object.fromEntries(skillNames.map(s=>[s,Math.floor(num(c.levels?.[s],1,1,130))]));
 c.exactXP=Object.fromEntries(skillNames.map(s=>{const xp=c.exactXP?.[s];return [s,typeof xp==='number'&&Number.isFinite(xp)&&xp>=0&&xp<=Number.MAX_SAFE_INTEGER&&R.getLevel(xp)===c.levels[s]?xp:R.getXPFor(c.levels[s])];}));
 if(!combatBlessings.some(p=>p.id===c.prayer))c.prayer='';
 c.equip=Object.fromEntries(slots.map(s=>[s,c.equip?.[s]||null]));
 c.equip.pet=canonicalPets.get(c.equip.pet)||null;
 for(const s of slots){const n=c.equip[s];if(!n||s==='pet')continue;if(!R.EQUIPMENT[n] || R.EQUIPMENT[n].slot!==(s==='ring2'?'ring1':s))c.equip[s]=null;}
 const w=R.EQUIPMENT[c.equip.weapon]||{},off=R.EQUIPMENT[c.equip.shield]||{};
 if((w.twoHand && !(w.ranged&&off.quiver)) || (off.quiver&&!w.ranged))c.equip.shield=null;
 const a=R.EQUIPMENT[c.equip.ammo]||{};
 if(c.equip.ammo && (w.magic?!a.magicMult:w.ranged?!a.rngBonus:!a.sigil))c.equip.ammo=null;
 c.rarities=Object.fromEntries(slots.map(s=>[s,R.EQUIPMENT[c.equip[s]]?.infinite&&c.equip[s]!=='Wraith Rune'?1:Math.floor(num(c.rarities?.[s],1,1,21))]));
 if(!R.ZONES[c.zone])c.zone='meadow';
 if(!R.MONSTERS[c.zone].some(m=>m.id===c.target))c.target=R.MONSTERS[c.zone][0].id;
 if(!['active','background','offline'].includes(c.mode))c.mode='active';
 c.minutes=num(c.minutes,60,1,1440);c.trials=Math.floor(num(c.trials,48,8,256));c.seed=Math.floor(num(c.seed,4136,0,4294967295));
 c.hpPercent=num(c.hpPercent,100,1,100);c.threshold=num(c.threshold,50,1,100);
 c.foods=(Array.isArray(c.foods)?c.foods:[]).filter(x=>R.FOOD_HEALS[x.name]).map(x=>({name:x.name,qty:Math.floor(num(x.qty,0,0,1e9))}));
 c.ammo=(Array.isArray(c.ammo)?c.ammo:[]).filter(x=>R.EQUIPMENT[x.name]?.slot==='ammo'&&!R.EQUIPMENT[x.name]?.infinite&&!R.EQUIPMENT[x.name]?.sigil).map(x=>({name:x.name,tier:Math.floor(num(x.tier,1,1,21)),qty:Math.floor(num(x.qty,0,0,1e9))}));
 const seen=new Set();c.potions=(Array.isArray(c.potions)?c.potions:[]).filter(x=>{const p=R.POTIONS[x.name];if(!p||/gathering|production/.test(p.stat)||seen.has(p.stat))return false;seen.add(p.stat);return true;}).map(x=>({name:x.name,minutes:num(x.minutes ?? (x.charges===undefined?R.POTIONS[x.name].duration/60000:Math.min(1000,Math.max(0,Number(x.charges))/R.POTIONS[x.name].attacks)*R.POTIONS[x.name].duration/60000),R.POTIONS[x.name].duration/60000,0,1e8)}));
 // Migrate older single-candy profiles and retain at most one tier per effect.
 const candyRows=Array.isArray(c.candies)?c.candies:[{name:c.candy,minutes:c.candyMinutes,strength:c.candyStrength}];
 const byKind=new Map();
 for(const row of candyRows){const def=R.CANDY_DEFS[row?.name];if(!def||!['dmg','xp'].includes(def.kind))continue;const previous=byKind.get(def.kind);if(previous&&R.CANDY_DEFS[previous.name].value>def.value)continue;byKind.set(def.kind,{name:row.name,minutes:num(row.minutes,def.duration/60000,0,1440),strength:num(row.strength,.5,0,1)});}
 c.candies=[...byKind.values()];delete c.candy;delete c.candyMinutes;delete c.candyStrength;
 const style=w.magic?'magic':w.ranged?'ranged':'melee';
 // A legacy single museum entry belongs to its equipped weapon's style.
 const museumRows=c.museumByStyle||{[style]:c.museum};
 c.museumByStyle=Object.fromEntries(Object.keys(R.MUSEUM_BASE).map(s=>[s,Object.fromEntries(Object.keys(R.MUSEUM_BASE[s]).map(k=>[k,num(museumRows[s]?.[k],0,0,k==='def'?R.MUSEUM_DEF_CAP[s]:k==='dr'?R.MUSEUM_DR_CAP[s]:R.MUSEUM_CAP[k]??1e6)]))]));
 c.museumStyle=Object.hasOwn(R.MUSEUM_BASE,c.museumStyle)?c.museumStyle:style;
 c.museum=clone(c.museumByStyle[style]);
 c.collection=Object.fromEntries(Object.entries(c.collection||{}).filter(([n])=>R.EQUIPMENT[n]).map(([n,t])=>[n,Math.floor(num(t,1,0,21))]));
 const names=new Set(Object.values(R.MONSTERS).flat().map(m=>m.name));
 c.killLog=Object.fromEntries(Object.entries(c.killLog||{}).filter(([n])=>names.has(n)).map(([n,k])=>[n,Math.floor(num(k,0,0,1e12))]));
 c.bosses=(Array.isArray(c.bosses)?c.bosses:[]).filter(id=>Object.values(R.MONSTERS).flat().some(m=>m.boss&&m.id===id));
 // Older setups stored the effective percentages instead of a community tier.
 const legacyCommunity=raw.communityXP!==undefined||raw.communityDrops!==undefined;
 c.communityTier=Math.floor(num(raw.communityTier??(legacyCommunity?(Number(raw.communityDrops)>0?4:Number(raw.communityXP)>0?3:0):c.communityTier),0,0,R.CC_TIERS.length));
 const community=Object.fromEntries(R.CC_TIERS.slice(0,c.communityTier).map(t=>[t.key,.05]));
 c.communityXP=community.xp||0;c.communityDrops=community.drops||0;
 if(c.museumMode==='collection'){
  // Convert old collection setups once, retaining their bonuses for every style.
  // The nested context is explicitly manual, so normalization cannot re-enter this branch.
  const legacy=makeContext({...c,museumMode:'manual'}).r;
  c.museumByStyle=Object.fromEntries(Object.keys(R.MUSEUM_BASE).map(s=>{const bonuses=legacy.collectionMuseumBonus(s);return [s,Object.fromEntries(Object.keys(R.MUSEUM_BASE[s]).map(k=>[k,bonuses[k]||0]))];}));
  c.museum=clone(c.museumByStyle[style]);
 }
 c.museumMode='manual';
 return c;
}
function makeContext(raw,seed){
 const c=normalize(raw),m=R.MONSTERS[c.zone].find(m=>m.id===c.target),maxHp=R.getMaxHpFor(c.levels.defense);
 const g={equip:clone(c.equip),equippedRarity:clone(c.rarities),skills:clone(c.exactXP),maxHp,hp:Math.max(1,Math.floor(maxHp*c.hpPercent/100)),activePrayer:c.prayer,activeEffects:c.potions.map(x=>({...R.POTIONS[x.name],name:x.name,msLeft:c.infinitePotions?1e15:x.minutes*60000})).filter(e=>e.msLeft>0),bossesKilled:[...c.bosses],killLog:clone(c.killLog),bestRarities:clone(c.collection),inv:{},itemRarities:{},unlockedRunes:[],autoFight:true,autoEat:c.autoEat,autoEatThreshold:c.threshold,foodWorstFirst:c.foodWorstFirst,ammoWorstFirst:c.ammoWorstFirst,combatEffects:false,zone:c.zone,sessionLoot:{startTime:0,foodEaten:0},keptFoods:[],keptAmmo:[]};
 // Divinity is reference-only in the setup; selected blessings always apply.
 g.skills.divinity=R.getXPFor(130);
 // calculateOfflineProgress explicitly refills HP before simulating.
 if(c.mode==='offline')g.hp=g.maxHp;
 for(const f of c.foods)g.inv[f.name]=(g.inv[f.name]||0)+f.qty;
 for(const a of c.ammo){g.itemRarities[a.name]??={};g.itemRarities[a.name][a.tier]=(g.itemRarities[a.name][a.tier]||0)+a.qty;}
 if(R.EQUIPMENT[c.equip.ammo]?.infinite)g.unlockedRunes=[c.equip.ammo];
 const weather={};for(const b of [R.WEATHERS[c.weather]?.bonus,R.SEASONS[c.season]?.bonus])for(const [k,v] of Object.entries(b||{}))weather[k]=(weather[k]||0)+v;
 const env={now:1,weather,vip:c.vip,vip2:c.vip2,candy:0,random:rng(seed??c.seed)};
 env.museum=clone(c.museum);
 const r=R.create(g,env);
 return {c,m,g,env,r};
}
function candyAt(c,kind,time){const row=c.candies.find(x=>R.CANDY_DEFS[x.name].kind===kind);return row&&(c.infiniteCandies||time<row.minutes*60000)?R.CANDY_DEFS[row.name].value*row.strength:0;}
// Expected attacks from independent damage rolls, including overkill and zero rolls.
// Group equal-weight adjacent damage values so uniform ranges use prefix sums.
function expectedAttacks(hp, rolls){
 if(hp<=0)return 0;
 if(!rolls.some(d=>d>0))return Infinity;
 if(rolls.every(d=>d>=hp))return 1;
 const counts=new Map();for(const d of rolls){const v=Math.min(hp,Math.max(0,d));counts.set(v,(counts.get(v)||0)+1);}
 const groups=[];for(const [damage,count] of [...counts].sort((a,b)=>a[0]-b[0])){if(!damage)continue;const last=groups.at(-1);if(last&&last.end+1===damage&&last.count===count)last.end=damage;else groups.push({start:damage,end:damage,count});}
 // Large sparse ranges are quantized to keep editing responsive (about 1% of mean damage or less).
 if(hp*groups.length>20000000){const mean=rolls.reduce((a,b)=>a+b,0)/rolls.length,q=Math.min(Math.ceil(hp/4096),Math.floor(mean/100));if(q>1)return expectedAttacks(Math.ceil(hp/q),rolls.map(d=>Math.round(d/q)));}
 const prefix=new Float64Array(hp+1),positive=rolls.length-(counts.get(0)||0);let expected=0;
 for(let h=1;h<=hp;h++){let sum=0;for(const g of groups){if(g.start>=h)break;const hi=h-g.start,lo=Math.max(0,h-g.end);sum+=g.count*(prefix[hi]-(lo?prefix[lo-1]:0));}expected=(rolls.length+sum)/positive;prefix[h]=prefix[h-1]+expected;}
 return expected;
}
function snapshot(raw){
 const ctx=makeContext(raw),{c,m,g,env,r}=ctx;
 env.candy=candyAt(c,'dmg',0);
 const stats=r.getPlayerStats(),pb=r.getPrayerBonuses(),cap=Math.max(1,r.getMaxHit(stats)-Math.floor(m.def*.3)),min=r.getMinHit(cap);
 const transform=d=>{if(m.boss&&pb.boss_dmg)d=Math.floor(d*(1+pb.boss_dmg));d=Math.floor(d*r.getBestiaryDmgMult(m.name));return Math.floor(d*(1+ (env.weather[r.getCombatStyle()+'_dmg']||0))*(1+env.candy))+r.getPetFlatDmg();};
 const damageRolls=[];let total=0;for(let n=min;n<=cap;n++){const damage=transform(n);damageRolls.push(damage);total+=damage;}
 const avg=total/(cap-min+1),walk=r.getZoneWalkMult(c.zone);
 const drSources={blessing:pb.dmg_reduction||0,potion:g.activeEffects.find(e=>e.stat==='damage_reduction'&&e.msLeft>0)?.value||0,museum:stats.museumDR||0,blessingPenalty:-(pb.dmg_increase||0),gearPenalty:-(stats.drPenalty||0)};
 const netDR=Object.values(drSources).reduce((sum,value)=>sum+value,0);
 const armorReduction=(stats.def*.25)/(stats.def*.25+100+m.str*.2),bestiaryDef=r.getBestiaryDefMult(m.name);
 const penetration=m.atk/(m.atk+stats.def*.43),rollMin=Math.floor(m.str*.42),rollMax=Math.floor(m.str*.58);
 // Same order and integer rounding as fightTick, conditional on penetration.
 const incomingRoll=roll=>{let damage=Math.max(Math.max(1,Math.floor(m.str*.04)),Math.floor(roll*(1-armorReduction)));if(netDR!==0)damage=Math.max(0,Math.floor(damage*(1-netDR)));if(bestiaryDef>1)damage=Math.max(0,Math.floor(damage/bestiaryDef));return damage;};
 let incomingTotal=0;for(let roll=rollMin;roll<=rollMax;roll++)incomingTotal+=incomingRoll(roll);
 const hitAverage=incomingTotal/(rollMax-rollMin+1);
 const defense={netDR,drSources,armorReduction,bestiaryReduction:1-1/bestiaryDef,blockChance:1-penetration,incoming:{min:incomingRoll(rollMin),max:incomingRoll(rollMax),hitAverage,attackAverage:hitAverage*penetration},regen:Math.floor(pb.hp_regen||0)+(r.getPetDef(g.equip.pet)?.bonus.hp_per_tick||0)};
 const warnings=[];
 if((r.isUsingRanged()||r.isUsingMagic())&&!g.equip.ammo)warnings.push('Equip compatible arrows, a spell, or a rune before simulating.');
 if(c.zone==='haunted')warnings.push('Haunted Hollow is a hypothetical open-portal encounter here; seasonal access and portal expiry are not simulated.');
 if(c.progression&&c.mode!=='active')warnings.push('Away modes hold combat levels and bestiary bonuses at their starting values, matching their cached combat context.');
 if(c.mode!=='active'&&c.candies.length)warnings.push('Away combat uses each candy’s session-weighted bonus throughout, matching the game’s span handling.');
 if(c.mode==='offline'&&c.hpPercent!==100)warnings.push('Cold offline starts at full HP, as the game’s offline calculation does. The starting HP setting applies to active and background play.');
 if(c.infiniteFood||c.infiniteAmmo||c.infinitePotions||c.infiniteCandies)warnings.push('Unlimited supplies enabled: this is a sustained-farming scenario.');
 const attacks=expectedAttacks(m.hp,damageRolls),estimatedKph=(r.isUsingRanged()||r.isUsingMagic())&&!g.equip.ammo?0:3600/(attacks*.6+.8+1.5*walk);
 return {estimatedKph,expectedAttacks:attacks,stats,hp:g.maxHp,pb,defense,range:{min:transform(min),max:transform(cap)},average:avg,dps:avg/.6,walk,walkSeconds:1.5*walk,delay:.8+1.5*walk,walkParts:{lodge:r.getZoneWalkReduction(c.zone),boss:r.getZoneBossWalkReduction(c.zone),pet:r.getPetWalkSpeed()},incomingMax:r._maxIncomingHit(m,stats,pb),enemyHitChance:penetration,bestiary:r.getBestiaryBonus(m.name),style:r.getCombatStyle(),warnings,museum:r.getMuseumBonus(),vampire:r.vampireSetBonus()};
}
function simulate(raw,seed){
 const {c,m,g,env,r}=makeContext(raw,seed),random=env.random,roll=(a,b)=>Math.floor(random()*(b-a+1))+a;
 const duration=c.minutes*60000,out={kills:0,food:0,ammo:0,damage:0,taken:0,gold:0,xp:0,defenseXP:0,attacks:0,walkMs:0,deathMs:0,stop:'complete',stopAt:duration,endingHp:g.hp,loot:{},trace:[]};
 let time=0,monHp=m.hp,carry=0,cached=null;
 const pb=r.getPrayerBonuses(),bestD=r.getBestiaryDmgMult(m.name),bestDef=r.getBestiaryDefMult(m.name),walk=.8*1000+1500*r.getZoneWalkMult(c.zone);
 const spanCandy=Object.fromEntries(c.candies.map(row=>[R.CANDY_DEFS[row.name].kind,R.CANDY_DEFS[row.name].value*row.strength*(c.infiniteCandies?1:Math.min(1,row.minutes/c.minutes))]));
 const replenish=()=>{if(c.infinitePotions)for(const effect of g.activeEffects)effect.msLeft=1e15;if(c.infiniteFood)for(const f of c.foods)g.inv[f.name]=1e9;if(c.infiniteAmmo){const name=g.equip.ammo,tier=g.equippedRarity.ammo||1;if(name&&!R.EQUIPMENT[name]?.infinite&&!R.EQUIPMENT[name]?.sigil){g.itemRarities[name]??={};g.itemRarities[name][tier]=1e9;}}};
 const countFood=()=>Object.entries(g.inv).reduce((s,[n,q])=>s+(R.FOOD_HEALS[n]?q:0),0);
 const countAmmo=()=>Object.entries(g.itemRarities).reduce((s,[n,ts])=>s+(R.EQUIPMENT[n]?.slot==='ammo'?Object.values(ts).reduce((a,b)=>a+b,0):0),0);
 const refresh=()=>{const stats=r.getPlayerStats(),cap=Math.max(1,r.getMaxHit(stats)-Math.floor(m.def*.3));return {stats,cap,min:r.getMinHit(cap),penetration:m.atk/(m.atk+stats.def*.43),eff:(stats.def*.25)/(stats.def*.25+100+m.str*.2),dr:(pb.dmg_reduction||0)+(g.activeEffects.find(e=>e.stat==='damage_reduction')?.value||0)+(stats.museumDR||0)-(pb.dmg_increase||0)-(stats.drPenalty||0)};};
 const drain=(ms)=>{if(!c.infinitePotions&&r._potionUse('combat',ms,true))cached=refresh();};
 let potionClock=0,pendingWalk=0;
 const activeClock=t=>{const clock=Math.floor(t/1000)*1000;drain(clock-potionClock);potionClock=clock;};
 const xpMult=()=>{const p=r.getPrayerBonuses(),pet=r.getPetDef(g.equip.pet)?.bonus||{};let v=c.vip&&c.vip2?1.75:c.vip2?1.5:c.vip?1.25:1;v*=1+(p.xp_boost||0);v*=1+(pet.xp_boost||0);v*=1+(g.activeEffects.find(e=>e.stat==='combat_xp_boost')?.value||0);v*=1+(env.weather.xp||0);v*=1+c.communityXP;v*=1+(c.mode==='active'?candyAt(c,'xp',time):(spanCandy.xp||0));return v;};
 function award(){
  out.kills++;
  if(c.mode==='active'&&c.progression)g.killLog[m.name]=(g.killLog[m.name]||0)+1;
  const luck=r.getLuckMultiplier(),goldBoost=(g.activeEffects.find(e=>e.stat==='gold_boost')?.value||0)+r.getPetGoldBoost()+(env.weather.gold||0);
  out.gold+=Math.floor((c.mode==='offline'?(m.gold[0]+m.gold[1])/2:roll(...m.gold))*luck*(1+goldBoost));
  const xp=m.xp*xpMult();out.xp+=xp;out.defenseXP+=xp*.7;
  for(const d of m.drops){const chance=Math.min(1,d.c*luck*r.getBestiaryDropMult(m.name)*(1+c.communityDrops));const qty=c.mode==='offline'?Math.floor((d.q[0]+d.q[1])/2):(d.q[0]+d.q[1])/2;const bone=boneNames.has(d.item)?1+r.getPetBoneDouble():1;out.loot[d.item]=(out.loot[d.item]||0)+chance*qty*bone*(1+(env.weather.double_drop||0));}
  if(c.mode==='active'&&c.progression){
   const before=g.maxHp,skills=r.isUsingMagic()?['magic']:r.isUsingRanged()?['ranged']:['attack','strength'];for(const s of skills)g.skills[s]+=xp;g.skills.defense+=xp*.7;g.maxHp=R.getMaxHpFor(R.getLevel(g.skills.defense));g.hp=Math.min(g.maxHp,g.hp+g.maxHp-before);
   if(m.boss&&!g.bossesKilled.includes(m.id))g.bossesKilled.push(m.id);
  }
 }
 env.onKill=award;
 env.onDamage=(n,kind)=>{if(kind==='dealt')out.damage+=n;if(kind==='taken')out.taken+=n;};
 r.beginFight(m);
 env.candy=c.mode==='active'?candyAt(c,'dmg',0):(spanCandy.dmg||0);
 cached=refresh();
 let next=c.mode==='active'?650:600;
 const limit=c.mode==='background'?Math.floor(duration/600)*600:duration;
 while(c.mode==='offline'?time<limit:next<=limit){
  time=next;env.now=time+1;
  if(c.mode==='active')activeClock(time);
  if(c.mode==='active')env.candy=candyAt(c,'dmg',time);
  replenish();const foodBefore=countFood(),ammoBefore=countAmmo(),ammoName=g.equip.ammo;
  out.attacks++;
  if(c.mode==='active'){
   const step=r.activeStep();out.food+=foodBefore-countFood();out.ammo+=Math.max(0,ammoBefore-countAmmo());
   if(env.stop){out.stop=env.stop;out.stopAt=time;break;}
   if(step.delay){
    // Visible combat credits the kill after its 800 ms death animation.
    out.deathMs+=Math.min(step.delay,Math.max(0,duration-time));
    if(time+step.delay>duration)break;
    time+=step.delay;activeClock(time);env.now=time+1;
    env.candy=candyAt(c,'dmg',time);
    const walkTimer=r.resumeFight();
    out.walkMs+=Math.min(walkTimer.delay,Math.max(0,duration-time));
    if(time+walkTimer.delay>duration)break;
    time+=walkTimer.delay;activeClock(time);r.resumeFight();next=time+600;
   }else next=time+600;
  }else{
   // Separate away paths preserve the original tick ordering and cached stats.
   const ranged=r.isUsingRanged(),magic=r.isUsingMagic(),needsAmmo=ranged||magic;
   drain(600+(c.mode==='background'?pendingWalk:0));pendingWalk=0;
   if(c.mode==='background'&&needsAmmo&&!r._offlineConsumeAmmo(ranged,magic)){out.stop='ammo';out.stopAt=time-600;break;}
   if(g.autoEat&&(g.hp<=Math.floor(g.maxHp*c.threshold/100)||g.hp<=r._maxIncomingHit(m,cached.stats,pb,c.mode==='background'?cached.dr:undefined))){const f=r.getBestFood();if(f){g.inv[f.name]--;g.hp=Math.min(g.maxHp,g.hp+f.heal);}}
   const pet=r.getPetDef(g.equip.pet)?.bonus||{};g.hp=Math.min(g.maxHp,g.hp+(pet.hp_per_tick||0)+Math.floor(pb.hp_regen||0));
   let d=roll(cached.min,cached.cap);if(m.boss&&pb.boss_dmg)d=Math.floor(d*(1+pb.boss_dmg));d=Math.floor(d*bestD);d=Math.floor(d*(1+(env.weather[r.getCombatStyle()+'_dmg']||0))*(1+env.candy))+r.getPetFlatDmg();monHp-=d;out.damage+=d;
   if(c.mode==='offline'&&needsAmmo&&!r._offlineConsumeAmmo(ranged,magic)){out.stop='ammo';out.stopAt=time;out.food+=foodBefore-countFood();break;}
   if(cached.stats.lifesteal>0)g.hp=Math.min(g.maxHp,g.hp+Math.max(1,Math.ceil(d*cached.stats.lifesteal)));
   let incoming=0;if(monHp>0&&random()<cached.penetration){incoming=Math.max(Math.max(1,Math.floor(m.str*.04)),Math.floor(roll(Math.floor(m.str*.42),Math.floor(m.str*.58))*(1-cached.eff)));if(cached.dr!==0)incoming=Math.max(0,Math.floor(incoming*(1-cached.dr)));if(bestDef>1)incoming=Math.max(0,Math.floor(incoming/bestDef));}g.hp-=incoming;out.taken+=incoming;
   out.food+=foodBefore-countFood();out.ammo+=Math.max(0,ammoBefore-countAmmo());
   if(g.hp<=0){out.stop='death';out.stopAt=c.mode==='background'?time-600:time;break;}
   
   next=time+600;
   if(monHp<=0){award();monHp=m.hp;let delay=walk;if(c.mode==='background'){carry+=walk/600;delay=Math.floor(carry)*600;carry-=Math.floor(carry);}out.deathMs+=Math.min(800,Math.max(0,duration-time));out.walkMs+=Math.max(0,Math.min(delay-800,duration-time-800));next+=delay;if(c.mode==='offline'){time+=walk;drain(walk);}else pendingWalk=walk;}
  }
  if(out.trace.length<100 && time>=out.trace.length*duration/100)out.trace.push({seconds:time/1000,hp:g.hp,kills:out.kills});
 }
 if(c.mode==='active'&&out.stop==='complete')activeClock(duration);
 out.endingHp=out.stop==='death'?0:g.hp;out.finalLevels=Object.fromEntries(skillNames.map(s=>[s,R.getLevel(g.skills[s])]));out.kph=out.kills*60/c.minutes;out.foodPerHour=out.food*60/c.minutes;out.ammoPerHour=out.ammo*60/c.minutes;out.potionsRemaining=g.activeEffects.map(e=>({name:e.name,minutes:e.msLeft/60000}));
 return out;
}
function aggregate(runs,c){
 const mean=k=>runs.reduce((s,r)=>s+r[k],0)/runs.length,percentile=(k,p)=>{const a=runs.map(x=>x[k]).sort((a,b)=>a-b);return a[Math.min(a.length-1,Math.floor(p*a.length))];};
 const sd=Math.sqrt(runs.reduce((s,r)=>s+(r.kph-mean('kph'))**2,0)/Math.max(1,runs.length-1));
 const loot={};for(const r of runs)for(const [n,q]of Object.entries(r.loot))loot[n]=(loot[n]||0)+q/runs.length;
 return {n:runs.length,kph:mean('kph'),kphLow:percentile('kph',.05),kphHigh:percentile('kph',.95),meanError:1.96*sd/Math.sqrt(runs.length),kills:mean('kills'),food:mean('food'),ammo:mean('ammo'),gold:mean('gold'),xp:mean('xp'),defenseXP:mean('defenseXP'),damage:mean('damage'),taken:mean('taken'),attacks:mean('attacks'),walkMs:mean('walkMs'),deathMs:mean('deathMs'),endingHp:mean('endingHp'),deathChance:runs.filter(r=>r.stop==='death').length/runs.length,ammoChance:runs.filter(r=>r.stop==='ammo').length/runs.length,stopAt:mean('stopAt'),loot,example:runs[Math.floor(runs.length/2)]};
}
async function run(raw,onProgress=()=>{},cancel=()=>false){const c=normalize(raw),runs=[];for(let i=0;i<c.trials;i++){if(cancel())return null;runs.push(simulate(c,(c.seed+Math.imul(i,2654435761))>>>0));onProgress(i+1,c.trials);await new Promise(resolve=>setTimeout(resolve,0));}return aggregate(runs,c);}
root.CombatSim={expectedAttacks,defaults,normalize,snapshot,simulate,aggregate,run,makeContext,rng,slots,skillNames,petGroups,combatBlessings};
if(typeof module!=='undefined')module.exports=root.CombatSim;
})(globalThis);
