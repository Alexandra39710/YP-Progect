document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
            <div class="empty-cart">
              <h2>Ваша корзина пуста</h2>
              <p>Вернитесь в магазин, чтобы добавить товары</p>
            </div>
          `;
      localStorage.removeItem("cart");
      return;
    }

    // Группируем товары по уникальному ключу (имя + цена)
    const groupedItems = {};
    cart.forEach((item) => {
      const key = item.name + item.price;
      if (!groupedItems[key]) {
        groupedItems[key] = {
          ...item,
          quantity: 1,
          basePrice: parseFloat(item.price.replace(/[^\d.]/g, "")),
        };
      } else {
        groupedItems[key].quantity += 1;
      }
    });

    // Отображаем сгруппированные товары
    Object.values(groupedItems).forEach((item) => {
      const totalPrice = (item.basePrice * item.quantity).toFixed(0) + " руб.";

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.dataset.key = item.name + item.price;
      cartItem.innerHTML = `
            <div class="cart-item-img-container">
              <img src="${item.image}" alt="${item.name}">
              <button class="remove-btn" title="Удалить товар">×</button>
            </div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>${item.volume}</p>
            <p>${item.wick}</p>
            <div class="cart-item-price">${totalPrice}</div>
            <div class="quantity-controls">
              <button class="quantity-btn minus-btn" ${
                item.quantity <= 1 ? 'disabled style="opacity:0.5"' : ""
              }>-</button>
              <span class="quantity-value">${item.quantity}</span>
              <button class="quantity-btn plus-btn">+</button>
            </div>
          `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Обработчики для кнопок удаления
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const itemKey = this.closest(".cart-item").dataset.key;
        // Удаляем все экземпляры товара
        cart = cart.filter((item) => item.name + item.price !== itemKey);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();

        // Анимация удаления
        const card = this.closest(".cart-item");
        card.style.transform = "scale(0.9)";
        card.style.opacity = "0";
        setTimeout(() => {
          card.remove();
          if (cart.length === 0) {
            updateCartDisplay();
          }
        }, 300);
      });
    });

    // Обработчики для кнопок плюс/минус
    document.querySelectorAll(".plus-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const itemKey = this.closest(".cart-item").dataset.key;
        const item = cart.find((item) => item.name + item.price === itemKey);
        if (item) {
          cart.push({ ...item });
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay();
        }
      });
    });

    document.querySelectorAll(".minus-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const itemKey = this.closest(".cart-item").dataset.key;
        const index = cart.findIndex(
          (item) => item.name + item.price === itemKey
        );
        if (index !== -1) {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay();
        }
      });
    });
  }

  updateCartDisplay();
});
