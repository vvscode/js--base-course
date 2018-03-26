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



