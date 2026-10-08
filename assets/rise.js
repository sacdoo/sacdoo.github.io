/* Phones/tablets: Work thumbnails swing into view in 3D every time they enter the screen
   (and reset when they leave), from whichever edge they come in. */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches||!('IntersectionObserver' in window)) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const grid=document.getElementById('grid'); if(!grid) return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    const c=e.target, top=e.boundingClientRect.top<0;            // entering/leaving through the top edge?
    if(e.isIntersecting){
      if(!c.classList.contains('in')){ c.classList.add('notrans'); c.classList.toggle('from-top',top); void c.offsetWidth; c.classList.remove('notrans');
        requestAnimationFrame(()=>c.classList.add('in')); }
    } else { c.classList.add('notrans'); c.classList.remove('in'); c.classList.toggle('from-top',top); void c.offsetWidth; c.classList.remove('notrans'); }
  }),{threshold:0,rootMargin:'0px 0px -4% 0px'});
  grid.querySelectorAll('a.card').forEach(c=>{
    const r=c.getBoundingClientRect();
    c.classList.add('rise');
    if(r.top<innerHeight&&r.bottom>0){ c.classList.add('notrans','in'); void c.offsetWidth; c.classList.remove('notrans'); }   // visible at load: no entrance
    io.observe(c);
  });
})();
