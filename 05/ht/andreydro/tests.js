"use strict";

// Template
describe("createTemplate", function() {
    it("is a function", function() {
        return assert.isOk(typeof createTemplate === "function");
    });

    it("returns a function", function() {
        assert.isOk(typeof createTemplate() === "function");
    });

    describe("returned function", function() {
        var el;
        var template;
        var data;
        beforeEach(function() {
            el = document.createElement("div");
            template = "{{name}} is {{age}} years old";
            data = { name: "Bob", age: 33 };
        });

        it("takes 2 args", function() {
            assert.isOk(createTemplate(template).length === 2);
        });

        it("changes el inner html", function() {
            createTemplate(template)(el, data);
            assert.isOk(el.innerHTML !== "");
        });

        it("changes el inner html according to template", function() {
            createTemplate(template)(el, data);
            assert.isOk(el.innerHTML === "Bob is 33 years old", el.innerHTML);
        });

        it("handles different templates correctly", function() {
            template = "{{name}} is {{age}} years old name age {{}}";
            createTemplate(template)(el, data);
            assert.isOk((el.innerHTML = "Bob is 33 years old name age"));
        });
    });
});

// EventBus

describe("EventBus", function() {
    var doubleEventBus = new EventBus();
    it("is a function", function() {
        return assert.isOk(typeof EventBus === "function");
    });

    it("add events", function() {
        doubleEventBus.on("click", function() {
            return 1;
        });
        doubleEventBus.on("click", function() {
            return 2;
        });
        doubleEventBus.on("click", function() {
            return 3;
        });
        doubleEventBus.on("scroll", function() {
            return 1;
        });
        doubleEventBus.on("scroll", function() {
            return 2;
        });

        return assert.isOk(doubleEventBus.handlers["click"].length == 3);
        return assert.isOk(doubleEventBus.handlers["scroll"].length == 2);
    });

    it("delete events", function() {
        function foo() {
            return 4;
        }
        doubleEventBus.on("foo", foo);
        assert.isOk(doubleEventBus.handlers["foo"].length == 1);
        doubleEventBus.off("foo", foo);
        assert.isOk(doubleEventBus.handlers["foo"].length == 0);
    });

    it("call existing events", function() {
        var trig = 0;
        doubleEventBus.on("trig", function() {
            trig = 1;
        });
        doubleEventBus.trigger("trig");

        assert.isOk(trig == 1);
    });

    it("call event only 1 time", function() {
        doubleEventBus.once("count", function() {
            return null;
        });
        assert.isOk(doubleEventBus.handlers.count);
        assert.isOk(doubleEventBus.handlers.count.length);
        doubleEventBus.trigger("count");
        assert.isOk(doubleEventBus.handlers.count.length == 0);
    });
});

// Router

const $$ = document.querySelector.bind(document);
const sleep = x => new Promise(resolve => setTimeout(resolve, x));

describe("HashRouter", () => {
    it("is function and constructor", () => {
        assert.equal(typeof HashRouter, "function");
        assert.isOk(new HashRouter() instanceof HashRouter);
    });

    it("set .routes from options", () => {
        var routes = [];
        var router = new HashRouter({ routes: routes });
        assert.equal(router.routes, routes);
    });

    describe(".handleUrl", () => {
        it("is method (on prototype)", () => {
            assert.equal(typeof new HashRouter().handleUrl, "function");
            assert.equal(
                new HashRouter().handleUrl,
                HashRouter.prototype.handleUrl
            );
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
                assert.deepEqual(
                    JSON.stringify(x),
                    JSON.stringify([
                        "onLeaveStart",
                        "onLeaveEnd",
                        "onBeforeEnterStart",
                        "onBeforeEnterEnd",
                        "onEnterStart",
                        "onEnterEnd"
                    ])
                );
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
            assert.deepEqual(findRoute([regExp, str, func], "xxxx"), [
                null,
                null
            ]);
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
        it("detects strings matching correctly", () => {
            var one = { match: "string" };
            var two = { match: "another string" };
            assert.deepEqual(
                JSON.stringify(findRoute([one, two], "string")),
                JSON.stringify([one, one.match])
            );
            assert.deepEqual(
                JSON.stringify(findRoute([one, two], "another string")),
                JSON.stringify([two, two.match])
            );
        });
    });
});