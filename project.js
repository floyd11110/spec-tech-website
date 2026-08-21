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

if (!project) {
  document.title = 'Project Not Found | Spec-Tech';
  hero.innerHTML = `<div class="project-hero-card"><h1>Project not found</h1><p class="project-subtitle">The requested project detail page is not available yet.</p></div>`;
  content.innerHTML = `<div class="project-empty">This project may still be waiting for documentation. <a href="archive.html">Return to the Project Archive</a>.</div>`;
} else {
  document.title = `${project.title} | Spec-Tech Project Archive`;
  hero.innerHTML = `
    <div class="project-hero-card">
      <div class="project-meta-row">
        <span class="project-badge">${project.status}</span>
        <span class="project-year">${project.year}</span>
        ${(project.categories || []).map((item) => `<span class="project-category">${item}</span>`).join('')}
      </div>
      <h1>${project.title}</h1>
      <p class="project-subtitle">${project.subtitle}</p>
      <div class="project-tags">${(project.tags || []).map((item) => `<span>${item}</span>`).join('')}</div>
      <div class="project-actions">
        <a class="button primary" href="index.html#inquiry">Start a Similar Project</a>
        <a class="button secondary" href="archive.html">Browse More Projects</a>
      </div>
    </div>`;

  content.innerHTML = `
    <div class="project-detail-grid">
      <article class="project-section wide"><h2>Project Overview</h2><p>${project.overview}</p></article>
      <article class="project-section"><h2>Objective</h2><p>${project.objective}</p></article>
      <article class="project-section"><h2>Hardware Used / Planned</h2>${list(project.hardware)}</article>
      <article class="project-section wide"><h2>System Architecture</h2><div class="project-flow">${(project.architecture || []).map((item) => `<div>${item}</div>`).join('')}</div></article>
      <article class="project-section"><h2>Software / Logic</h2>${list(project.software)}</article>
      <article class="project-section"><h2>Testing & Validation</h2>${list(project.testing)}</article>
      <article class="project-section"><h2>Current Limitations</h2>${list(project.limitations)}</article>
      <article class="project-section"><h2>Future Improvements</h2>${list(project.future)}</article>
      <article class="project-section wide"><h2>Documentation Status</h2><p>This page contains the currently documented technical scope. Photos, circuit diagrams, source-code links, measured results, and build notes can be added as the project archive is expanded.</p></article>
    </div>`;
}
