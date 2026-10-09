/* Reuse the bounded compression transport, with a distinct Character Profile format. */
(function(root){
  'use strict';
  const transport=typeof module!=='undefined'?require('../combat_simulator/setup-codec.js'):root.SetupCodec;
  const model=typeof module!=='undefined'?require('./model.js'):root.CharacterProfile;
  async function encode(profile){
    const text=JSON.stringify(JSON.parse(model.encode(profile)));
    return (await transport.encode(text)).replace(/^RICL1/,'RICP1');
  }
  async function decode(code){
    if(typeof code!=='string'||code.length>2666767)throw Error('Profile code is too large or invalid.');
    const clean=code.replace(/\s/g,'');
    if(/^RICL/.test(clean))throw Error('This is a Combat Simulator code. Paste a Character Profile code from this page instead.');
    if(!/^RICP1[GJ]\./.test(clean))throw Error('Invalid profile code. Copy the complete Character Profile code and try again.');
    return model.decode(await transport.decode(clean.replace(/^RICP1/,'RICL1')));
  }
  const api={encode,decode};
  if(typeof module!=='undefined')module.exports=api;else root.ProfileSetupCodec=api;
})(globalThis);
