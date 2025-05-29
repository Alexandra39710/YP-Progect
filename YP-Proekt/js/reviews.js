const sliders = {
  slider1: 0,
  slider2: 0,
  slider3: 0,
};

function updateSlider(sliderId, dotsId) {
  const slider = document.getElementById(sliderId);
  const sliderInner = slider.querySelector(".slider-inner");
  const dots = document.getElementById(dotsId).querySelectorAll(".dot");

  sliderInner.style.transform = `translateX(-${sliders[sliderId] * 390}px)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === sliders[sliderId]);
  });
}

function nextSlide(sliderId, dotsId) {
  sliders[sliderId] = (sliders[sliderId] + 1) % 3;
  updateSlider(sliderId, dotsId);
}

function prevSlide(sliderId, dotsId) {
  sliders[sliderId] = (sliders[sliderId] - 1 + 3) % 3;
  updateSlider(sliderId, dotsId);
}

// Инициализация обработчиков для точек
document.querySelectorAll(".slider-dots").forEach((dotsContainer) => {
  const dots = dotsContainer.querySelectorAll(".dot");
  const sliderId = dotsContainer.id.replace("dots", "slider");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      sliders[sliderId] = parseInt(dot.getAttribute("data-index"));
      updateSlider(sliderId, dotsContainer.id);
    });
  });
});

// --------------------------------

// Бургер-меню
document.querySelector(".burger-icon").addEventListener("click", function (e) {
  e.stopPropagation();
  document.getElementById("menuItems").classList.toggle("show");
});

document.getElementById("candlesLink").addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  document.getElementById("candlesSubmenu").classList.toggle("show");
});

// Закрытие меню при клике вне его области
window.addEventListener("click", function (e) {
  const menu = document.getElementById("menuItems");
  if (!e.target.closest(".burger-menu") && menu.classList.contains("show")) {
    menu.classList.remove("show");
    document.getElementById("candlesSubmenu").classList.remove("show");
  }
});

// Ваш существующий код для модального окна
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("userModal");
  const userIcon = document.getElementById("userIcon");
  const closeBtn = document.querySelector(".close");

  userIcon.addEventListener("click", function (e) {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});