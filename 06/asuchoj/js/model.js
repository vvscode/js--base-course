'use strict'
function Model() {
  let that = this;
  this.addCoordinatesWithGoogle = function (city) {
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
  }
  this.addCoordinatesWithGoogleFetch = function (city) {
    fetch('http://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&sensor=false&language=ru')
      .then(function (response) {
        return response.json();
      })
      .catch(()=>{
        alert('1')
      })
  }
  this.addWeatherWithDarkSky = function (lat, lng) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/9cf393a369007d40d97c0e977f9b38c5/${lat},${lng}?lang=ru&units=si`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status !== 200) {
        alert(xhr.status + ': ' + xhr.statusText);
      } else {
        let weather1 = JSON.parse(xhr.responseText);
        let weather2 = JSON.parse(weather1.body);
        that.weatherFromDarkSky = weather2.currently;
      }
    }
  }
}
