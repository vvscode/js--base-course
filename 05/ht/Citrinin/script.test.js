"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
mocha.setup("bdd");
var assert = chai.assert;

describe("Шаблонизатор compileTemplate", function() {
    it("фунция", function() {
        return assert.isOk(typeof compileTemplate === "function");
    });
    it("принимает 1 параметр", function() {
        return assert.isOk(compileTemplate.length === 1);
    });
    it("возвращает функцию", function() {
        return assert.isOk(typeof compileTemplate() === "function");
    });
    it("возвращает функцию принимающую 2 параметра", function() {
        return assert.isOk(compileTemplate().length === 2);
    });
    it("Заменяет вхождения", function() {
        var tpl = "{{name}} is {{age}} years old";
        var el = document.createElement('div');
        var template = compileTemplate(tpl);
        template(el, { name: 'Bob', age: 33 });
        return assert.isOk(el.innerHTML === 'Bob is 33 years old');
    });
    it("Заменяет любое количество одинаковых вхождений", function() {
        var tpl = "Ехал {{name}} через реку, видит {{name}} в реке рак. Сунул {{name}} руку в реку, рак за руку {{name}} цап.";
        var el = document.createElement('div');
        var template = compileTemplate(tpl);
        template(el, { name: 'Грека' });
        return assert.isOk(el.innerHTML === 'Ехал Грека через реку, видит Грека в реке рак. Сунул Грека руку в реку, рак за руку Грека цап.');
    });
    it("Не заменяет вхождения без пометок {{}}", function() {
        var tpl = "{{name}} is {{age}} years old name age {age} name {{name}}";
        var el = document.createElement('div');
        var template = compileTemplate(tpl);
        template(el, { name: 'Bob', age: 33 });
        return assert.isOk(el.innerHTML === 'Bob is 33 years old name age {age} name Bob');
    });

    it("Игнорирует поля шаблона не являющиеся ключами объекта", function() {
        var tpl = "{{name}} is {{age}} years old {{book}}";
        var el = document.createElement('div');
        var template = compileTemplate(tpl);
        template(el, { name: 'Bob', age: 33 });
        return assert.isOk(el.innerHTML === "Bob is 33 years old {{book}}");
    });

    it("Работает с пустым объектом", function() {
        var tpl = "{{name}} is {{age}} years old";
        var el = document.createElement('div');
        var template = compileTemplate(tpl);
        template(el);
        return assert.isOk(el.innerHTML === "{{name}} is {{age}} years old");
    });

    it("Не выдает ошибок если передать не элемент DOM", function() {
        var tpl = "{{name}} is {{age}} years old";
        var el = {};
        var template = compileTemplate(tpl);
        template(el, { name: 'Bob', age: 33 });
        return assert.isOk(el.innerHTML === "Bob is 33 years old");
    });

});


describe('EventBus', function() {
    it('функция', function() {
        return assert.isOk(typeof EventBus === 'function');
    });
});

describe('EventBus - trigger', function() {
    var bus = new EventBus();
    it('Обладает свойством trigger', () => {
        assert.isOk(typeof(bus.trigger) === 'function');
    })

});

describe('EventBus - on', function() {
    it('Обладает свойством on', () => {
        assert.isOk(typeof(new EventBus).on === 'function');
    })
    it('Принимает 2 параметра', () => {
        assert.isOk((new EventBus).on.length === 2);
    })

});

describe('EventBus - on vs trigger', function() {
    it('триггер вызывает метод из on', () => {
        var a = 1;
        var eventBus = new EventBus();
        eventBus.on('some:event', () => a++);
        assert.isOk(a === 1);
        eventBus.trigger('some:event');
        assert.isOk(a === 2);
    });
    it('триггер вызывает передает параметр в cb', () => {
        var a = 1;
        var eventBus = new EventBus();
        eventBus.on('some:event', (x) => a = a + x);
        assert.isOk(a === 1);
        eventBus.trigger('some:event', 4);
        assert.isOk(a === 5);
    });
    it('Триггер вызывает все cb', () => {
        var a = 1;
        var b = 1;
        var eventBus = new EventBus();
        eventBus.on('some:event', (x) => a = a + x);
        eventBus.on('some:event', (x) => b = b + x);
        assert.isOk(a === 1);
        assert.isOk(b === 1);
        eventBus.trigger('some:event', 4);
        assert.isOk(a === 5);
        assert.isOk(b === 5);
    });

    it('Никто не подписывался на событие и мы его вызываем', () => {
        var eventBus = new EventBus();
        eventBus.trigger('some:event', 4);
        assert.isOk(1 === 1);
    });

    it('Вместо колбэка не передаем функцию', () => {
        var eventBus = new EventBus();
        eventBus.on('some:event', () => {});
        eventBus.on('some:event', '123');
        eventBus.trigger('some:event', 4);
        assert.isOk(1 === 1);
    })

    it('Принимает несколько параметров ', () => {
        var eventBus = new EventBus();
        var number = 5;
        eventBus.on('severalEl:event', (a, b, c) => { number += (a - b * c) });
        //eventBus.on('severalEl:event', () => {});
        eventBus.trigger('severalEl:event', 4, -3, 2);
        assert.isOk(number === 15);
    })
});

describe('EventBus - off', function() {
    it('Обладает свойством off', () => {
        assert.isOk(typeof(new EventBus).off === 'function');
    });
    it('Принимает 2 параметра', () => {
        assert.isOk((new EventBus).off.length === 2);
    });
    it('Удаляет обработчик', () => {
        var a = 1;
        var b = 1;
        var eventBus = new EventBus();
        var function1 = (x) => a = a + x;
        var function2 = (x) => b = b - x;
        eventBus.on('some:event', function1);
        eventBus.on('some:event', function2);
        assert.isOk(a === 1);
        assert.isOk(b === 1);
        eventBus.trigger('some:event', 4);
        assert.isOk(a === 5);
        assert.isOk(b === -3);

        eventBus.off('some:event', function2);
        eventBus.trigger('some:event', 4);
        assert.isOk(a === 9);
        assert.isOk(b === -3);
    })

});

describe('EventBus - once', function() {
    it('Обладает свойством once', () => {
        assert.isOk(typeof(new EventBus).once === 'function');
    });
    it('once принимает два параметра', () => {
        assert.isOk((new EventBus).once.length === 2);
    });
    it('once срабатывает один раз', () => {
        var a = 1;
        var eventBus = new EventBus();
        eventBus.once('some:event', (x) => a = a + x);
        assert.isOk(a === 1);
        eventBus.trigger('some:event', 4);
        assert.isOk(a === 5);
        eventBus.trigger('some:event', 4);
        assert.isOk(a === 5);
    });
    it('once срабатывает если несколько обработчиков', () => {
        var a = 1;
        var b = 1;
        var c = 2;
        var eventBus = new EventBus();
        eventBus.on('some:event', (x) => c = c + x);
        eventBus.once('some:event', (x) => a = a + x);
        eventBus.on('some:event', (x) => b = b + x);


        assert.isOk(a === 1);
        assert.isOk(b === 1);
        assert.isOk(c === 2);
        eventBus.trigger('some:event', 4);
        assert.isOk(a === 5);
        assert.isOk(b === 5);
        assert.isOk(c === 6);
        eventBus.trigger('some:event', 4);
        assert.isOk(a === 5);
        assert.isOk(b === 9);
        assert.isOk(c === 10);

    });
});

describe('Router', function() {
    it('Функция', () => {
        assert.isOk(typeof(Router) === 'function');
    });
    it('Конструктор', () => {
        assert.isOk((new Router()) instanceof Router);
    });
    it('Принимает 1 аргумент', () => {
        assert.isOk(Router.length === 1);
    });
    it('Работает c паттернами-строками', function(done) {
        window.location.href.substr(0, window.location.href.indexOf('#'))
        var routes = [{
            match: 'string',
            onEnter: () => a++
        }];
        var mainRouter = new Router(routes);
        var a = 1;
        assert.isOk(a === 1);
        window.location.hash = 'string';
        setTimeout(function() {
            assert.isOk(a === 2);
            done();
        }, 0)
    });
    it('Работает c паттернами-функциями', function(done) {
        window.location.href.substr(0, window.location.href.indexOf('#'))
        var routes = [{
            match: (text) => text === 'about',
            onEnter: () => a += 100
        }];
        var mainRouter = new Router(routes);
        var a = 1;
        assert.isOk(a === 1);
        window.location.hash = 'about';
        setTimeout(function() {
            assert.isOk(a === 101);
            done();
        }, 0)
    });
    it('Работает c паттернами-RegExp', function(done) {
        window.location.href.substr(0, window.location.href.indexOf('#'))
        var routes = [{
            match: /cit./,
            onEnter: () => a += 200
        }];
        var mainRouter = new Router(routes);
        var a = 1;
        assert.isOk(a === 1);
        window.location.hash = 'city';
        setTimeout(function() {
            assert.isOk(a === 201);
            done();
        }, 0)
    });
    it('Вызывает последовательно необходимые функции', function(done) {
        window.location.href.substr(0, window.location.href.indexOf('#'))
        var routes = [{
                name: 'about',
                match: (text) => text === 'about',
                onBeforeEnter: () => a += 'ab',
                onEnter: () => a += 'ae',
                onLeave: () => a += 'al'
            },
            {
                name: 'city',
                match: 'city',
                onBeforeEnter: () => a += 'cb',
                onEnter: () => a += 'ce',
                onLeave: () => a += 'cl'
            }
        ];
        var mainRouter = new Router(routes);
        var a = '';
        assert.isOk(a === '');
        window.location.hash = 'city';
        window.location.hash = 'about';
        setTimeout(function() {
            assert.isOk(a === 'cbceclabae');
            done();
        }, 0)
    });
});

mocha.run();