
let cart   = JSON.parse(localStorage.getItem('cart')   || '[]');
let orders = JSON.parse(localStorage.getItem('orders') || '[]');

function persistCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.getElementById('cart-count').textContent =
    cart.reduce((s, i) => s + i.qty, 0);
}

function cartItems() {
  return cart.map(c => ({ ...products.find(p => p.id === c.id), qty: c.qty }));
}


function addProductToCart(id) {
  const hit = cart.find(x => x.id === id);
  hit ? hit.qty++ : cart.push({ id, qty: 1 });
  persistCart();
  toast('Added to cart', 'good');
}

function updateQty(id, newQty) {
  if (newQty < 1) { removeItem(id); return; }
  const item = cart.find(x => x.id === id);
  if (item) item.qty = newQty;
  persistCart();
  renderCartPage();
}

function removeItem(id) {
  cart = cart.filter(x => x.id !== id);
  persistCart();
  renderCartPage();
}

function clearCart() {
  cart.length = 0;
  persistCart();
  renderCartPage();
}


function renderCartPage() {
  if (!cart.length) {
    mainContent.innerHTML = '<h2>Your cart is empty.</h2>';
    return;
  }

  const list     = cartItems();
  const subtotal = list.reduce((s, i) => s + i.price * i.qty, 0);
  const tax      = subtotal * 0.10;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total    = subtotal + tax + shipping;

  mainContent.innerHTML = `
    <h2>Your Cart</h2>
    <div class="cartWrap">
      <section id="cart-list">
        ${list.map(item => `
          <div class="cartRow" data-id="${item.id}">
            <img src="${item.img}" alt="">
            <div class="cartInfo">
              <h4>${item.name}</h4>
              <small>${item.desc}</small>
              <div class="qty">
                <button class="qt-minus">−</button>
                <span>${item.qty}</span>
                <button class="qt-plus">+</button>
              </div>
            </div>
            <div class="cartPrice">$${(item.price * item.qty).toFixed(2)}</div>
            <button class="del">🗑️</button>
          </div>
        `).join('')}
      </section>

      <aside>
        <h3>Order Summary</h3>
        <table>
          <tr><td>Subtotal</td><td>$${subtotal.toFixed(2)}</td></tr>
          <tr><td>Tax&nbsp;(10%)</td><td>$${tax.toFixed(2)}</td></tr>
          <tr><td>Shipping</td><td>${shipping ? `$${shipping.toFixed(2)}` : 'Free'}</td></tr>
          <tr class="tot"><td>Total</td><td>$${total.toFixed(2)}</td></tr>
        </table>

        <button class="btn big" id="btn-checkout">Proceed to Checkout</button>
        <button class="btn gray"  id="btn-clear">Clear Cart</button>
      </aside>
    </div>
  `;

  initCartListeners();   
}


function initCartListeners() {
  const list = document.getElementById('cart-list');

  list.onclick = e => {
    const row = e.target.closest('.cartRow');
    if (!row) return;
    const id = +row.dataset.id;

    if (e.target.classList.contains('qt-plus'))   updateQty(id, cart.find(x => x.id === id).qty + 1);
    if (e.target.classList.contains('qt-minus'))  updateQty(id, cart.find(x => x.id === id).qty - 1);
    if (e.target.classList.contains('del'))       removeItem(id);
  };

  document.getElementById('btn-clear').onclick    = clearCart;
  document.getElementById('btn-checkout').onclick = checkout;
}


function checkout() {
  if (!cart.length) return;

  const list     = cartItems();
  const subtotal = list.reduce((s, i) => s + i.price * i.qty, 0);
  const tax      = +(subtotal * 0.10).toFixed(2);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total    = +(subtotal + tax + shipping).toFixed(2);

  mainContent.innerHTML = `
    <h2>Checkout</h2>

    <form id="buyForm" onsubmit="finishPurchase(event)">
      <fieldset><legend>Billing Details</legend>
        <input required id="bName"  placeholder="Full name">
        <input required id="bEmail" type="email" placeholder="Email">
        <input required id="bAddr"  placeholder="Street address">
        <div class="split">
          <input required id="bCity"  placeholder="City">
          <input required id="bState" placeholder="State">
          <input required id="bZip"   placeholder="ZIP">
        </div>
      </fieldset>

      <fieldset><legend>Payment</legend>
        <input required id="cardNum" maxlength="19" placeholder="Card number" oninput="formatCard(this)">
        <div class="split">
          <input required id="cardExp" maxlength="5"  placeholder="MM/YY" oninput="formatExpiry(this)">
          <input required id="cardCvv" maxlength="4"  placeholder="CVV"   oninput="this.value=this.value.replace(/\\D/g,'')">
        </div>
      </fieldset>

      <section class="summary">
        ${list.map(i=>`<div><span>${i.name} ×${i.qty}</span><span>$${(i.price*i.qty).toFixed(2)}</span></div>`).join('')}
        <hr>
        <div><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
        <div><span>Tax (10%)</span><span>$${tax.toFixed(2)}</span></div>
        <div><span>Shipping</span><span>${shipping?`$${shipping.toFixed(2)}`:'Free'}</span></div>
        <div class="tot"><span>Total</span><span>$${total.toFixed(2)}</span></div>
      </section>

      <button class="btn big" type="submit">Place Order &nbsp;$${total.toFixed(2)}</button>
      <button class="btn gray" type="button" onclick="renderCartPage()">← Back to Cart</button>
    </form>`;
}


function finishPurchase(e) {
  e.preventDefault();

  const tracking = 'EL' + Date.now().toString(36).toUpperCase()
                           + Math.random().toString(36).slice(2,5).toUpperCase();

  orders.push({
    id: tracking,
    items: cartItems(),
    status: 'confirmed',
    orderDate: Date.now(),
    est: Date.now() + 7*864e5   
  });
  localStorage.setItem('orders', JSON.stringify(orders));

  cart.length = 0;
  persistCart();

  mainContent.innerHTML = `
    <div class="confirm">
      <h2>✅ Order Confirmed</h2>
      <p>Your tracking ID:</p>
      <code>${tracking}</code>
      <button class="btn" onclick="renderTrackPage('${tracking}')">Track Order</button>
      <button class="btn gray" onclick="renderProductsPage()">Continue Shopping</button>
    </div>`;
}


function formatCard(el){
 
  el.value = el.value.replace(/\D/g, '')
                     
                     .replace(/(.{4})/g, '$1 ')
                     .trim()
                    
                     .slice(0, 19);
}


function formatExpiry(el){
  el.value = el.value.replace(/\D/g, '')       
                     .replace(/(^\d{2})(\d)/, '$1/$2')  
                     .slice(0, 5);
}



function toast(msg, kind = 'good') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className   = `toast ${kind}`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}


updateCartCount();
