'use strict';

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
mocha.setup('bdd');
var assert = chai.assert;

describe('compileTemplate', () => {
  var tpl = '{{name}} is {{age}} years old';
  var el = document.createElement('div');
  var template = compileTemplate(tpl);

  it('функция', () => {
    assert.isOk(typeof compileTemplate === 'function');
  });
  it('возвращает функцию', () => {
    assert.isOk(typeof template === 'function');
  });
  it('принимает html-элемент аргументом', () => {
    template(el, { name: 'Bob', age: 33 });
    assert.isOk(el.innerHTML.trim() !== '');
  });
  it('записывает результат в полученный html-элемент', () => {
    template(el, { name: 'Bob', age: 33 });
    assert.isOk(el.innerHTML === 'Bob is 33 years old');
  });
  it('результат, записанный в html-элемент, соответствует переданной строке', () => {
    template(el, { name: 'Bob', age: 33 });
    var tpl2 = tpl.replace(/{{name}}/, 'Bob').replace(/{{age}}/, 33);
    assert.isOk(el.innerHTML === 'Bob is 33 years old');
  });
});

describe('EventBus', () => {
  it('функция', () => {
    assert.isOk(typeof EventBus === 'function');
  });
  it('EventBus.on - функция', () => {
    assert.isOk(typeof EventBus.prototype.on === 'function');
  });
  it('EventBus.off - функция', () => {
    assert.isOk(typeof EventBus.prototype.off === 'function');
  });
  it('EventBus.trigger - функция', () => {
    assert.isOk(typeof EventBus.prototype.trigger === 'function');
  });
  it('EventBus.once - функция', () => {
    assert.isOk(typeof EventBus.prototype.once === 'function');
  });
  it('EventBus.on добавляет слушателей события', () => {
    var event = new EventBus();
    var a = 2;

    function addNum(n) {
      return n + a;
    }

    assert.isOk(event.listeners.add === undefined);
    event.on('add', addNum);
    assert.isOk(event.listeners.add.length === 1);
  });

  it('EventBus.trigger вызывает событие у добавленных слушателей', () => {
    var event = new EventBus();
    var a = 4;

    function addNum(n) {
      return (a = a + n);
    }

    event.on('add', addNum);
    event.trigger('add', 5);
    assert.isOk(a === 9);
  });

  it('EventBus.off удаляет слушателя события', () => {
    let event = new EventBus();
    var a = 4;

    function addNum(n) {
      return (a = a + n);
    }

    assert.isOk(event.listeners.add === undefined);
    event.on('add', addNum);
    assert.isOk(event.listeners.add.length === 1);
    event.off('add', addNum);
    assert.isOk(event.listeners.add.length === 0);
  });

  it('EventBus.once срабатывает только 1 раз', () => {
    var event = new EventBus();
    var a = 4;

    function addNum(n) {
      return (a = a + n);
    }
    assert.isOk(event.listeners.add === undefined);
    event.once('add', addNum);
    assert.isOk(event.listeners.add.length === 1);
    event.trigger('add', 6);
    assert.isOk(a === 10);
    event.trigger('add', 5);
    assert.isNotOk(a === 15);
    assert.isOk(a === 10);
  });
});

describe('Router', () => {
  var index = document.createElement('a');
  index.setAttribute('href', '#');
  var city = document.createElement('a');
  city.setAttribute('href', '#city=Minsk');
  var about = document.createElement('a');
  about.setAttribute('href', '#about');
  var p = document.createElement('p');
  p.innerHTML = '';

  var router = new Router({
    routes: [
      {
        name: 'index',
        match: '',
        onBeforeEnter: () => (p.innerHTML += 'onBeforeEnter index '),
        onEnter: () => (p.innerHTML += 'onEnter index '),
        onLeave: () => (p.innerHTML += 'onLeave index ')
      },
      {
        name: 'city',
        match: /city=(.+)/,
        onBeforeEnter: city => console.log(`onBeforeEnter city:${city}`),
        onEnter: city => console.log(`onEnter city:${city}`),
        onLeave: city => console.log(`onLeave city:${city}`)
      },
      {
        name: 'about',
        match: text => text === 'about',
        onBeforeEnter: () => console.log(`onBeforeEnter about`),
        onEnter: () => {
          console.log(`onEnter about`);
        },
        onLeave: () => {
          console.log(`onLeave about`);
        }
      }
    ]
  });

  it('Router - функция', () => {
    assert.isOk(typeof Router === 'function');
  });
  it('router.handleUrl - функция', () => {
    assert.isOk(typeof router.handleUrl === 'function');
  });
  it('правильно переключает страницы', () => {
    assert.isOk((window.location.hash = '#'));
    city.click();
    assert.isOk((window.location.hash = '#city=Minsk'));
    about.click();
    assert.isOk((window.location.hash = '#about'));
    index.click();
    assert.isOk((window.location.hash = '#'));
  });
});
