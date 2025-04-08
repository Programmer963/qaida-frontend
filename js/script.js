'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});
/**
 * idea generator
 */

const ideas = [
  "☕ Зайди в уютную кофейню поблизости.",
  "🌳 Прогуляйся в ближайшем парке.",
  "🎬 Сходи в кинотеатр — есть хорошие премьеры.",
  "🍔 Попробуй новое место с бургерами.",
  "🎳 Сыграй в боулинг с друзьями.",
  "🎮 Посети VR-клуб или квест-комнату.",
  "🍕 Устрой вечер итальянской кухни.",
  "📷 Сходи на смотровую площадку.",
  "🚴‍♂️ Прокатись на самокате или велике.",
  "📚 Проведи время в книжном кафе."
];

const generateBtn = document.getElementById("generateBtn");
const ideaResult = document.getElementById("ideaResult");

if (generateBtn && ideaResult) {
  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    ideaResult.textContent = randomIdea;
  });
}
const ideasData = {
  cafe: {
    low: ["☕ Забеги в местную кофейню с take-away", "🍩 Попробуй уличную выпечку поблизости"],
    medium: ["🍰 Посети кафе с десертами", "🍜 Пообедай в уютной лапшичной"],
    high: ["🥂 Устрой ужин в стильном ресторане", "🍣 Сходи в суши-бар с панорамой"],
  },
  walk: {
    low: ["🌳 Прогуляйся в парке рядом", "🚶 Обойди район, которого не знаешь"],
    medium: ["📷 Сфоткайся на смотровой", "🛍 Пройдись по местным ярмаркам"],
    high: ["🚗 Съезди на набережную или за город", "🗻 Поднимись на холм с видом"],
  },
  cinema: {
    low: ["📼 Включи классику дома", "📺 Найди открытый показ на улице"],
    medium: ["🎬 Сходи в ближайший кинотеатр", "🎞 Посмотри артхаус в маленьком зале"],
    high: ["🛋 Смотри кино в VIP-зале", "🍿 Иди в IMAX или Dolby Cinema"],
  },
  entertainment: {
    low: ["🎲 Поиграй в настолки в антикафе", "🎯 Проведи вечер в баре с дартсом"],
    medium: ["🎮 Загляни в VR-клуб", "🎳 Иди в боулинг или бильярд"],
    high: ["🕵️ Пройди квест", "🎡 Посети аттракционы в парке"],
  },
};

document.getElementById("generateBtn").addEventListener("click", function () {
  const category = document.getElementById("category").value;
  const budget = document.getElementById("budget").value;
  const output = document.getElementById("ideaResult");

  const options = ideasData[category]?.[budget];

  if (options && options.length > 0) {
    const idea = options[Math.floor(Math.random() * options.length)];
    output.textContent = idea;
  } else {
    output.textContent = "😕 Ничего не найдено по этим фильтрам";
  }
});

