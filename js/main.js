// Main JS: nav toggle, footer year, simple scroll reveal, and basic form validation
document.addEventListener('DOMContentLoaded', function () {
  // Nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      primaryNav.classList.toggle('open');
    });
  }

  // Footer year(s)
  const setYear = (id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = new Date().getFullYear();
  }
  setYear('year'); setYear('year-2'); setYear('year-3'); setYear('year-4');

  // Simple scroll reveal using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        observer.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Form validation
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Clear previous
      let valid = true;
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const message = form.querySelector('#message');

      const setErr = (id, msg) => {
        const el = document.getElementById(id);
        if (el) el.textContent = msg;
      }

      setErr('err-name',''); setErr('err-email',''); setErr('err-message','');
      document.getElementById('formSuccess').textContent = '';

      if (!name.value.trim() || name.value.trim().length < 2) {
        setErr('err-name','Please enter your name (2+ characters).'); valid = false;
      }
      if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
        setErr('err-email','Please enter a valid email.'); valid = false;
      }
      if (!message.value.trim() || message.value.trim().length < 10) {
        setErr('err-message','Message must be at least 10 characters.'); valid = false;
      }

      if (!valid) return;

      // Simulate send (replace with actual fetch to serverless endpoint or backend)
      document.getElementById('formSuccess').textContent = 'Sending...';
      setTimeout(()=> {
        document.getElementById('formSuccess').textContent = 'Thanks — message sent!';
        form.reset();
      }, 800);
    });
  }
});
