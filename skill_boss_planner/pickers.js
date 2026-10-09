/* Icon selectors retain the native fields as the calculation source. */
(() => {
 const U=SkillBossUI,M=SkillBossModel,R=CharacterProfile.R,$=id=>document.getElementById(id),tiles=new Map();
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const art=(name,kind)=>{let html='';if(['pet','candy','potion'].includes(kind)&&name==='None')return '<svg class="boss-none-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M8 12h8"/></svg>';if(kind==='season'||kind==='weather'){const def=(kind==='season'?M.R.SEASONS:M.R.WEATHERS)[name];html=`<img src="combat_simulator/${def.icon}" alt="" width="30" height="30">`;}else if(kind==='candy'){html='<img src="combat_simulator/Assets/Items/Misc/candy_gathering.png" width="30" height="30" alt="">';}else if(kind==='pet'){const p=CharacterProfile.pets.find(p=>p.name===CharacterProfile.canonicalPet(name));html=R.icon(p?.icon||'pet',30);}else if(kind==='blessing')html=R.icon('divinity',30);else html=name==='None'?'':R.itemIcon(name,30);return html.replaceAll('src="Assets/','src="combat_simulator/Assets/');};

 const bossField=$('boss'),bossLabel=bossField.closest('label'),bossPips=document.createElement('div');bossPips.className='boss-pips';bossPips.setAttribute('role','group');bossPips.setAttribute('aria-label','Gathering Boss');bossLabel.before(bossPips);bossLabel.classList.add('boss-native-field');
 bossPips.innerHTML=M.S.bosses.map(b=>`<button type="button" data-boss-select="${esc(b.id)}" aria-pressed="false"><img src="combat_simulator/${esc(b.img)}" width="40" height="40" alt=""><span>${esc(b.name)}</span></button>`).join('');
 bossPips.addEventListener('click',e=>{const button=e.target.closest('[data-boss-select]');if(!button)return;bossField.value=button.dataset.bossSelect;bossField.dispatchEvent(new Event('input',{bubbles:true}));});
 $('tool').closest('label').classList.add('wide');
 const bonusFields=$('community').closest('.community-panel').parentElement,consumables=document.querySelector('.boss-candy-row'),potionLabel=$('potion').closest('label');potionLabel.classList.remove('wide');consumables.append(potionLabel);bonusFields.append(document.querySelector('.boss-weather-row'),consumables);
 const gearIds=['tool','amulet',...M.slots];
 for(const id of gearIds)$(id+'Rarity').closest('label').classList.add('boss-native-field');
 for(const id of ['candy','potion','season','weather','tool','pet','blessing','amulet',...M.slots]){
  const field=$(id),label=field.closest('label'),caption=label.firstChild.textContent.trim(),wrapper=document.createElement('div');wrapper.className='boss-choice-field'+(label.classList.contains('wide')?' wide':'');label.before(wrapper);wrapper.append(label);label.classList.add('boss-native-field');
  const button=document.createElement('button');button.type='button';button.className='boss-choice';button.dataset.bossPick=id;button.setAttribute('aria-haspopup','dialog');wrapper.append(button);tiles.set(id,{field,button,caption});button.addEventListener('click',()=>open(id));
 }
 const dialog=document.createElement('dialog');dialog.id='boss-choice-dialog';dialog.setAttribute('aria-labelledby','boss-choice-title');dialog.innerHTML='<div class="boss-choice-head"><h2 id="boss-choice-title"></h2><button type="button" id="boss-choice-close" aria-label="Close selector">×</button></div><button type="button" id="boss-choice-back" hidden>← Choose Item</button><div id="boss-divinity-control" hidden></div><div id="boss-level-control" hidden></div><div id="boss-event-control" hidden></div><div id="boss-choice-items"></div>';document.body.append(dialog);$('boss-divinity-control').append($('divinity').closest('label'));$('divinity').addEventListener('input',()=>$('planner').dispatchEvent(new Event('input',{bubbles:true})));$('boss-level-control').append($('level').closest('label'));$('level').addEventListener('input',()=>$('planner').dispatchEvent(new Event('input',{bubbles:true})));$('boss-event-control').append($('eventActive').closest('label'));$('eventActive').addEventListener('input',()=>$('planner').dispatchEvent(new Event('input',{bubbles:true})));let selected=null,pending=null;
 function choiceName(id,option){let name=['season','weather','candy','potion'].includes(id)?option.textContent:option.value||'None';if(id==='candy'&&option.value!=='None'&&!$('eventActive').checked)name=name.replace(' ·',' (inactive) ·');return name;}
 function renderTiles(){for(const button of bossPips.querySelectorAll('button'))button.setAttribute('aria-pressed',String(button.dataset.bossSelect===bossField.value));for(const [id,{field,button,caption}]of tiles){
  const r=gearIds.includes(id)&&field.value!=='None'?M.G.rarities.find(r=>r.name===$(id+'Rarity').value):null;
  const name=choiceName(id,field.selectedOptions[0]);
  button.innerHTML=`<small>${esc(caption)}</small><span class="boss-item-line">${art(field.value,id)}<b class="boss-item-name">${esc(name)}</b>${r?`<span class="boss-selected-rarity">◆ ${esc(r.name)}</span>`:''}</span>`;
  button.style.setProperty('--choice-color',r?.color||'var(--ink)');button.title=name+(r?' · '+r.name:'');button.setAttribute('aria-label',caption+': '+name+(r?', '+r.name:''));
 }}
 function focusChoice(){$('boss-choice-items').querySelector('button[aria-pressed=true]:not(:disabled),button:not(:disabled)')?.focus();}
 function open(id){selected=id;pending=null;renderOptions();dialog.showModal();focusChoice();}
 function renderOptions(){
  const field=tiles.get(selected).field,rarity=pending!==null;
  $('boss-choice-title').textContent=rarity?'Choose Rarity · '+pending:'Choose '+tiles.get(selected).caption;
  $('boss-event-control').hidden=selected!=='candy';$('boss-divinity-control').hidden=selected!=='blessing';$('boss-level-control').hidden=selected!=='tool'||rarity;$('boss-choice-back').hidden=!rarity;$('boss-choice-items').className=rarity?'boss-rarities':'';
  if(rarity){const minimum=CharacterProfile.minimumSkillingRarity(pending);$('boss-choice-items').innerHTML=M.G.rarities.filter(r=>r.tier>=minimum).map(r=>`<button type="button" data-boss-rarity="${esc(r.name)}" aria-pressed="${r.name===$(selected+'Rarity').value}" style="--choice-color:${r.color}">◆ <span><b>${esc(r.name)}</b></span></button>`).join('');return;}
  $('boss-choice-items').innerHTML=[...field.options].map(o=>{let desc=['candy','potion'].includes(selected)||o.textContent===o.value?'':o.textContent;
   if(selected==='pet'){const skill=M.S.bosses.find(b=>b.id===$('boss').value).skill,p=M.pets(skill).find(p=>p.name===o.value);desc+=(desc?' · ':'')+(p?.desc||'');}
   if(selected==='blessing'){const b=M.options.blessings.find(b=>b.name===o.value);desc+=(desc?' · ':'')+(b?.desc||'');}
   return `<button type="button" data-boss-choice="${esc(o.value)}" class="${selected==='pet'&&o.dataset.unowned==='true'?'boss-unowned-option':''}" ${o.disabled?'disabled':''} aria-pressed="${o.value===field.value}">${art(o.value,selected)}<span><b>${esc(choiceName(selected,o))}</b>${desc?`<small>${esc(desc)}</small>`:''}${o.disabled?`<small>${selected==='pet'?'Not owned by this character':'Unavailable at this level'}</small>`:''}</span></button>`;}).join('');
 }
 $('boss-choice-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{pending=null;tiles.get(selected)?.button.focus();});
 $('boss-choice-back').addEventListener('click',()=>{pending=null;renderOptions();focusChoice();});
 $('boss-choice-items').addEventListener('click',e=>{
  const b=e.target.closest('[data-boss-choice],[data-boss-rarity]');if(!b||b.disabled)return;
  const f=tiles.get(selected).field;
  if(b.dataset.bossRarity){f.value=pending;$(selected+'Rarity').value=b.dataset.bossRarity;}
  else if(gearIds.includes(selected)&&b.dataset.bossChoice!=='None'){pending=b.dataset.bossChoice;renderOptions();focusChoice();return;}
  else f.value=b.dataset.bossChoice;
  f.dispatchEvent(new Event('input',{bubbles:true}));dialog.close();
 });
 document.addEventListener('boss-profile-context',()=>{renderTiles();if(dialog.open&&(selected==='blessing'||selected==='tool'||selected==='candy'))renderOptions();});$('planner').addEventListener('input',renderTiles);$('reset').addEventListener('click',renderTiles);renderTiles();
})();
