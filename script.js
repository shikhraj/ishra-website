// ===============================
//  Minimal Interactions
//  - Smooth scrolling for nav links
//  - Modal open/close for tiles with data-modal
//  - ESC to close modal
// ===============================
const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('#modal-body');
const closeBtns = document.querySelectorAll('.modal-close');

// Smooth scroll for anchor links with .js-scroll
document.querySelectorAll('a.js-scroll').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Modal handler for tiles
document.querySelectorAll('.tile[data-modal="true"]').forEach(el => {
  el.addEventListener('click', () => {
    const title = el.getAttribute('data-title') || 'Details';
    const body = el.getAttribute('data-body') || '—';
    modalTitle.textContent = title;
    modalBody.innerHTML = body;
    modal.showModal();
  });
});

// Close buttons + ESC
closeBtns.forEach(btn => btn.addEventListener('click', () => modal.close()));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.open) modal.close();
});
// ===== Mobile tabs -> filter tiles by type =====
(function initMobileTabs() {
  const tabs = document.querySelectorAll('.m-tab');
  const tiles = document.querySelectorAll('.pinboard .tile');
  if (!tabs.length || !tiles.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const f = tab.dataset.filter;
      tiles.forEach(tile => {
        if (f === 'all') { tile.style.display = 'inline-block'; return; }
        // match by class: idea | meme | photo | quote | cta
        const has = tile.classList.contains(f);
        tile.style.display = has ? 'inline-block' : 'none';
      });

      // Force recalculation for CSS columns (small timeout helps)
      requestAnimationFrame(() => {
        const board = document.querySelector('.pinboard');
        if (board) { board.style.opacity = '0.99'; setTimeout(() => board.style.opacity = '1', 0); }
      });
    });
  });
})();

// Flip cards: tap/click -> flip, then auto flip back after 2s
(function(){
  document.querySelectorAll('[data-flip].flipcard').forEach(card=>{
    let t;
    card.addEventListener('click', e=>{
      if (e.target.closest('a')) return;
      card.classList.add('is-flipped');
      clearTimeout(t);
      t=setTimeout(()=>card.classList.remove('is-flipped'),2000);
    });
    card.addEventListener('keydown', e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        card.classList.add('is-flipped');
        clearTimeout(t);
        t=setTimeout(()=>card.classList.remove('is-flipped'),2000);
      }
    });
  });
})();
