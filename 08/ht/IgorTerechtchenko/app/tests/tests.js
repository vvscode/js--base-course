import Menu from '../js/menu.js';
import LifeGame from '../js/life_game';
import DisplayComponent from '../js/display_component.js'; 
import EventBus from '../js/event_bus.js';

mocha.setup({
  ui: "bdd",
  bail: true
});

const assert = chai.assert;
const $$ = document.querySelector.bind(document);

describe('Menu', function() {
  var el; var menu;
  var bus;
  beforeEach(function() {
    el = document.createElement('div');
    bus = {};
    menu = new Menu(el, bus, {test: 'Test'});
  });
  it('is a function', function() {
    assert.isOk(typeof Menu === 'function');
  });
  it('is a constructor', function() {
    assert.isOk(new Menu({}, {}, {}) instanceof Menu);
  });
  it('renders menu in specified element', function() {
    menu.render();
    assert.isOk(el.innerHTML !== '');
  });
  it('renders menu buttons according to routes parameter', function() {
    menu.render();
    assert.isOk(el.querySelector('button').className = 'link.test');
  });
  it('creates button which change url on click', function() {
    menu.render();
    menu.addListener();
    el.querySelector('button').click();
    assert.isOk(window.location.hash === '#test');
    window.location.hash = '';
  });
});

describe('LifeGame', function() {
  var game;
  var startingField;
  beforeEach(function() {
    startingField = [['_','_','_','_','_'],
                     ['_','_','_','_','_'],
                     ['_','*','*','*','_'],
                     ['_','_','_','_','_'],
                     ['_','_','_','_','_']];
    game = new LifeGame(startingField);
  });
  it('is a function', function() {
    assert.isOk(typeof LifeGame === 'function', LifeGame);
  });
  it('is a constuctor', function() {
    assert.isOk(new LifeGame() instanceof LifeGame);
  });
  describe('getNeighbours', function() {
    it('is a LifeGame method',function() {
      assert.isOk(typeof game.getNeighbours === 'function');
    });
    it('takes 2 coords', function() {
      assert.isOk(game.getNeighbours.length === 2);
    });
    it('returns an array', function() {
      assert.isOk(typeof Array.isArray(game.getNeighbours(0,0)));  
    });
    it('returns 8 coordinate pairs', function() {
      assert.isOk(game.getNeighbours(0,0).length === 8);
      game.getNeighbours(0,0).forEach(function(pair) {
        assert.isOk(Array.isArray(pair));
        assert.isOk(pair.length === 2);
      });
    });
    it('returns correct neighbour coordinates', function() {
      var result = [[0, 0], [0, 1], [0, 2],[1, 0], [1, 2] ,[2, 0], [2, 1], [2, 2]]
      game.getNeighbours(1,1).forEach(function(pair, count) {
        //no deepequal :(
        assert.isOk(pair[0] === result[count][0]);
        assert.isOk(pair[1] === result[count][1]);
      });
    });
  });
  describe('nextGen', function() {
    it('is a LifeGame method',function() {
      assert.isOk(typeof game.nextGen === 'function');
    });
    it('updates state', function() {
      var oldState = game.currentState;
      game.nextGen();
      assert.isOk(game.currentState != oldState);
    });
    it('generates correct new state', function() {
      var correctState = [['_','_','_','_','_'],
                          ['_','_','*','_','_'],
                          ['_','_','*','_','_'],
                          ['_','_','*','_','_'],
                          ['_','_','_','_','_']];
      game.nextGen();
      game.currentState.forEach(function(line, lineIndex) {
        line.forEach(function(el, elIndex) {
          assert.isOk(el === correctState[lineIndex][elIndex]);
        });
      })
    });
    it('places previous state in history', function() {
      game.nextGen();
      assert.isOk(game.history.length === 1);
      game.history[0].forEach(function(line, lineIndex) {
        line.forEach(function(el, elIndex) {
          assert.isOk(el === startingField[lineIndex][elIndex]);
        });
      })
    });
  });
  describe('switchCell', function() {
    it('is a LifeGame method', function() {
      assert.isOk(typeof game.switchCell === 'function');
    });
    it('takes 2 args', function() {
      assert.isOk(game.switchCell.length === 2);
    });
    it('switches cell state', function() {
      game.switchCell(0, 0);
      assert.isOk(game.currentState[0][0] === '*');
      game.switchCell(2, 2);
      assert.isOk(game.currentState[2][2] === '_');
    });
  });
});

describe('DisplayComponent', function() {
  it('is a constructor', function() {
    assert.isOk(new DisplayComponent() instanceof DisplayComponent);
  });
  it('takes 3 arguments', function() {
    assert.isOk(DisplayComponent.length === 3);
  });
  describe('DisplayComponent.render()', function() {
    var testEl;
    var testField;
    var display;
    beforeEach(function() {
      testField = [['_', '_'], ['_', '_']] 
      testEl = document.createElement('div');
      display = new DisplayComponent(testEl, undefined, 'text');
    });
    it('is DisplayComponent method', function() {
      assert.isOk(typeof display.render === 'function');
    });
    it('takes 1 arg', function() {
      assert.isOk(display.render.length === 1);
    });
    it('alters display el innerHTML', function() {
      testEl.innerHTML = 'test';
      assert.isOk(display);
      display.render(testField);
      assert.isOk(testEl.innerHTML !== 'test');
    });
    it('displays game field correctly', function() {
      display.render(testField);
      assert.isOk(testEl.innerHTML === '<table><tbody><tr><td class="0;0">_</td><td class="0;1">_</td></tr><tr><td class="1;0">_</td><td class="1;1">_</td></tr></tbody></table>');
    });
  });
  describe('addCellListeners', function() {
    describe('text', function() {
      var testEl;
      var testField;
      var display;
      var bus; 
      beforeEach(function() {
        bus = new EventBus();
        testField = [['_', '_', '_'], ['_', '*', '_'], ['_','_','_']]; 
        testEl = document.createElement('div');
        display = new DisplayComponent(testEl, bus, 'text');
        display.render(testField);
      });
      it('is DisplayComponent method', function() {
        assert.isOk(typeof display.addCellListeners === 'function'); 
      });
      it('adds click event listener to el table', function() {
        var log = [];
        bus.on('cellClick', function(coords) {
          log.push(coords);
        });
        display.addCellListeners();
        testEl.querySelector('td').click();
        assert.isOk(+log[0][0] === 0);
        assert.isOk(+log[0][1] === 0);
      });
    });
  });
});

mocha.run();
