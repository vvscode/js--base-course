'use strict';
// Модуль XHR запросов
(function() {
    const KEYDARCSKY = '0ab145c90c84d13965489477a486e847';
    const urlPersonLocation = `https://api.userinfo.io/userinfos`;
    let xhr = new XMLHttpRequest();

    function addUrlInDarkSky (lat, lng){
        return  `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${KEYDARCSKY}/${lat},${lng}?lang=ru&units=si`;
    }

    function addUrlInGoogle (city){
        return `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&sensor=false&language=ru`;
    }

    function getCoordinates (user) {
      let lat = user.results[0].geometry.location.lat;
      let lng = user.results[0].geometry.location.lng;
      newEventBus.trigger('getCoordinatesWithGoogle', lat, lng);
    }

    function getCoordinatesNow (user) {
        let lat = user.position.latitude;
        let lng = user.position.longitude;
        newEventBus.trigger('getCoordinatesWithGoogle', lat, lng);
    }
    function getWeather (user) {
        newEventBus.trigger('GiveWeather', user.currently);
    }

    // ожидаем наименование города для получения его координат и способ получения
    newEventBus.on('getCoordinatesCity', (type, city)=>{
        (type === 'XHR' ? addCoordinatesWithGoogleXHR (city) : addCoordinatesWithGoogleFetch(city))
            .then((user) => getCoordinates (user))
            .catch((error)=>{
                console.log(error);
            })
    });

    newEventBus.on('currentUserLocation', (type)=>{
        (type === 'XHR' ? getPersonLocationXML () : getPersonLocationFetch ())
            .then((user) => getCoordinatesNow (user))
            .catch((error)=>{
                console.log(error);
            })
    });

    // ожидание координат для получения погоды
    newEventBus.on('getWeatherForCity', (type, lat, lng)=>{
        (type === 'XHR' ? addWeatherWithDarkSkyXHR (lat, lng) : addWeatherWithDarkSkyFetch (lat, lng))
            .then((user) => getWeather (user))
            .catch((error)=>{
                console.log(error);
            })
    });

    function addCoordinatesWithGoogleXHR (city) {
          let value =  new Promise(function (resolve, reject) {
          xhr.open('GET', addUrlInGoogle (city) ,true);
          xhr.onload = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
              alert( xhr.status + ': ' + xhr.statusText );
            } else {
               resolve(this.response)
            }
          };
          xhr.onerror = function() {
            reject(new Error("Network Error"));
          };
          xhr.send();
        });
        return value.then((user) => JSON.parse(user))
    }

    function addCoordinatesWithGoogleFetch(city){
        return fetch( addUrlInGoogle (city) )
            .then(function (response) {
                return response.json()
            })
            .catch((error)=>{
                console.log(error);
            })
    }

//получение местоположения при клике на main
    function getPersonLocationXML () {
        let value =  new Promise(function (resolve, reject) {
            xhr.open('GET', urlPersonLocation ,true);
            xhr.onload = function () {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) {
                    alert( xhr.status + ': ' + xhr.statusText );
                } else {
                    resolve(this.response)
                }
            };
            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };
            xhr.send();
        });
        return value.then((user) => JSON.parse(user))
    }

    function getPersonLocationFetch () {
        return fetch(urlPersonLocation)
            .then(function (response) {
                return response.json()
            })
            .catch((error) => {
                console.log(error);
            })
    }
    function addWeatherWithDarkSkyXHR (lat, lng) {
        let value =  new Promise(function (resolve, reject) {
            xhr.open('GET', addUrlInDarkSky (lat, lng) ,true);
            xhr.onload = function () {
                if (xhr.readyState !== 4) return;
                if (xhr.status !== 200) {
                    alert( xhr.status + ': ' + xhr.statusText );
                } else {
                    resolve(this.response)
                }
            };
            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };
            xhr.send();
        });
        return value.then((user) => JSON.parse(user));
    }

    function addWeatherWithDarkSkyFetch (lat, lng){
       return fetch( addUrlInDarkSky (lat, lng) )
            .then(function (response) {
                return response.json()
            })
            .catch((error)=>{
                console.log(error);
            })
    }

})();

