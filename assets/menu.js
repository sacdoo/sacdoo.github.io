/* Hamburger in the glass bar: collapses the menu down to the icon and back.
   The bar's width animates (the glass canvas follows the bar each frame). State is remembered per viewer. */
(function(){
  const bar=document.getElementById('bar'), btn=bar&&bar.querySelector('.burger'), items=document.getElementById('items');
  if(!btn||!items) return;
  const measure=()=>{ const was=bar.classList.contains('is-collapsed'); items.style.transition='none'; bar.classList.remove('is-collapsed');
    items.style.setProperty('--items-w',items.scrollWidth+'px'); bar.classList.toggle('is-collapsed',was); void items.offsetWidth; items.style.transition=''; };
  const set=(collapsed,save)=>{
    bar.classList.toggle('is-collapsed',collapsed);
    btn.setAttribute('aria-expanded',String(!collapsed));
    btn.setAttribute('aria-label',collapsed?'Open menu':'Close menu');
    items.inert=collapsed;
    if(save){ try{ localStorage.setItem('menuCollapsed',collapsed?'1':'0'); }catch(e){} }
  };
  let start=false; try{ start=localStorage.getItem('menuCollapsed')==='1'; }catch(e){}
  measure();
  if(start){ items.style.transition='none'; set(true,false); void items.offsetWidth; items.style.transition=''; }
  btn.addEventListener('click',()=>{ measure(); set(!bar.classList.contains('is-collapsed'),true);
    btn.animate([{transform:'scale(1)'},{transform:'scale(.82)'},{transform:'scale(1)'}],{duration:320,easing:'cubic-bezier(.34,1.56,.64,1)'}); });
  (document.fonts&&document.fonts.ready||Promise.resolve()).then(measure);
  addEventListener('resize',measure);
})();
