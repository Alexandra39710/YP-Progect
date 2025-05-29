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
