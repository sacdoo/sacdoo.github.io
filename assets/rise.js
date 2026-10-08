/* Phones/tablets: Work thumbnails slide up from below as they enter the screen (once each). */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches||!('IntersectionObserver' in window)) return;
  const grid=document.getElementById('grid'); if(!grid) return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),{rootMargin:'0px 0px -6% 0px',threshold:.01});
  grid.querySelectorAll('a.card').forEach(c=>{
    const r=c.getBoundingClientRect();
    if(r.top<innerHeight*.94) return;            // already on screen at load: leave it alone
    c.classList.add('rise'); io.observe(c);
  });
})();
