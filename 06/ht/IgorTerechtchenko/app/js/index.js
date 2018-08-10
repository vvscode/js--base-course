import EventBus from './event_bus.js';
import Router from './router.js';
import SearchBar from './search_bar.js';
import Menu from './menu.js';
import RadioMenu from './radio_menu.js';

var header = document.querySelector('.header');
var content = document.querySelector('.content'); 
var footer = document.querySelector('.footer');

var eventBus = new EventBus();

eventBus.on('searchBarEnter', (arg) => {
  console.log(arg);
});

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
      console.log('author');
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
      console.log('coordinates');
    },
  }]
});

var searchBar = new SearchBar(header, eventBus); 
searchBar.render();
var menu = new Menu(header, eventBus);
menu.render();
var radioMenu = new RadioMenu(header, eventBus);
radioMenu.render();
