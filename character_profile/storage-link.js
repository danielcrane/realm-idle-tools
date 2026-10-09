/* Runs only when this exact profile URL is opened as a preview storage endpoint. */
(() => {
 'use strict';
 const prefix='realm-profile-link:',peer=parent!==window?parent:opener;
 if(!peer||!window.name.startsWith(prefix))return;
 const token=window.name.slice(prefix.length);if(!/^[a-zA-Z0-9-]{32,64}$/.test(token))return;
 window.ProfileStorageLink={active:true};
 if(parent===window)document.body.innerHTML='<main><h1>Character Profile Connected</h1><p>This window lets the combat preview access your saved profile. Keep it open while using the preview. Your profile changes only when you explicitly save an update.</p></main>';
 const M=CharacterProfile;let connected=false;
 addEventListener('message',event=>{
  const msg=event.data;
  const allowedOrigin=location.protocol==='file:'?event.origin==='null':event.origin===location.origin;
  if(connected||!allowedOrigin||event.source!==peer||msg?.kind!=='realm-profile-connect'||msg.token!==token||!event.ports[0])return;
  connected=true;const port=event.ports[0];let previous;
  let checkedRaw,hasChecked=false;
  const read=()=>{const raw=localStorage.getItem(M.STORAGE_KEY);if(!hasChecked||raw!==checkedRaw){if(raw!==null)M.validate(JSON.parse(raw));checkedRaw=raw;hasChecked=true;}return raw;};
  port.onmessage=e=>{
   const request=e.data;if(!request||typeof request.id!=='string')return;
   try{
    if(request.op==='list'){port.postMessage({id:request.id,raw:JSON.stringify(M.listCharacters(localStorage))});return;}
    let raw=read();
    if(request.op==='write'){
     if(raw===null||raw!==request.expected)throw Error('The profile changed during this update. Reconnect and try saving again.');
     const next=M.validate(request.profile),text=JSON.stringify(next);if(text.length>2e6)throw Error('Profile is too large.');
     localStorage.setItem(M.STORAGE_KEY+'-before-preview-edit',M.encode(JSON.parse(raw)));
     localStorage.setItem(M.STORAGE_KEY,text);raw=text;
    }else if(request.op!=='read')throw Error('Unsupported profile operation.');
    previous=raw;port.postMessage({id:request.id,raw});
   }catch(error){port.postMessage({id:request.id,error:error.message});}
  };
  port.start();port.postMessage({ready:true});
  const timer=setInterval(()=>{try{const raw=read();if(raw!==previous){previous=raw;port.postMessage({changed:true,raw});}}catch(error){port.postMessage({changed:true,error:error.message});}},1000);
  addEventListener('pagehide',()=>{clearInterval(timer);port.close();},{once:true});
 });
 peer.postMessage({kind:'realm-profile-endpoint-ready',token},location.protocol==='file:'?'*':location.origin);
})();
