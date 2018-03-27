/* добавить тесты */
"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
describe("EmptyConstructor", function() {
    it("функция", function() {
        return assert.isOk(typeof EmptyConstructor === "function");
    });
    it("не является конструкторои", function() {
        assert.isOk(new EmptyConstructor() instanceof EmptyConstructor === false);
        assert.isOk(EmptyConstructor() instanceof EmptyConstructor === false);
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
        return assert.isOk(typeof new Hedgehog().showAgeInConsole().showNameInAlert() === 'object');
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

describe("getCounter", function() {
    it("getCounter - функция", function() {
        return assert.isOk(typeof getCounter === 'function');
    });
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









/*var c = getCounter(5);
c
  .log() // 5
  .add(4)
  .log() // 9
  .add(3)
  .log() // 12
  .reset()
  .log() // 0
  .add(8)
  .log(); // 8*/

