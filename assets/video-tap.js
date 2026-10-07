/* Phones/tablets: tap a video → it opens full screen with sound.
   Swiping / scrolling (or tapping ×) closes it and the inline video carries on muted. */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) return;     // touch devices only
  const pick=t=>{ const v=t.closest&&t.closest('video'); if(!v) return null;
    return (v.id==='reelVideo'||v.closest('#project'))?v:null; };          // showreel + case-page videos
  let ov=null, fv=null, src=null, sy=0, sx=0, closing=false, openY=0, openT=0;
  function open(v){
    if(ov) return; src=v; closing=false; openY=scrollY; openT=performance.now();
    ov=document.createElement('div'); ov.className='vfull';
    ov.innerHTML='<button type="button" class="vfull-x" aria-label="Close">×</button><p class="vfull-hint">Swipe to close</p>';
    fv=document.createElement('video');
    fv.src=v.currentSrc||v.src; fv.playsInline=true; fv.loop=true; fv.muted=false; fv.preload='auto';
    try{ fv.currentTime=v.currentTime||0; }catch(e){}
    ov.prepend(fv); document.body.appendChild(ov);
    document.documentElement.classList.add('vfull-open');
    fv.play().catch(()=>{ fv.muted=true; fv.play().catch(()=>{}); });  // sound needs the tap gesture; fall back muted
    requestAnimationFrame(()=>ov.classList.add('on'));
    ov.querySelector('.vfull-x').addEventListener('click',close);
    ov.addEventListener('touchstart',e=>{ sy=e.touches[0].clientY; sx=e.touches[0].clientX; },{passive:true});
    ov.addEventListener('touchmove',e=>{ const t=e.touches[0];
      if(Math.abs(t.clientY-sy)>36||Math.abs(t.clientX-sx)>60) close(); },{passive:true});
    ov.addEventListener('wheel',close,{passive:true});
  }
  function close(){
    if(!ov||closing) return; closing=true;
    try{ if(src&&fv) src.currentTime=fv.currentTime; }catch(e){}
    fv.pause(); ov.classList.remove('on');
    document.documentElement.classList.remove('vfull-open');
    const o=ov; ov=null; fv=null; setTimeout(()=>o.remove(),320);
  }
  document.addEventListener('click',e=>{ const v=pick(e.target); if(v){ e.preventDefault(); open(v); } },true);
  addEventListener('scroll',()=>{ if(ov&&performance.now()-openT>400&&Math.abs(scrollY-openY)>30) close(); },{passive:true});
})();
