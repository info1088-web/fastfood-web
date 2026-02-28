if (!sessionStorage.getItem("currentUser")) {
  location.href = "./signIn.html";
}


document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productGrid");

  const chickenAPI = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken";
  const beefAPI = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef";

  Promise.all([
    fetch(chickenAPI).then(res => res.json()),
    fetch(beefAPI).then(res => res.json())
  ])
  .then(([chickenData, beefData]) => {

    const chickenMeals = (chickenData.meals || []).slice(0, 8);
    const beefMeals = (beefData.meals || []).slice(0, 8);
    const meals = [...chickenMeals, ...beefMeals];

    meals.forEach(meal => {
      const card = document.createElement("div");
      card.className = "product-card";

   
      card.setAttribute(
        "onclick",
        `openOrderPopup("${meal.strMeal}", 50000)`
      );

      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="info">
          <h3>${meal.strMeal}</h3>
        </div>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => {
    console.error(err);
    grid.innerHTML = "<p>Lỗi tải dữ liệu</p>";
  });
});

let currentSlide = 0;
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slider-container img');
const totalSlides = slides.length;

function autoPlay() {
    currentSlide++;
    
    // Nếu đến ảnh cuối cùng thì quay lại ảnh đầu tiên
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    // Di chuyển slider
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Thiết lập thời gian chuyển ảnh (3000ms = 3 giây)
let slideInterval = setInterval(autoPlay, 3000);

// (Tùy chọn) Dừng chạy khi người dùng di chuột vào banner
const bannerArea = document.querySelector('.banner');
bannerArea.addEventListener('mouseenter', () => clearInterval(slideInterval));
bannerArea.addEventListener('mouseleave', () => slideInterval = setInterval(autoPlay, 3000));