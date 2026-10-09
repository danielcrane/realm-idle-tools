/* Character identity is fixed for each page visit, including background storage links. */
(() => {
 'use strict';
 const M=CharacterProfile;
 function navigate(id){const url=new URL(location.href);url.searchParams.set('character',id);location.assign(url.href);}
 let source=null;
 window.CharacterPicker={navigate,setSource:value=>{source=value;document.dispatchEvent(new Event('character-source-changed'));}};
 document.addEventListener('DOMContentLoaded',()=>{
  if(window.ProfileStorageLink?.active)return;
  const editor=location.pathname.endsWith('/character-profile.html');
  const panel=document.createElement('section');panel.className='character-picker';panel.setAttribute('aria-label','Character Selection');
  panel.innerHTML='<label>Character<select id="character-select" aria-label="Character"><option>Loading Characters…</option></select></label><span class="character-picker-actions"></span><span id="character-picker-status" role="status"></span>';
  const anchor=document.querySelector('.profile-bar,.profile-panel,.boss-profile,#profile-connection');
  if(anchor)anchor.before(panel);else document.querySelector('.realm-nav').after(panel);
  const select=panel.querySelector('select'),actions=panel.querySelector('.character-picker-actions'),status=panel.querySelector('[role="status"]');
  let link=null,characters=[],refreshing=false;
  const legacySelect=editor?null:document.querySelector('#profile-select,#boss-profile-select');
  if(!editor&&anchor){
   // Keep the integration's backing controls, but expose only useful actions in the single bar.
   anchor.hidden=true;
   const edit=anchor.querySelector('a[href*="character-profile.html"]');if(edit){
    edit.className='character-edit-link';edit.setAttribute('aria-label','Edit Character');edit.title='Edit Character';
    edit.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 3 5 5-12 12-6 1 1-6Z"/><path d="m13 6 5 5"/></svg>';
    panel.append(edit);
   }
   for(const id of ['reset-profile','profile-state']){const control=anchor.querySelector('#'+id);if(control)actions.append(control);}
   const notice=anchor.querySelector('#profile-status,#boss-profile-status');if(notice)panel.append(notice);
   if(legacySelect){
    legacySelect.hidden=true;
    const label=legacySelect.closest('label')||anchor.querySelector('label[for="'+legacySelect.id+'"]');if(label)label.hidden=true;
   }
  }
  const report=text=>{status.textContent=text;};
  function render(rows){
   characters=rows;
   if(!rows.some(row=>row.id===M.characterId))rows.push({id:M.characterId,name:M.characterId==='default'?'First Character':'Character Unavailable'});
   const counts=new Map();for(const row of rows)counts.set(row.name,(counts.get(row.name)||0)+1);
   select.replaceChildren(...rows.map(row=>new Option(row.name+(counts.get(row.name)>1?' · '+row.id.slice(0,8):''),row.id)));
   const mode=legacySelect?.value||source?.mode||'saved';
   if(!editor){
    select.add(new Option('Custom Setup','mode:custom'));
    const backup=legacySelect?.querySelector('option[value="backup"]');
    if(backup||source?.mode==='backup')select.add(new Option(backup?.textContent||source.name+' · Backup','mode:backup'));
   }
   select.value=mode==='custom'||mode==='backup'?'mode:'+mode:M.characterId;select.disabled=false;
  }
  async function refresh(popup=false){
   if(refreshing)return;refreshing=true;
   try{
    if(editor||location.protocol!=='file:')render(M.listCharacters(localStorage));
    else{
     if(!link){link=PreviewStorageLink.current()||PreviewStorageLink.create(new URL('../character-profile.html',document.querySelector('script[src$="character_profile/model.js"]').src),()=>{});}
     await link.ensureConnected(popup);
     render(await link.list());
    }
    report('');
   }catch(error){link=null;select.disabled=true;report('Characters could not be loaded. Use Refresh Characters to reconnect.');}
   finally{refreshing=false;}
  }
  function changeSource(mode){
   if(legacySelect){legacySelect.value=mode;legacySelect.dispatchEvent(new Event('change'));}
   else if(source)source.change(mode);
  }
  select.addEventListener('change',()=>{const id=select.value;if(id.startsWith('mode:')){changeSource(id.slice(5));return;}if(id===M.characterId){changeSource('saved');return;}render(characters);navigate(id);});
  if(legacySelect)new MutationObserver(()=>render(characters)).observe(legacySelect,{childList:true});
  document.addEventListener('character-source-changed',()=>{render(characters);if(source?.message!==undefined)report(source.message);});
  const button=(id,label,fn)=>{const b=document.createElement('button');b.type='button';b.id=id;b.textContent=label;b.addEventListener('click',fn);actions.append(b);};
  button('refresh-characters','Refresh Characters',()=>refresh(true));
  const refreshButton=actions.querySelector('#refresh-characters');refreshButton.setAttribute('aria-label','Refresh Characters');refreshButton.title='Refresh Characters';
  refreshButton.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.1 6.1A8 8 0 0 1 19.5 9M4.5 15a8 8 0 0 0 13.4 2.9"/></svg>';
  if(editor){
   const dialog=document.createElement('dialog');dialog.id='new-character-dialog';
   dialog.innerHTML='<form id="new-character-form"><h2>New Character</h2><label>Character Name<input id="new-character-name" maxlength="60" required autocomplete="off"></label><p id="new-character-error" role="alert"></p><div class="actions"><button type="button" id="cancel-new-character">Cancel</button><button type="submit">Create Character</button></div></form>';
   document.body.append(dialog);let duplicate=false;
   function open(copy){duplicate=copy;dialog.querySelector('h2').textContent=copy?'Duplicate Character':'New Character';dialog.querySelector('input').value='';dialog.querySelector('[role="alert"]').textContent='';dialog.showModal();dialog.querySelector('input').focus();}
   button('new-character','New Character',()=>open(false));button('duplicate-character','Duplicate Character',()=>open(true));
   dialog.querySelector('#cancel-new-character').onclick=()=>dialog.close();
   dialog.querySelector('form').onsubmit=event=>{
    event.preventDefault();
    try{const p=duplicate?M.validate(JSON.parse(localStorage.getItem(M.STORAGE_KEY))):M.defaults();p.name=dialog.querySelector('input').value;const id=M.createCharacter(localStorage,p);navigate(id);}
    catch(error){dialog.querySelector('[role="alert"]').textContent=error.message;}
   };
  }
  const pages=new Set(['character-profile.html','combat-simulator.html','combat-profile-preview.html','xp-calculator.html','xp-profile-prototype.html','skill-boss-planner.html']);
  function scopeLink(a){const url=new URL(a.getAttribute('href'),document.baseURI);if(pages.has(url.pathname.split('/').pop())&&url.origin===location.origin){url.searchParams.set('character',M.characterId);a.href=url.href;}}
  for(const a of document.querySelectorAll('a[href]'))scopeLink(a);
  document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a)scopeLink(a);},true);
  addEventListener('storage',e=>{if(e.key===null||e.key.startsWith(M.LEGACY_STORAGE_KEY))refresh();});
  addEventListener('focus',()=>refresh());
  document.querySelector('#profile-name')?.addEventListener('change',()=>refresh());
  document.addEventListener('character-saved',()=>refresh());
  refresh();
 });
})();
