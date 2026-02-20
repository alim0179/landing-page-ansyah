const productList = document.getElementById('productList');
const categoryFilter = document.getElementById('categoryFilter');
let products = [];

// Load produk dari JSON
fetch('data/products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    loadCategories();
    displayProducts(products);
  });

// Load kategori unik
function loadCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Filter produk
categoryFilter.addEventListener('change', () => {
  const filtered = categoryFilter.value === 'all'
    ? products
    : products.filter(p => p.category === categoryFilter.value);
  displayProducts(filtered);
});

// Tampilkan produk
function displayProducts(list) {
  productList.innerHTML = '';
  list.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h2>${p.name}</h2>
      <p>${p.short_desc}</p>
      <p>Rp${p.price.toLocaleString()}</p>
      <a href="detail.html?id=${p.id}">Lihat Detail</a>
    `;
    productList.appendChild(div);
  });
}
