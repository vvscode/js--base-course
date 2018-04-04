/* добавить тесты */
"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 *  tests from https://rawgit.com/vvscode/js--base-course/master/.ht/02/script.tests.js
*/

describe("isDeepEqual", function() {
    it("фунция", function() {
      return assert.isOk(typeof isDeepEqual === "function");
    });
    it("возвращает true/false", function() {
      return assert.isOk(typeof isDeepEqual("", "") === "boolean");
    });
    it("распознает одинаковые строки", function() {
      return assert.isOk(isDeepEqual("мама", "мама") === true);
    });
    it("распознает разные строки", function() {
      return assert.isOk(isDeepEqual("мама", "папа") === false);
    });
  
    it("распознаем разные массивы", function() {
      return assert.isOk(isDeepEqual([1, 4, 2], [1, 2, 4]) === false);
    });
    it("распознает одинаковые массивы", function() {
      return assert.isOk(isDeepEqual([1, 2, 4, 3], [1, 2, 4, 3]) === true);
    });
    it("распознает массивы разной длинны", function() {
      return assert.isOk(isDeepEqual([1, 2, 5], [1, 2, 5, 7]) === false);
    });
  
    var a = { prop1: 1, list: [1, 2, 3], o: { x: 2 } };
    var b = { list: [1, 2, 3], o: { x: 2 } };
    it("распознает разные объекты", function() {
      return assert.isOk(isDeepEqual(a, b) === false);
    });
  
    it("распознает одинаковые объекты", function() {
      b.prop1 = 1;
      return assert.isOk(isDeepEqual(a, b) === true);
    });
  
    it("распознает разные объекты", function() {
      var a = { a: 1, b: 3, c: 2 };
      var b = { a: 1, b: 4, c: 2 };
      return assert.isOk(isDeepEqual(a, b) === false);
    });
  
    it("распознает вложенные объекты", function() {
      var a = { a: 1, b: { x: 5 }, c: 2 };
      var b = { a: 1, b: { x: 5 }, c: 2 };
      return assert.isOk(isDeepEqual(a, b) === true);
    });
  
    it("распознает числа", function() {
      var a = 1;
      var b = 1.0;
      return assert.isOk(isDeepEqual(a, b) === true);
    });
  
    it("распознает разные числа", function() {
      let a = 1;
      let b = 2;
      return assert.isOk(isDeepEqual(a, b) === false);
    });
  
    it("Может работать с NaN", function() {
      let a = { NaN: NaN };
      let b = { NaN: NaN };
  
      assert.isOk(isDeepEqual(NaN, NaN) === true);
      assert.isOk(isDeepEqual(a, b) === true);
    });
  
    it("Moжет работать с рекурсивными ссылками", function() {
      var a = {
        prop: 1
      };
      a.a = a;
      var b = {
        prop: 1
      };
      b.a = b;
      assert.isOk(isDeepEqual(a, b) === true);
    });
  });
  
  describe("bind", function() {
    var func;
    var obj;
    var counter;
    var originalBind;
    beforeEach(function() {
      counter = 0;
      func = function(val) {
        counter++;
        return [val, this.name];
      };
      obj = {
        name: "Some dummy context"
      };
      var originalBind = Function.prototype.bind;
    });
    afterEach(function() {
      Function.prototype.bind = originalBind;
    });
    it("функция", function() {
      assert.isOk(typeof bind === "function");
    });
    it("Возвращает фукнцию", function() {
      assert.isOk(typeof bind(function() {}, {}) === "function");
      assert.isOk(typeof bind(function() {}, null) === "function");
    });
    it("Результат вызывает оригинальную фукнцию", function() {
      assert.isOk(counter === 0);
      let binded = bind(func, {});
      binded();
      assert.isOk(counter === 1);
      binded();
      assert.isOk(counter === 2);
    });
    it("Вызывает с правильным контекстом", function() {
      var context = { dummy: "context" };
      const binded = bind(function() {
        assert.isOk(this === context);
      }, context);
      binded();
    });
    it("Пробрасывает параметры контекстом", function() {
      bind(function() {
        assert.isOk(arguments.length === 0);
      }, {})();
      bind(function() {
        assert.isOk(arguments.length === 1);
        assert.isOk(arguments[0] === 1);
      }, {})(1);
      bind(function() {
        assert.isOk(arguments.length === 3);
        assert.isOk(arguments[0] === 1);
        assert.isOk(arguments[1] === 2);
        assert.isOk(arguments[2] === "три");
      }, {})(1, 2, "три");
    });
  });
  
  describe(".myBind", function() {
    var func;
    var obj;
    var counter;
    var originalBind = Function.prototype.bind;
    beforeEach(function() {
      counter = 0;
      Function.prototype.bind = null;
      func = function(val) {
        counter++;
        return [val, this.name];
      };
      obj = {
        name: "Some dummy context"
      };
    });
    afterEach(function() {
      Function.prototype.bind = originalBind;
    });
    it("функция", function() {
      assert.isOk(typeof func.myBind === "function");
    });
    it("Возвращает фукнцию", function() {
      assert.isOk(typeof function() {}.myBind({}) === "function");
      assert.isOk(typeof function() {}.myBind(null) === "function");
    });
    it("не использует встроенный .bind", function() {
      assert.isOk(func.myBind.toString().indexOf(".bind") < 0);
    });
    it("Результат вызывает оригинальную фукнцию", function() {
      assert.isOk(counter === 0);
      let binded = func.myBind({});
      binded();
      assert.isOk(counter === 1);
      binded();
      assert.isOk(counter === 2);
    });
    it("Вызывает с правильным контекстом", function() {
      var context = { dummy: "context" };
      const binded = function() {
        assert.isOk(this === context);
      }.myBind(context);
      binded();
    });
    it("Пробрасывает параметры контекстом", function() {
      (function() {
        assert.isOk(arguments.length === 0);
      }.myBind({})());
      (function() {
        assert.isOk(arguments.length === 1);
        assert.isOk(arguments[0] === 1);
      }.myBind({})(1));
      (function() {
        assert.isOk(arguments.length === 3);
        assert.isOk(arguments[0] === 1);
        assert.isOk(arguments[1] === 2);
        assert.isOk(arguments[2] === "три");
      }.myBind({})(1, 2, "три"));
    });
  });
  
  describe("calculate", function() {
    it("считает примеры", function() {
      assert.isOk(calculate("+")(1)(2) === 3);
      assert.isOk(calculate("*")(4)(2) === 8);
      assert.isOk(calculate("/")(9)(3) === 3);
      assert.isOk(calculate("-")(8)(7) === 1);
    });
  });
  
  describe("Singleton", function() {
    it("конструктор", function() {
      assert.isOk(typeof new Singleton() === "object");
      assert.isOk(new Singleton() instanceof Singleton === true);
    });
    it("синглтон", function() {
      assert.isOk(new Singleton() === new Singleton());
    });
  });
  
  describe("ForceContructor", function() {
    it("работает как конструктор и сохраняет параметры в объекте", function() {
      var a = Math.random();
      var c = Math.random();
      var o = new ForceContructor(a, undefined, c);
      assert.isOk(typeof o === "object");
      assert.isOk(o instanceof ForceContructor);
      assert.isOk(o.a === a);
      assert.isOk("b" in o);
      assert.isOk(o.b === undefined);
      assert.isOk(o.c === c);
    });
    it("работает как конструктор без new", function() {
      var a = Math.random();
      var c = Math.random();
      var o = ForceContructor(a, undefined, c);
      var o2 = new ForceContructor(a, undefined, c);
      var o3 = ForceContructor(a, undefined, c);
      assert.isOk(typeof o === "object");
      assert.isOk(o instanceof ForceContructor === true);
      assert.isOk(o.a === a);
      assert.isOk("b" in o);
      assert.isOk(o.b === undefined);
      assert.isOk(o.c === c);
      assert.isOk(o !== o2);
      assert.isOk(o !== o3);
      assert.isOk(o2 !== o3);
    });
  });
  
  describe("sum", function() {
    it("функция", function() {
      assert.isOk(typeof sum === "function");
    });
    it("по-умолчанию инициализируется нулем", function() {
      assert.isOk(+sum() === 0);
    });
    it("инициализируется числом", function() {
      assert.isOk(+sum(5) === 5);
    });
    it("складывает числа", function() {
      var s = sum(1);
      assert.isOk(+s(2) === 3);
      assert.isOk(+s(3) === 4);
      assert.isOk(+s(95) === 96);
    });
    it("складывает числа последовательно", function() {
      assert.isOk(+sum(1)(2) === 3);
      assert.isOk(+sum(5)(7)(9) === 21);
  
      var s = sum();
      for (var i = 0; i < 15; i++) {
        s = s(1);
      }
      assert.isOk(+s(1) === 16);
    });
    it("добавляет 0 по-умолчанию", function() {
      assert.isOk(+sum(4)() === 4);
      assert.isOk(+sum(7)()(2) === 9);
    });
    it("сумматоры независимые", function() {
      var s1 = sum(1);
      var s12 = s1(2);
      var s15 = s1(5);
      var s152 = s15(2);
      var s159 = s15(9);
      var s10 = s1();
      assert.isOk(+s1 === 1);
      assert.isOk(+s12 === 3);
      assert.isOk(+s15 === 6);
      assert.isOk(+s152 === 8);
      assert.isOk(+s159 === 15);
      assert.isOk(+s10 === 1);
    });
    it("может отработать много раз", function() {
      var s = sum();
      for (var i = 0; i < 999; i++) {
        s = s(1);
      }
      assert.isOk(+s() === 999);
    });
  });
  
  describe("User / PreUser", function() {
    it("конструкторы", function() {
      var u = new User();
      var u2 = new User();
      assert.isOk(typeof User === "function");
      assert.isOk(typeof PreUser === "function");
      assert.isOk(new User() instanceof User);
      assert.isOk(new PreUser() instanceof PreUser);
      assert.isOk(u !== u2);
    });
    it("разные конструкторы", function() {
      assert.isOk(User !== PreUser);
    });
    it("создают правильное дерево наследования", function() {
      var u = new User();
      var u2 = new User();
      assert.isOk(u instanceof User);
      assert.isOk(u instanceof Array);
      assert.isOk(u instanceof PreUser);
    });
  });
  /*******************************************************************/


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

describe("curry", function () {
    var target1, target2, target3, target4;
    beforeEach(function () {
        target4 = function (a, b, c, d) { return a + b + c + d; }
        target3 = function (a, b, c) { return a + b + c; }
        target2 = function (a, b) { return a + b; }
        target1 = function (a) { return a; }
    });
    it("добавить тесты", function() {
        assert.isOk(true === true);
    });
    it("функция", function() {
        return assert.isOk(typeof curry === "function");
    });
    it("curry(target1)(1) возвращает 1 (работает с 2 параметрами)", function() {
        return assert.equal(curry(target1)(1), 1);
    });
    it("curry(target2)(1)(2) возвращает 3 (работает с 3 параметрами)", function() {
        return assert.equal(curry(target2)(1)(2), 3);
    });
    it("curry(target3)(1)(2)(3) возвращает 6 (работает с 4 параметрами)", function() {
        return assert.equal(curry(target3)(1)(2)(3), 6);
    });
    it("curry(target4)(1)(2)(3)(4) возвращает 10 (работает с 5 параметрами)", function() {
        return assert.equal(curry(target4)(1)(2)(3)(4), 10);
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
    it ('Проверка вызова оригинальной функции', function() {
        var temp;
        function func() { 
            return 'origin';
        }
        temp = func.myCall(this);
        assert.equal(temp, 'origin');
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
    it("reset сбрасывает результат вычислений до 0, ничего больше не делая", function () {
        return assert.equal(+simpleObject.reset(), 0);
    });
    it("log выводит значение в консоль и возвращает значение, ничего больше не делая", function () {
        var firstVal = simpleObject.log();
        var secondtVal = simpleObject.log();
        var thirdVal = simpleObject.log();
        return assert.equal(firstVal, thirdVal);
    });
    it("log работает корректно", function () {
        simpleObject.reset();
        var temp = console.log;
        var str = '';
        console.log = function (a) {
            str += a;
            temp(a);
        };
        simpleObject.log().log().log();
        console.log = temp;
        return assert.equal(str, '000');
    });
    it("add добавляет указанное число к значению и возвращает значение, ничего больше не делая", function () {
        var count = 1;
        simpleObject.reset();
        var firstVal = +simpleObject.log();
        var secondVal = +simpleObject.add(count);
        var thirdVal = +simpleObject.log();
        return assert.equal(firstVal + count, secondVal);
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