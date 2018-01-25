'use strict';

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
/* global mocha, chai, describe, it  */
/* global EventBus, beforeEach */

mocha.setup('bdd');
const assert = chai.assert;

describe('Шаблонизатор', () => {

    it('Функция', () => {
        assert.isOk(typeof compileTemplate === 'function');
    })
    it('Заменяет элементы в строке', () => {
        let tpl = "{{name}} is {{age}} years old";
        let el = document.createElement('div');
        let template = compileTemplate(tpl);
        template(el, {name: 'Bob', age: 33});
        return assert.isOk(el.innerHTML === 'Bob is 33 years old');
    })
    it('Если свойства нету в объекте, то строка не меняется', () => {
        let tpl = "{{name}} is {{age}} years old";
        let el = document.createElement('div');
        let template = compileTemplate(tpl);
        template(el, {name: 'Bob'});
        return assert.isOk(el.innerHTML === 'Bob is {{age}} years old');
    })
    it('Работает при передаичи ссылки на объект', () => {
        let tpl = "{{name}} is {{age}} years old";
        let el = document.createElement('div');
        let template = compileTemplate(tpl);
        let person = {
            name: 'Bob',
            age: 33
        }
        template(el, person);
        return assert.isOk(el.innerHTML === 'Bob is 33 years old');
    })
})


describe('EventBus', () => {
    var eb;
    beforeEach(() => eb = new EventBus())

    it('Конструктор', () => {
        assert.isOk((new EventBus) instanceof EventBus);
    });

    describe('on', () => {
        it('Метод', () => {
            assert.isOk(typeof eb.on === 'function');
        })
    });

    describe('trigger', () => {
        it('Метод', () => {
            assert.isOk(typeof eb.trigger === 'function');
        })
        it('Вызывает событие', () => {
            let value = false;
            eb.on('some:event', () => value = true);
            eb.trigger('some:event');
            assert.isOk(value === true);
        });
        it('При вызове одинакового события срабатывают оба', () => {
            let value1 = false;
            let value2 = false;
            eb.on('some:event1', () => value1 = true);
            eb.on('some:event1', () => value2 = true);
            eb.trigger('some:event1');
            assert.isOk(value1 === true);
            assert.isOk(value2 === true);
        });
        it('Вызывает два события', () => {
            let value1 = false;
            let value2 = false;
            eb.on('some:event1', () => value1 = true);
            eb.on('some:event2', () => value2 = true);
            eb.trigger('some:event1');
            eb.trigger('some:event2');
            assert.isOk(value1 === true);
            assert.isOk(value2 === true);
        });
        it('Переписывает параметры у события', () => {
            let value = false;
            eb.on('some:event', () => value);
            eb.trigger('some:event', value = true);
            assert.isOk(value === true);
        });
        it('Переписывает параметры только у выбранного события', () => {
            let value1 = false;
            let value2 = false;
            eb.on('some:event1', () => value1);
            eb.on('some:event2', () => value2);
            eb.trigger('some:event1');
            eb.trigger('some:event2', value2 = true);
            assert.isOk(value1 === false);
            assert.isOk(value2 === true);
        });
        it('Функции можно передавать ссылкой', () => {
            let value1 = false;
            let value2 = false;
            let func1 = () => value1 = true;
            let func2 = () => value2 = true;
            eb.on('some:event', func1);
            eb.on('some:event', func2);
            eb.trigger('some:event');
            assert.isOk(value1 === true);
            assert.isOk(value2 === true);
        });
        it('Функции можно передавать сколько угодно параметров', () => {
            let value = 0;
            let func = (a, b, c, d) => value = a + b + c + d;
            eb.on('some:event', func);
            eb.trigger('some:event', 4, 5, 6, 2);
            assert.isOk(value === 17);
        });
    });

    describe('off', () => {
        it('Метод', () => {
            assert.isOk(typeof eb.off === 'function');
        })
        it('Отписывается от всех callback функций в собитии', () => {
            let value1 = false;
            let value2 = false;
            eb.on('some:event', () => value1 = true);
            eb.on('some:event', () => value2 = true);
            eb.off('some:event');
            eb.trigger('some:event');
            assert.isOk(value1 === false);
            assert.isOk(value2 === false);
        });
        it('Отписывается от одного из  в собитии', () => {
            let value1 = false;
            let value2 = false;
            eb.on('some:event', () => value1 = true);
            eb.on('some:event', () => value2 = true);
            eb.off('some:event');
            eb.trigger('some:event');
            assert.isOk(value1 === false);
            assert.isOk(value2 === false);
        });
        it('Отписывается только от одного события', () => {
            let value1 = false;
            let value2 = false;
            eb.on('some:event1', () => value1 = true);
            eb.on('some:event2', () => value2 = true);
            eb.off('some:event1');
            eb.trigger('some:event1');
            eb.trigger('some:event2');
            assert.isOk(value1 === false);
            assert.isOk(value2 === true);
        });
        it('Отписывается от определёной callback функций в собитии', () => {
            let value1 = false;
            let value2 = false;
            let func1 = () => value1 = true;
            let func2 = () => value2 = true;
            eb.on('some:event', func1);
            eb.on('some:event', func2);
            eb.off('some:event', func1);
            eb.trigger('some:event');
            assert.isOk(value1 === false);
            assert.isOk(value2 === true);
        });
        it('Отписывается от всех callback функций в собитии указав cb напрямую', () => {
            let value1 = false;
            let value2 = false;
            let func1 = () => value1 = true;
            let func2 = () => value2 = true;
            eb.on('some:event', func1);
            eb.on('some:event', func2);
            eb.off('some:event', func1);
            eb.off('some:event', func2);
            eb.trigger('some:event');
            assert.isOk(value1 === false);
            assert.isOk(value2 === false);
        });
    });

    describe('once', () => {
        it('Метод', () => {
            assert.isOk(typeof eb.once === 'function');
        })
        it('Вызываетеся метод только один раз', () => {
            let value = 0;
            let func = (n) => value = n;
            eb.once('some:event', func);
            eb.trigger('some:event', 5);
            eb.trigger('some:event', 1);
            eb.trigger('some:event', 7);
            assert.isOk(value === 5);
        });
        it('Работает с несколькими аргументами', () => {
            let value = 0;
            let func = (a, b, c, d) => value = a + b + c + d;
            eb.once('some:event', func);
            eb.trigger('some:event', 4, 5, 6, 2);
            eb.trigger('some:event', 1);
            eb.trigger('some:event', 7);
            assert.isOk(value === 17);
        });
    });
})

describe('Router', () => {
    let router = new Router({
        routes: [{
            name: 'empty',
            match: "",
            onBeforeEnter: {},
            onEnter: {},
            onLeave: {}
        }]
    });
    it('Функция', () => {
        assert.isOk(typeof Router === "function");
    })
    it('Конструктор', () => {
        assert.isOk(router instanceof Router);
    })
    it('Есть метод findNewRoute', () => {
        assert.isOk(typeof router.findNewRoute === "function");
    })
    it('Есть метод hashCheck', () => {
        assert.isOk(typeof router.hashCheck === "function");
    })
    it('Работает при создании без агрументов', () => {
        assert.isOk((new Router()) instanceof Router);
    })
    it('Работает при отсутсвии некоторых методов', (done) => {
        let string = ""
        let myRouter = new Router({
            routes: [{
                name: 'noMethods',
                match: 'noMethods',
                onEnter: () => {
                    string += "Enter"
                }
            }]
        });
        setTimeout(done, 20);
        setTimeout(() => myRouter.hashCheck("#noMethods"), 10);
        setTimeout(() => assert.isOk(string === "Enter"), 10);

    })
    it('Верная последовательность выполнения роутов', (done) => {
        let string = ""
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
        setTimeout(() => myRouter.hashCheck("#"), 10);
        setTimeout(() => myRouter.hashCheck("#changeString"), 10);
        setTimeout(() => assert.isOk(string === "LeaveBeforeEnterEnter"), 10);
    })
    it('Работает со строками', (done) => {
        let string = ""
        let myRouter = new Router({
            routes: [{
                name: 'string',
                match: /string=(.+)/,
                onEnter: (str) => string = str
            }]
        });
        setTimeout(done, 10);
        setTimeout(() => myRouter.hashCheck("#string=helloWorld"), 10);
        setTimeout(() => assert.isOk(string === "helloWorld"), 10);
    })
    it('Работает с функциями', (done) => {
        let string = ""
        let myRouter = new Router({
            routes: [{
                name: 'function',
                match: (text) => text + " and JavaScript",
                onBeforeEnter: (text) => string = text
            }]
        });
        setTimeout(done, 10);
        setTimeout(() => myRouter.hashCheck("#helloWorld"), 10);
        setTimeout(() => assert.isOk(string === "helloWorld and JavaScript"), 10);
    })
})

mocha.run();