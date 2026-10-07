/* Liquid glass menubar: WebGL refraction of a repainted copy of the page behind the bar.
   Elements marked data-mirror="media|text|box" are repainted. Falls back to CSS blur. */
(() => {
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DPR = Math.min(window.devicePixelRatio || 1, 2);
/* ---------------- Glass settings (fixed) ---------------- */
const S={refract:26,bevel:20,blur:.6,ca:.35,zoom:1.07}; // stronger lens: wider bevel, interior magnification
const bar=document.getElementById('bar');

/* ---------------- Active section + indicator target ---------------- */
const items=[...document.querySelectorAll('#items a')];
const isProject=document.body.dataset.page==='project';
let activeEl=isProject?items.find(a=>a.dataset.sec==='work')||null:null;
let lockUntil=0;
items.forEach(a=>a.addEventListener('click',()=>{ activeEl=a; lockUntil=performance.now()+700; items.forEach(x=>x.classList.toggle('is-active',x===a)); }));
document.querySelector('.mark')&&document.querySelector('.mark').addEventListener('click',()=>{ activeEl=null; lockUntil=performance.now()+700; items.forEach(x=>x.classList.remove('is-active')); });
function updateActive(){
  if(isProject){ items.forEach(a=>a.classList.toggle('is-active',a===activeEl)); return; }
  if(performance.now()<lockUntil) return;
  const y = innerHeight*.35; let cur=null;
  for(const a of items){ const sec=document.getElementById(a.dataset.sec); if(sec && sec.getBoundingClientRect().top<=y) cur=a; }
  if (innerHeight+scrollY >= document.documentElement.scrollHeight-4) cur=items[items.length-1];
  if (cur!==activeEl){ activeEl=cur; }
  items.forEach(a=>a.classList.toggle('is-active',a===activeEl));
}
addEventListener('scroll',updateActive,{passive:true}); updateActive();

let mouse={x:-9999,y:-9999};
addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});

/* ---------------- WebGL glass ---------------- */
const P=64; // mirror padding in css px (must exceed refraction + frost)
const glc=document.getElementById('glass');
let gl=null;
try{ gl=glc.getContext('webgl',{premultipliedAlpha:true,alpha:true,antialias:false}); }catch(e){}
const VS=`attribute vec2 a;varying vec2 vUv;void main(){vUv=a*.5+.5;gl_Position=vec4(a,0.,1.);}`;
const FS=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uTex;uniform vec2 uSize;uniform float uPad,uRadius,uRefract,uBevel,uBlur,uCA,uDark,uIndOn;
uniform float uZoom;uniform vec4 uInd;uniform vec2 uMouse;varying vec2 vUv;
float sdRB(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
vec2 grad(vec2 p,vec2 b,float r){vec2 e=vec2(.5,0.);return normalize(vec2(sdRB(p+e.xy,b,r)-sdRB(p-e.xy,b,r),sdRB(p+e.yx,b,r)-sdRB(p-e.yx,b,r))+1e-6);}
vec2 toUV(vec2 p){return (p+uSize*.5+uPad)/(uSize+2.*uPad);}
vec4 frost(vec2 p){vec4 acc=vec4(0.);for(int i=0;i<10;i++){float fi=float(i);float a=fi*2.39996;float rr=sqrt((fi+.5)/10.)*uBlur;vec4 t=texture2D(uTex,toUV(p+vec2(cos(a),sin(a))*rr));acc+=vec4(t.rgb*t.a,t.a);}return acc/10.;}
vec4 refr(vec2 p,vec2 off){vec4 r=frost(p+off*(1.-uCA)),g=frost(p+off),b=frost(p+off*(1.+uCA));return vec4(r.r,g.g,b.b,g.a);}
void main(){
  vec2 p=vec2(vUv.x,1.-vUv.y)*uSize-uSize*.5;
  vec2 hb=uSize*.5;float r=min(uRadius,min(hb.x,hb.y));
  float d=sdRB(p,hb,r);vec2 n=grad(p,hb,r);
  float inside=clamp(-d/uBevel,0.,1.);float e=1.-inside;float bend=1.-sqrt(max(1.-e*e,0.)); // circular lens profile
  vec4 smp=refr(p/uZoom,n*bend*uRefract);
  float cov=smp.a; vec3 col=smp.rgb/max(cov,1e-3);
  vec4 tint=mix(vec4(1.,1.,1.,.14),vec4(.04,.04,.06,.08),uDark);
  col=mix(col,tint.rgb,tint.a);
  float l=dot(col,vec3(.299,.587,.114));col=mix(vec3(l),col,1.22);
  vec2 L=normalize(vec2(-.5,-1.));
  float rim=1.-smoothstep(0.,1.6,-d);
  float spec=pow(max(dot(n,L),0.),1.5);float spec2=pow(max(dot(n,-L),0.),3.)*.45;
  vec2 md=uMouse-p;float mh=pow(max(dot(n,normalize(md+1e-4)),0.),4.)*exp(-length(md)/160.);
  float h=rim*(.55*spec+spec2+.7*mh)+(1.-inside)*.05*(spec+.3)+.05*smoothstep(hb.y,-hb.y,p.y);
  col+=h;
  float a=1.-smoothstep(-.75,.75,d);
  // where nothing could be repainted (iframes, local files) let the CSS backdrop blur show, keep the rim light
  float hh=clamp(h,0.,1.);
  vec3 rgb=clamp(col,0.,1.)*cov*a+vec3(1.)*hh*(1.-cov)*a;
  float al=a*(cov+hh*(1.-cov));
  if(uIndOn>.001){
    vec2 c=uInd.xy;vec2 ib=uInd.zw*.5;
    float pm=(1.-smoothstep(-.75,.75,sdRB(p-c,ib,min(ib.x,ib.y))))*uIndOn*.86*a;
    rgb=rgb*(1.-pm)+vec3(pm); al=al*(1.-pm)+pm;
  }
  gl_FragColor=vec4(rgb,al);
}`;
let prog,U={},tex;
function initGL(){
  const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(o));return o;};
  prog=gl.createProgram();gl.attachShader(prog,sh(gl.VERTEX_SHADER,VS));gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(prog);
  if(!gl.getProgramParameter(prog,gl.LINK_STATUS)) throw new Error('link');
  gl.useProgram(prog);
  const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(prog,'a');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  ['uTex','uSize','uPad','uRadius','uRefract','uBevel','uBlur','uCA','uDark','uIndOn','uInd','uMouse','uZoom'].forEach(k=>U[k]=gl.getUniformLocation(prog,k));
  tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
  gl.uniform1i(U.uTex,0);
}
try{ if(gl) initGL(); }catch(e){ console.warn(e); gl=null; }
if(!gl){ bar.classList.add('no-gl'); glc.hidden=true; }

/* Mirror: repaint the page region behind the bar into a canvas the shader can sample. */
const mirror=document.createElement('canvas'), mctx=mirror.getContext('2d');
const probe=document.createElement('canvas'); probe.width=16; probe.height=4; const pctx=probe.getContext('2d',{willReadFrequently:true});
const IS_FILE=location.protocol==='file:';
// a cross-origin image/video loaded without CORS would taint the canvas: let the CSS blur show it instead
const xorigin=el=>{ const u=el.currentSrc||el.src; if(!u||el.crossOrigin!=null) return false; try{ return new URL(u,location.href).origin!==location.origin; }catch(e){ return true; } };
let cache=[];
const docOrder=(a,b)=>a===b?0:(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1;
function collect(ox,oy,W,H){
  const set=new Set(), step=22;
  for(let y=Math.max(1,oy+4);y<Math.min(innerHeight,oy+H);y+=step)
    for(let x=Math.max(1,ox+4);x<Math.min(innerWidth,ox+W);x+=step)
      for(const el of document.elementsFromPoint(x,y)){ if(el===document.documentElement||el===document.body||bar.contains(el)) continue; set.add(el); }
  for(const el of document.querySelectorAll('[data-mirror]')) set.add(el);
  return [...set].sort(docOrder);
}
const transparent=c=>!c||c==='transparent'||/rgba\(0, 0, 0, 0\)|\/ 0\)$/.test(c);
function hole(b){ mctx.save(); mctx.globalCompositeOperation='destination-out'; mctx.fillRect(b.left,b.top,b.width,b.height); mctx.restore(); }
function cover(el,sw,sh,b){ const sc=Math.max(b.width/sw,b.height/sh), dw=sw*sc, dh=sh*sc;
  mctx.save(); mctx.beginPath(); mctx.rect(b.left,b.top,b.width,b.height); mctx.clip();
  try{ mctx.drawImage(el,b.left+(b.width-dw)/2,b.top+(b.height-dh)/2,dw,dh); }catch(e){} mctx.restore(); }
const wordCache=new WeakMap(), rng=document.createRange();
function drawText(node,cs,oy,H){
  const txt=node.textContent; let w=wordCache.get(node);
  if(!w||w.txt!==txt){ const s=[],e=[],re=/\S+/g; let m; while(m=re.exec(txt)){ s.push(m.index); e.push(m.index+m[0].length); } w={txt,s,e}; wordCache.set(node,w); }
  const n=w.s.length; if(!n) return;
  const rect=i=>{ rng.setStart(node,w.s[i]); rng.setEnd(node,w.e[i]); return rng.getBoundingClientRect(); };
  let lo=0,hi=n-1; while(lo<hi){ const mid=(lo+hi)>>1; if(rect(mid).bottom<oy) lo=mid+1; else hi=mid; }
  mctx.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  if('letterSpacing' in mctx) mctx.letterSpacing=cs.letterSpacing==='normal'?'0px':cs.letterSpacing;
  mctx.fillStyle=cs.color; mctx.textBaseline='middle';
  const up=cs.textTransform==='uppercase';
  for(let i=lo;i<n;i++){ const r=rect(i); if(r.top>oy+H) break; if(!r.width) continue;
    const t=txt.slice(w.s[i],w.e[i]); mctx.fillText(up?t.toUpperCase():t,r.left,r.top+r.height/2); }
}
function drawMirror(r){
  const W=r.width+2*P, H=r.height+2*P, s=DPR;
  const pw=Math.round(W*s), ph=Math.round(H*s);
  if(mirror.width!==pw||mirror.height!==ph){mirror.width=pw;mirror.height=ph;}
  const ox=r.left-P, oy=r.top-P;
  if(frameN%3===0||!cache.length) cache=collect(ox,oy,W,H);
  mctx.setTransform(s,0,0,s,-ox*s,-oy*s);
  mctx.globalAlpha=1; mctx.fillStyle=getComputedStyle(document.body).backgroundColor; mctx.fillRect(ox,oy,W,H);
  for(const el of cache){
    if(!el.isConnected) continue;
    const b=el.getBoundingClientRect();
    if(!b.width||!b.height||b.right<ox||b.left>ox+W||b.bottom<oy||b.top>oy+H) continue;
    const cs=getComputedStyle(el);
    if(cs.visibility==='hidden'||cs.display==='none') continue;
    mctx.globalAlpha=parseFloat(cs.opacity)||0; if(!mctx.globalAlpha) continue;
    if(!transparent(cs.backgroundColor)){ mctx.fillStyle=cs.backgroundColor; mctx.fillRect(b.left,b.top,b.width,b.height); }
    const tag=el.tagName;
    if(tag==='IFRAME') hole(b);
    else if(tag==='IMG'){ if(IS_FILE||xorigin(el)) hole(b); else if(el.complete&&el.naturalWidth) cover(el,el.naturalWidth,el.naturalHeight,b); }
    else if(tag==='VIDEO'){ if(IS_FILE||xorigin(el)) hole(b); else if(el.readyState>=2&&el.videoWidth) cover(el,el.videoWidth,el.videoHeight,b); }
    else if(tag==='CANVAS'){ if(el.width) mctx.drawImage(el,b.left,b.top,b.width,b.height); }
    for(const c of el.childNodes) if(c.nodeType===3&&c.textContent.trim()) drawText(c,cs,oy,H);
  }
  mctx.globalAlpha=1;
}
function sampleTone(){
  pctx.drawImage(mirror,P*DPR,P*DPR,mirror.width-2*P*DPR,mirror.height-2*P*DPR,0,0,16,4);
  const d=pctx.getImageData(0,0,16,4).data; let l=0;
  for(let i=0;i<d.length;i+=4) l+=(.299*d[i]+.587*d[i+1]+.114*d[i+2])/255;
  return l/(d.length/4);
}

/* Indicator spring */
const ind={x:0,w:0,vx:0,vw:0,on:0,init:false};
let dark=1, frameN=0, lastTone='dark';

function renderGlass(dt){
  const r=bar.getBoundingClientRect();
  const w=Math.round(r.width*DPR), h=Math.round(r.height*DPR);
  if(glc.width!==w||glc.height!==h){glc.width=w;glc.height=h;}
  drawMirror(r);
  if(frameN%6===0){ let lum=.3; try{ lum=sampleTone(); }catch(e){} const tone=lum<.55?'dark':'light'; if(tone!==lastTone){lastTone=tone;bar.dataset.tone=tone;} }
  dark+=((lastTone==='dark'?1:0)-dark)*Math.min(1,dt*6);

  const target=activeEl;
  if(target){
    const tr=target.getBoundingClientRect();
    const tx=tr.left+tr.width/2-(r.left+r.width/2), tw=tr.width;
    if(!ind.init||reduce||ind.on<.02){ind.x=tx;ind.w=tw;ind.vx=ind.vw=0;ind.init=true;}
    else{ const k=320,c=24; ind.vx+=(k*(tx-ind.x)-c*ind.vx)*dt; ind.x+=ind.vx*dt; ind.vw+=(k*(tw-ind.w)-c*ind.vw)*dt; ind.w+=ind.vw*dt; }
  }
  ind.on+=((target?1:0)-ind.on)*Math.min(1,dt*(reduce?60:7));
  const bc=r.left+r.width/2;
  for(const a of items){ const ir=a.getBoundingClientRect(); a.classList.toggle('on-pill', ind.on>.5 && Math.abs(ind.x-(ir.left+ir.width/2-bc))<ir.width*.35); }
  const sp=Math.abs(ind.vx), iw=ind.w+Math.min(sp*.05,44), ih=(r.height-10)*(1-Math.min(sp*.0004,.14));

  gl.viewport(0,0,w,h);
  gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);
  try{ gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,mirror); }
  catch(e){ console.warn('Glass fallback:',e); gl=null; bar.classList.add('no-gl'); glc.hidden=true; return; }
  gl.uniform2f(U.uSize,r.width,r.height);gl.uniform1f(U.uPad,P);gl.uniform1f(U.uRadius,r.height/2);
  gl.uniform1f(U.uRefract,S.refract);gl.uniform1f(U.uBevel,S.bevel);gl.uniform1f(U.uBlur,S.blur);gl.uniform1f(U.uCA,S.ca);gl.uniform1f(U.uZoom,S.zoom);
  gl.uniform1f(U.uDark,dark);gl.uniform1f(U.uIndOn,ind.on);gl.uniform4f(U.uInd,ind.x,0,iw,ih);
  gl.uniform2f(U.uMouse,mouse.x-(r.left+r.width/2),mouse.y-(r.top+r.height/2));
  gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
}
let last=performance.now();
function frame(now){
  const dt=Math.min(.05,(now-last)/1000); last=now; frameN++;
  if(gl) renderGlass(dt);
  requestAnimationFrame(frame);
}
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>requestAnimationFrame(frame));
})();
