const validationLibrary = {
  'battery-doctor': {
    scope: 'Battery Doctor validation focuses on measurement accuracy, cell-to-cell comparison, load-sag behavior, recovery behavior, and the ability of the diagnostic logic to identify abnormal cell conditions without relying on pack voltage alone.',
    procedure: ['Calibrate each voltage channel against a reference multimeter at multiple cell-voltage points.', 'Record stable no-load cell voltages and calculate cell-to-cell delta.', 'Apply a controlled load and record instantaneous and sustained voltage sag per cell.', 'Remove the load and record recovery over time.', 'Repeat the same cycle to check repeatability and identify persistent weak-cell behavior.'],
    metrics: ['Per-channel voltage error', 'Cell-to-cell voltage delta', 'Maximum load sag per cell', 'Recovery voltage and recovery time', 'Repeatability across repeated test cycles'],
    matrix: [['Calibration','Multiple known cell voltages','Compare STM32 reading with reference meter'],['Resting balance','All cells at rest','Measure pack and individual-cell delta'],['Load sag','Controlled discharge load','Compare sag between cells'],['Recovery','Load removed','Observe recovery trend and weak-cell persistence']]
  },
  'smartlink': {
    scope: 'SmartLink validation measures communication quality rather than treating reception as simply connected or disconnected. Packet identity and timing are used to quantify reliability and link-health behavior.',
    procedure: ['Transmit sequentially numbered packets at a fixed interval.', 'Record valid, duplicate, missed, and out-of-order packets on the receiver.', 'Measure packet interval variation and timeout behavior.', 'Repeat the test with increased distance and changed antenna orientation.', 'Introduce temporary blockage or interference and observe recovery after the disturbance is removed.'],
    metrics: ['Packet success ratio', 'Missed-packet count', 'Duplicate-packet count', 'Packet interval jitter', 'Timeout and recovery time'],
    matrix: [['Stable bench','Short range / clear path','Establish baseline reliability'],['Distance','Progressively longer range','Observe packet-loss trend'],['Orientation','Rotate module / antenna','Measure sensitivity to placement'],['Recovery','Temporary link interruption','Verify timeout and reconnection behavior']]
  },
  'ai-sack-counter': {
    scope: 'The AI sack-counting system is validated as an end-to-end vision node: image capture, object detection, count-event generation, and Modbus transfer are evaluated separately before industrial integration.',
    procedure: ['Fix the camera position and define the counting line or counting region.', 'Record sequences with a known manual sack count.', 'Run the detector and compare automatic count against the manual reference.', 'Repeat under different lighting, spacing, flow speed, and partial occlusion.', 'Write the accepted count to the Modbus register and verify that the PLC reads the same value.'],
    metrics: ['Manual count versus automatic count', 'Missed-count rate', 'Double-count rate', 'Detection confidence / tracking continuity', 'Modbus count agreement'],
    matrix: [['Normal flow','Good lighting / separated sacks','Baseline count agreement'],['Dense flow','Reduced spacing','Check double-count and occlusion behavior'],['Lighting change','Bright / dim / shadow','Check detection stability'],['PLC transfer','Validated count event','Confirm register value and update timing']]
  },
  'lidar-autonomous-robot': {
    scope: 'Autonomous-robot validation separates perception, navigation, target detection, motor control, and mission-state behavior so that a failed run can be traced to a specific subsystem.',
    procedure: ['Verify LiDAR front and side sectors against known obstacle distances.', 'Test forward, turning, stopping, and speed commands independently on the ESP32 motor controller.', 'Validate AprilTag detection and centering while the robot is stationary.', 'Combine sensing and motion for controlled approach and obstacle-avoidance trials.', 'Run complete mission sequences and log where state transitions succeed or fail.'],
    metrics: ['Obstacle detection distance', 'Stopping response', 'Target-centering error', 'Approach consistency', 'Mission completion and failure state'],
    matrix: [['Obstacle test','Known front/side obstacles','Verify detection and stop/avoid response'],['Tag centering','Visible AprilTag','Measure centering behavior'],['Approach','Target at controlled distance','Observe stop distance and alignment'],['Mission run','Search → approach → avoid → target','Check full state-machine completion']]
  },
  'smart-mppt': {
    scope: 'MPPT validation covers sensing accuracy, tracking behavior, battery charge control, thermal performance, and conversion efficiency. Tracking results are separated from battery-charge-stage testing.',
    procedure: ['Calibrate PV voltage, PV current, battery voltage, and battery current channels.', 'Run the power stage at reduced power and verify switching, temperature, and current limits.', 'Record PV voltage and current while the MPPT algorithm perturbs the operating point.', 'Apply controlled changes in source or load conditions and observe tracking response.', 'Test battery current limiting, constant-voltage transition, float behavior, and protection logic.'],
    metrics: ['Voltage/current sensing error', 'PV input power', 'MPPT settling behavior', 'Input-to-output efficiency', 'Battery charge-stage stability and thermal rise'],
    matrix: [['Sensor calibration','Reference voltage/current','Verify measurement accuracy'],['Tracking','Changing source/load','Observe movement toward maximum-power region'],['Charge control','Battery at different SOC','Check CC/CV/float transitions'],['Thermal/protection','Sustained load','Observe temperature and fault limits']]
  },
  'engineering-test-instruments': {
    scope: 'The embedded instrument set is evaluated against known reference signals so that practical bandwidth, timing, ADC, scaling, and serial-throughput limits are documented instead of overstating laboratory-grade performance.',
    procedure: ['Generate or apply a known reference signal.', 'Compare measured amplitude, frequency, pulse width, or duty cycle with the reference.', 'Increase signal frequency or update rate until measurement quality begins to degrade.', 'Record noise, timing variation, and serial throughput.', 'Apply calibration factors and repeat the measurement to quantify improvement.'],
    metrics: ['Amplitude / voltage error', 'Frequency error', 'Duty-cycle / timing error', 'Maximum stable sampling or transfer rate', 'Noise and repeatability'],
    matrix: [['DC level','Known voltage','Validate ADC scaling'],['Square/PWM','Known frequency and duty','Validate timing measurements'],['Throughput','Increasing sample rate','Find stable serial-transfer limit'],['Noise','Stable input','Measure baseline variation']]
  },
  'water-quality': {
    scope: 'Water-monitoring validation checks individual sensors first, then verifies that the ESP32 reporting and alarm logic correctly reflects calibrated sensor conditions over repeated and longer-duration tests.',
    procedure: ['Calibrate the pH channel using known reference solutions.', 'Compare water temperature with a reference thermometer.', 'Verify level sensing at several known distances or levels.', 'Record repeated readings under stable conditions to evaluate short-term noise.', 'Run longer-duration monitoring to observe drift, communication stability, and alert behavior.'],
    metrics: ['pH calibration error', 'Temperature error', 'Level measurement error', 'Short-term repeatability', 'Long-duration drift and alert consistency'],
    matrix: [['pH calibration','Reference solutions','Fit/check calibration response'],['Temperature','Known water temperature','Compare with reference'],['Level','Known level/distance points','Verify range response'],['Stability','Extended monitoring','Observe drift and dashboard continuity']]
  },
  'gps-tracking': {
    scope: 'GPS tracking validation combines positioning, movement logging, communication reliability, and geofence behavior. Static and moving tests are separated so that coordinate repeatability can be distinguished from route-tracking performance.',
    procedure: ['Measure satellite-lock time in an outdoor location.', 'Log repeated coordinates while the device remains stationary.', 'Move along a known route and record coordinates with timestamps.', 'Compare the recorded track against known map features or reference points.', 'Cross a defined geofence repeatedly and verify entry/exit event reporting.'],
    metrics: ['Time to first fix', 'Static position spread', 'Route deviation', 'Successful communication/update rate', 'Geofence event consistency'],
    matrix: [['Static fix','Open-sky known point','Measure lock and repeatability'],['Route','Known travel path','Compare logged path with reference'],['Coverage','Changing network conditions','Observe delayed/missed uploads'],['Geofence','Repeated boundary crossing','Verify entry/exit logic']]
  },
  'omni-mecanum-parts': {
    scope: 'Mechanical wheel development is evaluated through dimensional inspection, roller freedom, runout, vibration, traction, and directional motion. CAD and print revisions are treated as controlled design iterations.',
    procedure: ['Measure wheel diameter, roller spacing, protrusion, and bearing fit.', 'Check every roller for free rotation and consistent contact.', 'Run the wheel at low speed and observe runout and vibration.', 'Perform straight, lateral/diagonal, and rotational motion tests as applicable.', 'Revise CAD or print settings and compare the next iteration against the previous version.'],
    metrics: ['Dimensional error', 'Roller freedom / binding', 'Runout and vibration', 'Directional-motion consistency', 'Wear or deformation after repeated use'],
    matrix: [['Fit check','Fresh assembly','Inspect alignment and roller freedom'],['Low-speed run','Wheel unloaded/light load','Observe runout/vibration'],['Directional motion','Robot chassis','Check intended omni/mecanum movement'],['Iteration comparison','Revised CAD/print','Compare behavior before and after revision']]
  },
  'pcb-fabrication': {
    scope: 'PCB-fabrication validation uses repeatable test patterns to determine usable trace width, clearance, exposure, development, and etching conditions for workshop-scale prototype boards.',
    procedure: ['Prepare a test pattern with multiple trace widths, clearances, pads, and text sizes.', 'Expose dry film using a controlled exposure time.', 'Develop the board and inspect which features remain intact.', 'Etch the copper and inspect for bridges, opens, undercutting, or incomplete removal.', 'Repeat successful settings on later boards to evaluate process repeatability.'],
    metrics: ['Minimum repeatable trace width', 'Minimum repeatable clearance', 'Development quality', 'Etching defects / undercut', 'Process repeatability'],
    matrix: [['Exposure','Multiple exposure times','Identify usable photoresist window'],['Development','Controlled developer condition','Check trace retention/removal'],['Etching','Completed resist pattern','Inspect opens/bridges/undercut'],['Repeatability','Same settings on later board','Check process consistency']]
  },
  'e-kulambo': {
    scope: 'E-KULAMBO validation separates raw sensor behavior from fuzzy-risk classification. The prototype is evaluated as an environmental warning system, not as a direct dengue or mosquito detector.',
    procedure: ['Test temperature and humidity readings under several environmental conditions.', 'Check rain/wet sensing using controlled dry and wet states.', 'Characterize turbidity-related response using air, clear water, and visibly altered water samples.', 'Pass representative sensor combinations through the fuzzy-logic rules and verify expected risk-state transitions.', 'Inject invalid sensor readings and verify that the display/dashboard continues operating with a fault-aware status.'],
    metrics: ['Sensor-response consistency', 'Dry/wet state reliability', 'Turbidity response separation', 'Fuzzy-rule output consistency', 'Fault-tolerant system behavior'],
    matrix: [['Environmental sensing','Temperature/humidity variation','Verify stable acquisition'],['Wet state','Dry vs wet sensor','Verify state transition'],['Water condition','Different sample conditions','Observe turbidity-related response'],['Risk logic','Controlled input combinations','Verify Normal/Moderate/Critical-style output']]
  },
  'chicken-stress': {
    scope: 'The poultry-monitoring system is validated as an audio-classification and environmental-context prototype. Audio classification results are evaluated statistically while temperature and humidity remain supporting context rather than proof of biological stress.',
    procedure: ['Collect short audio windows and assign reference labels before classification.', 'Apply the same preprocessing and feature extraction to all samples.', 'Run the classifier and store predicted class with timestamp and environmental readings.', 'Repeat with background noise and non-target audio to observe false triggers.', 'Build a confusion matrix once enough labeled samples are available.'],
    metrics: ['Per-class correct count', 'False-positive count', 'False-negative count', 'Confusion-matrix distribution', 'Classifier stability under noise'],
    matrix: [['Normal audio','Reference normal vocalization','Observe NORMAL classification'],['Target audio','Reference stress-related sample','Observe classifier response'],['Other/noise','Non-target sound','Check rejection / OTHER behavior'],['Environment','Different temperature/humidity context','Verify context logging without forcing class result']]
  },
  'garbage-robot': {
    scope: 'The garbage-collection robot is validated through subsystem tests and complete mission runs. Navigation, alignment, obstacle response, and the linear-actuator mechanism are evaluated independently before integrated operation.',
    procedure: ['Test LiDAR obstacle sensing against known object positions.', 'Validate AprilTag visibility, centering, and approach behavior.', 'Check drive commands, orientation response, and stopping behavior.', 'Cycle the linear actuator repeatedly and verify end positions or limit behavior.', 'Run the full search-to-collection/dumping mission and record the state where any failure occurs.'],
    metrics: ['Obstacle-response distance', 'Tag-centering / approach consistency', 'Mission-state completion', 'Actuator cycle completion', 'Recovery from missed detection or blocked path'],
    matrix: [['Obstacle sensing','Known obstacle geometry','Verify avoid/stop response'],['Target alignment','Visible AprilTag','Check centering and docking'],['Actuator','Repeated extend/retract cycle','Observe reliable mechanical operation'],['Full mission','Search → navigate → align → actuate → return','Evaluate integrated completion']]
  }
};

function buildValidationSection(id) {
  const data = validationLibrary[id];
  if (!data) return '';
  const rows = data.matrix.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`).join('');
  return `
    <article class="project-section wide">
      <h2>Engineering Validation Framework</h2>
      <p>${data.scope}</p>
      <div class="validation-grid">
        <div class="validation-block"><h3>Test Procedure</h3>${list(data.procedure)}</div>
        <div class="validation-block"><h3>Evaluation Metrics</h3>${list(data.metrics)}</div>
      </div>
    </article>
    <article class="project-section wide">
      <h2>Test Matrix</h2>
      <div class="table-wrap"><table class="project-table"><thead><tr><th>Test</th><th>Condition</th><th>What is evaluated</th></tr></thead><tbody>${rows}</tbody></table></div>
    </article>`;
}

const currentProjectId = new URLSearchParams(window.location.search).get('id');
if (currentProjectId && currentProjectId !== 'tobacco-smoke-detector') {
  const grid = document.querySelector('#projectContent .project-detail-grid');
  if (grid) {
    const statusSection = Array.from(grid.querySelectorAll('.project-section')).find((section) => section.querySelector('h2')?.textContent === 'Documentation Status');
    const wrapper = document.createElement('div');
    wrapper.className = 'project-extra-sections';
    wrapper.innerHTML = buildValidationSection(currentProjectId);
    if (wrapper.innerHTML.trim()) {
      const nodes = Array.from(wrapper.children);
      nodes.forEach((node) => grid.insertBefore(node, statusSection || null));
    }
  }
}
