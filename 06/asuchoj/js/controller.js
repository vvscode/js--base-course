'use strict';
let searchButton = document.querySelector('#search_button');
let searchEnter = document.querySelector('#search_enter');
let request = document.getElementsByName('request_type');
let addInFavorites = document.querySelector('#add_in_favorites');
let newEventBus = new EventBus();

let arrCity = [];
let arrWithFavoritesCity = [];
let historyCity = document.querySelector('.history_city');
let favoritesCity = document.querySelector('.favorites_city');


// обработчик радиобаттонов
for (let i=0; i < request.length; i++){
  request[i].addEventListener('change',function () {
    alert(i);
  })
}
newEventBus.on('showMap',(cb) => {
  newEventBus.trigger('addWeather', cb[0], cb[1])
});

newEventBus.on('getWeather', (param)=>{
  newEventBus.trigger('showWeatherCity', param);
})

// Обработкик кнопки поиска (при нажатии ввода или кнопки)
searchButton.addEventListener('click',(elem)=>{
    elem.preventDefault(); // отмена стандартного действия
    let city = testEnterValue(searchEnter.value); // проверка на введенное значение
    city = city.charAt(0).toUpperCase() + city.substr(1).toLowerCase(); // форматирование значения для добавления в масссив

    newEventBus.trigger('addSpace', city); // Отправляем наименование города подписчикам

    newEventBus.on('getSpace', (lat, lng)=>{
      newEventBus.trigger('showCity', lat, lng);
      newEventBus.trigger('addWeather', lat, lng)
    })

    newEventBus.on('getWeather', (param)=>{
      newEventBus.trigger('showWeatherCity', param);
    })

    addArrCity (city, arrCity);
    addArr (arrCity, historyCity, addElemWithCityInHTML);
});

// Обработкик кнопки добавить в избранное
addInFavorites.addEventListener('click',()=>{
  let space;
  newEventBus.on('getCentralYandexMap', (centralArr)=>{
    space = [addRoundNumber( centralArr[0],1000 ), addRoundNumber( centralArr[1],1000) ];
    addArrCity (space, arrWithFavoritesCity);
    addArr (arrWithFavoritesCity, favoritesCity, addElemWithSpaceInHTML);
  });

  newEventBus.trigger('addInFavorites');
});

// Обработкик кнопок удаление
favoritesCity.addEventListener('click',(event)=>{
    let target = event.target;
    if( target.tagName !== 'BUTTON' ) return;
    favoritesCity.removeChild(target.parentNode);
    let t = target.parentNode.querySelector('p a');
    t = t.innerHTML;
    addArrCity (t, arrWithFavoritesCity );
    arrWithFavoritesCity.forEach((el, i)=>{
      if( el + '' === t + '' ){
        return arrWithFavoritesCity.splice(i, 1);
      }
    });
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
  return '<p>' + el + '<p>'
}

function storeFavoritesCity() {
  let r = JSON.stringify( document.querySelector('.favorites_city').innerHTML);
  return Promise.resolve(localStorage.setItem('favoritesCity',r));
}

function getFavoritesCity() {
    return Promise.resolve( JSON.parse(localStorage.getItem('favoritesCity')));
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
      '<p> <a href="#">' + el + '</a></p>' +
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


