"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
mocha.setup("bdd");
var assert = chai.assert;

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

describe("curry", function() {
  function target2(a,b) { return a + b };
  var func1=curry(target2)(3);
  it("функция", function() {
        assert.isOk(typeof curry === "function");
    });
    it ("возвращает функцию", function(){
      assert.isOk(typeof func1==="function");
    })
    it("работает с функцией из 2 аргументов", function(){

        assert.isOk(func1(2)===5);
        assert.isOk(func1(0)===3);

    });
    it("работает с функцией из 3 аргументов", function(){
        function target3(a,b,c) { return a + b +c};
        var func1=curry(target3)(3);
        assert.isOk(func1(2)(4)===9);
        assert.isOk(func1(0)(0)===3);
        var func2=curry(target3)(2)(3);
        assert.isOk(func2(4)==9);
        assert.isOk(func2(0)==5);
    });
    it("работает с функцией из 4 аргументов", function(){
      function target4(a,b,c,d){return a+b+c+d};
      var func1=curry(target4)(3);
      assert.isOk(func1(2)(1)(4)==10);
      var func2=curry(func1)(2);
      assert.isOk(func2(5)(8)==18)
      var func3=curry(func2)(4);
      assert.isOk(func3(7)==16);
    });
    it("работает с функцией из 5 аргументов", function(){
    function target5(a,b,c,d,e){return a+b+c+d+e};
        var func1=curry(target5)(2);
        assert.isOk(func1(2)(1)(4)(7)==16);
        var func2=curry(target5)(2)(3);
        assert.isOk(func2(5)(8)(3)==21)
        var func3=curry(target5)(4)(7)(2);
        assert.isOk(func3(7)(6)==26);
        var func4=curry(target5)(0)(0)(0)(0);
        assert.isOk(func4(7)==7);
    });

});

describe ("debounce", function() {
    var testsum=0;
    function sum1(a,b){testsum=a+b};
    var debsum=debounce(sum1,1000);
    it("функция", function() {
        assert.isOk(typeof debounce === "function");
    });
    it ("возвращает функцию",function(){
          assert.isOk(typeof debsum=="function");
    });
    it("не вызовет функцию сразу же после первого вызова",function(){
        debsum(3,4);
      assert.isOk(testsum==7);
        debsum(5,55);
      assert.isOk(testsum==7);
    })
    it ("вызывает функцию, когда прошло достаточно времени после первого вызова", function(){
      setTimeout(function(){sum1(7,8)},1500);
      setTimeout(function(){assert.isOk(testsum==15)},2000);
      setTimeout(function(){sum1(5,22)},3000);
      setTimeout(function(){assert.isOk(testsum==27)},3600);
    })
});


describe("throttle(f, 1000)", function() {
    var f1000;
    var sum = 0;

    function f(a,b) {
        sum=a+b;
        return;
    }

    before(function() {
        f1000 = throttle(f, 1000);
        this.clock = sinon.useFakeTimers();
    });

    it("первый вызов срабатывает тут же", function() {
        f1000(1,4); // такой вызов должен сработать тут же
        assert.equal(sum,5);
    });

    it("тормозит второе срабатывание до 1000мс", function() {
        f1000(2,5); // (тормозим, не прошло 1000мс)
        f1000(3,9); // (тормозим, не прошло 1000мс)
        // через 1000 мс запланирован вызов с последним аргументом

        assert.equal(sum, 5); // пока что сработал только первый вызов

        this.clock.tick(1000); // прошло 1000мс времени
        assert.equal(sum, 12); // sum==13, т.к. сработал вызов f1000(9,3)
    });

    it("тормозит третье срабатывание до 1000мс после второго", function() {
        this.clock.tick(100);
        f1000(4,0); // (тормозим, с последнего вызова прошло 100мс - менее 1000мс)
        this.clock.tick(100);
        f1000(1,0); // (тормозим, с последнего вызова прошло 200мс - менее 1000мс)
        this.clock.tick(700);
        f1000(2,0); // (тормозим, с последнего вызова прошло 900мс - менее 1000мс)

        this.clock.tick(100); // сработал вызов с 2,0

        assert.equal(sum,2);
    });

    after(function() {
        this.clock.restore();
    });

});
mocha.run();
