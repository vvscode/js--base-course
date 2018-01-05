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

newEventBus.on('showMap', (cb)=>{ cb() });

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

    newEventBus.on('getWeather', (lat, lng)=>{
      newEventBus.trigger('showWeatherCity', lat, lng);
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


// создает елемент c координатами любимым городом
// вернет массив елементов для вставки

/*function addElemWithSpaceInHTML(el) {
  let btn = createMyNewElement ('button', 'btn_delete');
  let par = createMyNewElement ('par', 'btn_delete');
  return [ par, btn]
}*/



/*//функция для создания елементов
function createMyNewElement (el, className, idName) {
  let element = document.createElement(el);
  if(className){
    element.className = className
  }
  if(className){
    element.id = idName
  }
  return element
}*/

/*//вставка обьектов на страницу
function addElemInDOM (parentElement, arrChild) {
  let fragment = document.createDocumentFragment();
  arrChild.forEach(function (el) {
    fragment.appendChild(el);
  })
  parentElement.appendChild(fragment);
}*/

//Функция вставки елементов на страницу
function addArr (arr, parentElem, insertionHTMLel ) {
  parentElem.innerHTML = '';
  arr.forEach(function (el) {
    parentElem.innerHTML = parentElem.innerHTML + insertionHTMLel(el)  ;
  })
}



// Функция перемещает центр карты в нужный город и выводит погоду
/*function addWetherAndCoord (el) {
/!*  location.href = '#city/' + el;
  f(el);*!/
  newElementModel.addCoordinatesWithGoogle(el);

  setTimeout(function () {
/!*    newElementView.setCenterMap(newElementView.yaMap ,newElementModel.locationCity.lat, newElementModel.locationCity.lng);*!/
    newElementModel.addWeatherWithDarkSky(newElementModel.locationCity.lat, newElementModel.locationCity.lng );
  }, 1500);

  setTimeout(function () {
    newElementView.showWeather(newElementModel.weatherFromDarkSky)
  }, 3000);
}*/


/*function f(el) {
    let newEl = document.createElement('newElementModel');
    newEl.href = '#city/' + el;
    return newEl
}

function g() {
    var a = location.hash.split('/');
}*/


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



/*
* var btn = document.querySelector('button');

function storeData(data) {
  return Promise.resolve(localStorage.setItem('data', JSON.stringify(data)));
}

function getData() {
  return Promise.resolve(JSON.parse(localStorage.getItem('data')));
}

function getMessage() {
  return Promise.resolve(prompt());
}



btn.addEventListener('click', function() {
  getMessage()
    .then(function(msg) {
       return storeData(msg);
    })
    .then(function() {
      return getData();
    })
    .then(function(data) {
        alert(data);
    });
});*/







