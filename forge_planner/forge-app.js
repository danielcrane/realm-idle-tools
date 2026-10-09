'use strict';
(()=>{
const M=ForgeModel,$=id=>document.getElementById(id),fmt=n=>n.toLocaleString('en-GB'),rar=t=>M.data.rarities[t-1].name;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const badge=t=>`<span class="rarity-text" style="--rarity-color:${M.data.rarities[t-1].color}">${escape(rar(t))}</span>`;
let selectedItem='';
$('item-count').textContent=M.data.items.length;
$('source-hash').textContent='Bundled source SHA-256: '+M.data.sourceHash;
$('target').innerHTML=M.data.rarities.map(r=>`<option value="${r.tier}">${r.name}</option>`).join('');
$('inventory').innerHTML=M.data.rarities.map(r=>`<label for="inv-${r.tier}">${badge(r.tier)}<input id="inv-${r.tier}" type="text" inputmode="numeric" value="0" aria-label="${r.name} inventory copies"></label>`).join('');
function clear(){for(let t=1;t<=21;t++)$('inv-'+t).value='0';}
function filter(){
 const terms=$('search').value.toLowerCase().trim().split(/\s+/).filter(Boolean);
 const list=M.data.items.filter(i=>terms.every(t=>i.name.toLowerCase().includes(t)));
 $('search-results').hidden=false;
 $('match-info').textContent=list.length?`${list.length} matching items · Choose an item to plan.`:'No forgeable items match. Try another name or material.';
 $('item-results').innerHTML=list.map(i=>`<button type="button" data-item="${escape(i.name)}" aria-current="${i.name===selectedItem}"><span>${escape(i.name)}</span><small>${i.kind==='tool'?'Tool':'Equipment'}</small></button>`).join('');
}
function choose(name){if(name!==selectedItem)clear();selectedItem=name;$('search').value=name;$('search-results').hidden=true;render();}
function table(plan,label){if(!plan.ops.length)return '<p class="empty">No merges needed.</p>';return `<div class="table-wrap" tabindex="0" role="region" aria-label="${escape(label)}"><table><caption>${escape(label)}</caption><thead><tr><th scope="col">Merge</th><th scope="col">Made</th><th scope="col">Gold each</th><th scope="col">Gold total</th></tr></thead><tbody>${plan.ops.map(o=>`<tr><td><span class="step-name">${badge(o.fromTier)} → ${badge(o.fromTier+1)}</span><span class="step-qty">Use ${fmt(o.used)} copies</span></td><td>${fmt(o.qty)}</td><td>${fmt(o.costEach)}</td><td>${fmt(o.gold)}</td></tr>`).join('')}</tbody><tfoot><tr><th scope="row" colspan="3">Merge fees</th><td>${fmt(plan.totalGold)}</td></tr></tfoot></table></div>`;}
function stock(inv){const rows=inv.map((n,t)=>t&&n?`<li>${badge(t)}<b>${fmt(n)}</b></li>`:'').join('');return rows?'<ul class="stock-list">'+rows+'</ul>':'<p class="empty">No spare copies remain.</p>';}
function render(){
 const target=Number($('target').value);
 for(const r of M.data.rarities)$('inv-'+r.tier).closest('label').hidden=r.tier>=target;
 $('target').style.setProperty('--rarity-color',M.data.rarities[target-1].color);
 try{
 if(!selectedItem)throw Error('Choose an item from the search results.');
 const inv=Object.fromEntries(M.data.rarities.map(r=>[r.tier,r.tier<target?($('inv-'+r.tier).value.trim()||'0'):'0']));
 const p=M.plan(selectedItem,inv,Number($('target').value),'1','');
 $('error').hidden=true;$('result-content').hidden=false;
 $('item-meta').textContent=`Material tier ${p.item.materialTier} · ${p.item.kind==='tool'?p.item.skill+' tool':p.item.definition.slot+' equipment'} · ${M.rules.getForgeQty(1)} copies → 1 next-rarity copy`;
 $('total-gold').textContent=fmt(p.required.totalGold);$('target-description').innerHTML=`Target: ${fmt(p.count)} × ${badge(p.target)} ${escape(p.item.name)}`;
 $('missing').textContent=fmt(p.required.missing);
 $('target-status').textContent=p.required.missing?`Obtain ${fmt(p.required.missing)} additional Common copies to complete this chain.`:'Your entered inventory covers the target.';
 $('achievable').innerHTML=`${badge(p.target)} · ${p.canReach?'Target Ready':'More Copies Needed'}`;
 $('now-summary').textContent=p.canReach?(p.required.ops.length?`Forge one copy for ${fmt(p.now.totalGold)} gold.`:'You already have a copy at this rarity. No merges needed.'):'Your inventory cannot complete a copy at this rarity yet.';
 $('now-ops').innerHTML=table(p.now,'Merges You Can Do Now');$('now-leftovers').innerHTML='<h3>Inventory After These Merges</h3><p class="muted">Includes copies set aside for the target.</p>'+stock(p.now.after);
 $('chain-note').textContent=p.required.missing?'Conditional plan: first obtain the missing Common copies shown above. Fees cover every merge below.':'Execute from top to bottom. All needed copies are in your entered inventory.';
 $('required-ops').innerHTML=table(p.required,'Complete Target Chain');$('leftovers').innerHTML=stock(p.required.leftovers);
 $('stats-title').innerHTML=badge(p.target)+' Item Stats';$('stats').innerHTML=M.stats(p.item,p.target).map(s=>`<div><dt>${escape(s.label)}</dt><dd>${escape(s.value)}</dd></div>`).join('');
 }catch(e){$('error').textContent=e.message;$('error').hidden=false;$('result-content').hidden=true;$('item-meta').textContent='';}}
function reset(){selectedItem=M.data.items.some(i=>i.name==='Copper Sword')?'Copper Sword':M.data.items[0].name;$('search').value=selectedItem;$('search-results').hidden=true;clear();$('inv-1').value='20';$('inv-2').value='2';$('target').value='3';render();}
$('planner').addEventListener('submit',e=>e.preventDefault());
$('planner').addEventListener('input',e=>{if(e.target.id==='search')filter();else render();});
$('search').addEventListener('focus',filter);
$('search').addEventListener('keydown',e=>{if(e.key==='Escape'){$('search-results').hidden=true;}else if(e.key==='ArrowDown'){e.preventDefault();$('item-results').querySelector('button')?.focus();}});
$('item-results').addEventListener('click',e=>{const button=e.target.closest('[data-item]');if(button)choose(button.dataset.item);});
$('reset').addEventListener('click',reset);$('clear').addEventListener('click',()=>{clear();render();});reset();
})();
