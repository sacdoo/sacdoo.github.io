/* Phones/tablets: the thumbnail crossing the middle of the screen pops up its project label
   (same label as the desktop hover). While you swipe, the label swings and the card tilts a little
   with the scroll speed; when the card leaves the middle, the label shrinks away. */
(function(){
  if(matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const grid=document.getElementById('grid'); if(!grid) return;
  const sp=(k,c,x=0)=>({x,v:0,t:x,k,c});
  const step=(s,dt)=>{ s.v+=(s.k*(s.t-s.x)-s.c*s.v)*dt; s.x+=s.v*dt; return Math.abs(s.t-s.x)+Math.abs(s.v)*.02; };
  const st=new Map();                       // per card: pop scale, label swing, card tilt
  const get=c=>{ if(!st.has(c)) st.set(c,{ps:sp(520,16,.4),op:sp(300,30,0),cr:sp(110,11),rx:sp(140,14)}); return st.get(c); };
  let active=null, lastY=scrollY, lastT=0, raf=0, vel=0;
  function pick(){                          // wide "centre" zone with stickiness: keep the current card while it still spans the middle
    const top=innerHeight*.18, bot=innerHeight*.82, inBand=r=>r.top<bot&&r.bottom>top;
    if(active){ const r=active.getBoundingClientRect(); if(r.top<innerHeight*.5&&r.bottom>innerHeight*.5) return active; }
    const mid=innerHeight/2; let best=null, bd=1e9;
    for(const c of grid.querySelectorAll('a.card')){
      const r=c.getBoundingClientRect(); if(!inBand(r)) continue;
      const d=Math.abs(r.top+r.height/2-mid); if(d<bd){ best=c; bd=d; }
    }
    return best;
  }
  function frame(now){
    const dt=Math.min(.033,(now-lastT)/1000||.016); lastT=now;
    const dy=scrollY-lastY; lastY=scrollY; vel+=((dy/dt)-vel)*.3;
    const list=grid.classList.contains('as-list');
    const a=list?null:pick();
    if(a!==active) active=a;
    let e=0;
    for(const [c,s] of st){
      const on=c===active;
      s.ps.t=on?1:.4; s.op.t=on?1:0;
      s.cr.t=on&&!RM?Math.max(-4,Math.min(4,-vel*.005)):0;     // label swings against the swipe
      s.rx.t=on&&!RM?Math.max(-2,Math.min(2,vel*.0015)):0;         // card leans with the swipe
      for(const k of ['ps','op','cr','rx']) e+=step(s[k],dt);
      const cap=c.querySelector('.tilt-cap'), tilt=c.querySelector('.tilt');
      if(cap){ cap.style.opacity=Math.max(0,Math.min(1,s.op.x)).toFixed(3);
        cap.style.transform=`rotate(${s.cr.x.toFixed(2)}deg) scale(${Math.max(0,s.ps.x).toFixed(3)})`; }
      if(tilt) tilt.style.transform=Math.abs(s.rx.x)<.02?'':`perspective(900px) rotateX(${(-s.rx.x).toFixed(2)}deg)`;
    }
    if(active) get(active);
    raf=(e>.004||Math.abs(dy)>0||Math.abs(vel)>5)?requestAnimationFrame(frame):0;
    if(!raf) vel=0;
  }
  const kick=()=>{ if(!raf){ lastT=performance.now(); lastY=scrollY; raf=requestAnimationFrame(frame); } };
  grid.querySelectorAll('a.card').forEach(get);
  addEventListener('scroll',kick,{passive:true});
  addEventListener('load',kick); kick();
})();
