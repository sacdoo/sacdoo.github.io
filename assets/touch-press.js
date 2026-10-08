/* Phones/tablets: pressing a thumbnail shrinks it slightly (like a physical button) and it springs back on release. */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  let cur=null, t=0;
  const down=e=>{ const c=e.target.closest&&e.target.closest('#grid a.card'); if(!c) return;
    cur=c; clearTimeout(t); c.classList.add('pressed'); };
  const up=()=>{ if(!cur) return; const c=cur; cur=null; t=setTimeout(()=>c.classList.remove('pressed'),90); };  // keep the dip visible on quick taps
  document.addEventListener('touchstart',down,{passive:true});
  document.addEventListener('touchend',up,{passive:true});
  document.addEventListener('touchcancel',()=>{ if(cur){ cur.classList.remove('pressed'); cur=null; } },{passive:true});  // turned into a scroll
  addEventListener('scroll',()=>{ if(cur){ cur.classList.remove('pressed'); cur=null; } },{passive:true});
})();
