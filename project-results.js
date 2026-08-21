const projectResultRecords = {
  'battery-doctor': {
    title: 'Bench Measurement Record',
    intro: 'The Battery Doctor development included real per-cell calibration and load-behavior checks. The values below reconstruct the recorded bench state from the development work so the project page reflects the work already completed.',
    metrics: [['Observed cell delta','0.049 V'],['Earlier low-cell delta','0.112 V'],['Recorded weak-cell load sag','142 mV'],['Low-cell event share','87%']],
    table: {
      headers: ['Channel','Cell voltage','Calibration factor'],
      rows: [['Cell 1','3.417 V','12.42647'],['Cell 2','3.409 V','12.40809'],['Cell 3','3.380 V','12.47537'],['Cell 4','3.368 V','12.68156']]
    },
    finding: 'The important diagnostic behavior was not only pack voltage. Cell 4 repeatedly appeared as the weaker channel in earlier tests, including a larger voltage delta and stronger load sag, which is exactly the type of cell-level behavior the Battery Doctor was designed to expose.'
  },
  'smartlink': {
    title: 'Wireless Reliability Test Record',
    intro: 'A recorded SmartLink run tracked valid packets, duplicates, and missed packets rather than reporting only a connected/disconnected state.',
    metrics: [['Valid packets','3,600'],['Duplicate packets','13'],['Missed packets','551'],['Valid / (valid + missed)','86.7%']],
    bars: [['Valid',3600,4164],['Missed',551,4164],['Duplicate',13,4164]],
    finding: 'The run demonstrated why packet identity and counters matter: a link can appear active while still losing a meaningful number of packets. The next development focus is therefore distance, interference, timing consistency, and recovery testing rather than simply checking reception.'
  },
  'ai-sack-counter': {
    title: 'Camera Pipeline Bench Record',
    intro: 'Before object-counting validation, the Raspberry Pi 5 camera pipeline was bench-tested for frame rate and exposure stability. This established the capture behavior that the later YOLO/counting stage must work with.',
    metrics: [['Stable observed frame rate','≈33.1 FPS'],['Frame rate while moving camera','≈14–15 FPS'],['Exposure time','30,000 µs'],['Analogue gain','4.0×']],
    bars: [['Stable camera',33.13,35],['Camera movement',15,35]],
    finding: 'The camera could sustain roughly 33 FPS in a stable scene, but motion caused a large temporary frame-rate reduction. A 30 ms exposure also improved brightness at the cost of motion sensitivity. These observations are relevant to sack-flow speed, blur, and detector timing.'
  },
  'lidar-autonomous-robot': {
    title: 'Navigation Configuration Record',
    intro: 'The autonomous robot was tuned using explicit LiDAR sectors, hysteresis thresholds, visual-target parameters, and a fixed-rate serial motor command interface.',
    metrics: [['Front obstacle ON','1100 mm'],['Front obstacle OFF','1350 mm'],['Side obstacle ON','350 mm'],['Side obstacle OFF','450 mm']],
    table: {
      headers: ['Parameter','Recorded value','Purpose'],
      rows: [['Front sector center','271.5°','Forward obstacle sector alignment'],['Front half-width','40°','Front obstacle coverage'],['Side sector centers','±90°','Left/right obstacle sectors'],['Side width','25°','Side obstacle coverage'],['AprilTag size','0.20 m','Pose/distance reference'],['Motor serial update','20 Hz','Low-level motion command rate']]
    },
    finding: 'The use of separate ON/OFF thresholds introduced hysteresis so the robot would not rapidly oscillate between obstacle and clear states near a single distance boundary. The same project also separated Raspberry Pi mission logic from ESP32 motor control.'
  },
  'smart-mppt': {
    title: 'Power-Stage Development Record',
    intro: 'The MPPT project progressed through component selection, sensing architecture, gate-drive planning, charge-stage logic, and algorithm selection before higher-power validation.',
    metrics: [['Initial prototype target','60 W class'],['Planned control','P&O → adaptive'],['Battery control','CC / CV / float'],['Controller class','STM32 / ESP32']],
    table: {
      headers: ['Subsystem','Development choice','Engineering purpose'],
      rows: [['Gate drive','IR2104-class driver','Drive switching MOSFET stage'],['MOSFET candidates','IRLZ44N / IRLB8743','Low-voltage switching tests'],['Inductor','100 µH / 6 A class','Buck energy storage'],['Current sensing','ACS712 / ADC sensing','PV/battery current feedback'],['Voltage sensing','Divider + ADC','PV and battery voltage feedback']]
    },
    finding: 'The design direction intentionally separates MPPT tracking from battery charge control. The controller must first find an efficient PV operating point, then obey battery current/voltage limits and protection conditions.'
  },
  'engineering-test-instruments': {
    title: 'Instrument Development Record',
    intro: 'Several embedded test instruments were built or configured as part of this project family, including a multichannel oscilloscope, logic analyzer, power analyzer, and signal-generation experiments.',
    metrics: [['ESP32 oscilloscope channels','4'],['Oscilloscope serial rate','921,600 baud'],['Logic-analyzer MCU','STM32'],['External ADC modules','3 × ADS1115']],
    table: {
      headers: ['Instrument','Recorded configuration','Development use'],
      rows: [['ESP32 oscilloscope','GPIO32 / 33 / 34 / 35','Four analog capture channels'],['STM32 logic analyzer','PB11, PA7, PA6, PA3, PA2, PA1, PA0','Digital protocol/timing capture'],['Power analyzer','ADS1115 + ACS712 + voltage sensing','Voltage/current/power measurements'],['Signal generator','Arduino Mega PWM','Known test signals for validation']]
    },
    finding: 'The common engineering theme is measurable limits. These tools are useful for prototype debugging, but their bandwidth, ADC accuracy, timing, input protection, and calibration must be characterized rather than assumed to match laboratory instruments.'
  },
  'water-quality': {
    title: 'Sensor Development Snapshot',
    intro: 'The water-monitoring work included live sensor checks for pH-related voltage and water temperature before the broader dashboard/control architecture was finalized.',
    metrics: [['Recorded pH reference voltage','≈2.4 V'],['Observed water temperature','≈29.5 °C'],['Primary controller','ESP32'],['Expansion direction','Hydroponics / greenhouse']],
    finding: 'The next useful validation step is not adding more sensors immediately, but calibrating the existing pH channel against known buffer solutions and recording repeatability over time.'
  },
  'gps-tracking': {
    title: 'Development Record',
    intro: 'The GPS project was structured as a reusable tracking architecture rather than a single fixed product. Development centered on position acquisition, wireless reporting, geofencing, and movement-history logging.',
    metrics: [['Core input','GPS position'],['Wireless options','GSM / LoRa / Wi-Fi'],['Primary logic','Tracking + geofence'],['Validation need','Static + route tests']],
    finding: 'The project is technically defined, but the archive does not yet contain a preserved numerical field log. The page therefore documents the implemented architecture and validation framework without inventing coordinate-accuracy results.'
  },
  'omni-mecanum-parts': {
    title: 'Mechanical Iteration Record',
    intro: 'The wheel project went through repeated dimensional revisions to improve roller contact, true omnidirectional behavior, fit, and vibration.',
    metrics: [['Roller count explored','8'],['Revised roller length','15 mm'],['Roller protrusion','3 mm'],['Earlier frame diameter','≈67 mm']],
    table: {
      headers: ['Iteration issue','Observed concern','Design response'],
      rows: [['Roller geometry','Insufficient/uneven contact','Adjusted roller length and protrusion'],['Wheel behavior','Concern about true omni motion','Compared omni and mecanum layouts'],['Vibration','Runout / roller transition concern','Revised spacing and support geometry'],['Manufacturability','Small rollers difficult to package','Moved dimensions toward printable, serviceable parts']]
    },
    finding: 'The main lesson from the iterations is that an omni or mecanum wheel is highly sensitive to roller geometry and support. A design can look correct in CAD but still vibrate or lose true lateral behavior if contact transitions are not smooth.'
  },
  'pcb-fabrication': {
    title: 'PCB Process Development Record',
    intro: 'The in-house PCB process was developed through real dry-film exposure and development trials rather than a single fixed recipe.',
    metrics: [['Recorded UV exposure trial','≈35 s'],['Artwork stack','1 bond paper'],['Developer observation','Process-sensitive'],['CAD tool','KiCad']],
    table: {
      headers: ['Process stage','Recorded observation','Engineering implication'],
      rows: [['UV exposure','~35 s test with printed mask','Exposure must be matched to lamp/mask opacity'],['Development','Cold-water / chemistry trials varied strongly','Temperature and concentration affect resist removal'],['Trace retention','Some methods removed desired trace resist','Developer process needed tighter control'],['Etching preparation','Dry-film adhesion was a major success criterion','Good development is required before copper etching']]
    },
    finding: 'The development work showed that the weak point was not simply exposure time. Photoresist adhesion, developer concentration, water temperature, mask opacity, and timing interact strongly, so the process needs a standardized repeatable workflow.'
  },
  'e-kulambo': {
    title: 'Environmental Sensor Bench Record',
    intro: 'The E-KULAMBO prototype included real turbidity-channel bench tests using air/no-water, clear water, and coffee-altered water samples.',
    metrics: [['No-water ADC','1868.7'],['Clear-water ADC','2233.4'],['Coffee-water ADC','≈2228'],['Clear-water output','≈1.800 V']],
    bars: [['No water',1868.7,2400],['Clear water',2233.4,2400],['Coffee water',2228,2400]],
    table: {
      headers: ['Condition','ADC','Approx. voltage','Observation'],
      rows: [['Air / no water','1868.7','1.506 V','Clearly separated from immersed condition'],['Clear water','2233.4','1.800 V','Strong water-presence response'],['Coffee-altered water','≈2228','≈1.795 V','Too close to clear water for reliable turbidity discrimination']]
    },
    finding: 'The bench result was useful because it revealed a limitation: the sensor clearly differentiated air from immersion, but the clear-water and coffee-water readings were almost identical. That means the current setup should not claim reliable quantitative turbidity measurement without better calibration or a different sensing method.'
  },
  'chicken-stress': {
    title: 'Prototype Development Record',
    intro: 'The poultry-monitoring prototype was built around short microphone recordings, environmental context, classifier output, and Firebase reporting.',
    metrics: [['Primary processor','Raspberry Pi'],['Audio source','Microphone'],['Environmental input','Temperature + humidity'],['Classifier outputs','NORMAL / STRESS / OTHER']],
    table: {
      headers: ['Pipeline stage','Implemented direction','Purpose'],
      rows: [['Audio capture','Short recording windows','Create repeatable analysis segments'],['Feature/classifier','Audio preprocessing + classification','Separate target vocalization patterns'],['Environment','Temperature/humidity logging','Provide heat-stress context'],['Cloud','Firebase','Store/report monitoring status']]
    },
    finding: 'The project should be interpreted as a non-invasive screening system. Audio classification can indicate patterns associated with stress-related behavior, but it does not biologically prove stress without an independently validated reference dataset.'
  },
  'garbage-robot': {
    title: 'Integrated Robot Development Record',
    intro: 'The garbage-collection robot combined a mobile navigation stack with a mechanical collection/dumping mechanism. Development covered sensing, target alignment, motor control, orientation, and linear-actuator operation.',
    metrics: [['Navigation sensor','2D LiDAR'],['Visual target','AprilTag'],['Orientation input','Gyro / IMU'],['Waste mechanism','Linear actuator']],
    table: {
      headers: ['Mission stage','Subsystem used','Development purpose'],
      rows: [['Search / navigate','LiDAR + drive motors','Move while maintaining obstacle awareness'],['Center / approach','Camera + AprilTag','Align robot with target'],['Orientation','Gyro / IMU','Support heading consistency'],['Collect / dump','Linear actuator','Execute mechanical waste-handling action'],['Return','Mission-state logic','Complete autonomous cycle']]
    },
    finding: 'A major strength of the architecture is modularity: navigation can be debugged independently from the waste-handling mechanism, while the full mission state machine determines when the actuator is allowed to operate.'
  }
};

function metricCards(items) {
  return `<div class="record-metrics">${(items || []).map(([label,value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>`;
}

function recordTable(data) {
  if (!data) return '';
  return `<div class="table-wrap"><table class="project-table"><thead><tr>${data.headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${data.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function barChart(items) {
  if (!items) return '';
  return `<div class="record-bars">${items.map(([label,value,max]) => `<div class="record-bar-row"><span>${label}</span><div class="record-bar-track"><i style="width:${Math.max(1,(value/max)*100)}%"></i></div><strong>${value}</strong></div>`).join('')}</div>`;
}

function renderProjectRecord(id) {
  const data = projectResultRecords[id];
  if (!data) return '';
  return `<article class="project-section wide development-record"><h2>${data.title}</h2><p>${data.intro}</p>${metricCards(data.metrics)}${barChart(data.bars)}${recordTable(data.table)}<div class="record-finding"><strong>Engineering finding</strong><p>${data.finding}</p></div></article>`;
}

const resultProjectId = new URLSearchParams(window.location.search).get('id');
if (resultProjectId && resultProjectId !== 'tobacco-smoke-detector') {
  const grid = document.querySelector('#projectContent .project-detail-grid');
  if (grid) {
    const statusSection = Array.from(grid.querySelectorAll('.project-section')).find((section) => section.querySelector('h2')?.textContent === 'Documentation Status');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = renderProjectRecord(resultProjectId);
    const node = wrapper.firstElementChild;
    if (node) grid.insertBefore(node, statusSection || null);
  }
}
