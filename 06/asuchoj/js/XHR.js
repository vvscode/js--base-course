'use strict';
// Модуль XHR запросов
(function() {
    // ожидаем наименование города для получения его координат
    newEventBus.on('addSpace', (city)=>{
        // Запуск cb для получения координат города
        // отправка значений подписчикам
        addCoordinatesWithGoogle (city);
    });

    // ожидание координат для получения погоды
    newEventBus.on('addWeather', (lat, lng)=>{
        // Запуск cb для получения погоды по координатам
        // отправка значений подписчикам
        addWeatherWithDarkSky (lat, lng);
    });

    function addCoordinatesWithGoogle (city) {
        let url = `http://maps.googleapis.com/maps/api/geocode/json?address=${city}&sensor=false&language=ru`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET',url,true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                alert( xhr.status + ': ' + xhr.statusText );
            }else{
                let r = JSON.parse(xhr.responseText);
                let lat = r.results[0].geometry.location.lat;
                let lng = r.results[0].geometry.location.lng;
                newEventBus.trigger('getSpace', lat, lng);
                newEventBus.off('getSpace');
                console.log('координаты google отправлены');
            }
        }
    }

    function addWeatherWithDarkSky (lat, lng) {
        let Key = '5cd56ba90549b6696d1add4135f559f9';
        let url = `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${Key}/${lat},${lng}?lang=ru&units=si`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                let weather1 = JSON.parse(xhr.responseText);
                let weatherObj = JSON.parse(weather1.body);
                newEventBus.trigger('getWeather', weatherObj.currently);
                newEventBus.off('getWeather');
                console.log('отправить  погоду');
            }
        }
    }
})();

