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

if (tutorialList && !tutorialList.querySelector('[data-topic="analog-write"]')) {
  const analogWriteTopic = document.createElement('div');
  analogWriteTopic.className = 'tutorial-item';
  analogWriteTopic.dataset.topic = 'analog-write';
  analogWriteTopic.innerHTML = `
    <strong>03</strong>
    <div>
      <h3>Analog Write (PWM)</h3>
      <p>LED brightness control using analogWrite(), PWM duty cycle, PA6 / TIM3 Channel 1, and values from 0 to 255.</p>
    </div>
  `;

  tutorialList.appendChild(analogWriteTopic);
}
