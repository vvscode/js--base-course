import EventBus from './event_bus.js';
import HashRouter from './router.js';
import Menu from './menu.js';  

var body = document.querySelector('body');
var menuWrapper = document.querySelector('#menuWrapper');

var eventBus = new EventBus();
var router = new HashRouter({
  routes: [{
    name: 'text',
    match: 'text',
    onBeforeEnter: () => console.log('onBeforeEnter text'),
    onEnter: () => console.log('onEnter text'),
    onLeave: () => console.log('onLeave text')
  }, {
    name: 'canvas',
    match: 'canvas',
    onBeforeEnter: () => console.log('onBeforeEnter canvas'),
    onEnter: () => console.log('onEnter canvas'),
    onLeave: () => console.log('onLeave canvas')
  }, {
    name: 'svg',
    match: 'svg',
    onBeforeEnter: () => console.log('onBeforeEnter svg'),
    onEnter: () => console.log('onEnter svg'),
    onLeave: () => console.log('onLeave svg')
  }, {
    name: 'about',
      match: '',
      onBeforeEnter: () => console.log('onBeforeEnter about'),
      onEnter: () => console.log('onEnter about'),
      onLeave: () => console.log('onLeave about')
  }]
});

var menu = new Menu(menuWrapper, eventBus, {text: 'Text', canvas: 'Canvas', svg: 'SVG', about: 'about'});
menu.render();
menu.addListener();
