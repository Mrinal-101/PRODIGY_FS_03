const mainContent = document.getElementById('main-content');
function renderProductsPage() {
  mainContent.innerHTML = `
    <div>
      <label>Category:
        <select id="catFilter">
          <option value="">All</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Audio">Audio</option>
          <option value="Laptops">Laptops</option>
        </select>
      </label>
      <label>Search: <input id="searchInput" placeholder="e.g. Laptop"/></label>
      <label>Sort by:
        <select id="sortSelect">
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>
        <select id="sortDir">
          <option value="">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </label>
    </div>
    <div id="products-list"></div>
  `;
  listProducts();
  
  document.getElementById('catFilter').onchange =
  document.getElementById('searchInput').oninput =
  document.getElementById('sortSelect').onchange =
  document.getElementById('sortDir').onchange = listProducts;
}

function listProducts() {
  const c = document.getElementById('catFilter').value;
  const s = document.getElementById('searchInput').value;
  const sk = document.getElementById('sortSelect').value;
  const sd = document.getElementById('sortDir').value;
  let arr = getFilteredProducts(c, s);
  arr = sortProducts(arr, sk, sd === "desc");
  const html = arr.map(product => `
    <div class="product-card">
      <img src="${product.img}">
      <h3>${product.name}</h3>
      <div class="price">$${product.price.toFixed(2)}</div>
      <p>${product.desc}</p>
      <button class="add-cart-btn" onclick="addProductToCart(${product.id})">Add to Cart</button>
      <div><button onclick="showReviews(${product.id})">Reviews</button></div>
    </div>
  `).join('');
  document.getElementById('products-list').innerHTML = html;
}

document.getElementById('nav-products').onclick = renderProductsPage;
document.getElementById('nav-cart').onclick = renderCartPage;
document.getElementById('nav-support').onclick = renderSupportPage;
document.getElementById('nav-track').onclick = ()=>renderTrackPage();



renderProductsPage();
