
function renderTrackPage(prefill=''){
  mainContent.innerHTML = `
    <h2>Track Your Order</h2>
    <form onsubmit="trackOrder(event)">
      <input id="tInput" required placeholder="Enter Tracking ID" value="${prefill}">
      <button class="btn">Track</button>
    </form>
    <div id="tResult"></div>`;
  if(prefill) trackOrder({preventDefault:()=>{}});
}

function trackOrder(e){
  e.preventDefault();
  const id = document.getElementById('tInput').value.trim();
  const ord= (JSON.parse(localStorage.getItem('orders')||'[]'))
             .find(o=>o.id===id);
  const out = document.getElementById('tResult');

  if(!ord){ out.innerHTML=`<p class="bad">❌ Order not found</p>`;return;}

 
  const days = Math.floor((Date.now()-ord.orderDate)/864e5);
  const stage = days>5?4:days>3?3:days>1?2:days>0?1:0;
  const steps = ['Confirmed','Processing','Shipped','Out for delivery','Delivered'];
  const icons = ['✅','⚙️','📦','🚚','📬'];

  out.innerHTML = `
    <h3>Status for <code>${ord.id}</code></h3>
    <div class="timeline">
      ${steps.map((s,i)=>`
        <div class="step ${i<=stage?'done':''}">
          <span>${icons[i]}</span><em>${s}</em>
        </div>`).join('')}
    </div>
    <p><strong>Placed:</strong> ${new Date(ord.orderDate).toLocaleDateString()}</p>
    <p><strong>ETA:</strong> ${new Date(ord.est).toLocaleDateString()}</p>`;
}
