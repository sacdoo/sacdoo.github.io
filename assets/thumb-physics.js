/* Phones/tablets: the Work thumbnails react to scrolling like loose cards on a string —
   they lag behind the scroll direction, bump into each other (collisions with a little spin)
   and spring back into place within ~1.5 s. Grid view only; skipped for reduced motion. */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const grid=document.getElementById('grid'); if(!grid) return;
  const K=30, C=3.4;          // soft, under-damped spring back to rest → wobbles, settles in ~1.5–2 s
  const KR=60, CR=5;          // rotation spring
  const MAXY=80, MAXR=5;      // clamp offset (px) and tilt (deg)
  const GAP=4;                // closest two cards may get before they "hit"
  let cards=[], lastY=scrollY, raf=0, lastT=0;
  function measure(){
    cards=[...grid.querySelectorAll('a.card')].map((el,i)=>{
      const old=cards.find(c=>c.el===el);
      return {el, top:el.offsetTop, h:el.offsetHeight, k:.3+((i*37)%11)/10, y:old?old.y:0, v:old?old.v:0, r:old?old.r:0, vr:old?old.vr:0, side:i%2?1:-1};
    });
  }
  function active(){ return !grid.classList.contains('as-list'); }
  function step(now){
    const dt=Math.min(.033,(now-lastT)/1000||.016); lastT=now;
    const d=scrollY-lastY; lastY=scrollY;
    let energy=0;
    for(const c of cards){
      if(d) c.v+=d*c.k*3.2;                         // inertia: lag behind the scroll (each card a bit differently)
      c.v+=(-K*c.y-C*c.v)*dt; c.y+=c.v*dt;
      if(c.y>MAXY){c.y=MAXY;c.v*=-.3;} if(c.y<-MAXY){c.y=-MAXY;c.v*=-.3;}
      c.vr+=(-KR*c.r-CR*c.vr)*dt + c.v*.018*c.side; c.r+=c.vr*dt;
      c.r=Math.max(-MAXR,Math.min(MAXR,c.r));
    }
    // collisions between neighbours (one column on phones; also works per column on wider grids)
    for(let i=0;i<cards.length;i++) for(let j=i+1;j<cards.length;j++){
      const a=cards[i], b=cards[j];
      if(Math.abs(a.el.offsetLeft-b.el.offsetLeft)>8) continue;   // different column
      if(b.top<a.top) continue;
      const pen=(a.top+a.h+a.y+GAP)-(b.top+b.y);
      if(pen>0){
        a.y-=pen/2; b.y+=pen/2;
        const rel=a.v-b.v;
        if(rel>0){ const imp=rel*.75; a.v-=imp; b.v+=imp;           // bouncy exchange of momentum
          a.vr-=rel*.25*a.side; b.vr+=rel*.25*b.side; }               // knock: a little spin on impact
      }
      break;                                                          // only the next card below in this column
    }
    for(const c of cards){
      c.el.style.transform=(Math.abs(c.y)<.05&&Math.abs(c.r)<.01)?'':`translateY(${c.y.toFixed(2)}px) rotate(${c.r.toFixed(3)}deg)`;
      energy+=Math.abs(c.y)+Math.abs(c.v)*.05+Math.abs(c.r)+Math.abs(c.vr)*.05;
    }
    raf=(energy>.05||d)?requestAnimationFrame(step):0;
  }
  const kick=()=>{ if(!active()) return; if(!raf){ lastT=performance.now(); raf=requestAnimationFrame(step); } };
  addEventListener('scroll',kick,{passive:true});
  addEventListener('resize',()=>{ measure(); });
  new MutationObserver(()=>{ if(!active()){ cards.forEach(c=>{c.y=c.v=c.r=c.vr=0;c.el.style.transform='';}); } measure(); }).observe(grid,{attributes:true,attributeFilter:['class']});
  addEventListener('load',measure); measure();
})();
