'use strict';
let searchButton = document.querySelector('#search_button');
let searchEnter = document.querySelector('#search_enter');
let addInFavorites = document.querySelector('#add_to_favorites');
let historyCity = document.querySelector('.history_city');
let favoritesCity = document.querySelector('.favorites_city');
let request = document.getElementsByName('request_type');
let menu = document.querySelector('menu');
let newEventBus = new EventBus();
let arrCity = [];
let arrWithFavoritesCity = [];
let hashForCityPage = '#city/';
let xhrOrFetchValue, cityName, latCity, lngCity ;

// обработчик радиобаттонов
[].forEach.call(request,(elem)=>{
    if( elem.getAttribute('checked') !== null ){
        xhrOrFetchValue = elem.value;
    }
    elem.addEventListener('change',()=> {
        xhrOrFetchValue = elem.value;
    })
});

//обработчик меню
menu.addEventListener('click', (event)=>{
    let target = event.target

    if(target.tagName !== 'A') return

    if(target.innerHTML === 'Main'){
        newEventBus.trigger('main');
    }
})

//загрузка данных с локалсторедж для history
if( localStorage.historyCity !== '' && localStorage.historyCity ){
    arrCity = JSON.parse(localStorage.getItem('historyCity'));
    addArr (arrCity, historyCity, addElemWithCityInHTML);
}

//загрузка данных с локалсторедж для favoritesCity
if( localStorage.favoritesCity && localStorage.favoritesCity !== '' ){
    arrWithFavoritesCity = JSON.parse(localStorage.getItem('favoritesCity'));
    addArr (arrWithFavoritesCity, favoritesCity, addElemWithSpaceInHTML);
}

/*//загрузка данных с локалсторедж для history
if( localStorage.historyCity !== '' && localStorage.historyCity ){
    getHistoryCity()
        .then((result)=>{
            return addArr (result, historyCity, addElemWithCityInHTML);
        })
}

//загрузка данных с локалсторедж для favoritesCity
if( localStorage.favoritesCity && localStorage.favoritesCity !== '' ){
    getFavoritesCity()
        .then((result)=>{
            alert(result);
            return addArr (result, favoritesCity, addElemWithSpaceInHTML);
        })
}*/

newEventBus.on('init',() => {
    cityName = location.hash.split('/')[1];
    cityName = cityName.split(',');
    latCity = cityName[0];
    lngCity = cityName[1];

    if( parseInt(cityName) ){
      newEventBus.on('прогрузилась_карта', ()=>{
        newEventBus.trigger('показать_центер_карты', latCity, lngCity);
      });
      newEventBus.trigger('показать_центер_карты', latCity, lngCity);
      newEventBus.trigger('Запросить_погоду_для_города', xhrOrFetchValue, latCity, lngCity);

    } else {
        newEventBus.trigger('Дать_данные', xhrOrFetchValue, cityName);
    }
});

newEventBus.on('main',() => {
  newEventBus.trigger('Местоположение', xhrOrFetchValue);
});

newEventBus.on('Дать_координаты_с_гугла', (lat, lng)=>{
  latCity = lat;
  lngCity = lng;
  newEventBus.trigger('показать_центер_карты', lat, lng);
});

newEventBus.on('Координаты_Местоположения', (lat, lng)=>{
  latCity = lat;
  lngCity = lng;
  newEventBus.trigger('показать_центер_карты', lat, lng);
});


//для загрузки стартовой страницы или при открытия ссылки
if (location.hash !== '' && location.hash !== '#main' && location.hash !== '#about' && location.hash !== '#author' && location.hash !== '#' ) {
  let cityName = location.hash.split('/')[1];
  cityName = cityName.split(',');
  latCity = cityName[0];
  lngCity = cityName[1];


  if (!parseInt(cityName)) {
    newEventBus.on('прогрузилась_карта', () => {
      newEventBus.trigger('показать_центер_карты', latCity, lngCity);
    });
  }
} else if (location.hash === '#main') {
  newEventBus.trigger('Местоположение', xhrOrFetchValue);
}

newEventBus.on('Погода_получена', (param)=>{
  newEventBus.trigger('Отрисовать_погоду', param);
});

// для double click
newEventBus.on('getCentralYandexMap', centralArr =>{
    addSpaceInFavorite(centralArr);
});

// Обработкик кнопки поиска (при нажатии ввода или кнопки)
searchButton.addEventListener('click',(elem)=>{
    elem.preventDefault(); // отмена стандартного действия
    let city = testEnterValue(searchEnter.value); // проверка на введенное значение
    city = city.charAt(0).toUpperCase() + city.substr(1).toLowerCase(); // форматирование значения для добавления в масссив
    addArrCity (city, arrCity);
    addArr (arrCity, historyCity, addElemWithCityInHTML, );
    location.hash = hashForCityPage + city;
    saveHistoryCityInLocal()
});

// Обработкик кнопки добавить в избранное
addInFavorites.addEventListener('click',()=>{
    newEventBus.trigger('addInFavorites'); //добавь центр карты
});

// Обработкик для favorites
favoritesCity.addEventListener('click',(event)=>{
    let target = event.target;

    if( target.tagName === 'P' ) {
        location.hash  = hashForCityPage + target.innerHTML;
    }

    if( target.tagName === 'BUTTON' ) {

        favoritesCity.removeChild(target.parentNode);
        let er = target.parentNode.querySelector('p');
        er = er.innerHTML;
        addArrCity (er, arrWithFavoritesCity );
        arrWithFavoritesCity.forEach((el, i)=>{
            if( el + '' === er + '' ){
                return arrWithFavoritesCity.splice(i, 1);
            }
        });
        storeFavoritesCity();
    }
});

//обработчик для History
historyCity.addEventListener('click',(event)=>{
    let target = event.target;
    if( target.tagName === 'P' ) {
        location.hash  = hashForCityPage + target.innerHTML;
    }
});

function addSpaceInFavorite(coords) {
    let space = [addRoundNumber( coords[0],1000 ), addRoundNumber( coords[1],1000) ];
    addArrCity(space, arrWithFavoritesCity);
    addArr(arrWithFavoritesCity, favoritesCity, addElemWithSpaceInHTML);
    storeFavoritesCity();
}

//функция округления чисел
function addRoundNumber(num, valueRound) {
    return Math.round(num * valueRound) / valueRound
}

// функция для создания массива 5 элементов
// сначала добавляет по 1-му элементу пока не создаст массив
// после добавления 5-го - добавляет первый, удаляет последний
function addArrCity (value, arr ) {
    if (arr.length === 0) {
        return arr.unshift(value);
    }
    arr.forEach(function (el, i) {
        if (el.toString() === value.toString()) {
            arr.splice(i, 1);
        }
    });
    if (arr.length < 5) {
        arr.unshift(value);
    } else if( arr.length >= 5) {
        arr.pop();
        arr.unshift(value);
    }
    return arr;
}

// создает елемент с городом для добавления на HTML
function addElemWithCityInHTML(el) {
    return  '<p>' + el +  '</p>'
}

//Функция вставки елементов на страницу
function addArr (arr, parentElem, insertionHTMLel ) {
    parentElem.innerHTML = '';
    arr.forEach(function (el) {
        parentElem.innerHTML = parentElem.innerHTML + insertionHTMLel(el)  ;
    })
}

//функция вставки
function addElemWithSpaceInHTML(el) {
    return '<div> ' +
        '<p>' + el +  '</p>' +
        '<button> x </button>' +
        '</div>'
}

// Функция проверки введённых значений (доработать)
function testEnterValue (value) {
    if(value === ''){
        return prompt('Введите наименование города', 'Минск')
    }
    return value;
}

function saveHistoryCityInLocal() {
    let value = JSON.stringify( arrCity );
    return Promise.resolve(localStorage.setItem('historyCity', value));
}

function getHistoryCity() {
    return Promise.resolve( JSON.parse(localStorage.getItem('historyCity')));
}

function storeFavoritesCity() {
    let value = JSON.stringify( arrWithFavoritesCity );
    return Promise.resolve(localStorage.setItem('favoritesCity', value));
}

function getFavoritesCity() {
    return Promise.resolve( JSON.parse(localStorage.getItem('favoritesCity')));
}
