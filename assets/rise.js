/* Phones/tablets: scroll-linked 3D tilt for the Work thumbnails.
   A card is flat in the middle of the screen and tilts more the closer it gets to the top or bottom edge
   (bottom cards lean their lower edge toward you, top cards their upper edge) — like cards on a drum. */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const grid=document.getElementById('grid'); if(!grid) return;
  const MAX=48, CURVE=1.6;                        // max angle at the screen edge; >1 keeps the middle area flatter
  const cards=[...grid.querySelectorAll('a.card')], vis=new Set();
  const io=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting) vis.add(e.target); else { vis.delete(e.target); } }); kick(); },{rootMargin:'20% 0px'});
  cards.forEach(c=>io.observe(c));
  let raf=0;
  function update(){
    raf=0;
    if(grid.classList.contains('as-list')){ cards.forEach(c=>c.style.transform=''); return; }
    const h=innerHeight, mid=h/2;
    for(const c of vis){
      const r=c.getBoundingClientRect();
      let u=(r.top+r.height/2-mid)/(mid+r.height/2);  // -1 (top edge) … 0 (centre) … 1 (bottom edge)
      u=Math.max(-1,Math.min(1,u));
      const a=Math.sign(u)*Math.pow(Math.abs(u),CURVE)*MAX;
      c.style.transform=Math.abs(a)<.05?'':`perspective(900px) rotateX(${a.toFixed(2)}deg)`;
    }
  }
  function kick(){ if(!raf) raf=requestAnimationFrame(update); }
  addEventListener('scroll',kick,{passive:true}); addEventListener('resize',kick);
  new MutationObserver(kick).observe(grid,{attributes:true,attributeFilter:['class']});
  kick();
})();
