`use strict`;
mocha.setup('bdd');
var assert = chai.assert;

describe("compileTemplate", function () {
    var tpl = '{{name}} is {{age}} years old';
    var el = document.createElement('div');
    var template = compileTemplate(tpl);
    it("функция", function () {
        return assert.isOk(typeof (compileTemplate) === 'function');
    });
    it("принимает 1 аргумент - шаблон", function () {
        return assert.isOk(compileTemplate.length == 1);
    });
    it("возвращает функцию", function () {
        return assert.isOk(typeof (compileTemplate()) === "function");
    });
    it("возвращаемая функция шаблонизатора принимает 2 аргумента - элемент и объект", function () {
        return assert.isOk(compileTemplate().length == 2)
    });
    it("элемент получает разметку в соответствии с шаблоном", function () {

        template(el, { name: 'Bob', age: 33 });
        assert.equal(el.innerHTML, 'Bob is 33 years old');
    });
    it("если значения по ключу нет, не выдается ошибка, а остается вхождение ключа", function () {
        template(el, { name: 'Bob' });
        assert.equal(el.innerHTML, 'Bob is {{age}} years old');
    });
    it("корректно обрабатывается одинарная кавычка (как в ирландских фамилиях)", function () {
        template(el, { name: "Bob O'Brian", age: 33 });
        assert.equal(el.innerHTML, "Bob O'Brian is 33 years old");
    });
    it("корректно обрабатываются пустые значения", function () {
        template(el, { name: "", age: "" });
        assert.equal(el.innerHTML, " is  years old");
    })
})

describe("EventBus", function () {
    var eventBus = new EventBus();
    var hohoho = function () { console.log("hohoho function fired") };
    var lalala = function () { console.log("lalala function fired") };
    it("EventBus - функция", function () {
        assert.isOk(typeof EventBus === "function");
    });
    it("EventBus - конструктор", function () {
        assert.isOk(typeof eventBus === "object");
    });
    it("EventBus содержит метод on", function () {
        assert.isOk(typeof eventBus.on === "function");
    });
    it("EventBus содержит метод off", function () {
        assert.isOk(typeof eventBus.off === "function");
    });
    it("EventBus содержит метод trigger", function () {
        assert.isOk(typeof eventBus.trigger === "function");
    });
    it("EventBus содержит метод once", function () {
        assert.isOk(typeof eventBus.once === "function");
    });
    it("EventBus.on принимает 2 аргумента", function () {
        assert.equal(eventBus.on.length, 2);
    });
    it("EventBus.off принимает 2 аргумента", function () {
        assert.equal(eventBus.off.length, 2);
    });
    it("EventBus.trigger принимает 2 аргумента", function () {
        assert.equal(eventBus.on.length, 2);
    });
    it("EventBus.once принимает 2 аргумента", function () {
        assert.equal(eventBus.once.length, 2);
    });
    it("EventBus.on добавляет коллбэк в массив-реакцию на событие", function () {
        eventBus.on('testevent', hohoho);
        eventBus.on('testevent', lalala)
        assert.isOk(eventBus.listeners['testevent'].includes(hohoho) && eventBus.listeners['testevent'].includes(lalala));
    });
    it("EventBus.on не добавляет коллбэк в массив-реакцию на событие дважды", function () {
        eventBus.on('testevent', hohoho);
        eventBus.on('testevent');
        assert.equal(eventBus.listeners['testevent'].filter(callback => callback === hohoho).length, 1);
    });
    it("EventBus.on не вызывает событие", function () {
        var sum = 0;
        eventBus.on('myevent', function () { sum += 5 });
        assert.equal(sum, 0);
    });
    it("EventBus.off отписывает от события", function () {
        eventBus.on('offevent', hohoho);
        eventBus.on('offevent', lalala);
        eventBus.off('offevent', hohoho);
        eventBus.off('offevent', lalala);
        assert.isNotOk(eventBus.listeners['offevent'].includes(hohoho) && eventBus.listeners['offevent'].includes(lalala));
    });
    it("EventBus.on не вызывает выполнения события", function () {
        var sum = 0;
        eventBus.on('myevent', function sum() { s += 5 });
        eventBus.off('myevent', sum);
        assert.equal(sum, 0);
    });
    it("EventBus.trigger вызывает выполнение одной функции по event", function () {
        var s = 7;
        function oneSum(sum) { return s += sum };
        eventBus.on("sumEvent", oneSum);
        eventBus.trigger("sumEvent", 8);
        assert.equal(s, 15);
    });
    it("EventBus.trigger вызывает выполнение функций с нескольких аргументами по event", function () {
        var s = 8;
        function twoSum(sum, mult) { return s = (sum + s) * mult };
        eventBus.on("multTest", twoSum);
        eventBus.trigger("multTest", 2, 4);
        assert.equal(s, 40);
    });
    it("EventBus.trigger не вызывает выполнение функций, подписанных на другое событие", function () {
        var s = 9;
        function oneSum(sum) { return s += sum };
        function oneMult(mult) { return s *= mult };
        eventBus.on("noOddRun", oneMult);
        eventBus.on("whatARun", oneSum);
        eventBus.trigger("noOddRun", 8);
        assert.equal(s, 72);
    });
    it("EventBus.once вызывает функцию и отписывается от нее, функция повторно не вызывается", function () {
        var s = 10;
        function oneSum(sum) { return s += sum };
        eventBus.once("oneTimeCall", oneSum);
        eventBus.trigger("oneTimeCall", 5);
        assert.equal(s, 15);
        assert.isOk(eventBus.listeners['oneTimeCall'].length === 0);
        eventBus.trigger("oneTimeCall", 5);
        assert.equal(s, 15);
    })
});



describe("Router", function () {
    var onBeforeEnterMark = 0;
    var onEnterMark = 0;
    var onLeaveMark = 0;
    var router = new Router({
        routes: [
            {
                name: 'index',
                match: '',
                onBeforeEnter: () => onBeforeEnterMark = "str",
                onEnter: () => onEnterMark = "str",
                onLeave: () => onLeaveMark = "str"
            },
            {
                name: 'city',
                match: /city=(.+)/,
                onBeforeEnter: (town) => onBeforeEnterMark = town[0],
                onEnter: (town) => onEnterMark = town[0],
                onLeave: (town) => onLeaveMark = town[0]
            },
            {
                name: 'about',
                match: (text) => text === 'about',
                onBeforeEnter: () => onBeforeEnterMark = "about",
                onEnter: () => onEnterMark = "about",
                onLeave: () => onLeaveMark = "about"
            }
        ]
    });
    it("функция", function () {
        assert.isOk(typeof Router === "function");
    });
    it("конструктор", function () {
        assert.isOk(router instanceof Router);
    })
    it("поддерживает match в виде string", function (done) {
        setTimeout(function () {
            assert.isOk(onBeforeEnterMark == "str" && onEnterMark == "str" && onLeaveMark == 0);
            done()
        }, 0);
    });

    it("поддерживает match в виде regexp", function (done) {
        window.location.hash = "/city=Brest";
        setTimeout(function () {
            
            assert.isOk(onBeforeEnterMark == "Brest" && onEnterMark == "Brest" && onLeaveMark == "str");
            done();
        }, 0)
    });

    it("поддерживает match в виде function", function (done) {
        window.location.hash = "about";
        setTimeout(function () {
            
            assert.isOk(onBeforeEnterMark == "about" && onEnterMark == "about" && onLeaveMark == "Brest")
            done();
        }, 0)


    });

});
mocha.run();