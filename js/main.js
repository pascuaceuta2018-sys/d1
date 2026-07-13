// SmartCareerTeach — shared scripts

// Sticky header shadow
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile nav
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }));
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Animated counters
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1600, start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(el => cio.observe(el));

// Course filters (courses page)
const pills = document.querySelectorAll('.filter-pill');
const courseCards = document.querySelectorAll('.course-card[data-cat]');
pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const cat = pill.dataset.filter;
    courseCards.forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.style.display = show ? '' : 'none';
    });
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const ans = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.form-success').style.display = 'block';
    contactForm.reset();
    window.scrollTo({ top: contactForm.getBoundingClientRect().top + window.scrollY - 140, behavior: 'smooth' });
  });
}

// Newsletter
const newsForm = document.getElementById('newsletterForm');
if (newsForm) {
  newsForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = newsForm.querySelector('button');
    btn.textContent = 'Subscribed ✓';
    btn.style.background = 'var(--sage)';
    newsForm.querySelector('input').value = '';
  });
}

// Back to top
const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 500));
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Footer year
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
