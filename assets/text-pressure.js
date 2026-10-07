/* Text Pressure (after React Bits "TextPressure"), vanilla JS.
   Hovering the big "Brand Animator" line: each letter's width (wdth) and weight (wght) follow
   cursor distance on Roboto Flex. The line's overall width is held constant (fit to the column). */
(function(){
  const host=document.querySelector('.big-role .tp'); if(!host) return;
  const text=host.textContent;
  host.textContent='';
  const chars=[...text].map(ch=>{ const s=document.createElement('span'); s.textContent=ch===' '?' ':ch; host.appendChild(s); return {el:s,w:100,g:700}; });
  const IDLE={w:100,g:700}, W=[45,151], G=[200,1000];   // far letters: narrow+light, near the cursor: wide+heavy
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover=matchMedia('(hover: hover) and (pointer: fine)').matches;
  let mx=0,my=0, active=false, raf=0, baseFs=0;
  const apply=c=>{ c.el.style.fontVariationSettings=`'wdth' ${c.w.toFixed(1)},'wght' ${c.g.toFixed(0)},'opsz' 144`; };
  function fit(){                               // idle line exactly fills the column
    host.style.transform='none'; host.style.fontSize='';
    chars.forEach(c=>{ c.w=IDLE.w; c.g=IDLE.g; apply(c); });
    const col=host.parentElement.clientWidth, w=host.offsetWidth;
    baseFs=parseFloat(getComputedStyle(host).fontSize)*col/w;
    host.style.fontSize=baseFs+'px';
  }
  function hold(){                              // keep the overall width constant while letters vary
    const col=host.parentElement.clientWidth, w=host.offsetWidth;
    host.style.transform=`scaleX(${(col/w).toFixed(4)})`;
  }
  function loop(){
    const r=host.getBoundingClientRect(), maxD=r.width/2;
    let moving=false;
    chars.forEach(c=>{
      let tw=IDLE.w, tg=IDLE.g;
      if(active){
        const b=c.el.getBoundingClientRect(), cx=b.left+b.width/2, cy=b.top+b.height/2;
        const t=Math.max(0,1-Math.hypot(mx-cx,my-cy)/maxD);     // 1 at the cursor → 0 at half the line away
        tw=W[0]+(W[1]-W[0])*t; tg=G[0]+(G[1]-G[0])*t;
      }
      c.w+=(tw-c.w)*.14; c.g+=(tg-c.g)*.14;
      if(Math.abs(tw-c.w)>.2||Math.abs(tg-c.g)>1) moving=true;
      apply(c);
    });
    hold();
    raf=(active||moving)?requestAnimationFrame(loop):0;
  }
  const kick=()=>{ if(!raf) raf=requestAnimationFrame(loop); };
  const start=()=>{ fit(); hold();
    if(RM||!canHover) return;
    const zone=host.parentElement;
    zone.addEventListener('pointerenter',e=>{ active=true; mx=e.clientX; my=e.clientY; kick(); });
    zone.addEventListener('pointermove',e=>{ mx=e.clientX; my=e.clientY; kick(); },{passive:true});
    zone.addEventListener('pointerleave',()=>{ active=false; kick(); });
  };
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(start);
  let rt; addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(()=>{ active=false; fit(); hold(); },120); });
})();
