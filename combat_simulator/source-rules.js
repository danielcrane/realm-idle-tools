/* GENERATED from bundled Realm Idle 4.1.3.8. Run node tools/extract.cjs. */
(function(root){ 'use strict';
const CC_TIERS = [
  {at:5000,  key:'gather', label:'+5% Gathering Speed'},
  {at:10000, key:'prod',   label:'+5% Production Speed'},
  {at:15000, key:'xp',     label:'+5% All XP'},
  {at:20000, key:'drops',  label:'+5% Drop Rate'}
];
const RARITIES = [
  {tier:1,name:'Common',chance:0.55,mult:1.00,color:'#9d9d9d'},
  {tier:2,name:'Uncommon',chance:0.20,mult:1.10,color:'#1eff00'},
  {tier:3,name:'Rare',chance:0.10,mult:1.22,color:'#0070dd'},
  {tier:4,name:'Epic',chance:0.06,mult:1.35,color:'#a335ee'},
  {tier:5,name:'Legendary',chance:0.03,mult:1.50,color:'#ff8000'},
  {tier:6,name:'Mythic',chance:0.015,mult:1.67,color:'#e6cc80'},
  {tier:7,name:'Ancient',chance:0.007,mult:1.86,color:'#00cccc'},
  {tier:8,name:'Relic',chance:0.003,mult:2.07,color:'#cc6600'},
  {tier:9,name:'Abyss',chance:0.001,mult:2.30,color:'#6600cc'},
  {tier:10,name:'Cursed',chance:0.0005,mult:2.55,color:'#cc0066'},
  {tier:11,name:'Eldritch',chance:0.0002,mult:2.83,color:'#00cc99'},
  {tier:12,name:'Forgotten',chance:0.0001,mult:3.14,color:'#9999cc'},
  {tier:13,name:'Shadowbound',chance:0.00005,mult:3.48,color:'#4a4a6e'},
  {tier:14,name:'Hellforged',chance:0.00002,mult:3.86,color:'#ff3300'},
  {tier:15,name:'Godforged',chance:0.00001,mult:4.28,color:'#FFD700'},
  {tier:16,name:'Voidborn',chance:0.000005,mult:4.75,color:'#9966ff'},
  {tier:17,name:'Eternal',chance:0.000002,mult:5.28,color:'#ffffff'},
  {tier:18,name:'Divine',chance:0.0000015,mult:5.86,color:'#ffffcc'},
  {tier:19,name:'Celestial',chance:0.0000012,mult:6.50,color:'#99ccff'},
  {tier:20,name:'Transcendent',chance:0.000001,mult:7.20,color:'#ff99ff'},
  {tier:21,name:'Primordial',chance:0.0000005,mult:8.00,color:'#7fffd4'}
];
const EQUIPMENT = {
  
  'Chocolate Greataxe':{slot:'weapon',atk:111,str:25,twoHand:true},
  'Rose Crown':{slot:'helm',def:56,str:3},
  'Frozen Heart Pendant':{slot:'amulet',def:100},
  

  
  'Copper Sword':{slot:'weapon',atk:9,minHit:0.02,icon:'copper_sword'},'Copper Blade':{slot:'weapon',atk:13,str:2},'Copper Greatsword':{slot:'weapon',atk:20,str:4,twoHand:true},
  'Copper Helm':{slot:'helm',def:6,icon:'copper_helm'},
  'Copper Plate':{slot:'body',def:15,icon:'copper_plate'},'Copper Legs':{slot:'legs',def:11,icon:'copper_legs'},
  'Copper Shield':{slot:'shield',def:9,icon:'copper_shield'},'Copper Boots':{slot:'boots',def:3},
  
  'Iron Sword':{slot:'weapon',atk:20,minHit:0.03,icon:'iron_sword'},'Iron Blade':{slot:'weapon',atk:28,str:6},'Iron Greatsword':{slot:'weapon',atk:42,str:9,twoHand:true},
  'Iron Helm':{slot:'helm',def:13},
  'Iron Plate':{slot:'body',def:31},'Iron Legs':{slot:'legs',def:24},'Iron Shield':{slot:'shield',def:18},'Iron Boots':{slot:'boots',def:9},
  
  'Steel Sword':{slot:'weapon',atk:35,minHit:0.04},'Steel Blade':{slot:'weapon',atk:46,str:9},'Steel Greatsword':{slot:'weapon',atk:68,str:15,twoHand:true},
  'Steel Helm':{slot:'helm',def:24},
  'Steel Plate':{slot:'body',def:53},'Steel Legs':{slot:'legs',def:42},'Steel Shield':{slot:'shield',def:31},'Steel Boots':{slot:'boots',def:17},
  
  'Cobalt Sword':{slot:'weapon',atk:50,minHit:0.05},'Cobalt Blade':{slot:'weapon',atk:64,str:13},'Cobalt Greatsword':{slot:'weapon',atk:94,str:22,twoHand:true},
  'Cobalt Helm':{slot:'helm',def:35},
  'Cobalt Plate':{slot:'body',def:72},'Cobalt Legs':{slot:'legs',def:57},'Cobalt Shield':{slot:'shield',def:42},'Cobalt Boots':{slot:'boots',def:24},
  
  'Titanium Sword':{slot:'weapon',atk:68,minHit:0.06},'Titanium Blade':{slot:'weapon',atk:86,str:18},'Titanium Greatsword':{slot:'weapon',atk:127,str:31,twoHand:true},
  'Titanium Helm':{slot:'helm',def:50},
  'Titanium Plate':{slot:'body',def:97},'Titanium Legs':{slot:'legs',def:75},'Titanium Shield':{slot:'shield',def:57},'Titanium Boots':{slot:'boots',def:35},
  
  'Mythril Sword':{slot:'weapon',atk:105,minHit:0.07},'Mythril Blade':{slot:'weapon',atk:130,str:24},'Mythril Greatsword':{slot:'weapon',atk:182,str:44,twoHand:true},
  'Mythril Helm':{slot:'helm',def:79},
  'Mythril Plate':{slot:'body',def:149},'Mythril Legs':{slot:'legs',def:119},'Mythril Shield':{slot:'shield',def:90},'Mythril Boots':{slot:'boots',def:53},
  
  'Frost Sword':{slot:'weapon',atk:138,minHit:0.08},'Frost Blade':{slot:'weapon',atk:167,str:33},'Frost Greatsword':{slot:'weapon',atk:237,str:57,twoHand:true},
  'Frost Helm':{slot:'helm',def:108,str:9},
  'Frost Plate':{slot:'body',def:204,str:17},'Frost Legs':{slot:'legs',def:163,str:13},'Frost Shield':{slot:'shield',def:123,str:11},'Frost Boots':{slot:'boots',def:72,str:6},'Frost Gloves':{slot:'gloves',def:64,atk:9},

  
  'Abyssal Sword':{slot:'weapon',atk:195,minHit:0.1},'Abyssal Blade':{slot:'weapon',atk:238,str:48},'Abyssal Greatsword':{slot:'weapon',atk:338,str:82,twoHand:true},
  'Abyssal Helm':{slot:'helm',def:149,str:13},
  'Abyssal Plate':{slot:'body',def:282,str:24},'Abyssal Legs':{slot:'legs',def:225,str:19},'Abyssal Shield':{slot:'shield',def:170,str:16},'Abyssal Boots':{slot:'boots',def:99,str:9},'Abyssal Gloves':{slot:'gloves',def:88,atk:13},
  
  'Aeonsteel Sword':{slot:'weapon',atk:292,minHit:0.12},'Aeonsteel Blade':{slot:'weapon',atk:356,str:72},'Aeonsteel Greatsword':{slot:'weapon',atk:506,str:123,twoHand:true},
  'Aeonsteel Helm':{slot:'helm',def:220,str:19},
  'Aeonsteel Plate':{slot:'body',def:416,str:35},'Aeonsteel Legs':{slot:'legs',def:333,str:28},'Aeonsteel Shield':{slot:'shield',def:251,str:24},'Aeonsteel Boots':{slot:'boots',def:147,str:13},'Aeonsteel Gloves':{slot:'gloves',def:129,atk:19},
  
  'Short Bow':{slot:'weapon',rng:30,minHit:0.02,ranged:true,twoHand:true},      
  'Birch Bow':{slot:'weapon',rng:55,minHit:0.03,ranged:true,twoHand:true},      
  'Aspen Bow':{slot:'weapon',rng:75,minHit:0.04,ranged:true,twoHand:true},      
  'Redwood Bow':{slot:'weapon',rng:100,minHit:0.05,ranged:true,twoHand:true},    
  'Ebony Bow':{slot:'weapon',rng:140,minHit:0.06,ranged:true,twoHand:true},     
  'Elder Bow':{slot:'weapon',rng:185,minHit:0.07,ranged:true,twoHand:true},     
  'Frozen Bow':{slot:'weapon',rng:270,minHit:0.08,ranged:true,twoHand:true},    
  
  'Copper Arrows':{slot:'ammo',rngBonus:5},'Iron Arrows':{slot:'ammo',rngBonus:10},
  'Steel Arrows':{slot:'ammo',rngBonus:18},'Cobalt Arrows':{slot:'ammo',rngBonus:28},
  'Titanium Arrows':{slot:'ammo',rngBonus:42},'Mythril Arrows':{slot:'ammo',rngBonus:60},
  'Frost Arrows':{slot:'ammo',rngBonus:82},
  
  'Leather Hat':{slot:'helm',def:4,rng:2},'Leather Tunic':{slot:'body',def:11,rng:4},'Leather Pants':{slot:'legs',def:8,rng:3},
  'Leather Boots':{slot:'boots',def:2,rng:1},'Leather Gloves':{slot:'gloves',def:3,rng:1},
  
  'Reinforced Hat':{slot:'helm',def:9,rng:5},'Reinforced Tunic':{slot:'body',def:22,rng:8},'Reinforced Pants':{slot:'legs',def:17,rng:6},
  'Reinforced Boots':{slot:'boots',def:6,rng:3},'Reinforced Gloves':{slot:'gloves',def:6,rng:2},
  
  'Green Dragon Hat':{slot:'helm',def:17,rng:10},'Green Dragon Tunic':{slot:'body',def:37,rng:15},'Green Dragon Pants':{slot:'legs',def:29,rng:12},
  'Green Dragon Boots':{slot:'boots',def:12,rng:6},'Green Dragon Gloves':{slot:'gloves',def:10,rng:5},
  
  'Blue Dragon Hat':{slot:'helm',def:25,rng:16},'Blue Dragon Tunic':{slot:'body',def:50,rng:24},'Blue Dragon Pants':{slot:'legs',def:40,rng:18},
  'Blue Dragon Boots':{slot:'boots',def:17,rng:10},'Blue Dragon Gloves':{slot:'gloves',def:14,rng:8},
  
  'Red Dragon Hat':{slot:'helm',def:35,rng:24},'Red Dragon Tunic':{slot:'body',def:68,rng:35},'Red Dragon Pants':{slot:'legs',def:53,rng:28},
  'Red Dragon Boots':{slot:'boots',def:25,rng:15},'Red Dragon Gloves':{slot:'gloves',def:20,rng:12},
  
  'Black Dragon Hat':{slot:'helm',def:55,rng:35},'Black Dragon Tunic':{slot:'body',def:104,rng:50},'Black Dragon Pants':{slot:'legs',def:83,rng:40},
  'Black Dragon Boots':{slot:'boots',def:37,rng:22},'Black Dragon Gloves':{slot:'gloves',def:29,rng:18},
  
  'Frost Dragon Hat':{slot:'helm',def:76,rng:48},'Frost Dragon Tunic':{slot:'body',def:143,rng:68},'Frost Dragon Pants':{slot:'legs',def:114,rng:55},
  'Frost Dragon Boots':{slot:'boots',def:50,rng:30},'Frost Dragon Gloves':{slot:'gloves',def:45,rng:25},

  
  'Tidalscale Crossbow':{slot:'weapon',rng:380,minHit:0.1,ranged:true,twoHand:true},
  'Abyssal Arrows':{slot:'ammo',rngBonus:115},
  'Tidalscale Hat':{slot:'helm',def:104,rng:68},'Tidalscale Tunic':{slot:'body',def:197,rng:96},'Tidalscale Pants':{slot:'legs',def:158,rng:77},
  'Tidalscale Boots':{slot:'boots',def:69,rng:42},'Tidalscale Gloves':{slot:'gloves',def:62,rng:35},
  
  'Aeonscale Bow':{slot:'weapon',rng:569,minHit:0.12,ranged:true,twoHand:true},
  'Aeon Arrows':{slot:'ammo',rngBonus:172},
  
  
  
  
  
  'Runic Quiver':{slot:'shield',quiver:true,rangedMult:1.15},
  'Wraith Quiver':{slot:'shield',quiver:true,rangedMult:1.12,rangedScale:0.03},
  "Berserker's Sigil":{slot:'ammo',sigil:true,meleeMult:1.35,drPenalty:0.10},
  
  
  'Wraith Sigil':{slot:'ammo',sigil:true,meleeMult:1.32,meleeScale:0.033,drPenalty:0.10},
  
  
  
  'Wraith Rune':{slot:'ammo',rune:true,infinite:true,magicMult:1.40,magicScale:0.05},
  
  
  
  'Sapling Helm':{slot:'helm',skillOf:'woodcutting',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_treant',setTier:1},
  'Sapling Chestplate':{slot:'body',skillOf:'woodcutting',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_treant',setTier:1},
  'Sapling Leggings':{slot:'legs',skillOf:'woodcutting',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_treant',setTier:1},
  'Sapling Boots':{slot:'boots',skillOf:'woodcutting',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_treant',setTier:1},
  'Sapling Gloves':{slot:'gloves',skillOf:'woodcutting',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_treant',setTier:1},
  'Heartwood Helm':{slot:'helm',skillOf:'woodcutting',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_treant',setTier:2},
  'Heartwood Chestplate':{slot:'body',skillOf:'woodcutting',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_treant',setTier:2},
  'Heartwood Leggings':{slot:'legs',skillOf:'woodcutting',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_treant',setTier:2},
  'Heartwood Boots':{slot:'boots',skillOf:'woodcutting',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_treant',setTier:2},
  'Heartwood Gloves':{slot:'gloves',skillOf:'woodcutting',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_treant',setTier:2},
  'Elderwood Helm':{slot:'helm',skillOf:'woodcutting',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_treant',setTier:3},
  'Elderwood Chestplate':{slot:'body',skillOf:'woodcutting',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_treant',setTier:3},
  'Elderwood Leggings':{slot:'legs',skillOf:'woodcutting',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_treant',setTier:3},
  'Elderwood Boots':{slot:'boots',skillOf:'woodcutting',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_treant',setTier:3},
  'Elderwood Gloves':{slot:'gloves',skillOf:'woodcutting',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_treant',setTier:3},
  'Reef Helm':{slot:'helm',skillOf:'fishing',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_kraken',setTier:1},
  'Reef Chestplate':{slot:'body',skillOf:'fishing',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_kraken',setTier:1},
  'Reef Leggings':{slot:'legs',skillOf:'fishing',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_kraken',setTier:1},
  'Reef Boots':{slot:'boots',skillOf:'fishing',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_kraken',setTier:1},
  'Reef Gloves':{slot:'gloves',skillOf:'fishing',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_kraken',setTier:1},
  'Deepsea Helm':{slot:'helm',skillOf:'fishing',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_kraken',setTier:2},
  'Deepsea Chestplate':{slot:'body',skillOf:'fishing',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_kraken',setTier:2},
  'Deepsea Leggings':{slot:'legs',skillOf:'fishing',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_kraken',setTier:2},
  'Deepsea Boots':{slot:'boots',skillOf:'fishing',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_kraken',setTier:2},
  'Deepsea Gloves':{slot:'gloves',skillOf:'fishing',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_kraken',setTier:2},
  'Leviathan Helm':{slot:'helm',skillOf:'fishing',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_kraken',setTier:3},
  'Leviathan Chestplate':{slot:'body',skillOf:'fishing',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_kraken',setTier:3},
  'Leviathan Leggings':{slot:'legs',skillOf:'fishing',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_kraken',setTier:3},
  'Leviathan Boots':{slot:'boots',skillOf:'fishing',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_kraken',setTier:3},
  'Leviathan Gloves':{slot:'gloves',skillOf:'fishing',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_kraken',setTier:3},
  'Slate Helm':{slot:'helm',skillOf:'mining',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_golem',setTier:1},
  'Slate Chestplate':{slot:'body',skillOf:'mining',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_golem',setTier:1},
  'Slate Leggings':{slot:'legs',skillOf:'mining',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_golem',setTier:1},
  'Slate Boots':{slot:'boots',skillOf:'mining',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_golem',setTier:1},
  'Slate Gloves':{slot:'gloves',skillOf:'mining',skillSpeed:0.01,skillScale:0.006,treasureFind:0.01,treasureScale:0.006,bossSet:'skill_boss_golem',setTier:1},
  'Jade Helm':{slot:'helm',skillOf:'mining',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_golem',setTier:2},
  'Jade Chestplate':{slot:'body',skillOf:'mining',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_golem',setTier:2},
  'Jade Leggings':{slot:'legs',skillOf:'mining',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_golem',setTier:2},
  'Jade Boots':{slot:'boots',skillOf:'mining',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_golem',setTier:2},
  'Jade Gloves':{slot:'gloves',skillOf:'mining',skillSpeed:0.02,skillScale:0.008,treasureFind:0.02,treasureScale:0.008,bossSet:'skill_boss_golem',setTier:2},
  'Obsidian Helm':{slot:'helm',skillOf:'mining',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_golem',setTier:3},
  'Obsidian Chestplate':{slot:'body',skillOf:'mining',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_golem',setTier:3},
  'Obsidian Leggings':{slot:'legs',skillOf:'mining',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_golem',setTier:3},
  'Obsidian Boots':{slot:'boots',skillOf:'mining',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_golem',setTier:3},
  'Obsidian Gloves':{slot:'gloves',skillOf:'mining',skillSpeed:0.03,skillScale:0.010,treasureFind:0.03,treasureScale:0.010,bossSet:'skill_boss_golem',setTier:3},
  'Aeonscale Hat':{slot:'helm',def:154,rng:102},'Aeonscale Tunic':{slot:'body',def:291,rng:143},'Aeonscale Pants':{slot:'legs',def:233,rng:116},
  'Aeonscale Boots':{slot:'boots',def:103,rng:63},'Aeonscale Gloves':{slot:'gloves',def:90,rng:52},
  
  'Copper Gloves':{slot:'gloves',def:4},'Iron Gloves':{slot:'gloves',def:8},'Steel Gloves':{slot:'gloves',def:14},
  'Cobalt Gloves':{slot:'gloves',def:20},'Titanium Gloves':{slot:'gloves',def:28},'Mythril Gloves':{slot:'gloves',def:42},
  
  'Copper Ring':{slot:'ring1',atk:2,def:2,rng:3},'Iron Ring':{slot:'ring1',atk:4,def:4},'Gold Ring':{slot:'ring1',magic:6,def:4},
  'Ruby Ring':{slot:'ring1',atk:15,str:6},'Sapphire Ring':{slot:'ring1',def:10,magic:10},
  'Emerald Ring':{slot:'ring1',rng:15,def:10},'Diamond Ring':{slot:'ring1',atk:5,str:5,def:25},
  'Void Ring':{slot:'ring1',atk:25,str:15,def:10,rng:35,magic:35},
  'Infernal Ring':{slot:'ring1',atk:30,str:20,def:15},
  
  'Copper Amulet':{slot:'amulet',atk:3,def:2},'Iron Amulet':{slot:'amulet',atk:5,def:4},'Gold Amulet':{slot:'amulet',magic:8,def:5},
  'Ruby Amulet':{slot:'amulet',atk:18,str:8},'Sapphire Amulet':{slot:'amulet',def:12,magic:12},
  'Emerald Amulet':{slot:'amulet',rng:18,def:12},'Diamond Amulet':{slot:'amulet',atk:8,str:8,def:30},
  
  
  'Topaz Amulet':{slot:'amulet',prodSpeed:0.06,prodScale:0.015},
  'Amethyst Amulet':{slot:'amulet',gathSpeed:0.06,gathScale:0.015},
  'Pearl Ring':{slot:'ring1',skillXp:0.05,skillXpScale:0.0125},
  'Ancient Amulet':{slot:'amulet',rng:25,def:15,atk:10},
  'Void Heart':{slot:'amulet',atk:28,str:18,def:12,rng:40,magic:40},
  'Infernal Pendant':{slot:'amulet',atk:35,str:25,def:18},
  'Glacial Amulet':{slot:'amulet',atk:15,str:15,def:30,rng:40,magic:40,lifesteal:0.01},
  
  'Leather Cape':{slot:'cape',def:3},'Wool Cape':{slot:'cape',def:6,str:2},
  'Silk Cape':{slot:'cape',def:12,rng:5},'Shadow Cape':{slot:'cape',def:25,atk:10,str:8,rng:45,magic:45},
  'Infernal Cape':{slot:'cape',def:45,atk:20,str:15,lifesteal:0.005},
  'Frost Cape':{slot:'cape',def:62,atk:15,str:12,rng:58,magic:58},
  
  'Volcanic Whip':{slot:'weapon',atk:115,str:25,lifesteal:0.01,legendary:true},
  'Volcanic Wand':{slot:'weapon',magic:165,lifesteal:0.01,legendary:true},
  'Volcanic Crossbow':{slot:'weapon',rng:240,minHit:0.08,ranged:true,twoHand:true,lifesteal:0.01,legendary:true},
  'Chieftain Crown':{slot:'helm',def:18,atk:8,str:7,rng:15,magic:19},'Lich Crown':{slot:'helm',def:55,atk:12,str:10,rng:24,magic:30},
  'Void Heart':{slot:'amulet',atk:20,str:20,def:20,rng:20,magic:20},
  'Frost Ring':{slot:'ring1',atk:35,str:25,def:15,rng:48,magic:48},
  'Frozen Crown':{slot:'helm',def:125,atk:25,str:20,rng:35,magic:35},

  
  
  'Abyssal Ring':{slot:'ring1',atk:72,str:62,def:28},
  'Abyssal Amulet':{slot:'amulet',atk:52,str:52,def:42,lifesteal:0.02},
  'Abyssal Cape':{slot:'cape',def:95,atk:48,str:42},
  
  'Tidalscale Ring':{slot:'ring1',rng:92,def:22},
  'Tidalscale Amulet':{slot:'amulet',rng:78,def:35,lifesteal:0.02},
  'Tidalscale Cape':{slot:'cape',rng:105,def:72},
  
  'Abyssal Crown':{slot:'helm',def:175,atk:47,str:41,rng:88,magic:110},

  
  'Aeonsteel Ring':{slot:'ring1',atk:108,str:93,def:42},
  'Aeonsteel Amulet':{slot:'amulet',atk:78,str:78,def:63,lifesteal:0.02},
  'Aeonsteel Cape':{slot:'cape',def:142,atk:72,str:63},
  'Aeonscale Ring':{slot:'ring1',rng:138,def:33},
  'Aeonscale Amulet':{slot:'amulet',rng:117,def:52,lifesteal:0.02},
  'Aeonscale Cape':{slot:'cape',rng:157,def:108},
  'Relic Crown':{slot:'helm',def:262,atk:70,str:62,rng:132,magic:165},
  
  'Tidegrave':{slot:'weapon',atk:577,str:140,lifesteal:0.01,twoHand:true,legendary:true},
  'Wraithpiercer':{slot:'weapon',rng:649,minHit:0.12,ranged:true,twoHand:true,lifesteal:0.01,legendary:true},
  'Relicbrand Staff':{slot:'weapon',magic:768,twoHand:true,lifesteal:0.01,legendary:true},

  
  
  
  "Ashlyn's Greatsword":{slot:'weapon',atk:512,str:126,lifesteal:0.01,twoHand:true},
  "Ashlyn's Longbow":{slot:'weapon',rng:576,minHit:0.12,ranged:true,twoHand:true,lifesteal:0.01},
  "Ashlyn's Staff":{slot:'weapon',magic:682,twoHand:true,lifesteal:0.01},
  "Ashlyn's Crown":{slot:'helm',def:226,atk:70,str:60,rng:108,magic:134},
  "Ashlyn's Cuirass":{slot:'body',def:424,str:37},
  "Ashlyn's Greaves":{slot:'legs',def:340,str:30},
  "Ashlyn's Gauntlets":{slot:'gloves',def:133,atk:20},
  "Ashlyn's Boots":{slot:'boots',def:151,str:14},
  
  "Ashlyn's Jerkin":{slot:'body',def:298,rng:151},
  "Ashlyn's Chaps":{slot:'legs',def:239,rng:123},
  "Ashlyn's Bracers":{slot:'gloves',def:93,rng:55},
  "Ashlyn's Hunting Boots":{slot:'boots',def:106,rng:67},
  
  "Ashlyn's Robe":{slot:'body',def:362,magic:174},
  "Ashlyn's Silk Pants":{slot:'legs',def:290,magic:130},
  "Ashlyn's Silk Gloves":{slot:'gloves',def:113,magic:71},
  "Ashlyn's Silk Boots":{slot:'boots',def:128,magic:71},

  'Apprentice Staff':{slot:'weapon',magic:33,twoHand:true},
  'Apprentice Tome':{slot:'shield',def:5,magic:6},
  'Apprentice Hood':{slot:'helm',def:5,magic:3},
  'Apprentice Robe':{slot:'body',def:13,magic:6},
  'Apprentice Pants':{slot:'legs',def:9,magic:4},
  'Apprentice Boots':{slot:'boots',def:3,magic:2},
  'Apprentice Gloves':{slot:'gloves',def:3,magic:2},
  'Apprentice Cape':{slot:'cape',def:4,magic:3},
  'Adept Staff':{slot:'weapon',magic:55,twoHand:true},
  'Adept Tome':{slot:'shield',def:10,magic:12},
  'Adept Hood':{slot:'helm',def:11,magic:7},
  'Adept Robe':{slot:'body',def:26,magic:11},
  'Adept Pants':{slot:'legs',def:20,magic:8},
  'Adept Boots':{slot:'boots',def:8,magic:4},
  'Adept Gloves':{slot:'gloves',def:7,magic:4},
  'Adept Cape':{slot:'cape',def:8,magic:6},
  'Mage Staff':{slot:'weapon',magic:88,twoHand:true},
  'Mage Tome':{slot:'shield',def:21,magic:20},
  'Mage Hood':{slot:'helm',def:20,magic:14},
  'Mage Robe':{slot:'body',def:45,magic:19},
  'Mage Pants':{slot:'legs',def:36,magic:14},
  'Mage Boots':{slot:'boots',def:14,magic:7},
  'Mage Gloves':{slot:'gloves',def:12,magic:7},
  'Mage Cape':{slot:'cape',def:16,magic:10},
  'Sorcerer Staff':{slot:'weapon',magic:128,twoHand:true},
  'Sorcerer Tome':{slot:'shield',def:28,magic:30},
  'Sorcerer Hood':{slot:'helm',def:30,magic:21},
  'Sorcerer Robe':{slot:'body',def:61,magic:28},
  'Sorcerer Pants':{slot:'legs',def:48,magic:21},
  'Sorcerer Boots':{slot:'boots',def:20,magic:11},
  'Sorcerer Gloves':{slot:'gloves',def:17,magic:11},
  'Sorcerer Cape':{slot:'cape',def:26,magic:16},
  'Warlock Staff':{slot:'weapon',magic:175,twoHand:true},
  'Warlock Tome':{slot:'shield',def:48,magic:42},
  'Warlock Hood':{slot:'helm',def:43,magic:31},
  'Warlock Robe':{slot:'body',def:82,magic:40},
  'Warlock Pants':{slot:'legs',def:64,magic:30},
  'Warlock Boots':{slot:'boots',def:30,magic:16},
  'Warlock Gloves':{slot:'gloves',def:24,magic:16},
  'Warlock Cape':{slot:'cape',def:38,magic:23},
  'Archmage Staff':{slot:'weapon',magic:240,twoHand:true},
  'Archmage Tome':{slot:'shield',def:60,magic:58},
  'Archmage Hood':{slot:'helm',def:67,magic:44},
  'Archmage Robe':{slot:'body',def:127,magic:56},
  'Archmage Pants':{slot:'legs',def:101,magic:42},
  'Archmage Boots':{slot:'boots',def:45,magic:23},
  'Archmage Gloves':{slot:'gloves',def:36,magic:23},
  'Archmage Cape':{slot:'cape',def:52,magic:32},
  
  'Frostweave Staff':{slot:'weapon',magic:320,twoHand:true},
  'Frostweave Tome':{slot:'shield',def:78,magic:80},
  'Frostweave Hood':{slot:'helm',def:92,magic:60},
  'Frostweave Robe':{slot:'body',def:173,magic:78},
  'Frostweave Pants':{slot:'legs',def:139,magic:58},
  'Frostweave Boots':{slot:'boots',def:61,magic:32},
  'Frostweave Gloves':{slot:'gloves',def:54,magic:32},
  'Frostweave Cape':{slot:'cape',def:72,magic:44},

  
  'Abyssweave Staff':{slot:'weapon',magic:450,twoHand:true},
  'Abyssweave Wand':{slot:'weapon',magic:255},
  'Abyssweave Tome':{slot:'shield',def:110,magic:112},
  'Abyssweave Hood':{slot:'helm',def:127,magic:85},
  'Abyssweave Robe':{slot:'body',def:240,magic:110},
  'Abyssweave Pants':{slot:'legs',def:191,magic:82},
  'Abyssweave Boots':{slot:'boots',def:84,magic:45},
  'Abyssweave Gloves':{slot:'gloves',def:75,magic:45},
  'Abyssweave Ring':{slot:'ring1',magic:92,def:22},
  'Abyssweave Amulet':{slot:'amulet',magic:78,def:35,lifesteal:0.02},
  'Abyssweave Cape':{slot:'cape',magic:105,def:72},
  
  'Aeonweave Staff':{slot:'weapon',magic:674,twoHand:true},
  'Aeonweave Wand':{slot:'weapon',magic:382},
  'Aeonweave Tome':{slot:'shield',def:163,magic:168},
  'Aeonweave Hood':{slot:'helm',def:187,magic:127},
  'Aeonweave Robe':{slot:'body',def:354,magic:165},
  'Aeonweave Pants':{slot:'legs',def:283,magic:123},
  'Aeonweave Boots':{slot:'boots',def:125,magic:67},
  'Aeonweave Gloves':{slot:'gloves',def:110,magic:67},
  'Aeonweave Ring':{slot:'ring1',magic:138,def:33},
  'Aeonweave Amulet':{slot:'amulet',magic:117,def:52,lifesteal:0.02},
  'Aeonweave Cape':{slot:'cape',magic:157,def:108},


  
  'Apprentice Wand':{slot:'weapon',magic:14},
  'Adept Wand':{slot:'weapon',magic:30},
  'Mage Wand':{slot:'weapon',magic:50},
  'Sorcerer Wand':{slot:'weapon',magic:70},
  'Warlock Wand':{slot:'weapon',magic:94},
  'Archmage Wand':{slot:'weapon',magic:140},
  'Frostweave Wand':{slot:'weapon',magic:180},



  
  
  'Spark':{slot:'ammo',magicMult:1.02},
  'Fire Bolt':{slot:'ammo',magicMult:1.03},
  'Ice Shard':{slot:'ammo',magicMult:1.04},
  'Lightning Strike':{slot:'ammo',magicMult:1.05},
  
  'Flame Wave':{slot:'ammo',magicMult:1.06},
  'Frost Nova':{slot:'ammo',magicMult:1.07},
  'Chain Lightning':{slot:'ammo',magicMult:1.08},
  'Inferno':{slot:'ammo',magicMult:1.09},
  'Blizzard':{slot:'ammo',magicMult:1.10},
  
  'Thunder Storm':{slot:'ammo',magicMult:1.14},
  'Meteor':{slot:'ammo',magicMult:1.15},
  'Glacial Spike':{slot:'ammo',magicMult:1.16},
  'Arc Surge':{slot:'ammo',magicMult:1.18},
  
  'Pyroclasm':{slot:'ammo',magicMult:1.20},
  'Frozen Orb':{slot:'ammo',magicMult:1.22},
  'Plasma Bolt':{slot:'ammo',magicMult:1.24},
  'Flame Tempest':{slot:'ammo',magicMult:1.26},
  'Absolute Zero':{slot:'ammo',magicMult:1.28},
  
  'Voltaic Barrage':{slot:'ammo',magicMult:1.30},
  'Dragon Fire':{slot:'ammo',magicMult:1.33},
  'Glacial Fury':{slot:'ammo',magicMult:1.37},
  'Void Bolt':{slot:'ammo',magicMult:1.40},
  
  'Cataclysm':{slot:'ammo',magicMult:1.43},
  'Celestial Storm':{slot:'ammo',magicMult:1.46},
  'Armageddon':{slot:'ammo',magicMult:1.48},
  'Oblivion':{slot:'ammo',magicMult:1.50},
  'Tidal Surge':{slot:'ammo',magicMult:1.52},
  'Abyssal Wave':{slot:'ammo',magicMult:1.54},
  'Soul Rend':{slot:'ammo',magicMult:1.56},
  'Depth Collapse':{slot:'ammo',magicMult:1.59},
  'Abyssal Annihilation':{slot:'ammo',magicMult:1.61},
  'Wraith Torrent':{slot:'ammo',magicMult:1.66},
  'Drowned Cataclysm':{slot:'ammo',magicMult:1.72},
  'Spark Rune':     {slot:'ammo',magicMult:1.02,infinite:true},
  'Fire Rune':      {slot:'ammo',magicMult:1.03,infinite:true},
  'Ice Rune':       {slot:'ammo',magicMult:1.04,infinite:true},
  'Storm Rune':     {slot:'ammo',magicMult:1.05,infinite:true},
  'Flame Rune':     {slot:'ammo',magicMult:1.06,infinite:true},
  'Frost Rune':     {slot:'ammo',magicMult:1.07,infinite:true},
  'Chain Rune':     {slot:'ammo',magicMult:1.08,infinite:true},
  'Inferno Rune':   {slot:'ammo',magicMult:1.09,infinite:true},
  'Blizzard Rune':  {slot:'ammo',magicMult:1.10,infinite:true},
  'Thunder Rune':   {slot:'ammo',magicMult:1.14,infinite:true},
  'Dragonfire Rune':{slot:'ammo',magicMult:1.33,infinite:true},
  'Frost Covenant Rune': {slot:'ammo',magicMult:1.20,infinite:true}
};
const MONSTERS = {
  meadow:[
    {id:'chicken',name:'Chicken',level:1,hp:17,atk:2,str:2,def:1,xp:7,gold:[0,2],icon:'chicken',drops:[{item:'Feathers',c:1,q:[4,8]},{item:'Bones',c:1,q:[1,1]},{item:'Raw Chicken',c:1,q:[1,1]}]},
    {id:'rat',name:'Giant Rat',level:3,hp:30,atk:3,str:4,def:2,xp:9,gold:[2,6],icon:'rat',drops:[{item:'Bones',c:1,q:[1,1]},{item:'Rat Tail',c:0.4,q:[1,1]},{item:'Copper Ore',c:0.15,q:[1,2]},{item:'Leather Boots',c:0.02,q:[1,1]},{item:'Copper Boots',c:0.015,q:[1,1]},{item:'Apprentice Boots',c:0.015,q:[1,1]}]},
    {id:'cow',name:'Cow',level:6,hp:53,atk:7,str:8,def:4,xp:12,gold:[6,15],icon:'cow',drops:[{item:'Hide',c:1,q:[1,1]},{item:'Big Bones',c:1,q:[1,1]},{item:'Copper Boots',c:0.03,q:[1,1]},{item:'Leather Hat',c:0.02,q:[1,1]},{item:'Copper Gloves',c:0.015,q:[1,1]},{item:'Leather Gloves',c:0.02,q:[1,1]},{item:'Apprentice Gloves',c:0.015,q:[1,1]}]},
    {id:'goblin',name:'Goblin',level:12,hp:86,atk:13,str:18,def:7,xp:14,gold:[14,32],icon:'goblin',drops:[{item:'Bones',c:1,q:[1,2]},{item:'Hide',c:0.12,q:[1,1]},{item:'Copper Bar',c:0.03,q:[1,2]},{item:'Bowstring',c:0.65,q:[1,2]},{item:'Copper Blade',c:0.03,q:[1,1]},{item:'Copper Helm',c:0.02,q:[1,1]},{item:'Short Bow',c:0.02,q:[1,1]},{item:'Copper Gloves',c:0.02,q:[1,1]},{item:'Leather Gloves',c:0.02,q:[1,1]},{item:'Copper Amulet',c:0.01,q:[1,1]},{item:'Copper Ring',c:0.01,q:[1,1]},{item:'Apprentice Hood',c:0.015,q:[1,1]},{item:'Copper Axe',c:0.0015,q:[1,1]}]},
    {id:'bandit',name:'Bandit',level:20,hp:119,atk:22,str:26,def:12,xp:17,gold:[22,48],icon:'bandit',drops:[{item:'Big Bones',c:1,q:[1,1]},{item:'Hide',c:0.22,q:[1,2]},{item:'Iron Ore',c:0.18,q:[1,2]},{item:'Cloth',c:0.35,q:[1,3]},{item:'Iron Sword',c:0.02,q:[1,1]},{item:'Copper Arrows',c:0.08,q:[5,15]},{item:'Iron Boots',c:0.02,q:[1,1]},{item:'Apprentice Wand',c:0.015,q:[1,1]},{item:'Iron Helm',c:0.02,q:[1,1]},{item:'Reinforced Hat',c:0.015,q:[1,1]},{item:'Leather Tunic',c:0.02,q:[1,1]},{item:'Iron Ring',c:0.01,q:[1,1]},{item:'Iron Shield',c:0.018,q:[1,1]},{item:'Copper Pick',c:0.0015,q:[1,1]}]},
    {id:'scorpion',name:'Scorpion',level:22,hp:141,atk:26,str:32,def:16,xp:21,gold:[28,58],icon:'scorpion',drops:[{item:'Venom',c:0.55,q:[1,4]},{item:'Raw Scorpion Meat',c:1,q:[1,1]},{item:'Iron Ore',c:0.12,q:[1,3]},{item:'Iron Gloves',c:0.02,q:[1,1]},{item:'Leather Pants',c:0.02,q:[1,1]},{item:'Apprentice Robe',c:0.015,q:[1,1]},{item:'Iron Legs',c:0.018,q:[1,1]},{item:'Apprentice Pants',c:0.015,q:[1,1]}]},
    {id:'guard',name:'Guard',level:28,hp:182,atk:35,str:41,def:22,xp:27,gold:[38,78],icon:'guard',drops:[{item:'Big Bones',c:1,q:[1,2]},{item:'Iron Bar',c:0.06,q:[1,2]},{item:'Iron Blade',c:0.02,q:[1,1]},{item:'Iron Arrows',c:0.06,q:[5,15]},{item:'Iron Shield',c:0.02,q:[1,1]},{item:'Iron Legs',c:0.02,q:[1,1]},{item:'Iron Amulet',c:0.01,q:[1,1]},{item:'Birch Bow',c:0.02,q:[1,1]},{item:'Apprentice Tome',c:0.015,q:[1,1]},{item:'Reinforced Tunic',c:0.015,q:[1,1]},{item:'Apprentice Pants',c:0.012,q:[1,1]},{item:'Leather Cape',c:0.015,q:[1,1]},{item:'Iron Plate',c:0.018,q:[1,1]}]},
    {id:'meadow_boss',name:'Goblin Chieftain',level:35,hp:495,atk:55,str:50,def:42,xp:45,gold:[110,245],icon:'boss_meadow',boss:true,drops:[{item:'Chieftain Crown',c:0.01,q:[1,1]},{item:'Big Bones',c:1,q:[3,5]},{item:'Copper Bar',c:0.05,q:[3,7]},{item:'Iron Bar',c:0.08,q:[3,5]},{item:'Iron Greatsword',c:0.04,q:[1,1]},{item:'Apprentice Staff',c:0.03,q:[1,1]},{item:'Birch Bow',c:0.03,q:[1,1]},{item:'Iron Plate',c:0.02,q:[1,1]},{item:'Apprentice Hood',c:0.025,q:[1,1]},{item:'Gold Amulet',c:0.01,q:[1,1]},{item:'Reinforced Hat',c:0.025,q:[1,1]},{item:'Iron Helm',c:0.03,q:[1,1]},{item:'Apprentice Robe',c:0.02,q:[1,1]},{item:'Reinforced Tunic',c:0.02,q:[1,1]},{item:'Iron Arrows',c:0.15,q:[10,25]},{item:'Gold Ring',c:0.02,q:[1,1]}]}
  ],
  forest:[
    {id:'spider',name:'Giant Spider',level:38,hp:384,atk:66,str:82,def:38,xp:23,gold:[75,145],icon:'spider',drops:[{item:'Bowstring',c:0.65,q:[1,3]},{item:'Venom',c:0.4,q:[1,2]},{item:'Coal',c:0.25,q:[1,3]},{item:'Steel Arrows',c:0.05,q:[5,15]},{item:'Reinforced Boots',c:0.02,q:[1,1]},{item:'Adept Gloves',c:0.015,q:[1,1]},{item:'Steel Boots',c:0.018,q:[1,1]},{item:'Green Dragon Boots',c:0.015,q:[1,1]},{item:'Adept Boots',c:0.015,q:[1,1]}]},
    {id:'young_dragon',name:'Young Dragon',level:42,hp:576,atk:82,str:98,def:48,xp:30,gold:[120,220],icon:'young_dragon',drops:[{item:'Young Dragon Bones',c:1,q:[1,2]},{item:'Ember Core',c:0.05,q:[1,2]},{item:'Raw Young Dragon Meat',c:0.8,q:[1,1]},{item:'Glyphstone',c:0.18,q:[58,124]},{item:'Hide',c:0.5,q:[2,4]},{item:'Steel Boots',c:0.02,q:[1,1]},{item:'Adept Hood',c:0.015,q:[1,1]},{item:'Ruby Amulet',c:0.01,q:[1,1]},{item:'Reinforced Hat',c:0.02,q:[1,1]},{item:'Steel Gloves',c:0.018,q:[1,1]},{item:'Green Dragon Gloves',c:0.015,q:[1,1]}]},
    {id:'wolf',name:'Dire Wolf',level:46,hp:528,atk:90,str:110,def:52,xp:31,gold:[110,195],icon:'wolf',drops:[{item:'Wolf Pelt',c:0.58,q:[1,2]},{item:'Mossy Bones',c:1,q:[1,2]},{item:'Steel Sword',c:0.02,q:[1,1]},{item:'Steel Arrows',c:0.05,q:[5,15]},{item:'Aspen Bow',c:0.02,q:[1,1]},{item:'Steel Gloves',c:0.02,q:[1,1]},{item:'Reinforced Tunic',c:0.015,q:[1,1]},{item:'Ruby Ring',c:0.008,q:[1,1]},{item:'Steel Shield',c:0.018,q:[1,1]},{item:'Green Dragon Hat',c:0.015,q:[1,1]}]},
    {id:'orc',name:'Orc Warrior',level:52,hp:648,atk:106,str:130,def:62,xp:39,gold:[135,245],icon:'orc',drops:[{item:'Mossy Bones',c:1,q:[1,2]},{item:'Wolf Pelt',c:0.16,q:[1,1]},{item:'Steel Bar',c:0.04,q:[1,3]},{item:'Steel Blade',c:0.02,q:[1,1]},{item:'Adept Wand',c:0.015,q:[1,1]},{item:'Steel Arrows',c:0.06,q:[5,15]},{item:'Steel Legs',c:0.02,q:[1,1]},{item:'Adept Pants',c:0.015,q:[1,1]},{item:'Reinforced Gloves',c:0.02,q:[1,1]},{item:'Wool Cape',c:0.01,q:[1,1]},{item:'Green Dragon Pants',c:0.015,q:[1,1]},{item:'Steel Helm',c:0.018,q:[1,1]},{item:'Steel Axe',c:0.0015,q:[1,1]}]},
    {id:'green_dragon',name:'Green Dragon',level:57,hp:900,atk:114,str:142,def:72,xp:46,gold:[175,315],icon:'green_dragon',drops:[{item:'Small Dragon Bones',c:1,q:[2,3]},{item:'Green Dragonhide',c:1,q:[1,2]},{item:'Ember Core',c:0.1,q:[1,3]},{item:'Raw Small Dragon Meat',c:0.6,q:[1,2]},{item:'Glyphstone',c:0.18,q:[81,172]},{item:'Green Dragon Gloves',c:0.02,q:[1,1]},{item:'Sapphire Amulet',c:0.01,q:[1,1]},{item:'Green Dragon Tunic',c:0.015,q:[1,1]},{item:'Adept Robe',c:0.015,q:[1,1]},{item:'Green Dragon Pants',c:0.018,q:[1,1]},{item:'Steel Plate',c:0.018,q:[1,1]},{item:'Adept Hood',c:0.015,q:[1,1]}]},
    {id:'troll',name:'Forest Troll',level:60,hp:822,atk:122,str:150,def:75,xp:49,gold:[165,285],icon:'troll',drops:[{item:'Giant Bone',c:1,q:[1,2]},{item:'Troll Hide',c:0.35,q:[1,2]},{item:'Cobalt Ore',c:0.12,q:[1,2]},{item:'Steel Greatsword',c:0.02,q:[1,1]},{item:'Cobalt Arrows',c:0.04,q:[5,15]},{item:'Steel Helm',c:0.02,q:[1,1]},{item:'Ruby Amulet',c:0.01,q:[1,1]},{item:'Mage Wand',c:0.015,q:[1,1]},{item:'Steel Shield',c:0.02,q:[1,1]},{item:'Adept Tome',c:0.015,q:[1,1]},{item:'Sapphire Ring',c:0.008,q:[1,1]},{item:'Green Dragon Hat',c:0.015,q:[1,1]},{item:'Cobalt Axe',c:0.001,q:[1,1]}]},
    {id:'forest_boss',name:'Moss Giant Elder',level:68,hp:1500,atk:144,str:150,def:92,xp:110,gold:[315,490],icon:'boss_forest',boss:true,drops:[{item:'Ancient Seed',c:0.15,q:[1,1]},{item:'Giant Bone',c:1,q:[3,5]},{item:'Steel Bar',c:0.08,q:[5,10]},{item:'Cobalt Bar',c:0.02,q:[2,4]},{item:'Cobalt Blade',c:0.03,q:[1,1]},{item:'Redwood Bow',c:0.03,q:[1,1]},{item:'Mage Staff',c:0.025,q:[1,1]},{item:'Cobalt Arrows',c:0.12,q:[10,25]},{item:'Steel Plate',c:0.02,q:[1,1]},{item:'Green Dragon Tunic',c:0.02,q:[1,1]},{item:'Mage Robe',c:0.02,q:[1,1]},{item:'Cobalt Boots',c:0.03,q:[1,1]},{item:'Green Dragon Boots',c:0.02,q:[1,1]},{item:'Mage Boots',c:0.02,q:[1,1]},{item:'Emerald Ring',c:0.02,q:[1,1]},{item:'Silk Cape',c:0.015,q:[1,1]}]}
  ],
  dungeon:[
    {id:'skeleton',name:'Skeleton',level:65,hp:1196,atk:146,str:166,def:78,xp:62,gold:[205,375],icon:'skeleton',drops:[{item:'Ancient Bone',c:1,q:[2,4]},{item:'Cobalt Ore',c:0.15,q:[1,2]},{item:'Cobalt Sword',c:0.02,q:[1,1]},{item:'Cobalt Arrows',c:0.05,q:[5,15]},{item:'Cobalt Helm',c:0.02,q:[1,1]},{item:'Mage Hood',c:0.015,q:[1,1]},{item:'Cobalt Gloves',c:0.02,q:[1,1]},{item:'Cobalt Boots',c:0.018,q:[1,1]},{item:'Blue Dragon Boots',c:0.015,q:[1,1]},{item:'Sorcerer Boots',c:0.015,q:[1,1]},{item:'Cobalt Pick',c:0.001,q:[1,1]}]},
    {id:'zombie',name:'Zombie',level:68,hp:1463,atk:159,str:179,def:72,xp:68,gold:[235,415],icon:'zombie',drops:[{item:'Ancient Bone',c:1,q:[1,3]},{item:'Rotten Flesh',c:0.4,q:[1,2]},{item:'Cobalt Bar',c:0.01,q:[1,2]},{item:'Emerald Amulet',c:0.01,q:[1,1]},{item:'Cobalt Boots',c:0.02,q:[1,1]},{item:'Blue Dragon Boots',c:0.015,q:[1,1]},{item:'Sorcerer Boots',c:0.015,q:[1,1]},{item:'Green Dragon Tunic',c:0.01,q:[1,1]},{item:'Mage Robe',c:0.01,q:[1,1]},{item:'Cobalt Shield',c:0.018,q:[1,1]},{item:'Blue Dragon Gloves',c:0.015,q:[1,1]},{item:'Sorcerer Gloves',c:0.015,q:[1,1]}]},
    {id:'blue_dragon',name:'Blue Dragon',level:72,hp:1671,atk:179,str:211,def:92,xp:78,gold:[265,475],icon:'blue_dragon',drops:[{item:'Small Dragon Bones',c:1,q:[2,4]},{item:'Blue Dragonhide',c:1,q:[1,2]},{item:'Glyphstone',c:0.22,q:[115,208]},{item:'Ember Core',c:0.2,q:[1,3]},{item:'Raw Small Dragon Meat',c:0.5,q:[1,2]},{item:'Cobalt Arrows',c:0.05,q:[5,15]},{item:'Blue Dragon Gloves',c:0.02,q:[1,1]},{item:'Sorcerer Gloves',c:0.015,q:[1,1]},{item:'Cobalt Boots',c:0.018,q:[1,1]},{item:'Blue Dragon Hat',c:0.015,q:[1,1]},{item:'Sorcerer Hood',c:0.015,q:[1,1]}]},
    {id:'ghost',name:'Restless Ghost',level:72,hp:1736,atk:172,str:159,def:68,xp:65,gold:[225,395],icon:'ghost',drops:[{item:'Ectoplasm',c:0.7,q:[1,3]},{item:'Sorcerer Wand',c:0.015,q:[1,1]},{item:'Blue Dragon Hat',c:0.015,q:[1,1]},{item:'Emerald Amulet',c:0.01,q:[1,1]},{item:'Sorcerer Hood',c:0.012,q:[1,1]},{item:'Cobalt Gloves',c:0.018,q:[1,1]},{item:'Cobalt Legs',c:0.018,q:[1,1]}]},
    {id:'vampire',name:'Vampire',level:78,hp:1846,atk:198,str:192,def:95,xp:87,gold:[305,545],icon:'vampire',drops:[{item:'Vital Essence',c:0.45,q:[1,2]},{item:'Ancient Bone',c:1,q:[2,4]},{item:'Cobalt Ore',c:0.15,q:[1,2]},{item:'Cobalt Blade',c:0.02,q:[1,1]},{item:'Redwood Bow',c:0.02,q:[1,1]},{item:'Sapphire Amulet',c:0.01,q:[1,1]},{item:'Cobalt Arrows',c:0.05,q:[5,15]},{item:'Blue Dragon Boots',c:0.015,q:[1,1]},{item:'Blue Dragon Tunic',c:0.012,q:[1,1]},{item:'Sorcerer Pants',c:0.01,q:[1,1]},{item:'Cobalt Legs',c:0.018,q:[1,1]},{item:'Blue Dragon Pants',c:0.015,q:[1,1]},{item:'Cobalt Shield',c:0.018,q:[1,1]}]},
    {id:'demon',name:'Lesser Demon',level:81,hp:2002,atk:211,str:211,def:102,xp:97,gold:[335,605],icon:'demon',drops:[{item:'Demon Ash',c:0.4,q:[1,3]},{item:'Hellfire Bone',c:1,q:[1,2]},{item:'Cobalt Bar',c:0.03,q:[1,2]},{item:'Cobalt Greatsword',c:0.02,q:[1,1]},{item:'Cobalt Arrows',c:0.05,q:[5,15]},{item:'Cobalt Plate',c:0.02,q:[1,1]},{item:'Blue Dragon Tunic',c:0.012,q:[1,1]},{item:'Sorcerer Robe',c:0.015,q:[1,1]},{item:'Cobalt Helm',c:0.018,q:[1,1]},{item:'Cobalt Legs',c:0.018,q:[1,1]}]},
    {id:'dungeon_boss',name:'Lich King',level:85,hp:2925,atk:241,str:231,def:122,xp:190,gold:[465,785],icon:'boss_dungeon',boss:true,drops:[{item:'Lich Crown',c:0.01,q:[1,1]},{item:'Hellfire Bone',c:1,q:[4,8]},{item:'Cobalt Bar',c:0.05,q:[3,6]},{item:'Cobalt Blade',c:0.03,q:[1,1]},{item:'Redwood Bow',c:0.025,q:[1,1]},{item:'Sorcerer Staff',c:0.02,q:[1,1]},{item:'Cobalt Arrows',c:0.1,q:[10,25]},{item:'Cobalt Boots',c:0.03,q:[1,1]},{item:'Blue Dragon Hat',c:0.02,q:[1,1]},{item:'Sorcerer Hood',c:0.025,q:[1,1]},{item:'Sorcerer Tome',c:0.02,q:[1,1]},{item:'Cobalt Gloves',c:0.03,q:[1,1]},{item:'Blue Dragon Gloves',c:0.025,q:[1,1]},{item:'Diamond Ring',c:0.015,q:[1,1]},{item:'Diamond Amulet',c:0.01,q:[1,1]},{item:'Cobalt Helm',c:0.025,q:[1,1]},{item:'Cobalt Plate',c:0.02,q:[1,1]},{item:'Cobalt Legs',c:0.02,q:[1,1]},{item:'Cobalt Shield',c:0.02,q:[1,1]}]}
  ],
    shadowlands:[
    {id:'wraith',name:'Shadow Wraith',level:78,hp:2324,atk:207,str:203,def:85,xp:97,gold:[255,475],icon:'wraith',drops:[{item:'Shadow Essence',c:0.55,q:[1,3]},{item:'Giant Bone',c:0.6,q:[1,2]},{item:'Titanium Ore',c:0.15,q:[1,2]},{item:'Shadowsteel Ore',c:0.12,q:[1,1]},{item:'Titanium Arrows',c:0.04,q:[5,15]},{item:'Titanium Boots',c:0.02,q:[1,1]},{item:'Warlock Hood',c:0.015,q:[1,1]},{item:'Shadow Cape',c:0.01,q:[1,1]},{item:'Red Dragon Boots',c:0.015,q:[1,1]},{item:'Warlock Boots',c:0.015,q:[1,1]}]},
    {id:'shade',name:'Void Shade',level:82,hp:2450,atk:221,str:203,def:95,xp:109,gold:[295,545],icon:'shade',drops:[{item:'Void Crystal',c:0.3,q:[1,2]},{item:'Giant Bone',c:0.6,q:[1,2]},{item:'Titanium Bar',c:0.01,q:[1,2]},{item:'Titanium Sword',c:0.02,q:[1,1]},{item:'Titanium Arrows',c:0.04,q:[5,15]},{item:'Warlock Wand',c:0.015,q:[1,1]},{item:'Titanium Shield',c:0.02,q:[1,1]},{item:'Warlock Tome',c:0.015,q:[1,1]},{item:'Diamond Ring',c:0.008,q:[1,1]},{item:'Titanium Gloves',c:0.018,q:[1,1]},{item:'Red Dragon Gloves',c:0.015,q:[1,1]},{item:'Warlock Gloves',c:0.015,q:[1,1]}]},
    {id:'red_dragon',name:'Red Dragon',level:84,hp:2548,atk:245,str:269,def:115,xp:141,gold:[415,705],icon:'red_dragon',drops:[{item:'Dragon Bones',c:1,q:[2,4]},{item:'Red Dragonhide',c:1,q:[1,2]},{item:'Ember Core',c:0.4,q:[1,3]},{item:'Raw Dragon Meat',c:0.4,q:[2,3]},{item:'Glyphstone',c:0.3,q:[145,259]},{item:'Ebony Bow',c:0.02,q:[1,1]},{item:'Titanium Arrows',c:0.04,q:[5,15]},{item:'Warlock Staff',c:0.015,q:[1,1]},{item:'Red Dragon Gloves',c:0.02,q:[1,1]},{item:'Warlock Gloves',c:0.015,q:[1,1]},{item:'Red Dragon Tunic',c:0.015,q:[1,1]},{item:'Red Dragon Hat',c:0.015,q:[1,1]},{item:'Titanium Helm',c:0.018,q:[1,1]}]},
    {id:'shadow_knight',name:'Dark Knight',level:85,hp:2681,atk:235,str:235,def:108,xp:129,gold:[375,675],icon:'shadow_knight',drops:[{item:'Hellfire Bone',c:1,q:[1,3]},{item:'Shadowsteel Ore',c:0.25,q:[1,2]},{item:'Titanium Blade',c:0.02,q:[1,1]},{item:'Titanium Arrows',c:0.04,q:[5,15]},{item:'Diamond Amulet',c:0.01,q:[1,1]},{item:'Titanium Legs',c:0.02,q:[1,1]},{item:'Red Dragon Pants',c:0.012,q:[1,1]},{item:'Warlock Pants',c:0.015,q:[1,1]},{item:'Titanium Gloves',c:0.02,q:[1,1]},{item:'Titanium Plate',c:0.018,q:[1,1]},{item:'Red Dragon Tunic',c:0.015,q:[1,1]},{item:'Warlock Robe',c:0.015,q:[1,1]}]},
    {id:'nightmare',name:'Nightmare',level:86,hp:2870,atk:249,str:241,def:98,xp:121,gold:[345,635],icon:'nightmare',drops:[{item:'Shadow Essence',c:0.6,q:[2,4]},{item:'Ectoplasm',c:0.4,q:[1,2]},{item:'Void Crystal',c:0.2,q:[1,1]},{item:'Warlock Robe',c:0.015,q:[1,1]},{item:'Titanium Arrows',c:0.04,q:[5,15]},{item:'Void Ring',c:0.005,q:[1,1]},{item:'Warlock Hood',c:0.015,q:[1,1]},{item:'Red Dragon Hat',c:0.015,q:[1,1]}]},
    {id:'soul_devourer',name:'Soul Devourer',level:87,hp:3031,atk:258,str:249,def:105,xp:137,gold:[405,715],icon:'soul_devourer',drops:[{item:'Shadow Essence',c:0.7,q:[2,5]},{item:'Vital Essence',c:0.5,q:[1,3]},{item:'Shadowsteel Ore',c:0.18,q:[1,2]},{item:'Warlock Wand',c:0.015,q:[1,1]},{item:'Red Dragon Tunic',c:0.012,q:[1,1]},{item:'Red Dragon Pants',c:0.015,q:[1,1]},{item:'Warlock Pants',c:0.015,q:[1,1]},{item:'Titanium Boots',c:0.018,q:[1,1]}]},
    {id:'abyss_walker',name:'Abyss Walker',level:88,hp:3192,atk:269,str:263,def:115,xp:155,gold:[465,835],icon:'abyss_walker',drops:[{item:'Void Crystal',c:0.4,q:[1,3]},{item:'Shadow Essence',c:0.8,q:[3,6]},{item:'Shadowsteel Ore',c:0.22,q:[1,2]},{item:'Titanium Arrows',c:0.04,q:[5,15]},{item:'Titanium Boots',c:0.02,q:[1,1]},{item:'Red Dragon Boots',c:0.015,q:[1,1]},{item:'Warlock Boots',c:0.015,q:[1,1]},{item:'Shadow Cape',c:0.015,q:[1,1]},{item:'Titanium Legs',c:0.018,q:[1,1]},{item:'Titanium Shield',c:0.018,q:[1,1]}]},
    {id:'shadow_boss',name:'Voidspawn',level:94,hp:4690,atk:417,str:406,def:145,xp:317,gold:[945,1625],icon:'boss_shadow',boss:true,drops:[{item:'Void Heart',c:0.01,q:[1,1]},{item:'Hellfire Bone',c:1,q:[5,10]},{item:'Shadow Essence',c:1,q:[8,15]},{item:'Void Crystal',c:0.6,q:[3,6]},{item:'Titanium Bar',c:0.03,q:[2,4]},{item:'Titanium Greatsword',c:0.03,q:[1,1]},{item:'Ebony Bow',c:0.03,q:[1,1]},{item:'Warlock Staff',c:0.02,q:[1,1]},{item:'Titanium Arrows',c:0.1,q:[10,25]},{item:'Titanium Boots',c:0.02,q:[1,1]},{item:'Red Dragon Hat',c:0.018,q:[1,1]},{item:'Warlock Hood',c:0.018,q:[1,1]},{item:'Warlock Tome',c:0.018,q:[1,1]},{item:'Red Dragon Gloves',c:0.018,q:[1,1]},{item:'Void Ring',c:0.02,q:[1,1]},{item:'Titanium Helm',c:0.02,q:[1,1]},{item:'Titanium Plate',c:0.02,q:[1,1]},{item:'Red Dragon Tunic',c:0.018,q:[1,1]},{item:'Warlock Robe',c:0.018,q:[1,1]}]}
  ],
  volcano:[
    {id:'fire_elem',name:'Fire Elemental',level:91,hp:4328,atk:293,str:293,def:105,xp:145,gold:[425,775],icon:'fire_elem',drops:[{item:'Ember Core',c:0.5,q:[1,3]},{item:'Hellfire Bone',c:0.5,q:[1,2]},{item:'Mythril Ore',c:0.15,q:[1,2]},{item:'Mythril Arrows',c:0.04,q:[5,15]},{item:'Mythril Boots',c:0.02,q:[1,1]},{item:'Archmage Hood',c:0.015,q:[1,1]},{item:'Black Dragon Boots',c:0.015,q:[1,1]},{item:'Archmage Boots',c:0.015,q:[1,1]},{item:'Mythril Gloves',c:0.018,q:[1,1]}]},
    {id:'lava_golem',name:'Lava Golem',level:92,hp:4425,atk:303,str:297,def:135,xp:169,gold:[495,905],icon:'lava_golem',drops:[{item:'Molten Core',c:0.35,q:[1,2]},{item:'Hellfire Bone',c:0.6,q:[1,3]},{item:'Mythril Ore',c:0.2,q:[1,2]},{item:'Mythril Sword',c:0.02,q:[1,1]},{item:'Mythril Arrows',c:0.04,q:[5,15]},{item:'Archmage Wand',c:0.015,q:[1,1]},{item:'Mythril Shield',c:0.02,q:[1,1]},{item:'Archmage Tome',c:0.015,q:[1,1]},{item:'Black Dragon Gloves',c:0.015,q:[1,1]},{item:'Archmage Gloves',c:0.015,q:[1,1]},{item:'Mythril Helm',c:0.018,q:[1,1]}]},
    {id:'black_dragon',name:'Black Dragon',level:93,hp:4568,atk:357,str:378,def:152,xp:237,gold:[695,1185],icon:'black_dragon',drops:[{item:'Dragon Bones',c:1,q:[3,5]},{item:'Black Dragonhide',c:1,q:[1,3]},{item:'Ember Core',c:0.5,q:[1,3]},{item:'Raw Dragon Meat',c:0.3,q:[2,4]},{item:'Glyphstone',c:0.35,q:[187,285]},{item:'Mythril Arrows',c:0.04,q:[5,15]},{item:'Mythril Legs',c:0.02,q:[1,1]},{item:'Black Dragon Pants',c:0.015,q:[1,1]},{item:'Archmage Pants',c:0.015,q:[1,1]},{item:'Black Dragon Gloves',c:0.02,q:[1,1]},{item:'Archmage Gloves',c:0.015,q:[1,1]},{item:'Black Dragon Hat',c:0.015,q:[1,1]},{item:'Archmage Hood',c:0.015,q:[1,1]},{item:'Mythril Plate',c:0.018,q:[1,1]}]},
    {id:'magma_serpent',name:'Magma Serpent',level:96,hp:4620,atk:333,str:318,def:122,xp:197,gold:[595,1085],icon:'magma_serpent',drops:[{item:'Molten Core',c:0.45,q:[1,3]},{item:'Ember Core',c:0.6,q:[2,4]},{item:'Mythril Ore',c:0.18,q:[1,2]},{item:'Mythril Blade',c:0.02,q:[1,1]},{item:'Mythril Arrows',c:0.04,q:[5,15]},{item:'Archmage Staff',c:0.015,q:[1,1]},{item:'Black Dragon Tunic',c:0.015,q:[1,1]},{item:'Archmage Robe',c:0.015,q:[1,1]},{item:'Mythril Shield',c:0.018,q:[1,1]}]},
    {id:'phoenix',name:'Phoenix',level:97,hp:4538,atk:342,str:333,def:128,xp:209,gold:[635,1145],icon:'phoenix',drops:[{item:'Phoenix Feather',c:0.25,q:[1,2]},{item:'Hellfire Bone',c:0.7,q:[2,4]},{item:'Eternal Ember',c:0.1,q:[1,1]},{item:'Mythril Bar',c:0.012,q:[1,2]},{item:'Mythril Blade',c:0.02,q:[1,1]},{item:'Mythril Arrows',c:0.04,q:[5,15]},{item:'Mythril Helm',c:0.02,q:[1,1]},{item:'Black Dragon Hat',c:0.015,q:[1,1]},{item:'Archmage Hood',c:0.015,q:[1,1]},{item:'Infernal Pendant',c:0.008,q:[1,1]},{item:'Black Dragon Tunic',c:0.015,q:[1,1]},{item:'Archmage Robe',c:0.015,q:[1,1]}]},
    {id:'inferno_titan',name:'Inferno Titan',level:98,hp:4770,atk:378,str:368,def:148,xp:261,gold:[795,1445],icon:'inferno_titan',drops:[{item:'Molten Core',c:0.55,q:[2,4]},{item:'Eternal Ember',c:0.15,q:[1,2]},{item:'Hellfire Bone',c:0.8,q:[3,5]},{item:'Mythril Greatsword',c:0.02,q:[1,1]},{item:'Mythril Arrows',c:0.04,q:[5,15]},{item:'Mythril Gloves',c:0.02,q:[1,1]},{item:'Black Dragon Tunic',c:0.012,q:[1,1]},{item:'Archmage Robe',c:0.012,q:[1,1]},{item:'Infernal Cape',c:0.008,q:[1,1]},{item:'Mythril Plate',c:0.018,q:[1,1]},{item:'Mythril Legs',c:0.018,q:[1,1]}]},
    {id:'ash_demon',name:'Ash Demon',level:99,hp:4853,atk:398,str:357,def:138,xp:241,gold:[715,1285],icon:'ash_demon',drops:[{item:'Eternal Ember',c:0.2,q:[1,2]},{item:'Vital Essence',c:0.4,q:[2,4]},{item:'Hellfire Bone',c:0.9,q:[2,5]},{item:'Mythril Shield',c:0.02,q:[1,1]},{item:'Mythril Arrows',c:0.04,q:[5,15]},{item:'Black Dragon Hat',c:0.02,q:[1,1]},{item:'Archmage Hood',c:0.02,q:[1,1]},{item:'Black Dragon Pants',c:0.018,q:[1,1]},{item:'Infernal Ring',c:0.008,q:[1,1]},{item:'Archmage Pants',c:0.018,q:[1,1]},{item:'Archmage Tome',c:0.015,q:[1,1]}]},
    {id:'volcano_boss',name:'Infernal Lord',level:103,hp:7575,atk:591,str:570,def:165,xp:625,gold:[1885,3075],icon:'boss_volcano',boss:true,drops:[{item:'Volcanic Whip',c:0.02,q:[1,1]},{item:'Volcanic Wand',c:0.02,q:[1,1]},{item:'Volcanic Crossbow',c:0.02,q:[1,1]},{item:'Dragon Bones',c:1,q:[6,10]},{item:'Eternal Ember',c:0.5,q:[2,4]},{item:'Mythril Bar',c:0.03,q:[2,5]},{item:'Mythril Greatsword',c:0.03,q:[1,1]},{item:'Archmage Staff',c:0.025,q:[1,1]},{item:'Mythril Arrows',c:0.12,q:[15,30]},{item:'Mythril Plate',c:0.02,q:[1,1]},{item:'Black Dragon Tunic',c:0.02,q:[1,1]},{item:'Archmage Robe',c:0.02,q:[1,1]},{item:'Black Dragon Hat',c:0.018,q:[1,1]},{item:'Archmage Hood',c:0.018,q:[1,1]},{item:'Archmage Cape',c:0.012,q:[1,1]},{item:'Infernal Cape',c:0.015,q:[1,1]},{item:'Mythril Helm',c:0.02,q:[1,1]},{item:'Mythril Legs',c:0.02,q:[1,1]},{item:'Mythril Shield',c:0.02,q:[1,1]},{item:'Black Dragon Boots',c:0.018,q:[1,1]},{item:'Archmage Boots',c:0.018,q:[1,1]},{item:'Infernal Pendant',c:0.02,q:[1,1]},{item:'Infernal Ring',c:0.02,q:[1,1]}]}
  ],
  frostlands:[
    {id:'ice_wolf',name:'Frost Wolf',level:101,hp:7360,atk:472,str:456,def:175,xp:650,gold:[1950,3175],icon:'ice_wolf',drops:[{item:'Frozen Pelt',c:0.8,q:[1,3]},{item:'Frost Bone',c:1,q:[2,4]},{item:'Mythril Arrows',c:0.05,q:[5,15]},{item:'Frost Gloves',c:0.02,q:[1,1]},{item:'Frost Dragonhide',c:0.15,q:[1,1]},{item:'Frost Boots',c:0.018,q:[1,1]},{item:'Frost Dragon Boots',c:0.015,q:[1,1]},{item:'Frostweave Boots',c:0.015,q:[1,1]}]},
    {id:'ice_elemental',name:'Ice Elemental',level:102,hp:7760,atk:504,str:488,def:185,xp:725,gold:[2175,3525],icon:'ice_elemental',drops:[{item:'Frozen Core',c:0.6,q:[1,3]},{item:'Frost Bone',c:0.7,q:[1,3]},{item:'Frost Arrows',c:0.04,q:[5,15]},{item:'Frostweave Hood',c:0.015,q:[1,1]},{item:'Frostweave Gloves',c:0.015,q:[1,1]},{item:'Frost Dragon Gloves',c:0.015,q:[1,1]}]},
    {id:'yeti',name:'Frozen Yeti',level:104,hp:8400,atk:536,str:520,def:198,xp:800,gold:[2400,3900],icon:'yeti',drops:[{item:'Frozen Pelt',c:1,q:[2,4]},{item:'Frost Bone',c:1,q:[2,5]},{item:'Glacial Bar',c:0.02,q:[1,2]},{item:'Frost Sword',c:0.02,q:[1,1]},{item:'Frost Boots',c:0.02,q:[1,1]},{item:'Frost Shield',c:0.018,q:[1,1]},{item:'Frost Dragon Hat',c:0.015,q:[1,1]},{item:'Frostweave Hood',c:0.015,q:[1,1]}]},
    {id:'frost_giant',name:'Frost Giant',level:106,hp:9096,atk:573,str:557,def:212,xp:885,gold:[2655,4305],icon:'frost_giant',drops:[{item:'Giant Frost Bone',c:1,q:[3,5]},{item:'Frozen Core',c:0.5,q:[2,4]},{item:'Frost Greatsword',c:0.025,q:[1,1]},{item:'Frost Shield',c:0.02,q:[1,1]},{item:'Frost Helm',c:0.02,q:[1,1]},{item:'Frost Legs',c:0.018,q:[1,1]},{item:'Frost Dragon Pants',c:0.015,q:[1,1]},{item:'Frostweave Pants',c:0.015,q:[1,1]},{item:'Frozen Bow',c:0.018,q:[1,1]}]},
    {id:'ice_dragon',name:'Frost Dragon',level:108,hp:9896,atk:616,str:600,def:228,xp:975,gold:[2925,4725],icon:'ice_dragon',drops:[{item:'Frost Dragon Bones',c:1,q:[3,6]},{item:'Frost Dragonhide',c:1,q:[2,4]},{item:'Frozen Bow',c:0.03,q:[1,1]},{item:'Raw Frost Dragon Meat',c:0.5,q:[2,4]},{item:'Frost Arrows',c:0.05,q:[10,20]},{item:'Ember Core',c:1,q:[1,3]},{item:'Glyphstone',c:0.45,q:[267,395]},{item:'Frost Dragon Gloves',c:0.02,q:[1,1]},{item:'Frost Dragon Hat',c:0.018,q:[1,1]},{item:'Frost Dragon Pants',c:0.018,q:[1,1]}]},
    {id:'blizzard_wraith',name:'Blizzard Wraith',level:109,hp:9416,atk:648,str:616,def:215,xp:1050,gold:[3150,5100],icon:'blizzard_wraith',drops:[{item:'Frozen Essence',c:0.7,q:[2,5]},{item:'Frost Bone',c:0.8,q:[2,4]},{item:'Glacial Crystal',c:0.25,q:[1,2]},{item:'Ice Shard',c:0.3,q:[2,8]},{item:'Frostweave Staff',c:0.015,q:[1,1]},{item:'Frostweave Hood',c:0.018,q:[1,1]},{item:'Frostweave Robe',c:0.015,q:[1,1]},{item:'Frostweave Pants',c:0.015,q:[1,1]},{item:'Frostweave Cape',c:0.012,q:[1,1]},{item:'Frost Dragon Hat',c:0.015,q:[1,1]}]},
    {id:'ice_golem',name:'Glacial Golem',level:111,hp:10696,atk:696,str:680,def:245,xp:1175,gold:[3525,5625],icon:'ice_golem',drops:[{item:'Glacial Core',c:0.4,q:[1,2]},{item:'Frozen Heart Pendant',c:0.005,q:[1,1]},{item:'Giant Frost Bone',c:0.9,q:[3,6]},{item:'Frost Blade',c:0.02,q:[1,1]},{item:'Frost Legs',c:0.02,q:[1,1]},{item:'Frostweave Pants',c:0.015,q:[1,1]},{item:'Frost Plate',c:0.018,q:[1,1]},{item:'Frost Dragon Tunic',c:0.015,q:[1,1]},{item:'Frost Helm',c:0.018,q:[1,1]},{item:'Frozen Bow',c:0.018,q:[1,1]}]},
    {id:'ice_lich',name:'Frozen Lich',level:113,hp:10056,atk:744,str:696,def:235,xp:1265,gold:[3795,6075],icon:'ice_lich',drops:[{item:'Frozen Essence',c:0.8,q:[3,6]},{item:'Glacial Crystal',c:0.35,q:[1,3]},{item:'Frost Bone',c:1,q:[3,5]},{item:'Frostweave Wand',c:0.018,q:[1,1]},{item:'Frostweave Tome',c:0.015,q:[1,1]},{item:'Frost Dragon Hat',c:0.015,q:[1,1]},{item:'Frost Ring',c:0.01,q:[1,1]},{item:'Frostweave Gloves',c:0.015,q:[1,1]},{item:'Frostweave Cape',c:0.012,q:[1,1]}]},
    {id:'frost_boss',name:'Frozen Overlord',level:115,hp:14000,atk:856,str:792,def:275,xp:1850,gold:[5550,8850],icon:'boss_frost',boss:true,drops:[{item:'Frozen Crown',c:0.001,q:[1,1]},{item:'Frost Dragon Bones',c:1,q:[8,12]},{item:'Glacial Crystal',c:0.7,q:[4,8]},{item:'Frozen Essence',c:1,q:[10,18]},{item:'Glacial Bar',c:0.03,q:[1,3]},{item:'Frost Greatsword',c:0.035,q:[1,1]},{item:'Frozen Bow',c:0.03,q:[1,1]},{item:'Frostweave Staff',c:0.025,q:[1,1]},{item:'Frost Arrows',c:0.15,q:[20,40]},{item:'Frost Plate',c:0.025,q:[1,1]},{item:'Frost Dragon Tunic',c:0.02,q:[1,1]},{item:'Frostweave Robe',c:0.02,q:[1,1]},{item:'Frost Helm',c:0.02,q:[1,1]},{item:'Frost Dragon Hat',c:0.02,q:[1,1]},{item:'Frostweave Hood',c:0.02,q:[1,1]},{item:'Frost Cape',c:0.018,q:[1,1]},{item:'Frost Ring',c:0.015,q:[1,1]},{item:'Glacial Amulet',c:0.005,q:[1,1]},{item:'Frost Legs',c:0.02,q:[1,1]},{item:'Frost Dragon Pants',c:0.018,q:[1,1]},{item:'Frostweave Pants',c:0.018,q:[1,1]},{item:'Frost Shield',c:0.02,q:[1,1]},{item:'Frost Boots',c:0.02,q:[1,1]},{item:'Frost Dragon Boots',c:0.018,q:[1,1]},{item:'Frostweave Boots',c:0.018,q:[1,1]},{item:'Frost Gloves',c:0.02,q:[1,1]},{item:'Frost Dragon Gloves',c:0.018,q:[1,1]},{item:'Frostweave Gloves',c:0.018,q:[1,1]},{item:'Frostweave Cape',c:0.015,q:[1,1]}]}
  ],
  abyssal:[
    {id:'siltjaw',name:'Siltjaw',level:131,hp:16000,atk:1000,str:680,def:420,xp:2800,gold:[8400,13600],icon:'siltjaw',drops:[{item:'Abyssal Scale',c:0.9,q:[2,4]},{item:'Abyssal Bone',c:1,q:[2,4]},{item:'Abyssalite Ore',c:0.15,q:[1,2]},{item:'Abyssal Boots',c:0.018,q:[1,1]},{item:'Abyssal Gloves',c:0.015,q:[1,1]},{item:'Tidalscale Hat',c:0.015,q:[1,1]},{item:'Abyssweave Pants',c:0.015,q:[1,1]}]},
    {id:'abyssal_ray',name:'Abyssal Ray',level:132,hp:17200,atk:1060,str:710,def:445,xp:3050,gold:[9150,14850],icon:'abyssal_ray',drops:[{item:'Abyssal Scale',c:0.8,q:[2,4]},{item:'Deep Crystal',c:0.5,q:[1,2]},{item:'Tidalscale Gloves',c:0.015,q:[1,1]},{item:'Abyssweave Hood',c:0.015,q:[1,1]},{item:'Abyssal Helm',c:0.015,q:[1,1]}]},
    {id:'depth_stalker',name:'Depth Stalker',level:133,hp:18400,atk:1120,str:740,def:465,xp:3300,gold:[9900,16100],icon:'depth_stalker',drops:[{item:'Abyssal Bone',c:1,q:[2,5]},{item:'Deep Shard',c:0.35,q:[1,2]},{item:'Abyssalite Ore',c:0.2,q:[1,2]},{item:'Abyssal Sword',c:0.02,q:[1,1]},{item:'Abyssal Arrows',c:0.05,q:[5,15]},{item:'Abyssal Legs',c:0.018,q:[1,1]},{item:'Tidalscale Boots',c:0.015,q:[1,1]},{item:'Abyssweave Gloves',c:0.015,q:[1,1]}]},
    {id:'deepfin_shark',name:'Deepfin Shark',level:134,hp:19800,atk:1185,str:775,def:490,xp:3600,gold:[10800,17400],icon:'deepfin_shark',drops:[{item:'Abyssal Scale',c:1,q:[3,5]},{item:'Raw Deepfin Meat',c:0.6,q:[2,4]},{item:'Deep Crystal',c:0.4,q:[1,2]},{item:'Abyssalite Bar',c:0.01,q:[1,1]},{item:'Abyssal Blade',c:0.02,q:[1,1]},{item:'Tidalscale Pants',c:0.015,q:[1,1]},{item:'Abyssweave Boots',c:0.015,q:[1,1]},{item:'Abyssal Ring',c:0.006,q:[1,1]}]},
    {id:'lurking_horror',name:'Lurking Horror',level:135,hp:21000,atk:1255,str:810,def:510,xp:3900,gold:[11700,18900],icon:'lurking_horror',drops:[{item:'Deep Shard',c:0.5,q:[1,3]},{item:'Abyssal Bone',c:1,q:[3,6]},{item:'Abyssal Shield',c:0.018,q:[1,1]},{item:'Tidalscale Hat',c:0.015,q:[1,1]},{item:'Tidalscale Pants',c:0.015,q:[1,1]},{item:'Abyssweave Robe',c:0.015,q:[1,1]},{item:'Tidalscale Ring',c:0.006,q:[1,1]}]},
    {id:'razorjaw_eel',name:'Razorjaw Eel',level:136,hp:22400,atk:1320,str:845,def:530,xp:4200,gold:[12600,20400],icon:'razorjaw_eel',drops:[{item:'Raw Razorjaw Meat',c:0.7,q:[2,4]},{item:'Abyssal Scale',c:0.9,q:[2,5]},{item:'Deep Crystal',c:0.45,q:[1,3]},{item:'Abyssal Greatsword',c:0.02,q:[1,1]},{item:'Abyssal Legs',c:0.015,q:[1,1]},{item:'Tidalscale Tunic',c:0.015,q:[1,1]},{item:'Abyssweave Hood',c:0.015,q:[1,1]},{item:'Abyssweave Pants',c:0.015,q:[1,1]},{item:'Abyssweave Ring',c:0.006,q:[1,1]}]},
    {id:'void_banshee',name:'Void Banshee',level:137,hp:23200,atk:1425,str:860,def:545,xp:4370,gold:[13100,21200],icon:'void_banshee',drops:[{item:'Deep Crystal',c:0.7,q:[2,4]},{item:'Abyssweave Amulet',c:0.005,q:[1,1]},{item:'Abyssal Bone',c:1,q:[2,5]},{item:'Abyssalite Ore',c:0.22,q:[1,2]},{item:'Abyssweave Staff',c:0.018,q:[1,1]},{item:'Abyssweave Hood',c:0.016,q:[1,1]},{item:'Abyssweave Robe',c:0.016,q:[1,1]},{item:'Abyssweave Ring',c:0.006,q:[1,1]}]},
    {id:'crushclaw_crab',name:'Crushclaw Crab',level:138,hp:24000,atk:1390,str:880,def:560,xp:4550,gold:[13650,22050],icon:'crushclaw_crab',drops:[{item:'Abyssal Bone',c:1,q:[3,6]},{item:'Deep Shard',c:0.6,q:[2,4]},{item:'Abyssalite Ore',c:0.25,q:[1,2]},{item:'Abyssal Blade',c:0.018,q:[1,1]},{item:'Abyssal Arrows',c:0.05,q:[5,15]},{item:'Abyssal Helm',c:0.018,q:[1,1]},{item:'Tidalscale Boots',c:0.015,q:[1,1]},{item:'Tidalscale Gloves',c:0.015,q:[1,1]},{item:'Abyssweave Gloves',c:0.015,q:[1,1]},{item:'Abyssal Amulet',c:0.005,q:[1,1]}]},
    {id:'tidewitch',name:'Tidewitch',level:139,hp:24800,atk:1490,str:930,def:570,xp:4720,gold:[14150,22850],icon:'tidewitch',drops:[{item:'Abyssal Scale',c:0.8,q:[2,5]},{item:'Deep Shard',c:0.65,q:[2,4]},{item:'Abyssalite Bar',c:0.012,q:[1,1]},{item:'Tidalscale Crossbow',c:0.018,q:[1,1]},{item:'Tidalscale Tunic',c:0.016,q:[1,1]},{item:'Tidalscale Pants',c:0.016,q:[1,1]},{item:'Tidalscale Amulet',c:0.005,q:[1,1]}]},
    {id:'coral_fiend',name:'Coral Fiend',level:140,hp:25600,atk:1460,str:915,def:580,xp:4900,gold:[14700,23700],icon:'coral_fiend',drops:[{item:'Deep Shard',c:0.7,q:[2,5]},{item:'Deep Crystal',c:0.55,q:[1,3]},{item:'Abyssalite Bar',c:0.015,q:[1,2]},{item:'Abyssweave Wand',c:0.015,q:[1,1]},{item:'Abyssweave Tome',c:0.015,q:[1,1]},{item:'Abyssal Plate',c:0.018,q:[1,1]},{item:'Tidalscale Pants',c:0.015,q:[1,1]},{item:'Abyssweave Robe',c:0.015,q:[1,1]},{item:'Tidalscale Amulet',c:0.005,q:[1,1]},{item:'Abyssweave Amulet',c:0.005,q:[1,1]}]},
    {id:'abyssal_siren',name:'Abyssal Siren',level:141,hp:26400,atk:1510,str:940,def:590,xp:5100,gold:[15300,24600],icon:'abyssal_siren',drops:[{item:'Deep Crystal',c:0.65,q:[2,4]},{item:'Deep Shard',c:0.75,q:[2,5]},{item:'Abyssalite Bar',c:0.018,q:[1,2]},{item:'Abyssal Blade',c:0.016,q:[1,1]},{item:'Abyssal Plate',c:0.018,q:[1,1]},{item:'Abyssweave Wand',c:0.016,q:[1,1]},{item:'Abyssal Cape',c:0.01,q:[1,1]},{item:'Abyssweave Cape',c:0.01,q:[1,1]},{item:'Abyssweave Amulet',c:0.006,q:[1,1]}]},
    {id:'abyssal_angler',name:'Abyssal Angler',level:142,hp:27200,atk:1530,str:950,def:600,xp:5300,gold:[15900,25500],icon:'abyssal_angler',drops:[{item:'Raw Abyssal Angler',c:0.5,q:[1,2]},{item:'Deep Shard',c:0.8,q:[3,6]},{item:'Deep Crystal',c:0.6,q:[2,4]},{item:'Abyssalite Bar',c:0.02,q:[1,2]},{item:'Abyssweave Staff',c:0.015,q:[1,1]},{item:'Abyssal Shield',c:0.018,q:[1,1]},{item:'Abyssal Cape',c:0.01,q:[1,1]},{item:'Tidalscale Cape',c:0.01,q:[1,1]},{item:'Abyssweave Cape',c:0.01,q:[1,1]},{item:'Abyssal Amulet',c:0.006,q:[1,1]},{item:'Tidalscale Ring',c:0.006,q:[1,1]}]},
    {id:'abyssal_boss',name:'Drowned Colossus',level:160,hp:42000,atk:1950,str:1200,def:720,xp:9500,gold:[28500,45500],icon:'abyssal_boss',boss:true,drops:[{item:'Abyssal Crown',c:0.001,q:[1,1]},{item:'Tome of Abyssal Knowledge',c:0.00004,q:[1,1]},{item:'Pet Whistle (1 day)',c:0.0002,q:[1,1]},{item:'Pet Whistle (7 days)',c:0.00002,q:[1,1]},{item:'Colossus Bone',c:1,q:[10,16]},{item:'Deep Crystal',c:0.8,q:[5,10]},{item:'Deep Shard',c:1,q:[12,20]},{item:'Abyssalite Bar',c:0.04,q:[2,5]},{item:'Abyssal Greatsword',c:0.035,q:[1,1]},{item:'Tidalscale Crossbow',c:0.03,q:[1,1]},{item:'Abyssweave Staff',c:0.025,q:[1,1]},{item:'Abyssal Arrows',c:0.05,q:[25,50]},{item:'Abyssal Plate',c:0.02,q:[1,1]},{item:'Abyssal Helm',c:0.02,q:[1,1]},{item:'Abyssal Legs',c:0.02,q:[1,1]},{item:'Abyssal Shield',c:0.018,q:[1,1]},{item:'Abyssal Boots',c:0.018,q:[1,1]},{item:'Abyssal Gloves',c:0.018,q:[1,1]},{item:'Abyssal Ring',c:0.012,q:[1,1]},{item:'Abyssal Amulet',c:0.008,q:[1,1]},{item:'Abyssal Cape',c:0.012,q:[1,1]},{item:'Tidalscale Tunic',c:0.02,q:[1,1]},{item:'Tidalscale Hat',c:0.02,q:[1,1]},{item:'Tidalscale Pants',c:0.018,q:[1,1]},{item:'Tidalscale Boots',c:0.018,q:[1,1]},{item:'Tidalscale Gloves',c:0.018,q:[1,1]},{item:'Tidalscale Ring',c:0.012,q:[1,1]},{item:'Tidalscale Amulet',c:0.008,q:[1,1]},{item:'Tidalscale Cape',c:0.012,q:[1,1]},{item:'Abyssweave Robe',c:0.02,q:[1,1]},{item:'Abyssweave Hood',c:0.02,q:[1,1]},{item:'Abyssweave Pants',c:0.018,q:[1,1]},{item:'Abyssweave Boots',c:0.018,q:[1,1]},{item:'Abyssweave Gloves',c:0.018,q:[1,1]},{item:'Abyssweave Ring',c:0.012,q:[1,1]},{item:'Abyssweave Amulet',c:0.008,q:[1,1]},{item:'Abyssweave Cape',c:0.012,q:[1,1]}]}
  ],
  ruins:[
    {id:'stone_warden',name:'Stone Warden',level:146,hp:54000,atk:2070,str:1415,def:760,xp:9790,gold:[29200,47300],icon:'stone_warden',drops:[{item:'Aeon Scale',c:0.9,q:[2,4]},{item:'Ruin Bone',c:1,q:[2,4]},{item:'Aeonite Ore',c:0.15,q:[1,2]},{item:'Relic Shard',c:0.2,q:[1,2]},{item:'Aeonsteel Greatsword',c:0.012,q:[1,1]},{item:'Aeonsteel Shield',c:0.014,q:[1,1]},{item:'Aeonsteel Boots',c:0.018,q:[1,1]},{item:'Aeonsteel Gloves',c:0.015,q:[1,1]},{item:'Aeonsteel Helm',c:0.012,q:[1,1]},{item:'Aeonscale Hat',c:0.015,q:[1,1]},{item:'Aeonweave Pants',c:0.015,q:[1,1]},{item:'Aeonsteel Amulet',c:0.005,q:[1,1]}]},
    {id:'tomb_eel',name:'Tomb Eel',level:148,hp:58000,atk:2210,str:1485,def:805,xp:10680,gold:[31900,51600],icon:'tomb_eel',drops:[{item:'Aeon Scale',c:0.8,q:[2,4]},{item:'Raw Relicfin',c:0.6,q:[2,4]},{item:'Aeon Crystal',c:0.5,q:[1,2]},{item:'Ruin Bone',c:1,q:[1,3]},{item:'Aeon Arrows',c:0.04,q:[5,15]},{item:'Aeonscale Bow',c:0.012,q:[1,1]},{item:'Aeonscale Gloves',c:0.015,q:[1,1]},{item:'Aeonscale Pants',c:0.012,q:[1,1]},{item:'Aeonweave Hood',c:0.015,q:[1,1]},{item:'Aeonsteel Helm',c:0.015,q:[1,1]},{item:'Aeonscale Amulet',c:0.005,q:[1,1]}]},
    {id:'ruin_guardian',name:'Ruin Guardian',level:150,hp:63000,atk:2345,str:1545,def:850,xp:11590,gold:[34800,56000],icon:'ruin_guardian',drops:[{item:'Ruin Bone',c:1,q:[2,5]},{item:'Relic Shard',c:0.35,q:[1,2]},{item:'Aeonite Ore',c:0.2,q:[1,2]},{item:'Aeon Scale',c:0.5,q:[1,3]},{item:'Aeon Arrows',c:0.05,q:[5,15]},{item:'Aeonite Bar',c:0.008,q:[1,1]},{item:'Aeonsteel Sword',c:0.015,q:[1,1]},{item:'Aeonsteel Blade',c:0.012,q:[1,1]},{item:'Aeonsteel Legs',c:0.018,q:[1,1]},{item:'Aeonsteel Gloves',c:0.012,q:[1,1]},{item:'Aeonscale Boots',c:0.015,q:[1,1]},{item:'Aeonweave Gloves',c:0.015,q:[1,1]}]},
    {id:'golem_drifter',name:'Golem Drifter',level:152,hp:68000,atk:2485,str:1615,def:895,xp:12580,gold:[37700,60800],icon:'golem_drifter',drops:[{item:'Ruin Bone',c:1,q:[3,6]},{item:'Relic Shard',c:0.5,q:[1,3]},{item:'Aeonite Ore',c:0.25,q:[1,2]},{item:'Aeonite Bar',c:0.01,q:[1,1]},{item:'Aeonsteel Greatsword',c:0.012,q:[1,1]},{item:'Aeonsteel Shield',c:0.018,q:[1,1]},{item:'Aeonsteel Plate',c:0.012,q:[1,1]},{item:'Aeonscale Hat',c:0.015,q:[1,1]},{item:'Aeonweave Robe',c:0.015,q:[1,1]},{item:'Aeonweave Boots',c:0.012,q:[1,1]},{item:'Aeonsteel Ring',c:0.006,q:[1,1]},{item:'Aeonsteel Amulet',c:0.004,q:[1,1]}]},
    {id:'hollow_sentinel',name:'Hollow Sentinel',level:154,hp:72500,atk:2620,str:1690,def:945,xp:13660,gold:[41000,66200],icon:'hollow_sentinel',drops:[{item:'Aeon Crystal',c:0.7,q:[2,4]},{item:'Ruin Bone',c:1,q:[2,5]},{item:'Aeonite Ore',c:0.22,q:[1,2]},{item:'Relic Shard',c:0.4,q:[1,2]},{item:'Aeonweave Staff',c:0.018,q:[1,1]},{item:'Aeonweave Wand',c:0.012,q:[1,1]},{item:'Aeonweave Tome',c:0.01,q:[1,1]},{item:'Aeonweave Hood',c:0.016,q:[1,1]},{item:'Aeonsteel Plate',c:0.015,q:[1,1]},{item:'Aeonsteel Boots',c:0.012,q:[1,1]},{item:'Aeonweave Ring',c:0.006,q:[1,1]}]},
    {id:'cursed_archivist',name:'Cursed Archivist',level:156,hp:78000,atk:2770,str:1770,def:995,xp:14810,gold:[44400,71800],icon:'cursed_archivist',drops:[{item:'Aeon Crystal',c:0.65,q:[2,4]},{item:'Relic Shard',c:0.65,q:[2,4]},{item:'Ruin Bone',c:1,q:[2,4]},{item:'Aeonite Bar',c:0.012,q:[1,1]},{item:'Aeon Arrows',c:0.04,q:[5,15]},{item:'Aeonweave Wand',c:0.016,q:[1,1]},{item:'Aeonweave Tome',c:0.014,q:[1,1]},{item:'Aeonweave Pants',c:0.016,q:[1,1]},{item:'Aeonscale Tunic',c:0.015,q:[1,1]},{item:'Aeonweave Amulet',c:0.005,q:[1,1]}]},
    {id:'relic_dragon',name:'Relic Dragon',level:157,hp:80500,atk:2850,str:1810,def:1022,xp:15480,gold:[46200,74400],icon:'relic_dragon',drops:[{item:'Glyphstone',c:0.45,q:[260,420]},{item:'Dragon Fire',c:0.3,q:[15,40]},{item:'Ruin Bone',c:1,q:[2,5]},{item:'Aeon Scale',c:0.7,q:[2,5]},{item:'Aeon Crystal',c:0.4,q:[1,2]},{item:'Aeonite Ore',c:0.2,q:[1,2]},{item:'Aeonweave Staff',c:0.014,q:[1,1]},{item:'Aeonweave Hood',c:0.014,q:[1,1]},{item:'Aeonweave Robe',c:0.014,q:[1,1]},{item:'Aeonweave Cape',c:0.008,q:[1,1]},{item:'Aeonweave Amulet',c:0.004,q:[1,1]}]},
    {id:'ruin_specter',name:'Ruin Specter',level:158,hp:83500,atk:2930,str:1845,def:1050,xp:16080,gold:[48200,78000],icon:'ruin_specter',drops:[{item:'Aeon Scale',c:0.8,q:[2,5]},{item:'Relic Shard',c:0.65,q:[2,4]},{item:'Aeon Crystal',c:0.45,q:[1,2]},{item:'Aeonscale Bow',c:0.018,q:[1,1]},{item:'Aeonscale Pants',c:0.016,q:[1,1]},{item:'Aeonscale Hat',c:0.012,q:[1,1]},{item:'Aeonweave Hood',c:0.012,q:[1,1]},{item:'Aeonsteel Cape',c:0.01,q:[1,1]},{item:'Aeonscale Ring',c:0.006,q:[1,1]}]},
    {id:'void_lurker',name:'Void Lurker',level:160,hp:89500,atk:3095,str:1930,def:1105,xp:17450,gold:[52400,84700],icon:'void_lurker',drops:[{item:'Aeon Crystal',c:0.65,q:[2,4]},{item:'Relic Shard',c:0.75,q:[2,5]},{item:'Raw Gravemaw',c:0.35,q:[1,2]},{item:'Aeonite Bar',c:0.018,q:[1,2]},{item:'Aeonsteel Sword',c:0.02,q:[1,1]},{item:'Aeonsteel Blade',c:0.016,q:[1,1]},{item:'Aeonsteel Legs',c:0.012,q:[1,1]},{item:'Aeonweave Boots',c:0.015,q:[1,1]},{item:'Aeonscale Amulet',c:0.006,q:[1,1]},{item:'Aeonweave Ring',c:0.006,q:[1,1]},{item:'Aeonweave Cape',c:0.01,q:[1,1]},{item:'Aeonscale Cape',c:0.01,q:[1,1]}]},
    {id:'ruins_boss',name:'Relic Wraith',level:185,hp:141500,atk:4070,str:2500,def:1305,xp:33100,gold:[99100,158400],icon:'ruins_boss',boss:true,drops:[{item:'Relic Crown',c:0.001,q:[1,1]},{item:'Tome of the Ancients',c:0.00004,q:[1,1]},{item:'Skilling Pet Whistle (1 day)',c:0.0001,q:[1,1]},{item:'Skilling Pet Whistle (7 days)',c:0.00001,q:[1,1]},{item:'Tidegrave',c:0.001,q:[1,1]},{item:'Wraithpiercer',c:0.001,q:[1,1]},{item:'Relicbrand Staff',c:0.001,q:[1,1]},{item:'Wraith Bone',c:1,q:[10,16]},{item:'Aeon Crystal',c:0.8,q:[5,10]},{item:'Relic Shard',c:1,q:[12,20]},{item:'Aeonite Bar',c:0.04,q:[2,5]},{item:'Aeonsteel Greatsword',c:0.035,q:[1,1]},{item:'Aeonscale Bow',c:0.03,q:[1,1]},{item:'Aeonsteel Sword',c:0.03,q:[1,1]},{item:'Aeonweave Staff',c:0.025,q:[1,1]},{item:'Aeon Arrows',c:0.05,q:[25,50]},{item:'Aeonsteel Plate',c:0.02,q:[1,1]},{item:'Aeonsteel Helm',c:0.02,q:[1,1]},{item:'Aeonsteel Legs',c:0.02,q:[1,1]},{item:'Aeonsteel Shield',c:0.018,q:[1,1]},{item:'Aeonsteel Boots',c:0.018,q:[1,1]},{item:'Aeonsteel Gloves',c:0.018,q:[1,1]},{item:'Aeonsteel Ring',c:0.012,q:[1,1]},{item:'Aeonsteel Amulet',c:0.008,q:[1,1]},{item:'Aeonsteel Cape',c:0.012,q:[1,1]},{item:'Aeonscale Tunic',c:0.02,q:[1,1]},{item:'Aeonscale Hat',c:0.02,q:[1,1]},{item:'Aeonscale Pants',c:0.018,q:[1,1]},{item:'Aeonscale Boots',c:0.018,q:[1,1]},{item:'Aeonscale Gloves',c:0.018,q:[1,1]},{item:'Aeonscale Ring',c:0.012,q:[1,1]},{item:'Aeonscale Amulet',c:0.008,q:[1,1]},{item:'Aeonscale Cape',c:0.012,q:[1,1]},{item:'Aeonweave Robe',c:0.02,q:[1,1]},{item:'Aeonweave Hood',c:0.02,q:[1,1]},{item:'Aeonweave Pants',c:0.018,q:[1,1]},{item:'Aeonweave Boots',c:0.018,q:[1,1]},{item:'Aeonweave Gloves',c:0.018,q:[1,1]},{item:'Aeonweave Ring',c:0.012,q:[1,1]},{item:'Aeonweave Amulet',c:0.008,q:[1,1]},{item:'Aeonweave Cape',c:0.012,q:[1,1]},{item:'Aeonweave Wand',c:0.02,q:[1,1]},{item:'Aeonweave Tome',c:0.018,q:[1,1]},{item:'Wraith Essence',c:0.002,q:[1,1]}]}
  ],
  
  
  haunted:[
    {id:'h_chicken',name:'Haunted Chicken',level:5,hp:45,atk:6,str:7,def:3,xp:11,gold:[4,12],icon:'chicken',tint:'green',drops:[{item:'Feathers',c:1,q:[4,8]},{item:'Bones',c:1,q:[1,1]},{item:'Raw Chicken',c:1,q:[1,1]},{item:'Halloween Candy',c:0.1,q:[1,1]},{item:'Small Gathering Candy',c:0.025,q:[1,1]},{item:'Small Processing Candy',c:0.025,q:[1,1]},{item:'Small Combat Candy',c:0.025,q:[1,1]},{item:'Small XP Candy',c:0.025,q:[1,1]}]},
    {id:'h_spider',name:'Haunted Spider',level:20,hp:130,atk:24,str:28,def:13,xp:18,gold:[24,50],icon:'spider',tint:'purple',drops:[{item:'Bowstring',c:0.65,q:[1,3]},{item:'Venom',c:0.4,q:[1,2]},{item:'Coal',c:0.25,q:[1,3]},{item:'Halloween Candy',c:0.15,q:[1,1]},{item:'Small Gathering Candy',c:0.025,q:[1,1]},{item:'Small Processing Candy',c:0.025,q:[1,1]},{item:'Small Combat Candy',c:0.025,q:[1,1]},{item:'Small XP Candy',c:0.025,q:[1,1]}]},
    {id:'h_chieftain',name:'Haunted Chieftain',level:40,hp:430,atk:72,str:88,def:42,xp:26,gold:[85,160],icon:'boss_meadow',tint:'green',drops:[{item:'Big Bones',c:1,q:[3,5]},{item:'Iron Arrows',c:0.15,q:[10,25]},{item:'Halloween Candy',c:0.2,q:[1,2]},{item:'Small Gathering Candy',c:0.03,q:[1,1]},{item:'Small Processing Candy',c:0.03,q:[1,1]},{item:'Small Combat Candy',c:0.03,q:[1,1]},{item:'Small XP Candy',c:0.03,q:[1,1]}]},
    {id:'h_zombie',name:'Haunted Zombie',level:60,hp:850,atk:125,str:155,def:78,xp:50,gold:[170,290],icon:'zombie',tint:'purple',drops:[{item:'Ancient Bone',c:1,q:[1,3]},{item:'Rotten Flesh',c:0.4,q:[1,2]},{item:'Halloween Candy',c:0.3,q:[1,2]},{item:'Large Gathering Candy',c:0.025,q:[1,1]},{item:'Large Processing Candy',c:0.025,q:[1,1]},{item:'Large Combat Candy',c:0.025,q:[1,1]},{item:'Large XP Candy',c:0.025,q:[1,1]}]},
    {id:'h_demon',name:'Haunted Demon',level:80,hp:1950,atk:205,str:205,def:100,xp:95,gold:[330,600],icon:'demon',tint:'green',drops:[{item:'Demon Ash',c:0.4,q:[1,3]},{item:'Hellfire Bone',c:1,q:[1,2]},{item:'Halloween Candy',c:0.4,q:[2,3]},{item:'Large Gathering Candy',c:0.025,q:[1,1]},{item:'Large Processing Candy',c:0.025,q:[1,1]},{item:'Large Combat Candy',c:0.025,q:[1,1]},{item:'Large XP Candy',c:0.025,q:[1,1]}]},
    {id:'h_vampire',name:'Haunted Vampire',level:100,hp:6800,atk:450,str:430,def:165,xp:400,gold:[1500,2500],icon:'vampire',tint:'purple',drops:[{item:'Vital Essence',c:0.45,q:[1,2]},{item:'Ancient Bone',c:1,q:[2,4]},{item:'Cobalt Ore',c:0.15,q:[1,2]},{item:'Halloween Candy',c:0.5,q:[2,4]},{item:'Large Gathering Candy',c:0.03,q:[1,1]},{item:'Large Processing Candy',c:0.03,q:[1,1]},{item:'Large Combat Candy',c:0.03,q:[1,1]},{item:'Large XP Candy',c:0.03,q:[1,1]}]},
    {id:'h_tidewitch',name:'Haunted Tidewitch',level:120,hp:16500,atk:980,str:830,def:340,xp:2400,gold:[6500,10500],icon:'tidewitch',tint:'green',drops:[{item:'Abyssal Scale',c:0.8,q:[2,5]},{item:'Deep Shard',c:0.65,q:[2,4]},{item:'Halloween Candy',c:0.6,q:[3,5]},{item:'Grand Gathering Candy',c:0.02,q:[1,1]},{item:'Grand Processing Candy',c:0.02,q:[1,1]},{item:'Grand Combat Candy',c:0.02,q:[1,1]},{item:'Grand XP Candy',c:0.02,q:[1,1]}]},
    {id:'h_lich',name:'Haunted Lich',level:140,hp:25600,atk:1460,str:915,def:580,xp:4900,gold:[14700,23700],icon:'ice_lich',tint:'purple',drops:[{item:'Frozen Essence',c:0.8,q:[3,6]},{item:'Glacial Crystal',c:0.35,q:[1,3]},{item:'Frost Bone',c:1,q:[3,5]},{item:'Frozen Core',c:0.5,q:[2,4]},{item:'Halloween Candy',c:0.7,q:[4,6]},{item:'Grand Gathering Candy',c:0.02,q:[1,1]},{item:'Grand Processing Candy',c:0.02,q:[1,1]},{item:'Grand Combat Candy',c:0.02,q:[1,1]},{item:'Grand XP Candy',c:0.02,q:[1,1]}]},
    {id:'h_guardian',name:'Haunted Guardian',level:165,hp:98500,atk:3400,str:2120,def:1215,xp:19500,gold:[58000,93000],icon:'ruin_guardian',tint:'green',drops:[{item:'Ruin Bone',c:1,q:[2,5]},{item:'Relic Shard',c:0.35,q:[1,2]},{item:'Aeonite Ore',c:0.2,q:[1,2]},{item:'Aeon Scale',c:0.5,q:[1,3]},{item:'Halloween Candy',c:0.8,q:[5,8]},{item:'Grand Gathering Candy',c:0.025,q:[1,1]},{item:'Grand Processing Candy',c:0.025,q:[1,1]},{item:'Grand Combat Candy',c:0.025,q:[1,1]},{item:'Grand XP Candy',c:0.025,q:[1,1]}]},
    {id:'haunted_boss',name:'Haunted Relic Wraith',level:210,hp:300000,atk:7000,str:4300,def:2300,xp:62000,gold:[180000,290000],icon:'ruins_boss',tint:'boss',boss:true,drops:[{item:'Wraith Bone',c:1,q:[10,16]},{item:'Aeon Crystal',c:0.8,q:[5,10]},{item:'Relic Shard',c:1,q:[12,20]},{item:'Aeon Scale',c:0.6,q:[6,12]},{item:'Ruin Bone',c:0.7,q:[6,12]},{item:'Vital Essence',c:0.5,q:[4,8]},{item:'Aeonite Bar',c:0.05,q:[2,5]},{item:'Wraith Essence',c:0.004,q:[1,1]},{item:'Frozen Core',c:0.6,q:[6,12]},{item:'Halloween Candy',c:1,q:[20,30]},{item:'Grand Combat Candy',c:1,q:[1,1]},{item:'Grand Gathering Candy',c:0.35,q:[1,1]},{item:'Grand Processing Candy',c:0.35,q:[1,1]},{item:'Grand XP Candy',c:0.35,q:[1,1]}]}
  ]
};
const ZONES = {
  meadow:{id:'meadow',name:'Verdant Meadows',level:1,cost:0,bossId:'meadow_boss'},
  forest:{id:'forest',name:'Darkwood Forest',level:38,cost:5000,bossId:'forest_boss',requires:'meadow'},
  dungeon:{id:'dungeon',name:'Ancient Dungeon',level:65,cost:25000,bossId:'dungeon_boss',requires:'forest'},
  shadowlands:{id:'shadowlands',name:'Shadowlands',level:78,cost:100000,bossId:'shadow_boss',requires:'dungeon'},
  volcano:{id:'volcano',name:'Molten Peak',level:91,cost:350000,bossId:'volcano_boss',requires:'shadowlands'},
  frostlands:{id:'frostlands',name:'Frozen Wastes',level:101,cost:1000000,bossId:'frost_boss',requires:'volcano'},
  abyssal:{id:'abyssal',name:'Abyssal Depths',level:130,cost:5000000,bossId:'abyssal_boss',requires:'frostlands'},
  ruins:{id:'ruins',name:'The Drowned Ruins',level:145,cost:15000000,bossId:'ruins_boss',requires:'abyssal'},
  
  
  haunted:{id:'haunted',name:'Haunted Hollow',level:1,cost:0,event:'halloween'}
};
const POTIONS = {
  'Minor Attack Potion': {stat:'atk_pct',value:0.005,flat:10,attacks:250,level:1,desc:'+0.5% ATK (min +10) for 250 attacks'},
  'Attack Potion': {stat:'atk_pct',value:0.01,flat:25,attacks:250,level:20,desc:'+1% ATK (min +25) for 250 attacks'},
  'Greater Attack Potion': {stat:'atk_pct',value:0.015,flat:50,attacks:250,level:45,desc:'+1.5% ATK (min +50) for 250 attacks'},
  'Supreme Attack Potion': {stat:'atk_pct',value:0.02,flat:85,attacks:250,level:70,desc:'+2% ATK (min +85) for 250 attacks'},
  'Frost Attack Potion': {stat:'atk_pct',value:0.025,flat:100,attacks:250,level:85,desc:'+2.5% ATK (min +100) for 250 attacks'},
  'Minor Defense Potion': {stat:'def_pct',value:0.005,flat:15,attacks:250,level:5,desc:'+0.5% DEF (min +15) for 250 attacks'},
  'Defense Potion': {stat:'def_pct',value:0.01,flat:35,attacks:250,level:25,desc:'+1% DEF (min +35) for 250 attacks'},
  'Greater Defense Potion': {stat:'def_pct',value:0.015,flat:75,attacks:250,level:52,desc:'+1.5% DEF (min +75) for 250 attacks'},
  'Supreme Defense Potion': {stat:'def_pct',value:0.02,flat:125,attacks:250,level:76,desc:'+2% DEF (min +125) for 250 attacks'},
  'Frost Defense Potion': {stat:'def_pct',value:0.025,flat:150,attacks:250,level:88,desc:'+2.5% DEF (min +150) for 250 attacks'},
  'Minor Strength Potion': {stat:'str_pct',value:0.005,flat:10,attacks:250,level:3,desc:'+0.5% STR (min +10) for 250 attacks'},
  'Strength Potion': {stat:'str_pct',value:0.01,flat:25,attacks:250,level:22,desc:'+1% STR (min +25) for 250 attacks'},
  'Greater Strength Potion': {stat:'str_pct',value:0.015,flat:50,attacks:250,level:48,desc:'+1.5% STR (min +50) for 250 attacks'},
  'Supreme Strength Potion': {stat:'str_pct',value:0.02,flat:85,attacks:250,level:73,desc:'+2% STR (min +85) for 250 attacks'},
  'Minor Ranging Potion': {stat:'rng_pct',value:0.005,flat:10,attacks:250,level:8,desc:'+0.5% RNG (min +10) for 250 attacks'},
  'Ranging Potion': {stat:'rng_pct',value:0.01,flat:25,attacks:250,level:28,desc:'+1% RNG (min +25) for 250 attacks'},
  'Greater Ranging Potion': {stat:'rng_pct',value:0.015,flat:50,attacks:250,level:56,desc:'+1.5% RNG (min +50) for 250 attacks'},
  'Supreme Ranging Potion': {stat:'rng_pct',value:0.02,flat:85,attacks:250,level:79,desc:'+2% RNG (min +85) for 250 attacks'},
  'Minor Magic Potion': {stat:'mag_pct',value:0.005,flat:10,attacks:250,level:12,desc:'+0.5% MAG (min +10) for 250 attacks'},
  'Magic Potion': {stat:'mag_pct',value:0.01,flat:25,attacks:250,level:32,desc:'+1% MAG (min +25) for 250 attacks'},
  'Greater Magic Potion': {stat:'mag_pct',value:0.015,flat:50,attacks:250,level:60,desc:'+1.5% MAG (min +50) for 250 attacks'},
  'Supreme Magic Potion': {stat:'mag_pct',value:0.02,flat:85,attacks:250,level:82,desc:'+2% MAG (min +85) for 250 attacks'},
  'Lifesteal Elixir': {stat:'lifesteal',value:0.005,attacks:250,level:35,desc:'+0.5% LS for 250 attacks'},
  'Greater Lifesteal Elixir': {stat:'lifesteal',value:0.01,attacks:250,level:62,desc:'+1% LS for 250 attacks'},
  'Supreme Lifesteal Elixir': {stat:'lifesteal',value:0.015,attacks:250,level:84,desc:'+1.5% LS for 250 attacks'},
  
  'Minor Gathering Potion': {stat:'gathering_speed',value:0.05,attacks:100,level:6,desc:'+5% Gathering Speed for 100 actions'},
  'Gathering Potion': {stat:'gathering_speed',value:0.10,attacks:140,level:18,desc:'+10% Gathering Speed for 140 actions'},
  'Greater Gathering Potion': {stat:'gathering_speed',value:0.15,attacks:180,level:42,desc:'+15% Gathering Speed for 180 actions'},
  'Supreme Gathering Potion': {stat:'gathering_speed',value:0.25,attacks:220,level:68,desc:'+25% Gathering Speed for 220 actions'},
  
  'Minor Production Potion': {stat:'production_speed',value:0.05,attacks:100,level:6,desc:'+5% Production Speed for 100 actions'},
  'Production Potion': {stat:'production_speed',value:0.10,attacks:140,level:18,desc:'+10% Production Speed for 140 actions'},
  'Greater Production Potion': {stat:'production_speed',value:0.15,attacks:180,level:42,desc:'+15% Production Speed for 180 actions'},
  'Supreme Production Potion': {stat:'production_speed',value:0.25,attacks:220,level:68,desc:'+25% Production Speed for 220 actions'},
  'Abyssal Production Potion': {stat:'production_speed',value:0.40,attacks:400,level:106,desc:'+40% Production Speed for 400 actions'},
  'Aeon Production Potion': {stat:'production_speed',value:0.50,attacks:500,level:121,desc:'+50% Production Speed for 500 actions'},
  
  'Minor Gathering XP Potion': {stat:'gathering_xp_boost',value:0.05,attacks:100,level:10,desc:'+5% Gathering XP for 100 actions'},
  'Gathering XP Potion': {stat:'gathering_xp_boost',value:0.10,attacks:140,level:24,desc:'+10% Gathering XP for 140 actions'},
  'Greater Gathering XP Potion': {stat:'gathering_xp_boost',value:0.15,attacks:180,level:50,desc:'+15% Gathering XP for 180 actions'},
  'Supreme Gathering XP Potion': {stat:'gathering_xp_boost',value:0.25,attacks:220,level:75,desc:'+25% Gathering XP for 220 actions'},
  
  'Minor Combat XP Potion': {stat:'combat_xp_boost',value:0.05,attacks:250,level:12,desc:'+5% Combat XP for 250 attacks'},
  'Combat XP Potion': {stat:'combat_xp_boost',value:0.10,attacks:250,level:26,desc:'+10% Combat XP for 250 attacks'},
  'Greater Combat XP Potion': {stat:'combat_xp_boost',value:0.15,attacks:250,level:52,desc:'+15% Combat XP for 250 attacks'},
  'Supreme Combat XP Potion': {stat:'combat_xp_boost',value:0.25,attacks:250,level:77,desc:'+25% Combat XP for 250 attacks'},
  
  'Minor Protection Potion': {stat:'damage_reduction',value:0.05,attacks:250,level:14,desc:'+5% DR for 250 attacks'},
  'Protection Potion': {stat:'damage_reduction',value:0.10,attacks:250,level:30,desc:'+10% DR for 250 attacks'},
  'Greater Protection Potion': {stat:'damage_reduction',value:0.15,attacks:250,level:54,desc:'+15% DR for 250 attacks'},
  'Supreme Protection Potion': {stat:'damage_reduction',value:0.25,attacks:250,level:78,desc:'+25% DR for 250 attacks'},
  
  'Minor Fortune Potion': {stat:'gold_boost',value:0.10,attacks:250,level:16,desc:'+10% Gold Drops for 250 attacks'},
  'Fortune Potion': {stat:'gold_boost',value:0.20,attacks:250,level:38,desc:'+20% Gold Drops for 250 attacks'},
  'Greater Fortune Potion': {stat:'gold_boost',value:0.35,attacks:250,level:65,desc:'+35% Gold Drops for 250 attacks'},
  'Supreme Fortune Potion': {stat:'gold_boost',value:0.50,attacks:250,level:90,desc:'+50% Gold Drops for 250 attacks'},
  'Abyssal Lifesteal Elixir': {stat:'lifesteal',value:0.025,attacks:400,level:108,desc:'+2.5% LS for 400 attacks'},
  'Abyssal Gathering Potion': {stat:'gathering_speed',value:0.40,attacks:400,level:106,desc:'+40% Gathering Speed for 400 actions'},
  'Abyssal Gathering XP Potion': {stat:'gathering_xp_boost',value:0.40,attacks:400,level:106,desc:'+40% Gathering XP for 400 actions'},
  'Abyssal Combat XP Potion': {stat:'combat_xp_boost',value:0.40,attacks:400,level:107,desc:'+40% Combat XP for 400 attacks'},
  'Abyssal Fortune Potion': {stat:'gold_boost',value:0.75,attacks:400,level:109,desc:'+75% Gold Drops for 400 attacks'},
  'Abyssal Attack Potion': {stat:'atk_pct',value:0.035,flat:150,attacks:400,level:110,desc:'+3.5% ATK (min +150) for 400 attacks'},
  'Abyssal Strength Potion': {stat:'str_pct',value:0.035,flat:150,attacks:400,level:112,desc:'+3.5% STR (min +150) for 400 attacks'},
  'Abyssal Defense Potion': {stat:'def_pct',value:0.035,flat:200,attacks:400,level:114,desc:'+3.5% DEF (min +200) for 400 attacks'},
  'Abyssal Ranging Potion': {stat:'rng_pct',value:0.035,flat:150,attacks:400,level:116,desc:'+3.5% RNG (min +150) for 400 attacks'},
  'Abyssal Magic Potion': {stat:'mag_pct',value:0.035,flat:150,attacks:400,level:118,desc:'+3.5% MAG (min +150) for 400 attacks'},
  'Abyssal Protection Potion': {stat:'damage_reduction',value:0.35,attacks:400,level:120,desc:'+35% DR for 400 attacks'},
  'Aeon Attack Potion': {stat:'atk_pct',value:0.045,flat:200,attacks:500,level:121,desc:'+4.5% ATK (min +200) for 500 attacks'},
  'Aeon Strength Potion': {stat:'str_pct',value:0.045,flat:200,attacks:500,level:123,desc:'+4.5% STR (min +200) for 500 attacks'},
  'Aeon Defense Potion': {stat:'def_pct',value:0.045,flat:260,attacks:500,level:125,desc:'+4.5% DEF (min +260) for 500 attacks'},
  'Aeon Ranging Potion': {stat:'rng_pct',value:0.045,flat:200,attacks:500,level:127,desc:'+4.5% RNG (min +200) for 500 attacks'},
  'Aeon Magic Potion': {stat:'mag_pct',value:0.045,flat:200,attacks:500,level:129,desc:'+4.5% MAG (min +200) for 500 attacks'},
  'Aeon Lifesteal Elixir': {stat:'lifesteal',value:0.03,attacks:500,level:122,desc:'+3% LS for 500 attacks'},
  'Aeon Protection Potion': {stat:'damage_reduction',value:0.40,attacks:500,level:130,desc:'+40% DR for 500 attacks'},
  'Aeon Gathering Potion': {stat:'gathering_speed',value:0.50,attacks:500,level:121,desc:'+50% Gathering Speed for 500 actions'},
  'Aeon Gathering XP Potion': {stat:'gathering_xp_boost',value:0.50,attacks:500,level:121,desc:'+50% Gathering XP for 500 actions'},
  'Aeon Combat XP Potion': {stat:'combat_xp_boost',value:0.50,attacks:500,level:122,desc:'+50% Combat XP for 500 attacks'},
  'Aeon Fortune Potion': {stat:'gold_boost',value:0.90,attacks:500,level:124,desc:'+90% Gold Drops for 500 attacks'},
  
  'Easter Attack Potion': {stat:'atk_pct',value:0.02,flat:85,attacks:250,level:1,desc:'+2% ATK (min +85) for 250 attacks'},
  'Easter Strength Potion': {stat:'str_pct',value:0.02,flat:85,attacks:250,level:1,desc:'+2% STR (min +85) for 250 attacks'},
  'Easter Defense Potion': {stat:'def_pct',value:0.02,flat:125,attacks:250,level:1,desc:'+2% DEF (min +125) for 250 attacks'},
  'Easter Ranging Potion': {stat:'rng_pct',value:0.02,flat:85,attacks:250,level:1,desc:'+2% RNG (min +85) for 250 attacks'},
  'Easter Magic Potion': {stat:'mag_pct',value:0.02,flat:85,attacks:250,level:1,desc:'+2% MAG (min +85) for 250 attacks'},
  'Easter Gathering Potion': {stat:'gathering_speed',value:0.25,attacks:220,level:1,desc:'+25% Gathering Speed for 220 actions'},
  'Easter Gathering XP Potion': {stat:'gathering_xp_boost',value:0.25,attacks:220,level:1,desc:'+25% Gathering XP for 220 actions'},
  
  'Firework Attack Potion': {stat:'atk_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% ATK (min +25) for 250 attacks'},
  'Firework Strength Potion': {stat:'str_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% STR (min +25) for 250 attacks'},
  'Firework Ranging Potion': {stat:'rng_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% RNG (min +25) for 250 attacks'},
  'Firework Magic Potion': {stat:'mag_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% MAG (min +25) for 250 attacks'},
  'Firework Gathering Potion': {stat:'gathering_speed',value:0.10,attacks:140,level:1,desc:'+10% Gathering Speed for 140 actions'},
  'Firework Gathering XP Potion': {stat:'gathering_xp_boost',value:0.10,attacks:140,level:1,desc:'+10% Gathering XP for 140 actions'},
  'Firework Fortune Potion': {stat:'gold_boost',value:0.20,attacks:250,level:1,desc:'+20% Gold Drops for 250 attacks'},
  
  'Rose Attack Potion': {stat:'atk_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% ATK (min +25) for 250 attacks'},
  'Rose Strength Potion': {stat:'str_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% STR (min +25) for 250 attacks'},
  'Rose Ranging Potion': {stat:'rng_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% RNG (min +25) for 250 attacks'},
  'Rose Magic Potion': {stat:'mag_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% MAG (min +25) for 250 attacks'},
  'Rose Gathering Potion': {stat:'gathering_speed',value:0.10,attacks:140,level:1,desc:'+10% Gathering Speed for 140 actions'},
  'Rose Gathering XP Potion': {stat:'gathering_xp_boost',value:0.10,attacks:140,level:1,desc:'+10% Gathering XP for 140 actions'},
  'Rose Fortune Potion': {stat:'gold_boost',value:0.20,attacks:250,level:1,desc:'+20% Gold Drops for 250 attacks'},
  
  'Haunted Attack Potion': {stat:'atk_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% ATK (min +25) for 250 attacks'},
  'Haunted Strength Potion': {stat:'str_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% STR (min +25) for 250 attacks'},
  'Haunted Ranging Potion': {stat:'rng_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% RNG (min +25) for 250 attacks'},
  'Haunted Magic Potion': {stat:'mag_pct',value:0.01,flat:25,attacks:250,level:1,desc:'+1% MAG (min +25) for 250 attacks'},
  'Haunted Gathering Potion': {stat:'gathering_speed',value:0.10,attacks:140,level:1,desc:'+10% Gathering Speed for 140 actions'},
  'Haunted Gathering XP Potion': {stat:'gathering_xp_boost',value:0.10,attacks:140,level:1,desc:'+10% Gathering XP for 140 actions'},
  'Haunted Fortune Potion': {stat:'gold_boost',value:0.20,attacks:250,level:1,desc:'+20% Gold Drops for 250 attacks'}
};
const POTION_MINUTES = {Minor:4, Greater:6, Supreme:7, Frost:7, Easter:7, Abyssal:8, Aeon:10};
const POTION_KIND = {gathering_speed:'gathering', gathering_xp_boost:'gathering', production_speed:'production'};
const FOOD_HEALS = {'Cooked Minnow':5,'Cooked Chicken':8,'Cooked Perch':8,'Cooked Salmon':11,'Cooked Carp':14,'Cooked Pike':22,'Cooked Eel':30,'Cooked Barracuda':40,'Cooked Sea Snake':55,'Cooked Anglerfish':70,'Cooked Octopus':90,'Chocolate Chunks':40,'Heart Slime Jelly':20,'Cooked Scorpion Meat':18,'Cooked Young Dragon Meat':24,'Cooked Small Dragon Meat':36,'Cooked Dragon Meat':48,'Cooked Frost Dragon Meat':115,'Cooked Frozen Tuna':125,'Cooked Deepfin':145,'Cooked Razorjaw':160,'Cooked Abyssal Angler':180,'Cooked Relicfin':250,'Cooked Gravemaw':280,'Easter Chocolate Egg':100,'Fries':30,'Hotdog':60,'Hamburger':100,'Maple Syrup':45,'Nanaimo Bar':80,'Poutine':140,'Candy Apple':40,'Pumpkin Pie':90,'Ghost Cake':140};
const BONE_TYPES = [
  { id: 'bones', name: 'Bones', xp: 5, time: 2500 },
  { id: 'big_bones', name: 'Big Bones', xp: 18, time: 3000 },
  { id: 'mossy_bones', name: 'Mossy Bones', xp: 38, time: 3200 },
  { id: 'young_dragon_bones', name: 'Young Dragon Bones', xp: 42, time: 3600 },
  { id: 'giant_bones', name: 'Giant Bone', xp: 55, time: 3800 },
  { id: 'small_dragon_bones', name: 'Small Dragon Bones', xp: 62, time: 4000 },
  { id: 'ancient_bones', name: 'Ancient Bone', xp: 67, time: 4000 },
  { id: 'hellfire_bones', name: 'Hellfire Bone', xp: 78, time: 4200 },
  { id: 'dragon_bones', name: 'Dragon Bones', xp: 85, time: 4500 },
  { id: 'frost_bone', name: 'Frost Bone', xp: 115, time: 4800 },
  { id: 'giant_frost_bone', name: 'Giant Frost Bone', xp: 155, time: 5100 },
  { id: 'frost_dragon_bones', name: 'Frost Dragon Bones', xp: 190, time: 5500 },
  { id: 'abyssal_bone', name: 'Abyssal Bone', xp: 260, time: 6000 },
  { id: 'colossus_bone', name: 'Colossus Bone', xp: 390, time: 6500 },
  { id: 'ruin_bone', name: 'Ruin Bone', xp: 480, time: 6000 },
  { id: 'wraith_bone', name: 'Wraith Bone', xp: 720, time: 6500 },
];
const EVENT_PETS = [
  {name:'Chocolate Bear', icon:'chocolate_bear', desc:'+100 STR, RNG, MAG',
   bonus:{str:100,rng:100,mag:100}, eventOnly:true},
  {name:'Chocolate Turtle', icon:'chocolate_turtle', desc:'+200 DEF',
   bonus:{def:200}, eventOnly:true},
  {name:'Chocolate Rabbit', icon:'chocolate_rabbit', desc:'+10% Drop Rate',
   bonus:{luck:0.10}, eventOnly:true},
  {name:'Chocolate Horse', icon:'chocolate_horse', desc:'+10% All XP',
   bonus:{xp_boost:0.10}, eventOnly:true},
  {name:'Bear', icon:'bear', desc:'+100 STR, RNG, MAG',
   bonus:{str:100,rng:100,mag:100}, cost:{gold:100000000}},
  {name:'Turtle', icon:'turtle', desc:'+200 DEF',
   bonus:{def:200}, cost:{gold:100000000}},
  {name:'Easter Bunny', icon:'easter_bunny', desc:'+10% Gathering Speed',
   bonus:{tool_speed:0.10}, eventOnly:true},
  {name:'Easter Chick', icon:'easter_chick', desc:'+25 HP per combat tick',
   bonus:{hp_per_tick:25}, eventOnly:true},
  {name:'Easter Lamb', icon:'easter_lamb', desc:'+20% Divinity XP',
   bonus:{divinity_xp_boost:0.20}, eventOnly:true},
  {name:'Easter Duckling', icon:'easter_duckling', desc:'+10% Production Speed',
   bonus:{production_speed:0.10}, eventOnly:true},
  {name:'American Eagle', icon:'aeagle', desc:'-25% Walk Time in all zones',
   bonus:{walk_speed:0.25}, eventOnly:true},
  {name:'Canadian Moose', icon:'moose', desc:'+10% DEF, +10 HP per tick, +1% LS, -20% Gold',
   bonus:{def_pct:0.10, hp_per_tick:10, lifesteal:0.01, gold_boost:-0.20}, eventOnly:true},
  {name:'Black Cat', icon:'black_cat', desc:'+10% Gathering Speed, +10% Production Speed',
   bonus:{tool_speed:0.10, production_speed:0.10}, eventOnly:true},
  {name:'Pumpkin Slime', icon:'pumpkin_slime', desc:'+120 STR, RNG, MAG, +15 HP per tick',
   bonus:{str:120, rng:120, mag:120, hp_per_tick:15}, eventOnly:true},
  {name:'White Bear', icon:'bearpremium', desc:'+100 STR, RNG, MAG',
   bonus:{str:100,rng:100,mag:100}, cost:{gold:0}, iapOnly:true},
  {name:'Orange Turtle', icon:'turtlepremium', desc:'+200 DEF',
   bonus:{def:200}, cost:{gold:0}, iapOnly:true},
  {name:'Rabbit', icon:'rabbit', desc:'+10% Drop Rate',
   bonus:{luck:0.10}, cost:{gold:100000000}},
  {name:'Horse', icon:'horse', desc:'+10% All XP',
   bonus:{xp_boost:0.10}, cost:{gold:100000000}},
  {name:'Bunny', icon:'bunny', desc:'+10% Gathering Speed',
   bonus:{tool_speed:0.10}, cost:{gold:100000000}},
  {name:'Chick', icon:'chick', desc:'+25 HP per combat tick',
   bonus:{hp_per_tick:25}, cost:{gold:100000000}},
  {name:'Duckling', icon:'duckling', desc:'+10% Production Speed',
   bonus:{production_speed:0.10}, cost:{gold:100000000}},
  {name:'Lamb', icon:'lamb', desc:'+20% Divinity XP',
   bonus:{divinity_xp_boost:0.20}, cost:{gold:100000000}},
  {name:'Eagle', icon:'eagle', desc:'-25% Walk Time in all zones',
   bonus:{walk_speed:0.25}, cost:{gold:100000000}},
  {name:'Moose', icon:'goldmoose', desc:'+10% DEF, +10 HP per tick, +1% LS, -20% Gold',
   bonus:{def_pct:0.10, hp_per_tick:10, lifesteal:0.01, gold_boost:-0.20}, cost:{gold:100000000}},
  {name:'Black & White Horse', icon:'black_white_horse', desc:'+10% All XP',
   bonus:{xp_boost:0.10}, cost:{gold:0}, iapOnly:true},
  {name:'Orange Rabbit', icon:'orange_rabbit', desc:'+10% Drop Rate',
   bonus:{luck:0.10}, cost:{gold:0}, iapOnly:true},
  {name:'Brown Bunny', icon:'brown_bunny', desc:'+10% Gathering Speed',
   bonus:{tool_speed:0.10}, cost:{gold:0}, iapOnly:true},
  {name:'Green Chick', icon:'green_chick', desc:'+25 HP per combat tick',
   bonus:{hp_per_tick:25}, cost:{gold:0}, iapOnly:true},
  {name:'Blue Duckling', icon:'blue_duckling', desc:'+10% Production Speed',
   bonus:{production_speed:0.10}, cost:{gold:0}, iapOnly:true},
  {name:'Brown Lamb', icon:'brown_lamb', desc:'+20% Divinity XP',
   bonus:{divinity_xp_boost:0.20}, cost:{gold:0}, iapOnly:true},
  {name:'Red Eagle', icon:'redeagle', desc:'-25% Walk Time in all zones',
   bonus:{walk_speed:0.25}, cost:{gold:0}, iapOnly:true},
  {name:'Purple Moose', icon:'purplemoose', desc:'+10% DEF, +10 HP per tick, +1% LS, -20% Gold',
   bonus:{def_pct:0.10, hp_per_tick:10, lifesteal:0.01, gold_boost:-0.20}, cost:{gold:0}, iapOnly:true}
];
const BOSS_PETS = [
  {name:'Goblin Chieftain Pet', id:'goblin_chieftain_pet', icon:'goblin_chieftain_pet',
   desc:'+35% Gold from combat', lore:'A greedy little runt that hoards every coin it finds.', bonus:{gold_boost:0.35}, bossId:'meadow_boss', dropChance:0.00001,
   recolor:{name:'Mutated Goblin Chieftain Pet', icon:'goblin_chieftain_pet_1'}},
  {name:'Moss Giant Pet', id:'moss_giant_pet', icon:'moss_giant_pet',
   desc:'+15% Gathering Speed', lore:'Born from the roots of the Darkwood, it hums with ancient energy.', bonus:{tool_speed:0.15}, bossId:'forest_boss', dropChance:0.00001,
   recolor:{name:'Mutated Moss Giant Pet', icon:'moss_giant_pet_1'}},
  {name:'Lich King Pet', id:'lich_king_pet', icon:'lich_king_pet',
   desc:'+10% ATK & STR', lore:'A fragment of undying will, bound to serve beyond death.', bonus:{atk_pct:0.10,str_pct:0.10}, bossId:'dungeon_boss', dropChance:0.00001,
   recolor:{name:'Mutated Lich King Pet', icon:'lich_king_pet_1', desc:"Affected by Renaru's curse"}},
  {name:'Voidspawn Pet', id:'void_spawn_pet', icon:'void_spawn_pet',
   desc:'+10% MAG & RNG', lore:'Torn from the rift between worlds. Its red eyes never blink.', bonus:{mag_pct:0.10,rng_pct:0.10}, bossId:'shadow_boss', dropChance:0.00001,
   recolor:{name:'Mutated Voidspawn Pet', icon:'void_spawn_pet_1'}},
  {name:'Infernal Lord Pet', id:'infernal_lord_pet', icon:'infernal_lord_pet',
   desc:'+2% LS', lore:'Forged in the heart of Molten Peak. Its core burns eternal.', bonus:{lifesteal:0.02}, bossId:'volcano_boss', dropChance:0.00001,
   recolor:{name:'Mutated Infernal Lord Pet', icon:'infernal_lord_pet_1'}},
  {name:'Frozen Overlord Pet', id:'frozen_overlord_pet', icon:'frozen_overlord_pet',
   desc:'+20% DEF', lore:'Encased in permafrost, it endures what would shatter mountains.', bonus:{def_pct:0.20}, bossId:'frost_boss', dropChance:0.00001,
   recolor:{name:'Mutated Frozen Overlord Pet', icon:'frozen_overlord_pet_1'}},
  {name:'Drowned Colossus Pet', id:'drowned_colossus_pet', icon:'drowned_colossus_pet',
   desc:'+15% ATK, STR, RNG, MAG + 1% LS', lore:'A shard of the Colossus itself. The abyss trembles in its presence.', bonus:{atk_pct:0.15,str_pct:0.15,rng_pct:0.15,mag_pct:0.15,lifesteal:0.01}, bossId:'abyssal_boss', dropChance:0.00001,
   recolor:{name:'Mutated Drowned Colossus Pet', icon:'drowned_colossus_pet_1'}},
  {name:'Relic Wraith Pet', id:'relic_wraith_pet', icon:'relic_wraith_pet',
   desc:'+20% DEF, +3% LS, +30 HP/tick', lore:'A guardian spirit that held its post long after everyone it protected was gone. At your side, it finally remembers what it was for.', bonus:{def_pct:0.20,lifesteal:0.03,hp_per_tick:30}, bossId:'ruins_boss', dropChance:0.00001,
   recolor:{name:'Mutated Relic Wraith Pet', icon:'relic_wraith_pet_1'}},
  
  
  {name:'Pokoli', id:'haunted_ghost', icon:'ghost_pet',
   desc:'+25% passive Halloween Candy, +2% LS, +15 HP/tick', lore:'It used to do something with trains... probably.', bonus:{halloween_candy:0.25,lifesteal:0.02,hp_per_tick:15}, bossId:'haunted_boss', dropChance:0.01},
  
  {name:'Vampire Lord Pet', id:'vampire_lord_pet', icon:'vampire_lord_pet',
   desc:'+25% ATK & STR, +5% LS', lore:'A sliver of Ashlyn\'s power.', bonus:{atk_pct:0.25,str_pct:0.25,lifesteal:0.05}, bossId:'world_boss_ashlyn', dropChance:0},
  
  
  
  {name:'Elder Treant Pet', id:'treant_pet', icon:'treant_pet', skill:'woodcutting',
   desc:'+25% Woodcutting Speed, 2x Bird Nests, 10% chance for 3x Logs', lore:'A seed that remembers the oldest tree.', bonus:{skill_speed:0.25, treasure_find:1, wc_triple:0.10}, bossId:'skill_boss_treant', dropChance:0},
  {name:'Kraken Pet', id:'kraken_pet', icon:'kraken_pet', skill:'fishing',
   desc:'+25% Fishing Speed, 2x Underwater Chests, bonus Pearls', lore:'An ink cloud that follows the nets.', bonus:{skill_speed:0.25, treasure_find:1, fish_pearl:12}, bossId:'skill_boss_kraken', dropChance:0},
  {name:'Stone Golem Pet', id:'golem_pet', icon:'golem_pet', skill:'mining',
   desc:'+25% Mining Speed, 2x Gem Bags, bonus Gems', lore:'A chip off the mountain that walks.', bonus:{skill_speed:0.25, treasure_find:1, mine_gem:20}, bossId:'skill_boss_golem', dropChance:0}
];
const SKILL_PETS = [
  {name:'Cole',     icon:'miningpet',      skill:'mining',      desc:'Chance for bonus Coal while Mining', bonus:{mining_coal:1}},
  {name:'Chuck',    icon:'woodcuttingpet', skill:'woodcutting', desc:'25% chance for an extra Log', bonus:{wc_double:0.25}},
  {name:'Otto',     icon:'fishingpet',     skill:'fishing',     desc:'20% chance for a Fish one tier higher', bonus:{fish_bonus:0.20}},
  {name:'Sparky',   icon:'smithingpet',    skill:'smithing',    desc:'12% chance to Smith an extra item for free', bonus:{smith_extra:0.12}},
  {name:'Webber',   icon:'craftingpet',    skill:'crafting',    desc:'12% chance to Craft an extra item for free', bonus:{craft_extra:0.12}},
  {name:'Sushi',    icon:'cookingpet',     skill:'cooking',     desc:'12% chance to Cook an extra portion for free', bonus:{cook_extra:0.12}},
  {name:'Newt',     icon:'alchemypet',     skill:'alchemy',     desc:'12% chance to Brew an extra potion for free', bonus:{alch_extra:0.12}},
  {name:'Sage',     icon:'arcaneartspet',  skill:'arcane_arts', desc:'12% chance to Imbue an extra item for free', bonus:{arcane_extra:0.12}},
  {name:'Halo',     icon:'divinitypet',    skill:'divinity',    desc:'+30% Blessing Power', bonus:{blessing_power:0.30}},
  {name:'Robin',    icon:'thievingpet',    skill:'thieving',    desc:'+15% Thieving Success, +10% double loot', bonus:{thieving_success:0.15, thieving_double:0.10}}
];
const MONSTER_PETS = [
  {name:'Tracker', id:'tracker', icon:'bonedog', desc:'25% chance to double Bone drops', lore:'A loyal hound that digs an extra set of bones out of every hunt.', bonus:{bone_double:0.25}, monsterId:'wolf', dropChance:0.00001},
  {name:'Nibbles', id:'nibbles', icon:'nibbles', desc:'+10 damage every hit', lore:'A scrappy rat that gnaws on anything that moves.', bonus:{flat_dmg:10}, monsterId:'rat', dropChance:0.00002}
];
const PRAYERS = [
  
  { id: 'iron_hide', name: 'Iron Hide', level: 1, effect: { def: 0.05 }, desc: '+5% DEF' },
  { id: 'swift_strike', name: 'Swift Strike', level: 8, effect: { atk: 0.05 }, desc: '+5% ATK' },
  { id: 'mighty_resolve', name: 'Mighty Resolve', level: 15, effect: { str: 0.05 }, desc: '+5% STR' },
  { id: 'piercing_gaze', name: 'Piercing Gaze', level: 22, effect: { rng: 0.08 }, desc: '+8% RNG' },
  { id: 'mystic_focus', name: 'Mystic Focus', level: 24, effect: { mag: 0.08 }, desc: '+8% MAG' },
  { id: 'light_fingers', name: 'Light Fingers', level: 26, effect: { thieving_success: 0.05 }, desc: '+5% Thieving Success' },
  { id: 'hardened_shell', name: 'Hardened Shell', level: 28, effect: { def: 0.10 }, desc: '+10% DEF' },
  
  { id: 'endurance', name: 'Endurance', level: 35, effect: { tool_speed: 0.1 }, desc: '+10% Gathering Speed' },
  { id: 'falcon_vision', name: 'Falcon Vision', level: 40, effect: { atk: 0.10, rng: 0.10 }, desc: '+10% ATK/RNG' },
  { id: 'arcane_sight', name: 'Arcane Sight', level: 42, effect: { atk: 0.10, mag: 0.10 }, desc: '+10% ATK/MAG' },
  { id: 'favorable_winds', name: 'Favorable Winds', level: 45, effect: { luck: 0.08 }, desc: '+8% Drop Rates' },
  { id: 'shadow_step', name: 'Shadow Step', level: 50, effect: { thieving_success: 0.10 }, desc: '+10% Thieving Success' },
  { id: 'steely_determination', name: 'Steely Determination', level: 52, effect: { str: 0.12, def: 0.15 }, desc: '+12% STR, +15% DEF' },
  { id: 'vital_regen', name: 'Vital Regen', level: 55, effect: { hp_regen: 6 }, desc: '+6 HP/tick' },
  { id: 'soul_drain', name: 'Soul Drain', level: 58, effect: { lifesteal: 0.01 }, desc: '+1% LS' },
  { id: 'steady_hands', name: 'Steady Hands', level: 60, effect: { craft_speed: 0.05 }, desc: '+5% Production Speed' },
  
  { id: 'attunement', name: 'Attunement', level: 65, effect: { xp_boost: 0.1 }, desc: '+10% All XP' },
  { id: 'divine_shield', name: 'Divine Shield', level: 70, effect: { dmg_reduction: 0.15 }, desc: '+15% DR' },
  { id: 'titan_might', name: 'Titan Might', level: 75, effect: { str: 0.20 }, desc: '+20% STR' },
  { id: 'master_thief', name: 'Master Thief', level: 76, effect: { thieving_success: 0.15 }, desc: '+15% Thieving Success' },
  { id: 'artisan_focus', name: 'Artisan Focus', level: 77, effect: { craft_speed: 0.08 }, desc: '+8% Production Speed' },
  { id: 'predator_gaze', name: 'Predator Gaze', level: 78, effect: { rng: 0.22 }, desc: '+22% RNG' },
  { id: 'mana_surge', name: 'Mana Surge', level: 80, effect: { mag: 0.22 }, desc: '+22% MAG' },
  { id: 'holy_vengeance', name: 'Holy Vengeance', level: 82, effect: { boss_dmg: 0.25 }, desc: '+25% Boss DMG' },
  { id: 'sanctity', name: 'Sanctity', level: 85, effect: { atk: 0.25, str: 0.18, def: 0.25 }, desc: '+25% ATK/DEF, +18% STR' },
  { id: 'tenacity', name: 'Tenacity', level: 88, effect: { rng: 0.25, rngBonus: 150, def: 0.12 }, desc: '+25% RNG, +150 RNG Bonus, +12% DEF' },
  { id: 'cosmic_power', name: 'Cosmic Power', level: 90, effect: { mag: 0.25, def: 0.12 }, desc: '+25% MAG, +12% DEF' },
  { id: 'forge_rhythm', name: 'Forge Rhythm', level: 91, effect: { craft_speed: 0.12 }, desc: '+12% Production Speed' },
  { id: 'divination', name: 'Divination', level: 92, effect: { xp_boost: 0.15, luck: 0.12 }, desc: '+15% All XP, +12% Drop Rates' },
  
  { id: 'berserk_fury', name: 'Berserk Fury', level: 93, effect: { str: 0.35, atk: 0.35, dmg_increase: 0.05 }, desc: '+35% ATK/STR, <span style="color:#f87171">-5%</span> DR' },
  { id: 'arcane_mastery', name: 'Arcane Mastery', level: 94, effect: { mag: 0.30 }, desc: '+30% MAG' },
  { id: 'unyielding_spirit', name: 'Unyielding Spirit', level: 95, effect: { def: 0.25, dmg_reduction: 0.20 }, desc: '+25% DEF, +20% DR' },
  { id: 'ultimate_fortune', name: 'Ultimate Fortune', level: 96, effect: { luck: 0.25 }, desc: '+25% Drop Rates' },
  { id: 'transcendence', name: 'Transcendence', level: 97, effect: { xp_boost: 0.30 }, desc: '+30% All XP' },
  { id: 'vampiric_aura', name: 'Vampiric Aura', level: 98, effect: { lifesteal: 0.02 }, desc: '+2% LS' },
  { id: 'divine_apex', name: 'Divine Apex', level: 99, effect: { atk: 0.25, str: 0.25, rng: 0.25, mag: 0.25, def: 0.25 }, desc: '+25% ATK/STR/RNG/MAG/DEF' },
  
  { id: 'glacial_fortitude', name: 'Glacial Fortitude', level: 100, effect: { def: 0.35, hp_regen: 18 }, desc: '+35% DEF, +18 HP/tick' },
  { id: 'silent_predator', name: 'Silent Predator', level: 101, effect: { thieving_success: 0.20 }, desc: '+20% Thieving Success' },
  { id: 'frozen_wrath', name: 'Frozen Wrath', level: 102, effect: { str: 0.25, atk: 0.25, boss_dmg: 0.30 }, desc: '+25% ATK/STR, +30% Boss DMG' },
  { id: 'master_artisan', name: 'Master Artisan', level: 103, effect: { craft_speed: 0.18 }, desc: '+18% Production Speed' },
  { id: 'arctic_precision', name: 'Arctic Precision', level: 104, effect: { rng: 0.32, rngBonus: 250 }, desc: '+32% RNG, +250 RNG Bonus' },
  { id: 'frostweave_mastery', name: 'Frostweave Mastery', level: 106, effect: { mag: 0.35, dmg_reduction: 0.15 }, desc: '+35% MAG, +15% DR' },
  { id: 'eternal_harvest', name: 'Eternal Harvest', level: 107, effect: { tool_speed: 0.25, luck: 0.20 }, desc: '+25% Gathering Speed, +20% Drop Rates' },
  { id: 'blood_of_winter', name: 'Heart of Winter', level: 108, effect: { lifesteal: 0.03, hp_regen: 12 }, desc: '+3% LS, +12 HP/tick' },
  { id: 'frozen_perfection', name: 'Frozen Perfection', level: 109, effect: { xp_boost: 0.40 }, desc: '+40% All XP' },
  { id: 'absolute_zero', name: 'Frozen Supremacy', level: 110, effect: { atk: 0.35, str: 0.35, rng: 0.35, mag: 0.35, def: 0.25, boss_dmg: 0.35 }, desc: '+35% ATK/STR/RNG/MAG, +25% DEF, +35% Boss DMG' },
  { id: 'frozen_forge', name: 'Frozen Forge', level: 110, effect: { craft_speed: 0.24 }, desc: '+24% Production Speed' },
  { id: 'abyssal_sight', name: 'Abyssal Sight', level: 111, effect: { luck: 0.40 }, desc: '+40% Drop Rates' },
  { id: 'crushing_depths', name: 'Crushing Depths', level: 112, effect: { str: 0.40, atk: 0.40, def: 0.30 }, desc: '+40% ATK/STR, +30% DEF' },
  { id: 'voidborn_resilience', name: 'Voidborn Resilience', level: 113, effect: { def: 0.40, dmg_reduction: 0.25 }, desc: '+40% DEF, +25% DR' },
  { id: 'deep_current', name: 'Deep Current', level: 114, effect: { rng: 0.42, rngBonus: 350 }, desc: '+42% RNG, +350 RNG Bonus' },
  { id: 'void_channeling', name: 'Void Channeling', level: 115, effect: { mag: 0.45, dmg_reduction: 0.20 }, desc: '+45% MAG, +20% DR' },
  { id: 'abyssal_feast', name: 'Abyssal Feast', level: 116, effect: { lifesteal: 0.04, hp_regen: 18 }, desc: '+4% LS, +18 HP/tick' },
  { id: 'tidal_harvest', name: 'Tidal Harvest', level: 117, effect: { tool_speed: 0.40 }, desc: '+40% Gathering Speed' },
  { id: 'eternal_abyss', name: 'Eternal Abyss', level: 118, effect: { xp_boost: 0.50 }, desc: '+50% All XP' },
  { id: 'colossus_will', name: 'Colossus Will', level: 119, effect: { boss_dmg: 0.50, dmg_reduction: 0.30 }, desc: '+50% Boss DMG, +30% DR' },
  { id: 'abyssal_supremacy', name: 'Abyssal Supremacy', level: 120, effect: { atk: 0.45, str: 0.45, rng: 0.45, mag: 0.45, def: 0.35, boss_dmg: 0.50 }, desc: '+45% ATK/STR/RNG/MAG, +35% DEF, +50% Boss DMG' },
  
  { id: 'drowned_fortune', name: 'Drowned Fortune', level: 121, effect: { luck: 0.50 }, desc: '+50% Drop Rates' },
  { id: 'aeon_harvest', name: 'Aeon Harvest', level: 121, effect: { tool_speed: 0.50 }, desc: '+50% Gathering Speed' },
  { id: 'relic_breaker', name: 'Relic Breaker', level: 122, effect: { str: 0.52, atk: 0.52, def: 0.38 }, desc: '+52% ATK/STR, +38% DEF' },
  { id: 'phantom_hands', name: 'Phantom Hands', level: 122, effect: { thieving_success: 0.25 }, desc: '+25% Thieving Success' },
  { id: 'drowned_ward', name: 'Drowned Ward', level: 123, effect: { boss_dmg: 0.60, dmg_reduction: 0.35 }, desc: '+60% Boss DMG, +35% DR' },
  { id: 'wardens_bulwark', name: "Warden's Bulwark", level: 124, effect: { def: 0.50, dmg_reduction: 0.30 }, desc: '+50% DEF, +30% DR' },
  { id: 'wraith_precision', name: 'Wraith Precision', level: 125, effect: { rng: 0.52, rngBonus: 450 }, desc: '+52% RNG, +450 RNG Bonus' },
  { id: 'wraith_sight', name: 'Wraith Sight', level: 126, effect: { xp_boost: 0.60 }, desc: '+60% All XP' },
  { id: 'ruin_channeling', name: 'Ruin Channeling', level: 127, effect: { mag: 0.55, dmg_reduction: 0.25 }, desc: '+55% MAG, +25% DR' },
  { id: 'wraith_feast', name: 'Wraith Feast', level: 128, effect: { lifesteal: 0.05, hp_regen: 25 }, desc: '+5% LS, +25 HP/tick' },
  { id: 'aeon_artificer', name: 'Aeon Artificer', level: 129, effect: { craft_speed: 0.30 }, desc: '+30% Production Speed' },
  { id: 'primordial_dominion', name: 'Primordial Dominion', level: 130, effect: { atk: 0.55, str: 0.55, rng: 0.55, mag: 0.55, def: 0.45, boss_dmg: 0.60 }, desc: '+55% ATK/STR/RNG/MAG, +45% DEF, +60% Boss DMG' },
];
const TOME_UNLOCKED_PRAYERS = [
  {id:'abyssal_pact', name:'Abyssal Pact', level:1, desc:'+30% ATK/STR/RNG/MAG, +5% LS, <span style="color:#f87171">-25%</span> DR', effect:{atk:0.30, str:0.30, rng:0.30, mag:0.30, lifesteal:0.05, dmg_increase:0.25}},
  {id:'knights_vow', name:"Knight's Vow", level:1, desc:'+35% DEF, +35% DR', effect:{def:0.35, dmg_reduction:0.35}},
  {id:'wraith_pact', name:'Wraith Pact', level:1, desc:'+8% LS, +30 HP/tick', effect:{lifesteal:0.08, hp_regen:30}}
];
const BESTIARY_TIERS = [
  {kills:500,      label:'I',    drop:0.005,             walk:0.001},
  {kills:1500,     label:'II',   drop:0.01,              walk:0.002},
  {kills:5000,     label:'III',  drop:0.015,             walk:0.003},
  {kills:15000,    label:'IV',   drop:0.025,             walk:0.005},
  {kills:50000,    label:'V',    drop:0.04,              walk:0.008},
  {kills:150000,   label:'VI',   drop:0.06,  dmg:0.02,   walk:0.012},
  {kills:300000,   label:'VII',  drop:0.08,  dmg:0.04, def:0.02, walk:0.018},
  {kills:600000,   label:'VIII', drop:0.10,  dmg:0.06, def:0.04, walk:0.028},
  {kills:1200000,  label:'IX',   drop:0.13,  dmg:0.08, def:0.06, walk:0.042},
  {kills:2500000,  label:'X',    drop:0.16,  dmg:0.10, def:0.08, walk:0.060},
];
const WORLD_BOSS = {
  id:'world_boss_ashlyn', name:'Vampire Lord Ashlyn',
  img:'Assets/WB/vampirelord.png', color:'#dc2626',
  attemptsPerWeek:5, attemptTicks:200,   
  
  
  
  hp:5000000000,
  milestones:[0.1,0.3,0.6,1],
  gearDropChance:0.004, petDropChance:0.005,   
  keyDropChance:0.05,                    
  gearMinRarity:14,                      
  weekDmgCap:50000000,                   
  cacheDmgTarget:1500000,                
  cacheMaxChance:0.75,                   
  gearWeapons:["Ashlyn's Greatsword","Ashlyn's Longbow","Ashlyn's Staff"],
  
  gearMelee:["Ashlyn's Cuirass","Ashlyn's Greaves","Ashlyn's Gauntlets","Ashlyn's Boots"],
  gearRanged:["Ashlyn's Jerkin","Ashlyn's Chaps","Ashlyn's Bracers","Ashlyn's Hunting Boots"],
  gearMagic:["Ashlyn's Robe","Ashlyn's Silk Pants","Ashlyn's Silk Gloves","Ashlyn's Silk Boots"]
};
const MUSEUM_TIER_MULT = [0, 1, 2, 3, 4.5, 6, 8, 10.5, 13, 16];
const MUSEUM_BASE = {
  
  melee:  {str:0.00022, atk:0.00022, def:0.00026, dr:0.00013},
  ranged: {rng:0.000468, rngBonus:1.0, def:0.00016, lifesteal:0.000015},
  magic:  {mag:0.000414, def:0.00022, dr:0.00011},
};
const MUSEUM_CAP = {def:0.40, dr:0.20, str:0.45, atk:0.45, rng:0.45, mag:0.45, lifesteal:0.0075};
const MUSEUM_DEF_CAP = {melee:0.40, magic:0.32, ranged:0.26};
const MUSEUM_DR_CAP  = {melee:0.20, magic:0.12, ranged:0};
const MUSEUM_EXCLUDED = new Set(['Chocolate Greataxe','Rose Crown','Topaz Amulet','Amethyst Amulet','Pearl Ring']);
const FORGE_MATERIAL_TIER = {
  
  'Copper':1,'Iron':2,'Steel':3,'Cobalt':4,'Titanium':5,'Mythril':6,'Shadowsteel':6,'Frost':7,'Abyssal':8,'Aeonsteel':9,
  
  'Leather':1,'Reinforced':2,'Green Dragon':3,'Blue Dragon':4,'Red Dragon':5,'Black Dragon':6,'Frost Dragon':7,'Tidalscale':8,'Aeonscale':9,
  
  'Apprentice':1,'Adept':2,'Mage':3,'Sorcerer':4,'Warlock':5,'Archmage':6,'Frostweave':7,'Abyssweave':8,'Aeonweave':9,
  
  'Short Bow':1,'Birch Bow':2,'Aspen Bow':3,'Redwood Bow':4,'Ebony Bow':5,'Elder Bow':6,'Frozen Bow':7,'Tidalscale Crossbow':8,'Aeonscale Bow':9,
  
  'Copper Gloves':1,'Iron Gloves':2,'Steel Gloves':3,'Cobalt Gloves':4,'Titanium Gloves':5,'Mythril Gloves':6,
  
  'Copper Ring':1,'Iron Ring':2,'Gold Ring':3,'Ruby Ring':4,'Sapphire Ring':4,'Emerald Ring':4,'Diamond Ring':5,'Infernal Ring':6,'Frost Ring':7,
  
  'Copper Amulet':1,'Iron Amulet':2,'Gold Amulet':3,'Ruby Amulet':4,'Sapphire Amulet':4,'Emerald Amulet':4,'Diamond Amulet':5,'Ancient Amulet':5,'Infernal Pendant':6,
  
  'Leather Cape':1,'Wool Cape':2,'Silk Cape':3,'Shadow Cape':5,'Infernal Cape':6,'Frost Cape':7,
  
  'Copper Axe':1,'Iron Axe':2,'Steel Axe':3,'Cobalt Axe':4,'Titanium Axe':5,'Mythril Axe':6,'Shadowsteel Axe':6,'Glacial Axe':7,'Abyssalite Axe':8,'Tidal Axe':9,'Aeon Axe':10,
  'Copper Pick':1,'Iron Pick':2,'Steel Pick':3,'Cobalt Pick':4,'Titanium Pick':5,'Mythril Pick':6,'Shadowsteel Pick':6,'Glacial Pick':7,'Abyssalite Pick':8,'Tidal Pick':9,'Aeon Pick':10,
  'Basic Rod':1,'Iron Rod':2,'Steel Rod':3,'Cobalt Rod':4,'Titanium Rod':5,'Mythril Rod':6,'Shadowsteel Rod':6,'Glacial Rod':7,'Abyssalite Rod':8,'Tidal Rod':9,'Aeon Rod':10,
  
  'Chocolate Greataxe':5,'Rose Crown':5,
  'Chieftain Crown':3,'Lich Crown':4,
  'Void Ring':5,'Void Heart':5,
  'Volcanic Whip':6,'Volcanic Wand':6,'Volcanic Crossbow':6,
  'Frozen Heart Pendant':7,'Glacial Amulet':7,'Frozen Crown':7,
  
  'Abyssal Ring':8,'Abyssal Amulet':8,'Abyssal Cape':8,'Abyssal Crown':8,
  'Tidalscale Ring':8,'Tidalscale Amulet':8,'Tidalscale Cape':8,
  'Abyssweave Ring':8,'Abyssweave Amulet':8,'Abyssweave Cape':8,
  
  'Relic Crown':9,'Aeon Arrows':9,
  'Tidegrave':9,'Wraithpiercer':9,'Relicbrand Staff':9,
  
  
  'Wraith Quiver':9,'Wraith Sigil':9,'Wraith Rune':9,
  
  "Ashlyn's":9,
  
  'Treant Axe':9,'Greater Treant Axe':9,'Ancient Treant Axe':9,'Golem Pick':9,'Greater Golem Pick':9,'Ancient Golem Pick':9,'Kraken Rod':9,'Greater Kraken Rod':9,'Ancient Kraken Rod':9,
  
  'Amethyst Amulet':7,'Topaz Amulet':8,'Pearl Ring':9,
};
const ASSET_PATHS = {
  icons: 'Assets/Icons/',
  armor: 'Assets/Items/Armor/',
  weapons: 'Assets/Items/Weapons/',
  tools: 'Assets/Items/Tools/',
  misc: 'Assets/Items/Misc/',
  monsters: 'Assets/Monsters/',
  pets: 'Assets/Pets/',
  ranks: 'Assets/Ranks/',
  wb: 'Assets/WB/',
  swb: 'Assets/SWB/'
};
const PNG_ICONS = {
  pet_whistle: {path: 'misc', file: 'petwhistle.png'},
  skill_whistle: {path: 'misc', file: 'petwhistle1.png'},
  runic_quiver:    {path: 'misc', file: 'runicquiver.png'},
  wraith_quiver:   {path: 'misc', file: 'wraithquiver.png'},
  berserker_sigil: {path: 'misc', file: 'berserkersigil.png'},
  wraith_sigil:    {path: 'misc', file: 'wraithsigil.png'},
  gem_bag:         {path: 'misc', file: 'gembag.png'},
  underwater_chest:{path: 'misc', file: 'underwaterchest.png'},
  bird_nest:       {path: 'misc', file: 'birdnest.png'},
  rubber_ducky:    {path: 'misc', file: 'rubberducky.png'},
  old_boot:        {path: 'misc', file: 'oldboot.png'},
  pearl:           {path: 'misc', file: 'pearl.png'},
  pearl_ring:      {path: 'misc', file: 'pearlring.png'},
  topaz_amulet:    {path: 'misc', file: 'topazamulet.png'},
  amethyst_amulet: {path: 'misc', file: 'amethystamulet.png'},
  wraith_essence:  {path: 'misc', file: 'wraithessence.png'},
  
  vampire_lord_pet:  {path: 'wb', file: 'vampirelordpet.png'},
  ashlyn_cache:      {path: 'wb', file: 'cache.png'},
  castle_key:        {path: 'wb', file: 'castlekey.png'},
  ashlyn_greatsword: {path: 'wb', file: 'vampire2hander.png'},
  ashlyn_longbow:    {path: 'wb', file: 'vampire2hbow.png'},
  ashlyn_staff:      {path: 'wb', file: 'vampire2hstaff.png'},
  ashlyn_crown:      {path: 'wb', file: 'vampirecrown.png'},
  ashlyn_cuirass:    {path: 'wb', file: 'vampirechest.png'},
  ashlyn_greaves:    {path: 'wb', file: 'vampirelegs.png'},
  ashlyn_gauntlets:  {path: 'wb', file: 'vampiregloves.png'},
  ashlyn_boots:      {path: 'wb', file: 'vampireboots.png'},
  ashlyn_jerkin:     {path: 'wb', file: 'vampirerangedchest.png'},
  ashlyn_chaps:      {path: 'wb', file: 'vampirerangedpants.png'},
  ashlyn_bracers:    {path: 'wb', file: 'vampirerangedgloves.png'},
  ashlyn_hunting_boots: {path: 'wb', file: 'vampirerangedboots.png'},
  ashlyn_robe:       {path: 'wb', file: 'vampiremagechest.png'},
  ashlyn_silk_pants: {path: 'wb', file: 'vampiremagepants.png'},
  ashlyn_silk_gloves: {path: 'wb', file: 'vampiremagegloves.png'},
  ashlyn_silk_boots: {path: 'wb', file: 'vampiremageboots.png'},
  
  treants_chest: {path: 'swb', file: 'treantchest.png'},
  krakens_chest: {path: 'swb', file: 'krakenchest.png'},
  golems_chest: {path: 'swb', file: 'golemchest.png'},
  treant_axe: {path: 'swb', file: 'treantaxe1.png'},
  sapling_helm: {path: 'swb', file: 'treanthelm_copper.png'},
  sapling_chestplate: {path: 'swb', file: 'treantchest_copper.png'},
  sapling_leggings: {path: 'swb', file: 'treantlegs_copper.png'},
  sapling_boots: {path: 'swb', file: 'treantboots_copper.png'},
  sapling_gloves: {path: 'swb', file: 'treantgloves_copper.png'},
  heartwood_helm: {path: 'swb', file: 'treanthelm_jade.png'},
  heartwood_chestplate: {path: 'swb', file: 'treantchest_jade.png'},
  heartwood_leggings: {path: 'swb', file: 'treantlegs_jade.png'},
  heartwood_boots: {path: 'swb', file: 'treantboots_jade.png'},
  heartwood_gloves: {path: 'swb', file: 'treantgloves_jade.png'},
  elderwood_helm: {path: 'swb', file: 'treanthelm_sapphire.png'},
  elderwood_chestplate: {path: 'swb', file: 'treantchest_sapphire.png'},
  elderwood_leggings: {path: 'swb', file: 'treantlegs_sapphire.png'},
  elderwood_boots: {path: 'swb', file: 'treantboots_sapphire.png'},
  elderwood_gloves: {path: 'swb', file: 'treantgloves_sapphire.png'},
  reef_helm: {path: 'swb', file: 'krakenhelm_copper.png'},
  reef_chestplate: {path: 'swb', file: 'krakenchest_copper.png'},
  reef_leggings: {path: 'swb', file: 'krakenlegs_copper.png'},
  reef_boots: {path: 'swb', file: 'krakenboots_copper.png'},
  reef_gloves: {path: 'swb', file: 'krakengloves_copper.png'},
  deepsea_helm: {path: 'swb', file: 'krakenhelm_platinum.png'},
  deepsea_chestplate: {path: 'swb', file: 'krakenchest_platinum.png'},
  deepsea_leggings: {path: 'swb', file: 'krakenlegs_platinum.png'},
  deepsea_boots: {path: 'swb', file: 'krakenboots_platinum.png'},
  deepsea_gloves: {path: 'swb', file: 'krakengloves_platinum.png'},
  leviathan_helm: {path: 'swb', file: 'krakenhelm_obsidian.png'},
  leviathan_chestplate: {path: 'swb', file: 'krakenchest_obsidian.png'},
  leviathan_leggings: {path: 'swb', file: 'krakenlegs_obsidian.png'},
  leviathan_boots: {path: 'swb', file: 'krakenboots_obsidian.png'},
  leviathan_gloves: {path: 'swb', file: 'krakengloves_obsidian.png'},
  slate_helm: {path: 'swb', file: 'stonegolemhelm_bronze.png'},
  slate_chestplate: {path: 'swb', file: 'stonegolemchest_bronze.png'},
  slate_leggings: {path: 'swb', file: 'stonegolempants_bronze.png'},
  slate_boots: {path: 'swb', file: 'stonegolemboots_bronze.png'},
  slate_gloves: {path: 'swb', file: 'stonegolemgloves_bronze.png'},
  jade_helm: {path: 'swb', file: 'stonegolemhelm_jade.png'},
  jade_chestplate: {path: 'swb', file: 'stonegolemchest_jade.png'},
  jade_leggings: {path: 'swb', file: 'stonegolempants_jade.png'},
  jade_boots: {path: 'swb', file: 'stonegolemboots_jade.png'},
  jade_gloves: {path: 'swb', file: 'stonegolemgloves_jade.png'},
  obsidian_helm: {path: 'swb', file: 'stonegolemhelm_obsidian.png'},
  obsidian_chestplate: {path: 'swb', file: 'stonegolemchest_obsidian.png'},
  obsidian_leggings: {path: 'swb', file: 'stonegolempants_obsidian.png'},
  obsidian_boots: {path: 'swb', file: 'stonegolemboots_obsidian.png'},
  obsidian_gloves: {path: 'swb', file: 'stonegolemgloves_obsidian.png'},
  treant_pet: {path: 'swb', file: 'treantpet.png'},
  kraken_pet: {path: 'swb', file: 'krakenpet.png'},
  golem_pet: {path: 'swb', file: 'golempet.png'},
  greater_treant_axe: {path: 'swb', file: 'treantaxe2.png'},
  ancient_treant_axe: {path: 'swb', file: 'treantaxe3.png'},
  kraken_rod: {path: 'swb', file: 'krakenfishingrod1.png'},
  greater_kraken_rod: {path: 'swb', file: 'krakenfishingrod2.png'},
  ancient_kraken_rod: {path: 'swb', file: 'krakenfishingrod3.png'},
  golem_pick: {path: 'swb', file: 'golempickaxe1.png'},
  greater_golem_pick: {path: 'swb', file: 'golempickaxe2.png'},
  ancient_golem_pick: {path: 'swb', file: 'golempickaxe3.png'},
  
  clock: {path: 'icons', file: 'clock.png'},
  pack_autoforge: {path: 'icons', file: 'autoforge.png'},
  pack_afk:       {path: 'icons', file: '7afk.png'},
  attack: {path: 'icons', file: 'attack_skill.png'},
  strength: {path: 'icons', file: 'strength_skill.png'},
  defense: {path: 'icons', file: 'defense_skill.png'},
  ranged: {path: 'icons', file: 'ranged_skill.png'},
  magic: {path: 'icons', file: 'magic_skill.png'},
  divinity: {path: 'icons', file: 'divinity_skill.png'},
  woodcutting: {path: 'icons', file: 'woodcutting_skill.png'},
  mining: {path: 'icons', file: 'mining_skill.png'},
  fishing: {path: 'icons', file: 'fishing_skill.png'},
  cooking: {path: 'icons', file: 'cooking_skill.png'},
  smithing: {path: 'icons', file: 'smithing_skill.png'},
  crafting: {path: 'icons', file: 'crafting_skill.png'},
  arcane_arts: {path: 'icons', file: 'arcane_arts_skill.png'},
  thieving: {path: 'icons', file: 'thieving_skill.png'},
  
  sword: {path: 'icons', file: 'attack_skill.png'},
  str: {path: 'icons', file: 'strength_skill.png'},
  shield: {path: 'icons', file: 'defense_skill.png'},
  bow: {path: 'icons', file: 'ranged_skill.png'},
  prayer: {path: 'icons', file: 'divinity_skill.png'},
  potion: {path: 'icons', file: 'alchemy_skill.png'},
  axe: {path: 'icons', file: 'woodcutting_skill.png'},
  pick: {path: 'icons', file: 'mining_skill.png'},
  fish: {path: 'icons', file: 'fishing_skill.png'},
  fire: {path: 'icons', file: 'cooking_skill.png'},
  anvil: {path: 'icons', file: 'smithing_skill.png'},
  craft: {path: 'icons', file: 'crafting_skill.png'},
  
  copper_axe: {path: 'tools', file: 'copper_axe.png'},
  iron_axe: {path: 'tools', file: 'iron_axe.png'},
  steel_axe: {path: 'tools', file: 'steel_axe.png'},
  cobalt_axe: {path: 'tools', file: 'cobalt_axe.png'},
  titanium_axe: {path: 'tools', file: 'titanium_axe.png'},
  mythril_axe: {path: 'tools', file: 'mythril_axe.png'},
  shadowsteel_axe: {path: 'tools', file: 'shadowsteel_axe.png'},
  glacial_axe: {path: 'tools', file: 'glacial_axe.png'},
  copper_pick: {path: 'tools', file: 'copper_pick.png'},
  iron_pick: {path: 'tools', file: 'iron_pick.png'},
  steel_pick: {path: 'tools', file: 'steel_pick.png'},
  cobalt_pick: {path: 'tools', file: 'cobalt_pick.png'},
  titanium_pick: {path: 'tools', file: 'titanium_pick.png'},
  mythril_pick: {path: 'tools', file: 'mythril_pick.png'},
  shadowsteel_pick: {path: 'tools', file: 'shadowsteel_pick.png'},
  glacial_pick: {path: 'tools', file: 'glacial_pick.png'},
  basic_rod: {path: 'tools', file: 'basic_rod.png'},
  iron_rod: {path: 'tools', file: 'iron_rod.png'},
  steel_rod: {path: 'tools', file: 'steel_rod.png'},
  cobalt_rod: {path: 'tools', file: 'cobalt_rod.png'},
  titanium_rod: {path: 'tools', file: 'titanium_rod.png'},
  mythril_rod: {path: 'tools', file: 'mythril_rod.png'},
  shadowsteel_rod: {path: 'tools', file: 'shadowsteel_rod.png'},
  glacial_rod: {path: 'tools', file: 'glacial_rod.png'},
  abyssalite_axe: {path: 'tools', file: 'abyssalite_axe.png'},
  abyssalite_pick: {path: 'tools', file: 'abyssalite_pick.png'},
  abyssalite_rod: {path: 'tools', file: 'abyssalite_rod.png'},
  tidal_axe: {path: 'tools', file: 'tidal_axe.png'},
  tidal_pick: {path: 'tools', file: 'tidal_pick.png'},
  tidal_rod: {path: 'tools', file: 'tidal_rod.png'},
  
  gold: {path: 'icons', file: 'gold.png'},
  guild: {path: 'icons', file: 'guild.png'},
  communitycenter: {path: 'icons', file: 'communitycenter.png'},
  lantern1: {path: 'icons', file: 'lantern1.png'},
  lantern2: {path: 'icons', file: 'lantern2.png'},
  lantern3: {path: 'icons', file: 'lantern3.png'},
  hall: {path: 'icons', file: 'hall.png'},
  easter_egg: {path: 'misc', file: 'easter_egg.png'},
  pet_shop: {path: 'icons', file: 'pet_shop.png'},
  supply_shop: {path: 'icons', file: 'supply_shop.png'},
  tool_shop: {path: 'icons', file: 'tool_shop.png'},
  pawnshop: {path: 'icons', file: 'pawnshop.png'},
  museum: {path: 'icons', file: 'museum.png'},
  hunterslodge: {path: 'icons', file: 'hunterslodge.png'},
  easter_bunny: {path: 'pets', file: 'easter_bunny.png'},
  easter_chick: {path: 'pets', file: 'easter_chick.png'},
  easter_lamb: {path: 'pets', file: 'easter_lamb.png'},
  easter_duckling: {path: 'pets', file: 'easter_duckling.png'},
  easter_chocolate_egg: {path: 'misc', file: 'easter_chocolate_egg.png'},
  aeagle: {path: 'pets', file: 'aeagle.png'},
  moose: {path: 'pets', file: 'cmoose.png'},
  eagle: {path: 'pets', file: 'eagle.png'},
  goldmoose: {path: 'pets', file: 'moose.png'},
  redeagle: {path: 'pets', file: 'redeagle.png'},
  purplemoose: {path: 'pets', file: 'purplemoose.png'},
  fireworks: {path: 'misc', file: 'firework.png'},
  fries: {path: 'misc', file: 'fries.png'},
  hotdog: {path: 'misc', file: 'hotdog.png'},
  hamburger: {path: 'misc', file: 'hamburger.png'},
  maple_syrup: {path: 'misc', file: 'maplesyrup.png'},
  nanaimo_bar: {path: 'misc', file: 'nanaimo.png'},
  poutine: {path: 'misc', file: 'poutine.png'},
  maple_leaf: {path: 'misc', file: 'canadaday.png'},
  artificer: {path: 'icons', file: 'artificer.png'},
  gold_firework: {path: 'misc', file: 'goldfirework.png'},
  rainbow_firework: {path: 'misc', file: 'rainbowfirework.png'},
  gold_leaves: {path: 'misc', file: 'goldleaves.png'},
  rainbow_leaves: {path: 'misc', file: 'rainbowleaves.png'},
  arrow_shafts: {path: 'misc', file: 'arrowshaft.png'},
  thank_you_flower: {path: 'misc', file: 'dflower.png'},
  kills: {path: 'icons', file: 'kills.png'},
  
  heart_slime_jelly: {path: 'misc', file: 'heartslimejelly.png'},
  chocolate_bar: {path: 'misc', file: 'chocolatebar.png'},
  chocolate_chunks: {path: 'misc', file: 'chocolatechunks.png'},
  chocolate_greataxe: {path: 'weapons', file: 'greataxe_chocolate.png'},
  heartslime: {path: 'monsters', file: 'verdantmeadows/heartslime.png'},
  chocolate_minotaur: {path: 'monsters', file: 'dungeon/chocolateminotaur.png'},
  rose_crown_knight: {path: 'monsters', file: 'shadowlands/rosecrownknight.png'},
  rose_crown: {path: 'armor', file: 'rose_crown.png'},
  broken_heart_colossus: {path: 'monsters', file: 'frostlands/brokenheartcolossus.png'},
  frozen_heart_pendant: {path: 'armor', file: 'frozen_heart_pendant.png'},
  
  tome_of_abyssal_knowledge: {path: 'misc', file: 'tome_abyssal.png'},
  gathering_pass: {path: 'misc', file: 'scroll.png'},
  tome_knightstome: {path: 'misc', file: 'tome_knightstome.png'},

  
  chicken: {path: 'monsters', file: 'verdantmeadows/chicken.png'},
  rat: {path: 'monsters', file: 'verdantmeadows/giantrat.png'},
  cow: {path: 'monsters', file: 'verdantmeadows/cow.png'},
  goblin: {path: 'monsters', file: 'verdantmeadows/goblin.png'},
  bandit: {path: 'monsters', file: 'verdantmeadows/bandit.png'},
  scorpion: {path: 'monsters', file: 'verdantmeadows/scorpion.png'},
  guard: {path: 'monsters', file: 'verdantmeadows/guard.png'},
  boss_meadow: {path: 'monsters', file: 'verdantmeadows/goblinchieftain.png'},
  
  spider: {path: 'monsters', file: 'forest/spider.png'},
  wolf: {path: 'monsters', file: 'forest/wolf.png'},
  orc: {path: 'monsters', file: 'forest/orc.png'},
  troll: {path: 'monsters', file: 'forest/troll.png'},
  young_dragon: {path: 'monsters', file: 'forest/youngdragon.png'},
  green_dragon: {path: 'monsters', file: 'forest/greendragon.png'},
  boss_forest: {path: 'monsters', file: 'forest/mossgiant.png'},
  
  skeleton: {path: 'monsters', file: 'dungeon/skeleton.png'},
  zombie: {path: 'monsters', file: 'dungeon/zombie.png'},
  blue_dragon: {path: 'monsters', file: 'dungeon/bluedragon.png'},
  ghost: {path: 'monsters', file: 'dungeon/ghost.png'},
  vampire: {path: 'monsters', file: 'dungeon/vampire.png'},
  demon: {path: 'monsters', file: 'dungeon/demon.png'},
  boss_dungeon: {path: 'monsters', file: 'dungeon/lichking.png'},
  
  wraith: {path: 'monsters', file: 'shadowlands/wraith.png'},
  shade: {path: 'monsters', file: 'shadowlands/shade.png'},
  red_dragon: {path: 'monsters', file: 'shadowlands/reddragon.png'},
  shadow_knight: {path: 'monsters', file: 'shadowlands/darkknight.png'},
  nightmare: {path: 'monsters', file: 'shadowlands/nightmare.png'},
  soul_devourer: {path: 'monsters', file: 'shadowlands/souldevourer.png'},
  abyss_walker: {path: 'monsters', file: 'shadowlands/abysswalker.png'},
  boss_shadow: {path: 'monsters', file: 'shadowlands/voidspawn.png'},
  
  fire_elem: {path: 'monsters', file: 'volcano/fireelemental.png'},
  lava_golem: {path: 'monsters', file: 'volcano/lavagolem.png'},
  black_dragon: {path: 'monsters', file: 'volcano/blackdragon.png'},
  phoenix: {path: 'monsters', file: 'volcano/phoenix.png'},
  magma_serpent: {path: 'monsters', file: 'volcano/magmaserpent.png'},
  inferno_titan: {path: 'monsters', file: 'volcano/infernotitan.png'},
  ash_demon: {path: 'monsters', file: 'volcano/ashdemon.png'},
  boss_volcano: {path: 'monsters', file: 'volcano/infernallord.png'},
  
  siltjaw: {path: 'monsters', file: 'abyssal/siltjaw.png'},
  abyssal_ray: {path: 'monsters', file: 'abyssal/abyssalray.png'},
  depth_stalker: {path: 'monsters', file: 'abyssal/depthstalker.png'},
  deepfin_shark: {path: 'monsters', file: 'abyssal/deepfinshark.png'},
  lurking_horror: {path: 'monsters', file: 'abyssal/lurkinghorror.png'},
  razorjaw_eel: {path: 'monsters', file: 'abyssal/razorjaweel.png'},
  crushclaw_crab: {path: 'monsters', file: 'abyssal/crushclawcrab.png'},
  void_banshee: {path: 'monsters', file: 'abyssal/voidbanshee.png'},
  tidewitch: {path: 'monsters', file: 'abyssal/tidewitch.png'},
  abyssal_siren: {path: 'monsters', file: 'abyssal/abyssalsiren.png'},
  coral_fiend: {path: 'monsters', file: 'abyssal/coralfiend.png'},
  abyssal_angler: {path: 'monsters', file: 'abyssal/abyssalangler.png'},
  abyssal_boss: {path: 'monsters', file: 'abyssal/drownedcolossus.png'},
  
  stone_warden: {path: 'monsters', file: 'ruins/stonewarden.png'},
  tomb_eel: {path: 'monsters', file: 'ruins/tombeel.png'},
  ruin_guardian: {path: 'monsters', file: 'ruins/ruinguardian.png'},
  golem_drifter: {path: 'monsters', file: 'ruins/golemdrifter.png'},
  hollow_sentinel: {path: 'monsters', file: 'ruins/hollowsentinel.png'},
  cursed_archivist: {path: 'monsters', file: 'ruins/cursedarchivist.png'},
  relic_dragon: {path: 'monsters', file: 'ruins/relicdragon.png'},
  ruin_specter: {path: 'monsters', file: 'ruins/ruinspecter.png'},
  void_lurker: {path: 'monsters', file: 'ruins/voidlurker.png'},
  ruins_boss: {path: 'monsters', file: 'ruins/relicwraith.png'},
  
  ice_wolf: {path: 'monsters', file: 'frostlands/frostwolf.png'},
  ice_elemental: {path: 'monsters', file: 'frostlands/iceelemental.png'},
  yeti: {path: 'monsters', file: 'frostlands/frozenyeti.png'},
  frost_giant: {path: 'monsters', file: 'frostlands/frostgiant.png'},
  ice_dragon: {path: 'monsters', file: 'frostlands/frostdragon.png'},
  blizzard_wraith: {path: 'monsters', file: 'frostlands/blizzardwraith.png'},
  ice_golem: {path: 'monsters', file: 'frostlands/glacialgolem.png'},
  ice_lich: {path: 'monsters', file: 'frostlands/frozenlich.png'},
  boss_frost: {path: 'monsters', file: 'frostlands/frozenoverlord.png'},
  
  
  helmet_copper: {path: 'armor', file: 'helmet_copper.png'},
  platebody_copper: {path: 'armor', file: 'platebody_copper.png'},
  platelegs_copper: {path: 'armor', file: 'platelegs_copper.png'},
  shield_copper: {path: 'armor', file: 'shield_copper.png'},
  boots_copper: {path: 'armor', file: 'boots_copper.png'},
  gloves_copper: {path: 'armor', file: 'gloves_copper.png'},
  
  helmet_iron: {path: 'armor', file: 'helmet_iron.png'},
  platebody_iron: {path: 'armor', file: 'platebody_iron.png'},
  platelegs_iron: {path: 'armor', file: 'platelegs_iron.png'},
  shield_iron: {path: 'armor', file: 'shield_iron.png'},
  boots_iron: {path: 'armor', file: 'boots_iron.png'},
  gloves_iron: {path: 'armor', file: 'gloves_iron.png'},
  
  helmet_steel: {path: 'armor', file: 'helmet_steel.png'},
  platebody_steel: {path: 'armor', file: 'platebody_steel.png'},
  platelegs_steel: {path: 'armor', file: 'platelegs_steel.png'},
  shield_steel: {path: 'armor', file: 'shield_steel.png'},
  boots_steel: {path: 'armor', file: 'boots_steel.png'},
  gloves_steel: {path: 'armor', file: 'gloves_steel.png'},
  
  helmet_cobalt: {path: 'armor', file: 'helmet_cobalt.png'},
  platebody_cobalt: {path: 'armor', file: 'platebody_cobalt.png'},
  platelegs_cobalt: {path: 'armor', file: 'platelegs_cobalt.png'},
  shield_cobalt: {path: 'armor', file: 'shield_cobalt.png'},
  boots_cobalt: {path: 'armor', file: 'boots_cobalt.png'},
  gloves_cobalt: {path: 'armor', file: 'gloves_cobalt.png'},
  
  helmet_titanium: {path: 'armor', file: 'helmet_titanium.png'},
  platebody_titanium: {path: 'armor', file: 'platebody_titanium.png'},
  platelegs_titanium: {path: 'armor', file: 'platelegs_titanium.png'},
  shield_titanium: {path: 'armor', file: 'shield_titanium.png'},
  boots_titanium: {path: 'armor', file: 'boots_titanium.png'},
  gloves_titanium: {path: 'armor', file: 'gloves_titanium.png'},
  
  helmet_mythril: {path: 'armor', file: 'helmet_mythril.png'},
  platebody_mythril: {path: 'armor', file: 'platebody_mythril.png'},
  platelegs_mythril: {path: 'armor', file: 'platelegs_mythril.png'},
  shield_mythril: {path: 'armor', file: 'shield_mythril.png'},
  boots_mythril: {path: 'armor', file: 'boots_mythril.png'},
  gloves_mythril: {path: 'armor', file: 'gloves_mythril.png'},
  
  helmet_frost: {path: 'armor', file: 'helmet_frost.png'},
  platebody_frost: {path: 'armor', file: 'platebody_frost.png'},
  platelegs_frost: {path: 'armor', file: 'platelegs_frost.png'},
  shield_frost: {path: 'armor', file: 'shield_frost.png'},
  boots_frost: {path: 'armor', file: 'boots_frost.png'},
  gloves_frost: {path: 'armor', file: 'gloves_frost.png'},
  
  copper_ring: {path: 'armor', file: 'copper_ring.png'},
  iron_ring: {path: 'armor', file: 'iron_ring.png'},
  gold_ring: {path: 'armor', file: 'gold_ring.png'},
  ruby_ring: {path: 'armor', file: 'ruby_ring.png'},
  sapphire_ring: {path: 'armor', file: 'sapphire_ring.png'},
  emerald_ring: {path: 'armor', file: 'emerald_ring.png'},
  diamond_ring: {path: 'armor', file: 'diamond_ring.png'},
  void_ring: {path: 'armor', file: 'void_ring.png'},
  infernal_ring: {path: 'armor', file: 'infernal_ring.png'},
  frost_ring: {path: 'armor', file: 'frost_ring.png'},
  
  copper_amulet: {path: 'armor', file: 'copper_amulet.png'},
  iron_amulet: {path: 'armor', file: 'iron_amulet.png'},
  gold_amulet: {path: 'armor', file: 'gold_amulet.png'},
  ruby_amulet: {path: 'armor', file: 'ruby_amulet.png'},
  sapphire_amulet: {path: 'armor', file: 'sapphire_amulet.png'},
  emerald_amulet: {path: 'armor', file: 'emerald_amulet.png'},
  diamond_amulet: {path: 'armor', file: 'diamond_amulet.png'},
  ancient_amulet: {path: 'armor', file: 'ancient_amulet.png'},
  void_heart: {path: 'armor', file: 'void_heart.png'},
  infernal_pendant: {path: 'armor', file: 'infernal_pendant.png'},
  glacial_amulet: {path: 'armor', file: 'glacial_amulet.png'},
  
  leather_cape: {path: 'armor', file: 'leather_cape.png'},
  wool_cape: {path: 'armor', file: 'wool_cape.png'},
  silk_cape: {path: 'armor', file: 'silk_cape.png'},
  shadow_cape: {path: 'armor', file: 'shadow_cape.png'},
  infernal_cape: {path: 'armor', file: 'infernal_cape.png'},
  frost_cape: {path: 'armor', file: 'frost_cape.png'},
  
  chieftain_crown: {path: 'armor', file: 'chieftain_crown.png'},
  lich_crown: {path: 'armor', file: 'lich_crown.png'},
  frozen_crown: {path: 'armor', file: 'frozen_crown.png'},
  
  sword_copper: {path: 'weapons', file: 'sword_copper.png'},
  sword_iron: {path: 'weapons', file: 'sword_iron.png'},
  sword_steel: {path: 'weapons', file: 'sword_steel.png'},
  sword_cobalt: {path: 'weapons', file: 'sword_cobalt.png'},
  sword_titanium: {path: 'weapons', file: 'sword_titanium.png'},
  sword_mythril: {path: 'weapons', file: 'sword_mythril.png'},
  sword_frost: {path: 'weapons', file: 'sword_frost.png'},
  
  blade_copper: {path: 'weapons', file: 'blade_copper.png'},
  blade_iron: {path: 'weapons', file: 'blade_iron.png'},
  blade_steel: {path: 'weapons', file: 'blade_steel.png'},
  blade_cobalt: {path: 'weapons', file: 'blade_cobalt.png'},
  blade_titanium: {path: 'weapons', file: 'blade_titanium.png'},
  blade_mythril: {path: 'weapons', file: 'blade_mythril.png'},
  blade_frost: {path: 'weapons', file: 'blade_frost.png'},
  
  copper_greatsword: {path: 'weapons', file: 'greatsword_copper.png'},
  iron_greatsword: {path: 'weapons', file: 'greatsword_iron.png'},
  steel_greatsword: {path: 'weapons', file: 'greatsword_steel.png'},
  cobalt_greatsword: {path: 'weapons', file: 'greatsword_cobalt.png'},
  titanium_greatsword: {path: 'weapons', file: 'greatsword_titanium.png'},
  mythril_greatsword: {path: 'weapons', file: 'greatsword_mythril.png'},
  frost_greatsword: {path: 'weapons', file: 'greatsword_frost.png'},
  adventure_log: {path: 'icons', file: 'adventure_log.png'},
  gear_log: {path: 'armor', file: 'platebody_steel.png'},
  resources: {path: 'icons', file: 'resources.png'},
  tidegrave: {path: 'weapons', file: 'tidegrave.png'},
  wraithpiercer: {path: 'weapons', file: 'wraithpiercer.png'},
  relicbrand_staff: {path: 'weapons', file: 'relicbrand_staff.png'},
  aeonsteel_sword: {path: 'weapons', file: 'sword_aeonsteel.png'},
  aeonsteel_blade: {path: 'weapons', file: 'blade_aeonsteel.png'},
  aeonsteel_greatsword: {path: 'weapons', file: 'greatsword_aeonsteel.png'},
  aeonscale_bow: {path: 'weapons', file: 'bow_aeonscale.png'},
  aeon_arrows: {path: 'weapons', file: 'arrows_aeon.png'},
  aeonweave_staff: {path: 'weapons', file: 'staff_aeonweave.png'},
  aeonweave_wand: {path: 'weapons', file: 'wand_aeonweave.png'},
  wraith_torrent: {path: 'weapons', file: 'spell_wraith_torrent.png'},
  drowned_cataclysm: {path: 'weapons', file: 'spell_drowned_cataclysm.png'},
  dragonfire_rune: {path: 'weapons', file: 'rune_dragonfire.png'},
  aeonsteel_helm: {path: 'armor', file: 'helm_aeonsteel.png'},
  aeonsteel_plate: {path: 'armor', file: 'plate_aeonsteel.png'},
  aeonsteel_legs: {path: 'armor', file: 'legs_aeonsteel.png'},
  aeonsteel_shield: {path: 'armor', file: 'shield_aeonsteel.png'},
  aeonsteel_boots: {path: 'armor', file: 'boots_aeonsteel.png'},
  aeonsteel_gloves: {path: 'armor', file: 'gloves_aeonsteel.png'},
  aeonscale_hat: {path: 'armor', file: 'hat_aeonscale.png'},
  aeonscale_tunic: {path: 'armor', file: 'tunic_aeonscale.png'},
  aeonscale_pants: {path: 'armor', file: 'legs_aeonscale.png'},
  aeonscale_boots: {path: 'armor', file: 'boots_aeonscale.png'},
  aeonscale_gloves: {path: 'armor', file: 'gloves_aeonscale.png'},
  aeonweave_tome: {path: 'armor', file: 'tome_aeonweave.png'},
  aeonweave_hood: {path: 'armor', file: 'hood_aeonweave.png'},
  aeonweave_robe: {path: 'armor', file: 'robe_aeonweave.png'},
  aeonweave_pants: {path: 'armor', file: 'pants_aeonweave.png'},
  aeonweave_boots: {path: 'armor', file: 'boots_aeonweave.png'},
  aeonweave_gloves: {path: 'armor', file: 'gloves_aeonweave.png'},
  aeonsteel_ring: {path: 'armor', file: 'aeonsteel_ring.png'},
  aeonsteel_amulet: {path: 'armor', file: 'aeonsteel_amulet.png'},
  aeonsteel_cape: {path: 'armor', file: 'cape_aeonsteel.png'},
  aeonscale_ring: {path: 'armor', file: 'aeonscale_ring.png'},
  aeonscale_amulet: {path: 'armor', file: 'aeonscale_amulet.png'},
  aeonscale_cape: {path: 'armor', file: 'cape_aeonscale.png'},
  aeonweave_ring: {path: 'armor', file: 'aeonweave_ring.png'},
  aeonweave_amulet: {path: 'armor', file: 'aeonweave_amulet.png'},
  aeonweave_cape: {path: 'armor', file: 'cape_aeonweave.png'},
  relic_crown: {path: 'armor', file: 'relic_crown.png'},
  aeon_axe: {path: 'tools', file: 'aeon_axe.png'},
  aeon_pick: {path: 'tools', file: 'aeon_pick.png'},
  aeon_rod: {path: 'tools', file: 'aeon_rod.png'},
  tome_of_the_ancients: {path: 'misc', file: 'tome_ancients.png'},
  abyssal_sword: {path: 'weapons', file: 'sword_abyssal.png'},
  abyssal_blade: {path: 'weapons', file: 'blade_abyssal.png'},
  abyssal_greatsword: {path: 'weapons', file: 'greatsword_abyssal.png'},
  helmet_abyssal: {path: 'armor', file: 'helmet_abyssal.png'},
  platebody_abyssal: {path: 'armor', file: 'platebody_abyssal.png'},
  platelegs_abyssal: {path: 'armor', file: 'platelegs_abyssal.png'},
  shield_abyssal: {path: 'armor', file: 'shield_abyssal.png'},
  boots_abyssal: {path: 'armor', file: 'boots_abyssal.png'},
  gloves_abyssal: {path: 'armor', file: 'gloves_abyssal.png'},
  
  short_bow: {path: 'weapons', file: 'bow_short.png'},
  birch_bow: {path: 'weapons', file: 'bow_birch.png'},
  aspen_bow: {path: 'weapons', file: 'bow_aspen.png'},
  redwood_bow: {path: 'weapons', file: 'bow_redwood.png'},
  ebony_bow: {path: 'weapons', file: 'bow_ebony.png'},
  elder_bow: {path: 'weapons', file: 'bow_elder.png'},
  frozen_bow: {path: 'weapons', file: 'bow_frozen.png'},
  volcanic_crossbow: {path: 'weapons', file: 'crossbow_volcanic.png'},
  volcanic_wand: {path: 'weapons', file: 'volcanic_wand.png'},
  volcanic_whip: {path: 'weapons', file: 'volcanic_whip.png'},
  apprentice_staff: {path: 'weapons', file: 'staff_apprentice.png'},
  adept_staff: {path: 'weapons', file: 'staff_adept.png'},
  mage_staff: {path: 'weapons', file: 'staff_mage.png'},
  sorcerer_staff: {path: 'weapons', file: 'staff_sorcerer.png'},
  warlock_staff: {path: 'weapons', file: 'staff_warlock.png'},
  archmage_staff: {path: 'weapons', file: 'staff_archmage.png'},
  frostweave_staff: {path: 'weapons', file: 'staff_frostweave.png'},
  apprentice_wand: {path: 'weapons', file: 'wand_apprentice.png'},
  adept_wand: {path: 'weapons', file: 'wand_adept.png'},
  mage_wand: {path: 'weapons', file: 'wand_mage.png'},
  sorcerer_wand: {path: 'weapons', file: 'wand_sorcerer.png'},
  warlock_wand: {path: 'weapons', file: 'wand_warlock.png'},
  archmage_wand: {path: 'weapons', file: 'wand_archmage.png'},
  frostweave_wand: {path: 'weapons', file: 'wand_frostweave.png'},
  spark: {path: 'weapons', file: 'spell_spark.png'},
  fire_bolt: {path: 'weapons', file: 'spell_fire_bolt.png'},
  ice_shard: {path: 'weapons', file: 'spell_ice_shard.png'},
  lightning_strike: {path: 'weapons', file: 'spell_lightning_strike.png'},
  flame_wave: {path: 'weapons', file: 'spell_flame_wave.png'},
  frost_nova: {path: 'weapons', file: 'spell_frost_nova.png'},
  chain_lightning: {path: 'weapons', file: 'spell_chain_lightning.png'},
  inferno: {path: 'weapons', file: 'spell_inferno.png'},
  blizzard: {path: 'weapons', file: 'spell_blizzard.png'},
  thunder_storm: {path: 'weapons', file: 'spell_thunder_storm.png'},
  spark_rune: {path: 'weapons', file: 'rune_spark.png'},
  fire_rune: {path: 'weapons', file: 'rune_fire.png'},
  ice_rune: {path: 'weapons', file: 'rune_ice.png'},
  storm_rune: {path: 'weapons', file: 'rune_storm.png'},
  flame_rune: {path: 'weapons', file: 'rune_flame.png'},
  frost_rune: {path: 'weapons', file: 'rune_frost.png'},
  rune_frost_covenant: {path: 'weapons', file: 'rune_frost_covenant.png'},
  wraith_rune: {path: 'weapons', file: 'wraithrune.png'},
  chain_rune: {path: 'weapons', file: 'rune_chain.png'},
  inferno_rune: {path: 'weapons', file: 'rune_inferno.png'},
  blizzard_rune: {path: 'weapons', file: 'rune_blizzard.png'},
  thunder_rune: {path: 'weapons', file: 'rune_thunder.png'},
  meteor: {path: 'weapons', file: 'spell_meteor.png'},
  glacial_spike: {path: 'weapons', file: 'spell_glacial_spike.png'},
  arc_surge: {path: 'weapons', file: 'spell_arc_surge.png'},
  pyroclasm: {path: 'weapons', file: 'spell_pyroclasm.png'},
  frozen_orb: {path: 'weapons', file: 'spell_frozen_orb.png'},
  plasma_bolt: {path: 'weapons', file: 'spell_plasma_bolt.png'},
  flame_tempest: {path: 'weapons', file: 'spell_flame_tempest.png'},
  absolute_zero: {path: 'weapons', file: 'spell_absolute_zero.png'},
  voltaic_barrage: {path: 'weapons', file: 'spell_voltaic_barrage.png'},
  dragon_fire: {path: 'weapons', file: 'spell_dragon_fire.png'},
  glacial_fury: {path: 'weapons', file: 'spell_glacial_fury.png'},
  void_bolt: {path: 'weapons', file: 'spell_void_bolt.png'},
  cataclysm: {path: 'weapons', file: 'spell_cataclysm.png'},
  celestial_storm: {path: 'weapons', file: 'spell_celestial_storm.png'},
  armageddon: {path: 'weapons', file: 'spell_armageddon.png'},
  oblivion: {path: 'weapons', file: 'spell_oblivion.png'},
  tidal_surge: {path: 'weapons', file: 'spell_tidal_surge.png'},
  abyssal_wave: {path: 'weapons', file: 'spell_abyssal_wave.png'},
  soul_rend: {path: 'weapons', file: 'spell_soul_rend.png'},
  depth_collapse: {path: 'weapons', file: 'spell_depth_collapse.png'},
  abyssal_annihilation: {path: 'weapons', file: 'spell_abyssal_annihilation.png'},
  
  copper_arrows: {path: 'weapons', file: 'arrows_copper.png'},
  iron_arrows: {path: 'weapons', file: 'arrows_iron.png'},
  steel_arrows: {path: 'weapons', file: 'arrows_steel.png'},
  cobalt_arrows: {path: 'weapons', file: 'arrows_cobalt.png'},
  titanium_arrows: {path: 'weapons', file: 'arrows_titanium.png'},
  mythril_arrows: {path: 'weapons', file: 'arrows_mythril.png'},
  frost_arrows: {path: 'weapons', file: 'arrows_frost.png'},
  tidalscale_crossbow: {path: 'weapons', file: 'crossbow_tidalscale.png'},
  abyssal_arrows: {path: 'weapons', file: 'arrows_abyssal.png'},
  abyssal_helm: {path: 'armor', file: 'helm_abyssal.png'},
  abyssal_plate: {path: 'armor', file: 'plate_abyssal.png'},
  abyssal_legs: {path: 'armor', file: 'legs_abyssal.png'},
  abyssal_boots: {path: 'armor', file: 'boots_abyssal.png'},
  abyssal_gloves: {path: 'armor', file: 'gloves_abyssal.png'},
  abyssal_shield: {path: 'armor', file: 'shield_abyssal.png'},
  tidalscale_hat: {path: 'armor', file: 'hat_tidalscale.png'},
  tidalscale_tunic: {path: 'armor', file: 'tunic_tidalscale.png'},
  tidalscale_pants: {path: 'armor', file: 'pants_tidalscale.png'},
  tidalscale_boots: {path: 'armor', file: 'boots_tidalscale.png'},
  tidalscale_gloves: {path: 'armor', file: 'gloves_tidalscale.png'},
  
  leather_hat: {path: 'armor', file: 'leather_hat.png'},
  leather_tunic: {path: 'armor', file: 'leather_tunic.png'},
  leather_pants: {path: 'armor', file: 'leather_pants.png'},
  leather_boots: {path: 'armor', file: 'leather_boots.png'},
  leather_gloves: {path: 'armor', file: 'leather_gloves.png'},
  
  reinforced_hat: {path: 'armor', file: 'reinforced_hat.png'},
  reinforced_tunic: {path: 'armor', file: 'reinforced_tunic.png'},
  reinforced_pants: {path: 'armor', file: 'reinforced_pants.png'},
  reinforced_boots: {path: 'armor', file: 'reinforced_boots.png'},
  reinforced_gloves: {path: 'armor', file: 'reinforced_gloves.png'},
  
  green_dragon_hat: {path: 'armor', file: 'green_dragon_hat.png'},
  green_dragon_tunic: {path: 'armor', file: 'green_dragon_tunic.png'},
  green_dragon_pants: {path: 'armor', file: 'green_dragon_pants.png'},
  green_dragon_boots: {path: 'armor', file: 'green_dragon_boots.png'},
  green_dragon_gloves: {path: 'armor', file: 'green_dragon_gloves.png'},
  
  blue_dragon_hat: {path: 'armor', file: 'blue_dragon_hat.png'},
  blue_dragon_tunic: {path: 'armor', file: 'blue_dragon_tunic.png'},
  blue_dragon_pants: {path: 'armor', file: 'blue_dragon_pants.png'},
  blue_dragon_boots: {path: 'armor', file: 'blue_dragon_boots.png'},
  blue_dragon_gloves: {path: 'armor', file: 'blue_dragon_gloves.png'},
  
  red_dragon_hat: {path: 'armor', file: 'red_dragon_hat.png'},
  red_dragon_tunic: {path: 'armor', file: 'red_dragon_tunic.png'},
  red_dragon_pants: {path: 'armor', file: 'red_dragon_pants.png'},
  red_dragon_boots: {path: 'armor', file: 'red_dragon_boots.png'},
  red_dragon_gloves: {path: 'armor', file: 'red_dragon_gloves.png'},
  
  black_dragon_hat: {path: 'armor', file: 'black_dragon_hat.png'},
  black_dragon_tunic: {path: 'armor', file: 'black_dragon_tunic.png'},
  black_dragon_pants: {path: 'armor', file: 'black_dragon_pants.png'},
  black_dragon_boots: {path: 'armor', file: 'black_dragon_boots.png'},
  black_dragon_gloves: {path: 'armor', file: 'black_dragon_gloves.png'},
  
  frost_dragon_hat: {path: 'armor', file: 'frost_dragon_hat.png'},
  frost_dragon_tunic: {path: 'armor', file: 'frost_dragon_tunic.png'},
  frost_dragon_pants: {path: 'armor', file: 'frost_dragon_pants.png'},
  frost_dragon_boots: {path: 'armor', file: 'frost_dragon_boots.png'},
  frost_dragon_gloves: {path: 'armor', file: 'frost_dragon_gloves.png'},
  apprentice_tome: {path: 'armor', file: 'tome_apprentice.png'},
  apprentice_hood: {path: 'armor', file: 'hood_apprentice.png'},
  apprentice_robe: {path: 'armor', file: 'robe_apprentice.png'},
  apprentice_pants: {path: 'armor', file: 'pants_apprentice.png'},
  apprentice_boots: {path: 'armor', file: 'boots_apprentice.png'},
  apprentice_gloves: {path: 'armor', file: 'gloves_apprentice.png'},
  apprentice_cape: {path: 'armor', file: 'cape_apprentice.png'},
  adept_tome: {path: 'armor', file: 'tome_adept.png'},
  adept_hood: {path: 'armor', file: 'hood_adept.png'},
  adept_robe: {path: 'armor', file: 'robe_adept.png'},
  adept_pants: {path: 'armor', file: 'pants_adept.png'},
  adept_boots: {path: 'armor', file: 'boots_adept.png'},
  adept_gloves: {path: 'armor', file: 'gloves_adept.png'},
  adept_cape: {path: 'armor', file: 'cape_adept.png'},
  mage_tome: {path: 'armor', file: 'tome_mage.png'},
  mage_hood: {path: 'armor', file: 'hood_mage.png'},
  mage_robe: {path: 'armor', file: 'robe_mage.png'},
  mage_pants: {path: 'armor', file: 'pants_mage.png'},
  mage_boots: {path: 'armor', file: 'boots_mage.png'},
  mage_gloves: {path: 'armor', file: 'gloves_mage.png'},
  mage_cape: {path: 'armor', file: 'cape_mage.png'},
  sorcerer_tome: {path: 'armor', file: 'tome_sorcerer.png'},
  sorcerer_hood: {path: 'armor', file: 'hood_sorcerer.png'},
  sorcerer_robe: {path: 'armor', file: 'robe_sorcerer.png'},
  sorcerer_pants: {path: 'armor', file: 'pants_sorcerer.png'},
  sorcerer_boots: {path: 'armor', file: 'boots_sorcerer.png'},
  sorcerer_gloves: {path: 'armor', file: 'gloves_sorcerer.png'},
  sorcerer_cape: {path: 'armor', file: 'cape_sorcerer.png'},
  warlock_tome: {path: 'armor', file: 'tome_warlock.png'},
  warlock_hood: {path: 'armor', file: 'hood_warlock.png'},
  warlock_robe: {path: 'armor', file: 'robe_warlock.png'},
  warlock_pants: {path: 'armor', file: 'pants_warlock.png'},
  warlock_boots: {path: 'armor', file: 'boots_warlock.png'},
  warlock_gloves: {path: 'armor', file: 'gloves_warlock.png'},
  warlock_cape: {path: 'armor', file: 'cape_warlock.png'},
  archmage_tome: {path: 'armor', file: 'tome_archmage.png'},
  archmage_hood: {path: 'armor', file: 'hood_archmage.png'},
  archmage_robe: {path: 'armor', file: 'robe_archmage.png'},
  archmage_pants: {path: 'armor', file: 'pants_archmage.png'},
  archmage_boots: {path: 'armor', file: 'boots_archmage.png'},
  archmage_gloves: {path: 'armor', file: 'gloves_archmage.png'},
  archmage_cape: {path: 'armor', file: 'cape_archmage.png'},
  
  frostweave_tome: {path: 'armor', file: 'tome_frostweave.png'},
  frostweave_hood: {path: 'armor', file: 'hood_frostweave.png'},
  frostweave_robe: {path: 'armor', file: 'robe_frostweave.png'},
  frostweave_pants: {path: 'armor', file: 'pants_frostweave.png'},
  frostweave_boots: {path: 'armor', file: 'boots_frostweave.png'},
  frostweave_gloves: {path: 'armor', file: 'gloves_frostweave.png'},
  frostweave_cape: {path: 'armor', file: 'cape_frostweave.png'},
  abyssweave_staff: {path: 'weapons', file: 'staff_abyssweave.png'},
  abyssweave_wand: {path: 'weapons', file: 'wand_abyssweave.png'},
  abyssweave_tome: {path: 'armor', file: 'tome_abyssweave.png'},
  abyssweave_hood: {path: 'armor', file: 'hood_abyssweave.png'},
  abyssweave_robe: {path: 'armor', file: 'robe_abyssweave.png'},
  abyssweave_pants: {path: 'armor', file: 'pants_abyssweave.png'},
  abyssweave_boots: {path: 'armor', file: 'boots_abyssweave.png'},
  abyssweave_gloves: {path: 'armor', file: 'gloves_abyssweave.png'},
  abyssal_ring: {path: 'armor', file: 'abyssal_ring.png'},
  abyssal_amulet: {path: 'armor', file: 'abyssal_amulet.png'},
  abyssal_cape: {path: 'armor', file: 'cape_abyssal.png'},
  tidalscale_ring: {path: 'armor', file: 'tidalscale_ring.png'},
  tidalscale_amulet: {path: 'armor', file: 'tidalscale_amulet.png'},
  tidalscale_cape: {path: 'armor', file: 'cape_tidalscale.png'},
  abyssweave_ring: {path: 'armor', file: 'abyssweave_ring.png'},
  abyssweave_amulet: {path: 'armor', file: 'abyssweave_amulet.png'},
  abyssweave_cape: {path: 'armor', file: 'cape_abyssweave.png'},
  abyssal_crown: {path: 'armor', file: 'abyssal_crown.png'},
  
  
  na_boots: {path: 'armor', file: 'na_boots.png'},
  na_gloves: {path: 'armor', file: 'na_gloves.png'},
  
  crown: {path: 'icons', file: 'crown.png'},
  
  chocolate_bear: {path: 'pets', file: 'chocolate_bear.png'},
  chocolate_turtle: {path: 'pets', file: 'chocolate_turtle.png'},
  chocolate_rabbit: {path: 'pets', file: 'chocolate_rabbit.png'},
  chocolate_horse: {path: 'pets', file: 'chocolate_horse.png'},
  bear: {path: 'pets', file: 'bear.png'},
  turtle: {path: 'pets', file: 'turtle.png'},
  bearpremium: {path: 'pets', file: 'bearpremium.png'},
  turtlepremium: {path: 'pets', file: 'turtlepremium.png'},
  rabbit: {path: 'pets', file: 'rabbit.png'},
  horse: {path: 'pets', file: 'horse.png'},
  bunny: {path: 'pets', file: 'bunny.png'},
  chick: {path: 'pets', file: 'chick.png'},
  duckling: {path: 'pets', file: 'duckling.png'},
  lamb: {path: 'pets', file: 'lamb.png'},
  black_white_horse: {path: 'pets', file: 'black_white_horse.png'},
  orange_rabbit: {path: 'pets', file: 'orange_rabbit.png'},
  brown_bunny: {path: 'pets', file: 'brown_bunny.png'},
  green_chick: {path: 'pets', file: 'green_chick.png'},
  blue_duckling: {path: 'pets', file: 'blue_duckling.png'},
  brown_lamb: {path: 'pets', file: 'brown_lamb.png'},
  goblin_chieftain_pet: {path: 'pets', file: 'goblin_chieftain_pet.png'},
  moss_giant_pet: {path: 'pets', file: 'moss_giant_pet.png'},
  lich_king_pet: {path: 'pets', file: 'lich_king_pet.png'},
  void_spawn_pet: {path: 'pets', file: 'void_spawn_pet.png'},
  infernal_lord_pet: {path: 'pets', file: 'infernal_lord_pet.png'},
  frozen_overlord_pet: {path: 'pets', file: 'frozen_overlord_pet.png'},
  drowned_colossus_pet: {path: 'pets', file: 'drowned_colossus_pet.png'},
  relic_wraith_pet: {path: 'pets', file: 'relic_wraith_pet.png'},
  
  rank_e:  {path: 'ranks', file: 'e.png'},
  rank_d:  {path: 'ranks', file: 'd.png'},
  rank_c:  {path: 'ranks', file: 'c.png'},
  rank_b:  {path: 'ranks', file: 'b.png'},
  rank_a:  {path: 'ranks', file: 'a.png'},
  rank_s:  {path: 'ranks', file: 's.png'},
  rank_ss: {path: 'ranks', file: 'ss.png'},
  
  goblin_chieftain_pet_1:  {path: 'pets', file: 'goblin_chieftain_pet_1.png'},
  moss_giant_pet_1:        {path: 'pets', file: 'moss_giant_pet_1.png'},
  lich_king_pet_1:         {path: 'pets', file: 'lich_king_pet_1.png'},
  void_spawn_pet_1:        {path: 'pets', file: 'void_spawn_pet_1.png'},
  infernal_lord_pet_1:     {path: 'pets', file: 'infernal_lord_pet_1.png'},
  frozen_overlord_pet_1:   {path: 'pets', file: 'frozen_overlord_pet_1.png'},
  drowned_colossus_pet_1:  {path: 'pets', file: 'drowned_colossus_pet_1.png'},
  relic_wraith_pet_1:      {path: 'pets', file: 'relic_wraith_pet_1.png'},
  halloween_candy: {path: 'misc', file: 'halloweencandy.png'},
  haunted_portal: {path: 'misc', file: 'haunted_portal.png'},
  candy_apple: {path: 'misc', file: 'caramelapple.png'},
  fx_candy: {path: 'misc', file: 'candyburst.png'},
  fx_ghost: {path: 'misc', file: 'ghostwisps.png'},
  fx_cauldron: {path: 'misc', file: 'cauldronsplash.png'},
  pumpkin_pie: {path: 'misc', file: 'pumpkinpie.png'},
  ghost_cake: {path: 'misc', file: 'ghostcake.png'},
  black_cat: {path: 'pets', file: 'black_cat.png'},
  pumpkin_slime: {path: 'pets', file: 'pumpkin_slime.png'},
  ghost_pet: {path: 'pets', file: 'ghost.png'},
  candy_gather: {path: 'misc', file: 'candy_gathering.png'},
  candy_process: {path: 'misc', file: 'candy_processing.png'},
  candy_dmg: {path: 'misc', file: 'candy_combat.png'},
  candy_xp: {path: 'misc', file: 'candy_xp.png'},
  
  miningpet:      {path: 'pets', file: 'miningpet.png'},
  woodcuttingpet: {path: 'pets', file: 'woodcuttingpet.png'},
  fishingpet:     {path: 'pets', file: 'fishingpet.png'},
  smithingpet:    {path: 'pets', file: 'smithingpet.png'},
  craftingpet:    {path: 'pets', file: 'craftingpet.png'},
  cookingpet:     {path: 'pets', file: 'cookingpet.png'},
  alchemypet:     {path: 'pets', file: 'alchemypet.png'},
  arcaneartspet:  {path: 'pets', file: 'arcaneartspet.png'},
  divinitypet:    {path: 'pets', file: 'divinitypet.png'},
  thievingpet:    {path: 'pets', file: 'thievingpet.png'},
  
  bonedog:        {path: 'pets', file: 'bonedog.png'},
  nibbles:        {path: 'pets', file: 'nibbles.png'},
};
const SVG = {
  
  google: `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6.5 19a4.5 4.5 0 0 1-.42-8.98 6 6 0 0 1 11.84 0A4.5 4.5 0 0 1 17.5 19h-11z"/><path d="M12 13v4m0 0l-2-2m2 2l2-2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
  wraith_essence: `<svg viewBox="0 0 24 24"><path d="M12 2.5c-1.2 2-2.8 2.6-2.8 4.6h5.6c0-2-1.6-2.6-2.8-4.6z" fill="#5eead4" opacity="0.55"/><circle cx="12" cy="13.5" r="6.8" fill="#134e4a"/><circle cx="12" cy="13.5" r="5.4" fill="#0d9488"/><circle cx="12" cy="13.5" r="3.6" fill="#2dd4bf"/><circle cx="10.6" cy="12" r="1.5" fill="#ccfbf1" opacity="0.9"/><path d="M6.2 17.5c.9 2.2 3 3.6 5.8 3.6s4.9-1.4 5.8-3.6c-1.1 1-2.3.2-3.2 1-.8.7-1.7.8-2.6.1-1-.8-2.1.1-3-.4-.9-.5-2 .1-2.8-.7z" fill="#134e4a" opacity="0.85"/></svg>`,

  
  gold: `<svg viewBox="0 0 16 16"><rect x="4" y="4" width="8" height="8" fill="#FFD700"/><rect x="6" y="6" width="4" height="4" fill="#FFF8DC"/></svg>`,
  heart: `<svg viewBox="0 0 16 16"><path d="M8,14 L2,8 Q0,6 2,4 Q4,2 6,4 L8,6 L10,4 Q12,2 14,4 Q16,6 14,8 Z" fill="#DC143C"/></svg>`,
  skull: `<svg viewBox="0 0 16 16"><rect x="4" y="3" width="8" height="7" fill="#F5F5DC"/><rect x="5" y="4" width="2" height="3" fill="#1a1a1a"/><rect x="9" y="4" width="2" height="3" fill="#1a1a1a"/><rect x="5" y="10" width="6" height="3" fill="#F5F5DC"/></svg>`,

  
  pack_steel: `<svg viewBox="0 0 16 16"><polygon points="8,0.5 9,2 9,9 7,9 7,2" fill="#A9B4C0"/><rect x="7.6" y="2" width="0.8" height="7" fill="#DDE3E8"/><rect x="4.5" y="9" width="7" height="1.6" fill="#708090"/><rect x="7.2" y="10.6" width="1.6" height="3" fill="#8B4513"/><rect x="6.6" y="13.6" width="2.8" height="1.4" fill="#708090"/></svg>`,
  pack_cobalt: `<svg viewBox="0 0 16 16"><path d="M2.5 2.5 L11 11" stroke="#4a8abc" stroke-width="1.8"/><path d="M13.5 2.5 L5 11" stroke="#6a9ad0" stroke-width="1.8"/><path d="M9.6 11.4 L12.4 8.6" stroke="#2a5a8c" stroke-width="1.5"/><path d="M3.6 8.6 L6.4 11.4" stroke="#2a5a8c" stroke-width="1.5"/><path d="M11.7 11.7 L13.5 13.5" stroke="#8B4513" stroke-width="2"/><path d="M4.3 11.7 L2.5 13.5" stroke="#8B4513" stroke-width="2"/></svg>`,
  pack_titanium: `<svg viewBox="0 0 16 16"><path d="M4,2 L12,2 L11.5,7 Q11,9.5 8,9.5 Q5,9.5 4.5,7 Z" fill="#6aba6a"/><path d="M4,3 Q1.5,3.5 3,6.5 Q3.7,7.8 4.7,7.8" fill="none" stroke="#3a7a3a" stroke-width="1.2"/><path d="M12,3 Q14.5,3.5 13,6.5 Q12.3,7.8 11.3,7.8" fill="none" stroke="#3a7a3a" stroke-width="1.2"/><rect x="7" y="9.5" width="2" height="2.5" fill="#3a7a3a"/><rect x="4.5" y="12" width="7" height="2" fill="#3a7a3a"/><rect x="5.5" y="3" width="1.5" height="4" fill="#7ada7a" opacity="0.6"/></svg>`,
  pack_mythril: `<svg viewBox="0 0 16 16"><path d="M2,12 L2,4.5 L5.5,8 L8,3 L10.5,8 L14,4.5 L14,12 Z" fill="#ba6aba"/><rect x="2" y="11" width="12" height="2.5" fill="#7a3a7a"/><circle cx="5" cy="12.2" r="0.9" fill="#da7ada"/><circle cx="8" cy="12.2" r="0.9" fill="#da7ada"/><circle cx="11" cy="12.2" r="0.9" fill="#da7ada"/><circle cx="2" cy="4" r="1" fill="#da7ada"/><circle cx="8" cy="2.5" r="1" fill="#da7ada"/><circle cx="14" cy="4" r="1" fill="#da7ada"/></svg>`,
  pack_frost: `<svg viewBox="0 0 16 16"><g stroke="#87CEEB" stroke-width="1.2" stroke-linecap="round" fill="none"><path d="M8,1.5 L8,14.5"/><path d="M2.4,4.75 L13.6,11.25"/><path d="M13.6,4.75 L2.4,11.25"/><path d="M6.5,3 L8,4.5 L9.5,3"/><path d="M6.5,13 L8,11.5 L9.5,13"/></g><circle cx="8" cy="8" r="1.6" fill="#E0FFFF"/></svg>`,
  pack_autoforge: `<svg viewBox="0 0 16 16"><polygon points="9.5,1 3.5,9 7,9 6,15 12.5,6.5 8.7,6.5" fill="#FFD700"/><polygon points="9.5,1 6.2,5.4 7.8,5.4" fill="#FFF8DC" opacity="0.55"/></svg>`,

  
  skills: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
  combat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"/><path d="M13 19l6-6"/><path d="M16 16l4 4"/></svg>`,
  bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  gathering_pass: `<svg viewBox="0 0 16 16"><rect x="2.5" y="2" width="11" height="12" rx="1.2" fill="#e6d3a1" stroke="#7a5f33" stroke-width="1"/><rect x="1.5" y="1.5" width="13" height="2.6" rx="1.3" fill="#c7ac72" stroke="#7a5f33" stroke-width="0.8"/><rect x="1.5" y="11.9" width="13" height="2.6" rx="1.3" fill="#c7ac72" stroke="#7a5f33" stroke-width="0.8"/><rect x="6.6" y="6.6" width="2.8" height="2.8" rx="0.5" fill="#6ee7b7"/></svg>`,
  forge: `<svg viewBox="16 100 480 280" fill="none" stroke="currentColor" stroke-width="43" stroke-linejoin="round"><path d="M128.688 115.594v147.75h285v-147.75h-285zm-111.844 20.47c17.374 47.14 54.372 80.413 94.906 93.81v-93.81H16.844zM176.97 263.344L155 370h220l-21.5-106.656H176.97z"/></svg>`,
  shop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  account: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>`,
  tools: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4" stroke-linecap="round"/></svg>`,
  
  
  axe: `<svg viewBox="0 0 16 16"><rect x="7" y="1" width="2" height="10" fill="#8B4513"/><rect x="2" y="3" width="5" height="2" fill="#A0A0A0"/><rect x="1" y="4" width="2" height="3" fill="#C0C0C0"/></svg>`,
  pick: `<svg viewBox="0 0 16 16"><rect x="7" y="1" width="2" height="9" fill="#8B4513"/><path d="M2,14 L8,10 L14,14 L14,12 L8,8 L2,12 Z" fill="#707070"/><path d="M3,13 L8,9.5 L13,13" stroke="#909090" stroke-width="1" fill="none"/></svg>`,
  fish: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="5" ry="3" fill="#4682B4"/><polygon points="13,8 15,6 15,10" fill="#4682B4"/><circle cx="5" cy="7" r="1" fill="#000"/></svg>`,
  fire: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="11" rx="5" ry="3" fill="#D2691E"/><ellipse cx="8" cy="10" rx="4" ry="2.5" fill="#F4A460"/><ellipse cx="6" cy="9" rx="1.5" ry="1" fill="#228B22"/><circle cx="10" cy="10" r="1" fill="#FF6347"/><ellipse cx="8" cy="9" rx="1" ry="0.7" fill="#FFD700"/></svg>`,
  anvil: `<svg viewBox="0 0 16 16"><rect x="2" y="4" width="12" height="3" fill="#404040"/><rect x="4" y="7" width="8" height="2" fill="#353535"/><rect x="4" y="9" width="3" height="4" fill="#303030"/><rect x="9" y="9" width="3" height="4" fill="#303030"/></svg>`,
  craft: `<svg viewBox="0 0 16 16"><rect x="1" y="6" width="14" height="3" fill="#8B4513"/><rect x="2" y="9" width="3" height="5" fill="#654321"/><rect x="11" y="9" width="3" height="5" fill="#654321"/></svg>`,
  sword: `<svg viewBox="0 0 16 16"><rect x="12" y="1" width="2" height="2" fill="#C0C0C0"/><rect x="10" y="3" width="2" height="2" fill="#A0A0A0"/><rect x="8" y="5" width="2" height="2" fill="#A0A0A0"/><rect x="6" y="7" width="2" height="2" fill="#808080"/><rect x="4" y="9" width="2" height="2" fill="#808080"/><rect x="2" y="11" width="3" height="3" fill="#8B4513"/></svg>`,
  str: `<svg viewBox="0 0 16 16"><rect x="1" y="6" width="3" height="4" fill="#CD853F"/><rect x="4" y="5" width="2" height="6" fill="#D2691E"/><rect x="6" y="4" width="4" height="8" fill="#CD853F"/><rect x="10" y="5" width="2" height="6" fill="#D2691E"/><rect x="12" y="6" width="3" height="4" fill="#CD853F"/></svg>`,
  shield: `<svg viewBox="0 0 16 16"><path d="M8,2 L14,4 L14,8 Q14,12 8,14 Q2,12 2,8 L2,4 Z" fill="#4682B4"/><rect x="6" y="5" width="4" height="4" fill="#FFD700"/></svg>`,
  bow: `<svg viewBox="0 0 16 16"><path d="M3,2 Q3,8 8,8 Q3,8 3,14" stroke="#8B4513" fill="none" stroke-width="2"/><line x1="8" y1="8" x2="14" y2="8" stroke="#666" stroke-width="1"/><polygon points="14,8 12,6 12,10" fill="#888"/></svg>`,
  magic: `<svg viewBox="0 0 16 16"><polygon points="8,1 9,6 14,6 10,9 12,14 8,11 4,14 6,9 2,6 7,6" fill="#9400D3"/></svg>`,
  prayer: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="3" rx="5" ry="2" fill="none" stroke="#FFD700" stroke-width="1.5"/><ellipse cx="8" cy="2.5" rx="4" ry="1.5" fill="none" stroke="#FFF8DC" stroke-width="0.5"/><path d="M6,6 L8,14 L10,6" fill="#A78BFA"/><path d="M6,6 Q8,8 10,6" fill="#A78BFA"/><circle cx="8" cy="7" r="1" fill="#D4B8FF"/></svg>`,
  potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#5A2D5A"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#3A1E3A" stroke="#8C7C8C" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#A93FA5"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7.1" cy="7.6" r="0.42" fill="#FFF" opacity="0.7"/><circle cx="9" cy="9.1" r="0.32" fill="#FFF" opacity="0.7"/></svg>`,
  
  
  chicken: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="4" ry="3" fill="#F5F5DC"/><circle cx="8" cy="6" r="3" fill="#F5F5DC"/><rect x="7" y="8" width="2" height="1" fill="#FF6347"/><polygon points="8,4 7,3 9,3" fill="#DC143C"/><circle cx="7" cy="5" r="0.5" fill="#000"/></svg>`,
  rat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="4" ry="3" fill="#696969"/><circle cx="6" cy="7" r="2" fill="#696969"/><circle cx="5" cy="6" r="1" fill="#000"/><rect x="12" y="9" width="3" height="1" fill="#808080"/></svg>`,
  cow: `<svg viewBox="0 0 16 16"><rect x="4" y="6" width="8" height="6" fill="#F5F5DC"/><rect x="3" y="5" width="2" height="3" fill="#8B4513"/><rect x="11" y="5" width="2" height="3" fill="#8B4513"/><rect x="5" y="12" width="2" height="2" fill="#654321"/><rect x="9" y="12" width="2" height="2" fill="#654321"/><circle cx="6" cy="8" r="1" fill="#000"/><circle cx="10" cy="8" r="1" fill="#000"/></svg>`,
  goblin: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" fill="#6B8E23"/><polygon points="4,6 3,3 5,5" fill="#6B8E23"/><polygon points="12,6 13,3 11,5" fill="#6B8E23"/><circle cx="6" cy="7" r="1" fill="#FF0000"/><circle cx="10" cy="7" r="1" fill="#FF0000"/><rect x="7" y="10" width="2" height="1" fill="#2F4F2F"/></svg>`,
  bandit: `<svg viewBox="0 0 16 16"><circle cx="8" cy="7" r="3" fill="#D2B48C"/><rect x="5" y="4" width="6" height="2" fill="#2F2F2F"/><rect x="6" y="6" width="4" height="1" fill="#1a1a1a"/><circle cx="7" cy="6" r="0.5" fill="#000"/><circle cx="9" cy="6" r="0.5" fill="#000"/><rect x="6" y="10" width="4" height="4" fill="#4a4a4a"/></svg>`,
  scorpion: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="4" ry="2" fill="#8B4513"/><rect x="3" y="9" width="2" height="1" fill="#A0522D"/><rect x="11" y="9" width="2" height="1" fill="#A0522D"/><path d="M8,8 Q10,4 8,2" stroke="#8B4513" fill="none" stroke-width="2"/><circle cx="8" cy="2" r="1" fill="#FFD700"/></svg>`,
  guard: `<svg viewBox="0 0 16 16"><circle cx="8" cy="6" r="3" fill="#D2B48C"/><rect x="5" y="3" width="6" height="3" fill="#C0C0C0"/><circle cx="7" cy="5" r="0.5" fill="#000"/><circle cx="9" cy="5" r="0.5" fill="#000"/><rect x="5" y="9" width="6" height="5" fill="#4169E1"/><rect x="11" y="8" width="3" height="1" fill="#A0A0A0"/></svg>`,
  spider: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="4" ry="3" fill="#1a1a1a"/><circle cx="8" cy="6" r="2" fill="#1a1a1a"/><circle cx="7" cy="5" r="1" fill="#8B0000"/><circle cx="9" cy="5" r="1" fill="#8B0000"/><line x1="4" y1="7" x2="1" y2="5" stroke="#1a1a1a" stroke-width="1"/><line x1="12" y1="7" x2="15" y2="5" stroke="#1a1a1a" stroke-width="1"/><line x1="4" y1="10" x2="1" y2="12" stroke="#1a1a1a" stroke-width="1"/><line x1="12" y1="10" x2="15" y2="12" stroke="#1a1a1a" stroke-width="1"/></svg>`,
  wolf: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="5" ry="3" fill="#4a4a4a"/><polygon points="6,7 5,3 7,6" fill="#4a4a4a"/><polygon points="10,7 11,3 9,6" fill="#4a4a4a"/><circle cx="6" cy="8" r="1" fill="#FFD700"/><circle cx="10" cy="8" r="1" fill="#FFD700"/><rect x="7" y="10" width="2" height="1" fill="#2F2F2F"/></svg>`,
  orc: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" fill="#556B2F"/><rect x="6" y="5" width="1" height="2" fill="#8B0000"/><rect x="9" y="5" width="1" height="2" fill="#8B0000"/><rect x="6" y="10" width="1" height="2" fill="#FFF"/><rect x="9" y="10" width="1" height="2" fill="#FFF"/></svg>`,
  troll: `<svg viewBox="0 0 16 16"><rect x="5" y="4" width="6" height="8" fill="#708090"/><polygon points="5,5 4,2 6,4" fill="#708090"/><polygon points="11,5 12,2 10,4" fill="#708090"/><circle cx="6" cy="7" r="1" fill="#FFD700"/><circle cx="10" cy="7" r="1" fill="#FFD700"/><rect x="7" y="10" width="2" height="2" fill="#556B2F"/></svg>`,
  skeleton: `<svg viewBox="0 0 16 16"><circle cx="8" cy="5" r="3" fill="#F5F5DC"/><rect x="6" y="4" width="1" height="1" fill="#000"/><rect x="9" y="4" width="1" height="1" fill="#000"/><rect x="7" y="6" width="2" height="1" fill="#000"/><rect x="7" y="8" width="2" height="5" fill="#F5F5DC"/><rect x="5" y="9" width="2" height="1" fill="#F5F5DC"/><rect x="9" y="9" width="2" height="1" fill="#F5F5DC"/></svg>`,
  zombie: `<svg viewBox="0 0 16 16"><circle cx="8" cy="7" r="3" fill="#8FBC8F"/><rect x="6" y="6" width="1" height="2" fill="#000"/><rect x="9" y="5" width="1" height="2" fill="#000"/><rect x="7" y="9" width="2" height="1" fill="#8B0000"/><rect x="6" y="10" width="4" height="4" fill="#556B2F"/></svg>`,
  ghost: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="4" ry="5" fill="#E0E0E0" opacity="0.8"/><circle cx="6" cy="7" r="1" fill="#000"/><circle cx="10" cy="7" r="1" fill="#000"/><ellipse cx="8" cy="10" rx="2" ry="1" fill="#000"/><path d="M4,12 Q6,14 8,12 Q10,14 12,12" stroke="#E0E0E0" fill="none"/></svg>`,
  vampire: `<svg viewBox="0 0 16 16"><circle cx="8" cy="7" r="3" fill="#FFFACD"/><rect x="6" y="6" width="1" height="2" fill="#8B0000"/><rect x="9" y="6" width="1" height="2" fill="#8B0000"/><polygon points="6,10 7,12 8,10" fill="#FFF"/><polygon points="8,10 9,12 10,10" fill="#FFF"/><path d="M5,4 L11,4" stroke="#2F2F2F" fill="none" stroke-width="2"/></svg>`,
  demon: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" fill="#8B0000"/><polygon points="5,5 4,1 6,4" fill="#FF4500"/><polygon points="11,5 12,1 10,4" fill="#FF4500"/><circle cx="6" cy="7" r="1" fill="#FFD700"/><circle cx="10" cy="7" r="1" fill="#FFD700"/><rect x="7" y="10" width="2" height="2" fill="#000"/></svg>`,
  wraith: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="4" ry="6" fill="#2F4F4F" opacity="0.7"/><circle cx="6" cy="6" r="1" fill="#00FFFF"/><circle cx="10" cy="6" r="1" fill="#00FFFF"/><path d="M4,13 Q8,11 12,13" stroke="#2F4F4F" fill="none" stroke-width="2"/></svg>`,
  shade: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="4" ry="5" fill="#2a2a3a" opacity="0.8"/><circle cx="6" cy="7" r="1" fill="#6a4a8a"/><circle cx="10" cy="7" r="1" fill="#6a4a8a"/></svg>`,
  phoenix: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="4" ry="3" fill="#DC143C"/><polygon points="8,2 6,7 10,7" fill="#FFD700"/><polygon points="6,7 4,5 5,8" fill="#FF4500"/><polygon points="10,7 12,5 11,8" fill="#FF4500"/><circle cx="7" cy="9" r="1" fill="#FFD700"/><circle cx="9" cy="9" r="1" fill="#FFD700"/></svg>`,
  infernal: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="#4B0000"/><polygon points="4,5 3,1 5,4" fill="#8B0000"/><polygon points="12,5 13,1 11,4" fill="#8B0000"/><circle cx="6" cy="7" r="1.5" fill="#FF4500"/><circle cx="10" cy="7" r="1.5" fill="#FF4500"/><rect x="6" y="10" width="4" height="2" fill="#FFD700"/></svg>`,
  fire_elem: `<svg viewBox="0 0 16 16"><polygon points="8,1 11,5 13,4 11,8 14,10 10,10 11,14 8,11 5,14 6,10 2,10 5,8 3,4 5,5" fill="#FF4500"/><polygon points="8,4 10,7 9,10 8,8 7,10 6,7" fill="#FFD700"/></svg>`,
  lava_golem: `<svg viewBox="0 0 16 16"><rect x="4" y="4" width="8" height="8" fill="#4a2a1a"/><rect x="5" y="5" width="2" height="2" fill="#FF4500"/><rect x="9" y="5" width="2" height="2" fill="#FF4500"/><rect x="6" y="9" width="4" height="2" fill="#FF6347"/><rect x="3" y="12" width="3" height="2" fill="#3a1a0a"/><rect x="10" y="12" width="3" height="2" fill="#3a1a0a"/></svg>`,
  
 
  arrow_shafts: `<svg viewBox="0 0 16 16"><rect x="7" y="1" width="2" height="14" fill="#8B4513"/><rect x="6" y="1" width="1" height="14" fill="#A0522D"/><polygon points="8,1 6,3 10,3" fill="#654321"/></svg>`,
  demon_ash: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="5" ry="4" fill="#2F2F2F" opacity="0.6"/><ellipse cx="6" cy="8" rx="2" ry="1.5" fill="#3a3a3a" opacity="0.7"/><ellipse cx="10" cy="9" rx="2.5" ry="2" fill="#4a4a4a" opacity="0.5"/><circle cx="8" cy="7" r="1" fill="#DC143C" opacity="0.8"/></svg>`,
  ancient_seed: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="3" ry="4" fill="#8B4513"/><ellipse cx="8" cy="8" rx="2.5" ry="3" fill="#A0522D"/><path d="M8,5 Q7,3 6,2 M8,5 Q8,3 8,1 M8,5 Q9,3 10,2" stroke="#2E8B57" stroke-width="1" fill="none"/><circle cx="8" cy="9" r="1" fill="#654321"/></svg>`,
  empty_vial: `<svg viewBox="0 0 16 16"><rect x="6" y="2" width="4" height="2" fill="#888"/><rect x="5" y="4" width="6" height="2" fill="#666"/><path d="M5,6 L4,8 L4,13 Q8,14.5 12,13 L12,8 L11,6 Z" fill="none" stroke="#AAA" stroke-width="1"/><ellipse cx="8" cy="7" rx="2" ry="0.8" fill="#DDD" opacity="0.3"/></svg>`,
  
  
  raw_minnow: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="3.85" ry="2.35" fill="#71889E"/><polygon points="9.8,8 12.9,5.6 12.9,10.4" fill="#71889E"/><polygon points="9.5,8 12.5,6.1 12.5,9.9" fill="#A0B8C8"/><ellipse cx="6.7" cy="8" rx="3.4" ry="1.9" fill="#B8C8D8"/><ellipse cx="6.3" cy="8.5" rx="2.11" ry="0.95" fill="#D8E6F2"/><circle cx="4.4" cy="7.3" r="0.62" fill="#2B3440"/></svg>`,
  raw_perch: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.75" ry="3.05" fill="#48693C"/><polygon points="10.7,8 13.8,4.9 13.8,11.1" fill="#48693C"/><polygon points="10.4,8 13.4,5.4 13.4,10.6" fill="#6A9A5A"/><ellipse cx="6.7" cy="8" rx="4.3" ry="2.6" fill="#7AAA6A"/><ellipse cx="6.3" cy="8.5" rx="2.67" ry="1.3" fill="#9ACC88"/><polygon points="5.5,5.6 7,3.7 8.3,5.6" fill="#48693C"/><circle cx="3.5" cy="7.3" r="0.62" fill="#2B3A22"/></svg>`,
  raw_salmon: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.75" ry="3.05" fill="#9E3F33"/><polygon points="10.7,8 13.8,4.9 13.8,11.1" fill="#9E3F33"/><polygon points="10.4,8 13.4,5.4 13.4,10.6" fill="#D05848"/><ellipse cx="6.7" cy="8" rx="4.3" ry="2.6" fill="#F07060"/><ellipse cx="6.3" cy="8.5" rx="2.67" ry="1.3" fill="#F89880"/><path d="M3.2,7.4 Q6.7,6.6 10.2,7.4" stroke="#9E3F33" stroke-width="0.7" fill="none"/><circle cx="3.5" cy="7.3" r="0.62" fill="#40201C"/></svg>`,
  raw_carp: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="3.35" fill="#8A6A0C"/><polygon points="10.9,8 14,4.6 14,11.4" fill="#8A6A0C"/><polygon points="10.6,8 13.6,5.1 13.6,10.9" fill="#B88810"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.9" fill="#D4A020"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.45" fill="#E8BC40"/><path d="M3,7.4 Q6.7,6.6 10.4,7.4" stroke="#8A6A0C" stroke-width="0.7" fill="none"/><circle cx="3.3" cy="7.3" r="0.62" fill="#3A2C08"/></svg>`,
  raw_pike: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="2.75" fill="#7CA24E"/><polygon points="10.9,8 14,5.2 14,10.8" fill="#7CA24E"/><polygon points="10.6,8 13.6,5.7 13.6,10.3" fill="#3A5818"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.3" fill="#4A6828"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.15" fill="#608838"/><path d="M2.7,8.3 L3.4,9.1 L4.1,8.3 L4.8,9.1 L5.5,8.3" stroke="#7CA24E" stroke-width="0.6" fill="none"/><circle cx="3.3" cy="7.3" r="0.62" fill="#1C2810"/></svg>`,
  raw_eel: `<svg viewBox="0 0 16 16"><path d="M2,9 Q5,6 8,8 Q11,10 14,7" stroke="#2a4a3a" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M2,9 Q5,6 8,8 Q11,10 14,7" stroke="#3a6a50" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M2,9 Q5,6.5 8,8.5 Q11,10.5 14,7.5" stroke="#4a8a60" stroke-width="0.6" fill="none" opacity="0.5"/><ellipse cx="2.5" cy="8.8" rx="1.2" ry="1" fill="#2a4a3a"/><circle cx="2.2" cy="8.3" r="0.6" fill="#111"/><circle cx="2.0" cy="8.1" r="0.2" fill="#fff" opacity="0.6"/></svg>`,
  raw_barracuda: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="2.75" fill="#7FB6D8"/><polygon points="10.9,8 14,5.2 14,10.8" fill="#7FB6D8"/><polygon points="10.6,8 13.6,5.7 13.6,10.3" fill="#356287"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.3" fill="#4682B4"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.15" fill="#6BA3CE"/><path d="M2.7,8.3 L3.4,9.1 L4.1,8.3 L4.8,9.1 L5.5,8.3" stroke="#7FB6D8" stroke-width="0.6" fill="none"/><circle cx="3.3" cy="7.3" r="0.62" fill="#12212E"/></svg>`,
  raw_leviathan: `<svg viewBox="0 0 16 16"><path d="M2.4,6.6 Q5.4,11.8 8.4,8.2 Q11.2,5 13.7,9.6" stroke="#123C4E" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M2.4,6.6 Q5.4,11.8 8.4,8.2 Q11.2,5 13.7,9.6" stroke="#2E7C93" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M2.4,6.2 Q5.4,11.3 8.4,7.8 Q11.2,4.6 13.7,9.2" stroke="#8FD8E8" stroke-width="0.6" fill="none" opacity="0.5"/><polygon points="2,5.8 2.6,3.6 3.6,5.8" fill="#2E7C93"/><ellipse cx="2.9" cy="6.3" rx="1.5" ry="1.25" fill="#123C4E"/><circle cx="2.4" cy="5.9" r="0.55" fill="#9FE8FF"/></svg>`,
  raw_anglerfish: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.35" ry="3.35" fill="#6E6E6E"/><polygon points="10.3,8 13.4,4.6 13.4,11.4" fill="#6E6E6E"/><polygon points="10,8 13,5.1 13,10.9" fill="#242424"/><ellipse cx="6.7" cy="8" rx="3.9" ry="2.9" fill="#2F2F2F"/><ellipse cx="6.3" cy="8.5" rx="2.42" ry="1.45" fill="#414141"/><path d="M3.4,5.5 Q2.4,2.7 4.2,2.3" stroke="#6E6E6E" stroke-width="0.7" fill="none"/><circle cx="4.2" cy="2.3" r="1" fill="#6E6E6E"/><circle cx="3.9" cy="7.3" r="0.62" fill="#FFD700"/></svg>`,
  raw_kraken: `<svg viewBox="0 0 16 16"><path d="M5.6,7.6 Q4.6,10.6 3.5,12.8 M6.8,7.6 Q6.1,10.8 5.6,13.2 M8,7.6 L8,13.4 M9.2,7.6 Q9.9,10.8 10.4,13.2 M10.4,7.6 Q11.4,10.6 12.5,12.8" stroke="#5C0F0F" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M5.6,7.6 Q4.6,10.6 3.5,12.8 M6.8,7.6 Q6.1,10.8 5.6,13.2 M8,7.6 L8,13.4 M9.2,7.6 Q9.9,10.8 10.4,13.2 M10.4,7.6 Q11.4,10.6 12.5,12.8" stroke="#A5433A" stroke-width="1.3" fill="none" stroke-linecap="round"/><ellipse cx="8" cy="6.8" rx="4.45" ry="3.55" fill="#5C0F0F"/><ellipse cx="8" cy="6.8" rx="4" ry="3.1" fill="#8B1A1A"/><circle cx="6.4" cy="6.3" r="0.85" fill="#F2C9C0"/><circle cx="9.6" cy="6.3" r="0.85" fill="#F2C9C0"/></svg>`,
  raw_frozen_tuna: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="3.25" fill="#3F7EA0"/><polygon points="10.9,8 14,4.7 14,11.3" fill="#3F7EA0"/><polygon points="10.6,8 13.6,5.2 13.6,10.8" fill="#5FAECF"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.8" fill="#87CEEB"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.4" fill="#C4E9F5"/><polygon points="5.5,5.4 7,3.5 8.3,5.4" fill="#3F7EA0"/><circle cx="3.3" cy="7.3" r="0.62" fill="#1D3A47"/></svg>`,
  
  
  cooked_minnow: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="3.85" ry="2.35" fill="#89837B"/><polygon points="9.8,8 12.9,5.6 12.9,10.4" fill="#89837B"/><polygon points="9.5,8 12.5,6.1 12.5,9.9" fill="#AD9579"/><ellipse cx="6.7" cy="8" rx="3.4" ry="1.9" fill="#B89D81"/><ellipse cx="6.3" cy="8.5" rx="2.11" ry="0.95" fill="#C6AA8C"/><circle cx="4.4" cy="7.3" r="0.62" fill="#2B3440"/></svg>`,
  cooked_perch: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.75" ry="3.05" fill="#6F6E3B"/><polygon points="10.7,8 13.8,4.9 13.8,11.1" fill="#6F6E3B"/><polygon points="10.4,8 13.4,5.4 13.4,10.6" fill="#948848"/><ellipse cx="6.7" cy="8" rx="4.3" ry="2.6" fill="#9C8F4F"/><ellipse cx="6.3" cy="8.5" rx="2.67" ry="1.3" fill="#AA9E5D"/><polygon points="5.5,5.6 7,3.7 8.3,5.6" fill="#6F6E3B"/><circle cx="3.5" cy="7.3" r="0.62" fill="#2B3A22"/></svg>`,
  cooked_salmon: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.75" ry="3.05" fill="#A75335"/><polygon points="10.7,8 13.8,4.9 13.8,11.1" fill="#A75335"/><polygon points="10.4,8 13.4,5.4 13.4,10.6" fill="#C26A40"/><ellipse cx="6.7" cy="8" rx="4.3" ry="2.6" fill="#D1754B"/><ellipse cx="6.3" cy="8.5" rx="2.67" ry="1.3" fill="#D48759"/><path d="M3.2,7.4 Q6.7,6.6 10.2,7.4" stroke="#A75335" stroke-width="0.7" fill="none"/><circle cx="3.5" cy="7.3" r="0.62" fill="#40201C"/></svg>`,
  cooked_carp: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="3.35" fill="#9A6F1C"/><polygon points="10.9,8 14,4.6 14,11.4" fill="#9A6F1C"/><polygon points="10.6,8 13.6,5.1 13.6,10.9" fill="#B88027"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.9" fill="#C48B2E"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.45" fill="#CD973C"/><path d="M3,7.4 Q6.7,6.6 10.4,7.4" stroke="#9A6F1C" stroke-width="0.7" fill="none"/><circle cx="3.3" cy="7.3" r="0.62" fill="#3A2C08"/></svg>`,
  cooked_pike: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="2.75" fill="#919447"/><polygon points="10.9,8 14,5.2 14,10.8" fill="#919447"/><polygon points="10.6,8 13.6,5.7 13.6,10.3" fill="#7F6A2A"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.3" fill="#867131"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.15" fill="#908039"/><path d="M2.7,8.3 L3.4,9.1 L4.1,8.3 L4.8,9.1 L5.5,8.3" stroke="#919447" stroke-width="0.6" fill="none"/><circle cx="3.3" cy="7.3" r="0.62" fill="#1C2810"/></svg>`,
  cooked_eel: `<svg viewBox="0 0 16 16"><path d="M2,9 Q5,6 8,8 Q11,10 14,7" stroke="#3a2008" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M2,9 Q5,6 8,8 Q11,10 14,7" stroke="#6a3818" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M2,9 Q5,6.5 8,8.5 Q11,10.5 14,7.5" stroke="#a06030" stroke-width="0.6" fill="none" opacity="0.5"/><ellipse cx="2.5" cy="8.8" rx="1.2" ry="1" fill="#3a2008"/><circle cx="2.2" cy="8.3" r="0.6" fill="#111"/><circle cx="2.0" cy="8.1" r="0.2" fill="#fff" opacity="0.5"/></svg>`,
  cooked_barracuda: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="2.75" fill="#92A1A0"/><polygon points="10.9,8 14,5.2 14,10.8" fill="#92A1A0"/><polygon points="10.6,8 13.6,5.7 13.6,10.3" fill="#7D6F5C"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.3" fill="#847D70"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.15" fill="#958C7C"/><path d="M2.7,8.3 L3.4,9.1 L4.1,8.3 L4.8,9.1 L5.5,8.3" stroke="#92A1A0" stroke-width="0.6" fill="none"/><circle cx="3.3" cy="7.3" r="0.62" fill="#12212E"/></svg>`,
  cooked_leviathan: `<svg viewBox="0 0 16 16"><path d="M2.4,6.6 Q5.4,11.8 8.4,8.2 Q11.2,5 13.7,9.6" stroke="#4A2D14" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M2.4,6.6 Q5.4,11.8 8.4,8.2 Q11.2,5 13.7,9.6" stroke="#96682F" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M2.4,6.2 Q5.4,11.3 8.4,7.8 Q11.2,4.6 13.7,9.2" stroke="#D8B27A" stroke-width="0.6" fill="none" opacity="0.5"/><polygon points="2,5.8 2.6,3.6 3.6,5.8" fill="#96682F"/><ellipse cx="2.9" cy="6.3" rx="1.5" ry="1.25" fill="#4A2D14"/><circle cx="2.4" cy="5.9" r="0.55" fill="#F2D9A8"/></svg>`,
  cooked_anglerfish: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.35" ry="3.35" fill="#87725B"/><polygon points="10.3,8 13.4,4.6 13.4,11.4" fill="#87725B"/><polygon points="10,8 13,5.1 13,10.9" fill="#755330"/><ellipse cx="6.7" cy="8" rx="3.9" ry="2.9" fill="#7A5835"/><ellipse cx="6.3" cy="8.5" rx="2.42" ry="1.45" fill="#82603D"/><path d="M3.4,5.5 Q2.4,2.7 4.2,2.3" stroke="#87725B" stroke-width="0.7" fill="none"/><circle cx="4.2" cy="2.3" r="1" fill="#87725B"/><circle cx="3.9" cy="7.3" r="0.62" fill="#FFD700"/></svg>`,
  cooked_kraken: `<svg viewBox="0 0 16 16"><path d="M5.6,7.6 Q4.6,10.6 3.5,12.8 M6.8,7.6 Q6.1,10.8 5.6,13.2 M8,7.6 L8,13.4 M9.2,7.6 Q9.9,10.8 10.4,13.2 M10.4,7.6 Q11.4,10.6 12.5,12.8" stroke="#6B3A18" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M5.6,7.6 Q4.6,10.6 3.5,12.8 M6.8,7.6 Q6.1,10.8 5.6,13.2 M8,7.6 L8,13.4 M9.2,7.6 Q9.9,10.8 10.4,13.2 M10.4,7.6 Q11.4,10.6 12.5,12.8" stroke="#B87A45" stroke-width="1.3" fill="none" stroke-linecap="round"/><ellipse cx="8" cy="6.8" rx="4.45" ry="3.55" fill="#6B3A18"/><ellipse cx="8" cy="6.8" rx="4" ry="3.1" fill="#9C5A2B"/><circle cx="6.4" cy="6.3" r="0.85" fill="#F0DCC4"/><circle cx="9.6" cy="6.3" r="0.85" fill="#F0DCC4"/></svg>`,
   cooked_frozen_tuna: `<svg viewBox="0 0 16 16"><ellipse cx="7" cy="8" rx="5.5" ry="3" fill="#5F9EA0"/><polygon points="12.5,8 15,6 15,10" fill="#4682B4"/><circle cx="3.5" cy="7" r="1" fill="#87CEEB"/><path d="M4,6 L12,6 M4,10 L12,10" stroke="#B0E0E6" stroke-width="0.6"/><circle cx="6" cy="7.5" r="0.4" fill="#E0FFFF"/><circle cx="9" cy="8.5" r="0.4" fill="#E0FFFF"/></svg>`,
  raw_deepfin: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="3.25" fill="#7A2ACC"/><polygon points="10.9,8 14,4.7 14,11.3" fill="#7A2ACC"/><polygon points="10.6,8 13.6,5.2 13.6,10.8" fill="#1A0A2E"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.8" fill="#2E0A4E"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.4" fill="#43126E"/><polygon points="5.5,5.4 7,3.5 8.3,5.4" fill="#7A2ACC"/><circle cx="3.3" cy="7.3" r="0.62" fill="#C9A6F0"/></svg>`,
  cooked_deepfin: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="3.25" fill="#8F4698"/><polygon points="10.9,8 14,4.7 14,11.3" fill="#8F4698"/><polygon points="10.6,8 13.6,5.2 13.6,10.8" fill="#704734"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.8" fill="#794743"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.4" fill="#834B51"/><polygon points="5.5,5.4 7,3.5 8.3,5.4" fill="#8F4698"/><circle cx="3.3" cy="7.3" r="0.62" fill="#C9A6F0"/></svg>`,
  raw_razorjaw: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="3.15" fill="#2E7A3A"/><polygon points="10.9,8 14,4.8 14,11.2" fill="#2E7A3A"/><polygon points="10.6,8 13.6,5.3 13.6,10.7" fill="#0A1A0A"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.7" fill="#0F2A0F"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.35" fill="#194419"/><path d="M2.7,8.3 L3.4,9.1 L4.1,8.3 L4.8,9.1 L5.5,8.3" stroke="#2E7A3A" stroke-width="0.6" fill="none"/><circle cx="3.3" cy="7.3" r="0.62" fill="#00FF44"/></svg>`,
  cooked_razorjaw: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.95" ry="3.15" fill="#5E7A3A"/><polygon points="10.9,8 14,4.8 14,11.2" fill="#5E7A3A"/><polygon points="10.6,8 13.6,5.3 13.6,10.7" fill="#694E24"/><ellipse cx="6.7" cy="8" rx="4.5" ry="2.7" fill="#6B5626"/><ellipse cx="6.3" cy="8.5" rx="2.79" ry="1.35" fill="#70612B"/><path d="M2.7,8.3 L3.4,9.1 L4.1,8.3 L4.8,9.1 L5.5,8.3" stroke="#5E7A3A" stroke-width="0.6" fill="none"/><circle cx="3.3" cy="7.3" r="0.62" fill="#00FF44"/></svg>`,
  raw_abyssal_angler: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.35" ry="3.35" fill="#4A3A8A"/><polygon points="10.3,8 13.4,4.6 13.4,11.4" fill="#4A3A8A"/><polygon points="10,8 13,5.1 13,10.9" fill="#0A0A1A"/><ellipse cx="6.7" cy="8" rx="3.9" ry="2.9" fill="#12122A"/><ellipse cx="6.3" cy="8.5" rx="2.42" ry="1.45" fill="#1E1E3E"/><path d="M3.4,5.5 Q2.4,2.7 4.2,2.3" stroke="#4A3A8A" stroke-width="0.7" fill="none"/><circle cx="4.2" cy="2.3" r="1" fill="#4A3A8A"/><circle cx="3.9" cy="7.3" r="0.62" fill="#7A2AFF"/></svg>`,
  cooked_abyssal_angler: `<svg viewBox="0 0 16 16"><ellipse cx="6.7" cy="8" rx="4.35" ry="3.35" fill="#70506E"/><polygon points="10.3,8 13.4,4.6 13.4,11.4" fill="#70506E"/><polygon points="10,8 13,5.1 13,10.9" fill="#69472B"/><ellipse cx="6.7" cy="8" rx="3.9" ry="2.9" fill="#6D4B32"/><ellipse cx="6.3" cy="8.5" rx="2.42" ry="1.45" fill="#72503B"/><path d="M3.4,5.5 Q2.4,2.7 4.2,2.3" stroke="#70506E" stroke-width="0.7" fill="none"/><circle cx="4.2" cy="2.3" r="1" fill="#70506E"/><circle cx="3.9" cy="7.3" r="0.62" fill="#7A2AFF"/></svg>`,

  
  young_dragon: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="4" ry="3" fill="#7a8a5a"/><circle cx="8" cy="6" r="3" fill="#8a9a6a"/><circle cx="6" cy="5" r="1" fill="#FFD700"/><circle cx="10" cy="5" r="1" fill="#FFD700"/><polygon points="4,7 2,4 5,6" fill="#6a7a4a"/><polygon points="12,7 14,4 11,6" fill="#6a7a4a"/><polygon points="8,3 7,1 9,1" fill="#8a9a6a"/></svg>`,
  green_dragon: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="5" ry="3" fill="#228B22"/><circle cx="8" cy="5" r="3.5" fill="#2E8B2E"/><circle cx="6" cy="4" r="1" fill="#FFD700"/><circle cx="10" cy="4" r="1" fill="#FFD700"/><polygon points="3,6 1,3 4,5" fill="#1a6a1a"/><polygon points="13,6 15,3 12,5" fill="#1a6a1a"/><polygon points="8,2 6,0 10,0" fill="#2E8B2E"/><rect x="6" y="7" width="4" height="1" fill="#1a5a1a"/></svg>`,
  blue_dragon: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="5" ry="3" fill="#1E90FF"/><circle cx="8" cy="5" r="3.5" fill="#4169E1"/><circle cx="6" cy="4" r="1" fill="#FFD700"/><circle cx="10" cy="4" r="1" fill="#FFD700"/><polygon points="3,6 1,3 4,5" fill="#0a4a8a"/><polygon points="13,6 15,3 12,5" fill="#0a4a8a"/><polygon points="8,2 6,0 10,0" fill="#4169E1"/><rect x="6" y="7" width="4" height="1" fill="#0a3a7a"/></svg>`,
  red_dragon: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="5" ry="3" fill="#B22222"/><circle cx="8" cy="5" r="3.5" fill="#DC143C"/><circle cx="6" cy="4" r="1" fill="#FFD700"/><circle cx="10" cy="4" r="1" fill="#FFD700"/><polygon points="3,6 1,3 4,5" fill="#8B0000"/><polygon points="13,6 15,3 12,5" fill="#8B0000"/><polygon points="8,2 6,0 10,0" fill="#DC143C"/><rect x="6" y="7" width="4" height="1" fill="#6a0a0a"/><polygon points="7,8 8,10 9,8" fill="#FF4500"/></svg>`,
  black_dragon: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="5" ry="3" fill="#1a1a1a"/><circle cx="8" cy="5" r="3.5" fill="#2a2a2a"/><circle cx="6" cy="4" r="1.2" fill="#8B0000"/><circle cx="10" cy="4" r="1.2" fill="#8B0000"/><polygon points="3,6 1,2 4,5" fill="#0a0a0a"/><polygon points="13,6 15,2 12,5" fill="#0a0a0a"/><polygon points="8,1 6,-1 10,-1" fill="#2a2a2a"/><rect x="6" y="7" width="4" height="1" fill="#3a3a3a"/><path d="M6,8 Q8,10 10,8" stroke="#4a0a4a" fill="none" stroke-width="0.5"/></svg>`,
  
  
  boss_meadow: `<svg viewBox="0 0 16 16"><rect x="4" y="3" width="8" height="9" fill="#556B2F"/><polygon points="4,4 2,1 5,3" fill="#6B8E23"/><polygon points="12,4 14,1 11,3" fill="#6B8E23"/><circle cx="6" cy="6" r="1.5" fill="#FF0000"/><circle cx="10" cy="6" r="1.5" fill="#FF0000"/><rect x="6" y="9" width="4" height="2" fill="#3a5a1a"/><rect x="2" y="6" width="2" height="4" fill="#556B2F"/><rect x="12" y="6" width="2" height="4" fill="#556B2F"/></svg>`,
  boss_forest: `<svg viewBox="0 0 16 16"><rect x="3" y="2" width="10" height="10" fill="#556B2F"/><rect x="4" y="3" width="8" height="8" fill="#228B22"/><circle cx="6" cy="6" r="1.5" fill="#8B0000"/><circle cx="10" cy="6" r="1.5" fill="#8B0000"/><rect x="5" y="9" width="6" height="2" fill="#2F4F2F"/><rect x="2" y="5" width="2" height="5" fill="#228B22"/><rect x="12" y="5" width="2" height="5" fill="#228B22"/></svg>`,
  boss_dungeon: `<svg viewBox="0 0 16 16"><circle cx="8" cy="6" r="4" fill="#F5F5DC"/><rect x="5" y="4" width="2" height="2" fill="#8B0000"/><rect x="9" y="4" width="2" height="2" fill="#8B0000"/><rect x="6" y="10" width="4" height="4" fill="#F5F5DC"/><polygon points="8,1 6,3 10,3" fill="#FFD700"/><rect x="4" y="8" width="2" height="3" fill="#F5F5DC"/><rect x="10" y="8" width="2" height="3" fill="#F5F5DC"/></svg>`,
  boss_shadow: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="4" fill="#1a1a2a"/><circle cx="8" cy="5" r="3" fill="#2a2a3a"/><circle cx="6" cy="5" r="1.5" fill="#6a2a8a"/><circle cx="10" cy="5" r="1.5" fill="#6a2a8a"/><polygon points="5,3 4,0 6,2" fill="#4a2a5a"/><polygon points="11,3 12,0 10,2" fill="#4a2a5a"/></svg>`,
  boss_volcano: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="#8B0000"/><polygon points="5,4 4,0 6,3" fill="#FF4500"/><polygon points="11,4 12,0 10,3" fill="#FF4500"/><circle cx="6" cy="7" r="1.5" fill="#FFD700"/><circle cx="10" cy="7" r="1.5" fill="#FFD700"/><rect x="6" y="10" width="4" height="2" fill="#FF4500"/><path d="M3,12 Q8,14 13,12" stroke="#FFD700" fill="none" stroke-width="1"/></svg>`,
  
  
  copper_sword: `<svg viewBox="0 0 16 16"><rect x="7" y="2" width="2" height="8" fill="#CD7F32"/><rect x="6" y="3" width="4" height="1" fill="#E9A950"/><rect x="5" y="10" width="6" height="2" fill="#8B5A00"/><rect x="6" y="12" width="4" height="2" fill="#8B4513"/></svg>`,
  iron_sword: `<svg viewBox="0 0 16 16"><rect x="7" y="2" width="2" height="8" fill="#808080"/><rect x="6" y="3" width="4" height="1" fill="#A0A0A0"/><rect x="5" y="10" width="6" height="2" fill="#505050"/><rect x="6" y="12" width="4" height="2" fill="#8B4513"/></svg>`,
  steel_sword: `<svg viewBox="0 0 16 16"><rect x="7" y="2" width="2" height="8" fill="#B0B0B0"/><rect x="6" y="3" width="4" height="1" fill="#D0D0D0"/><rect x="5" y="10" width="6" height="2" fill="#707070"/><rect x="6" y="12" width="4" height="2" fill="#8B4513"/></svg>`,
  copper_helm: `<svg viewBox="0 0 16 16"><rect x="4" y="4" width="8" height="6" fill="#CD7F32"/><rect x="3" y="6" width="10" height="2" fill="#8B5A00"/><rect x="5" y="5" width="6" height="1" fill="#E9A950"/><rect x="6" y="7" width="2" height="2" fill="#1a1a1a"/><rect x="8" y="7" width="2" height="2" fill="#1a1a1a"/></svg>`,
  copper_plate: `<svg viewBox="0 0 16 16"><rect x="4" y="3" width="8" height="10" fill="#CD7F32"/><rect x="5" y="4" width="6" height="1" fill="#E9A950"/><rect x="3" y="5" width="10" height="6" fill="#8B5A00"/><rect x="6" y="6" width="4" height="4" fill="#CD7F32"/></svg>`,
  copper_legs: `<svg viewBox="0 0 16 16"><rect x="4" y="2" width="8" height="6" fill="#CD7F32"/><rect x="4" y="8" width="3" height="6" fill="#8B5A00"/><rect x="9" y="8" width="3" height="6" fill="#8B5A00"/><rect x="5" y="3" width="6" height="1" fill="#E9A950"/></svg>`,
  copper_shield: `<svg viewBox="0 0 16 16"><path d="M8,2 L14,4 L14,8 Q14,12 8,14 Q2,12 2,8 L2,4 Z" fill="#CD7F32"/><path d="M8,4 L12,5.5 L12,8 Q12,11 8,12.5 Q4,11 4,8 L4,5.5 Z" fill="#E9A950"/></svg>`,
  
  
  log: `<svg viewBox="0 0 16 16"><ellipse cx="4.2" cy="8" rx="2.55" ry="4.45" fill="#5A2B0D"/><rect x="4.2" y="3.55" width="7.6" height="8.9" fill="#5A2B0D"/><ellipse cx="11.8" cy="8" rx="2.55" ry="4.45" fill="#5A2B0D"/><ellipse cx="4.2" cy="8" rx="2.1" ry="4" fill="#6B3410"/><rect x="4.2" y="4" width="7.6" height="8" fill="#8B4513"/><ellipse cx="11.8" cy="8" rx="2.1" ry="4" fill="#C68642"/><ellipse cx="11.8" cy="8" rx="1.42" ry="2.7" fill="#96602C"/><ellipse cx="11.8" cy="8" rx="0.82" ry="1.56" fill="#C68642"/><ellipse cx="11.8" cy="8" rx="0.3" ry="0.56" fill="#96602C"/></svg>`,
  ore: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#6E6E78" stroke="#3C3C44" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#8E8E9A"/><circle cx="7.1" cy="7.9" r="1.25" fill="#B8B8C4"/><circle cx="9.2" cy="9.3" r="0.8" fill="#B8B8C4"/></svg>`,
  bar: `<svg viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#E9A950" stroke="#7A4A1C" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#8F5823" stroke="#7A4A1C" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#CD7F32" stroke="#7A4A1C" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
  feathers: `<svg viewBox="0 0 16 16"><path d="M8,2 Q5,4 4,8 Q4,12 6,14 L8,10 Z" fill="#E6E6FA" opacity="0.9"/><path d="M8,2 Q11,4 12,8 Q12,12 10,14 L8,10 Z" fill="#D8D8F0" opacity="0.8"/><line x1="8" y1="2" x2="8" y2="14" stroke="#8B7355" stroke-width="1"/></svg>`,
  bones: `<svg viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="2" fill="#F5F5DC"/><circle cx="3" cy="6" r="2" fill="#F5F5DC"/><circle cx="3" cy="10" r="2" fill="#F5F5DC"/><circle cx="13" cy="6" r="2" fill="#F5F5DC"/><circle cx="13" cy="10" r="2" fill="#F5F5DC"/></svg>`,
  hide: `<svg viewBox="0 0 16 16"><path d="M3,4 Q8,2 13,4 L13,12 Q8,14 3,12 Z" fill="#D2B48C"/><path d="M5,6 Q8,5 11,6 L11,10 Q8,11 5,10 Z" fill="#C4A67A"/></svg>`,
  leather: `<svg viewBox="0 0 16 16"><path d="M3,4 Q8,2 13,4 L13,12 Q8,14 3,12 Z" fill="#DEB887"/><path d="M5,6 Q8,5 11,6 L11,10 Q8,11 5,10 Z" fill="#D2B48C"/><ellipse cx="7" cy="7" rx="1" ry="0.8" fill="#C4A67A"/><ellipse cx="9" cy="9" rx="1" ry="0.8" fill="#C4A67A"/></svg>`,
  reinforced_leather: `<svg viewBox="0 0 16 16"><path d="M3,4 Q8,2 13,4 L13,12 Q8,14 3,12 Z" fill="#B8956E"/><path d="M5,6 Q8,5 11,6 L11,10 Q8,11 5,10 Z" fill="#A68458"/><ellipse cx="7" cy="7" rx="1" ry="0.8" fill="#8B7355"/><ellipse cx="9" cy="9" rx="1" ry="0.8" fill="#8B7355"/><rect x="4" y="6" width="1" height="4" fill="#696969"/><rect x="11" y="6" width="1" height="4" fill="#696969"/><circle cx="6" cy="5" r="0.5" fill="#A9A9A9"/><circle cx="10" cy="5" r="0.5" fill="#A9A9A9"/><circle cx="6" cy="11" r="0.5" fill="#A9A9A9"/><circle cx="10" cy="11" r="0.5" fill="#A9A9A9"/></svg>`,
  venom: `<svg viewBox="0 0 16 16"><rect x="6" y="2" width="4" height="3" fill="#888"/><rect x="5" y="5" width="6" height="2" fill="#666"/><rect x="4" y="7" width="8" height="6" fill="#2a6a2a"/><rect x="5" y="8" width="3" height="2" fill="#4a9a4a"/></svg>`,
  
  
  logs: `<svg viewBox="0 0 16 16"><ellipse cx="4.2" cy="8" rx="2.55" ry="4.45" fill="#5A2B0D"/><rect x="4.2" y="3.55" width="7.6" height="8.9" fill="#5A2B0D"/><ellipse cx="11.8" cy="8" rx="2.55" ry="4.45" fill="#5A2B0D"/><ellipse cx="4.2" cy="8" rx="2.1" ry="4" fill="#6B3410"/><rect x="4.2" y="4" width="7.6" height="8" fill="#8B4513"/><ellipse cx="11.8" cy="8" rx="2.1" ry="4" fill="#C68642"/><ellipse cx="11.8" cy="8" rx="1.42" ry="2.7" fill="#96602C"/><ellipse cx="11.8" cy="8" rx="0.82" ry="1.56" fill="#C68642"/><ellipse cx="11.8" cy="8" rx="0.3" ry="0.56" fill="#96602C"/></svg>`,
  birch_logs: `<svg viewBox="0 0 16 16"><ellipse cx="4.2" cy="8" rx="2.55" ry="4.45" fill="#2F2F2F"/><rect x="4.2" y="3.55" width="7.6" height="8.9" fill="#2F2F2F"/><ellipse cx="11.8" cy="8" rx="2.55" ry="4.45" fill="#2F2F2F"/><ellipse cx="4.2" cy="8" rx="2.1" ry="4" fill="#CFCFB6"/><rect x="4.2" y="4" width="7.6" height="8" fill="#E8E8D0"/><rect x="6.3" y="5.4" width="0.7" height="5.2" fill="#2F2F2F"/><rect x="9.4" y="5.4" width="0.7" height="5.2" fill="#2F2F2F"/><ellipse cx="11.8" cy="8" rx="2.1" ry="4" fill="#F7F3DF"/><ellipse cx="11.8" cy="8" rx="1.42" ry="2.7" fill="#C9BE99"/><ellipse cx="11.8" cy="8" rx="0.82" ry="1.56" fill="#F7F3DF"/><ellipse cx="11.8" cy="8" rx="0.3" ry="0.56" fill="#C9BE99"/></svg>`,
  aspen_logs: `<svg viewBox="0 0 16 16"><ellipse cx="4.2" cy="8" rx="2.55" ry="4.45" fill="#4A4A4A"/><rect x="4.2" y="3.55" width="7.6" height="8.9" fill="#4A4A4A"/><ellipse cx="11.8" cy="8" rx="2.55" ry="4.45" fill="#4A4A4A"/><ellipse cx="4.2" cy="8" rx="2.1" ry="4" fill="#B4B4B4"/><rect x="4.2" y="4" width="7.6" height="8" fill="#D0D0D0"/><rect x="6.3" y="5.4" width="0.7" height="5.2" fill="#4A4A4A"/><rect x="9.4" y="5.4" width="0.7" height="5.2" fill="#4A4A4A"/><ellipse cx="11.8" cy="8" rx="2.1" ry="4" fill="#EDEDED"/><ellipse cx="11.8" cy="8" rx="1.42" ry="2.7" fill="#A8A8A8"/><ellipse cx="11.8" cy="8" rx="0.82" ry="1.56" fill="#EDEDED"/><ellipse cx="11.8" cy="8" rx="0.3" ry="0.56" fill="#A8A8A8"/></svg>`,
  redwood_logs: `<svg viewBox="0 0 16 16"><ellipse cx="4.2" cy="8" rx="2.55" ry="4.45" fill="#5E2F19"/><rect x="4.2" y="3.55" width="7.6" height="8.9" fill="#5E2F19"/><ellipse cx="11.8" cy="8" rx="2.55" ry="4.45" fill="#5E2F19"/><ellipse cx="4.2" cy="8" rx="2.1" ry="4" fill="#7D3F22"/><rect x="4.2" y="4" width="7.6" height="8" fill="#A0522D"/><ellipse cx="11.8" cy="8" rx="2.1" ry="4" fill="#C97A4E"/><ellipse cx="11.8" cy="8" rx="1.42" ry="2.7" fill="#8A4526"/><ellipse cx="11.8" cy="8" rx="0.82" ry="1.56" fill="#C97A4E"/><ellipse cx="11.8" cy="8" rx="0.3" ry="0.56" fill="#8A4526"/></svg>`,
  ebony_logs: `<svg viewBox="0 0 16 16"><ellipse cx="4.2" cy="8" rx="2.55" ry="4.45" fill="#4A4A57"/><rect x="4.2" y="3.55" width="7.6" height="8.9" fill="#4A4A57"/><ellipse cx="11.8" cy="8" rx="2.55" ry="4.45" fill="#4A4A57"/><ellipse cx="4.2" cy="8" rx="2.1" ry="4" fill="#141419"/><rect x="4.2" y="4" width="7.6" height="8" fill="#1F1F26"/><ellipse cx="11.8" cy="8" rx="2.1" ry="4" fill="#3A3A46"/><ellipse cx="11.8" cy="8" rx="1.42" ry="2.7" fill="#55555F"/><ellipse cx="11.8" cy="8" rx="0.82" ry="1.56" fill="#3A3A46"/><ellipse cx="11.8" cy="8" rx="0.3" ry="0.56" fill="#55555F"/></svg>`,
  elder_logs: `<svg viewBox="0 0 16 16"><ellipse cx="4.2" cy="8" rx="2.55" ry="4.45" fill="#31411B"/><rect x="4.2" y="3.55" width="7.6" height="8.9" fill="#31411B"/><ellipse cx="11.8" cy="8" rx="2.55" ry="4.45" fill="#31411B"/><ellipse cx="4.2" cy="8" rx="2.1" ry="4" fill="#3F5122"/><rect x="4.2" y="4" width="7.6" height="8" fill="#556B2F"/><ellipse cx="11.8" cy="8" rx="2.1" ry="4" fill="#7A9440"/><ellipse cx="11.8" cy="8" rx="1.42" ry="2.7" fill="#4A5F28"/><ellipse cx="11.8" cy="8" rx="0.82" ry="1.56" fill="#7A9440"/><ellipse cx="11.8" cy="8" rx="0.3" ry="0.56" fill="#4A5F28"/></svg>`,
  frozen_logs: `<svg viewBox="0 0 16 16"><ellipse cx="4.2" cy="8" rx="2.55" ry="4.45" fill="#5E93A8"/><rect x="4.2" y="3.55" width="7.6" height="8.9" fill="#5E93A8"/><ellipse cx="11.8" cy="8" rx="2.55" ry="4.45" fill="#5E93A8"/><ellipse cx="4.2" cy="8" rx="2.1" ry="4" fill="#7AB8CC"/><rect x="4.2" y="4" width="7.6" height="8" fill="#9FD8E8"/><ellipse cx="11.8" cy="8" rx="2.1" ry="4" fill="#DFF6FA"/><ellipse cx="11.8" cy="8" rx="1.42" ry="2.7" fill="#B6E2EE"/><ellipse cx="11.8" cy="8" rx="0.82" ry="1.56" fill="#DFF6FA"/><ellipse cx="11.8" cy="8" rx="0.3" ry="0.56" fill="#B6E2EE"/></svg>`,
  abyssal_driftwood: `<svg viewBox="0 0 16 16"><ellipse cx="4" cy="8" rx="2" ry="4" fill="#0a0a1a"/><rect x="4" y="4" width="8" height="8" fill="#1a0a2e"/><ellipse cx="12" cy="8" rx="2" ry="4" fill="#2e0a4e"/><line x1="4" y1="6" x2="12" y2="6" stroke="#7a2aff" stroke-width="0.8"/><line x1="4" y1="8" x2="12" y2="8" stroke="#7a2aff" stroke-width="0.8"/><line x1="4" y1="10" x2="12" y2="10" stroke="#7a2aff" stroke-width="0.8"/><circle cx="8" cy="8" r="1" fill="#9a4aff"/></svg>`,
  
  copper_ore: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#6B4A2A" stroke="#3E2A16" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#8B5A34"/><circle cx="7.1" cy="7.9" r="1.25" fill="#E9A950"/><circle cx="9.2" cy="9.3" r="0.8" fill="#E9A950"/></svg>`,
  tin_ore: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#5A5A5A" stroke="#333333" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#7A7A7A"/><circle cx="7.1" cy="7.9" r="1.25" fill="#C6C6C6"/><circle cx="9.2" cy="9.3" r="0.8" fill="#C6C6C6"/></svg>`,
  iron_ore: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#4A3728" stroke="#2A1F16" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#6B5038"/><circle cx="7.1" cy="7.9" r="1.25" fill="#CD853F"/><circle cx="9.2" cy="9.3" r="0.8" fill="#CD853F"/></svg>`,
  coal: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#1F1F1F" stroke="#5A5A62" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#2F2F2F"/><circle cx="7.1" cy="7.9" r="1.25" fill="#4D4D4D"/><circle cx="9.2" cy="9.3" r="0.8" fill="#4D4D4D"/></svg>`,
  cobalt_ore: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#1A3A5C" stroke="#0E2033" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#2A5A8C"/><circle cx="7.1" cy="7.9" r="1.25" fill="#6A9AD0"/><circle cx="9.2" cy="9.3" r="0.8" fill="#6A9AD0"/></svg>`,
  titanium_ore: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#2A4A2A" stroke="#162816" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#3A7A3A"/><circle cx="7.1" cy="7.9" r="1.25" fill="#7ADA7A"/><circle cx="9.2" cy="9.3" r="0.8" fill="#7ADA7A"/></svg>`,
  mythril_ore: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#4A2A4A" stroke="#2A162A" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#7A3A7A"/><circle cx="7.1" cy="7.9" r="1.25" fill="#DA7ADA"/><circle cx="9.2" cy="9.3" r="0.8" fill="#DA7ADA"/></svg>`,
  gold_nugget: `<svg viewBox="0 0 16 16"><path d="M4,10 L6,5 L10,5 L12,10 L10,13 L6,13 Z" fill="#DAA520"/><path d="M5,9 L7,6 L9,6 L11,9 L9,11 L7,11 Z" fill="#FFD700"/><circle cx="8" cy="8" r="1.5" fill="#FFEC8B"/></svg>`,
  
  
  copper_bar: `<svg viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#E9A950" stroke="#7A4A1C" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#8F5823" stroke="#7A4A1C" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#CD7F32" stroke="#7A4A1C" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
  iron_bar: `<svg viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#A98A6B" stroke="#553618" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#613E1E" stroke="#553618" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#8B5A2B" stroke="#553618" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
  steel_bar: `<svg viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#AEB9C4" stroke="#414A54" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#4E5964" stroke="#414A54" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#708090" stroke="#414A54" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
  cobalt_bar: `<svg viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#4A8ABC" stroke="#16354F" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#1D3E62" stroke="#16354F" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#2A5A8C" stroke="#16354F" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
  titanium_bar: `<svg viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#6ABA6A" stroke="#1F441F" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#285528" stroke="#1F441F" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#3A7A3A" stroke="#1F441F" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
  mythril_bar: `<svg viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#BA6ABA" stroke="#451F45" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#552855" stroke="#451F45" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#7A3A7A" stroke="#451F45" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
  shadowsteel_ore: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#1A1A2E" stroke="#55556F" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#2D2D4A"/><circle cx="7.1" cy="7.9" r="1.25" fill="#8A8AAA"/><circle cx="9.2" cy="9.3" r="0.8" fill="#8A8AAA"/></svg>`,
  shadowsteel_bar: `<svg viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#4A4A6A" stroke="#7C7CA0" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#1F1F33" stroke="#7C7CA0" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#2D2D4A" stroke="#7C7CA0" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
  
  
  nightmare: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="5" ry="4" fill="#1a1a2e" opacity="0.8"/><circle cx="8" cy="7" r="4" fill="#2d2d4a"/><circle cx="6" cy="6" r="1.5" fill="#ff0000"/><circle cx="10" cy="6" r="1.5" fill="#ff0000"/><path d="M5,9 Q8,11 11,9" stroke="#4a4a6a" stroke-width="1"/></svg>`,
  soul_devourer: `<svg viewBox="0 0 16 16"><path d="M8,2 Q12,4 13,8 Q12,12 8,14 Q4,12 3,8 Q4,4 8,2" fill="#2d2d4a"/><circle cx="6" cy="7" r="1.5" fill="#9966ff"/><circle cx="10" cy="7" r="1.5" fill="#9966ff"/><path d="M5,10 L7,11 L8,10 L9,11 L11,10" stroke="#cc99ff" stroke-width="1" fill="none"/><path d="M4,5 L6,6 M12,5 L10,6" stroke="#6a6a8e" stroke-width="0.5"/></svg>`,
  abyss_walker: `<svg viewBox="0 0 16 16"><rect x="5" y="3" width="6" height="10" fill="#1a1a2e"/><circle cx="8" cy="6" r="2" fill="#4a4a6a"/><circle cx="8" cy="6" r="1" fill="#9966ff"/><path d="M3,8 L5,7 M13,8 L11,7" stroke="#2d2d4a" stroke-width="2"/><path d="M6,12 L6,15 M10,12 L10,15" stroke="#1a1a2e" stroke-width="2"/></svg>`,
  magma_serpent: `<svg viewBox="0 0 16 16"><path d="M2,10 Q4,6 8,8 Q12,10 14,6" stroke="#FF4500" stroke-width="3" fill="none"/><circle cx="14" cy="6" r="2" fill="#FF6347"/><circle cx="13" cy="5" r="0.8" fill="#FFD700"/><path d="M3,9 L4,11 M7,7 L8,9 M11,9 L12,7" stroke="#FFD700" stroke-width="0.5"/></svg>`,
  inferno_titan: `<svg viewBox="0 0 16 16"><rect x="5" y="4" width="6" height="8" fill="#8B0000"/><circle cx="8" cy="6" r="2.5" fill="#DC143C"/><circle cx="7" cy="5.5" r="0.8" fill="#FFD700"/><circle cx="9" cy="5.5" r="0.8" fill="#FFD700"/><path d="M3,7 L5,6 L5,10 L3,9" fill="#DC143C"/><path d="M13,7 L11,6 L11,10 L13,9" fill="#DC143C"/><path d="M6,2 L8,4 L10,2" stroke="#FF4500" stroke-width="1" fill="none"/></svg>`,
  ash_demon: `<svg viewBox="0 0 16 16"><path d="M8,2 L5,5 L3,4 L5,8 L3,12 L8,10 L13,12 L11,8 L13,4 L11,5 Z" fill="#4a4a4a"/><circle cx="7" cy="6" r="1" fill="#FF4500"/><circle cx="9" cy="6" r="1" fill="#FF4500"/><path d="M6,8 L8,9 L10,8" stroke="#666" stroke-width="0.8"/><path d="M5,3 L6,5 M11,3 L10,5" stroke="#FF6347" stroke-width="0.5"/></svg>`,
  
  
  green_dragonhide: `<svg viewBox="0 0 16 16"><path d="M2,4 Q8,2 14,4 L13,12 Q8,14 3,12 Z" fill="#228B22"/><path d="M4,5 Q8,4 12,5 L11,10 Q8,11 5,10 Z" fill="#2E8B2E"/><ellipse cx="6" cy="7" rx="1.5" ry="1" fill="#1a6a1a"/><ellipse cx="10" cy="7" rx="1.5" ry="1" fill="#1a6a1a"/><ellipse cx="8" cy="9" rx="1" ry="0.8" fill="#1a6a1a"/></svg>`,
  blue_dragonhide: `<svg viewBox="0 0 16 16"><path d="M2,4 Q8,2 14,4 L13,12 Q8,14 3,12 Z" fill="#1E90FF"/><path d="M4,5 Q8,4 12,5 L11,10 Q8,11 5,10 Z" fill="#4169E1"/><ellipse cx="6" cy="7" rx="1.5" ry="1" fill="#0a4a8a"/><ellipse cx="10" cy="7" rx="1.5" ry="1" fill="#0a4a8a"/><ellipse cx="8" cy="9" rx="1" ry="0.8" fill="#0a4a8a"/></svg>`,
  red_dragonhide: `<svg viewBox="0 0 16 16"><path d="M2,4 Q8,2 14,4 L13,12 Q8,14 3,12 Z" fill="#B22222"/><path d="M4,5 Q8,4 12,5 L11,10 Q8,11 5,10 Z" fill="#DC143C"/><ellipse cx="6" cy="7" rx="1.5" ry="1" fill="#8B0000"/><ellipse cx="10" cy="7" rx="1.5" ry="1" fill="#8B0000"/><ellipse cx="8" cy="9" rx="1" ry="0.8" fill="#8B0000"/></svg>`,
  black_dragonhide: `<svg viewBox="0 0 16 16"><path d="M2,4 Q8,2 14,4 L13,12 Q8,14 3,12 Z" fill="#1a1a1a"/><path d="M4,5 Q8,4 12,5 L11,10 Q8,11 5,10 Z" fill="#2a2a2a"/><ellipse cx="6" cy="7" rx="1.5" ry="1" fill="#3a3a3a"/><ellipse cx="10" cy="7" rx="1.5" ry="1" fill="#3a3a3a"/><ellipse cx="8" cy="9" rx="1" ry="0.8" fill="#3a3a3a"/><path d="M5,6 L7,6 M9,6 L11,6" stroke="#4a4a4a" stroke-width="0.5"/></svg>`,
  
  
  raw_chicken: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="4.5" ry="3.5" fill="#f5c8c8"/><ellipse cx="8" cy="7.5" rx="3" ry="2.5" fill="#ffd8d8"/><circle cx="11" cy="6" r="1.5" fill="#f5c8c8"/><rect x="6" y="12" width="1.2" height="2.5" rx="0.3" fill="#c8a060"/><rect x="8.8" y="12" width="1.2" height="2.5" rx="0.3" fill="#c8a060"/><path d="M5,8 Q8,6.5 11,8" stroke="#e8a8a8" stroke-width="0.5" fill="none"/><circle cx="10.5" cy="6.5" r="0.4" fill="#111" opacity="0.7"/></svg>`,
  cooked_chicken: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="4.5" ry="3.5" fill="#c8721e"/><ellipse cx="8" cy="7.5" rx="3" ry="2.5" fill="#e08830"/><circle cx="11" cy="6" r="1.5" fill="#c8721e"/><rect x="6" y="12" width="1.2" height="2.5" rx="0.3" fill="#8b5a2b"/><rect x="8.8" y="12" width="1.2" height="2.5" rx="0.3" fill="#8b5a2b"/><path d="M5,8 Q8,6.5 11,8" stroke="#f0a040" stroke-width="0.5" fill="none"/><circle cx="10.5" cy="6.5" r="0.4" fill="#111" opacity="0.7"/></svg>`,
  raw_shrimp: `<svg viewBox="0 0 16 16"><path d="M4,8 Q8,4 12,8 Q10,12 6,10 Z" fill="#FFA07A"/><circle cx="5" cy="9" r="0.5" fill="#000"/></svg>`,
  cooked_shrimp: `<svg viewBox="0 0 16 16"><path d="M4,8 Q8,4 12,8 Q10,12 6,10 Z" fill="#FF6347"/><circle cx="5" cy="9" r="0.5" fill="#000"/></svg>`,
  
  
  copper_axe: `<svg viewBox="0 0 16 16"><rect x="7" y="1" width="2" height="10" fill="#8B4513"/><rect x="2" y="3" width="5" height="2" fill="#CD7F32"/><rect x="1" y="4" width="2" height="3" fill="#E9A950"/></svg>`,
  copper_pick: `<svg viewBox="0 0 16 16"><rect x="7" y="1" width="2" height="9" fill="#8B4513"/><path d="M2,14 L8,10 L14,14 L14,12 L8,8 L2,12 Z" fill="#CD7F32"/><path d="M3,13 L8,9.5 L13,13" stroke="#E9A950" stroke-width="1" fill="none"/></svg>`,
  basic_rod: `<svg viewBox="0 0 16 16"><rect x="2" y="7" width="10" height="2" fill="#8B4513"/><line x1="12" y1="8" x2="14" y2="12" stroke="#666" stroke-width="1"/><circle cx="14" cy="12" r="1" fill="#888"/></svg>`,
  
  
  copper_gloves: `<svg viewBox="0 0 16 16"><path d="M3,6 L5,4 L7,4 L7,8 L5,10 L3,10 Z" fill="#CD7F32"/><path d="M9,6 L11,4 L13,4 L13,10 L11,10 L9,8 Z" fill="#CD7F32"/><rect x="5" y="10" width="6" height="4" fill="#B87333"/></svg>`,
  iron_gloves: `<svg viewBox="0 0 16 16"><path d="M3,6 L5,4 L7,4 L7,8 L5,10 L3,10 Z" fill="#A0A0A0"/><path d="M9,6 L11,4 L13,4 L13,10 L11,10 L9,8 Z" fill="#A0A0A0"/><rect x="5" y="10" width="6" height="4" fill="#808080"/></svg>`,
  steel_gloves: `<svg viewBox="0 0 16 16"><path d="M3,6 L5,4 L7,4 L7,8 L5,10 L3,10 Z" fill="#71797E"/><path d="M9,6 L11,4 L13,4 L13,10 L11,10 L9,8 Z" fill="#71797E"/><rect x="5" y="10" width="6" height="4" fill="#5a6268"/></svg>`,
  cobalt_gloves: `<svg viewBox="0 0 16 16"><path d="M3,6 L5,4 L7,4 L7,8 L5,10 L3,10 Z" fill="#0047AB"/><path d="M9,6 L11,4 L13,4 L13,10 L11,10 L9,8 Z" fill="#0047AB"/><rect x="5" y="10" width="6" height="4" fill="#00308F"/></svg>`,
  titanium_gloves: `<svg viewBox="0 0 16 16"><path d="M3,6 L5,4 L7,4 L7,8 L5,10 L3,10 Z" fill="#3a7a3a"/><path d="M9,6 L11,4 L13,4 L13,10 L11,10 L9,8 Z" fill="#3a7a3a"/><rect x="5" y="10" width="6" height="4" fill="#2a6a2a"/></svg>`,
  mythril_gloves: `<svg viewBox="0 0 16 16"><path d="M3,6 L5,4 L7,4 L7,8 L5,10 L3,10 Z" fill="#9a4a9a"/><path d="M9,6 L11,4 L13,4 L13,10 L11,10 L9,8 Z" fill="#9a4a9a"/><rect x="5" y="10" width="6" height="4" fill="#7a3a7a"/></svg>`,
  
  
  copper_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#CD7F32" stroke-width="3"/><circle cx="8" cy="8" r="2" fill="#1a1a1a"/></svg>`,
  iron_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#A0A0A0" stroke-width="3"/><circle cx="8" cy="8" r="2" fill="#1a1a1a"/></svg>`,
  gold_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#FFD700" stroke-width="3"/><circle cx="8" cy="8" r="2" fill="#1a1a1a"/></svg>`,
  ruby_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#FFD700" stroke-width="2"/><circle cx="8" cy="4" r="2.5" fill="#E0115F"/><circle cx="8" cy="8" r="2" fill="#1a1a1a"/></svg>`,
  sapphire_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#C0C0C0" stroke-width="2"/><circle cx="8" cy="4" r="2.5" fill="#0F52BA"/><circle cx="8" cy="8" r="2" fill="#1a1a1a"/></svg>`,
  emerald_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#FFD700" stroke-width="2"/><circle cx="8" cy="4" r="2.5" fill="#50C878"/><circle cx="8" cy="8" r="2" fill="#1a1a1a"/></svg>`,
  diamond_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#E5E4E2" stroke-width="2"/><polygon points="8,2 6,5 10,5" fill="#B9F2FF"/><polygon points="6,5 10,5 8,7" fill="#E0FFFF"/><circle cx="8" cy="8" r="2" fill="#1a1a1a"/></svg>`,
  void_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#4a4a6e" stroke-width="2"/><circle cx="8" cy="4" r="2.5" fill="#6600cc"/><circle cx="8" cy="8" r="2" fill="#1a1a1a"/><path d="M6,3 L10,5 M10,3 L6,5" stroke="#9966ff" stroke-width="0.5"/></svg>`,
  infernal_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#8B0000" stroke-width="2"/><circle cx="8" cy="4" r="2.5" fill="#FF4500"/><circle cx="8" cy="8" r="2" fill="#1a1a1a"/><path d="M6,3 Q8,2 10,3" stroke="#FFD700" stroke-width="0.8" fill="none"/></svg>`,
  
  
  copper_amulet: `<svg viewBox="0 0 16 16"><circle cx="8" cy="10" r="3" fill="#CD7F32"/><path d="M8,7 L8,2" stroke="#8B4513" stroke-width="1.5"/><circle cx="8" cy="2" r="1" fill="#8B4513"/></svg>`,
  iron_amulet: `<svg viewBox="0 0 16 16"><circle cx="8" cy="10" r="3" fill="#A0A0A0"/><path d="M8,7 L8,2" stroke="#696969" stroke-width="1.5"/><circle cx="8" cy="2" r="1" fill="#696969"/></svg>`,
  gold_amulet: `<svg viewBox="0 0 16 16"><circle cx="8" cy="10" r="3" fill="#FFD700"/><path d="M8,7 L8,2" stroke="#DAA520" stroke-width="1.5"/><circle cx="8" cy="2" r="1" fill="#DAA520"/></svg>`,
  ruby_amulet: `<svg viewBox="0 0 16 16"><circle cx="8" cy="10" r="3" fill="#FFD700"/><polygon points="8,9 7,10 9,10" fill="#E0115F"/><path d="M8,7 L8,2" stroke="#DAA520" stroke-width="1.5"/><circle cx="8" cy="2" r="1" fill="#DAA520"/></svg>`,
  sapphire_amulet: `<svg viewBox="0 0 16 16"><circle cx="8" cy="10" r="3" fill="#C0C0C0"/><polygon points="8,9 7,10 9,10" fill="#0F52BA"/><path d="M8,7 L8,2" stroke="#A9A9A9" stroke-width="1.5"/><circle cx="8" cy="2" r="1" fill="#A9A9A9"/></svg>`,
  emerald_amulet: `<svg viewBox="0 0 16 16"><circle cx="8" cy="10" r="3" fill="#FFD700"/><polygon points="8,9 7,10 9,10" fill="#50C878"/><path d="M8,7 L8,2" stroke="#DAA520" stroke-width="1.5"/><circle cx="8" cy="2" r="1" fill="#DAA520"/></svg>`,
  diamond_amulet: `<svg viewBox="0 0 16 16"><circle cx="8" cy="10" r="3" fill="#E5E4E2"/><polygon points="8,8 7,10 9,10" fill="#B9F2FF"/><path d="M8,7 L8,2" stroke="#C0C0C0" stroke-width="1.5"/><circle cx="8" cy="2" r="1" fill="#C0C0C0"/></svg>`,
  ancient_amulet: `<svg viewBox="0 0 16 16"><circle cx="8" cy="10" r="3" fill="#8B4513"/><path d="M8,9 Q6,10 7,11 Q8,10 9,11 Q10,10 8,9" fill="#2E8B57"/><path d="M8,7 L8,2" stroke="#654321" stroke-width="1.5"/><circle cx="8" cy="2" r="1" fill="#2E8B57"/><circle cx="7" cy="9.5" r="0.5" fill="#FFD700"/><circle cx="9" cy="9.5" r="0.5" fill="#FFD700"/></svg>`,
  void_heart: `<svg viewBox="0 0 16 16"><path d="M8,13 L3,8 Q3,5 5,4 Q8,3 8,6 Q8,3 11,4 Q13,5 13,8 Z" fill="#6600cc"/><circle cx="8" cy="8" r="2" fill="#9966ff"/></svg>`,
  infernal_pendant: `<svg viewBox="0 0 16 16"><circle cx="8" cy="10" r="3" fill="#8B0000"/><polygon points="8,8 6,10 10,10" fill="#FF4500"/><path d="M8,7 L8,2" stroke="#8B0000" stroke-width="1.5"/><circle cx="8" cy="2" r="1" fill="#FF4500"/><path d="M7,9 L9,11" stroke="#FFD700" stroke-width="0.5"/></svg>`,
  glacial_amulet: `<svg viewBox="0 0 16 16"><circle cx="8" cy="10" r="3" fill="#87CEEB"/><polygon points="8,8 6,10 10,10 8,8" fill="#B0E0E6"/><path d="M8,7 L8,2" stroke="#87CEEB" stroke-width="1.5"/><circle cx="8" cy="2" r="1" fill="#B0E0E6"/><polygon points="8,9 7,10 9,10" fill="#FFF"/></svg>`,
  
  abyssal_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#1a0533" stroke-width="3"/><circle cx="8" cy="8" r="5" fill="none" stroke="#7c3aed" stroke-width="1.5"/><circle cx="8" cy="3" r="1.5" fill="#4c1d95"/><circle cx="8" cy="3" r="0.8" fill="#a78bfa"/><path d="M6,3 Q8,1 10,3" stroke="#7c3aed" stroke-width="0.5" fill="none"/></svg>`,
  abyssal_amulet: `<svg viewBox="0 0 16 16"><polygon points="8,4 10,9 8,12 6,9" fill="#2d1b4e"/><polygon points="8,5 9.5,9 8,11 6.5,9" fill="#4c1d95"/><circle cx="8" cy="8" r="1.2" fill="#7c3aed"/><circle cx="8" cy="8" r="0.6" fill="#a78bfa"/><path d="M8,4 L8,2" stroke="#4c1d95" stroke-width="1.5"/><circle cx="8" cy="1.5" r="1" fill="#2d1b4e"/></svg>`,
  abyssal_cape: `<svg viewBox="0 0 16 16"><path d="M4,2 L12,2 L14,14 L8,12 L2,14 Z" fill="#1a0533"/><path d="M5,3 L11,3 L12,12 L8,10 L4,12 Z" fill="#2d1b4e"/><path d="M6,5 Q8,4 10,5 Q8,7 6,5" fill="#4c1d95"/><path d="M7,8 L9,8 M8,7 L8,9" stroke="#7c3aed" stroke-width="0.5"/></svg>`,
  tidalscale_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#0c2a4a" stroke-width="3"/><circle cx="8" cy="8" r="5" fill="none" stroke="#0ea5e9" stroke-width="1.5"/><circle cx="8" cy="3" r="1.5" fill="#0c4a6e"/><circle cx="8" cy="3" r="0.8" fill="#38bdf8"/><path d="M6,3 Q8,1 10,3" stroke="#0ea5e9" stroke-width="0.5" fill="none"/></svg>`,
  tidalscale_amulet: `<svg viewBox="0 0 16 16"><polygon points="8,4 10,9 8,12 6,9" fill="#0c2a4a"/><polygon points="8,5 9.5,9 8,11 6.5,9" fill="#0c4a6e"/><circle cx="8" cy="8" r="1.2" fill="#0ea5e9"/><circle cx="8" cy="8" r="0.6" fill="#7dd3fc"/><path d="M8,4 L8,2" stroke="#0c4a6e" stroke-width="1.5"/><circle cx="8" cy="1.5" r="1" fill="#0c2a4a"/></svg>`,
  tidalscale_cape: `<svg viewBox="0 0 16 16"><path d="M4,2 L12,2 L14,14 L8,12 L2,14 Z" fill="#0c2a4a"/><path d="M5,3 L11,3 L12,12 L8,10 L4,12 Z" fill="#0c4a6e"/><path d="M6,5 Q8,4 10,5 Q8,7 6,5" fill="#0ea5e9"/><path d="M7,8 L9,8 M8,7 L8,9" stroke="#38bdf8" stroke-width="0.5"/></svg>`,
  abyssweave_ring: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="none" stroke="#0a1a2e" stroke-width="3"/><circle cx="8" cy="8" r="5" fill="none" stroke="#06b6d4" stroke-width="1.5"/><circle cx="8" cy="3" r="1.5" fill="#0e3a4a"/><circle cx="8" cy="3" r="0.8" fill="#67e8f9"/><path d="M6,3 Q8,1 10,3" stroke="#06b6d4" stroke-width="0.5" fill="none"/></svg>`,
  abyssweave_amulet: `<svg viewBox="0 0 16 16"><polygon points="8,4 10,9 8,12 6,9" fill="#0a1a2e"/><polygon points="8,5 9.5,9 8,11 6.5,9" fill="#0e3a4a"/><circle cx="8" cy="8" r="1.2" fill="#06b6d4"/><circle cx="8" cy="8" r="0.6" fill="#a5f3fc"/><path d="M8,4 L8,2" stroke="#0e3a4a" stroke-width="1.5"/><circle cx="8" cy="1.5" r="1" fill="#0a1a2e"/></svg>`,
  abyssweave_cape: `<svg viewBox="0 0 16 16"><path d="M4,2 L12,2 L14,14 L8,12 L2,14 Z" fill="#0a1a2e"/><path d="M5,3 L11,3 L12,12 L8,10 L4,12 Z" fill="#0e3a4a"/><path d="M6,5 Q8,4 10,5 Q8,7 6,5" fill="#06b6d4"/><path d="M7,8 L9,8 M8,7 L8,9" stroke="#67e8f9" stroke-width="0.5"/></svg>`,
  
  
  leather_cape: `<svg viewBox="0 0 16 16"><path d="M4,2 L12,2 L14,14 L8,12 L2,14 Z" fill="#8B4513"/><path d="M5,3 L11,3 L12,12 L8,10 L4,12 Z" fill="#A0522D"/></svg>`,
  wool_cape: `<svg viewBox="0 0 16 16"><path d="M4,2 L12,2 L14,14 L8,12 L2,14 Z" fill="#E8E8E8"/><path d="M5,3 L11,3 L12,12 L8,10 L4,12 Z" fill="#F5F5F5"/></svg>`,
  silk_cape: `<svg viewBox="0 0 16 16"><path d="M4,2 L12,2 L14,14 L8,12 L2,14 Z" fill="#DC143C"/><path d="M5,3 L11,3 L12,12 L8,10 L4,12 Z" fill="#FF6347"/></svg>`,
  shadow_cape: `<svg viewBox="0 0 16 16"><path d="M4,2 L12,2 L14,14 L8,12 L2,14 Z" fill="#1a1a2e"/><path d="M5,3 L11,3 L12,12 L8,10 L4,12 Z" fill="#2d2d4a"/><path d="M6,5 L10,5 M7,8 L9,8" stroke="#4a4a6a" stroke-width="0.5"/></svg>`,
  infernal_cape: `<svg viewBox="0 0 16 16"><path d="M4,2 L12,2 L14,14 L8,12 L2,14 Z" fill="#8B0000"/><path d="M5,3 L11,3 L12,12 L8,10 L4,12 Z" fill="#DC143C"/><path d="M6,6 Q8,4 10,6 Q8,8 6,6" fill="#FF4500"/></svg>`,
  
  
  ectoplasm: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="4" fill="#90EE90" opacity="0.7"/><ellipse cx="6" cy="7" rx="2" ry="1.5" fill="#98FB98" opacity="0.8"/><circle cx="10" cy="8" r="1.5" fill="#7CFC00" opacity="0.6"/><path d="M5,11 Q8,13 11,11" stroke="#32CD32" stroke-width="1" fill="none"/></svg>`,
  vital_essence: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#5A6B70"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#153A42" stroke="#778C91" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#0E7490"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><ellipse cx="8" cy="8.2" rx="1.5" ry="1" fill="#22D3EE"/></svg>`,
  rotten_flesh: `<svg viewBox="0 0 16 16"><path d="M3,5 Q8,3 13,5 L12,12 Q8,14 4,12 Z" fill="#556B2F"/><path d="M5,7 Q8,6 11,7 L10,10 Q8,11 6,10 Z" fill="#6B8E23"/><circle cx="6" cy="8" r="1" fill="#8FBC8F"/><circle cx="10" cy="9" r="0.8" fill="#8FBC8F"/></svg>`,
  void_crystal: `<svg viewBox="0 0 16 16"><polygon points="8,1 12,5 12,11 8,15 4,11 4,5" fill="#4a4a6e"/><polygon points="8,3 10,5 10,10 8,13 6,10 6,5" fill="#6a6a8e"/><path d="M8,5 L8,11" stroke="#9966ff" stroke-width="1"/><circle cx="8" cy="8" r="1.5" fill="#cc99ff"/></svg>`,
  shadow_essence: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="#1a1a2e"/><circle cx="8" cy="8" r="3" fill="#2d2d4a"/><path d="M5,5 Q8,3 11,5 Q13,8 11,11 Q8,13 5,11 Q3,8 5,5" stroke="#6a6a8e" stroke-width="0.5" fill="none"/><circle cx="8" cy="8" r="1" fill="#9966ff"/></svg>`,
  eternal_ember: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="10" rx="4" ry="3" fill="#FF4500"/><polygon points="8,2 6,7 10,7" fill="#FFD700"/><polygon points="7,5 8,8 9,5" fill="#FFA500"/><circle cx="8" cy="9" r="2" fill="#FF6347"/><circle cx="8" cy="9" r="1" fill="#FFD700"/></svg>`,
  molten_core: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="#8B0000"/><circle cx="8" cy="8" r="3.5" fill="#DC143C"/><circle cx="8" cy="8" r="2" fill="#FF4500"/><circle cx="8" cy="8" r="1" fill="#FFD700"/><path d="M5,5 L6,7 M11,5 L10,7 M5,11 L6,9 M11,11 L10,9" stroke="#FF6347" stroke-width="0.5"/></svg>`,
  ember_core: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" fill="#CD5C5C"/><circle cx="8" cy="8" r="2.5" fill="#FF6347"/><circle cx="8" cy="8" r="1.2" fill="#FFA07A"/><path d="M6,6 L7,8 M10,6 L9,8" stroke="#FFD700" stroke-width="0.5"/></svg>`,
  phoenix_feather: `<svg viewBox="0 0 16 16"><path d="M8,1 Q12,4 13,8 Q12,12 8,15 Q6,12 6,8 Q6,4 8,1" fill="#FF4500"/><path d="M8,3 Q10,5 10,8 Q10,11 8,13 Q7,11 7,8 Q7,5 8,3" fill="#FFD700"/><path d="M8,5 L8,12" stroke="#FFA500" stroke-width="1"/></svg>`,
  big_bones: `<svg viewBox="0 0 16 16"><rect x="2.5" y="6.5" width="11" height="3" fill="#F5F5DC"/><circle cx="2.5" cy="5.5" r="2.5" fill="#F5F5DC"/><circle cx="2.5" cy="10.5" r="2.5" fill="#F5F5DC"/><circle cx="13.5" cy="5.5" r="2.5" fill="#F5F5DC"/><circle cx="13.5" cy="10.5" r="2.5" fill="#F5F5DC"/><circle cx="8" cy="8" r="0.8" fill="#E5E5CC"/></svg>`,
  mossy_bones: `<svg viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="2" fill="#E5F0DC"/><circle cx="3" cy="6" r="2" fill="#E5F0DC"/><circle cx="3" cy="10" r="2" fill="#E5F0DC"/><circle cx="13" cy="6" r="2" fill="#E5F0DC"/><circle cx="13" cy="10" r="2" fill="#E5F0DC"/><circle cx="5" cy="6" r="0.4" fill="#5a7a4a"/><circle cx="7" cy="9" r="0.4" fill="#5a7a4a"/><circle cx="10" cy="7" r="0.4" fill="#5a7a4a"/><circle cx="11" cy="9" r="0.4" fill="#5a7a4a"/></svg>`,
  young_dragon_bones: `<svg viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="2" fill="#FFEFD5"/><circle cx="3" cy="6" r="2" fill="#FFEFD5"/><circle cx="3" cy="10" r="2" fill="#FFEFD5"/><circle cx="13" cy="6" r="2" fill="#FFEFD5"/><circle cx="13" cy="10" r="2" fill="#FFEFD5"/><polygon points="7,6 8,5 9,6" fill="#FFE4B5"/><polygon points="7,10 8,11 9,10" fill="#FFE4B5"/></svg>`,
  small_dragon_bones: `<svg viewBox="0 0 16 16"><rect x="3" y="6.5" width="10" height="3" fill="#F5DEB3"/><circle cx="3" cy="5.5" r="2.2" fill="#F5DEB3"/><circle cx="3" cy="10.5" r="2.2" fill="#F5DEB3"/><circle cx="13" cy="5.5" r="2.2" fill="#F5DEB3"/><circle cx="13" cy="10.5" r="2.2" fill="#F5DEB3"/><polygon points="6,6 8,4.5 10,6" fill="#DEB887"/><polygon points="6,10 8,11.5 10,10" fill="#DEB887"/><path d="M5,7 L5,9 M11,7 L11,9" stroke="#D2A679" stroke-width="0.5"/></svg>`,
  giant_bone: `<svg viewBox="0 0 16 16"><rect x="3.2" y="6.55" width="9.6" height="2.9" fill="#F0E6D2"/><circle cx="3.2" cy="5.4" r="2.6" fill="#F0E6D2"/><circle cx="3.2" cy="10.6" r="2.6" fill="#F0E6D2"/><circle cx="12.8" cy="5.4" r="2.6" fill="#F0E6D2"/><circle cx="12.8" cy="10.6" r="2.6" fill="#F0E6D2"/><path d="M5.6,7 L5.6,9 M8,7 L8,9 M10.4,7 L10.4,9" stroke="#DCCFB4" stroke-width="0.75"/></svg>`,
  dragon_bones: `<svg viewBox="0 0 16 16"><rect x="3.4" y="6.7" width="9.2" height="2.6" fill="#FFF8DC"/><circle cx="3.4" cy="5.6" r="2.4" fill="#FFF8DC"/><circle cx="3.4" cy="10.4" r="2.4" fill="#FFF8DC"/><circle cx="12.6" cy="5.6" r="2.4" fill="#FFF8DC"/><circle cx="12.6" cy="10.4" r="2.4" fill="#FFF8DC"/><polygon points="6.9,6.7 8,4.8 9.1,6.7" fill="#FFE4B5"/><polygon points="6.9,9.3 8,11.2 9.1,9.3" fill="#FFE4B5"/><path d="M5.6,7.15 L5.6,8.85 M8,7.15 L8,8.85 M10.4,7.15 L10.4,8.85" stroke="#F5DEB3" stroke-width="0.6"/></svg>`,
  hellfire_bone: `<svg viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="2" fill="#D4C4A8"/><circle cx="3" cy="6" r="2" fill="#D4C4A8"/><circle cx="3" cy="10" r="2" fill="#D4C4A8"/><circle cx="13" cy="6" r="2" fill="#D4C4A8"/><circle cx="13" cy="10" r="2" fill="#D4C4A8"/><path d="M4,7 Q8,5 12,7" stroke="#FF4500" stroke-width="0.8" fill="none"/><circle cx="8" cy="6" r="1" fill="#FF6347"/></svg>`,

  
  strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#DC143C"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#FFD700" stroke-width="0.8"/></svg>`,
  attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FF8C00"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#FFD700"/></svg>`,
  defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#4169E1"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L8,6 L9,7 L9,9 L7,9 Z" fill="#87CEEB"/></svg>`,
  ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#228B22"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#90EE90" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#90EE90" stroke-width="0.6"/></svg>`,
  magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#9370DB"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#DDA0DD"/><circle cx="7" cy="7" r="0.5" fill="#FFF"/><circle cx="9" cy="8" r="0.5" fill="#FFF"/></svg>`,
  lifesteal_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#8B008B"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q9,7 8,8 Q7,7 8,6" fill="#FF1493"/></svg>`,
  
  supreme_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#87CEEB"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#E0FFFF"/><circle cx="7" cy="7" r="0.5" fill="#FFF"/><circle cx="9" cy="8" r="0.5" fill="#FFF"/></svg>`,
  supreme_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#4682B4"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#E0FFFF" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#FFF"/><circle cx="9" cy="7" r="0.5" fill="#FFF"/></svg>`,
  supreme_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#191970"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L8,6 L9,7 L9,9 L7,9 Z" fill="#87CEEB"/><circle cx="7.5" cy="7.5" r="0.4" fill="#E0FFFF"/><circle cx="8.5" cy="8.5" r="0.4" fill="#E0FFFF"/></svg>`,
  supreme_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#20B2AA"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#E0FFFF" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#E0FFFF" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#FFF"/><circle cx="9" cy="6.5" r="0.4" fill="#FFF"/></svg>`,
  supreme_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#6A5ACD"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#E0FFFF"/><circle cx="7" cy="7" r="0.5" fill="#FFF"/><circle cx="9" cy="8" r="0.5" fill="#FFF"/><circle cx="8.5" cy="6.5" r="0.4" fill="#FFF"/></svg>`,
  supreme_lifesteal_elixir: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#4B0082"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q9,7 8,8 Q7,7 8,6" fill="#87CEEB"/><circle cx="7" cy="7" r="0.4" fill="#E0FFFF"/><circle cx="9" cy="8" r="0.4" fill="#E0FFFF"/></svg>`,
  
  minor_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FF8C00"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#FFD700"/></svg>`,
  attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FF8C00"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#FFD700"/></svg>`,
  greater_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B8860B"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a10" stroke="#7A7A74" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#DC143C"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,5.5 7,9 9,9" fill="#FFA500"/><circle cx="7" cy="7" r="0.5" fill="#FFD700"/><circle cx="9" cy="8" r="0.4" fill="#FFF"/></svg>`,
  supreme_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#87CEEB"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#E0FFFF"/><circle cx="7" cy="7" r="0.5" fill="#FFF"/><circle cx="9" cy="8" r="0.5" fill="#FFF"/></svg>`,
  frost_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#FFF"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a0a1a" stroke="#70707A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#191970"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,5 9,7 8,9 7,7" fill="#87CEEB"/><polygon points="6,7 10,7" fill="#E0FFFF"/><polygon points="8,5 8,9" fill="#E0FFFF"/><circle cx="6.5" cy="6.5" r="0.5" fill="#FFF"/><circle cx="9.5" cy="7.5" r="0.5" fill="#FFF"/><circle cx="7.5" cy="8.5" r="0.5" fill="#FFF"/></svg>`,
  
  minor_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#DC143C"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#FFD700" stroke-width="0.8"/></svg>`,
  strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#DC143C"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#FFD700" stroke-width="0.8"/></svg>`,
  greater_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B8860B"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a0a0a" stroke="#7A7070" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#8B0000"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8.5" stroke="#FF6347" stroke-width="1"/><circle cx="7" cy="7.5" r="0.5" fill="#FFA500"/><circle cx="9" cy="8" r="0.4" fill="#FFD700"/></svg>`,
  supreme_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#4682B4"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#E0FFFF" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#FFF"/><circle cx="9" cy="7" r="0.5" fill="#FFF"/></svg>`,
  
  minor_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#4169E1"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L8,6 L9,7 L9,9 L7,9 Z" fill="#87CEEB"/></svg>`,
  defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#4169E1"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L8,6 L9,7 L9,9 L7,9 Z" fill="#87CEEB"/></svg>`,
  greater_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#4682B4"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a0a1e" stroke="#70707C" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#0000CD"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6.5 L8,5.5 L9,6.5 L9,9 L7,9 Z" fill="#4169E1"/><circle cx="7.5" cy="7.5" r="0.5" fill="#87CEEB"/><circle cx="8.5" cy="8" r="0.4" fill="#FFF"/></svg>`,
  supreme_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#191970"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L8,6 L9,7 L9,9 L7,9 Z" fill="#87CEEB"/><circle cx="7.5" cy="7.5" r="0.4" fill="#E0FFFF"/><circle cx="8.5" cy="8.5" r="0.4" fill="#E0FFFF"/></svg>`,
  frost_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#E0FFFF"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0f0f1e" stroke="#73737C" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#4682B4"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 9,7 8,8 7,7" fill="#B0E0E6"/><polygon points="6.5,7.5 9.5,7.5" fill="#E0FFFF"/><polygon points="8,5.5 8,8.5" fill="#E0FFFF"/><circle cx="7" cy="6.5" r="0.5" fill="#FFF"/><circle cx="9" cy="8.5" r="0.5" fill="#FFF"/></svg>`,
  
  minor_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#228B22"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#90EE90" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#90EE90" stroke-width="0.6"/></svg>`,
  ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#228B22"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#90EE90" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#90EE90" stroke-width="0.6"/></svg>`,
  greater_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#6B8E23"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a1a0a" stroke="#707A70" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#006400"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#7FFF00" stroke-width="1"/><circle cx="8" cy="7" r="1.2" fill="none" stroke="#ADFF2F" stroke-width="0.8"/><circle cx="7" cy="7.5" r="0.4" fill="#90EE90"/><circle cx="9" cy="8" r="0.3" fill="#7FFF00"/></svg>`,
  supreme_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#20B2AA"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#E0FFFF" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#E0FFFF" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#FFF"/><circle cx="9" cy="6.5" r="0.4" fill="#FFF"/></svg>`,
  
  minor_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#9370DB"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#DDA0DD"/><circle cx="7" cy="7" r="0.5" fill="#FFF"/><circle cx="9" cy="8" r="0.5" fill="#FFF"/></svg>`,
  magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#9370DB"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#DDA0DD"/><circle cx="7" cy="7" r="0.5" fill="#FFF"/><circle cx="9" cy="8" r="0.5" fill="#FFF"/></svg>`,
  greater_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#9932CC"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a0a1a" stroke="#70707A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#4B0082"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,5.5 7.5,7.5 8,9 8.5,7.5" fill="#BA55D3"/><circle cx="7" cy="6.5" r="0.6" fill="#FFF"/><circle cx="9" cy="7.5" r="0.5" fill="#DDA0DD"/><circle cx="8" cy="9" r="0.4" fill="#EE82EE"/></svg>`,
  supreme_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#6A5ACD"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#E0FFFF"/><circle cx="7" cy="7" r="0.5" fill="#FFF"/><circle cx="9" cy="8" r="0.5" fill="#FFF"/><circle cx="8.5" cy="6.5" r="0.4" fill="#FFF"/></svg>`,
  
  lifesteal_elixir: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#888"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#8B008B"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q9,7 8,8 Q7,7 8,6" fill="#FF1493"/></svg>`,
  greater_lifesteal_elixir: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#8B008B"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a0a1a" stroke="#7A707A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#800080"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,5.5 Q9,6.5 8,8 Q7,6.5 8,5.5" fill="#FF1493"/><circle cx="7.5" cy="7" r="0.4" fill="#FFB6C1"/><circle cx="8.5" cy="8.5" r="0.4" fill="#FF69B4"/></svg>`,
  supreme_lifesteal_elixir: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2e" stroke="#7A7A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#4B0082"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q9,7 8,8 Q7,7 8,6" fill="#87CEEB"/><circle cx="7" cy="7" r="0.4" fill="#E0FFFF"/><circle cx="9" cy="8" r="0.4" fill="#E0FFFF"/></svg>`,
  
  minor_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#8B7355"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#90EE90"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#98FB98"/><circle cx="7.5" cy="8" r="0.4" fill="#ADFF2F"/></svg>`,
  gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#8B7355"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#2F4F2F" stroke="#869886" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#32CD32"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#90EE90"/><circle cx="7.5" cy="7.5" r="0.5" fill="#ADFF2F"/><circle cx="8.5" cy="8.5" r="0.4" fill="#ADFF2F"/></svg>`,
  greater_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#8B7355"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a3a1a" stroke="#7A8C7A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#228B22"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#7FFF00"/><circle cx="7.5" cy="7" r="0.5" fill="#ADFF2F"/><circle cx="8.5" cy="8" r="0.5" fill="#ADFF2F"/><circle cx="7" cy="9" r="0.4" fill="#90EE90"/></svg>`,
  supreme_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a2a1a" stroke="#7A837A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#00FA9A"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#AFEEEE"/><circle cx="7.5" cy="7" r="0.5" fill="#E0FFFF"/><circle cx="8.5" cy="8" r="0.5" fill="#E0FFFF"/><circle cx="7" cy="9" r="0.4" fill="#FFF"/></svg>`,
  minor_production_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#8B7355"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FFB74D"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#FFCC80"/><circle cx="7.5" cy="8" r="0.4" fill="#FFA726"/></svg>`,
  production_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#8B7355"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#4A2F1A" stroke="#96867A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#F97316"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#FFB74D"/><circle cx="7.5" cy="7.5" r="0.5" fill="#FBBF24"/><circle cx="8.5" cy="8.5" r="0.4" fill="#FBBF24"/></svg>`,
  greater_production_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#8B7355"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#3a220a" stroke="#8C7E70" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#C2540A"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#FDBA74"/><circle cx="7.5" cy="7" r="0.5" fill="#FBBF24"/><circle cx="8.5" cy="8" r="0.5" fill="#FBBF24"/><circle cx="7" cy="9" r="0.4" fill="#FFB74D"/></svg>`,
  supreme_production_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#FDE68A"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#2a1c0a" stroke="#837B70" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FBBF24"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#FEF3C7"/><circle cx="7.5" cy="7" r="0.5" fill="#FDE68A"/><circle cx="8.5" cy="8" r="0.5" fill="#FDE68A"/><circle cx="7" cy="9" r="0.4" fill="#FFF"/></svg>`,
  abyssal_production_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f97316"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#2e160a" stroke="#857770" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#4a260e"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#fb923c"/><circle cx="7.5" cy="7" r="0.5" fill="#fdba74"/><circle cx="8.5" cy="8" r="0.5" fill="#fdba74"/><circle cx="7" cy="9" r="0.4" fill="#ffedd5"/></svg>`,
  aeon_production_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#fbbf24"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a0e04" stroke="#7A736D" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#7c2d12"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q10,7 9,9 Q8,10 7,9 Q6,7 8,6" fill="#fb923c"/><path d="M8,6 L8,9" stroke="#9a3412" stroke-width="0.5"/><circle cx="7" cy="8" r="0.4" fill="#fde68a"/></svg>`,
  
  minor_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#8B7355"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#F0E68C"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#98FB98"/><path d="M6.7,9.3 L8,7.9 L9.3,9.3 M6.7,7.5 L8,6.1 L9.3,7.5" stroke="#85BF85" stroke-width="0.75" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#8B7355"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#2F4F2F" stroke="#869886" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FFD700"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,5.5 L7,7.5 L8,6.5 L9,7.5 Z" fill="#90EE90"/><circle cx="7" cy="6" r="0.3" fill="#ADFF2F"/><path d="M6.7,9.3 L8,7.9 L9.3,9.3 M6.7,7.5 L8,6.1 L9.3,7.5" stroke="#85BF85" stroke-width="0.75" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  greater_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#8B7355"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a3a1a" stroke="#7A8C7A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FFA500"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,5.5 L7,7.5 L8,6.5 L9,7.5 Z" fill="#7FFF00"/><circle cx="7" cy="6" r="0.4" fill="#ADFF2F"/><circle cx="9" cy="6.5" r="0.3" fill="#90EE90"/><path d="M6.7,9.3 L8,7.9 L9.3,9.3 M6.7,7.5 L8,6.1 L9.3,7.5" stroke="#85BF85" stroke-width="0.75" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  supreme_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a2a1a" stroke="#7A837A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FF8C00"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,5.5 L7,7.5 L8,6.5 L9,7.5 Z" fill="#AFEEEE"/><circle cx="6.5" cy="6" r="0.4" fill="#E0FFFF"/><circle cx="9.5" cy="6" r="0.4" fill="#FFF"/><path d="M6.7,9.3 L8,7.9 L9.3,9.3 M6.7,7.5 L8,6.1 L9.3,7.5" stroke="#72FCC7" stroke-width="0.75" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  minor_combat_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#CD853F"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#F0E68C"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,5.5 7.5,8 8.5,8" fill="#DC143C"/><path d="M6.7,9.3 L8,7.9 L9.3,9.3 M6.7,7.5 L8,6.1 L9.3,7.5" stroke="#BF7272" stroke-width="0.75" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  combat_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#DAA520"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#3a3a1a" stroke="#8C8C7A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FFD700"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,5 7.5,7.5 8.5,7.5" fill="#B22222"/><circle cx="7" cy="6" r="0.3" fill="#FF6347"/><path d="M6.7,9.3 L8,7.9 L9.3,9.3 M6.7,7.5 L8,6.1 L9.3,7.5" stroke="#BF7272" stroke-width="0.75" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  greater_combat_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#DAA520"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#2a2a1a" stroke="#83837A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FFA500"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,5 7.5,7.5 8.5,7.5" fill="#DC143C"/><circle cx="7" cy="6" r="0.4" fill="#FF6347"/><circle cx="9" cy="6.5" r="0.3" fill="#FFA500"/><path d="M6.7,9.3 L8,7.9 L9.3,9.3 M6.7,7.5 L8,6.1 L9.3,7.5" stroke="#BF7272" stroke-width="0.75" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  supreme_combat_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#FFD700"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a2a" stroke="#7A7A83" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FF8C00"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,4.5 7.5,7 8.5,7" fill="#8B0000"/><circle cx="6.5" cy="6" r="0.4" fill="#FF6347"/><circle cx="9.5" cy="6" r="0.4" fill="#FFA500"/><path d="M6.7,9.3 L8,7.9 L9.3,9.3 M6.7,7.5 L8,6.1 L9.3,7.5" stroke="#EB7D93" stroke-width="0.75" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  
  minor_protection_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#5F9EA0"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#48D1CC"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,7 L7,9 L8,10 L9,9 L9,7 Z" fill="#7FFFD4"/><path d="M7.5,7.5 L8,8 L8.5,7.5" stroke="#E0FFFF" stroke-width="0.5" fill="none"/></svg>`,
  protection_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#5F9EA0"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a2a2a" stroke="#7A8383" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#008B8B"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,5.5 L6.5,7 L6.5,9.5 L8,11 L9.5,9.5 L9.5,7 Z" fill="#20B2AA"/><path d="M7,7.5 L7.5,8 L9,6.5" stroke="#E0FFFF" stroke-width="0.6" fill="none"/></svg>`,
  greater_protection_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#5F9EA0"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a1a1a" stroke="#707A7A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#006666"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,5.5 L6.5,7 L6.5,9.5 L8,11 L9.5,9.5 L9.5,7 Z" fill="#008B8B"/><path d="M7,7 L7.5,7.5 L9,6" stroke="#AFEEEE" stroke-width="0.7" fill="none"/><circle cx="8" cy="8.5" r="0.5" fill="#E0FFFF"/></svg>`,
  supreme_protection_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#B0E0E6"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a1a2a" stroke="#707A83" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#004d4d"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,5.5 L6.5,7 L6.5,9.5 L8,11 L9.5,9.5 L9.5,7 Z" fill="#00CED1"/><path d="M7,7 L7.5,7.5 L9,6" stroke="#E0FFFF" stroke-width="0.8" fill="none"/><circle cx="7.5" cy="8.5" r="0.5" fill="#FFF"/><circle cx="8.5" cy="8.5" r="0.5" fill="#FFF"/></svg>`,
  
  minor_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#CD853F"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#333" stroke="#888888" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#F4A460"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="8" cy="7.5" r="1" fill="#FFD700"/></svg>`,
  fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#FFD700"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#2a2a1a" stroke="#83837A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FFA500"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7.5" cy="7" r="1" fill="#FFD700"/><circle cx="8.5" cy="8.5" r="1" fill="#FFD700"/></svg>`,
  greater_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#FFD700"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#1a1a0a" stroke="#7A7A70" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FF8C00"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="7" r="1" fill="#FFD700"/><circle cx="9" cy="7" r="1" fill="#FFD700"/><circle cx="8" cy="9" r="1" fill="#FFD700"/></svg>`,
  abyssal_lifesteal_elixir: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#06b6d4"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a1a2e" stroke="#707A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#1a0533"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q9,7 8,8 Q7,7 8,6" fill="#a855f7"/><circle cx="7" cy="7" r="0.4" fill="#e879f9"/><circle cx="9" cy="8" r="0.4" fill="#22d3ee"/><circle cx="8" cy="9.5" r="0.5" fill="#7c3aed" opacity="0.8"/></svg>`,
  abyssal_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#06b6d4"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a1a2e" stroke="#707A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#0e3a4a"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 L7,8 L8,7 L9,8 Z" fill="#22d3ee"/><circle cx="7.5" cy="7" r="0.5" fill="#a5f3fc"/><circle cx="8.5" cy="8" r="0.5" fill="#a5f3fc"/><circle cx="7" cy="9" r="0.4" fill="#e0f2fe"/></svg>`,
  abyssal_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#06b6d4"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a1a2e" stroke="#707A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#155e75"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,5.5 L7,7.5 L8,6.5 L9,7.5 Z" fill="#22d3ee"/><circle cx="6.5" cy="6" r="0.4" fill="#e0f2fe"/><circle cx="9.5" cy="6" r="0.4" fill="#a5f3fc"/><path d="M6.7,9.3 L8,7.9 L9.3,9.3 M6.7,7.5 L8,6.1 L9.3,7.5" stroke="#CDF8FD" stroke-width="0.75" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  abyssal_combat_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#06b6d4"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a1a2e" stroke="#707A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#1a0533"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,4.5 7.5,7 8.5,7" fill="#7c3aed"/><circle cx="6.5" cy="6" r="0.4" fill="#c084fc"/><circle cx="9.5" cy="6" r="0.4" fill="#22d3ee"/><path d="M6.7,9.3 L8,7.9 L9.3,9.3 M6.7,7.5 L8,6.1 L9.3,7.5" stroke="#CFA1FA" stroke-width="0.75" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  abyssal_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#06b6d4"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a1a2e" stroke="#707A85" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#0c2a4a"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="6.5" r="0.9" fill="#fbbf24"/><circle cx="9" cy="6.5" r="0.9" fill="#fbbf24"/><circle cx="7" cy="8.5" r="0.9" fill="#fbbf24"/><circle cx="9" cy="8.5" r="0.9" fill="#fbbf24"/></svg>`,
  supreme_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#FFD700"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a0a1a" stroke="#70707A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#FF6347"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="6.5" r="0.9" fill="#FFD700"/><circle cx="9" cy="6.5" r="0.9" fill="#FFD700"/><circle cx="7" cy="8.5" r="0.9" fill="#FFD700"/><circle cx="9" cy="8.5" r="0.9" fill="#FFD700"/></svg>`,
 
  
  abyssal_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#cc66ff"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a0a1a" stroke="#70707A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#3a0a5a"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#cc66ff"/><circle cx="7" cy="7" r="0.5" fill="#9a4aff"/><circle cx="9" cy="8" r="0.5" fill="#9a4aff"/></svg>`,
  abyssal_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#cc66ff"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a0a1a" stroke="#70707A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#5a0a3a"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#cc66ff" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#9a4aff"/><circle cx="9" cy="7" r="0.5" fill="#9a4aff"/></svg>`,
  abyssal_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#cc66ff"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a0a1a" stroke="#70707A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#0a0a5a"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L8,6 L9,7 L9,9 L7,9 Z" fill="#7a2aff"/><circle cx="7.5" cy="7.5" r="0.4" fill="#cc66ff"/><circle cx="8.5" cy="8.5" r="0.4" fill="#cc66ff"/></svg>`,
  abyssal_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#cc66ff"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a0a1a" stroke="#70707A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#0a2a1a"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#cc66ff" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#9a4aff" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#cc66ff"/></svg>`,
  abyssal_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#cc66ff"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a0a1a" stroke="#70707A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#2a0a4a"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#cc66ff"/><circle cx="7" cy="7" r="0.5" fill="#9a4aff"/><circle cx="9" cy="8" r="0.5" fill="#9a4aff"/><circle cx="8.5" cy="6.5" r="0.4" fill="#FFF"/></svg>`,
  abyssal_protection_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#cc66ff"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#0a0a1a" stroke="#70707A" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#1a0a3a"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,5.5 L6.5,7 L6.5,9.5 L8,11 L9.5,9.5 L9.5,7 Z" fill="#7a2aff"/><path d="M7,7 L7.5,7.5 L9,6" stroke="#cc66ff" stroke-width="0.8" fill="none"/><circle cx="7.5" cy="8.5" r="0.5" fill="#9a4aff"/></svg>`,

  
  aeon_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#0f766e"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#fbbf24"/><circle cx="7" cy="7" r="0.5" fill="#5eead4"/><circle cx="9" cy="8" r="0.5" fill="#5eead4"/></svg>`,
  aeon_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#115e59"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#fbbf24" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#5eead4"/><circle cx="9" cy="7" r="0.5" fill="#5eead4"/></svg>`,
  aeon_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#134e4a"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L8,6 L9,7 L9,9 L7,9 Z" fill="#5eead4"/><circle cx="7.5" cy="7.5" r="0.4" fill="#fbbf24"/><circle cx="8.5" cy="8.5" r="0.4" fill="#14b8a6"/></svg>`,
  aeon_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#0d5c46"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#fbbf24" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#5eead4" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#14b8a6"/></svg>`,
  aeon_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#0c4a6e"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#5eead4"/><circle cx="7" cy="7" r="0.5" fill="#14b8a6"/><circle cx="9" cy="8" r="0.5" fill="#14b8a6"/><circle cx="8.5" cy="6.5" r="0.4" fill="#fbbf24"/></svg>`,
  aeon_lifesteal_elixir: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#5c1030"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q9.2,7 8,8.5 Q6.8,7 8,6" fill="#f472b6"/><circle cx="7" cy="9" r="0.4" fill="#5eead4"/><circle cx="9" cy="9.5" r="0.4" fill="#5eead4"/></svg>`,
  aeon_protection_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#164e63"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,5.5 L6.5,7 L6.5,9.5 L8,11 L9.5,9.5 L9.5,7 Z" fill="#2dd4bf"/><path d="M7,7 L7.5,7.5 L9,6" stroke="#fbbf24" stroke-width="0.8" fill="none"/><circle cx="7.5" cy="8.5" r="0.5" fill="#5eead4"/></svg>`,
  aeon_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#14532d"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q10,7 9,9 Q8,10 7,9 Q6,7 8,6" fill="#4ade80"/><path d="M8,6 L8,9" stroke="#166534" stroke-width="0.5"/><circle cx="7" cy="8" r="0.4" fill="#fbbf24"/></svg>`,
  aeon_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#155e4f"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="7" r="0.7" fill="#fbbf24"/><circle cx="9" cy="7" r="0.7" fill="#fbbf24"/><circle cx="8" cy="9" r="0.7" fill="#fde68a"/><circle cx="6.5" cy="6" r="0.4" fill="#5eead4"/><circle cx="9.5" cy="6" r="0.4" fill="#5eead4"/></svg>`,
  aeon_combat_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#0f4a5e"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M6.8,6 L9.2,9 M9.2,6 L6.8,9" stroke="#f87171" stroke-width="0.8"/><circle cx="8" cy="7.5" r="0.6" fill="#fbbf24"/><circle cx="7" cy="9.5" r="0.4" fill="#5eead4"/></svg>`,
  aeon_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#2dd4bf"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#041a16" stroke="#6D7A77" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#7c5806"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7.2" cy="7" r="0.9" fill="#fbbf24" stroke="#fde68a" stroke-width="0.3"/><circle cx="9" cy="8" r="0.9" fill="#fde68a" stroke="#fbbf24" stroke-width="0.3"/><circle cx="7.5" cy="9.3" r="0.7" fill="#fbbf24"/><circle cx="9.3" cy="6.2" r="0.4" fill="#5eead4"/></svg>`,

  
  easter_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f9a8d4"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fce7f3" stroke="#FDF1F8" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fbcfe8"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#ec4899"/><circle cx="7" cy="7" r="0.5" fill="#f472b6"/><circle cx="9" cy="8" r="0.5" fill="#f472b6"/></svg>`,
  easter_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#fde68a"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fefce8" stroke="#FEFDF1" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fef08a"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#ca8a04" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#facc15"/><circle cx="9" cy="7" r="0.5" fill="#facc15"/></svg>`,
  easter_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#6ee7b7"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#f0fdf4" stroke="#F6FDF8" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#bbf7d0"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L8,6 L9,7 L9,9 L7,9 Z" fill="#34d399"/><circle cx="7.5" cy="7.5" r="0.4" fill="#6ee7b7"/><circle cx="8.5" cy="8.5" r="0.4" fill="#6ee7b7"/></svg>`,
  easter_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#93c5fd"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#eff6ff" stroke="#F5F9FF" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#bfdbfe"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#3b82f6" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#60a5fa" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#93c5fd"/></svg>`,
  easter_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#c4b5fd"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#f5f3ff" stroke="#F9F8FF" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#ddd6fe"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#8b5cf6"/><circle cx="7" cy="7" r="0.5" fill="#a78bfa"/><circle cx="9" cy="8" r="0.5" fill="#a78bfa"/><circle cx="8.5" cy="6.5" r="0.4" fill="#fff"/></svg>`,
  easter_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#86efac"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#f0fff4" stroke="#F6FFF8" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#bbf7d0"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q10,7 9,9 Q8,10 7,9 Q6,7 8,6" fill="#22c55e"/><path d="M8,6 L8,9" stroke="#16a34a" stroke-width="0.5"/><circle cx="7" cy="8" r="0.4" fill="#4ade80"/></svg>`,
  easter_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#fdba74"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FFFAF4" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fed7aa"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="7" r="0.7" fill="#fb923c"/><circle cx="9" cy="7" r="0.7" fill="#fb923c"/><circle cx="8" cy="9" r="0.7" fill="#fdba74"/><circle cx="6.5" cy="6" r="0.4" fill="#fde68a"/><circle cx="9.5" cy="6" r="0.4" fill="#fde68a"/></svg>`,

  
  firework_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f87171"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fef2f2" stroke="#FEF7F7" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fecaca"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#dc2626"/><circle cx="7" cy="7" r="0.5" fill="#60a5fa"/><circle cx="9" cy="8" r="0.5" fill="#60a5fa"/></svg>`,
  firework_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#60a5fa"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#eff6ff" stroke="#F5F9FF" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#bfdbfe"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#1d4ed8" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#f87171"/><circle cx="9" cy="7" r="0.5" fill="#f87171"/></svg>`,
  firework_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f87171"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#f8fafc" stroke="#FAFCFD" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fee2e2"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#ef4444" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#60a5fa" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#93c5fd"/></svg>`,
  firework_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#60a5fa"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#f8fafc" stroke="#FAFCFD" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#dbeafe"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#3b82f6"/><circle cx="7" cy="7" r="0.5" fill="#f87171"/><circle cx="9" cy="8" r="0.5" fill="#f87171"/><circle cx="8.5" cy="6.5" r="0.4" fill="#fff"/></svg>`,
  firework_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f87171"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#f8fafc" stroke="#FAFCFD" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#e0f2fe"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q10,7 9,9 Q8,10 7,9 Q6,7 8,6" fill="#22c55e"/><path d="M8,6 L8,9" stroke="#16a34a" stroke-width="0.5"/><circle cx="7" cy="8" r="0.4" fill="#f87171"/></svg>`,
  firework_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#60a5fa"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#f8fafc" stroke="#FAFCFD" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fee2e2"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="7" r="0.7" fill="#fb923c"/><circle cx="9" cy="7" r="0.7" fill="#fb923c"/><circle cx="8" cy="9" r="0.7" fill="#fdba74"/><circle cx="6.5" cy="6" r="0.4" fill="#60a5fa"/><circle cx="9.5" cy="6" r="0.4" fill="#60a5fa"/></svg>`,
  firework_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f87171"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#f8fafc" stroke="#FAFCFD" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#dbeafe"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7.2" cy="7" r="0.9" fill="#fbbf24" stroke="#fde68a" stroke-width="0.3"/><circle cx="9" cy="8" r="0.9" fill="#fde68a" stroke="#fbbf24" stroke-width="0.3"/><circle cx="7.5" cy="9.3" r="0.7" fill="#fbbf24"/><circle cx="9.3" cy="6.2" r="0.4" fill="#f87171"/></svg>`,
  rose_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f43f5e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fdf2f8" stroke="#FBCFE8" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fbcfe8"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#dc2626"/><circle cx="7" cy="7" r="0.5" fill="#f9a8d4"/><circle cx="9" cy="8" r="0.5" fill="#f9a8d4"/></svg>`,
  rose_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f9a8d4"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fdf2f8" stroke="#FBCFE8" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fbcfe8"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#be185d" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#f43f5e"/><circle cx="9" cy="7" r="0.5" fill="#f43f5e"/></svg>`,
  rose_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f43f5e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fdf2f8" stroke="#FBCFE8" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fbcfe8"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#ef4444" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#f9a8d4" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#f9a8d4"/></svg>`,
  rose_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f9a8d4"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fdf2f8" stroke="#FBCFE8" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fbcfe8"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#db2777"/><circle cx="7" cy="7" r="0.5" fill="#f43f5e"/><circle cx="9" cy="8" r="0.5" fill="#f43f5e"/><circle cx="8.5" cy="6.5" r="0.4" fill="#fff"/></svg>`,
  rose_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f43f5e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fdf2f8" stroke="#FBCFE8" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fbcfe8"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q10,7 9,9 Q8,10 7,9 Q6,7 8,6" fill="#22c55e"/><path d="M8,6 L8,9" stroke="#16a34a" stroke-width="0.5"/><circle cx="7" cy="8" r="0.4" fill="#f43f5e"/></svg>`,
  rose_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f9a8d4"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fdf2f8" stroke="#FBCFE8" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fbcfe8"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="7" r="0.7" fill="#fb923c"/><circle cx="9" cy="7" r="0.7" fill="#fb923c"/><circle cx="8" cy="9" r="0.7" fill="#fdba74"/><circle cx="6.5" cy="6" r="0.4" fill="#f9a8d4"/><circle cx="9.5" cy="6" r="0.4" fill="#f9a8d4"/></svg>`,
  rose_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#f43f5e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fdf2f8" stroke="#FBCFE8" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fbcfe8"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7.2" cy="7" r="0.9" fill="#fbbf24" stroke="#fde68a" stroke-width="0.3"/><circle cx="9" cy="8" r="0.9" fill="#fde68a" stroke="#fbbf24" stroke-width="0.3"/><circle cx="7.5" cy="9.3" r="0.7" fill="#fbbf24"/><circle cx="9.3" cy="6.2" r="0.4" fill="#f43f5e"/></svg>`,
  haunted_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#a855f7"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#dc2626"/><circle cx="7" cy="7" r="0.5" fill="#a855f7"/><circle cx="9" cy="8" r="0.5" fill="#a855f7"/></svg>`,
  haunted_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#a855f7"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#1d4ed8" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#f87171"/><circle cx="9" cy="7" r="0.5" fill="#f87171"/></svg>`,
  haunted_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#a855f7"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#ef4444" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#a855f7" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#93c5fd"/></svg>`,
  haunted_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#a855f7"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#3b82f6"/><circle cx="7" cy="7" r="0.5" fill="#f87171"/><circle cx="9" cy="8" r="0.5" fill="#f87171"/><circle cx="8.5" cy="6.5" r="0.4" fill="#fff"/></svg>`,
  haunted_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#a855f7"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q10,7 9,9 Q8,10 7,9 Q6,7 8,6" fill="#22c55e"/><path d="M8,6 L8,9" stroke="#16a34a" stroke-width="0.5"/><circle cx="7" cy="8" r="0.4" fill="#f87171"/></svg>`,
  haunted_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#a855f7"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="7" r="0.7" fill="#fb923c"/><circle cx="9" cy="7" r="0.7" fill="#fb923c"/><circle cx="8" cy="9" r="0.7" fill="#fdba74"/><circle cx="6.5" cy="6" r="0.4" fill="#a855f7"/><circle cx="9.5" cy="6" r="0.4" fill="#a855f7"/></svg>`,
  haunted_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#a855f7"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7.2" cy="7" r="0.9" fill="#fbbf24" stroke="#fde68a" stroke-width="0.3"/><circle cx="9" cy="8" r="0.9" fill="#fde68a" stroke="#fbbf24" stroke-width="0.3"/><circle cx="7.5" cy="9.3" r="0.7" fill="#fbbf24"/><circle cx="9.3" cy="6.2" r="0.4" fill="#f87171"/></svg>`,
  cursed_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#22c55e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#dc2626"/><circle cx="7" cy="7" r="0.5" fill="#a855f7"/><circle cx="9" cy="8" r="0.5" fill="#a855f7"/></svg>`,
  cursed_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#22c55e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#1d4ed8" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#f87171"/><circle cx="9" cy="7" r="0.5" fill="#f87171"/></svg>`,
  cursed_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#22c55e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#ef4444" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#a855f7" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#93c5fd"/></svg>`,
  cursed_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#22c55e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#3b82f6"/><circle cx="7" cy="7" r="0.5" fill="#f87171"/><circle cx="9" cy="8" r="0.5" fill="#f87171"/><circle cx="8.5" cy="6.5" r="0.4" fill="#fff"/></svg>`,
  cursed_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#22c55e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q10,7 9,9 Q8,10 7,9 Q6,7 8,6" fill="#22c55e"/><path d="M8,6 L8,9" stroke="#16a34a" stroke-width="0.5"/><circle cx="7" cy="8" r="0.4" fill="#f87171"/></svg>`,
  cursed_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#22c55e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="7" r="0.7" fill="#fb923c"/><circle cx="9" cy="7" r="0.7" fill="#fb923c"/><circle cx="8" cy="9" r="0.7" fill="#fdba74"/><circle cx="6.5" cy="6" r="0.4" fill="#a855f7"/><circle cx="9.5" cy="6" r="0.4" fill="#a855f7"/></svg>`,
  cursed_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#22c55e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7.2" cy="7" r="0.9" fill="#fbbf24" stroke="#fde68a" stroke-width="0.3"/><circle cx="9" cy="8" r="0.9" fill="#fde68a" stroke="#fbbf24" stroke-width="0.3"/><circle cx="7.5" cy="9.3" r="0.7" fill="#fbbf24"/><circle cx="9.3" cy="6.2" r="0.4" fill="#f87171"/></svg>`,
  phantom_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#93c5fd"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#dc2626"/><circle cx="7" cy="7" r="0.5" fill="#a855f7"/><circle cx="9" cy="8" r="0.5" fill="#a855f7"/></svg>`,
  phantom_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#93c5fd"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#1d4ed8" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#f87171"/><circle cx="9" cy="7" r="0.5" fill="#f87171"/></svg>`,
  phantom_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#93c5fd"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#ef4444" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#a855f7" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#93c5fd"/></svg>`,
  phantom_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#93c5fd"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#3b82f6"/><circle cx="7" cy="7" r="0.5" fill="#f87171"/><circle cx="9" cy="8" r="0.5" fill="#f87171"/><circle cx="8.5" cy="6.5" r="0.4" fill="#fff"/></svg>`,
  phantom_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#93c5fd"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q10,7 9,9 Q8,10 7,9 Q6,7 8,6" fill="#22c55e"/><path d="M8,6 L8,9" stroke="#16a34a" stroke-width="0.5"/><circle cx="7" cy="8" r="0.4" fill="#f87171"/></svg>`,
  phantom_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#93c5fd"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="7" r="0.7" fill="#fb923c"/><circle cx="9" cy="7" r="0.7" fill="#fb923c"/><circle cx="8" cy="9" r="0.7" fill="#fdba74"/><circle cx="6.5" cy="6" r="0.4" fill="#a855f7"/><circle cx="9.5" cy="6" r="0.4" fill="#a855f7"/></svg>`,
  phantom_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#93c5fd"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7.2" cy="7" r="0.9" fill="#fbbf24" stroke="#fde68a" stroke-width="0.3"/><circle cx="9" cy="8" r="0.9" fill="#fde68a" stroke="#fbbf24" stroke-width="0.3"/><circle cx="7.5" cy="9.3" r="0.7" fill="#fbbf24"/><circle cx="9.3" cy="6.2" r="0.4" fill="#f87171"/></svg>`,
  wraith_attack_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#ef4444"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7,9 9,9" fill="#dc2626"/><circle cx="7" cy="7" r="0.5" fill="#a855f7"/><circle cx="9" cy="8" r="0.5" fill="#a855f7"/></svg>`,
  wraith_strength_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#ef4444"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,7 L9,7 M8,6 L8,8" stroke="#1d4ed8" stroke-width="0.8"/><circle cx="7" cy="8" r="0.5" fill="#f87171"/><circle cx="9" cy="7" r="0.5" fill="#f87171"/></svg>`,
  wraith_ranging_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#ef4444"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6 L9,8 M9,6 L7,8" stroke="#ef4444" stroke-width="0.8"/><circle cx="8" cy="7" r="0.8" fill="none" stroke="#a855f7" stroke-width="0.6"/><circle cx="7" cy="8.5" r="0.4" fill="#93c5fd"/></svg>`,
  wraith_magic_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#ef4444"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><polygon points="8,6 7.5,7.5 8,9 8.5,7.5" fill="#3b82f6"/><circle cx="7" cy="7" r="0.5" fill="#f87171"/><circle cx="9" cy="8" r="0.5" fill="#f87171"/><circle cx="8.5" cy="6.5" r="0.4" fill="#fff"/></svg>`,
  wraith_gathering_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#ef4444"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M8,6 Q10,7 9,9 Q8,10 7,9 Q6,7 8,6" fill="#22c55e"/><path d="M8,6 L8,9" stroke="#16a34a" stroke-width="0.5"/><circle cx="7" cy="8" r="0.4" fill="#f87171"/></svg>`,
  wraith_gathering_xp_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#ef4444"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7" cy="7" r="0.7" fill="#fb923c"/><circle cx="9" cy="7" r="0.7" fill="#fb923c"/><circle cx="8" cy="9" r="0.7" fill="#fdba74"/><circle cx="6.5" cy="6" r="0.4" fill="#a855f7"/><circle cx="9.5" cy="6" r="0.4" fill="#a855f7"/></svg>`,
  wraith_fortune_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#ef4444"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7.2" cy="7" r="0.9" fill="#fbbf24" stroke="#fde68a" stroke-width="0.3"/><circle cx="9" cy="8" r="0.9" fill="#fde68a" stroke="#fbbf24" stroke-width="0.3"/><circle cx="7.5" cy="9.3" r="0.7" fill="#fbbf24"/><circle cx="9.3" cy="6.2" r="0.4" fill="#f87171"/></svg>`,
  
  haunted_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#a855f7"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6.5 L8,5.5 L9,6.5 L9,9 L7,9 Z" fill="#2563eb"/><circle cx="7.5" cy="7.5" r="0.45" fill="#a855f7"/><circle cx="8.5" cy="8.3" r="0.45" fill="#a855f7"/></svg>`,
  cursed_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#22c55e"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6.5 L8,5.5 L9,6.5 L9,9 L7,9 Z" fill="#2563eb"/><circle cx="7.5" cy="7.5" r="0.45" fill="#a855f7"/><circle cx="8.5" cy="8.3" r="0.45" fill="#a855f7"/></svg>`,
  phantom_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#93c5fd"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6.5 L8,5.5 L9,6.5 L9,9 L7,9 Z" fill="#2563eb"/><circle cx="7.5" cy="7.5" r="0.45" fill="#a855f7"/><circle cx="8.5" cy="8.3" r="0.45" fill="#a855f7"/></svg>`,
  wraith_defense_potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#ef4444"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#fff7ed" stroke="#FED7AA" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#fdba74"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><path d="M7,6.5 L8,5.5 L9,6.5 L9,9 L7,9 Z" fill="#2563eb"/><circle cx="7.5" cy="7.5" r="0.45" fill="#a855f7"/><circle cx="8.5" cy="8.3" r="0.45" fill="#a855f7"/></svg>`,

  
  moose: `<svg viewBox="0 0 32 32"><path d="M9,10 Q4,10 3,5 Q6,7 8,6 Q6,4 6,2 Q9,4 10,7 L11,10 Z" fill="#c98d4b"/><path d="M23,10 Q28,10 29,5 Q26,7 24,6 Q26,4 26,2 Q23,4 22,7 L21,10 Z" fill="#c98d4b"/><path d="M16,8 Q21,8 22,13 Q25,16 24,20 Q23,23 20,23 L19,26 Q16,28 13,26 L12,23 Q9,23 8,20 Q7,16 10,13 Q11,8 16,8 Z" fill="#8a5a2b"/><path d="M13,22 Q16,25 19,22 L19,25 Q16,27.5 13,25 Z" fill="#6b4423"/><circle cx="13" cy="14" r="1.2" fill="#1c0f08"/><circle cx="19" cy="14" r="1.2" fill="#1c0f08"/><circle cx="14" cy="23" r="0.8" fill="#3b2314"/><circle cx="18" cy="23" r="0.8" fill="#3b2314"/></svg>`,
  maple_syrup: `<svg viewBox="0 0 16 16"><rect x="6.5" y="1" width="3" height="2.2" rx="0.5" fill="#7c2d12"/><path d="M6.5,3.2 L5,6 L5,13.5 Q5,14.5 6,14.5 L10,14.5 Q11,14.5 11,13.5 L11,6 L9.5,3.2 Z" fill="#d97706"/><path d="M5.6,7 L10.4,7 L10.4,12 L5.6,12 Z" fill="#fef3c7" opacity="0.92"/><path d="M8,7.8 L8.4,8.8 L9.5,8.8 L8.6,9.5 L9,10.6 L8,9.9 L7,10.6 L7.4,9.5 L6.5,8.8 L7.6,8.8 Z" fill="#dc2626"/></svg>`,
  nanaimo_bar: `<svg viewBox="0 0 16 16"><rect x="2.5" y="10" width="11" height="2.8" rx="0.6" fill="#2b1608"/><rect x="2.5" y="6.8" width="11" height="3.2" fill="#fde68a"/><rect x="2.5" y="3.5" width="11" height="3.3" rx="0.6" fill="#3f2212"/><path d="M3,4.5 Q5,5.5 8,4.5 Q11,3.8 13,4.8" stroke="#1f0f05" stroke-width="0.5" fill="none" opacity="0.6"/><rect x="2.5" y="6.8" width="11" height="0.6" fill="#fbbf24" opacity="0.7"/></svg>`,
  maple_leaf: `<svg viewBox="0 0 16 16"><path d="M8,1 L9.3,4 L12.3,3 L11,5.8 L14,7.2 L10.8,8.6 L11.8,11.6 L8.7,10.2 L8,14.8 L7.3,10.2 L4.2,11.6 L5.2,8.6 L2,7.2 L5,5.8 L3.7,3 L6.7,4 Z" fill="#ef4444"/></svg>`,
  halloween_candy: `<svg viewBox="0 0 16 16"><polygon points="4,8 1,5 1.8,8 1,11" fill="#f97316" stroke="#7c2d12" stroke-width="0.6"/><polygon points="12,8 15,5 14.2,8 15,11" fill="#f97316" stroke="#7c2d12" stroke-width="0.6"/><rect x="3.5" y="5" width="9" height="6" rx="3" fill="#f97316" stroke="#7c2d12" stroke-width="0.7"/><path d="M6.5,5.4 L5.8,10.6 M9.5,5.4 L8.8,10.6" stroke="#a855f7" stroke-width="1"/></svg>`,
  haunted_portal: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="5.2" ry="6.6" fill="#1e1030" stroke="#a855f7" stroke-width="1.2"/><ellipse cx="8" cy="8" rx="3" ry="4.2" fill="#4ade80" opacity="0.55"/><path d="M8,4.5 Q10,8 8,11.5 Q6,8 8,4.5 Z" fill="#a855f7"/></svg>`,
  candy_apple: `<svg viewBox="0 0 16 16"><rect x="7.4" y="9" width="1.2" height="6" fill="#d6b27a"/><circle cx="8" cy="6.5" r="5" fill="#dc2626" stroke="#7f1d1d" stroke-width="0.7"/><ellipse cx="6.3" cy="4.8" rx="1.2" ry="0.7" fill="#fca5a5" opacity="0.8"/></svg>`,
  pumpkin_pie: `<svg viewBox="0 0 16 16"><path d="M2,12 L8,3 L14,12 Z" fill="#f59e0b" stroke="#78350f" stroke-width="0.7"/><path d="M2,12 L14,12 L14,14 L2,14 Z" fill="#d6b27a" stroke="#78350f" stroke-width="0.6"/><circle cx="8" cy="7" r="1.3" fill="#fef3c7"/></svg>`,
  ghost_cake: `<svg viewBox="0 0 16 16"><path d="M3.5,9 L12.5,9 L11.5,15 L4.5,15 Z" fill="#a855f7" stroke="#3b0764" stroke-width="0.7"/><path d="M8,1.5 C5,1.5 3.5,4 3.5,6.5 L3.5,9 L12.5,9 L12.5,6.5 C12.5,4 11,1.5 8,1.5 Z" fill="#e2e8f0" stroke="#64748b" stroke-width="0.6"/><circle cx="6.5" cy="5.5" r="0.8" fill="#1e1030"/><circle cx="9.5" cy="5.5" r="0.8" fill="#1e1030"/></svg>`,
  black_cat: `<svg viewBox="0 0 32 32"><path d="M8,12 L6,4 L12,9 Z" fill="#1e1b2e" stroke="#a855f7" stroke-width="0.8"/><path d="M24,12 L26,4 L20,9 Z" fill="#1e1b2e" stroke="#a855f7" stroke-width="0.8"/><path d="M26,24 Q31,22 29,16" fill="none" stroke="#1e1b2e" stroke-width="2.6"/><ellipse cx="16" cy="25" rx="10" ry="5" fill="#1e1b2e" stroke="#a855f7" stroke-width="0.8"/><ellipse cx="16" cy="15" rx="9" ry="7.5" fill="#1e1b2e" stroke="#a855f7" stroke-width="0.8"/><ellipse cx="12.5" cy="14" rx="1.6" ry="2" fill="#4ade80"/><ellipse cx="19.5" cy="14" rx="1.6" ry="2" fill="#4ade80"/><circle cx="12.5" cy="14" r="0.6" fill="#0f172a"/><circle cx="19.5" cy="14" r="0.6" fill="#0f172a"/><path d="M15,18 L16,19 L17,18 Z" fill="#f472b6"/></svg>`,
  poutine: `<svg viewBox="0 0 16 16"><g fill="#fbbf24"><rect x="4.4" y="2.4" width="1.3" height="5" rx="0.4"/><rect x="7.3" y="1.6" width="1.3" height="5.5" rx="0.4"/><rect x="10" y="2.6" width="1.3" height="4.8" rx="0.4"/></g><path d="M2.5,7 L13.5,7 L12.5,14 Q8,15.5 3.5,14 Z" fill="#b91c1c"/><path d="M3,7 Q8,9.4 13,7 L13,8.4 Q8,10.6 3,8.4 Z" fill="#92400e"/><circle cx="6" cy="8" r="0.9" fill="#fefce8"/><circle cx="9.6" cy="8.3" r="0.8" fill="#fefce8"/><circle cx="7.8" cy="7.3" r="0.7" fill="#fef3c7"/></svg>`,

  
  rat_tail: `<svg viewBox="0 0 16 16"><path d="M2,10 Q4,6 8,7 Q12,8 14,10" stroke="#808080" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="2" cy="10" r="1.5" fill="#696969"/></svg>`,
  cloth: `<svg viewBox="0 0 16 16"><path d="M3,3 L13,3 L14,8 L13,13 L3,13 L2,8 Z" fill="#E8E8E8"/><path d="M4,4 L12,4 L12.5,8 L12,12 L4,12 L3.5,8 Z" fill="#F5F5F5"/><path d="M5,6 L11,6 M4,8 L12,8 M5,10 L11,10" stroke="#D0D0D0" stroke-width="0.7"/></svg>`,
  wolf_pelt: `<svg viewBox="0 0 16 16"><path d="M3,4 Q8,2 13,4 L14,8 L13,12 Q8,14 3,12 L2,8 Z" fill="#4a4a4a"/><path d="M5,6 Q8,5 11,6 L11,10 Q8,11 5,10 Z" fill="#5a5a5a"/></svg>`,
  troll_hide: `<svg viewBox="0 0 16 16"><path d="M3,4 Q8,2 13,4 L14,8 L13,12 Q8,14 3,12 L2,8 Z" fill="#708090"/><path d="M5,6 Q8,5 11,6 L11,10 Q8,11 5,10 Z" fill="#7a8a9a"/></svg>`,
  chocolate_chunks: `<svg viewBox="0 0 16 16"><rect x="3" y="4" width="4" height="4" rx="0.5" fill="#5c3317"/><rect x="9" y="4" width="4" height="4" rx="0.5" fill="#5c3317"/><rect x="3" y="10" width="4" height="4" rx="0.5" fill="#5c3317"/><rect x="9" y="10" width="4" height="4" rx="0.5" fill="#5c3317"/><rect x="3.5" y="4.5" width="3" height="1" fill="#8b5a2b" opacity="0.5"/><rect x="9.5" y="4.5" width="3" height="1" fill="#8b5a2b" opacity="0.5"/><rect x="3.5" y="10.5" width="3" height="1" fill="#8b5a2b" opacity="0.5"/><rect x="9.5" y="10.5" width="3" height="1" fill="#8b5a2b" opacity="0.5"/></svg>`,
  chocolate_bar: `<svg viewBox="0 0 16 16"><rect x="2" y="4" width="12" height="8" rx="1" fill="#5c3317"/><line x1="6" y1="4" x2="6" y2="12" stroke="#3d2010" stroke-width="0.8"/><line x1="10" y1="4" x2="10" y2="12" stroke="#3d2010" stroke-width="0.8"/><line x1="2" y1="8" x2="14" y2="8" stroke="#3d2010" stroke-width="0.8"/><rect x="2.5" y="4.5" width="11" height="1.5" fill="#8b5a2b" opacity="0.3"/></svg>`,
  heart_slime_jelly: `<svg viewBox="0 0 16 16"><path d="M8,13 Q3,9 3,6 Q3,3 6,3 Q7.5,3 8,4.5 Q8.5,3 10,3 Q13,3 13,6 Q13,9 8,13Z" fill="#ff6b8a" opacity="0.9"/><path d="M8,11 Q5,8 5,6.5 Q5,5 6.5,5 Q7.2,5 8,6 Q8.8,5 9.5,5 Q11,5 11,6.5 Q11,8 8,11Z" fill="#ff9eb5" opacity="0.7"/><circle cx="6.5" cy="5.5" r="0.6" fill="#fff" opacity="0.6"/></svg>`,
  ancient_bone: `<svg viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="2" fill="#D4C4A8"/><circle cx="3" cy="6" r="2" fill="#D4C4A8"/><circle cx="3" cy="10" r="2" fill="#D4C4A8"/><circle cx="13" cy="6" r="2" fill="#D4C4A8"/><circle cx="13" cy="10" r="2" fill="#D4C4A8"/><path d="M6,7 L6,9 M8,7 L8,9 M10,7 L10,9" stroke="#B8A888" stroke-width="0.5"/></svg>`,
  bowstring: `<svg viewBox="0 0 16 16"><path d="M4,2 Q2,8 4,14" stroke="#C4A67A" stroke-width="2" fill="none"/><path d="M4,2 L4,14" stroke="#E8D8C8" stroke-width="1"/></svg>`,
  
  
  arrow: `<svg viewBox="0 0 16 16"><rect x="2" y="7" width="10" height="2" fill="#8B4513"/><polygon points="12,5 12,11 15,8" fill="#A0A0A0"/><path d="M2,6 L1,8 L2,10" stroke="#654321" fill="none"/></svg>`,
  potion: `<svg viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="2" fill="#5A2D5A"/><path d="M6,3 L5,5 L5,12 Q8,14 11,12 L11,5 L10,3 Z" fill="#3A1E3A" stroke="#8C7C8C" stroke-width="0.7" stroke-linejoin="round"/><path d="M6,5 L6,11 Q8,12.5 10,11 L10,5 Z" fill="#A93FA5"/><rect x="6.35" y="5.6" width="0.5" height="4.4" fill="#FFFFFF" opacity="0.22"/><circle cx="7.1" cy="7.6" r="0.42" fill="#FFF" opacity="0.7"/><circle cx="9" cy="9.1" r="0.32" fill="#FFF" opacity="0.7"/></svg>`,
  player: `<svg viewBox="0 0 16 16"><circle cx="8" cy="5" r="3" fill="#D2B48C"/><rect x="5" y="8" width="6" height="6" fill="#4682B4"/><rect x="4" y="9" width="2" height="4" fill="#D2B48C"/><rect x="10" y="9" width="2" height="4" fill="#D2B48C"/></svg>`,
  
  
  frozen_pelt: `<svg viewBox="0 0 16 16"><path d="M3,4 Q8,2 13,4 L14,8 L13,12 Q8,14 3,12 L2,8 Z" fill="#B0E0E6"/><path d="M5,6 Q8,5 11,6 L11,10 Q8,11 5,10 Z" fill="#E0FFFF"/><circle cx="6" cy="7" r="0.8" fill="#FFF"/><circle cx="10" cy="9" r="0.8" fill="#FFF"/><circle cx="7" cy="9" r="0.6" fill="#87CEEB"/></svg>`,
  frost_bone: `<svg viewBox="0 0 16 16"><rect x="3" y="7" width="10" height="2" fill="#E0FFFF"/><circle cx="3" cy="6" r="2" fill="#E0FFFF"/><circle cx="3" cy="10" r="2" fill="#E0FFFF"/><circle cx="13" cy="6" r="2" fill="#E0FFFF"/><circle cx="13" cy="10" r="2" fill="#E0FFFF"/><path d="M6,7 L6,9 M8,7 L8,9 M10,7 L10,9" stroke="#87CEEB" stroke-width="0.5"/></svg>`,
  giant_frost_bone: `<svg viewBox="0 0 16 16"><rect x="3.2" y="6.55" width="9.6" height="2.9" fill="#E0FFFF"/><circle cx="3.2" cy="5.4" r="2.6" fill="#E0FFFF"/><circle cx="3.2" cy="10.6" r="2.6" fill="#E0FFFF"/><circle cx="12.8" cy="5.4" r="2.6" fill="#E0FFFF"/><circle cx="12.8" cy="10.6" r="2.6" fill="#E0FFFF"/><path d="M5.6,7 L5.6,9 M8,7 L8,9 M10.4,7 L10.4,9" stroke="#87CEEB" stroke-width="0.75"/></svg>`,
  glacial_ore: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#3F7EA0" stroke="#2A5570" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#6FB4CE"/><circle cx="7.1" cy="7.9" r="1.25" fill="#E6FBFF"/><circle cx="9.2" cy="9.3" r="0.8" fill="#E6FBFF"/></svg>`,
  abyssalite_ore: `<svg viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#16062A" stroke="#7A2ACC" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#2E0A4E"/><circle cx="7.1" cy="7.9" r="1.25" fill="#9A2AFF"/><circle cx="9.2" cy="9.3" r="0.8" fill="#9A2AFF"/></svg>`,
  glacial_bar: `<svg viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#D8F3F8" stroke="#3F7EA0" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#58899B" stroke="#3F7EA0" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#7FC4DE" stroke="#3F7EA0" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
  abyssalite_bar: `<svg viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#5A1A8A" stroke="#9A4AFF" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#200736" stroke="#9A4AFF" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#2E0A4E" stroke="#9A4AFF" stroke-width="0.7" stroke-linejoin="round"/></svg>`,
  frozen_core: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#4682B4"/><circle cx="8" cy="8" r="4" fill="#87CEEB"/><polygon points="8,4 9,7 8,8 7,7" fill="#E0FFFF"/><polygon points="11,8 8,9 8,7" fill="#E0FFFF"/><polygon points="8,12 9,9 8,8 7,9" fill="#E0FFFF"/><polygon points="5,8 8,9 8,7" fill="#E0FFFF"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  glacial_core: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#191970"/><circle cx="8" cy="8" r="4" fill="#4682B4"/><polygon points="8,3 10,7 8,8 6,7" fill="#87CEEB"/><polygon points="12,8 8,10 8,6" fill="#87CEEB"/><polygon points="8,13 10,9 8,8 6,9" fill="#87CEEB"/><polygon points="4,8 8,10 8,6" fill="#87CEEB"/><circle cx="8" cy="8" r="2" fill="#E0FFFF"/><circle cx="8" cy="8" r="1" fill="#FFF"/></svg>`,
  frozen_essence: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#4682B4"/><polygon points="8,2 10,6 8,8 6,6" fill="#87CEEB"/><polygon points="14,8 10,10 8,8 10,6" fill="#87CEEB"/><polygon points="8,14 10,10 8,8 6,10" fill="#87CEEB"/><polygon points="2,8 6,10 8,8 6,6" fill="#87CEEB"/><circle cx="8" cy="8" r="3" fill="#B0E0E6"/><circle cx="8" cy="8" r="1.5" fill="#E0FFFF"/></svg>`,
  glacial_crystal: `<svg viewBox="0 0 16 16"><polygon points="8,1 12,5 12,11 8,15 4,11 4,5" fill="#87CEEB"/><polygon points="8,3 10,6 10,10 8,13 6,10 6,6" fill="#B0E0E6"/><polygon points="8,5 9,7 9,9 8,11 7,9 7,7" fill="#E0FFFF"/><polygon points="8,2 11,8 8,14 5,8" fill="#FFF" opacity="0.4"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  frost_dragonhide: `<svg viewBox="0 0 16 16"><path d="M3,4 Q8,2 13,4 L14,8 L13,12 Q8,14 3,12 L2,8 Z" fill="#4682B4"/><path d="M5,6 Q8,5 11,6 L11,10 Q8,11 5,10 Z" fill="#87CEEB"/><polygon points="6,7 7,6 8,7 7,8" fill="#B0E0E6"/><polygon points="9,8 10,7 11,8 10,9" fill="#B0E0E6"/><polygon points="7,10 8,9 9,10 8,11" fill="#B0E0E6"/></svg>`,
  frost_dragon_bones: `<svg viewBox="0 0 16 16"><rect x="3.4" y="6.7" width="9.2" height="2.6" fill="#E0FFFF"/><circle cx="3.4" cy="5.6" r="2.4" fill="#E0FFFF"/><circle cx="3.4" cy="10.4" r="2.4" fill="#E0FFFF"/><circle cx="12.6" cy="5.6" r="2.4" fill="#E0FFFF"/><circle cx="12.6" cy="10.4" r="2.4" fill="#E0FFFF"/><polygon points="6.9,6.7 8,4.8 9.1,6.7" fill="#B0E0E6"/><polygon points="6.9,9.3 8,11.2 9.1,9.3" fill="#B0E0E6"/><path d="M5.6,7.15 L5.6,8.85 M8,7.15 L8,8.85 M10.4,7.15 L10.4,8.85" stroke="#87CEEB" stroke-width="0.6"/></svg>`,
  abyssal_bone: `<svg viewBox="0 0 16 16"><rect x="2.88" y="6.23" width="10.24" height="3.54" fill="#6B4C9A"/><circle cx="3.3" cy="5.5" r="2.92" fill="#6B4C9A"/><circle cx="3.3" cy="10.5" r="2.92" fill="#6B4C9A"/><circle cx="12.7" cy="5.5" r="2.92" fill="#6B4C9A"/><circle cx="12.7" cy="10.5" r="2.92" fill="#6B4C9A"/><rect x="3.3" y="6.65" width="9.4" height="2.7" fill="#2D1B4E"/><circle cx="3.3" cy="5.5" r="2.5" fill="#2D1B4E"/><circle cx="3.3" cy="10.5" r="2.5" fill="#2D1B4E"/><circle cx="12.7" cy="5.5" r="2.5" fill="#2D1B4E"/><circle cx="12.7" cy="10.5" r="2.5" fill="#2D1B4E"/><path d="M5.6,7.1 L5.6,8.9 M8,7.1 L8,8.9 M10.4,7.1 L10.4,8.9" stroke="#7E4FC0" stroke-width="0.6"/><circle cx="8" cy="8" r="1.1" fill="#8B00FF" opacity="0.85"/><circle cx="8" cy="8" r="0.5" fill="#D9A6FF"/></svg>`,
  colossus_bone: `<svg viewBox="0 0 16 16"><rect x="2.88" y="6.23" width="10.24" height="3.54" fill="#2F6B34"/><circle cx="3.3" cy="5.5" r="2.92" fill="#2F6B34"/><circle cx="3.3" cy="10.5" r="2.92" fill="#2F6B34"/><circle cx="12.7" cy="5.5" r="2.92" fill="#2F6B34"/><circle cx="12.7" cy="10.5" r="2.92" fill="#2F6B34"/><rect x="3.3" y="6.65" width="9.4" height="2.7" fill="#0a1f0a"/><circle cx="3.3" cy="5.5" r="2.5" fill="#0a1f0a"/><circle cx="3.3" cy="10.5" r="2.5" fill="#0a1f0a"/><circle cx="12.7" cy="5.5" r="2.5" fill="#0a1f0a"/><circle cx="12.7" cy="10.5" r="2.5" fill="#0a1f0a"/><path d="M5.6,7.1 L5.6,8.9 M8,7.1 L8,8.9 M10.4,7.1 L10.4,8.9" stroke="#22c55e" stroke-width="0.6"/><circle cx="8" cy="8" r="1.1" fill="#16a34a"/><circle cx="8" cy="8" r="0.5" fill="#86efac"/></svg>`,
  raw_scorpion_meat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="4.5" ry="2.5" fill="#c17a3a"/><ellipse cx="8" cy="9" rx="3" ry="1.5" fill="#d4914a"/><path d="M4,8 Q3,6 4,5" stroke="#c17a3a" stroke-width="1.5" fill="none"/><path d="M12,8 Q13,6 12,5" stroke="#c17a3a" stroke-width="1.5" fill="none"/><path d="M8,7 Q10,4 9,2" stroke="#a0601a" stroke-width="1.5" fill="none"/><circle cx="9" cy="2" r="0.8" fill="#FFD700"/><path d="M5,9 Q8,8 11,9" stroke="#e8a860" stroke-width="0.5" fill="none"/></svg>`,
  cooked_scorpion_meat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="4.5" ry="2.5" fill="#7a4010"/><ellipse cx="8" cy="9" rx="3" ry="1.5" fill="#a05820"/><path d="M4,8 Q3,6 4,5" stroke="#7a4010" stroke-width="1.5" fill="none"/><path d="M12,8 Q13,6 12,5" stroke="#7a4010" stroke-width="1.5" fill="none"/><path d="M8,7 Q10,4 9,2" stroke="#603010" stroke-width="1.5" fill="none"/><circle cx="9" cy="2" r="0.8" fill="#cc8800"/><path d="M5,9 Q8,8 11,9" stroke="#c07030" stroke-width="0.5" fill="none"/></svg>`,
  raw_young_dragon_meat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="3" fill="#a8bf88"/><ellipse cx="8" cy="9" rx="3.5" ry="2" fill="#b8cf98"/><path d="M4,8 Q8,6 12,8" stroke="#c8df9a" stroke-width="0.6" fill="none"/><path d="M4,10 Q8,12 12,10" stroke="#c8df9a" stroke-width="0.6" fill="none"/><circle cx="5.5" cy="8" r="0.5" fill="#d8ef9a"/><circle cx="10.5" cy="9" r="0.5" fill="#d8ef9a"/></svg>`,
  cooked_young_dragon_meat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="3" fill="#7a6a3a"/><ellipse cx="8" cy="9" rx="3.5" ry="2" fill="#9a8a4a"/><path d="M4,8 Q8,6 12,8" stroke="#baa060" stroke-width="0.6" fill="none"/><path d="M4,10 Q8,12 12,10" stroke="#baa060" stroke-width="0.6" fill="none"/><circle cx="5.5" cy="8" r="0.5" fill="#cac070"/><circle cx="10.5" cy="9" r="0.5" fill="#cac070"/></svg>`,
  raw_small_dragon_meat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="3" fill="#c8844a"/><ellipse cx="8" cy="9" rx="3.5" ry="2" fill="#d8945a"/><path d="M4,8 Q8,6 12,8" stroke="#e8a46a" stroke-width="0.6" fill="none"/><path d="M4,10 Q8,12 12,10" stroke="#e8a46a" stroke-width="0.6" fill="none"/><circle cx="5.5" cy="8.5" r="0.6" fill="#f0c080"/><circle cx="10.5" cy="9" r="0.5" fill="#f0c080"/><polygon points="8,6 7,5 9,5" fill="#e87040" opacity="0.7"/></svg>`,
  cooked_small_dragon_meat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="3" fill="#7a3a10"/><ellipse cx="8" cy="9" rx="3.5" ry="2" fill="#9a5020"/><path d="M4,8 Q8,6 12,8" stroke="#c07030" stroke-width="0.6" fill="none"/><path d="M4,10 Q8,12 12,10" stroke="#c07030" stroke-width="0.6" fill="none"/><circle cx="5.5" cy="8.5" r="0.6" fill="#d08040"/><circle cx="10.5" cy="9" r="0.5" fill="#d08040"/><polygon points="8,6 7,5 9,5" fill="#ff6020" opacity="0.7"/></svg>`,
  raw_dragon_meat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="3" fill="#b03020"/><ellipse cx="8" cy="9" rx="3.5" ry="2" fill="#c84030"/><path d="M4,8 Q8,6 12,8" stroke="#e06050" stroke-width="0.6" fill="none"/><path d="M4,10 Q8,12 12,10" stroke="#e06050" stroke-width="0.6" fill="none"/><circle cx="5.5" cy="8.5" r="0.6" fill="#ff8060"/><circle cx="10.5" cy="9" r="0.5" fill="#ff8060"/><polygon points="8,5.5 6.5,4 9.5,4" fill="#ff4010" opacity="0.8"/><polygon points="10,6 9,4.5 11,5" fill="#ff4010" opacity="0.6"/></svg>`,
  cooked_dragon_meat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="3" fill="#5a1a08"/><ellipse cx="8" cy="9" rx="3.5" ry="2" fill="#7a2a10"/><path d="M4,8 Q8,6 12,8" stroke="#a04020" stroke-width="0.6" fill="none"/><path d="M4,10 Q8,12 12,10" stroke="#a04020" stroke-width="0.6" fill="none"/><circle cx="5.5" cy="8.5" r="0.6" fill="#c05030"/><circle cx="10.5" cy="9" r="0.5" fill="#c05030"/><polygon points="8,5.5 6.5,4 9.5,4" fill="#ff6020" opacity="0.7"/></svg>`,
  raw_frost_dragon_meat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="5" ry="4" fill="#87CEEB"/><ellipse cx="8" cy="8" rx="4" ry="3" fill="#B0E0E6"/><path d="M5,7 Q8,6 11,7" stroke="#E0FFFF" stroke-width="0.8" fill="none"/><path d="M5,9 Q8,10 11,9" stroke="#E0FFFF" stroke-width="0.8" fill="none"/><circle cx="6" cy="7.5" r="0.6" fill="#FFF"/><circle cx="10" cy="8.5" r="0.6" fill="#FFF"/></svg>`,
  cooked_frost_dragon_meat: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="5" ry="4" fill="#4682B4"/><ellipse cx="8" cy="8" rx="4" ry="3" fill="#5F9EA0"/><path d="M5,7 Q8,6 11,7" stroke="#87CEEB" stroke-width="0.8" fill="none"/><path d="M5,9 Q8,10 11,9" stroke="#87CEEB" stroke-width="0.8" fill="none"/><circle cx="6" cy="7.5" r="0.5" fill="#B0E0E6"/><circle cx="10" cy="8.5" r="0.5" fill="#B0E0E6"/></svg>`,
  
  
  glyphstone: `<svg viewBox="0 0 16 16"><polygon points="8,2 13,5 13,11 8,14 3,11 3,5" fill="#9370DB"/><polygon points="8,4 11,6 11,10 8,12 5,10 5,6" fill="#BA55D3"/><circle cx="8" cy="8" r="2" fill="#E6E6FA"/></svg>`,
  minor_imbued_glyph: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#4B0082"/><circle cx="8" cy="8" r="4" fill="#6A5ACD"/><path d="M8,4 L8,12 M4,8 L12,8" stroke="#E6E6FA" stroke-width="1.5"/></svg>`,
  lesser_imbued_glyph: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#483D8B"/><circle cx="8" cy="8" r="4" fill="#7B68EE"/><path d="M8,4 L10,8 L8,12 L6,8 Z" fill="#E6E6FA"/></svg>`,
  imbued_glyph: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#6A5ACD"/><circle cx="8" cy="8" r="4" fill="#9370DB"/><polygon points="8,4 11,8 8,12 5,8" fill="#E6E6FA"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  greater_imbued_glyph: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#7B68EE"/><circle cx="8" cy="8" r="4" fill="#9370DB"/><polygon points="8,3 12,8 8,13 4,8" fill="#E6E6FA"/><polygon points="8,5 10,8 8,11 6,8" fill="#DDA0DD"/></svg>`,
  major_imbued_glyph: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#8A2BE2"/><circle cx="8" cy="8" r="4" fill="#9370DB"/><polygon points="8,2 13,8 8,14 3,8" fill="#E6E6FA"/><circle cx="8" cy="8" r="2" fill="#FFF"/><circle cx="8" cy="8" r="1" fill="#8A2BE2"/></svg>`,
  superior_imbued_glyph: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#9400D3"/><circle cx="8" cy="8" r="4" fill="#BA55D3"/><polygon points="8,2 13,8 8,14 3,8" fill="#E6E6FA"/><polygon points="8,4 11,8 8,12 5,8" fill="#DDA0DD"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  abyssal_imbued_glyph: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#1A0033"/><circle cx="8" cy="8" r="4" fill="#3D0066"/><polygon points="8,2 9.5,6.5 14,8 9.5,9.5 8,14 6.5,9.5 2,8 6.5,6.5" fill="#00CED1" opacity="0.9"/><polygon points="8,4 9,7 12,8 9,9 8,12 7,9 4,8 7,7" fill="#8B00FF" opacity="0.8"/><circle cx="8" cy="8" r="1.8" fill="#00FFFF" opacity="0.9"/><circle cx="8" cy="8" r="0.8" fill="#FFF"/></svg>`,
  tidal_imbued_glyph: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#000010"/><circle cx="8" cy="8" r="4.5" fill="#0D0028"/><polygon points="8,1.5 9.2,6 13.5,7 9.8,8.5 11,13 8,10 5,13 6.2,8.5 2.5,7 6.8,6" fill="#E040FB"/><polygon points="8,3.5 8.8,6.5 11.5,7.5 9,8.5 9.8,11.5 8,9.5 6.2,11.5 7,8.5 4.5,7.5 7.2,6.5" fill="#BF00FF"/><circle cx="8" cy="8" r="2" fill="#F8F"/><circle cx="8" cy="8" r="1" fill="#FFF"/></svg>`,
  aeon_imbued_glyph: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#02100e"/><circle cx="8" cy="8" r="4.5" fill="#062e2a"/><polygon points="8,1.5 9.2,6 13.5,7 9.8,8.5 11,13 8,10 5,13 6.2,8.5 2.5,7 6.8,6" fill="#2dd4bf"/><polygon points="8,3.5 8.8,6.5 11.5,7.5 9,8.5 9.8,11.5 8,9.5 6.2,11.5 7,8.5 4.5,7.5 7.2,6.5" fill="#14b8a6"/><circle cx="8" cy="8" r="2" fill="#fbbf24"/><circle cx="8" cy="8" r="1" fill="#FFF"/></svg>`,
  
  
  spark: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="3" fill="#FFD700"/><path d="M8,4 L9,7 L8,8 L7,7 Z" fill="#FFA500"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  fire_bolt: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" fill="#FF4500"/><circle cx="8" cy="8" r="2.5" fill="#FF6347"/><polygon points="8,2 9,6 8,8 7,6" fill="#FFD700"/><circle cx="8" cy="8" r="1" fill="#FFF"/></svg>`,
  flame_wave: `<svg viewBox="0 0 16 16"><path d="M2,10 Q4,6 6,10 Q8,6 10,10 Q12,6 14,10" stroke="#FF4500" stroke-width="2" fill="none"/><path d="M3,12 Q5,8 7,12 Q9,8 11,12 Q13,8 15,12" stroke="#FFA500" stroke-width="1.5" fill="none"/><circle cx="8" cy="8" r="2" fill="#FFD700"/></svg>`,
  inferno: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#8B0000"/><circle cx="8" cy="8" r="4" fill="#FF4500"/><polygon points="8,2 10,6 8,8 6,6" fill="#FFD700"/><polygon points="5,8 7,10 5,12" fill="#FFA500"/><polygon points="11,8 9,10 11,12" fill="#FFA500"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  meteor: `<svg viewBox="0 0 16 16"><circle cx="10" cy="6" r="4" fill="#DC143C"/><circle cx="10" cy="6" r="2.5" fill="#FF6347"/><path d="M2,14 L8,8" stroke="#FFA500" stroke-width="2"/><path d="M1,13 L7,7" stroke="#FFD700" stroke-width="1"/><circle cx="10" cy="6" r="1" fill="#FFF"/></svg>`,
  pyroclasm: `<svg viewBox="0 0 16 16"><circle cx="8" cy="9" r="5" fill="#8B0000"/><polygon points="8,2 10,7 8,9 6,7" fill="#FF4500"/><polygon points="5,9 7,11 5,13" fill="#DC143C"/><polygon points="11,9 9,11 11,13" fill="#DC143C"/><circle cx="8" cy="9" r="2" fill="#FFD700"/><circle cx="8" cy="9" r="1" fill="#FFF"/></svg>`,
  flame_tempest: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#8B0000"/><path d="M8,2 L10,6 L8,8 L6,6 Z" fill="#FF4500"/><path d="M12,8 L10,10 L12,12" fill="#DC143C"/><path d="M4,8 L6,10 L4,12" fill="#DC143C"/><circle cx="8" cy="8" r="3" fill="#FFD700"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  dragon_fire: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#B22222"/><polygon points="8,1 11,5 8,7 5,5" fill="#FF4500"/><polygon points="4,8 6,10 4,12" fill="#DC143C"/><polygon points="12,8 10,10 12,12" fill="#DC143C"/><polygon points="8,9 10,11 8,13 6,11" fill="#FFA500"/><circle cx="8" cy="8" r="2" fill="#FFD700"/></svg>`,
  
  
  ice_shard: `<svg viewBox="0 0 16 16"><polygon points="8,2 10,8 8,14 6,8" fill="#87CEEB"/><polygon points="2,8 8,10 14,8 8,6" fill="#B0E0E6"/><polygon points="8,4 10,8 8,12 6,8" fill="#E0FFFF"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  frost_nova: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#4682B4"/><polygon points="8,2 10,6 8,8 6,6" fill="#87CEEB"/><polygon points="12,8 10,10 12,12" fill="#87CEEB"/><polygon points="4,8 6,10 4,12" fill="#87CEEB"/><polygon points="8,14 10,10 8,8 6,10" fill="#87CEEB"/><circle cx="8" cy="8" r="2" fill="#E0FFFF"/></svg>`,
  blizzard: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#4682B4"/><polygon points="8,1 9,7 8,8 7,7" fill="#B0E0E6"/><polygon points="13,5 9,8 10,9" fill="#B0E0E6"/><polygon points="13,11 9,8 10,7" fill="#B0E0E6"/><polygon points="8,15 9,9 8,8 7,9" fill="#B0E0E6"/><polygon points="3,11 7,8 6,7" fill="#B0E0E6"/><polygon points="3,5 7,8 6,9" fill="#B0E0E6"/><circle cx="8" cy="8" r="2" fill="#E0FFFF"/></svg>`,
  glacial_spike: `<svg viewBox="0 0 16 16"><polygon points="8,1 11,7 8,14 5,7" fill="#4682B4"/><polygon points="8,3 10,7 8,12 6,7" fill="#87CEEB"/><polygon points="8,5 9,7 8,10 7,7" fill="#B0E0E6"/><circle cx="8" cy="7" r="1.5" fill="#FFF"/></svg>`,
  frozen_orb: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#4682B4"/><circle cx="8" cy="8" r="4" fill="#87CEEB"/><polygon points="8,4 9,7 8,8 7,7" fill="#E0FFFF"/><polygon points="11,8 8,9 8,7" fill="#E0FFFF"/><polygon points="8,12 9,9 8,8 7,9" fill="#E0FFFF"/><polygon points="5,8 8,9 8,7" fill="#E0FFFF"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  absolute_zero: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#191970"/><circle cx="8" cy="8" r="5" fill="#4682B4"/><polygon points="8,1 9,7 8,8 7,7" fill="#87CEEB"/><polygon points="15,8 9,9 8,8 9,7" fill="#87CEEB"/><polygon points="8,15 9,9 8,8 7,9" fill="#87CEEB"/><polygon points="1,8 7,9 8,8 7,7" fill="#87CEEB"/><circle cx="8" cy="8" r="2.5" fill="#E0FFFF"/><circle cx="8" cy="8" r="1" fill="#FFF"/></svg>`,
  glacial_fury: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#191970"/><polygon points="8,1 11,6 8,8 5,6" fill="#4682B4"/><polygon points="14,8 10,10 8,8 10,6" fill="#4682B4"/><polygon points="8,15 11,10 8,8 5,10" fill="#4682B4"/><polygon points="2,8 6,10 8,8 6,6" fill="#4682B4"/><circle cx="8" cy="8" r="3" fill="#87CEEB"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  
  
  lightning_strike: `<svg viewBox="0 0 16 16"><polygon points="8,1 7,7 9,7 6,15 9,9 7,9" fill="#FFD700"/><polygon points="8,2 7.5,7 8.5,7 7,13 8.5,9 7.5,9" fill="#FFF"/></svg>`,
  chain_lightning: `<svg viewBox="0 0 16 16"><polygon points="6,1 5,5 7,5 4,9" fill="#FFD700"/><polygon points="8,6 7,9 9,9 6,13" fill="#FFA500"/><polygon points="10,8 9,11 11,11 8,15" fill="#FF8C00"/><path d="M6,1 L8,6 L10,8" stroke="#FFF" stroke-width="1" fill="none"/></svg>`,
  thunder_storm: `<svg viewBox="0 0 16 16"><ellipse cx="8" cy="4" rx="6" ry="3" fill="#4B0082"/><polygon points="6,6 5,10 7,10 4,14" fill="#FFD700"/><polygon points="10,6 9,10 11,10 8,14" fill="#FFA500"/><circle cx="5" cy="3" r="1" fill="#E6E6FA"/><circle cx="11" cy="3" r="1" fill="#E6E6FA"/></svg>`,
  arc_surge: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#4B0082"/><polygon points="8,2 7,7 9,7 6,12" fill="#FFD700"/><polygon points="10,5 9,8 11,8 8,11" fill="#FFA500"/><polygon points="6,5 5,8 7,8 4,11" fill="#FFA500"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  plasma_bolt: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="5" fill="#8A2BE2"/><circle cx="8" cy="8" r="3" fill="#9370DB"/><polygon points="8,3 7,7 9,7 7,11" fill="#FFD700"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  voltaic_barrage: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#4B0082"/><polygon points="5,3 4,6 6,6 3,9" fill="#FFD700"/><polygon points="8,2 7,6 9,6 6,10" fill="#FFA500"/><polygon points="11,3 10,6 12,6 9,9" fill="#FFD700"/><polygon points="8,9 7,12 9,12 6,15" fill="#FF8C00"/><circle cx="8" cy="8" r="1" fill="#FFF"/></svg>`,
  
  
  void_bolt: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#1a0033"/><circle cx="8" cy="8" r="4" fill="#4B0082"/><polygon points="8,3 9,7 8,8 7,7" fill="#8A2BE2"/><polygon points="12,8 8,9 8,7" fill="#8A2BE2"/><polygon points="8,13 9,9 8,8 7,9" fill="#8A2BE2"/><polygon points="4,8 8,9 8,7" fill="#8A2BE2"/><circle cx="8" cy="8" r="1.5" fill="#9370DB"/></svg>`,
  cataclysm: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#1a0033"/><circle cx="8" cy="8" r="5" fill="#4B0082"/><polygon points="8,1 10,5 8,8 6,5" fill="#8A2BE2"/><polygon points="15,8 11,10 8,8 11,6" fill="#8A2BE2"/><polygon points="8,15 10,11 8,8 6,11" fill="#8A2BE2"/><polygon points="1,8 5,10 8,8 5,6" fill="#8A2BE2"/><circle cx="8" cy="8" r="2" fill="#9370DB"/></svg>`,
  celestial_storm: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#191970"/><circle cx="8" cy="8" r="5" fill="#4169E1"/><polygon points="8,2 9,6 8,8 7,6" fill="#FFD700"/><polygon points="13,6 10,8 11,9" fill="#87CEEB"/><polygon points="13,10 10,8 11,7" fill="#87CEEB"/><polygon points="8,14 9,10 8,8 7,10" fill="#FFD700"/><polygon points="3,10 6,8 5,7" fill="#87CEEB"/><polygon points="3,6 6,8 5,9" fill="#87CEEB"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  armageddon: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#8B0000"/><circle cx="8" cy="8" r="5" fill="#DC143C"/><polygon points="8,1 10,5 8,7 6,5" fill="#FF4500"/><polygon points="14,8 10,10 8,8 10,6" fill="#FF6347"/><polygon points="8,15 10,11 8,9 6,11" fill="#FF4500"/><polygon points="2,8 6,10 8,8 6,6" fill="#FF6347"/><circle cx="8" cy="8" r="2.5" fill="#FFD700"/><circle cx="8" cy="8" r="1" fill="#FFF"/></svg>`,
  oblivion: `<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#000"/><circle cx="8" cy="8" r="5" fill="#1a0033"/><circle cx="8" cy="8" r="3" fill="#4B0082"/><polygon points="8,1 9,7 8,8 7,7" fill="#8A2BE2"/><polygon points="15,8 9,9 8,8 9,7" fill="#8A2BE2"/><polygon points="8,15 9,9 8,8 7,9" fill="#8A2BE2"/><polygon points="1,8 7,9 8,8 7,7" fill="#8A2BE2"/><polygon points="11,5 9,7 11,9" fill="#9370DB"/><polygon points="5,5 7,7 5,9" fill="#9370DB"/><circle cx="8" cy="8" r="1.5" fill="#FFF"/></svg>`,
  ashlyn_cache: `<svg viewBox="0 0 16 16"><path d="M3,2 L13,2 L14,6 L14,13 L2,13 L2,6 Z" fill="#1c1917"/><path d="M3,2 L13,2 L14,6 L2,6 Z" fill="#292524"/><rect x="2" y="6" width="12" height="1" fill="#7f1d1d"/><path d="M8,8 L9.5,10 L8,12 L6.5,10 Z" fill="#dc2626"/><circle cx="4" cy="4" r="0.6" fill="#991b1b"/><circle cx="12" cy="4" r="0.6" fill="#991b1b"/><rect x="2" y="12" width="12" height="1" fill="#7f1d1d"/></svg>`
};
const MONSTER_TINTS = {
  green:  'hue-rotate(95deg) saturate(0.6) brightness(1.1) contrast(1.1) drop-shadow(0 0 5px rgba(168,85,247,0.85))',
  purple: 'sepia(1) hue-rotate(225deg) saturate(2.6) brightness(0.8) contrast(1.1) drop-shadow(0 0 5px rgba(74,222,128,0.8))',
  boss:   'hue-rotate(95deg) saturate(0.6) brightness(1.1) contrast(1.1) drop-shadow(0 0 4px rgba(239,68,68,0.95)) drop-shadow(0 0 10px rgba(168,85,247,0.7))'
};
const CANDY_KINDS = {
  gather:  {label:'Gathering',  what:'Gathering Speed',  color:'#4ade80', rim:'#14532d'},
  process: {label:'Processing', what:'Production Speed', color:'#fbbf24', rim:'#78350f'},
  dmg:     {label:'Combat',     what:'Damage',           color:'#f87171', rim:'#7f1d1d'},
  xp:      {label:'XP',         what:'All XP',           color:'#a78bfa', rim:'#3b0764'}
};
const CANDY_TIERS = {
  Small: {order:1, gather:0.10, process:0.10, dmg:0.05, xp:0.10, mins:30},
  Large: {order:2, gather:0.15, process:0.15, dmg:0.08, xp:0.15, mins:60},
  Grand: {order:3, gather:0.20, process:0.20, dmg:0.12, xp:0.20, mins:120}
};
const CANDY_TIER_AURA = {Small:'rgba(74,222,128,0.9)', Large:'rgba(249,115,22,0.9)', Grand:'rgba(168,85,247,0.95)'};
const WEATHERS = {
  
  
  sunny:{name:'Sunny', icon:'Assets/Weather/sunny.png', color:'#fbbf24', desc:'+8% Melee Damage, +6% Gold', bonus:{melee_dmg:0.08, gold:0.06}},
  galewinds:{name:'Gale Winds', icon:'Assets/Weather/galewinds.png', color:'#34d399', desc:'+8% Melee Damage, +6% Gathering Speed', bonus:{melee_dmg:0.08, gather_speed:0.06}},
  cloudy:{name:'Cloudy', icon:'Assets/Weather/cloudy.png', color:'#94a3b8', desc:'+8% Ranged Damage, +6% Production Speed', bonus:{ranged_dmg:0.08, process_speed:0.06}},
  foggy:{name:'Fog', icon:'Assets/Weather/foggy.png', color:'#9ca3af', desc:'+8% Ranged Damage, +6% Thieving Success', bonus:{ranged_dmg:0.08, thieving:0.06}},
  thunder:{name:'Thunderstorm', icon:'Assets/Weather/thunder.png', color:'#a78bfa', desc:'+8% Magic Damage, +6% Divinity XP', bonus:{magic_dmg:0.08, divinity_xp:0.06}},
  rain:{name:'Rain', icon:'Assets/Weather/rain.png', color:'#60a5fa', desc:'+8% Magic Damage, +6% Gathering Speed', bonus:{magic_dmg:0.08, gather_speed:0.06}},
  snow:{name:'Snow', icon:'Assets/Weather/snow.png', color:'#93c5fd', desc:'+8% All Combat Damage, +6% Production Speed', bonus:{melee_dmg:0.08, ranged_dmg:0.08, magic_dmg:0.08, process_speed:0.06}},
  heatwave:{name:'Heatwave', icon:'Assets/Weather/heatwave.png', color:'#f87171', desc:'+8% All Combat Damage, +5% Double Monster Drops', bonus:{melee_dmg:0.08, ranged_dmg:0.08, magic_dmg:0.08, double_drop:0.05}}
};
const SEASONS = {
  winter:{name:'Winter', icon:'Assets/Weather/winter.png', color:'#60a5fa', tint:'rgba(96,165,250,0.12)', desc:'+5% Production Speed', bonus:{process_speed:0.05}},
  spring:{name:'Spring', icon:'Assets/Weather/spring.png', color:'#4ade80', tint:'rgba(74,222,128,0.12)', desc:'+5% Gathering Speed', bonus:{gather_speed:0.05}},
  summer:{name:'Summer', icon:'Assets/Weather/summer.png', color:'#fbbf24', tint:'rgba(251,191,36,0.12)', desc:'+5% Double Monster Drops', bonus:{double_drop:0.05}},
  fall:{name:'Fall', icon:'Assets/Weather/fall.png', color:'#fb923c', tint:'rgba(249,115,22,0.12)', desc:'+5% All XP', bonus:{xp:0.05}}
};
for(const [_pn, _pd] of Object.entries(POTIONS)){
  const _min = POTION_MINUTES[_pn.split(' ')[0]] || 5;
  _pd.duration = _min * 60000;
  _pd.desc = _pd.desc.replace(/ for \d+ (attacks|actions)$/, ` for ${_min}m`);
}
WORLD_BOSS.gearArmor = ["Ashlyn's Crown", ...WORLD_BOSS.gearMelee, ...WORLD_BOSS.gearRanged, ...WORLD_BOSS.gearMagic];
const CANDY_DEFS = {};
for(const [tier,t] of Object.entries(CANDY_TIERS)) for(const [kind,k] of Object.entries(CANDY_KINDS)) { const name=tier+' '+k.label+' Candy'; CANDY_DEFS[name]={name,tier,kind,value:t[kind],duration:t.mins*60000,icon:'candy_'+kind}; }
const getLevel=xp=>{if(!xp||xp<=0)return 1;let l=1,t=0;while(l<130){const base=Math.floor(l+300*Math.pow(2,l/7));let mult=1;if(l<10)mult=0.3;else if(l<20)mult=0.65;else if(l<30)mult=0.85;else if(l<40)mult=0.93;else mult=1;const n=Math.floor(base*mult);if(t+n>xp)break;t+=n;l++}return l};
const getXPFor=l=>{if(l>130)l=130;let t=0;for(let i=1;i<l;i++){const base=Math.floor(i+300*Math.pow(2,i/7));let mult=1;if(i<10)mult=0.3;else if(i<20)mult=0.65;else if(i<30)mult=0.85;else if(i<40)mult=0.93;else mult=1;t+=Math.floor(base*mult)}return Math.floor(t)};
const hpPerDefLvl = l => l <= 50 ? 5 : 5 + Math.ceil((l - 50) / 8);
function getMaxHpFor(defLvl){ let hp = 100; for(let l = 1; l <= defLvl; l++) hp += hpPerDefLvl(l); return hp; }
function getRarityByTier(tier){
  return RARITIES.find(r => r.tier === tier) || RARITIES[0];
}
function getItemMaterialTier(name) {
  
  if(FORGE_MATERIAL_TIER[name] !== undefined) return FORGE_MATERIAL_TIER[name];
  
  for(const [prefix, tier] of Object.entries(FORGE_MATERIAL_TIER)){
    if(name.startsWith(prefix + ' ') || name.startsWith(prefix + '\t')) return tier;
  }
  return null;
}
function museumRarityFactor(r){ const x = Math.max(0, getRarityByTier(r).mult - 1); return Math.max(0.01, (x*x)/6.2); }
function museumFamilies(name){
  const eq = EQUIPMENT[name];
  if(!eq || !eq.slot) return [];
  if(name.includes('Arrow') || (eq.slot === 'ammo' && !eq.sigil && !eq.rune)) return []; 
  if(MUSEUM_EXCLUDED.has(name)) return [];
  if(getItemMaterialTier(name) === null) return [];           
  
  if(name === 'Frozen Heart Pendant') return ['melee','ranged','magic'];
  const fams = [];
  if(eq.atk || eq.str || eq.meleeMult) fams.push('melee');
  if(eq.rng || eq.rangedMult || eq.quiver) fams.push('ranged');
  if(eq.magic || eq.rune) fams.push('magic');
  
  return fams.length ? fams : ['melee'];
}
function museumWeaponMult(name, style){
  return EQUIPMENT[name]?.slot === 'weapon' ? 3 : 1;
}
function getPngPath(name) {
  const icon = PNG_ICONS[name];
  if (!icon) return null;
  return ASSET_PATHS[icon.path] + icon.file;
}
function icon(name, size=20) {
  const pngPath = getPngPath(name);
  if (pngPath) {
    return `<img src="${pngPath}" loading="lazy" decoding="async" style="width:${size}px;height:${size}px;object-fit:contain;image-rendering:pixelated;vertical-align:middle" alt="${name}" onerror="this.style.display='none'">`;
  }
  const svg = SVG[name] || SVG.skull;
  return `<div style="width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;vertical-align:middle">${svg}</div>`;
}
function itemIcon(itemName, size=20) {
  if (!itemName) return icon('potion', size);

  
  
  if (itemName === "Ashlyn's Chest") return icon('ashlyn_cache', size);
  if (itemName === 'Castle Key') return icon('castle_key', size);
  
  if (itemName === 'Halloween Candy') return icon('halloween_candy', size);
  if (itemName === 'Haunted Portal') return icon('haunted_portal', size);
  if (CANDY_DEFS[itemName]) return candyIcon(itemName, size);
  if (itemName === 'Candy Apple') return icon('candy_apple', size);
  if (itemName === 'Pumpkin Pie') return icon('pumpkin_pie', size);
  if (itemName === 'Ghost Cake') return icon('ghost_cake', size);
  if (itemName === "Ashlyn's Greatsword") return icon('ashlyn_greatsword', size);
  if (itemName === "Ashlyn's Longbow") return icon('ashlyn_longbow', size);
  if (itemName === "Ashlyn's Staff") return icon('ashlyn_staff', size);
  if (itemName === "Ashlyn's Crown") return icon('ashlyn_crown', size);
  if (itemName === "Ashlyn's Cuirass") return icon('ashlyn_cuirass', size);
  if (itemName === "Ashlyn's Greaves") return icon('ashlyn_greaves', size);
  if (itemName === "Ashlyn's Gauntlets") return icon('ashlyn_gauntlets', size);
  if (itemName === "Ashlyn's Boots") return icon('ashlyn_boots', size);
  if (itemName === "Ashlyn's Jerkin") return icon('ashlyn_jerkin', size);
  if (itemName === "Ashlyn's Chaps") return icon('ashlyn_chaps', size);
  if (itemName === "Ashlyn's Bracers") return icon('ashlyn_bracers', size);
  if (itemName === "Ashlyn's Hunting Boots") return icon('ashlyn_hunting_boots', size);
  if (itemName === "Ashlyn's Robe") return icon('ashlyn_robe', size);
  if (itemName === "Ashlyn's Silk Pants") return icon('ashlyn_silk_pants', size);
  if (itemName === "Ashlyn's Silk Gloves") return icon('ashlyn_silk_gloves', size);
  if (itemName === "Ashlyn's Silk Boots") return icon('ashlyn_silk_boots', size);
  if (itemName === "Treant's Chest" || itemName === "Treant's Minor Chest" || itemName === "Treant's Grand Chest") return icon('treants_chest', size);
  if (itemName === "Kraken's Chest" || itemName === "Kraken's Minor Chest" || itemName === "Kraken's Grand Chest") return icon('krakens_chest', size);
  if (itemName === "Golem's Chest" || itemName === "Golem's Minor Chest" || itemName === "Golem's Grand Chest") return icon('golems_chest', size);
  if (itemName === 'Treant Axe') return icon('treant_axe', size);
  if (itemName === 'Greater Treant Axe') return icon('greater_treant_axe', size);
  if (itemName === 'Ancient Treant Axe') return icon('ancient_treant_axe', size);
  if (itemName === 'Kraken Rod') return icon('kraken_rod', size);
  if (itemName === 'Greater Kraken Rod') return icon('greater_kraken_rod', size);
  if (itemName === 'Ancient Kraken Rod') return icon('ancient_kraken_rod', size);
  if (itemName === 'Golem Pick') return icon('golem_pick', size);
  if (itemName === 'Greater Golem Pick') return icon('greater_golem_pick', size);
  if (itemName === 'Ancient Golem Pick') return icon('ancient_golem_pick', size);
  if (itemName === 'Sapling Helm') return icon('sapling_helm', size);
  if (itemName === 'Sapling Chestplate') return icon('sapling_chestplate', size);
  if (itemName === 'Sapling Leggings') return icon('sapling_leggings', size);
  if (itemName === 'Sapling Boots') return icon('sapling_boots', size);
  if (itemName === 'Sapling Gloves') return icon('sapling_gloves', size);
  if (itemName === 'Heartwood Helm') return icon('heartwood_helm', size);
  if (itemName === 'Heartwood Chestplate') return icon('heartwood_chestplate', size);
  if (itemName === 'Heartwood Leggings') return icon('heartwood_leggings', size);
  if (itemName === 'Heartwood Boots') return icon('heartwood_boots', size);
  if (itemName === 'Heartwood Gloves') return icon('heartwood_gloves', size);
  if (itemName === 'Elderwood Helm') return icon('elderwood_helm', size);
  if (itemName === 'Elderwood Chestplate') return icon('elderwood_chestplate', size);
  if (itemName === 'Elderwood Leggings') return icon('elderwood_leggings', size);
  if (itemName === 'Elderwood Boots') return icon('elderwood_boots', size);
  if (itemName === 'Elderwood Gloves') return icon('elderwood_gloves', size);
  if (itemName === 'Reef Helm') return icon('reef_helm', size);
  if (itemName === 'Reef Chestplate') return icon('reef_chestplate', size);
  if (itemName === 'Reef Leggings') return icon('reef_leggings', size);
  if (itemName === 'Reef Boots') return icon('reef_boots', size);
  if (itemName === 'Reef Gloves') return icon('reef_gloves', size);
  if (itemName === 'Deepsea Helm') return icon('deepsea_helm', size);
  if (itemName === 'Deepsea Chestplate') return icon('deepsea_chestplate', size);
  if (itemName === 'Deepsea Leggings') return icon('deepsea_leggings', size);
  if (itemName === 'Deepsea Boots') return icon('deepsea_boots', size);
  if (itemName === 'Deepsea Gloves') return icon('deepsea_gloves', size);
  if (itemName === 'Leviathan Helm') return icon('leviathan_helm', size);
  if (itemName === 'Leviathan Chestplate') return icon('leviathan_chestplate', size);
  if (itemName === 'Leviathan Leggings') return icon('leviathan_leggings', size);
  if (itemName === 'Leviathan Boots') return icon('leviathan_boots', size);
  if (itemName === 'Leviathan Gloves') return icon('leviathan_gloves', size);
  if (itemName === 'Slate Helm') return icon('slate_helm', size);
  if (itemName === 'Slate Chestplate') return icon('slate_chestplate', size);
  if (itemName === 'Slate Leggings') return icon('slate_leggings', size);
  if (itemName === 'Slate Boots') return icon('slate_boots', size);
  if (itemName === 'Slate Gloves') return icon('slate_gloves', size);
  if (itemName === 'Jade Helm') return icon('jade_helm', size);
  if (itemName === 'Jade Chestplate') return icon('jade_chestplate', size);
  if (itemName === 'Jade Leggings') return icon('jade_leggings', size);
  if (itemName === 'Jade Boots') return icon('jade_boots', size);
  if (itemName === 'Jade Gloves') return icon('jade_gloves', size);
  if (itemName === 'Obsidian Helm') return icon('obsidian_helm', size);
  if (itemName === 'Obsidian Chestplate') return icon('obsidian_chestplate', size);
  if (itemName === 'Obsidian Leggings') return icon('obsidian_leggings', size);
  if (itemName === 'Obsidian Boots') return icon('obsidian_boots', size);
  if (itemName === 'Obsidian Gloves') return icon('obsidian_gloves', size);

  
  if (itemName === 'Pet Whistle (1 day)' || itemName === 'Pet Whistle (7 days)' || itemName === 'Pet Whistle') return icon('pet_whistle', size);
  if (itemName === 'Skilling Pet Whistle (1 day)' || itemName === 'Skilling Pet Whistle (7 days)' || itemName === 'Skilling Pet Whistle') return icon('skill_whistle', size);

  
  if (itemName === 'Fireworks') return icon('fireworks', size);
  if (itemName === 'Fries') return icon('fries', size);
  if (itemName === 'Hotdog') return icon('hotdog', size);
  if (itemName === 'Hamburger') return icon('hamburger', size);
  if (itemName === 'Maple Syrup') return icon('maple_syrup', size);
  
  if (itemName === 'Firework Burst') return icon('fireworks', size);
  if (itemName === 'Maple Leaves') return icon('maple_leaf', size);
  if (itemName === 'Gold Firework') return icon('gold_firework', size);
  if (itemName === 'Rainbow Firework') return icon('rainbow_firework', size);
  if (itemName === 'Gold Leaves') return icon('gold_leaves', size);
  if (itemName === 'Rainbow Leaves') return icon('rainbow_leaves', size);
  if (itemName === 'Nanaimo Bar') return icon('nanaimo_bar', size);
  if (itemName === 'Poutine') return icon('poutine', size);

  
  const key = itemName.toLowerCase().replace(/ /g,'_').replace(/'/g,'');
  if (PNG_ICONS[key]) return icon(key, size);
  
  
  if (itemName.includes('Production Potion')) return icon(key, size);

  
  const lowerName = itemName.toLowerCase();
  
  if (itemName === 'Aeon Axe') return icon('tidal_axe', size);
  if (itemName === 'Aeon Pick') return icon('tidal_pick', size);
  if (itemName === 'Aeon Rod') return icon('tidal_rod', size);
  if (lowerName.includes('axe')) return icon('axe', size);
  if (lowerName.includes('pick')) return icon('pick', size);
  if (lowerName.includes('rod')) return icon('fish', size);
  

  if (itemName.includes('Arrow Shafts')) return icon('arrow_shafts', size);
  if (itemName.includes('Demon Ash')) return icon('demon_ash', size);
  if (itemName.includes('Ancient Seed')) return icon('ancient_seed', size);
  if (itemName.includes('Empty Vial')) return icon('empty_vial', size);
  
  
  if (itemName.includes('Heart Slime Jelly')) return icon('heart_slime_jelly', size);
  if (itemName.includes('Chocolate Bar')) return icon('chocolate_bar', size);
  if (itemName.includes('Chocolate Chunks')) return icon('chocolate_chunks', size);
  
  
  if (itemName === 'Raw Minnow') return icon('raw_minnow', size);
  if (itemName === 'Raw Perch') return icon('raw_perch', size);
  if (itemName === 'Raw Salmon') return icon('raw_salmon', size);
  if (itemName === 'Raw Carp') return icon('raw_carp', size);
  if (itemName === 'Raw Pike') return icon('raw_pike', size);
  if (itemName === 'Raw Eel') return icon('raw_eel', size);
  if (itemName === 'Raw Barracuda') return icon('raw_barracuda', size);
  if (itemName === 'Raw Sea Snake') return icon('raw_leviathan', size);
  if (itemName === 'Raw Anglerfish') return icon('raw_anglerfish', size);
  if (itemName === 'Raw Octopus') return icon('raw_kraken', size);
  
  
  if (itemName === 'Cooked Minnow') return icon('cooked_minnow', size);
  if (itemName === 'Cooked Perch') return icon('cooked_perch', size);
  if (itemName === 'Raw Salmon') return icon('cooked_salmon', size);
  if (itemName === 'Cooked Carp') return icon('cooked_carp', size);
  if (itemName === 'Cooked Pike') return icon('cooked_pike', size);
  if (itemName === 'Cooked Eel') return icon('cooked_eel', size);
  if (itemName === 'Cooked Barracuda') return icon('cooked_barracuda', size);
  if (itemName === 'Cooked Sea Snake') return icon('cooked_leviathan', size);
  if (itemName === 'Cooked Anglerfish') return icon('cooked_anglerfish', size);
  if (itemName === 'Cooked Octopus') return icon('cooked_kraken', size);
  if (itemName === 'Raw Deepfin Meat') return icon('raw_deepfin', size);
  if (itemName === 'Cooked Deepfin') return icon('cooked_deepfin', size);
  if (itemName === 'Raw Razorjaw Meat') return icon('raw_razorjaw', size);
  if (itemName === 'Cooked Razorjaw') return icon('cooked_razorjaw', size);
  if (itemName === 'Raw Abyssal Angler') return icon('raw_abyssal_angler', size);
  if (itemName === 'Cooked Abyssal Angler') return icon('cooked_abyssal_angler', size);

  
  const materials = ['frost', 'mythril', 'titanium', 'rose','chocolate','cobalt', 'steel', 'iron', 'copper'];
  const equipTypes = ['helmet', 'platebody', 'platelegs', 'shield', 'boots', 'gloves', 'sword', 'blade', 'greataxe'];
  
  for (const mat of materials) {
    if (lowerName.includes(mat)) {
      for (const equip of equipTypes) {
        if (lowerName.includes(equip.replace('plate', 'plate')) || 
            (equip === 'helmet' && lowerName.includes('helm')) ||
            (equip === 'platebody' && lowerName.includes('plate') && !lowerName.includes('legs')) ||
            (equip === 'platelegs' && lowerName.includes('legs')) ||
            (equip === 'sword' && lowerName.includes('sword'))) {
          const eqKey = `${equip}_${mat}`;
          if (PNG_ICONS[eqKey]) return icon(eqKey, size);
        }
      }
    }
  }
  
  
  if (lowerName.includes('leather boot')) return icon('leather_boots', size);
  if (lowerName.includes('leather glove')) return icon('na_gloves', size);
  
  if (SVG[key]) return icon(key, size);

  
  if (itemName.includes('Drowned Cataclysm')) return icon('abyssal_annihilation', size);
  if (itemName.includes('Wraith Torrent')) return icon('abyssal_wave', size);
  if (itemName.includes('Tome of the Ancients')) return icon('tome_of_abyssal_knowledge', size);
  if (itemName.includes('Tidegrave')) return icon('abyssal_greatsword', size);
  if (itemName.includes('Wraithpiercer')) return icon('tidalscale_crossbow', size);
  if (itemName.includes('Relicbrand Staff')) return icon('abyssweave_staff', size);
  if (itemName.includes('Relic Crown')) return icon('abyssal_crown', size);
  if (itemName.includes('Aeonsteel Sword')) return icon('aeonsteel_sword', size);
  if (itemName.includes('Aeonsteel Blade')) return icon('abyssal_blade', size);
  if (itemName.includes('Aeonsteel Greatsword')) return icon('abyssal_greatsword', size);
  if (itemName.includes('Aeonsteel Helm')) return icon('abyssal_helm', size);
  if (itemName.includes('Aeonsteel Plate')) return icon('abyssal_plate', size);
  if (itemName.includes('Aeonsteel Legs')) return icon('abyssal_legs', size);
  if (itemName.includes('Aeonsteel Shield')) return icon('abyssal_shield', size);
  if (itemName.includes('Aeonsteel Boots')) return icon('abyssal_boots', size);
  if (itemName.includes('Aeonsteel Gloves')) return icon('abyssal_gloves', size);
  if (itemName.includes('Aeonsteel Ring')) return icon('abyssal_ring', size);
  if (itemName.includes('Aeonsteel Amulet')) return icon('abyssal_amulet', size);
  if (itemName.includes('Aeonsteel Cape')) return icon('abyssal_cape', size);
  if (itemName.includes('Aeonscale Bow')) return icon('tidalscale_crossbow', size);
  if (itemName.includes('Aeon Arrows')) return icon('abyssal_arrows', size);
  if (itemName.includes('Aeonscale Hat')) return icon('tidalscale_hat', size);
  if (itemName.includes('Aeonscale Tunic')) return icon('tidalscale_tunic', size);
  if (itemName.includes('Aeonscale Pants')) return icon('tidalscale_pants', size);
  if (itemName.includes('Aeonscale Boots')) return icon('tidalscale_boots', size);
  if (itemName.includes('Aeonscale Gloves')) return icon('tidalscale_gloves', size);
  if (itemName.includes('Aeonscale Ring')) return icon('tidalscale_ring', size);
  if (itemName.includes('Aeonscale Amulet')) return icon('tidalscale_amulet', size);
  if (itemName.includes('Aeonscale Cape')) return icon('tidalscale_cape', size);
  if (itemName.includes('Aeonweave Staff')) return icon('abyssweave_staff', size);
  if (itemName.includes('Aeonweave Wand')) return icon('abyssweave_wand', size);
  if (itemName.includes('Aeonweave Tome')) return icon('abyssweave_tome', size);
  if (itemName.includes('Aeonweave Hood')) return icon('abyssweave_hood', size);
  if (itemName.includes('Aeonweave Robe')) return icon('abyssweave_robe', size);
  if (itemName.includes('Aeonweave Pants')) return icon('abyssweave_pants', size);
  if (itemName.includes('Aeonweave Boots')) return icon('abyssweave_boots', size);
  if (itemName.includes('Aeonweave Gloves')) return icon('abyssweave_gloves', size);
  if (itemName.includes('Aeonweave Ring')) return icon('abyssweave_ring', size);
  if (itemName.includes('Aeonweave Amulet')) return icon('abyssweave_amulet', size);
  if (itemName.includes('Aeonweave Cape')) return icon('abyssweave_cape', size);
  
  if (itemName.includes('Aeonwood')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16"><ellipse cx="4.2" cy="8" rx="2.55" ry="4.45" fill="#2DD4BF"/><rect x="4.2" y="3.55" width="7.6" height="8.9" fill="#2DD4BF"/><ellipse cx="11.8" cy="8" rx="2.55" ry="4.45" fill="#2DD4BF"/><ellipse cx="4.2" cy="8" rx="2.1" ry="4" fill="#0B4540"/><rect x="4.2" y="4" width="7.6" height="8" fill="#115E59"/><ellipse cx="11.8" cy="8" rx="2.1" ry="4" fill="#5EEAD4"/><ellipse cx="11.8" cy="8" rx="1.42" ry="2.7" fill="#0F766E"/><ellipse cx="11.8" cy="8" rx="0.82" ry="1.56" fill="#5EEAD4"/><ellipse cx="11.8" cy="8" rx="0.3" ry="0.56" fill="#0F766E"/><circle cx="7.2" cy="6.4" r="0.75" fill="#FBBF24"/></svg>`;
  if (itemName.includes('Aeonite Ore')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16"><path d="M3.2,11.2 L5.2,5.4 L8,3.4 L10.8,5.4 L12.8,11.2 L8,13.2 Z" fill="#0B3F3B" stroke="#2DD4BF" stroke-width="0.9" stroke-linejoin="round"/><path d="M5.4,9.6 L6.4,6.4 L8,5.4 L9.6,6.4 L10.6,9.6 L8,10.6 Z" fill="#115E59"/><circle cx="7.1" cy="7.9" r="1.25" fill="#5EEAD4"/><circle cx="9.2" cy="9.3" r="0.8" fill="#5EEAD4"/></svg>`;
  if (itemName.includes('Aeonite Bar')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16"><polygon points="3.4,7.6 10.2,7.6 12.4,5.7 5.6,5.7" fill="#5EEAD4" stroke="#2DD4BF" stroke-width="0.7" stroke-linejoin="round"/><polygon points="10.2,7.6 11.2,11.3 13.4,9.4 12.4,5.7" fill="#0B413E" stroke="#2DD4BF" stroke-width="0.7" stroke-linejoin="round"/><polygon points="2.4,11.3 11.2,11.3 10.2,7.6 3.4,7.6" fill="#115E59" stroke="#2DD4BF" stroke-width="0.7" stroke-linejoin="round"/></svg>`;
  if (itemName.includes('Aeon Scale')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><ellipse cx="16" cy="18" rx="11" ry="8" fill="#062e2a" stroke="#14b8a6" stroke-width="1.5"/><ellipse cx="16" cy="16" rx="9" ry="6" fill="#0d4f47" stroke="#2dd4bf" stroke-width="0.5"/><path d="M8,16 Q12,10 16,14 Q20,10 24,16" fill="none" stroke="#5eead4" stroke-width="1" opacity="0.8"/><path d="M9,19 Q13,13 16,17 Q19,13 23,19" fill="none" stroke="#5eead4" stroke-width="1" opacity="0.6"/><ellipse cx="16" cy="14" rx="5" ry="3" fill="#0f766e" opacity="0.7"/><path d="M13,11 Q16,7 19,11" fill="#115e59" stroke="#2dd4bf" stroke-width="1"/><circle cx="16" cy="17" r="1" fill="#fbbf24" opacity="0.7"/></svg>`;
  if (itemName.includes('Aeon Crystal')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><polygon points="16,3 21,9 21,19 16,25 11,19 11,9" fill="#06342C" stroke="#14B8A6" stroke-width="1.5" stroke-linejoin="round"/><polygon points="16,7 19,11 19,18 16,22 13,18 13,11" fill="#0D4F42" stroke="#2DD4BF" stroke-width="0.5" stroke-linejoin="round"/><line x1="16" y1="3" x2="16" y2="25" stroke="#5EEAD4" stroke-width="0.8" opacity="0.7"/><line x1="11" y1="14" x2="21" y2="14" stroke="#5EEAD4" stroke-width="0.5" opacity="0.5"/><polygon points="16,3 21,9 16,7 11,9" fill="#2DD4BF" opacity="0.35"/><circle cx="16" cy="14" r="1.5" fill="#FBBF24"/></svg>`;
  if (itemName.includes('Relic Shard')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><polygon points="16,2 22,10 20,18 16,22 12,18 10,10" fill="#123F33" stroke="#2DD4BF" stroke-width="1.5" stroke-linejoin="round"/><polygon points="16,6 20,12 18,17 16,20 14,17 12,12" fill="#0B2B24" stroke="#14B8A6" stroke-width="0.5" stroke-linejoin="round"/><line x1="10" y1="10" x2="22" y2="10" stroke="#5EEAD4" stroke-width="0.5" opacity="0.6"/><polygon points="16,22 13,28 16,26 19,28" fill="#123F33" stroke="#2DD4BF" stroke-width="1" stroke-linejoin="round"/><path d="M16,8 L16,17 M12.8,11 L16,14.2 M19.2,11 L16,14.2" stroke="#FBBF24" stroke-width="1" fill="none" stroke-linecap="round"/></svg>`;
  if (itemName.includes('Wraith Bone')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><ellipse cx="16" cy="16" rx="13" ry="9" fill="none" stroke="#5eead4" stroke-width="0.8" opacity="0.35"/><line x1="10" y1="23" x2="22" y2="11" stroke="#ccfbf1" stroke-width="3.5"/><circle cx="8.5" cy="21.5" r="2.4" fill="#f0fdfa" stroke="#99f6e4" stroke-width="0.6"/><circle cx="11.5" cy="24.5" r="2.4" fill="#f0fdfa" stroke="#99f6e4" stroke-width="0.6"/><circle cx="20.5" cy="9.5" r="2.4" fill="#f0fdfa" stroke="#99f6e4" stroke-width="0.6"/><circle cx="23.5" cy="12.5" r="2.4" fill="#f0fdfa" stroke="#99f6e4" stroke-width="0.6"/><path d="M6,10 Q9,8 8,5" fill="none" stroke="#5eead4" stroke-width="0.8" opacity="0.5"/><path d="M25,22 Q23,25 26,27" fill="none" stroke="#5eead4" stroke-width="0.8" opacity="0.5"/></svg>`;
  if (itemName.includes('Ruin Bone')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><line x1="10" y1="23" x2="22" y2="11" stroke="#e7e5e4" stroke-width="3.5"/><circle cx="8.5" cy="21.5" r="2.4" fill="#e7e5e4" stroke="#a8a29e" stroke-width="0.6"/><circle cx="11.5" cy="24.5" r="2.4" fill="#e7e5e4" stroke="#a8a29e" stroke-width="0.6"/><circle cx="20.5" cy="9.5" r="2.4" fill="#e7e5e4" stroke="#a8a29e" stroke-width="0.6"/><circle cx="23.5" cy="12.5" r="2.4" fill="#e7e5e4" stroke="#a8a29e" stroke-width="0.6"/><circle cx="14" cy="19" r="1.4" fill="#14b8a6" opacity="0.8"/><circle cx="18" cy="14.5" r="1" fill="#2dd4bf" opacity="0.7"/><circle cx="16.5" cy="17" r="0.7" fill="#5eead4" opacity="0.6"/></svg>`;
  if (itemName === 'Raw Relicfin') return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><path d="M25,16 L30,11 Q29,14 29.5,16 Q29,18 30,21 L25,16 Z" fill="#115e59" stroke="#2dd4bf" stroke-width="0.8"/><path d="M11,10 Q13.5,5.5 18.5,7 L15.5,10 Z" fill="#134e4a" stroke="#2dd4bf" stroke-width="0.7"/><path d="M4,16 Q9,9.5 15,9.5 Q21,9.5 25.5,16 Q21,22.5 15,22.5 Q9,22.5 4,16 Z" fill="#0f766e" stroke="#2dd4bf" stroke-width="1"/><path d="M12,21.5 Q13,25 16.5,24 L14.5,21.8 Z" fill="#134e4a" stroke="#2dd4bf" stroke-width="0.6"/><path d="M11.5,13.5 Q13.5,16 11.5,18.5" stroke="#134e4a" stroke-width="0.9" fill="none"/><path d="M6.5,16 Q15,18 24,15.5" stroke="#fbbf24" stroke-width="0.7" fill="none" opacity="0.85"/><path d="M14,12 Q17,10.8 20,12" stroke="#5eead4" stroke-width="0.5" opacity="0.6" fill="none"/><circle cx="8.3" cy="14.3" r="1.4" fill="#022c26"/><circle cx="8.7" cy="13.9" r="0.5" fill="#5eead4"/><circle cx="26.5" cy="7.5" r="0.7" fill="#5eead4" opacity="0.6"/><circle cx="28.5" cy="5.5" r="0.5" fill="#5eead4" opacity="0.5"/></svg>`;
  if (itemName === 'Cooked Relicfin') return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><path d="M24,18 L29,13.5 Q28,16 28.5,18 Q28,20 29,22.5 L24,18 Z" fill="#78350f" stroke="#d97706" stroke-width="0.8"/><path d="M4,18 Q9,12 15,12 Q20.5,12 24.5,18 Q20.5,24 15,24 Q9,24 4,18 Z" fill="#92400e" stroke="#d97706" stroke-width="1"/><path d="M10,14.5 Q11,18 10,21.5 M14,13.5 Q15,18 14,22.5 M18,14 Q19,18 18,22" stroke="#78350f" stroke-width="0.9" fill="none" opacity="0.9"/><path d="M6.5,18 Q14,20 23,17.5" stroke="#fbbf24" stroke-width="0.6" fill="none" opacity="0.8"/><circle cx="8.3" cy="16.3" r="1" fill="#451a03"/><path d="M11,10 Q12,7.5 11,5" stroke="#e7e5e4" stroke-width="0.8" opacity="0.6" fill="none"/><path d="M16,10.5 Q17,8 16,5.5" stroke="#e7e5e4" stroke-width="0.8" opacity="0.6" fill="none"/><path d="M21,10 Q22,7.5 21,5" stroke="#e7e5e4" stroke-width="0.8" opacity="0.6" fill="none"/></svg>`;
  if (itemName === 'Raw Gravemaw') return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><path d="M25,16.5 L30,12.5 Q29,15 29.5,16.5 Q29,18 30,20.5 L25,16.5 Z" fill="#0b2b24" stroke="#2dd4bf" stroke-width="0.8"/><path d="M10,10.5 L11.5,6.5 L13,9.8 L15,6 L16.5,9.3 L18.5,6.8 L19.5,9.8 Z" fill="#0b2b24" stroke="#2dd4bf" stroke-width="0.6"/><path d="M4.5,17 Q7,10 15,9.5 Q22,9 26,16.5 Q22,23.5 14,23.5 Q7,23 4.5,17 Z" fill="#134e4a" stroke="#2dd4bf" stroke-width="1"/><path d="M4.5,17 L9.5,14.6 L9.5,19.8 Z" fill="#021512"/><polygon points="6.2,16.2 7,15.4 7.2,16.6" fill="#e7e5e4"/><polygon points="6.6,18.2 7.4,18.9 7.6,17.7" fill="#e7e5e4"/><path d="M13.5,13.5 Q15.5,16.5 13.5,20" stroke="#0b2b24" stroke-width="0.9" fill="none"/><path d="M13,23.2 Q14,26 17,25 L15,23.2 Z" fill="#0b2b24" stroke="#2dd4bf" stroke-width="0.6"/><circle cx="11.5" cy="12.5" r="1.6" fill="#022c26"/><circle cx="11.5" cy="12.5" r="0.7" fill="#fbbf24"/><circle cx="18" cy="13" r="0.5" fill="#fbbf24" opacity="0.8"/><circle cx="21" cy="16" r="0.6" fill="#fde68a" opacity="0.7"/><circle cx="17.5" cy="19.5" r="0.4" fill="#fbbf24" opacity="0.6"/></svg>`;
  if (itemName === 'Cooked Gravemaw') return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><path d="M24,18 L29,14.5 Q28,16.5 28.5,18 Q28,19.5 29,21.5 L24,18 Z" fill="#7c2d12" stroke="#ea580c" stroke-width="0.8"/><path d="M10,12.5 L11.5,9 L13,11.8 L15,8.5 L16.5,11.3 L18.5,9.3 L19.5,11.8 Z" fill="#7c2d12" stroke="#ea580c" stroke-width="0.6"/><path d="M4.5,18.5 Q7,12 15,11.5 Q21.5,11 25,18 Q21.5,24.5 14,24.5 Q7,24 4.5,18.5 Z" fill="#92400e" stroke="#ea580c" stroke-width="1"/><path d="M4.5,18.5 L9,16.5 L9,21 Z" fill="#451a03"/><path d="M12,13.5 Q13,18 12,23 M16,13 Q17,18 16,23.5 M20,14 Q21,18 20,22.5" stroke="#78350f" stroke-width="0.9" fill="none" opacity="0.9"/><circle cx="11.5" cy="14.5" r="1.1" fill="#451a03"/><path d="M7,18.5 Q14,20.5 22,18" stroke="#fbbf24" stroke-width="0.6" fill="none" opacity="0.8"/><path d="M12,9 Q13,6.5 12,4 M17,8 Q18,5.5 17,3.5 M22,9.5 Q23,7 22,5" stroke="#e7e5e4" stroke-width="0.8" opacity="0.6" fill="none"/></svg>`;

  
  if (itemName.includes('Tail')) return icon('rat_tail', size);
  if (itemName.includes('Cloth')) return icon('cloth', size);
  if (itemName.includes('Pelt')) return icon('wolf_pelt', size);
  if (itemName.includes('Sword')) return icon('sword_copper', size);
  if (itemName.includes('Helm')) return icon('helmet_copper', size);
  if (itemName.includes('Plate') && !itemName.includes('Legs')) return icon('platebody_copper', size);
  if (itemName.includes('Legs')) return icon('platelegs_copper', size);
  if (itemName.includes('Shield')) return icon('shield_copper', size);
  if (itemName.includes('Deep Shard')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><polygon points="16,2 22,10 20,18 16,22 12,18 10,10" fill="#1a4a6b" stroke="#0ea5e9" stroke-width="1.5"/><polygon points="16,6 20,12 18,17 16,20 14,17 12,12" fill="#0c2a4a" stroke="#38bdf8" stroke-width="0.5"/><line x1="16" y1="2" x2="16" y2="22" stroke="#7dd3fc" stroke-width="0.5" opacity="0.6"/><line x1="10" y1="10" x2="22" y2="10" stroke="#7dd3fc" stroke-width="0.5" opacity="0.6"/><polygon points="16,22 13,28 16,26 19,28" fill="#1a4a6b" stroke="#0ea5e9" stroke-width="1"/></svg>`;
  if (itemName.includes('Deep Crystal')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><polygon points="16,3 21,9 21,19 16,25 11,19 11,9" fill="#0a1a2e" stroke="#06b6d4" stroke-width="1.5"/><polygon points="16,7 19,11 19,18 16,22 13,18 13,11" fill="#0e3a4a" stroke="#22d3ee" stroke-width="0.5"/><line x1="16" y1="3" x2="16" y2="25" stroke="#a5f3fc" stroke-width="0.8" opacity="0.7"/><line x1="11" y1="14" x2="21" y2="14" stroke="#a5f3fc" stroke-width="0.5" opacity="0.5"/><polygon points="16,3 21,9 16,7 11,9" fill="#155e75" opacity="0.8"/><circle cx="16" cy="14" r="2" fill="#67e8f9" opacity="0.6"/></svg>`;
  if (itemName.includes('Abyssal Scale')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><ellipse cx="16" cy="18" rx="11" ry="8" fill="#1a0533" stroke="#7c3aed" stroke-width="1.5"/><ellipse cx="16" cy="16" rx="9" ry="6" fill="#2d1054" stroke="#a855f7" stroke-width="0.5"/><path d="M8,16 Q12,10 16,14 Q20,10 24,16" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.8"/><path d="M9,19 Q13,13 16,17 Q19,13 23,19" fill="none" stroke="#c084fc" stroke-width="1" opacity="0.6"/><ellipse cx="16" cy="14" rx="5" ry="3" fill="#4c1d95" opacity="0.7"/><path d="M13,11 Q16,7 19,11" fill="#6d28d9" stroke="#a855f7" stroke-width="1"/></svg>`;
  if (itemName.includes('Tidalscale Crossbow')) return icon('tidalscale_crossbow', size);
  if (itemName.includes('Bow')) return icon('bow', size);
  if (itemName.includes('Abyssal Greatsword')) return icon('abyssal_greatsword', size);
  if (itemName.includes('Abyssal Blade')) return icon('abyssal_blade', size);
  if (itemName.includes('Abyssal Sword')) return icon('abyssal_sword', size);
  if (itemName.includes('Arrow')) return icon('arrow', size);
  if (itemName.endsWith('Bar')) return icon('bar', size);
  if (itemName.includes('Nugget')) return icon('gold_nugget', size);
  if (itemName.includes('Ore')) return icon('ore', size);
  if (itemName.includes('Log')) return icon('log', size);
  if (itemName.includes('Axe')) return icon('axe', size);
  if (itemName.includes('Pick')) return icon('pick', size);
  if (itemName.includes('Rod')) return icon('fish', size);
  if (itemName.includes('Feather')) return icon('feathers', size);
  if (itemName === 'Frost Dragon Bones') return icon('frost_dragon_bones', size);
  if (itemName === 'Dragon Bones') return icon('dragon_bones', size);
  if (itemName === 'Hellfire Bone') return icon('hellfire_bone', size);
  if (itemName === 'Ancient Bone') return icon('ancient_bone', size);
  if (itemName === 'Giant Bone') return icon('giant_bone', size);
  if (itemName === 'Small Dragon Bones') return icon('small_dragon_bones', size);
  if (itemName === 'Young Dragon Bones') return icon('young_dragon_bones', size);
  if (itemName === 'Mossy Bones') return icon('mossy_bones', size);
  if (itemName === 'Big Bones') return icon('big_bones', size);
  if (itemName.includes('Bone')) return icon('bones', size);
  if (itemName.includes('Green Dragonhide')) return icon('green_dragonhide', size);
  if (itemName.includes('Blue Dragonhide')) return icon('blue_dragonhide', size);
  if (itemName.includes('Red Dragonhide')) return icon('red_dragonhide', size);
  if (itemName.includes('Black Dragonhide')) return icon('black_dragonhide', size);
  if (itemName.includes('Hide')) return icon('hide', size);
  
  if (itemName.includes('Copper Gloves')) return icon('copper_gloves', size);
  if (itemName.includes('Iron Gloves')) return icon('iron_gloves', size);
  if (itemName.includes('Steel Gloves')) return icon('steel_gloves', size);
  if (itemName.includes('Cobalt Gloves')) return icon('cobalt_gloves', size);
  if (itemName.includes('Titanium Gloves')) return icon('titanium_gloves', size);
  if (itemName.includes('Mythril Gloves')) return icon('mythril_gloves', size);
  if (itemName.includes('Gloves')) return icon('copper_gloves', size);
  
  if (itemName.includes('Copper Ring')) return icon('copper_ring', size);
  if (itemName.includes('Iron Ring')) return icon('iron_ring', size);
  if (itemName.includes('Gold Ring')) return icon('gold_ring', size);
  if (itemName.includes('Ruby')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16"><polygon points="8,2 12,5 12,10 8,14 4,10 4,5" fill="#be123c" stroke="#fb7185" stroke-width="0.8"/><polygon points="8,2 12,5 8,6 4,5" fill="#e11d48" opacity="0.9"/><polygon points="8,6 12,5 12,10 8,14" fill="#9f1239"/><polygon points="8,6 4,5 4,10 8,14" fill="#881337"/><line x1="8" y1="2" x2="8" y2="6" stroke="#fda4af" stroke-width="0.5" opacity="0.7"/><line x1="4" y1="5" x2="12" y2="5" stroke="#fda4af" stroke-width="0.5" opacity="0.5"/></svg>`;
  if (itemName.includes('Sapphire')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16"><polygon points="8,2 12,5 12,10 8,14 4,10 4,5" fill="#1d4ed8" stroke="#60a5fa" stroke-width="0.8"/><polygon points="8,2 12,5 8,6 4,5" fill="#2563eb" opacity="0.9"/><polygon points="8,6 12,5 12,10 8,14" fill="#1e40af"/><polygon points="8,6 4,5 4,10 8,14" fill="#1e3a8a"/><line x1="8" y1="2" x2="8" y2="6" stroke="#bfdbfe" stroke-width="0.5" opacity="0.7"/><line x1="4" y1="5" x2="12" y2="5" stroke="#bfdbfe" stroke-width="0.5" opacity="0.5"/></svg>`;
  if (itemName.includes('Emerald')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16"><polygon points="8,2 12,5 12,10 8,14 4,10 4,5" fill="#15803d" stroke="#4ade80" stroke-width="0.8"/><polygon points="8,2 12,5 8,6 4,5" fill="#16a34a" opacity="0.9"/><polygon points="8,6 12,5 12,10 8,14" fill="#166534"/><polygon points="8,6 4,5 4,10 8,14" fill="#14532d"/><line x1="8" y1="2" x2="8" y2="6" stroke="#bbf7d0" stroke-width="0.5" opacity="0.7"/><line x1="4" y1="5" x2="12" y2="5" stroke="#bbf7d0" stroke-width="0.5" opacity="0.5"/></svg>`;
  
  if (itemName === 'Topaz Amulet') return icon('topaz_amulet', size);
  if (itemName === 'Amethyst Amulet') return icon('amethyst_amulet', size);
  if (itemName === 'Pearl Ring') return icon('pearl_ring', size);
  if (itemName === 'Pearl') return icon('pearl', size);
  if (itemName === 'Gem Bag') return icon('gem_bag', size);
  if (itemName === 'Underwater Chest') return icon('underwater_chest', size);
  if (itemName === 'Bird Nest' || itemName === 'Empty Bird Nest') return icon('bird_nest', size);
  if (itemName === 'Rubber Ducky') return icon('rubber_ducky', size);
  if (itemName === 'Old Boot') return icon('old_boot', size);
  
  if (itemName === 'Topaz') return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16"><polygon points="8,2 12,5 12,10 8,14 4,10 4,5" fill="#ffedd5" stroke="#fed7aa" stroke-width="0.8"/><polygon points="8,2 12,5 8,6 4,5" fill="#fff7ed" opacity="0.9"/><polygon points="8,6 12,5 12,10 8,14" fill="#fdba74"/><polygon points="8,6 4,5 4,10 8,14" fill="#f97316"/><line x1="8" y1="2" x2="8" y2="6" stroke="#fff" stroke-width="0.5" opacity="0.8"/><line x1="4" y1="5" x2="12" y2="5" stroke="#fff" stroke-width="0.5" opacity="0.6"/></svg>`;
  if (itemName === 'Amethyst') return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16"><polygon points="8,2 12,5 12,10 8,14 4,10 4,5" fill="#f3e8ff" stroke="#e9d5ff" stroke-width="0.8"/><polygon points="8,2 12,5 8,6 4,5" fill="#faf5ff" opacity="0.9"/><polygon points="8,6 12,5 12,10 8,14" fill="#d8b4fe"/><polygon points="8,6 4,5 4,10 8,14" fill="#a855f7"/><line x1="8" y1="2" x2="8" y2="6" stroke="#fff" stroke-width="0.5" opacity="0.8"/><line x1="4" y1="5" x2="12" y2="5" stroke="#fff" stroke-width="0.5" opacity="0.6"/></svg>`;
  if (itemName.includes('Diamond')) return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 16 16"><polygon points="8,2 12,5 12,10 8,14 4,10 4,5" fill="#e0f2fe" stroke="#f8fafc" stroke-width="0.8"/><polygon points="8,2 12,5 8,6 4,5" fill="#f0f9ff" opacity="0.9"/><polygon points="8,6 12,5 12,10 8,14" fill="#bae6fd"/><polygon points="8,6 4,5 4,10 8,14" fill="#7dd3fc"/><line x1="8" y1="2" x2="8" y2="6" stroke="#fff" stroke-width="0.5" opacity="0.8"/><line x1="4" y1="5" x2="12" y2="5" stroke="#fff" stroke-width="0.5" opacity="0.6"/></svg>`;
  if (itemName.includes('Ruby Ring')) return icon('ruby_ring', size);
  if (itemName.includes('Sapphire Ring')) return icon('sapphire_ring', size);
  if (itemName.includes('Emerald Ring')) return icon('emerald_ring', size);
  if (itemName.includes('Diamond Ring')) return icon('diamond_ring', size);
  if (itemName.includes('Void Ring')) return icon('void_ring', size);
  if (itemName.includes('Infernal Ring')) return icon('infernal_ring', size);
  if (itemName.includes('Ring')) return icon('copper_ring', size);
  
  if (itemName.includes('Copper Amulet')) return icon('copper_amulet', size);
  if (itemName.includes('Iron Amulet')) return icon('iron_amulet', size);
  if (itemName.includes('Gold Amulet')) return icon('gold_amulet', size);
  if (itemName.includes('Ruby Amulet')) return icon('ruby_amulet', size);
  if (itemName.includes('Sapphire Amulet')) return icon('sapphire_amulet', size);
  if (itemName.includes('Emerald Amulet')) return icon('emerald_amulet', size);
  if (itemName.includes('Diamond Amulet')) return icon('diamond_amulet', size);
  if (itemName.includes('Ancient Amulet')) return icon('ancient_amulet', size);
  if (itemName.includes('Void Heart')) return icon('void_heart', size);
  if (itemName.includes('Infernal Pendant')) return icon('infernal_pendant', size);
  if (itemName.includes('Glacial Amulet')) return icon('glacial_amulet', size);
  if (itemName.includes('Tome of Abyssal Knowledge')) return icon('tome_of_abyssal_knowledge', size);
  if (itemName.includes("Knight's Tome")) return icon('tome_knightstome', size);
  if (itemName.includes('Wraith Rune')) return icon('wraith_rune', size);
  if (itemName.includes('Frost Covenant Rune')) return icon('rune_frost_covenant', size);
  if (itemName.includes('Abyssal Lifesteal Elixir')) return icon('abyssal_lifesteal_elixir', size);
  if (itemName.includes('Abyssal Gathering XP Potion')) return icon('abyssal_gathering_xp_potion', size);
  if (itemName.includes('Abyssal Gathering Potion')) return icon('abyssal_gathering_potion', size);
  if (itemName.includes('Abyssal Combat XP Potion')) return icon('abyssal_combat_xp_potion', size);
  if (itemName.includes('Abyssal Fortune Potion')) return icon('abyssal_fortune_potion', size);
  if (itemName.includes('Easter') && itemName.includes('Potion')) return icon(key, size);
  if (itemName.includes('Firework') && itemName.includes('Potion')) return icon(key, size);
  if (itemName.startsWith('Rose ') && itemName.endsWith('Potion')) return icon(key, size);
  if (itemName.includes('Haunted') && itemName.includes('Potion')) return icon(key, size);
  if ((itemName.startsWith('Cursed ') || itemName.startsWith('Phantom ') || itemName.startsWith('Wraith ')) && itemName.endsWith('Potion')) return icon(key, size);
  if (itemName.includes('Tidalscale Ring')) return icon('tidalscale_ring', size);
  if (itemName.includes('Tidalscale Amulet')) return icon('tidalscale_amulet', size);
  if (itemName.includes('Tidalscale Cape')) return icon('tidalscale_cape', size);
  if (itemName.includes('Abyssweave Ring')) return icon('abyssweave_ring', size);
  if (itemName.includes('Abyssweave Amulet')) return icon('abyssweave_amulet', size);
  if (itemName.includes('Abyssweave Cape')) return icon('abyssweave_cape', size);
  
  if (itemName.includes('Leather Cape')) return icon('leather_cape', size);
  if (itemName.includes('Wool Cape')) return icon('wool_cape', size);
  if (itemName.includes('Silk Cape')) return icon('silk_cape', size);
  if (itemName.includes('Shadow Cape')) return icon('shadow_cape', size);
  if (itemName.includes('Infernal Cape')) return icon('infernal_cape', size);
  if (itemName.includes('Cape')) return icon('leather_cape', size);
  
  if (itemName.includes('Attack Potion')) return icon('attack_potion', size);
  if (itemName.includes('Strength Potion')) return icon('strength_potion', size);
  if (itemName.includes('Defense Potion')) return icon('defense_potion', size);
  if (itemName.includes('Ranging Potion')) return icon('ranging_potion', size);
  if (itemName.includes('Magic Potion')) return icon('magic_potion', size);
  if (itemName.includes('Lifesteal')) return icon('lifesteal_potion', size);
  
  if (itemName.includes('Ectoplasm')) return icon('ectoplasm', size);
  if (itemName.includes('Vital Essence')) return icon('vital_essence', size);
  if (itemName.includes('Rotten Flesh')) return icon('rotten_flesh', size);
  if (itemName.includes('Void Crystal')) return icon('void_crystal', size);
  if (itemName.includes('Shadow Essence')) return icon('shadow_essence', size);
  if (itemName.includes('Eternal Ember')) return icon('eternal_ember', size);
  if (itemName.includes('Molten Core')) return icon('molten_core', size);
  if (itemName.includes('Ember Core')) return icon('ember_core', size);
  if (itemName.includes('Phoenix Feather')) return icon('phoenix_feather', size);
  if (itemName.includes('Hellfire Bone')) return icon('hellfire_bone', size);
  if (itemName.includes('Venom') || itemName.includes('Potion')) return icon('venom', size);
  if (itemName.includes('Raw Scorpion')) return icon('raw_scorpion_meat', size);
  if (itemName.includes('Cooked Scorpion')) return icon('cooked_scorpion_meat', size);
  if (itemName.includes('Raw Young Dragon')) return icon('raw_young_dragon_meat', size);
  if (itemName.includes('Cooked Young Dragon')) return icon('cooked_young_dragon_meat', size);
  if (itemName.includes('Raw Small Dragon')) return icon('raw_small_dragon_meat', size);
  if (itemName.includes('Cooked Small Dragon')) return icon('cooked_small_dragon_meat', size);
  if (itemName.includes('Raw Dragon')) return icon('raw_dragon_meat', size);
  if (itemName.includes('Cooked Dragon')) return icon('cooked_dragon_meat', size);
  if (itemName.includes('Raw Frost Dragon')) return icon('raw_frost_dragon_meat', size);
  if (itemName.includes('Cooked Frost Dragon')) return icon('cooked_frost_dragon_meat', size);
  if (itemName.includes('Raw Frozen Tuna')) return icon('raw_frozen_tuna', size);
  if (itemName.includes('Cooked Frozen Tuna')) return icon('cooked_frozen_tuna', size);
  if (itemName.includes('Wraith Essence')) return icon('wraith_essence', size);
  if (itemName.includes('Runic Quiver')) return icon('runic_quiver', size);
  if (itemName.includes('Wraith Quiver')) return icon('wraith_quiver', size);
  if (itemName.includes("Berserker's Sigil")) return icon('berserker_sigil', size);
  if (itemName.includes('Wraith Sigil')) return icon('wraith_sigil', size);
  if (itemName.includes('Raw')) return icon('raw_chicken', size);
  if (itemName.includes('Cooked')) return icon('cooked_chicken', size);
  if (itemName.includes('String')) return icon('bowstring', size);
  
  const petDef = typeof getPetDef === 'function' && getPetDef(itemName);
  if(petDef) return icon(petDef.icon, size);
  return icon('potion', size);
}
function monsterIcon(m, size=20) {
  const h = icon(m.icon || m.id, size);
  return m.tint && MONSTER_TINTS[m.tint] ? `<span style="display:inline-flex;filter:${MONSTER_TINTS[m.tint]}">${h}</span>` : h;
}
function candyIcon(name, size){ const c = CANDY_DEFS[name]; const px = Math.max(2, Math.round((size||20)/8)); return `<span style="display:inline-flex;filter:drop-shadow(0 0 ${px}px ${CANDY_TIER_AURA[c.tier]})">${icon(c.icon, size)}</span>`; }
// Presentation-only corrections for stale PNG aliases in the original bundle.
Object.assign(PNG_ICONS,{helmet_abyssal:{path:'armor',file:'helm_abyssal.png'},platebody_abyssal:{path:'armor',file:'plate_abyssal.png'},platelegs_abyssal:{path:'armor',file:'legs_abyssal.png'},na_boots:{path:'armor',file:'leather_boots.png'},na_gloves:{path:'armor',file:'leather_gloves.png'}});
delete PNG_ICONS.pawnshop;
function create(game, env={}) {
const serverNow=()=>env.now || 1;
const getWeatherBonuses=()=>env.weather || {};
const getWeatherDmgMult=()=>1+(getWeatherBonuses()[getCombatStyle()+'_dmg'] || 0);
const getCandyDmgMult=()=>1+(env.candy || 0);
const isVipValid=()=>({vip:!!env.vip,vip2:!!env.vip2});
const console={log(){}};
const _ejectSigilForWeapon=()=>{ if(EQUIPMENT[game.equip.ammo]?.sigil) game.equip.ammo=null; };
const _ammoOffKept=()=>{game.equip.ammo=null; _ammoSwitch(isUsingRanged(),isUsingMagic());};
function potionKind(stat){ return POTION_KIND[stat] || 'combat'; }
function potionOn(e){
  if(!e || e.candy || !e.stat) return false;
  return e.msLeft > 0 || e.attacksLeft > 0;
}
function getPotion(stat){
  if(!game || !game.activeEffects) return null;
  return game.activeEffects.find(e => e.stat === stat && potionOn(e)) || null;
}
function potionValue(stat){ return getPotion(stat)?.value || 0; }
function potionMsLeft(e){ return e && e.msLeft > 0 ? e.msLeft : 0; }
function _potionFromCharges(e){
  const d = POTIONS[e.name];
  if(!d || !(e.attacksLeft > 0)) return 0;
  return Math.min(Math.round(e.attacksLeft / (d.attacks || 250) * d.duration), d.duration * 1000);
}
function _potionUse(kind, ms, silent){
  if(!game || !game.activeEffects || !(ms > 0)) return false;
  let ended = false;
  for(let i = game.activeEffects.length - 1; i >= 0; i--){
    const e = game.activeEffects[i];
    if(!POTIONS[e.name] || !potionOn(e) || potionKind(e.stat) !== kind) continue;
    if(!(e.msLeft > 0)) e.msLeft = _potionFromCharges(e);
    delete e.attacksLeft;
    e.msLeft -= ms;
    if(e.msLeft <= 0){
      game.activeEffects.splice(i, 1);
      ended = true;
      if(!silent){
        notify(tN('{0} wore off', getItemDisplay(e.name)), 'info');
        if(e.stat === 'production_speed') recalcProductionSpeed();   
      }
    }
  }
  return ended;
}
function getPetDef(name){
  const base = EVENT_PETS.find(p=>p.name===name) || BOSS_PETS.find(p=>p.name===name) || SKILL_PETS.find(p=>p.name===name) || MONSTER_PETS.find(p=>p.name===name);
  if(base) return base;
  
  for(const p of BOSS_PETS){
    if(p.recolor && p.recolor.name===name) return {...p, name:p.recolor.name, icon:p.recolor.icon, isRecolor:true, desc:p.desc+`<br><span style="color:#a855f7;font-style:italic">${p.recolor.desc||'Something altered it along the way...'}</span>`};
  }
  return null;
}
function equippedSkillPetBonus(skill){
  if(!game || !game.equip || !game.equip.pet) return null;
  const pet = getPetDef(game.equip.pet);
  return (pet && pet.skill === skill && pet.bonus) ? pet.bonus : null;
}
function getPrayerBonuses(){
  if(!game.activePrayer)return {};
  const prayer=[...PRAYERS,...TOME_UNLOCKED_PRAYERS].find(p=>p.id===game.activePrayer);
  if(!prayer)return {};
  const divinityLv=getLevel(game.skills.divinity);
  if(divinityLv<prayer.level)return {};
  
  const bp = equippedSkillPetBonus('divinity')?.blessing_power || 0;
  if(!bp) return prayer.effect;
  const boosted = {};
  for(const k in prayer.effect){ boosted[k] = (k === 'dmg_increase') ? prayer.effect[k] : prayer.effect[k] * (1 + bp); }
  return boosted;
}
function isUsingMagic(){
  const weapon=game.equip.weapon;
  return weapon && EQUIPMENT[weapon]?.magic;
}
function isUsingRanged(){
  const weapon=game.equip.weapon;
  return weapon && EQUIPMENT[weapon]?.ranged;
}
function getCombatStyle(){ return isUsingMagic() ? 'magic' : (isUsingRanged() ? 'ranged' : 'melee'); }
function getPlayerStats(){
  const base={atk:getLevel(game.skills.attack),str:getLevel(game.skills.strength),def:getLevel(game.skills.defense),rng:getLevel(game.skills.ranged),mag:getLevel(game.skills.magic),lifesteal:0};
  for(const[slot,itemName]of Object.entries(game.equip)){
    if(!itemName)continue;
    const item=EQUIPMENT[itemName];
    if(!item)continue;
    
    
    const rarityTier = game.equippedRarity[slot] || 1;
    const rarityMult = getRarityByTier(rarityTier).mult;
    
    if(item.atk)base.atk+=Math.floor(item.atk * rarityMult);
    if(item.str)base.str+=Math.floor(item.str * rarityMult);
    if(item.def)base.def+=Math.floor(item.def * rarityMult);
    if(item.rng)base.rng+=Math.floor(item.rng * rarityMult);
    if(item.rngBonus)base.rng+=Math.floor(item.rngBonus * rarityMult);
    if(item.magic)base.mag+=Math.floor(item.magic * rarityMult);
    if(item.lifesteal)base.lifesteal+=item.lifesteal;
  }
  
  const pb=getPrayerBonuses();
  if(pb.atk)base.atk=base.atk*(1+pb.atk);
  if(pb.str)base.str=base.str*(1+pb.str);
  if(pb.def)base.def=base.def*(1+pb.def);
  if(pb.rng)base.rng=base.rng*(1+pb.rng);
  if(pb.mag)base.mag=base.mag*(1+pb.mag);
  if(pb.rngBonus)base.rng+=pb.rngBonus;
  
  
  
  
  for(const[slot,itemName]of Object.entries(game.equip)){
    if(!itemName)continue;
    const item=EQUIPMENT[itemName];
    if(!item)continue;
    if(item.magicMult){
      const _rrMult = getRarityByTier(game.equippedRarity[slot] || 1).mult;
      base.mag = base.mag * (item.magicMult + (_rrMult - 1) * (item.magicScale || 0));
    }
    if(item.rangedMult && isUsingRanged()){
      const _qrMult = getRarityByTier(game.equippedRarity[slot] || 1).mult;
      base.rng = base.rng * (item.rangedMult + (_qrMult - 1) * (item.rangedScale || 0));
    }
    if(item.meleeMult && !isUsingRanged() && !isUsingMagic()){
      const _srMult = getRarityByTier(game.equippedRarity[slot] || 1).mult;
      const _mm = item.meleeMult + (_srMult - 1) * (item.meleeScale || 0);
      base.atk = base.atk * _mm;
      base.str = base.str * _mm;
    }
    
    if(item.drPenalty && !isUsingRanged() && !isUsingMagic()) base.drPenalty = (base.drPenalty||0) + item.drPenalty;
  }
  if(pb.lifesteal)base.lifesteal+=pb.lifesteal;
  
  
  if(game.equip.pet){
    const pet = getPetDef(game.equip.pet);
    if(pet && pet.bonus){
      if(pet.bonus.atk) base.atk += pet.bonus.atk;
      if(pet.bonus.str) base.str += pet.bonus.str;
      if(pet.bonus.def) base.def += pet.bonus.def;
      if(pet.bonus.rng) base.rng += pet.bonus.rng;
      if(pet.bonus.mag) base.mag += pet.bonus.mag;
      if(pet.bonus.lifesteal) base.lifesteal += pet.bonus.lifesteal;
      
      if(pet.bonus.atk_pct) base.atk = base.atk * (1 + pet.bonus.atk_pct);
      if(pet.bonus.str_pct) base.str = base.str * (1 + pet.bonus.str_pct);
      if(pet.bonus.def_pct) base.def = base.def * (1 + pet.bonus.def_pct);
      if(pet.bonus.rng_pct) base.rng = base.rng * (1 + pet.bonus.rng_pct);
      if(pet.bonus.mag_pct) base.mag = base.mag * (1 + pet.bonus.mag_pct);
    }
  }

  
  
  const _mb = getMuseumBonus();
  if(_mb.atk) base.atk = base.atk * (1 + _mb.atk);
  if(_mb.str) base.str = base.str * (1 + _mb.str);
  if(_mb.def) base.def = base.def * (1 + _mb.def);
  if(_mb.rng) base.rng = base.rng * (1 + _mb.rng);
  if(_mb.rngBonus) base.rng += _mb.rngBonus;
  if(_mb.mag) base.mag = base.mag * (1 + _mb.mag);
  if(_mb.lifesteal) base.lifesteal += _mb.lifesteal;
  base.museumDR = _mb.dr || 0;

  
  if(game.activeEffects && game.activeEffects.length > 0){
    for(const effect of game.activeEffects){
      if(potionOn(effect)){
        
        if(effect.stat === 'atk') base.atk += effect.value;
        if(effect.stat === 'str') base.str += effect.value;
        if(effect.stat === 'def') base.def += effect.value;
        if(effect.stat === 'rng') base.rng += effect.value;
        if(effect.stat === 'mag' || effect.stat === 'magic') base.mag += effect.value;
        
        
        
        const _potBoost = (stat, pct, flat) => Math.max(stat * pct, flat || 0);
        if(effect.stat === 'atk_pct') base.atk += _potBoost(base.atk, effect.value, effect.flat);
        if(effect.stat === 'str_pct') base.str += _potBoost(base.str, effect.value, effect.flat);
        if(effect.stat === 'def_pct') base.def += _potBoost(base.def, effect.value, effect.flat);
        if(effect.stat === 'rng_pct') base.rng += _potBoost(base.rng, effect.value, effect.flat);
        if(effect.stat === 'mag_pct') base.mag += _potBoost(base.mag, effect.value, effect.flat);
        if(effect.stat === 'lifesteal') base.lifesteal += effect.value;
      }
    }
  }

  
  
  
  const _vs = vampireSetBonus();
  if(_vs.statMult > 1){
    if(isUsingMagic()) base.mag = base.mag * _vs.statMult;
    else if(isUsingRanged()) base.rng = base.rng * _vs.statMult;
    else { base.atk = base.atk * _vs.statMult; base.str = base.str * _vs.statMult; }
    base.lifesteal += _vs.lifesteal;
  }

  return base;
}
function getMaxHit(stats){
  if(isUsingMagic()){
    return Math.floor(stats.mag * 0.70);   
  }
  if(isUsingRanged()){
    return Math.floor(stats.rng * 0.85);
  }
  return Math.floor((stats.atk+stats.str)*0.85);   
}
function getMinHitFrac(){
  let lvl;
  if(isUsingMagic()) lvl = getLevel(game.skills.magic);
  else if(isUsingRanged()) lvl = getLevel(game.skills.ranged);
  else lvl = (getLevel(game.skills.attack) + getLevel(game.skills.strength)) / 2;
  let frac = Math.min(0.15, lvl * 0.001);
  
  
  if(!isUsingMagic()){
    const w = EQUIPMENT[game.equip && game.equip.weapon];
    if(w && w.minHit) frac += w.minHit;
  }
  return frac;
}
function getMinHit(cap){ return Math.max(1, Math.min(cap, Math.floor(cap * getMinHitFrac()))); }
function getHitRangeVs(m){
  if(!m) return null;
  const stats = getPlayerStats();
  const pb = getPrayerBonuses();
  const cap = Math.max(1, getMaxHit(stats) - Math.floor((m.def||0)*0.3));
  const roll = (base) => {
    let d = base;
    if(m.boss && pb.boss_dmg) d = Math.floor(d*(1+pb.boss_dmg));
    d = Math.floor(d*getBestiaryDmgMult(m.name));
    d = Math.floor(d*getWeatherDmgMult()*getCandyDmgMult());
    d += getPetFlatDmg();
    return d;
  };
  return {min: roll(getMinHit(cap)), max: roll(cap)};
}
function _maxIncomingHit(m, stats, pb, netDR){
  if(!m || !stats) return 0;
  const defEff = (stats.def * 0.25) / (stats.def * 0.25 + 100 + m.str * 0.20);
  let d = Math.max(Math.max(1, Math.floor(m.str * 0.04)), Math.floor(Math.floor(m.str * 0.58) * (1 - defEff)));
  if(netDR === undefined){
    const pot = getPotion('damage_reduction');
    netDR = ((pb && pb.dmg_reduction)||0) + (pot?.value||0) + (stats.museumDR||0) - ((pb && pb.dmg_increase)||0) - (stats.drPenalty||0);
  }
  if(netDR !== 0) d = Math.max(0, Math.floor(d * (1 - netDR)));
  const bd = getBestiaryDefMult(m.name);
  if(bd > 1) d = Math.max(0, Math.floor(d / bd));
  return d;
}
function getPetFlatDmg(){
  if(!game || !game.equip || !game.equip.pet) return 0;
  const pet = getPetDef(game.equip.pet);
  return (pet && pet.bonus && pet.bonus.flat_dmg) ? pet.bonus.flat_dmg : 0;
}
function getPetWalkSpeed(){
  if(!game || !game.equip || !game.equip.pet) return 0;
  const pet = getPetDef(game.equip.pet);
  return (pet && pet.bonus && pet.bonus.walk_speed) ? pet.bonus.walk_speed : 0;
}
function getPetGoldBoost(){
  if(!game || !game.equip || !game.equip.pet) return 0;
  const pet = getPetDef(game.equip.pet);
  return (pet && pet.bonus && pet.bonus.gold_boost) ? pet.bonus.gold_boost : 0;
}
function getPetBoneDouble(){
  if(!game || !game.equip || !game.equip.pet) return 0;
  const pet = getPetDef(game.equip.pet);
  return (pet && pet.bonus && pet.bonus.bone_double) ? pet.bonus.bone_double : 0;
}
function getLuckMultiplier(){
  const vipStatus = isVipValid();
  let mult=1;
  if(vipStatus.vip && vipStatus.vip2)mult*=1.75; 
  else if(vipStatus.vip2)mult*=1.50; 
  else if(vipStatus.vip)mult*=1.25; 
  const pb=getPrayerBonuses();
  if(pb.luck)mult*=(1+pb.luck);
  
  if(game && game.equip && game.equip.pet){
    const pet = getPetDef(game.equip.pet);
    if(pet && pet.bonus && pet.bonus.luck) mult *= (1 + pet.bonus.luck);
  }
  return mult;
}
function vampireSetCount(){
  if(!game || !game.equip) return 0;
  const worn = Object.values(game.equip);
  let n = WORLD_BOSS.gearArmor.filter(g => worn.includes(g)).length;
  if(WORLD_BOSS.gearWeapons.some(w => worn.includes(w))) n++;
  return n;
}
function vampireSetBonus(){
  const n = vampireSetCount();
  if(n >= 6) return {statMult:1.25, lifesteal:0.03, pieces:n};
  if(n >= 3) return {statMult:1.10, lifesteal:0.01, pieces:n};
  return {statMult:1, lifesteal:0, pieces:n};
}
function museumUnlocked(){ return (game.bossesKilled||[]).includes('dungeon_boss'); }
function lodgeUnlocked(){ return (game.bossesKilled||[]).includes('meadow_boss'); }
function getBestiaryBonus(monsterName){
  const kills = (game.killLog||{})[monsterName] || 0;
  const out = {drop:0, dmg:0, def:0, walk:0, label:'', tier:null};
  if(!lodgeUnlocked()) return out;
  for(const t of BESTIARY_TIERS){
    if(kills >= t.kills){
      out.drop = t.drop || 0;
      out.dmg = t.dmg || 0;
      out.def = t.def || 0;
      out.walk = t.walk || 0;
      out.label = t.label;
      out.tier = t;
    }
  }
  return out;
}
function getBestiaryDropMult(monsterName){ return 1 + getBestiaryBonus(monsterName).drop; }
function getBestiaryDmgMult(monsterName){ return 1 + getBestiaryBonus(monsterName).dmg; }
function getBestiaryDefMult(monsterName){ return 1 + getBestiaryBonus(monsterName).def; }
function getZoneWalkReduction(zoneId){
  const mobs = MONSTERS[zoneId] || [];
  let r = 0;
  for(const m of mobs) r += getBestiaryBonus(m.name).walk;
  return Math.min(0.5, r);
}
function getZoneBossWalkReduction(zoneId){
  if(ZONES[zoneId]?.event){
    const boss = (MONSTERS[zoneId] || []).find(m => m.boss);
    return boss && (game.bossesKilled||[]).includes(boss.id) ? 0.10 : 0;
  }
  const zoneList = Object.values(ZONES);
  const i = zoneList.findIndex(z => z.id === zoneId);
  if(i < 0) return 0;
  let cleared = 0;
  for(let j = i; j < zoneList.length; j++){
    if((game.bossesKilled||[]).includes(zoneList[j].bossId)) cleared++;
  }
  return Math.min(0.5, cleared * 0.10);
}
function getZoneWalkReductionTotal(zoneId){ return Math.min(1, getZoneWalkReduction(zoneId) + getZoneBossWalkReduction(zoneId) + getPetWalkSpeed()); }
function getZoneWalkMult(zoneId){ return 1 - getZoneWalkReductionTotal(zoneId); }
function getMuseumRarity(name){
  let r = (game.bestRarities||{})[name] || 0;
  if((game.inv||{})[name] > 0) r = Math.max(r, 1);
  const tiers = (game.itemRarities||{})[name];
  if(tiers) for(const t in tiers){ if(tiers[t] > 0) r = Math.max(r, +t); }
  const eq = game.equip || {};
  for(const slot in eq){ if(eq[slot] === name) r = Math.max(r, (game.equippedRarity||{})[slot] || 1); }
  return r;
}
function getMuseumBonus(style){
  style = style || getCombatStyle();
  const totals = {atk:0, str:0, def:0, rng:0, mag:0, dr:0, rngBonus:0, lifesteal:0};
  if(!museumUnlocked()) return totals;
  const base = MUSEUM_BASE[style];
  if(base){
    for(const name in EQUIPMENT){
      if(!museumFamilies(name).includes(style)) continue;
      const rarity = getMuseumRarity(name);
      if(rarity <= 0) continue;
      const tierMult = MUSEUM_TIER_MULT[getItemMaterialTier(name)] || 0;
      const rMult = museumRarityFactor(rarity);
      const wMult = museumWeaponMult(name, style);
      for(const stat in base) totals[stat] += base[stat] * tierMult * rMult * wMult;
    }
  }
  for(const stat in totals){
    const cap = stat==='def' ? MUSEUM_DEF_CAP[style] : stat==='dr' ? MUSEUM_DR_CAP[style] : MUSEUM_CAP[stat];
    if(cap != null) totals[stat] = Math.min(cap, totals[stat]);
  }
  return totals;
}
function _isKeptFood(name){ return !!(game && Array.isArray(game.keptFoods) && game.keptFoods.includes(name)); }
function _autoEatFoods(){
  return Object.entries(game.inv)
    .filter(([name, qty]) => qty > 0 && FOOD_HEALS[name] && !_isKeptFood(name))
    .map(([name, qty]) => ({name, qty, heal: FOOD_HEALS[name]}))
    .sort((a, b) => game.foodWorstFirst ? a.heal - b.heal : b.heal - a.heal);
}
function getBestFood(){ return _autoEatFoods()[0] || null; }
function _isKeptAmmo(name){ return !!(game && Array.isArray(game.keptAmmo) && game.keptAmmo.includes(name)); }
function _dropKeptAmmo(list){
  for(let i = list.length - 1; i >= 0; i--) if(_isKeptAmmo(list[i].name)) list.splice(i, 1);
  return list;
}
function _offlineConsumeAmmo(usingRanged, usingMagic){
  
  if((usingRanged || usingMagic) && EQUIPMENT[game.equip.ammo]?.sigil) _ejectSigilForWeapon({ranged:true});
  
  if(game.equip.ammo && _isKeptAmmo(game.equip.ammo)){ _ammoOffKept(); if(!game.equip.ammo) return false; }
  const ammo = game.equip.ammo;

  
  if(EQUIPMENT[ammo]?.infinite) return true;

  
  let consumed = false;
  if(!_isKeptAmmo(ammo) && game.itemRarities && game.itemRarities[ammo]){
    const availableTiers = Object.keys(game.itemRarities[ammo])
      .map(Number)
      .filter(t => game.itemRarities[ammo][t] > 0)
      .sort((a,b) => game.ammoWorstFirst ? a - b : b - a);

    if(availableTiers.length > 0){
      const tier = availableTiers[0];
      game.itemRarities[ammo][tier]--;
      if(game.itemRarities[ammo][tier] <= 0){
        delete game.itemRarities[ammo][tier];
        if(Object.keys(game.itemRarities[ammo]).length === 0){
          delete game.itemRarities[ammo];
        }
      }
      consumed = true;
    }
  }

  
  if(!consumed && !_isKeptAmmo(ammo) && game.inv[ammo] && game.inv[ammo] > 0){
    game.inv[ammo]--;
    if(game.inv[ammo] <= 0) delete game.inv[ammo];
    consumed = true;
  }

  if(consumed) return true;
  return _ammoSwitch(usingRanged, usingMagic);
}
function _ammoSwitch(usingRanged, usingMagic){
  
  let foundReplacement = false;

  if(usingRanged){
    
    const availableArrows = [];
    const dir = game.ammoWorstFirst ? 1 : -1;

    
    if(game.itemRarities){
      for(const [arrowName, tiers] of Object.entries(game.itemRarities)){
        const eq = EQUIPMENT[arrowName];
        if(eq && eq.slot === 'ammo' && eq.rngBonus){
          const tierNums = Object.keys(tiers).map(Number).filter(t => tiers[t] > 0);
          if(tierNums.length > 0){
            const pickedTier = game.ammoWorstFirst ? Math.min(...tierNums) : Math.max(...tierNums);
            availableArrows.push({name: arrowName, bonus: eq.rngBonus, tier: pickedTier});
          }
        }
      }
    }

    
    for(const [arrowName, qty] of Object.entries(game.inv)){
      if(qty > 0){
        const eq = EQUIPMENT[arrowName];
        if(eq && eq.slot === 'ammo' && eq.rngBonus){
          availableArrows.push({name: arrowName, bonus: eq.rngBonus, tier: 1});
        }
      }
    }

    _dropKeptAmmo(availableArrows);
    availableArrows.sort((a, b) => {
      if(a.bonus !== b.bonus) return (a.bonus - b.bonus) * dir;
      return (a.tier - b.tier) * dir;
    });

    if(availableArrows.length > 0){
      game.equip.ammo = availableArrows[0].name;
      game.equippedRarity.ammo = availableArrows[0].tier;
      foundReplacement = true;
      console.log(`Switched to ${availableArrows[0].name} (tier ${availableArrows[0].tier})`);
    }
  } else if(usingMagic){
    
    const availableSpells = [];
    const dir = game.ammoWorstFirst ? 1 : -1;

    
    if(game.itemRarities){
      for(const [spellName, tiers] of Object.entries(game.itemRarities)){
        const eq = EQUIPMENT[spellName];
        if(eq && eq.slot === 'ammo' && eq.magicMult && !eq.infinite){
          const tierNums = Object.keys(tiers).map(Number).filter(t => tiers[t] > 0);
          if(tierNums.length > 0){
            const pickedTier = game.ammoWorstFirst ? Math.min(...tierNums) : Math.max(...tierNums);
            availableSpells.push({name: spellName, bonus: eq.magicMult, tier: pickedTier});
          }
        }
      }
    }

    
    for(const [spellName, qty] of Object.entries(game.inv)){
      if(qty > 0){
        const eq = EQUIPMENT[spellName];
        if(eq && eq.slot === 'ammo' && eq.magicMult && !eq.infinite){
          availableSpells.push({name: spellName, bonus: eq.magicMult, tier: 1});
        }
      }
    }

    _dropKeptAmmo(availableSpells);
    
    const simAvailRunes = (game.unlockedRunes || [])
      .map(rn => ({name: rn, mult: EQUIPMENT[rn]?.magicMult || 0}))
      .filter(r => r.mult > 0)
      .sort((a, b) => b.mult - a.mult);
    const simBestRune = simAvailRunes[0] || null;
    const simBestRuneMult = simBestRune ? simBestRune.mult : 0;

    
    const simCandidates = simBestRune
      ? availableSpells.filter(s => s.bonus > simBestRuneMult)
      : availableSpells;
    simCandidates.sort((a, b) => {
      if(a.bonus !== b.bonus) return (a.bonus - b.bonus) * dir;
      return (a.tier - b.tier) * dir;
    });

    if(simCandidates.length > 0){
      game.equip.ammo = simCandidates[0].name;
      game.equippedRarity.ammo = simCandidates[0].tier;
      foundReplacement = true;
    } else if(simBestRune){
      game.equip.ammo = simBestRune.name;
      game.equippedRarity.ammo = 1;
      foundReplacement = true;
    }
  }

  if(!foundReplacement && EQUIPMENT[game.equip.ammo]?.infinite){
    foundReplacement = true;
  }
  if(!foundReplacement){
    
    game.equip.ammo = null;
    delete game.equippedRarity.ammo;
    return false;
  }
  return true;
}
// The manual museum input is the already computed bonus shown in the game.
const collectionMuseumBonus=getMuseumBonus;
getMuseumBonus=()=>env.museum || collectionMuseumBonus();
// Headless adapter: original active combat tick, original math and ammo order.
// Only presentation, timers, persistence and reward delivery are replaced.
let currentFight=null, currentTab='combat', isProcessingDeath=false, fightInterval=1, pending=null;
const monsterElement={classList:{contains:()=>false,add(){}},style:{}};
const window={};
const document={querySelector:s=>s==='.monster-display-icon'?monsterElement:null,querySelectorAll:()=>[],activeElement:null};
const Math=Object.create(globalThis.Math); Math.random=()=>env.random ? env.random() : globalThis.Math.random();
const rand=(a,b)=>globalThis.Math.floor(Math.random()*(b-a+1))+a;
const noop=()=>{};
const updateCombatSessionDisplay=noop,renderTab=noop,updateEquippedAmmoSlot=noop,updateFoodCountInDOM=noop,triggerCombatEffect=noop,triggerEnemyAttackFX=noop,updateHeader=noop,updateStatusBanner=noop,render=noop,saveGame=noop,autoEatWithDelay=noop,recalcProductionSpeed=noop;
const getItemDisplay=x=>x,tN=x=>x;
const showDamage=(n,kind)=>env.onDamage?.(n,kind);
const notify=(message)=>{if(message==='Out of arrows!' || message==='Out of spells!' || message==='No arrows equipped!' || message==='No spell equipped!') env.stop='ammo';};
const showOfflineModal=()=>{env.stop='death';};
const endFight=()=>{env.stop=env.stop || (game.hp<=0?'death':'stopped');currentFight=null;};
const onMonsterKill=m=>env.onKill?.(m);
const clearInterval=noop;
const setInterval=()=>1;
const setTimeout=(fn,delay)=>{pending={fn,delay};return 1;};
const tickPotionEffects=()=>{const count=game.activeEffects.length; game.activeEffects=game.activeEffects.filter(e=>potionOn(e)||(e.expiresAt>serverNow()));return count!==game.activeEffects.length;};
function fightTick(){
  if(!currentFight)return;
  
  
  if(isProcessingDeath){
    return;
  }

  
  if(game.sessionLoot && game.sessionLoot.startTime){
    game.sessionLoot.activeTicks = (game.sessionLoot.activeTicks || 0) + 1;
  }

  updateCombatSessionDisplay();
  
  
  if(currentFight.currentHp <= 0){
    if(fightInterval){
      clearInterval(fightInterval);
      fightInterval = null;
    }
    return;
  }
  
  
  const monsterIcon = document.querySelector('.monster-display-icon');
  if(monsterIcon && monsterIcon.classList.contains('monster-death')){
    if(fightInterval){
      clearInterval(fightInterval);
      fightInterval = null;
    }
    return; 
  }
  
  
  if(game.activeEffects && game.activeEffects.length > 0){
    const _expired = tickPotionEffects();
    
    if(_expired && currentTab === 'combat') renderTab('combat');
    else if(_expired) window._fxEnded = true;
  }
  
  const pb=getPrayerBonuses();
  
  
  const usingRanged = isUsingRanged();
  const usingMagic = isUsingMagic();
  
  if((usingRanged || usingMagic) && EQUIPMENT[game.equip.ammo]?.sigil) _ejectSigilForWeapon({ranged:true});
  
  if((usingRanged || usingMagic) && game.equip.ammo && _isKeptAmmo(game.equip.ammo)) _ammoOffKept();
  if(usingRanged){
    const ammo = game.equip.ammo;
    if(!ammo){
      notify(tN('No arrows equipped!'),'error');
      endFight();
      return;
    }
    
    
    const currentTier = game.equippedRarity.ammo || 1;
    
    
    game.equip.ammo = null;
    delete game.equippedRarity.ammo;
    
    
    let foundReplacement = false;
    
    
    if(!_isKeptAmmo(ammo) && game.itemRarities && game.itemRarities[ammo]){
      const availableTiers = Object.keys(game.itemRarities[ammo])
        .map(Number)
        .filter(t => game.itemRarities[ammo][t] > 0)
        .sort((a,b) => game.ammoWorstFirst ? a-b : b-a);
      
      if(availableTiers.length > 0){
        const nextTier = availableTiers[0];
        
        
        game.itemRarities[ammo][nextTier]--;
        if(game.itemRarities[ammo][nextTier] <= 0){
          delete game.itemRarities[ammo][nextTier];
          if(Object.keys(game.itemRarities[ammo]).length === 0){
            delete game.itemRarities[ammo];
          }
        }
        
        
        game.equip.ammo = ammo;
        game.equippedRarity.ammo = nextTier;
        foundReplacement = true;
        
        
        updateEquippedAmmoSlot(ammo, nextTier);
      }
    }
    
    
    if(!foundReplacement && !_isKeptAmmo(ammo) && game.inv[ammo] && game.inv[ammo] > 0){
      game.inv[ammo]--;
      if(game.inv[ammo] <= 0) delete game.inv[ammo];
      
      game.equip.ammo = ammo;
      game.equippedRarity.ammo = 1;
      foundReplacement = true;
      
      
      updateEquippedAmmoSlot(ammo, 1);
    }
    
    if(!foundReplacement){
      
      const availableArrows = [];
      
      
      if(game.itemRarities){
        for(const [arrowName, tiers] of Object.entries(game.itemRarities)){
          const eq = EQUIPMENT[arrowName];
          if(eq && eq.slot === 'ammo' && eq.rngBonus){
            const bestTier = Math.max(...Object.keys(tiers).map(Number).filter(t => tiers[t] > 0));
            if(bestTier){
              availableArrows.push({name: arrowName, bonus: eq.rngBonus, tier: bestTier, hasRarity: true});
            }
          }
        }
      }
      
      
      for(const [arrowName, qty] of Object.entries(game.inv)){
        if(qty > 0){
          const eq = EQUIPMENT[arrowName];
          if(eq && eq.slot === 'ammo' && eq.rngBonus){
            availableArrows.push({name: arrowName, bonus: eq.rngBonus, tier: 1, hasRarity: false});
          }
        }
      }
      
      _dropKeptAmmo(availableArrows);
      
      availableArrows.sort((a, b) => {
        const dir = game.ammoWorstFirst ? 1 : -1;
        if(a.bonus !== b.bonus) return (a.bonus - b.bonus) * dir;
        return (a.tier - b.tier) * dir;
      });
      
      if(availableArrows.length > 0){
        const nextArrow = availableArrows[0];
        
        if(nextArrow.hasRarity){
          
          game.itemRarities[nextArrow.name][nextArrow.tier]--;
          if(game.itemRarities[nextArrow.name][nextArrow.tier] <= 0){
            delete game.itemRarities[nextArrow.name][nextArrow.tier];
            if(Object.keys(game.itemRarities[nextArrow.name]).length === 0){
              delete game.itemRarities[nextArrow.name];
            }
          }
        } else {
          
          game.inv[nextArrow.name]--;
          if(game.inv[nextArrow.name] <= 0) delete game.inv[nextArrow.name];
        }
        
        game.equip.ammo = nextArrow.name;
        game.equippedRarity.ammo = nextArrow.tier;
        foundReplacement = true;
        
        
        updateEquippedAmmoSlot(nextArrow.name, nextArrow.tier);
      }
    }
    
    if(!foundReplacement){
      notify(tN('Out of arrows!'),'error');
      endFight();
      return;
    }
  }
  
  
  if(usingMagic){
    const spell = game.equip.ammo;
    if(!spell){
      notify(tN('No spell equipped!'),'error');
      endFight();
      return;
    }
    
    
    
    const spellDef = EQUIPMENT[spell];
    if(!spellDef || !spellDef.infinite){
      const currentSpellTier = game.equippedRarity?.ammo || 1;
      let consumed = false;
      
      if(game.itemRarities && game.itemRarities[spell] && game.itemRarities[spell][currentSpellTier] > 0){
        game.itemRarities[spell][currentSpellTier]--;
        if(game.itemRarities[spell][currentSpellTier] <= 0){
          delete game.itemRarities[spell][currentSpellTier];
          if(Object.keys(game.itemRarities[spell]).length === 0) delete game.itemRarities[spell];
        }
        consumed = true;
      }
      
      if(!consumed && game.inv[spell] && game.inv[spell] > 0){
        game.inv[spell]--;
        if(game.inv[spell] <= 0) delete game.inv[spell];
        consumed = true;
      }
      
      if(game.inv[spell] !== undefined && isNaN(game.inv[spell])) delete game.inv[spell];
    }
    
    
    if(currentTab === 'items'){
      render();
    }
    
    
    if(spellDef && spellDef.infinite){
      
    } else {
    
    game.equip.ammo = null;
    
    
    let foundReplacement = false;
    const availableSpells = [];
    
    if(game.itemRarities){
      for(const [spellName, tiers] of Object.entries(game.itemRarities)){
        const eq = EQUIPMENT[spellName];
        if(eq && eq.slot === 'ammo' && eq.magicMult && !eq.infinite){
          const tierNums = Object.keys(tiers).map(Number).filter(t => tiers[t] > 0);
          if(tierNums.length > 0){
            const pickedTier = game.ammoWorstFirst ? Math.min(...tierNums) : Math.max(...tierNums);
            availableSpells.push({name: spellName, bonus: eq.magicMult, tier: pickedTier, hasRarity: true});
          }
        }
      }
    }
    
    for(const [name, qty] of Object.entries(game.inv)){
      if(qty > 0){
        const eq = EQUIPMENT[name];
        if(eq && eq.slot === 'ammo' && eq.magicMult && !eq.infinite){
          availableSpells.push({name, bonus: eq.magicMult, tier: 1, hasRarity: false});
        }
      }
    }
    _dropKeptAmmo(availableSpells);
    
    const availableRunes = (game.unlockedRunes || [])
      .map(rn => ({name: rn, mult: EQUIPMENT[rn]?.magicMult || 0}))
      .filter(r => r.mult > 0)
      .sort((a, b) => b.mult - a.mult);
    const bestRune = availableRunes[0] || null;
    const bestRuneMult = bestRune ? bestRune.mult : 0;

    
    const candidateSpells = bestRune
      ? availableSpells.filter(s => s.bonus > bestRuneMult)
      : availableSpells;
    candidateSpells.sort((a, b) => game.ammoWorstFirst ? a.bonus - b.bonus : b.bonus - a.bonus);

    if(candidateSpells.length > 0){
      const next = candidateSpells[0];
      game.equip.ammo = next.name;
      game.equippedRarity.ammo = next.tier;
      foundReplacement = true;
    } else if(bestRune){
      
      game.equip.ammo = bestRune.name;
      game.equippedRarity.ammo = 1;
      foundReplacement = true;
      updateEquippedAmmoSlot(bestRune.name, 1);
    }

    if(!foundReplacement){
      notify(tN('Out of spells!'),'error');
      endFight();
      return;
    }
    } 
  }
  
  
  const bestFood = getBestFood();
  if(game.autoEat && bestFood){
    const thresholdHp = Math.floor(game.maxHp * (game.autoEatThreshold / 100));
    if(game.hp <= thresholdHp || game.hp <= _maxIncomingHit(currentFight, getPlayerStats(), pb)){
      game.inv[bestFood.name]--;
      if(game.inv[bestFood.name]<=0) delete game.inv[bestFood.name];
      const healed = Math.min(bestFood.heal, game.maxHp - game.hp);
      game.hp = Math.min(game.maxHp, game.hp + bestFood.heal);
      if(healed > 0) showDamage(healed, 'heal');
      if(game.sessionLoot && game.sessionLoot.startTime) game.sessionLoot.foodEaten = (game.sessionLoot.foodEaten||0) + 1;
      
      
      if(currentTab === 'items'){
        updateFoodCountInDOM(bestFood.name, game.inv[bestFood.name]);
      }
      
      
      const foodDisplay = document.querySelector('[data-food-display]');
      if(foodDisplay){
        const foodList = _autoEatFoods();

        const currentFood = foodList[0];
        const nextFood = foodList[1];

        if(!currentFood){
          foodDisplay.innerHTML = `<div style="font-size:10px;color:var(--red);padding:4px 8px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);border-radius:4px">⚠️ ${_noFoodText()}</div>`;
        } else {
          const currentIcon = foodDisplay.querySelector('[data-current-food-icon]');
          const currentName = foodDisplay.querySelector('[data-current-food-name]');
          const currentQty = foodDisplay.querySelector('[data-current-food-qty]');
          
          if(currentIcon) currentIcon.innerHTML = itemIcon(currentFood.name, 16);
          if(currentName) currentName.textContent = getItemDisplay(currentFood.name);
          if(currentQty) currentQty.textContent = `${currentFood.qty}x · +${currentFood.heal} HP`;
          
          const nextFoodRow = foodDisplay.querySelector('[data-next-food-row]');
          if(nextFood){
            if(nextFoodRow){
              const nextIcon = nextFoodRow.querySelector('[data-next-food-icon]');
              const nextName = nextFoodRow.querySelector('[data-next-food-name]');
              const nextQty = nextFoodRow.querySelector('[data-next-food-qty]');
              
              if(nextIcon) nextIcon.innerHTML = itemIcon(nextFood.name, 16);
              if(nextName) nextName.textContent = getItemDisplay(nextFood.name);
              if(nextQty) nextQty.textContent = `${nextFood.qty}x · +${nextFood.heal} HP`;
            } else {
              const newRow = document.createElement('div');
              newRow.setAttribute('data-next-food-row', '');
              newRow.style.cssText = 'display:flex;align-items:center;gap:6px';
              newRow.innerHTML = `
                <span style="font-size:9px;color:var(--dim);min-width:40px">${tMisc('Next:')}</span>
                <span data-next-food-icon>${itemIcon(nextFood.name, 16)}</span>
                <span style="font-size:10px;color:var(--muted);font-weight:600;flex:1" data-next-food-name>${getItemDisplay(nextFood.name)}</span>
                <span style="font-size:9px;color:var(--dim)" data-next-food-qty>${nextFood.qty}x · +${nextFood.heal} HP</span>
              `;
              foodDisplay.appendChild(newRow);
            }
          } else if(nextFoodRow){
            nextFoodRow.remove();
          }
        }
      }
    }
  }
  
  
  
  let totalRegen = 0;
  if(game.equip.pet && game.hp < game.maxHp){
    const _pet = getPetDef(game.equip.pet);
    if(_pet && _pet.bonus && _pet.bonus.hp_per_tick) totalRegen += _pet.bonus.hp_per_tick;
  }
  if(pb.hp_regen && game.hp < game.maxHp) totalRegen += Math.floor(pb.hp_regen);
  if(totalRegen > 0 && game.hp < game.maxHp){
    game.hp = Math.min(game.maxHp, game.hp + totalRegen);
    showDamage(totalRegen, 'heal');
  }
  
  const stats=getPlayerStats();
  const maxHit=getMaxHit(stats);
  
  
  let lifestealPct=stats.lifesteal;
  
  
  if(currentFight.currentHp <= 0 || isProcessingDeath){
    if(fightInterval){
      clearInterval(fightInterval);
      fightInterval = null;
    }
    return;
  }

  
  if(currentFight.currentHp <= 0 || isProcessingDeath){
    if(fightInterval){
      clearInterval(fightInterval);
      fightInterval = null;
    }
    return;
  }
  
  
  const _hitCap=Math.max(1,maxHit-Math.floor(currentFight.def*0.3));
  let baseDmg=rand(getMinHit(_hitCap),_hitCap);
  if(currentFight.boss&&pb.boss_dmg){
    baseDmg=Math.floor(baseDmg*(1+pb.boss_dmg));
  }
  baseDmg=Math.floor(baseDmg*getBestiaryDmgMult(currentFight.name));
  baseDmg=Math.floor(baseDmg*getWeatherDmgMult()*getCandyDmgMult()); 
  baseDmg+=getPetFlatDmg(); 
  currentFight.currentHp-=baseDmg;
  showDamage(baseDmg,'dealt');
  if(game.combatEffects!==false) triggerCombatEffect(game.combatStyle||'melee', baseDmg);

  
  if(lifestealPct>0&&game.hp<game.maxHp){
    const lifestealAmt=Math.max(1,Math.ceil(baseDmg*lifestealPct));
    game.hp=Math.min(game.maxHp,game.hp+lifestealAmt);
    showDamage(lifestealAmt,'lifesteal');
  }

  
  
  if(currentFight._worldBoss){
    const _wb = wbState();
    if(window._wbAttemptWeek && _wb.week !== window._wbAttemptWeek){ endWorldBossAttempt('done'); return; }
    _wb.dmg += baseDmg;
    window._wbAttemptDmg = (window._wbAttemptDmg||0) + baseDmg;
    currentFight.currentHp = Math.max(1, currentFight.currentHp);
    window._wbTicksLeft = (window._wbTicksLeft || 0) - 1;
    _wbUpdateArenaDom();
    if(window._wbTicksLeft <= 0){ endWorldBossAttempt('done'); return; }
  }

  
  if(currentFight.currentHp<=0 && !currentFight._worldBoss){
    
    isProcessingDeath = true;
    
    
    currentFight.currentHp = 0;
    
    
    if(fightInterval){
      clearInterval(fightInterval);
      fightInterval = null;
    }
    
    
    const monsterHpBar = document.querySelector('.monster-hp-fill');
    if(monsterHpBar){
      monsterHpBar.style.width = '0%';
    }
    const monsterHpText = document.querySelector('.monster-hp-text');
    if(monsterHpText){
      monsterHpText.textContent = '0 / ' + currentFight.hp;
    }
    
    
    const monsterIcon = document.querySelector('.monster-display-icon');
    if(monsterIcon && currentTab === 'combat'){
      monsterIcon.classList.add('monster-death');
      
      if(game.combatEffects !== false){
        const fxArena = document.getElementById('combat-fx-arena');
        if(fxArena){
          const cx = fxArena.offsetWidth/2;
          const cy = monsterIcon.offsetTop + monsterIcon.offsetHeight/2;
          _spawnKillFX(fxArena, cx, cy);
        }
      }
      setTimeout(() => {
        
        onMonsterKill(currentFight);
        
        if(game.autoFight){
          
          const monsterName = document.querySelector('.monster-display-name');
          const monsterIcon = document.querySelector('.monster-display-icon');
          if(monsterName){
            monsterName.textContent = tHud('Walking to next monster...');
            monsterName.style.color = 'var(--dim)';
          }
          if(monsterIcon){
            monsterIcon.style.opacity = '0.3'; 
          }
          
          
          const delay = (1000 + Math.random() * 1000) * getZoneWalkMult(game.zone);
          setTimeout(() => {
            isProcessingDeath = false;
            if(!currentFight) return; 
            currentFight={...currentFight,currentHp:currentFight.hp};
            fightInterval=setInterval(fightTick,600);
            
            const monsterIcon = document.querySelector('.monster-display-icon');
            if(monsterIcon) monsterIcon.style.opacity = '1';
            updateHeader();
            updateStatusBanner();
            if(currentTab==='combat')renderTab('combat');
          }, delay);
        }else{
          isProcessingDeath = false;
          endFight();
          updateHeader();
          updateStatusBanner();
          if(currentTab==='combat')renderTab('combat');
        }
      }, 800); 
      return;
    } else {
      
      onMonsterKill(currentFight);
      if(game.autoFight){
        
        const delay = 800 + (1000 + Math.random() * 1000) * getZoneWalkMult(game.zone);
        setTimeout(() => {
          isProcessingDeath = false;
          if(!currentFight) return; 
          if(fightInterval){ clearInterval(fightInterval); fightInterval = null; }
          currentFight={...currentFight,currentHp:currentFight.hp};
          fightInterval=setInterval(fightTick,600);
        }, delay);
      }else{
        isProcessingDeath = false;
        endFight();
      }
      updateHeader();
      updateStatusBanner();
      if(currentTab==='combat')renderTab('combat');
      return;
    }
  }
  
  
  
  let penetrationChance = currentFight.atk / (currentFight.atk + stats.def * 0.43);
  let attackPenetrates = Math.random() < penetrationChance;
  
  let eDmg = 0;
  let _rawEDmg = 0;
  if (attackPenetrates) {
    
    const rollMin = Math.floor(currentFight.str * 0.42);
    const rollMax = Math.floor(currentFight.str * 0.58);
    let defEffectiveness = (stats.def * 0.25) / (stats.def * 0.25 + 100 + currentFight.str * 0.20);
    const floorDmg = Math.max(1, Math.floor(currentFight.str * 0.04));
    const roll = rand(rollMin, rollMax);
    eDmg = Math.max(floorDmg, Math.floor(roll * (1 - defEffectiveness)));
    _rawEDmg = eDmg; 
    
    
    const _potionDR = getPotion('damage_reduction');
    const _netDR = (pb.dmg_reduction||0) + (_potionDR?.value||0) + (stats.museumDR||0) - (pb.dmg_increase||0) - (stats.drPenalty||0);
    if(_netDR !== 0){
      eDmg = Math.max(0, Math.floor(eDmg * (1 - _netDR)));
    }
  }
  
  const _bestDef = getBestiaryDefMult(currentFight.name);
  if(_bestDef > 1) eDmg = Math.max(0, Math.floor(eDmg / _bestDef));
  game.hp-=eDmg;
  const _shieldedAmt = Math.max(0, _rawEDmg - eDmg);
  if(eDmg>0) showDamage(eDmg,'taken');
  if(_shieldedAmt>0) showDamage(_shieldedAmt,'shield');
  else if(eDmg===0) showDamage(0,'shield');
  if(game.combatEffects!==false) triggerEnemyAttackFX();

  
  
  if(game.hp<=0 && currentFight._worldBoss){
    game.hp=0;
    endWorldBossAttempt('died'); 
    render();
    return;
  }

  
  if(game.hp<=0){
    game.hp=0;
    isProcessingDeath = true;
    
    
    if(game.sessionLoot.startTime){
      const elapsed = Date.now() - game.sessionLoot.startTime;
      const deathResults = {
        died: true,
        activeDeath: true,
        diedAfter: elapsed,
        time: elapsed,
        kills: game.sessionLoot.kills || 0,
        gold: game.sessionLoot.gold || 0,
        xp: {},
        items: game.sessionLoot.items || {},
        itemRarities: game.sessionLoot.itemRarities || {}
      };
      
      
      
      if(game.sessionLoot.xp > 0){
        if(isUsingMagic()){
          deathResults.xp.magic = Math.floor(game.sessionLoot.xp);
          deathResults.xp.defense = Math.floor(game.sessionLoot.xp * 0.7);
        } else if(isUsingRanged()){
          deathResults.xp.ranged = Math.floor(game.sessionLoot.xp);
          deathResults.xp.defense = Math.floor(game.sessionLoot.xp * 0.7);
        } else {
          deathResults.xp.attack = Math.floor(game.sessionLoot.xp);
          deathResults.xp.strength = Math.floor(game.sessionLoot.xp);
          deathResults.xp.defense = Math.floor(game.sessionLoot.xp * 0.7);
        }
      }
      
      showOfflineModal(deathResults);
      
      
      game.sessionLoot = {gold:0,kills:0,items:{},itemRarities:{},xp:0,activeTicks:0,foodEaten:0,startTime:null};
    } else {
      notify(tN('You died!'),'error');
    }
    
    endFight();
    
    game.hp=Math.max(1, Math.floor(game.maxHp * 0.1));

    
    setTimeout(autoEatWithDelay, 500);

    const _deathActiveEl = document.activeElement;
    if(_deathActiveEl && (_deathActiveEl.tagName === 'INPUT' || _deathActiveEl.tagName === 'TEXTAREA')){
      updateHeader();
      updateStatusBanner();
    } else {
      render();
    }
    return;
  }
  
  updateHeader();
  updateStatusBanner();
  
  if(currentTab==='combat'){
    const potionContainer = document.querySelector('#combat-potion-tracker');
    if(potionContainer){
      potionContainer.innerHTML = renderPotionTracker();
    }
    
    const monsterHpBar = document.querySelector('.monster-hp-fill');
    if(monsterHpBar && currentFight && !currentFight._worldBoss){
      const hpPct = Math.max(0, (currentFight.currentHp / currentFight.hp) * 100);
      monsterHpBar.style.width = hpPct + '%';
    }
    
    const monsterHpText = document.querySelector('.monster-hp-text');
    if(monsterHpText && currentFight && !currentFight._worldBoss){
      monsterHpText.textContent = `${Math.max(0, Math.floor(currentFight.currentHp))} / ${currentFight.hp}`;
    }
  }
  
  
  if(currentTab==='items' && game.equip.ammo){
    const ammoName = game.equip.ammo;
    const tiers = game.itemRarities?.[ammoName];
    const total = (tiers ? Object.values(tiers).reduce((a,b)=>a+b,0) : 0) + (game.inv[ammoName]||0);
    document.querySelectorAll('.inv-item .item-name, .inv-item-group .item-name').forEach(nameEl => {
      const t = nameEl.textContent.trim();
      if(t === ammoName || t === getItemDisplay(ammoName) || t.endsWith(' ' + ammoName)){
        const qtyEl = nameEl.parentElement.querySelector('.item-qty');
        if(qtyEl) qtyEl.textContent = total > 0 ? 'x' + total : '';
      }
    });
  }
  saveGame();
}
function beginFight(m){currentFight={...m,currentHp:m.hp};isProcessingDeath=false;pending=null;}
function activeStep(){pending=null;fightTick();return {delay:pending?.delay||0,dead:env.stop==='death',monsterHp:currentFight?.currentHp||0};}
function resumeFight(){const p=pending;pending=null;if(p) p.fn();return {delay:pending?.delay||0,pending:!!pending};}
return {potionKind,potionOn,getPotion,potionValue,potionMsLeft,_potionFromCharges,_potionUse,getPetDef,equippedSkillPetBonus,getPrayerBonuses,isUsingMagic,isUsingRanged,getCombatStyle,getPlayerStats,getMaxHit,getMinHitFrac,getMinHit,getHitRangeVs,_maxIncomingHit,getPetFlatDmg,getPetWalkSpeed,getPetGoldBoost,getPetBoneDouble,getLuckMultiplier,vampireSetCount,vampireSetBonus,museumUnlocked,lodgeUnlocked,getBestiaryBonus,getBestiaryDropMult,getBestiaryDmgMult,getBestiaryDefMult,getZoneWalkReduction,getZoneBossWalkReduction,getZoneWalkReductionTotal,getZoneWalkMult,getMuseumRarity,getMuseumBonus,_isKeptFood,_autoEatFoods,getBestFood,_isKeptAmmo,_dropKeptAmmo,_offlineConsumeAmmo,_ammoSwitch,collectionMuseumBonus,beginFight,activeStep,resumeFight,env,game};
}
const API={CC_TIERS,RARITIES,EQUIPMENT,MONSTERS,ZONES,POTIONS,POTION_MINUTES,POTION_KIND,FOOD_HEALS,BONE_TYPES,EVENT_PETS,BOSS_PETS,SKILL_PETS,MONSTER_PETS,PRAYERS,TOME_UNLOCKED_PRAYERS,BESTIARY_TIERS,WORLD_BOSS,MUSEUM_TIER_MULT,MUSEUM_BASE,MUSEUM_CAP,MUSEUM_DEF_CAP,MUSEUM_DR_CAP,FORGE_MATERIAL_TIER,ASSET_PATHS,PNG_ICONS,SVG,MONSTER_TINTS,CANDY_KINDS,CANDY_TIERS,CANDY_TIER_AURA,WEATHERS,SEASONS,CANDY_DEFS,getLevel,getXPFor,hpPerDefLvl,getMaxHpFor,getRarityByTier,getItemMaterialTier,museumRarityFactor,museumFamilies,museumWeaponMult,getPngPath,icon,itemIcon,monsterIcon,candyIcon,create};
if(typeof module!=='undefined') module.exports=API;
root.RealmRules=API;
})(globalThis);
