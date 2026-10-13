/* Timed Ashlyn encounter and simulation controls. */
(function(root){
 'use strict';
 const rules=typeof module!=='undefined'?require('./source-rules.js'):root.RealmRules;
 const zone='ashlyn_arena';
 rules.ZONES[zone]={id:zone,name:'World Boss · Ashlyn',order:999};
 rules.MONSTERS[zone]=[{
  id:rules.WORLD_BOSS.id,name:rules.WORLD_BOSS.name,level:4444,
  img:rules.WORLD_BOSS.img,hp:1e12,def:0,atk:120,str:90,
  xp:0,gold:[0,0],drops:[],_worldBoss:true,attemptTicks:200,firstAttackMs:600,
  // The source sets these once at the start of an attempt, before buffs expire.
  prepare(g,r,m){m.atk=Math.max(60,Math.ceil(r.getPlayerStats().def*1.2)+120);m.str=Math.max(90,Math.ceil(g.maxHp*2));}
 }];
 const api={chestChance(damage){
  const w=rules.WORLD_BOSS,d=Math.max(0,damage||0);
  if(d>=w.cacheDmgTarget)return w.cacheMaxChance;
  if(d<=w.cacheKneeDmg)return w.cacheKneeChance*d/w.cacheKneeDmg;
  return w.cacheKneeChance+(w.cacheMaxChance-w.cacheKneeChance)*(d-w.cacheKneeDmg)/(w.cacheDmgTarget-w.cacheKneeDmg);
 },aggregate(runs){
  const mean=k=>runs.reduce((sum,r)=>sum+r[k],0)/runs.length;
  const sorted=runs.map(r=>r.damage).sort((a,b)=>a-b),n=runs.length;
  return {ashlyn:true,n,chestChance:runs.reduce((sum,r)=>sum+api.chestChance(r.damage),0)/n,damage:mean('damage'),damageLow:sorted[Math.floor((n-1)*.05)],damageHigh:sorted[Math.floor((n-1)*.95)],
   completionChance:runs.filter(r=>r.stop==='complete').length/n,deathChance:runs.filter(r=>r.stop==='death').length/n,
   ammoChance:runs.filter(r=>r.stop==='ammo').length/n,food:mean('food'),ammo:mean('ammo'),endingHp:mean('endingHp'),stopAt:mean('stopAt'),example:runs[0]};
 }};
 root.CombatEncounterPrototype=api;
 if(typeof module!=='undefined'){module.exports=api;return;}
 document.addEventListener('DOMContentLoaded',()=>{
 const isAshlyn=c=>c.zone===zone&&c.target===rules.WORLD_BOSS.id;
 const runCounts=[32,64,128,256];
 const mobileLayout=matchMedia('(max-width: 760px)');
 const defaultRuns=()=>mobileLayout.matches?64:128;
 const runCount=c=>runCounts.includes(Number(c.ashlynRuns??c.trials))?Number(c.ashlynRuns??c.trials):defaultRuns();
 // Earlier editions saved the automatic 128 default without a choice marker.
 if(config.ashlynRunsManual===undefined)config.ashlynRunsManual=runCounts.includes(Number(config.ashlynRuns))&&Number(config.ashlynRuns)!==128;
 const sessionKeys=['mode','minutes','singleKill','progression','trials'];
 let autoTimer=null,lastSetup='',autoGeneration=0;
 const sessionPanel=$('session-controls').closest('.session');
 const autoStatus=document.createElement('p');autoStatus.id='ashlyn-auto-status';autoStatus.className='note';autoStatus.setAttribute('role','status');autoStatus.setAttribute('aria-live','polite');autoStatus.hidden=true;sessionPanel.before(autoStatus);
 // Yield between short batches so edits and encounter changes can cancel a run.
 const oldRun=E.run;
 E.run=async function(raw,onProgress=()=>{},cancel=()=>false){
  if(!isAshlyn(raw))return oldRun(raw,onProgress,cancel);
  const total=runCount(raw),c=E.normalize({...raw,trials:total}),runs=[];let batchStart=performance.now();
  for(let i=0;i<total;i++){
   if(cancel())return null;
   runs.push(E.simulate(c,(c.seed+Math.imul(i,2654435761))>>>0));
   if(performance.now()-batchStart>=8){onProgress(i+1,total);await new Promise(resolve=>setTimeout(resolve,0));batchStart=performance.now();}
  }
  onProgress(total,total);return E.aggregate(runs,c);
 };
 function scheduleAuto(){
  clearTimeout(autoTimer);const generation=++autoGeneration;
  if(!isAshlyn(config)){autoStatus.hidden=true;lastSetup='';return;}
  config.ashlynRuns=config.ashlynRunsManual&&runCounts.includes(Number(config.ashlynRuns))?Number(config.ashlynRuns):defaultRuns();
  config.trials=config.ashlynRuns;save();autoStatus.hidden=false;
  const c=E.normalize(config),key=JSON.stringify(c);
  if(key===lastSetup&&!resultStale&&result?.ashlyn){autoStatus.textContent=`Updated automatically · ${c.trials} attempts`;return;}
  autoStatus.textContent=`Updating ${c.trials} attempts…`;
  autoTimer=setTimeout(async()=>{
   const began=performance.now();
   try{
    const a=await E.run(c,()=>{},()=>generation!==autoGeneration||!isAshlyn(config));
    if(!a||generation!==autoGeneration)return;
    result=a;resultConfig=c;resultStale=false;lastSetup=key;renderResults();
    autoStatus.textContent=`Updated automatically · ${c.trials} attempts · ${fmt((performance.now()-began)/1000,2)} s`;
   }catch(error){if(generation===autoGeneration){autoStatus.textContent='Could not update the attempt results.';console.error(error);}}
  },150);
 }
 const oldRefresh=refresh,oldInvalidate=invalidateResults;
 refresh=function(){oldRefresh();scheduleAuto();};
 invalidateResults=function(){oldInvalidate();scheduleAuto();};
 mobileLayout.addEventListener('change',()=>{if(isAshlyn(config)&&!config.ashlynRunsManual)scheduleAuto();});
 let previousSession=Object.fromEntries(sessionKeys.map(k=>[k,E.defaults()[k]]));
 // Preserve the regular session settings while visiting the special encounter.
 document.addEventListener('change',event=>{
  if(event.target.id==='ashlyn-run-count'){config.ashlynRuns=Number(event.target.value);config.ashlynRunsManual=true;config.trials=config.ashlynRuns;scheduleAuto();return;}
  if(event.target.dataset.path!=='zone')return;
  if(event.target.value===zone&&!isAshlyn(config))previousSession=Object.fromEntries(sessionKeys.map(k=>[k,config[k]]));
  else if(event.target.value!==zone&&isAshlyn(config))Object.assign(config,previousSession);
 },true);
 const oldEncounter=renderEncounter,oldControls=renderControls,oldSnapshot=renderSnapshot,oldMarkup=resultMarkup,oldComparison=renderComparison,oldWorld=renderWorld;
 const conditionDialog=document.createElement('dialog');conditionDialog.id='condition-picker';
 conditionDialog.innerHTML='<div class="dialog-head"><h2 id="condition-picker-title"></h2><button type="button" class="close" aria-label="Close condition picker">×</button></div><div class="picker-items"></div>';
 document.body.append(conditionDialog);
 renderConditions=function(){return `<div class="panel conditions-panel"><h3>Season & Weather</h3><div class="companions condition-companions">${[['season','Season',rules.SEASONS],['weather','Weather',rules.WEATHERS]].map(([key,label,items])=>{
  const current=items[config[key]];
  return `<button type="button" class="companion condition-choice" data-condition="${key}" aria-label="Choose ${label.toLowerCase()}">${current?`<img src="${current.icon}" width="33" height="33" alt="">`:'<span class="empty-icon" aria-hidden="true">−</span>'}<span><span class="label">${label}</span><b>${esc(current?.name||'None')}</b><small>${esc(current?.desc||'No bonus')}</small></span></button>`;
 }).join('')}</div></div>`;};
 document.addEventListener('click',event=>{
  if(event.target.closest('#ashlyn-rerun')){config.seed=(Number(config.seed)+1)>>>0;scheduleAuto();return;}
  const button=event.target.closest('button[data-condition]');if(!button)return;
  const key=button.dataset.condition,items=key==='season'?rules.SEASONS:rules.WEATHERS;
  conditionDialog.dataset.condition=key;$('condition-picker-title').textContent=key==='season'?'Choose a Season':'Choose Weather';
  conditionDialog.querySelector('.picker-items').innerHTML=[['none',{name:'None',desc:'No bonus'}],...Object.entries(items)].map(([id,item])=>`<button type="button" class="pick-item" data-condition-choice="${id}" aria-pressed="${config[key]===id}">${item.icon?`<img src="${item.icon}" width="39" height="39" alt="">`:'<span class="empty-icon" aria-hidden="true">−</span>'}<span><b>${esc(item.name)}</b><small>${esc(item.desc)}</small></span></button>`).join('');
  conditionDialog.showModal();conditionDialog.querySelector('[aria-pressed="true"]').focus();
 });
 conditionDialog.addEventListener('click',event=>{
  const choice=event.target.closest('[data-condition-choice]');
  if(choice){config[conditionDialog.dataset.condition]=choice.dataset.conditionChoice;conditionDialog.close();changed();}
  else if(event.target.closest('.close')||event.target===conditionDialog)conditionDialog.close();
 });
 renderEncounter=function(){
  document.body.classList.toggle('ashlyn-encounter',isAshlyn(config));
  oldEncounter();if(!isAshlyn(config))return;
  const m=E.makeContext(config).m;
  document.querySelector('.monster-art').innerHTML=`<img src="${rules.WORLD_BOSS.img}" width="110" height="110" alt="Vampire Lord Ashlyn">`;
  document.querySelector('.monster-meta').textContent='World Boss';
  document.querySelector('.monster-stats').innerHTML=`<span>Attempt <b>2 Minutes</b></span><span>ATK <b>${fmt(m.atk)}</b></span><span>STR <b>${fmt(m.str)}</b></span><span>DEF <b>0</b></span>`;
  document.querySelector('.monster-stage .note').textContent='One fresh fight, up to 200 attacks. Ashlyn scales to your starting defense and maximum HP. Compare damage dealt and survival; she cannot be killed in this attempt.';
 };
 renderControls=function(){
  sessionPanel.hidden=isAshlyn(config);
  if(!isAshlyn(config)){oldControls();return;}
  $('session-controls').innerHTML='';
 };
 renderSnapshot=function(){oldSnapshot();if(!isAshlyn(config))return;
  const s=E.snapshot(config);
  document.querySelector('#snapshot .kph-help').innerHTML=`<span class="metric-label">Starting DPS</span><strong>${fmt(s.dps,1)}</strong><small>Before supply and buff expiry</small>`;
  document.querySelector('#snapshot .walk-time-help').innerHTML='<span class="metric-label">Attempt Limit</span><strong>2:00</strong><small>200 attacks · no walking</small>';
  document.querySelector('#snapshot .kph-help').classList.remove('kph-help');
  document.querySelector('#snapshot .walk-time-help').classList.remove('walk-time-help');
 };
 renderWorld=function(){oldWorld();if(!isAshlyn(config))return;
  const lodge=$('world').querySelector('#apply-lodge')?.closest('.panel');
  if(lodge)lodge.innerHTML='<h3>World Boss Encounter</h3><p class="note">Ashlyn has no Hunter’s Lodge kill milestones. This prototype simulates one fresh attempt and does not model weekly limits or rewards.</p>';
 };
 resultMarkup=function(a,c,pinned=false){if(!a.ashlyn)return oldMarkup(a,c,pinned);
  return `${pinned?'':'<div id="result-stale-notice" class="result-stale-notice" role="status" hidden><b>Out of Date</b><span>Setup changed. Run again to update.</span></div>'}<div class="results-head"><div><h2>${pinned?'Pinned Ashlyn Attempt':'Ashlyn Attempt'}</h2><p class="note">Vampire Lord Ashlyn · ${a.n} fresh attempts · 2-minute limit</p></div>${pinned?'':'<button id="pin-result">Pin for comparison</button>'}</div><div class="panel result-hero"><div><span class="metric-label">Average Damage</span><strong class="big">${fmt(a.damage)}</strong><span class="range">${fmt(a.damageLow)}–${fmt(a.damageHigh)} typical attempt range</span></div><div class="result-side"><span class="metric-label">Attempt Outcomes</span><b>Chest Drop Chance <span>${a.chestChance===undefined?'—':pct(a.chestChance,2)}</span></b><span class="${a.deathChance?'danger':''}">Death Rate <strong>${pct(a.deathChance,1)}</strong></span><span>Food Used <strong>${fmt(a.food,2)}</strong></span></div></div>${pinned?'':`<div class="ashlyn-run-controls"><label class="field" for="ashlyn-run-count"><span>Number of Runs</span><select id="ashlyn-run-count">${runCounts.map(n=>`<option value="${n}" ${n===runCount(config)?'selected':''}>${n}</option>`).join('')}</select></label><button type="button" id="ashlyn-rerun">Rerun</button></div>`}`;
 };
 renderComparison=function(){
  if(!baseline?.result?.ashlyn&&!result?.ashlyn){oldComparison();return;}
  if(!baseline){$('comparison').innerHTML='';return;}
  const same=baseline.result.ashlyn&&result?.ashlyn;
  $('comparison').innerHTML=`<div class="panel baseline"><div class="panel-title"><h3>Pinned Comparison</h3><button id="clear-baseline" class="text-button">Remove pin</button></div><p class="note">${esc(baseline.name)}</p>${same?`<table><thead><tr><th>Metric</th><th>Pinned</th><th>${resultStale?'Previous Run':'Latest Run'}</th></tr></thead><tbody>${[['Damage','damage'],['Food','food'],['Death Rate','deathChance'],['Chest Drop Chance','chestChance']].map(([label,key])=>`<tr><td>${label}</td><td>${baseline.result[key]===undefined?'—':key.endsWith('Chance')?pct(baseline.result[key],2):fmt(baseline.result[key],2)}</td><td>${result[key]===undefined?'—':key.endsWith('Chance')?pct(result[key],2):fmt(result[key],2)}</td></tr>`).join('')}</tbody></table>`:'<p class="note">Run the same encounter type to compare results.</p>'}<details id="pinned-run-details"><summary>View Full Pinned Result</summary><div class="pinned-result-body">${resultMarkup(baseline.result,baseline.config,true)}</div></details></div>`;
 };
 const style=document.createElement('style');style.textContent=`
 .ashlyn-run-controls{display:flex;align-items:flex-end;gap:12px;margin:0 0 18px}
 .ashlyn-run-controls .field{width:150px}
 .ashlyn-run-controls button{min-height:38px}
 .ashlyn-encounter .result-side>b{font-size:14px;font-weight:500}
 .ashlyn-encounter .result-side>b>span{display:block;font-size:28px;margin-top:5px}
 .ashlyn-encounter .result-side strong{font-weight:600}
 .condition-choice small{display:block;color:var(--muted);font-size:11px;line-height:1.5;margin-top:5px}
 .condition-choice img{flex-shrink:0}
 .condition-companions{margin-top:12px}
 body.ashlyn-encounter{background:radial-gradient(ellipse at 75% 10%,#b91c1c28,transparent 65%),var(--bg)}
 .ashlyn-encounter .monster-stage{background:linear-gradient(110deg,#991b1b18,transparent);border-color:#dc262655;border-radius:8px;padding:18px 12px}
 .ashlyn-encounter .monster-art{background:radial-gradient(ellipse,#dc262644,transparent 70%)}
 .ashlyn-encounter .monster-art:after{border-color:#dc262666}
 .ashlyn-encounter .monster-meta{color:#dc2626}
 .ashlyn-encounter .result-hero{background:linear-gradient(115deg,#991b1b15,var(--paper));border-color:#dc262666}
  @media(max-width:520px){.ashlyn-encounter .monster-stage{flex-direction:column;align-items:stretch;gap:12px}.ashlyn-encounter .monster-art{align-self:center}.ashlyn-encounter .monster-name{font-size:24px}}
 @media(prefers-color-scheme:dark){body.ashlyn-encounter{background:radial-gradient(ellipse at 75% 10%,#991b1b55,transparent 70%),var(--bg)}}`;
 document.head.append(style);
 refresh();
 });
})(globalThis);
