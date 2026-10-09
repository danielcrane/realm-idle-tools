(function(root){
 'use strict';
 const M=typeof module!=='undefined'?require('../../character_profile/model.js'):root.CharacterProfile;
 const E=typeof module!=='undefined'?require('./engine.js'):root.CombatSim;
 const R=M.R,clone=v=>structuredClone(v),equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const bonusKeys=['bosses','killLog','vip','vip2','communityTier','museumByStyle'];
 const gear=c=>({equip:c.equip,rarities:c.rarities,prayer:c.prayer});
 function fromProfile(profile,setId,current=E.defaults()){
  const p=M.validate(profile),c=clone(current),set=p.combatSets.find(s=>s.id===setId);
  for(const s of E.skillNames){c.levels[s]=p.skills[s].level;c.exactXP??={};c.exactXP[s]=p.skills[s].xp??R.getXPFor(p.skills[s].level);}
  Object.assign(c,{bosses:clone(p.account.bosses),killLog:clone(p.account.killLog),vip:p.account.vip,vip2:p.account.vipPlus,communityTier:p.account.communityTier,museumByStyle:M.museumBonuses(p),museumMode:'manual',collection:{}});
  if(set){c.equip={};c.rarities={};for(const [slot,item] of Object.entries(set.equipment)){c.equip[slot]=item.name;c.rarities[slot]=item.rarity;}c.equip.pet=set.pet||null;c.prayer=set.blessing;}
  return E.normalize(c);
 }
 function merge(current,oldBase,newBase){
  const c=clone(current);
  for(const s of E.skillNames)if(c.levels[s]===oldBase.levels[s]){c.levels[s]=newBase.levels[s];c.exactXP??={};c.exactXP[s]=newBase.exactXP[s];}
  if(equal(gear(E.normalize(c)),gear(oldBase)))Object.assign(c,clone(gear(newBase)));
  for(const key of bonusKeys)if(equal(c[key],oldBase[key]))c[key]=clone(newBase[key]);
  return E.normalize(c);
 }
 function modified(c,base){return {gear:!equal(gear(c),gear(base)),levels:E.skillNames.some(s=>c.levels[s]!==base.levels[s]),bonuses:bonusKeys.some(k=>!equal(c[k],base[k]))};}
 function setFromConfig(c,id,name){const set=M.newSet('combat',id,name);for(const slot of Object.keys(M.slots))if(c.equip[slot])set.equipment[slot]={name:c.equip[slot],rarity:c.rarities[slot]};set.pet=c.equip.pet||'';set.blessing=c.prayer||'';return set;}
 function supplies(p,current){
  const c=clone(current),inv=p.inventory,known=n=>Object.hasOwn(inv.items,n)?inv.items[n].quantity:inv.complete?0:null,warnings=[];
  c.foods=Object.keys(R.FOOD_HEALS).flatMap(name=>{const qty=known(name);return qty===null?current.foods.filter(f=>f.name===name):qty>0?[{name,qty}]:[];});c.ammo=[];
  for(const [name,item] of Object.entries(R.EQUIPMENT))if(item.slot==='ammo'&&!item.infinite&&!item.sigil){
   const row=inv.items[name],qty=known(name);
   if(qty===null){c.ammo.push(...current.ammo.filter(a=>a.name===name));continue;}if(!qty)continue;
   if(!row?.rarities){warnings.push(name+' has no rarity breakdown; existing spare quantities were retained.');c.ammo.push(...current.ammo.filter(a=>a.name===name));continue;}
   for(const [tier,count] of Object.entries(row.rarities)){const spare=Math.max(0,count-(c.equip.ammo===name&&c.rarities.ammo===Number(tier)?1:0));if(spare)c.ammo.push({name,tier:Number(tier),qty:spare});}
  }
  c.infiniteFood=false;c.infiniteAmmo=false;if(!inv.complete)warnings.push('Unrecorded quantities are unknown; existing values for those items were retained.');return {config:E.normalize(c),warnings};
 }
 const api={fromProfile,merge,modified,setFromConfig,supplies,bonusKeys,gear};if(typeof module!=='undefined')module.exports=api;else root.CombatProfileBridge=api;
})(globalThis);
