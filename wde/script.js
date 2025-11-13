// Simple static JS for E-Kart Student Portal
const products = [
  {id: 1, name: "Wireless Earbuds", price: 999, img: "https://picsum.photos/seed/p1/200"},
  {id: 2, name: "Smart Watch", price: 1499, img: "https://picsum.photos/seed/p2/200"},
  {id: 3, name: "Backpack", price: 799, img: "https://picsum.photos/seed/p3/200"},
  {id: 4, name: "Bluetooth Speaker", price: 1299, img: "https://picsum.photos/seed/p4/200"},
];

let wishlist = [];
let orders = [];
let reviews = [];
let tickets = [];

const productList = document.getElementById("productList");
products.forEach(p => {
  const card = document.createElement("div");
  card.className = "product";
  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick="addToWishlist(${p.id})">💖 Wishlist</button>
    <button onclick="buyNow(${p.id})">🛒 Buy Now</button>
  `;
  productList.appendChild(card);
});

function addToWishlist(id) {
  const p = products.find(x => x.id === id);
  if (!wishlist.includes(p)) wishlist.push(p);
  displayWishlist();
}

function buyNow(id) {
  const p = products.find(x => x.id === id);
  orders.push({ ...p, orderId: Date.now() });
  displayOrders();
  alert("Order placed successfully!");
}

function displayWishlist() {
  const box = document.getElementById("wishList");
  box.innerHTML = wishlist.map(p => `<p>💖 ${p.name} - ₹${p.price}</p>`).join("") || "No items yet.";
}

function displayOrders() {
  const box = document.getElementById("orderList");
  box.innerHTML = orders.map(o => `<p>🛍️ ${o.name} - Order ID: ${o.orderId}</p>`).join("") || "No orders yet.";
}

// Reviews
document.getElementById("reviewForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("reviewName").value;
  const text = document.getElementById("reviewText").value;
  if (name && text) {
    reviews.push({ name, text });
    displayReviews();
    e.target.reset();
  }
});
function displayReviews() {
  const box = document.getElementById("reviewList");
  box.innerHTML = reviews.map(r => `<p><b>${r.name}</b>: ${r.text}</p>`).join("") || "No reviews yet.";
}

// Customer Care
document.getElementById("supportForm").addEventListener("submit", e => {
  e.preventDefault();
  const type = document.getElementById("issueType").value;
  const msg = document.getElementById("issueMsg").value;
  if (msg) {
    tickets.push({ type, msg });
    displayTickets();
    e.target.reset();
  }
});
function displayTickets() {
  const box = document.getElementById("ticketList");
  box.innerHTML = tickets.map(t => `<p><b>${t.type}:</b> ${t.msg}</p>`).join("") || "No tickets yet.";
}

// Login/Register modal
const modal = document.getElementById("loginModal");
document.getElementById("openLogin").onclick = () => modal.style.display = "flex";
modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

let mode = "login";
document.getElementById("switchMode").onclick = () => {
  mode = mode === "login" ? "register" : "login";
  document.getElementById("modalTitle").textContent = mode === "login" ? "Login" : "Register";
  document.getElementById("authBtn").textContent = mode === "login" ? "Login" : "Register";
};

document.getElementById("authForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("authName").value;
  const email = document.getElementById("authEmail").value;
  const pass = document.getElementById("authPass").value;
  const msg = document.getElementById("authMsg");

  if (!email.includes("@") || pass.length < 6) {
    msg.textContent = "❌ Invalid email or short password!";
    return;
  }
  msg.style.color = "green";
  msg.textContent = mode === "login" ? "✅ Logged in successfully!" : "🎉 Registered successfully!";
  setTimeout(() => modal.style.display = "none", 1000);
});
