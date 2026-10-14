/* Standalone editor: each character has an independent profile storage key. */
(() => {
  'use strict';
  if(window.ProfileStorageLink?.active)return;
  const M=CharacterProfile,R=M.R,$=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=(n,d=0)=>n.toLocaleString('en-GB',{maximumFractionDigits:d});
  const statNames={atk:'Attack',str:'Strength',def:'Defense',rng:'Ranged',mag:'Magic',dr:'Damage Reduction',rngBonus:'Flat Ranged',lifesteal:'Lifesteal'};
  const styles={melee:'Melee',ranged:'Ranged',magic:'Magic'};
  const selections={combat:null,skilling:null};
  let profile=M.defaults(),pendingImport=null,importSource='file',storageBlocked=false,dirty=false,zone='meadow';
  let shareMode='copy',shareCode='',shareDraft='',shareGeneration=0;
  let inventoryUI;
  const options=(rows,value)=>rows.map(([id,label])=>`<option value="${esc(id)}" ${String(id)===String(value)?'selected':''}>${esc(label)}</option>`).join('');
  const rarities=value=>options(R.RARITIES.map(r=>[r.tier,r.name]),value);
  const art=(key,size=30)=>R.icon(key,size).replaceAll('src="Assets/','src="combat_simulator/Assets/');
  const itemArt=(name,size=42)=>R.itemIcon(name,size).replaceAll('src="Assets/','src="combat_simulator/Assets/').replace(/alt="[^"]*"/g,`alt="${esc(name)}"`);
  let skillingPicker=null;
  function message(text,error=false){$('message').textContent=text;$('message').hidden=!text;$('message').classList.toggle('error',error);}
  function save(){
    dirty=false;
    if(storageBlocked){$('save-status').textContent='Autosave paused · Export a backup to keep your edits.';return;}
    try{localStorage.setItem(M.STORAGE_KEY,JSON.stringify(profile));document.dispatchEvent(new Event('character-saved'));$('save-status').textContent='Saved in this browser · '+new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});}
    catch{$('save-status').textContent='Browser storage unavailable · Export a backup to keep your edits.';}
  }
  function summary(){
    $('sidebar-name').textContent=profile.name;
    $('total-level').textContent=fmt(Object.values(profile.skills).reduce((n,s)=>n+s.level,0));
    $('pet-total').textContent=profile.pets.length;$('museum-total').textContent=Object.keys(profile.museum.items).length;$('set-total').textContent=profile.combatSets.length;
  }
  function commit(mutator,render){
    try{const next=structuredClone(profile);mutator(next);profile=M.validate(next);save();summary();message('');if(render)render();return true;}
    catch(e){message(e.message,true);$('save-status').textContent='This edit has not been saved.';dirty=true;return false;}
  }
  function validDraft(){
    const bad=[...document.querySelectorAll('[data-edit],#profile-name')].find(el=>!el.checkValidity());
    if(bad){bad.reportValidity();message('Correct the highlighted field before continuing. Your last valid profile is still saved.',true);return false;}return true;
  }
  function skillCard(key){const s=profile.skills[key];return `<div class="skill-card"><div class="skill-title">${art(key==='alchemy'?'potion':key,25)}${esc(M.skills[key])}</div><div class="skill-inputs"><label>Level<input data-edit="level" data-skill="${key}" aria-label="${M.skills[key]} level" type="number" min="1" max="130" step="1" required value="${s.level}"></label><label>Total XP <span class="sr-only">(optional)</span><input data-edit="xp" data-skill="${key}" aria-label="${M.skills[key]} total XP" type="text" inputmode="numeric" autocomplete="off" placeholder="Optional" value="${s.xp===null?'':fmt(s.xp)}"></label></div></div>`;}
  function renderSkills(){
    $('skill-groups').innerHTML=[['Combat Skills',M.combatSkills],['Gathering & Artisan Skills',Object.keys(M.X.skills).filter(k=>!['divinity','thieving'].includes(k))],['Support Skills',['divinity','thieving']]].map(([title,keys])=>`<div class="panel"><h3>${title}</h3><div class="skill-grid">${keys.map(skillCard).join('')}</div></div>`).join('')+'<p class="note">Levels run from 1 to 130. Enter total accumulated XP, not XP within the current level. Changing a level clears its exact XP so the two values stay consistent.</p>';
  }
  function renderPets(){
    const search=$('pet-search').value.toLowerCase().trim(),category=$('pet-category').value,owned=$('pets-owned-only').checked;
    const rows=M.pets.filter(p=>(!category||p.categories.includes(category))&&(!owned||profile.pets.includes(p.name))&&(!search||p.variants.some(v=>(v.name+' '+v.desc).toLowerCase().includes(search))));
    $('pet-results').textContent=`${rows.length} pet groups shown · ${profile.pets.length} owned`;
    $('pet-grid').innerHTML=rows.length?rows.map(p=>`<label class="pet-card"><span class="pet-copy"><b>${esc(p.name)}</b><span class="pet-variants">${p.variants.map(v=>`<span class="pet-variant" title="${esc(v.name)}">${art(v.icon,35).replace(/alt="[^"]*"/g,`alt="${esc(v.name)}"`)}</span>`).join('')}</span><small>${esc(p.desc.replace(/<[^>]*>/g,''))}</small></span><input data-edit="pet" data-pet="${esc(p.name)}" type="checkbox" aria-label="Own ${esc(p.name)}" ${profile.pets.includes(p.name)?'checked':''}></label>`).join(''):'<div class="empty"><h3>No Matching Pets</h3><p>Try another search or turn off the owned-only filter.</p></div>';
  }
  function renderMuseumOptions(){
    renderMuseumCollection();
  }
  const museumOpen=new Set();
  let museumStyle='melee';
  function renderMuseumCollection(){
    const search=$('museum-search').value.trim().toLowerCase(),style=museumStyle;
    const slots=['weapon','shield','helm','body','legs','gloves','boots','ring1','cape','amulet'];
    const rank=e=>slots.includes(e.slot)?slots.indexOf(e.slot):99;
    const power=e=>(e.atk||0)+(e.str||0)+(e.rng||0)+(e.magic||0);
    const rows=M.museumItems.filter(n=>R.museumFamilies(n).includes(style)).sort((a,b)=>{const x=R.EQUIPMENT[a],y=R.EQUIPMENT[b];return Number(!!y.legendary)-Number(!!x.legendary)||rank(x)-rank(y)||Number(!!x.twoHand)-Number(!!y.twoHand)||power(x)-power(y)||a.localeCompare(b);});
    const ashlyn=[...R.WORLD_BOSS.gearWeapons,...R.WORLD_BOSS.gearArmor];
    const groups=[['ashlyn',R.WORLD_BOSS.name,rows.filter(n=>ashlyn.includes(n))],...Array.from({length:9},(_,i)=>{const tier=9-i;return [String(tier),'Tier '+(tier-1),rows.filter(n=>!ashlyn.includes(n)&&R.getItemMaterialTier(n)===tier)];})];
    $('museum-list').innerHTML=groups.map(([id,label,all])=>{
      const items=all.filter(n=>n.toLowerCase().includes(search));if(!items.length)return '';
      const key=style+'_'+id,count=all.filter(n=>profile.museum.items[n]).length;
      return `<details class="museum-tier" data-museum-tier="${key}" ${search||museumOpen.has(key)?'open':''}><summary><b>${esc(label)}</b><span>${count}/${all.length} Collected</span></summary><div class="museum-pieces">${items.map(name=>{
        const tier=profile.museum.items[name]||0,color=tier?R.getRarityByTier(tier).color:'var(--muted)';
        const factor=tier?(R.MUSEUM_TIER_MULT[R.getItemMaterialTier(name)]||0)*R.museumRarityFactor(tier)*R.museumWeaponMult(name,style):0;
        const shortStats={atk:'ATK',str:'STR',def:'DEF',rng:'RNG',mag:'MAG',dr:'DR',rngBonus:'Flat RNG',lifesteal:'LS'};
        const bonus=Object.entries(R.MUSEUM_BASE[style]).filter(([,base])=>base*factor>0).map(([stat,base])=>`<span title="${statNames[stat]}">+${(base*factor*(stat==='rngBonus'?1:100)).toLocaleString('en-GB',{maximumSignificantDigits:3})}${stat==='rngBonus'?'':'%'} ${shortStats[stat]}</span>`).join('');
        return `<div class="museum-piece ${tier?'owned':'unowned'}" style="--rarity-color:${color}">${itemArt(name,28)}<span><b>${esc(name)}</b>${tier?`<small class="museum-item-bonuses" aria-label="${esc(styles[style])} museum contribution before caps" title="${esc(styles[style])} museum contribution before collection caps. Applies when the Museum is unlocked and Recorded Collection is selected.">${bonus}</small>`:'<small>Not Collected</small>'}</span><label><span class="sr-only">${esc(name)} rarity</span><select data-edit="museum-rarity" data-item="${esc(name)}">${options([[0,'Unowned'],...R.RARITIES.map(r=>[r.tier,r.name])],tier)}</select></label></div>`;
      }).join('')}</div></details>`;
    }).join('')||'<p class="note">No matching items in this combat style.</p>';
    $('museum-list').querySelectorAll('details').forEach(el=>el.addEventListener('toggle',()=>{if(!el.isConnected||search)return;if(el.open)museumOpen.add(el.dataset.museumTier);else museumOpen.delete(el.dataset.museumTier);}));
  }
  function renderMuseumBonuses(){
    const unlocked=profile.account.bosses.includes('dungeon_boss'),bonuses=M.museumBonuses(profile);
    $('museum-unlock').textContent=unlocked?'Museum unlocked · Bonuses below use your selected bonus source.':'Museum locked · Record your collection now. Bonuses activate when you mark the Ancient Dungeon boss as cleared in Account & Unlocks.';
    $('museum-bonuses').innerHTML=Object.entries(bonuses).map(([style,stats])=>`<div class="panel"><h3>${styles[style]}</h3><dl>${Object.entries(stats).map(([k,v])=>`<div><dt>${statNames[k]}</dt><dd>+${fmt(k==='rngBonus'?v:v*100,3)}${k==='rngBonus'?'':'%'}</dd></div>`).join('')}</dl></div>`).join('');
  }
  function renderMuseum(){
    renderMuseumBonuses();$('museum-mode').value=profile.museum.mode;
    $('museum-manual').hidden=profile.museum.mode!=='manual';
    $('museum-manual').innerHTML='<h3>Displayed In-Game Bonuses</h3><p class="muted">Enter the bonuses shown in the game for each style. These replace collection-derived bonuses; they are never added together.</p><div class="three-col">'+Object.entries(profile.museum.manual).map(([style,stats])=>`<div><h3>${styles[style]}</h3>${Object.entries(stats).map(([k,v])=>`<label class="manual-field">${statNames[k]}${k==='rngBonus'?'':' (%)'}<input data-edit="museum-bonus" data-style="${style}" data-stat="${k}" type="number" min="0" max="${M.cap(style,k)*(k==='rngBonus'?1:100)}" step="any" required value="${Number((v*(k==='rngBonus'?1:100)).toFixed(8))}"></label>`).join('')}</div>`).join('')+'</div>';
    renderMuseumCollection();
  }
  function currentSet(kind){const rows=profile[kind+'Sets'];return rows.find(s=>s.id===selections[kind])||rows[0];}
  function uniqueName(kind,base){const names=profile[kind+'Sets'].map(s=>s.name.toLowerCase());let name=base,i=2;while(names.includes(name.toLowerCase()))name=base+' '+i++;return name;}
  const combatOrder=['cape','helm','ammo','weapon','body','shield','gloves','legs','boots','ring1','amulet','ring2'];
  let combatPicker=null;
  const plain=s=>String(s||'').replace(/<[^>]*>/g,'');
  function combatGearDescription(name,tier){
    const e=R.EQUIPMENT[name],mult=R.getRarityByTier(tier).mult,parts=[];
    for(const [key,label] of [['atk','ATK'],['str','STR'],['def','DEF'],['rng','RNG'],['rngBonus','Flat RNG'],['magic','MAG']])if(e[key])parts.push(label+' +'+fmt(Math.floor(e[key]*mult)));
    for(const [key,label,scale] of [['magicMult','MAG','magicScale'],['rangedMult','RNG','rangedScale'],['meleeMult','Melee','meleeScale']])if(e[key])parts.push(label+' ×'+fmt(e[key]+(mult-1)*(e[scale]||0),3));
    for(const [key,label] of [['lifesteal','lifesteal'],['drPenalty','DR penalty'],['minHit','minimum hit']])if(e[key])parts.push(fmt(e[key]*100,1)+'% '+label);
    if(e.twoHand)parts.push('Two-handed');if(e.infinite)parts.push('Infinite');
    return parts.join(' · ')||'No direct combat stats';
  }
  function combatGearTile(set,slot){
    const item=set.equipment[slot],r=item?R.getRarityByTier(item.rarity):{name:'None',color:'#a0b0b0'};
    const blocked=slot==='shield'&&R.EQUIPMENT[set.equipment.weapon?.name]?.twoHand;
    return `<div class="skilling-gear combat-gear ${item?'':'unselected'}" style="--rarity-color:${r.color}"><button class="skilling-gear-face" data-combat-pick="${slot}" aria-label="${M.slots[slot]}: ${esc(item?.name||'None')}" aria-haspopup="dialog" ${blocked?'disabled':''}><span class="slot-label">${M.slots[slot]}</span>${item?itemArt(item.name):'<span class="empty-gear-icon" aria-hidden="true">＋</span>'}<b class="skilling-gear-name">${esc(item?.name||(blocked?'Two-Handed Weapon Equipped':'Choose Gear'))}</b></button>${item?`<button class="gear-rarity" data-combat-rarity="${slot}" aria-label="${M.slots[slot]} rarity: ${r.name}" aria-haspopup="dialog" ${R.EQUIPMENT[item.name]?.infinite?'disabled title="Infinite runes use Common rarity"':''}><span>${r.name}</span><span aria-hidden="true">⌄</span></button><small class="combat-gear-stats">${esc(combatGearDescription(item.name,item.rarity))}</small>`:''}</div>`;
  }
  function renderSets(kind){
    if(kind==='skilling'){renderSkillingGear();return;}
    const rows=profile.combatSets,el=$('combat-sets'),set=currentSet('combat');
    if(!set){el.innerHTML='<div class="empty"><div class="empty-symbol" aria-hidden="true">⚔</div><h3>A Setup for Every Encounter</h3><p>Create sets such as “Melee Sustain” and “Ranged Farming.”</p><button type="button" data-new-set="combat">Create Your First Set</button></div>';return;}
    selections.combat=set.id;
    const pet=M.pets.find(p=>p.name===set.pet),blessing=M.blessings.find(b=>b.id===set.blessing);
    const weapon=R.EQUIPMENT[set.equipment.weapon?.name],style=!weapon?'none':weapon.magic?'magic':weapon.ranged?'ranged':'melee';
    const styleLabel=weapon?'Combat style: '+styles[style]:'No weapon selected';
    const styleBadge=`<span class="combat-style" data-combat-style="${style}" role="img" aria-label="${styleLabel}" title="${styleLabel}">${art(style==='none'?'combat':style==='melee'?'attack':style,25)}</span>`;
    el.innerHTML=`<div class="set-chips" aria-label="Saved combat sets">${rows.map(s=>`<button type="button" data-select-set="${esc(s.id)}" data-kind="combat" aria-pressed="${s.id===set.id}">${esc(s.name)}</button>`).join('')}</div><div class="panel"><div class="set-toolbar"><label>Set Name<span class="set-name-field">${styleBadge}<input data-edit="set-name" data-kind="combat" maxlength="80" required value="${esc(set.name)}"></span></label><div class="actions"><button type="button" data-duplicate="combat">Duplicate Set</button><button type="button" class="danger" data-delete="combat">Delete Set</button></div></div><div class="gear-grid combat-gear-grid">${combatOrder.map(slot=>combatGearTile(set,slot)).join('')}</div><div class="combat-companions"><button class="companion-choice" data-combat-pick="pet" aria-haspopup="dialog">${art(pet?.icon||'pet',36)}<span><small>Pet</small><b>${esc(set.pet||'Choose a Companion')}</b></span></button><button class="companion-choice" data-combat-pick="blessing" aria-haspopup="dialog">${art('divinity',36)}<span><small>Blessing</small><b>${blessing?'Lv. '+blessing.level+' · '+esc(blessing.name):'Choose a Blessing'}</b></span></button></div><div class="set-warnings">${M.warnings(profile,set).map(w=>`<p class="warning">${esc(w)}</p>`).join('')}</div><p class="note">Select a slot to change gear, or a colored badge to change rarity. Stats include rarity, before character bonuses. Two-handed weapons clear the off-hand slot. Infinite runes always use Common rarity. Set edits save automatically.</p></div>`;
  }
  function openCombatPicker(slot,mode='gear'){
    if(!validDraft())return;const set=currentSet('combat');if(!set)return;
    if(slot==='shield'&&R.EQUIPMENT[set.equipment.weapon?.name]?.twoHand)return;
    if(mode==='rarity'&&(!set.equipment[slot]||R.EQUIPMENT[set.equipment[slot].name]?.infinite))return;
    combatPicker={setId:set.id,slot,mode,filter:'all'};
    $('combat-picker-context').textContent=set.name+(mode==='rarity'?' · '+set.equipment[slot].name:'');
    $('combat-picker-title').textContent=mode==='rarity'?'Choose Rarity':slot==='pet'?'Choose a Companion':slot==='blessing'?'Choose a Blessing':'Choose '+M.slots[slot];
    $('combat-picker-controls').innerHTML=mode==='rarity'?'':`<label class="picker-search">Search ${slot==='pet'?'Pets':slot==='blessing'?'Blessings':'Gear'}<input id="combat-search" type="search" placeholder="Search choices…"></label>${!['pet','blessing'].includes(slot)?'<div class="combat-filters" role="group" aria-label="Combat Style">'+['all','melee','ranged','magic'].map(f=>`<button data-combat-filter="${f}" aria-pressed="${f==='all'}">${f[0].toUpperCase()+f.slice(1)}</button>`).join('')+'</div>':''}<p class="note">${slot==='pet'?'Choose from pets marked as owned in your profile.':slot==='blessing'?'Availability uses your Divinity level and unlocked tomes.':'A–Z · Stats include the current slot rarity. Set rarity on the equipped item.'}</p>`;
    renderCombatChoices();$('combat-picker').showModal();
    ($('combat-search')||$('combat-picker-items').querySelector('[aria-pressed="true"]')||$('combat-picker-items').querySelector('button')).focus();
  }
  function renderCombatChoices(){
    const {setId,slot,mode,filter}=combatPicker,set=profile.combatSets.find(s=>s.id===setId),el=$('combat-picker-items'),item=set.equipment[slot],tier=item?.rarity||1;
    el.className=mode==='rarity'?'rarity-choices':'gear-choices';
    if(mode==='rarity'){
      el.innerHTML=R.RARITIES.map(r=>`<button class="rarity-choice" data-combat-tier="${r.tier}" aria-pressed="${r.tier===tier}" style="--rarity-color:${r.color}"><span class="rarity-gem" aria-hidden="true">◆</span><span><b>${r.name}</b><small>Tier ${r.tier}</small></span>${r.tier===tier?'<span class="rarity-check" aria-hidden="true">✓</span>':''}</button>`).join('');return;
    }
    let rows=[];
    if(slot==='pet')rows=M.pets.map(p=>({value:p.name,name:p.name,search:p.variants.map(v=>v.name).join(' '),desc:plain(p.desc),art:'<span class="picker-pet-icons">'+p.variants.map(v=>art(v.icon,32).replace(/alt="[^"]*"/g,`alt="${esc(v.name)}"`)).join('')+'</span>',disabled:!profile.pets.includes(p.name)&&set.pet!==p.name,hint:profile.pets.includes(p.name)?'Owned':'Not marked as owned'}));
    else if(slot==='blessing')rows=M.blessings.map(b=>({value:b.id,name:'Lv. '+b.level+' · '+b.name,desc:plain(b.desc),art:art('divinity',34),disabled:!M.blessingAvailable(profile,b.id),hint:M.blessingAvailable(profile,b.id)?'':'Locked · Requires Divinity or an unlocked tome'}));
    else rows=M.gearOptions('combat',null,slot).filter(name=>{
      const e=R.EQUIPMENT[name];return filter==='all'||(filter==='magic'?(e.magic||e.magicMult):filter==='ranged'?(e.ranged||e.rng||e.rngBonus||e.quiver):(!e.magic&&!e.magicMult&&!e.ranged&&!e.quiver&&!e.rngBonus));
    }).map(name=>({value:name,name,desc:combatGearDescription(name,R.EQUIPMENT[name].infinite?1:tier),art:itemArt(name)}));
    const query=($('combat-search')?.value||'').toLowerCase().trim();rows=rows.filter(r=>(r.name+' '+r.desc+' '+(r.search||'')).toLowerCase().includes(query));
    const selected=slot==='pet'?set.pet:slot==='blessing'?set.blessing:item?.name||'';
    el.innerHTML=`<button class="gear-choice" data-combat-choice="" aria-pressed="${!selected}"><span class="empty-gear-icon" aria-hidden="true">−</span><span><b>None</b><small>Leave this slot empty</small></span></button>`+rows.map(r=>`<button class="gear-choice" data-combat-choice="${esc(r.value)}" aria-pressed="${r.value===selected}" ${r.disabled?'disabled':''}>${r.art}<span><b>${esc(r.name)}</b><small>${esc(r.desc)}</small>${r.hint?`<small>${esc(r.hint)}</small>`:''}</span></button>`).join('')+(rows.length?'':'<p class="note">No matching choices.</p>');
  }
  $('combat-picker-controls').addEventListener('input',renderCombatChoices);
  $('combat-picker-close').addEventListener('click',()=>$('combat-picker').close());
  $('combat-picker').addEventListener('close',()=>{
    if(!combatPicker)return;const {slot,mode}=combatPicker;combatPicker=null;
    document.querySelector(`[data-combat-${mode==='rarity'?'rarity':'pick'}="${slot}"]`)?.focus({preventScroll:true});
  });
  function renderAccount(){
    const a=profile.account,vip=(a.vip?.25:0)+(a.vipPlus?.5:0);
    $('account-fields').innerHTML=`<div class="panel"><h3>VIP Membership</h3><div class="two-col">${[['vip','VIP','+25% XP and combat luck'],['vipPlus','VIP+','+50% XP and combat luck']].map(([key,label,desc])=>`<label class="vip-card check"><span class="star" aria-hidden="true">★</span><span><b>${label}</b><small>${desc}</small></span><input data-edit="vip" data-key="${key}" type="checkbox" ${a[key]?'checked':''}></label>`).join('')}</div><p class="note">Combined VIP bonus: +${fmt(vip*100)}% XP and combat luck. Both memberships can be recorded independently.</p></div><div class="panel community-panel"><h3>Community Centre</h3><div class="community-control">${art('communitycenter',34)}<label for="community-tier">Current Progress</label><output id="community-value" for="community-tier">${a.communityTier*25}%</output></div><input id="community-tier" class="community-slider" type="range" min="0" max="4" step="1" value="${a.communityTier}" data-edit="community" aria-label="Community Centre progress" aria-valuetext="${a.communityTier*25}%" style="--community-fill:${a.communityTier*25}%"><div class="community-ticks" aria-hidden="true">${[0,25,50,75,100].map(n=>`<span>${n}%</span>`).join('')}</div><div class="milestones">${R.CC_TIERS.map((t,i)=>`<div class="milestone ${i<a.communityTier?'active':''}"><strong>${i<a.communityTier?'✓ ':''}${(i+1)*25}%</strong>${esc(t.label)}</div>`).join('')}</div><p class="note">This records the currently active tier, not personal donations. Community progress can change; update it when the in-game tier changes.</p></div><div class="panel"><h3>Boss Clears & Unlocks</h3><div class="boss-grid">${Object.entries(R.ZONES).map(([id,z])=>({...z,bossId:(R.MONSTERS[id]||[]).find(m=>m.boss)?.id})).filter(z=>z.bossId).map(z=>`<label class="check"><input data-edit="boss" data-boss="${z.bossId}" type="checkbox" ${a.bosses.includes(z.bossId)?'checked':''}>${esc(z.name)}</label>`).join('')}</div><div class="unlock-status"><span>Hunter’s Lodge: ${a.bosses.includes('meadow_boss')?'Unlocked':'Locked · Clear the Meadow Boss'}</span><span>Museum: ${a.bosses.includes('dungeon_boss')?'Unlocked':'Locked · Clear the Dungeon Boss'}</span></div></div><div class="panel"><h3>Unlocked Blessing Tomes</h3><p class="muted">Ordinary blessings use your Divinity level. Mark additional tomes you have unlocked here.</p>${R.TOME_UNLOCKED_PRAYERS.map(t=>`<label class="check"><input data-edit="tome" data-tome="${t.id}" type="checkbox" ${a.tomes.includes(t.id)?'checked':''}>${esc(t.name)}</label>`).join('')}</div><div class="panel"><h3>Hunter’s Lodge & Bestiary</h3><p class="muted">Record kills per monster. Entries are retained while the Lodge is locked.</p><label class="inline-input">Zone<select id="lodge-zone">${options(Object.values(R.ZONES).map(z=>[z.id,z.name]),zone)}</select></label><div id="lodge-rows"></div></div>`;
    renderLodge();
  }
  function renderSkillingGear(){
    $('skilling-sets').innerHTML=(profile.skillingSets.length?'<p class="notice">Earlier named skilling sets are retained in your backups. These fields start with the first saved item for each slot, keeping the higher rarity when the same item appeared more than once. Review them if you had several different setups.</p>':'')+Object.entries(M.skillingGroups).map(([group,title])=>{
      const fields=Object.entries(profile.skillingGear[group]).map(([slot,item])=>{
        const label=group==='jewelry'?M.jewelrySlots[slot]:slot==='tool'?'Tool':M.slots[slot];
        const jewelry=group==='jewelry',name=jewelry?M.bestItemOptions(group,slot)[0]:item?.name;
        const rarity=item?R.getRarityByTier(item.rarity):{name:'None',color:'#a0b0b0'},minimum=M.minimumSkillingRarity(name);
        const face=`<span class="slot-label">${label}</span>${name?itemArt(name):'<span class="empty-gear-icon" aria-hidden="true">＋</span>'}${!jewelry?`<b class="skilling-gear-name">${esc(name||'Choose Gear')}</b>`:''}`;
        return `<div class="skilling-gear ${item?'':'unselected'}" style="--rarity-color:${rarity.color}">${jewelry?`<div class="skilling-gear-face">${face}</div>`:`<button class="skilling-gear-face" data-skill-pick data-group="${group}" data-slot="${slot}" aria-label="${title} ${label}: ${esc(name||'None')}" aria-haspopup="dialog">${face}</button>`}${item||jewelry?`<button class="gear-rarity" data-skill-rarity data-group="${group}" data-slot="${slot}" aria-label="${title} ${label} rarity: ${rarity.name}" aria-haspopup="dialog"><span>${rarity.name}</span><span aria-hidden="true">⌄</span></button>`:'<span class="note">Select an item</span>'}${skillingItemStats(group,item)}${minimum>1?`<small class="gear-minimum">Chest minimum: ${R.getRarityByTier(minimum).name}</small>`:''}${item&&item.rarity<minimum?'<small class="gear-review">Saved rarity is below the current chest minimum. Select a rarity to update it.</small>':''}</div>`;
      }).join('');
      return `<div class="panel"><h3>${title}</h3><p class="note">${group==='jewelry'?'Choose a rarity for each piece you own, or leave it as None. Each Pearl Ring keeps its own rarity.':'Select a slot to choose your best tool or armor, then select its rarity.'}</p><div class="gear-grid ${group==='jewelry'?'jewellery-grid':''}">${fields}</div></div>`;
    }).join('');
  }
  function skillingItemStats(group,item){
    if(!item)return '';
    const mult=R.getRarityByTier(item.rarity).mult,gear=R.EQUIPMENT[item.name]||{},tool=M.X.tools[group]?.find(t=>t.name===item.name);
    const compact=n=>n.toLocaleString('en-GB',{maximumSignificantDigits:3}),parts=[];
    if(tool)parts.push('×'+compact(tool.speed*(1+(mult-1)*.25))+' Tool Speed');
    for(const [stat,scale,label] of [['gathSpeed','gathScale','Gathering Speed'],['prodSpeed','prodScale','Production Speed'],['skillXp','skillXpScale','All Skill XP'],['skillSpeed','skillScale',(M.skills[gear.skillOf]||'Skill')+' Speed'],['treasureFind','treasureScale','Treasure Find']]){
      if(gear[stat])parts.push('+'+compact((gear[stat]+(mult-1)*(gear[scale]||0))*100)+'% '+label);
    }
    return `<div class="skilling-item-stats" aria-label="Item bonuses at selected rarity">${parts.map(p=>`<span>${esc(p)}</span>`).join('')}</div>`;
  }
  function openSkillingPicker(group,slot,mode){
    if(!validDraft())return;
    skillingPicker={group,slot,mode};const item=profile.skillingGear[group][slot];
    const label=group==='jewelry'?M.jewelrySlots[slot]:slot==='tool'?'Tool':M.slots[slot];
    $('skilling-picker-context').textContent=M.skillingGroups[group]+' · '+label;
    $('skilling-picker-title').textContent=mode==='rarity'?'Choose Rarity':'Choose '+label;
    const name=group==='jewelry'?M.bestItemOptions(group,slot)[0]:item?.name,minimum=M.minimumSkillingRarity(name);
    $('skilling-picker-controls').innerHTML=mode==='gear'?'<label class="picker-search">Search Gear<input id="skilling-search" type="search" placeholder="Search equipment…"></label>':`<p class="note">${esc(name)}${minimum>1?` · Chest drops start at ${R.getRarityByTier(minimum).name}.`:''}</p>`;
    renderSkillingChoices();$('skilling-picker').showModal();
    ($('skilling-search')||$('skilling-picker-items').querySelector('[aria-pressed="true"]')||$('skilling-picker-items').querySelector('button')).focus();
  }
  function renderSkillingChoices(){
    const {group,slot,mode}=skillingPicker,item=profile.skillingGear[group][slot],el=$('skilling-picker-items');
    el.className=mode==='gear'?'gear-choices':'rarity-choices';
    if(mode==='rarity'){
      const name=group==='jewelry'?M.bestItemOptions(group,slot)[0]:item.name,minimum=M.minimumSkillingRarity(name);
      const rows=[...(group==='jewelry'?[{tier:0,name:'None',color:'#a0b0b0'}]:[]),...R.RARITIES.filter(r=>r.tier>=minimum)];
      el.innerHTML=rows.map(r=>`<button class="rarity-choice" data-skill-tier="${r.tier}" aria-pressed="${r.tier===(item?.rarity||0)}" style="--rarity-color:${r.color}"><span class="rarity-gem" aria-hidden="true">${r.tier?'◆':'−'}</span><span><b>${r.name}</b><small>${r.tier?'Tier '+r.tier:'Not owned'}</small></span>${r.tier===(item?.rarity||0)?'<span class="rarity-check" aria-hidden="true">✓</span>':''}</button>`).join('');return;
    }
    const query=($('skilling-search')?.value||'').toLowerCase().trim();
    const names=M.bestItemOptions(group,slot).filter(name=>name.toLowerCase().includes(query));
    el.innerHTML='<button class="gear-choice" data-skill-choice=""><span class="empty-gear-icon" aria-hidden="true">−</span><span><b>None</b><small>Leave this slot empty</small></span></button>'+names.map(name=>{
      const minimum=M.minimumSkillingRarity(name),tool=M.X.tools[group]?.find(t=>t.name===name);
      return `<button class="gear-choice" data-skill-choice="${esc(name)}" aria-pressed="${item?.name===name}">${itemArt(name)}<span><b>${esc(name)}</b><small>${tool?'Level '+tool.level+' · ':''}${minimum>1?'Chest drop · '+R.getRarityByTier(minimum).name+' minimum':'Common or higher'}</small></span></button>`;
    }).join('')+(names.length?'':'<p class="note">No matching gear.</p>');
  }
  $('skilling-picker-controls').addEventListener('input',renderSkillingChoices);
  $('skilling-picker-close').addEventListener('click',()=>$('skilling-picker').close());
  $('skilling-picker').addEventListener('close',()=>{
    if(!skillingPicker)return;const {group,slot,mode}=skillingPicker;skillingPicker=null;
    document.querySelector(`[data-skill-${mode==='gear'?'pick':'rarity'}][data-group="${group}"][data-slot="${slot}"]`)?.focus({preventScroll:true});
  });
  function renderLodge(){
    $('lodge-rows').innerHTML=R.MONSTERS[zone].map(m=>{const kills=profile.account.killLog[m.name]||0,tier=R.BESTIARY_TIERS.filter(t=>kills>=t.kills).at(-1);return `<div class="lodge-row"><label for="kill-${m.id}">${esc(m.name)}</label><input id="kill-${m.id}" data-edit="kills" data-monster="${esc(m.name)}" type="number" min="0" max="1000000000000" step="1" required value="${kills}" aria-label="${esc(m.name)} kills"><span class="note">${tier?'Tier '+tier.label:'—'}</span></div>`;}).join('');
  }
  function renderAll(){summary();$('profile-name').value=profile.name;renderSkills();renderPets();renderMuseumOptions();renderMuseum();renderSets('combat');renderSets('skilling');renderAccount();inventoryUI?.render();}
  function preserveFocus(render,el){const data={...el.dataset};render();const found=[...document.querySelectorAll('[data-edit]')].find(x=>Object.entries(data).every(([k,v])=>x.dataset[k]===v));found?.focus({preventScroll:true});}
  function toggle(list,value,on){return on?[...new Set([...list,value])]:list.filter(v=>v!==value);}
  document.addEventListener('input',e=>{
    if(e.target.dataset.edit!=='community')return;
    const tier=Number(e.target.value),percent=tier*25+'%';
    $('community-value').value=percent;e.target.setAttribute('aria-valuetext',percent);e.target.style.setProperty('--community-fill',percent);
    document.querySelectorAll('.milestone').forEach((el,i)=>{el.classList.toggle('active',i<tier);el.querySelector('strong').textContent=(i<tier?'✓ ':'')+(i+1)*25+'%';});
  });
  document.addEventListener('input',e=>{if(e.target.matches('[data-edit],#profile-name')){e.target.setCustomValidity('');dirty=true;$('save-status').textContent='Editing · Changes save when you finish this field.';}});
  document.addEventListener('change',e=>{
    const el=e.target,d=el.dataset,type=d.edit;if(!type)return;
    if(!el.checkValidity()){el.reportValidity();message('Enter a valid value. This edit has not been saved.',true);return;}
    const value=type==='xp'?el.value.trim():el.value,number=Number(type==='xp'?value.replaceAll(',',''):value),kind=d.kind,set=kind?currentSet(kind):null;
    if(type==='xp'&&value!==''&&(!/^(?:\d+|\d{1,3}(?:,\d{3})+)$/.test(value)||!Number.isSafeInteger(number))){
      el.setCustomValidity('Enter a whole number, with optional comma separators.');el.reportValidity();message('Enter valid total XP. This edit has not been saved.',true);return;
    }
    let render;
    if(['gear','set-skill'].includes(type))render=()=>preserveFocus(()=>renderSets(kind),el);
    if(type==='set-name')render=()=>{const current=currentSet(kind);el.value=current.name;for(const chip of $(kind+'-sets').querySelectorAll('[data-select-set]'))if(chip.dataset.selectSet===current.id)chip.textContent=current.name;};
    if(['set-pet','set-blessing'].includes(type))render=()=>{$(kind+'-sets').querySelector('.set-warnings').innerHTML=M.warnings(profile,currentSet(kind)).map(w=>`<p class="warning">${esc(w)}</p>`).join('');};
    if(type==='museum-bonus')render=renderMuseumBonuses;
    if(type==='museum-rarity')render=()=>{renderMuseumBonuses();preserveFocus(renderMuseumCollection,el);};
    if(['vip','community','boss','tome'].includes(type))render=()=>{preserveFocus(renderAccount,el);renderMuseum();renderSets('combat');renderSets('skilling');};
    if(type==='pet')render=()=>{preserveFocus(renderPets,el);renderSets('combat');renderSets('skilling');};
    if(type==='kills')render=()=>{const tier=R.BESTIARY_TIERS.filter(t=>number>=t.kills).at(-1);el.closest('.lodge-row').querySelector('.note').textContent=tier?'Tier '+tier.label:'—';};
    const ok=commit(p=>{
      const s=set?p[kind+'Sets'].find(s=>s.id===set.id):null;
      switch(type){
        case 'level':p.skills[d.skill]={level:number,xp:null};break;
        case 'xp':p.skills[d.skill]={level:value===''?p.skills[d.skill].level:R.getLevel(number),xp:value===''?null:number};break;
        case 'pet':p.pets=toggle(p.pets,d.pet,el.checked);break;
        case 'museum-rarity':if(number)p.museum.items[d.item]=number;else delete p.museum.items[d.item];break;
        case 'museum-bonus':p.museum.manual[d.style][d.stat]=number/(d.stat==='rngBonus'?1:100);break;
        case 'set-name':s.name=value;break;
        case 'set-skill':s.skill=value;s.tool=null;for(const slot of Object.keys(s.equipment))if(!M.setSlots(kind,value).includes(slot)||!M.gearOptions(kind,value,slot).includes(s.equipment[slot].name))delete s.equipment[slot];break;
        case 'gear':{
          const item=value?{name:value,rarity:R.EQUIPMENT[value]?.infinite?1:(d.slot==='tool'?s.tool:s.equipment[d.slot])?.rarity||1}:null;
          if(d.slot==='tool')s.tool=item;else if(item)s.equipment[d.slot]=item;else delete s.equipment[d.slot];
          if(d.slot==='weapon'&&R.EQUIPMENT[value]?.twoHand)delete s.equipment.shield;break;
        }
        case 'rarity':(d.slot==='tool'?s.tool:s.equipment[d.slot]).rarity=number;break;
        case 'set-pet':s.pet=value;break;
        case 'set-blessing':s.blessing=value;break;
        case 'vip':p.account[d.key]=el.checked;break;
        case 'community':p.account.communityTier=number;break;
        case 'boss':p.account.bosses=toggle(p.account.bosses,d.boss,el.checked);break;
        case 'tome':p.account.tomes=toggle(p.account.tomes,d.tome,el.checked);break;
        case 'kills':p.account.killLog[d.monster]=number;break;
      }
    },render);
    if(!ok){el.setCustomValidity($('message').textContent);el.reportValidity();}
    if(ok&&['level','xp'].includes(type)){
      const s=profile.skills[d.skill];document.querySelector(`[data-edit="level"][data-skill="${d.skill}"]`).value=s.level;document.querySelector(`[data-edit="xp"][data-skill="${d.skill}"]`).value=s.xp===null?'':fmt(s.xp);renderSets('combat');renderSets('skilling');
    }
  });
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;const d=b.dataset;
    if(d.combatPick!==undefined||d.combatRarity!==undefined){openCombatPicker(d.combatPick??d.combatRarity,d.combatRarity!==undefined?'rarity':'gear');return;}
    if(combatPicker&&d.combatFilter){combatPicker.filter=d.combatFilter;document.querySelectorAll('[data-combat-filter]').forEach(el=>el.setAttribute('aria-pressed',el.dataset.combatFilter===d.combatFilter));renderCombatChoices();return;}
    if(combatPicker&&(d.combatChoice!==undefined||d.combatTier!==undefined)){
      const {setId,slot}=combatPicker;
      const ok=commit(p=>{
        const set=p.combatSets.find(s=>s.id===setId);if(!set)throw new Error('This gear set is no longer available.');
        if(d.combatTier!==undefined){set.equipment[slot].rarity=Number(d.combatTier);return;}
        const name=d.combatChoice;
        if(slot==='pet'){if(name&&!p.pets.includes(name)&&set.pet!==name)throw new Error('Mark this pet as owned first.');set.pet=name;}
        else if(slot==='blessing'){if(!M.blessingAvailable(p,name))throw new Error('This blessing is locked.');set.blessing=name;}
        else{if(name)set.equipment[slot]={name,rarity:R.EQUIPMENT[name]?.infinite?1:set.equipment[slot]?.rarity||1};else delete set.equipment[slot];if(slot==='weapon'&&R.EQUIPMENT[name]?.twoHand)delete set.equipment.shield;}
      },()=>renderSets('combat'));
      if(ok)$('combat-picker').close();return;
    }
    if(d.skillPick!==undefined||d.skillRarity!==undefined){openSkillingPicker(d.group,d.slot,d.skillPick!==undefined?'gear':'rarity');return;}
    if(skillingPicker&&(d.skillChoice!==undefined||d.skillTier!==undefined)){
      const {group,slot}=skillingPicker;
      const ok=commit(p=>{
        const old=p.skillingGear[group][slot];
        if(d.skillChoice!==undefined)p.skillingGear[group][slot]=d.skillChoice?{name:d.skillChoice,rarity:Math.max(old?.rarity||1,M.minimumSkillingRarity(d.skillChoice))}:null;
        else{const tier=Number(d.skillTier),name=group==='jewelry'?M.bestItemOptions(group,slot)[0]:old.name;
          if(tier&&tier<M.minimumSkillingRarity(name))throw new Error('Choose a rarity at or above the chest minimum.');
          p.skillingGear[group][slot]=tier?{name,rarity:tier}:null;
        }
      },renderSkillingGear);
      if(ok)$('skilling-picker').close();return;
    }
    if(d.section){if(!validDraft())return;for(const el of document.querySelectorAll('#content>section'))el.hidden=el.id!=='section-'+d.section;for(const nav of document.querySelectorAll('[data-section]'))nav.toggleAttribute('aria-current',false);b.setAttribute('aria-current','page');$('content').focus({preventScroll:true});return;}
    if(d.newSet){
      if(!validDraft())return;const kind=d.newSet,id=crypto.randomUUID(),name=uniqueName(kind,kind==='combat'?'Combat Set':'Skilling Set');
      commit(p=>p[kind+'Sets'].push(M.newSet(kind,id,name)),()=>{selections[kind]=id;renderSets(kind);const nameInput=$(kind+'-sets').querySelector('[data-edit="set-name"]');nameInput.focus();nameInput.select();});
    }
    if(d.selectSet){if(!validDraft())return;selections[d.kind]=d.selectSet;renderSets(d.kind);}
    if(d.duplicate){if(!validDraft())return;const kind=d.duplicate,set=structuredClone(currentSet(kind));set.id=crypto.randomUUID();set.name=uniqueName(kind,set.name.slice(0,65)+' Copy');commit(p=>p[kind+'Sets'].push(set),()=>{selections[kind]=set.id;renderSets(kind);});}
    if(d.delete){const kind=d.delete,set=currentSet(kind);if(confirm(`Delete “${set.name}”? This removes only this saved gear set.`))commit(p=>{p[kind+'Sets']=p[kind+'Sets'].filter(s=>s.id!==set.id);},()=>renderSets(kind));}
    if(d.removeItem)commit(p=>{delete p.museum.items[d.removeItem];},renderMuseum);
  });
  $('profile-name').addEventListener('change',e=>{const el=e.target;if(!el.checkValidity()){el.reportValidity();return;}if(!commit(p=>{p.name=el.value;})){el.setCustomValidity($('message').textContent);el.reportValidity();}else el.value=profile.name;});
  for(const id of ['pet-search','pet-category','pets-owned-only'])$(id).addEventListener(id==='pet-search'?'input':'change',renderPets);
  $('museum-search').addEventListener('input',renderMuseumOptions);
  $('museum-filter').innerHTML=Object.entries(styles).map(([style,label])=>`<button type="button" data-museum-style="${style}" aria-pressed="${style===museumStyle}">${art(style==='melee'?'attack':style,22)}<span>${label}</span></button>`).join('');
  $('museum-filter').addEventListener('click',e=>{const button=e.target.closest('[data-museum-style]');if(!button)return;museumStyle=button.dataset.museumStyle;for(const b of $('museum-filter').querySelectorAll('button'))b.setAttribute('aria-pressed',String(b===button));renderMuseumCollection();});
  $('museum-mode').addEventListener('change',e=>commit(p=>{p.museum.mode=e.target.value;},renderMuseum));
  $('account-fields').addEventListener('change',e=>{if(e.target.id==='lodge-zone'){zone=e.target.value;renderLodge();}});
  $('export').addEventListener('click',()=>{if(!validDraft())return;try{const blob=new Blob([M.encode(profile)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');const name=profile.name.replace(/[<>:"/\\|?*\x00-\x1f\x7f]/g,'-').replace(/[. ]+$/g,'').trim()||'Character';a.href=url;a.download='realm-idle-character-profile-'+name+'-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);message('Profile backup exported. Keep this file to restore or move your profile.');}catch(e){message(e.message,true);}});
  $('import').addEventListener('click',()=>{$('import-file').value='';$('import-file').click();});
  function previewImport(loaded,source){
    pendingImport=loaded;importSource=source;
    const skillingCount=Object.values(loaded.skillingGear).flatMap(group=>Object.values(group)).filter(Boolean).length;
    $('import-summary').textContent=`${loaded.name} · ${loaded.pets.length} pets · ${Object.keys(loaded.museum.items).length} museum items · ${loaded.combatSets.length} combat sets · ${skillingCount} skilling items`;
    $('import-dialog').showModal();
  }
  function shareStatus(text,error=false){$('share-status').textContent=text;$('share-status').classList.toggle('error',error);}
  function shareBusy(busy){for(const id of ['share-copy-mode','share-paste-mode','share-load-btn','share-text'])$(id).disabled=busy;}
  function setShareMode(mode){
    if(shareMode==='paste')shareDraft=$('share-text').value;
    shareMode=mode;$('share-text').readOnly=mode==='copy';$('share-text').value=mode==='copy'?shareCode:shareDraft;
    $('share-copy-mode').setAttribute('aria-pressed',mode==='copy');$('share-paste-mode').setAttribute('aria-pressed',mode==='paste');
    $('share-copy-btn').hidden=mode!=='copy';$('share-load-btn').hidden=mode!=='paste';
    $('share-help').textContent=mode==='copy'?'Copy the code for your current profile.':'Paste a Character Profile code. You can review its summary before replacing your saved profile.';
    shareStatus('');$('share-text').focus();if(mode==='copy')$('share-text').select();
  }
  $('share-btn').addEventListener('click',async()=>{
    if(!validDraft())return;
    const generation=++shareGeneration;shareMode='copy';shareCode='';shareDraft='';shareBusy(false);$('share-copy-btn').disabled=true;
    $('share-dialog').showModal();setShareMode('copy');shareStatus('Preparing setup code…');
    try{const code=await ProfileSetupCodec.encode(profile);if(generation!==shareGeneration||!$('share-dialog').open)return;shareCode=code;$('share-copy-btn').disabled=false;if(shareMode==='copy'){$('share-text').value=code;shareStatus('');}}
    catch(error){if(generation===shareGeneration&&$('share-dialog').open)shareStatus(error.message,true);}
  });
  $('share-copy-mode').addEventListener('click',()=>setShareMode('copy'));
  $('share-paste-mode').addEventListener('click',()=>setShareMode('paste'));
  $('share-close').addEventListener('click',()=>$('share-dialog').close());
  $('share-dialog').addEventListener('close',()=>{++shareGeneration;shareBusy(false);});
  $('share-copy-btn').addEventListener('click',async()=>{
    const generation=shareGeneration;
    try{await navigator.clipboard.writeText(shareCode);if(generation===shareGeneration&&shareMode==='copy')shareStatus('Setup code copied.');}
    catch{if(generation!==shareGeneration||shareMode!=='copy')return;$('share-text').focus();$('share-text').select();shareStatus('Code selected. Press Ctrl+C or use your browser’s Copy command.');}
  });
  $('share-load-btn').addEventListener('click',async()=>{
    const generation=shareGeneration;shareBusy(true);shareStatus('Reading setup code…');
    try{const loaded=await ProfileSetupCodec.decode($('share-text').value);if(generation!==shareGeneration||!$('share-dialog').open)return;$('share-dialog').close();previewImport(loaded,'code');}
    catch(error){if(generation===shareGeneration&&$('share-dialog').open)shareStatus(error.message+' Your current profile has not changed.',true);}
    finally{if(generation===shareGeneration)shareBusy(false);}
  });
  $('import-file').addEventListener('change',async e=>{
    const file=e.target.files[0];if(!file)return;
    try{if(file.size>2e6)throw new Error('Profile backups must be smaller than 2 MB.');previewImport(M.decode(await file.text()),'file');}
    catch(error){pendingImport=null;message(error.message+' Your current profile has not changed.',true);}
  });
  $('cancel-import').addEventListener('click',()=>{pendingImport=null;$('import-dialog').close();});
  $('import-dialog').addEventListener('cancel',()=>{pendingImport=null;});
  $('import-new-character').addEventListener('click',()=>{if(!pendingImport)return;try{const id=M.createCharacter(localStorage,pendingImport);pendingImport=null;CharacterPicker.navigate(id);}catch(e){message(e.message,true);}});
  $('confirm-import').addEventListener('click',()=>{if(!pendingImport)return;profile=pendingImport;pendingImport=null;storageBlocked=false;document.querySelectorAll('[data-edit],#profile-name').forEach(el=>el.setCustomValidity(''));save();renderAll();$('import-dialog').close();message(importSource==='code'?'Profile loaded from setup code.':'Profile imported.');});
  addEventListener('beforeunload',e=>{if(dirty||[...document.querySelectorAll('[data-edit],#profile-name')].some(el=>!el.checkValidity())){e.preventDefault();e.returnValue='';}});
  addEventListener('storage',e=>{if(e.key===M.STORAGE_KEY){storageBlocked=true;$('save-status').textContent='Profile changed in another tab · Reload to use that version.';message('Another tab changed this profile. Autosave is paused here to avoid overwriting it. Export any edits you want to keep, then reload.',true);}});
  try{
    const saved=localStorage.getItem(M.STORAGE_KEY);
    if(saved===null&&M.characterId!=='default')throw Error('Character not found.');
    const recovered=M.characterId==='default'?CharacterProfileRecovery.recover(saved===null?null:JSON.parse(saved)):{profile:M.validate(JSON.parse(saved)),restored:false};
    profile=recovered.profile;
    if(recovered.restored){save();message('Restored your saved combat-planner profile from the local backup. Skills not recorded in that setup remain at their default levels.');}
    else $('save-status').textContent='Saved profile restored · Autosave on';
  }
  catch{storageBlocked=true;$('save-status').textContent='Saved profile unavailable · Autosave paused';message('The saved profile could not be loaded. It has been left untouched. Import a valid backup to replace it, or export your edits to keep them.',true);}
  inventoryUI=ProfileInventoryUI.init({getProfile:()=>profile,replace:next=>{profile=M.validate(next);save();renderAll();},canEdit:()=>{if(storageBlocked){message('Reload to resolve the browser storage issue before editing or importing.',true);return false;}return validDraft();},report:message});
  renderAll();
})();
