document.addEventListener("DOMContentLoaded", function () {
  // Элементы интерфейса
  const loginForm = document.getElementById("admin-login");
  const loginPanel = document.getElementById("login-form");
  const adminPanel = document.getElementById("admin-panel");
  const logoutBtn = document.getElementById("logout-btn");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // Данные администратора (в реальном приложении это должно быть на сервере)
  const adminCredentials = {
    login: "admin",
    password: "admin123",
    name: "Сидорова Валерия Владимировна",
  };

  // Проверка входа
  if (localStorage.getItem("adminLoggedIn") === "true") {
    loginPanel.style.display = "none";
    adminPanel.style.display = "block";
    document.getElementById("admin-name").textContent =
      localStorage.getItem("adminName") || adminCredentials.name;
  }

  // Обработка входа
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;

    if (
      username === adminCredentials.login &&
      password === adminCredentials.password
    ) {
      // Успешный вход
      loginPanel.style.display = "none";
      adminPanel.style.display = "block";
      document.getElementById("admin-name").textContent = adminCredentials.name;

      // Сохраняем в localStorage
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("adminName", adminCredentials.name);
    } else {
      alert("Неверный логин или пароль");
    }
  });

  // Выход из системы
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");
    loginPanel.style.display = "block";
    adminPanel.style.display = "none";
    loginForm.reset();
  });

  // Переключение вкладок
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");

      // Удаляем активный класс у всех кнопок и контента
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Добавляем активный класс текущей кнопке и контенту
      this.classList.add("active");
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });

  // Обработка действий с заказами
  document.querySelectorAll(".btn-process").forEach((btn) => {
    btn.addEventListener("click", function () {
      const orderItem = this.closest(".order-item");
      const statusElement = orderItem.querySelector(".order-status");

      statusElement.textContent = "В обработке";
      statusElement.className = "order-status processing";

      // Обновляем кнопки
      const actionsDiv = orderItem.querySelector(".order-actions");
      actionsDiv.innerHTML = `
        <button class="btn btn-small btn-ship">Отправить</button>
        <button class="btn btn-small btn-cancel">Отменить</button>
      `;

      // Добавляем обработчики для новых кнопок
      addOrderActionHandlers();
    });
  });

  document.querySelectorAll(".btn-ship").forEach((btn) => {
    btn.addEventListener("click", function () {
      const orderItem = this.closest(".order-item");
      const statusElement = orderItem.querySelector(".order-status");

      statusElement.textContent = "Отправлен";
      statusElement.className = "order-status shipped";

      // Обновляем кнопки
      const actionsDiv = orderItem.querySelector(".order-actions");
      actionsDiv.innerHTML = `
        <button class="btn btn-small btn-deliver">Доставлен</button>
      `;

      // Добавляем обработчики для новых кнопок
      addOrderActionHandlers();
    });
  });

  document.querySelectorAll(".btn-cancel").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (confirm("Вы уверены, что хотите отменить этот заказ?")) {
        const orderItem = this.closest(".order-item");
        const statusElement = orderItem.querySelector(".order-status");

        statusElement.textContent = "Отменен";
        statusElement.className = "order-status cancelled";

        // Удаляем кнопки действий
        const actionsDiv = orderItem.querySelector(".order-actions");
        actionsDiv.innerHTML = "";
      }
    });
  });

  // Обработка действий с пользователями
  document.querySelectorAll(".btn-block").forEach((btn) => {
    btn.addEventListener("click", function () {
      const userRow = this.closest("tr");
      userRow.classList.add("blocked");

      const statusElement = userRow.querySelector("td:nth-child(6) span");
      statusElement.textContent = "Заблокирован";
      statusElement.className = "status-blocked";

      // Меняем кнопку
      this.textContent = "Разблокировать";
      this.className = "btn btn-small btn-unblock";

      // Добавляем обработчик для новой кнопки
      this.addEventListener("click", unblockUser);
    });
  });

  document.querySelectorAll(".btn-unblock").forEach((btn) => {
    btn.addEventListener("click", unblockUser);
  });

  function unblockUser() {
    const userRow = this.closest("tr");
    userRow.classList.remove("blocked");

    const statusElement = userRow.querySelector("td:nth-child(6) span");
    statusElement.textContent = "Активный";
    statusElement.className = "status-active";

    // Меняем кнопку
    this.textContent = "Заблокировать";
    this.className = "btn btn-small btn-block";

    // Добавляем обработчик для новой кнопки
    this.addEventListener("click", function () {
      const userRow = this.closest("tr");
      userRow.classList.add("blocked");

      const statusElement = userRow.querySelector("td:nth-child(6) span");
      statusElement.textContent = "Заблокирован";
      statusElement.className = "status-blocked";

      // Меняем кнопку
      this.textContent = "Разблокировать";
      this.className = "btn btn-small btn-unblock";

      // Добавляем обработчик для новой кнопки
      this.addEventListener("click", unblockUser);
    });
  }

  // Функция для добавления обработчиков действий с заказами
  function addOrderActionHandlers() {
    document.querySelectorAll(".btn-process").forEach((btn) => {
      btn.addEventListener("click", function () {
        const orderItem = this.closest(".order-item");
        const statusElement = orderItem.querySelector(".order-status");

        statusElement.textContent = "В обработке";
        statusElement.className = "order-status processing";

        // Обновляем кнопки
        const actionsDiv = orderItem.querySelector(".order-actions");
        actionsDiv.innerHTML = `
          <button class="btn btn-small btn-ship">Отправить</button>
          <button class="btn btn-small btn-cancel">Отменить</button>
        `;

        // Добавляем обработчики для новых кнопок
        addOrderActionHandlers();
      });
    });

    document.querySelectorAll(".btn-ship").forEach((btn) => {
      btn.addEventListener("click", function () {
        const orderItem = this.closest(".order-item");
        const statusElement = orderItem.querySelector(".order-status");

        statusElement.textContent = "Отправлен";
        statusElement.className = "order-status shipped";

        // Обновляем кнопки
        const actionsDiv = orderItem.querySelector(".order-actions");
        actionsDiv.innerHTML = `
          <button class="btn btn-small btn-deliver">Доставлен</button>
        `;

        // Добавляем обработчики для новых кнопок
        addOrderActionHandlers();
      });
    });

    document.querySelectorAll(".btn-cancel").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (confirm("Вы уверены, что хотите отменить этот заказ?")) {
          const orderItem = this.closest(".order-item");
          const statusElement = orderItem.querySelector(".order-status");

          statusElement.textContent = "Отменен";
          statusElement.className = "order-status cancelled";

          // Удаляем кнопки действий
          const actionsDiv = orderItem.querySelector(".order-actions");
          actionsDiv.innerHTML = "";
        }
      });
    });

    document.querySelectorAll(".btn-deliver").forEach((btn) => {
      btn.addEventListener("click", function () {
        const orderItem = this.closest(".order-item");
        const statusElement = orderItem.querySelector(".order-status");

        statusElement.textContent = "Доставлен";
        statusElement.className = "order-status delivered";

        // Удаляем кнопки действий
        const actionsDiv = orderItem.querySelector(".order-actions");
        actionsDiv.innerHTML = "";
      });
    });
  }

  // Инициализация обработчиков при загрузке
  addOrderActionHandlers();

  // Фильтрация заказов по статусу
  const statusFilter = document.getElementById("order-status-filter");
  statusFilter.addEventListener("change", function () {
    const status = this.value;
    const orders = document.querySelectorAll(".order-item");

    orders.forEach((order) => {
      const orderStatus = order
        .querySelector(".order-status")
        .className.includes(status);

      if (status === "all" || orderStatus) {
        order.style.display = "block";
      } else {
        order.style.display = "none";
      }
    });
  });

  // Поиск по заказам
  const orderSearch = document.getElementById("order-search");
  orderSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const orders = document.querySelectorAll(".order-item");

    orders.forEach((order) => {
      const orderText = order.textContent.toLowerCase();

      if (orderText.includes(searchTerm)) {
        order.style.display = "block";
      } else {
        order.style.display = "none";
      }
    });
  });

  // Фильтрация пользователей по статусу
  const userStatusFilter = document.getElementById("user-status-filter");
  userStatusFilter.addEventListener("change", function () {
    const status = this.value;
    const users = document.querySelectorAll(".users-table tbody tr");

    users.forEach((user) => {
      const isBlocked = user.classList.contains("blocked");

      if (
        status === "all" ||
        (status === "active" && !isBlocked) ||
        (status === "blocked" && isBlocked)
      ) {
        user.style.display = "table-row";
      } else {
        user.style.display = "none";
      }
    });
  });

  // Поиск по пользователям
  const userSearch = document.getElementById("user-search");
  userSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const users = document.querySelectorAll(".users-table tbody tr");

    users.forEach((user) => {
      const userText = user.textContent.toLowerCase();

      if (userText.includes(searchTerm)) {
        user.style.display = "table-row";
      } else {
        user.style.display = "none";
      }
    });
  });

  // Поиск по товарам
  const productSearch = document.getElementById("product-search");
  productSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const products = document.querySelectorAll(".products-table tbody tr");

    products.forEach((product) => {
      const productText = product.textContent.toLowerCase();

      if (productText.includes(searchTerm)) {
        product.style.display = "table-row";
      } else {
        product.style.display = "none";
      }
    });
  });

  // Добавление нового товара (пример)
  document
    .querySelector(".btn-add-product")
    .addEventListener("click", function () {
      alert("Функция добавления нового товара будет реализована в будущем");
    });
});
document.addEventListener("DOMContentLoaded", function () {
  // Бургер-меню
  const burgerMenu = document.getElementById("burger-menu");
  const navMenu = document.getElementById("nav-menu");

  burgerMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", function () {
      burgerMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Закрытие меню при клике вне его области
  document.addEventListener("click", function (e) {
    if (!navMenu.contains(e.target) && !burgerMenu.contains(e.target)) {
      burgerMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });

  // Добавим стиль для отключения скролла при открытом меню
  const style = document.createElement("style");
  style.innerHTML = `
    .no-scroll {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  // ... остальной существующий код ...
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