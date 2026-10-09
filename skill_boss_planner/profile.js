/* Profile data is read-only; experiments persist independently for each boss. */
(() => {
 const M=CharacterProfile,S=SkillBossModel,U=SkillBossUI,$=id=>document.getElementById(id),key=CharacterProfile.scopedKey('realm-public-skill-boss-profile-v1');
 let profile=null,savedProfile=null,backup=null,mode='saved',base=null,plans={},bases={},boss=$('boss').value,link=null;
 const connection=document.createElement('section');connection.className='panel boss-profile';connection.innerHTML='<div class="boss-profile-bar"><label>Profile<select id="boss-profile-select"></select></label><a href="character-profile.html" target="_blank" rel="noopener">Edit Character</a><button type="button" id="boss-profile-connect" hidden>Load Saved Profile</button><details><summary>More</summary><label>Load Profile Backup<input type="file" id="boss-profile-backup" accept=".json,application/json"></label></details></div><p id="boss-profile-status" class="muted" hidden></p><small>Profile values seed this plan. Changes here stay local. Equipment loads from your character. Pet uses a saved skilling-set choice or the strongest owned option for this setup. Changes here can be reset to the character.</small>';
 $('planner').closest('.workspace').before(connection);
 const equipment=$('planner').querySelector('section'),fields=equipment.querySelector('.fields'),bossLabel=$('boss').closest('label');
 document.addEventListener('DOMContentLoaded',()=>{
  const reset=$('reset');reset.className='boss-reset-icon';reset.title=profile&&mode!=='custom'?'Reset Setup to Character':'Reset Setup to Defaults';reset.setAttribute('aria-label',reset.title);
  reset.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10h6M3 10V4"/><path d="M3.5 10a8 8 0 1 1 1.7 8"/></svg>';
  document.querySelector('.character-picker-actions').append(reset);
 });
 fields.before(bossLabel);const gear=document.createElement('div');gear.id='boss-profile-equipment';fields.before(gear);gear.append(fields);
 const armor=equipment.querySelector('details');gear.append(...armor.querySelectorAll('.fields,.action-meta,.muted'));armor.remove();
 const blessingRow=document.createElement('div');blessingRow.className='fields wide boss-blessing-row';fields.append(blessingRow);const blessingLabel=$('blessing').closest('label');blessingLabel.classList.remove('wide');blessingRow.append($('pet').closest('label'),blessingLabel);
 $('armor-fields').append($('amulet').closest('label'),$('amuletRarity').closest('label'));
 const rarity=t=>M.R.getRarityByTier(t).name;
 function values(p,id){
  const skill=S.S.bosses.find(b=>b.id===id).skill,g=p.skillingGear[skill],amulet=p.skillingGear.jewelry.gatheringAmulet;
  const saved=p.skillingSets.find(set=>set.skill===skill),blessing=S.options.blessings.find(b=>b.id===saved?.blessing&&M.blessingAvailable(p,b.id))||S.options.blessings[0];
  const owned=S.pets(skill).filter(pet=>p.pets.includes(M.canonicalPet(pet.name))&&M.canonicalPet(pet.name)===pet.name);
  const speed=pet=>(1+(pet.bonus.tool_speed||0)+(pet.skill===skill?(pet.bonus.skill_speed||0):0))*(1+(blessing.effect.tool_speed||0)*(1+(pet.skill==='divinity'?(pet.bonus.blessing_power||0):0)));
  const pet=owned.find(pet=>pet.name===saved?.pet)||owned.sort((a,b)=>speed(b)-speed(a))[0];
  return {level:p.skills[skill].level,divinity:p.skills.divinity.level,community:p.account.communityTier*25,pet:pet?.name||'None',blessing:blessing.name,tool:g.tool?.name||'None',toolRarity:rarity(g.tool?.rarity||1),amulet:amulet?.name||'None',amuletRarity:rarity(amulet?.rarity||1),...Object.fromEntries(S.slots.flatMap(slot=>[[slot,g[slot]?.name||'None'],[slot+'Rarity',rarity(g[slot]?.rarity||1)]]))};
 }
 function status(text=''){$('boss-profile-status').textContent=text;$('boss-profile-status').hidden=!text;}
 function decorate(){
  const active=!!profile&&mode!=='custom',s=U.read();
  $('boss-profile-select').replaceChildren(...[{id:'saved',name:savedProfile?.name||'Saved Profile',disabled:!savedProfile},...(backup?[{id:'backup',name:backup.name+' · Backup'}]:[]),{id:'custom',name:'Custom'}].map(o=>{const el=new Option(o.name,o.id);el.disabled=!!o.disabled;return el;}));$('boss-profile-select').value=active?mode:'custom';
  $('reset').title=active?'Reset Setup to Character':'Reset Setup to Defaults';$('reset').setAttribute('aria-label',$('reset').title);
  const skill=S.S.bosses.find(b=>b.id===s.boss).skill;
  for(const option of $('pet').options){const owned=!active||profile.pets.includes(M.canonicalPet(option.value));option.disabled=false;option.dataset.unowned=String(option.value!=='None'&&!owned);option.textContent=option.value+(option.value==='None'||!active?'':owned?' · Owned':' · Unowned');}
  for(const option of $('blessing').options){const def=S.options.blessings.find(b=>b.name===option.value);option.disabled=def.level>Number(s.divinity);}
  for(const option of $('tool').options){const tool=S.G.tools[skill].find(t=>t.name===option.value);option.disabled=!!tool&&tool.level>Number(s.level);}
  for(const slot of ['tool',...S.slots]){const minimum=M.minimumSkillingRarity(s[slot]);for(const option of $(slot+'Rarity').options){const r=S.G.rarities.find(r=>r.name===option.value);option.disabled=r.tier<minimum;}}
  document.dispatchEvent(new Event('boss-profile-context'));
 }
 function apply(force=false){if(!profile||mode==='custom'){decorate();return;}const s=U.read(),next=values(profile,boss);for(const [k,v] of Object.entries(next))if(force||!base||String(s[k])===String(base[k]))s[k]=v;base=next;
  if(force){if(!S.pets(S.S.bosses.find(b=>b.id===boss).skill).some(p=>p.name===s.pet)||!profile.pets.includes(M.canonicalPet(s.pet)))s.pet=next.pet;if(S.options.blessings.find(b=>b.name===s.blessing)?.level>Number(s.divinity))s.blessing='None';}
  U.load(s);decorate();}
 function save(){plans[boss]={...U.read()};bases[boss]=base;try{localStorage.setItem(key,JSON.stringify({boss,plans,bases,mode:mode==='custom'?'custom':'saved'}));}catch{status('Local plan storage is unavailable.');}}
 $('planner').addEventListener('input',e=>{
  if(e.target.id==='boss'){boss=$('boss').value;base=bases[boss]||null;const old=plans[boss];U.load(old||{...S.defaults,boss,start:U.read().start,tool:S.G.tools[S.S.bosses.find(b=>b.id===boss).skill][0].name});apply(!old);}
  if(['tool',...S.slots].includes(e.target.id)){const s=U.read(),minimum=M.minimumSkillingRarity(s[e.target.id]);if(S.G.rarities.find(r=>r.name===s[e.target.id+'Rarity']).tier<minimum){s[e.target.id+'Rarity']=rarity(minimum);U.load(s);}}
  decorate();save();
 });
 $('reset').addEventListener('click',()=>{base=null;apply(true);save();});
 $('boss-profile-select').addEventListener('change',()=>{mode=$('boss-profile-select').value;profile=mode==='backup'?backup:savedProfile;base=null;apply(true);save();status();});
 function receive(raw){savedProfile=raw?M.validate(JSON.parse(raw)):null;if(mode==='saved'){profile=savedProfile;apply();}decorate();$('boss-profile-connect').hidden=!!savedProfile;status(savedProfile?'':'No saved character found. Use Custom or create a Character Profile.');}
 async function connect(popup=false){try{if(location.protocol!=='file:'){receive(localStorage.getItem(M.STORAGE_KEY));return;}link?.close();link=PreviewStorageLink.create(new URL('character-profile.html',location.href),msg=>{try{if(msg.error)throw Error(msg.error);receive(msg.raw);}catch(e){status(e.message);}});await link.connect(popup);receive(await link.read());}catch(e){status('Profile connection unavailable. Use Load Saved Profile to retry, load a backup, or use Custom.');$('boss-profile-connect').hidden=false;decorate();}}
 $('boss-profile-connect').addEventListener('click',()=>connect(true));
 $('boss-profile-backup').addEventListener('change',async e=>{try{const f=e.target.files[0];if(!f)return;if(f.size>2e6)throw Error('Profile backup must be smaller than 2 MB.');backup=M.decode(await f.text());profile=backup;mode='backup';base=null;apply(true);save();status();}catch(err){status(err.message);}e.target.value='';});
 addEventListener('storage',e=>{if(e.key===M.STORAGE_KEY&&location.protocol!=='file:')receive(localStorage.getItem(M.STORAGE_KEY));});
 try{const old=JSON.parse(localStorage.getItem(key));if(old&&S.S.bosses.some(b=>b.id===old.boss)){plans=old.plans||{};bases=old.bases||{};mode=old.mode==='custom'?'custom':'saved';boss=old.boss;base=bases[boss]||null;if(plans[boss]){U.load({...S.defaults,...plans[boss],boss});}}}catch{}
 window.SkillBossProfile={values,ownership:()=>profile&&mode!=='custom'?profile.pets:null};decorate();connect();
})();
