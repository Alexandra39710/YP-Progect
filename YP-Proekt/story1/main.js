document.addEventListener("DOMContentLoaded", function () {
  const cardsContainer = document.querySelector(".story-cards");
  const cards = Array.from(document.querySelectorAll(".story-cards .card"));
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");

  // Функция для применения всех фильтров и сортировки
  function applyFiltersAndSort() {
    // Получаем значения фильтров
    const searchQuery = searchInput.value.toLowerCase();
    const selectedVolumes = Array.from(
      document.querySelectorAll('input[name="volume"]:checked')
    ).map((el) => el.value);
    const selectedWicks = Array.from(
      document.querySelectorAll('input[name="wick"]:checked')
    ).map((el) => el.value);

    // Фильтрация карточек
    const filteredCards = cards.filter((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const volume = card
        .querySelector("p:nth-of-type(2)")
        .textContent.replace("Объем баночки: ", "")
        .trim();
      const wick = card
        .querySelector("p:nth-of-type(3)")
        .textContent.replace("Фитиль: ", "")
        .replace("фетиль", "")
        .trim();

      // Проверка соответствия поисковому запросу
      const searchMatch = title.includes(searchQuery);

      // Проверка соответствия фильтрам
      const volumeMatch = selectedVolumes.includes(volume);
      const wickMatch = selectedWicks.some((selectedWick) =>
        wick.includes(selectedWick)
      );

      return searchMatch && volumeMatch && wickMatch;
    });

    // Сортировка карточек
    const sortValue = sortSelect.value;
    filteredCards.sort((a, b) => {
      const titleA = a.querySelector("h3").textContent.toLowerCase();
      const titleB = b.querySelector("h3").textContent.toLowerCase();
      const priceA = parseInt(
        a.querySelector("span").textContent.replace(/\D/g, "")
      );
      const priceB = parseInt(
        b.querySelector("span").textContent.replace(/\D/g, "")
      );

      switch (sortValue) {
        case "name-asc":
          return titleA.localeCompare(titleB);
        case "name-desc":
          return titleB.localeCompare(titleA);
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        default:
          return 0;
      }
    });

    // Очищаем контейнер и добавляем отсортированные карточки
    cardsContainer.innerHTML = "";
    filteredCards.forEach((card) => {
      cardsContainer.appendChild(card);
    });
  }

  // Слушатели событий
  searchInput.addEventListener("input", applyFiltersAndSort);
  sortSelect.addEventListener("change", applyFiltersAndSort);
  document
    .querySelectorAll('input[name="volume"], input[name="wick"]')
    .forEach((input) => {
      input.addEventListener("change", applyFiltersAndSort);
    });

  // Инициализация при загрузке страницы
  applyFiltersAndSort();
});
