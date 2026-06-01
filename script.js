// ── Navbar scroll effect ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ── Form validation — light up button when fields filled ──
const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
const submitBtn = document.getElementById('submit-btn');

function checkForm() {
  const allFilled = requiredFields.every(id => {
    const field = document.getElementById(id);
    return field && field.value.trim() !== '';
  });
  submitBtn.disabled = !allFilled;
}

requiredFields.forEach(id => {
  const field = document.getElementById(id);
  if (field) field.addEventListener('input', checkForm);
  if (field) field.addEventListener('change', checkForm);
});

// ── Contact form — sends through Cloudflare Worker ──
const WORKER_URL = 'https://framecraft-bot.wamisha-sahilu.workers.dev';

const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const phone = document.getElementById('phone').value;
const service = document.getElementById('service').value;
const message = document.getElementById('message').value;
const honeypot = document.getElementById('honeypot').value;

  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, service, message, honeypot })
    });

    const data = await response.json();

    if (data.success) {
      form.innerHTML = `
        <div style="
          padding: 2rem;
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 12px;
          text-align: center;
        ">
          <h3 style="color: #15803d; margin-bottom: 0.5rem;">Message Sent!</h3>
          <p style="color: #166534;">Thank you for reaching out. We will get back to you within 24 hours.</p>
        </div>
      `;
    } else {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
    alert('Network error. Please check your connection and try again.');
  }
});

// ── Scroll fade-up animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

