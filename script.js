const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const copyButton = document.getElementById('copyInquiry');
const inquiryText = document.getElementById('inquiryText');
const copyStatus = document.getElementById('copyStatus');

function closeMobileNav() {
  if (navLinks) navLinks.classList.remove('open');
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileNav);
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

// Prototype parts categories section
(function addPartsCategories() {
  const main = document.querySelector('main');
  const projects = document.getElementById('projects');
  const navInquiry = navLinks ? navLinks.querySelector('a[href="#inquiry"]') : null;

  if (!main || document.getElementById('parts')) return;

  if (navLinks && navInquiry && !navLinks.querySelector('a[href="#parts"]')) {
    const partsNav = document.createElement('a');
    partsNav.href = '#parts';
    partsNav.textContent = 'Parts';
    partsNav.addEventListener('click', closeMobileNav);
    navLinks.insertBefore(partsNav, navInquiry);
  }

  const style = document.createElement('style');
  style.textContent = `
    .parts-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .parts-card { border: 1px solid var(--line); background: rgba(8,18,34,.72); border-radius: 24px; padding: 22px; box-shadow: var(--shadow); transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease; }
    .parts-card:hover { transform: translateY(-5px); border-color: rgba(56,189,248,.36); box-shadow: 0 24px 65px rgba(8,47,73,.26); }
    .parts-photo { min-height: 130px; border: 1px dashed rgba(148,163,184,.28); border-radius: 18px; display: grid; place-items: center; margin-bottom: 16px; background: radial-gradient(circle at 50% 0%, rgba(56,189,248,.12), transparent 45%), rgba(2,8,23,.5); color: var(--muted); font-size: 13px; font-weight: 800; text-align: center; }
    .parts-card h3 { margin-bottom: 10px; }
    .parts-card p { color: var(--muted); }
    .parts-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
    .parts-tags span { padding: 7px 10px; border-radius: 999px; border: 1px solid rgba(148,163,184,.18); background: rgba(15,23,42,.65); color: #dff5ff; font-size: 12px; font-weight: 800; }
    .parts-note { margin-top: 22px; padding: 18px; border-radius: 20px; border: 1px solid rgba(245,158,11,.22); background: rgba(245,158,11,.08); color: var(--muted); }
    @media (max-width: 900px) { .parts-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 620px) { .parts-grid { grid-template-columns: 1fr; } .parts-card { padding: 20px; border-radius: 20px; } .parts-photo { min-height: 105px; } }
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'parts';
  section.innerHTML = `
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Prototype inventory</p>
        <h2>Available parts and prototype components</h2>
        <p>Selected electronics, robotics, sensor, display, communication, and power modules may be available for project testing, prototype development, and selected parts selling. Photos will be added per category.</p>
      </div>
      <div class="parts-grid">
        <article class="parts-card"><div class="parts-photo">Photo to follow</div><h3>Microcontrollers & Boards</h3><p>For embedded systems, IoT control, robotics logic, and sensor integration.</p><div class="parts-tags"><span>Arduino</span><span>ESP32</span><span>STM32</span><span>Raspberry Pi Pico</span></div></article>
        <article class="parts-card"><div class="parts-photo">Photo to follow</div><h3>Sensors & Measurement</h3><p>For capstone projects that need monitoring, detection, calibration, and data collection.</p><div class="parts-tags"><span>pH</span><span>Temperature</span><span>Ultrasonic</span><span>ToF</span><span>IMU</span><span>GPS</span></div></article>
        <article class="parts-card"><div class="parts-photo">Photo to follow</div><h3>Displays & Interfaces</h3><p>For dashboards, status screens, menus, sensor readings, and user feedback.</p><div class="parts-tags"><span>LCD</span><span>OLED</span><span>TFT</span><span>Touchscreen</span></div></article>
        <article class="parts-card"><div class="parts-photo">Photo to follow</div><h3>Robotics & Motor Control</h3><p>For mobile robots, line followers, motorized prototypes, and automation mechanisms.</p><div class="parts-tags"><span>Motor drivers</span><span>DC motors</span><span>Servo</span><span>Chassis</span><span>Wheels</span></div></article>
        <article class="parts-card"><div class="parts-photo">Photo to follow</div><h3>Communication Modules</h3><p>For wireless telemetry, remote monitoring, dashboards, tracking, and device-to-device links.</p><div class="parts-tags"><span>WiFi</span><span>Bluetooth</span><span>nRF24L01</span><span>GSM</span><span>GPS</span></div></article>
        <article class="parts-card"><div class="parts-photo">Photo to follow</div><h3>Power, Battery & Solar</h3><p>For power regulation, battery monitoring, solar prototypes, and safer electronics testing.</p><div class="parts-tags"><span>Buck converter</span><span>LiFePO4</span><span>BMS</span><span>Voltage sensing</span><span>MPPT</span></div></article>
        <article class="parts-card"><div class="parts-photo">Photo to follow</div><h3>Computer Vision & AI Boards</h3><p>For camera monitoring, object detection experiments, AI-assisted systems, and edge vision prototypes.</p><div class="parts-tags"><span>ESP32-CAM</span><span>Raspberry Pi</span><span>Jetson</span><span>LuckFox</span><span>Camera</span></div></article>
        <article class="parts-card"><div class="parts-photo">Photo to follow</div><h3>PCB, Wiring & Connectors</h3><p>For cleaner prototype builds, safer connections, easier debugging, and enclosure-ready wiring.</p><div class="parts-tags"><span>PCB</span><span>Headers</span><span>Terminals</span><span>Connectors</span><span>Wires</span></div></article>
        <article class="parts-card"><div class="parts-photo">Photo to follow</div><h3>Tools & Fabrication Support</h3><p>For mounting, brackets, enclosures, frames, and workshop-supported prototype assembly.</p><div class="parts-tags"><span>3D print</span><span>Laser cut</span><span>Metal work</span><span>Mounting</span></div></article>
      </div>
      <div class="parts-note"><strong>Note:</strong> Availability may change depending on current stock and ongoing projects. Message Spec-Tech for parts availability, pricing, setup assistance, or full prototype development.</div>
    </div>
  `;

  main.insertBefore(section, projects || document.getElementById('why') || document.getElementById('inquiry'));
})();
