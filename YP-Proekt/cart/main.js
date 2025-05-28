// document.addEventListener("DOMContentLoaded", function () {
//   const cartItemsContainer = document.getElementById("cart-items");
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   if (cart.length === 0) {
//     cartItemsContainer.innerHTML = `
//               <div class="empty-cart">
//                 <h2>Ваша корзина пуста</h2>
//                 <p>Вернитесь в магазин, чтобы добавить товары</p>
//               </div>
//             `;
//   } else {
//     cart.forEach((item) => {
//       const cartItems = document.createElement("div");
//       const cartItem = document.createElement("div");
//       cartItems.className = "cart-items";
//       // cartItem.className = "cart-item";
//       cartItem.innerHTML = `
//               <div class="cart-item">
//                 <img src="${item.image}" alt="${item.name}">
//                 <div class="cart-item-info">
//                   <h3>${item.name}</h3>
//                   <p>${item.description}</p>
//                   <p>${item.volume}</p>
//                   <p>${item.wick}</p>
//                   <div class="cart-item-price">${item.price}</div>
//                 </div>
//               </div>
//               `;
//       cartItemsContainer.appendChild(cartItem);
//     });
//   }
// });

// ----------------------------------------------------------------

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
      return;
    }

    // Группируем товары по имени и считаем количество
    const groupedItems = {};
    cart.forEach((item) => {
      const key = item.name + item.price; // Уникальный ключ по имени и цене
      if (!groupedItems[key]) {
        groupedItems[key] = { ...item, quantity: 0 };
      }
      groupedItems[key].quantity += 1;
    });

    // Отображаем сгруппированные товары
    Object.values(groupedItems).forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
        <button class="remove-btn" data-key="${
          item.name + item.price
        }">×</button>
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>${item.volume}</p>
        <p>${item.wick}</p>
        <div class="cart-item-price">${item.price}</div>
        <div class="quantity-badge">${item.quantity}</div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Добавляем обработчики для кнопок удаления
    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const itemKey = this.getAttribute("data-key");
        // Находим индекс первого товара с таким ключом
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
