const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.produto');
const searchInput = document.getElementById('busca');
const emptyState = document.querySelector('.empty-state');

function renderProducts(selectedCategory = 'all', query = '') {
  const normalized = query.trim().toLowerCase();
  let visibleProducts = 0;

  products.forEach((product) => {
    const category = product.dataset.category;
    const name = product.dataset.name.toLowerCase();
    const categoryLabel = product.querySelector('.badge')?.textContent.toLowerCase() || '';
    const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
    const matchesSearch = !normalized || name.includes(normalized) || categoryLabel.includes(normalized);
    const isVisible = matchesCategory && matchesSearch;

    product.classList.toggle('is-hidden', !isVisible);
    product.setAttribute('aria-hidden', String(!isVisible));
    visibleProducts += isVisible ? 1 : 0;
  });

  emptyState.hidden = visibleProducts > 0;
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle('is-active', item === button));
    renderProducts(selected, searchInput.value);
  });
});

searchInput.addEventListener('input', (event) => {
  const activeFilter = document.querySelector('.filter.is-active')?.dataset.filter || 'all';
  renderProducts(activeFilter, event.target.value);
});

renderProducts();
