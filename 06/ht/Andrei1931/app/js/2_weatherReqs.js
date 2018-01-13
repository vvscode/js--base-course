
// получение погоды по координатам
var getForecastByLatLng = function (lat, lng) {
  var url = `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/d113af5f82393ef553f48314ae9f42e8/${lat},${lng}?lang=en&units=si`;
  return fetch(url)
    .then(function (res) {
      if (res.status !== 200) {
        document.querySelector('#weather').innerHTML = `Server status code: <br/>${res.status}`;
      } else {
        return res.json();
      }
    })
    .then(function (data) {
      var forecast = JSON.parse(data.body);
      var temperature = (forecast.currently.apparentTemperature - 32) / 1.8000;
      var roundTemperature = Math.round(parseFloat(temperature) * 10) / 10;
      var icons = forecast.currently.summary;
      document.querySelector('#weather').innerHTML = `${roundTemperature}C&#176, ${icons}`;
    });
};
// получение погоды по введенному адресу
var resolveForecast = function (data) {
  getForecastByLatLng(data.lat, data.lng);
};

var getForecastByAddress = function (ev) {
  if (ev.which === 13) {
    ev.preventDefault();
    if (activeXhr()) {
      getLatLngByXhr()
        .then(resolveForecast);
    } else {
      getLatLngByFetch()
        .then(resolveForecast);
    }
  }
};

  // получение координат при перетаскивании карты и вывод погоды
function getForecastByTick(ev) {
  var tick = ev.get('tick');
  var coords = (myMap.options.get('projection').fromGlobalPixels(tick.globalPixelCenter, tick.zoom));

  getCitiByCoords(coords[0], coords[1])
    .then(function (place) {
      addCoordsToHash(coords[0], coords[1], place);
    });

  getForecastByLatLng(coords[0], coords[1]);
}


document.querySelector('#find').addEventListener('keypress', getForecastByAddress);



