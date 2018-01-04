'use strict';
let searchButton = document.querySelector('#search_button');
let searchEnter = document.querySelector('#search_enter');
let request = document.getElementsByName('request_type');
let addInFavorites = document.querySelector('#add_in_favorites')
let newElementModel = new Model();
let newElementView = new View();
let arrCity = [];
let arrWithFavoritesCity = [];
let historyCity = document.querySelector('.history_city')
let favoritesCity = document.querySelector('.favorites_city')

// обработчик радиобаттонов
for (let i=0; i < request.length; i++){
  request[i].addEventListener('change',function () {
    alert(i);
  })
}

ymaps.ready(newElementView.init);

if(location.hash === ''){
  setTimeout(function () {
    newElementModel.addWeatherWithDarkSky(newElementView.addStateCenterMap()[0], newElementView.addStateCenterMap()[1] );
  }, 1500);

  setTimeout(function () {
    newElementView.showWeather(newElementModel.weatherFromDarkSky)
  }, 3000);
} else {
  if(location.hash.split('/')[1]){

  }
}


setTimeout(function () {
  newElementView.k(()=>{
    newElementModel.addWeatherWithDarkSky(newElementView.yaMap.getCenter()[0],newElementView.yaMap.getCenter()[1])
    newElementView.showWeather(newElementModel.weatherFromDarkSky)
  })
}, 1000)

// Обработкик кнопки поиска (при нажатии ввода или кнопки)
searchButton.addEventListener('click',(elem)=>{
    elem.preventDefault();
    let city = testEnterValue(searchEnter.value)
    city = city.charAt(0).toUpperCase() + city.substr(1).toLowerCase()
    addWetherAndCoord (city);
    addArrCity(city, arrCity);
    addArr (arrCity, historyCity, addElemWithCityInHTML);
});

// Обработкик кнопки добавить в избранное
addInFavorites.addEventListener('click',()=>{
  let space = [addRoundNumber( newElementView.yaMap.getCenter()[0], 1000 ), addRoundNumber( newElementView.yaMap.getCenter()[0], 1000) ];
  addArrCity (space, arrWithFavoritesCity );
  addArr (arrWithFavoritesCity, favoritesCity, addElemWithSpaceInHTML);
  addArrCity (space, arrWithFavoritesCity);
/*

  addElemInDOM (parentElement, arrChild)*/
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
  })
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


// создает елемент c координатами любимым городом
// вернет массив елементов для вставки

/*function addElemWithSpaceInHTML(el) {
  let btn = createMyNewElement ('button', 'btn_delete');
  let par = createMyNewElement ('par', 'btn_delete');
  return [ par, btn]
}*/

function addElemWithSpaceInHTML(el) {
  return '<div> ' +
    '<p> <a href="#" onclick="() => { newElementView.setCenterMap(newElementView.yaMap ,' + el[0] + ',' +  el[1] +  ' )}" >' + el + '</a> </p>' +
    '<button> x </button>' +
    '</div>'
}



//функция для создания елементов
function createMyNewElement (el, className, idName) {
  let element = document.createElement(el);
  if(className){
    element.className = className
  }
  if(className){
    element.id = idName
  }
  return element
}

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

// Функция проверки введённых значений (доработать)
function testEnterValue (value) {
  if(value === ''){
    return prompt('Введите наименование города', 'Минск')
  }
  return value;
}

// Функция перемещает центр карты в нужный город и выводит погоду
function addWetherAndCoord (el) {
/*  location.href = '#city/' + el;
  f(el);*/
  newElementModel.addCoordinatesWithGoogle(el);

  setTimeout(function () {
    newElementView.setCenterMap(newElementView.yaMap ,newElementModel.locationCity.lat, newElementModel.locationCity.lng);
    newElementModel.addWeatherWithDarkSky(newElementModel.locationCity.lat, newElementModel.locationCity.lng );
  }, 1500);

  setTimeout(function () {
    newElementView.showWeather(newElementModel.weatherFromDarkSky)
  }, 3000);
}

/*
function f(el) {
    let newEl = document.createElement('newElementModel');
    newEl.href = '#city/' + el;
    return newEl
}

function g() {
    var a = location.hash.split('/');
}

function Controller() {
    
}*/



