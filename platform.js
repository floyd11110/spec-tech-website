const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const filters = document.querySelectorAll('.platform-filter');
const searchInput = document.getElementById('platformSearch');
const cards = document.querySelectorAll('.library-card');
const emptyState = document.getElementById('platformEmpty');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

let activeFilter = 'all';

function applyPlatformFilter() {
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
    applyPlatformFilter();
  });
});

searchInput?.addEventListener('input', applyPlatformFilter);
applyPlatformFilter();
