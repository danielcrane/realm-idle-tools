(() => {
  'use strict';
  const M=PublicWeather,$=id=>document.getElementById(id),WEEK=7*86400000;
  const CACHE_KEY='realm-public-weather-static-v1';
  let snapshot=null,busy=false,boundaryTimer;
  const date=t=>new Intl.DateTimeFormat('en-GB',{timeZone:'UTC',day:'numeric',month:'short',year:'numeric'}).format(t);
  const period=row=>date(row.start)+' – '+date(row.end);
  const icon=id=>'<img src="assets/weather/'+id+'.png" width="42" height="42" alt="">';
  const label=id=>'<span class="weather-label">'+icon(id)+'<strong>'+M.weather[id].name+'</strong></span>';
  function validate(S){
    if(!S||!Number.isFinite(S.asOf)||S.validUntil!==S.current?.end||!Array.isArray(S.history)||S.history.length!==3)throw Error('Invalid weather data');
    const start=S.current.start;
    if(!Number.isFinite(start)||start%WEEK!==0||S.asOf<start||S.asOf>=start+WEEK)throw Error('Invalid weather period');
    for(const [i,row]of [S.current,...S.history].entries()){
      if(row.start!==start-i*WEEK||row.end!==row.start+WEEK||!Object.hasOwn(M.weather,row.weather)||!Object.hasOwn(M.seasons,row.season))throw Error('Invalid weather history');
    }
    const next=S.upcoming;
    if(!next||next.start!==start+WEEK||next.end!==start+2*WEEK||!Object.hasOwn(M.seasons,next.season)||!Array.isArray(next.options)||!next.options.length)throw Error('Invalid upcoming options');
    if(Object.hasOwn(next,'weather'))throw Error('Unexpected weather result');
    const ids=new Set();let sum=0;
    for(const row of next.options){
      if(!Object.hasOwn(M.weather,row.id)||ids.has(row.id)||!Number.isFinite(row.chance)||row.chance<=0||row.chance>1||typeof row.seasonal!=='boolean')throw Error('Invalid weather chance');
      ids.add(row.id);sum+=row.chance;
    }
    if(Math.abs(sum-1)>1e-8)throw Error('Invalid weather total');
    return S;
  }
  const fresh=S=>!!S&&Date.now()>=S.current.start&&Date.now()<S.validUntil;
  function readCache(){
    try{
      const cached=validate(JSON.parse(localStorage.getItem(CACHE_KEY)));
      if(fresh(cached))return cached;
      localStorage.removeItem(CACHE_KEY);
    }catch{}
    return null;
  }
  function scheduleExpiry(){
    clearTimeout(boundaryTimer);
    if(fresh(snapshot))boundaryTimer=setTimeout(refresh,snapshot.validUntil-Date.now()+50);
  }
  function render(){
    const S=snapshot,isFresh=fresh(S);
    for(const id of ['options','odds-help','unavailable','upcoming-period','next-season'])$(id).hidden=!isFresh;
    $('stale').hidden=isFresh;$('retry-weather').hidden=isFresh;
    if(!S){$('current').textContent='Weather is unavailable.';$('history').replaceChildren();return;}
    $('freshness').textContent='Updated '+date(S.asOf)+'. Weather changes Thursday at 00:00 UTC.';
    $('upcoming-period').textContent=period(S.upcoming)+' · 00:00 UTC';
    const season=M.seasons[S.upcoming.season];
    $('next-season').innerHTML=icon(S.upcoming.season)+'<span><strong>'+season.name+'</strong><br>'+season.bonus+'</span>';
    $('current-title').textContent=isFresh?'Current Weather':'Latest Recorded Week';
    $('history-title').textContent=isFresh?'Past Three Weeks':'Three Weeks Before the Last Update';
    $('current').innerHTML='<div class="current-weather">'+label(S.current.weather)+'<span>'+M.seasons[S.current.season].name+' · '+period(S.current)+'</span></div><p class="muted">'+M.weather[S.current.weather].bonus+'</p>';
    $('options').innerHTML=S.upcoming.options.map(row=>'<article class="weather-option">'+label(row.id)+'<p class="chance">'+new Intl.NumberFormat('en-GB',{style:'percent',maximumFractionDigits:1}).format(row.chance)+'</p><p class="muted">'+M.weather[row.id].bonus+'</p><span class="tag">'+(row.seasonal?'Seasonal · Double Weight':'Standard Weight')+'</span></article>').join('');
    const recent=[S.current,...S.history.slice(0,2)].map(row=>row.weather);
    $('unavailable').textContent='Recent weather excluded from next week: '+recent.map(id=>M.weather[id].name).join(', ')+'. Snow is available only in Winter; Heatwave only in Summer. Percentages are rounded.';
    $('history').innerHTML=S.history.map(row=>'<tr><td>'+period(row)+'</td><td>'+M.seasons[row.season].name+'</td><td>'+label(row.weather)+'</td><td>'+M.weather[row.weather].bonus+'</td></tr>').join('');
  }
  async function refresh(){
    if(!fresh(snapshot))snapshot=readCache()||snapshot;
    render();
    if(fresh(snapshot)){scheduleExpiry();return;}
    if(busy)return;busy=true;$('retry-weather').disabled=true;
    try{
      const next=validate(await PublicWeatherData.load(Date.now()));
      if(!fresh(next))throw Error('Expired weather data');
      snapshot=next;
      try{localStorage.setItem(CACHE_KEY,JSON.stringify(snapshot));}catch{}
      render();scheduleExpiry();
    }catch{
      render();if(!snapshot)$('freshness').textContent='Unable to load weather. Please try again.';
    }finally{busy=false;$('retry-weather').disabled=false;}
  }
  $('retry-weather').addEventListener('click',refresh);
  refresh();setInterval(()=>{if(!document.hidden)refresh();},60000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
})();
