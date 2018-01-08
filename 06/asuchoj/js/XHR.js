'use strict';
// Модуль XHR запросов
(function() {

    // ожидаем выбор способа получения запроса

    // ожидаем наименование города для получения его координат
    newEventBus.on('addSpace', (city)=>{
        // Запуск cb для получения координат города
        // отправка значений подписчикам
        newEventBus.trigger('xhrAndFetch?');
        newEventBus.on('xhrAndFetch', (type)=>{

            let coordinatesXHR = addCoordinatesWithGoogleXHR (city);
            let coordinatesFetch = addCoordinatesWithGoogleFetch (city);
            addValueWithXhrOrFleth(type, coordinatesXHR, coordinatesFetch);
            newEventBus.off('xhrAndFetch');
        });

    });

    // ожидание координат для получения погоды
    newEventBus.on('addWeather', (lat, lng)=>{
        // Запуск cb для получения погоды по координатам
        // отправка значений подписчикам
        newEventBus.trigger('xhrAndFetch?');
        newEventBus.on('xhrAndFetch', (type)=>{
            newEventBus.off('xhrAndFetch?');
            let weatherXHR = addWeatherWithDarkSkyXHR (lat, lng);
            let weatherFetch = addWeatherWithDarkSkyFetch (lat, lng);
            addValueWithXhrOrFleth(type, weatherXHR, weatherFetch);
            newEventBus.off('xhrAndFetch?');
        });

    });

    function addCoordinatesWithGoogleXHR (city) {
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

    function addCoordinatesWithGoogleFetch(city){
        let url = `http://maps.googleapis.com/maps/api/geocode/json?address=${city}&sensor=false&language=ru`;
        fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (user) {
                let lat = user.results[0].geometry.location.lat;
                let lng = user.results[0].geometry.location.lng;
                newEventBus.trigger('getSpace', lat, lng);
                newEventBus.off('getSpace');
            })
            .then(alert)
    }

    function addWeatherWithDarkSkyXHR (lat, lng) {
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

    function addWeatherWithDarkSkyFetch (lat, lng){
        let Key = '5cd56ba90549b6696d1add4135f559f9';
        let url = `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/${Key}/${lat},${lng}?lang=ru&units=si`;
        fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (user) {
                let weatherObj = JSON.parse(user.body);
                newEventBus.trigger('getWeather', weatherObj.currently);
                newEventBus.off('getWeather');
                console.log('отправить Fetch погоду');
            })
            .catch(alert)
    }


    function addValueWithXhrOrFleth(type, cbXHR, cbFetch) {
        if(type === 'XHR'){
            console.log(' данные с XHR ');
            return cbXHR;
        }
        if(type === 'Fetch'){
            console.log(' данные с Fetch ');
            return cbFetch;
        }
        alert('Ошибка')
    }

})();

