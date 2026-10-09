(function(root){
  'use strict';
  const M=root.CharacterProfile,I=root.CharacterGameImport,$=id=>document.getElementById(id);
  const backupKey=M.STORAGE_KEY+'-pre-import';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function init({getProfile,replace,canEdit,report}){
    let pending=null,limit=100;
    const date=s=>s?new Date(s).toLocaleString('en-GB'):'Unknown';
    function update(mutator){if(!canEdit())return;try{const next=structuredClone(getProfile());mutator(next);replace(M.validate(next));}catch(e){report(e.message,true);}}
    function render(){
      const p=getProfile(),inv=p.inventory;
      $('inventory-coverage').value=inv.complete?'complete':'partial';
      const search=$('inventory-search').value.toLowerCase().trim(),category=$('inventory-category').value,showZero=$('inventory-show-zero').checked;
      const names=[...new Set([...Object.keys(inv.items),...(inv.complete&&showZero?I.catalog:[])])].sort();
      const rows=names.filter(n=>(!search||n.toLowerCase().includes(search))&&(!category||I.category(n)===category)&&(showZero||(Object.hasOwn(inv.items,n)?inv.items[n].quantity:0)!==0));
      $('inventory-summary').textContent=`${rows.length} matching items · ${Object.values(inv.items).filter(r=>r.quantity>0).length} owned item types · ${inv.complete?'Complete snapshot; unlisted items are zero':'Partial inventory; unlisted quantities are unknown'}`;
      $('inventory-rows').innerHTML=rows.length?rows.slice(0,limit).map(n=>{
        const row=inv.items[n]||{quantity:0,rarities:null};
        const image=M.R.itemIcon(n,32).replaceAll('src="Assets/','src="combat_simulator/Assets/').replace(/alt="[^"]*"/g,'alt=""');
        return `<div class="inventory-row"><div class="inventory-item-name">${image}<span><b>${esc(n)}</b><small>${I.category(n)}</small></span></div><label>Quantity<input type="number" data-inventory-total="${esc(n)}" min="0" max="9007199254740991" step="1" placeholder="Unknown" value="${row.quantity??''}" aria-label="${esc(n)} quantity"></label><button type="button" data-inventory-unknown="${esc(n)}">Mark Unknown</button>${row.rarities?`<details><summary>Rarity Breakdown</summary><div class="inventory-rarities">${Object.entries(row.rarities).map(([tier,count])=>`<label style="--rarity-color:${M.R.getRarityByTier(Number(tier)).color}">${M.R.getRarityByTier(Number(tier)).name}<input type="number" min="0" max="9007199254740991" step="1" required data-inventory-rarity="${esc(n)}" data-tier="${tier}" value="${count}" aria-label="${esc(n)} ${M.R.getRarityByTier(Number(tier)).name} quantity"></label>`).join('')}</div></details>`:''}</div>`;
      }).join(''):'<div class="empty"><h3>No Matching Items</h3><p>Add materials above, import a game save, or adjust the filters.</p></div>';
      $('inventory-more').hidden=rows.length<=limit;
    }
    $('inventory-catalog').innerHTML=I.catalog.map(n=>`<option value="${esc(n)}"></option>`).join('');
    $('inventory-add').addEventListener('submit',e=>{e.preventDefault();const n=$('inventory-item').value.trim(),v=$('inventory-quantity').value;
      if(Object.hasOwn(getProfile().inventory.items,n)){report('This item is already listed. Search for it to edit its quantity.',true);return;}
      update(p=>{if(['__proto__','constructor','prototype'].includes(n))throw Error('Invalid item name.');p.inventory.items[n]={quantity:v===''?null:Number(v),rarities:null};});
    });
    $('inventory-coverage').addEventListener('change',e=>update(p=>{p.inventory.complete=e.target.value==='complete';}));
    for(const id of ['inventory-search','inventory-category','inventory-show-zero'])$(id).addEventListener(id==='inventory-search'?'input':'change',()=>{limit=100;render();});
    $('inventory-more').addEventListener('click',()=>{limit+=100;render();});
    $('inventory-rows').addEventListener('change',e=>{
      const el=e.target,n=el.dataset.inventoryTotal??el.dataset.inventoryRarity;if(!n)return;
      if(!el.checkValidity()){el.reportValidity();report('Enter a valid whole quantity. This edit has not been saved.',true);return;}
      const value=el.value,rarity=el.dataset.tier;
      update(p=>{if(rarity){const row=p.inventory.items[n];row.rarities[rarity]=Number(value);row.quantity=Object.values(row.rarities).reduce((a,b)=>a+b,0);}else p.inventory.items[n]={quantity:value===''?null:Number(value),rarities:null};});
    });
    $('inventory-rows').addEventListener('click',e=>{const n=e.target.closest('[data-inventory-unknown]')?.dataset.inventoryUnknown;if(n)update(p=>{p.inventory.items[n]={quantity:null,rarities:null};});});
    $('import-game').addEventListener('click',()=>{if(canEdit()){$('game-save-file').value='';$('game-save-file').click();}});
    $('game-save-file').addEventListener('change',async e=>{
      const file=e.target.files[0];if(!file)return;
      try{
        if(file.size>2e6)throw Error('Game saves must be smaller than 2 MB.');pending=I.read(await file.text());
        const p=pending.profile;
        $('game-import-summary').textContent=`Game saved ${date(pending.savedAt)} · ${p.pets.length} pet groups · ${Object.keys(p.museum.items).length} museum items · ${Object.keys(p.inventory.items).length} owned item types`;
        $('game-import-sections').innerHTML=Object.entries(I.sections).map(([key,label])=>`<label class="check"><input type="checkbox" value="${key}" ${pending.available.includes(key)?key==='currentGear'?'':'checked':'disabled'}>${label}${!pending.available.includes(key)?' — Unavailable':''}</label>`).join('');
        $('game-import-warnings').innerHTML=pending.warnings.map(w=>`<p class="warning">${esc(w)}</p>`).join('');$('game-import-error').textContent='';$('game-import-dialog').showModal();
      }catch(error){pending=null;report(error.message+' Your profile has not changed.',true);}
    });
    $('game-import-cancel').addEventListener('click',()=>$('game-import-dialog').close());
    $('game-import-dialog').addEventListener('close',()=>{pending=null;});
    function persistWithBackup(next){
      if(!canEdit())throw Error('Resolve the current editing or storage issue first.');
      const prior=M.encode(getProfile());
      // Refuse the import if either write fails. The existing profile remains recoverable.
      localStorage.setItem(backupKey,prior);localStorage.setItem(M.STORAGE_KEY,JSON.stringify(M.validate(next)));replace(next);
    }
    $('game-import-apply').addEventListener('click',()=>{
      if(!pending)return;
      try{const selected=[...$('game-import-sections').querySelectorAll('input:checked')].map(el=>el.value);if(!selected.length)throw Error('Select at least one section.');
        const next=I.apply(getProfile(),pending,selected);persistWithBackup(next);$('game-import-dialog').close();report('Game save imported. '+(selected.includes('currentGear')?'Current gear added as a new set. ':'')+'Existing combat gear sets preserved.');
      }catch(e){$('game-import-error').textContent=e.message+' Import has not been applied.';}
    });
    return {render};
  }
  root.ProfileInventoryUI={init};
})(globalThis);
