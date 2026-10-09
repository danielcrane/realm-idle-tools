document.querySelectorAll('.realm-nav-menu').forEach(menu=>{
 menu.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')menu.open=true;});
 menu.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&!menu.contains(document.activeElement))menu.open=false;});
 menu.addEventListener('focusout',event=>{if(!menu.contains(event.relatedTarget))menu.open=false;});
 menu.addEventListener('keydown',event=>{if(event.key==='Escape'){menu.open=false;menu.querySelector('summary').focus();event.preventDefault();}});
 document.addEventListener('click',event=>{if(!menu.contains(event.target))menu.open=false;});
});
(() => {
 const nav=document.querySelector('.realm-nav');if(!nav)return;
 const pages=[...nav.querySelectorAll('a[href]')].map(a=>({name:a.getAttribute('aria-label')||a.textContent.trim(),url:(()=>{const url=new URL(a.href);if(window.CharacterProfile&&['character-profile.html','combat-simulator.html','combat-profile-preview.html','xp-calculator.html','xp-profile-prototype.html','skill-boss-planner.html'].includes(url.pathname.split('/').pop()))url.searchParams.set('character',CharacterProfile.characterId);return url.href;})(),current:a.hasAttribute('aria-current')}));
 const trigger=document.createElement('button');trigger.type='button';trigger.className='realm-search-trigger';trigger.textContent='Search Pages · Ctrl+K';trigger.setAttribute('aria-haspopup','dialog');nav.append(trigger);
 const dialog=document.createElement('dialog');dialog.id='realm-spotlight';dialog.setAttribute('aria-label','Navigate Pages');
 dialog.innerHTML='<div class="realm-spotlight-head"><label for="realm-spotlight-query">Navigate Pages</label><button type="button" aria-label="Close page search">Esc</button></div><input id="realm-spotlight-query" type="search" placeholder="Search pages…" autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls="realm-spotlight-results"><div id="realm-spotlight-results" role="listbox" aria-label="Pages"></div><p class="realm-spotlight-help">↑ ↓ to choose · Enter to open · Esc to close</p>';
 document.body.append(dialog);
 const input=dialog.querySelector('input'),list=dialog.querySelector('[role=listbox]');let matches=[],selected=0,previousFocus=null;
 function render(){
  const words=input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  matches=pages.filter(p=>words.every(w=>(p.name+' '+(p.name==='Character Setup'?'profile skills pets gear inventory museum':'')).toLowerCase().includes(w)));
  selected=0;list.replaceChildren();
  matches.forEach((page,index)=>{const row=document.createElement('div');row.id='realm-spotlight-option-'+index;row.className='realm-spotlight-option';row.setAttribute('role','option');row.textContent=page.name+(page.current?' · Current Page':'');row.addEventListener('click',()=>location.assign(page.url));list.append(row);});
  if(!matches.length){const empty=document.createElement('p');empty.className='realm-spotlight-empty';empty.textContent='No matching pages.';list.append(empty);}
  highlight();
 }
 function highlight(){[...list.querySelectorAll('[role=option]')].forEach((el,i)=>el.setAttribute('aria-selected',String(i===selected)));const active=list.querySelector('[aria-selected=true]');if(active){input.setAttribute('aria-activedescendant',active.id);active.scrollIntoView({block:'nearest'});}else input.removeAttribute('aria-activedescendant');}
 function open(){if(dialog.open)return;previousFocus=document.activeElement;nav.querySelectorAll('details').forEach(d=>d.open=false);input.value='';render();dialog.showModal();input.focus();}
 trigger.addEventListener('click',open);input.addEventListener('input',render);
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{if(previousFocus?.isConnected)previousFocus.focus();});
 window.addEventListener('keydown',event=>{
  if((event.ctrlKey||event.metaKey)&&!event.altKey&&event.key.toLowerCase()==='k'){event.preventDefault();event.stopImmediatePropagation();if(dialog.open)dialog.close();else open();return;}
  if(!dialog.open)return;
  if(['Escape','ArrowDown','ArrowUp','Enter'].includes(event.key)){
   event.preventDefault();event.stopImmediatePropagation();
   if(event.key==='Escape')dialog.close();
   else if(event.key==='Enter'&&matches[selected])location.assign(matches[selected].url);
   else if(matches.length){selected=(selected+(event.key==='ArrowDown'?1:-1)+matches.length)%matches.length;highlight();}
  }
 },true);
})();
