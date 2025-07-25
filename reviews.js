
const reviews      = JSON.parse(localStorage.getItem('reviews')      || '{}');
const reviewVotes  = JSON.parse(localStorage.getItem('reviewVotes')  || '{}');

function showReviews(pid) {
  const product = products.find(p => p.id === pid);
  if (!product) return;

  
  const prodReviews  = (reviews[pid] || []).slice();        
  const avg          = prodReviews.length
      ? (prodReviews.reduce((s, r) => s + r.rating, 0) / prodReviews.length).toFixed(1)
      : 'No ratings yet';

  prodReviews.sort((a, b) => {
    const aScore = (reviewVotes[a.id]?.helpful || 0) - (reviewVotes[a.id]?.unhelpful || 0);
    const bScore = (reviewVotes[b.id]?.helpful || 0) - (reviewVotes[b.id]?.unhelpful || 0);
    return aScore !== bScore ? bScore - aScore : new Date(b.date) - new Date(a.date);
  });


  mainContent.innerHTML = `
    <h2>Reviews for ${product.name}</h2>

    <section style="background:rgba(34,211,238,.10);padding:20px;border-radius:12px;margin-bottom:25px;">
      <strong style="font-size:1.25em">Average Rating: 
        ${avg === 'No ratings yet' ? avg : `${avg}/5 ${renderStars(avg)}`}
      </strong>
      <div>Total Reviews: ${prodReviews.length}</div>
    </section>

    ${prodReviews.map(renderReviewBlock).join('')}

    <form id="addReview" onsubmit="addReview(event,${pid})" style="background:rgba(30,48,243,.08);padding:25px;border-radius:15px;margin-top:30px">
      <h3 style="margin-top:0">Write a Review</h3>
      <label> Name*  <input    id="revName"   required></label>
      <label> Title* <input    id="revTitle"  required></label>
      <label> Rating* 
        <span id="starWrap">${[1,2,3,4,5].map(n=>`<b class='star' data-n='${n}'>★</b>`).join('')}</span>
        <input type="hidden" id="revRate" value="5">
      </label>
      <label> Review* <textarea id="revText" rows="4" required></textarea></label>
      <button type="submit" class="btn">Submit Review</button>
      <button type="button" onclick="renderProductsPage()" class="btn gray">← Back</button>
    </form>
  `;

  initStarInput();
}


function renderStars(val) {
  val = parseFloat(val);
  return [...Array(5)].map((_,i)=> i<val ? '★' : '☆' ).join('');
}
function renderReviewBlock(r) {
  const v = reviewVotes[r.id] || {helpful:0,unhelpful:0};
  return `
    <article class="review-block">
      <header>
        <strong>${r.name}</strong>
        <time>${new Date(r.date).toLocaleDateString()}</time>
        <span class="stars">${renderStars(r.rating)}</span>
      </header>
      <h4>${r.title}</h4>
      <p>${r.text}</p>
      <footer>
        <span>Was this helpful?</span>
        <button onclick="voteReview('${r.id}','helpful')" class="vote">👍 ${v.helpful}</button>
        <button onclick="voteReview('${r.id}','unhelpful')" class="vote red">👎 ${v.unhelpful}</button>
      </footer>
    </article>`;
}


function initStarInput(){
  document.querySelectorAll('#starWrap .star').forEach(s=>{
    s.onclick   = ()=> setRate(s.dataset.n);
    s.onmouseover = ()=> paint(s.dataset.n);
    s.parentNode.onmouseleave = ()=> paint(document.getElementById('revRate').value);
  });
  paint(5);
  function setRate(n){ document.getElementById('revRate').value=n; paint(n);}
  function paint(n){
    document.querySelectorAll('#starWrap .star')
      .forEach((st,i)=> st.style.color=i<n?'#fbbf24':'#6b7280');
  }
}

function addReview(e,pid){
  e.preventDefault();
  const r = {
    id:'r_'+Date.now().toString(36),
    name :document.getElementById('revName').value.trim(),
    rating:parseInt(document.getElementById('revRate').value,10),
    title:document.getElementById('revTitle').value.trim(),
    text :document.getElementById('revText').value.trim(),
    date :new Date().toISOString()
  };
  (reviews[pid]=reviews[pid]||[]).push(r);
  localStorage.setItem('reviews',JSON.stringify(reviews));
  alert('Thanks – your review is online!');
  showReviews(pid);
}

function voteReview(id,type){
  reviewVotes[id] = reviewVotes[id] || {helpful:0,unhelpful:0};
  reviewVotes[id][type]++; 
  localStorage.setItem('reviewVotes',JSON.stringify(reviewVotes));

  const pid = parseInt(new URL(location).searchParams.get('pid')) || null;
  pid ? showReviews(pid) : location.reload();
}
