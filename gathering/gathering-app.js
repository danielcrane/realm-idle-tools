'use strict';
(() => {
  const data = GATHERING_DATA;
  const $ = id => document.getElementById(id);
  const slots = [['helm','Head'],['body','Body'],['legs','Legs'],['boots','Feet'],['gloves','Hands']];
  const names = {woodcutting:'Woodcutting',mining:'Mining',fishing:'Fishing'};
  const plurals = {woodcutting:'Bird Nests',mining:'Gem Bags',fishing:'Underwater Chests'};
  const shortNames = {woodcutting:'nests',mining:'gem bags',fishing:'underwater chests'};
  const fmt = (value, decimals = 3) => value.toLocaleString('en-GB',{maximumFractionDigits:decimals});
  const option = (value, text) => { const o = document.createElement('option'); o.value=value; o.textContent=text; return o; };
  const img = (el, key) => { el.src = data.assets[key]; el.hidden = false; };
  let skill = 'woodcutting';
  const setups = Object.fromEntries(Object.entries(data.resources).map(([key,resources]) => [key,{resourceIndex:resources.length-1,pet:false,tool:'',gear:slots.map(()=>({name:'',tier:1}))}]));
  function saveSetup() {
    setups[skill] = {resourceIndex:Number($('resource').value),pet:$('pet').checked,tool:$('set-tool').value,gear:slots.map(([slot])=>({name:$('gear-'+slot).value,tier:Number($('rarity-'+slot).value)}))};
  }
  function fillSkills() {
    const setup = setups[skill];
    $('resource').replaceChildren(...data.resources[skill].map((r,i)=>option(i,`${r.item} · Lv ${r.level}`)));
    $('resource').value = setup.resourceIndex;
    const pet = data.pets.find(p=>p.skill===skill);
    $('pet-name').textContent = pet.name;
    img($('pet-icon'),pet.name);
    $('pet').checked = setup.pet;
    $('set-tool').replaceChildren(option('','No matching set tool'),...data.sets[skill].tools.map(tool=>option(tool,tool)));
    $('set-tool').value=setup.tool;
    $('set-name').textContent=data.sets[skill].name+' Set';
    $('set-preset').replaceChildren(option('custom','Custom selection'),option('none','No treasure armor'),...[1,2,3].map(tier=>option(tier,data.gear.find(g=>g.skillOf===skill&&g.setTier===tier).name.split(' ')[0]+' set')));
    $('rarity-preset').replaceChildren(option('custom','Individual rarities'),...data.rarities.map(r=>option(r.tier,r.name)));
    $('gear-slots').replaceChildren();
    slots.forEach(([slot,label], index) => {
      const row = document.createElement('div');
      row.className='gear-row';
      row.innerHTML=`<img class="gear-art" id="art-${slot}" alt="" hidden><span class="empty-slot" id="empty-${slot}" aria-hidden="true">–</span><label class="field" for="gear-${slot}">${label}<select id="gear-${slot}"></select></label><label class="field" for="rarity-${slot}">Rarity<select id="rarity-${slot}"></select></label><span class="gear-bonus" id="bonus-${slot}"></span>`;
      $('gear-slots').append(row);
      const gearSelect = $('gear-'+slot);
      gearSelect.replaceChildren(option('','None'),...data.gear.filter(g=>g.skillOf===skill&&g.slot===slot).map(g=>option(g.name,g.name)));
      gearSelect.value = setup.gear[index].name;
      $('rarity-'+slot).replaceChildren(...data.rarities.map(r=>option(r.tier,r.name)));
      $('rarity-'+slot).value = setup.gear[index].tier;
    });
    render();
  }
  function syncGear() {
    const selectedTiers = [], rarities = [];
    for(const [slot] of slots) {
      const piece = data.gear.find(g=>g.name===$('gear-'+slot).value);
      const rarity = data.rarities.find(r=>r.tier===Number($('rarity-'+slot).value));
      $('rarity-'+slot).disabled = !piece;
      $('empty-'+slot).hidden = !!piece;
      $('art-'+slot).hidden = !piece;
      if(piece) img($('art-'+slot),piece.name);
      $('bonus-'+slot).textContent = piece ? `+${fmt(100*GatheringModel.gearBonus(piece,rarity))}% treasure find` : 'No treasure bonus';
      selectedTiers.push(piece?.setTier ?? 'none');
      rarities.push(rarity.tier);
    }
    $('set-preset').value = selectedTiers.every(t=>t===selectedTiers[0]) ? selectedTiers[0] : 'custom';
    $('rarity-preset').value = rarities.every(t=>t===rarities[0]) ? rarities[0] : 'custom';
  }
  function render() {
    syncGear(); saveSetup();
    const setup = setups[skill];
    const resource = data.resources[skill][setup.resourceIndex];
    img($('resource-icon'),resource.item);
    $('gem-explanation').hidden=skill!=='mining';
    $('tool-icon').hidden=!setup.tool;
    $('tool-empty').hidden=!!setup.tool;
    if(setup.tool) img($('tool-icon'),setup.tool);
    $('resource-detail').textContent = `${resource.name} · Required level ${resource.level}`;
    img($('drop-icon'),data.drops[skill]);
    $('results-title').textContent = plurals[skill];
    const hours = $('hours').value.trim()==='' ? NaN : Number($('hours').value);
    const rawSeconds = $('action-seconds').value.trim();
    const seconds = rawSeconds==='' ? null : Number(rawSeconds);
    let result;
    try {
      if(hours > 100000) throw Error('Choose a gathering time of 100,000 hours or less.');
      if($('hours').validity.badInput || $('action-seconds').validity.badInput) throw Error('Enter a valid number.');
      result = GatheringModel.calculate(data,{skill,...setup,hours,actionSeconds:seconds});
      $('error').hidden=true;
      $('hours').removeAttribute('aria-invalid');
      $('action-seconds').removeAttribute('aria-invalid');
    } catch(error) {
      $('error').textContent=error.message; $('error').hidden=false;
      $('result-values').classList.add('invalid-values');
      for(const id of ['hourly','minute','interval','expected','base-rate','level-factor','pet-factor','gear-factor','set-count','set-speed']) $(id).textContent='—';
      $('set-perk').textContent='Enter valid times to update the setup breakdown.';
      $('offline').textContent='Enter valid gathering and action times to calculate rewards.';
      $('extra-value').textContent='—'; $('extra-unit').textContent=''; $('extra-sources').textContent='';
      $('extra-session').textContent='Enter valid times to calculate extra resources.'; $('extra-note').textContent='';
      $('action-result').textContent=''; $('cap-note').hidden=true;
      const invalidHours = !Number.isFinite(hours) || hours<0 || hours>100000;
      $(invalidHours?'hours':'action-seconds').setAttribute('aria-invalid','true');
      return;
    }
    $('result-values').classList.remove('invalid-values');
    $('hourly').textContent=fmt(result.hourly);
    $('minute').textContent=fmt(result.perMinute);
    $('interval').textContent=fmt(result.secondsPerDrop,1)+' s';
    $('expected').textContent=fmt(result.expected);
    $('session-label').textContent=`In ${fmt(hours,6)} ${hours===1?'hour':'hours'} of gathering`;
    $('expected-label').textContent='expected '+shortNames[skill];
    $('base-rate').textContent=data.rates[skill]+' / hour';
    $('level-factor').textContent='×'+fmt(result.levelFactor,4);
    $('pet-factor').textContent='×'+fmt(1+result.petBonus);
    $('gear-factor').textContent='×'+fmt(1+result.gearTotal,5);
    $('gear-total').textContent='+'+fmt(result.gearTotal*100)+'% total';
    $('set-count').textContent=result.setPieces+' / 6 pieces';
    $('set-speed').textContent='+'+fmt(result.setSpeed*100)+'% gathering speed';
    $('three-piece').classList.toggle('unlocked',result.setPieces>=3);
    $('six-piece').classList.toggle('unlocked',result.setPieces>=6);
    $('three-state').textContent=result.setPieces>=6?'Replaced by 6-piece bonus':result.setPieces>=3?'Active':'Locked';
    $('six-state').textContent=result.setPieces>=6?'Active':'Locked';
    const setDescriptions={woodcutting:'5% chance for triple logs',fishing:'Up to 6 extra pearls/hour',mining:'Up to 10 extra loose gems/hour'};
    $('six-perk-label').textContent=setDescriptions[skill];
    if(skill==='woodcutting') {
      $('set-perk').textContent=`Triple-log chance: ${fmt(result.setPerk*100)}% from the set + ${fmt(result.petPerk*100)}% from your pet = ${fmt(result.combinedPerk*100)}% per action. These are logs, not extra nests.`;
    } else {
      const extra=skill==='fishing'?'pearls':'loose gems';
      $('set-perk').textContent=`Extra ${extra}: (${fmt(result.setPerk)} set + ${fmt(result.petPerk)} pet) × ${fmt(result.levelFactor,4)} resource factor = ${fmt(result.extraPerHour)} per gathering hour. These are separate from ${shortNames[skill]}.`;
    }
    $('extra-title').textContent=skill==='woodcutting'?'Bonus Logs':skill==='fishing'?'Bonus Pearls':'Bonus Loose Gems';
    if(skill==='woodcutting') {
      $('extra-value').textContent=fmt(result.combinedPerk*100)+'%';
      $('extra-unit').textContent='chance of triple logs';
      $('extra-sources').textContent='Pet '+fmt(result.petPerk*100)+'% + set '+fmt(result.setPerk*100)+'%';
      const extraPerAction=2*result.combinedPerk;
      if(seconds!==null) {
        const logRate=extraPerAction*3600/seconds;
        $('extra-session').textContent=fmt(logRate)+' extra logs/hour · '+fmt(logRate*hours)+' extra logs in '+fmt(hours,6)+' '+(hours===1?'hour':'hours')+'.';
        $('extra-note').textContent='Calculated using your actual '+fmt(seconds)+' seconds/action. These are additional logs from the triple-log perk.';
      } else {
        $('extra-session').textContent=fmt(extraPerAction)+' extra logs per action on average.';
        $('extra-note').textContent='Enter your actual action time under “Optional: chance per action” to see extra logs/hour.';
      }
    } else {
      const label=skill==='fishing'?'pearls':'loose gems';
      $('extra-value').textContent=fmt(result.extraPerHour);
      $('extra-unit').textContent=label+' / hour';
      $('extra-sources').textContent='Pet '+fmt(result.petPerk*result.levelFactor)+' + set '+fmt(result.setPerk*result.levelFactor)+' per hour';
      $('extra-session').textContent=fmt(result.extraPerHour*hours)+' expected '+label+' in '+fmt(hours,6)+' '+(hours===1?'hour':'hours')+'.';
      $('extra-note').textContent='Includes your resource level. Awarded directly while gathering, separately from '+shortNames[skill]+'.';
      if(seconds!==null && result.extraPerHour*seconds/3600>1) $('extra-note').textContent+=' At your action time, active play caps at '+fmt(3600/seconds)+' per hour (one per action).';
    }
    $('offline').textContent=`${fmt(result.offlineWhole,0)} ${shortNames[skill]}`+(result.offlineFraction>0 ? ` + ${fmt(result.offlineFraction*100,4)}% chance of one more.` : ` for exactly ${fmt(hours,6)} ${hours===1?'hour':'hours'} of processed gathering time.`);
    $('action-result').textContent=result.chance===null ? 'Enter an action time to see its drop chance.' : `${fmt(result.chance*100,4)}% chance of one ${data.drops[skill].toLowerCase()} per action. About ${fmt(1/result.chance,2)} actions per find on average.`;
    const capped = result.chance!==null && result.hourly*seconds/3600>1;
    $('cap-note').hidden=!capped;
    $('cap-note').textContent=capped ? `At ${fmt(seconds)} seconds/action, active play caps at one find per action (${fmt(result.activeHourly)} per hour). The headline rate and offline calculation remain the uncapped time-based expectation.` : '';
    $('comparison-caption').textContent=`${names[skill]} resources with your selected pet and armor. Hourly expectations use productive gathering time.`;
    $('resource-table').replaceChildren();
    data.resources[skill].forEach((r,i)=>{
      const row=document.createElement('tr');
      if(i===setup.resourceIndex) row.className='selected-resource';
      const value=GatheringModel.calculate(data,{skill,...setup,resourceIndex:i,hours:1});
      const cell=document.createElement('td');
      const item=document.createElement('span'); item.className='table-item';
      const art=document.createElement('img'); art.src=data.assets[r.item];art.alt='';
      const text=document.createElement('span');text.textContent=r.item;
      const sub=document.createElement('small');sub.textContent=r.name+(i===setup.resourceIndex?' · Selected':'');
      text.append(sub);item.append(art,text);cell.append(item);row.append(cell);
      for(const content of [r.level,'×'+fmt(value.levelFactor,4),fmt(value.hourly)]){const td=document.createElement('td');td.textContent=content;row.append(td);}
      $('resource-table').append(row);
    });
  }
  $('setup').addEventListener('submit',e=>e.preventDefault());
  $('setup').addEventListener('change',e=>{
    if(e.target.name==='skill') {saveSetup();skill=e.target.value;fillSkills();return;}
    if(e.target.id==='set-preset' && e.target.value!=='custom') {
      const tier=e.target.value;
      for(const [slot] of slots) $('gear-'+slot).value=tier==='none'?'':data.gear.find(g=>g.skillOf===skill&&g.slot===slot&&g.setTier===Number(tier)).name;
    }
    if(e.target.id==='rarity-preset' && e.target.value!=='custom') for(const [slot] of slots) $('rarity-'+slot).value=e.target.value;
    render();
  });
  for(const id of ['hours','action-seconds']) $(id).addEventListener('input',render);
  $('reset').addEventListener('click',()=>{
    for(const [key,resources] of Object.entries(data.resources)) setups[key]={resourceIndex:resources.length-1,pet:false,tool:'',gear:slots.map(()=>({name:'',tier:1}))};
    skill='woodcutting';document.querySelector('input[name="skill"][value="woodcutting"]').checked=true;
    $('hours').value='1';$('action-seconds').value='';fillSkills();
  });
  fillSkills();
})();
