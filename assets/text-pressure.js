/* Text Pressure (after React Bits "TextPressure"), vanilla JS.
   Hovering (or touch-dragging on phones) the big "Brand Animator": each letter's width (wdth) and
   weight (wght) follow pointer distance on Roboto Flex. Each line's overall width is held constant.
   Desktop: one line fitted to the column. Narrow screens (≤720px): two lines, "Brand" / "Animator".
   Touch devices (no hover): the letters unfold one after another as the footer scrolls into view
   (narrow + light → full), and a finger dragged across the word acts like the desktop cursor. */
(function(){
  const host=document.querySelector('.big-role .tp'); if(!host) return;
  const TEXT=host.dataset.text||host.textContent.trim(); host.dataset.text=TEXT;
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
    mode=narrowMQ.matches?'two':'one';
    const parts=mode==='two'?TEXT.split(' '):[TEXT];
    host.textContent=''; host.style.fontSize='';
    lines=parts.map(t=>{ const ln=document.createElement('span'); ln.className='tp-line'; host.appendChild(ln);
      const chars=[...t].map(ch=>{ const s=document.createElement('span'); s.textContent=ch===' '?' ':ch; ln.appendChild(s); return {el:s,w:IDLE.w,g:IDLE.g}; });
      chars.forEach(apply); return {el:ln,chars,idle:0,s:1}; });
    // one font size for all lines, fitted so the longest line fills the column
    const col=host.parentElement.clientWidth;
    const widest=Math.max(...lines.map(l=>l.el.offsetWidth));
    host.style.fontSize=(parseFloat(getComputedStyle(host).fontSize)*col/widest)+'px';
    lines.forEach(l=>{ l.idle=l.el.offsetWidth; });
  }
  // hold each line at its idle width (cursor/drag effect); in the touch scroll-unfold the word grows freely.
  // The scale eases so switching between the two never pops.
  function hold(ease){ lines.forEach(l=>{ const t=(!TOUCH||active)?l.idle/l.el.offsetWidth:1; l.s=ease?l.s+(t-l.s)*.2:t; l.el.style.transform=`scaleX(${l.s.toFixed(4)})`; }); }
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
    hold(true);
    if(lines.some(l=>Math.abs(l.s-((!TOUCH||active)?l.idle/l.el.offsetWidth:1))>.002)) moving=true;
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
