function init () {
  myMap = new ymaps.Map(`map`, {
    center: stage.coords,
    zoom: stage.zoom,
    controls: ['zoomControl']
  });
  myMap.events.add('actionend', function () {
    Promise.resolve().then(function(){
      stage.coords = myMap.getCenter();
      stage.zoom = myMap.getZoom();
    }).then(refreshCoords);
  });
}

function refreshMap () {
    offsetMap(stage.zoom, stage.coords);
    requestWeather();
    requestCityName();
}

function refreshCoords() {
  window.location.hash = `${stage.coords[0]},${stage.coords[1]}&zoom=${stage.zoom}`;
}

function offsetMap (zoom, coords) {
  myMap.setCenter(coords, zoom);
  return coords;
}

document.body.addEventListener(`keypress`, function (e) {
  if (e.keyCode != 13 || !e.target.matches(`#search>input`)) return;
  requestCoords (e.target.value);
  e.target.value = ``;
});

document.body.addEventListener(`click`, function (e) {
  if (!e.target.matches(`#button`)) return;
  e.preventDefault();
  requestCoords (e.target.previousElementSibling.value);
  e.target.previousElementSibling.value = ``;
});
