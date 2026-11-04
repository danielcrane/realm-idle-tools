(() => {
  'use strict';
  const M=PublicWeather,$=id=>document.getElementById(id),WEEK=7*86400000;
  const CACHE_KEY='realm-public-weather-static-v1';
  let snapshot=null,busy=false,boundaryTimer;
  const date=t=>new Intl.DateTimeFormat('en-GB',{timeZone:'UTC',day:'numeric',month:'short',year:'numeric'}).format(t);
  const period=row=>date(row.start)+' – '+date(row.end);
  const icon=id=>'<img src="assets/weather/'+id+'.png" width="42" height="42" alt="">';
  const shortDate=t=>new Intl.DateTimeFormat('en-GB',{timeZone:'UTC',day:'numeric',month:'short'}).format(t);
  const bonusLines=id=>M.weather[id].bonus.split(' · ').map(bonus=>'<span class="bonus-line">'+bonus+'</span>').join('');
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
    if(!S){$('current').textContent='Weather is unavailable.';return;}
    $('freshness').textContent='Updated '+date(S.asOf)+'. Weather changes Thursday at 00:00 UTC.';
    $('upcoming-period').textContent=period(S.upcoming)+' · 00:00 UTC';
    const season=M.seasons[S.upcoming.season];
    $('next-season').innerHTML='<span class="pip-icon">'+icon(S.upcoming.season)+'</span><strong>'+season.name+'</strong><p class="pip-bonuses">'+season.bonus+'</p>';
    $('current-title').textContent=isFresh?'Recent Weather':'Latest Recorded Weeks';
    $('current').innerHTML=[S.current,...S.history.slice(0,2)].map((row,i)=>'<article class="weather-pip'+(i===0?' is-current':'')+'"><h3>'+(isFresh?['Current Week','Last Week','Two Weeks Ago'][i]:['Latest Week','One Week Earlier','Two Weeks Earlier'][i])+'</h3><span class="pip-icon">'+icon(row.weather)+'</span><strong>'+M.weather[row.weather].name+'</strong><p class="pip-period">'+shortDate(row.start)+' – '+shortDate(row.end)+'</p><p class="pip-bonuses">'+bonusLines(row.weather)+'</p></article>').join('');
    $('options').innerHTML=S.upcoming.options.map(row=>'<article class="weather-pip weather-option"><p class="pip-chance" aria-label="'+new Intl.NumberFormat('en-GB',{style:'percent',maximumFractionDigits:1}).format(row.chance)+' chance">'+new Intl.NumberFormat('en-GB',{style:'percent',maximumFractionDigits:1}).format(row.chance)+'</p><span class="pip-icon">'+icon(row.id)+'</span><strong>'+M.weather[row.id].name+'</strong><p class="pip-bonuses">'+bonusLines(row.id)+'</p>'+(row.seasonal?'<span class="tag">Seasonal · Double Weight</span>':'')+'</article>').join('');
    const recent=[S.current,...S.history.slice(0,2)].map(row=>row.weather);
    $('unavailable').textContent='Recent weather excluded from next week: '+recent.map(id=>M.weather[id].name).join(', ')+'. Snow is available only in Winter; Heatwave only in Summer. Percentages are rounded.';
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
