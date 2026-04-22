/* ============================================================
   HERO SECTION SCROLLTRIGGER ANIMATIONS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugin
  gsap.registerPlugin(ScrollTrigger);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  /* ============================================================
     LENIS SMOOTH SCROLL
     ============================================================ */
  let lenis;
  
  function initSmoothScroll() {
    if (prefersReducedMotion) return;

    lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.8,
    });

    // Connect Lenis to GSAP ticker for smooth integration
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger proxy so GSAP and Lenis stay in sync
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (typeof value === 'number') {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    lenis.on('scroll', ScrollTrigger.update);
  }

  /* ============================================================
     SCROLL PROGRESS BAR
     ============================================================ */
  function initScrollProgressBar() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = lenis ? lenis.scroll : window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      progressBar.style.width = progress + '%';
      
      // Add glow effect when scrolling
      if (progress > 0) {
        progressBar.style.boxShadow = `0 0 ${Math.min(20, progress / 5)}px rgba(255, 69, 0, 0.6)`;
      } else {
        progressBar.style.boxShadow = '0 0 10px rgba(255, 69, 0, 0.5)';
      }
    }

    // Update progress on scroll
    if (lenis) {
      lenis.on('scroll', updateProgress);
    } else {
      window.addEventListener('scroll', updateProgress, { passive: true });
    }

    updateProgress(); // Initial call
  }

  // Initialize smooth scroll and progress bar first
  initSmoothScroll();
  initScrollProgressBar();

  if (prefersReducedMotion) return;

  /* ============================================================
     TEXT LINE REVEAL ANIMATIONS
     ============================================================ */
  function splitIntoLines(element) {
    const text = element.innerHTML;
    const words = text.split(/(\s+)/);
    element.innerHTML = words.map(word => 
      word.trim() ? `<span class="line-word">${word}</span>` : word
    ).join('');
    return element.querySelectorAll('.line-word');
  }

  function initTextLineReveal() {
    // Target main headings for line reveals
    const headings = document.querySelectorAll(
      '.featured-work-heading, .expertise-main-heading, .awards-heading, .experience-heading, .clients-heading, .expertise-info-title'
    );

    headings.forEach(heading => {
      const words = splitIntoLines(heading);
      
      // Set initial state with overflow hidden on parent
      heading.style.overflow = 'hidden';
      gsap.set(words, { 
        yPercent: 100, 
        opacity: 0 
      });

      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });
  }

  /* ============================================================
     SECTION REVEALS - FADE UP ON SCROLL
     ============================================================ */
  function initSectionReveals() {
    const revealElements = [
      { selector: '.awards-row', stagger: 0.08 },
      { selector: '.stat-row', stagger: 0.15 },
      { selector: '.exp-item', stagger: 0.12 },
      { selector: '.expertise-detail-inner', stagger: 0 },
      { selector: '.about-portrait, .about-bio', stagger: 0.2 },
      { selector: '.footer-contact, .footer-about', stagger: 0.15 },
      { selector: '.accordion-item', stagger: 0.1 },
    ];

    revealElements.forEach(({ selector, stagger }) => {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach((el, index) => {
        gsap.fromTo(el, 
          { 
            opacity: 0, 
            y: 50,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: stagger * index * 0.6,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    });

    // Special handling for expertise banners
    const banners = document.querySelectorAll('.expertise-banner');
    banners.forEach(banner => {
      gsap.fromTo(banner,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: banner,
            start: 'top 90%',
            toggleActions: 'play none none none',
          }
        }
      );
    });
  }

  /* ============================================================
     SCROLL COLOR CHANGE EFFECTS
     ============================================================ */
  function initScrollColorChange() {
    // Expertise banner titles color pop
    const bannerTitles = document.querySelectorAll('.expertise-banner-title');
    bannerTitles.forEach(title => {
      gsap.fromTo(title,
        { color: 'rgba(0, 0, 0, 0.4)' },
        {
          color: 'rgba(0, 0, 0, 1)',
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title.closest('.expertise-banner'),
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Stat numbers glow effect
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(num => {
      gsap.fromTo(num,
        { 
          color: 'rgba(255, 255, 255, 0.3)',
          textShadow: '0 0 0px rgba(255, 69, 0, 0)'
        },
        {
          color: 'rgba(255, 255, 255, 1)',
          textShadow: '0 0 30px rgba(255, 69, 0, 0.6)',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    // Hero lines progressive color reveal
    const heroLines = document.querySelectorAll('.hero-line-gray');
    heroLines.forEach((line, index) => {
      ScrollTrigger.create({
        trigger: line,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(line, {
            color: 'rgba(255, 255, 255, 0.9)',
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  /* ============================================================
     RIPPLE EFFECT FOR BUTTONS
     ============================================================ */
  function initRippleEffect() {
    const rippleButtons = document.querySelectorAll('.nav-cta, .connect-btn');
    
    rippleButtons.forEach(btn => {
      btn.classList.add('ripple-btn');
      
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        
        ripple.classList.add('ripple-circle');
        ripple.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${e.clientX - rect.left - size / 2}px;
          top: ${e.clientY - rect.top - size / 2}px;
        `;
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        ripple.addEventListener('animationend', () => {
          ripple.remove();
        });
      });
    });
  }

  /* ============================================================
     ACTIVE NAVIGATION SECTION HIGHLIGHTING
     ============================================================ */
  function initNavActiveSection() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.mobile-menu-content a, .nav-cta');
    
    if (!navLinks.length) return;

    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => updateActiveNavLink(section.id),
        onEnterBack: () => updateActiveNavLink(section.id),
      });
    });

    function updateActiveNavLink(activeId) {
      navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('nav-active');
        }
      });
    }
  }

  /* ============================================================
     ENHANCED PARALLAX LAYERS - MULTI-LAYER BACKGROUND ELEMENTS
     ============================================================ */
  function initParallaxLayers() {
    if (window.innerWidth <= 768) return; // Disable on mobile

    // Layer 1: Slowest - About section background text (furthest back)
    const aboutBgText = document.querySelector('.about-bg-text');
    if (aboutBgText) {
      gsap.to(aboutBgText, {
        yPercent: 25,
        xPercent: -2,
        rotation: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3, // Slowest movement
        }
      });
    }

    // Layer 2: Medium - Dot patterns (mid-layer)
    const dotPatterns = document.querySelectorAll('.about-dot-pattern');
    dotPatterns.forEach((dot, i) => {
      gsap.to(dot, {
        y: i % 2 === 0 ? -60 : 50,
        x: i % 3 === 0 ? 20 : -15,
        rotation: i % 2 === 0 ? 8 : -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2, // Medium speed
        }
      });
    });

    // Layer 3: Stats section parallax
    const statsDots = document.querySelector('.stats-dot-pattern');
    if (statsDots) {
      gsap.to(statsDots, {
        y: -100,
        x: 30,
        rotation: 3,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: '.stats',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.2,
        }
      });
    }

    // Layer 4: Hero section advanced parallax
    const heroImg = document.querySelector('.intro-hero-bg img');
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 30,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.intro-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    }

    // Layer 5: Featured work section parallax
    const workTopBar = document.querySelector('.featured-work-top-bar');
    if (workTopBar) {
      gsap.to(workTopBar, {
        scaleX: 1.2,
        x: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.featured-work',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2.8,
        }
      });
    }

    // Layer 6: Footer parallax elements
    const footerTopBar = document.querySelector('.footer-top-bar');
    if (footerTopBar) {
      gsap.to(footerTopBar, {
        scaleY: 0.5,
        x: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top bottom',
          end: 'center center',
          scrub: 2.5,
        }
      });
    }

    // Layer 7: Awards section background effect
    const awardsSection = document.querySelector('.awards');
    if (awardsSection) {
      gsap.to(awardsSection, {
        backgroundPosition: '150% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.awards',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3.5,
        }
      });
    }
  }

  /* ============================================================
     EXPERTISE BANNER ADVANCED INNER PARALLAX
     ============================================================ */
  function initExpertiseBannerInnerParallax() {
    if (window.innerWidth <= 768) return; // Disable on mobile

    const expertiseBanners = document.querySelectorAll('.expertise-banner');
    
    expertiseBanners.forEach((banner, bannerIndex) => {
      // Layer 1: Background Japanese text
      const bgText = banner.querySelector('.expertise-banner-bg-text');
      if (bgText) {
        gsap.to(bgText, {
          yPercent: 15,
          rotation: bannerIndex % 2 === 0 ? 2 : -2,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: banner,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 4, // Slowest layer
          }
        });
      }

      // Layer 2: Banner image with advanced parallax
      const bannerImg = banner.querySelector('.expertise-banner-image img');
      if (bannerImg) {
        gsap.to(bannerImg, {
          yPercent: 25,
          scale: 1.08,
          rotation: bannerIndex % 2 === 0 ? 1 : -1,
          ease: 'none',
          scrollTrigger: {
            trigger: banner,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.8, // Medium speed
          }
        });

        // Additional transform for image container
        const imgContainer = banner.querySelector('.expertise-banner-image');
        if (imgContainer) {
          gsap.to(imgContainer, {
            xPercent: bannerIndex % 2 === 0 ? -3 : 3,
            ease: 'none',
            scrollTrigger: {
              trigger: banner,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2.5,
            }
          });
        }
      }

      // Layer 3: Banner content (fastest layer)
      const bannerContent = banner.querySelector('.expertise-banner-content');
      if (bannerContent) {
        gsap.to(bannerContent, {
          yPercent: -5,
          xPercent: bannerIndex % 3 === 0 ? 2 : -2,
          ease: 'none',
          scrollTrigger: {
            trigger: banner,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2, // Fastest layer
          }
        });
      }

      // Layer 4: Banner number special effect
      const bannerNum = banner.querySelector('.expertise-banner-num');
      if (bannerNum) {
        gsap.to(bannerNum, {
          yPercent: -10,
          rotation: bannerIndex * 5,
          ease: 'none',
          scrollTrigger: {
            trigger: banner,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
      }
    });

    // Global expertise section parallax
    const expertiseSticky = document.querySelectorAll('.expertise-banner-sticky-bar');
    expertiseSticky.forEach((sticky, index) => {
      gsap.to(sticky, {
        xPercent: index % 2 === 0 ? 3 : -3,
        ease: 'none',
        scrollTrigger: {
          trigger: sticky,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 3,
        }
      });
    });
  }

  /* ============================================================
     ADDITIONAL PARALLAX MICRO-INTERACTIONS
     ============================================================ */
  function initParallaxMicroInteractions() {
    if (window.innerWidth <= 768) return;

    // Side badge advanced parallax
    const sideBadge = document.querySelector('.side-badge');
    if (sideBadge) {
      gsap.to(sideBadge, {
        y: -40,
        rotation: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 4,
        }
      });
    }

    // Nav bar subtle parallax
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
          const progress = self.progress;
          gsap.set(navbar, {
            y: progress * -10,
            opacity: 1 - (progress * 0.1)
          });
        }
      });
    }

    // Work item previews parallax on hover
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
      const preview = item.querySelector('.work-item-preview');
      if (preview) {
        item.addEventListener('mousemove', (e) => {
          const rect = item.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          
          gsap.to(preview, {
            x: (x - 0.5) * 30,
            y: (y - 0.5) * 20,
            rotation: (x - 0.5) * 5,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(preview, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      }
    });
  }

  /* ===== INTRO HERO PARALLAX ===== */
  function initIntroHeroParallax() {
    const heroImg = document.querySelector('.intro-hero-bg img');
    
    if (heroImg) {
      // Parallax effect on hero image
      gsap.to(heroImg, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: '.intro-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      });
    }

    // Fade out hero content as user scrolls
    const heroContent = document.querySelector('.intro-hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        yPercent: -20,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '.intro-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }

    // Fade bottom text
    const heroBottom = document.querySelector('.intro-hero-bottom');
    if (heroBottom) {
      gsap.to(heroBottom, {
        y: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.intro-hero',
          start: 'top top',
          end: '50% top',
          scrub: 1,
        }
      });
    }
  }

  /* ===== HERO TYPOGRAPHY REVEAL ===== */
  function initHeroTypographyReveal() {
    const heroLines = document.querySelectorAll('.hero-line');
    
    if (heroLines.length > 0) {
      // Animate each line from bottom with stagger
      gsap.fromTo(heroLines, 
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.hero-content',
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Color transition for gray lines
      const grayLines = document.querySelectorAll('.hero-line-gray');
      grayLines.forEach(line => {
        ScrollTrigger.create({
          trigger: line,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(line, {
              color: 'rgba(255, 255, 255, 0.85)',
              duration: 0.8,
              ease: 'power2.out'
            });
          }
        });
      });
    }
  }

  /* ===== HERO IMAGES HOVER EFFECTS ===== */
  function initHeroImageEffects() {
    const inlineImages = document.querySelectorAll('.hero-img-inline');
    
    inlineImages.forEach(imgContainer => {
      const img = imgContainer.querySelector('img');
      if (!img) return;
      
      imgContainer.addEventListener('mouseenter', () => {
        gsap.to(img, {
          scale: 1.15,
          rotation: 2,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      
      imgContainer.addEventListener('mouseleave', () => {
        gsap.to(img, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  /* ===== ENHANCED PRELOADER INTEGRATION ===== */
  function enhancePreloaderExit() {
    // Wait for the existing preloader to complete (2200ms from script.js)
    setTimeout(() => {
      const introHero = document.querySelector('.intro-hero');
      if (introHero) {
        // Smooth fade in after preloader
        gsap.fromTo(introHero, 
          { opacity: 0, scale: 1.05 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 1.5, 
            ease: 'power3.out'
          }
        );
      }
    }, 2300);
  }

  /* ===== HERO SECTION SCALE ON SCROLL ===== */
  function initHeroScaleEffect() {
    const heroSection = document.querySelector('.intro-hero');
    
    if (heroSection) {
      gsap.to(heroSection, {
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        }
      });
    }
  }

  /* ============================================================
     CARD TILT EFFECT
     ============================================================ */
  function initCardTilt() {
    if (window.innerWidth <= 768 || prefersReducedMotion) return;

    const tiltCards = document.querySelectorAll('.awards-row, .expertise-banner, .stat-row, .exp-item');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const rotateX = ((e.clientY - centerY) / rect.height) * -8;
        const rotateY = ((e.clientX - centerX) / rect.width) * 8;
        
        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }

  /* ============================================================
     FOOTER NAME GRADIENT EFFECT
     ============================================================ */
  function initFooterNameGradient() {
    const footerName = document.querySelector('.footer-big-name span');
    if (!footerName) return;

    // Create gradient background
    footerName.style.background = 'linear-gradient(90deg, var(--white) 0%, var(--red) 50%, var(--white) 100%)';
    footerName.style.backgroundSize = '200% auto';
    footerName.style.webkitBackgroundClip = 'text';
    footerName.style.webkitTextFillColor = 'transparent';
    footerName.style.backgroundClip = 'text';
    footerName.style.transition = 'background-position 0.8s var(--ease-out-expo)';

    footerName.closest('.footer-big-name').addEventListener('mouseenter', () => {
      footerName.style.backgroundPosition = '100% center';
    });

    footerName.closest('.footer-big-name').addEventListener('mouseleave', () => {
      footerName.style.backgroundPosition = '0% center';
    });
  }

  /* ============================================================
     CLOCK DOT PULSE ANIMATION
     ============================================================ */
  function initClockDotPulse() {
    if (prefersReducedMotion) return;

    const clockDots = document.querySelectorAll('.clock-dot');
    clockDots.forEach((dot, index) => {
      gsap.to(dot, {
        scale: 1.4,
        opacity: 0.6,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.4,
      });
    });
  }

  /* ============================================================
     ENHANCED STAT GLOW EFFECT
     ============================================================ */
  function initEnhancedStatGlow() {
    if (prefersReducedMotion) return;

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((stat, index) => {
      ScrollTrigger.create({
        trigger: '.stats',
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(stat, 
            { 
              textShadow: '0 0 0px rgba(255, 69, 0, 0)',
              color: 'rgba(255, 255, 255, 0.4)'
            },
            { 
              textShadow: '0 0 40px rgba(255, 69, 0, 0.8), 0 0 80px rgba(255, 69, 0, 0.3)',
              color: 'rgba(255, 255, 255, 1)',
              duration: 1.2,
              delay: index * 0.2,
              ease: 'power2.out'
            }
          );
        }
      });
    });
  }

  /* ============================================================
     LINK UNDERLINES ANIMATION
     ============================================================ */
  function initLinkUnderlines() {
    const links = document.querySelectorAll('.footer-email-address, .mobile-menu-content a, .nav-cta');
    
    links.forEach(link => {
      link.classList.add('animated-underline');
      
      // Create underline element
      const underline = document.createElement('span');
      underline.className = 'link-underline-element';
      link.appendChild(underline);
      
      link.addEventListener('mouseenter', () => {
        gsap.to(underline, {
          scaleX: 1,
          duration: 0.4,
          ease: 'power3.out',
        });
      });
      
      link.addEventListener('mouseleave', () => {
        gsap.to(underline, {
          scaleX: 0,
          duration: 0.4,
          ease: 'power3.out',
        });
      });
    });
  }

  /* ============================================================
     ICON BOUNCE EFFECTS
     ============================================================ */
  function initIconBounce() {
    if (prefersReducedMotion) return;

    // Nav logo bounce on hover
    const navLogo = document.querySelector('.nav-logo svg');
    if (navLogo) {
      const logoParent = navLogo.closest('a');
      
      logoParent.addEventListener('mouseenter', () => {
        gsap.fromTo(navLogo, 
          { rotation: 0, scale: 1 },
          { 
            rotation: 15, 
            scale: 1.1,
            duration: 0.3, 
            ease: 'back.out(1.7)'
          }
        );
      });
      
      logoParent.addEventListener('mouseleave', () => {
        gsap.to(navLogo, {
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    }

    // Side badge floating animation
    const sideBadge = document.querySelector('.side-badge');
    if (sideBadge) {
      gsap.to(sideBadge, {
        y: -8,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Menu button hover bounce
    const menuBtn = document.querySelector('.nav-menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('mouseenter', () => {
        gsap.to(menuBtn, {
          scale: 1.1,
          rotation: 5,
          duration: 0.2,
          ease: 'back.out(1.7)'
        });
      });
      
      menuBtn.addEventListener('mouseleave', () => {
        gsap.to(menuBtn, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    }

    // Scroll indicator bounce (if exists)
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        y: 5,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  }

  // Initialize all hero animations
  initIntroHeroParallax();
  initHeroTypographyReveal();
  initHeroImageEffects();
  enhancePreloaderExit();
  initHeroScaleEffect();

  // Initialize all new animation features
  initTextLineReveal();
  initSectionReveals();
  initScrollColorChange();
  initRippleEffect();
  initNavActiveSection();
  initParallaxLayers();
  initExpertiseBannerInnerParallax();
  initParallaxMicroInteractions();
  initCardTilt();
  initFooterNameGradient();
  initClockDotPulse();
  initEnhancedStatGlow();
  initLinkUnderlines();
  initIconBounce();
  initScrollDirectionImages();
  initDynamicExpertiseHighlights();

  /* ============================================================
     SCROLL DIRECTION IMAGE VISIBILITY
     ============================================================ */
  function initScrollDirectionImages() {
    if (prefersReducedMotion) return;

    let lastScrollY = 0;
    let scrollDirection = 'down';
    
    // Track scroll direction
    function updateScrollDirection() {
      const currentScrollY = window.scrollY;
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
    }

    // Throttled scroll direction update
    let scrollTicking = false;
    function onScroll() {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          updateScrollDirection();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Image visibility handlers (excluding work item previews)
    const imageSelectors = [
      '.intro-hero-img',
      '.hero-img-inline',
      '.expertise-banner-image', 
      '.about-portrait'
    ];

    imageSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      
      elements.forEach(element => {
        ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            if (scrollDirection === 'down') {
              element.classList.add('visible');
            }
          },
          onLeave: () => {
            if (scrollDirection === 'down') {
              element.classList.remove('visible');
            }
          },
          onEnterBack: () => {
            if (scrollDirection === 'up') {
              element.classList.remove('visible');
            }
          },
          onLeaveBack: () => {
            if (scrollDirection === 'up') {
              element.classList.remove('visible');
            }
          }
        });
      });
    });

    // Special handling for hero section images - show after text appears
    const heroImages = document.querySelectorAll('.hero-img-inline');
    heroImages.forEach((img, index) => {
      ScrollTrigger.create({
        trigger: img.closest('.hero-line'),
        start: "top 85%",
        onEnter: () => {
          if (scrollDirection === 'down') {
            gsap.delayedCall(0.3 + (index * 0.1), () => {
              img.classList.add('visible');
            });
          }
        },
        onLeave: () => {
          if (scrollDirection === 'down') {
            img.classList.remove('visible');
          }
        },
        onEnterBack: () => {
          if (scrollDirection === 'up') {
            img.classList.remove('visible');
          }
        },
        onLeaveBack: () => {
          if (scrollDirection === 'up') {
            img.classList.remove('visible');
          }
        }
      });
    });

    // Ensure work item preview images are always ready for hover
    const workItemPreviewImgs = document.querySelectorAll('.work-item-preview img');
    workItemPreviewImgs.forEach(img => {
      img.style.opacity = '1';
      img.style.transform = 'none';
    });
  }

  /* ============================================================
     DYNAMIC EXPERTISE LIST HIGHLIGHTING
     ============================================================ */
  function initDynamicExpertiseHighlights() {
    if (prefersReducedMotion) return;

    // Use the same scroll direction tracking from image visibility
    let lastScrollY = 0;
    let scrollDirection = 'down';
    
    // Mouse direction tracking
    let lastMouseY = 0;
    let mouseDirection = 'down';
    
    function updateScrollDirection() {
      const currentScrollY = window.scrollY;
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
    }

    function updateMouseDirection(e) {
      const currentMouseY = e.clientY;
      mouseDirection = currentMouseY > lastMouseY ? 'down' : 'up';
      lastMouseY = currentMouseY;
    }

    let scrollTicking = false;
    function onScroll() {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          updateScrollDirection();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', updateMouseDirection, { passive: true });

    // Get each expertise section separately to highlight one item per section
    const expertiseSections = document.querySelectorAll('.expertise-detail');
    
    expertiseSections.forEach((section, sectionIndex) => {
      const listItems = section.querySelectorAll('.expertise-list-item');
      let currentHighlighted = -1;
      
      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onUpdate: (self) => {
          const progress = self.progress;
          let targetIndex;
          
          if (scrollDirection === 'down') {
            // Normal order: 0, 1, 2, 3...
            targetIndex = Math.floor(progress * listItems.length);
          } else {
            // Reverse order when scrolling up: show items from end to start
            const reverseProgress = 1 - progress;
            targetIndex = Math.max(0, Math.min(listItems.length - 1, listItems.length - 1 - Math.floor(reverseProgress * listItems.length)));
          }
          
          // Always update regardless of direction
          if (targetIndex >= 0 && targetIndex < listItems.length) {
            // Don't override manual (click-based) highlights
            const hasManualHighlights = Array.from(listItems).some(item => item.classList.contains('manual-highlight'));
            if (!hasManualHighlights) {
              // Remove previous scroll-based highlights and mouse highlights in this section
              listItems.forEach(item => {
                if (!item.classList.contains('manual-highlight')) {
                  item.classList.remove('highlight', 'scroll-highlight', 'mouse-highlight');
                }
              });
              
              // Add scroll-based highlight to new item
              listItems[targetIndex].classList.add('highlight', 'scroll-highlight');
              currentHighlighted = targetIndex;
            }
          }
        },
        onLeave: () => {
          // Clear scroll-based highlights when completely leaving section
          listItems.forEach(item => item.classList.remove('scroll-highlight'));
          currentHighlighted = -1;
        },
        onLeaveBack: () => {
          // Clear scroll-based highlights when completely leaving section upward
          listItems.forEach(item => item.classList.remove('scroll-highlight'));
          currentHighlighted = -1;
        }
      });

      // Mouse direction and click-based highlighting
      listItems.forEach((item, index) => {
        // Mouse enter based on mouse direction
        item.addEventListener('mouseenter', () => {
          // Clear any existing mouse highlights in this section first
          listItems.forEach(otherItem => {
            if (otherItem.classList.contains('mouse-highlight')) {
              otherItem.classList.remove('highlight', 'mouse-highlight');
            }
          });
          
          // Only add mouse highlight if conditions are met
          const hasManualHighlights = Array.from(listItems).some(item => item.classList.contains('manual-highlight'));
          if (!hasManualHighlights && mouseDirection === 'down') {
            item.classList.add('highlight', 'mouse-highlight');
          }
        });

        item.addEventListener('mouseleave', () => {
          // Always remove mouse highlight when leaving, regardless of other conditions
          if (item.classList.contains('mouse-highlight')) {
            item.classList.remove('highlight', 'mouse-highlight');
          }
        });

        // Click-based highlighting
        item.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Clear all other types of highlights in this section first
          listItems.forEach(otherItem => {
            otherItem.classList.remove('scroll-highlight', 'mouse-highlight');
          });
          
          // Toggle manual highlight
          if (item.classList.contains('manual-highlight')) {
            item.classList.remove('highlight', 'manual-highlight');
          } else {
            // Clear other manual highlights in this section
            listItems.forEach(otherItem => otherItem.classList.remove('manual-highlight'));
            item.classList.add('highlight', 'manual-highlight');
          }
          
          // Add ripple effect
          const rect = item.getBoundingClientRect();
          const ripple = document.createElement('div');
          ripple.classList.add('expertise-ripple');
          ripple.style.left = '50%';
          ripple.style.top = '50%';
          item.style.position = 'relative';
          item.appendChild(ripple);
          
          gsap.fromTo(ripple, {
            scale: 0,
            opacity: 0.6
          }, {
            scale: 4,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => ripple.remove()
          });
        });
        
        // Add cursor pointer for clickable items
        item.style.cursor = 'pointer';
      });
    });
  }

  /* ============================================================
     SMOOTH SCROLL ANCHOR LINKS
     ============================================================ */
  function initSmoothAnchorLinks() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        
        if (lenis) {
          lenis.scrollTo(target, {
            offset: -80, // Account for fixed navbar
            duration: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 3),
          });
        } else {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  initSmoothAnchorLinks();

  // Refresh ScrollTrigger after initialization
  ScrollTrigger.refresh();
});

// Refresh on window resize with Lenis integration
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (lenis) lenis.resize();
    ScrollTrigger.refresh();
  }, 250);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (lenis) {
    lenis.destroy();
  }
});