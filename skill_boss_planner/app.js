'use strict';
(()=>{
 const M=SkillBossModel,$=id=>document.getElementById(id),fmt=(v,d=0)=>Number(v).toLocaleString('en-GB',{maximumFractionDigits:d}),pct=v=>v>0&&v<.00005?'<0.01%':v<1&&v>=.99995?'>99.99%':fmt(v*100,2)+'%',escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let pinned=null,last=null;
 const select=(id,rows,value,label=x=>x.name)=>{const e=$(id);e.replaceChildren(...rows.map(x=>new Option(label(x),x.name)));e.value=rows.some(x=>x.name===value)?value:rows[0].name;};
 const text=(id,value)=>$(id).textContent=value;
 const dl=rows=>rows.map(([k,v])=>`<div><dt>${escape(k)}</dt><dd>${escape(v)}</dd></div>`).join('');
 const date=t=>new Date(t).toISOString().slice(0,16).replace('T',' ')+' UTC';
 function state(){return Object.fromEntries([...Object.keys(M.defaults),'eventActive'].filter(k=>$(k)).map(k=>[k,$(k).type==='checkbox'?$(k).checked:$(k).value]));}
 const potions=M.options.potions.filter((p,i,all)=>all.findIndex(x=>x.value===p.value)===i);
 function candyLabels(){for(const o of $('candy').options)o.textContent=o.value==='None'?'None':`${o.value} · +${fmt(M.G.candies[o.value].gather*($('eventActive').checked?100:50),1)}%`;}

 function catalogs(s){const b=M.S.bosses.find(b=>b.id===s.boss);select('tool',[{name:'None',level:1},...M.G.tools[b.skill]],s.tool,x=>x.name==='None'?'None':`${x.name} · Lv ${x.level}`);select('pet',M.pets(b.skill).filter(p=>!window.CharacterProfile||CharacterProfile.canonicalPet(p.name)===p.name),s.pet);for(const slot of M.slots)select(slot,M.armor(b.skill,slot),s[slot]);$('boss-art').src='combat_simulator/'+b.img;$('boss-art').alt=b.name;}
 function load(s){s={...s};if(s.potion)s.potion=potions.find(p=>p.value===M.options.potions.find(x=>x.name===s.potion)?.value)?.name||'None';for(const [k,v]of Object.entries(s)){if(!$(k))continue;if($(k).type==='checkbox')$(k).checked=v;else $(k).value=v;}catalogs(s);render();}
 function render(){
  const s=state();candyLabels();const community=Number(s.community);text('community-value',community+'%');$('community').setAttribute('aria-valuetext',community+'%');$('community').style.setProperty('--community-fill',community+'%');text('community-bonus',community>=25?'+5% gathering speed':'No gathering speed bonus');
  try{
   const r=M.calculateAttempt(s);last=r;$('error').hidden=true;$('result-content').hidden=false;$('pin').disabled=false;
   text('rotation',`${r.rotation.boss.name} · ${date(r.rotation.start)} → ${date(r.rotation.end)}. Next: ${r.rotation.next.name}.${r.boss.id!==r.rotation.boss.id?' Exploring '+r.boss.name+' outside its rotation.':''}`);
   text('set-info',`${r.pieces} matching set pieces · +${fmt(r.set*100)}% set speed`);
   const first=r.first,roll=first?.reward||M.reward(r.boss,0);
   text('damage',fmt(first.damage));text('attempt-caption','damage · 200 ticks · 120 seconds');
   text('tick',fmt(r.tick));text('speed',fmt(r.speed,3)+'×');
   text('band',roll.name);
   $('roll').innerHTML=roll.probs.map((p,i)=>`<div class="roll-row"><span>${escape(r.boss.chests[i])}</span><strong>${escape(pct(p))}</strong><div class="roll-track" aria-hidden="true"><div style="width:${p*100}%"></div></div></div>`).join('')+`<div class="roll-row"><span>No chest</span><strong>${escape(pct(roll.none))}</strong></div>`;
   text('next',r.next?`Next band: ${fmt(r.next.target)} damage (${fmt(r.next.missing)} more). With 200 ticks available, a constant ${fmt(r.next.tick)} damage/tick requires ${fmt(r.next.speed,3)}× speed. Extra attempts cannot combine to reach a band.`:'Top band reached. Grand chest chance reaches its 75% ceiling at 2,500,000 damage; higher damage adds no chest odds.');
   $('breakdown').innerHTML=dl(Object.entries(r.factors).map(([k,v])=>[k,fmt(v,4)+'×']));
   $('loot-table').innerHTML='<table><caption>Independent Rolls per Opened Chest</caption><thead><tr><th>Chest Band</th><th>Attempt Damage</th><th>Tool Chance</th><th>Armor Chance</th><th>Minimum Rarity</th><th>Pet Chance</th></tr></thead><tbody>'+M.S.config.chestBands.map((c,i)=>`<tr><td>${escape(r.boss.chests[i])}</td><td>${i===0?'Under 250,000':i===1?'250,000–1,499,999':'1,500,000+'}</td><td>${pct(c.toolChance)}<small>${escape(r.boss.tools[i])}</small></td><td>${pct(c.armorChance)} any piece<small>${pct(c.armorChance/5)} per specific piece</small></td><td>${escape(M.G.rarities.find(x=>x.tier===c.toolMin).name)}+</td><td>${i===2?'0.2% · if unowned':'—'}</td></tr>`).join('')+'</tbody></table>';
   if(pinned){const same=pinned.boss.id===r.boss.id,diff=(first?.damage||0)-(pinned.first?.damage||0);text('comparison',`Pinned: ${pinned.boss.name} · ${pinned.tool.name}, ${pinned.s.toolRarity} · ${fmt(pinned.first?.damage||0)} damage. Current: ${diff>=0?'+':''}${fmt(diff)} damage; ${fmt(r.speed-pinned.speed,3)}× speed difference.${same?'':' Different bosses.'}`);}else text('comparison','Pin a setup, then change equipment to compare.');
  }catch(e){last=null;text('error',e.message);$('error').hidden=false;$('result-content').hidden=true;$('pin').disabled=true;}
 }
 $('armor-fields').innerHTML=M.slots.map(slot=>`<label>${{helm:'Helm',body:'Chest',legs:'Legs',boots:'Boots',gloves:'Gloves'}[slot]}<select id="${slot}"></select></label><label>Rarity<select id="${slot}Rarity"></select></label>`).join('');
 select('boss',M.S.bosses.map(b=>({name:b.id,label:b.name})),M.defaults.boss,x=>x.label);
 for(const k of ['toolRarity','amuletRarity',...M.slots.map(s=>s+'Rarity')])select(k,M.G.rarities,M.defaults[k]);
 for(const k of ['blessing','potion','amulet'])select(k,(k==='potion'?potions:M.options[{blessing:'blessings',amulet:'amulets'}[k]]),'None',x=>x.name+(k==='blessing'&&x.name!=='None'?' · Divinity '+x.level:k==='potion'&&x.name!=='None'?' · +'+fmt(x.value*100)+'%':''));
 for(const k of ['season','weather'])select(k,Object.entries(k==='season'?M.R.SEASONS:M.R.WEATHERS).map(([name,x])=>({name,label:x.name})),M.defaults[k],x=>x.label);
 $('planner').addEventListener('submit',e=>e.preventDefault());$('planner').addEventListener('input',e=>{if(e.target.id==='boss'){const s=state(),b=M.S.bosses.find(b=>b.id===s.boss);s.tool=M.G.tools[b.skill][0].name;catalogs(s);}render();});
 $('pin').addEventListener('click',()=>{if(last){pinned=last;$('clear-pin').hidden=false;render();}});$('clear-pin').addEventListener('click',()=>{pinned=null;$('clear-pin').hidden=true;render();});
 const now=Date.now(),initial={...M.defaults,start:new Date(now).toISOString().slice(0,16),season:M.defaults.season,weather:M.defaults.weather,eventActive:M.R.candyStrengthAt(now,'halloween')===1};initial.boss=M.rotation(Date.parse(initial.start+'Z')).boss.id;initial.tool=M.G.tools[M.S.bosses.find(b=>b.id===initial.boss).skill][0].name;
 $('reset').addEventListener('click',()=>load({...initial,boss:$('boss').value,tool:M.G.tools[M.S.bosses.find(b=>b.id===$('boss').value).skill][0].name}));text('source-hash','Source SHA-256: '+M.S.sourceHash);load(initial);
 window.SkillBossUI={read:state,load,render,catalogs};
})();
