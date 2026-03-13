/* ============================================
   TMS - Tourism Mobility Services
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================
     STICKY NAVIGATION + SCROLL BEHAVIOR
     ============================================ */
  const navbar = document.getElementById('navbar');

  // If navbar has data-static="true", it's an inner page with no dark hero.
  // Lock it to white/scrolled state permanently and skip the scroll handler.
  if (navbar.dataset.static === 'true') {
    navbar.classList.add('scrolled');
  } else {
    function handleScroll() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  /* ============================================
     MOBILE NAV TOGGLE
     ============================================ */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================================
     ACTIVE NAV LINK
     ============================================ */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.nav-links a');
  allNavLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================
     INTERSECTION OBSERVER - ANIMATE ON SCROLL
     ============================================ */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections
  document.querySelectorAll('.card, .feature-card, .service-item, .team-card, .revenue-card, .projection-card, .value-card, .market-gap-item').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    observer.observe(el);
  });

  /* ============================================
     CONTACT FORM HANDLER
     ============================================ */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const firstName    = document.getElementById('firstName').value.trim();
      const lastName     = document.getElementById('lastName').value.trim();
      const email        = document.getElementById('email').value.trim();
      const phone        = document.getElementById('phone').value.trim();
      const enquiryType  = document.getElementById('enquiryType').value;
      const organisation = document.getElementById('organisation').value.trim();
      const message      = document.getElementById('message').value.trim();

      const subject = encodeURIComponent(`TMS Enquiry – ${enquiryType} – ${firstName} ${lastName}`);

      const body = encodeURIComponent(
        `Name: ${firstName} ${lastName}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || 'Not provided'}\n` +
        `Enquiry Type: ${enquiryType}\n` +
        `Organisation: ${organisation || 'Not provided'}\n` +
        `\nMessage:\n${message}`
      );

      window.location.href = `mailto:petro.maseko@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* ============================================
     COUNTER ANIMATION
     ============================================ */
  function animateCounter(el, target, suffix) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(function () {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + (suffix || '');
    }, 16);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    counterObserver.observe(el);
  });

  window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    loader.classList.add('hidden');

    // Remove from DOM after fade completes
    setTimeout(() => loader.remove(), 500);
  });
});