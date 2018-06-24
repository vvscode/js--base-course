'use strict';
 /* global EventBus, describe, it, assert, beforeEach  */

mocha.setup({
  ui: "bdd",
  bail: true
});

const assert = chai.assert;
const $$ = document.querySelector.bind(document);
const sleep = x => new Promise(resolve => setTimeout(resolve, x));
describe('EventBus', function() {
  it('is a function', function() {
    assert.isOk(typeof EventBus === 'function');
  });
  it('is a constructor', function() {
    assert.isOk(new EventBus() instanceof EventBus);
  });
  describe('methods', () => {
    var eb;
    beforeEach(() => eb = new EventBus());
    
    describe('.on', function() {
       it('a method', () => assert.equal(typeof eb.on, 'function'));
    });
    describe('.off', function() {
      it('a method', () => assert.equal(typeof eb.off, 'function'))
    });
    describe('.trigger', function() {
      it('a method', () => assert.equal(typeof eb.trigger, 'function'))
    });
    describe('.once', function() {
      it('a method', () => assert.equal(typeof eb.once, 'function'))
    });
    
    describe('logic', () => {
      it('calls .on handler by .trigger', () => {
        var a = 0;
        eb.on('some:event', () => a = 1);
        assert.equal(a, 0);
        eb.trigger('some:event');
        assert.equal(a, 1);
      });
      it('works fine for no-handled events', () => {
         eb.trigger('some:event');
      });
      it('hanldes multiple events', () => {
        var x = 0; var y = 0;
        eb.on('x', () => x = 1);
        eb.on('y', () => y = 2);
        eb.trigger('x');
        eb.trigger('y');
        assert.equal(x, 1);
        assert.equal(y, 2);
      });
      it('manages multiple hanlder per one event', () => {
        var x = 0;
        var y = 0;
        eb.on('x', () => x = 1);
        eb.on('x', () => y = 2);
        eb.trigger('x');
        assert.equal(x, 1);
        assert.equal(y, 2);
      });
      it('passes params from .trigger into hanlders', () => {
        var x = [0];
        eb.on('x', (a) => x.push(a));
        eb.trigger('x', 2);
        assert.deepEqual(x, [0, 2]);
      });
      it('unsubscribes by .off call', () => {
        var x = 0;
        var _ = () => x = 1;
        eb.on('x', _);
        eb.off('x', _);
        eb.trigger('x');
        assert.equal(x, 0);
      });
      it('unsubscribe multiple subscriptions', () => {
        var x = 0;
        var _ = () => x = 1;
        eb.on('x', _);
        eb.on('x', _);
        eb.off('x', _);
        eb.trigger('x');
        assert.equal(x, 0);
      });
      it('once handles call only once', () => {
        var x = 0;
        var _ = () => x++;
        eb.once('x', _);
        eb.trigger('x');
        assert.equal(x, 1);
        eb.trigger('x');
        assert.equal(x, 1);
      });
      it('passes params into .once hanlder', () => {
         var x = [0];
         var _ = y => x.push(y);
         eb.once('x', _);
         eb.trigger('x', 4);
         assert.deepEqual(x, [0, 4]);
      });
      it('.off handles correctly', () => {
        var x = 0;
        var y = 0;
        var _ = () => x++;
        eb.on('x', _);
        eb.on('x', () => y++);
        eb.off('x', _);
        eb.trigger('x');
        assert.equal(y, 1);
      });
    });
  });
});

describe("HashRouter", () => {
  it("is function and constructor", () => {
    assert.equal(typeof HashRouter, "function");
    assert.isOk(new HashRouter() instanceof HashRouter);
  });
  
  it('set .routes from options', () => {
    var routes = [];
    var router = new HashRouter({ routes: routes });
    assert.equal(router.routes, routes);
  });

  describe(".handleUrl", () => {
    it("is method (on prototype)", () => {
      assert.equal(typeof new HashRouter().handleUrl, "function");
      assert.equal(new HashRouter().handleUrl, HashRouter.prototype.handleUrl);
    });

    it("called on start with current hash", () => {
      window.location.hash = "some string";
      var handleUrl = HashRouter.prototype.handleUrl;
      let param = null;
      HashRouter.prototype.handleUrl = url => (param = url);
      new HashRouter();
      HashRouter.prototype.handleUrl = handleUrl;
      assert.equal(param, "some string");
    });

    it("called on hashchange with current hash", done => {
      window.location.hash = "some string";
      var handleUrl = HashRouter.prototype.handleUrl;
      let param = null;
      HashRouter.prototype.handleUrl = url => (param = url);
      new HashRouter();
      window.location.hash = "some new string";
      setTimeout(() => {
        HashRouter.prototype.handleUrl = handleUrl;
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
      HashRouter.prototype.handleUrl.call(o, "string");
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
      HashRouter.prototype.handleUrl.call(o, "string");
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
      HashRouter.prototype.handleUrl.call(o, "string");
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
        HashRouter.prototype.handleUrl.call(o, firstRoute.match);
        await sleep(100);
        assert.equal(o.prevRoute, firstRoute);

        HashRouter.prototype.handleUrl.call(o, secondRoute.match);
        await sleep(100);
        assert.equal(o.prevRoute, secondRoute);
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
        HashRouter.prototype.handleUrl.call(o, firstRoute.match);
        await sleep(100);
        HashRouter.prototype.handleUrl.call(o, secondRoute.match);
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
      HashRouter.prototype.handleUrl.call(o, "string");
      await sleep(50);
      HashRouter.prototype.handleUrl.call(o, "another string");
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

  // ------------------------

  describe("findRoute", () => {
    var flag = false;
    var funcParam;
    var str = { match: "string" };
    var regExp = { match: /param=(.+)/ };
    var func = {
      match: url => {
        funcParam = url;
        return flag ? [1, flag, url] : null;
      }
    };
    it("is function", () => {
      assert.equal(typeof findRoute, "function");
    });
    it("takes 2 params", () => assert.equal(findRoute.length, 2));
    it("returns list of nulls by default", () => {
      assert.deepEqual(findRoute([], "some_url"), [null, null]);
    });
    it("able to find route from list by string match", () => {
      assert.deepEqual(findRoute([regExp, str, func], "string"), [
        str,
        "string"
      ]);
    });
    it("able to find route from list by regExp", () => {
      assert.deepEqual(findRoute([regExp, str, func], "param=123"), [
        regExp,
        ["param=123", "123"]
      ]);
    });
    it("able to find route from list by functional match", () => {
      flag = false;
      assert.deepEqual(findRoute([regExp, str, func], "xxxx"), [null, null]);
      flag = true; // now func returns list / truethly value
      assert.deepEqual(findRoute([regExp, str, func], "xxxxyy"), [
        func,
        [1, flag, "xxxxyy"]
      ]);
      assert.equal(funcParam, "xxxxyy", "passes url into function");
    });
    it("returns first match", () => {
      flag = true;
      assert.deepEqual(findRoute([regExp, str, func], "string"), [
        str,
        "string"
      ]);
    });
    it('detects strings matching correctly', () => {
      var one = { match: 'string' };
      var two = { match: 'another string' };
      assert.deepEqual(
        JSON.stringify(findRoute([one, two], 'string')),
        JSON.stringify([one, one.match])
      );
      assert.deepEqual(
        JSON.stringify(findRoute([one, two], 'another string')),
        JSON.stringify([two, two.match])
      );
    });
  });
});

describe('compileTemplate', function() {
  var template;
  var el;
  var data;
  beforeEach(function() {
    template = '{{name}} is {{age}} years old'; 
    el = document.createElement('div');
    data = { name: 'Bob', age: 33 }; 
  });
  afterEach(function() {
    el.innerHTML = '';
  });

  it('is a function', function() {
    return assert.isOk(typeof compileTemplate === 'function');
  });
  it('returns a function', function() {
    return assert.isOk(typeof compileTemplate() === 'function');
  });
  it('returns a function with two arguments', function() {
    return assert.isOk(compileTemplate().length === 2);
  });
  it('returns a function which edits el.innerHTML according to specified template and data', function() {
    compileTemplate(template)(el, data);
    return assert.isOk(el.innerHTML === 'Bob is 33 years old', el.innerHTML); 
  });
});

mocha.run();
