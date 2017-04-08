// Для доступа к полю для ввода имени
var nameInput = document.querySelector('input[name=name]');
// Для доступа к полю с описанием
var aboutTextArea = document.querySelector('textarea');
// Для доступа к кнопке запуска
var goButton = document.getElementById('go');

// Функция возвращает информацию на основе данных введенных в поля ввода
// Результат работы функции - строка
function getInfo() {
    // Обрабатываем содержание textarea - ищем цифры в введенном тексте
    var match = aboutTextArea.value.match(/\d+/);
    var age;
    var name;
    // Если регулярное выражение содержит не null
    // значит в тексте нашлась последовательность цифр
    // в качестве возраста возьмем первую цифровую последовательность в тексте
    // либо текст по-умолчанию
    if (match) {
        age = match[0];
    } else {
        age = 'мы не знаем когда';
    }

    // Если в поле name введено значение - возьмем его в качестве имени
    // иначе - значение по-умолчанию
    if (nameInput.value) {
        name = nameInput.value;
    } else {
        name = 'мы не знаем кто';
    }

    // Результат - строка с подставленными значениями
    return name + ' родился ' + age;
}

// Функция отображает информацию в соответствующем блоке
function displayInfo(info) {
    // Найти элемент по css-селектору и заменить его внутренний html
    document.querySelector('#info').innerHTML = info;
}

// для кнопки запуска - добавить обработчик для события click
// при каждом клике будет запускаться функция
goButton.addEventListener('click', function() {
    // Отобразить информацию из полей ввода
    displayInfo(getInfo());
});
