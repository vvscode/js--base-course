describe('compileTemplate', function () {
  var p = document.createElement('p');
  p.innerHTML = 'Hello! My name is {{name}}. I am {{age}}';
  p.style.display = 'none';
  document.body.insertBefore(p, document.body.firstElementChild);
  var tpl = p.innerHTML;
  var template = compileTemplate(tpl);

  template(document.querySelector('p'), {
    name: 'Bob',
    age: 33
  });

  it('функция', function () {
    return assert.isOk(typeof compileTemplate === 'function');
  });
  it('возвращает функцию', function () {
    return assert.isOk(typeof compileTemplate(null) === 'function');
  });

  it('возвращает преобразованную в текст строку', function () {
    p.innerHTML = 'Hello! My name is {{name}}.I am {{age}}';
    tpl = p.innerHTML;
    template = compileTemplate(tpl);
    template(document.querySelector('p'), {
      name: 'Bob',
      age: 33
    });
    return assert.isOk(p.innerHTML.indexOf('{') === -1 && p.innerHTML.indexOf('}') === -1);
  });

  it('работает только с шаблонами в фигурных скобках', function () {
    p.innerHTML = 'Hello! My name is [[name]].I am [[age]]';
    tpl = p.innerHTML;
    template = compileTemplate(tpl);
    template(document.querySelector('p'), {
      name: 'Bob',
      age: 33
    });
    return assert.isOk(tpl.indexOf('Bob') === -1);
  });
  it('работает только с шаблонами в двойных фигурных скобках', function () {
    p.innerHTML = 'Hello! My name is {name}.I am {age}';
    tpl = p.innerHTML;
    template = compileTemplate(tpl);
    template(document.querySelector('p'), {
      name: 'Bob',
      age: 33
    });
    return assert.isOk(tpl.indexOf('Bob') === -1);
  });
});
describe('EventBus', function () {
  var evBus = new EventBus();
  it('функция', function () {
    return assert.isOk(typeof EventBus === 'function');
  });

  it('добавляет события с обработчиками на каждое', function () {
    evBus.on('click', function () {
      return 1;
    });
    evBus.on('click', function () {
      return 2;
    });
    evBus.on('click', function () {
      return 3;
    });
    evBus.on('customProp', function () {
      return 1;
    });
    evBus.on('customProp', function () {
      return 2;
    });

    return assert.isOk(evBus.handlers['click'].length == 3);
    return assert.isOk(evBus.handlers['customProp'].length == 2);
  });

  it('удаляет события (по ссылке)', function () {
    function foo() {
      return 4;
    }
    evBus.on('foo', foo);
    assert.isOk(evBus.handlers['foo'].length == 1);
    evBus.off('foo', foo);
    assert.isOk(evBus.handlers['foo'].length == 0);
  });

  it('вызывает имеющиеся события', function () {
    var trig = 0;
    evBus.on('trig', function () {
      trig = 1;
    });
    evBus.trigger('trig');

    assert.isOk(trig == 1);
  });

  it('вызывает событие лишь 1 раз', function () {
    evBus.once('count', function () {
      return null;
    });
    assert.isOk(evBus.handlers.count);
    assert.isOk(evBus.handlers.count.length);
    evBus.trigger('count');
    assert.isOk(evBus.handlers.count.length == 0);

  });
  
});



const $$ = document.querySelector.bind(document);
const sleep = x => new Promise(resolve => setTimeout(resolve, x));

describe("Router", () => {
  it("is function and constructor", () => {
    assert.equal(typeof Router, "function");
    assert.isOk(new Router() instanceof Router);
  });
  
  it('set .routes from options', () => {
    var routes = [];
    var router = new Router({ routes: routes });
    assert.equal(router.routes, routes);
  });

  describe(".handleUrl", () => {
    it("is method (on prototype)", () => {
      assert.equal(typeof new Router().handleUrl, "function");
      assert.equal(new Router().handleUrl, Router.prototype.handleUrl);
    });

    it("called on start with current hash", () => {
      window.location.hash = "some string";
      var handleUrl = Router.prototype.handleUrl;
      let param = null;
      Router.prototype.handleUrl = url => (param = url);
      new Router();
      Router.prototype.handleUrl = handleUrl;
      assert.equal(param, "some string");
    });

    it("called on hashchange with current hash", done => {
      window.location.hash = "some string";
      var handleUrl = Router.prototype.handleUrl;
      let param = null;
      Router.prototype.handleUrl = url => (param = url);
      new Router();
      window.location.hash = "some new string";
      setTimeout(() => {
        Router.prototype.handleUrl = handleUrl;
        done(assert.equal(param, "some new string"));
      }, 150);
    });

    it("calls .onBeforeEnter on matched route from `this.routes` with param", done => {
      var x = 0;
      var param = null;
      var o = {
        routes: [
          {
            match: "string",
            onBeforeEnter: url => {
              x++;
              param = url;
            }
          }
        ]
      };
      window.location.hash = "string";
      Router.prototype.handleUrl.call(o, "string");
      setTimeout(() => {
        assert.equal(x, 1);
        assert.equal(param, "string");
        done();
      }, 100);
    });
    it("calls .onEnter on matched route from `this.routes` with param", done => {
      var x = 0;
      var param = null;
      var o = {
        routes: [
          {
            match: "string",
            onEnter: url => {
              x++;
              param = url;
            }
          }
        ]
      };
      window.location.hash = "string";
      Router.prototype.handleUrl.call(o, "string");
      setTimeout(() => {
        assert.equal(x, 1);
        assert.equal(param, "string");
        done();
      }, 100);
    });
    it("calls .onEnter on matched route from `this.routes` with param", done => {
      var x = [];
      var o = {
        routes: [
          {
            match: "string",
            onBeforeEnter: () => {
              x.push("onBeforeEnterStart");
              return new Promise(resolve => {
                setTimeout(() => {
                  x.push("onBeforeEnterEnd");
                  resolve();
                }, 100);
              });
            },
            onEnter: () => {
              x.push("onEnterStart");
              return new Promise(resolve => {
                setTimeout(() => {
                  x.push("onEnterEnd");
                  resolve();
                }, 100);
              });
            }
          }
        ]
      };
      Router.prototype.handleUrl.call(o, "string");
      setTimeout(() => {
        assert.deepEqual(x, [
          "onBeforeEnterStart",
          "onBeforeEnterEnd",
          "onEnterStart",
          "onEnterEnd"
        ]);
        done();
      }, 400);
    });

    it("saves route as .prevRoute", async () => {
      var firstRoute = { match: "string" };
      var secondRoute = { match: "another string" };
      var o = {
        routes: [firstRoute, secondRoute]
      };
      try {
        Router.prototype.handleUrl.call(o, firstRoute.match);
        await sleep(100);
        assert.equal(o.prevRoute, firstRoute);

        Router.prototype.handleUrl.call(o, secondRoute.match);
        await sleep(100);
        assert.equal(o.prevRoute, secondRoute);
         // done();
      } catch (e) {
        return Promise.reject(e);
      }
    });

    it("calls .onLeave (with params) if .prevRoute presented", async () => {
      var x = [];
      var firstRoute = { match: "string", onLeave: url => x.push(url) };
      var secondRoute = { match: "another string" };
      var o = {
        routes: [firstRoute, secondRoute]
      };
      try {
        Router.prototype.handleUrl.call(o, firstRoute.match);
        await sleep(100);
        Router.prototype.handleUrl.call(o, secondRoute.match);
        await sleep(100);
        assert.deepEqual(x, [firstRoute.match]);
      } catch (e) {
        return Promise.reject(e);
      }
    });

    it("calls .onLeave -> .onBeforeEnter -> .onEnter", async () => {
      var x = [];
      var o = {
        routes: [
          {
            match: "string",
            onLeave: () => {
              x.push("onLeaveStart");
              return new Promise(resolve => {
                setTimeout(() => {
                  x.push("onLeaveEnd");
                  resolve();
                }, 20);
              });
            }
          },
          {
            match: "another string",
            onBeforeEnter: () => {
              x.push("onBeforeEnterStart");
              return new Promise(resolve => {
                setTimeout(() => {
                  x.push("onBeforeEnterEnd");
                  resolve();
                }, 20);
              });
            },
            onEnter: () => {
              x.push("onEnterStart");
              return new Promise(resolve => {
                setTimeout(() => {
                  x.push("onEnterEnd");
                  resolve();
                }, 20);
              });
            }
          }
        ]
      };
      Router.prototype.handleUrl.call(o, "string");
      await sleep(50);
      Router.prototype.handleUrl.call(o, "another string");
      try {
        await sleep(100);
        assert.deepEqual(JSON.stringify(x), JSON.stringify([
          "onLeaveStart",
          "onLeaveEnd",
          "onBeforeEnterStart",
          "onBeforeEnterEnd",
          "onEnterStart",
          "onEnterEnd"
        ]));
      } catch (e) {
        return Promise.reject(e);
      }
    });
  });

});

