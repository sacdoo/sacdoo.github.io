/* Site-wide custom cursor: sac symbol (Lottie) follows the pointer.
   Size reacts to pointer speed — fast = bigger, slow/still = smaller. */
(function(){
  if(!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  // ?dbg=none|novideo|noglass|nolottie — isolate what makes macOS show the arrow under a resting mouse
  const DBG=new URLSearchParams(location.search).get('dbg');
  if(DBG){
    const H=document.documentElement, tag=document.createElement('div');
    tag.textContent='dbg: '+DBG; tag.style.cssText='position:fixed;left:8px;bottom:8px;z-index:99;font:12px monospace;background:#000;color:#0f0;padding:4px 6px;pointer-events:none';
    document.body.appendChild(tag);
    const st=document.createElement('style'); document.head.appendChild(st);
    if(DBG==='none') st.textContent='html.has-sym-cursor,html.has-sym-cursor *,html.has-sym-cursor *::before,html.has-sym-cursor *::after{cursor:none!important}';
    if(DBG==='noglass') st.textContent='.bar{display:none!important}';
    if(DBG==='novideo'){ st.textContent='video,iframe{display:none!important}'; const kill=()=>document.querySelectorAll('video').forEach(v=>{v.pause();v.removeAttribute('src');v.load();}); kill(); setInterval(kill,1000); }
    if(DBG==='nolottie'){ H.classList.add('has-sym-cursor'); return; }
  }
  if(!window.lottie||!window.SAC_SYMBOL) return;
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const el=document.createElement('div'); el.className='sym-cursor'; el.setAttribute('aria-hidden','true');
  const box=document.createElement('span'); el.appendChild(box);
  const label=document.createElement('b'); label.textContent='Click!'; el.appendChild(label);
  document.body.appendChild(el);
  document.documentElement.classList.add('has-sym-cursor');
  const anim=lottie.loadAnimation({container:box,renderer:'svg',loop:true,autoplay:false,animationData:window.SAC_SYMBOL});
  anim.setSpeed(4.5);
  const MIN=.75, HOT=2.4, MAX=3.2;   // HOT: resting size over a project thumbnail               // scale when still … when flicking fast
  let hot=false, x=-100,y=-100,tx=-100,ty=-100, lx=0,ly=0,lt=0, vel=0, sc=MIN, sv=0, raf=0, seen=false;
  function loop(now){
    x+=(tx-x)*.4; y+=(ty-y)*.4;
    vel*=.88;                              // speed decays when the pointer slows/stops
    const base=hot?HOT:MIN, target=RM?(hot?HOT:1):Math.min(MAX, base+vel*.9);
    const a=380*(target-sc)-24*sv; sv+=a/60; sc+=sv/60;   // springy size
    el.style.transform=`translate(${x}px,${y}px)`;
    box.style.transform=`scale(${(Math.max(.2,sc)*34/110).toFixed(4)})`; // 34px base, box is 110px
    raf=(Math.abs(tx-x)+Math.abs(ty-y)>.1||vel>.01||Math.abs(sv)>.01||Math.abs(target-sc)>.005)?requestAnimationFrame(loop):0;
  }
  function moveTo(cx,cy){
    const now=performance.now(), dt=Math.max(8,now-lt);
    if(seen){ const v=Math.hypot(cx-lx,cy-ly)/dt; vel=Math.max(vel, v); }
    else { x=tx=cx; y=ty=cy; seen=true; }
    lx=cx; ly=cy; lt=now; tx=cx; ty=cy;
    if(!el.classList.contains('on')){ el.classList.add('on'); anim.play(); }
    if(!raf) raf=requestAnimationFrame(loop);
  }
  // pointer moves forwarded from embedded same-site pages (e.g. the Furry Brands sketch iframe)
  addEventListener('message',e=>{
    const d=e.data; if(!d||!d.symCursor) return;
    const f=[...document.querySelectorAll('iframe')].find(fr=>fr.contentWindow===e.source); if(!f) return;
    if(d.symCursor==='leave'){ return; }
    const r=f.getBoundingClientRect(); if(hot) setHot(false); moveTo(r.left+d.x, r.top+d.y);
  });
  addEventListener('pointermove',e=>{
    if(e.pointerType!=='mouse') return;
    const now=performance.now(), dt=Math.max(8,now-lt);
    if(seen){ const v=Math.hypot(e.clientX-lx,e.clientY-ly)/dt; vel=Math.max(vel, v); }   // px per ms
    else { x=tx=e.clientX; y=ty=e.clientY; seen=true; }
    lx=e.clientX; ly=e.clientY; lt=now; tx=e.clientX; ty=e.clientY;
    if(!el.classList.contains('on')){ el.classList.add('on'); anim.play(); }
    if(!raf) raf=requestAnimationFrame(loop);
  },{passive:true});

  // Real cause of the arrow popping back while the mouse rests on a link: Chrome's link-URL status bubble
  // (bottom-left) is a separate macOS window; when it appears/expands, macOS resets the cursor to the arrow.
  // So while the mouse is over a link its href is parked in data-href (no bubble) and put back on press/leave,
  // so clicks, cmd-click and keyboard navigation work exactly as before.
  const park=a=>{ if(a.hasAttribute('href')){ a.dataset.href=a.getAttribute('href'); a.removeAttribute('href'); } };
  const unpark=a=>{ if(a.dataset.href!=null){ a.setAttribute('href',a.dataset.href); delete a.dataset.href; } };
  document.addEventListener('pointerover',e=>{ if(e.pointerType!=='mouse') return; const a=e.target.closest&&e.target.closest('a[href]'); if(a) park(a); },{passive:true,capture:true});
  document.addEventListener('pointerout',e=>{ const a=e.target.closest&&e.target.closest('a[data-href]'); if(a&&!(e.relatedTarget&&a.contains(e.relatedTarget))) unpark(a); },{passive:true,capture:true});
  document.addEventListener('pointerdown',e=>{ const a=e.target.closest&&e.target.closest('a[data-href]'); if(a) unpark(a); },{capture:true});
  document.addEventListener('focusin',e=>{ const a=e.target.closest&&e.target.closest('a[data-href]'); if(a) unpark(a); });
  // over a project thumbnail / row: cursor grows a little and a "Click!" label pops up in its centre
  const setHot=v=>{ if(v===hot) return; hot=v; el.classList.toggle('hot',v); if(!raf) raf=requestAnimationFrame(loop); };
  document.addEventListener('pointerover',e=>{ const t=e.target.closest?e.target:null; setHot(!!(t&&t.closest('a.card'))); el.classList.toggle('diff',!!(t&&t.closest('.big-role'))); },{passive:true});
  document.addEventListener('mouseleave',()=>{ el.classList.remove('on'); anim.pause(); });
  document.addEventListener('mouseenter',()=>{ el.classList.add('on'); anim.play(); });
  addEventListener('blur',()=>{ el.classList.remove('on'); anim.pause(); });
})();
