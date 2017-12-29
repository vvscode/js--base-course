// let stage {
//   request,
//   page
//   search
//   coords
// }
export let myMap;

export stage = {};

function init (position) {
  myMap = new ymaps.Map(`map`, {
    center: position,
    zoom: 10,
    controls: ['zoomControl']
  });
}

function offsetMap (zoom, coords) {
  myMap.setCenter(coords, zoom);
  return coords;
}

function getWeather (coords) {
  let xhr = new XMLHttpRequest();
  let str = `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/0fbec31d64e8fba6637a108f151904ad/${coords[0]},${coords[1]}?lang=be%26units=si`;
  xhr.open(`GET`, str, true);
  xhr.onload = function() {
    let obj = JSON.parse(JSON.parse(this.responseText).body);
    let div = document.querySelector(`#weather`);
    div.innerText = obj.daily.summary;
  }
  xhr.onerror = function() {
    alert('Ошибка ' + this.status);
  }
  xhr.send();
}

ymaps.ready(init).then(function(){
  ymaps.geolocation.get({provider: `yandex`})
  .then(function (result) {return result.geoObjects.position})
  .then(offsetMap.bind(null, 10))
  .then(getWeather);
});

let search = document.querySelector(`#search>input`);
search.addEventListener(`keypress`, function (e) {
  if (e.keyCode != 13) return;
  ymaps.geocode(e.target.value)
    .then(function(res) {
      let coords = res.geoObjects.get(0).geometry.getCoordinates();
      return coords})
    .then(offsetMap.bind(null, 10))
    .then(getWeather);
})

document.body.addEventListener(`click`, function (e) {
  if (!e.target.matches(`#button`)) return;
  e.preventDefault();
  ymaps.geocode(search.value)
    .then(function(res) {
      let coords = res.geoObjects.get(0).geometry.getCoordinates();
      return coords})
    .then(offsetMap.bind(null, 10))
    .then(getWeather);
});
