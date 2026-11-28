/* Phones/tablets: scroll-linked 3D stack for the Work thumbnails.
   The card in the middle of the screen (the "selected" one) stays flat and on top. The others tilt
   strongly away from it and are pulled toward it, so they pile up tightly above and below, like cards
   on a drum (bottom cards lean their lower edge toward you, top cards their upper edge). */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const grid=document.getElementById('grid'); if(!grid) return;
  const MAX=72,      // tilt at the screen edge (deg)
        CURVE=1.15,  // how quickly tilt builds outside the flat zone
        FLAT=.14,    // share of the distance to the edge where the centre card stays flat
        PULL=.65,    // compression strength: visual distance = d/(1+PULL·d) → smooth, always-moving tighter stacking
        SHRINK=.1;   // slight scale-down at the edges
  const cards=[...grid.querySelectorAll('a.card')], vis=new Set();
  const io=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting) vis.add(e.target); else { vis.delete(e.target); e.target.style.transform=''; e.target.style.zIndex=''; e.target._tf=e.target._z=''; } }); kick(); },{rootMargin:'60% 0px'});
  cards.forEach(c=>io.observe(c));
  let raf=0;
  function update(){
    raf=0;
    if(grid.classList.contains('as-list')){ cards.forEach(c=>{ c.style.transform=''; c.style.zIndex=''; c._tf=c._z=''; }); return; }
    const h=innerHeight, mid=h/2, list=[...vis], tops=new Map();
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
      const D=mid+p.hh/2, x=Math.abs(raw), ty=Math.sign(raw)*(x/(1+PULL*x)-x)*D;
      const a=s*Math.pow(k,CURVE)*MAX, sc=1-SHRINK*k;
      const tf=`translateY(${ty.toFixed(1)}px) perspective(900px) rotateX(${a.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
      const z=k<.001?'3':String(2-Math.round(k*2));              // centre card above its neighbours
      if(c._tf!==tf){ c.style.transform=tf; c._tf=tf; }
      if(c._z!==z){ c.style.zIndex=z; c._z=z; }
    });
  }
  function kick(){ if(!raf) raf=requestAnimationFrame(update); }
  addEventListener('scroll',kick,{passive:true}); addEventListener('resize',kick);
  new MutationObserver(kick).observe(grid,{attributes:true,attributeFilter:['class']});
  kick();
})();
