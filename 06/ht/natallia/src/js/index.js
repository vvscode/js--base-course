import EventBus from './utils/EventBus.js';
import Router from './utils/router.js';
import changeUrl from './utils/changeUrl.js';
import drawPageWeather from './weather/drawPageWeather.js';
import getForecastByLatLng from './weather/getForecastByLatLng.js';
import drawPageAuthor from './author/author.js';
import drawPageAbout from './about/about.js';
import getUserPosition from './weather/getUserPosition.js';
import writeWeatherByCurrentLocation from './blockCurrentWeather/writeWeatherByCurrentLocation.js';
import writeWeatherByHistory from './history/writeWeatherByHistory.js';
import searchCity from './search/searchCity.js';
import getLocationByCityName from './search/getLocationByCityName.js';
import addFavorite from './favorite/addFavorite.js';
import getAllStorage from './favorite/getAllStorage.js';
import removeFavorite from './favorite/removeFavorite';

const main = document.querySelector('#main');
const body = document.querySelector('body');

export const eventBus = new EventBus();

eventBus.on('author', drawPageAuthor);
eventBus.on('about', drawPageAbout);
eventBus.on('init', drawPageWeather);
eventBus.on('changeUrl', changeUrl);
eventBus.on('getForecast', getForecastByLatLng);
eventBus.on('currentWeather', writeWeatherByCurrentLocation);
eventBus.on('historyWeather', writeWeatherByHistory);
eventBus.once('searchCity', searchCity);
eventBus.on('getLocationByCityName', getLocationByCityName);
eventBus.once('addFavorite', addFavorite);
eventBus.on('getAllStorage', getAllStorage);
eventBus.once('removeFavorite', removeFavorite);

var router = new Router({
  routes: [
    {
      name: 'index',
      match: '',
      onEnter: () => {
        eventBus.trigger('init', main);
        getUserPosition()
          .then(url => {
            eventBus.trigger('changeUrl', url);
          })
          .catch(url => {
            eventBus.trigger('changeUrl', url);
          });
        searchCity();
      }
    },
    {
      name: 'weather',
      match: /center=\d+\.*\d*,\d+\.*\d*/,
      onEnter: () => {
        let url = window.location.hash.replace('#', '');
        let location = url.match(/\d+\.*\d*/g);
        let lat = +location[0];
        let lng = +location[1];

        if (!document.querySelector('.weather')) {
          eventBus.trigger('init', main);
          eventBus.trigger('searchCity');
        }

        eventBus.trigger('getForecast', { lat: lat, lng: lng });
        eventBus.trigger('getAllStorage');
        eventBus.trigger('removeFavorite');
      }
    },

    {
      name: 'city',
      match: /city\/[\wа-я]+/i,
      onEnter: () => {
        let city = window.location.hash.replace('#city/', '');

        if (!document.querySelector('.weather')) {
          eventBus.trigger('init', main);
          eventBus.trigger('searchCity');
        }
        eventBus.trigger('getAllStorage');
        eventBus.trigger('getLocationByCityName', city);
        eventBus.trigger('addFavorite');
        eventBus.trigger('removeFavorite');
      }
    },

    {
      name: 'about',
      match: 'about',
      onEnter: () => {
        eventBus.trigger('about', main);
      }
    },
    {
      name: 'author',
      match: 'author',
      onEnter: () => {
        eventBus.trigger('author', main);
      }
    }
  ]
});
