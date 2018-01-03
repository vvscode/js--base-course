'use strict';
let searchButton = document.querySelector('#search_button');
let searchEnter = document.querySelector('#search_enter');
let request = document.getElementsByName('request_type');

let newElementModel = new Model();
let newElementView = new View();


// обработчик радиобаттонов
for (let i=0; i < request.length; i++){
  request[i].addEventListener('change',function () {
    alert(i);
  })
}

/*function saveSex() {
  for (let i = 0; i < request.length; i++) {
    if (request[i].checked) {
      return request[i].value;
    }
  }
}*/



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

searchButton.addEventListener('click',(elem)=>{
    elem.preventDefault();

    let city = searchEnter.value;
    if(!city){
        city = prompt('Введите наименование города', 'Минск')
    }
    ttt (city);
    addCityInHistory (city);
});



function addCityInHistory (cityName) {
    let boxWithP = document.querySelectorAll('.history_city p');
    let historyBox = document.querySelector('.history_city');
    let city = cityName.toLowerCase();



  if(boxWithP){
        [].forEach.call(boxWithP,function (el) {
            console.log(boxWithP);
            if( el.innerHTML.toLowerCase() === '' + city ){
                historyBox.removeChild(el);
            }

        });
    }

    if(boxWithP.length >= 5){
        historyBox.removeChild(historyBox.lastElementChild)
    }

    city = city.charAt(0).toUpperCase() + city.substr(1);
    historyBox.innerHTML = '<p>' + city + '</p>' + '\n' + historyBox.innerHTML;
}


function ttt (el) {
  location.href = '#city/' + el;
  f(el);
  newElementModel.addCoordinatesWithGoogle(el);

  setTimeout(function () {
    newElementView.setCenterMap(newElementView.yaMap ,newElementModel.locationCity.lat, newElementModel.locationCity.lng);
    newElementModel.addWeatherWithDarkSky(newElementModel.locationCity.lat, newElementModel.locationCity.lng );
  }, 1500);

  setTimeout(function () {
    newElementView.showWeather(newElementModel.weatherFromDarkSky)
  }, 3000);
}

function f(el) {
    let newEl = document.createElement('newElementModel');
    newEl.href = '#city/' + el;
    return newEl
}

function g() {
    var a = location.hash.split('/');

}

function Controller() {
    
}
/*

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
            this.listeners[key].forEach((el) => {
                let newArr = [];
                if (el !== cb) {
                    newArr.push(el)
                }
                return this.listeners[key] = newArr;
            })
        }
    }
    if (eventName && !cb) {
        for (let key in this.listeners) {
            if (this.listeners[key] === this.listeners[eventName]) {
                this.listeners[eventName] = undefined;
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
*/


/*n.on('coor', (a,b,c,d)=>{
  newElementView.k(()=>{
    newElementModel.addWeatherWithDarkSky(newElementView.yaMap.getCenter()[0],newElementView.yaMap.getCenter()[1])
    newElementView.showWeather(newElementModel.weatherFromDarkSky)
  })
})

n.trigger('coor', [])*/



