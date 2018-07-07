import Menu from '../js/menu.js';

mocha.setup({
  ui: "bdd",
  bail: true
});

const assert = chai.assert;
const $$ = document.querySelector.bind(document);

describe('Menu', function() {
  var el;
  var menu;
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
    var oldUrl = window.location.href;
    el.querySelector('button').click();
    assert.isOk(window.location.hash === '#test');
    window.location.href = oldUrl;
  });
});

mocha.run();
