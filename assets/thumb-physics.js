/* Phones/tablets: Work thumbnails behave like loose physical cards while you scroll.
   - The scroll's acceleration pushes cards (inertia): they lag when you start, overshoot when you stop.
   - Cards collide softly (they may overlap a touch), transfer momentum, get knocked sideways and spin
     from off-centre hits, then springs pull them home within ~1–2 s.
   - Strength is focused around the middle of the screen (where you're scrolling); cards away from it barely move.
   Grid view only; skipped for reduced motion. */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const grid=document.getElementById('grid'); if(!grid) return;
  const K=34, C=4.2;             // home spring (per unit mass): under-damped, settles ~1.5 s
  const KR=40, CR=4.6;           // rotation spring
  const KC=380, CC=10;           // soft contact: stiffness / damping when two cards overlap
  const GAIN=.2;                 // how hard scroll acceleration shoves the cards
  const MAXY=110, MAXX=26, MAXR=9;
  let cards=[], lastY=scrollY, sv=0, raf=0, lastT=0, quiet=0;
  const rnd=i=>{ const s=Math.sin(i*12.9898+4.1)*43758.5453; return s-Math.floor(s); };   // stable per-card randomness
  function measure(){
    cards=[...grid.querySelectorAll('a.card')].map((el,i)=>{
      const o=cards.find(c=>c.el===el)||{};
      return {el, top:el.offsetTop, left:el.offsetLeft, h:el.offsetHeight, w:el.offsetWidth,
        m:.45+rnd(i)*1.25, ks:.75+rnd(i+3)*.5, lever:(rnd(i+7)<.5?-1:1)*(.45+rnd(i+11)*.55), y:o.y||0, vy:o.vy||0, x:o.x||0, vx:o.vx||0, r:o.r||0, vr:o.vr||0};
    });
  }
  const active=()=>!grid.classList.contains('as-list');
  function weight(c){                       // 1 at the middle of the screen → ~0 a screen away
    const cy=c.el.getBoundingClientRect().top-c.y+c.h/2, mid=innerHeight*.5;   // rest position on screen
    const d=(cy-mid)/(innerHeight*.55);
    return Math.exp(-d*d);
  }
  function sub(dt,acc){
    for(const c of cards){
      const w=c.w8;
      const f=-acc*GAIN*w;                  // pseudo-force from the scrolling frame (lag / overshoot)
      c.vy+=(f/c.m - K*c.ks*c.y - C*c.vy)*dt;
      c.vx+=(-K*c.x - C*c.vx)*dt;
      c.vr+=(-KR*c.r - CR*c.vr)*dt;
    }
    for(let i=0;i<cards.length;i++){        // soft contacts with the next card below in the same column
      const a=cards[i];
      for(let j=i+1;j<cards.length;j++){ const b=cards[j];
        if(Math.abs(a.left-b.left)>8) continue;
        const pen=(a.top+a.h+a.y)-(b.top+b.y)+8;       // +8: card edges, slight overlap allowed before it pushes hard
        if(pen>0){
          const rel=a.vy-b.vy, F=KC*pen+CC*Math.max(0,rel);
          a.vy-=F/a.m*dt; b.vy+=F/b.m*dt;
          // off-centre hit: sideways knock + spin, opposite directions for the two cards
          a.vx-=F*.5*a.lever*dt; b.vx+=F*.5*b.lever*dt;
          a.vr-=F*2.2*a.lever*dt;  b.vr+=F*2.2*b.lever*dt;
        }
        break;
      }
    }
    for(const c of cards){
      c.y+=c.vy*dt; c.x+=c.vx*dt; c.r+=c.vr*dt;
      c.y=Math.max(-MAXY,Math.min(MAXY,c.y)); c.x=Math.max(-MAXX,Math.min(MAXX,c.x)); c.r=Math.max(-MAXR,Math.min(MAXR,c.r));
    }
  }
  function step(now){
    const dt=Math.min(.033,(now-lastT)/1000||.016); lastT=now;
    const nv=(scrollY-lastY)/dt; lastY=scrollY;
    const acc=Math.max(-60000,Math.min(60000,(nv-sv)/dt)); sv+= (nv-sv)*.6;
    for(const c of cards) c.w8=weight(c);
    const n=3; for(let k=0;k<n;k++) sub(dt/n, k===0?acc:acc);
    let e=0;
    for(const c of cards){
      const still=Math.abs(c.y)<.08&&Math.abs(c.x)<.08&&Math.abs(c.r)<.02;
      c.el.style.transform=still?'':`translate(${c.x.toFixed(2)}px,${c.y.toFixed(2)}px) rotate(${c.r.toFixed(3)}deg)`;
      c.el.style.zIndex=still?'':String(100+Math.round(Math.abs(c.y)));
      e+=Math.abs(c.y)+Math.abs(c.x)+Math.abs(c.r)+(Math.abs(c.vy)+Math.abs(c.vx)+Math.abs(c.vr))*.02;
    }
    quiet=(Math.abs(nv)<1&&e<.2)?quiet+1:0;
    raf=quiet>3?0:requestAnimationFrame(step);
    if(!raf){ sv=0; }
  }
  const kick=()=>{ if(!active()) return; quiet=0; if(!raf){ lastT=performance.now(); lastY=scrollY; raf=requestAnimationFrame(step); } };
  addEventListener('scroll',kick,{passive:true});
  addEventListener('resize',measure);
  new MutationObserver(()=>{ if(!active()) cards.forEach(c=>{ c.y=c.vy=c.x=c.vx=c.r=c.vr=0; c.el.style.transform=''; c.el.style.zIndex=''; }); measure(); })
    .observe(grid,{attributes:true,attributeFilter:['class']});
  addEventListener('load',measure); measure();
})();
