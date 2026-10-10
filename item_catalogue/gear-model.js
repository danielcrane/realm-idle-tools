(function(root){'use strict';
const label=s=>s.replaceAll('_',' ').replace(/\b\w/g,c=>c.toUpperCase());
function describe(data,name,tier){
 const eq=data.gear[name],tool=data.tools[name];if(!eq&&!tool)return null;
 const fixed=!!eq&&!eq.rune&&(eq.infinite||eq.slot==='ammo'&&!!eq.magicMult);
 const sources=data.rows.filter(r=>r.item===name),minimum=sources.length?Math.min(...sources.map(r=>r.minRarity||1)):1;
 const rarity=data.rarities.find(r=>r.tier===(fixed?1:Math.max(minimum,Number(tier)||minimum)))||data.rarities[0],m=rarity.mult,stats=[];
 const add=(key,name,value,format='flat')=>stats.push({key,label:name,value,format});
 if(eq){
  for(const [k,l]of Object.entries({atk:'Attack',str:'Strength',def:'Defense',rng:'Ranged',rngBonus:'Flat Ranged Bonus',magic:'Magic'}))if(eq[k])add(k,l,Math.floor(eq[k]*m));
  for(const [k,l,scale]of [['magicMult','Magic Multiplier','magicScale'],['rangedMult','Ranged Multiplier','rangedScale'],['meleeMult','Melee Multiplier','meleeScale']])if(eq[k])add(k,l,eq[k]+(m-1)*(eq[scale]||0),'mult');
  for(const [k,l]of [['minHit','Minimum Hit'],['lifesteal','Lifesteal'],['boss_dmg','Boss Damage']])if(eq[k])add(k,l,eq[k],'percent');
  if(eq.drPenalty)add('drPenalty','Damage Reduction (Melee Only)',-eq.drPenalty,'percent');
  for(const [k,l,scale]of [['gathSpeed','Gathering Speed','gathScale'],['skillSpeed',label(eq.skillOf||'skill')+' Speed','skillScale'],['treasureFind',label(eq.skillOf||'gathering')+' Treasure Find','treasureScale'],['prodSpeed','Production Speed','prodScale'],['skillXp','All Skilling XP','skillXpScale']])if(eq[k])add(k,l,eq[k]+(m-1)*(eq[scale]||0),'percent');
 }
 if(tool)add('toolSpeed',label(tool.skill)+' Tool Speed',tool.speed*(1+(m-1)*.25),'mult');
 const slots={weapon:'Weapon',shield:'Off Hand',helm:'Head',body:'Body',legs:'Legs',gloves:'Hands',boots:'Feet',ring1:'Ring',cape:'Cape',ammo:'Ammo / Sigil',amulet:'Neck'};
 return {rarity,minimum,fixed,stats,slot:tool?label(tool.skill)+' Tool':slots[eq.slot]||label(eq.slot||'gear'),flags:[eq?.twoHand?'Two-handed':null,eq?.infinite?'Infinite':null,eq?.quiver?'Ranged weapon required':null,eq?.sigil?'Melee only':null,tool?'Requires '+label(tool.skill)+' level '+tool.level:null].filter(Boolean),set:data.sets.find(s=>s.members.includes(name))||null};
}
const api={describe};if(typeof module!=='undefined')module.exports=api;else root.CatalogueGear=api;
})(globalThis);
