import {newEb} from "./observer";
import {refreshCoords} from "./script";
import {addCityInHistory} from "./local";
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

function getThroughXhr (url, name) {
  let xhr = new XMLHttpRequest();
  let str = url;
  xhr.open(`GET`, str, true);
  xhr.onload = function () {
    cameRespone(name, this.responseText);
  };
  xhr.onerror = function () {alert(`Ошибка ${this.status}`)};
  xhr.send();
}

function getThroughFetch (url, name) {
  fetch(url, {method: `GET`}).then(function (response) {
    return response.text();
  }, function (response) {alert(`Ошибка ${response.status}`)}).then(function (result) {
    cameRespone(name, result);
  });
}

function doRequest () {
  if (stage.request === `XHR`) getThroughXhr.apply(this, arguments);
  if (stage.request === `fetch`) getThroughFetch.apply(this, arguments);
}

let cameRespone = (name, respone) => {
  if (name === `weather`) getWeather(respone);
  if (name === `city`) getCityName(respone);
  if (name === `coords`) getCoords(respone);
}

function requestWeather () {
  let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0fbec31d64e8fba6637a108f151904ad/${stage.coords[0]},${stage.coords[1]}?lang=ru&units=si`;
  // let url = `http://cors-proxy.htmldriven.com/?url=https://api.darksky.net/forecast/0fbec31d64e8fba6637a108f151904ad/${stage.coords[0]},${stage.coords[1]}?lang=ru%26units=si`;
  doRequest(url, `weather`);
}

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

function getCityName (respone) {
  let obj = JSON.parse(respone);
  stage.city = (obj.status !== `OK`) ? `None` : obj.results[0].address_components[0].long_name;
  let div = document.querySelector(`#weather`).children[0];
  div.innerText = `Населенный пункт: ${stage.city}\n`;
}

function requestCoords (city) {
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyBFl2Chh3nLWZ-bVlsSPiH_Q1o7f1x6cpg`;
  doRequest(url, `coords`);
}

function getCoords (respone) {
  let obj = JSON.parse(respone);
  if (obj.status !== `OK`) return;
  stage.coords = [obj.results[0].geometry.location.lat, obj.results[0].geometry.location.lng];
  stage.city = obj.results[0].address_components[0].long_name;
  refreshCoords();
  addCityInHistory(stage.city);
}

export {
  requestCoords,
  requestWeather,
  requestCityName
};
