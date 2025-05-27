// Добавьте этот JavaScript в ваш main.js
document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.querySelector(".story-cards");
  const cards = Array.from(document.querySelectorAll(".card"));
  const volumeFilter = document.getElementById("volume-filter");
  const sortBy = document.getElementById("sort-by");
  const searchInput = document.getElementById("search");

  // Функция фильтрации по объёму
  function filterByVolume() {
    const volume = volumeFilter.value;

    cards.forEach((card) => {
      const volumeText = card.querySelector("p:nth-of-type(2)").textContent;
      const cardVolume = volumeText.match(/\d+/)[0];

      if (volume === "all" || cardVolume === volume) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Функция сортировки
  function sortCards() {
    const sortValue = sortBy.value;
    const filteredCards = cards.filter((card) => card.style.display !== "none");

    filteredCards.sort((a, b) => {
      switch (sortValue) {
        case "name-asc":
          return a
            .querySelector("h3")
            .textContent.localeCompare(b.querySelector("h3").textContent);
        case "name-desc":
          return b
            .querySelector("h3")
            .textContent.localeCompare(a.querySelector("h3").textContent);
        case "price-asc":
          return (
            parsePrice(a.querySelector("span").textContent) -
            parsePrice(b.querySelector("span").textContent)
          );
        case "price-desc":
          return (
            parsePrice(b.querySelector("span").textContent) -
            parsePrice(a.querySelector("span").textContent)
          );
        default:
          return 0;
      }
    });

    // Очищаем контейнер и добавляем отсортированные карточки
    cardsContainer.innerHTML = "";
    filteredCards.forEach((card) => cardsContainer.appendChild(card));

    // Добавляем оставшиеся скрытые карточки в конец
    cards.forEach((card) => {
      if (card.style.display === "none" && !cardsContainer.contains(card)) {
        cardsContainer.appendChild(card);
      }
    });
  }

  // Функция для парсинга цены
  function parsePrice(priceText) {
    return parseInt(priceText.replace(/\D/g, ""));
  }

  // Функция поиска
  function searchCards() {
    const searchTerm = searchInput.value.toLowerCase();

    cards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();

      if (title.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // Применяем текущую сортировку после поиска
    sortCards();
  }

  // Обработчики событий
  volumeFilter.addEventListener("change", function () {
    filterByVolume();
    sortCards();
  });

  sortBy.addEventListener("change", sortCards);

  searchInput.addEventListener("input", function () {
    searchCards();
  });

  // Инициализация
  filterByVolume();
  sortCards();
});
