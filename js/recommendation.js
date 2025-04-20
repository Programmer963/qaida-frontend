const recommendationList = document.querySelector('.recommendation-list');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Переменные для хранения всех рекомендаций и текущего индекса
let allRecommendations = [];
let currentIndex = 0;
const itemsPerPage = 6; // Сколько карточек загружать за раз

// Функция загрузки данных с API
async function fetchRecommendations() {
  try {
    const response = await fetch(`http://localhost:8080/api/recommendations/city/${localStorage.getItem('city')}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();
    console.log('Рекомендации пришли:', data);

    // Проверка, что это массив
    if (Array.isArray(data)) {
      allRecommendations = data;
    } else if (Array.isArray(data.places)) {
      allRecommendations = data.places;
    } else {
      console.warn('Ожидался массив, но пришло:', data);
      return;
    }

    // Показываем первую порцию карточек
    showNextRecommendations();

  } catch (error) {
    console.error('Ошибка загрузки рекомендаций:', error);
  }
}

// Показать следующую порцию карточек
function showNextRecommendations() {
  const nextItems = allRecommendations.slice(currentIndex, currentIndex + itemsPerPage);
  addRecommendations(nextItems);
  currentIndex += itemsPerPage;

  // Скрыть кнопку, если больше нет данных
  if (currentIndex >= allRecommendations.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

// Функция добавления карточек
function addRecommendations(data) {
  const skeletons = document.querySelectorAll('.skeleton');
  skeletons.forEach(skeleton => skeleton.style.display = 'none');

  data.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('recommendation-card');

    card.innerHTML = `
      <img src="${item.photoUrl || 'https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg'}" alt="${item.name}">
      <div class="card-content">
        <h3 class="card-title">Название: ${item.name}</h3>
        <p class="card-description"><b>Рейтинг:</b> ${item.rating}</p>
        <p class="card-description"><b>Статус:</b> ${item.openingHours}</p>
        <span class="see-more">See more</span>
        <div class="extra-info" style="display: none;">
          <p><b>Адрес:</b> ${item.address || 'Дополнительной информации нет.'}</p>
          <p><b>Тип:</b> ${item.type || 'Дополнительной информации нет.'}</p>
        </div>
        <span class="heart-icon ${isFavorite(item) ? 'filled' : ''}" data-title="${item.title}">&#10084;</span>
      </div>
    `;

    recommendationList.appendChild(card);

    const heartIcon = card.querySelector('.heart-icon');
    heartIcon.addEventListener('click', () => {
      toggleFavorite(item);
      heartIcon.classList.toggle('filled');
    });
  });

  document.querySelectorAll('.see-more').forEach(button => {
    button.addEventListener('click', function () {
      const extraInfo = this.nextElementSibling;
      extraInfo.style.display = (extraInfo.style.display === 'none') ? 'block' : 'none';
      this.textContent = (extraInfo.style.display === 'none') ? 'See More' : 'See Less';
    });
  });
}

// Добавление и удаление избранного
function toggleFavorite(item) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.findIndex(fav => fav.title === item.title);


  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Проверка, в избранных ли
function isFavorite(item) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.some(fav => fav.title === item.title);
}

// Загрузка при открытии страницы
document.addEventListener("DOMContentLoaded", () => {
  fetchRecommendations();
  displayFavorites();
});

// Кнопка "Загрузить больше"
loadMoreBtn.addEventListener('click', () => {
  showNextRecommendations();
});

// Отображение избранных
function displayFavorites() {
  const favoriteList = document.querySelector('.favorite-list');
  if (!favoriteList) return;

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    favoriteList.innerHTML = '<p>Нет избранных мест.</p>';
  } else {
    favoriteList.innerHTML = '';
    favorites.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('recommendation-card');
      card.innerHTML = `
        <img src="${item.imageUrl || item.photoUrl}" alt="${item.title || item.name}">
        <div class="card-content">
          <h3 class="card-title">${item.title || item.name}</h3>
          <p class="card-description">${item.description || item.address}</p>
        </div>
      `;
      favoriteList.appendChild(card);
    });
  }
}
