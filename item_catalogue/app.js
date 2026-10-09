(function(){'use strict';
const D=ItemCatalogue,$=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const groups=new Map(),contents=new Map();for(const r of D.rows){if(!groups.has(r.item))groups.set(r.item,[]);groups.get(r.item).push(r);if(r.category==='Containers'){if(!contents.has(r.from))contents.set(r.from,[]);contents.get(r.from).push(r);}}
const names=[...groups.keys()].sort((a,b)=>a.localeCompare(b)),categories=Object.keys(D.coverage);
let selected=names[0]||'',limit=50,matches=[],view='sources';
const gearTiers=new Map();
const num=x=>x.toLocaleString(undefined,{maximumFractionDigits:6});
function icon(name,type='items',size=24){const art=D.icons[type]?.[name];if(!art)return '';return '<span class="catalogue-icon" aria-hidden="true" style="--icon-size:'+size+'px">'+(art.src?'<img src="'+esc(art.src)+'" width="'+size+'" height="'+size+'" alt="" decoding="async">':art.svg)+'</span>';}
function rate(r){return r.p===undefined?esc(r.rate||'See source notes'):num(r.p*100)+'%<small>'+esc(r.basis)+'</small>';}
function quantity(r){if(r.quantity)return esc(r.quantity);if(!r.q)return '—';return r.q[0]===r.q[1]?num(r.q[0]):num(r.q[0])+'–'+num(r.q[1]);}
function facts(r){const minimum=D.rarities.find(x=>x.tier===r.minRarity);return '<dl class="source-facts"><div><dt>'+(r.category==='Shops'?'Cost / Availability':'Base Rate')+'</dt><dd>'+rate(r)+'</dd></div><div><dt>Quantity'+(r.q&&r.p!==undefined?' When Awarded':'')+'</dt><dd>'+quantity(r)+(r.offlineQty!=null&&r.q[0]!==r.q[1]?'<small>Cold offline: '+r.offlineQty+'</small>':'')+'</dd></div></dl>'+(minimum?'<p class="minimum-rarity">Guaranteed minimum: <strong>'+esc(minimum.name)+' (Tier '+minimum.tier+')</strong> from this source.</p>':'')+(r.note?'<p class="source-note">'+esc(r.note)+'</p>':'');}
function statValue(s){return s.format==='mult'?'×'+num(s.value):s.format==='percent'?(s.value>=0?'+':'−')+num(Math.abs(s.value)*100)+'%':'+'+num(s.value);}
function setBonus(b){
 const parts=[];if(b.statMult>1)parts.push('+'+num((b.statMult-1)*100)+'% active-style combat stats');if(b.lifesteal)parts.push('+'+num(b.lifesteal*100)+'% lifesteal');if(b.speed)parts.push('+'+num(b.speed*100)+'% gathering speed');
 if(b.perk?.wc_triple)parts.push(num(b.perk.wc_triple*100)+'% chance for triple logs');
 if(b.perk?.fish_pearl)parts.push('bonus Pearls (base rate up to '+num(b.perk.fish_pearl)+'/hour, scaled by the resource’s required level)');
 if(b.perk?.mine_gem)parts.push('bonus gems (base rate up to '+num(b.perk.mine_gem)+'/hour, scaled by the resource’s required level)');return parts.join(' · ');
}
function renderMuseum(g){
 const families=D.museum[selected]||[];
 const labels={atk:'ATK',str:'STR',def:'DEF',rng:'RNG',mag:'MAG',dr:'DR',lifesteal:'LS',rngBonus:'RNG (Flat)'};
 const full={atk:'Attack',str:'Strength',def:'Defense',rng:'Ranged',mag:'Magic',dr:'Damage Reduction',lifesteal:'Lifesteal',rngBonus:'Flat Ranged Bonus'};
 const title=style=>style[0].toUpperCase()+style.slice(1);
 const value=(key,n)=>'+'+(key==='rngBonus'?n:n*100).toLocaleString(undefined,{maximumSignificantDigits:3})+(key==='rngBonus'?'':'%');
 return '<section class="museum-bonus" aria-label="Museum bonus" aria-live="polite"><h4>Museum Bonus <span>'+esc(g.rarity.name)+'</span></h4>'+(families.length?'<dl>'+families.map(f=>'<div data-museum-family="'+f.style+'"><dt>'+title(f.style)+'</dt><dd>'+Object.entries(f.rarities.find(r=>r.tier===g.rarity.tier).stats).map(([key,n])=>'<span class="museum-stat"><span data-museum-stat="'+key+'">'+value(key,n)+'</span> <abbr title="'+full[key]+'">'+labels[key]+'</abbr></span>').join('')+'</dd></div>').join('')+'</dl><p class="source-note">Highest collected rarity only · Before collection caps</p>':'<p class="source-note">This equipment does not contribute to museum bonuses.</p>')+'</section>';
}
function renderGear(){
 const g=CatalogueGear.describe(D,selected,gearTiers.get(selected));$('gear-details').hidden=!g;if(!g){$('gear-details').innerHTML='';return;}
 gearTiers.set(selected,g.rarity.tier);
 const set=g.set;
 $('gear-details').innerHTML='<section class="panel gear-panel"><div class="gear-heading"><div><h3>Gear Stats</h3><p class="muted">'+esc(g.slot)+(g.flags.length?' · '+esc(g.flags.join(' · ')):'')+'</p></div><button type="button" class="gear-rarity" id="gear-rarity" aria-haspopup="dialog" aria-label="Item rarity: '+esc(g.rarity.name)+'" style="--rarity-color:'+g.rarity.color+'" '+(g.fixed?'disabled':'')+'><span>'+esc(g.rarity.name)+'</span><span class="rarity-chevron" aria-hidden="true">⌄</span></button></div>'+(g.minimum>1?'<p class="minimum-rarity">Listed sources guarantee <strong>'+esc(D.rarities[g.minimum-1].name)+' (Tier '+g.minimum+')</strong> or higher. Lower tiers are unavailable in this preview.</p>':'')+'<dl class="gear-stat-grid" aria-live="polite">'+g.stats.map(s=>'<div data-stat="'+s.key+'"><dt>'+esc(s.label)+'</dt><dd>'+statValue(s)+'</dd></div>').join('')+'</dl><p class="muted">'+(g.fixed?'This item uses fixed Common stats. ':'')+'Item stats at the selected rarity, before character bonuses and set bonuses. Rarity changes these stats, not the base source rates below.</p></section>'+(set?'<section class="panel set-panel"><h3>'+esc(set.name)+'</h3><dl class="set-bonuses">'+set.bonuses.map(b=>'<div><dt>'+b.pieces+' Pieces</dt><dd>'+esc(setBonus(b))+'</dd></div>').join('')+'</dl><p class="source-note">'+esc(set.note)+'</p><details class="set-items-box"><summary>Items in This Set ('+set.members.length+')</summary>'+set.groups.map(group=>'<h4>'+esc(group.name)+'</h4><div class="set-items">'+group.items.map(name=>'<button type="button" class="set-item" data-set-item="'+esc(name)+'" '+(name===selected?'aria-current="true"':'')+'>'+icon(name,'items',24)+'<span>'+esc(name)+'</span></button>').join('')+'</div>').join('')+'</details></section>':'');
 $('gear-details').querySelector('.gear-panel').insertAdjacentHTML('beforeend',renderMuseum(g));
}
function openRarity(){const g=CatalogueGear.describe(D,selected,gearTiers.get(selected));if(!g||g.fixed)return;$('rarity-kicker').textContent=selected;$('rarity-choices').innerHTML=D.rarities.map(r=>'<button type="button" class="rarity-choice" data-rarity-choice="'+r.tier+'" aria-pressed="'+(r.tier===g.rarity.tier)+'" style="--rarity-color:'+r.color+'" '+(r.tier<g.minimum?'disabled title="Below the guaranteed minimum for listed sources"':'')+'><span class="rarity-gem" aria-hidden="true">◆</span><span><b>'+esc(r.name)+'</b><small>Tier '+r.tier+(r.tier<g.minimum?' · Below Minimum':'')+'</small></span><span class="rarity-check" aria-hidden="true">'+(r.tier===g.rarity.tier?'✓':'')+'</span></button>').join('');$('rarity-picker').showModal();$('rarity-choices').querySelector('[aria-pressed="true"]').focus();}
function filter(){
 const terms=$('search').value.toLowerCase().trim().split(/\s+/).filter(Boolean),kind=$('kind').value,cat=$('category').value;
 matches=names.filter(n=>{const rows=groups.get(n);return(kind==='all'||rows[0].kind===kind)&&(cat==='all'||rows.some(r=>r.category===cat))&&terms.every(t=>(n+' '+rows.map(r=>[r.from,r.zone,r.skill,r.category].filter(Boolean).join(' ')).join(' ')).toLowerCase().includes(t));});
 if(!matches.includes(selected)){selected=matches[0]||'';view='sources';}
 $('match-info').textContent=matches.length+' matching '+(matches.length===1?'item / pet':'items / pets')+'. Select a name to see its sources'+(matches.some(n=>contents.has(n))?' or container contents.':'.');
 renderList();renderSources();
}
function renderList(){
 const shown=matches.slice(0,limit);if(selected&&!shown.includes(selected))shown.unshift(selected);
 $('items').innerHTML=shown.length?shown.map(n=>'<button type="button" data-item="'+esc(n)+'" aria-current="'+(n===selected)+'"><span class="item-name">'+icon(n)+'<span>'+esc(n)+'</span></span><small>'+groups.get(n).length+' sources'+(contents.has(n)?'<span class="contents-hint">Contents available</span>':'')+'</small></button>').join(''):'<p class="empty">No matches. Try a different name or clear the filters.</p>';
 $('more').hidden=matches.length<=limit;$('more').textContent='Show More ('+Math.max(0,matches.length-limit)+' remaining)';
}
function renderSources(){
 $('item-description').textContent=D.descriptions[selected]||'';
 $('item-description').hidden=!D.descriptions[selected];
 renderGear();
 const rows=groups.get(selected)||[],loot=contents.get(selected);
 if(!loot)view='sources';
 $('item-title').innerHTML=icon(selected,'items',56)+'<span>'+esc(selected||'No Matching Items')+'</span>';
 $('item-kind').textContent=rows[0]?.kind==='pet'?'PET SOURCES':loot?'CONTAINER':'ITEM SOURCES';
 $('item-summary').textContent=rows.length?view==='contents'?loot.length+' possible contents · Base rates per opening':rows.length+' sources · Base rates · All sources for this item are shown.':'Try another search. Some special source categories are not yet indexed.';
 $('item-views').hidden=!loot;
 $('item-views').innerHTML=loot?'<button type="button" class="secondary-button" data-view="sources" aria-pressed="'+(view==='sources')+'">Where to Find</button><button type="button" class="secondary-button" data-view="contents" aria-pressed="'+(view==='contents')+'">Contents ('+loot.length+')</button>':'';
 if(view==='contents'){
  $('sources').innerHTML='<section class="panel source-group chest-contents"><h3>'+icon(selected,'items',28)+'Contents of '+esc(selected)+'</h3><p class="contents-explanation">Possible rewards, not a guaranteed bundle. Each percentage is the chance of at least one of that item per opening; rewards can share rolls, so percentages do not need to sum to 100%. Select an item to see all its sources.</p>'+[...loot].sort((a,b)=>b.p-a.p||a.item.localeCompare(b.item)).map(r=>'<article class="source-row content-row" data-content-item="'+esc(r.item)+'"><h4><button type="button" class="item-link" data-ingredient="'+esc(r.item)+'">'+icon(r.item,'items',32)+'<span>'+esc(r.item)+'</span></button></h4>'+facts(r)+'</article>').join('')+'</section>';return;
 }
 $('sources').innerHTML=categories.map(cat=>{
  const list=rows.filter(r=>r.category===cat).sort((a,b)=>(a.level??Infinity)-(b.level??Infinity)||a.from.localeCompare(b.from));if(!list.length)return '';
  return '<section class="panel source-group"><h3>'+icon(cat,'categories',28)+esc(cat)+'</h3>'+list.map(r=>{
   const sourceIcon=cat==='Containers'?icon(r.from,'items',32):cat==='Production'?icon(r.item,'items',28):D.icons.sources[r.from]?icon(r.from,'sources',32):r.skill?icon(r.skill,'skills',24):'';
   const ingredients=r.input?'<div class="ingredients"><strong>Ingredients:</strong> '+Object.entries(r.input).map(([n,q])=>groups.has(n)?'<button type="button" data-ingredient="'+esc(n)+'">'+icon(n,'items',20)+'<span>'+num(q)+' × '+esc(n)+'</span></button>':'<span class="ingredient">'+icon(n,'items',20)+num(q)+' × '+esc(n)+'</span>').join(' ')+'</div>':'';
   return '<article class="source-row"><h4>'+sourceIcon+'<span>'+esc(r.from)+(r.event?'<span class="event-tag">'+esc(r.event)+' Only</span>':'')+'</span></h4><p class="source-meta">'+(r.skill?icon(r.skill,'skills',18):'')+esc([r.zone,r.skill,r.level!=null?r.levelLabel+': '+r.level:null].filter(Boolean).join(' · '))+'</p>'+facts(r)+ingredients+(cat==='Containers'?'<button type="button" class="secondary-button view-contents" data-container="'+esc(r.from)+'">View Contents<span class="sr-only"> of '+esc(r.from)+'</span></button>':'')+'</article>';
  }).join('')+'</section>';
 }).join('');
}
function navigate(name,mode='sources'){selected=name;view=mode;$('search').value=name;$('kind').value='all';$('category').value='all';limit=50;filter();$('item-title').focus({preventScroll:true});$('item-title').scrollIntoView({block:'nearest'});}
$('category').innerHTML+=[...categories].sort().map(n=>'<option>'+esc(n)+'</option>').join('');
$('coverage').textContent=num(names.length)+' items & pets · '+num(D.rows.length)+' sources';
$('search').addEventListener('input',()=>{limit=50;filter();});for(const id of ['kind','category'])$(id).onchange=()=>{limit=50;filter();};
$('items').onclick=event=>{const btn=event.target.closest('[data-item]');if(!btn)return;selected=btn.dataset.item;view='sources';renderList();renderSources();};
$('sources').onclick=event=>{const chest=event.target.closest('[data-container]');if(chest){navigate(chest.dataset.container,'contents');return;}const item=event.target.closest('[data-ingredient]');if(item)navigate(item.dataset.ingredient);};
$('item-views').onclick=event=>{const btn=event.target.closest('[data-view]');if(!btn)return;view=btn.dataset.view;renderSources();$('item-views').querySelector('[data-view="'+view+'"]').focus({preventScroll:true});};
$('gear-details').onclick=event=>{if(event.target.closest('#gear-rarity'))openRarity();const item=event.target.closest('[data-set-item]');if(item)navigate(item.dataset.setItem);};
$('rarity-choices').onclick=event=>{const btn=event.target.closest('[data-rarity-choice]');if(!btn||btn.disabled)return;gearTiers.set(selected,Number(btn.dataset.rarityChoice));$('rarity-picker').close();renderGear();$('gear-rarity').focus();};
$('rarity-close').onclick=()=>{$('rarity-picker').close();$('gear-rarity')?.focus();};
$('rarity-picker').addEventListener('cancel',()=>setTimeout(()=>$('gear-rarity')?.focus(),0));
$('more').onclick=()=>{limit+=50;renderList();};$('clear').onclick=()=>{$('search').value='';$('kind').value='all';$('category').value='all';limit=50;filter();};
filter();
})();
