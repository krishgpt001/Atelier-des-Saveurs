"use strict";

// Theme toggle removed to keep project to original requirements

const navbar = document.querySelector('.custom-navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});


const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.custom-navbar .nav-link[href^="#"]');

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(l => l.classList.remove('active'));
    const match = document.querySelector(`.custom-navbar .nav-link[href="#${entry.target.id}"]`);
    if (match) match.classList.add('active');
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObserver.observe(s));


document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const collapse = document.querySelector('.navbar-collapse');
    if (collapse?.classList.contains('show')) {
      document.querySelector('.navbar-toggler')?.click();
    }
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

const galleryModal      = document.getElementById('galleryModal');
const galleryModalImg   = document.getElementById('galleryModalImg');
const galleryModalTitle = document.getElementById('galleryModalLabel');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    galleryModalImg.src           = item.dataset.img;
    galleryModalImg.alt           = item.dataset.caption || '';
    galleryModalTitle.textContent = item.dataset.caption || '';
    new bootstrap.Modal(galleryModal).show();
  });

  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') item.click();
  });
});

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const mark = (id, msg) => {
      const el = document.getElementById(id);
      el.classList.add('is-invalid');
      el.classList.remove('is-valid');
      const fb = el.nextElementSibling;
      if (fb?.classList.contains('invalid-feedback')) fb.textContent = msg;
      valid = false;
    };

    const clear = id => {
      const el = document.getElementById(id);
      el.classList.remove('is-invalid');
      el.classList.add('is-valid');
    };

    contactForm.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
      el.classList.remove('is-invalid', 'is-valid');
    });

    const name = document.getElementById('contactName').value.trim();
    name.length < 2 ? mark('contactName', 'Please enter your full name.') : clear('contactName');

    const email = document.getElementById('contactEmail').value.trim();
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? clear('contactEmail') : mark('contactEmail', 'Please enter a valid email address.');

    const phone = document.getElementById('contactPhone').value.trim();
    if (phone && !/^\+?[\d\s\-]{7,15}$/.test(phone)) {
      mark('contactPhone', 'Please enter a valid phone number.');
    } else {
      clear('contactPhone');
    }

    const guests = parseInt(document.getElementById('contactGuests').value);
    (!guests || guests < 1 || guests > 20) ? mark('contactGuests', 'Please enter between 1 and 20 guests.') : clear('contactGuests');

    const dateVal  = document.getElementById('contactDate').value;
    const today    = new Date(); today.setHours(0,0,0,0);
    const selected = new Date(dateVal);
    if (!dateVal)            mark('contactDate', 'Please select a reservation date.');
    else if (selected < today) mark('contactDate', 'Please choose a future date.');
    else                       clear('contactDate');

    const msg = document.getElementById('contactMessage').value.trim();
    if (msg && msg.length < 10) {
      mark('contactMessage', 'Please write at least 10 characters.');
    } else {
      clear('contactMessage');
    }

    if (valid) {
      contactForm.style.display = 'none';
      formSuccess.classList.add('visible');
    }
  });
}


document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.menu-col').forEach(col => {
      const cat = col.querySelector('.menu-card')?.dataset.category || '';
      col.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
    });
  });
});


function checkSpecial() {
  const badge = document.getElementById('specialBadge');
  if (!badge) return;
  const day = new Date().getDay();
  if (day === 4 || day === 6) badge.classList.add('visible');
  document.getElementById('specialBadgeClose')?.addEventListener('click', () => {
    badge.classList.remove('visible');
  });
}

checkSpecial();
