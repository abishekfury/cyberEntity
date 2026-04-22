/* ============================================================
   PORTFOLIO DETAIL PAGE — ANIMATIONS & INTERACTIONS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== PRELOADER ===== */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    document.body.classList.add('no-scroll');

    // Stagger letter animation already handled by CSS
    setTimeout(() => {
      preloader.classList.add('loaded');
      document.body.classList.remove('no-scroll');
      initHeroReveal();
    }, 1600);
  }

  /* ===== LENIS SMOOTH SCROLL ===== */
  let lenis;
  function initSmoothScroll() {
    if (prefersReducedMotion) return;
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
    });
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });
    lenis.on('scroll', ScrollTrigger.update);
  }

  /* ===== SCROLL PROGRESS ===== */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    function update() {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      bar.style.width = Math.min(progress, 100) + '%';
    }
    if (lenis) lenis.on('scroll', update);
    else window.addEventListener('scroll', update, { passive: true });
  }

  /* ===== NAVBAR ===== */
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ===== HERO REVEAL ===== */
  function initHeroReveal() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.portfolio-hero-title-line, .portfolio-hero-label, .portfolio-hero-meta').forEach(el => {
        el.style.transform = 'none';
        el.style.opacity = '1';
      });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.to('.portfolio-hero-title-line', {
      y: 0,
      duration: 1.1,
      stagger: 0.12,
      delay: 0.1,
    })
    .to('.portfolio-hero-label', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.6')
    .to('.portfolio-hero-meta', {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.5');
  }

  /* ===== HERO PARALLAX ===== */
  function initHeroParallax() {
    if (prefersReducedMotion) return;
    const heroImg = document.querySelector('.portfolio-hero-bg img');
    if (!heroImg) return;
    gsap.to(heroImg, {
      yPercent: 25,
      ease: 'none',
      scrollTrigger: {
        trigger: '.portfolio-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      }
    });
  }

  /* ===== PROJECT INFO BAR ===== */
  function initInfoBar() {
    const items = document.querySelectorAll('.project-info-item');
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.project-info-bar',
        start: 'top 85%',
      }
    });
  }

  /* ===== OVERVIEW SECTION ===== */
  function initOverview() {
    const num = document.querySelector('.project-section-num');
    const title = document.querySelector('.project-section-title');
    const right = document.querySelector('.project-overview-right');

    if (num) {
      gsap.to(num, {
        opacity: 1, x: 0, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: num, start: 'top 85%' }
      });
    }
    if (title) {
      gsap.to(title, {
        opacity: 1, y: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: title, start: 'top 85%' }
      });
    }
    if (right) {
      gsap.to(right, {
        opacity: 1, y: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: right, start: 'top 80%' }
      });
    }
  }

  /* ===== FULL WIDTH IMAGE PARALLAX ===== */
  function initFullImageParallax() {
    if (prefersReducedMotion) return;
    document.querySelectorAll('.project-full-image, .project-split-image').forEach(container => {
      const img = container.querySelector('img');
      if (!img) return;
      gsap.to(img, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      });
    });
  }

  /* ===== SPLIT SECTION ===== */
  function initSplitSection() {
    const splitTitle = document.querySelector('.project-split-content-title');
    const splitText = document.querySelector('.project-split-content-text');
    const splitList = document.querySelector('.project-split-content-list');

    [splitTitle, splitText, splitList].forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
        delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  }

  /* ===== GALLERY ===== */
  function initGallery() {
    const items = document.querySelectorAll('.project-gallery-item');
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.project-gallery-grid',
        start: 'top 85%',
      }
    });
  }

  /* ===== RESULTS ===== */
  function initResults() {
    const items = document.querySelectorAll('.project-result-item');
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.project-results',
        start: 'top 80%',
      }
    });
  }

  /* ===== OTHER WORK REVEALS ===== */
  function initOtherWork() {
    const items = document.querySelectorAll('.other-work-item');
    if (!items.length) return;
    gsap.from(items, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '.other-work-list',
        start: 'top 85%',
      }
    });
  }

  /* ===== PORTFOLIO FOOTER CLOCKS ===== */
  function initFooterClocks() {
    const clockEls = document.querySelectorAll('.portfolio-footer-clock-time');
    if (!clockEls.length) return;
    function updateClocks() {
      clockEls.forEach(el => {
        const tz = el.getAttribute('data-tz');
        if (!tz) return;
        try {
          el.textContent = new Date().toLocaleTimeString('en-US', {
            timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
          });
        } catch(e) { el.textContent = '--:--'; }
      });
    }
    updateClocks();
    setInterval(updateClocks, 1000);
  }

  /* ===== HORIZONTAL MARQUEE TAG SCROLL ===== */
  function initTagsHover() {
    document.querySelectorAll('.project-tag').forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        gsap.to(tag, { scale: 1.05, duration: 0.3, ease: 'expo.out' });
      });
      tag.addEventListener('mouseleave', () => {
        gsap.to(tag, { scale: 1, duration: 0.3, ease: 'expo.out' });
      });
    });
  }

  /* ===== CURSOR DOT (desktop) ===== */
  function initCursorDot() {
    if (window.innerWidth < 768) return;
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed; width: 8px; height: 8px; border-radius: 50%;
      background: var(--red, #ff4500); pointer-events: none; z-index: 9999;
      transform: translate(-50%, -50%); transition: transform 0.15s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
      mix-blend-mode: difference;
    `;
    document.body.appendChild(dot);
    let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;
    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    gsap.ticker.add(() => {
      dotX += (mouseX - dotX) * 0.18;
      dotY += (mouseY - dotY) * 0.18;
      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';
    });
    document.querySelectorAll('a, button, .next-project').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.style.width = '30px'; dot.style.height = '30px'; dot.style.opacity = '0.6'; });
      el.addEventListener('mouseleave', () => { dot.style.width = '8px'; dot.style.height = '8px'; dot.style.opacity = '1'; });
    });
  }

  /* ===== PAGE TRANSITION OUT ===== */
  function initPageTransitions() {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto') || href.startsWith('http')) return;

      link.addEventListener('click', e => {
        e.preventDefault();
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed; inset: 0; background: #000; z-index: 99999;
          opacity: 0; pointer-events: none;
        `;
        document.body.appendChild(overlay);
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.45,
          ease: 'expo.in',
          onComplete: () => { window.location.href = href; }
        });
      });
    });
  }

  /* ===== INIT ALL ===== */
  initSmoothScroll();
  initScrollProgress();
  initNavbar();
  initPreloader();
  initHeroParallax();
  initInfoBar();
  initOverview();
  initFullImageParallax();
  initSplitSection();
  initGallery();
  initResults();
  initOtherWork();
  initFooterClocks();
  initTagsHover();
  initCursorDot();
  initPageTransitions();

  ScrollTrigger.refresh();

  // Refresh on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
  });

  // Cleanup
  window.addEventListener('beforeunload', () => { if (lenis) lenis.destroy(); });
});
