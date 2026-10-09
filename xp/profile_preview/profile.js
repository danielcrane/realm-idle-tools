/* Read-only profile integration. All scenario persistence uses a prototype-only key. */
(() => {
 'use strict';
 const M=CharacterProfile,P=XPPrototype,U=XPPrototypeUI,$=id=>document.getElementById(id),key=CharacterProfile.scopedKey('realm-public-xp-profile-prototype-v1');
 const clone=v=>structuredClone(v),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),fmt=n=>new Intl.NumberFormat('en-GB',{maximumFractionDigits:2}).format(n);
 let profile=null,savedProfile=null,backupProfile=null,base=null,link=null,source='',manual=false,skill=$('skill').value,plans={},bases={};
 let equipmentMode=null;
 window.XPProfileOwnership=()=>manual||!profile?null:[...profile.pets];
 function status(message=''){$('profile-status').textContent=message;$('profile-status').hidden=!message;}
 function selector(){
  const options=[{value:'saved',label:savedProfile?savedProfile.name:'Saved Profile',disabled:!savedProfile},{value:'custom',label:'Custom'}];
  if(backupProfile)options.splice(1,0,{value:'backup',label:backupProfile.name+' · Backup'});
  $('profile-select').replaceChildren(...options.map(row=>{const option=document.createElement('option');option.value=row.value;option.textContent=row.label;option.disabled=!!row.disabled;return option;}));
  $('profile-select').value=manual||!profile?'custom':source==='Loaded backup'?'backup':'saved';
 }
 const rarity=t=>P.options.rarities.find(r=>r.tier===t)?.name||'Common';
 const known=name=>!profile?null:Object.hasOwn(profile.inventory.items,name)?profile.inventory.items[name].quantity:profile.inventory.complete?0:null;
 function tools(p,id){
  const pool=[],best=p.skillingGear[id]?.tool;if(best)pool.push({name:best.name,rarity:rarity(best.rarity)});
  for(const t of P.data.tools[id]||[]){const row=p.inventory.items[t.name];if(!row||!row.quantity)continue;
   if(row.rarities)for(const [tier,n]of Object.entries(row.rarities))if(n>0)pool.push({name:t.name,rarity:rarity(Number(tier))});
  }
  return pool;
 }
 function values(p,s){
  const id=P.skillId(s.skill),record=p.skills[id],j=p.skillingGear.jewelry,k=P.kind(s.skill),out={from:record.level,currentXp:record.level===130?0:record.xp===null?0:record.xp-P.rules.getXPFor(record.level),divinityLevel:p.skills.divinity.level,vip:p.account.vip,vipPlus:p.account.vipPlus,community:String(p.account.communityTier*25)};
  for(const r of ['ring1','ring2'])out[r]=j[r]?rarity(j[r].rarity):'None';
  const amulet=k==='gathering'?j.gatheringAmulet:k==='production'?j.productionAmulet:null;
  out.amulet=amulet?.name||'None';out.amuletRarity=amulet?rarity(amulet.rarity):'Common';
  for(const [field,slot]of Object.entries(P.slots)){const item=p.skillingGear[id]?.[slot];out['armor'+field]=item?.name||'None';out['rarity'+field]=item?rarity(item.rarity):'Common';}
  if(k==='gathering'){const t=p.skillingGear[id]?.tool;out.tool=t?.name||'None';out.toolRarity=t?rarity(t.rarity):'Common';}
  return out;
 }
 function normalizePlan(s){
  s.to=Math.max(Number(s.from),Number(s.to));
  const a=P.actions.find(a=>a.id===s.action&&a.skill===s.skill);if(!a||a.level>Number(s.from))s.action=P.actions.find(a=>a.skill===s.skill&&a.level<=Number(s.from)).id;
  if(!P.relevantPets(s.skill).some(p=>p.name===s.pet))s.pet='None';
  if(!P.relevantBlessings(s.skill).some(b=>b.name===s.blessing&&b.level<=Number(s.skill==='Divinity'?s.from:s.divinityLevel)))s.blessing='None';
  return s;
 }
 function apply(force=false){
  if(!profile||manual)return;
  const s=U.read(),next=values(profile,s);
  for(const [k,v]of Object.entries(next))if(force||!base||String(s[k])===String(base[k]))s[k]=v;
  base=next;window.XPProfileTools=tools(profile,P.skillId(s.skill));
  U.load(force?normalizePlan(s):s);decorate();
 }
 function decorate(){
  const mode=manual||!profile?'custom':'profile';if(mode!==equipmentMode){$('bonus-equipment').open=mode==='custom';equipmentMode=mode;}
  $('custom-divinity').hidden=mode!=='custom'||$('skill').value==='Divinity';
  const s=U.read(),modified=base&&Object.entries(base).some(([k,v])=>String(s[k])!==String(v));
  $('profile-state').textContent='Modified';$('profile-state').hidden=manual||!profile||!modified;
  $('reset-profile').hidden=manual||!profile||!modified;$('use-inventory').disabled=!profile||manual;selector();
  const record=profile?.skills[P.skillId(s.skill)];
  $('xp-origin').hidden=true;
  $('currentXp').title=profile&&!manual&&record.xp===null?'Total XP is unknown; uses the recorded level threshold.':'Total XP for this skill. Whole-number display matches the game; exact imported XP is retained until edited.';
  for(const option of $('pet').options){const pet=P.relevantPets(s.skill).find(p=>p.name===option.value);if(!pet||pet.name==='None')continue;option.textContent=pet.name+(profile&&!manual?(profile.pets.includes(M.canonicalPet(pet.name))?' · Owned':' · Unowned Experiment'):'')+' · '+(pet.desc||'');}
  $('profile-summary').textContent=profile&&!manual?`${profile.name} · ${source} · ${profile.lastGameImport?.savedAt?'Game snapshot '+new Date(profile.lastGameImport.savedAt).toLocaleString(): 'No game snapshot date recorded'} · Museum bonuses affect combat only. Pets and blessings are local choices; unowned pet choices are experiments.`:'';
  document.dispatchEvent(new Event('xp-profile-context'));
 }
 function renderExtras(r){
  const route=$('route-mode').value==='session'?r.session.route:r.targetRoute;
  $('route').replaceChildren();
  if(!route){$('route').textContent='Fixed action and loadout. Enable an automatic progression option to see upgrade steps.';}
  else if(!route.length){$('route').textContent='No actions needed or available in this plan.';}
  else{const ol=document.createElement('ol');for(const row of route){const li=document.createElement('li'),b=document.createElement('b'),small=document.createElement('small');b.textContent=`Level ${row.level} · ${row.action}`;small.textContent=`${row.tool==='—'?'':row.tool+' · '}${row.blessing} blessing · ${fmt(row.actions)} actions · ${fmt(row.hours)} h`;li.append(b,small);ol.append(li);}$('route').append(ol);}
  $('material-plan').replaceChildren();
  if(!r.materials.length){$('material-plan').textContent='No input materials required.';return;}
  const table=document.createElement('table');table.className='plan-table';
  const head=document.createElement('tr');for(const label of ['Material','To Target','Profile Stock','Shortfall']){const th=document.createElement('th');th.scope='col';th.textContent=label;head.append(th);}table.append(head);
  for(const m of r.materials){const stock=manual?null:known(m.name),tr=document.createElement('tr');for(const v of [m.name,fmt(m.needed),stock===null?'Unknown':fmt(stock),stock===null?'Unknown':fmt(Math.max(0,m.needed-stock))]){const td=document.createElement('td');td.textContent=v;tr.append(td);}table.append(tr);}$('material-plan').append(table);
 }
 document.addEventListener('xp-result',e=>renderExtras(e.detail));
 document.addEventListener('xp-invalid',()=>{for(const id of ['route','material-plan'])$(id).textContent='Resolve the input warning to calculate this plan.';});
 $('route-mode').addEventListener('change',()=>{if(window.XPPrototypeResult)renderExtras(window.XPPrototypeResult);});
 function save(){plans[skill]=U.read();bases[skill]=base;try{localStorage.setItem(key,JSON.stringify({skill,plans,bases,manual}));}catch{status('This plan cannot be saved in this browser.');}}
 $('planner').addEventListener('input',e=>{
  if(e.target.id==='skill'){
   skill=$('skill').value;const remembered=plans[skill];base=bases[skill]||null;
   if(remembered)U.load(remembered);else U.load({...P.defaults,skill,start:new Date().toISOString().slice(0,16),action:P.actions.find(a=>a.skill===skill).id,tool:P.data.tools[P.skillId(skill)]?.[0].name||'Copper Axe'});
   if(profile&&!manual)apply(!remembered);
  }
  decorate();save();
 });
 $('reset-profile').addEventListener('click',()=>{manual=false;apply(true);save();});
 $('profile-select').addEventListener('change',()=>{
  const choice=$('profile-select').value;manual=choice==='custom';status();
  if(manual){window.XPProfileTools=[];base=null;U.render();decorate();}
  else{profile=choice==='backup'?backupProfile:savedProfile;source=choice==='backup'?'Loaded backup':'Connected profile';base=null;apply(true);}
  save();
 });
 $('reset').addEventListener('click',()=>{skill=$('skill').value;base=null;if(profile&&!manual)apply(true);decorate();save();});
 $('load-sheet').addEventListener('click',()=>{skill=$('skill').value;if(profile&&!manual){base=values(profile,U.read());window.XPProfileTools=tools(profile,P.skillId(skill));}decorate();save();});
 $('use-inventory').addEventListener('click',()=>{
  const s=U.read(),action=P.actions.find(a=>a.id===s.action),unknown=[];
  for(const name of Object.keys(action.input)){const n=known(name);s.inventory[name]=n===null?'':n;if(n===null)unknown.push(name);}
  s.limitMaterials=true;U.load(s);$('inventory-note').textContent=unknown.length?'Unknown stock: '+unknown.join(', ')+'. Enter a local quantity, or turn off material limits.':'Known recipe quantities copied. Profile inventory is never consumed.';save();
 });
 function receive(raw,force=false){
  if(raw===null){savedProfile=null;if(source!=='Loaded backup'){profile=null;window.XPProfileTools=[];U.render();}status('No saved profile. Choose Custom or use Edit to create one.');selector();return;}
  savedProfile=M.validate(JSON.parse(raw));$('connect-profile').hidden=true;status();
  if(!manual&&source!=='Loaded backup'){profile=savedProfile;source='Connected profile';apply(force);}decorate();
 }
 async function connect(popup){
  link?.close();
  const connection=PreviewStorageLink.create(new URL('character-profile.html',location.href),msg=>{try{if(msg.error)throw Error(msg.error);receive(msg.raw);}catch(e){status(e.message);}});link=connection;
  try{await connection.connect(popup);if(link!==connection)return;receive(await connection.read(),!base);}catch(e){if(link!==connection)return;status('Saved profile access was blocked. Use Load Saved Profile to retry.');$('connect-profile').hidden=false;decorate();}
 }
 $('connect-profile').addEventListener('click',()=>connect(true));
 $('profile-backup').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>2e6)throw Error('Profile backup is too large.');profile=M.decode(await file.text());backupProfile=profile;manual=false;source='Loaded backup';base=null;apply(true);status();$('profile-backup').closest('details').open=false;}catch(err){status(err.message);}e.target.value='';});
 try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved&&P.options.skills.includes(saved.skill)){plans=saved.plans||{};bases=saved.bases||{};manual=!!saved.manual;skill=saved.skill;base=bases[skill]||null;if(plans[skill])U.load({...P.defaults,...P.migrate(plans[skill])});}}catch{}
 decorate();U.render();connect(false);
})();
