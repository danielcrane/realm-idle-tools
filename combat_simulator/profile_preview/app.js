'use strict';
const R=RealmRules,E=CombatSim,$=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=(v,d=0)=>Number(v).toLocaleString('en-GB',{maximumFractionDigits:d});
const pct=(v,d=1)=>fmt(v*100,d)+'%';
const minsec=ms=>{const s=Math.floor(ms/1000);return s>=3600?`${Math.floor(s/3600)}h ${Math.floor(s%3600/60)}m`:`${Math.floor(s/60)}m ${s%60}s`;};
const labels={weapon:'Weapon',shield:'Off hand',helm:'Head',body:'Body',legs:'Legs',gloves:'Hands',boots:'Feet',ring1:'Ring I',ring2:'Ring II',cape:'Cape',ammo:'Ammo / sigil',amulet:'Neck',pet:'Companion'};
const statLabels={atk:'ATK',str:'STR',def:'DEF',rng:'RNG',mag:'MAG',magic:'MAG',lifesteal:'Lifesteal',dr:'DR',rngBonus:'Flat RNG'};
const potionGroups={atk_pct:'Attack',combat_xp_boost:'Combat XP',damage_reduction:'Damage Reduction',def_pct:'Defence',gold_boost:'Gold',lifesteal:'Lifesteal',mag_pct:'Magic',rng_pct:'Ranged',str_pct:'Strength'};
const potStats=Object.keys(potionGroups);
function potionOptions(value){return Object.entries(potionGroups).map(([stat,label])=>`<optgroup label="${label}">${options(Object.entries(R.POTIONS).filter(([n,p])=>p.stat===stat).sort(([an,a],[bn,b])=>a.value-b.value||(a.flat||0)-(b.flat||0)||a.duration-b.duration||an.localeCompare(bn)).map(([n])=>[n,n]),value)}</optgroup>`).join('');}
let config=E.defaults(),result=null,resultConfig=null,resultStale=false,baseline=null,tab='loadout',running=false,runId=0,pickerState=null,restoredSetup=false,autosaveAvailable=true;
try{const stored=JSON.parse(localStorage.getItem(CharacterProfile.scopedKey('realm-public-combat-profile-preview-v1')));if(stored){config=E.normalize(stored);restoredSetup=true;}}catch{}
try{baseline=JSON.parse(localStorage.getItem(CharacterProfile.scopedKey('realm-public-combat-profile-preview-baseline')));const storedTab=localStorage.getItem(CharacterProfile.scopedKey('realm-public-combat-profile-preview-tab'));if(['loadout','supplies','world'].includes(storedTab))tab=storedTab;}catch{}
function saveMessage(){return autosaveAvailable?(restoredSetup?'Latest setup restored · Autosave on':'Setup saved in this browser · Autosave on'):'Autosave unavailable · Export JSON to keep your setup';}
function save(){try{localStorage.setItem(CharacterProfile.scopedKey('realm-public-combat-profile-preview-v1'),JSON.stringify(config));localStorage.setItem(CharacterProfile.scopedKey('realm-public-combat-profile-preview-tab'),tab);autosaveAvailable=true;}catch{autosaveAvailable=false;}if($('save-state'))$('save-state').textContent=saveMessage();}
function toast(text){$('toast').textContent=text;$('toast').classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').classList.remove('visible'),3500);}
function options(items,value,placeholder){return (placeholder?`<option value="">${esc(placeholder)}</option>`:'')+items.map(([v,t])=>`<option value="${esc(v)}" ${String(v)===String(value)?'selected':''}>${esc(t)}</option>`).join('');}
function select(path,items,value,placeholder){return `<select data-path="${path}">${options(items,value,placeholder)}</select>`;}
function field(label,html){return `<label class="field"><span>${label}</span>${html}</label>`;}
function input(path,value,min=0,max=1e9,step=1){return `<input type="number" data-path="${path}" value="${value}" min="${min}" max="${max}" step="${step}">`;}
function check(path,label,value){return `<label class="check"><input type="checkbox" data-path="${path}" ${value?'checked':''}>${label}</label>`;}
function rarityOptions(value){return options(R.RARITIES.map(r=>[r.tier,r.name]),value);}
function itemImage(name,size=32){return R.itemIcon(name,size);}
function blessingLabel(prayer){return prayer?`Lv. ${prayer.level} · ${prayer.name}`:'Choose a blessing';}
function petImage(name,size=32){const ctx=E.makeContext(config),p=ctx.r.getPetDef(name);return p?R.icon(p.icon,size):R.icon('pet',size);}
function equipmentSlot(s){
 const name=config.equip[s],r=R.getRarityByTier(config.rarities[s]);
 const stats=name?gearDesc(name,r.tier,E.makeContext(config).r.getCombatStyle()).split(' · '):[];
 return `<div class="gear ${name?'':'empty'}"><button class="gear-select" data-pick="${s}" aria-label="${esc(labels[s]+': '+(name||'empty')+(name?', '+r.name:''))}" title="${esc(name?r.name+' · '+stats.join(' · ')+' · Click to change':'Click to equip')}"><span class="slot-label">${labels[s]}</span>${name?itemImage(name,36):'<span class="empty-icon">＋</span>'}<span class="gear-name" ${name?`style="color:${r.color}"`:''}>${esc(name||'Empty')}</span></button>${name?`<button class="gear-rarity" data-gear-rarity="${s}" aria-label="${esc(labels[s])} rarity: ${r.name}" aria-haspopup="dialog" style="--rarity-color:${r.color}" ${R.EQUIPMENT[name]?.infinite&&name!=='Wraith Rune'?'disabled title="Infinite runes use Common rarity"':`title="Change ${r.name} rarity"`}><span>${r.name}</span><span class="rarity-chevron" aria-hidden="true">⌄</span></button><span class="gear-stats">${stats.map(t=>`<span>${esc(t)}</span>`).join('')}</span>`:''}</div>`;
}
function openRarityPicker(slot){
 const tier=config.rarities[slot]||1;pickerState={slot,tier,mode:'rarity'};
 $('picker-title').textContent='Choose Rarity';$('picker-kicker').textContent=config.equip[slot];
 $('picker-controls').innerHTML='';$('picker-items').classList.add('rarity-choices');
 $('picker-items').innerHTML=R.RARITIES.map(r=>`<button class="rarity-choice" data-rarity-choice="${r.tier}" aria-pressed="${r.tier===tier}" style="--rarity-color:${r.color}"><span class="rarity-gem" aria-hidden="true">◆</span><span><b>${r.name}</b><small>Tier ${r.tier}</small></span><span class="rarity-check" aria-hidden="true">${r.tier===tier?'✓':''}</span></button>`).join('');
 $('picker').showModal();$('picker-items').querySelector('[aria-pressed="true"]').focus();
}
function refresh(){config=E.normalize(config);save();renderLoadout();renderSupplies();renderWorld();renderEncounter();renderSnapshot();renderControls();renderComparison();for(const el of document.querySelectorAll('.tabs [role=tab]'))el.setAttribute('aria-selected',el.dataset.tab===tab);for(const id of ['loadout','supplies','world'])$(id).hidden=id!==tab;}
function updateResultState(){
 $('results').classList.toggle('results-stale',resultStale);
 if($('result-stale-notice'))$('result-stale-notice').hidden=!resultStale;
 if($('pin-result'))$('pin-result').textContent=baseline?'Remove pin':resultStale?'Pin previous result':'Pin for comparison';
}
function invalidateResults(){
 if(running){runId++;running=false;setBusy(false);toast('Setup changed. The previous simulation was cancelled.');}
 resultStale=!!result;updateResultState();
 if(!result)$('results').innerHTML='<div class="empty-result panel">Setup updated. Run a new simulation to see your forecast.</div>';
 $('run-status').textContent=resultStale?'Setup changed · Previous results are out of date':'Setup updated · Ready to simulate';
 renderComparison();
}
function changed(){restoredSetup=false;invalidateResults();refresh();}
function renderAdventurerStats(s){
 const stats=[
  ['mag','MAG','Magic','#818cf8',s.stats.mag],['atk','ATK','Attack','#fb923c',s.stats.atk],
  ['str','STR','Strength','#ef4444',s.stats.str],['rng','RNG','Ranged','#4ade80',s.stats.rng],
  ['hp','HP','Maximum HP','#f87171',s.hp],['def','DEF','Defence','#60a5fa',s.stats.def],
  ['ls','LS','Lifesteal','#a78bfa',s.stats.lifesteal,true],['dr','DR','Net damage reduction','#2dd4bf',s.defense.netDR,true]
 ].filter(([key])=>relevantCombatStat(key,s.style));
 $('adventurer-stats').innerHTML=stats.map(([key,label,name,color,value,percent])=>{
  const full=percent?pct(value,2):fmt(value,1);
  const display=!percent&&Math.abs(value)>=100000?Number(value).toLocaleString('en-GB',{notation:'compact',maximumFractionDigits:1}):full;
  return `<div class="adventurer-stat" data-stat="${key}" title="${name}: ${full}" aria-label="${name}: ${full}"><span style="color:${color}">${label}</span><b class="${value<0?'danger':''}">${display}</b></div>`;
 }).join('');
}
function renderLoadout(){
 const snap=E.snapshot(config);$('style-badge').textContent=snap.style;renderAdventurerStats(snap);
 const order=['cape','helm','ammo','weapon','body','shield','gloves','legs','boots','ring1','amulet','ring2'];
 $('loadout').innerHTML=`<div class="panel equipment-panel"><div class="equipment-top"><h3>Equipment</h3></div><div class="gear-grid">${order.map(equipmentSlot).join('')}</div><p class="gear-footnote">Stats include the selected rarity, before character bonuses. Select a slot to change gear.</p><p id="save-state" class="profile-note" role="status">${saveMessage()}</p><div class="companions"><button class="companion" data-pick="pet">${petImage(config.equip.pet,33)}<span><span class="label">Pet</span><b>${esc(config.equip.pet||'Choose a companion')}</b></span></button><button class="companion" data-pick="prayer">${R.icon('divinity',31)}<span><span class="label">Blessing</span><b>${esc(blessingLabel(E.combatBlessings.find(p=>p.id===config.prayer)))}</b></span></button></div>${snap.vampire.pieces?`<p class="note">Vampire set: ${snap.vampire.pieces} pieces · ×${snap.vampire.statMult} combat stats · ${pct(snap.vampire.lifesteal)} lifesteal</p>`:''}</div><div class="panel"><h3>Skill Levels</h3><div class="levels">${E.skillNames.map(s=>field(`${R.icon(s,17)} ${s[0].toUpperCase()+s.slice(1)}`,input('levels.'+s,config.levels[s],1,130))).join('')}</div><p class="note">Combat levels affect base stats, minimum hits, and HP. Divinity only dims blessings above your level; all blessings remain selectable and apply their full effects. Halo occupies your single pet slot.</p></div>`;
}
function renderSupplies(){
 const foodItems=Object.entries(R.FOOD_HEALS).sort((a,b)=>a[1]-b[1]).map(([n,h])=>[n,n+' · '+h+' HP']);
 const ammoItems=Object.entries(R.EQUIPMENT).filter(([n,e])=>e.slot==='ammo'&&!e.infinite&&!e.sigil).map(([n])=>[n,n]);
 $('supplies').innerHTML=`<div class="panel"><div class="panel-title"><h3>Food & Survival</h3><span class="mini-badge">Amounts in inventory</span></div>${config.foods.map((f,i)=>`<div class="supply-row">${itemImage(f.name,28)}<select aria-label="Food ${i+1}" data-array="foods" data-index="${i}" data-key="name">${options(foodItems,f.name)}</select><input aria-label="Food ${i+1} quantity" type="number" min="0" max="1000000000" value="${f.qty}" data-array="foods" data-index="${i}" data-key="qty"><button data-remove="foods" data-index="${i}" aria-label="Remove food">×</button></div>`).join('')}<button class="add-button" data-add="foods">＋ Add food</button>${check('infiniteFood','Unlimited selected food (sustained farming)',config.infiniteFood)}${check('autoEat','Auto-eat enabled',config.autoEat)}<div class="form-grid">${field('Auto-eat threshold (%)',input('threshold',config.threshold,1,100))}${field('Starting HP (%)',input('hpPercent',config.hpPercent,1,100))}</div>${check('foodWorstFirst','Eat weakest food first',config.foodWorstFirst)}<p class="note">Auto-eat also checks the maximum incoming hit. Healing takes no extra attack time. Food must still heal enough to survive.</p></div>
 <div class="panel"><div class="panel-title"><h3>Ammunition & Spells</h3></div><p class="note">Your selected ammo is already equipped. Add <b>spares</b> below; the game’s replacement rules choose the next item. Infinite runes need no stock.</p>${config.ammo.map((a,i)=>`<div class="supply-row ammo-row">${itemImage(a.name,23)}<select aria-label="Spare ammunition ${i+1}" data-array="ammo" data-index="${i}" data-key="name">${options(ammoItems,a.name)}</select><select aria-label="Spare ammunition ${i+1} rarity" data-array="ammo" data-index="${i}" data-key="tier">${rarityOptions(a.tier)}</select><input aria-label="Spare ammunition ${i+1} quantity" type="number" min="0" value="${a.qty}" data-array="ammo" data-index="${i}" data-key="qty"><button data-remove="ammo" data-index="${i}" aria-label="Remove ammunition">×</button></div>`).join('')}<button class="add-button" data-add="ammo">＋ Add spare ammunition</button>${check('infiniteAmmo','Unlimited equipped ammo / spell',config.infiniteAmmo)}${check('ammoWorstFirst','Use weakest ammunition first',config.ammoWorstFirst)}</div>
 <div class="panel"><div class="panel-title"><h3>Potions</h3><span class="mini-badge">One per effect</span></div>${check('infinitePotions','Unlimited potion minutes',config.infinitePotions)}${config.potions.map((p,i)=>`<div class="potions-row"><div class="supply-row">${itemImage(p.name,28)}<select aria-label="Potion ${i+1}" data-array="potions" data-index="${i}" data-key="name">${potionOptions(p.name)}</select><input aria-label="Potion ${i+1} remaining minutes" title="Remaining active minutes" type="number" min="0" step="0.01" value="${p.minutes}" data-array="potions" data-index="${i}" data-key="minutes" ${config.infinitePotions?'disabled':''}><button data-remove="potions" data-index="${i}" aria-label="Remove potion">×</button></div><p>${esc(R.POTIONS[p.name].desc)} · ${config.infinitePotions?'Unlimited minutes':'input = remaining minutes'}</p></div>`).join('')}<button class="add-button" data-add="potions">＋ Add a potion effect</button><p class="note">${config.infinitePotions?'Selected potion effects stay active for the whole simulation.':'Pre-drunk doses extend minutes. Potions expire during the session; they are not automatically renewed.'}</p></div>
 <div class="panel"><h3>Event Candies</h3>${check('infiniteCandies','Unlimited candy duration',config.infiniteCandies)}<p class="note">Combat and XP candy can run together, with one tier per effect. ${config.infiniteCandies?'Selected candies stay active for the whole simulation.':'Each expires independently.'} Gathering and processing candies do not affect combat.</p>${['dmg','xp'].map(kind=>{const row=config.candies.find(c=>R.CANDY_DEFS[c.name].kind===kind);return `<div class="potions-row">${field(kind==='dmg'?'Combat candy':'XP candy',`<select data-candy-kind="${kind}" data-candy-key="name">${options(Object.values(R.CANDY_DEFS).filter(c=>c.kind===kind).map(c=>[c.name,c.name]),row?.name||'','None')}</select>`)}${row?`<div class="form-grid" style="margin-top:12px">${field('Effect strength',`<select data-candy-kind="${kind}" data-candy-key="strength">${options([[.5,'50% · outside event'],[1,'100% · during event']],row.strength)}</select>`)}${field('Minutes remaining',`<input type="number" min="0" max="1440" data-candy-kind="${kind}" data-candy-key="minutes" value="${row.minutes}" ${config.infiniteCandies?'disabled':''}>`)}</div><p class="note">${R.candyIcon(row.name,22)} ${pct(R.CANDY_DEFS[row.name].value*row.strength)} effective ${kind==='dmg'?'damage':'XP'} bonus.</p>`:''}</div>`;}).join('')}</div>`;
}
function renderMuseum(){
 const style=config.museumStyle,values=config.museumByStyle[style];
 const names={melee:'Melee',ranged:'Ranged',magic:'Magic'},icons={melee:'attack',ranged:'ranged',magic:'magic'};
 const fields=Object.keys(R.MUSEUM_BASE[style]).map(k=>{
  const factor=k==='rngBonus'?1:100,max=k==='def'?R.MUSEUM_DEF_CAP[style]:k==='dr'?R.MUSEUM_DR_CAP[style]:R.MUSEUM_CAP[k];
  const value=Number(((values[k]||0)*factor).toFixed(5));
  return field(statLabels[k]+(k==='rngBonus'?'':' (%)'),`<input type="number" min="0" ${max==null?'':`max="${max*factor}"`} step="${k==='rngBonus'?1:.01}" data-museum="${k}" data-museum-for="${style}" value="${value}">`);
 }).join('');
 return `<div class="panel"><h3>Museum</h3>
 <div class="museum-styles" role="group" aria-label="Museum combat style">${Object.keys(names).map(s=>`<button type="button" data-museum-style="${s}" aria-pressed="${s===style}">${R.icon(icons[s],20)}<span>${names[s]}</span></button>`).join('')}</div>
 <p class="note">Enter your displayed ${names[style].toLowerCase()} bonuses. Each style is saved separately. Combat automatically uses your weapon’s style.</p>
 <div class="form-grid museum-fields">${fields}</div></div>`;
}
// Original star artwork used by the in-game store's VIP cards.
function vipIcon(second){return `<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M22,9.81a1,1,0,0,0-.83-.69l-5.7-.78L12.88,3.53a1,1,0,0,0-1.76,0L8.57,8.34l-5.7.78a1,1,0,0,0-.82.69,1,1,0,0,0,.28,1l4.09,3.73-1,5.24A1,1,0,0,0,6.88,20.9L12,18.38l5.12,2.52a1,1,0,0,0,.44.1,1,1,0,0,0,1-1.18l-1-5.24,4.09-3.73A1,1,0,0,0,22,9.81Z" fill="${second?'#a78bfa':'#fbbf24'}"/></svg>`;}
function renderRewards(){
 const vipBonus=(config.vip?0.25:0)+(config.vip2?0.5:0);
 return `<div class="panel reward-panel"><h3>Reward Bonuses</h3><div class="vip-options">${[['vip','VIP I'],['vip2','VIP II']].map(([key,label])=>`<label class="vip-option ${config[key]?'active':''}" style="--vip-color:${key==='vip2'?'#a78bfa':'#fbbf24'}"><span class="vip-name">${vipIcon(key==='vip2')}<b>${label}</b></span><input type="checkbox" data-path="${key}" aria-label="${label}" ${config[key]?'checked':''}></label>`).join('')}</div>
 <p class="reward-summary">VIP: +${pct(vipBonus)} XP · +${pct(vipBonus)} luck</p>
 <div class="community-control">${R.icon('communitycenter',34)}<label for="community-tier">Community centre</label><output id="community-percent" for="community-tier">${config.communityTier*25}%</output></div>
 <input id="community-tier" class="community-slider" type="range" min="0" max="4" step="1" value="${config.communityTier}" data-path="communityTier" aria-label="Community tier" aria-valuetext="${config.communityTier*25}%" aria-describedby="community-summary" style="--community-fill:${config.communityTier*25}%">
 <div class="community-ticks" aria-hidden="true">${[0,25,50,75,100].map(n=>`<span>${n}%</span>`).join('')}</div>
 <p id="community-summary" class="reward-summary">Community: +${pct(config.communityXP)} XP · +${pct(config.communityDrops)} drops</p></div>`;
}
function renderConditions(){
 return `<div class="panel conditions-panel"><h3>Season & Weather</h3><div class="condition-grid">${[['season','Season',R.SEASONS,'fall'],['weather','Weather',R.WEATHERS,'cloudy']].map(([key,label,items,fallback])=>{
 const current=items[config[key]];
 return `<div class="condition-card" style="--condition-color:${current?.color||'#647572'}"><div class="condition-control"><img src="${(current||items[fallback]).icon}" width="30" height="30" alt="" class="${current?'':'inactive'}"><label class="field"><span>${label}</span><select data-path="${key}" aria-label="${label}">${options([['none','None'],...Object.entries(items).map(([k,v])=>[k,v.name])],config[key])}</select></label></div><p class="condition-bonus">${esc(current?.desc||'No bonus')}</p></div>`;
 }).join('')}</div></div>`;
}
function renderWorld(){
 $('world').innerHTML=`${renderConditions()}
 <div class="panel"><h3>Boss Clears</h3><p class="note">Regular zones count qualifying boss clears up to 50%. Event zones get 10% from their own boss; Haunted Hollow requires the Haunted Relic Wraith. The Meadow boss unlocks the Lodge; the Dungeon boss unlocks the Museum.</p><div class="boss-grid">${Object.entries(R.ZONES).map(([id,z])=>({...z,bossId:(R.MONSTERS[id]||[]).find(m=>m.boss)?.id})).filter(z=>z.bossId).map(z=>`<label class="check"><input type="checkbox" data-boss="${z.bossId}" ${config.bosses.includes(z.bossId)?'checked':''}>${esc(z.name)}</label>`).join('')}</div></div>
 <div class="panel"><div class="panel-title"><h3>Hunter’s Lodge</h3><span class="mini-badge">${esc(R.ZONES[config.zone].name)}</span></div><p class="note">Kills for every monster in the selected zone contribute to walking reduction. Target kills also affect damage, defense, and drops.</p>${R.MONSTERS[config.zone].map(m=>`<div class="world-row">${R.monsterIcon(m,25)}<label for="kills-${m.id}">${esc(m.name)}</label><input id="kills-${m.id}" type="number" min="0" max="1000000000000" data-kills="${esc(m.name)}" value="${config.killLog[m.name]||0}"></div>`).join('')}<div class="collection-tools"><select id="lodge-tier" aria-label="Set bestiary tier for selected zone"><option value="0">No milestones</option>${R.BESTIARY_TIERS.map(t=>`<option value="${t.kills}">Tier ${t.label} · ${fmt(t.kills)} kills</option>`).join('')}</select><button id="apply-lodge">Apply to zone</button></div></div>
 ${renderMuseum()}
 ${renderRewards()}`;
}
function renderEncounter(){const m=R.MONSTERS[config.zone].find(m=>m.id===config.target);$('encounter').innerHTML=`<div class="form-grid">${field('Zone',select('zone',Object.values(R.ZONES).map(z=>[z.id,z.name]),config.zone))}${field('Target',select('target',R.MONSTERS[config.zone].map(m=>[m.id,m.name+(m.boss?' · Boss':'')]),config.target))}</div><div class="monster-stage"><div class="monster-art">${R.monsterIcon(m,96)}</div><div><div class="monster-meta">${m.boss?'ZONE BOSS':'MONSTER'} · LEVEL ${m.level}</div><h3 class="monster-name">${esc(m.name)}</h3><div class="monster-stats"><span>HP <b>${fmt(m.hp)}</b></span><span>ATK <b>${fmt(m.atk)}</b></span><span>STR <b>${fmt(m.str)}</b></span><span>DEF <b>${fmt(m.def)}</b></span></div><p class="note">${fmt(m.xp)} base XP · ${fmt(m.gold[0])}–${fmt(m.gold[1])} base gold</p></div></div>`;}
function renderSnapshot(){
 const s=E.snapshot(config),d=s.defense,expanded=$('combat-stats')?.open;
 const row=(label,value)=>`<tr><th scope="row">${label}</th><td>${value}</td></tr>`;
 const statNames={atk:'Attack',str:'Strength',def:'Defence',rng:'Ranged',mag:'Magic'};
 const signed=v=>v===0?'0%':(v>0?'+':'')+pct(v,2);
 $('snapshot').innerHTML=`<div class="snapshot-item"><span class="metric-label">DAMAGE PER HIT</span><strong>${fmt(s.range.min)}–${fmt(s.range.max)}</strong><small>${fmt(s.average,1)} average · starting bonuses</small></div><div class="snapshot-item"><span class="metric-label">COMBAT DPS</span><strong>${fmt(s.dps,1)}</strong><small>Before overkill & downtime</small></div><div class="snapshot-item walk-time-help"><button id="walk-help-toggle" class="metric-label block-help-toggle" aria-label="About walk time" aria-expanded="false" aria-controls="walk-help-tooltip" aria-describedby="walk-help-tooltip">BETWEEN ENEMIES <span aria-hidden="true">?</span></button><strong>${fmt(s.delay,2)}<span style="font-size:13px"> s</span></strong><small>0.8 s death + ${fmt(s.walkSeconds,2)} s mean walk</small>
 <div id="walk-help-tooltip" class="block-tooltip" role="tooltip" hidden><div class="block-tooltip-heading"><b>Walk Time</b><span>${fmt(s.walkSeconds,2)} s mean</span></div><div class="block-formula">1.5 s × (1 − total reduction)</div><p>Active combat rolls a 1–2 second walk after each kill, averaging 1.5 seconds before reductions.</p><dl class="walk-modifiers"><dt>Hunter’s Lodge</dt><dd>${pct(s.walkParts.lodge)}</dd><dt>Boss clears</dt><dd>${pct(s.walkParts.boss)}</dd><dt>Pet</dt><dd>${pct(s.walkParts.pet)}</dd><dt>Total reduction</dt><dd>${pct(1-s.walk)}</dd></dl><p>Lodge milestones across this zone add up to 50% after the Meadow boss is cleared. Each boss cleared in this or a later zone adds 10%, up to 50%. Pet bonuses add on top; the combined reduction caps at 100%.</p><p>Background combat uses the mean walk and carries fractional 0.6-second ticks between kills. Offline combat uses the mean directly.</p><p class="block-tooltip-footer">The <b>0.8 s death delay</b> is always added. Even with no walking, the next attack still waits its normal 0.6 s interval.</p></div></div>
 <div class="snapshot-item defensive-metric"><span class="metric-label">DAMAGE TAKEN</span><strong id="incoming-range">${fmt(d.incoming.min)}–${fmt(d.incoming.max)}</strong><small>Per penetrating hit · blocked attacks deal 0</small></div><div class="snapshot-item defensive-metric"><span class="metric-label">NET DAMAGE REDUCTION</span><strong id="net-dr" class="${d.netDR<0?'danger':''}">${pct(d.netDR,2)}</strong><small>${d.netDR<0?'Damage penalties exceed DR bonuses':'Blessing + potion + museum − penalties'}</small></div><div class="snapshot-item defensive-metric block-chance-help"><button id="block-help-toggle" class="metric-label block-help-toggle" aria-label="About block chance" aria-expanded="false" aria-controls="block-help-tooltip" aria-describedby="block-help-tooltip">BLOCK CHANCE <span aria-hidden="true">?</span></button><strong>${pct(d.blockChance)}</strong><small>Against the selected enemy</small>
 <div id="block-help-tooltip" class="block-tooltip" role="tooltip" hidden><div class="block-tooltip-heading"><b>Block chance</b><span>${pct(d.blockChance)}</span></div><div class="block-formula"><span class="block-fraction"><span>DEF × 0.43</span><span>Enemy ATK + DEF × 0.43</span></span><span>× 100%</span></div><p>Higher DEF means more blocks. Higher enemy ATK means fewer.</p><p>Your DEF includes levels, gear and rarity, blessings, potions, pets, museum bonuses, and equipment sets.</p><p>DR and bestiary mitigation reduce damage separately; they don’t increase block chance.</p><p class="block-tooltip-footer">Blocked attacks deal <b>0 damage</b>.</p></div></div>
 <details id="combat-stats" class="combat-stats" ${expanded?'open':''}><summary>Full Combat Stats & Damage Breakdown</summary><p class="note">Starting setup against the selected enemy. Values can change as potions or candies expire, ammunition switches, or levels increase. Enemies do not retaliate on your killing hit.</p>
 <div class="combat-stat-tables"><div><h3>Effective Stats</h3><table><tbody>${Object.entries(statNames).filter(([k])=>relevantCombatStat(k,s.style)).map(([k,n])=>row(n,fmt(s.stats[k],1))).join('')}${row('Maximum HP',fmt(s.hp))}${row('Lifesteal',pct(s.stats.lifesteal,2))}${row('Regeneration per combat tick',fmt(d.regen,1)+' HP')}${row('Attack interval','0.6 s')}</tbody></table></div>
 <div><h3>Damage Reduction</h3><table><tbody>${row('Blessing',signed(d.drSources.blessing))}${row('Potion',signed(d.drSources.potion))}${row('Museum',signed(d.drSources.museum))}${row('Blessing penalty',signed(d.drSources.blessingPenalty))}${row('Equipment penalty',signed(d.drSources.gearPenalty))}${row('Net DR',pct(d.netDR,2))}${row('Defence mitigation vs enemy',pct(d.armorReduction,2))}${row('Bestiary mitigation vs enemy',pct(d.bestiaryReduction,2))}</tbody></table></div></div>
 <p class="note">Defence mitigation, net DR, and bestiary mitigation apply in sequence with the game’s damage floor and rounding. They are not added together. Net DR below zero increases damage taken.</p>
 <table><tbody>${row('Damage taken per penetrating hit',fmt(d.incoming.min)+'–'+fmt(d.incoming.max))}${row('Average per penetrating hit',fmt(d.incoming.hitAverage,2))}${row('Average per enemy attack (including blocks)',fmt(d.incoming.attackAverage,2))}${row('Enemy penetration chance',pct(s.enemyHitChance))}</tbody></table></details>`;
 $('warnings').innerHTML=s.warnings.map(t=>`<div class="warning">${esc(t)}</div>`).join('');
}
function renderControls(){ $('session-controls').innerHTML=`<div class="form-grid three">${field('Combat mode',select('mode',[['active','Active play'],['background','Background return'],['offline','Cold offline']],config.mode))}${field('Session length',select('minutes',[[5,'5 minutes'],[15,'15 minutes'],[30,'30 minutes'],[60,'1 hour'],[120,'2 hours'],[240,'4 hours'],[480,'8 hours'],[1440,'24 hours']],config.minutes))}${field('Simulated sessions',select('trials',[[16,'16 · quick'],[48,'48 · standard'],[128,'128 · detailed'],[256,'256 · thorough']],config.trials))}</div><details><summary>Simulation Options</summary><div class="form-grid" style="margin-top:12px">${field('Random seed',input('seed',config.seed,0,4294967295))}</div>${check('progression','Apply level-ups and milestones during active play',config.progression)}<p class="note">Fixed levels by default. A repeatable seed helps compare builds; equipment changes can alter the sequence of random events.</p></details>`;}
function resultMarkup(a,c,pinned=false){
 const s=E.snapshot(c),m=R.MONSTERS[c.zone].find(m=>m.id===c.target),factor=60/c.minutes,combat=a.attacks*600,total=Math.max(1,combat+a.deathMs+a.walkMs),danger=a.deathChance>0;
 const notice=pinned?'':'<div id="result-stale-notice" class="result-stale-notice" role="status" hidden><b>Out of date</b><span>Setup changed. These results are from your last completed simulation. Run again to update.</span></div>';
 const lootId=pinned?'pinned-loot-drops-title':'loot-drops-title';
 return `${notice}<div class="results-head"><div><h2>${pinned?'Pinned Run':'Your Combat Forecast'}</h2><p class="note" style="margin-top:4px">${esc(m.name)} · ${c.minutes} min · ${a.n} sessions · ${esc(c.mode)}</p></div>${pinned?'':'<button id="pin-result">Pin for comparison</button>'}</div><div class="panel result-hero"><div><span class="metric-label">KILLS PER HOUR</span><strong class="big">${fmt(a.kph)}<small>kills / hr</small></strong><span class="range">${fmt(a.kphLow)}–${fmt(a.kphHigh)} typical session range</span><p class="note">Mean 95% CI: ${fmt(Math.max(0,a.kph-a.meanError))}–${fmt(a.kph+a.meanError)}</p></div><div class="result-side"><span class="metric-label">SESSION OUTCOME</span><b>${fmt(a.kills)} kills</b><span class="${danger?'danger':'good'}">${danger?pct(a.deathChance)+' of sessions ended in death':'No deaths observed'}</span>${a.ammoChance?`<span class="danger">${pct(a.ammoChance)} ran out of ammo</span>`:''}<span class="muted small">${fmt(a.endingHp)} HP left on average</span></div></div>
 <div class="result-grid"><div class="panel"><span class="metric-label">COMBAT XP / HR</span><strong>${fmt(a.xp*factor)}</strong><small>${s.style==='melee'?'Each: Attack & Strength':s.style==='magic'?'Magic':'Ranged'} · +${fmt(a.defenseXP*factor)} DEF</small></div><div class="panel"><span class="metric-label">GOLD / HR</span><strong>${fmt(a.gold*factor)}</strong><small>Monster gold · no item sales</small></div><div class="panel"><span class="metric-label">FOOD / HR</span><strong>${fmt(a.food*factor,1)}</strong><small>${fmt(a.food,1)} eaten in session</small></div></div>
 <section class="panel loot-drops" aria-labelledby="${lootId}"><div class="panel-title"><h3 id="${lootId}">Items Dropped</h3><span class="mini-badge">Total this session</span></div><p class="note">Expected totals for a ${fmt(c.minutes)}-minute session.</p><div class="loot-grid">${Object.entries(a.loot).filter(([n,q])=>q>0).sort((a,b)=>b[1]-a[1]).map(([n,q])=>`<div class="loot-item" title="${esc(n)}"><span class="loot-art">${itemImage(n,28).replace('loading="lazy"','loading="eager"')}</span><span class="loot-name">${esc(n)}</span><b class="loot-quantity">${fmt(q,1)}</b></div>`).join('')||'<p class="note">No drops expected for this run.</p>'}</div></section>
 <div class="panel"><div class="panel-title"><h3>Where the Time Goes</h3><span class="mini-badge">${pct(1-s.walk)} walking reduction at start</span></div><div class="timing-bar" aria-label="Combat, death delay and walking proportions"><span style="width:${combat/total*100}%"></span><span style="width:${a.deathMs/total*100}%"></span><span style="width:${a.walkMs/total*100}%"></span></div><div class="timing-legend"><span><i style="background:var(--green)"></i>Combat ${minsec(combat)}</span><span><i style="background:var(--gold)"></i>Death delay ${minsec(a.deathMs)}</span><span><i style="background:var(--blue)"></i>Walking ${minsec(a.walkMs)}</span></div><p class="note">Lodge ${pct(s.walkParts.lodge)} + boss clears ${pct(s.walkParts.boss)} + pet ${pct(s.walkParts.pet)}. Total reduction caps at 100%. ${a.deathChance||a.ammoChance?`Average combat stop: ${minsec(a.stopAt)}. Rates include the remaining stopped time.`:''}</p><details class="damage-details"><summary>Damage, Supplies & Survival Details</summary><table><tbody>${[['Attacks per kill',a.kills?fmt(a.attacks/a.kills,2):'No kills'],['Ammo / spells used per hour',fmt(a.ammo*factor,1)],['Total damage dealt',fmt(a.damage)],['Total damage taken',fmt(a.taken)],['Enemy maximum hit at start',fmt(s.incomingMax)],['Enemy penetration chance at start',pct(s.enemyHitChance)],['Lifesteal at start',pct(s.stats.lifesteal,2)],['Regeneration per combat tick',fmt((s.pb.hp_regen?Math.floor(s.pb.hp_regen):0)+(E.makeContext(c).r.getPetDef(c.equip.pet)?.bonus.hp_per_tick||0))]].map(([k,v])=>`<tr><td>${k}</td><td>${v}</td></tr>`).join('')}</tbody></table><p class="note">${c.progression&&c.mode==='active'?'Example final levels: '+Object.entries(a.example.finalLevels).map(([k,v])=>k+' '+v).join(', ')+'. ':''}Potion minutes left in one representative run: ${a.example.potionsRemaining.map(p=>esc(p.name)+' '+(c.infinitePotions?'Unlimited':fmt(p.minutes))).join(', ')||'none'}.</p></details></div>`;
}
function renderResults(){if(!result)return;$('results').innerHTML=resultMarkup(result,resultConfig);updateResultState();renderComparison();}
function renderComparison(){
 if(!baseline){$('comparison').innerHTML='';return;}
 const b=baseline,expanded=$('pinned-run-details')?.open,full=!!(b.result.example&&b.result.loot);
 const delta=result?result.kph-b.result.kph:null;
 const comparable=result&&b.config&&resultConfig.zone===b.config.zone&&resultConfig.target===b.config.target&&resultConfig.mode===b.mode&&resultConfig.minutes===b.minutes;
 $('comparison').innerHTML=`<div class="panel baseline"><div class="panel-title"><h3>Pinned Comparison</h3><button id="clear-baseline" class="text-button">Remove pin</button></div>
 <p class="note">${esc(b.name)} · ${esc(b.mode)} · ${b.minutes} min · ${esc(b.config?.equip?.weapon||'Unarmed')}</p>
 ${result?`<table class="comparison-table"><thead><tr><th>Metric</th><th>Pinned</th><th>${resultStale?'Previous run':'Latest run'}</th><th>Change</th></tr></thead><tbody>
 <tr><td>Kills/hour</td><td data-pinned-kph>${fmt(b.result.kph,1)}</td><td>${fmt(result.kph,1)}</td><td class="${delta>=0?'good':'danger'}">${delta>=0?'+':''}${fmt(delta,1)}</td></tr>
 <tr><td>Food/hour</td><td>${fmt(b.result.food*60/b.minutes,1)}</td><td>${fmt(result.food*60/resultConfig.minutes,1)}</td><td>${fmt(result.food*60/resultConfig.minutes-b.result.food*60/b.minutes,1)}</td></tr>
 </tbody></table><p class="note">${resultStale?'Latest setup has not been simulated; comparison uses the previous completed run.':!comparable?'These runs use different encounters, modes, or durations.':'Small differences within sampling intervals may be noise.'}</p>`:`<p class="pinned-kph" data-pinned-kph>${fmt(b.result.kph,1)} <small>kills/hour</small></p>`}
 ${full?`<details id="pinned-run-details" ${expanded?'open':''}><summary>View Full Pinned Result</summary><div class="pinned-result-body">${resultMarkup(b.result,b.config,true)}</div></details>`:'<p class="note">This older pin contains a summary only. Pin a new run to retain the full result.</p>'}</div>`;
}
function relevantCombatStat(stat,style){const styles={atk:'melee',str:'melee',rng:'ranged',rngBonus:'ranged',mag:'magic',magic:'magic',magicMult:'magic',rangedMult:'ranged',meleeMult:'melee'};return !style||!styles[stat]||styles[stat]===style;}
function gearDesc(name,tier,style){
 const e=R.EQUIPMENT[name],mult=R.getRarityByTier(tier).mult,parts=[];
 for(const k of ['atk','str','def','rng','rngBonus','magic'])if(e[k]&&relevantCombatStat(k,style))parts.push(statLabels[k]+' +'+Math.floor(e[k]*mult));
 for(const [k,label,scale] of [['magicMult','MAG','magicScale'],['rangedMult','RNG','rangedScale'],['meleeMult','Melee','meleeScale']])if(e[k]&&relevantCombatStat(k,style))parts.push(label+' ×'+fmt(e[k]+(mult-1)*(e[scale]||0),3));
 if(e.lifesteal)parts.push(pct(e.lifesteal)+' LS');if(e.drPenalty)parts.push('−'+pct(e.drPenalty)+' DR');if(e.minHit)parts.push('+'+pct(e.minHit)+' minimum hit');if(e.twoHand)parts.push('Two-handed');if(e.infinite)parts.push('Infinite');return parts.join(' · ')||(style?'No '+style+' combat bonuses':'No direct combat stats');
}
function openPicker(slot){pickerState={slot,query:'',tier:config.rarities[slot]||1,filter:'all'};$('picker-title').textContent=slot==='pet'?'Choose a Companion':slot==='prayer'?'Choose a Blessing':'Choose '+labels[slot].replace(/\b(hand|sigil)\b/g,w=>w[0].toUpperCase()+w.slice(1));$('picker-kicker').textContent=slot==='pet'?'ONE PET · ONE BONUS':slot==='prayer'?'DIVINITY':'YOUR LOADOUT';$('picker-controls').innerHTML=`<div class="picker-toolbar"><input id="item-search" type="search" placeholder="Search ${slot==='pet'?'pets':slot==='prayer'?'blessings':'equipment'}…" aria-label="Search choices">${slot!=='pet'&&slot!=='prayer'?`<div class="filter-row"><button data-filter="all" class="active">All</button><button data-filter="melee">Melee</button><button data-filter="ranged">Ranged</button><button data-filter="magic">Magic</button></div><p class="picker-note">A–Z · Stats at ${R.getRarityByTier(pickerState.tier).name} rarity. Set rarity on the equipped item.</p>`:''}</div>`;renderPickerItems();$('picker').showModal();$('item-search').focus();}
function renderPickerItems(){const p=pickerState;let items=[];$('picker-items').classList.remove('rarity-choices');
 if(p.slot==='pet'){items=E.petGroups.map(d=>({value:d.name,name:d.name,desc:d.desc.replace(/<[^>]*>/g,'')+(d.aliases.length?' · Includes '+d.aliases.join(', '):''),art:R.icon(d.icon,39)}));}
 else if(p.slot==='prayer'){items=E.combatBlessings.map(x=>({value:x.id,name:blessingLabel(x),desc:x.desc,aboveLevel:x.level>config.levels.divinity,art:R.icon('divinity',32)}));}
 else {items=Object.entries(R.EQUIPMENT).filter(([n,e])=>e.slot===(p.slot==='ring2'?'ring1':p.slot)).filter(([n,e])=>p.filter==='all'||(p.filter==='magic'?(e.magic||e.magicMult):p.filter==='ranged'?(e.ranged||e.rng||e.rngBonus||e.quiver):(!e.magic&&!e.magicMult&&!e.ranged&&!e.quiver&&!e.rngBonus))).map(([n,e])=>({value:n,name:n,desc:gearDesc(n,p.tier),art:itemImage(n,38)}));}
 if(p.slot!=='pet'&&p.slot!=='prayer')items.sort((a,b)=>a.name.localeCompare(b.name,'en',{sensitivity:'base',numeric:true}));
 items=items.filter(x=>(x.name+' '+x.desc).toLowerCase().includes(p.query.toLowerCase()));$('picker-items').innerHTML=`<button class="pick-item" data-choice=""><span class="empty-icon">−</span><span><b>None</b><small>Leave this slot empty</small></span></button>`+items.map(x=>`<button class="pick-item${x.aboveLevel?' above-level':''}" data-choice="${esc(x.value)}">${x.art}<span><b>${esc(x.name)}</b><small>${esc(x.desc)}</small>${x.aboveLevel?'<small class="level-hint">Above your Divinity level · selectable</small>':''}</span></button>`).join('')+(!items.length?'<p class="no-matches">No matches. Try a different name or filter.</p>':'');}
function removePin(){baseline=null;try{localStorage.removeItem(CharacterProfile.scopedKey('realm-public-combat-profile-preview-baseline'));}catch{}renderComparison();updateResultState();}
function setBusy(value){$('run-btn').disabled=value;$('cancel-btn').hidden=!value;$('progress').hidden=!value;}
async function start(){const warnings=E.snapshot(config).warnings;if(warnings.some(w=>w.startsWith('Equip compatible'))){toast(warnings[0]);return;}const id=++runId,c=E.normalize(config);running=true;setBusy(true);$('progress').value=0;$('run-status').textContent='Preparing simulation…';try{const a=await E.run(c,(done,total)=>{if(id!==runId)return;$('progress').value=100*done/total;$('run-status').textContent=`Simulating session ${done} of ${total}…`;},()=>id!==runId);if(id!==runId)return;result=a;resultConfig=c;resultStale=false;renderResults();$('run-status').textContent=`Complete · ${a.n} seeded sessions`;}catch(err){console.error(err);toast('Simulation failed: '+err.message);$('run-status').textContent='Simulation failed — see error above';}finally{if(id===runId){running=false;setBusy(false);}}}
const helpCardSelector='.block-chance-help, .walk-time-help';
function showMetricHelp(card,show){
 const button=card?.querySelector('.block-help-toggle'),tip=button&&$(button.getAttribute('aria-controls'));if(!tip||!button)return;
 tip.hidden=!show;button.setAttribute('aria-expanded',show);
 if(show){const rect=card.getBoundingClientRect();tip.style.maxHeight='';const below=rect.top<tip.offsetHeight+20&&innerHeight-rect.bottom>rect.top;tip.classList.toggle('below',below);tip.style.maxHeight=`${Math.max(80,(below?innerHeight-rect.bottom:rect.top)-20)}px`;tip.style.transform='';const bounds=tip.getBoundingClientRect();const shift=bounds.left<12?12-bounds.left:bounds.right>innerWidth-12?innerWidth-12-bounds.right:0;tip.style.transform=`translateX(${shift}px)`;}
}
document.addEventListener('pointerover',e=>{const card=e.target.closest(helpCardSelector);if(card&&e.pointerType!=='touch'&&!card.contains(e.relatedTarget))showMetricHelp(card,true);});
document.addEventListener('pointerout',e=>{const card=e.target.closest(helpCardSelector);if(card&&!card.contains(e.relatedTarget)&&!card.contains(document.activeElement)&&card.querySelector('.block-help-toggle').dataset.pinned!=='true')showMetricHelp(card,false);});
document.addEventListener('focusin',e=>{if(e.target.matches('.block-help-toggle'))showMetricHelp(e.target.closest(helpCardSelector),true);});
document.addEventListener('focusout',e=>{if(e.target.matches('.block-help-toggle')){const card=e.target.closest(helpCardSelector);if(!card.contains(e.relatedTarget)&&e.target.dataset.pinned!=='true')showMetricHelp(card,false);}});
document.addEventListener('click',e=>{
 for(const card of document.querySelectorAll(helpCardSelector))if(!card.contains(e.target)){card.querySelector('.block-help-toggle').dataset.pinned='false';showMetricHelp(card,false);}
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.tab){tab=b.dataset.tab;refresh();return;}
 if(b.dataset.museumStyle){config.museumStyle=b.dataset.museumStyle;save();renderWorld();document.querySelector(`[data-museum-style="${config.museumStyle}"]`).focus();return;}
 if(b.dataset.gearRarity){openRarityPicker(b.dataset.gearRarity);return;}
 if(b.dataset.rarityChoice){const slot=pickerState.slot;config.rarities[slot]=+b.dataset.rarityChoice;$('picker').close();changed();document.querySelector(`[data-gear-rarity="${slot}"]`)?.focus();return;}
 if(b.dataset.pick){openPicker(b.dataset.pick);return;}
 if(b.dataset.close){$(b.dataset.close).close();return;}
 if(b.dataset.filter){pickerState.filter=b.dataset.filter;for(const x of document.querySelectorAll('[data-filter]'))x.classList.toggle('active',x===b);renderPickerItems();return;}
 if('choice'in b.dataset){const {slot,tier}=pickerState,name=b.dataset.choice;if(slot==='prayer')config.prayer=name;else{config.equip[slot]=name||null;config.rarities[slot]=tier;}
  const requested=cloneConfig(config.equip);config=E.normalize(config);$('picker').close();changed();if(name&&slot!=='prayer'&&config.equip[slot]!==name)toast('This item is incompatible with the equipped weapon. Choose a compatible weapon first.');else if(Object.keys(requested).some(k=>requested[k]&&!config.equip[k]))toast('Incompatible off-hand or ammunition was unequipped.');return;
 }
 if(b.dataset.remove){config[b.dataset.remove].splice(+b.dataset.index,1);changed();return;}
 if(b.dataset.add){const type=b.dataset.add;if(type==='foods')config.foods.push({name:'Cooked Salmon',qty:1000});if(type==='ammo'){const name=R.EQUIPMENT[config.equip.ammo]?.infinite?null:config.equip.ammo;config.ammo.push({name:name||'Copper Arrows',tier:config.rarities.ammo||1,qty:10000});}if(type==='potions'){const used=new Set(config.potions.map(p=>R.POTIONS[p.name].stat));const p=Object.entries(R.POTIONS).find(([n,p])=>potStats.includes(p.stat)&&!used.has(p.stat));if(!p){toast('All combat potion effects are already selected.');return;}config.potions.push({name:p[0],minutes:p[1].duration/60000});}changed();return;}
 switch(b.id){
 case 'block-help-toggle':case 'walk-help-toggle':b.dataset.pinned=b.dataset.pinned!=='true';showMetricHelp(b.closest(helpCardSelector),b.dataset.pinned==='true');break;
 case 'run-btn':start();break;
 case 'cancel-btn':runId++;running=false;setBusy(false);$('run-status').textContent='Cancelled';break;
 case 'method-btn':case 'footer-method':$('method').showModal();break;
 case 'apply-lodge':for(const m of R.MONSTERS[config.zone])config.killLog[m.name]=+$('lodge-tier').value;changed();break;
 case 'pin-result':if(baseline){removePin();break;}if(result){baseline=cloneConfig({name:R.MONSTERS[resultConfig.zone].find(m=>m.id===resultConfig.target).name,mode:resultConfig.mode,minutes:resultConfig.minutes,result,config:resultConfig});let saved=true;try{localStorage.setItem(CharacterProfile.scopedKey('realm-public-combat-profile-preview-baseline'),JSON.stringify(baseline));}catch{saved=false;}renderComparison();updateResultState();toast(saved?'Full result pinned above the current forecast.':'Result pinned for this visit; browser storage is unavailable.');}break;
 case 'clear-baseline':removePin();break;
 case 'export-btn':{const blob=new Blob([setupJSON()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='realm-combat-setup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);break;}
 case 'share-btn':openShare();break;
 case 'share-copy-mode':setShareMode('copy');break;
 case 'share-paste-mode':setShareMode('paste');break;
 case 'share-copy-btn':copyShare();break;
 case 'share-load-btn':loadShare();break;
 case 'import-btn':$('import-file').click();break;
 case 'reset-btn':config=E.defaults();changed();toast('Default setup restored. Your pinned comparison is kept.');break;
 }
});
document.addEventListener('input',e=>{
 const x=e.target;
 if(x.id==='item-search'){pickerState.query=x.value;renderPickerItems();return;}
 if(x.id==='community-tier'){
  config=E.normalize({...config,communityTier:+x.value});restoredSetup=false;save();invalidateResults();
  const percent=config.communityTier*25+'%';$('community-percent').textContent=percent;x.setAttribute('aria-valuetext',percent);x.style.setProperty('--community-fill',percent);
  $('community-summary').textContent=`Community: +${pct(config.communityXP)} XP · +${pct(config.communityDrops)} drops`;return;
 }
 // Persist valid numeric edits without replacing the focused input mid-typing.
 if(x.type!=='number'||x.value===''||!x.validity.valid)return;
 const value=Number(x.value);if(!Number.isFinite(value))return;
 if(x.dataset.path){const parts=x.dataset.path.split('.');let at=config;for(const p of parts.slice(0,-1))at=at[p];at[parts.at(-1)]=value;}
 else if(x.dataset.array)config[x.dataset.array][+x.dataset.index][x.dataset.key]=value;
 else if(x.dataset.kills)config.killLog[x.dataset.kills]=value;
 else if(x.dataset.museum)config.museumByStyle[x.dataset.museumFor][x.dataset.museum]=value/(x.dataset.museum==='rngBonus'?1:100);
 else if(x.dataset.percent)config[x.dataset.percent]=value/100;
 else if(x.dataset.candyKind){const row=config.candies.find(c=>R.CANDY_DEFS[c.name].kind===x.dataset.candyKind);if(row)row[x.dataset.candyKey]=value;}
 else return;
 restoredSetup=false;save();invalidateResults();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){let dismissed=false;for(const card of document.querySelectorAll(helpCardSelector))if(!card.querySelector('[role="tooltip"]').hidden){card.querySelector('.block-help-toggle').dataset.pinned='false';showMetricHelp(card,false);dismissed=true;}if(dismissed){e.preventDefault();return;}for(const id of ['picker','method','share-dialog'])if($(id).open){e.preventDefault();$(id).close();break;}}},true);
document.addEventListener('change',e=>{const x=e.target;
 if(x.dataset.candyKind){const kind=x.dataset.candyKind,key=x.dataset.candyKey,row=config.candies.find(c=>R.CANDY_DEFS[c.name].kind===kind);if(key==='name'){config.candies=config.candies.filter(c=>R.CANDY_DEFS[c.name].kind!==kind);if(x.value)config.candies.push({name:x.value,minutes:R.CANDY_DEFS[x.value].duration/60000,strength:row?.strength??.5});}else if(row)row[key]=+x.value;changed();return;}
 if(x.dataset.path){const parts=x.dataset.path.split('.');let at=config;for(const p of parts.slice(0,-1))at=at[p];at[parts.at(-1)]=x.type==='checkbox'?x.checked:x.type==='number'?+x.value:x.value;changed();return;}
 if(x.dataset.array){const row=config[x.dataset.array][+x.dataset.index];row[x.dataset.key]=['qty','tier','minutes'].includes(x.dataset.key)?+x.value:x.value;if(x.dataset.array==='potions'&&x.dataset.key==='name'){row.minutes=R.POTIONS[x.value].duration/60000;config.potions=config.potions.filter((p,i)=>i===+x.dataset.index||R.POTIONS[p.name].stat!==R.POTIONS[row.name].stat);}changed();return;}
 if(x.dataset.boss){config.bosses=config.bosses.filter(b=>b!==x.dataset.boss);if(x.checked)config.bosses.push(x.dataset.boss);changed();return;}
 if(x.dataset.kills){config.killLog[x.dataset.kills]=+x.value;changed();return;}
 if(x.dataset.museum){config.museumByStyle[x.dataset.museumFor][x.dataset.museum]=+x.value/(x.dataset.museum==='rngBonus'?1:100);changed();return;}
 if(x.dataset.percent){config[x.dataset.percent]=+x.value/100;changed();return;}
});
$('import-file').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>2000000)throw Error('Setup file is too large.');config=readSetupJSON(await f.text());changed();toast('Setup imported.');}catch(err){toast('Could not import: '+err.message);}e.target.value='';});
let shareMode='copy',shareCode='',shareDraft='',shareGeneration=0;
function setupJSON(){return JSON.stringify({simulator:'Realm Idle Combat Lab',version:1,config:E.normalize(config)},null,2);}
function readSetupJSON(text){
 if(new TextEncoder().encode(text).length>2000000)throw Error('Setup is too large.');
 let data;try{data=JSON.parse(text);}catch{throw Error('Invalid setup JSON.');}
 if(data?.simulator!=='Realm Idle Combat Lab'||data.version!==1||!data.config?.equip||typeof data.config.equip!=='object'||Array.isArray(data.config.equip))throw Error('Use a Combat Lab setup, not a game save.');
 return E.normalize(data.config);
}
function setShareMode(mode){
 if(shareMode==='paste')shareDraft=$('share-text').value;
 shareMode=mode;$('share-text').readOnly=mode==='copy';$('share-text').value=mode==='copy'?shareCode:shareDraft;
 $('share-copy-mode').setAttribute('aria-pressed',mode==='copy');$('share-paste-mode').setAttribute('aria-pressed',mode==='paste');
 $('share-copy-btn').hidden=mode!=='copy';$('share-load-btn').hidden=mode!=='paste';
 $('share-help').textContent=mode==='copy'?'Copy this code to share your current setup.':'Paste a Combat Lab setup code below, then load it.';
 $('share-status').textContent='';$('share-text').focus();if(mode==='copy')$('share-text').select();
}
async function openShare(){
 const generation=++shareGeneration;shareDraft='';shareCode='';shareMode='copy';$('share-dialog').showModal();setShareMode('copy');$('share-copy-btn').disabled=true;$('share-status').textContent='Preparing setup code…';
 try{const code=await SetupCodec.encode(setupJSON());if(generation!==shareGeneration)return;shareCode=code;$('share-copy-btn').disabled=false;if(shareMode==='copy'){$('share-text').value=code;$('share-status').textContent='';}}catch(err){$('share-status').textContent=err.message;}
}
async function copyShare(){
 try{await navigator.clipboard.writeText(shareCode);$('share-status').textContent='Setup code copied.';}
 catch{$('share-text').focus();$('share-text').select();$('share-status').textContent='Code selected. Press Ctrl+C or use your browser’s Copy command.';}
}
async function loadShare(){
 $('share-load-btn').disabled=true;$('share-status').textContent='Reading setup code…';
 try{const text=await SetupCodec.decode($('share-text').value),loaded=readSetupJSON(text);if(!$('share-dialog').open)return;config=loaded;changed();$('share-dialog').close();toast('Setup loaded from code.');}
 catch(err){$('share-status').textContent=err.message;}
 finally{$('share-load-btn').disabled=false;}
}
function cloneConfig(x){return JSON.parse(JSON.stringify(x));}
for(const id of ['picker','method','share-dialog'])$(id).addEventListener('click',e=>{if(e.target===$(id)){const rect=$(id).getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)$(id).close();}});
refresh();
// The preview waits for the user to run a simulation.
