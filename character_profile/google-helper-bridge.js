/* Browser handoff for the optional Windows localhost helper. */
(function(root){
  'use strict';
  const HELPER='http://localhost:8767';
  function request(){
    const nonce=Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
    const popup=window.open('about:blank','realm-import-'+nonce,'popup,width=650,height=660');
    if(!popup)return Promise.reject(Error('Allow pop-ups for this page, then try Import from Google again.'));
    popup.document.title='Starting Realm Idle Import';
    popup.document.body.textContent='Starting the Realm Idle helper. Allow your browser to open it if prompted. Google sign-in will open here shortly.';
    return new Promise((resolve,reject)=>{
      let completed=false,ready=false,attempt=0;
      const finish=(error,result)=>{
        if(completed)return;completed=true;clearTimeout(timeout);clearInterval(navigate);clearInterval(closed);window.removeEventListener('message',receive);launcher.remove();
        if(error)reject(error);else resolve(result);
      };
      function receive(event){
        const data=event.data;
        if(event.origin!==HELPER||event.source!==popup||data?.request!==nonce)return;
        if(data.kind==='realm-import-ready'){
          ready=true;clearInterval(navigate);
          popup.postMessage({kind:'realm-import-connect',request:nonce,page:location.pathname},HELPER);
        }else if(data.kind==='realm-import-save'){
          if(typeof data.text!=='string'||data.text.length>2e6)return finish(Error('The helper returned an invalid or oversized save.'));
          finish(null,{text:data.text,timestamp:typeof data.timestamp==='number'&&Number.isFinite(data.timestamp)?data.timestamp:null});
        }else if(data.kind==='realm-import-error')finish(Error(typeof data.message==='string'?data.message.slice(0,1000):'The local import failed.'));
      }
      window.addEventListener('message',receive);
      const launcher=document.createElement('iframe');launcher.hidden=true;launcher.src='realm-idle-import://start';document.body.appendChild(launcher);
      // Navigate in the same browser as the public page to preserve window.opener.
      // Keep retrying while the user responds to the browser's launch prompt.
      const navigate=setInterval(()=>{if(!ready&&!popup.closed)popup.location.href=HELPER+'/import?attempt='+(++attempt)+'#request='+nonce;},3000);
      const closed=setInterval(()=>{if(popup.closed)finish(Error('The helper window was closed. Your profile has not changed.'));},500);
      const timeout=setTimeout(()=>finish(Error('The helper did not complete the import. Check that the Windows helper is registered, allow the launch prompt, and try again.')),180000);
    });
  }
  root.GoogleHelperBridge={request};
})(globalThis);
