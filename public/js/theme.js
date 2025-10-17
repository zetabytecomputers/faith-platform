(function () {
  const KEY = 'sl-theme';
  const apply = (t) => document.documentElement.setAttribute('data-theme', t);
  const saved = localStorage.getItem(KEY) || 'light';
  apply(saved);
  window.__toggleTheme = function () {
    const next = (document.documentElement.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
    apply(next);
    localStorage.setItem(KEY, next);
  };
})();
