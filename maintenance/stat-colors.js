/* Shared semantic stat colours, from the game's STAT_COLOR and pet phrase palette. */
(() => {
 if(window.RealmStatColors)return;
 const colors={atk:'#fb923c',str:'#ef4444',rng:'#4ade80',mag:'#818cf8',def:'#60a5fa',dr:'#2dd4bf',lifesteal:'#a78bfa',hp:'#4ade80',gather:'#6ee7b7',prod:'#f97316',skillxp:'#60a5fa',divinity:'#c084fc',gold:'#fbbf24',drops:'#f472b6',thieving:'#6b7280',blessing:'#c084fc',boss:'#b91c1c',walk:'#2dd4bf',vip:'#fbbf24',vipPlus:'#a78bfa'};
 const aliases={attack:'atk',strength:'str',defense:'def',defence:'def',ranged:'rng',rngBonus:'rng',magic:'mag',melee:'str',gathSpeed:'gather',skillSpeed:'gather',treasureFind:'gather',prodSpeed:'prod',skillXp:'skillxp',xp_boost:'skillxp',tool_speed:'gather',craft_speed:'prod',production_speed:'prod',dmg_reduction:'dr'};
 const phrases={
  'boss dmg':'boss','boss damage':'boss','walk time':'walk','walking time':'walk','walk reduction':'walk','walking reduction':'walk',
  'hp per combat tick':'hp','hp per tick':'hp','hp/tick':'hp','healing':'hp','regeneration':'hp','gold drops':'gold','gathering xp':'skillxp',
  'smith':'prod','craft':'prod','cook':'prod','brew':'prod','imbue':'prod',
  'mining':'gather','coal':'gather','log':'gather','logs':'gather','fish':'gather','bird nests':'gather','underwater chests':'gather','gem bags':'gather','pearl':'gather','pearls':'gather','gem':'gather','gems':'gather',
  'vip+':'vipPlus','vip':'vip',
  'production speed':'prod','processing speed':'prod','gathering speed':'gather','woodcutting speed':'gather','mining speed':'gather','fishing speed':'gather','tool speed':'gather','treasure find':'gather','treasure':'gather',
  'all skill xp':'skillxp','all xp':'skillxp','combat xp':'skillxp','skill xp':'skillxp','xp boost':'skillxp','xp':'skillxp','divinity xp':'divinity','divinity':'divinity','blessing power':'blessing',
  'damage reduction':'dr','flat ranged':'rng','flat rng':'rng','lifesteal':'lifesteal','max hp':'hp','hitpoints':'hp','hp':'hp','drop rate':'drops','drop rates':'drops','gold':'gold','thieving success':'thieving',
  'attack':'atk','atk':'atk','strength':'str','str':'str','defense':'def','defence':'def','def':'def','ranged':'rng','rng':'rng','magic':'mag','mag':'mag','melee':'str','dr':'dr','ls':'lifesteal'
 };
 const terms=Object.keys(phrases).sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');
 const pattern=new RegExp('(?<![\\w])(?:[+−×-]?\\d[\\d,.]*(?:%|×)?\\s+)?('+terms+')(?:\\s+[+−×-]\\d[\\d,.]*%?)?(?![\\w])','gi');
 const style=document.createElement('style');style.id='realm-stat-colors';
 style.textContent=Object.entries(colors).map(([key,color])=>`:root{--stat-${key}:${color}}[data-realm-stat="${key}"]{color:var(--stat-${key})!important}[data-realm-stat="${key}"] :is(dt,dd,b,span){color:var(--stat-${key})!important}`).join('');
 document.head.append(style);
 const skip='script,style,textarea,input,select,option,svg,canvas,code,pre,[contenteditable],.realm-stat-text,[data-realm-stat],.gear-name,.skilling-gear-name,.rarity-choice,.gear-rarity,.rarity-text,.item-name,.gear-choice b,.pick-item b,.museum-piece b,.inventory-item-name b,.pet-copy b,h1';
 const chrome='h1,h2,h3,h4,h5,h6,nav,header,footer,a,summary,legend,.brand,.eyebrow,.realm-spotlight-option,.slot-label,.skill-title,.section-heading';
 const descriptions='p,small,dt,dd,td,.gear-stats,.combat-gear-stats,.skilling-item-stats,.museum-item-bonuses,[data-stat-description]';
 const bonusDescriptions='.pet-copy small,.gear-stats,.combat-gear-stats,.skilling-item-stats,.museum-item-bonuses,.pick-item small,.gear-choice small,[data-stat-description]';
 function decorate(root){
  if(!root?.isConnected)return;
  if(root.nodeType===1){
   for(const el of [root,...root.querySelectorAll('[data-stat],[data-museum-stat]')]){
    const raw=el.dataset?.stat||el.dataset?.museumStat,key=aliases[raw]||raw;
    if(colors[key]&&!el.closest(chrome)&&!el.matches('button,input,select,option,label'))el.setAttribute('data-realm-stat',key);
   }
   for(const label of root.querySelectorAll('dt,td:first-child')){
    const key=phrases[label.textContent.trim().toLowerCase().replace(/\s*\(%\)$/,'')];
    if(key&&!label.closest(chrome)&&(!label.matches('td')||label.parentElement.children.length===2))label.parentElement.setAttribute('data-realm-stat',key);
   }
  }
  const nodes=[];
  if(root.nodeType===3)nodes.push(root);
  else{const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(walker.nextNode())nodes.push(walker.currentNode);}
  for(const node of nodes){
   if(!node.parentElement||node.parentElement.closest(skip)||node.parentElement.closest(chrome)||!node.parentElement.closest(descriptions))continue;
   const text=node.nodeValue;pattern.lastIndex=0;
   const explicitBonus=!!node.parentElement.closest(bonusDescriptions);
   const matches=[...text.matchAll(pattern)].filter(match=>explicitBonus||/\d/.test(match[0]));if(!matches.length)continue;
   const fragment=document.createDocumentFragment();let offset=0;
   for(const match of matches){fragment.append(text.slice(offset,match.index));const span=document.createElement('span');span.className='realm-stat-text';span.dataset.realmStat=phrases[match[1].toLowerCase()];span.textContent=match[0];fragment.append(span);offset=match.index+match[0].length;}
   fragment.append(text.slice(offset));node.replaceWith(fragment);
  }
 }
 const pending=new Set();let scheduled=false;
 const observer=new MutationObserver(records=>{
  for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1||node.nodeType===3)pending.add(node);
  if(scheduled||!pending.size)return;scheduled=true;
  requestAnimationFrame(()=>{scheduled=false;observer.disconnect();for(const node of pending)decorate(node);pending.clear();observe();});
 });
 function observe(){observer.observe(document.body,{subtree:true,childList:true});}
 window.RealmStatColors={colors,phrases,decorate};decorate(document.body);observe();
})();
