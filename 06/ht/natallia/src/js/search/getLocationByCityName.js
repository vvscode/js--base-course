import { eventBus } from './../index.js';
import getUserPosition from './../weather/getUserPosition.js';

export default function getLocationByCityName() {
  const GOOGLE_API_KEY = 'AIzaSyBLFkjFodoB1IjQYZXguwfBacB48EnvYKY';
  let addr = window.location.hash.replace(/#city\//, '');
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=${GOOGLE_API_KEY}`
  )
    .then(req => {
      if (req.status >= 200 && req.status < 300) {
        return Promise.resolve(req);
      } else {
        return Promise.reject(new Error(req.statusText));
      }
    })
    .then(req => req.json())
    .then(data => {
      return data.results[0].geometry.location;
    })
    .then(location => {
      eventBus.trigger('getForecast', location);
    })
    .then(_ => {
      eventBus.trigger('historyWeather', addr);
    })
    .catch(err => {
      console.log('Такой населенный пункт не найден', err);
      getUserPosition().then(url => {
        eventBus.trigger('changeUrl', url);
      });
    });
}
