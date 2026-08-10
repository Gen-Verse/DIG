(function(){
  const btn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.nav-links');
  if(btn&&nav){btn.addEventListener('click',()=>nav.classList.toggle('open'))}
  const path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();
    if(href===path||(path===''&&href==='index.html'))a.classList.add('active');
  });
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>nav&&nav.classList.remove('open')));
})();
