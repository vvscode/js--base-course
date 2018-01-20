let inputs = document.querySelectorAll(`.http`);

function defineRequest () {
  inputs.forEach(function (input) {
    if (input.checked) stage.request = input.value;
  });
}

defineRequest();

document.body.addEventListener(`change`, function (e) {
  if (!e.target.matches(`.http`)) return;
  defineRequest();
});

function getThroughXhr (url, bell) {
  let xhr = new XMLHttpRequest();
  let str = url;
  xhr.open(`GET`, str, true);
  xhr.onload = function () {
    eb.trigger(bell, this.responseText);
  };
  xhr.onerror = function () {alert(`Ошибка ${this.status}`)};
  xhr.send();
}

function getThroughFetch (url, bell) {
  fetch(url, {method: `GET`}).then(function (response) {
    return response.text();
  }, function (response) {alert(`Ошибка ${response.status}`)}).then(function (result) {
    eb.trigger(bell, result);
  });
}

function doRequest () {
  if (stage.request === `XHR`) getThroughXhr.apply(this, arguments);
  if (stage.request === `fetch`) getThroughFetch.apply(this, arguments);
}

function requestWeather () {
  let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0fbec31d64e8fba6637a108f151904ad/${stage.coords[0]},${stage.coords[1]}?lang=ru&units=si`;
  // let url = `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/0fbec31d64e8fba6637a108f151904ad/${stage.coords[0]},${stage.coords[1]}?lang=ru%26units=si`;
  doRequest(url, `weather`);
}
eb.on(`weather`, getWeather);

function getWeather (respone) {
  let obj = JSON.parse(respone);
  // let obj = JSON.parse(JSON.parse(respone).body);
  let i = obj.hourly.data.findIndex(function (obj) {
    return obj.time >= Date.now() / 1000;
  });
  i = i ? --i : i;
  let weath = obj.hourly.data[i];
  let div = document.querySelector(`#weather`).children[1];
  div.innerText = `Погода:\n${weath.summary}\nТемпература: ${weath.apparentTemperature}°С\nВлажность: ${weath.humidity * 100}%\nВетер: ${weath.windSpeed}м/с\nДавление: ${weath.pressure * 100}Па`;
};

function requestCityName () {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${stage.coords[0]+0.001},${stage.coords[1]+0.001}&result_type=locality&key=AIzaSyBFl2Chh3nLWZ-bVlsSPiH_Q1o7f1x6cpg`;
  doRequest(url, `city`);
}
eb.on(`city`, getCityName);

function getCityName (respone) {
  let obj = JSON.parse(respone);
  stage.city = (obj.status !== `OK`) ? `None` : obj.results[0].address_components[0].long_name;
  let div = document.querySelector(`#weather`).children[0];
  div.innerText = `Населенный пункт: ${stage.city}\n`;
}

function requestCoords (city) {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyBFl2Chh3nLWZ-bVlsSPiH_Q1o7f1x6cpg`;
  doRequest (url, `coords`);
}
eb.on(`coords`, getCoords);

function getCoords (respone) {
  let obj = JSON.parse(respone);
  if (obj.status !== `OK`) return;
  stage.coords = [obj.results[0].geometry.location.lat, obj.results[0].geometry.location.lng];
  stage.city = obj.results[0].address_components[0].long_name;
  refreshCoords();
  addCityInHistory(stage.city);
}
