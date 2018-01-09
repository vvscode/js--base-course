'use strict';
// Модуль XHR запросов
(function() {

    // ожидаем выбор способа получения запроса
    // ожидаем наименование города для получения его координат

    newEventBus.on('Дать_данные', (type, city)=>{
        // Запуск cb для получения координат города
        // отправка значений подписчикам
        addValueWithXhrOrFeth(type, addCoordinatesWithGoogleXHR, addCoordinatesWithGoogleFetch)(city);
    });

    // ожидание координат для получения погоды
    newEventBus.on('Запросить_погоду_для_города', (type, lat, lng)=>{
        // Запуск cb для получения погоды по координатам
        // отправка значений подписчикам
        addValueWithXhrOrFeth( type, addWeatherWithDarkSkyXHR, addWeatherWithDarkSkyFetch )(lat, lng);
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
                newEventBus.trigger('Дать_координаты_с_гугла', lat, lng);
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
                return newEventBus.trigger('Дать_координаты_с_гугла', lat, lng);
            })
            .catch(alert)
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
                newEventBus.trigger('Погода_получена', weatherObj.currently);
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
                return newEventBus.trigger('Погода_получена', weatherObj.currently);
            })
            .catch(alert)
    }

    function addValueWithXhrOrFeth(type, cbXHR, cbFetch) {
        if( type === 'XHR'){
            return cbXHR;
        } else if (type === 'Fetch') {
            return cbFetch;
        } else {
            alert('Секретная ошибка которую я не нашел')
        }
    }
})();

