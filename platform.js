const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const filters = document.querySelectorAll('.platform-filter');
const searchInput = document.getElementById('platformSearch');
const emptyState = document.getElementById('platformEmpty');

function applyDualTimingPlatformUpdate() {
  const libraryGrid = document.getElementById('libraryGrid');

  if (libraryGrid && !document.getElementById('dualtiming-v100-card')) {
    const analyzerCard = [...libraryGrid.querySelectorAll('.library-card')].find(
      (card) => card.querySelector('h3')?.textContent?.trim() === 'SpecTechF103C8SignalAnalyzer'
    );

    const dualTimingCard = `
      <article id="dualtiming-v100-card" class="library-card feature-card" data-category="stm32 core final" data-search="stm32 dualtiming dual timing synchronized two signal phase signed phase dead time dead-time overlap edge order pa6 pb0 tim3 100khz 100 khz priority systick">
        <div class="library-meta"><span class="status-badge final">FINAL / FROZEN</span><span>v1.0.0</span></div>
        <h3>SpecTechF103C8DualTiming</h3>
        <p>Synchronized two-signal timing engine using one TIM3 time base for frequency, phase, signed dead-time/overlap, edge ordering, boundary wrap handling, and clean signal-loss recovery.</p>
        <div class="validation-line"><strong>53/53 PASS</strong><span>installed FINAL two-gate regression; 100 kHz validated</span></div>
        <div class="platform-tags"><span>PA6 / PB0</span><span>TIM3</span><span>Phase</span><span>Dead-time / Overlap</span><span>100 kHz</span></div>
      </article>`;

    if (analyzerCard) {
      analyzerCard.insertAdjacentHTML('afterend', dualTimingCard);
    } else {
      libraryGrid.insertAdjacentHTML('afterbegin', dualTimingCard);
    }
  }

  if (searchInput) {
    searchInput.placeholder = 'Search DualTiming, Counter, TIM2, HTTP, Firebase, I2S...';
  }

  const summaryItems = document.querySelectorAll('.platform-summary > div');
  if (summaryItems.length >= 4) {
    const strong = summaryItems[3].querySelector('strong');
    const span = summaryItems[3].querySelector('span');
    if (strong) strong.textContent = '100 kHz';
    if (span) span.textContent = 'validated STM32 DualTiming synchronized capture';
  }

  const stm32Family = [...document.querySelectorAll('.family-card')].find(
    (card) => card.querySelector('h2')?.textContent?.trim() === 'STM32F103C8 Platform'
  );
  if (stm32Family) {
    const description = stm32Family.querySelector('p');
    if (description) {
      description.textContent = '72 MHz Cortex-M3 development platform for GPIO, timers, PWM, ADC, waveform capture, high-speed pulse counting, signal analysis, synchronized dual-signal timing, I2C devices, sensors, and reusable hardware drivers.';
    }
  }

  const resourceBody = document.querySelector('#resource-map .resource-table tbody');
  if (resourceBody && !document.getElementById('dualtiming-resource-row')) {
    const row = document.createElement('tr');
    row.id = 'dualtiming-resource-row';
    row.innerHTML = '<td>PA6 + PB0 / TIM3</td><td>DualTiming synchronized A/B capture</td><td>DualTiming owns TIM3 exclusively while active; conflicts with Capture / SignalAnalyzer Capture, and PA6 remains unavailable for SPI1 MISO.</td>';

    const captureRow = [...resourceBody.querySelectorAll('tr')].find(
      (item) => item.cells?.[0]?.textContent?.includes('PA6 / TIM3')
    );

    if (captureRow) captureRow.insertAdjacentElement('afterend', row);
    else resourceBody.appendChild(row);
  }

  const nextCard = document.querySelector('.next-platform-card');
  if (nextCard) {
    const eyebrow = nextCard.querySelector('.eyebrow');
    const title = nextCard.querySelector('h2');
    const description = nextCard.querySelector('p:not(.eyebrow)');
    const badge = nextCard.querySelector('.status-badge');

    if (eyebrow) eyebrow.textContent = 'Latest frozen STM32 timing release';
    if (title) title.textContent = 'DualTiming v1.0.0 FINAL';
    if (description) {
      description.textContent = 'The synchronized two-signal timing foundation is now an installed, hardware-validated, frozen release. It measures frequency, phase, signed dead-time/overlap, edge ordering, and recovery behavior on a shared TIM3 time base, with sustained 100 kHz acquisition validated on hardware.';
    }
    if (badge) {
      badge.className = 'status-badge final';
      badge.textContent = 'FINAL / FROZEN';
    }
  }
}

applyDualTimingPlatformUpdate();

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

let activeFilter = 'all';

function applyPlatformFilter() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  const cards = document.querySelectorAll('.library-card');
  let visibleCount = 0;

  cards.forEach((card) => {
    const categories = (card.dataset.category || '').split(/\s+/);
    const searchable = `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
    const categoryMatch = activeFilter === 'all' || categories.includes(activeFilter);
    const searchMatch = !query || searchable.includes(query);
    const visible = categoryMatch && searchMatch;

    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  if (emptyState) emptyState.classList.toggle('show', visibleCount === 0);
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter || 'all';
    filters.forEach((item) => item.classList.toggle('active', item === button));
    applyPlatformFilter();
  });
});

searchInput?.addEventListener('input', applyPlatformFilter);
applyPlatformFilter();
