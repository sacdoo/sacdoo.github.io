/* Text Pressure (after React Bits "TextPressure"), vanilla JS.
   Hovering (or touch-dragging on phones) the big "Brand Animator": each letter's width (wdth) and
   weight (wght) follow pointer distance on Roboto Flex. Each line's overall width is held constant.
   Desktop: one line fitted to the column. One line on phones too. Both ends stay fixed.
   Touch devices (no hover): the letters unfold one after another as the footer scrolls into view
   (narrow + light → full), and a finger dragged across the word acts like the desktop cursor. */
(function(){
  const host=document.querySelector('.big-role .tp'); if(!host) return;
  const TEXT=(host.dataset.text||host.textContent.trim()).toUpperCase(); host.dataset.text=TEXT;   // all caps: BRAND ANIMATOR
  const IDLE={w:100,g:700}, W=[45,151], G=[200,1000];   // far letters: narrow+light, near the pointer: wide+heavy
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrowMQ=matchMedia('(max-width: 720px)');
  const TOUCH=!matchMedia('(hover: hover) and (pointer: fine)').matches;
  const FOLD={w:45,g:200};   // scroll start state on touch devices
  let lines=[], mx=0,my=0, active=false, raf=0, mode='', prog=1;
  const clamp=v=>Math.min(1,Math.max(0,v));
  function scrollProg(){   // 0 when the word's top reaches the bottom of the screen → 1 a little before the page end
    const r=host.getBoundingClientRect(), vh=innerHeight, maxY=document.documentElement.scrollHeight-vh;
    const startY=scrollY+r.top-vh, span=(maxY-startY)*.85;
    return span<40?1:clamp((scrollY-startY)/span);
  }
  const apply=c=>{ c.el.style.fontVariationSettings=`'wdth' ${c.w.toFixed(1)},'wght' ${c.g.toFixed(0)},'opsz' 144`; };
  function build(){
    mode='one';   // one line on every screen size (phones too)
    const parts=[TEXT];
    host.textContent=''; host.style.fontSize='';
    lines=parts.map(t=>{ const ln=document.createElement('span'); ln.className='tp-line'; host.appendChild(ln);
      const chars=[...t].map(ch=>{ const s=document.createElement('span'); s.textContent=ch===' '?' ':ch; ln.appendChild(s); return {el:s,w:IDLE.w,g:IDLE.g}; });
      chars.forEach(apply); return {el:ln,chars,idle:0,s:1}; });
    // every line fitted to the column on its own, so the shorter "BRAND" grows to the same width as "ANIMATOR"
    const col=host.parentElement.clientWidth, base=parseFloat(getComputedStyle(host).fontSize);
    const wOf=el=>el.getBoundingClientRect().width;   // fractional width (offsetWidth rounds, which overshoots once scaled up)
    lines.forEach(l=>{ l.el.style.fontSize=''; l.el.style.fontSize=(base*col/wOf(l.el))+'px';
      l.el.style.fontSize=(parseFloat(l.el.style.fontSize)*col/wOf(l.el))+'px'; });   // second pass corrects per-glyph rounding
    lines.forEach(l=>{ l.idle=l.el.offsetWidth; });
  }
  // hold each line at its idle width (cursor/drag effect); in the touch scroll-unfold the word grows freely.
  // The scale eases so switching between the two never pops.
  // both ends stay pinned to the margins in every mode: each line is scaled back to its idle (fitted) width
  function hold(){ lines.forEach(l=>{ l.s=l.idle/l.el.offsetWidth; l.el.style.transform=`scaleX(${l.s.toFixed(4)})`; }); }
  function loop(){
    const r=host.getBoundingClientRect(), maxD=Math.max(r.width,1)/2;
    let moving=false;
    const all=lines.flatMap(l=>l.chars), N=Math.max(all.length-1,1);
    if(TOUCH&&!RM) prog=scrollProg();
    all.forEach((c,i)=>{
      let tw=IDLE.w, tg=IDLE.g, k=.14;
      if(active){ const b=c.el.getBoundingClientRect();
        const t=Math.max(0,1-Math.hypot(mx-(b.left+b.width/2),my-(b.top+b.height/2))/maxD);
        tw=W[0]+(W[1]-W[0])*t; tg=G[0]+(G[1]-G[0])*t; }
      else if(TOUCH&&!RM){   // staggered unfold: each letter swells slightly past full, then settles
        const q=clamp(prog*1.7-.7*i/N), e=q*q*(3-2*q), bump=Math.sin(Math.PI*e);
        tw=Math.min(W[1],FOLD.w+(IDLE.w-FOLD.w)*e+bump*30); tg=Math.min(G[1],FOLD.g+(IDLE.g-FOLD.g)*e+bump*220); k=.22; }
      c.w+=(tw-c.w)*k; c.g+=(tg-c.g)*k;
      if(Math.abs(tw-c.w)>.2||Math.abs(tg-c.g)>1) moving=true;
      apply(c);
    });
    hold();
    raf=(active||moving)?requestAnimationFrame(loop):0;
  }
  const kick=()=>{ if(!raf) raf=requestAnimationFrame(loop); };
  function start(){
    build(); hold();
    if(RM) return;
    const zone=host.parentElement;
    if(TOUCH){ addEventListener('scroll',kick,{passive:true}); kick(); }
    zone.addEventListener('pointerdown',e=>{ if(e.pointerType!=='mouse'){ active=true; mx=e.clientX; my=e.clientY; kick(); } });
    zone.addEventListener('pointerenter',e=>{ if(e.pointerType==='mouse'){ active=true; mx=e.clientX; my=e.clientY; kick(); } });
    zone.addEventListener('pointermove',e=>{ if(e.pointerType==='mouse'||active){ active=true; mx=e.clientX; my=e.clientY; kick(); } },{passive:true});
    const off=()=>{ active=false; kick(); };
    zone.addEventListener('pointerleave',e=>{ if(e.pointerType==='mouse') off(); });
    zone.addEventListener('pointerup',e=>{ if(e.pointerType!=='mouse') off(); });
    zone.addEventListener('pointercancel',off);
  }
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(start);
  let rt, lastW=innerWidth; addEventListener('resize',()=>{ if(TOUCH&&innerWidth===lastW) return; lastW=innerWidth;   // phones fire resize when the URL bar hides; only rebuild on real width changes
    clearTimeout(rt); rt=setTimeout(()=>{ active=false; build(); hold(); kick(); },120); });
})();
