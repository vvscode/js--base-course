'use strict';
// Модуль XHR запросов
(function() {
    let Key = '0ab145c90c84d13965489477a486e847';
    let xhr = new XMLHttpRequest();
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
        xhr.open('GET', `https://api.userinfo.io/userinfos` ,true);
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
        let url = `https://api.userinfo.io/userinfos`;
        fetch(url)
            .then(function (response) {
                return response.json()
            })
        .then(function (user) {
            let value = JSON.parse(xhr.responseText);
            let lat = value.position.latitude;
            let lng = value.position.longitude;
            newEventBus.trigger('Координаты_Местоположения', lat, lng);
        })
        .catch(console.log)
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
            .catch(console.log)
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
                let weatherObj = JSON.parse(xhr.responseText);
                newEventBus.trigger('Погода_получена', weatherObj.currently);
            })
            .catch(console.log)
    }

    function addValueWithXhrOrFeth(type, cbXHR, cbFetch) {
        if( type === 'XHR'){
            return cbXHR;
        } else if (type === 'Fetch') {
            return cbFetch;
        }
    }

    function addUrlInDarkSky (lat, lng){
        return  `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${Key}/${lat},${lng}?lang=ru&units=si`;
    }
    function addUrlInGoogle (city){
        return `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&sensor=false&language=ru`;
    }
})();

