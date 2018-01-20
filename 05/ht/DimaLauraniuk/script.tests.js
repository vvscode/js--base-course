"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
mocha.setup('bdd');
var assert = chai.assert;

describe("CompileTemplate tests", function () {
  it("is function", function () {
    return assert.isOk(typeof compileTemplate() === "function");
  });
  it("return function", function () {
    var tpl = 1;
    var template = compileTemplate(tpl);
    assert.isOk(typeof template === "function");
  });
  it("template заменяет вхождения корректно", function () {
    var tpl = "{{name}} is {{age}} years old.";
    var element = document.createElement('div');
    var template = compileTemplate(tpl);
    template(element, { name: "Bob", age: 33 });
    assert.isOk(element.innerHTML = "Bob is 33 years old.");
  });
  it("template заменяет многочисленные вхождения поля в шаблоне корректно", function () {
    var tpl = "{{name}} is {{age}} years old. {{name}} lives in London. {{name}} like to travel a lot too.";
    var element = document.createElement('div');
    var template = compileTemplate(tpl);
    template(element, { name: "Bob", age: 33 });
    assert.isOk(element.innerHTML = "Bob is 33 years old. Bob lives in London. Bob like to travel a lot too.");
  });
  it("template игнорирует поля в шаблоне, не являющиеся ключами в объекте", function () {
    var tpl = "{{name}} is {{age}} years old. {{name}} lives in {{city}}.";
    var element = document.createElement('div');
    var template = compileTemplate(tpl);
    template(element, { name: "Bob", age: 33 });
    assert.isOk(element.innerHTML = "Bob is 33 years old. Bob lives in {{city}}.");
  });
  it("template работает корректно с пустым объектом", function () {
    var tpl = "{{name}} is {{age}} years old.";
    var element = document.createElement('div');
    var template = compileTemplate(tpl);
    template(element);
    assert.isOk(element.innerHTML = "Bob is 33 years old.");
  });
});

describe('EventBus tests', () => {
  it('EventBus is function', () => assert.isOk(typeof EventBus === 'function'));
  describe('trigger', () => {
    it('trigger is method', () => assert.isOk(typeof (new EventBus).trigger === 'function'));
  });
  describe('on', () => {
    it('on is method', () => assert.isOk(typeof (new EventBus).on === 'function'));
    it('on takes 2 params', () => assert.isOk((new EventBus).on.length === 2));
  });
  describe('on vs trigger', () => {
    it('trigger calls hanlders from .on', () => {
      var a = 1;
      var eventBus = new EventBus();
      eventBus.on('some:event', () => a++);
      assert.isOk(a === 1, 'on do not call cb without trigger');
      eventBus.trigger('some:event');
      assert.isOk(a === 2, 'trigger calls cb from .on');
    });

    it('trigger pass params into cb', () => {
      var a = 1;
      var eventBus = new EventBus();
      eventBus.on('some:event', (x) => a = a + x);
      assert.isOk(a === 1, 'on do not call cb without trigger');
      eventBus.trigger('some:event', 4);
      assert.isOk(a === 5, 'trigger calls cb from .on');
    });

    it('trigger calls all cbs', () => {
      var a = 1;
      var b = 1;
      var eventBus = new EventBus();
      eventBus.on('some:event', (x) => a = a + x);
      eventBus.on('some:event', (x) => b = b + x);
      assert.isOk(a === 1, 'on do not call cb without trigger');
      assert.isOk(b === 1, 'on do not call cb without trigger');
      eventBus.trigger('some:event', 4);
      assert.isOk(a === 5, 'trigger calls cb from .on');
      assert.isOk(b === 5, 'trigger calls cb from .on');
    });

    it('trigger works fine with no cbs', () => {
      var eventBus = new EventBus();
      eventBus.trigger('some:event', 4);
      assert.isOk(1 === 1, '.trigger does not break code with no cbs');
    });

    it('works fine with no functions as cb', () => {
      var eventBus = new EventBus();
      var a = 1;
      eventBus.on('some:event', () => a++);
      eventBus.on('some:event', 'some string');
      eventBus.trigger('some:event', 4);
      assert.isOk(a === 2, '.trigger does not break code with non-function param');
    });
  });
  describe('off', () => {
    it('off is method', () => assert.isOk(typeof (new EventBus).off === 'function'));

    it('off removes event from event listeners', () => {
      var a = 1;
      var eventBus = new EventBus();
      var cb = () => a++;
      eventBus.on('some:event', cb);
      eventBus.off('some:event', cb);
      eventBus.trigger('some:event');
      assert.isOk(a === 1, '.off has worked: ' + a + '===' + 1);
    });
  });
  describe('once', () => {
    it('once is method', () => assert.isOk(typeof (new EventBus).once === 'function'));
    it('once method works only 1 time', () => {
      var a = 1;
      var eventBus = new EventBus();
      eventBus.once('some:event', (x) => a = a + x);
      assert.isOk(a === 1);
      eventBus.trigger('some:event', 3);
      assert.isOk(a === 4);
      eventBus.trigger('some:event', 3);
      assert.isOk(a === 4);
    });
    it('once works correct with more then >1 handlers', () => {
      var a = 1;
      var b = 2;
      var c = 3;
      var eventBus = new EventBus();
      eventBus.on('some:event', (x) => a = a + x);
      eventBus.on('some:event', (x) => b = b + x);
      eventBus.once('some:event', (x) => c = c + x);
      eventBus.trigger('some:event', 4);
      assert.isOk(a === 5);
      assert.isOk(b === 6);
      assert.isOk(c === 7);
      eventBus.trigger('some:event', 4);
      assert.isOk(a === 9);
      assert.isOk(b === 10);
      assert.isOk(c === 7);
    });
  });
});

describe('Router tests', () => {
  it('Router is a function', () => {
    assert.isOk(typeof (Router) === 'function');
  });
  it('Constructor is instanceof Router', () => {
    assert.isOk((new Router()) instanceof Router);
  });
  it('Router works correct with string patterns', function (done) {
    window.location.href.substr(0, window.location.href.indexOf('#'));
    var routes = [{
      match: 'string',
      onEnter: () => a++
    }];
    var router = new Router(routes);
    var a = 1;
    assert.isOk(a === 1);
    window.location.hash = 'string';
    setTimeout(function () {
      assert.isOk(a === 2);
      done();
    }, 0);
  });
  it('Router works correct with function patterns', function (done) {
    window.location.href.substr(0, window.location.href.indexOf('#'));
    var routes = [{
      match: (text) => text === 'about',
      onEnter: () => a += 2
    }];
    var router = new Router(routes);
    var a = 1;
    assert.isOk(a === 1);
    window.location.hash = 'about';
    setTimeout(function () {
      assert.isOk(a === 3);
      done();
    }, 0);
  });
  it('Router works correct with RegExp patterns', function (done) {
    window.location.href.substr(0, window.location.href.indexOf('#'));
    var routes = [{
      match: /cit./,
      onEnter: () => a += 3
    }];
    var router = new Router(routes);
    var a = 1;
    assert.isOk(a === 1);
    window.location.hash = 'city';
    setTimeout(function () {
      assert.isOk(a === 4);
      done();
    }, 0);
  });
  it('Router works correct with several patterns combination', function (done) {
    window.location.href.substr(0, window.location.href.indexOf('#'));
    var routes = [{
      name: 'about',
      match: (text) => text === 'about',
      onBeforeEnter: () => a += 'AboutOnBeforeEnter',
      onEnter: () => a += 'AboutOnEnter',
      onLeave: () => a += 'AboutOnLeave'
    },
    {
      name: 'city',
      match: 'city',
      onBeforeEnter: () => a += 'CityOnBeforeEnter',
      onEnter: () => a += 'CityOnEnter',
      onLeave: () => a += 'CityOnLeave'
    }];
    var router = new Router(routes);
    var a = '';
    assert.isOk(a === '');
    window.location.hash = 'city';
    window.location.hash = 'about';
    setTimeout(function () {
      assert.isOk(a === 'CityOnBeforeEnterCityOnEnterCityOnLeaveAboutOnBeforeEnterAboutOnEnter');
      done();
    }, 0);
  });
});
mocha.run();