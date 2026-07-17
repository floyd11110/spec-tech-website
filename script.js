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

// SmartLink research update — July 2026
const researchSection = document.getElementById('research');

if (researchSection) {
  const headingText = researchSection.querySelector('.section-heading > p:last-child');
  const researchCard = researchSection.querySelector('.research-card');
  const researchMetrics = researchSection.querySelector('.research-metrics');

  if (headingText) {
    headingText.textContent =
      'SmartLink is our ongoing STM32-to-STM32 nRF24 research platform for bidirectional telemetry, link-health classification, adaptive transmission power, and compact embedded hardware.';
  }

  if (researchCard) {
    const title = researchCard.querySelector('h3');
    const introduction = researchCard.querySelector('h3 + p');
    const tags = researchCard.querySelector('.research-tags');
    const directionNote = researchCard.querySelector('p.research-note');
    const experimentNote = researchCard.querySelector('div.research-note');

    if (title) {
      title.textContent = 'SmartLink: STM32 + nRF24L01 intelligent transceiver';
    }

    if (introduction) {
      introduction.textContent =
        'SmartLink is an ongoing low-cost wireless research project using STM32 and nRF24L01 modules. The system continuously sends and receives data, counts validated packets, detects communication loss, and classifies the link as healthy, degraded, critical, or lost.';
    }

    if (tags) {
      tags.innerHTML = `
        <span>STM32</span>
        <span>nRF24L01+</span>
        <span>Two-way Transceiver</span>
        <span>TinyML</span>
        <span>Adaptive PA Control</span>
        <span>Compact PCB</span>
        <span>Drone / Robot Research</span>
      `;
    }

    if (directionNote) {
      directionNote.textContent =
        'Current direction: collect a new bidirectional transceiver dataset and develop a transceiver-specific TinyML model. The first model was trained on a fixed one-way packet stream, so its absolute timing and jitter thresholds do not directly match the HELLO/HI ping-pong traffic pattern.';
    }

    if (experimentNote) {
      const currentPhase = document.createElement('div');
      currentPhase.className = 'research-note';
      currentPhase.innerHTML = `
        <strong>Current R&amp;D findings and next revision:</strong>
        <ul class="experiment-list">
          <li><strong>Two-way communication:</strong> Transceiver A and Transceiver B now continuously send, receive, reply, count packets, and show link status on compact OLED displays.</li>
          <li><strong>TinyML model mismatch identified:</strong> the original one-way model can report degraded or critical states when used with a different bidirectional timing pattern. This is treated as a research finding, not a final model failure.</li>
          <li><strong>New model phase:</strong> collect healthy, degraded, critical, disturbed, and no-signal data using the actual bidirectional protocol before training and validating the next TinyML classifier.</li>
          <li><strong>MCU evaluation:</strong> STM32F103C6 remains useful for prototyping, while a higher-performance STM32 series with more Flash, RAM, and processing capacity is being evaluated for the final TinyML implementation.</li>
          <li><strong>Final PCB Version 1 target:</strong> reduce the board size, improve RF layout and antenna clearance, and integrate automatic PA adjustment from MIN to LOW, HIGH, or MAX according to delivery success, packet loss, and link-health behavior.</li>
        </ul>
      `;

      researchCard.insertBefore(currentPhase, experimentNote);
    }
  }

  if (researchMetrics) {
    const metricsTitle = researchMetrics.querySelector('h3');
    const metricsList = researchMetrics.querySelector('ul');

    if (metricsTitle) {
      metricsTitle.textContent = 'Validated progress and next tests';
    }

    if (metricsList) {
      metricsList.innerHTML = `
        <li>Existing bench data validates packet counting, duplicate detection, loss tracking, and sensitivity to physical RF disturbance.</li>
        <li>The current TinyML model remains valid for its original one-way fixed-cadence test conditions.</li>
        <li>Next validation uses the real bidirectional transceiver protocol for model training and range testing.</li>
        <li>Adaptive PA control will lower power during stable links and raise power when ACK performance or link health deteriorates.</li>
        <li>A more capable STM32 family may be selected after measuring the final model's Flash, RAM, latency, and power requirements.</li>
        <li>Results remain prototype research data and are not yet final commercial reliability claims.</li>
      `;
    }
  }

  const roadmapCards = researchSection.querySelectorAll('.incoming-card');

  roadmapCards.forEach((card) => {
    const heading = card.querySelector('h3');
    const paragraph = card.querySelector('p');

    if (heading && heading.textContent.trim() === 'SmartLink PCB Revision') {
      heading.textContent = 'SmartLink PCB Version 1';

      if (paragraph) {
        paragraph.textContent =
          'Compact STM32 + nRF24 transceiver board with improved SPI and power routing, local decoupling, antenna keepout, enclosure-ready mounting, transceiver-specific TinyML health monitoring, and adaptive MIN/LOW/HIGH/MAX PA control. A higher-performance STM32 series is under evaluation for the final embedded model.';
      }
    }
  });
}
