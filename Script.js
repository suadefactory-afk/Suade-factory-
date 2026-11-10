
const products = [...document.querySelectorAll('.product-card')];
const filters = [...document.querySelectorAll('.filter')];

const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const cartMessage = document.getElementById('cartMessage');

let cartCount = 0;

// Filter shoes by colour and search
function updateProducts() {
  const activeFilter =
    document.querySelector('.filter.active')?.dataset.filter || 'all';

  const searchTerm = searchInput.value.trim().toLowerCase();

  let visibleCount = 0;

  products.forEach((product) => {
    const matchesColour =
      activeFilter === 'all' ||
      product.dataset.colour === activeFilter;

    const matchesSearch =
      product.dataset.name.includes(searchTerm);

    const show = matchesColour && matchesSearch;

    product.hidden = !show;

    if (show) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount !== 0;
}

// Colour filter buttons
filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) =>
      item.classList.remove('active')
    );

    button.classList.add('active');

    updateProducts();
  });
});

// Search shoes
searchInput.addEventListener('input', updateProducts);

// Add shoes to demo shopping cart
document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    cartCount++;

    const productName = button.dataset.product;

    cartMessage.textContent =
      `${productName} added to your demo cart. Cart items: ${cartCount}.`;
  });
});

// Mobile navigation menu
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');

  menuToggle.setAttribute(
    'aria-expanded',
    String(isOpen)
  );
});

// Automatically update copyright year
document.getElementById('year').textContent =
  new Date().getFullYear();
