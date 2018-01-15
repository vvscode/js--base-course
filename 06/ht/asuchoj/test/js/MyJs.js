'use strict';
function EventBus() {
  this.listeners = {};
}
EventBus.prototype.on = function(eventName, cb) {
  this.listeners[eventName] = Array.isArray(this.listeners[eventName]) ? this.listeners[eventName] : [];
  this.listeners[eventName].push(cb);
};
EventBus.prototype.off = function(eventName, cb) {
  if (!eventName && cb) {
    for (let key in this.listeners) {
      if(this.listeners.hasOwnProperty(key)){
        this.listeners[key].forEach((el) => {
          let newArr = [];
          if (el !== cb) {
            newArr.push(el)
          }
          return this.listeners[key] = newArr;
        })
      }
    }
  }

  if (eventName && !cb) {
    for (let key in this.listeners) {
      if(this.listeners.hasOwnProperty(key)){
        if (this.listeners[key] === this.listeners[eventName]) {
          this.listeners[eventName] = undefined;
        }
      }
    }
  }

  if (eventName && cb) {
    let newArr = [];
    if (cb === undefined) return;
    this.listeners[eventName].forEach((el) => {
      if (el !== cb) {
        newArr.push(el)
      }
    });
    return this.listeners[eventName] = newArr;
  }

  if (!eventName && !cb) {
    return this.listeners = {};
  }
};

EventBus.prototype.trigger = function(eventName, ...data) {
  (this.listeners[eventName] || []).forEach(cb => cb.apply(this, data))
};
EventBus.prototype.once = function(eventName, cb) {
  let self = this;

  function addOnceCallback() {
    cb.apply(this, arguments);
    self.off(eventName, addOnceCallback);
  }
  this.on(eventName, addOnceCallback);
};

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

    if( !elem.getAttribute('checked') ){
        xhrOrFetchValue = elem.value;
    }

    elem.addEventListener('change',()=> {
        xhrOrFetchValue = elem.value;
    })
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
      newEventBus.on('прогрузилась_карта', ()=> newEventBus.trigger('показать_центер_карты', latCity, lngCity));
      newEventBus.trigger('показать_центер_карты', latCity, lngCity);
      newEventBus.trigger('Запросить_погоду_для_города', xhrOrFetchValue, latCity, lngCity);
    } else {
        newEventBus.trigger('Дать_данные', xhrOrFetchValue, cityName);
    }
});

newEventBus.on('main',() => newEventBus.trigger('Местоположение', xhrOrFetchValue));

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
    newEventBus.on('прогрузилась_карта', () => {
      newEventBus.trigger('показать_центер_карты', latCity, lngCity);
    });
  }

} else if (location.hash === '#main') {
  newEventBus.trigger('Местоположение', xhrOrFetchValue);
}

newEventBus.on('Погода_получена', (param)=> newEventBus.trigger('Отрисовать_погоду', param));

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
addInFavorites.addEventListener('click',()=> newEventBus.trigger('addInFavorites')) //добавь центр карты

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

'use strict';
// Модуль XHR запросов
(function() {

    const KEYDARCSKY = '0ab145c90c84d13965489477a486e847';
    const urlPersonLocation = `https://api.userinfo.io/userinfos`;
    let xhr = new XMLHttpRequest();

    function addValueWithXhrOrFeth(type, cbXHR, cbFetch) {
        if( type === 'XHR'){
            return cbXHR;
        } else if (type === 'Fetch') {
            return cbFetch;
        }
    }

    function addUrlInDarkSky (lat, lng){
        return  `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${KEYDARCSKY}/${lat},${lng}?lang=ru&units=si`;
    }

    function addUrlInGoogle (city){
        return `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&sensor=false&language=ru`;
    }

    // ожидаем наименование города для получения его координат и способ получения
    newEventBus.on('Дать_данные', (type, city)=>{
        addValueWithXhrOrFeth(type, addCoordinatesWithGoogleXHR, addCoordinatesWithGoogleFetch)(city);
    });

    // ожидание координат для получения погоды
    newEventBus.on('Запросить_погоду_для_города', (type, lat, lng)=>{
        addValueWithXhrOrFeth( type, addWeatherWithDarkSkyXHR, addWeatherWithDarkSkyFetch )(lat, lng);
    });

    //получение местоположения при клике на main
    newEventBus.on('Местоположение', (type)=>{
        addValueWithXhrOrFeth(type, getPersonLocationXML, getPersonLocationFetch)();
    });

    function getPersonLocationXML () {
        xhr.open('GET', urlPersonLocation ,true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                alert( xhr.status + ': ' + xhr.statusText );
            }else{
                let value = JSON.parse(xhr.responseText);
                let lat = value.position.latitude;
                let lng = value.position.longitude;
                newEventBus.trigger('Координаты_Местоположения', lat, lng);
            }
        }
    }

    function getPersonLocationFetch () {
        fetch(urlPersonLocation)
            .then(function (response) {
                return response.json()
            })
            .then( function (user) {
                let lat = user.position.latitude;
                let lng = user.position.longitude;
                newEventBus.trigger('Координаты_Местоположения', lat, lng);
            })
            .catch(alert)
    }

    function addCoordinatesWithGoogleXHR (city) {
        xhr.open('GET', addUrlInGoogle (city) ,true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                alert( xhr.status + ': ' + xhr.statusText );
            }else{
                let value = JSON.parse(xhr.responseText);
                let lat = value.results[0].geometry.location.lat;
                let lng = value.results[0].geometry.location.lng;
                newEventBus.trigger('Дать_координаты_с_гугла', lat, lng);
            }
        }
    }

    function addCoordinatesWithGoogleFetch(city){
        fetch( addUrlInGoogle (city) )
            .then(function (response) {
                return response.json()
            })
            .then(function (user) {
                let lat = user.results[0].geometry.location.lat;
                let lng = user.results[0].geometry.location.lng;
                newEventBus.trigger('Дать_координаты_с_гугла', lat, lng);
            })
            .catch(alert)
    }

    function addWeatherWithDarkSkyXHR (lat, lng) {
        xhr.open('GET', addUrlInDarkSky (lat, lng) , true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                let weatherObj = JSON.parse(xhr.responseText);
                newEventBus.trigger('Погода_получена', weatherObj.currently);
            }
        }
    }

    function addWeatherWithDarkSkyFetch (lat, lng){
        fetch( addUrlInDarkSky (lat, lng) )
            .then(function (response) {
                return response.json()
            })
            .then(function (user) {
                newEventBus.trigger('Погода_получена', user.currently);
            })
            .catch(alert)
    }
})();


(function() {
    'use strict';
    let yaMap;
    ymaps.ready(init);

    newEventBus.on('Отрисовать_погоду', (el)=>{
        showWeather (el)
    });

    function init () {
        yaMap = new ymaps.Map('map', {
            center: [53.905,27.562],
            zoom: 11,
            controls: ['zoomControl', 'typeSelector']
        });

        newEventBus.on('показать_центер_карты', (lat, lng)=>{
            setCenterMaps(lat,lng);
        });

        newEventBus.on('addInFavorites', ()=>{
            newEventBus.trigger('getCentralYandexMap', yaMap.getCenter());
        });

        newEventBus.trigger('прогрузилась_карта');

        yaMap.events.add('actionend', ()=>{
            yaMap.getCenter();
            location.hash = '#city/' + yaMap.getCenter();
        });

        yaMap.events.add('dblclick', function (e) {
            newEventBus.trigger('getCentralYandexMap', e.get('coords') );
        });
    }

    function showWeather (el) {
        let temperature = '<p> Температура: ' + roundValue ( Math.round(( el.apparentTemperature)) ) + ' &#8451 </p>';
        let pressure = '<p> Давление: ' + roundValue ( el.pressure ) + ' гПа </p>';
        let humidity = '<p> Влажность: ' + roundValue ( el.humidity * 100 ) + ' % </p>';
        let windSpeed = '<p> Скорость ветра: ' + roundValue ( el.windSpeed) + ' м/с </p>';
        let precipProbability = '<p> Вероятность осадков: ' + el.precipProbability + '</p>';
        let cloudCover = '<p> Облачность: ' + el.cloudCover + '</p>';
        let summary = '<p> Сводка: ' + el.summary + '</p>';
        let i = document.querySelector('.weather');
        i.innerHTML = summary + temperature + pressure + humidity + windSpeed + precipProbability + cloudCover;
    }

    function setCenterMaps(lat,lng) {
        yaMap.setCenter([lat, lng]);
    }

    function roundValue (el) {
        return Math.round(el)
    }

})();

let Router = function (options) {
    this.routes = options.routes || [];
    this.eventBus = options.eventBus;
    this.init();
};

Router.prototype = {
    init: function () {
        // 1. Подписать this.handleUrl на изменения url
        window.addEventListener('hashchange', () => this.handleUrl(window.location.hash));
        // 2. Выполнить this.handleUrl
        this.handleUrl(window.location.hash);
    },
    findPreviousActiveRoute: function () {
        // Найти роут с которого уходим
        return this.currentRoute;
    },
    findNewActiveRoute: function (url) {
        // Найти роут на который переходим
        return this.routes.find((routeItem) => {
            if (typeof routeItem.match === 'string') {
                return url === routeItem.match;
            } else if (typeof routeItem.match === 'function') {
                return routeItem.match(url);
            } else if (routeItem.match instanceof RegExp) {
                return url.match(routeItem.match);
            }
        });

    },
    getRouteParams(route, url) {
        let params = url.match(route.match) || [];
        params.shift();
        return params;
    },
    handleUrl: function (url) {
        url = url.slice(1);
        // Найти текущий роут
        let previousRoute = this.findPreviousActiveRoute();
        // Найти новый роут
        let newRoute = this.findNewActiveRoute(url);

        let routeParams = this.getRouteParams(newRoute, url);

        // Если есть роут с которого уходим - выполнить его .onLeave
        Promise.resolve()
            .then(() => previousRoute && previousRoute.onLeave && previousRoute.onLeave(...this.currentRouteParams))
            // После этого выполнить .onBeforeEnter для нового активного роута
            .then(() => newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(...routeParams))
            // После этого выполнить .onEnter для ногового активного роута ( только если с .onBeforeEnter все ок)
            .then(() => newRoute && newRoute.onEnter && newRoute.onEnter(...routeParams))
            .then(() => {
                this.currentRoute = newRoute;
                this.currentRouteParams = routeParams;
            });
    },
};

let router = new Router({
    routes: [{
        name: 'index',
        match: ''
    },{
        name: 'city',
        match: /city(.+)/,
        onEnter: () => {
            newEventBus.trigger('init');
            addClassInShowPage();
        },
    },{
        name: 'string',
        match: (text) => text ,
        onBeforeEnter: () => delClassInPages (),
        onEnter: () => {
            addClassInShowPage();
            if(location.hash === '#main'){
              newEventBus.trigger('main');
            }
        },
        onLeave: () => delClassInPages ()
    }]
});

function addClassInShowPage() {
    let thisPageHash = location.hash.split('#').join('');
    let thisPage;
    if(thisPageHash === 'about' || thisPageHash === 'author' || thisPageHash === 'main'){
        thisPage = document.querySelector( '.' + location.hash.split('#')[1]);
    } else {
        thisPage = document.querySelector('.main');
    }
    thisPage.classList.add('page_show');
}

function delClassInPages () {
    let allPages = document.querySelectorAll('.page');
    [].forEach.call(allPages, (elem)=>{
        elem.classList.remove('page_show')
    });
}
