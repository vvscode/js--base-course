'use strict';

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
mocha.setup('bdd');
var assert = chai.assert;

describe('Template engine', () => {
  it('is a function', () => assert.isOk(typeof (compileTemplate) === 'function'));
  it('returns function', () => assert.isOk(typeof (compileTemplate()) === 'function'));
  it('works with simple objects', () => {
    var tpl = '{{name}} {{age}}';
    var data = {name: 'Bob', age: 10};
    var el = {};
    compileTemplate(tpl)(el, data);
    assert.isOk(el.innerHTML === 'Bob 10');
  });
  it('works with string property names', () => {
    var tpl = '{{last name}} {{first-name}} {{number1}}';
    var data = {'first-name': 'Peter', 'last name': 'Petrov', 'number1': 10};
    var el = {};
    compileTemplate(tpl)(el, data);
    assert.isOk(el.innerHTML === 'Petrov Peter 10');
  });
  it('works with nested objects', () => {
    var tpl = '{{name}} {{age}} {{creditCard.number}} {{creditCard.service.name}}';
    var data = {
      name: 'Bob',
      age: 10,
      creditCard: {
        number: 12345,
        service: {
          name: 'serviceName',
          firm: 'firmName',
        },
      },
    };
    var el = {};
    compileTemplate(tpl)(el, data);
    assert.isOk(el.innerHTML === 'Bob 10 12345 serviceName');
  });
});

describe('EventBus', () => {
  it('is a function', () => assert.isOk(typeof (EventBus) === 'function'));
  it('has .on method', () => assert.isOk(typeof ((new EventBus()).on) === 'function'));
  it('has .off method', () => assert.isOk(typeof ((new EventBus()).off) === 'function'));
  it('has .trigger method', () => assert.isOk(typeof ((new EventBus()).trigger) === 'function'));
  it('has .once method', () => assert.isOk(typeof ((new EventBus()).once) === 'function'));
  it('.trigger calls handler', () => {
    var a = 0;
    var eb = new EventBus();
    assert.isOk(a === 0, 'initialize state');
    eb.on('a', () => a++);
    assert.isOk(a === 0, 'a has not been incremented');
    eb.trigger('a');
    assert.isOk(a === 1, 'a has been incremented');
  });
  it('.trigger calls handler with several arguments', () => {
    var a = 0;
    var eb = new EventBus();
    assert.isOk(a === 0, 'initialize state');
    eb.on('a', (x, y) => a += x * y);
    assert.isOk(a === 0, 'a has not been incremented');
    eb.trigger('a', 2, 2);
    assert.isOk(a === 4, 'a has been incremented');
  });
  it('works with different events', () => {
    var a = 0;
    var b = 0;
    var eb = new EventBus();
    assert.isOk(a === 0 && b === 0, 'initialize state');
    eb.on('a', (x) => a += x);
    eb.on('b', (x) => b += x);
    assert.isOk(a === 0, 'a has not been incremented');
    assert.isOk(b === 0, 'a has not been incremented');
    eb.trigger('a', 2);
    assert.isOk(a === 2, 'a has been incremented');
    assert.isOk(b === 0, 'a has not been incremented');
    eb.trigger('b', 3);
    assert.isOk(a === 2, 'a has not been incremented');
    assert.isOk(b === 3, 'a has been incremented');
  });
  it('works with multiple handlers', () => {
    var a = 0;
    var eb = new EventBus();
    assert.isOk(a === 0, 'initialize state');
    eb.on('a', (x) => a += x);
    eb.on('a', (x) => a += x * 2);
    assert.isOk(a === 0, 'a has not been incremented');
    eb.trigger('a', 2);
    assert.isOk(a === 6, 'a has been incremented');
  });
  it('.off removes one handler', () => {
    var a = 0;
    var eb = new EventBus();
    var func = () => a++;
    assert.isOk(a === 0, 'initialize state');
    eb.on('a', func);
    eb.trigger('a');
    assert.isOk(a === 1, 'a has been changed');
    eb.off('a', func);
    eb.trigger('a');
    assert.isOk(a === 1, 'a has not been changed');
  });
  it('.off removes all handlers', () => {
    var a = 0;
    var eb = new EventBus();
    assert.isOk(a === 0, 'initialize state');
    eb.on('a', () => a++);
    eb.on('a', () => a++);
    eb.trigger('a');
    assert.isOk(a === 2, 'a has been changed');
    eb.off('a');
    eb.trigger('a');
    assert.isOk(a === 2, 'a has not been changed');
  });
  it('.once fulfills exactly one time with arguments', () => {
    var a = 0;
    var eb = new EventBus();
    assert.isOk(a === 0, 'initialize state');
    eb.once('a', (x, y) => a += x + y);
    eb.trigger('a', 1, 2);
    assert.isOk(a === 3, 'a has been changed');
    eb.trigger('a', 1, 2);
    assert.isOk(a === 3, 'a has not been changed');
  });
});

describe('Router', () => {
  var a = 0;

  var asyncResolveFunc = function(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        a += x;
        resolve();
      }, 50);
    });
  };

  var asyncRejectFunc = function(x) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        a += x;
        reject();
      }, 50);
    });
  };

  var routes = [
    {
      name: '1',
      match: '1',
      onBeforeEnter: () => a++,
      onEnter: () => a++,
      onLeave: () => a++,
    },
    {
      name: '2',
      match: /x=(\d)/,
      onBeforeEnter: (regexMatch) => a += +regexMatch[1],
      onEnter: (regexMatch) => a += +regexMatch[1],
      onLeave: (regexMatch) => a += +regexMatch[1],
    },
    {
      name: '3',
      match: (x) => x === 'value',
      onBeforeEnter: () => a++,
      onEnter: () => a++,
      onLeave: () => a++,
    },
    {
      name: 'oneByOneCallHandlers-oldUrl',
      match: 'oneByOneCallHandlers-oldUrl',
      onBeforeEnter: () => asyncResolveFunc(1),
      onEnter: () => asyncResolveFunc(2),
      onLeave: () => asyncResolveFunc(3),
    },
    {
      name: 'oneByOneCallHandlers-newUrl',
      match: 'oneByOneCallHandlers-newUrl',
      onBeforeEnter: () => asyncResolveFunc(1),
      onEnter: () => asyncResolveFunc(2),
      onLeave: () => asyncResolveFunc(3),
    },
    {
      name: 'rejectOnLeave',
      match: 'rejectOnLeave',
      onBeforeEnter: () => asyncResolveFunc(1),
      onEnter: () => asyncResolveFunc(2),
      onLeave: () => asyncRejectFunc(3),
    },
    {
      name: 'rejectOnBeforeEnter',
      match: 'rejectOnBeforeEnter',
      onBeforeEnter: () => asyncRejectFunc(1),
      onEnter: () => asyncResolveFunc(2),
      onLeave: asyncResolveFunc(3),
    },
    {
      name: 'rejectOnEnter',
      match: 'rejectOnEnter',
      onBeforeEnter: () => asyncResolveFunc(1),
      onEnter: () => asyncRejectFunc(2),
      onLeave: asyncResolveFunc(3),
    },
  ];
  var eventBus = new EventBus();
  var router = new Router(routes, eventBus);

  it('is a function', () => assert.isOk(typeof (Router) === 'function'));
  it('has .init method', () => assert.isOk(typeof ((new Router()).init) === 'function'));
  it('has .handleUrl method', () => assert.isOk(typeof ((new Router()).handleUrl) === 'function'));
  it('handlers fulfill asynchronously', (done) => {
    a = 0;
    eventBus.trigger('changeUrl', '1', 'x=2');
    assert(a === 0, 'a was not changed');
    a++;
    assert(a === 1, 'a was changed synchronously');
    setTimeout(() => assert.isOk(a === 6, 'a was changed asynchronously'), 0);
    setTimeout(done, 0);
  });
  it('handlerUrl fulfills with routes with string and regex matches', (done) => {
    a = 0;
    eventBus.trigger('changeUrl', '1', 'x=2');
    setTimeout(() => assert.isOk(a === 5, 'a has been incremented'), 0);
    setTimeout(done, 0);
  });
  it('handlerUrl fulfills with routes with regex and function matches', (done) => {
    a = 0;
    eventBus.trigger('changeUrl', 'x=2', 'value');
    setTimeout(() => assert.isOk(a === 4, 'a has been incremented'), 0);
    setTimeout(done, 0);
  });
  it('makes several jumps', (done) => {
    a = 0;
    setTimeout(() => eventBus.trigger('changeUrl', '1', 'x=2'), 0);
    setTimeout(() => assert.isOk(a === 5, 'a has been incremented'), 0);
    setTimeout(() => eventBus.trigger('changeUrl', 'x=2', '1'), 0);
    setTimeout(() => assert.isOk(a === 9, 'a has been incremented'), 0);
    setTimeout(done, 0);
  });
  it('handlers fulfill one by one', (done) => {
    a = 0;
    setTimeout(() => eventBus.trigger('changeUrl', 'oneByOneCallHandlers-oldUrl', 'oneByOneCallHandlers-newUrl'), 0);
    setTimeout(() => assert.isOk(a === 0, 'a has not been incremented'), 0);
    setTimeout(() => assert.isOk(a === 3, 'onLeave handler has fulfilled'), 75);
    setTimeout(() => assert.isOk(a === 4, 'onBeforeEnter handler has fulfilled'), 125);
    setTimeout(() => assert.isOk(a === 6, 'onEnter handler has fulfilled'), 175);
    setTimeout(done, 200);
  });
  it('handlers do not fulfill after reject in onLeave', (done) => {
    a = 0;
    setTimeout(() => eventBus.trigger('changeUrl', 'rejectOnLeave', 'oneByOneCallHandlers-newUrl'), 0);
    setTimeout(() => assert.isOk(a === 0, 'a has not been incremented'), 0);
    setTimeout(() => assert.isOk(a === 3, 'onLeave handler has fulfilled with rejected state'), 75);
    setTimeout(() => assert.isOk(a === 3, 'onBeforeEnter handler has not fulfilled'), 125);
    setTimeout(() => assert.isOk(a === 3, 'onEnter handler has not fulfilled'), 175);
    setTimeout(done, 200);
  });
  it('handlers do not fulfill after reject in onBeforeEnter', (done) => {
    a = 0;
    setTimeout(() => eventBus.trigger('changeUrl', 'oneByOneCallHandlers-newUrl', 'rejectOnBeforeEnter'), 0);
    setTimeout(() => assert.isOk(a === 0, 'a has not been incremented'), 0);
    setTimeout(() => assert.isOk(a === 3, 'onLeave handler has fulfilled'), 75);
    setTimeout(() => assert.isOk(a === 4, 'onBeforeEnter handler has fulfilled with rejected state'), 125);
    setTimeout(() => assert.isOk(a === 4, 'onEnter handler has not fulfilled'), 175);
    setTimeout(done, 200);
  });
});

mocha.run();
