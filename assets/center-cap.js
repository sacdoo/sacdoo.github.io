/* Phones/tablets: the thumbnail crossing the middle of the screen shows its project label (bottom-left),
   popping in with a CSS spring. The label stays until the next thumbnail takes over (no gap in between),
   and swings a little with the swipe. Lightweight: only on-screen cards are measured, and the only per-frame
   style write is the active label's rotation. */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const grid=document.getElementById('grid'); if(!grid) return;
  const cards=[...grid.querySelectorAll('a.card')], vis=new Set();
  const io=new IntersectionObserver(es=>{ es.forEach(e=>e.isIntersecting?vis.add(e.target):vis.delete(e.target)); kick(); });
  cards.forEach(c=>io.observe(c));
  let active=null, raf=0, lastY=scrollY, lastT=0, vel=0, rot=0, rv=0;
  function choose(){
    if(grid.classList.contains('as-list')) return null;
    const mid=innerHeight/2;
    if(active&&vis.has(active)){ const r=active.getBoundingClientRect(); if(r.top<mid&&r.bottom>mid) return active; }  // still spans the middle: keep
    let best=null, bd=1e9;
    for(const c of vis){ const r=c.getBoundingClientRect(); if(r.bottom<innerHeight*.18||r.top>innerHeight*.82) continue;
      const d=Math.abs(r.top+r.height/2-mid); if(d<bd){ best=c; bd=d; } }
    if(!best&&active&&vis.has(active)) return active;          // nothing new in the middle → keep the current label up
    return best;
  }
  // the card with the label up plays its clip (video thumbnails only).
  // iOS (esp. Low Power Mode) only lets a <video> play after it has been started once inside a touch gesture,
  // so we keep a pool of two players, "unlock" both on the first touch, then move them between cards.
  const pool=[0,1].map(()=>{ const v=document.createElement('video'); v.className='thumb-live'; v.muted=true; v.defaultMuted=true; v.loop=true;
    v.playsInline=true; v.setAttribute('muted',''); v.setAttribute('playsinline',''); v.preload='auto'; v.owner=null; return v; });
  let flip=0;
  const unlock=()=>{ pool.forEach(v=>{ if(!v.src){ const any=grid.querySelector('img.thumb[data-vsrc]'); if(any) v.src=any.dataset.vsrc; }
      const pr=v.play(); if(pr) pr.then(()=>{ if(!v.owner) v.pause(); }).catch(()=>{}); });
    if(active) play(active,true); };
  ['touchstart','touchend','click'].forEach(ev=>document.addEventListener(ev,unlock,{once:true,passive:true,capture:true}));
  function play(c,on){
    const img=c.querySelector('img.thumb[data-vsrc]'); if(!img) return;
    if(on){
      let v=pool.find(x=>x.owner===c); if(!v){ v=pool[flip]; flip^=1; if(v.owner&&v.owner!==c) v.classList.remove('on'); }
      v.owner=c; v.classList.remove('on');
      if(v.parentNode!==img.parentNode) img.parentNode.appendChild(v);
      v.style.transform=img.dataset.vzoom?`scale(${img.dataset.vzoom})`:'';
      if(!v.src.endsWith(img.dataset.vsrc.replace(/^.*\//,''))) v.src=img.dataset.vsrc;
      try{ v.currentTime=0; }catch(e){}
      const go=()=>v.play().then(()=>{ if(v.owner===c) v.classList.add('on'); }).catch(()=>{});
      v.readyState>=2?go():v.addEventListener('loadeddata',go,{once:true}); go();
    } else {
      const v=pool.find(x=>x.owner===c); if(!v) return;
      v.owner=null; v.classList.remove('on'); setTimeout(()=>{ if(!v.owner) v.pause(); },500);
    }
  }
  function setActive(c){
    if(c===active) return;
    if(active){ active.classList.remove('cap-on'); const cap=active.querySelector('.tilt-cap'); if(cap) cap.style.rotate=''; play(active,false); }
    active=c; rot=rv=0;
    if(active){ active.classList.add('cap-on'); play(active,true); }
  }
  function frame(now){
    const dt=Math.min(.033,(now-lastT)/1000||.016); lastT=now;
    const dy=scrollY-lastY; lastY=scrollY; vel+=((dy/dt)-vel)*.25;
    setActive(choose());
    if(active&&!RM){
      const t=Math.max(-4,Math.min(4,vel*.005));   // swings with the swipe direction
      rv+=(110*(t-rot)-11*rv)*dt; rot+=rv*dt;
      const cap=active.querySelector('.tilt-cap'); if(cap) cap.style.rotate=rot.toFixed(2)+'deg';
    }
    const moving=Math.abs(dy)>0||Math.abs(vel)>4||Math.abs(rot)>.05||Math.abs(rv)>.05;
    raf=moving?requestAnimationFrame(frame):0; if(!raf) vel=0;
  }
  function kick(){ if(!raf){ lastT=performance.now(); lastY=scrollY; raf=requestAnimationFrame(frame); } }
  addEventListener('scroll',kick,{passive:true});
  addEventListener('load',kick); setTimeout(kick,300);
})();
