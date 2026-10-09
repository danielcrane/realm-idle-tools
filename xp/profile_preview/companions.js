/* Character Profile's companion tiles and searchable choice cards, scoped to XP. */
(() => {
 const M=CharacterProfile,P=XPPrototype,$=id=>document.getElementById(id);
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const art=(name,size=36)=>M.R.icon(name,size).replaceAll('src="Assets/','src="combat_simulator/Assets/');
 const plain=s=>{const el=document.createElement('span');el.innerHTML=s||'';return el.textContent;};
 for(const id of ['blessing','pet'])$(id).closest('label').hidden=true;
 const tiles=document.createElement('div');tiles.className='xp-companions';$('companions').append(tiles);
 tiles.innerHTML=['blessing','pet'].map(id=>`<button type="button" class="companion-choice" id="choose-${id}" aria-haspopup="dialog"></button>`).join('');
 const dialog=document.createElement('dialog');dialog.id='companion-picker';dialog.setAttribute('aria-labelledby','companion-title');
 dialog.innerHTML='<div class="picker-heading"><h2 id="companion-title"></h2><button type="button" id="companion-close" aria-label="Close Picker">×</button></div><label class="picker-search">Search<input id="companion-search" type="search" placeholder="Search choices…"></label><label id="unowned-control" class="muted"><input id="allow-unowned" type="checkbox"> Allow Unowned Pets for This Plan</label><p id="companion-note" class="muted"></p><div id="companion-choices" class="gear-choices"></div>';
 document.body.append(dialog);let slot=null;
 function refresh(){
  const pet=M.pets.find(p=>p.name===M.canonicalPet($('pet').value)),auto=$('skill').value==='Divinity'&&$('autoBlessing').checked;
  const name=auto?P.resolve(XPPrototypeUI.read()).blessing:$('blessing').value,b=P.relevantBlessings($('skill').value).find(b=>b.name===name);
  $('choose-pet').innerHTML=art(pet?.icon||'pet')+`<span><small>Pet</small><b>${esc(pet?.name||'Choose a Companion')}</b></span>`;
  $('choose-blessing').innerHTML=art('divinity')+`<span><small>Blessing${auto?' · Automatic':''}</small><b>${b&&b.name!=='None'?'Lv. '+b.level+' · '+esc(b.name):'Choose a Blessing'}</b></span>`;
 }
 function choices(){
  const skill=$('skill').value,owned=window.XPProfileOwnership(),query=$('companion-search').value.toLowerCase().trim(),level=Number(skill==='Divinity'?$('from').value:$('divinityLevel').value);
  let rows;
  if(slot==='pet'){
   const relevant=P.relevantPets(skill);rows=M.pets.flatMap(p=>{const candidate=relevant.find(r=>M.canonicalPet(r.name)===p.name);if(!candidate)return [];
    const has=owned===null||owned.includes(p.name);return [{value:candidate.name,name:p.name,search:p.variants.map(v=>v.name).join(' '),desc:plain(p.desc),icon:'<span class="picker-pet-icons">'+p.variants.map(v=>art(v.icon,32)).join('')+'</span>',disabled:!has&&!$('allow-unowned').checked&&M.canonicalPet($('pet').value)!==p.name,hint:owned===null?'':has?'Owned':'Unowned · Experiment'}];});
  }else rows=P.relevantBlessings(skill).filter(b=>b.name!=='None').map(b=>({value:b.name,name:'Lv. '+b.level+' · '+b.name,desc:plain(b.desc),icon:art('divinity',34),disabled:b.level>level,hint:b.level>level?'Requires Divinity '+b.level:''}));
  rows=rows.filter(r=>(r.name+' '+r.desc+' '+(r.search||'')).toLowerCase().includes(query));
  const selected=$(slot).value;
  $('companion-choices').innerHTML=[{value:'None',name:'None',desc:'Leave this slot empty',icon:'<span class="empty-choice">−</span>'},...rows].map(r=>`<button type="button" class="gear-choice" data-value="${esc(r.value)}" aria-pressed="${selected===r.value}" ${r.disabled?'disabled':''}>${r.icon}<span><b>${esc(r.name)}</b><small>${esc(r.desc)}</small>${r.hint?'<small>'+esc(r.hint)+'</small>':''}</span></button>`).join('')+(rows.length?'':'<p class="muted">No matching choices.</p>');
 }
 for(const id of ['pet','blessing'])$('choose-'+id).addEventListener('click',()=>{
  slot=id;$('companion-title').textContent=id==='pet'?'Choose a Companion':'Choose a Blessing';$('companion-search').value='';$('allow-unowned').checked=false;
  $('unowned-control').hidden=id!=='pet'||window.XPProfileOwnership()===null;
  $('companion-note').textContent=id==='blessing'&&$('skill').value==='Divinity'&&$('autoBlessing').checked?'Choosing a blessing turns off automatic selection.':'';
  choices();dialog.showModal();$('companion-search').focus();
 });
 $('companion-search').addEventListener('input',choices);$('allow-unowned').addEventListener('change',choices);
 $('companion-choices').addEventListener('click',e=>{const button=e.target.closest('[data-value]');if(!button||button.disabled)return;if(slot==='blessing')$('autoBlessing').checked=false;$(slot).value=button.dataset.value;$(slot).dispatchEvent(new Event('input',{bubbles:true}));dialog.close();});
 $('companion-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('close',()=>{$('choose-'+slot)?.focus();slot=null;});
 dialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();dialog.close();}});
 for(const event of ['xp-result','xp-invalid','xp-profile-context'])document.addEventListener(event,()=>{try{refresh();}catch{}});refresh();
})();
