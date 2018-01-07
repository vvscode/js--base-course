'use strict';
// Модуль XHR запросов
(function() {

<<<<<<< HEAD
    // ожидаем наименование города
    newEventBus.on('addSpace', (city)=>{
        addCoordinatesWithGoogle (city);
    });

    // ожидаем координаты местности
    newEventBus.on('addWeather', (lat, lng)=>{
        addWeatherWithDarkSky (lat, lng);
    });

    // ожидание координат для запроса имя местности
    newEventBus.on('addNameCity', (param)=>{
        fff (param);
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
                /*        let nameCity = r.results[0]['formatted_address'];*/
                newEventBus.trigger('getSpace', lat, lng);
                newEventBus.trigger('getSpace', lat, lng);
                /*        newEventBus.trigger('getNameCity', nameCity);*/
            }
        }
=======
  // ожидаем наименование города
  newEventBus.on('addSpace', (city)=>{
      addCoordinatesWithGoogle (city)
  });

  // ожидаем координаты местности
  newEventBus.on('addWeather', (lat, lng)=>{
      addWeatherWithDarkSky (lat, lng);
  });

  // ожидание координат для запроса имя местности
  newEventBus.on('addNameCity', (param)=>{
      fff (param);
      addWeatherWithDarkSky (lat, lng)
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
      }
>>>>>>> d7b850ce8dad20d4edbeaf37e937fbeeb54452b7
    }

    function fff (latLng) {
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
                newEventBus.trigger('getNameCity', nameCity);
            }
        }
    }
<<<<<<< HEAD

    function addWeatherWithDarkSky (lat, lng) {
        let Key = '26776a12e7570e6d0e483b205f4318af';
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
            }
        }
    }








=======
  }


  function addWeatherWithDarkSky (lat, lng) {
    let url = `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/9cf393a369007d40d97c0e977f9b38c5/${lat},${lng}?lang=ru&units=si`;
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
      }
    }
  }
>>>>>>> d7b850ce8dad20d4edbeaf37e937fbeeb54452b7
})();



/*





function Model() {
  let that = this;


/!*  this.addCoordinatesWithGoogleFetch = function (city) {
    fetch('http://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&sensor=false&language=ru')
      .then(function (response) {
        return response.json();
      })
      .catch(()=>{
        alert('1')
      })
  };*!/


}

newEventBus.on('addSpace', (lat, lng)=>{
    newElementView.setCenterMap(newElementView.yaMap ,lat, lng);
});*/
