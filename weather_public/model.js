(function(root){
  'use strict';
  const weather={
    sunny:{name:'Sunny',bonus:'+8% Melee Damage · +6% Gold'},
    rain:{name:'Rain',bonus:'+8% Magic Damage · +6% Gathering Speed'},
    cloudy:{name:'Cloudy',bonus:'+8% Ranged Damage · +6% Production Speed'},
    foggy:{name:'Fog',bonus:'+8% Ranged Damage · +6% Thieving Success'},
    thunder:{name:'Thunderstorm',bonus:'+8% Magic Damage · +6% Divinity XP'},
    galewinds:{name:'Gale Winds',bonus:'+8% Melee Damage · +6% Gathering Speed'},
    snow:{name:'Snow',bonus:'+8% All Combat Damage · +6% Production Speed'},
    heatwave:{name:'Heatwave',bonus:'+8% All Combat Damage · +5% Double Monster Drops'}
  };
  const seasons={winter:{name:'Winter',bonus:'+5% Production Speed'},spring:{name:'Spring',bonus:'+5% Gathering Speed'},summer:{name:'Summer',bonus:'+5% Double Monster Drops'},fall:{name:'Fall',bonus:'+5% All XP'}};
  const model={weather,seasons};
  if(typeof module==='object')module.exports=model;
  else root.PublicWeather=model;
})(globalThis);
