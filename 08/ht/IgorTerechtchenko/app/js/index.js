import EventBus from './event_bus.js';
import HashRouter from './router.js';
import Menu from './menu.js';  
import DisplayComponent from './display_component.js';
import LifeGame from './life_game.js';
import AboutRenderer from './render_about.js';

var body = document.querySelector('body');
var contentEl = document.querySelector('#content');
var menuWrapper = document.querySelector('#menuWrapper');
var eventBus = new EventBus();
var display = new DisplayComponent(contentEl, eventBus, 'text');
var about = new AboutRenderer(contentEl);
window.location.hash = 'about';
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
  if(game.paused) {
    display.changePPButton('>');
  } else {
    display.changePPButton('||');
  }
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
  game.pauseGame();
  display.changePPButton('>');
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
  display.changePPButton('>');
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
    onEnter: () => {
      display.type = 'text';
      display.render(game.currentState);
      display.addControls();
      display.addHistory();
      display.addFieldSize();
    },
  }, {
    name: 'canvas',
    match: 'canvas',
    onEnter: () => {
      display.type = 'canvas';
      display.render(game.currentState);
      display.addControls();
      display.addHistory();
      display.addFieldSize();
    },
  }, {
    name: 'svg',
    match: 'svg',
    onEnter: () => {
      display.type = 'svg';
      display.render(game.currentState);
      display.addControls();
      display.addHistory();
      display.addFieldSize();
    },
  }, {
    name: 'about',
      match: 'about',
      onEnter: () => {
        game.pauseGame();
        about.render();
      },
      onLeave: () => {
        document.querySelector('.aboutWrapper').innerHTML = '';
        console.log('leave');
      },
  }]
});

var menu = new Menu(menuWrapper, eventBus, {text: 'Text', canvas: 'Canvas', svg: 'SVG', about: 'about'});
menu.render();
menu.addListener();
