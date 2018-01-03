/*обработчик для кнопки поиска*/
'use strict';
let searchClick = document.querySelector('#search_click');
let searchEnter = document.querySelector('#search_enter');

var a = new Model();
var b = new Viev();


ymaps.ready(a.init);
setTimeout(function () {
    a.addWeather(a.k[0], a.k[1] );
}, 5000);

setTimeout(function () {
    b.weather(a.ttt)
}, 6000);



searchClick.addEventListener('click',(e)=>{
    e.preventDefault();

    location.href = '#city/' + searchEnter.value;
    f(searchEnter.value);

    a.google(searchEnter.value);

    setTimeout(function () {
        b.setCenter(a.yaMap ,a.locationCity.lat, a.locationCity.lng);
        a.addWeather(a.locationCity.lat, a.locationCity.lng );
    }, 1500);

    setTimeout(function () {
        b.weather(a.ttt)
    }, 3000);
});

function f(el) {
    let l = document.createElement('a');
    l.href = '#city=' + el;
    return l
}

function g() {
    var a = location.hash.split('/');
    google(a);
}


function Model() {
    let that = this;

    this.google = function (city) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET','http://maps.googleapis.com/maps/api/geocode/json?address='
            + city + '&sensor=false&language=ru',true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                alert( xhr.status + ': ' + xhr.statusText );
            }else{
                let r = JSON.parse(xhr.responseText);
                that.locationCity = r.results[0].geometry.location;
            }
        }
    };

    this.addWeather = function (lat, lng) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/959fa59e167330c18990fe8d19771971/${lat},${lng}?lang=ru&units=si`, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                let weather1 = JSON.parse(xhr.responseText);
                let weather2 = JSON.parse(weather1.body);
                that.ttt = weather2.currently;
            }
        }
    };

    this.init = function() {
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").

        let yaMap = new ymaps.Map('map', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: [53.90, 27.56], // Минск
            zoom: 10,
            controls: ['zoomControl', 'typeSelector']
        });

        var showCenter = () => {
            info.innerHTML = (info.innerHTML +'\n' + 'Center: ' + yaMap.getCenter().join(' - ')).trim();
            that.k = yaMap.getCenter();
            console.log(that.k);
        };
        yaMap.events.add('actionend', showCenter);
        showCenter();

        that.yaMap = yaMap;
    };
}

function Viev() {
    this.weather = function (el) {
        let temperature = '<p> Температура: ' + Math.round(( el.temperature - 32 ) / 1.8) + ' &#8451 </p>';
        let pressure = '<p> Давление: ' + el.pressure + '</p>';
        let humidity = '<p> Влажность: ' + el.humidity + '</p>';
        let windSpeed = '<p> Скорость ветра: ' + el.windSpeed + '</p>';
        let precipProbability = '<p> Вероятность осадков: ' + el.precipProbability + '</p>';
        let cloudCover = '<p> Облачность: ' + el.cloudCover + '</p>';
        let i = document.querySelector('.weather');
        i.innerHTML = temperature + pressure + humidity + windSpeed + precipProbability + cloudCover;
    };
    this.setCenter = function (el,lat, lng) {
        el.setCenter([lat, lng]);
    }
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
};*/
