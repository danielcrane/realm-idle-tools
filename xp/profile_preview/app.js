'use strict';
(() => {
  const M=XPPrototype,$=id=>document.getElementById(id),form=$('planner');
  const fmt=(v,max=2)=>new Intl.NumberFormat('en-GB',{maximumFractionDigits:max}).format(v);
  const percent=v=>fmt(v*100,2)+'%';
  const elapsed=h=>{if(!h)return '0 min';if(h<1/60)return fmt(h*3600,1)+' sec';const mins=Math.ceil(h*60),days=Math.floor(mins/1440),hours=Math.floor(mins%1440/60),minutes=mins%60;return [days?days+'d':'',hours?hours+'h':'',minutes?minutes+'m':''].filter(Boolean).join(' ');};
  function fill(id,rows,selected){const el=$(id),previous=selected??el.value;el.replaceChildren(...rows.map(r=>{const o=document.createElement('option');o.value=typeof r.value==='string'?r.value:(r.id??r.name??r);o.textContent=r.label??r.name??r;return o;}));if([...el.options].some(o=>o.value===previous))el.value=previous;}
  const pctLabels={xp_boost:'all XP',tool_speed:'gathering speed',craft_speed:'production speed',thieving_success:'thieving success',production_speed:'production speed',divinity_xp_boost:'Divinity XP',blessing_power:'blessing power',skill_speed:'skill speed'};
  function effectLabel(effects){return Object.entries(effects).filter(([key])=>pctLabels[key]).map(([key,v])=>'+'+percent(v)+' '+pctLabels[key]).join(', ');}
  for(const [field,slot]of Object.entries(M.slots)){
    const a=document.createElement('label'),b=document.createElement('label'),sa=document.createElement('select'),sb=document.createElement('select');
    a.textContent=slot==='body'?'Body':field;b.textContent='Rarity';sa.id='armor'+field;sb.id='rarity'+field;a.append(sa);b.append(sb);$('armor-fields').append(a,b);fill(sb.id,M.options.rarities);
  }
  fill('skill',M.options.skills);
  fill('amulet',M.options.amulets);
  fill('season',M.options.seasons);
  fill('weather',M.options.weather);
  for(const [id,list]of Object.entries({gatheringPotion:'gatheringPotions',productionPotion:'productionPotions',xpPotion:'xpPotions'}))fill(id,M.options[list].map(p=>({value:p.name,label:p.name==='None'?'None':p.name+' · +'+percent(p.value)})));
  for(const id of ['toolRarity','amuletRarity'])fill(id,M.options.rarities);
  for(const id of ['ring1','ring2'])fill(id,['None',...M.options.rarities.map(r=>r.name)]);
  for(const id of ['xpCandy','speedCandy'])fill(id,Object.entries(M.tiers).map(([name,t])=>({value:name,label:name==='None'?'None':name+' · +'+percent(t.bonus)+' / '+t.minutes+' min'})));
  let stocks={};
  function rememberStocks(){for(const input of document.querySelectorAll('[data-material]'))stocks[input.dataset.material]=input.value;}
  function inventoryFields(){
    rememberStocks();const action=M.actions.find(a=>a.id===$('action').value);
    $('inventory-fields').replaceChildren(...Object.entries(action.input).map(([name,qty])=>{const label=document.createElement('label'),input=document.createElement('input');label.textContent=name+' · '+qty+' per action';input.type='number';input.min='0';input.step='1';input.dataset.material=name;input.value=stocks[name]??0;label.append(input);return label;}));
    $('inventory-section').hidden=Object.keys(action.input).length===0;
  }
  function syncSkill(state={}){
    const skill=$('skill').value,id=M.skillId(skill),k=M.kind(skill);
    fill('action',M.actions.filter(a=>a.skill===skill).map(a=>({value:a.id,label:a.name+' · Lv '+a.level+(k==='thieving'?' · '+a.category:'')})),state.action);
    fill('blessing',M.relevantBlessings(skill).map(p=>({value:p.name,label:p.name==='None'?'None':p.name+' · '+effectLabel(p.effect)+' · Div '+p.level})),state.blessing);
    fill('pet',M.relevantPets(skill).map(p=>({value:p.name,label:p.name==='None'?'None':p.name+' · '+(effectLabel(p.bonus)||p.desc)})),state.pet);
    fill('tool',[{name:'None'},...(M.data.tools[id]||[])],state.tool);
    for(const [field,slot]of Object.entries(M.slots))fill('armor'+field,M.armorOptions(skill,slot),state['armor'+field]);
    for(const el of document.querySelectorAll('[data-gather]'))el.hidden=k!=='gathering';
    for(const el of document.querySelectorAll('[data-production]'))el.hidden=k!=='production';
    for(const el of document.querySelectorAll('[data-speed]'))el.hidden=!['gathering','production'].includes(k);
    $('divinityLevel').disabled=skill==='Divinity';
    $('amulet').disabled=$('amuletRarity').disabled=!['gathering','production'].includes(k);
    $('success-row').hidden=k!=='thieving';
    for(const el of document.querySelectorAll('[data-divinity]'))el.hidden=skill!=='Divinity';
    text('speed-candy-label',k==='production'?'Processing candy':'Gathering candy');
    inventoryFields();
  }
  function read(){rememberStocks();return {...Object.fromEntries(Object.keys(M.defaults).filter(key=>key!=='inventory').map(key=>[key,key==='currentXp'&&$(key).dataset.exact!==undefined?$(key).dataset.exact:$(key).type==='checkbox'?$(key).checked:$(key).value])),targetPlan:true,inventory:{...stocks},toolPool:window.XPProfileTools||[]};}
  function load(s){
    s={...M.defaults,...M.migrate(s)};
    stocks={...(s.inventory||{})};$('inventory-fields').replaceChildren();
    for(const key of Object.keys(M.defaults)){if(key==='inventory'||!$(key))continue;const el=$(key);if(el.type==='checkbox')el.checked=s[key];else if(el.tagName!=='SELECT'||[...el.options].some(o=>o.value===String(s[key])))el.value=s[key];}
    $('currentXp').dataset.exact=String(s.currentXp);$('currentXp').value=Math.floor(M.rules.getXPFor(Number(s.from))+Number(s.currentXp));syncSkill(s);render();
  }
  function text(id,v){$(id).textContent=v;}
  function rowList(container,rows){container.replaceChildren(...rows.map(([label,value])=>{const div=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;div.append(dt,dd);return div;}));}
  function render(){
    const s=read();$('action').disabled=M.kind(s.skill)==='gathering'&&s.autoNode;$('blessing').disabled=s.skill==='Divinity'&&s.autoBlessing;
    for(const id of ['vip','vipPlus'])$(id).closest('.vip-option').classList.toggle('active',s[id]);
    text('vip-summary','VIP: +'+percent((s.vip?0.25:0)+(s.vipPlus?0.5:0))+' XP');
    const community=Number(s.community),skillKind=M.kind(s.skill);
    text('community-percent',community+'%');
    $('community').style.setProperty('--community-fill',community+'%');
    $('community').setAttribute('aria-valuetext',community+'%');
    const communitySpeed=skillKind==='gathering'?['gathering',25]:skillKind==='production'?['production',50]:null;
    text('community-summary','Community: +'+(community>=75?5:0)+'% XP'+(communitySpeed?' · +'+(community>=communitySpeed[1]?5:0)+'% '+communitySpeed[0]+' speed':''));
    for(const el of document.querySelectorAll('[data-manual]'))el.hidden=s.weatherMode!=='manual';
    for(const [id,options]of [['season',M.options.seasons],['weather',M.options.weather]]){
      const icon=$(id+'-icon'),selected=options.find(option=>option.id===s[id]);
      if(!icon)continue;
      icon.hidden=!selected?.icon;
      if(selected?.icon)icon.src='assets/weather/'+selected.icon.split('/').pop();
      else icon.removeAttribute('src');
    }
    for(const el of document.querySelectorAll('[data-material]'))el.disabled=!s.limitMaterials;
    if(s.skill==='Divinity')$('divinityLevel').value=s.from;
    for(const [id,potion]of Object.entries({gatheringMinutes:'gatheringPotion',productionMinutes:'productionPotion',xpMinutes:'xpPotion'}))$(id).disabled=s[potion]==='None';
    const action=M.actions.find(a=>a.id===s.action);
    text('action-meta',action?'Base: '+fmt(action.xp)+' XP · '+fmt(action.seconds)+' seconds · Unlocks at level '+action.level:'');
    try{
      const r=M.calculate(s);text('action-meta','Starts with '+r.action.name+' · '+(M.kind(s.skill)==='gathering'?r.resolved.tool+' ('+r.resolved.toolRarity+') · ':'')+r.resolved.blessing+' blessing');window.XPPrototypeResult=r;document.dispatchEvent(new CustomEvent('xp-result',{detail:r}));$('error').hidden=true;$('result-content').hidden=false;
      text('rate',fmt(r.rate,0));text('rate-timing','· '+s.timingMode);text('comparison',fmt(r.baseRate,0)+' XP/h without candies · '+percent(r.rate/r.baseRate-1)+' candy increase');
      text('target-time',r.targetReached===false?'Not Reachable':elapsed(r.targetHours));text('required',fmt(r.required,0));text('xp-action',fmt(r.expectedXp));text('duration',fmt(r.seconds,4)+' sec');text('actions-needed',fmt(r.neededActions,0));text('pet-extra',percent(r.extra)+' of base boosted XP');text('success',percent(r.success));
      text('set-info',r.setCount+' / 6 matching pieces · +'+percent(r.setSpeed)+' set speed');
      text('weather-info',r.weatherName+' · Selected bonuses apply throughout this plan.');
      $('materials').replaceChildren(...(r.materials.length?r.materials.map(m=>{const li=document.createElement('li'),name=document.createElement('span'),count=document.createElement('strong');name.textContent=m.name;count.textContent=fmt(m.needed,0);li.append(name,count);return li;}):[Object.assign(document.createElement('li'),{textContent:'No input materials'})]));
      text('target-status',r.targetReached===false?(r.session.materialLimited?'Available materials cannot reach the target.':'Target exceeds the planning horizon.')+' Estimated end level: '+r.session.level+'.': 'Target reached after '+elapsed(r.targetHours)+' · '+fmt(r.sessionActions,0)+' actions.');
      const duration=(tier,count)=>s.infiniteCandies?'Unlimited duration':elapsed(M.tiers[tier].minutes*Number(count)/60),k=M.kind(s.skill);
      const coverage=[
        'XP candy: '+(s.xpCandy==='None'?'none':duration(s.xpCandy,s.xpCandyCount)+' supplied')+' · +'+percent(r.avgXp)+' average XP.',
        ...(['gathering','production'].includes(k)?['Speed candy: '+(s.speedCandy==='None'?'none':duration(s.speedCandy,s.speedCandyCount)+' supplied')+' · +'+percent(r.avgSpeed)+' average speed.']:[]),
        ...(k==='gathering'&&s.gatheringPotion!=='None'||k==='production'&&s.productionPotion!=='None'?['Speed potion: '+fmt(r.session.usedMinutes,2)+' minutes used · '+(s.infinitePotions?'unlimited':fmt(r.session.remainingSpeedMinutes,2))+' left.']:[]),
        ...(k==='gathering'&&s.xpPotion!=='None'?['XP potion: '+fmt(r.session.boosted,0)+' actions boosted · '+(s.infinitePotions?'unlimited':fmt(r.session.remainingXpMinutes,2))+' minutes left.']:[]),
        ...(k==='thieving'?['Successful attempts: '+fmt(r.session.successful,0)+' expected.']:[]),
        ...(r.materials.length?['Inputs used: '+r.materials.map(m=>m.name+' × '+fmt(m.session,0)).join(' · ')]:[])
      ];
      $('coverage').replaceChildren(...coverage.map(t=>Object.assign(document.createElement('p'),{textContent:t})));
      text('candy-info',(r.currentStrength===1?'Event active · full candy strength':'Outside event · half candy strength')+' at the selected UTC start. Starting bonuses: +'+percent(r.candyXp)+' XP, +'+percent(r.candySpeed)+' speed.');
      $('breakdown').replaceChildren();
      for(const [heading,factors]of [['XP Multipliers',r.xpFactors],['Speed Multipliers',r.speedFactors]]){const h=document.createElement('h3'),dl=document.createElement('dl');h.textContent=heading;dl.className='stats';rowList(dl,Object.entries(factors).map(([name,v])=>[name,fmt(v,5)+'×']));$('breakdown').append(h,dl);}
      $('warnings').replaceChildren(...r.warnings.map(w=>Object.assign(document.createElement('p'),{textContent:w})));
    }catch(e){window.XPPrototypeResult=null;document.dispatchEvent(new CustomEvent('xp-invalid'));text('error',e.message);$('error').hidden=false;$('result-content').hidden=true;}
  }
  form.addEventListener('submit',e=>e.preventDefault());
  form.addEventListener('input',e=>{if(e.target.id==='currentXp'){const total=Number($('currentXp').value);if($('currentXp').value!==''&&Number.isFinite(total)&&total>=0){const level=M.rules.getLevel(total);$('from').value=level;$('to').value=Math.max(level,Number($('to').value));$('currentXp').dataset.exact=String(level===130?0:total-M.rules.getXPFor(level));}else{$('currentXp').dataset.exact='';}}if(e.target.id==='from'){$('currentXp').value=M.rules.getXPFor(Number($('from').value));$('currentXp').dataset.exact='0';}
    if(e.target.id==='skill')syncSkill();
    if(e.target.id==='action')inventoryFields();
    const map={gatheringPotion:'gatheringMinutes',productionPotion:'productionMinutes',xpPotion:'xpMinutes'};
    if(map[e.target.id])$(map[e.target.id]).value=M.data.potions.find(p=>p.name===e.target.value)?.duration/60000||0;
    render();
  });
  const fresh=()=>({...M.defaults,start:new Date().toISOString().slice(0,16)});
  $('reset').addEventListener('click',()=>{load(fresh());text('load-status','Reset to a fresh training plan.');});
  $('load-sheet').addEventListener('click',()=>{load({...M.snapshot,start:new Date().toISOString().slice(0,16)});text('load-status','Default selections restored.');});
  window.XPPrototypeUI={read,load,render,syncSkill};text('action-count',M.actions.length);load(fresh());
})();
