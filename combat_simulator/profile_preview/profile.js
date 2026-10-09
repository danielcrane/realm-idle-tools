/* Preview-only profile integration. Game saves and the original simulator are never written. */
(() => {
 'use strict';
 const M=CharacterProfile,B=CombatProfileBridge,metaKey=CharacterProfile.scopedKey('realm-public-combat-profile-preview-link'),backupKey=CharacterProfile.scopedKey('realm-public-combat-profile-preview-profile');
 let profile=null,meta={mode:'shared',setId:null,base:null},profileRaw=null,bonusOverride=false,levelOpen=false,bonusOpen=false;
 let link=null,linkStatus='';
 const supplyExpanded={};
 const newSetDialog=document.createElement('dialog');
 newSetDialog.id='preview-new-set-dialog';
 newSetDialog.setAttribute('aria-labelledby','preview-new-set-title');
 newSetDialog.innerHTML=`<form id="preview-new-set-form"><div class="dialog-head"><h2 id="preview-new-set-title">Save as New Set</h2><button type="button" class="close" id="preview-new-set-cancel" aria-label="Cancel">×</button></div><div class="method-body"><label class="field"><span>Set Name</span><input id="preview-new-set-name" required autocomplete="off" value="Combat Experiment"></label><p id="preview-new-set-error" role="alert" class="danger" hidden></p><div class="preview-actions"><button type="submit" id="preview-new-set-submit">Save Set</button></div></div></form>`;
 document.body.append(newSetDialog);
 let newSetConfig=null,newSetSaving=false;
 $('preview-new-set-cancel').addEventListener('click',()=>newSetDialog.close());
 newSetDialog.addEventListener('cancel',e=>{if(newSetSaving)e.preventDefault();});
 $('preview-new-set-form').addEventListener('submit',async e=>{
  e.preventDefault();if(newSetSaving)return;
  const name=$('preview-new-set-name').value.trim(),error=$('preview-new-set-error');
  error.hidden=true;
  if(!name){error.textContent='Enter a name for the gear set.';error.hidden=false;$('preview-new-set-name').focus();return;}
  newSetSaving=true;$('preview-new-set-submit').disabled=true;$('preview-new-set-cancel').disabled=true;
  $('preview-new-set-submit').textContent='Saving…';
  try{
   const id=crypto.randomUUID(),edited=newSetConfig;
   await writeProfile(p=>p.combatSets.push(B.setFromConfig(edited,id,name)));
   meta.setId=id;meta.base=B.fromProfile(profile,id,edited);changed();newSetDialog.close();
  }catch(err){error.textContent=err.message;error.hidden=false;}
  finally{newSetSaving=false;$('preview-new-set-submit').disabled=false;$('preview-new-set-cancel').disabled=false;$('preview-new-set-submit').textContent='Save Set';}
 });
 const oldPickerItems=renderPickerItems;
 renderPickerItems=function(){
  oldPickerItems();
  if(pickerState.slot!=='ammo'||pickerState.filter!=='magic')return;
  const root=$('picker-items');
  for(const [label,infinite] of [['Runes',true],['Spells',false]]){
   const choices=[...root.querySelectorAll('[data-choice]')].filter(el=>{
    const equipment=R.EQUIPMENT[el.dataset.choice];
    return equipment?.magicMult&&!!equipment.infinite===infinite;
   });
   if(!choices.length)continue;
   const group=document.createElement('details');group.className='preview-magic-group';
   group.open=!!pickerState.query.trim();
   group.innerHTML=`<summary>${label} <span class="mini-badge">${choices.length}</span></summary><div class="preview-magic-choices"></div>`;
   group.lastElementChild.append(...choices);root.append(group);
  }
 };
 document.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(['foods','ammo'].includes(button?.dataset.add))supplyExpanded[button.dataset.add]=true;
  if(button?.id==='preview-use-inventory'){supplyExpanded.foods=false;supplyExpanded.ammo=false;}
 },true);
 try{meta={...meta,...JSON.parse(localStorage.getItem(metaKey)||'{}')};}catch{}
 if(tab==='world')tab='loadout';
 const oldSave=save,oldLoadout=renderLoadout,oldSupplies=renderSupplies,oldWorld=renderWorld;
 const status=()=>profile&&meta.base?B.modified(config,meta.base):null;
 function storeMeta(){try{localStorage.setItem(metaKey,JSON.stringify(meta));}catch{}}
 function updateStatus(){const s=status(),el=$('profile-setup-state');if(el)el.textContent=s&&Object.values(s).some(Boolean)?'Modified for Simulation':'Using Profile Values';}
 save=function(){oldSave();storeMeta();updateStatus();};
 function connection(){
  CharacterPicker.setSource({mode:profile?(meta.mode==='backup'?'backup':'saved'):'custom',name:profile?.name,message:linkStatus,change:mode=>$(mode==='custom'?'preview-manual':'preview-connect')?.click()});
  $('profile-connection').innerHTML=`<div class="preview-connection"><div><span class="eyebrow">Character Profile</span><h2>${profile?esc(profile.name):'Manual Setup'}</h2><p class="note">${linkStatus?esc(linkStatus):profile?(meta.mode==='backup'?'Using a profile backup. Profile edits stay in this simulator; export the updated backup to keep them.':'Connected to Character Profile in this browser. Simulation edits stay here until you explicitly save them.'):'No character profile connected. Connect Character Profile to use your saved sets, or continue with a manual setup.'}</p></div><div class="preview-actions"><a href="../character-profile.html" target="_blank" rel="noopener">Open Character Profile ↗</a><button id="preview-connect">Connect Character Profile</button><button id="preview-load-profile">Load Profile Backup</button>${profile?'<button id="preview-export-profile">Export Profile Backup</button><button id="preview-manual">Use Manual Setup</button>':''}</div></div>`;
 }
 renderLoadout=function(){
  levelOpen=$('preview-levels')?.open??levelOpen;bonusOpen=$('preview-bonuses')?.open??bonusOpen;
  oldLoadout();
  const levels=$('loadout').lastElementChild,details=document.createElement('details');details.id='preview-levels';details.className='panel';details.open=levelOpen;
  details.innerHTML='<summary>Combat Skill Levels</summary><p class="note">Try different levels here. Profile XP is used for unchanged levels; changed levels start at their XP threshold.</p>';
  levels.classList.remove('panel');levels.querySelector('h3')?.remove();details.append(levels);
  details.insertAdjacentHTML('beforeend',`<div class="preview-actions"><button id="preview-reset-levels" ${profile?'':'disabled'}>Reset Levels to Profile</button><button id="preview-save-levels" ${profile?'':'disabled'}>Update Profile Levels</button></div>`);$('loadout').append(details);
  const set=profile?.combatSets.find(s=>s.id===meta.setId),weapon=R.EQUIPMENT[set?.equipment.weapon?.name],icon=weapon?.magic?'magic':weapon?.ranged?'ranged':weapon?'attack':'combat';
  const omitted=set?[...Object.entries(set.equipment).filter(([slot,item])=>meta.base?.equip[slot]!==item.name).map(([,item])=>item.name),...(set.pet&&meta.base?.equip.pet!==set.pet?[set.pet]:[]),...(set.blessing&&meta.base?.prayer!==set.blessing?[set.blessing]:[])]:[];
  $('loadout').insertAdjacentHTML('afterbegin',`<div class="panel preview-set"><label for="preview-set">Saved Gear Set</label><div class="preview-set-row">${R.icon(icon,28)}<select id="preview-set" ${profile?'':'disabled'}>${options([['','Custom Setup'],...(profile?.combatSets||[]).map(s=>[s.id,s.name])],meta.setId||'')}</select></div><p id="profile-setup-state" class="profile-note">${profile?'Using Profile Values':'Manual simulation setup'}</p><div class="preview-actions"><button id="preview-reset-profile" ${profile?'':'disabled'}>Reset to Profile</button><button id="preview-save-set" ${set?'':'disabled'}>Update Saved Set</button><button id="preview-new-set" ${profile?'':'disabled'}>Save as New Set</button></div>${omitted.length?`<p class="note">These saved selections are not compatible with this combat setup and were omitted: ${esc(omitted.join(', '))}.</p>`:''}</div>`);
  $('loadout').insertAdjacentHTML('beforeend',`<details id="preview-bonuses" class="panel" ${bonusOpen?'open':''}><summary>Character Bonuses${status()?.bonuses?' · Modified':profile?' · From Profile':''}</summary><div id="preview-bonus-summary"></div><label class="check"><input id="preview-bonus-toggle" type="checkbox" ${bonusOverride||!profile?'checked':''}>Override for This Simulation</label><div id="preview-bonus-controls" ${profile&&!bonusOverride?'hidden':''}></div></details>`);
  connection();updateStatus();
 };
 renderWorld=function(){
  oldWorld();const world=$('world'),conditions=world.querySelector('.conditions-panel');$('scenario-conditions').replaceChildren();if(conditions)$('scenario-conditions').append(conditions);
  const target=$('preview-bonus-controls');if(target)target.replaceChildren(...world.children);
  const stats=config.museumByStyle[E.snapshot(config).style];
  if($('preview-bonus-summary'))$('preview-bonus-summary').innerHTML=`<div class="preview-bonus-grid"><span>VIP I <b>${config.vip?'On':'Off'}</b></span><span>VIP II <b>${config.vip2?'On':'Off'}</b></span><span>Community Centre <b>${config.communityTier*25}%</b></span><span>Boss Clears <b>${config.bosses.length}</b></span><span>Kill Records <b>${Object.keys(config.killLog).length}</b></span></div><p class="note">Museum (${esc(E.snapshot(config).style)}): ${Object.entries(stats).map(([key,value])=>`${esc(statLabels[key]||key)} +${key==='rngBonus'?fmt(value):pct(value)}`).join(' · ')}</p>`;
 };
 renderSupplies=function(){
  oldSupplies();
  for(const type of ['foods','ammo']){
   const weakest=type==='foods'?config.foodWorstFirst:config.ammoWorstFirst,dir=weakest?1:-1;
   const fields=[...$('supplies').querySelectorAll(`[data-array="${type}"][data-key="name"]`)];
   fields.sort((a,b)=>{
    const left=config[type][Number(a.dataset.index)],right=config[type][Number(b.dataset.index)];
    if(type==='foods')return dir*(R.FOOD_HEALS[left.name]-R.FOOD_HEALS[right.name])||left.name.localeCompare(right.name);
    const l=R.EQUIPMENT[left.name],r=R.EQUIPMENT[right.name],magic=!!R.EQUIPMENT[config.equip.weapon]?.magic;
    // Keep arrows and spells together; their different bonus units are not comparable.
    const group=e=>!!e.magicMult===magic?0:1;
    return group(l)-group(r)||dir*((l.rngBonus||l.magicMult||0)-(r.rngBonus||r.magicMult||0))||dir*(left.tier-right.tier)||left.name.localeCompare(right.name);
   });
   const rows=fields.map(el=>el.closest('.supply-row')),add=$('supplies').querySelector(`[data-add="${type}"]`);
   // Move rendered rows only, retaining their original data indices and simulation order.
   for(const row of rows)add.before(row);
   const order=type==='foods'?(weakest?'Lowest healing first':'Highest healing first'):(weakest?'Weakest first':'Strongest first')+' · Arrows and spells grouped';
   if(rows.length)add.insertAdjacentHTML('beforebegin',`<p class="note supply-order-note">${order}</p>`);
   if(rows.length<=4)continue;
   const details=document.createElement('details');details.className='preview-supply-list';details.dataset.supplyList=type;details.open=!!supplyExpanded[type];
   const total=config[type].reduce((sum,row)=>sum+row.qty,0);
   details.innerHTML=`<summary><span><b>${rows.length} ${type==='foods'?'Food Entries':'Ammunition Stacks'}</b><small>${fmt(total)} ${type==='foods'?'items':'spare units'} · ${weakest?'Weakest first':'Strongest first'}</small></span><span class="supply-expand-label">Expand to Edit</span><span class="supply-collapse-label">Collapse List</span></summary>`;
   rows[0].before(details);for(const row of rows)details.append(row);
   details.addEventListener('toggle',()=>{if(details.isConnected)supplyExpanded[type]=details.open;});
  }
  $('supplies').insertAdjacentHTML('afterbegin',`<div class="panel"><h3>Profile Inventory</h3><p class="note">Copy known food and ammunition quantities into this simulation. One equipped finite ammo item is reserved from owned totals. Potions use remaining minutes, so choose those separately below.</p><button id="preview-use-inventory" ${profile?'':'disabled'}>Use Profile Inventory</button><p id="preview-supply-note" class="note"></p></div>`);
 };
 function receive(next,force=false){
  profile=M.validate(next);if(meta.setId===null)meta.setId=profile.combatSets[0]?.id||'';
  if(meta.setId&&!profile.combatSets.some(s=>s.id===meta.setId))meta.setId='';
  const nextBase=B.fromProfile(profile,meta.setId,config);
  config=force||!meta.base?nextBase:B.merge(config,meta.base,nextBase);meta.base=nextBase;bonusOverride=B.modified(config,nextBase).bonuses;
  changed();
 }
 function acceptLinked(raw,force=false){
  if(raw===null)throw Error('No saved profile was found. Open Character Profile and save your setup there first.');
  const next=M.validate(JSON.parse(raw));if(!force&&raw===profileRaw)return;profileRaw=raw;linkStatus='';receive(next,force);
 }
 async function connectLinked(force=false,popup=false){
  linkStatus='Connecting to your saved Character Profile…';connection();
  if(!link)link=PreviewStorageLink.create(new URL('../character-profile.html',document.baseURI),msg=>{
   if(meta.mode!=='bridge')return;
   try{if(msg.error)throw Error(msg.error);acceptLinked(msg.raw);}catch(error){linkStatus=error.message;connection();}
  });
  meta.mode='bridge';await link.connect(popup);acceptLinked(await link.read(),force);
 }
 async function readBrowser(force=false){
  if(location.protocol==='file:')return connectLinked(force);
  const raw=localStorage.getItem(M.STORAGE_KEY);if(!raw)throw Error('No profile found for this browser location. Open Character Profile or load its exported backup.');
  const next=M.validate(JSON.parse(raw));if(!force&&raw===profileRaw)return;
  profileRaw=raw;meta.mode='shared';receive(next,force);
 }
 async function writeProfile(mutator){
  let latest=profile,linkedRaw=null;
  if(meta.mode==='bridge'){linkedRaw=await link.read();if(!linkedRaw)throw Error('The saved profile is unavailable. Reconnect before saving.');latest=M.validate(JSON.parse(linkedRaw));}
  if(meta.mode==='shared'){const raw=localStorage.getItem(M.STORAGE_KEY);if(!raw)throw Error('The browser profile was removed. Reconnect before saving.');latest=M.validate(JSON.parse(raw));}
  const next=structuredClone(latest);mutator(next);const valid=M.validate(next);
  if(meta.mode==='bridge'){profileRaw=await link.write(linkedRaw,valid);}
  else if(meta.mode==='shared'){
   localStorage.setItem(M.STORAGE_KEY+'-before-preview-edit',M.encode(latest));
   const raw=JSON.stringify(valid);localStorage.setItem(M.STORAGE_KEY,raw);profileRaw=raw;
  }else localStorage.setItem(backupKey,M.encode(valid));
  receive(valid);toast(meta.mode!=='backup'?'Character Profile updated.':'Loaded profile backup updated. Export it to keep these changes.');
 }
 document.addEventListener('change',e=>{
  try{
   if(e.target.id==='preview-set'){
    meta.setId=e.target.value;const nextBase=B.fromProfile(profile,meta.setId,config);Object.assign(config,structuredClone(B.gear(nextBase)));meta.base=nextBase;changed();
   }
   if(e.target.id==='preview-bonus-toggle'){
    bonusOverride=e.target.checked;
    if(!bonusOverride&&profile){for(const k of B.bonusKeys)config[k]=structuredClone(meta.base[k]);changed();}
    else $('preview-bonus-controls').hidden=!bonusOverride;
   }
  }catch(error){toast(error.message);}
 });
 document.addEventListener('click',async e=>{
  const id=e.target.closest('button')?.id;
  const edited=structuredClone(config),selectedId=meta.setId;
  try{switch(id){
   case 'preview-connect':if(location.protocol==='file:')await connectLinked(true,true);else await readBrowser(true);break;
   case 'preview-load-profile':$('profile-backup-file').value='';$('profile-backup-file').click();break;
   case 'preview-manual':link?.close();linkStatus='';profile=null;meta={mode:'manual',setId:null,base:null};bonusOverride=true;changed();break;
   case 'preview-reset-profile':if(profile){config=B.fromProfile(profile,meta.setId,config);meta.base=structuredClone(config);bonusOverride=false;changed();}break;
   case 'preview-reset-levels':for(const s of E.skillNames){config.levels[s]=meta.base.levels[s];config.exactXP[s]=meta.base.exactXP[s];}changed();break;
   case 'preview-save-levels':await writeProfile(p=>{for(const s of E.skillNames)if(p.skills[s].level!==edited.levels[s])p.skills[s]={level:edited.levels[s],xp:null};});break;
   case 'preview-save-set':await writeProfile(p=>{const index=p.combatSets.findIndex(s=>s.id===selectedId);if(index<0)throw Error('This set no longer exists. Save as a new set instead.');p.combatSets[index]=B.setFromConfig(edited,p.combatSets[index].id,p.combatSets[index].name);});break;
   case 'preview-new-set':{
    newSetConfig=edited;$('preview-new-set-name').value='Combat Experiment';$('preview-new-set-error').hidden=true;
    newSetDialog.showModal();$('preview-new-set-name').focus();$('preview-new-set-name').select();break;
   }
   case 'preview-use-inventory':{const imported=B.supplies(profile,config);config=imported.config;changed();$('preview-supply-note').textContent=imported.warnings.join(' ')||'Known inventory quantities copied. Unlimited food and ammunition are off.';break;}
   case 'preview-export-profile':{
    const url=URL.createObjectURL(new Blob([M.encode(profile)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='realm-idle-character-profile-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);break;
   }
  }}catch(error){toast(error.message);if(id==='preview-connect'){linkStatus=error.message;connection();}}
 });
 $('profile-backup-file').addEventListener('change',async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>2e6)throw Error('Profile backups must be smaller than 2 MB.');const next=M.decode(await file.text());localStorage.setItem(backupKey,M.encode(next));link?.close();linkStatus='';meta={mode:'backup',setId:null,base:null};receive(next,true);}catch(error){toast(error.message);}});
 addEventListener('storage',e=>{if(e.key===M.STORAGE_KEY&&meta.mode==='shared')readBrowser().catch(error=>toast(error.message));});
 addEventListener('focus',()=>{if(meta.mode==='shared')readBrowser().catch(()=>{});});
 try{
  if(meta.mode==='backup'){const text=localStorage.getItem(backupKey);if(text)receive(M.decode(text));else{meta.base=null;refresh();}}
  else if(meta.mode==='shared'||meta.mode==='bridge'){refresh();readBrowser().catch(error=>{linkStatus=error.message;connection();});}else refresh();
 }catch{profile=null;meta.base=null;refresh();}
})();
