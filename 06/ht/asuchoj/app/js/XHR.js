'use strict';
// Модуль XHR запросов
(function() {

    const KEYDARCSKY = '0ab145c90c84d13965489477a486e847';
    const urlPersonLocation = `https://api.userinfo.io/userinfos`;
     let xhr = new XMLHttpRequest();

   /* function addValueWithXhrOrFeth(type, cbXHR, cbFetch) {
        if( type === 'XHR'){
            return cbXHR;
        } else if (type === 'Fetch') {
            return cbFetch;
        }
    }*/

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

    // ожидаем наименование города для получения его координат и способ получения
    newEventBus.on('getCoordinatesCity', (type, city)=>{
        console.log(type);
        type === 'XHR' ? addCoordinatesWithGoogleXHR (city) : addCoordinatesWithGoogleFetch(city)
              .then((user) => getCoordinates (user))

    });

    function addCoordinatesWithGoogleXHR (city) {
        let value =  new Promise(function (resolve, reject) {
          let xhr = new XMLHttpRequest();
          xhr.open('GET', addUrlInGoogle (city) ,true);
          xhr.onload = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
              alert( xhr.status + ': ' + xhr.statusText );
            } else {
               resolve(this.response)
            }
          }
          xhr.onerror = function() {
            reject(new Error("Network Error"));
          };
          xhr.send();
        })

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

   /* // ожидание координат для получения погоды
    newEventBus.on('getWeatherForCity', (type, lat, lng)=>{
        addValueWithXhrOrFeth( type, addWeatherWithDarkSkyXHR, addWeatherWithDarkSkyFetch )(lat, lng);
    });
*/
   /* //получение местоположения при клике на main
    newEventBus.on('currentUserLocation', (type)=>{
        addValueWithXhrOrFeth(type, getPersonLocationXML, getPersonLocationFetch)();
    });*/

    /*function getPersonLocationXML () {
        xhr.open('GET', urlPersonLocation ,true);
        xhr.send();
        return xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                alert( xhr.status + ': ' + xhr.statusText );
            }else{
                return Promise.resolve(JSON.parse(xhr.responseText))
            }
        }
    }*/

    /*function getPersonLocationFetch () {
        return fetch(urlPersonLocation)
            .then(function (response) {
                return response.json()
            })
            .catch((error)=>{
                console.log(error);
            })
    }*/


  /*  function addWeatherWithDarkSkyXHR (lat, lng) {
        xhr.open('GET', addUrlInDarkSky (lat, lng) , true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                let weatherObj = JSON.parse(xhr.responseText);
                newEventBus.trigger('GiveWeather', weatherObj.currently);
            }
        }
    }

    function addWeatherWithDarkSkyFetch (lat, lng){
        fetch( addUrlInDarkSky (lat, lng) )
            .then(function (response) {
                return response.json()
            })
            .then(function (user) {
                newEventBus.trigger('GiveWeather', user.currently);
            })
            .catch((error)=>{
                console.log(error);
            })
    }*/
})();

