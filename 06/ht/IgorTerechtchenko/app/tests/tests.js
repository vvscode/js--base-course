//components
import SearchBar from '../js/search_bar.js';
import EventBus from '../js/event_bus.js';
import Menu from '../js/menu.js';
import RadioMenu from '../js/radio_menu.js';
import WeatherDisplay from '../js/weather_display.js';
import DataListDisplay from '../js/data_list_display.js';
//services
import StorageInterfaceAsync from '../js/storage_interface_async.js';
import CoordsFetcher from '../js/coords_fetcher.js';
import WeatherFetcher from '../js/weather_fetcher.js';

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
  describe('SearchBar.prototype.render', () => {
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
    describe('Menu.prototype.render', () => {
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
    describe('RaioMenu.prototype.render', () => {
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
  describe('DataListDisplay', function() {
    var el;
    var bus;
    var name;
    beforeEach(() => {
      el = document.createElement('div');
      bus = new EventBus();
      name = 'test';
    });
    it('is a function', () => {
      assert.isOk(typeof DataListDisplay === 'function');
    });
    it('is a constructor', () => {
      assert.isOk(new DataListDisplay() instanceof DataListDisplay);
    }); 
    describe('DataListDisplay methods', () => {
      var display;
      beforeEach(() => {
        display = new DataListDisplay(el, bus, name);
      });
      describe('DataListDisplay.prototype.render', function() {
        it('is a DataListDisplay object mehtod', () => {
          assert.isOk(typeof display.render === 'function');
        });
        it('adds a div to specified element', () => {
          display.render();
          var divs = el.querySelectorAll('div');
          assert.isOk(divs.length === 1);
        });
        it('adds div containing ul to specified element', () => {
          display.render();
          var ul = el.querySelector('div').querySelector('ul');
          assert.isOk(ul);
        });
      });
      describe('DataListDisplay.prototype.addItem', () => {
        it('is a DataListDisplay object method', () => {
          assert.isOk(typeof display.addItem === 'function');
        });
        it('adds an item to the list element', () => {
          display.render();
          display.addItem('name', 10);
          var listItems = el.querySelector('div > ul').querySelectorAll('li');
          assert.isOk(listItems.length === 1); 
          assert.isOk(listItems[0].dataset.value === '10');
        });
      });
      describe('addEventListeners', () => {
        it('is a DataListDisplay object method', () => {
          assert.isOk(typeof display.addEventListeners === 'function');
        });
        it('triggers removeStorageItem event on EventBus', () => {
          display.render();
          display.allowRemoval = true;
          display.addItem('testName', 'testValue');
          var log = [];
          bus.on('removeStorageItem', (data) => log.push(data));
          var button = el.querySelector('.removeListItem');
          button.click();
          assert.isOk(log[0] === 'testName'); 
        });
        it('triggers clickStorageItem event on EventBus', () => {
          display.render();
          display.allowRemoval = true;
          display.addItem('testName', 'testValue');
          var log = [];
          bus.on('clickStorageItem', (data) => log.push(data));
          var li = el.querySelector('.testListItem');
          li.click();
          assert.isOk(log[0] === 'testValue'); 
        });
      });
      describe('clear', () => {
        it('is a DataListDisplay instance method', () => {
          assert.isOk(typeof new DataListDisplay().clear === 'function'); 
        });
        it('removes all entries from list', () => {
          display.render();
          display.addItem('a', 1);
          display.addItem('b', 2);
          var list = el.querySelector('div > ul');
          display.clear();
          assert.isOk(list.innerHTML === '');
        });
      });
    });
  });
  describe('WeatherDisplay', () => {
    var el;
    beforeEach(() => {
      el = document.createElement('div');  
    });
    it('is a function', () => {
      assert.isOk(typeof WeatherDisplay === 'function');
    });
    it('is a constructor', () => {
      assert.isOk(new WeatherDisplay() instanceof WeatherDisplay);
    });
    describe('WeatherDisplay.prototype.render', () => {
      it('is a WeatherDisplay instance method', () => {
        assert.isOk(typeof new WeatherDisplay().render === 'function');
      });
      it('adds wrapper div to specified el innerhtml', () => {
        var display = new WeatherDisplay(el);
        display.render();
        assert.isOk(el.querySelector('div'));
      });
    });
    describe('WeatherDisplay.prototype.updateWeather', () => {
      it('is a WeatherDisplay instance method', () => {
        assert.isOk(typeof new WeatherDisplay().updateWeather === 'function');
      });
      it('changes el innerHTML', () => {
        //assert.isOk(false);
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
    afterEach(() => {
      window.localStorage.clear();
    });
    it('is a function', () => {
      assert.isOk(typeof StorageInterfaceAsync === 'function');
    });
    it('is a constructor', () => {
      assert.isOk(new StorageInterfaceAsync() instanceof StorageInterfaceAsync);
    });
    it('is a constructor', () => {
      assert.isOk(new StorageInterfaceAsync() instanceof StorageInterfaceAsync);
    });
    var storage;
    beforeEach(() => {
      storage = new StorageInterfaceAsync(bus); 
    });
    describe('StorageInterfaceAsync.prototype.init', () => {
      it('is a StorageInterfaceAsync instance method', () => {
        assert.isOk(typeof storage.init === 'function');
      });
      it('leaves params blank if no params specified in storage', () => {
        assert.isOk(storage.status.historyEntryCounter === 0);
        assert.isOk(storage.status.minimalHistoryCounter === 0);
        assert.isOk(storage.status.favouritesEntryCounter === 0);
      });
    });
    describe('StorageInterfaceAsync.prototype.addToHistory', () => {
      it('is a StorageInterfaceAsync object mehtod', () => {
        assert.isOk(typeof storage.addToHistory === 'function');
      });
      it('takes 1 arg', () => {
        assert.isOk(storage.addToHistory.length === 1);
      });
      it('returns promise', () => {
        assert.isOk(storage.addToHistory('test', 'test') instanceof Promise);
      });
      it('writes data to storage according to userID and history', () => {
        storage.addToHistory('testValue');
        var o = window.localStorage.getItem((storage.status.historyEntryCounter - 1) + ':history');
        o = JSON.parse(o);
        assert.isOk(o.type === 'history');
        assert.isOk(o.value === 'testValue');
      });
    });
    describe('StorageInterfaceAsync.prototype.getHistory', () => {
      it('is a StorageInterfaceAsync object method', () => {
        assert.isOk(typeof storage.getHistory === 'function');
      });
      it('return promise', () => {
        assert.isOk(storage.getHistory() instanceof Promise);
      });
      it('returns history array', async () => {
        var favItem = {
          type: 'favourites',
          value: 'mock',
        }
        window.localStorage.setItem(storage.userID + ':' + storage.status.entryCounter,
                                    JSON.stringify(favItem));
        storage.status.entryCounter += 1;
        storage.addToHistory('a');
        storage.addToHistory('b');
        var history = await storage.getHistory()
        assert.isOk(history.length === 2);
        assert.isOk(history[0].value === 'a');
        assert.isOk(history[1].value === 'b');
      });
    });
    describe('StorageInterfaceAsync.prototype.addToFavourites', () => {
      it('is a StorageInterfaceAsync object method', () => {
        assert.isOk(typeof storage.addToFavourites === 'function');
      });
      it('returns a promise', () => {
        assert.isOk(storage.addToFavourites('test') instanceof Promise);
      });
      it('writes to localStorage', () => {
        storage.addToFavourites('dudinka', 10);
        var fav = JSON.parse(window.localStorage.getItem('dudinka:favourites'));
        assert.isOk(fav.value === 10);
        assert.isOk(fav.type === 'favourites');
      });
    });
    describe('StorageInterfaceAsync.prototype.removeFromFavourites', () => {
      it('is a StorageInterfaceAsync object method', () => {
        assert.isOk(typeof storage.removeFromFavourites === 'function');
      });
      it('takes 1 arg', () => {
        assert.isOk(storage.removeFromFavourites.length === 1);
      });
      it('returns a promise', () => {
        assert.isOk(storage.removeFromFavourites() instanceof Promise);        
      });
      it('removes specified item from storage', () => {
        storage.addToFavourites('kebab');
        var item = JSON.parse(window.localStorage.getItem('kebab:favourites'));        
        storage.removeFromFavourites('kebab:favourites');
        item = window.localStorage.getItem('kebab:favourites');        
        assert.isOk(item === null);
      });
    });
    describe('StorageInterfaceAsync.prototype.getFavourites', () => {
      it('is a StorageInterfaceAsync object method', () => {
        assert.isOk(typeof storage.getFavourites === 'function');
      });
      it('takes no args', () => {
        assert.isOk(storage.getFavourites.length === 0);
      });
      it('returns a promise', () => {
        assert.isOk(storage.getFavourites() instanceof Promise);        
      });
      it('returns favourites array', async () => {
        storage.status.entryCounter += 1;
        storage.addToFavourites('a', 1);
        storage.addToFavourites('b', 2);
        var favs = await storage.getFavourites();
        assert.isOk(favs instanceof Array);
        assert.isOk(favs.length === 2); 
        assert.isOk(favs[0].value === 1);
        assert.isOk(favs[1].value === 2);
        assert.isOk(favs[0].name === 'a');
        assert.isOk(favs[1].name === 'b');
      });
    });
  });
  describe('CoordsFetcher', () => {
    var bus;
    beforeEach(() => {
      bus = new EventBus();
    });
    it('is a function', () => {
      assert.isOk(typeof CoordsFetcher === 'function');
    });
    it('is a constructor', () => {
      assert.isOk(new CoordsFetcher() instanceof CoordsFetcher);
    });
    describe('CoordsFetcher.prototype.getCoords', () => {
      var fetcher;
      var key = '' 
      beforeEach(() => {
        key = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';
        fetcher = new CoordsFetcher(bus, key);
      });
      it('is CoordsFetcher object method', () => {
        assert.isOk(typeof fetcher.getCoords === 'function');
      });
      it('returns a promise', async () => {
        var res = await fetcher.getCoords();
        assert.isOk(fetcher.getCoords() instanceof Promise);
      });
      it('returns fetched coords', async () => {
        var result = await fetcher.getCoords('Minsk');
        assert.isOk(result instanceof Object);
        assert.isOk(result.lat == '53.90453979999999');
        assert.isOk(result.lng == '27.5615244');
      });
    });
  });
  describe('WeatherFetcher', () => {
    var bus; 
    beforeEach(() => {
      bus = new EventBus();
    });
    it('it is a function', () => {
      assert.isOk(typeof WeatherFetcher === 'function');
    });
    it('is a constructor', () => {
      assert.isOk(new WeatherFetcher() instanceof WeatherFetcher);
    });
    describe('WeatherFetcher.prototype.fetchWeather', () => {
      var fetcher;
      var key;
      beforeEach(() => {
        key = 'd113af5f82393ef553f48314ae9f42e8';
        fetcher = new WeatherFetcher(bus, key); 
      });
      it('is a WeatherFetcher instance method', () => {
        assert.isOk(typeof fetcher.fetchWeather === 'function');
      });
    });
  });
});

mocha.run();
