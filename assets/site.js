(function () {
  'use strict';
  const menu = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav-links');
  const toggle = document.getElementById('lang-toggle');
  const nodes = Array.from(document.querySelectorAll('[data-en]'));
  const chinese = new Map(nodes.map(node => [node, node.innerHTML]));
  const description = document.querySelector('meta[data-en-content]');
  const chineseDescription = description && description.content;
  let language = 'zh';

  function closeMenu() {
    if (nav) nav.classList.remove('open');
    if (menu) menu.setAttribute('aria-expanded', 'false');
  }

  function setLanguage(value) {
    language = value === 'en' ? 'en' : 'zh';
    nodes.forEach(node => {
      node.innerHTML = language === 'en' ? node.dataset.en : chinese.get(node);
    });
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    if (description) description.content = language === 'en' ? description.dataset.enContent : chineseDescription;
    if (toggle) {
      toggle.textContent = language === 'en' ? '中文' : 'EN';
      toggle.setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
      toggle.title = toggle.getAttribute('aria-label');
    }
    if (menu) menu.setAttribute('aria-label', language === 'en' ? 'Toggle navigation' : '展开或收起导航');
    try { localStorage.setItem('dig-language', language); } catch (error) {}
  }

  let initial = 'zh';
  try {
    const query = new URLSearchParams(location.search).get('lang');
    initial = query === 'en' || query === 'zh' ? query : localStorage.getItem('dig-language') || 'zh';
  } catch (error) {}
  setLanguage(initial);
  if (toggle) toggle.addEventListener('click', () => setLanguage(language === 'zh' ? 'en' : 'zh'));
  if (menu && nav) menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  if (nav) nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    if ((anchor.getAttribute('href') || '').split('#')[0].toLowerCase() === path) {
      anchor.classList.add('active');
      anchor.setAttribute('aria-current', 'page');
    }
  });
})();
