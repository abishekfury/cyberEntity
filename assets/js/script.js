/* ============================================================
   BRANDIN HALL — CREATIVE DIRECTOR — PORTFOLIO JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initHeroAnimation();
  initAccordions();
  initExperienceAccordions();
  initCounterAnimation();
  initClocks();
  initFeaturedWorkHover();
  initSmoothScroll();
  initParallaxEffects();
  initWorkItemTransitions();
});

/* ===== PRELOADER ===== */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  document.body.classList.add('no-scroll');

  const totalDuration = 2200;

  setTimeout(() => {
    preloader.classList.add('loaded');
    document.body.classList.remove('no-scroll');

    // Trigger intro hero animations after preloader
    setTimeout(initIntroHeroAnimation, 300);
  }, totalDuration);
}

/* ===== INTRO HERO ANIMATION ===== */
function initIntroHeroAnimation() {
  const subtitle = document.querySelector('.intro-hero-subtitle');
  const name = document.querySelector('.intro-hero-name');
  const bottomSpans = document.querySelectorAll('.intro-hero-bottom span');
  const heroImg = document.querySelector('.intro-hero-bg img');

  if (heroImg) {
    heroImg.classList.add('loaded');
  }

  if (subtitle) {
    setTimeout(() => subtitle.classList.add('animate'), 200);
  }

  if (name) {
    setTimeout(() => name.classList.add('animate'), 450);
  }

  bottomSpans.forEach((span, i) => {
    setTimeout(() => span.classList.add('animate'), 800 + i * 150);
  });
}

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  // Close menu when clicking on links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });
}

/* ===== HERO TYPOGRAPHY ANIMATION ===== */
function initHeroAnimation() {
  const heroLines = document.querySelectorAll('.hero-line');
  if (!heroLines.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lines = entry.target.querySelectorAll('.hero-line');
        lines.forEach((line, i) => {
          setTimeout(() => {
            line.classList.add('animate');
          }, i * 130);
        });
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -80px 0px'
  });

  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    observer.observe(heroContent);
  }
}

/* ===== SCROLL REVEAL ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ===== CLIENT ACCORDIONS ===== */
function initAccordions() {
  const items = document.querySelectorAll('.accordion-item');
  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all first
      items.forEach(i => {
        i.classList.remove('active');
        const body = i.querySelector('.accordion-body');
        if (body) body.style.maxHeight = '0';
      });

      // Open clicked (if it was closed)
      if (!isActive) {
        item.classList.add('active');
        const body = item.querySelector('.accordion-body');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ===== EXPERIENCE ACCORDIONS ===== */
function initExperienceAccordions() {
  const items = document.querySelectorAll('.exp-item');
  items.forEach(item => {
    const header = item.querySelector('.exp-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(i => {
        i.classList.remove('active');
        const body = i.querySelector('.exp-body');
        if (body) body.style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        const body = item.querySelector('.exp-body');
        if (body) body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ===== COUNTER ANIMATION ===== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  if (isNaN(target)) return;

  const duration = 2200;
  const start = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(easeOutCubic(progress) * target);

    // Preserve the sup element
    const sup = el.querySelector('sup');
    if (sup) {
      el.textContent = value;
      el.appendChild(sup);
    } else {
      el.textContent = value;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (sup) {
        el.textContent = target;
        el.appendChild(sup);
      } else {
        el.textContent = target;
      }
    }
  }

  requestAnimationFrame(update);
}

/* ===== CLOCKS ===== */
function initClocks() {
  const clockElements = document.querySelectorAll('.clock-time');
  if (!clockElements.length) return;

  function updateClocks() {
    clockElements.forEach(el => {
      const tz = el.getAttribute('data-tz');
      if (!tz) return;

      try {
        const time = new Date().toLocaleTimeString('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        el.textContent = time;
      } catch (e) {
        el.textContent = '--:--:--';
      }
    });
  }

  updateClocks();
  setInterval(updateClocks, 1000);
}

/* ===== FEATURED WORK HOVER ===== */
function initFeaturedWorkHover() {
  const workItems = document.querySelectorAll('.work-item');

  workItems.forEach(item => {
    const preview = item.querySelector('.work-item-preview');
    if (!preview) return;

    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Position preview relative to cursor
      preview.style.left = `${x - 150}px`;
      preview.style.top = `${y - 110}px`;
      preview.style.transform = 'scale(1) rotate(0deg)';
    });

    item.addEventListener('mouseenter', () => {
      preview.style.opacity = '1';
      preview.style.transform = 'scale(1) rotate(0deg)';
    });

    item.addEventListener('mouseleave', () => {
      preview.style.opacity = '0';
      preview.style.transform = 'scale(0.85) rotate(-2deg)';
    });
  });
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

/* ===== PAGE TRANSITION — WORK ITEMS ===== */
function initWorkItemTransitions() {
  document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (!href || href === '#' || href.startsWith('mailto') || href.startsWith('http')) return;

      e.preventDefault();
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; inset: 0; background: #000; z-index: 99999;
        opacity: 0; pointer-events: none;
      `;
      document.body.appendChild(overlay);

      // Animate overlay in
      let start = null;
      const duration = 420;
      function animateOverlay(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        overlay.style.opacity = ease;
        if (progress < 1) {
          requestAnimationFrame(animateOverlay);
        } else {
          window.location.href = href;
        }
      }
      requestAnimationFrame(animateOverlay);
    });
  });
}

/* ===== PARALLAX EFFECTS ===== */
function initParallaxEffects() {
  const aboutBgText = document.querySelector('.about-bg-text');
  const dotPatterns = document.querySelectorAll('.about-dot-pattern');

  if (!aboutBgText && !dotPatterns.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (aboutBgText) {
      const rect = aboutBgText.closest('.about')?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        aboutBgText.style.transform = `translate(-50%, ${-60 + progress * 12}%) scale(${1 + progress * 0.05})`;
      }
    }

    dotPatterns.forEach((dot, i) => {
      const speed = i % 2 === 0 ? 0.03 : -0.02;
      const rect = dot.closest('.about')?.getBoundingClientRect();
      if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * speed;
        dot.style.transform = `translateY(${offset}px)`;
      }
    });
  }, { passive: true });
}
