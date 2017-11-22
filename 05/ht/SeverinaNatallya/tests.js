"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
mocha.setup("bdd");
var assert = chai.assert;

describe("compileTemplate", () => {
    it("функция", () => assert.isOk(typeof compileTemplate === "function"));
    it("Возвращает функцию", () =>
        assert.isOk(typeof compileTemplate() === "function"));
    it("Возвращает функцию, которая принимает 2 аргумента", () =>
        assert.isOk(compileTemplate().length === 2));
    it("Заменяет вхождения", () => {
        var tpl = "{{name}} is {{age}} years old";
        var el = document.createElement("div");
        var template = compileTemplate(tpl);
        template(el, { name: "Bob", age: 33 });
        assert.isOk(el.innerHTML == "Bob is 33 years old");
    });
});
describe("Router", () => {
    var a = "";
    var router = new Router({
        routes: [
            {
                name: "index",
                match: "",
                onBeforeEnter: () => {
                    a += "onBeforeEnterIndex";
                },
                onEnter: () => {
                    a += "onEnterIndex";
                },
                onLeave: () => {
                    a += "onLeaveIndex";
                }
            },
            {
                name: "async",
                match: "async",
                onBeforeEnter: () => {
                    new Promise(function (resolve, reject) {
                        a += "onBeforeEnterAsync";
                        resolve();
                    });
                },
                onEnter: () => {
                    a += "onEnterAsync";
                },
                onLeave: () => {
                    a += "onLeaveAsync";
                }
            },
            {
                name: "city",
                match: /city=(.+)/i,
                onBeforeEnter: city => {
                    a += "onBeforeEnter" + city;
                },
                onEnter: city => {
                    a += "onEnter" + city;
                },
                onLeave: city => {
                    a += "onLeave" + city;
                }
            },
            {
                name: "about",
                match: text => text === "about",
                onBeforeEnter: () => {
                    a += "onBeforeEnterAbout";
                },
                onEnter: () => {
                    a += "onEnterAbout";
                },
                onLeave: () => {
                    a += "onLeaveAbout";
                }
            }
        ]
    });
    it("Работает с шаблонами string", () => {
        assert.isOk(a === "onBeforeEnterIndexonEnterIndex");
    });
    it("Работает с шаблонами function", done => {
        a = "";
        window.location.hash = "#about";
        setTimeout(() => {
            assert.isOk(a === "onLeaveIndexonBeforeEnterAboutonEnterAbout");
        }, 0);
        setTimeout(done, 0);
    });
    it("Работает с шаблонами RegEx и передает аргументы", done => {
        a = "";
        window.location.hash = "#city=Minsk";
        setTimeout(() => {
            assert.isOk(a === "onLeaveAboutonBeforeEnterMinskonEnterMinsk");
        }, 0);
        setTimeout(done, 0);
    });
    it("Работает с асинхронными функциями", done => {
        a = "";
        window.location.hash = "#async";
        setTimeout(() => {
            assert.isOk(a === "onLeaveMinskonBeforeEnterAsynconEnterAsync");
        }, 0);
        setTimeout(done, 0);
    });
});

describe("eventBus", () => {
    it("is function", () => assert.isOk(typeof EventBus === "function"));
    describe("trigger", () => {
        it("is method", () =>
            assert.isOk(typeof new EventBus().trigger === "function"));
        it("takes 2 params", () =>
            assert.isOk(new EventBus().trigger.length === 2));
    });
    describe("on", () => {
        it("is method", () => assert.isOk(typeof new EventBus().on === "function"));
        it("takes 2 params", () => assert.isOk(new EventBus().on.length === 2));
    });
    describe("on vs trigger", () => {
        it("trigger calls hanlders from .on", () => {
            var a = 1;
            var eventBus = new EventBus();
            eventBus.on("some:event", () => a++);
            assert.isOk(a === 1, "on do not call cb without trigger");
            eventBus.trigger("some:event");
            assert.isOk(a === 2, "trigger calls cb from .on");
        });

        it("trigger pass params into cb", () => {
            var a = 1;
            var eventBus = new EventBus();
            eventBus.on("some:event", x => (a = a + x));
            assert.isOk(a === 1, "on do not call cb without trigger");
            eventBus.trigger("some:event", 4);
            assert.isOk(a === 5, "trigger calls cb from .on");
        });

        it("trigger calls all cbs", () => {
            var a = 1;
            var b = 1;
            var eventBus = new EventBus();
            eventBus.on("some:event", x => (a = a + x));
            eventBus.on("some:event", x => (b = b + x));
            assert.isOk(a === 1, "on do not call cb without trigger");
            assert.isOk(b === 1, "on do not call cb without trigger");
            eventBus.trigger("some:event", 4);
            assert.isOk(a === 5, "trigger calls cb from .on");
            assert.isOk(b === 5, "trigger calls cb from .on");
        });

        it("trigger works fine with no cbs", () => {
            var eventBus = new EventBus();
            eventBus.trigger("some:event", 4);
            assert.isOk(1 === 1, ".trigger does not break code with no cbs");
        });

        it("works fine with no functions as cb", () => {
            var eventBus = new EventBus();
            var a = 1;
            eventBus.on("xxx", () => a++);
            eventBus.on("xxx", "HerTam");
            eventBus.trigger("xxx", 4);
            assert.isOk(
                a === 2,
                ".trigger does not break code with non-function param"
            );
        });
        it("works fine with many arguments", () => {
            var a = 1;
            var eventBus = new EventBus();
            eventBus.on("some:event", function (x, y) {
                return (a = a + x + y);
            });
            eventBus.trigger("some:event", "f", "f");
            assert.isOk(a === "1ff", "trigger calls many argument");
        });
    });
    describe("off", () => {
        it("is method", () =>
            assert.isOk(typeof new EventBus().off === "function"));
        it("takes 2 params", () => assert.isOk(new EventBus().off.length === 2));
    });
    describe("off vs on vs trigger", () => {
        it("dont call cb after off", () => {
            var a = 1;
            var cb = () => a++;
            var eventBus = new EventBus();
            eventBus.on("some:event", cb);
            eventBus.trigger("some:event");
            eventBus.off("some:event", cb);
            eventBus.trigger("some:event");
            assert.isOk(a === 2, "off dont cancel subscription");
        });
        it("off cancel correct subscription", () => {
            var a = 1;
            var cb1 = () => a++;
            var b = 1;
            var cb2 = () => b++;
            var eventBus = new EventBus();
            eventBus.on("some:event", cb1);
            eventBus.on("some:event", cb2);
            eventBus.trigger("some:event");
            eventBus.off("some:event", cb1);
            eventBus.trigger("some:event");
            assert.isOk(a === 2 && b === 3, "off dont cancel correct subscription");
        });
    });
    describe("once", () => {
        it("is method", () =>
            assert.isOk(typeof new EventBus().once === "function"));
        it("takes 2 params", () => assert.isOk(new EventBus().once.length === 2));
    });
    describe("once vs trigger", () => {
        it("trigger calls hanlders from .once", () => {
            var a = 1;
            var eventBus = new EventBus();
            eventBus.once("some:event", () => a++);
            eventBus.trigger("some:event");
            eventBus.trigger("some:event");
            assert.isOk(a === 2, "trigger calls cb from .on");
        });

        it("once cancel correct subscription", () => {
            var a = 1;
            var cb1 = () => a++;
            var b = 1;
            var cb2 = () => b++;
            var eventBus = new EventBus();
            eventBus.on("some:event", cb1);
            eventBus.once("some:event", cb2);
            eventBus.trigger("some:event");
            eventBus.trigger("some:event");
            assert.isOk(a === 3 && b === 2, "once dont cancel correct subscription");
        });
    });
});

mocha.run();
