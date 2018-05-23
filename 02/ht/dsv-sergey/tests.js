"use strict";
/* добавить тесты */
describe("curry", function() {
  it("добавить тесты", function() {
    assert.isOk(true === true);
  });
  it("функция", function() {
    return assert.isOk(typeof curry === "function");
  });
  it("поддерживает каррирование функций с 2,3,4,5", function() {
    function sum2(x, y) {
      return x + y;
    }
    function sum3(a, b, c) {
      return a + b + c;
    }
    function sum4(a, b, c, d) {
      return a + b + c + d;
    }
    assert.isOk(curry(sum2)(1)(2) === 3);
    assert.isOk(curry(sum3)(1)(2)(3) === 6);
    assert.isOk(curry(sum4)(2)(3)(4)(5) === 14);
  });
  it("поддерживает каррирование смешанного количества аргументов", function() {
    function sum4(a, b, c, d) {
      return a + b + c + d;
    }
    assert.isOk(curry(sum4)(2)(3)(4)(5) === 14);
    assert.isOk(curry(sum4)(2, 3)(4)(5) === 14);
    assert.isOk(curry(sum4)(2)(3, 4)(5) === 14);
    assert.isOk(curry(sum4)(2)(3)(4, 5) === 14);
  });
});
describe("NotContructor", function() {
  it("это функция", function() {
    assert.isOk(NotContructor instanceof Function);
  });
  it("Не конструктор", function() {
    try {
      var newNotContructor = new NotContructor();
    } catch (e) {
      assert.isOk(e instanceof TypeError);
      assert.isOk(e.message === '"NotContructor" is not a constructor.');
    }
  });
});
describe(".myCall", function() {
  var Test = function() {
    return this;
  };
  Test.prototype.myCall = function() {};
  var testMyCall = new Test();
  it(".myCall является методом", function() {
    assert.isOk("myCall" in testMyCall == true);
  });
  it(".myCall вызывает функцию greet с заданным контекстом", function() {
    var o = { name: 'Bob' };
    var greet = function() { return this.name; };
    var nameFn = greet.myCall(o);
    assert.isOk(nameFn === "Bob");
  });
  it(".myCall вызывает функцию с аргументами", function() {
    var sum = function (a, b) {
      return a + b;
    }
    assert.isOk(sum.myCall(null, 1, 2) === 3);
  });
  it(".myCall вызывает функцию с аргументами и заданным контекстом", function() {
    var user = {
      firstName: "Василий",
      surname: "Петров",
      patronym: "Иванович"
    };
    function showFullName(firstPart, lastPart) {
      return ( this[firstPart] + " " + this[lastPart] );
    }
    assert.isOk(showFullName.call(user, 'firstName', 'surname') === "Василий Петров");
  });
});

describe("throttle", function() {
  var log = [];

  function f(a) {
    log.push(a);
  }

  var testThrottle = throttle(f, 1000);
  it("функция", function() {
    assert.isOk(typeof throttle === "function");
  });
  it("первый вызов сработает сразу", function() {
    testThrottle(1);
    assert.deepEqual(log, [1], "log == [1]");
  });
  it("второй вызов тормозит после первого 1000 мс", function() {
    testThrottle(2);
    assert.deepEqual(log, [1], "log == [1]");
  });
  it("трейтий вызов тормозит после первого 1000 мс", function() {
    testThrottle(3);
    assert.deepEqual(log, [1], "log == [1]");
  });
  it("через 1000 мс сработает только трейтий вызов", function() {
    setTimeout(function() {
      assert.deepEqual(
        log,
        [1, 3],
        "сработал трейтий вызов (после истечения таймера)"
      );
    }, 1000);
  });
  it("четвертый вызов тормозит после срабатывания третьего 1000 мс", function() {
    setTimeout(function() {
      testThrottle(4);
      assert.deepEqual(log, [1, 3], "log == [1, 3]");
    }, 0);
  });
});
describe("getCounter", function() {
  var log;
  var logList;
  beforeEach(function() {
    log = console.log;
    logList = [];
    console.log = function(a) {
      logList.push(a);
    };
  });
  afterEach(function() {
    logList = null;
    console.log = log;
  });
  var c = getCounter(5);
  it("getCounter функция", function() {
    assert.isOk(getCounter instanceof Function);
  });
  it(".log() выводит число переданное в функцию", function() {
    c.log();
    assert.deepEqual(logList, [5]);
  });
  it("складывает предыдущее значение с переданным через .add(4) и выводит результат в консоль через .log()", function() {
    c.log();
    assert.deepEqual(logList, [5]);
    c.add(4).log();
    assert.deepEqual(logList, [5, 9]);
  });
  it(".reset() сбрасывает счетчик на 0", function() {
    c.reset().log();
    assert.deepEqual(logList, [0]);
  });
  it("правильно поддерживает цепочку вызовов с.add(5).log().add(4).log().add(3).log().reset().log().add(8).log()", function() {
    c
      .add(5)
      .log()
      .add(4)
      .log()
      .add(3)
      .log()
      .reset()
      .log()
      .add(8)
      .log();
    assert.deepEqual(logList, [5, 9, 12, 0, 8]);
  });
});
describe("drawInteractiveCalendar", function() {
    it("drawInteractiveCalendar функция", function() {
        assert.isOk(drawInteractiveCalendar instanceof Function, 'функция');
    });
  it("строит календарь", function() {
    var show = document.getElementById('showCalendar');
    show.click();
    var calendar = document.getElementById('calendar');
    assert.isOk(calendar.firstElementChild !== null);
  });
  it("правильно выводит месяц и год", function(){
    var month = new Date().getMonth(),
        year = new Date().getFullYear(),
        monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        date = document.getElementById('captionDate');
    assert.isOk(  );
  });
});
d