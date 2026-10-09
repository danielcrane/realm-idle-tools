/* Character-profile data and validation. Existing calculator storage is never read or written. */
(function(root){
  'use strict';
  const R=typeof module!=='undefined'?require('../combat_simulator/source-rules.js'):root.RealmRules;
  const X=typeof module!=='undefined'?require('../xp/source-data.js').data:XP_GAME_DATA;
  const LEGACY_STORAGE_KEY='realm-public-character-profile-v1';
  const requestedId=typeof location!=='undefined'?new URLSearchParams(location.search).get('character'):null;
  const characterId=requestedId&&/^[a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12}$/i.test(requestedId)?requestedId:'default';
  const scopedKey=key=>characterId==='default'?key:key+':character:'+characterId;
  const STORAGE_KEY=scopedKey(LEGACY_STORAGE_KEY);
  const skills={attack:'Attack',strength:'Strength',defense:'Defense',ranged:'Ranged',magic:'Magic',...X.skills};
  const combatSkills=['attack','strength','defense','ranged','magic'];
  const slots={weapon:'Weapon',shield:'Off Hand',helm:'Head',body:'Body',legs:'Legs',boots:'Feet',gloves:'Hands',ring1:'Ring I',ring2:'Ring II',cape:'Cape',ammo:'Ammo / Sigil',amulet:'Amulet'};
  const petMap=new Map();
  for(const [category,rows] of [['Skilling',R.SKILL_PETS],['Boss',R.BOSS_PETS],['Monster',R.MONSTER_PETS],['Event',R.EVENT_PETS]]){
    for(const p of rows){petMap.set(p.name,{...p,category});if(p.recolor)petMap.set(p.recolor.name,{...p,...p.recolor,category});}
  }
  const petVariants=[...petMap.values()];
  // Skill scope is part of the effect: equal numeric bonuses for different skills are not interchangeable.
  const petEffectKey=p=>JSON.stringify([p.skill||null,Object.entries(p.bonus||{}).sort(([a],[b])=>a.localeCompare(b))]);
  const preferredPetNames=new Set(['Bear','Turtle','Rabbit','Horse','Bunny','Chick','Duckling','Lamb','Eagle','Moose']);
  const recolorNames=new Set(petVariants.flatMap(p=>p.recolor?[p.recolor.name]:[]));
  const effectGroups=new Map();
  for(const pet of petVariants){const key=petEffectKey(pet);if(!effectGroups.has(key))effectGroups.set(key,[]);effectGroups.get(key).push(pet);}
  const pets=[...effectGroups.values()].map(variants=>{
    const canonical=variants.find(p=>preferredPetNames.has(p.name))||variants.find(p=>!recolorNames.has(p.name))||variants[0];
    const ordered=[canonical,...variants.filter(p=>p!==canonical).sort((a,b)=>a.name.localeCompare(b.name))];
    return {...canonical,variants:ordered,categories:[...new Set(ordered.map(p=>p.category))]};
  }).sort((a,b)=>a.name.localeCompare(b.name));
  const petAliases=new Map(pets.flatMap(p=>p.variants.map(v=>[v.name,p.name])));
  const canonicalPet=name=>petAliases.get(name)||name;
  const museumItems=Object.keys(R.EQUIPMENT).filter(n=>R.museumFamilies(n).length).sort();
  const blessings=[...R.PRAYERS,...R.TOME_UNLOCKED_PRAYERS];
  const monsters=[...new Map(Object.values(R.MONSTERS).flat().map(m=>[m.name,m])).values()];
  const emptyBonuses=()=>Object.fromEntries(Object.entries(R.MUSEUM_BASE).map(([style,base])=>[style,Object.fromEntries(Object.keys(base).map(k=>[k,0]))]));
  function defaults(){return {version:1,name:'My Adventurer',inventory:{complete:false,items:{}},lastGameImport:null,skills:Object.fromEntries(Object.keys(skills).map(k=>[k,{level:1,xp:null}])),pets:[],museum:{mode:'collection',items:{},manual:emptyBonuses()},combatSets:[],skillingSets:[],skillingGear:emptySkillingGear(),account:{vip:false,vipPlus:false,communityTier:0,bosses:[],tomes:[],killLog:{}}};}
  function newSet(kind,id,name,skill='woodcutting'){return {id,name,skill:kind==='skilling'?skill:null,equipment:{},tool:null,pet:'',blessing:''};}
  const skillingGroups={jewelry:'Jewellery',woodcutting:'Woodcutting',mining:'Mining',fishing:'Fishing'};
  const jewelrySlots={gatheringAmulet:'Amethyst Amulet',productionAmulet:'Topaz Amulet',ring1:'Pearl Ring I',ring2:'Pearl Ring II'};
  function emptySkillingGear(){return Object.fromEntries(Object.keys(skillingGroups).map(group=>[group,Object.fromEntries((group==='jewelry'?Object.keys(jewelrySlots):['tool','helm','body','legs','boots','gloves']).map(slot=>[slot,null]))]));}
  function bestItemOptions(group,slot){
    if(group==='jewelry')return [slot==='gatheringAmulet'?'Amethyst Amulet':slot==='productionAmulet'?'Topaz Amulet':'Pearl Ring'];
    return slot==='tool'?X.tools[group].map(t=>t.name):gearOptions('skilling',group,slot);
  }
  // SKILL_BOSS.chestBands toolMin applies to both tools and armor (game source, openables).
  const chestMinimums=[8,11,14];
  const skillingMinimums=new Map(X.gear.filter(g=>g.bossSet).map(g=>[g.name,chestMinimums[g.setTier-1]]));
  for(const rows of Object.values(X.tools))rows.filter(t=>t.drop).forEach((t,i)=>skillingMinimums.set(t.name,chestMinimums[i]));
  function minimumSkillingRarity(name){return skillingMinimums.get(name)||1;}
  function migrateSkillingSets(sets){
    const gear=emptySkillingGear();
    const take=(group,slot,item)=>{if(!item)return;const old=gear[group][slot];if(!old||(old.name===item.name&&item.rarity>old.rarity))gear[group][slot]={...item};};
    for(const set of sets){
      if(X.tools[set.skill]){take(set.skill,'tool',set.tool);for(const slot of ['helm','body','legs','boots','gloves'])take(set.skill,slot,set.equipment[slot]);}
      const amulet=set.equipment.amulet;if(amulet)take('jewelry',amulet.name==='Amethyst Amulet'?'gatheringAmulet':'productionAmulet',amulet);
      for(const slot of ['ring1','ring2'])take('jewelry',slot,set.equipment[slot]);
    }
    return gear;
  }
  function gearOptions(kind,skill,slot){
    if(kind==='combat')return Object.entries(R.EQUIPMENT).filter(([,e])=>e.slot===(slot==='ring2'?'ring1':slot)).map(([name])=>name).sort();
    return X.gear.filter(e=>e.slot===(slot==='ring2'?'ring1':slot)&&(!e.skillOf||e.skillOf===skill)).map(e=>e.name).sort();
  }
  function setSlots(kind,skill){return kind==='combat'?Object.keys(slots):[...(X.tools[skill]?['helm','body','legs','boots','gloves']:[]),'amulet','ring1','ring2'];}
  function cap(style,stat){return stat==='def'?R.MUSEUM_DEF_CAP[style]:stat==='dr'?R.MUSEUM_DR_CAP[style]:R.MUSEUM_CAP[stat]??1e12;}
  function museumBonuses(p){
    const result=emptyBonuses();
    if(!p.account.bosses.includes('dungeon_boss'))return result;
    if(p.museum.mode==='manual')return structuredClone(p.museum.manual);
    for(const [name,rarity] of Object.entries(p.museum.items))for(const style of R.museumFamilies(name)){
      const factor=(R.MUSEUM_TIER_MULT[R.getItemMaterialTier(name)]||0)*R.museumRarityFactor(rarity)*R.museumWeaponMult(name,style);
      for(const [stat,base] of Object.entries(R.MUSEUM_BASE[style]))result[style][stat]+=base*factor;
    }
    for(const [style,stats] of Object.entries(result))for(const k of Object.keys(stats))stats[k]=Math.min(cap(style,k),stats[k]);
    return result;
  }
  function communityBonuses(tier){return Object.fromEntries(R.CC_TIERS.map((row,i)=>[row.key,i<tier?.05:0]));}
  function blessingAvailable(p,id){const b=blessings.find(b=>b.id===id);return !id||!!b&&(R.TOME_UNLOCKED_PRAYERS.some(t=>t.id===id)?p.account.tomes.includes(id):b.level<=p.skills.divinity.level);}
  function warnings(p,set){const out=[];if(set.pet&&!p.pets.includes(set.pet))out.push('The selected pet is not marked as owned.');if(!blessingAvailable(p,set.blessing))out.push('The selected blessing requires a higher Divinity level or an unlocked tome.');if(set.tool){const tool=X.tools[set.skill]?.find(t=>t.name===set.tool.name);if(tool&&p.skills[set.skill].level<tool.level)out.push(`${tool.name} requires ${skills[set.skill]} level ${tool.level}.`);}return out;}
  function assert(value,message){if(!value)throw new Error(message);}
  function obj(v,label){assert(v&&typeof v==='object'&&!Array.isArray(v),label+' must be an object.');return v;}
  function num(v,min,max,label,integer=true){assert(typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max&&(!integer||Number.isInteger(v)),`${label} must be ${integer?'a whole number':'a number'} between ${min} and ${max}.`);return v;}
  function str(v,label,max=80){assert(typeof v==='string'&&v.trim().length>0&&v.length<=max,`${label} must contain 1–${max} characters.`);return v.trim();}
  function choice(v,values,label){assert(values.includes(v),'Unrecognised '+label+'.');return v;}
  function selected(v,values,label){assert(Array.isArray(v)&&v.length<=values.length,label+' is invalid.');v.forEach(x=>choice(x,values,label));assert(new Set(v).size===v.length,label+' contains duplicates.');return [...v];}
  function validate(raw){
    obj(raw,'Profile');assert(raw.version===1,'Unsupported profile version.');
    const p=defaults();p.name=str(raw.name,'Character name',60);obj(raw.skills,'Skills');
    for(const key of Object.keys(skills)){const s=obj(raw.skills[key],skills[key]);const level=num(s.level,1,130,skills[key]+' level');const xp=s.xp===null?null:num(s.xp,0,Number.MAX_SAFE_INTEGER,skills[key]+' total XP',false);assert(xp===null||R.getLevel(xp)===level,skills[key]+' level and total XP do not match.');p.skills[key]={level,xp};}
    p.pets=[...new Set(selected(raw.pets,petVariants.map(p=>p.name),'owned pets').map(canonicalPet))];
    const a=obj(raw.account,'Account');for(const key of ['vip','vipPlus']){assert(typeof a[key]==='boolean','VIP status must be on or off.');p.account[key]=a[key];}
    p.account.communityTier=num(a.communityTier,0,4,'Community Centre tier');
    p.account.bosses=selected(a.bosses,Object.values(R.MONSTERS).flat().filter(m=>m.boss).map(m=>m.id),'boss clears');
    p.account.tomes=selected(a.tomes,R.TOME_UNLOCKED_PRAYERS.map(t=>t.id),'unlocked tomes');
    for(const [name,kills] of Object.entries(obj(a.killLog,'Kill log'))){choice(name,monsters.map(m=>m.name),'monster');p.account.killLog[name]=num(kills,0,1e12,'Kills');}
    const m=obj(raw.museum,'Museum');p.museum.mode=choice(m.mode,['collection','manual'],'museum mode');
    for(const [name,tier] of Object.entries(obj(m.items,'Museum collection'))){choice(name,museumItems,'museum item');p.museum.items[name]=num(tier,1,21,'Museum rarity');}
    obj(m.manual,'Manual museum bonuses');for(const [style,stats] of Object.entries(p.museum.manual)){obj(m.manual[style],style+' bonuses');for(const key of Object.keys(stats))stats[key]=num(m.manual[style][key],0,cap(style,key),style+' '+key,false);}
    const ids=new Set();
    for(const kind of ['combat','skilling']){
      const rows=raw[kind+'Sets'];assert(Array.isArray(rows)&&rows.length<=100,'Save up to 100 sets per category.');const names=new Set();
      p[kind+'Sets']=rows.map(row=>{
        obj(row,'Gear set');const id=str(row.id,'Set ID');assert(!ids.has(id),'Gear set IDs must be unique.');ids.add(id);
        const name=str(row.name,'Set name');assert(!names.has(name.toLowerCase()),'Set names must be unique within each category.');names.add(name.toLowerCase());
        const skill=kind==='skilling'?choice(row.skill,Object.keys(X.skills),'skilling skill'):null;
        const set=newSet(kind,id,name,skill);set.pet=canonicalPet(choice(row.pet,['',...petVariants.map(p=>p.name)],'set pet'));set.blessing=choice(row.blessing,['',...blessings.map(b=>b.id)],'blessing');
        for(const [slot,value] of Object.entries(obj(row.equipment,'Equipment'))){choice(slot,setSlots(kind,skill),'equipment slot');obj(value,'Equipment item');const item=choice(value.name,gearOptions(kind,skill,slot),'equipment item');const rarity=num(value.rarity,1,21,'Item rarity');assert(!R.EQUIPMENT[item]?.infinite||item==='Wraith Rune'||rarity===1,'Only Wraith Rune supports rarities above Common; other infinite runes use Common rarity.');set.equipment[slot]={name:item,rarity};}
        assert(!(R.EQUIPMENT[set.equipment.weapon?.name]?.twoHand&&set.equipment.shield),'A two-handed weapon cannot be combined with an off-hand item.');
        if(row.tool!==null){assert(kind==='skilling'&&X.tools[skill],'This set cannot have a gathering tool.');obj(row.tool,'Tool');set.tool={name:choice(row.tool.name,X.tools[skill].map(t=>t.name),'tool'),rarity:num(row.tool.rarity,1,21,'Tool rarity')};}
        return set;
      });
    }
    const gear=raw.skillingGear===undefined?migrateSkillingSets(p.skillingSets):obj(raw.skillingGear,'Skilling gear');
    for(const group of Object.keys(gear))choice(group,Object.keys(p.skillingGear),'skilling group');
    for(const [group,slots] of Object.entries(p.skillingGear)){
      const values=obj(gear[group],group+' gear');
      for(const slot of Object.keys(values))choice(slot,Object.keys(slots),'skilling slot');
      for(const slot of Object.keys(slots)){
        const item=values[slot];if(item===null)continue;obj(item,'Skilling item');
        slots[slot]={name:choice(item.name,bestItemOptions(group,slot),'skilling item'),rarity:num(item.rarity,1,21,'Skilling rarity')};
      }
    }
    if(raw.inventory!==undefined){
      const inv=obj(raw.inventory,'Inventory');assert(typeof inv.complete==='boolean','Inventory coverage must be specified.');
      p.inventory.complete=inv.complete;const entries=Object.entries(obj(inv.items,'Inventory items'));assert(entries.length<=10000,'Too many inventory entries.');
      for(const [name,row] of entries){
        str(name,'Item name',120);assert(!['__proto__','constructor','prototype'].includes(name),'Invalid item name.');obj(row,'Inventory item');
        const quantity=row.quantity===null?null:num(row.quantity,0,Number.MAX_SAFE_INTEGER,'Quantity');let rarities=null;
        if(row.rarities!==null&&row.rarities!==undefined){rarities={};for(const [tier,count] of Object.entries(obj(row.rarities,'Rarity counts'))){assert(String(num(Number(tier),1,21,'Rarity'))===tier,'Invalid rarity key.');rarities[tier]=num(count,0,Number.MAX_SAFE_INTEGER,'Rarity quantity');}assert(quantity!==null&&Object.values(rarities).reduce((a,b)=>a+b,0)===quantity,'Rarity counts must add up to the total quantity.');}
        p.inventory.items[name]={quantity,rarities};
      }
    }
    if(raw.lastGameImport){const meta=obj(raw.lastGameImport,'Import details');const date=v=>{assert(typeof v==='string'&&Number.isFinite(Date.parse(v)),'Invalid import date.');return new Date(v).toISOString();};p.lastGameImport={importedAt:date(meta.importedAt),savedAt:meta.savedAt===null?null:date(meta.savedAt),sections:selected(meta.sections,['skills','pets','museum','skillingGear','account','inventory','currentGear'],'imported sections')};}
    return p;
  }
  function decode(text){assert(text.length<=2e6,'Profile backups must be smaller than 2 MB.');let data;try{data=JSON.parse(text);}catch{throw new Error('This file is not valid JSON.');}assert(data?.format==='realm-idle-character-profile','Choose a Character Profile backup exported from this page.');return validate(data.profile);}
  function encode(p){return JSON.stringify({format:'realm-idle-character-profile',exportedAt:new Date().toISOString(),profile:validate(p)},null,2);}
  function listCharacters(storage){
    const entries=[];
    for(let i=0;i<storage.length;i++){
      const key=storage.key(i),match=key.match(/^realm-public-character-profile-v1:character:([a-f0-9]{8}-(?:[a-f0-9]{4}-){3}[a-f0-9]{12})$/i);
      if(key!==LEGACY_STORAGE_KEY&&!match)continue;
      const id=match?match[1]:'default';
      // Listing needs only a label. Full validation happens when a character is opened.
      try{const raw=JSON.parse(storage.getItem(key));assert(raw?.version===1,'Unsupported profile version.');entries.push({id,name:str(raw.name,'Character name',60)});}
      catch{entries.push({id,name:'Unreadable Character ('+id+')'});}
    }
    return entries.sort((a,b)=>a.id==='default'?-1:b.id==='default'?1:a.name.localeCompare(b.name)||a.id.localeCompare(b.id));
  }
  function createCharacter(storage,profile){
    const id=crypto.randomUUID(),key=LEGACY_STORAGE_KEY+':character:'+id;
    storage.setItem(key,JSON.stringify(validate(profile)));return id;
  }
  const api={R,X,STORAGE_KEY,LEGACY_STORAGE_KEY,characterId,scopedKey,listCharacters,createCharacter,skills,combatSkills,slots,pets,petVariants,petEffectKey,canonicalPet,museumItems,blessings,monsters,defaults,newSet,setSlots,gearOptions,skillingGroups,jewelrySlots,emptySkillingGear,bestItemOptions,minimumSkillingRarity,migrateSkillingSets,museumBonuses,communityBonuses,blessingAvailable,warnings,cap,validate,decode,encode};
  if(typeof module!=='undefined')module.exports=api;else root.CharacterProfile=api;
})(typeof globalThis!=='undefined'?globalThis:this);
