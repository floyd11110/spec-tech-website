const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const copyButton = document.getElementById('copyInquiry');
const inquiryText = document.getElementById('inquiryText');
const copyStatus = document.getElementById('copyStatus');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

if (copyButton && inquiryText && copyStatus) {
  copyButton.addEventListener('click', async () => {
    const text = inquiryText.innerText.trim();

    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = 'Inquiry format copied. Send it to Spec-Tech on Facebook.';
    } catch (error) {
      copyStatus.textContent = 'Copy failed. Please highlight the text and copy manually.';
    }
  });
}

const tutorialList = document.querySelector('#tutorials .tutorial-list');

if (tutorialList && !tutorialList.querySelector('[data-topic="digital-write"]')) {
  const digitalWriteTopic = document.createElement('div');
  digitalWriteTopic.className = 'tutorial-item';
  digitalWriteTopic.dataset.topic = 'digital-write';
  digitalWriteTopic.innerHTML = `
    <strong>03</strong>
    <div>
      <h3>Digital Write</h3>
      <p>GPIO output using pinMode(OUTPUT), digitalWrite(), HIGH/LOW logic, and external LED control.</p>
    </div>
  `;

  tutorialList.appendChild(digitalWriteTopic);
}
