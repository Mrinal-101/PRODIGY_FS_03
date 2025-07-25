function renderSupportPage() {
  mainContent.innerHTML = `
    <h2>Customer Support</h2>
    <form onsubmit="submitSupport(event)">
      <input id="supportEmail" type="email" placeholder="Your email" required>
      <textarea id="supportMessage" placeholder="How can we help you?" required></textarea>
      <button type="submit">Send Message</button>
    </form>
    <div id="supportReply"></div>
  `;
}
function submitSupport(e) {
  e.preventDefault();
  document.getElementById('supportReply').innerText =
    "Thank you! Our support team will contact you soon.";
}
