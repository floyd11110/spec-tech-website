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

if (tutorialList) {
  const tutorialItems = tutorialList.querySelectorAll('.tutorial-item');
  const firstTutorialItem = tutorialItems[0];
  const secondTutorialItem = tutorialItems[1];

  if (firstTutorialItem && firstTutorialItem.tagName !== 'A') {
    const setupBlinkLink = document.createElement('a');
    setupBlinkLink.className = firstTutorialItem.className;
    setupBlinkLink.dataset.topic = 'setup-blink';
    setupBlinkLink.href = 'https://www.facebook.com/reel/1004154882523878';
    setupBlinkLink.target = '_blank';
    setupBlinkLink.rel = 'noopener';
    setupBlinkLink.setAttribute('aria-label', 'Watch the STM32 Setup and Blink tutorial on Facebook');
    setupBlinkLink.innerHTML = firstTutorialItem.innerHTML;
    firstTutorialItem.replaceWith(setupBlinkLink);
  }

  if (secondTutorialItem && secondTutorialItem.tagName !== 'A') {
    const digitalReadLink = document.createElement('a');
    digitalReadLink.className = secondTutorialItem.className;
    digitalReadLink.dataset.topic = 'digital-read';
    digitalReadLink.href = 'https://www.facebook.com/reel/1433198171952762';
    digitalReadLink.target = '_blank';
    digitalReadLink.rel = 'noopener';
    digitalReadLink.setAttribute('aria-label', 'Watch the STM32 Digital Read tutorial on Facebook');
    digitalReadLink.innerHTML = secondTutorialItem.innerHTML;
    secondTutorialItem.replaceWith(digitalReadLink);
  }
}

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

const smartLinkCard = document.querySelector('#research .research-card');

if (smartLinkCard && !smartLinkCard.querySelector('[data-smartlink-photo]')) {
  const figure = document.createElement('figure');
  figure.dataset.smartlinkPhoto = 'prototype';
  figure.style.margin = '22px 0';
  figure.style.overflow = 'hidden';
  figure.style.border = '1px solid rgba(125, 211, 252, 0.24)';
  figure.style.borderRadius = '18px';
  figure.style.background = 'rgba(2, 8, 23, 0.5)';

  figure.innerHTML = `
    <img
      src="assets/smartlink/smartlink-prototype.svg"
      alt="SmartLink custom PCB with STM32 Blue Pill and nRF24L01 PA/LNA external antenna module"
      loading="lazy"
      style="display:block;width:100%;height:auto;aspect-ratio:420/189;object-fit:cover;"
    >
    <figcaption style="padding:14px 16px;color:var(--muted);font-size:14px;line-height:1.6;">
      <strong style="display:block;color:var(--text);margin-bottom:4px;">SmartLink STM32 + nRF24L01 Prototype</strong>
      Custom-fabricated PCB for STM32-to-STM32 wireless telemetry testing, with local power filtering and an external-antenna nRF24L01 PA/LNA module.
    </figcaption>
  `;

  const tags = smartLinkCard.querySelector('.research-tags');
  if (tags) {
    tags.insertAdjacentElement('afterend', figure);
  } else {
    smartLinkCard.appendChild(figure);
  }
}
