/* Converts a local game snapshot into profile fields; never contacts the game or cloud. */
(function(root){
  'use strict';
  const M=typeof module!=='undefined'?require('./model.js'):root.CharacterProfile,R=M.R;
  const sections={skills:'Skill Levels & XP',pets:'Pets',museum:'Museum',skillingGear:'Skilling Gear',account:'Account & Unlocks',inventory:'Inventory',currentGear:'Current Gear Set (Add New Set)'};
  const petNames=new Set(M.petVariants.map(p=>p.name)),toolNames=new Set(Object.values(M.X.tools).flat().map(t=>t.name));
  const materialNames=new Set(M.X.actions.flatMap(a=>[...Object.keys(a.input||{}),...(typeof a.output==='string'?[a.output]:[])]));
  const extraItems=['Gold','Castle Key','Fireworks','Halloween Candy','Gem Bag','Bird Nest','Empty Bird Nest','Underwater Chest','Old Boot','Rubber Ducky','Pet Whistle','Skilling Pet Whistle'];
  const dropItems=M.monsters.flatMap(m=>(m.drops||[]).map(d=>d.item));
  const catalog=[...new Set([...materialNames,...Object.keys(R.EQUIPMENT),...toolNames,...petNames,...Object.keys(R.FOOD_HEALS),...Object.keys(R.BONE_TYPES),...Object.keys(R.POTIONS),...M.X.potions.map(p=>p.name),...Object.keys(R.CANDY_DEFS),...dropItems,...extraItems])].filter(n=>typeof n==='string').sort();
  const own=(obj,key)=>Object.hasOwn(obj,key);
  const fail=message=>{throw Error(message);};
  function object(v,label){if(!v||typeof v!=='object'||Array.isArray(v))fail(label+' must be an object.');return v;}
  function number(v,label,integer=true){if(typeof v!=='number'||!Number.isFinite(v)||v<0||v>Number.MAX_SAFE_INTEGER||(integer&&!Number.isInteger(v)))fail('Invalid '+label+'.');return v;}
  function name(v){if(typeof v!=='string'||!v.trim()||v.length>120||['__proto__','constructor','prototype'].includes(v))fail('Invalid item name.');return v;}
  function tier(v){number(v,'item rarity');if(v<1||v>21)fail('Unsupported item rarity.');return v;}
  function category(n){if(n==='Gold')return 'Currency';if(petNames.has(n))return 'Pets';if(toolNames.has(n))return 'Tools';if(own(R.EQUIPMENT,n))return 'Equipment';if(own(R.FOOD_HEALS,n)||/Potion|Candy|Cake|Pie/.test(n))return 'Consumables';if(materialNames.has(n)||/Bone|Logs|Ore|Bar|Hide|Leather|Essence|Scale|Glyph/.test(n))return 'Materials';return 'Other';}
  function read(text){
    if(typeof text!=='string'||text.length>2e6)fail('Game saves must be smaller than 2 MB.');
    let game;try{game=JSON.parse(text);}catch{fail('Choose the extracted game save JSON file.');}
    object(game,'Save');if(game.format)fail('Use Import Backup for Character Profile backups.');
    object(game.skills,'Skills');object(game.inv,'Inventory');object(game.equip,'Equipment');
    const profile=M.defaults(),warnings=[],available=['skills','pets','inventory'];
    let currentGear=null;
    const inventory=profile.inventory;inventory.complete=true;
    const add=(n,count,rarity=null)=>{
      name(n);number(count,'quantity');if(!count)return;
      const row=inventory.items[n]||(inventory.items[n]={quantity:0,rarities:null});
      if(rarity!==null){tier(rarity);if(!row.rarities)row.rarities=row.quantity?{1:row.quantity}:{};row.rarities[rarity]=(row.rarities[rarity]||0)+count;}
      else if(row.rarities)row.rarities[1]=(row.rarities[1]||0)+count;
      row.quantity+=count;number(row.quantity,'quantity');
    };
    for(const k of Object.keys(M.skills)){const xp=number(game.skills[k],M.skills[k]+' XP',false);profile.skills[k]={level:R.getLevel(xp),xp};}
    for(const [n,count] of Object.entries(game.inv))add(n,count);
    for(const [n,counts] of Object.entries(object(game.itemRarities||{},'Item rarities'))){for(const [t,count] of Object.entries(object(counts,'Rarity counts')))add(n,count,tier(Number(t)));}
    // Equipped items have been removed from inventory by the game. Include them once in owned totals.
    for(const [slot,n] of Object.entries(game.equip)){if(n)add(n,1,slot==='pet'?null:tier(game.equippedRarity?.[slot]??1));}
    for(const [skill,n] of Object.entries(game.tools||{}))if(n)add(n,1,tier(game.toolRarities?.[skill]??1));
    if(game.gold!==undefined)add('Gold',number(game.gold,'gold',false));
    profile.pets=[...new Set(M.petVariants.filter(p=>(inventory.items[p.name]?.quantity||0)>0).map(p=>M.canonicalPet(p.name)))];
    if(game.bestRarities!==undefined){
      available.push('museum');object(game.bestRarities,'Museum collection');
      for(const n of M.museumItems){const row=inventory.items[n];const best=game.bestRarities[n]===undefined?0:tier(game.bestRarities[n]);const rarity=Math.max(best,row?.quantity?1:0,...Object.entries(row?.rarities||{}).filter(([,c])=>c>0).map(([t])=>Number(t)));if(rarity)profile.museum.items[n]=rarity;}
    }else warnings.push('No museum history found; the museum section will be preserved.');
    if(game.tools&&game.itemRarities){
      available.push('skillingGear');
      for(const [group,slots] of Object.entries(profile.skillingGear))for(const slot of Object.keys(slots)){
        if(group==='jewelry'&&slot==='ring2')continue;
        const choices=M.bestItemOptions(group,slot).flatMap(n=>{
          const row=inventory.items[n];if(!row?.quantity)return [];
          const rarity=Math.max(...Object.entries(row.rarities||{1:row.quantity}).filter(([,count])=>count>0).map(([t])=>Number(t)));
          const mult=R.getRarityByTier(rarity).mult,tool=M.X.tools[group]?.find(t=>t.name===n),gear=M.X.gear.find(g=>g.name===n);
          if(tool&&tool.level>profile.skills[group].level)return [];
          const score=tool?tool.speed*(1+(mult-1)*.25):group==='jewelry'?rarity:(gear.skillSpeed||0)+(mult-1)*(gear.skillScale||0);
          return [{name:n,rarity,score}];
        }).sort((a,b)=>b.score-a.score||b.rarity-a.rarity||a.name.localeCompare(b.name));
        if(choices[0]){const {name,rarity}=choices[0];slots[slot]={name,rarity};}
      }
      const rings=inventory.items['Pearl Ring'];const ringTiers=Object.entries(rings?.rarities||(rings?{1:rings.quantity}:{})).sort(([a],[b])=>Number(b)-Number(a)).flatMap(([t,c])=>Array(Math.min(2,c)).fill(Number(t))).slice(0,2);
      for(const [i,slot] of ['ring1','ring2'].entries())profile.skillingGear.jewelry[slot]=ringTiers[i]?{name:'Pearl Ring',rarity:ringTiers[i]}:null;
      for(const slots of Object.values(profile.skillingGear))for(const item of Object.values(slots))if(item&&item.rarity<M.minimumSkillingRarity(item.name))warnings.push(item.name+' has a saved rarity below the current chest minimum; its actual rarity is preserved.');
    }else warnings.push('Skilling ownership data is incomplete; skilling gear will be preserved.');
    if(Array.isArray(game.bossesKilled)&&Array.isArray(game.unlockedTomes)&&game.killLog&&typeof game.vip==='boolean'&&typeof game.vip2==='boolean'&&game.communityCenter){
      available.push('account');const a=profile.account;
      const savedAt=Number.isFinite(game.lastSave)?game.lastSave:Date.now();
      a.vip=game.vip&&(!game.vipExpiry||game.vipExpiry>savedAt);a.vipPlus=game.vip2&&(!game.vip2Expiry||game.vip2Expiry>savedAt);
      a.bosses=[...new Set(game.bossesKilled.filter(id=>Object.values(R.MONSTERS).flat().some(m=>m.boss&&m.id===id)))];
      a.tomes=[...new Set(game.unlockedTomes.filter(id=>R.TOME_UNLOCKED_PRAYERS.some(t=>t.id===id)))];
      for(const monster of M.monsters)if(own(game.killLog,monster.name))a.killLog[monster.name]=number(game.killLog[monster.name],'kill count');
      const cc=game.communityCenter,day=Math.floor(savedAt/86400000);let points=0;
      if(cc.pool){number(cc.pool.points,'community points',false);number(cc.pool.day,'community day');points=Math.max(0,Math.min(50000,cc.pool.points-2000*Math.max(0,day-cc.pool.day)));}
      else if(cc.days){for(let d=day-30;d<=day;d++){if(d!==day-30)points=Math.max(0,points-2000);points=Math.min(50000,points+number(cc.days[d]||0,'community points',false));}}
      a.communityTier=R.CC_TIERS.filter(t=>points>=t.at).length;
    }else warnings.push('Account data is incomplete; account settings will be preserved.');
    const equipped=M.newSet('combat','game-current','Imported Current Gear');
    const unsupported=[];
    for(const [slot,n] of Object.entries(game.equip)){
      if(!n)continue;
      if(slot==='pet'){if(petNames.has(n))equipped.pet=M.canonicalPet(n);else unsupported.push(n);}
      else if(Object.hasOwn(M.slots,slot)&&M.gearOptions('combat',null,slot).includes(n))equipped.equipment[slot]={name:n,rarity:R.EQUIPMENT[n]?.infinite?1:tier(game.equippedRarity?.[slot]??1)};
      else unsupported.push(n);
    }
    if(game.activePrayer){if(M.blessings.some(b=>b.id===game.activePrayer))equipped.blessing=game.activePrayer;else unsupported.push('blessing '+game.activePrayer);}
    if(unsupported.length)warnings.push('Current gear set cannot be imported because these selections are not supported yet: '+unsupported.join(', ')+'. Existing sets are preserved.');
    else{
      if(R.EQUIPMENT[equipped.equipment.weapon?.name]?.twoHand)delete equipped.equipment.shield;
      const check=structuredClone(profile);check.combatSets=[equipped];currentGear=M.validate(check).combatSets[0];available.push('currentGear');
    }
    const unknown=Object.keys(inventory.items).filter(n=>!catalog.includes(n));if(unknown.length)warnings.push('Items not yet listed in this page’s catalog (names and quantities are kept): '+unknown.join(', ')+'.');
    return {profile:M.validate(profile),currentGear,available,warnings,savedAt:Number.isFinite(game.lastSave)&&Math.abs(game.lastSave)<8.64e15?new Date(game.lastSave).toISOString():null};
  }
  function apply(current,loaded,selected,now=new Date().toISOString()){
    const next=M.validate(current);for(const section of selected){if(!loaded.available.includes(section))fail('This section is unavailable in the save.');if(section!=='currentGear')next[section]=structuredClone(loaded.profile[section]);}
    // Current gear is an opt-in addition; existing named sets are never replaced.
    if(selected.includes('currentGear')){
      const set=structuredClone(loaded.currentGear),ids=new Set([...next.combatSets,...next.skillingSets].map(s=>s.id)),names=new Set(next.combatSets.map(s=>s.name.toLowerCase()));
      let suffix=1;while(ids.has(set.id)){set.id='game-current-'+suffix++;}
      suffix=2;while(names.has(set.name.toLowerCase()))set.name='Imported Current Gear '+suffix++;
      next.combatSets.push(set);
    }
    next.lastGameImport={importedAt:now,savedAt:loaded.savedAt,sections:[...selected]};return M.validate(next);
  }
  const api={read,apply,sections,catalog,category};if(typeof module!=='undefined')module.exports=api;else root.CharacterGameImport=api;
})(globalThis);
