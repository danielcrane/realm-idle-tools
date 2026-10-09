(function(root){
'use strict';
const MAX_BYTES=2000000;
async function readLimited(stream){
 const reader=stream.getReader(),chunks=[];let size=0;
 try{while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>MAX_BYTES){await reader.cancel();throw Error('Setup is too large.');}chunks.push(value);}}finally{reader.releaseLock();}
 const result=new Uint8Array(size);let offset=0;for(const chunk of chunks){result.set(chunk,offset);offset+=chunk.length;}return result;
}
async function encode(text){
 let bytes=new TextEncoder().encode(text);if(bytes.length>MAX_BYTES)throw Error('Setup is too large.');
 const compressed=typeof CompressionStream==='function';
 if(compressed)bytes=await readLimited(new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip')));
 let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
 return 'RICL1'+(compressed?'G':'J')+'.'+btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
async function decode(code){
 if(code.length>Math.ceil(MAX_BYTES*4/3)+100)throw Error('Share code is too large.');
 const match=/^RICL1([GJ])\.([A-Za-z0-9_-]+)$/.exec(code.replace(/\s/g,''));
 if(!match)throw Error('Invalid share code. Copy the complete code and try again.');
 try{
  let base64=match[2].replace(/-/g,'+').replace(/_/g,'/');base64=base64.padEnd(Math.ceil(base64.length/4)*4,'=');
  let bytes=Uint8Array.from(atob(base64),c=>c.charCodeAt(0));
  if(match[1]==='G'){
   if(typeof DecompressionStream!=='function')throw Error('This browser cannot open compressed codes. Use a JSON file instead.');
   bytes=await readLimited(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')));
  }
  if(bytes.length>MAX_BYTES)throw Error('Setup is too large.');
  return new TextDecoder('utf-8',{fatal:true}).decode(bytes);
 }catch(err){if(/too large|This browser/.test(err.message))throw err;throw Error('Invalid or damaged share code. Copy the complete code and try again.');}
}
const API={encode,decode};if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.SetupCodec=API;
})(globalThis);
