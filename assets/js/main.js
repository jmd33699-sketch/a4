/**
 * EVERYDAY LINER - Ergonomic Knitwear & Performance Sock Engineering
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Toggle
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  function openDrawer() {
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeSearch();
    }
  });

  // 2. Search Modal
  const searchBtns = document.querySelectorAll('.btn-search, .mobile-search-trigger');
  const searchModal = document.querySelector('.search-modal');
  const searchClose = document.querySelector('.search-dialog-close');
  const searchInput = document.querySelector('.search-input');

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('active');
      setTimeout(() => { if (searchInput) searchInput.focus(); }, 100);
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  searchBtns.forEach(btn => btn.addEventListener('click', openSearch));
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // 3. FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        accordionItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Reading Progress Bar (for monographs)
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // 5. Back to Top Button
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Interactive Fit Guide / Sizing Form Simulation
  const fitForm = document.querySelector('#liner-fit-form');
  if (fitForm) {
    fitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.querySelector('#form-status');
      if (feedback) {
        feedback.innerHTML = '<div style="padding: 1rem; background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; border-radius: 4px; font-weight: 600; margin-top: 1rem;">Thank you! Your custom sock fit consultation profile has been recorded. Our textile team will dispatch recommended liner sizing within 24 hours.</div>';
      }
      fitForm.reset();
    });
  }
});
