import EventBus from './event_bus.js';
import HashRouter from './router.js';
import Menu from './menu.js';  
import DisplayComponent from './display_component.js';
import LifeGame from './life_game.js';

var body = document.querySelector('body');
var contentEl = document.querySelector('#content');
var menuWrapper = document.querySelector('#menuWrapper');
var eventBus = new EventBus();
var display = new DisplayComponent(contentEl, eventBus, 'text');
var field = [];
for(var i = 0; i < 10; i++) {
  field[i] = ['_', '*', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
}
var game = new LifeGame(field, eventBus); 

eventBus.on('cellClick', (coords) => {
  game.switchCell(coords[0], coords[1]);
});

eventBus.on('switchClick', () => {
  game.switchGameState();
});

eventBus.on('rerenderRequest', () => {
  display.render(game.currentState);
  display.addHistory();
});

eventBus.on('fasterClick', () => {
  game.changeSpeed('+');
  game.switchGameState(); //redrawing
  game.switchGameState();
});

eventBus.on('slowerClick', () => {
  game.changeSpeed('-');
  game.switchGameState();
  game.switchGameState();
});

eventBus.on('fieldSizeChange', (sizeArray) => {
  field = [];
  for(var i=0; i<=sizeArray[0]; i++) {
    var line = [];
    for(var j=0; j<=sizeArray[1]; j++) {
      line.push('_'); 
    }
    field.push(line);
  }
  game = new LifeGame(field, eventBus);
  eventBus.trigger('rerenderRequest');
});

eventBus.on('historyChange', (position) => {
  game.pauseGame();
  //position is string so not strict comparison used
  var newArray = []; 
  game.history[position].forEach((line, index) => {
    newArray[index] = line.slice();
  });
  game.currentState = newArray; 
  display.render(game.currentState);
});

var router = new HashRouter({
  routes: [{
    name: 'text',
    match: 'text',
    onBeforeEnter: () => console.log('onBeforeEnter text'),
    onEnter: () => {
      console.log('onEnter text');
      display.type = 'text';
      display.render(game.currentState);
      display.addControls();
      display.addHistory();
      display.addFieldSize();
    },
    onLeave: () => console.log('onLeave text')
  }, {
    name: 'canvas',
    match: 'canvas',
    onBeforeEnter: () => {
      display.type = 'canvas';
      display.render(game.currentState);
      display.addControls();
      display.addHistory();
      display.addFieldSize();
    },
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
      match: 'about',
      onBeforeEnter: () => console.log('onBeforeEnter about'),
      onEnter: () => console.log('onEnter about'),
      onLeave: () => console.log('onLeave about')
  }]
});

var menu = new Menu(menuWrapper, eventBus, {text: 'Text', canvas: 'Canvas', svg: 'SVG', about: 'about'});
menu.render();
menu.addListener();
