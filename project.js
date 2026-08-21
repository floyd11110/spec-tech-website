const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const hero = document.getElementById('projectHero');
const content = document.getElementById('projectContent');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => navLinks.classList.remove('open')));
}

const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const projects = Array.isArray(window.SPEC_PROJECTS) ? window.SPEC_PROJECTS : [];
const project = projects.find((item) => item.id === projectId);

function list(items) {
  return `<ul>${(items || []).map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function methodologySection(project) {
  const methodologies = {
    'battery-doctor': [
      'The Battery Doctor is evaluated using a staged bench procedure. Each voltage-sensing channel is first calibrated against a reference meter, then the monitored cells are observed at rest, under a controlled load, and during post-load recovery.',
      'Per-cell voltage, pack voltage, cell-to-cell delta, load sag, and recovery are compared to identify weak or imbalanced cells. Repeated measurements are used to separate normal ADC variation from persistent cell behavior.',
      'Higher-load and higher-series-count tests are introduced only after the sensing network, wiring, and protection limits have been verified.'
    ],
    'smartlink': [
      'SmartLink testing uses numbered packets transmitted at a controlled interval between two STM32 nodes. The receiver checks packet IDs and timestamps to identify valid packets, missed packets, duplicates, timing jitter, and timeout events.',
      'Bench runs are repeated under stable conditions first, then under progressively more difficult RF conditions such as increased distance, changing antenna orientation, nearby objects, and intentional interference.',
      'The main validation outputs are packet-success rate, missed-packet rate, duplicate rate, timing consistency, and link-recovery behavior after a temporary loss of communication.'
    ],
    'ai-sack-counter': [
      'The vision pipeline is tested using a fixed camera position and a defined counting region. Video frames are captured by the Raspberry Pi, processed by the detector, and converted into count events only when an object satisfies the selected crossing or tracking condition.',
      'Automatic counts are compared with a manual reference count for the same sequence. Testing is repeated with changes in lighting, object spacing, partial occlusion, and flow speed to identify conditions that produce missed counts or double counts.',
      'After the counting stage is stable, the validated count is written to the selected Modbus register and checked from the PLC side to confirm end-to-end data transfer.'
    ],
    'lidar-autonomous-robot': [
      'Robot validation is performed by separating the mission into sensing, navigation, target detection, and motor-control stages before combining them. LiDAR front and side sectors are first checked against known obstacle positions and distances.',
      'The Raspberry Pi then executes controlled search, approach, avoidance, and target-centering trials while motion commands are sent to the ESP32 motor controller. AprilTag detection is tested independently before being added to the navigation sequence.',
      'Integrated trials record obstacle response, stopping behavior, target-centering consistency, approach distance, and mission completion so that failures can be traced to sensing, logic, communication, or drivetrain behavior.'
    ],
    'smart-mppt': [
      'MPPT development begins with calibration of PV voltage, battery voltage, and current-sensing channels against reference instruments. The power stage is then tested at reduced power before algorithm testing begins.',
      'During tracking tests, PV voltage and current are sampled and converted to input power. The controller perturbs the operating point and observes whether the measured power moves toward or away from the maximum-power region.',
      'Battery-side validation is performed separately for current limiting, constant-voltage behavior, float transition, thermal behavior, and protection responses. Efficiency and tracking performance are calculated only from measured input and output data.'
    ],
    'engineering-test-instruments': [
      'Each embedded instrument is tested against known reference signals or reference meters. Input amplitude, frequency, duty cycle, and waveform type are varied within the intended operating range while the MCU measurement is compared with the reference value.',
      'Sampling-rate, serial-throughput, trigger behavior, ADC scaling, timing accuracy, and noise are evaluated independently so that the practical limits of the low-cost instrument are documented instead of assuming laboratory-instrument performance.',
      'Calibration factors and error trends are recorded and used to refine firmware calculations and PC-side visualization.'
    ],
    'water-quality': [
      'Water-monitoring validation starts with individual sensor calibration before multi-sensor integration. The pH channel is checked using known reference solutions, while temperature and level readings are compared with independent reference measurements.',
      'Repeated readings are collected under stable conditions to evaluate drift and short-term noise. The same sensor inputs are then passed through the ESP32 status and dashboard logic to verify that displayed values and alerts match the measured conditions.',
      'Long-duration testing is used to identify probe drift, contamination effects, communication dropouts, and enclosure or wiring issues.'
    ],
    'gps-tracking': [
      'GPS testing begins with static outdoor measurements at known locations to establish satellite-lock time and position repeatability. The device is then moved along a known route while coordinates and timestamps are logged.',
      'Recorded tracks are compared with reference locations or map features to estimate practical position error. Communication testing records successful uploads, delayed messages, and periods with no network coverage.',
      'Geofence tests deliberately cross a defined boundary several times to verify entry, exit, and event-reporting behavior.'
    ],
    'omni-mecanum-parts': [
      'Mechanical validation starts with dimensional inspection of the printed wheel body, roller spacing, bearing fit, shaft alignment, and roller protrusion. Each roller is checked for free movement before drive testing.',
      'The assembled wheel is then evaluated for straight motion, lateral or diagonal motion where applicable, rotation, vibration, runout, and traction. Observed mechanical problems are traced back to geometry, material stiffness, print accuracy, or bearing alignment.',
      'CAD dimensions and print settings are revised between iterations, allowing each prototype version to be compared with the previous one.'
    ],
    'pcb-fabrication': [
      'PCB process development uses controlled exposure, development, and etching trials. Test patterns containing different trace widths, clearances, pads, and text are used so that process resolution can be inspected directly.',
      'Exposure time and developer conditions are changed one variable at a time. After development and etching, the board is inspected for missing traces, bridges, undercutting, incomplete development, and dimensional loss.',
      'Successful settings are repeated on later boards to determine whether the process is repeatable enough for routine prototype fabrication.'
    ],
    'e-kulambo': [
      'The E-KULAMBO prototype is tested in two stages: sensor-response validation and fuzzy-risk validation. Temperature, humidity, wet/rain, and turbidity-related inputs are first checked individually under controlled conditions.',
      'Validated sensor values are normalized and passed into the fuzzy-logic rules. Representative combinations are then applied to confirm that the resulting Normal, Moderate, or Critical-style status follows the intended rule behavior.',
      'Fault tests are also included so that a failed or invalid sensor reading does not stop the LCD, indicators, or dashboard from continuing to operate. The system is evaluated as an environmental risk-warning prototype, not as a dengue-virus detector or mosquito counter.'
    ],
    'chicken-stress': [
      'Audio validation uses short recorded windows that are preprocessed and converted into the feature representation required by the classifier. Each sample is assigned a reference label before classifier output is compared with that label.',
      'Temperature and humidity are logged alongside the audio result as environmental context rather than being treated as proof of biological stress. Repeated trials should include normal vocalization, target stress-related examples, and unrelated or noisy audio.',
      'Performance is evaluated using class counts, false positives, false negatives, and a confusion matrix once a sufficiently labeled dataset is available. The output remains a screening indicator and is not treated as a biological diagnosis.'
    ],
    'garbage-robot': [
      'The garbage-collection robot is validated subsystem by subsystem before full autonomous runs. LiDAR obstacle sensing, camera/AprilTag detection, orientation sensing, drivetrain response, and linear-actuator operation are tested independently first.',
      'Integrated trials then execute the mission states in sequence: search, center, approach, avoid, align, dock, collection or dumping action, and return. Each transition is observed to confirm that the robot advances only when the required sensor condition is satisfied.',
      'Mission completion, obstacle-response distance, tag-alignment behavior, actuator cycle completion, and recovery from failed detections are recorded to guide mechanical and software revisions.'
    ]
  };

  const paragraphs = methodologies[project.id];
  if (!paragraphs) return '';
  return `<article class="project-section wide"><h2>Development Methodology</h2>${paragraphs.map((text) => `<p>${text}</p>`).join('')}</article>`;
}

function tobaccoResearchSections() {
  const trials = [
    ['P1', 'Paper', '1', 'NO SMOKING', 'Correct'],
    ['P2', 'Paper', '1', 'NO SMOKING', 'Correct'],
    ['P3', 'Paper', '2', 'NO SMOKING', 'Correct'],
    ['P4', 'Paper', '2', 'NO SMOKING', 'Correct'],
    ['P5', 'Paper', '1', 'NO SMOKING', 'Correct'],
    ['Y1', 'Cigarette', '3', 'SMOKING', 'Correct'],
    ['Y2', 'Cigarette', '3', 'SMOKING', 'Correct'],
    ['Y3', 'Cigarette', '3', 'SMOKING', 'Correct'],
    ['Y4', 'Cigarette', '3', 'SMOKING', 'Correct'],
    ['Y5', 'Cigarette', '3', 'SMOKING', 'Correct']
  ];

  const timeline = [
    ['V1.0', 'Speed / rise-to-threshold', 'Paper and cigarette could both rise rapidly.', 'Abandoned pure speed-based classification.'],
    ['V2.0', 'Fixed temporal window + pulse counting', 'Paper airflow and turbulence created artificial pulses.', 'Added recovery / rearm logic.'],
    ['V2.1', 'Return-near-baseline rearm', 'Paper classified correctly, but real cigarette TVOC could stay elevated and block rearm.', 'Baseline-return rule judged too strict.'],
    ['V2.2', 'Dynamic window + MQ/TVOC confirmation + valleys/rebounds', 'Cigarette trials could produce POSSIBLE TOBACCO, but overlap remained.', 'Improved event-end logic.'],
    ['V2.3', 'Binary classifier using confirmed bursts', 'Paper produced 2, 3, or 4 bursts while some cigarette trials produced only 2.', 'Burst count alone abandoned.'],
    ['V2.4', 'Separated smoke episodes after confirmed recovery', '5/5 paper and 5/5 cigarette trials classified correctly in the initial controlled benchmark.', 'Current frozen classifier for next validation stage.']
  ];

  return `
    <article class="project-section wide research-highlight">
      <h2>V2.4 Research Update</h2>
      <p>The current classifier no longer treats raw concentration magnitude or every local peak as the main discriminator. It identifies <strong>independently separated smoke episodes</strong>: smoke activity must be followed by confirmed recovery before another event can count as a new episode. Three qualified episodes within a 180-second observation window are required for <code>SMOKING DETECTED</code>.</p>
      <div class="research-metrics">
        <div><strong>10/10</strong><span>correct controlled trials</span></div>
        <div><strong>5/5</strong><span>paper → no smoking</span></div>
        <div><strong>5/5</strong><span>cigarette → smoking</span></div>
        <div><strong>3</strong><span>episodes required</span></div>
      </div>
      <p class="project-caution"><strong>Correct interpretation:</strong> V2.4 achieved 100% observed classification accuracy across 10 controlled bench trials. This does not mean the detector is universally 100% accurate.</p>
    </article>

    <article class="project-section wide">
      <h2>Developmental Testing Methodology</h2>
      <p>The smoking-detection algorithm was developed iteratively using an ESP32, an MQ-135 gas sensor, and an SGP30 total volatile organic compound sensor. Known cigarette-smoking events and paper-combustion events were used as controlled sources to test whether the combined temporal responses of both sensors could distinguish smoking-related behavior from non-cigarette combustion.</p>
      <p>Before testing, the sensors were allowed to stabilize for 180 seconds. A clean-air baseline was then calculated from 20 samples. The system sampled the MQ-135 and SGP30 at approximately one-second intervals and worked mainly from changes relative to baseline rather than relying on absolute sensor values.</p>
      <p>Early versions tested rise speed, peak concentration, event duration, pulse count, recovery, valleys, and TVOC rebounds. These experiments showed substantial overlap. Paper combustion could saturate the SGP30 at 60,000 and could generate multiple local peaks, while some cigarette trials produced weaker peaks. Because of this, magnitude and simple burst counting were rejected as primary discriminators.</p>
      <p>V2.4 introduced an episode-based temporal classifier. A smoke exposure is first confirmed using simultaneous MQ-135 and TVOC response thresholds. A new episode is accepted only after the current episode has shown sufficient recovery for multiple consecutive samples and after the minimum start-gap requirement has been satisfied.</p>
    </article>

    <article class="project-section wide">
      <h2>V2.4 Final Parameters</h2>
      <div class="parameter-grid">
        <div><span>MQ sensor</span><strong>MQ-135 · GPIO34</strong></div>
        <div><span>VOC sensor</span><strong>SGP30 · SDA21 / SCL22</strong></div>
        <div><span>Warm-up</span><strong>180 s</strong></div>
        <div><span>Baseline</span><strong>20 samples</strong></div>
        <div><span>Sampling</span><strong>≈ 1 Hz</strong></div>
        <div><span>MQ delta threshold</span><strong>20</strong></div>
        <div><span>TVOC delta threshold</span><strong>800</strong></div>
        <div><span>Required episodes</span><strong>3</strong></div>
        <div><span>Observation window</span><strong>180 s</strong></div>
        <div><span>Minimum start gap</span><strong>15 s</strong></div>
        <div><span>Recovery fraction</span><strong>35%</strong></div>
        <div><span>Recovery confirmation</span><strong>3 samples</strong></div>
        <div><span>Minimum recovery TVOC Δ</span><strong>300</strong></div>
        <div><span>Minimum fresh TVOC rise</span><strong>700</strong></div>
      </div>
    </article>

    <article class="project-section wide">
      <h2>Algorithm Evolution</h2>
      <div class="table-wrap"><table class="project-table"><thead><tr><th>Version</th><th>Main logic</th><th>Finding</th><th>Decision</th></tr></thead><tbody>${timeline.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <figure class="project-graph"><img src="assets/tobacco/algorithm_evolution.svg" alt="Algorithm evolution from V1.0 speed threshold through V2.4 separated smoke episodes"><figcaption>Classifier development moved from speed and burst-count approaches toward independently separated smoke episodes.</figcaption></figure>
    </article>

    <article class="project-section wide">
      <h2>V2.4 Controlled Benchmark — 5 Paper + 5 Cigarette</h2>
      <div class="table-wrap"><table class="project-table"><thead><tr><th>Trial</th><th>Ground truth</th><th>Episodes</th><th>Predicted result</th><th>Outcome</th></tr></thead><tbody>${trials.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <div class="graph-grid">
        <figure class="project-graph"><img src="assets/tobacco/v2_4_episode_count.svg" alt="Bar graph showing one to two episodes for paper and three episodes for cigarette trials"><figcaption>Paper trials produced 1–2 episodes; all cigarette trials produced 3 episodes in the initial benchmark.</figcaption></figure>
        <figure class="project-graph"><img src="assets/tobacco/v2_4_average_episodes.svg" alt="Average qualified episode count of 1.4 for paper and 3.0 for cigarette trials"><figcaption>Average qualified episode count: paper 1.4, cigarette 3.0.</figcaption></figure>
        <figure class="project-graph"><img src="assets/tobacco/v2_4_confusion_matrix.svg" alt="Confusion matrix with five true positives, five true negatives, zero false positives and zero false negatives"><figcaption>Initial V2.4 controlled benchmark: TP=5, TN=5, FP=0, FN=0.</figcaption></figure>
      </div>
    </article>

    <article class="project-section wide research-highlight">
      <h2>Key Engineering Finding</h2>
      <p><strong>Sensor magnitude alone could not distinguish cigarette smoke from paper smoke.</strong> Paper repeatedly produced very strong MQ-135 and SGP30 responses and could saturate the SGP30 at 60,000. Paper could also generate several local rebounds because of turbulence and airflow. Conversely, a real cigarette exposure could be comparatively weak.</p>
      <p>This is why the final classifier evaluates temporal behavior and separated smoke episodes instead of assuming that a higher TVOC value or more local peaks automatically means cigarette smoking.</p>
    </article>

    <article class="project-section wide">
      <h2>Research Limitation</h2>
      <p>The MQ-135 and SGP30 are broad gas / VOC-response sensors and are <strong>not tobacco-specific chemical analyzers</strong>. The prototype therefore does not chemically prove the presence of tobacco. It classifies smoking-related events from the combined temporal response pattern of the two sensors. Additional real-world validation with more smoke sources, environmental conditions, placements, and users is still required.</p>
    </article>`;
}

if (!project) {
  document.title = 'Project Not Found | Spec-Tech';
  hero.innerHTML = `<div class="project-hero-card"><h1>Project not found</h1><p class="project-subtitle">The requested project detail page is not available yet.</p></div>`;
  content.innerHTML = `<div class="project-empty">This project may still be waiting for documentation. <a href="archive.html">Return to the Project Archive</a>.</div>`;
} else {
  const tobacco = project.id === 'tobacco-smoke-detector';
  const displayProject = tobacco ? {
    ...project,
    subtitle: 'ESP32 temporal smoke-pattern classifier using MQ-135 + SGP30 with controlled paper-vs-cigarette validation.',
    tags: ['ESP32', 'MQ-135', 'SGP30', 'Temporal Classification', 'Firebase', 'Smoke / VOC']
  } : project;

  document.title = `${displayProject.title} | Spec-Tech Project Archive`;
  hero.innerHTML = `
    <div class="project-hero-card">
      <div class="project-meta-row">
        <span class="project-badge">${displayProject.status}</span>
        <span class="project-year">${displayProject.year}</span>
        ${(displayProject.categories || []).map((item) => `<span class="project-category">${item}</span>`).join('')}
      </div>
      <h1>${displayProject.title}</h1>
      <p class="project-subtitle">${displayProject.subtitle}</p>
      <div class="project-tags">${(displayProject.tags || []).map((item) => `<span>${item}</span>`).join('')}</div>
      <div class="project-actions">
        <a class="button primary" href="index.html#inquiry">Start a Similar Project</a>
        <a class="button secondary" href="archive.html">Browse More Projects</a>
      </div>
    </div>`;

  const standardContent = `
    <div class="project-detail-grid">
      <article class="project-section wide"><h2>Project Overview</h2><p>${tobacco ? 'A low-cost tobacco-smoking event detection prototype that combines MQ-135 gas response and SGP30 TVOC response with temporal episode analysis. The project evolved through multiple classifier versions after bench tests showed that smoke concentration and local peak count alone could not reliably separate cigarette smoke from paper combustion.' : project.overview}</p></article>
      <article class="project-section"><h2>Objective</h2><p>${project.objective}</p></article>
      <article class="project-section"><h2>Hardware Used / Planned</h2>${tobacco ? list(['ESP32 development board', 'MQ-135 gas sensor on GPIO34', 'SGP30 TVOC sensor on I²C GPIO21 / GPIO22', 'Green / red status LEDs', 'Buzzer alarm', 'Firebase connectivity for monitoring / logging']) : list(project.hardware)}</article>
      <article class="project-section wide"><h2>System Architecture</h2><div class="project-flow">${(tobacco ? ['MQ-135 + SGP30 acquisition', 'Clean-air baseline', 'Smoke episode confirmation', 'Recovery + rearm validation', '3 episodes / 180 s classification', 'Local alarm + Firebase'] : project.architecture || []).map((item) => `<div>${item}</div>`).join('')}</div></article>
      <article class="project-section"><h2>Software / Logic</h2>${tobacco ? list(['32-sample MQ averaging', 'Baseline-relative ΔMQ and ΔTVOC calculation', 'Episode start / recovery state machine', 'Minimum temporal separation between episodes', 'Binary SMOKING DETECTED / NO SMOKING DETECTED output']) : list(project.software)}</article>
      <article class="project-section"><h2>Testing & Validation</h2>${tobacco ? list(['Developmental tests from V1.0 through V2.3 exposed failure modes', 'V2.4 initial benchmark used five paper-combustion and five cigarette-smoking trials', 'Paper produced 1–2 qualified episodes', 'Cigarette produced 3 qualified episodes in all five controlled trials']) : list(project.testing)}</article>
      ${!tobacco ? methodologySection(project) : ''}
      <article class="project-section"><h2>Current Limitations</h2>${tobacco ? list(['Broad-response gas/VOC sensors are not tobacco-specific', '10 controlled trials are preliminary and do not establish universal accuracy', 'Performance may change with airflow, room size, source distance, sensor aging, contamination, and other VOC sources']) : list(project.limitations)}</article>
      <article class="project-section"><h2>Future Improvements</h2>${tobacco ? list(['Expand validation dataset beyond paper and cigarette smoke', 'Test incense, cooking smoke, perfume, alcohol vapors, and other VOC interferents', 'Test multiple distances, airflow conditions, and room environments', 'Add threshold / reset controls only after the classifier remains stable']) : list(project.future)}</article>
      ${tobacco ? tobaccoResearchSections() : ''}
      <article class="project-section wide"><h2>Documentation Status</h2><p>${tobacco ? 'The project page now documents the algorithm evolution, V2.4 methodology, final parameters, controlled 5+5 benchmark, graphs, confusion matrix, engineering findings, and limitations. Additional raw logs, photos, circuit diagrams, and longer real-world validation can be added as testing continues.' : 'This page contains the currently documented technical scope and project-specific development methodology. Performance datasets, graphs, photos, circuit diagrams, source-code links, measured results, and build notes can be expanded as validation progresses.'}</p></article>
    </div>`;

  content.innerHTML = standardContent;
}
