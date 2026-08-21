const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const filters = document.querySelectorAll('.archive-filter');
const searchInput = document.getElementById('archiveSearch');
const archiveGrid = document.getElementById('archiveGrid');
const emptyState = document.getElementById('archiveEmpty');
const projectData = Array.isArray(window.SPEC_PROJECTS) ? window.SPEC_PROJECTS : [];

function normalizedProject(project) {
  if (project.id !== 'tobacco-smoke-detector') return project;
  return {
    ...project,
    subtitle: 'ESP32 temporal smoke-pattern classifier using MQ-135 + SGP30 with controlled paper-vs-cigarette validation.',
    tags: ['ESP32', 'MQ-135', 'SGP30', 'Temporal Classification', 'Firebase', 'Smoke / VOC']
  };
}

function addArchiveCard(rawProject) {
  const project = normalizedProject(rawProject);
  if (!archiveGrid || archiveGrid.querySelector(`[data-project="${project.id}"]`)) return;
  const card = document.createElement('article');
  card.className = 'archive-card';
  card.dataset.project = project.id;
  card.dataset.category = (project.categories || []).map((item) => item.toLowerCase().replace(/[^a-z]+/g, ' ').trim()).join(' ');
  card.dataset.search = `${project.title} ${(project.tags || []).join(' ')} ${(project.categories || []).join(' ')}`.toLowerCase();
  card.innerHTML = `
    <div class="archive-meta"><span class="archive-status">${project.status}</span><span class="archive-year">${project.year}</span></div>
    <h2>${project.archiveTitle || project.title}</h2>
    <p>${project.subtitle || project.overview}</p>
    <div class="archive-tech">${(project.tags || []).slice(0, 6).map((tag) => `<span>${tag}</span>`).join('')}</div>
  `;
  archiveGrid.appendChild(card);
}

// Existing static cards are retained. Add projects that are not already present in the HTML.
projectData.forEach((rawProject) => {
  const project = normalizedProject(rawProject);
  const existing = Array.from(document.querySelectorAll('.archive-card h2')).find((heading) => heading.textContent.trim() === (project.archiveTitle || project.title));
  if (existing) {
    const card = existing.closest('.archive-card');
    if (card) {
      card.dataset.project = project.id;
      if (project.id === 'tobacco-smoke-detector') {
        card.dataset.search = `${project.title} ${(project.tags || []).join(' ')} ${(project.categories || []).join(' ')}`.toLowerCase();
        const text = card.querySelector('p');
        const tech = card.querySelector('.archive-tech');
        if (text) text.textContent = project.subtitle;
        if (tech) tech.innerHTML = project.tags.slice(0, 6).map((tag) => `<span>${tag}</span>`).join('');
      }
    }
  } else {
    addArchiveCard(project);
  }
});

const archiveTotal = document.querySelector('.archive-summary div:first-child strong');
if (archiveTotal) archiveTotal.textContent = `${projectData.length}+`;

const cards = document.querySelectorAll('.archive-card');

cards.forEach((card) => {
  const id = card.dataset.project;
  if (!id) return;
  card.classList.add('archive-card-clickable');
  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Open details for ${card.querySelector('h2')?.textContent || 'project'}`);

  const openProject = () => {
    window.location.href = `project.html?id=${encodeURIComponent(id)}`;
  };

  card.addEventListener('click', openProject);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject();
    }
  });

  if (!card.querySelector('.archive-view-link')) {
    const link = document.createElement('span');
    link.className = 'archive-view-link';
    link.textContent = 'View Project →';
    card.appendChild(link);
  }
});

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
