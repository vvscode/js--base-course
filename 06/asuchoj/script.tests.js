"use strict";
/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

mocha.setup("bdd");
let assert = chai.assert;

describe("Шаблонизатор", function() {
  it('Является функцией', () => {
    assert.isOk(typeof compileTemplate === 'function');
  });
  it('Dозвращает функцию', () => {
    let tpl = 1;
    let template = compileTemplate(tpl);
    assert.isOk(typeof template === 'function');
  });
  it("Получается требуемый результат", function() {
    let tp2 = "{{name}} is {{age}} years old";
    let tp3 = "{{name}} is {{age}} years old. He is {{sex}}. He has {{children}} children";

    let el2 = document.createElement('div');
    let el3 = document.createElement('div');

    let template2 = compileTemplate(tp2);
    let template3 = compileTemplate(tp3);

    template2(el2, { name: 'Bob', age: 33 });
    template3(el3, { name: 'Alex', age: 55, sex: 'man', children: 2});

    assert.equal( el2.innerHTML ,'Bob is 33 years old');
    assert.equal( el3.innerHTML ,'Alex is 55 years old. He is man. He has 2 children');
  });
});

describe("new EventBus", function() {
  let eb;

  beforeEach(() => eb = new EventBus());

  it("EventBus is function", function() {
    assert.isOk( typeof EventBus === 'function');
    assert.isOk( (new EventBus) instanceof EventBus);
  });
  describe('on with trigger', () => {
    it("on is method", function() {
      assert.isOk( typeof eb.on === 'function');
    });
    it("trigger is method", function() {
      assert.isOk( typeof eb.trigger === 'function');
    });
    it('call subscriber', () => {
      let i = 0;
      eb.on('some:event', () => i++);
      eb.trigger('some:event');
      assert.isOk(i === 1);
    });
    it('call subscriber for diff events', () => {
      let i = 0;
      let j = 0;
      eb.on('some:event1', () => i++);
      eb.on('some:event2', () => j++);
      eb.trigger('some:event1');
      eb.trigger('some:event2');
      assert.isOk(i === 1);
      assert.isOk(j === 1);
    });
    it('call multiple subscribers', () => {
      let i = 0;
      let j = 0;
      eb.on('some:event1', () => i++);
      eb.on('some:event1', () => j++);
      eb.trigger('some:event1');
      assert.isOk(i === 1);
    });
    it('call works with standart props', () => {
      let i = 0;
      let j = 0;
      eb.on('toString', () => i++);
      eb.on('toString', () => j++);
      eb.trigger('toString');
      assert.isOk(i === 1);
    });
    it('pass param from trigger', () => {
      let i = 0;
      eb.on('event', (x) => i = i + x);
      eb.trigger('event', 5);
      assert.isOk(i === 5);
    });
    it('pass multiple params from trigger', () => {
      let i = 0;
      eb.on('event', (x, y) => i = '' + i + x +y);
      eb.trigger('event', 5, 6);
      assert.isOk(i === '056');
    });
    it('works with no subscibers', () => {
      eb.trigger('event', 5, 6);
      assert.isOk(true);
    })
  });

  describe("off", function() {

    let cb1 = function(){};
    let cb2 = function(){};


    it("off является методом", function() {
      assert.isOk( typeof eb.off === 'function');
    });

    it( "1. Удаляет только обработчик cb1", function() {
      eb.on('some:event', cb1);
      eb.on('some:event', cb2);
      eb.off('some:event', cb1);
      eb.listeners['some:event'].forEach((b)=>{
        assert.isOk( b !== cb1);
        assert.isOk( b === cb2);
      });
    });

    it("2. Удаляет все обработчики события 'some:event'", function() {
      eb.on('some:event', cb1);
      eb.on('some:event', cb2);
      eb.on('some:event2', cb1);
      eb.off('some:event');
      assert.isOk( !eb.listeners['some:event']);
      assert.isOk( eb.listeners['some:event2']);

    });

    it("3. Удаляет все обработчики cb1 для всех событий", function() {
      eb.on('some:event', cb1);
      eb.on('some:event', cb2);
      eb.on('some:event1', cb1);
      eb.on('some:event1', cb2);
      eb.on('some:event2', cb1);
      eb.on('some:event2', cb2);

      eb.off( null, cb1);

      for( let key in eb.listeners){
        eb.listeners[key].forEach((b)=>{
          assert.isOk( b !== cb1);
          assert.isOk( b === cb2);
        });
      }

    });

    it("4. Удаляет все обратные вызовы в `object`", function() {

      eb.on('some:event', cb1);
      eb.on('some:event1', cb2);

      eb.off();
      assert.isOk( Object.keys( eb.listeners ).length === 0 );
    });
  });

  describe("once", function() {

    it("on is method", function() {
      assert.isOk( typeof eb.once === 'function');
    });

    it("once вызывается один раз для одного метода ", function() {
      let a = 0;
      let cb = function () {
        return a++;
      };

      eb.once('some:event', cb);
      eb.trigger('some:event');
      eb.trigger('some:event');
      eb.trigger('some:event');

      assert.isOk( a ===  1);
    });
  });
  describe (`от Василия`, function () {
    it(`проверка off`, function () {

      let p;

      function User(name) { this.greet = () => { p = name}}
      let u1 = new User('Bob');
      let u2 = new User('Sam');

      eb.on('hello', u1.greet);
      eb.on('hello', u2.greet);
      eb.off('hello', u1.greet);
      eb.trigger('hello');


      assert.isOk( p === 'Sam');

    });
  });
  describe ('tests of Yarmolenka Siarhei', function () {

    it(`how many events - so many function calls`, function() {
      let eb = new EventBus();
      let i = 0;
      function func() {i++;};
      eb.on(`s1`, func);
      eb.on(`s1`, func);
      eb.once(`s2`, func);
      eb.trigger(`s1`);
      assert.equal(i, 2);
      eb.trigger(`s2`);
      assert.equal(i, 3);
    });

    it(`a real example`, function() {
      let str = ``;
      let eb = new EventBus();
      let object = {
        set number(x) {
          eb.trigger(`call${x}`, x);
        }
      };
      function Watcher() {};
      Watcher.prototype.change = function(num) {
        str += num;
      };
      let watcher1 = new Watcher();
      eb.on(`call3`, function(x) {watcher1.change(x);});
      let watcher2 = new Watcher();
      eb.on(`call1`, function(x) {watcher2.change(x);});
      let watcher3 = new Watcher();
      eb.on(`call8`, function(x) {watcher3.change(x);});
      let watcher4 = new Watcher();
      eb.on(`call0`, function(x) {watcher4.change(x);});
      for (let i = 0; i < 10; i++) {
        object.number = i;
      }
      assert.equal(str, `0138`);
    });

    it(`a check metod of vvscode`, function() {
      try {
        let eb = new EventBus();
        let cb = function(){null};

        eb.on(`some`, cb);
        eb.off(`some`, cb);

      } catch (error) {
        console.log(error);
        assert.equal(1, 0);
      }
      assert.equal(1, 1);
    });
  });
});

describe('Router', () => {

  let arr = {
    routes: [{
      name: 'index',
      match: "",
      onBeforeEnter: () => {console.log('index')},
      onEnter: () => {console.log('index')},
      onLeave: () => {console.log('index')}
    }]
  };

  let router = new Router(arr);

  it('Функция', () => {
    assert.isOk(typeof Router === "function");
  });
  it('Конструктор', () => {
    assert.isOk(router instanceof Router);
  });
  it('Есть метод findNewRoute', () => {
    assert.isOk(typeof router.findNewActiveRoute === "function");
  });
  it('Есть метод hashCheck', () => {
    assert.isOk(typeof router.handleUrl === "function");
  });
  it('Работает при создании без агрументов', () => {
    assert.isOk((new Router()) instanceof Router);
  });
  it('Работает при отсутсвии некоторых методов', (done) => {
    let string = "";
    let myRouter = new Router({
      routes: [{
        name: 'noMethods',
        match: 'noMethods',
        onEnter: () => {
          string += "Enter"
        }
      }]
    });
    setTimeout(done, 50);
    setTimeout(() => myRouter.handleUrl("#noMethods"), 10);
    setTimeout(() => assert.isOk(string === "Enter"), 10);
  });
 it('Верная последовательность выполнения роутов', (done) => {
    let string = "";
    let myRouter = new Router({
      routes: [{
        name: 'checkRout',
        match: 'changeString',
        onLeave: () => {
          string += "Leave"
        },
        onBeforeEnter: () => {
          string += "BeforeEnter"
        },
        onEnter: () => {
          string += "Enter"
        }
      }, {
        name: 'empty',
        match: "",
        onLeave: () => {
          string += "Leave"
        },
        onBeforeEnter: () => {
          string += "BeforeEnter"
        },
        onEnter: () => {
          string = ""
        }
      }]
    });
    setTimeout(done, 10);
    setTimeout(() => myRouter.handleUrl("#"), 10);
    setTimeout(() => myRouter.handleUrl("#changeString"), 10);
    setTimeout(() => assert.isOk(string === "LeaveBeforeEnterEnter"), 10);
  });
  it('Работает со строками', (done) => {
    let string = "";
    let myRouter = new Router({
      routes: [{
        name: 'string',
        match: /string=(.+)/,
        onEnter: (str) => string = str
      }]
    });
    setTimeout(done, 10);
    setTimeout(() => myRouter.handleUrl("#string=helloWorld"), 10);
    setTimeout(() => assert.isOk(string === "helloWorld"), 10);
  });
  it('Работает с функциями', (done) => {
    let string = "";
    let myRouter = new Router({
      routes: [{
        name: 'function',
        match: (text) => text + " and JavaScript",
        onBeforeEnter: (text) => string = text
      }]
    });
    setTimeout(done, 10);
    setTimeout(() => myRouter.handleUrl("#helloWorld"), 10);
    setTimeout(() => assert.isOk(string === "helloWorld and JavaScript"), 10);
  })
});
mocha.run();