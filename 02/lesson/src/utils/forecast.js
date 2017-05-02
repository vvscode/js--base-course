// Не используем "волшебные" строки и числа - создаем для них константы с пояснением
const MAX_SEARCH_HISTORY = 5;
const CITIES_SEARCH_HISTORY_KEY = 'citiesSearchHistory';
// Функция-алиас для краткого поиска элементов ( просто чтобы меньше писать )
const $$ = document.querySelector.bind(document);

// Считываем историю поисков из localStorage
let citiesSearchHistory;
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
    $$('#mainContent').innerHTML = `Здесь будет информация о ${city}`;
}

// Отображение информации о городах которые искали раньше
// Отвечает только за вывод городов, но не за получение списка
function showHistory(list) {
    // для входного списка просто создаем немаркерованный список 
    // со ссылками
    let html = '<ul>';
    for(let i = 0; i< list.length; i++) {
        html += `<li><a href="#${list[i]}">${list[i]}</a></li>`;
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
    let input = ev.target.querySelector('input');
    let city = input.value;
    // очищаем значение
    input.value = '';
    // обрабатываем поиск нового города
    handleCity(city);
});

// Главная функция, которая обрабатывает изменения hash
// и вызывает отображение списка истории поиска
export function handler() {
    const cityName = window.location.hash.replace('#', '');
    showHistory(citiesSearchHistory);
    if (cityName) {
        showCityInfo(cityName);
    }
}