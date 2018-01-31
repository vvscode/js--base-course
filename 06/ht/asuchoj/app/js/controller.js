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
[...request].forEach.call(request,(elem)=>{

    if( elem.hasAttribute('checked') ){
        xhrOrFetchValue = elem.value;
    }

    elem.addEventListener('change',()=> {
        xhrOrFetchValue = elem.value;
    });

});



//загрузка данных с локалсторедж для history
if( localStorage.hasOwnProperty('historyCity')  ){
  getHistoryCity()
    .then( (result)=> arrCity = result )
	.then(()=> addArr (arrCity, historyCity, addElemWithCityInHTML))
    .catch(console.log)
}


 //загрузка данных с локалсторедж для favoritesCity
if( localStorage.hasOwnProperty('favoritesCity') ){
  getFavoritesCity()
    .then((result)=> arrWithFavoritesCity = result)
    .then(()=> addArr (arrWithFavoritesCity, favoritesCity, addElemWithSpaceInHTML))
    .catch(console.log)
}


newEventBus.on('init',() => {
    cityName = location.hash.split('/')[1];
    cityName = cityName.split(',');
    latCity = cityName[0];
    lngCity = cityName[1];

    if( parseInt(cityName) ){
      newEventBus.on('mapUploaded', ()=> newEventBus.trigger('showCenterMap', latCity, lngCity));
      newEventBus.trigger('showCenterMap', latCity, lngCity);
      newEventBus.trigger('getWeatherForCity', xhrOrFetchValue, latCity, lngCity);
    } else {
        newEventBus.trigger('getCoordinatesCity', xhrOrFetchValue, cityName);
    }
});

newEventBus.on('main',() => newEventBus.trigger('currentUserLocation', xhrOrFetchValue));

newEventBus.on('getCoordinatesWithGoogle', (lat, lng)=>{
  latCity = lat;
  lngCity = lng;
  newEventBus.trigger('showCenterMap', lat, lng);
});

//для загрузки стартовой страницы или при открытия ссылки
if (location.hash !== ''
  && location.hash !== '#main'
  && location.hash !== '#about'
  && location.hash !== '#author'
  && location.hash !== '#'
) {
  let cityName = location.hash.split('/')[1];
  cityName = cityName.split(',');
  latCity = cityName[0];
  lngCity = cityName[1];

  if (!parseInt(cityName)) {
    newEventBus.on('mapUploaded', () => {
      newEventBus.trigger('showCenterMap', latCity, lngCity);
    });
  }
}

newEventBus.on('GiveWeather', (param)=> newEventBus.trigger('showWeather', param));

// для double click
newEventBus.on('getCentralYandexMap', centralArr => addSpaceInFavorite(centralArr));

//обработчик меню
menu.addEventListener('click', (event)=>{
    let target = event.target;

    if(target.tagName !== 'A') return;

    if(target.innerHTML === 'Main'){
        newEventBus.trigger('main');
    }
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
addInFavorites.addEventListener('click',()=> newEventBus.trigger('addInFavorites')); //добавь центр карты

// Обработкик для favorites
favoritesCity.addEventListener('click',(event)=>{
    let target = event.target;

    if( target.tagName === 'P' ) {
        location.hash  = hashForCityPage + target.innerHTML;
    }

    if( target.tagName === 'BUTTON' ) {

        favoritesCity.removeChild(target.parentNode);
        let er = target.parentNode.querySelector('p').innerHTML;
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

//добавление в избранные
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
    arr.forEach( (el, i)=>{
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
