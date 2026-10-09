/* Exact-URL window connection: no shared file-origin storage assumption. */
(() => {
 'use strict';
 let current=null;
 function create(url,onChange){
  url=new URL(url);url.searchParams.set('character',(window.CharacterProfile?.characterId||'default'));
  let frame=null,popup=null,port=null,sequence=0,cancelConnection=null,ready=null;const pending=new Map();
  function close(){ready=null;cancelConnection?.();cancelConnection=null;port?.close();port=null;frame?.remove();frame=null;if(popup&&!popup.closed)popup.close();popup=null;for(const p of pending.values()){clearTimeout(p.timer);p.reject(Error('Profile connection closed.'));}pending.clear();}
  function openConnection(usePopup=false){
   close();const token=crypto.randomUUID(),name='realm-profile-link:'+token;
   if(usePopup){popup=window.open(url.href,name,'popup,width=540,height=250');if(!popup)return Promise.reject(Error('Allow the Character Profile connection window, then click Connect Character Profile again.'));}
   else{frame=document.createElement('iframe');frame.name=name;frame.hidden=true;frame.title='Character profile connection';frame.src=url.href;}
   return new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>{removeEventListener('message',endpointReady);cancelConnection=null;close();reject(Error('Automatic connection is unavailable. Click Connect Character Profile to use a small connection window.'));},6000);
    cancelConnection=()=>{clearTimeout(timer);removeEventListener('message',endpointReady);reject(Error('Profile connection was restarted.'));};
    let opened=false;
    function handshake(){
     if(opened)return;opened=true;const channel=new MessageChannel();port=channel.port1;
     port.onmessage=event=>{const msg=event.data;if(msg?.ready){clearTimeout(timer);cancelConnection=null;removeEventListener('message',endpointReady);resolve();return;}if(msg?.changed){onChange(msg);return;}const task=pending.get(msg?.id);if(!task)return;clearTimeout(task.timer);pending.delete(msg.id);msg.error?task.reject(Error(msg.error)):task.resolve(msg.raw);};port.start();
     (popup||frame.contentWindow).postMessage({kind:'realm-profile-connect',token},url.protocol==='file:'?'*':url.origin,[channel.port2]);
    }
    function endpointReady(event){if(event.source!==(popup||frame?.contentWindow)||event.origin!==(url.protocol==='file:'?'null':url.origin)||event.data?.kind!=='realm-profile-endpoint-ready'||event.data.token!==token)return;handshake();}
    addEventListener('message',endpointReady);
    if(frame){frame.addEventListener('load',handshake,{once:true});document.body.append(frame);}
   });
  }
  function request(op,extra={}){if(!port)return Promise.reject(Error('Connect Character Profile first.'));const id=String(++sequence);return new Promise((resolve,reject)=>{const timer=setTimeout(()=>{pending.delete(id);reject(Error('Profile connection timed out. Reconnect and try again.'));},5000);pending.set(id,{resolve,reject,timer});port.postMessage({id,op,...extra});});}
  function connect(usePopup=false){ready=openConnection(usePopup);return ready;}
  const api={connect,ensureConnected:(popup=false)=>popup&&!port?connect(true):ready||connect(),read:()=>request('read'),list:()=>request('list').then(JSON.parse),write:(expected,profile)=>request('write',{expected,profile}),close};
  current=api;return api;
 }
 window.PreviewStorageLink={create,current:()=>current};
})();
