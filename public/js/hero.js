(function(){
  function rotator(root, intervalMs){
    const slides = [...root.querySelectorAll('.hero-slide')];
    const dots   = [...root.querySelectorAll('.hero-dot')];
    let i = 0, t;
    const show = (n)=>{
      i = (n+slides.length)%slides.length;
      slides.forEach((s,idx)=> s.classList.toggle('active', idx===i));
      dots.forEach((d,idx)=> d.classList.toggle('active', idx===i));
    };
    const next = ()=> show(i+1);
    dots.forEach((d,idx)=> d.addEventListener('click', ()=>{ show(idx); restart(); }));
    function restart(){ clearInterval(t); t = setInterval(next, intervalMs); }
    show(0); t = setInterval(next, intervalMs);
  }
  window.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.hero-rotator').forEach(el=> rotator(el, 6000));
  });
})();
