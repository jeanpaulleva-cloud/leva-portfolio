/* Soft password gate for drleva.com (client-side, "for now").
   NOTE: this blocks the served page only — it is not real security; the repo is
   public so the page source is still readable. For true privacy, move behind
   server-side auth (Vercel middleware / Cloudflare Access). */
(function(){
  var KEY='drleva_unlock', PASS='cmVkZnJlZA=='; // base64('redfred')
  function reveal(){ var h=document.getElementById('gate-hide'); if(h) h.remove(); }
  try{ if(localStorage.getItem(KEY)==='1'){ reveal(); return; } }catch(e){}

  // Hide the page until unlocked (added early so there is no content flash).
  var hide=document.createElement('style');
  hide.id='gate-hide'; hide.textContent='body{visibility:hidden!important}';
  (document.head||document.documentElement).appendChild(hide);

  function build(){
    if(document.getElementById('gate-ov')) return;
    var s=document.createElement('style');
    s.textContent=
      '#gate-ov{position:fixed;inset:0;z-index:2147483647;background:#08080a;display:flex;align-items:center;justify-content:center;font-family:Outfit,-apple-system,sans-serif;color:#f3f3ef}'+
      '#gate-ov .gw{width:min(380px,88vw);text-align:center}'+
      '#gate-ov .gk{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#36e3b0;margin-bottom:22px}'+
      '#gate-ov h2{font-family:Newsreader,Georgia,serif;font-weight:400;font-size:34px;letter-spacing:-.02em;margin:0 0 10px}'+
      '#gate-ov p{font-size:14px;color:#a0a0ac;margin:0 0 26px;font-weight:300;line-height:1.5}'+
      '#gate-ov form{display:flex;gap:8px}'+
      '#gate-ov input{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:13px 15px;color:#f3f3ef;font-family:inherit;font-size:15px;outline:none}'+
      '#gate-ov input:focus{border-color:#36e3b0}'+
      '#gate-ov button{background:#36e3b0;color:#08080a;border:none;border-radius:10px;padding:0 18px;font-family:"JetBrains Mono",monospace;font-size:13px;letter-spacing:1px;text-transform:uppercase;cursor:pointer}'+
      '#gate-ov .ge{color:#ff6b6b;font-size:12px;margin-top:12px;min-height:14px;font-family:"JetBrains Mono",monospace}'+
      '#gate-ov.shake{animation:gshake .4s}@keyframes gshake{0%,100%{transform:none}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}';
    document.head.appendChild(s);
    var ov=document.createElement('div'); ov.id='gate-ov';
    ov.innerHTML='<div class="gw"><div class="gk">Private</div><h2>drleva.com</h2>'+
      '<p>This page is private for now. Enter the password to continue.</p>'+
      '<form id="gate-f"><input id="gate-i" type="password" autocomplete="off" placeholder="Password" aria-label="Password"><button type="submit">Enter</button></form>'+
      '<div class="ge" id="gate-e"></div></div>';
    document.documentElement.appendChild(ov);
    var f=document.getElementById('gate-f'), i=document.getElementById('gate-i'), e=document.getElementById('gate-e');
    try{ i.focus(); }catch(x){}
    f.addEventListener('submit',function(ev){
      ev.preventDefault();
      var v=i.value||'', ok=false;
      try{ ok=(btoa(v)===PASS); }catch(x){ ok=(v==='redfred'); }
      if(ok){ try{localStorage.setItem(KEY,'1');}catch(x){} ov.parentNode&&ov.parentNode.removeChild(ov); reveal(); }
      else { e.textContent='Incorrect password.'; ov.classList.remove('shake'); void ov.offsetWidth; ov.classList.add('shake'); i.select(); }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',build); else build();
})();
