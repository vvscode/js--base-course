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
import renderAuthor from './render_author.js';
import renderAbout from './render_about.js';

var header = document.querySelector('.header');
var content = document.querySelector('.content'); 
var footer = document.querySelector('.footer');
var currentPosition = {lat: 55.7558, lng: 37.6173};
var darkSkyKey = 'd113af5f82393ef553f48314ae9f42e8';
var geocodeKey = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';

var eventBus = new EventBus();

var router = new Router({
  routes: [
  {
    name: 'main',
    match: 'main',
    onEnter: () => {
      eventBus.trigger('mainInit');
    },
  },
  {
    name: 'about',
    match: 'about',
    onEnter: () => {
      document.querySelectorAll('.content > *').forEach((el) => {
        el.style.display = 'none';
      });
      footer.style.display = 'none';
      renderAbout(content);
    },
  }, {
    name: 'author',
    match: 'author',
    onEnter: () => {
      document.querySelectorAll('.content > *').forEach((el) => {
        el.style.display = 'none';
      });
      footer.style.display = 'none';
      renderAuthor(content);
    },
  }, {
    name: 'cityName',
    match: /city=[a-zA-z]+/,
    onEnter: () => {
      eventBus.trigger('mainInit');
      let city = window.location.hash.split('=')[1].split(',');
      coordsFetcher.getCoords(city).
      then(newCoords => {
        currentPosition = newCoords;
        map.setCenter([newCoords.lat, newCoords.lng], 7, {checkZoomRange: true});
        storageInterface.addToHistory({name: city, value: newCoords});
        historyDisplay.clear();
        storageInterface.getHistory().then((history) => {
            history.forEach((item) => {
            historyDisplay.addItem(item.value.name, item.value.value);
          });
        });
      });
    }
  }, {
    name: 'cityCoords',
    match: /coordinates=(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/,
    onEnter: () => {
      eventBus.trigger('mainInit');
      let coords = window.location.hash.split('=')[1].split(',');
      currentPosition.lat = coords[0];
      currentPosition.lng = coords[1];
      map.setCenter([currentPosition.lat, currentPosition.lng], 7, {checkZoomRange: true});
    },
  }]
});

eventBus.on('mainInit', () => {
  document.querySelectorAll('.content > *').forEach((el) => {
    el.style.display = 'block';
  });
  footer.style.display = 'block';
  let author = document.querySelector('.content > .authorWrapper');
  let about = document.querySelector('.content > .aboutWrapper');
  if(author) {
    content.removeChild(author);
  }
  if(about) {
    content.removeChild(about);
  }
});

eventBus.on('searchBarEnter', (arg) => {
  eventBus.trigger('mainInit');
  coordsFetcher.getCoords(arg).
  then(newCoords => {
    window.location.hash = 'coordinates=' + newCoords.lat + ',' + newCoords.lng; 
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

eventBus.on('addToFavourites', () => {
  var name = window.prompt('Enter location description:');
  storageInterface.addToFavourites(name, currentPosition);
  favouritesDisplay.addItem(name, currentPosition);
});

eventBus.on('centerChange', () => {
  weatherFetcher.fetchWeather(currentPosition).then(result => {
    let response = {};
    response.summary = result.summary;
    response.temperature = Math.round((result.temperature-32)/1.8*100)/100; //converting to celsius and trunking to 2 digits
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

eventBus.on('removeStorageItem', (name) => {
  storageInterface.removeFromFavourites(name + ':favourites'); 
});

eventBus.on('radioOptionSwitch', (value) => {
  coordsFetcher.method = value;
  weatherFetcher.method = value;
});

//components init
var searchBar = new SearchBar(header, eventBus); 
var menu = new Menu(header, eventBus);
var radioMenu = new RadioMenu(header, eventBus);
var historyDisplay = new DataListDisplay(footer, eventBus, 'History');
var favouritesDisplay = new DataListDisplay(footer, eventBus, 'Favourites', true);
var weatherDisplay = new WeatherDisplay(footer);
var map;

function init() { 
  map = new ymaps.Map('map', {
    center: [currentPosition.lat, currentPosition.lng],
    zoom: 7,
    controls: ['zoomControl'],
  });
  var favsButton = new ymaps.control.Button({data: {content: "*",
                                                    title: "Add current map center to favourites"}, 
                                             options: {selectOnClick: false,}
                                            });
  document.querySelector('#map').addEventListener('click', (e) => {
    if(e.target.className.match(/float-button/g)) {
      eventBus.trigger('addToFavourites');
    }
  });
  map.events.add('actionend', getNewCenter);
  map.controls.add(favsButton, {float: 'right'});

  function getNewCenter() {
    let center = map.getCenter();
    currentPosition.lat = center[0];
    currentPosition.lng = center[1];
    eventBus.trigger('centerChange');
  }
  eventBus.trigger('centerChange');
}

ymaps.ready(init); //called on DOM load

//services init
var weatherFetcher = new WeatherFetcher(eventBus, darkSkyKey, 'fetch'); 
var coordsFetcher = new CoordsFetcher(eventBus, geocodeKey, 'fetch'); 
var storageInterface = new StorageInterfaceAsync(eventBus);
menu.render();
searchBar.render();
radioMenu.render();
historyDisplay.render();
weatherDisplay.render();
favouritesDisplay.render();

storageInterface.getHistory().then((history) => {
    history.forEach((item) => {
    historyDisplay.addItem(item.value.name, item.value.value);
  });
});

storageInterface.getFavourites().then((favourites) => {
    favourites.forEach((item) => {
    favouritesDisplay.addItem(item.name, item.value);
  });
});
