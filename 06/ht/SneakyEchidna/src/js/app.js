import {
  getCoordinatesByName,
  getForecastByLatLng,
  getForecastByName,
  getUserCoordinates,
} from './services';
import { EventBus } from './eventBus';
import { WeatherComponent } from './weatherComponent';
import { YandexMap } from './map';
let eventBus = new EventBus();
let root = document.getElementById('content');
let map = document.createElement('div');
let infoWrapper = document.createElement('div');
root.appendChild(infoWrapper);
map.id = 'map';
root.appendChild(map);
let m = new YandexMap('map', ymaps, { lat: 1, lng: 2 }, eventBus);
// let m = new YandexMap('map', ymaps);
// setTimeout(eventBus.trigger, 10000, 'changeCenter', [33, 11]);
// setTimeout(m.returnCenter, 5000);
// setTimeout(m.panTo, 5000, [22, 7], { duration: 2000 });
let forecast = new WeatherComponent(infoWrapper);
// console.log(m.map.getCenter());
forecast.drawWeatherReport(m.center);
export { m };
