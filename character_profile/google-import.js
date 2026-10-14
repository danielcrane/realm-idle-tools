/* Optional read-only Google import for the unlinked test edition. */
(function(root){
  'use strict';
  const config={apiKey:'AIzaSyCDx01s_hceIRxiqZ5szfxHICct80mFDxM',authDomain:'realmidle-1648f.firebaseapp.com',databaseURL:'https://realmidle-1648f-default-rtdb.firebaseio.com',projectId:'realmidle-1648f',appId:'1:15457388392:web:32a68855e6d7ac2bcff8dd'};
  function init({canEdit,preview,report}){
    const button=document.getElementById('import-google');
    const status=document.getElementById('google-import-status');
    let busy=false;
    button.addEventListener('click',async()=>{
      if(busy||!canEdit())return;
      busy=true;button.disabled=true;status.textContent='Choose your Google account in the sign-in window…';
      let app,auth;
      const controller=new AbortController();
      let timer;
      try{
        if(!root.firebase)throw Error('Google sign-in could not load. Check your internet connection and reload this page.');
        app=firebase.initializeApp(config,'realm-profile-google-import');auth=app.auth();
        await auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
        const provider=new firebase.auth.GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});
        const {user}=await auth.signInWithPopup(provider);
        status.textContent='Reading the latest cloud save for '+(user.email||'your account')+'…';
        timer=setTimeout(()=>controller.abort(),30000);
        const token=await user.getIdToken();
        const url=new URL('saves/'+encodeURIComponent(user.uid)+'.json',config.databaseURL+'/');url.searchParams.set('auth',token);
        const response=await fetch(url,{method:'GET',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:controller.signal});
        if(!response.ok)throw Error(response.status===401||response.status===403?'Firebase denied access to your cloud save. The game’s access rules must allow your account to read it.':'Cloud save request failed (HTTP '+response.status+').');
        const save=await response.json();
        if(save===null)throw Error('No cloud save was found. Choose the Google account used in the game and ensure the game has synced.');
        if(!save||typeof save!=='object'||Array.isArray(save)||!save.game)throw Error('The cloud save has an unsupported structure.');
        if(save.userId&&save.userId!==user.uid)throw Error('The cloud save belongs to a different account.');
        const text=JSON.stringify(save.game);if(text.length>2e6)throw Error('Game saves must be smaller than 2 MB.');
        preview(text,save.timestamp);
        status.textContent='Cloud save ready for review. Select sections and confirm the import. Game data has not been changed.';
      }catch(error){
        const messages={
          'auth/unauthorized-domain':'Google sign-in is not authorized for '+location.hostname+'. The game’s Firebase project owner must add this domain under Authentication → Settings → Authorized domains.',
          'auth/popup-blocked':'Allow pop-ups for this page, then try Import from Google again.',
          'auth/popup-closed-by-user':'Google sign-in was cancelled. Your profile has not changed.',
          'auth/network-request-failed':'Google sign-in could not connect. Check your internet connection and try again.'
        };
        status.textContent=messages[error.code]||(error.name==='AbortError'?'The cloud request timed out. Please try again.':error.message);
        report(status.textContent+' Your profile has not changed.',true);
      }finally{
        clearTimeout(timer);
        if(auth)try{await auth.signOut();}catch{}
        if(app)try{await app.delete();}catch{}
        busy=false;button.disabled=false;
      }
    });
  }
  root.GoogleSaveImport={init};
})(globalThis);
