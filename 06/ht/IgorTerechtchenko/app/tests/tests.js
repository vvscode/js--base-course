import SearchBar from '../js/search_bar.js';
import EventBus from '../js/event_bus.js';
import Menu from '../js/menu.js';
import RadioMenu from '../js/radio_menu.js';
import StorageInterfaceAsync from '../js/storage.js';

mocha.setup({
  ui: "bdd",
  bail: true
});

const assert = chai.assert;
const $$ = document.querySelector.bind(document);

describe('Components', () => {
  var el;
  var bus;
  beforeEach(() => {
    el = document.createElement('div');
    bus = new EventBus();
  });
  describe('SearchBar', () => {
    it('is a function', () => {
      assert.isOk(typeof SearchBar === 'function');
    });
    it('is a constructor', () => {
      assert.isOk(typeof(new SearchBar(el, bus)) === 'object');
    });
    it('takes 2 args', () => {
      assert.isOk(SearchBar.length === 2);
    });
  });
  describe('SearchBar.render', () => {
    var bar;
    beforeEach(() => {
      bar = new SearchBar(el, bus);
    });
    it('is a function', () => {
      assert.isOk(typeof bar.render === 'function'); 
    });
    it('adds a text input field to el', () => {
      bar.render();
      var length = el.querySelectorAll('input').length;
      assert.isOk(length === 1, length);
      assert.isOk(el.querySelector('input').type === 'text', 'type');
    });
    describe('input field functionality', () => {
      it('triggers searchBarEnter event and sends entered text to event bus on pressing enter', () => {
        bar.render();
        var field = el.querySelector('input');
        field.value = 'test';
        var e = new KeyboardEvent('keypress', {key: 'Enter'});
        var log = [];
        bus.on('searchBarEnter', (arg) => {
          log.push(arg);
        });
        field.dispatchEvent(e);
        assert.isOk(log.length === 1, log.length);
        assert.isOk(log[0] === 'test', log[0]);
      });
    });
  });
  describe('Menu', () => {
    var el;
    var bus;
    beforeEach(() => {
      el = document.createElement('div');
      bus = new EventBus();
    });
    it('is a function', () => {
      assert.isOk(typeof Menu === 'function'); 
    });
    it('takes 2 arguments', () => {
      assert.isOk(Menu.length === 2);
    });
    it('is a constructor', () => {
      assert.isOk(new Menu() instanceof Menu);
    });
    describe('Menu.render', () => {
      it('is a function', () => {
        var menu = new Menu(el, bus);
        assert.isOk(typeof menu.render === 'function');
      });
      it('creates 3 buttons', () => {
        var menu = new Menu(el, bus);
        menu.render();
        var buttons = el.querySelectorAll('button'); 
        assert.isOk(buttons.length === 3);
      });
      it('creates buttons which change hash', () => {
        var menu = new Menu(el, bus);
        menu.render();
        var buttons = el.querySelectorAll('button'); 
        buttons[0].click();
        assert.isOk(window.location.hash === '#about');
        window.location.hash = '';
      });
    });
  });
  describe('RadioMenu', () => {
    var bus;
    var el;
    beforeEach(() => {
      bus = new EventBus();
      el = document.createElement('div');
    });
    it('is a function', () => {
      assert.isOk(typeof RadioMenu === 'function');
    });
    it('takes 2 args', () => {
      assert.isOk(RadioMenu.length === 2);
    });
    it('is a constructor', () => {
      assert.isOk(new RadioMenu(el, bus) instanceof RadioMenu);
    });
    describe('raioMenu.render', () => {
      var radioMenu;
      beforeEach( () => {
        radioMenu = new RadioMenu(el, bus);
      });
      it('is a function', () => {
        assert.isOk(typeof radioMenu.render === 'function');
      });
      it('creates two radio buttons', () => {
        radioMenu.render();
        var buttons = el.querySelectorAll('input');
        assert.isOk(buttons.length === 2);
        buttons.forEach((button) => {
          assert.isOk(button.type === 'radio');
        });
      });
    });
    describe('radioMenu buttons functionality', () => {
      it('sends message with current selected option to event bus', () => {
        var radioMenu = new RadioMenu(el, bus);
        radioMenu.render();
        var log = [];
        var buttons = el.querySelectorAll('input');
        bus.on('radioOptionSwitch', (currentMode) => {
          log.push(currentMode);
        });
        buttons[0].click();
        assert.isOk(log.length === 1);
        assert.isOk(log[0] === 'XHR');
        buttons[0].click();
        assert.isOk(log.length === 1); //not sending message if option does not change
        buttons[1].click();
        assert.isOk(log.length === 2);
        assert.isOk(log[1] === 'fetch');
        buttons[0].click();
        assert.isOk(log.length === 3);
        assert.isOk(log[2] === 'XHR');
      });
    });
  });
});

describe('Services', () => {
  var bus;
  beforeEach(() => {
    bus = new EventBus();
  });
  describe('StorageInterfaceAsync', () => {
    it('is a function', () => {
      assert.isOk(typeof StorageInterfaceAsync === 'function');
    });
    it('takes 2 args', () => {
      assert.isOk(StorageInterfaceAsync.length === 2);
    });
    it('is a constructor', () => {
      assert.isOk(new StorageInterfaceAsync() instanceof StorageInterfaceAsync);
    });
  });
});

mocha.run();
