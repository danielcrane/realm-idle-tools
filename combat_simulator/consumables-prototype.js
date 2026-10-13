/* Consumable selection and advanced timing controls. */
document.addEventListener('DOMContentLoaded',()=>{
 'use strict';
 const styleOf=c=>R.EQUIPMENT[c.equip?.weapon]?.magic?'magic':R.EQUIPMENT[c.equip?.weapon]?.ranged?'ranged':'melee';
 const styleStats={melee:['atk_pct','str_pct'],ranged:['rng_pct'],magic:['mag_pct']};
 const sharedStats=['def_pct','damage_reduction','lifesteal','combat_xp_boost','gold_boost'];
 const relevant=c=>[...styleStats[styleOf(c)],...sharedStats];
 const canonicalPotions=[],potionAliases=new Map(),effectNames=new Map();
 for(const [name,p] of Object.entries(R.POTIONS)){
  const key=JSON.stringify([p.stat,p.value,p.flat||0,p.duration,p.attacks]);
  if(!effectNames.has(key)){effectNames.set(key,name);canonicalPotions.push([name,p]);}
  potionAliases.set(name,effectNames.get(key));
 }
 const bonus=name=>R.POTIONS[name].desc.replace(/\s+for\s+\d+m\s*$/i,'');
 const eventStrength=()=>XPSource.candyStrengthAt(Date.now(),'halloween');
 const eventPhase=()=>`${new Date().getUTCFullYear()}:${eventStrength()===1?'event':'outside'}`;
 const candyDefault=c=>typeof c.localCandyStrengthOverride==='boolean'?(c.localCandyStrengthOverride?1:.5):eventStrength();
 function prepare(raw){
  const c=cloneConfig(raw),stats=relevant(c),style=styleOf(c),saved={...(c.localPotionSelections||{})};
  for(const [stat,row] of Object.entries(saved))saved[stat]={...row,name:potionAliases.get(row.name)||row.name};
  if(!c.localPotionStyle||c.localPotionStyle===style)for(const stat of stats)delete saved[stat];
  for(const row of c.potions||[])if(R.POTIONS[row.name]&&Object.hasOwn(potionGroups,R.POTIONS[row.name].stat))saved[R.POTIONS[row.name].stat]={...row,name:potionAliases.get(row.name)};
  c.localPotionSelections=saved;c.localPotionStyle=style;
  c.potions=stats.flatMap(stat=>saved[stat]?[saved[stat]]:[]);
  c.advancedConsumables=c.advancedConsumables===true;
  if(c.localCandyPhase!==eventPhase()){c.localCandyPhase=eventPhase();c.localCandyStrengthOverride=null;}
  if(!c.advancedConsumables){c.infinitePotions=true;c.infiniteCandies=true;c.candies=(c.candies||[]).map(row=>({...row,strength:candyDefault(c)}));}
  return c;
 }
 const baseDefaults=E.defaults,baseNormalize=E.normalize,baseSnapshot=E.snapshot,baseContext=E.makeContext,baseSimulate=E.simulate,baseRun=E.run;
 E.defaults=()=>({...baseDefaults(),advancedConsumables:false,infinitePotions:true,infiniteCandies:true});
 E.normalize=raw=>baseNormalize(prepare(raw||{}));
 E.makeContext=(raw,seed)=>baseContext(prepare(raw||{}),seed);
 E.simulate=(raw,seed)=>baseSimulate(prepare(raw||{}),seed);
 E.run=(raw,...args)=>baseRun(prepare(raw||{}),...args);
 E.snapshot=raw=>{
  const c=prepare(raw||{}),s=baseSnapshot(c);
  if(!c.infiniteFood&&!(c.advancedAmmo&&c.infiniteAmmo)&&!c.advancedConsumables)s.warnings=s.warnings.filter(w=>!w.startsWith('Unlimited supplies enabled'));
  return s;
 };
 potionOptions=function(value){return relevant(config).map(stat=>`<optgroup label="${esc(potionGroups[stat])}">${options(canonicalPotions.filter(([,p])=>p.stat===stat).sort(([an,a],[bn,b])=>a.value-b.value||(a.flat||0)-(b.flat||0)||a.duration-b.duration||an.localeCompare(bn)).map(([n])=>[n,n]),value)}</optgroup>`).join('');};
 const panel=document.createElement('details');panel.id='active-consumables';panel.className='panel';
 panel.addEventListener('toggle',()=>{if(panel.isConnected){config.localConsumablesOpen=panel.open;save();}});
 const dialog=document.createElement('dialog');dialog.id='consumables-picker';dialog.setAttribute('aria-labelledby','consumables-picker-title');
 dialog.innerHTML='<div class="dialog-head"><div class="consumable-heading"><div class="consumable-title-row"><h2 id="consumables-picker-title"></h2><button type="button" class="close" data-consumable-close aria-label="Close consumables picker">×</button></div><div class="consumable-header-meta"><p class="note" id="consumable-picker-hint">Choose one per effect.</p><div id="candy-header-event" hidden></div></div></div></div><div class="consumable-toolbar"><input type="search" id="consumable-search" aria-label="Search consumables" placeholder="Search…"><div id="consumable-effects"></div></div><div id="consumable-choices" class="picker-items"></div><div class="consumable-footer"><button type="button" data-consumable-close>Done</button></div>';
 document.body.append(dialog);
 let pickerKind='potions',effect='',query='',advancedOpen=false,candyStrength=.5;
 function renderPanel(){
  const candyBonus=row=>`${pct(R.CANDY_DEFS[row.name].value*row.strength)} ${R.CANDY_DEFS[row.name].kind==='dmg'?'damage':'XP'}`;
  panel.innerHTML=`<summary><b>Potions & Candy</b><span class="mini-badge">${config.potions.length||config.candies.length?`${config.potions.length} ${config.potions.length===1?'Potion':'Potions'} · ${config.candies.length} Candy`:'None Selected'}</span></summary><div class="consumable-detail-content"><span class="mini-badge">${config.advancedConsumables?'Advanced Timing':'Unlimited'}</span><div class="consumable-boxes">${[
   ['potions','Potions',config.potions,row=>itemImage(row.name,26),row=>bonus(row.name)],
   ['candies','Candy',config.candies,row=>R.candyIcon(row.name,26),candyBonus]
  ].map(([kind,label,rows,art,desc])=>`<div class="consumable-box"><div class="panel-title"><h4>${label}</h4><button type="button" class="text-button" data-consumable-open="${kind}" aria-label="Choose active ${label.toLowerCase()}">Choose</button></div>${rows.length?rows.map(row=>`<div class="active-consumable">${art(row)}<span><b>${esc(row.name)}</b><small>${esc(desc(row))}</small></span><button type="button" class="text-button" data-consumable-remove="${kind}" data-consumable-name="${esc(row.name)}" aria-label="Remove ${esc(row.name)}">×</button></div>`).join(''):`<button type="button" class="consumable-empty" data-consumable-open="${kind}">＋ Choose ${label.toLowerCase()}</button>`}</div>`).join('')}</div><div class="consumable-panel-foot"><small>${config.advancedConsumables?'Timing and duration follow your Supplies settings.':'Selected effects stay active throughout the simulation.'}</small><button type="button" class="text-button" id="consumables-advanced-link">Advanced Settings ↗</button></div></div>`;
 }
 function renderPicker(){
  const groups=pickerKind==='potions'?relevant(config).map(stat=>[stat,potionGroups[stat]]):[['dmg','Combat Damage'],['xp','XP']];
  if(!groups.some(([id])=>id===effect))effect=groups[0][0];
  $('consumables-picker-title').textContent=pickerKind==='potions'?'Choose Active Potions':'Choose Candy';
  $('consumable-picker-hint').textContent=pickerKind==='candies'?'One per column':'Choose one per effect.';
  dialog.querySelector('.consumable-toolbar').hidden=pickerKind==='candies';
  $('candy-header-event').hidden=pickerKind!=='candies';
  if(pickerKind!=='candies')$('candy-header-event').innerHTML='';
  dialog.classList.toggle('candy-picker',pickerKind==='candies');
  $('consumable-search').hidden=pickerKind==='candies';
  $('consumable-choices').classList.toggle('candy-choice-columns',pickerKind==='candies');
  $('consumable-effects').classList.toggle('candy-event-controls',pickerKind==='candies');
  if(pickerKind==='candies'){
   $('consumable-effects').innerHTML='';
   $('candy-header-event').innerHTML=`<label class="candy-strength"><input type="checkbox" role="switch" id="basic-candy-strength" ${candyStrength===1?'checked':''}><span class="candy-switch-track" aria-hidden="true"></span><span><b>During Event</b><small>${candyStrength===1?'100%':'50%'}</small></span></label>`;
   $('consumable-choices').innerHTML=[['dmg','Combat Candy'],['xp','XP Candy']].map(([kind,label])=>`<section class="candy-choice-column" data-candy-column="${kind}"><h3>${label}</h3>${Object.values(R.CANDY_DEFS).filter(c=>c.kind===kind).sort((a,b)=>a.value-b.value).map(c=>`<button type="button" class="pick-item" data-consumable-choice="${esc(c.name)}" aria-pressed="${config.candies.some(row=>row.name===c.name)}">${R.candyIcon(c.name,30)}<span><b>${c.tier}</b><small>${pct(c.value*candyStrength)} ${kind==='dmg'?'damage':'XP'}</small></span></button>`).join('')}</section>`).join('');
   return;
  }
  $('consumable-effects').innerHTML=groups.map(([id,label])=>`<button type="button" data-consumable-effect="${id}" aria-pressed="${effect===id}">${esc(label)}</button>`).join('')+(pickerKind==='candies'?`<label class="candy-strength"><input type="checkbox" role="switch" id="basic-candy-strength" ${candyStrength===1?'checked':''}><span class="candy-switch-track" aria-hidden="true"></span><span><b>During Event</b><small>${candyStrength===1?'100% strength':'50% strength · Outside event'}</small></span></label>`:'');
  const selected=pickerKind==='potions'?config.potions.find(row=>R.POTIONS[row.name].stat===effect)?.name:config.candies.find(row=>R.CANDY_DEFS[row.name].kind===effect)?.name;
  const entries=pickerKind==='potions'?canonicalPotions.filter(([,p])=>p.stat===effect).sort(([an,a],[bn,b])=>a.value-b.value||(a.flat||0)-(b.flat||0)||an.localeCompare(bn)).map(([name])=>({name,desc:bonus(name),art:itemImage(name,36)})):Object.values(R.CANDY_DEFS).filter(c=>c.kind===effect).sort((a,b)=>a.value-b.value).map(c=>({name:c.name,desc:`${pct(c.value*candyStrength)} ${effect==='dmg'?'damage':'XP'}`,art:R.candyIcon(c.name,36)}));
  const visible=entries.filter(e=>(e.name+' '+e.desc).toLowerCase().includes(query.toLowerCase()));
  $('consumable-choices').innerHTML=`<button type="button" class="pick-item" data-consumable-choice="" aria-pressed="${!selected}"><span class="empty-icon">−</span><span><b>None</b><small>No ${esc(groups.find(([id])=>id===effect)[1].toLowerCase())} bonus</small></span></button>`+visible.map(e=>`<button type="button" class="pick-item" data-consumable-choice="${esc(e.name)}" aria-pressed="${selected===e.name}">${e.art}<span><b>${esc(e.name)}</b><small>${esc(e.desc)}</small></span></button>`).join('')+(!visible.length?'<p class="note">No matches.</p>':'');
 }
 const oldRefresh=refresh,oldSupplies=renderSupplies;
 refresh=function(){
  const open=panel.isConnected?panel.open:config.localConsumablesOpen===true;
  config=E.normalize(config);config.localConsumablesOpen=open;oldRefresh();
  $('loadout').querySelector('.gear-footnote')?.remove();$('save-state')?.remove();
  const gear=$('loadout').querySelector('[data-pick="ammo"]')?.closest('.gear');
  if(gear&&R.EQUIPMENT[config.equip.ammo]?.magicMult&&config.equip.ammo!=='Wraith Rune'){
   const fixed=document.createElement('span');fixed.className='gear-rarity fixed-gear-rarity';fixed.textContent='Common';fixed.style.setProperty('--rarity-color',R.getRarityByTier(1).color);gear.querySelector('.gear-stats').before(fixed);
  }
  renderPanel();$('loadout').querySelector('.equipment-panel').after(panel);panel.open=open;
  if(dialog.open){candyStrength=config.advancedConsumables?(config.candies[0]?.strength??candyDefault(config)):candyDefault(config);renderPicker();}
 };
 renderSupplies=function(){
  advancedOpen=$('advanced-consumables')?.open??advancedOpen;oldSupplies();
  const potions=$('supplies').querySelector('[data-add="potions"]').closest('.panel'),candy=$('supplies').querySelector('[data-candy-kind]').closest('.panel');
  const advanced=document.createElement('details');advanced.id='advanced-consumables';advanced.className='panel';advanced.open=advancedOpen;
  advanced.innerHTML=`<summary>Advanced Potions & Candy${config.advancedConsumables?' · Enabled':' · Inactive'}</summary><p class="note">Use finite durations and individual candy settings for this simulation.</p><label class="check"><input type="checkbox" id="enable-advanced-consumables" ${config.advancedConsumables?'checked':''}>Enable Advanced Consumable Settings</label><fieldset class="advanced-consumable-fields" ${config.advancedConsumables?'':'disabled'}></fieldset>`;
  potions.before(advanced);for(const section of [potions,candy]){section.classList.add('advanced-consumable-section');advanced.lastElementChild.append(section);}
 };
 document.addEventListener('click',event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.hasAttribute('data-consumable-open')){pickerKind=button.dataset.consumableOpen;effect='';query='';candyStrength=config.advancedConsumables?(config.candies[0]?.strength??candyDefault(config)):candyDefault(config);$('consumable-search').value='';renderPicker();dialog.showModal();if(pickerKind==='potions')$('consumable-search').focus();else $('basic-candy-strength').focus();}
  if(button.hasAttribute('data-consumable-close'))dialog.close();
  if(button.hasAttribute('data-consumable-effect')){effect=button.dataset.consumableEffect;renderPicker();}
  if(button.hasAttribute('data-consumable-choice')){
   const name=button.dataset.consumableChoice;
   if(pickerKind==='potions'){config.potions=config.potions.filter(row=>R.POTIONS[row.name].stat!==effect);if(name)config.potions.push({name,minutes:R.POTIONS[name].duration/60000});}
   else {const kind=R.CANDY_DEFS[name].kind,wasSelected=config.candies.some(row=>row.name===name);config.candies=config.candies.filter(row=>R.CANDY_DEFS[row.name].kind!==kind);if(!wasSelected)config.candies.push({name,minutes:R.CANDY_DEFS[name].duration/60000,strength:candyStrength});}
   changed();
  }
  if(button.hasAttribute('data-consumable-remove')){const key=button.dataset.consumableRemove;config[key]=config[key].filter(row=>row.name!==button.dataset.consumableName);changed();}
  if(button.id==='consumables-advanced-link'){tab='supplies';advancedOpen=true;if($('advanced-consumables'))$('advanced-consumables').open=true;refresh();$('advanced-consumables').scrollIntoView({behavior:'smooth',block:'center'});}
 });
 document.addEventListener('click',event=>{
  const add=event.target.closest('[data-add="potions"]');if(!add)return;
  event.stopImmediatePropagation();event.preventDefault();
  const used=new Set(config.potions.map(row=>R.POTIONS[row.name].stat)),stat=relevant(config).find(s=>!used.has(s));
  const name=stat&&canonicalPotions.find(([,p])=>p.stat===stat)?.[0];
  if(name){config.potions.push({name,minutes:R.POTIONS[name].duration/60000});changed();}
 },true);
 $('consumable-search').addEventListener('input',event=>{query=event.target.value;renderPicker();});
 document.addEventListener('change',event=>{
  if(event.target.id==='enable-advanced-consumables'){config.advancedConsumables=event.target.checked;config.infinitePotions=!config.advancedConsumables;config.infiniteCandies=!config.advancedConsumables;changed();}
  if(event.target.id==='basic-candy-strength'){config.localCandyStrengthOverride=event.target.checked;config.localCandyPhase=eventPhase();candyStrength=event.target.checked?1:.5;for(const row of config.candies)row.strength=candyStrength;changed();}
 });
 const updateEvent=()=>{if(config.localCandyPhase!==eventPhase())changed();};
 setInterval(updateEvent,60000);addEventListener('focus',updateEvent);document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateEvent();});
 const style=document.createElement('style');style.textContent=`
 #active-consumables>summary{font-size:13px}#active-consumables>summary>.mini-badge{float:right;font-size:10px}.consumable-detail-content{margin-top:14px}
 .gear-grid .gear-select{flex:1}.gear-grid .gear-stats{min-height:36px;align-content:flex-end}.fixed-gear-rarity{cursor:default}
 .consumable-boxes{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}
 .consumable-box{border:1px solid var(--line);background:var(--soft);border-radius:9px;padding:13px;min-width:0}
 .consumable-box h4{font-size:13px;font-weight:600}.consumable-empty{width:100%;margin-top:12px;padding:13px 8px;background:transparent;border-style:dashed;font-size:12px;color:var(--muted)}
 .active-consumable{display:flex;align-items:center;gap:9px;margin-top:13px}.active-consumable>:first-child{flex:0 0 26px;width:26px}.active-consumable>span:not(:first-child){flex:1;min-width:0}.active-consumable b{display:block;font-size:12px;font-weight:600}.active-consumable small{display:block;font-size:11px;color:var(--muted);line-height:1.5;margin-top:4px}.active-consumable>.text-button{padding:4px}
 .consumable-panel-foot{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:14px}.consumable-panel-foot>small{font-size:11px;color:var(--muted)}
 .consumable-toolbar{padding:16px 20px;border-bottom:1px solid var(--line)}#consumable-search{width:100%}#consumable-effects{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}#consumable-effects>button{font-size:12px;padding:7px 10px}#consumable-effects [aria-pressed=true],#consumable-choices [aria-pressed=true]{border-color:var(--accent);background:var(--soft)}
 .consumable-footer{padding:12px 20px;border-top:1px solid var(--line);display:flex;justify-content:flex-end}.candy-strength{position:relative;width:auto;margin-left:auto;display:flex;align-items:center;gap:10px;cursor:pointer}.candy-strength input{position:absolute;left:0;top:50%;transform:translateY(-50%);opacity:0;width:38px;height:22px;z-index:1;cursor:pointer}.candy-switch-track{width:38px;height:22px;border-radius:20px;background:var(--line);border:1px solid var(--muted);position:relative;flex-shrink:0}.candy-switch-track:after{content:"";position:absolute;left:3px;top:3px;width:14px;height:14px;border-radius:50%;background:var(--paper);transition:transform .15s}.candy-strength input:checked+.candy-switch-track{background:var(--accent);border-color:var(--accent)}.candy-strength input:checked+.candy-switch-track:after{transform:translateX(16px)}.candy-strength input:focus-visible+.candy-switch-track{outline:2px solid var(--accent);outline-offset:3px}.candy-strength b{display:block;font-size:12px;font-weight:600}.candy-strength small{display:block;font-size:11px;color:var(--muted);margin-top:3px}
 #consumable-effects.candy-event-controls{justify-content:flex-end;margin-top:0}#consumable-choices.candy-choice-columns{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:start}.candy-choice-column{min-width:0}.candy-choice-column h3{font-size:13px;margin-bottom:10px}.candy-choice-column .pick-item{width:100%;margin-top:8px;gap:8px;min-height:84px;padding:10px 8px}.candy-choice-column .pick-item>:first-child{flex:0 0 30px}.candy-choice-column .pick-item b{font-size:12px}
 .consumable-heading{width:100%;min-width:0}.consumable-title-row{display:flex;align-items:center;justify-content:space-between;gap:12px}.consumable-header-meta{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px}.consumable-header-meta>.note{margin:0}.candy-picker .candy-strength{border:1px solid var(--line);background:var(--soft);border-radius:9px;padding:7px 10px;gap:8px}.candy-picker .candy-strength input{left:10px}
 #consumables-picker.candy-picker[open]{height:fit-content;width:min(460px,calc(100vw - 32px))}#consumables-picker.candy-picker #consumable-choices{flex:0 1 auto;max-height:60dvh}
 #consumables-picker[open]{display:flex;flex-direction:column;height:fit-content;max-height:calc(100dvh - 32px);overflow:hidden}#consumables-picker>.dialog-head,#consumables-picker>.consumable-toolbar,#consumables-picker>.consumable-footer{flex-shrink:0}#consumable-choices{flex:0 1 auto;min-height:0;max-height:54dvh;overflow:auto}#consumable-choices small{font-size:12px}
 .advanced-consumable-fields{border:0;padding:0;margin:0;min-width:0}.advanced-consumable-fields:disabled{opacity:.55}.advanced-consumable-section{border-width:1px 0 0;border-radius:0;background:transparent;padding:16px 0 0;margin-top:16px}#advanced-consumables>summary{font-weight:600}
 @media(max-width:520px){.consumable-boxes{grid-template-columns:1fr}.consumable-panel-foot{align-items:flex-start;flex-direction:column}#consumable-choices{grid-template-columns:1fr}}
 `;document.head.append(style);
 refresh();
});
