//components
import DataListDisplay from './data_list_display.js';
import SearchBar from './search_bar.js';
import Menu from './menu.js';
import RadioMenu from './radio_menu.js';
import WeatherDisplay from './weather_display.js';

//services
import EventBus from './event_bus.js';
import Router from './router.js';
import CoordsFetcher from './coords_fetcher.js';
import WeatherFetcher from './weather_fetcher.js';
import StorageInterfaceAsync from './storage_interface_async.js';

var header = document.querySelector('.header');
var content = document.querySelector('.content'); 
var footer = document.querySelector('.footer');
var currentPosition = {lat: 55.7558, lng: 37.6173};
var darkSkyKey = 'd113af5f82393ef553f48314ae9f42e8';
var geocodeKey = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';

var eventBus = new EventBus();

var router = new Router({
  routes: [{
    name: 'about',
    match: 'about',
    onEnter: () => {
      console.log('about');
    },
  }, {
    name: 'author',
    match: 'author',
    onEnter: () => {
    },
  }, {
    name: 'cityCoords',
    match: /city=[a-zA-z]+/,
    onEnter: () => {
      console.log('city');
    }
  }, {
    name: 'cityCoords',
    match: /coordinates=(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/,
    onEnter: () => {
      let coords = window.location.hash.split('=')[1].split(',');
      currentPosition.lng = coords[0];
      currentPosition.lat = coords[1];
    },
  }]
});

eventBus.on('searchBarEnter', (arg) => {
  coordsFetcher.getCoords(arg).
  then(newCoords => {
    window.location.hash = 'coordinates=' + newCoords.lat + ',' + newCoords.lng; 
    eventBus.trigger('centerChange');
    map.setCenter([newCoords.lat, newCoords.lng], 7, {checkZoomRange: true});
    storageInterface.addToHistory({name: arg, value: newCoords});
    historyDisplay.clear();
    storageInterface.getHistory().then((history) => {
        history.forEach((item) => {
        historyDisplay.addItem(item.value.name, item.value.value);
      });
    });
  });
});

eventBus.on('centerChange', () => {
  weatherFetcher.fetchWeather(currentPosition).then(result => {
    let response = {};
    response.summary = result.summary;
    response.temperature = result.temperature;
    response.icon = result.icon;
    response.humidity = result.humidity;
    response.windSpeed = result.windSpeed;
    weatherDisplay.updateWeather(response);
  });
});

eventBus.on('clickStorageItem', (val) => {
  window.location.hash = ('coordinates=' + val.lat + ',' + val.lng);
  currentPosition = val;
  eventBus.trigger('centerChange');
  map.setCenter([val.lat, val.lng], 5, {checkZoomRange: true});
});

//components init
var searchBar = new SearchBar(header, eventBus); 
var menu = new Menu(header, eventBus);
var radioMenu = new RadioMenu(header, eventBus);
var historyDisplay = new DataListDisplay(footer, eventBus, 'History');
var favouritesDisplay = new DataListDisplay(footer, eventBus, 'Favourites');
var weatherDisplay = new WeatherDisplay(footer);
var map;

//services init
var weatherFetcher = new WeatherFetcher(eventBus, darkSkyKey, 'fetch'); 
var coordsFetcher = new CoordsFetcher(eventBus, geocodeKey, 'fetch'); 
var storageInterface = new StorageInterfaceAsync(eventBus);

function init() { 
  map = new ymaps.Map('map', {
    center: [currentPosition.lat, currentPosition.lng],
    zoom: 7,
    controls: ['zoomControl'],
  });
  map.events.add('actionend', getNewCenter);

  function getNewCenter() {
    let newCenter = map.getCenter();
    window.location.hash = 'coordinates=' + newCenter[0] + ',' + newCenter[1];
    eventBus.trigger('centerChange');
  }
}

function setCurrentLocation() {

}

ymaps.ready(init); //called on DOM load
menu.render();
searchBar.render();
radioMenu.render();
historyDisplay.render();
weatherDisplay.render();
favouritesDisplay.render();
