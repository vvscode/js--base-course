'use strict';



/* обработчики
    addSpace - запросить координаты места
    addWeather - запросить погоду
    addNameCity - запросить имя города

    getSpace - запросить координаты места
    getWeather - запросить погоду
    getNameCity - запросить имя города
*/












let searchButton = document.querySelector('#search_button');
let searchEnter = document.querySelector('#search_enter');
let request = document.getElementsByName('request_type');
let addInFavorites = document.querySelector('#add_in_favorites');
let newEventBus = new EventBus();
let arrCity = [];
let arrWithFavoritesCity = [];
let historyCity = document.querySelector('.history_city');
let favoritesCity = document.querySelector('.favorites_city');

//загрузка данных с локалсторедж
if( localStorage.historyCity !== '' && localStorage.historyCity ){
  arrCity = JSON.parse(localStorage.getItem('historyCity'));
  addArr (arrCity, historyCity, addElemWithCityInHTML);
}

if( localStorage.favoritesCity && localStorage.favoritesCity !== '' ){
  arrWithFavoritesCity = JSON.parse(localStorage.getItem('favoritesCity'));
  addArr (arrWithFavoritesCity, favoritesCity, addElemWithSpaceInHTML);
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


// обработчик радиобаттонов
for (let i=0; i < request.length; i++){
  request[i].addEventListener('change',function () {
    alert(i);
  })
}

newEventBus.on('showMap',(cb) => {
  newEventBus.trigger('addWeather', cb[0], cb[1]);
  newEventBus.on('getWeather', (param)=>{
    newEventBus.trigger('showWeatherCity', param);
  })
});

console.log('идет загрузка страницы');







// Обработкик кнопки поиска (при нажатии ввода или кнопки)
searchButton.addEventListener('click',(elem)=>{
    elem.preventDefault(); // отмена стандартного действия
    let city = testEnterValue(searchEnter.value); // проверка на введенное значение
    city = city.charAt(0).toUpperCase() + city.substr(1).toLowerCase(); // форматирование значения для добавления в масссив


    addArrCity (city, arrCity);
    addArr (arrCity, historyCity, addElemWithCityInHTML, );
    saveHistoryCityInLocal()
});

newEventBus.on('init',() => {
    let t = location.hash.split('/')[1];
    WWW(t)
});





function WWW(param) {


    if( parseInt(param) ){
        param = param.split(',');
        let lat = param[0];
        let lng = param[1];

        newEventBus.trigger('showCity', lat, lng);
        newEventBus.trigger('addWeather', lat, lng);

        newEventBus.on('getWeather', (param)=>{
            newEventBus.trigger('showWeatherCity', param);
        });
    } else {
        newEventBus.trigger('addSpace', param);
        newEventBus.on('getSpace', (lat, lng)=>{
            newEventBus.trigger('showCity', lat, lng);
            newEventBus.trigger('addWeather', lat, lng)
        });
        newEventBus.on('getWeather', (param)=>{
            newEventBus.trigger('showWeatherCity', param);
        });
    }

}







// Обработкик кнопки добавить в избранное
addInFavorites.addEventListener('click',()=>{
  let space;
  newEventBus.on('getCentralYandexMap', (centralArr)=>{
    space = [addRoundNumber( centralArr[0],1000 ), addRoundNumber( centralArr[1],1000) ];

    /*newEventBus.trigger('addNameCity', space);
    newEventBus.on('getNameCity', (nameCity)=> {
        addArrCity(nameCity, arrWithFavoritesCity);
        addArr(arrWithFavoritesCity, favoritesCity, addElemWithSpaceInHTML);
    })*/

      addArrCity(space, arrWithFavoritesCity);
      addArr(arrWithFavoritesCity, favoritesCity, addElemWithSpaceInHTML);

  });

  newEventBus.trigger('addInFavorites');
  storeFavoritesCity();
});

// Обработкик для favorites
favoritesCity.addEventListener('click',(event)=>{
    let target = event.target;

    if( target.tagName === 'P' ) {
        location.hash  = '#city/' + target.innerHTML;
    }

    if( target.tagName === 'BUTTON' ) {

        favoritesCity.removeChild(target.parentNode);
        let t = target.parentNode.querySelector('p');
        t = t.innerHTML;
        addArrCity (t, arrWithFavoritesCity );
        arrWithFavoritesCity.forEach((el, i)=>{
            if( el + '' === t + '' ){
                return arrWithFavoritesCity.splice(i, 1);
            }
        });
        storeFavoritesCity();
    }
});


//обработчик для History
historyCity.addEventListener('click',()=>{
    let target = event.target;
    if( target.tagName === 'P' ) {
        location.hash  = '#city/' + target.innerHTML;
    }
});

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


