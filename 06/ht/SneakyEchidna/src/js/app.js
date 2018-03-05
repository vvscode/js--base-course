import {
  getCoordinatesByName,
  getForecastByLatLng,
  getForecastByName,
  getInitialCoordinates,
} from './services';
import { EventBus } from './eventBus';
import { WeatherComponent } from './weatherComponent';
import { YandexMap } from './map';
import { HistoryComponent } from './historyComponent';
import { Search } from './searchComponent';
let m;
let eventBus = new EventBus();
let root = document.getElementById('content');
let mapContainer = document.createElement('div');
let map = document.createElement('div');
map.id = 'map';
mapContainer.className = 'mapContainer';
let header = document.createElement('div');
let searchbox = new Search(header, eventBus);
let infoContainer = document.createElement('div');
infoContainer.className = 'infoContainer';
root.appendChild(infoContainer);
root.appendChild(mapContainer);
root.appendChild(header);
mapContainer.appendChild(map);
let forecast = new WeatherComponent(infoContainer, eventBus);
let history = new HistoryComponent(infoContainer, eventBus);
getInitialCoordinates().then(
  (coordinates) => (m = new YandexMap('map', ymaps, eventBus, coordinates))
);
eventBus.trigger('search:success', 'Minsk');
export { m };
