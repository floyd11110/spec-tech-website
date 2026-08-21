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
        <p>Selected electronics, robotics, sensor, display, communication, power, and fabrication resources may be available for project testing, prototype development, and selected parts selling. Photos will be added per category.</p>
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
        <article class="parts-card"><div class="parts-photo">2 in-house 3D printers</div><h3>3D Printing & Fabrication Support</h3><p>Two in-house 3D printers support rapid prototyping of enclosures, sensor mounts, brackets, robot parts, mechanical test pieces, and custom components for electronics projects.</p><div class="parts-tags"><span>2× 3D Printers</span><span>PLA / PETG / TPU</span><span>Laser cut</span><span>Welding / metal work</span><span>Custom mounting</span></div></article>
      </div>
      <div class="parts-note"><strong>Note:</strong> Availability may change depending on current stock and ongoing projects. Message Spec-Tech for parts availability, pricing, setup assistance, 3D-printed prototype parts, or full prototype development.</div>
    </div>
  `;

  main.insertBefore(section, projects || document.getElementById('why') || document.getElementById('inquiry'));
})();

// Tutorial video buttons
(function addTutorialVideoButtons() {
  const videoLinks = {
    'setup-blink': 'https://www.facebook.com/reel/1004154882523878',
    'digital-read': 'https://www.facebook.com/reel/1433198171952762',
    'analog-write': 'https://www.facebook.com/reel/1407065797993800/?s=single_unit'
  };

  document.querySelectorAll('.tutorial-item[data-topic]').forEach((item) => {
    const topic = item.dataset.topic;
    const href = videoLinks[topic] || item.getAttribute('href');
    const content = item.querySelector('div');

    if (!href || !content || content.querySelector('.tutorial-watch-button')) return;

    const button = document.createElement('a');
    button.className = 'tutorial-watch-button';
    button.href = href;
    button.target = '_blank';
    button.rel = 'noopener';
    button.textContent = '▶ Watch Video';
    button.setAttribute('aria-label', `Watch ${content.querySelector('h3')?.textContent || 'tutorial'} video`);

    button.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    content.appendChild(button);
  });
})();

// Featured engineering portfolio
(function addFeaturedProjects() {
  const main = document.querySelector('main');
  const projects = document.getElementById('projects');
  if (!main || !projects || document.getElementById('featured-projects')) return;

  const style = document.createElement('style');
  style.textContent = `
    .featured-project-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
    .featured-project-card { position:relative; padding:24px; border:1px solid var(--line); border-radius:24px; background:linear-gradient(180deg,rgba(15,30,52,.95),rgba(7,17,31,.84)); box-shadow:var(--shadow); overflow:hidden; transition:transform .22s ease,border-color .22s ease; }
    .featured-project-card:hover { transform:translateY(-5px); border-color:rgba(56,189,248,.42); }
    .featured-project-card::after { content:""; position:absolute; width:140px; height:140px; right:-55px; top:-55px; border-radius:50%; background:rgba(56,189,248,.08); }
    .project-status { display:inline-flex; padding:6px 10px; margin-bottom:14px; border-radius:999px; background:rgba(56,189,248,.12); border:1px solid rgba(56,189,248,.25); color:#cdefff; font-size:11px; font-weight:900; letter-spacing:.06em; text-transform:uppercase; }
    .featured-project-card h3 { margin-bottom:10px; }
    .featured-project-card p { color:var(--muted); }
    .project-tech { display:flex; flex-wrap:wrap; gap:7px; margin-top:16px; }
    .project-tech span { padding:6px 9px; border-radius:999px; background:rgba(15,23,42,.72); border:1px solid rgba(148,163,184,.16); font-size:11px; font-weight:800; color:#dceffc; }
    @media(max-width:950px){.featured-project-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:620px){.featured-project-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.className = 'section';
  section.id = 'featured-projects';
  section.innerHTML = `
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Featured engineering work</p>
        <h2>Prototype, R&amp;D, and industrial proof-of-concept projects</h2>
        <p>Selected Spec-Tech development work covering embedded systems, robotics, AI vision, battery diagnostics, solar power electronics, and engineering instrumentation.</p>
      </div>
      <div class="featured-project-grid">
        <article class="featured-project-card"><span class="project-status">R&amp;D</span><h3>Battery Doctor</h3><p>STM32-based LiFePO4 diagnostic platform for cell-voltage monitoring, imbalance detection, load-sag observation, recovery behavior, and TFT-based battery health display.</p><div class="project-tech"><span>STM32</span><span>LiFePO4</span><span>TFT</span><span>Diagnostics</span></div></article>
        <article class="featured-project-card"><span class="project-status">R&amp;D</span><h3>SmartLink Wireless Telemetry</h3><p>STM32 + nRF24L01 telemetry research focused on valid packets, missed packets, duplicates, jitter, timeout behavior, and link-health feedback.</p><div class="project-tech"><span>STM32</span><span>nRF24L01</span><span>Telemetry</span><span>RF Testing</span></div></article>
        <article class="featured-project-card"><span class="project-status">Industrial PoC</span><h3>AI Sack Counter + Modbus</h3><p>Raspberry Pi camera vision proof of concept for detecting and counting sacks, with the counted value prepared for PLC integration through Modbus.</p><div class="project-tech"><span>Raspberry Pi 5</span><span>OpenCV</span><span>YOLO</span><span>Modbus</span></div></article>
        <article class="featured-project-card"><span class="project-status">Prototype</span><h3>LiDAR Autonomous Robot</h3><p>Mobile robotics platform using LiDAR obstacle sensing, Raspberry Pi processing, ESP32 motor control, and navigation logic for autonomous movement.</p><div class="project-tech"><span>LiDAR</span><span>Raspberry Pi</span><span>ESP32</span><span>Motor Control</span></div></article>
        <article class="featured-project-card"><span class="project-status">R&amp;D</span><h3>Smart MPPT Solar Controller</h3><p>Microcontroller-based solar charge-controller research using voltage/current sensing, MPPT algorithms, battery charging logic, and electrical protection.</p><div class="project-tech"><span>STM32</span><span>MPPT</span><span>Power Electronics</span><span>Solar</span></div></article>
        <article class="featured-project-card"><span class="project-status">Prototype</span><h3>Engineering Test Instruments</h3><p>Low-cost embedded test tools including oscilloscope, logic-analyzer, signal-generation, power-analysis, and serial visualization experiments.</p><div class="project-tech"><span>ESP32</span><span>STM32</span><span>Python</span><span>Data Acquisition</span></div></article>
      </div>
    </div>`;

  main.insertBefore(section, projects);
})();

// Engineering forum powered by GitHub Issues
(function addEngineeringForum() {
  const main = document.querySelector('main');
  const why = document.getElementById('why');
  const inquiryNav = navLinks ? navLinks.querySelector('a[href="#inquiry"]') : null;
  if (!main || document.getElementById('forum')) return;

  if (navLinks && inquiryNav && !navLinks.querySelector('a[href="#forum"]')) {
    const forumNav = document.createElement('a');
    forumNav.href = '#forum';
    forumNav.textContent = 'Forum';
    forumNav.addEventListener('click', closeMobileNav);
    navLinks.insertBefore(forumNav, inquiryNav);
  }

  const style = document.createElement('style');
  style.textContent = `
    .forum-wrap { display:grid; grid-template-columns:1.15fr .85fr; gap:22px; }
    .forum-panel,.forum-side { padding:26px; border-radius:26px; border:1px solid var(--line); background:rgba(8,18,34,.78); box-shadow:var(--shadow); }
    .forum-panel { background:radial-gradient(circle at 0% 0%,rgba(56,189,248,.13),transparent 35%),rgba(8,18,34,.82); }
    .forum-categories { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin:20px 0; }
    .forum-category { padding:14px; border-radius:16px; border:1px solid rgba(125,211,252,.16); background:rgba(2,8,23,.34); }
    .forum-category strong { display:block; margin-bottom:4px; }
    .forum-category span { color:var(--muted); font-size:13px; }
    .forum-rules { margin:16px 0 0; padding-left:20px; color:var(--muted); }
    .forum-rules li { margin-bottom:9px; }
    @media(max-width:850px){.forum-wrap{grid-template-columns:1fr}}
    @media(max-width:560px){.forum-categories{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const section = document.createElement('section');
  section.className = 'section alt';
  section.id = 'forum';
  section.innerHTML = `
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Community troubleshooting</p>
        <h2>Spec-Tech Engineering Forum</h2>
        <p>A public engineering discussion area for students, makers, and prototype builders. Questions are organized through GitHub Issues so wiring, code, logs, test results, and solutions can stay searchable.</p>
      </div>
      <div class="forum-wrap">
        <div class="forum-panel">
          <h3>Ask, troubleshoot, and document engineering problems</h3>
          <div class="forum-categories">
            <div class="forum-category"><strong>Embedded Systems</strong><span>Arduino, ESP32, STM32, sensors, displays</span></div>
            <div class="forum-category"><strong>Robotics</strong><span>Motors, LiDAR, navigation, control</span></div>
            <div class="forum-category"><strong>AI &amp; Vision</strong><span>Raspberry Pi, cameras, OpenCV, YOLO</span></div>
            <div class="forum-category"><strong>Power &amp; Solar</strong><span>Battery, MPPT, inverter, protection</span></div>
            <div class="forum-category"><strong>PCB &amp; Electronics</strong><span>Wiring, circuits, debugging, fabrication</span></div>
            <div class="forum-category"><strong>Capstone &amp; Thesis</strong><span>Feasibility, architecture, testing, defense</span></div>
          </div>
          <div class="hero-actions">
            <a class="button primary" href="https://github.com/floyd11110/spec-tech-website/issues/new?template=forum.yml" target="_blank" rel="noopener">Ask a Question</a>
            <a class="button secondary" href="https://github.com/floyd11110/spec-tech-website/issues" target="_blank" rel="noopener">Browse Discussions</a>
          </div>
        </div>
        <aside class="forum-side">
          <h3>Good forum posts include</h3>
          <ul class="forum-rules">
            <li>Exact controller, module, sensor, or software used.</li>
            <li>Power supply voltage and relevant wiring details.</li>
            <li>Error messages, serial logs, measurements, or screenshots.</li>
            <li>Short code section that reproduces the problem.</li>
            <li>Expected behavior versus actual behavior.</li>
            <li>No passwords, API keys, or private client information.</li>
          </ul>
        </aside>
      </div>
    </div>`;

  main.insertBefore(section, why || document.getElementById('inquiry'));
})();