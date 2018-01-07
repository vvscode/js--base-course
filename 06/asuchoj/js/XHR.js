'use strict';
// Модуль XHR запросов
(function() {

    // ожидаем наименование города

    newEventBus.on('addSpace', (city)=>{
        console.log('координаты google');
        addCoordinatesWithGoogle (city);
    });
    newEventBus.on('addWeather', (lat, lng)=>{
        console.log('получить погоду');
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

/*    function fff (latLng) {
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}`;
        let xhr = new XMLHttpRequest();
        xhr.open('GET',url,true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                alert( xhr.status + ': ' + xhr.statusText );
            }else{
                let r = JSON.parse(xhr.responseText);
                let nameCity = r.results['0'].address_components['3'].long_name;
/!*                newEventBus.trigger('getNameCity', nameCity);*!/
            }
        }
    }*/

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

