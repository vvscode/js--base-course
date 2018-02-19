
// отрисовка карты с начальными параметрами
ymaps.ready(init);
var myMap,
  timeout,
  coords = window.location.hash.split('@').slice(1).join('').split(',');
function init() {
  myMap = new ymaps.Map(
    'map', {
      center: coords,
      zoom: 10,
      controls: [],
    },
    { suppressMapOpenBlock: true },
  );

  myMap.events.add('click',getCoordsByClick);

  myMap.events.add('actiontickcomplete', function (ev) {
    clearTimeout(timeout);
    timeout = setTimeout(getForecastByTick, 400, ev);
  });
}


// отображение погоды при загрузке страницы
window.onload = function () {
  var lat = coords[0];
  var lng = coords[1];
  getForecastByLatLng(lat, lng);
  saveStateOnUpdate();
};

// определение местоположения и отображение текущей погоды

function start() {
  navigator.geolocation.getCurrentPosition(function (position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getCitiByCoords(latitude, longitude)
      .then(function (place) {
        addCoordsToHash(latitude, longitude, place);
      });

    myMap.panTo([latitude, longitude], {
      flying: true,
    });
    getForecastByLatLng(latitude, longitude);
  });
}
start();










