let currentPrice = 0;

// ===== ABOUT =====
function openAboutPopup() {
  document.getElementById("aboutModal").style.display = "flex";
}

function closeAboutPopup() {
  document.getElementById("aboutModal").style.display = "none";
}

// ===== ORDER =====
function openOrderPopup(name, price) {
  const modal = document.getElementById("orderModal");

  modal.style.display = "flex";

  document.getElementById("productName").innerText = name;
  document.getElementById("productPrice").innerText = price.toLocaleString();
  document.getElementById("quantity").value = 1;
  document.getElementById("totalPrice").innerText = price.toLocaleString();

  currentPrice = price;
}

function closeOrderPopup() {
  document.getElementById("orderModal").style.display = "none";
}

// ===== EVENT LISTENERS =====
document.addEventListener("DOMContentLoaded", () => {
  const quantityInput = document.getElementById("quantity");
  const totalPriceEl = document.getElementById("totalPrice");
  const orderForm = document.getElementById("orderForm");

  // 🔥 CỘNG DỒN GIÁ
  quantityInput.addEventListener("input", () => {
    const qty = Number(quantityInput.value) || 1;
    totalPriceEl.innerText = (currentPrice * qty).toLocaleString();
  });

  // 🔥 XÁC NHẬN ĐẶT HÀNG
  orderForm.addEventListener("submit", e => {
    e.preventDefault();

    alert("🎉 Đặt hàng thành công! Cảm ơn bạn đã ủng hộ shop.");

    closeOrderPopup();
    orderForm.reset();
  });
});
