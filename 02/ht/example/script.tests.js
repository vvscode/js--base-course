"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

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
    b.b = b;
    assert.isOk(isDeepEqual(a, b) === true);
  });
});

describe("bind", function() {
  var func;
  var obj;
  var counter;
  beforeEach(function() {
    counter = 0;
    func = function(val) {
      counter++;
      return [val, this.name];
    };
    obj = {
      name: "Some dummy context"
    };
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
      assert(this === context);
    }, context);
    binded();
  });
  it("Пробрасывает параметры контекстом", function() {
    bind(function() {
      assert(arguments.length === 0);
    }, {})();
    bind(function() {
      assert(arguments.length === 1);
      assert(arguments[0] === 1);
    }, {})(1);
    bind(function() {
      assert(arguments.length === 2);
      assert(arguments[0] === 1);
      assert(arguments[1] === 2);
      assert(arguments[2] === "три");
    }, {})(1, 2, "три");
  });
});

mocha.run();
