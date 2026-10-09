// Generated from Realm Idle 4.1.3.8; do not edit by hand.
const SkillBossSource=(()=>{
const SKILL_BOSSES = [
  {id:'skill_boss_treant', name:'Elder Treant', level:3271, skill:'woodcutting', img:'Assets/SWB/treantboss.png', color:'#6ee7b7',
   armor:[['Sapling Helm', 'Sapling Chestplate', 'Sapling Leggings', 'Sapling Boots', 'Sapling Gloves'], ['Heartwood Helm', 'Heartwood Chestplate', 'Heartwood Leggings', 'Heartwood Boots', 'Heartwood Gloves'], ['Elderwood Helm', 'Elderwood Chestplate', 'Elderwood Leggings', 'Elderwood Boots', 'Elderwood Gloves']],
   chest:"Treant's Chest", lore:'The oldest trunk in the realm, and the hardest to fell.',
   tools:['Treant Axe','Greater Treant Axe','Ancient Treant Axe'], pet:'Elder Treant Pet',
   table:[{item:'Bird Nest',c:1,q:[20,40]},{item:'Empty Bird Nest',c:0.40,q:[20,40]}],
   staple:{item:'Logs'},
   extras:[{item:'Bones',q:[40,80]},{item:'Big Bones',q:[25,50]},{item:'Mossy Bones',q:[15,30]},{item:'Giant Bone',q:[10,20]},{item:'Topaz',q:[5,10]},{item:'Amethyst',q:[5,10]}]},   
  {id:'skill_boss_kraken', name:'Kraken', level:3608, skill:'fishing', img:'Assets/SWB/krakenboss.png', color:'#6ee7b7',
   armor:[['Reef Helm', 'Reef Chestplate', 'Reef Leggings', 'Reef Boots', 'Reef Gloves'], ['Deepsea Helm', 'Deepsea Chestplate', 'Deepsea Leggings', 'Deepsea Boots', 'Deepsea Gloves'], ['Leviathan Helm', 'Leviathan Chestplate', 'Leviathan Leggings', 'Leviathan Boots', 'Leviathan Gloves']],
   chest:"Kraken's Chest", lore:'It rises where the nets go quiet.',
   tools:['Kraken Rod','Greater Kraken Rod','Ancient Kraken Rod'], pet:'Kraken Pet',
   table:[{item:'Underwater Chest',c:1,q:[20,40]},{item:'Pearl',c:0.60,q:[10,20]},{item:'Cooked Anglerfish',c:0.75,q:[40,80]}],
   staple:{item:'Raw Salmon'},
   extras:[{item:'Gold Nugget',q:[20,60]},{item:'Vital Essence',q:[20,40]},{item:'Void Crystal',q:[10,30]},{item:'Frozen Essence',q:[10,30]},{item:'Molten Core',q:[10,20]},{item:'Rubber Ducky',q:[1,1]}]},   
  {id:'skill_boss_golem', name:'Stone Golem', level:3947, skill:'mining', img:'Assets/SWB/golemboss.png', color:'#6ee7b7',
   armor:[['Slate Helm', 'Slate Chestplate', 'Slate Leggings', 'Slate Boots', 'Slate Gloves'], ['Jade Helm', 'Jade Chestplate', 'Jade Leggings', 'Jade Boots', 'Jade Gloves'], ['Obsidian Helm', 'Obsidian Chestplate', 'Obsidian Leggings', 'Obsidian Boots', 'Obsidian Gloves']],
   chest:"Golem's Chest", lore:'A mountain that learned to walk.',
   tools:['Golem Pick','Greater Golem Pick','Ancient Golem Pick'], pet:'Stone Golem Pet',
   table:[{item:'Gem Bag',c:1,q:[20,40]},{item:'Glyphstone',c:1,stack:true}],
   staple:{item:'Coal'},   
   extras:[{item:'Ruby',q:[8,15]},{item:'Sapphire',q:[8,15]},{item:'Emerald',q:[8,15]},{item:'Topaz',q:[5,10]},{item:'Amethyst',q:[5,10]},{item:'Diamond',q:[3,6]}]},   
];
const SKILL_BOSS = {
  attemptsPerWeek:5, attemptTicks:200,   
  
  
  hp:20000000000,
  milestones:[0.1,0.3,0.6,1],
  dmgPerSpeed:125,           
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  lowLvl:[1,40], lowLines:1,
  stackRefMs:8000, stackMaxScale:3,   
  petDropChance:0.002,   
  weekDmgCap:40000000,       
  chestBands:[
    {suffix:'Minor', upTo:250000,  mult:0.5, lvl:[1,50],   lines:3, qty:[400,800],   extraChance:0.50, extraDepth:3, extraChance2:0, toolMin:8, toolChance:0.15, armorChance:0.10},
    {suffix:'',      upTo:1500000, mult:1,   lvl:[40,100], lines:4, qty:[1500,3000], extraChance:0.60, extraDepth:5, extraChance2:0, toolMin:11, toolChance:0.08, armorChance:0.05},
    {suffix:'Grand', upTo:2500000, mult:2.5, lvl:[70,130], lines:5, qty:[7000,14000], extraChance:0.75, extraDepth:6, extraChance2:0.25, toolMin:14, toolChance:0.006, armorChance:0.015}
  ],
  cacheMinChance:0.05, cacheMaxChance:0.75,
  unlockBoss:'forest_boss'   
};
SKILL_BOSSES.forEach(b => { b.chests = SKILL_BOSS.chestBands.map(cb => cb.suffix ? b.chest.replace(' Chest', ' ' + cb.suffix + ' Chest') : b.chest); });
function skillBossIndex(week){ const n = SKILL_BOSSES.length; const w = (week === undefined) ? worldBossWeek() : week; return ((w % n) + n) % n; }
function skillBossFor(week){ return SKILL_BOSSES[skillBossIndex(week)]; }
function swbChestFor(boss, dmg){
  const bands = SKILL_BOSS.chestBands, d = dmg || 0;
  let i = 0; while(i < bands.length - 1 && d >= bands[i].upTo) i++;
  const lo = i > 0 ? bands[i-1].upTo : 0, hi = bands[i].upTo;
  const t = Math.max(0, Math.min(1, (d - lo) / (hi - lo)));
  const chance = d <= 0 ? 0 : SKILL_BOSS.cacheMinChance + (SKILL_BOSS.cacheMaxChance - SKILL_BOSS.cacheMinChance) * t;
  const fallback = i > 0 ? {band:i-1, name:boss.chests[i-1], chance:SKILL_BOSS.cacheMaxChance} : null;
  return {band:i, name:boss.chests[i], chance, fallback};
}
return {bosses:SKILL_BOSSES,config:SKILL_BOSS,chest:swbChestFor,bossFor:skillBossFor,sourceHash:'c40c1faff7c34e04731225c365b91e9f5d8f6f5cfeae964356ab280cc324c4e5'};
})();
if(typeof module!=='undefined')module.exports=SkillBossSource;
