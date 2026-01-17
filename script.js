// script.js — controls theme, mobile drawer, portfolio filters, smooth scroll, and testimonial slider
(() => {
  'use strict';

  // Helpers
  const $ = selector => document.querySelector(selector);
  const $$ = selector => Array.from(document.querySelectorAll(selector));

  // THEME
  const root = document.documentElement;
  const themeToggle = $('#theme-toggle');
  const THEME_KEY = 'waamara:theme';

  function applyTheme(theme) {
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    // Update icon
    if (theme === 'light') {
      themeToggle.innerHTML = '<i class="fa-regular fa-sun"></i>';
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      themeToggle.innerHTML = '<i class="fa-regular fa-moon"></i>';
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) { applyTheme(saved); return; }
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.hasAttribute('data-theme') ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // MOBILE DRAWER
  const mobileToggle = $('#mobile-toggle');
  const mobileDrawer = $('#mobile-drawer');
  const mobileClose = $('#mobile-close');

  function openDrawer() {
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeDrawer();
    });
  }

  // SMOOTH SCROLL for anchor links
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href === '#' || href === '#0') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      closeDrawer();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    }
  });

  // PORTFOLIO FILTER
  const filterButtons = $$('.filter-btn');
  const portfolioItems = $$('.portfolio-item');

  function setActiveFilter(button) {
    filterButtons.forEach(b => {
      b.classList.toggle('active', b === button);
      b.setAttribute('aria-pressed', b === button ? 'true' : 'false');
    });
  }

  function filterPortfolio(category) {
    portfolioItems.forEach(item => {
      const cat = item.getAttribute('data-category') || '';
      if (category === 'all' || category === cat) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter || 'all';
      setActiveFilter(btn);
      filterPortfolio(cat);
    });
  });

  // TESTIMONIAL SLIDER
  const slider = document.querySelector('.testimonial-slider');
  const slidesContainer = $('#testimonial-slides');
  const slides = slidesContainer ? $$('.slide') : [];
  const prevBtn = $('#prev-slide');
  const nextBtn = $('#next-slide');
  const dotsWrap = $('#slider-dots');
  let activeIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 5000;

  function renderSlides() {
    // position via transform on slides container
    slidesContainer.style.transform = `translateX(-${activeIndex * 100}%)`;
    Array.from(dotsWrap.children).forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
  }

  function goTo(n) {
    activeIndex = (n + slides.length) % slides.length;
    renderSlides();
  }

  function next() { goTo(activeIndex + 1); }
  function prev() { goTo(activeIndex - 1); }

  function buildDots() {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const btn = document.createElement('button');
      btn.className = 'dot';
      btn.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      btn.addEventListener('click', () => {
        goTo(i);
        resetAutoplay();
      });
      dotsWrap.appendChild(btn);
    });
  }

  function startAutoplay() {
    if (!slider || slider.dataset.autoplay !== 'true') return;
    stopAutoplay();
    autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
  }
  function stopAutoplay() { if (autoplayTimer) clearInterval(autoplayTimer); autoplayTimer = null; }
  function resetAutoplay() { stopAutoplay(); startAutoplay(); }

  if (slides.length > 0) {
    buildDots();
    renderSlides();
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

    // Pause on hover/focus
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);

    // Keyboard control
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });

    startAutoplay();
  }

  // Year in footer
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initialize
  loadTheme();

  // Perf: lazy load images if browser supports IntersectionObserver
  if ('IntersectionObserver' in window) {
    const imgs = $$('img[loading="lazy"]');
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        // if using data-src pattern, swap here. For now, just mark as observed.
        obs.unobserve(img);
      });
    }, { rootMargin: '200px 0px' });
    imgs.forEach(img => io.observe(img));
  }

})();