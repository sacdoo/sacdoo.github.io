/* Phones/tablets: scroll-linked 3D stack for the Work thumbnails.
   The card in the middle of the screen (the "selected" one) stays flat and on top. The others tilt
   strongly away from it and are pulled toward it, so they pile up tightly above and below, like cards
   on a drum (bottom cards lean their lower edge toward you, top cards their upper edge). */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const grid=document.getElementById('grid'); if(!grid) return;
  const about=document.querySelector('#about .ab-lead')||document.getElementById('about');
  const MAX=72,      // tilt at the screen edge (deg)
        CURVE=1.15,  // how quickly tilt builds outside the flat zone
        FLAT=.14,    // share of the distance to the edge where the centre card stays flat
        PULL=.65,    // compression strength: visual distance = d/(1+PULL·d) → smooth, always-moving tighter stacking
        SHRINK=.1;   // slight scale-down at the edges
  const cards=[...grid.querySelectorAll('a.card')], vis=new Set();
  const io=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting) vis.add(e.target); else { vis.delete(e.target); e.target.style.transform=''; e.target.style.zIndex=''; e.target._tf=e.target._z=''; e.target._rx=null; } }); kick(); },{rootMargin:'60% 0px'});
  cards.forEach(c=>io.observe(c));
  let raf=0;
  function update(){
    raf=0;
    if(grid.classList.contains('as-list')){ cards.forEach(c=>{ c.style.transform=''; c.style.zIndex=''; c._tf=c._z=''; c._rx=null; }); return; }
    const h=innerHeight, mid=h/2, list=[...vis], tops=new Map();
    // hand-off to About: once the About copy crosses the middle of the screen, the stack is pushed up and out
    // (lower cards travel further, so they pile into the ones above); scrolling back slides them in again
    const ab=about&&about.getBoundingClientRect().top, push=ab==null?0:Math.min(1,Math.max(0,(mid-ab)/(h*.55)));
    const pe=push*push*(3-2*push);
    // read everything first, then write: interleaving rect reads with transform writes forced a style
    // recalculation per card per frame
    const pos=list.map(c=>{ const op=c.offsetParent; if(!op) return null;
      if(!tops.has(op)) tops.set(op,op.getBoundingClientRect().top);
      return {cy:tops.get(op)+c.offsetTop+c.offsetHeight/2, hh:c.offsetHeight}; });
    list.forEach((c,i)=>{ const p=pos[i]; if(!p) return;
      const raw=(p.cy-mid)/(mid+p.hh/2);                           // -1 top edge … 0 centre … 1 bottom edge
      const u=Math.max(-1,Math.min(1,raw));
      const k=Math.max(0,Math.abs(u)-FLAT)/(1-FLAT), s=Math.sign(u);
      // smooth, monotonic pull toward the centre: every card keeps moving, slowing gradually toward the edges
      const D=mid+p.hh/2, x=Math.abs(raw);
      let ty=Math.sign(raw)*(x/(1+PULL*x)-x)*D;
      if(pe>0) ty-=pe*h*(.55+.45*Math.max(0,Math.min(1,(p.cy/h))));     // push-up for the About hand-off
      // tilt: from the layout position normally; while being pushed, from where the card actually is on screen
      // (cards heading for the top take on the top cards' lean), blended by the push amount
      const ab0=s*Math.pow(k,CURVE)*MAX;
      const uv=Math.max(-1,Math.min(1,(p.cy+ty-mid)/(mid+p.hh/2))), kv=Math.max(0,Math.abs(uv)-FLAT)/(1-FLAT);
      const av=Math.sign(uv)*Math.pow(kv,CURVE)*MAX, kk=k+(kv-k)*pe;
      const a=ab0+(av-ab0)*pe, sc=1-SHRINK*kk;
      const tf=`translateY(${ty.toFixed(1)}px) perspective(900px) rotateX(${a.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      const z=kk<.001?'3':String(2-Math.round(kk*2));            // centre card above its neighbours
      c._rx={ty,a,sc};                                              // glass.js mirrors the card with the same 3D shape
      if(c._tf!==tf){ c.style.transform=tf; c._tf=tf; }
      if(c._z!==z){ c.style.zIndex=z; c._z=z; }
    });
  }
  function kick(){ if(!raf) raf=requestAnimationFrame(update); }
  addEventListener('scroll',kick,{passive:true}); addEventListener('resize',kick);
  new MutationObserver(kick).observe(grid,{attributes:true,attributeFilter:['class']});
  kick();
})();
