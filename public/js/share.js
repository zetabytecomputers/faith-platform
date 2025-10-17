document.addEventListener('click', async (e)=>{
  const el = e.target.closest('[data-copy-link]');
  if (!el) return;
  try {
    await navigator.clipboard.writeText(location.href);
    el.textContent = 'Copied!';
    setTimeout(()=> el.textContent = 'Copy Link', 1200);
  } catch {}
});
