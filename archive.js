const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const filters = document.querySelectorAll('.archive-filter');
const searchInput = document.getElementById('archiveSearch');
const archiveGrid = document.getElementById('archiveGrid');
const emptyState = document.getElementById('archiveEmpty');

// Add archived client/academic prototype entries without exposing private client details.
if (archiveGrid && !archiveGrid.querySelector('[data-project="e-kulambo"]')) {
  const card = document.createElement('article');
  card.className = 'archive-card';
  card.dataset.project = 'e-kulambo';
  card.dataset.category = 'embedded instrumentation';
  card.dataset.search = 'e-kulambo dengue environmental risk warning mosquito esp32 dht22 rain wet turbidity fuzzy logic dashboard early warning';
  card.innerHTML = `
    <div class="archive-meta"><span class="archive-status">Academic Prototype</span><span class="archive-year">2026</span></div>
    <h2>E-KULAMBO Dengue Environmental Risk Warning System</h2>
    <p>ESP32-based environmental risk assessment prototype that combines temperature, humidity, rain/wet condition, and turbidity-related sensing with fuzzy-logic classification to indicate conditions that may favor mosquito breeding. The system is designed for environmental risk warning, not direct dengue detection or mosquito counting.</p>
    <div class="archive-tech"><span>ESP32</span><span>DHT22</span><span>Rain / Wet</span><span>Turbidity</span><span>Fuzzy Logic</span><span>Dashboard</span></div>
  `;
  archiveGrid.appendChild(card);
}

if (archiveGrid && !archiveGrid.querySelector('[data-project="chicken-stress"]')) {
  const card = document.createElement('article');
  card.className = 'archive-card';
  card.dataset.project = 'chicken-stress';
  card.dataset.category = 'ai instrumentation embedded';
  card.dataset.search = 'chicken stress detection poultry audio classification microphone raspberry pi normal stress other heat stress dht temperature humidity firebase monitoring';
  card.innerHTML = `
    <div class="archive-meta"><span class="archive-status">Academic Prototype</span><span class="archive-year">2026</span></div>
    <h2>Chicken Stress Detection &amp; Monitoring</h2>
    <p>Audio- and environment-assisted poultry monitoring prototype that analyzes short microphone recordings to classify chicken vocalization patterns such as NORMAL, STRESS, or OTHER, while temperature and humidity sensing provides additional heat-stress context. Monitoring results can be sent to Firebase for remote viewing and logging.</p>
    <div class="archive-tech"><span>Raspberry Pi</span><span>Audio Classification</span><span>Microphone</span><span>DHT</span><span>Firebase</span><span>Environmental Monitoring</span></div>
  `;
  archiveGrid.appendChild(card);
}

const archiveTotal = document.querySelector('.archive-summary div:first-child strong');
if (archiveTotal) archiveTotal.textContent = '12+';

const cards = document.querySelectorAll('.archive-card');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

let activeFilter = 'all';

function applyArchiveFilter() {
  const query = (searchInput?.value || '').trim().toLowerCase();
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
    applyArchiveFilter();
  });
});

searchInput?.addEventListener('input', applyArchiveFilter);
applyArchiveFilter();
