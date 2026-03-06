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

      const btn = contactForm.querySelector('[type="submit"]');
      const originalText = btn.textContent;

      // Simulate submission
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#18a562';

        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
          background: #e8f9f1;
          border: 1px solid #20BD73;
          color: #18a562;
          padding: 16px 20px;
          border-radius: 8px;
          margin-top: 16px;
          font-family: 'Open Sans', sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
        `;
        successMsg.textContent = 'Thank you for your message. Our team will get back to you within 24 hours.';
        contactForm.appendChild(successMsg);

        setTimeout(function () {
          contactForm.reset();
          btn.textContent = originalText;
          btn.disabled = false;
          btn.style.background = '';
          if (successMsg.parentNode) successMsg.parentNode.removeChild(successMsg);
        }, 4000);
      }, 1500);
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