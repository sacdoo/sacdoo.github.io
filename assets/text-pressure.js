/* Text Pressure (after React Bits "TextPressure"), vanilla JS.
   Hovering (or touch-dragging on phones) the big "Brand Animator": each letter's width (wdth) and
   weight (wght) follow pointer distance on Roboto Flex. Each line's overall width is held constant.
   Desktop: one line fitted to the column. Narrow screens (≤720px): two lines, "Brand" / "Animator". */
(function(){
  const host=document.querySelector('.big-role .tp'); if(!host) return;
  const TEXT=host.dataset.text||host.textContent.trim(); host.dataset.text=TEXT;
  const IDLE={w:100,g:700}, W=[45,151], G=[200,1000];   // far letters: narrow+light, near the pointer: wide+heavy
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrowMQ=matchMedia('(max-width: 720px)');
  let lines=[], mx=0,my=0, active=false, raf=0, mode='';
  const apply=c=>{ c.el.style.fontVariationSettings=`'wdth' ${c.w.toFixed(1)},'wght' ${c.g.toFixed(0)},'opsz' 144`; };
  function build(){
    mode=narrowMQ.matches?'two':'one';
    const parts=mode==='two'?TEXT.split(' '):[TEXT];
    host.textContent=''; host.style.fontSize='';
    lines=parts.map(t=>{ const ln=document.createElement('span'); ln.className='tp-line'; host.appendChild(ln);
      const chars=[...t].map(ch=>{ const s=document.createElement('span'); s.textContent=ch===' '?' ':ch; ln.appendChild(s); return {el:s,w:IDLE.w,g:IDLE.g}; });
      chars.forEach(apply); return {el:ln,chars,idle:0}; });
    // one font size for all lines, fitted so the longest line fills the column
    const col=host.parentElement.clientWidth;
    const widest=Math.max(...lines.map(l=>l.el.offsetWidth));
    host.style.fontSize=(parseFloat(getComputedStyle(host).fontSize)*col/widest)+'px';
    lines.forEach(l=>{ l.idle=l.el.offsetWidth; });
  }
  function hold(){ lines.forEach(l=>{ l.el.style.transform=`scaleX(${(l.idle/l.el.offsetWidth).toFixed(4)})`; }); }
  function loop(){
    const r=host.getBoundingClientRect(), maxD=Math.max(r.width,1)/2;
    let moving=false;
    lines.forEach(l=>l.chars.forEach(c=>{
      let tw=IDLE.w, tg=IDLE.g;
      if(active){ const b=c.el.getBoundingClientRect();
        const t=Math.max(0,1-Math.hypot(mx-(b.left+b.width/2),my-(b.top+b.height/2))/maxD);
        tw=W[0]+(W[1]-W[0])*t; tg=G[0]+(G[1]-G[0])*t; }
      c.w+=(tw-c.w)*.14; c.g+=(tg-c.g)*.14;
      if(Math.abs(tw-c.w)>.2||Math.abs(tg-c.g)>1) moving=true;
      apply(c);
    }));
    hold();
    raf=(active||moving)?requestAnimationFrame(loop):0;
  }
  const kick=()=>{ if(!raf) raf=requestAnimationFrame(loop); };
  function start(){
    build(); hold();
    if(RM||!matchMedia('(hover: hover) and (pointer: fine)').matches) return;   // no pointer effects on touch devices
    const zone=host.parentElement;
    zone.addEventListener('pointerdown',e=>{ if(e.pointerType!=='mouse'){ active=true; mx=e.clientX; my=e.clientY; kick(); } });
    zone.addEventListener('pointerenter',e=>{ if(e.pointerType==='mouse'){ active=true; mx=e.clientX; my=e.clientY; kick(); } });
    zone.addEventListener('pointermove',e=>{ if(e.pointerType==='mouse'||active){ active=true; mx=e.clientX; my=e.clientY; kick(); } },{passive:true});
    const off=()=>{ active=false; kick(); };
    zone.addEventListener('pointerleave',e=>{ if(e.pointerType==='mouse') off(); });
    zone.addEventListener('pointerup',e=>{ if(e.pointerType!=='mouse') off(); });
    zone.addEventListener('pointercancel',off);
  }
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(start);
  let rt; addEventListener('resize',()=>{ clearTimeout(rt); rt=setTimeout(()=>{ active=false; build(); hold(); },120); });
})();
