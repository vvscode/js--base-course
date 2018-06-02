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
  var button = document.createElement('button');
  var input = document.createElement('input');
  var input2 = document.createElement('input');
  var input3 = document.createElement('input');
  button.id = 'button';
  input.id = 'input';
  input2.id = 'input2';
  input3.id = 'input3';

  function AddListenerForAdd(event, el) {
    event.on('add', data => {
      el.value = data;
    });
  }

  function RemoveListenerForAdd(event, elButton, elInput) {
    elButton.addEventListener('click', () => {
      event.off('add', data => {
        elInput.value = '';
      });
    });
  }

  function SetNum(event, elButton, elInput) {
    elButton.addEventListener('click', e => {
      event.trigger('add', elInput.value);
    });
  }

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
    let event = new EventBus();

    assert.isOk(event.listeners.add === undefined);
    new AddListenerForAdd(event, input2);
    new AddListenerForAdd(event, input3);
    assert.isOk(event.listeners.add !== undefined);
    assert.isOk(event.listeners.add.length === 2);
  });
  it('EventBus.trigger вызывает событие у добавленных слушателей', () => {
    let event = new EventBus();
    new AddListenerForAdd(event, input2);
    new AddListenerForAdd(event, input3);
    input.value = '3';
    let num = new SetNum(event, button, input);
    button.click();
    assert.isOk(input2.value === '3');
    assert.isOk(input3.value === '3');
  });
  it('EventBus.off удаляет слушателя события', () => {
    let event = new EventBus();
    new AddListenerForAdd(event, '#input3');
    input.value = '3';
    let length = event.listeners.add.length;
    assert.isOk(length === 1);

    var delEvent3 = document.createElement('button');
    delEvent3.id = 'delEvent';
    delEvent3.innerHTML = 'del';
    let delListener = new RemoveListenerForAdd(event, delEvent3, input3);
    delEvent3.click();
    assert.isOk(length - 1 === 0);
  });
  it('EventBus.once срабатывает только 1 раз', () => {
    let onceButton = document.createElement('button');
    onceButton.id = 'onceButton';
    onceButton.innerHTML = 'once';
    input.value = 4;
    function OnceListenerForAdd(event, elButton, elInput) {
      elButton.addEventListener('click', e => {
        event.once('add', data => {
          elInput.value = data;
        });
      });
    }

    let event = new EventBus();
    let once = new OnceListenerForAdd(event, onceButton, input2);
    onceButton.click();
    assert.isOk(event.listeners.add.length === 1);
    event.trigger('add', input.value);
    assert.isOk(input.value === input2.value);
    input.value = 5;
    event.trigger('add', input.value);
    assert.isOk(input.value !== input2.value);
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
