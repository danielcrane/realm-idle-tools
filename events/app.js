(() => {
 const $=id=>document.getElementById(id),monsters=EventData.monsters;
 const number=n=>n.toLocaleString(undefined,{maximumFractionDigits:3});
 const tierOf=m=>m.drops[0].item.split(' ')[0];
 $('monster-rows').innerHTML=monsters.map(m=>`<tr data-monster="${m.id}"><th scope="row"><div class="monster-name"><span class="monster-portrait"><img src="${m.image}" style="filter:${EventData.tints[m.tint]}" width="48" height="48" alt=""></span><span>${m.name}<small>Level ${m.level}</small></span></div></th><td><span class="tier-badge">${tierOf(m)}</span></td><td><input aria-label="${m.name} kills per hour" type="number" min="0" max="1000000000" step="any" value="1000" data-kph="${m.id}"></td><td class="time"></td></tr>`).join('');
 function render(){
  $('drop-bonus-value').textContent=`+${number(Number($('bonus').value))}%`;
  const monthsValid=$('months').value!==''&&$('months').checkValidity();
  const months=Number($('months').value);
  $('comparison-months').textContent=monthsValid?`${number(months)} ${months===1?'Month':'Months'}`:'— Months';
  const fields=['months','bonus','double'];
  const invalid=fields.some(id=>$(id).value===''||!$(id).checkValidity());
  $('error').hidden=!invalid;$('error').textContent='Enter valid months and drop bonuses to calculate farming times.';
  for(const m of monsters){
   const row=document.querySelector(`[data-monster="${m.id}"]`),input=row.querySelector('input');
   const valid=input.value!==''&&input.checkValidity();input.setAttribute('aria-invalid',String(!valid));
   row.querySelector('.time').textContent=invalid?'—':!valid?'Enter valid KPH':EventModel.duration(Math.max(...m.drops.map(drop=>EventModel.plan(drop,EventData.tiers[tierOf(m)].mins,Number($('months').value),365.2425/12,Number(input.value),Number($('bonus').value),Number($('double').value)).hours)));
  }
  document.querySelectorAll('[data-months]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.months)===Number($('months').value)));
 }
 $('planner').addEventListener('submit',e=>e.preventDefault());
 $('planner').addEventListener('input',e=>{if(['bonus','double'].includes(e.target.id))$('bonus-summary').textContent='Using custom bonus values.';render();});
 $('monster-rows').addEventListener('input',render);
 document.querySelectorAll('[data-months]').forEach(b=>b.addEventListener('click',()=>{$('months').value=b.dataset.months;render();}));
 $('blessing').innerHTML='<option value="0">None</option>'+EventData.blessings.map(b=>`<option value="${b.luck}">${b.name} · Lv ${b.level} · +${number(b.luck*100)}%</option>`).join('');
 $('blessing-choices').innerHTML=[{name:'None',luck:0,level:null},...EventData.blessings].map(b=>`<label class="choice-row"><img src="combat_simulator/Assets/Icons/divinity_skill.png" alt=""><span><b>${b.name}</b><small>${b.level?'Lv '+b.level+' · +'+number(b.luck*100)+'% drop chance':'No blessing'}</small></span><input type="radio" name="blessing-choice" value="${b.luck}" ${b.luck===0?'checked':''}></label>`).join('');
 $('pet-choices').innerHTML=[['','None'],['rabbit.png','Rabbit']].map(([value,name])=>`<label class="choice-row"><img src="combat_simulator/Assets/Pets/${value||'rabbit.png'}" alt=""><span><b>${name}</b><small>${value?'+10% drop chance · Includes Chocolate and Orange Rabbit':'No combat pet'}</small></span><input type="radio" name="pet-choice" value="${value}" ${!value?'checked':''}></label>`).join('');
 function selection(){
  const chance=((1+($('vip').checked?.25:0)+($('vip-plus').checked?.5:0))*(1+Number($('blessing').value)*($('halo').checked?1.3:1))*($('luck-pet').value?1.1:1)*(Number($('community').value)===4?1.05:1)-1)*100;
  return {chance,double:($('summer').checked?5:0)+($('heatwave').checked?5:0)};
 }
 function preview(){
  const b=selection();$('bonus-preview').textContent=`+${number(b.chance)}% drop chance · ${b.double}% double-drop chance`;
  $('pet-image').src='combat_simulator/Assets/Pets/'+($('luck-pet').value||'rabbit.png');
  if(!$('luck-pet').value&&$('halo').checked)$('pet-image').src='combat_simulator/Assets/Pets/divinitypet.png';
  $('pet-name').textContent=[$('luck-pet').value?$('luck-pet').selectedOptions[0].textContent:'',$('halo').checked?'Halo':''].filter(Boolean).join(' + ')||'Choose a Companion';
  $('blessing-name').textContent=Number($('blessing').value)?$('blessing').selectedOptions[0].textContent.split(' · ')[0]:'Choose a Blessing';
  const percent=Number($('community').value)*25;
  $('community-value').value=percent+'%';$('community').setAttribute('aria-valuetext',percent+'%');$('community').style.setProperty('--community-fill',percent+'%');
  document.querySelectorAll('.milestones span').forEach((el,i)=>el.classList.toggle('active',i<Number($('community').value)));
  $('community-note').textContent='Drop bonus: +'+(percent===100?'5':'0')+'%.';
  $('vip-summary').textContent='Combined VIP bonus: +'+(($('vip').checked?25:0)+($('vip-plus').checked?50:0))+'% XP and combat luck.';
 }
 $('bonus-form').addEventListener('input',e=>{if(e.target.name==='blessing-choice')$('blessing').value=e.target.value;if(e.target.name==='pet-choice')$('luck-pet').value=e.target.value;if(e.target.id==='heatwave'&&e.target.checked)$('summer').checked=true;if(e.target.id==='summer'&&!e.target.checked)$('heatwave').checked=false;preview();});
 $('choose-bonuses').addEventListener('click',()=>{preview();$('bonus-dialog').showModal();});
 $('close-bonuses').addEventListener('click',()=>$('bonus-dialog').close());
 $('bonus-dialog').addEventListener('close',()=>$('choose-bonuses').focus());
 $('reset-bonuses').addEventListener('click',()=>{$('bonus-form').reset();$('community').value='0';$('vip').checked=false;$('vip-plus').checked=false;preview();});
 $('bonus-form').addEventListener('submit',e=>{e.preventDefault();const b=selection();$('bonus').value=Number(b.chance.toFixed(9));$('double').value=b.double;const names=[];if($('summer').checked)names.push('Summer');if($('heatwave').checked)names.push('Heatwave');if(Number($('blessing').value))names.push($('blessing').selectedOptions[0].textContent.split(' · ')[0]);if($('halo').checked)names.push('Halo');if($('vip').checked)names.push('VIP');if($('vip-plus').checked)names.push('VIP+');if($('luck-pet').value)names.push($('luck-pet').selectedOptions[0].textContent);if(Number($('community').value)===4)names.push('Community');$('bonus-summary').textContent=names.length?names.join(' + '):'No drop bonuses selected.';$('bonus-dialog').close();render();});
 preview();
 $('bonus-form').requestSubmit();
})();
