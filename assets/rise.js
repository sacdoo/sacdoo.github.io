/* Phones/tablets: Work thumbnails swing into view in 3D (rotation + fade) every time they enter,
   and swing out the same way as they leave — through the top when scrolling down, through the bottom when scrolling up.
   The "stage" is the screen minus a band at the top/bottom, so the exit plays while the card is still visible. */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches||!('IntersectionObserver' in window)) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const grid=document.getElementById('grid'); if(!grid) return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    const c=e.target, top=e.boundingClientRect.top+e.boundingClientRect.height/2<innerHeight/2;   // which edge is it at?
    if(e.isIntersecting){
      if(!c.classList.contains('in')){ c.classList.add('notrans'); c.classList.toggle('from-top',top); void c.offsetWidth; c.classList.remove('notrans');
        requestAnimationFrame(()=>c.classList.add('in')); }
    } else if(c.classList.contains('in')){
      c.classList.toggle('from-top',top); c.classList.remove('in');      // animated: swings out through that edge
    }
  }),{threshold:0,rootMargin:'-14% 0px -6% 0px'});
  grid.querySelectorAll('a.card').forEach(c=>{
    const r=c.getBoundingClientRect();
    c.classList.add('rise');
    if(r.top<innerHeight*.94&&r.bottom>innerHeight*.14){ c.classList.add('notrans','in'); void c.offsetWidth; c.classList.remove('notrans'); }
    io.observe(c);
  });
})();
