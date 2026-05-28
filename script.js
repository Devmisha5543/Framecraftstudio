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

// ── Telegram bot integration ──
const TELEGRAM_TOKEN = '8773179252:AAE0BJ1VfFa8rQAVwI8mePJyePU6st9v2rw';
const CHAT_ID = '807045593';

const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;

  const text = `
🔔 New enquiry from FrameCraft Studio!

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
🎨 Service: ${service}
💬 Message: ${message}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    if (response.ok) {
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
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    alert('Network error. Please check your connection and try again.');
  }
});