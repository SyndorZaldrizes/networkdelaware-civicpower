/* ============================================================
   FROM CIVIC LEARNING TO CIVIC POWER — Network Delaware
   Universal JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ── NAV HTML ───────────────────────────────────────────── */
  const NAV_HTML = `
    <a href="#main" class="skip-link">Skip to main content</a>
    <nav id="site-nav" role="navigation" aria-label="Main navigation">
      <div class="nav-inner">
        <a href="index.html" class="nav-brand" aria-label="Network Delaware — From Civic Learning to Civic Power home">
          <span class="nav-brand-top">Network Delaware</span>
          <span class="nav-brand-main">Civic Power</span>
        </a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <ul id="nav-menu" class="nav-links" role="list">
          <li><a href="index.html">Home</a></li>
          <li><a href="learn.html">Learn</a></li>
          <li><a href="framework.html">Framework</a></li>
          <li><a href="communities.html">Communities</a></li>
          <li><a href="resources.html">Resources</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="#act" class="nav-cta">Take Action</a></li>
        </ul>
      </div>
    </nav>
    <div class="age-bar" id="age-bar" role="toolbar" aria-label="Select reading level">
      <span class="age-bar-label">Reading level:</span>
      <button class="age-btn" data-mode="kids" aria-pressed="false">🧒 Kids</button>
      <button class="age-btn" data-mode="teen" aria-pressed="false">📚 Teens</button>
      <button class="age-btn active" data-mode="adult" aria-pressed="true">🎓 Adults</button>
    </div>
  `;

  /* ── FOOTER HTML ─────────────────────────────────────────── */
  const FOOTER_HTML = `
    <footer id="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3>From Civic Learning<br>to Civic Power</h3>
            <p>A statewide civic education initiative building the infrastructure that makes equitable civic engagement the default condition in Delaware — not the exception.</p>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="learn.html">Start Learning</a></li>
              <li><a href="framework.html">The Framework</a></li>
              <li><a href="communities.html">Priority Communities</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="resources.html">Research Library</a></li>
              <li><a href="resources.html#toolkits">Toolkits</a></li>
              <li><a href="resources.html#workshops">Workshop Guides</a></li>
              <li><a href="about.html">About the Fellowship</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2025 Network Delaware · From Civic Learning to Civic Power</span>
          <span>Research Fellowship · Nathan Sanchez</span>
        </div>
      </div>
    </footer>
  `;

  /* ── INJECT NAV + FOOTER ─────────────────────────────────── */
  function injectNav() {
    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
      placeholder.outerHTML = NAV_HTML;
    }
  }

  function injectFooter() {
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
      placeholder.outerHTML = FOOTER_HTML;
    }
  }

  /* ── SET ACTIVE NAV LINK ─────────────────────────────────── */
  function setActiveNavLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ── HAMBURGER TOGGLE ────────────────────────────────────── */
  function initHamburger() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !open);
      menu.classList.toggle('open', !open);
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('#site-nav')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
  }

  /* ── AGE MODE ────────────────────────────────────────────── */
  function initAgeMode() {
    const saved = localStorage.getItem('civicpower-agemode') || 'adult';
    applyAgeMode(saved, false);

    document.querySelectorAll('.age-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        applyAgeMode(btn.dataset.mode, true);
      });
    });
  }

  function applyAgeMode(mode, save) {
    document.body.classList.remove('mode-kids', 'mode-teen', 'mode-adult');
    document.body.classList.add('mode-' + mode);
    document.querySelectorAll('.age-btn').forEach(b => {
      const active = b.dataset.mode === mode;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active);
    });
    if (save) localStorage.setItem('civicpower-agemode', mode);
  }

  /* ── SCROLL REVEAL ───────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    els.forEach(el => io.observe(el));
  }

  /* ── ACCORDION ───────────────────────────────────────────── */
  function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const target = document.getElementById(trigger.dataset.accordion);
        if (!target) return;
        const open = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', !open);
        target.hidden = open;
        trigger.querySelector('.accordion-arrow')?.classList.toggle('open', !open);
      });
    });
  }

  /* ── TABS ─────────────────────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('[role="tablist"]').forEach(tablist => {
      const tabs = tablist.querySelectorAll('[role="tab"]');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => {
            t.setAttribute('aria-selected', 'false');
            document.getElementById(t.getAttribute('aria-controls'))?.setAttribute('hidden', '');
          });
          tab.setAttribute('aria-selected', 'true');
          document.getElementById(tab.getAttribute('aria-controls'))?.removeAttribute('hidden');
        });
      });
    });
  }

  /* ── SMOOTH SCROLL FOR IN-PAGE ANCHORS ───────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ── MARQUEE PAUSE ON HOVER ──────────────────────────────── */
  function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(track => {
      track.parentElement.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
      });
      track.parentElement.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
      });
    });
  }

  /* ── INIT ALL ────────────────────────────────────────────── */
  function init() {
    injectNav();
    injectFooter();
    setActiveNavLink();
    initHamburger();
    initAgeMode();
    initReveal();
    initAccordions();
    initTabs();
    initSmoothScroll();
    initMarquee();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
