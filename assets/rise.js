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

  /* Preferred path: CSS scroll-driven animations. The browser evaluates the stack on the compositor in step
     with the scroll, so fast flings no longer leave cards a frame behind (the JS version lagged by tens of px
     per frame once cards were pulled toward the centre, which read as ghosting). Keyframes sample the same
     curve as the JS fallback below; they are regenerated when the viewport height or card size changes. */
  if(CSS.supports('animation-timeline: view()')){
    const st=document.createElement('style'); st.id='rise-sda'; document.head.appendChild(st);
    const SCOPE=CSS.supports('timeline-scope: --a');
    let lastKey='';
    const gen=()=>{
      const c0=cards[0]; if(!c0) return;
      const h=innerHeight, hh=c0.offsetHeight, key=h+'x'+hh; if(key===lastKey||!hh) return; lastKey=key;
      const mid=h/2, D=mid+hh/2, N=48; let kf='';
      for(let i=0;i<=N;i++){
        const raw=1-2*i/N, x=Math.abs(raw), sg=Math.sign(raw);          // view() cover range: card top at bottom edge → bottom at top edge
        const k=Math.max(0,x-FLAT)/(1-FLAT);
        const ty=sg*(x/(1+PULL*x)-x)*D, a=sg*Math.pow(k,CURVE)*MAX, sc=1-SHRINK*k;
        const z=k<.001?3:2-Math.round(k*2);
        kf+=`${(i/N*100).toFixed(3)}%{transform:translateY(${ty.toFixed(1)}px) perspective(900px) rotateX(${a.toFixed(2)}deg) scale(${sc.toFixed(3)});z-index:${z}}`;
      }
      let push='';
      if(SCOPE&&about){   // About hand-off: the whole stack is pushed up once the About copy passes the middle of the screen
        const eh=about.offsetHeight, p0=(h/2)/(h+eh)*100, p1=Math.min(100,(1.05*h)/(h+eh)*100);
        push=`@keyframes rise-push{from{transform:none}to{transform:translateY(${(-1.05*h).toFixed(0)}px)}}
          body{timeline-scope:--rise-about}
          #about .ab-lead{view-timeline-name:--rise-about}
          #grid:not(.as-list){animation:rise-push linear both;animation-timing-function:cubic-bezier(.45,0,.55,1);animation-timeline:--rise-about;animation-range:cover ${p0.toFixed(2)}% cover ${p1.toFixed(2)}%}`;
      }
      st.textContent=`@keyframes rise-stack{${kf}}
        #grid:not(.as-list) a.card{position:relative;animation:rise-stack linear both;animation-timeline:view();animation-range:cover 0% cover 100%}
        ${push}`;
    };
    gen(); addEventListener('resize',gen); addEventListener('load',gen);
    if(window.ResizeObserver&&cards[0]) new ResizeObserver(gen).observe(cards[0]);
    return;
  }

  /* Fallback (browsers without scroll-driven animations): the same stack computed per frame in JS. */
  // every card is evaluated from its layout box each frame (cheap: one batched read). The old IntersectionObserver
  // watched the *transformed* boxes, so pulled cards kept pulling in the next ones and the whole grid piled up
  // at the bottom edge on iPhones.
  let raf=0;
  function update(){
    raf=0;
    if(grid.classList.contains('as-list')){ cards.forEach(c=>{ c.style.transform=''; c.style.zIndex=''; c._tf=c._z=''; c._rx=null; }); return; }
    const h=innerHeight, mid=h/2, list=cards, tops=new Map();
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
      if(Math.abs(raw)>2.2&&pe===0){ if(c._tf){ c.style.transform=''; c.style.zIndex=''; c._tf=c._z=''; c._rx=null; } return; }   // far off screen: untouched
      const u=Math.max(-1,Math.min(1,raw));
      const k=Math.max(0,Math.abs(u)-FLAT)/(1-FLAT), s=Math.sign(u);
      // smooth, monotonic pull toward the centre: every card keeps moving, slowing gradually toward the edges
      const D=mid+p.hh/2, x=Math.min(1,Math.abs(raw));               // past the edge the offset stays constant (same as the CSS version's fill), so off-screen cards never converge into a pile
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
  // update inside the scroll event too (not only on the next frame): on iOS this lands closer to the frame the scroll is drawn in
  addEventListener('scroll',()=>{ if(raf){ cancelAnimationFrame(raf); raf=0; } update(); },{passive:true}); addEventListener('resize',kick);
  new MutationObserver(kick).observe(grid,{attributes:true,attributeFilter:['class']});
  kick();
})();
