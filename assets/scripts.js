// ==========================================
//  NAVBAR — Scroll Effect & Mobile Toggle
// ==========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Shrink navbar on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ==========================================
//  ACTIVE NAV LINK ON SCROLL
// ==========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ==========================================
//  STAT COUNTER ANIMATION
// ==========================================
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

// Trigger counters when hero is visible
const heroObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ==========================================
//  PROJECT FILTER
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        // Re-trigger animation
        card.classList.remove('visible');
        void card.offsetWidth; // force reflow
        card.classList.add('visible');
      } else {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }
    });
  });
});

// ==========================================
//  SCROLL REVEAL — IntersectionObserver
// ==========================================
function setupScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.project-card, .timeline-item, .contact-card, .contact-form, .skills-grid, .resume-download, .section-header'
  );

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el, i) => {
    el.style.transitionDelay = `${i % 4 * 0.1}s`;
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

setupScrollReveal();

// ==========================================
//  SKILL BARS ANIMATION
// ==========================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          const width = fill.getAttribute('data-width');
          fill.style.width = `${width}%`;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);

// ==========================================
//  CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  // Gather form data
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showStatus('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate sending (replace with real endpoint)
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';

  setTimeout(() => {
    showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Send Message <span class="btn-arrow">→</span>';
  }, 1500);
});

function showStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = 'form-status ' + type;
  setTimeout(() => {
    formStatus.className = 'form-status';
  }, 5000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==========================================
//  SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
