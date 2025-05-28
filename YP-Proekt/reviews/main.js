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
