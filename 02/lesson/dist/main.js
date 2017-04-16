// Не используем "волшебные" строки и числа - создаем для них константы с пояснением
var MAX_SEARCH_HISTORY = 5;
var CITIES_SEARCH_HISTORY_KEY = 'citiesSearchHistory';
// Функция-алиас для краткого поиска элементов ( просто чтобы меньше писать )
var $$ = document.querySelector.bind(document);

// Считываем историю поисков из localStorage
var citiesSearchHistory = void 0;
try {
    citiesSearchHistory = JSON.parse(localStorage.getItem(CITIES_SEARCH_HISTORY_KEY)) || [];
} catch (e) {
    citiesSearchHistory = [];
}

// Функция, которая обрабатывает поиск нового города
function handleCity(city) {
    // Добавляем список в начало списка-истории
    citiesSearchHistory.unshift(city);
    // Берем из списка только первые 
    citiesSearchHistory = citiesSearchHistory.slice(0, MAX_SEARCH_HISTORY);
    // сохраняем новый список в localStorage
    localStorage.setItem(CITIES_SEARCH_HISTORY_KEY, JSON.stringify(citiesSearchHistory));
    // Изменяем адрес, остальные изменения будут обработаны после изменения адреса
    window.location.hash = city;
}

// Функция, которая будет показывать информацию о погоде в городе
// Сейчас - просто заглушка
function showCityInfo(city) {
    $$('#mainContent').innerHTML = '\u0417\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0435\u0442 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E ' + city;
}

// Отображение информации о городах которые искали раньше
// Отвечает только за вывод городов, но не за получение списка
function showHistory(list) {
    // для входного списка просто создаем немаркерованный список 
    // со ссылками
    var html = '<ul>';
    for (var i = 0; i < list.length; i++) {
        html += '<li><a href="#' + list[i] + '">' + list[i] + '</a></li>';
    }
    html += '</ul>';
    $$('#searchHistory').innerHTML = html;

    // $$('#searchHistory').innerHTML = [
    //     `<ul>`,
    //     list.map(i => `<li><a href="#${i}">${i}</a></li>`).join('\n'),
    //     '</ul>'
    // ].join('');
}

// Обработка 'submit' для формы
$$('#searchForm').addEventListener('submit', function (ev) {
    // отменяем поведение по-умолчанию
    ev.preventDefault();
    // считывает значение
    var input = ev.target.querySelector('input');
    var city = input.value;
    // очищаем значение
    input.value = '';
    // обрабатываем поиск нового города
    handleCity(city);
});

// Главная функция, которая обрабатывает изменения hash
// и вызывает отображение списка истории поиска
function handler() {
    var cityName = window.location.hash.replace('#', '');
    showHistory(citiesSearchHistory);
    if (cityName) {
        showCityInfo(cityName);
    }
}

// Вся логика вынесена в отдельный модуль
// Из которого нам нужна только одна функция
// Весь остальной код смотреть в отдельном модуле
// Назначаем эту функцию на изменение hash
window.onhashchange = handler;
// И вызываем эту функцию при загрузке страницы
handler();
