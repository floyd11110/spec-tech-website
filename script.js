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

const heroText = document.querySelector('.hero-text');

if (heroText) {
  heroText.textContent = 'Spec-Tech helps students build and understand Arduino, ESP32, STM32, Raspberry Pi, robotics, AI, IoT, solar, battery monitoring, sensors, electronics, metal fabrication, and workshop-supported prototype projects from hardware to software.';
}

const capabilityStrip = document.querySelector('.strip-grid');

if (capabilityStrip && !capabilityStrip.querySelector('[data-capability="metal-fabrication"]')) {
  const metalCapability = document.createElement('span');
  metalCapability.dataset.capability = 'metal-fabrication';
  metalCapability.textContent = 'Metal Fabrication';
  capabilityStrip.appendChild(metalCapability);
}

const serviceCards = document.querySelector('#services .cards');

if (serviceCards && !serviceCards.querySelector('[data-service="metal-fabrication"]')) {
  const metalService = document.createElement('article');
  metalService.className = 'card';
  metalService.dataset.service = 'metal-fabrication';
  metalService.innerHTML = `
    <h3>Metal Fabrication &amp; Workshop</h3>
    <p>Cutting, grinding, welding, fitting, bracket and frame fabrication, mounting plates, stands, and mechanical support for engineering prototypes using available workshop tools.</p>
  `;
  serviceCards.appendChild(metalService);
}
