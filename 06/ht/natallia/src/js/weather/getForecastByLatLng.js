import loadMap from './loadMap.js';
import { eventBus } from './../index.js';

export default function getForecastByLatLng(location) {
  let query = document.querySelector('input[type="radio"]:checked').value;
  loadMap('map', location);
  getForecastByRequest(location, query)
    .then(data => {
      eventBus.trigger('currentWeather', data);
    })
    .catch(err => {
      console.log(err);
    });
}

function getForecastByRequest(location, query) {
  const KEY_DARK_SKY = `9b4e68104fff62ae77dc24bc50f6706a`;
  let lat = location.lat;
  let lng = location.lng;
  let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${KEY_DARK_SKY}/${lat},${lng}?lang=ru&units=si`;
  return query === 'xhr' ? getForecastByXHR(url) : getForecastByFetch(url);
}

function getForecastByXHR(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, `${url}`, true);
    xhr.onreadystatechange = _ => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status !== 200) {
        reject(
          `Ошибка: ${
            xhr.status ? xhr.statusText : 'Прогноз погоды получить не удалось'
          }`
        );
      } else {
        resolve(JSON.parse(xhr.response));
      }
    };
    xhr.send();
  });
}

function getForecastByFetch(url) {
  return fetch(`${url}`)
    .then(req => {
      if (req.status >= 200 && req.status < 300) {
        return Promise.resolve(req);
      } else {
        return Promise.reject(new Error(req.statusText));
      }
    })
    .then(req => req.json())
    .catch(err => {
      return `'Прогноз погоды получить не удалось', ${err}`;
    });
}
