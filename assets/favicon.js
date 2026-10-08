/* Animated favicon: the green sac symbol (same Lottie + same speed as the cursor) is rendered
   off-screen and copied into the tab icon ~12 times a second. Falls back to the static favicon.svg. */
(function(){
  const link=document.getElementById('favicon');
  if(!link||!window.lottie||!window.SAC_SYMBOL) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const host=document.createElement('div');
  host.style.cssText='position:fixed;left:-200px;top:0;width:64px;height:64px;pointer-events:none;opacity:0';
  host.setAttribute('aria-hidden','true'); document.body.appendChild(host);
  const anim=lottie.loadAnimation({container:host,renderer:'svg',loop:true,autoplay:true,animationData:window.SAC_SYMBOL});
  anim.setSpeed(4.5);                                   // same as the cursor
  const cv=document.createElement('canvas'); cv.width=cv.height=64; const ctx=cv.getContext('2d');
  const img=new Image(); let busy=false;
  img.onload=()=>{ ctx.clearRect(0,0,64,64); ctx.drawImage(img,-8,-8,80,80); try{ link.type='image/png'; link.href=cv.toDataURL('image/png'); }catch(e){} busy=false; };
  img.onerror=()=>{ busy=false; };
  function tick(){
    if(busy) return; const svg=host.querySelector('svg'); if(!svg) return;
    busy=true;
    const c=svg.cloneNode(true); c.setAttribute('width','64'); c.setAttribute('height','64'); c.removeAttribute('style');
    if(!c.getAttribute('xmlns')) c.setAttribute('xmlns','http://www.w3.org/2000/svg');
    const s=new XMLSerializer().serializeToString(c);
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
  }
  setInterval(tick,83);
})();
