/* ============================================================
   FROM CIVIC LEARNING TO CIVIC POWER — Network Delaware
   main.js — Revised 2026
============================================================ */
(function () {
  'use strict';

  const NAV_HTML = `
    <a href="#main" class="skip-link">Skip to main content</a>
    <nav id="site-nav" role="navigation" aria-label="Main navigation">
      <div class="nav-inner">
        <a href="index.html" class="nav-brand" aria-label="From Civic Learning to Civic Power — Home">
          <span class="nav-brand-top">Network Delaware</span>
          <span class="nav-brand-main">Civic Power</span>
        </a>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
        <ul id="nav-menu" class="nav-links" role="list">
          <li><a href="index.html">Home</a></li>
          <li><a href="framework.html">Framework</a></li>
          <li><a href="communities.html">Communities</a></li>
          <li><a href="program.html">The Program</a></li>
          <li><a href="resources.html">Resources</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="program.html#contact" class="nav-cta">Partner With Us</a></li>
        </ul>
      </div>
    </nav>
  `;

  const FOOTER_HTML = `
    <footer id="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <h3>FROM CIVIC<br>LEARNING TO<br>CIVIC POWER</h3>
            <p>A statewide civic education initiative building the infrastructure that makes equitable civic engagement the default condition in Delaware, not the exception.</p>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="framework.html">The Framework</a></li>
              <li><a href="communities.html">Communities</a></li>
              <li><a href="program.html">The Program</a></li>
              <li><a href="resources.html">Resources</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="resources.html">Research Library</a></li>
              <li><a href="resources.html#toolkits">Resources &amp; Deliverables</a></li>
              <li><a href="about.html">About the Fellowship</a></li>
              <li><a href="program.html#contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>&copy; 2026 Network Delaware &middot; From Civic Learning to Civic Power</span>
          <span>Research Fellows &middot; Nathan Sanchez &amp; Constanza Perez</span>
        </div>
      </div>
    </footer>
  `;

  function injectNav() {
    const p = document.getElementById('nav-placeholder');
    if (p) p.outerHTML = NAV_HTML;
  }

  function injectFooter() {
    const p = document.getElementById('footer-placeholder');
    if (p) p.outerHTML = FOOTER_HTML;
  }

  function setActiveNavLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  function initHamburger() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('open', !open);
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('#site-nav')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });
  }

  function initAccordion() {
    document.querySelectorAll('.accordion-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        const panel = item.querySelector('.accordion-panel');
        const open = btn.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.accordion-item').forEach(i => {
          i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          i.querySelector('.accordion-panel').hidden = true;
        });
        if (!open) {
          btn.setAttribute('aria-expanded', 'true');
          panel.hidden = false;
        }
      });
    });
    document.querySelectorAll('.accordion-panel').forEach(p => { p.hidden = true; });
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left');
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    els.forEach(el => io.observe(el));
  }

  function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(track => {
      track.parentElement.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
      track.parentElement.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
    });
  }

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

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const dur = 1600;
        const start = performance.now();
        const isInt = Number.isInteger(target);
        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = target * eased;
          el.textContent = prefix + (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => io.observe(el));
  }

  function initTabs() {
    document.querySelectorAll('[role="tablist"]').forEach(tablist => {
      const tabs = tablist.querySelectorAll('[role="tab"]');
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => {
            t.setAttribute('aria-selected', 'false');
            t.classList.remove('active');
            const panel = document.getElementById(t.getAttribute('aria-controls'));
            if (panel) panel.setAttribute('hidden', '');
          });
          tab.setAttribute('aria-selected', 'true');
          tab.classList.add('active');
          const panel = document.getElementById(tab.getAttribute('aria-controls'));
          if (panel) panel.removeAttribute('hidden');
        });
      });
    });
  }

  function init() {
    injectNav();
    injectFooter();
    setActiveNavLink();
    initHamburger();
    initAccordion();
    initReveal();
    initMarquee();
    initSmoothScroll();
    initCounters();
    initTabs();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
