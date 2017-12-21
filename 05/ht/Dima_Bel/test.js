'use strict';

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
mocha.setup('bdd');
var assert = chai.assert;

describe('EventBus', () => {
  it('функция', () => {
    assert.isOk(typeof EventBus === 'function');
  });
  it('есть on', () => {
    let ev = new EventBus();
    assert.isOk(typeof ev.on === 'function');
  });
  it('есть trigger', () => {
    let ev = new EventBus();
    assert.isOk(typeof ev.trigger === 'function');
  });
  it('есть off', () => {
    let ev = new EventBus();
    assert.isOk(typeof ev.off === 'function');
  });
  it('есть once', () => {
    let ev = new EventBus();
    assert.isOk(typeof ev.once === 'function');
  });
  it('on добавляет новые события ', () => {
    let ev = new EventBus();
    assert.isOk(ev.handlers.length === 0);
    ev.on('newEvent1', () => {
      return x += 1;
    });
    ev.on('newEvent2', () => {
      return x += 1;
    });
    assert.isOk(ev.handlers.length === 2);
    assert.isOk(ev.handlers[1].eventName === 'newEvent2');
  });
  it('trigger вызывает события', () => {
    let ev = new EventBus();
    let x = 0;
    ev.on('newEvent1', () => {
      return x += 1;
    });
    ev.on('newEvent2', () => {
      return x += 1;
    });
    assert.isOk(x === 0);
    ev.trigger('newEvent1');
    assert.isOk(x === 1);
    ev.trigger('newEvent2');
    assert.isOk(x === 2);
  });
  it('off удаляет события', () => {
    let ev = new EventBus();
    let x = 0;
    ev.on('newEvent1', () => {
      return x += 1;
    });
    ev.on('newEvent2', () => {
      return x += 1;
    });
    assert.isOk(x === 0);
    ev.off('newEvent1');
    assert.isOk(x === 0);
    ev.trigger('newEvent1');
    ev.trigger('newEvent2');
    assert.isOk(x === 1);
  });
  it('once добавляет событие, которое вызовется только один раз', () => {
    let ev = new EventBus();
    let x = 0;
    ev.once('newEvent', () => {
      return x += 1;
    });
    assert.isOk(x === 0);
    ev.trigger('newEvent');
    assert.isOk(x === 1);
    ev.trigger('newEvent');
    assert.isOk(x === 1);
  });
});

describe('compileTemplate', () => {
  it('является функцией', () => {
    assert.isOk(typeof compileTemplate === 'function');
  });
  it('возвращает функцию', () => {
    let tpl = 1;
    let template = compileTemplate(tpl);
    assert.isOk(typeof template == 'function');
  });
  it('преобразовывает шаблон в нужную строку', () => {
    let tpl = '{{name}} is {{age}} years old';
    let template = compileTemplate(tpl);
    let el1 = document.createElement('div');
    let el2 = document.createElement('div');
    let exemp1 = template(el1, {name: 'Bob', age: 33});
    let exemp2 = template(el2, {name: 'Jon', age: 28});
    assert.isOk(exemp1 === 'Bob is 33 years old');
    assert.isOk(exemp2 === 'Jon is 28 years old');
  });
});

describe('Router', () => {
  let routs = [
    {
      name: 'index',
      match: '',
      onBeforeEnter: () => console.log('onBeforeEnter index'),
      onEnter: () => console.log('onEnter index'),
      onLeave: () => console.log('onLeave index'),
    },
    {
      name: 'city',
      match: /city=(.+)/,
      onBeforeEnter: (city) => console.log(`onBeforeEnter city:${city}`),
      onEnter: (city) => console.log(`onEnter city:${city}`),
      onLeave: (city) => console.log(`onLeave city:${city}`),
    },
    {
      name: 'about',
      match: (text) => text === 'about',
      onBeforeEnter: () => console.log(`onBeforeEnter about`),
      onEnter: () => console.log(`onEnter about`),
      onLeave: () => console.log(`onLeave about`),
    },
  ];

  let router = new Router(routs);

  it('функция', () => {
    assert.isOk(typeof Router === 'function');
  });
  it('находит нужный роут', () => {
    let url1 = 'router/index.html#about';
    let rout1 = router.findRout(url1);
    assert.isOk(rout1.name === 'about');
    let url2 = 'router/index.html#city=Minsk';
    let rout2 = router.findRout(url2);
    assert.isOk(rout2.name === 'city');
  });
  it('правильно обрабатывает данные из rout', () => {
    let url1 = 'router/index.html#about';
    let url2 = 'router/index.html#';
    console.log('------------------');
    router.handleUrl(url1);
    router.handleUrl(url2);
    
  });
});

mocha.run();

