/* добавить тесты */
"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
describe("EmptyConstructor", function() {
    it("функция", function() {
        return assert.isOk(typeof EmptyConstructor === "function");
    });
    it("не является конструктором", function () {
        try {
            new EmptyConstructor(1, 2, 3);
        } catch (e) { 
            var name = e.name;
            var message = e.message;
        }
        return assert.isOk(name === "Error" && message === "Функция не может быть конструктором");
    });
});

describe("Hedgehog", function() {
    it("функция", function() {
        return assert.isOk(typeof Hedgehog === "function");
    });
    it("конструктор", function() {
        assert.isOk(typeof new Hedgehog() === "object");
        assert.isOk(new Hedgehog() instanceof Hedgehog === true);
    });
    it("работает вызов методов по цепочке", function() {
        return assert.isOk(typeof new Hedgehog().showNameInAlert().showAgeInConsole() === 'object');
    });
});

describe("curry", function() {
    it("добавить тесты", function() {
        assert.isOk(true === true);
    });
    it("функция", function() {
        return assert.isOk(typeof curry === "function");
    });
    it("curry(target1)(1)(2)(3)(4) возвращает 10 ", function() {
        return assert.isOk(curry(target1)(1)(2)(3)(4) === 10);
    });
    it("curry(target2)(5)(8) возвращает 13", function() {
        return assert.isOk(curry(target2)(5)(8) === 13);
    });
});

describe("chainOfInheritance", function() {
    it("User и PreUser - разные конструкторы", function() {
        return assert.isOk(User !== PreUser);
    });
    it("созданный объект является эземлятром класса User", function() {
        return assert.isOk(new User() instanceof User);
    });
    it("созданный объект является эземлятром класса PreUser", function() {
        return assert.isOk(new User() instanceof PreUser);
    });
    it("созданный объект является эземлятром класса Array", function() {
        return assert.isOk(new User() instanceof Array);
    });
});

describe(".myCall", function() {
    it(".myCall - функция", function() {
        return assert.isOk(typeof Function.prototype.myCall === 'function');
    });
    it(".myCall работает так же, как и call (без аргументов)", function () {
        var num = 7;
        return assert.isOk(typeof Object.prototype.toString.myCall(num) === 'string');
    });
    it(".myCall обрабатывает массив, как единственный аргумент", function () {
        function func(a, b) { 
            return a - b; 
        }
        return assert.isOk(isNaN(func.myCall(null, [1,2])));
    });
    it(".myCall работает так же, как и call (c аргументами)", function () {
        function count(a, b) {
            return a + b;
        }
        return assert.isOk(count.myCall(null, 1, 2) === 3);
    });
    it(".myCall работает так же, как и call (с заданным контекстом)", function () {
        var str = "Строка";
        return assert.isOk(Array.prototype.reduce.myCall(str, function (rest, elem) { 
            return rest += elem;
        })) === "Строка";
    });
});

describe("getCounter", function () {
    var methods = ['log', 'add', 'reset'];
    var simpleObject = getCounter();
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        it(methods[i] + " - функция", function() {
            return assert.isOk(typeof simpleObject[method] === 'function');
        });
        it(methods[i] + " возвращает ссылку на объект", function () {
            return assert.isOk(simpleObject === simpleObject[method]());
        });
    }
    it("поддерживает цепочку вызовов", function () {
        var c = getCounter(5);
        var result = c
        .log()
        .add(4)
        .log() 
        .add(3)
        .log() 
        .reset()
        .log() 
        .add(8)
        .log(); 
        assert.isOk(+result === 8);
    });
});

describe("drawInteractiveCalendar", function () {
    it("drawInteractiveCalendar - функция", function() {
        return assert.isOk(typeof drawInteractiveCalendar === 'function');
    });
    it("drawCalendar - функция", function() {
        return assert.isOk(typeof drawCalendar === 'function');
    });
});

describe('debounce', function() {
    it('Срабатывает через  определнный период времени', function(done) {
        var temp= 0;
        var f = debounce(function (arg) {
            temp = arg;
        }, 100);
      f(1);
      assert.equal(temp, 0, 'проверка начального состояния');
        setTimeout(function () {
            assert.equal(temp, 0, 'значение неизменно до окончания таймера');
        }, 50);
        setTimeout(function () {
            assert.equal(temp, 1, 'значение изменено после таймера');
        }, 120);
        setTimeout(done, 150);
    });
    it('Правильно работает при повторых вызовах', function(done) {
        var temp = 0;
        var f = debounce(function (arg) {
            temp = arg;
        }, 200);
        f(1);
        assert.equal(temp, 0, 'проверка начального состояния');
        setTimeout(function () {
            f(2);
        }, 100);
        setTimeout(function () {
            assert.equal(temp, 0, 'значение не изменилось после второго вызова');
        }, 250);
        setTimeout(function () {
            assert.equal(temp, 2, 'значение изменено после истечения таймера');
        }, 350);
        setTimeout(done, 350);
    });
});
  
describe('throttle', function() {
    it('Функция вызывается через определенный промежуток времени', function(temp) {
        var test = 0;
        var f = throttle(function (a) {
            test = a;
        }, 100);

        assert.equal(test, 0, 'проверка начального состояния');
        f(1);
        assert.equal(test, 1, 'отработал первый вызов');
        setTimeout(function () {
            f(2);
        }, 150);
        setTimeout(function () {
            assert.equal(test, 2, 'сработал второй вызов (после истечения таймера)');
        }, 160);
        setTimeout(temp, 200);
    });
    it('Не возникает ошибок при повторых вызовах', function (temp) {
        var test = 0;
        var f = throttle(function (a) {
            test = a;
        }, 100);

        assert.equal(test, 0, 'проверка начального состояния');
        f(1);
        assert.equal(test, 1, 'отработал первый вызов');
        setTimeout(function () {
            f(2);
        }, 50);
        setTimeout(function () {
            assert.equal(test, 1, 'преждевременный вызов не изменил значение');
        }, 60);
        setTimeout(function () {
            f(3);
        }, 150);
        setTimeout(function () {
            assert.equal(test, 3, 'второй вызов отработал после истечения таймера');
        }, 160);
        setTimeout(temp, 200);
    });
});       