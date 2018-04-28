'use strict';

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
describe('isDeepEqual', function() {
  it('фунция', function() {
    return assert.isOk(typeof isDeepEqual === 'function');
  });
  it('возвращает true/false', function() {
    return assert.isOk(typeof isDeepEqual('', '') === 'boolean');
  });
  it('распознает одинаковые строки', function() {
    return assert.isOk(isDeepEqual('мама', 'мама') === true);
  });
  it('распознает разные строки', function() {
    return assert.isOk(isDeepEqual('мама', 'папа') === false);
  });

  it('распознаем разные массивы', function() {
    return assert.isOk(isDeepEqual([1, 4, 2], [1, 2, 4]) === false);
  });
  it('распознает одинаковые массивы', function() {
    return assert.isOk(isDeepEqual([1, 2, 4, 3], [1, 2, 4, 3]) === true);
  });
  it('распознает массивы разной длинны', function() {
    return assert.isOk(isDeepEqual([1, 2, 5], [1, 2, 5, 7]) === false);
  });

  var a = {prop1: 1, list: [1, 2, 3], o: {x: 2}};
  var b = {list: [1, 2, 3], o: {x: 2}};
  it('распознает разные объекты', function() {
    return assert.isOk(isDeepEqual(a, b) === false);
  });

  it('распознает одинаковые объекты', function() {
    b.prop1 = 1;
    return assert.isOk(isDeepEqual(a, b) === true);
  });

  it('распознает разные объекты', function() {
    var a = {a: 1, b: 3, c: 2};
    var b = {a: 1, b: 4, c: 2};
    return assert.isOk(isDeepEqual(a, b) === false);
  });

  it('распознает вложенные объекты', function() {
    var a = {a: 1, b: {x: 5}, c: 2};
    var b = {a: 1, b: {x: 5}, c: 2};
    return assert.isOk(isDeepEqual(a, b) === true);
  });

  it('распознает числа', function() {
    var a = 1;
    var b = 1.0;
    return assert.isOk(isDeepEqual(a, b) === true);
  });

  it('распознает разные числа', function() {
    let a = 1;
    let b = 2;
    return assert.isOk(isDeepEqual(a, b) === false);
  });

  it('Может работать с NaN', function() {
    let a = {NaN: NaN};
    let b = {NaN: NaN};

    assert.isOk(isDeepEqual(NaN, NaN) === true);
    assert.isOk(isDeepEqual(a, b) === true);
  });

  it('Moжет работать с рекурсивными ссылками', function() {
    var a = {
      prop: 1,
    };
    a.a = a;
    var b = {
      prop: 1,
    };
    b.a = b;
    assert.isOk(isDeepEqual(a, b) === true);
  });
});

describe('bind', function() {
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
      name: 'Some dummy context',
    };
    var originalBind = Function.prototype.bind;
  });
  afterEach(function() {
    Function.prototype.bind = originalBind;
  });
  it('функция', function() {
    assert.isOk(typeof bind === 'function');
  });
  it('Возвращает фукнцию', function() {
    assert.isOk(typeof bind(function() {}, {}) === 'function');
    assert.isOk(typeof bind(function() {}, null) === 'function');
  });
  it('Результат вызывает оригинальную фукнцию', function() {
    assert.isOk(counter === 0);
    let binded = bind(func, {});
    binded();
    assert.isOk(counter === 1);
    binded();
    assert.isOk(counter === 2);
  });
  it('Вызывает с правильным контекстом', function() {
    var context = {dummy: 'context'};
    const binded = bind(function() {
      assert.isOk(this === context);
    }, context);
    binded();
  });
  it('Пробрасывает параметры контекстом', function() {
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
      assert.isOk(arguments[2] === 'три');
    }, {})(1, 2, 'три');
  });
});

describe('.myBind', function() {
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
      name: 'Some dummy context',
    };
  });
  afterEach(function() {
    Function.prototype.bind = originalBind;
  });
  it('функция', function() {
    assert.isOk(typeof func.myBind === 'function');
  });
  it('Возвращает фукнцию', function() {
    assert.isOk(typeof function() {}.myBind({}) === 'function');
    assert.isOk(typeof function() {}.myBind(null) === 'function');
  });
  it('не использует встроенный .bind', function() {
    assert.isOk(func.myBind.toString().indexOf('.bind') < 0);
  });
  it('Результат вызывает оригинальную фукнцию', function() {
    assert.isOk(counter === 0);
    let binded = func.myBind({});
    binded();
    assert.isOk(counter === 1);
    binded();
    assert.isOk(counter === 2);
  });
  it('Вызывает с правильным контекстом', function() {
    var context = {dummy: 'context'};
    const binded = function() {
      assert.isOk(this === context);
    }.myBind(context);
    binded();
  });
  it('Пробрасывает параметры контекстом', function() {
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
      assert.isOk(arguments[2] === 'три');
    }.myBind({})(1, 2, 'три'));
  });
});

describe('calculate', function() {
  it('считает примеры', function() {
    assert.isOk(calculate('+')(1)(2) === 3);
    assert.isOk(calculate('*')(4)(2) === 8);
    assert.isOk(calculate('/')(9)(3) === 3);
    assert.isOk(calculate('-')(8)(7) === 1);
  });
});

describe('Singleton', function() {
  it('конструктор', function() {
    assert.isOk(typeof new Singleton() === 'object');
    assert.isOk(new Singleton() instanceof Singleton === true);
  });
  it('синглтон', function() {
    assert.isOk(new Singleton() === new Singleton());
  });
});

describe('ForceContructor', function() {
  it('работает как конструктор и сохраняет параметры в объекте', function() {
    var a = Math.random();
    var c = Math.random();
    var o = new ForceContructor(a, undefined, c);
    assert.isOk(typeof o === 'object');
    assert.isOk(o instanceof ForceContructor);
    assert.isOk(o.a === a);
    assert.isOk('b' in o);
    assert.isOk(o.b === undefined);
    assert.isOk(o.c === c);
  });
  it('работает как конструктор без new', function() {
    var a = Math.random();
    var c = Math.random();
    var o = ForceContructor(a, undefined, c);
    var o2 = new ForceContructor(a, undefined, c);
    var o3 = ForceContructor(a, undefined, c);
    assert.isOk(typeof o === 'object');
    assert.isOk(o instanceof ForceContructor === true);
    assert.isOk(o.a === a);
    assert.isOk('b' in o);
    assert.isOk(o.b === undefined);
    assert.isOk(o.c === c);
    assert.isOk(o !== o2);
    assert.isOk(o !== o3);
    assert.isOk(o2 !== o3);
  });
});

describe('sum', function() {
  it('функция', function() {
    assert.isOk(typeof sum === 'function');
  });
  it('по-умолчанию инициализируется нулем', function() {
    assert.isOk(+sum() === 0);
  });
  it('инициализируется числом', function() {
    assert.isOk(+sum(5) === 5);
  });
  it('складывает числа', function() {
    var s = sum(1);
    assert.isOk(+s(2) === 3);
    assert.isOk(+s(3) === 4);
    assert.isOk(+s(95) === 96);
  });
  it('складывает числа последовательно', function() {
    assert.isOk(+sum(1)(2) === 3);
    assert.isOk(+sum(5)(7)(9) === 21);

    var s = sum();
    for (var i = 0; i < 15; i++) {
      s = s(1);
    }
    assert.isOk(+s(1) === 16);
  });
  it('добавляет 0 по-умолчанию', function() {
    assert.isOk(+sum(4)() === 4);
    assert.isOk(+sum(7)()(2) === 9);
  });
  it('сумматоры независимые', function() {
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
  it('может отработать много раз', function() {
    var s = sum();
    for (var i = 0; i < 999; i++) {
      s = s(1);
    }
    assert.isOk(+s() === 999);
  });
});

describe('User / PreUser', function() {
  it('конструкторы', function() {
    var u = new User();
    var u2 = new User();
    assert.isOk(typeof User === 'function');
    assert.isOk(typeof PreUser === 'function');
    assert.isOk(new User() instanceof User);
    assert.isOk(new PreUser() instanceof PreUser);
    assert.isOk(u !== u2);
  });
  it('разные конструкторы', function() {
    assert.isOk(User !== PreUser);
  });
  it('создают правильное дерево наследования', function() {
    var u = new User();
    var u2 = new User();
    assert.isOk(u instanceof User);
    assert.isOk(u instanceof Array);
    assert.isOk(u instanceof PreUser);
  });
});

describe('curry', function() {
  function target1(a, b, c, d) {
    return a + b + c + d;
  }
  function target2(a, b) {
    return a + b;
  }
  it('is a function', function() {
    assert.isOk(typeof curry === 'function');
  });
  it('returns a function', function() {
    assert.isOk(typeof curry(target1(1, 2)) === 'function');
  });
  it('works with 2 argument function correctly', function() {
    assert.isOk(curry(target2)(1)(2) === 3);
  });
  it('works with 4 argument function correctly', function() {
    assert.isOk(curry(target1)(1)(2)(3)(4) === 10);
  });
});

describe('debounce', function() {
  function target(a) {
    a++;
  }
  it('is a function', function() {
    assert.isOk(typeof debounce === 'function');
  });
  it('returns a function', function() {
    assert.isOk(typeof debounce(target, 100) === 'function');
  });
  it('executes function after timeout', function() {
    function innerTarget() {
      a++;
    }
    var a = 0;
    var debounced = debounce(innerTarget, 1000);
    debounced();
    assert.isOk(a === 0);
    setTimeout(function() {
      assert.isOk(a === 1);
    }, 2000);
  });
});

describe('throttle', function() {
  function target(a) {
    a++;
  }
  it('is a function', function() {
    assert.isOk(typeof throttle === 'function');
  });
  it('returns a function', function() {
    assert.isOk(typeof throttle(target, 100) === 'function');
  });
  it('works as expected', function() {
    function target() {
      a++;
    }
    var a = 0;
    var throttled = throttle(target, 1000);
    throttled();
    throttled();
    assert.isOk(a === 0);
    setTimeout(function() {assert.isOk(a === 2);}, 2010);
  });

  it('processes leading option', function() {
    function targetA() {
      a++;
    }
    var a = 0;
    var throttledA = throttle(targetA, 1000, {leading: true});
    throttledA();
    throttledA();
    setTimeout(function() {assert.isOk(a === 1);}, 2010);
  });

  it('processes trailing option', function() {
    function targetA() {
      a++;
    }
    var a = 0;
    var throttledA = throttle(targetA, 1000, {trailing: true});
    throttledA();
    throttledA();
    setTimeout(function() {assert.isOk(a === 1);}, 2010);
  });
});

describe('notConstructor', function() {
  it('is a function', function() {
    assert.isOk(typeof notConstructor === 'function');
  });
  it('is not a constructor', function() {
    assert.throws(function() {new notConstructor();}, Error, 'this function is not a constructor');
  });
});

describe('drawInteractiveCalendar', function() {
  var el;
  beforeEach(function() {
      return el = document.createElement('div');
  });
  it('is a function', function() {
    assert.isOk(typeof drawInteractiveCalendar === 'function');
  });
  it('fills elements innerHtml', function() {
    drawCalendar(2017, 9, el);
    assert.isOk(el.innerHTML.trim() !== '');
  });
  it('generates separate calendar for different dates', function() {
    drawCalendar(2018, 6, el);
    var html1 = el.innerHTML;
    drawCalendar(2018, 7, el);
    var html2 = el.innerHTML;
    assert.isOk(html1 !== html2);
  });
  it('responds to button clicks correctly', function() {
    drawCalendar(2011, 12, el);
    var html1 = el.innerHTML;
    document.getElementsByTagName('button')[0].click();
    assert.isOk(html1 === el.innerHTML);
    document.getElementsByTagName('button')[1].click();
    drawCalendar(2012, 2, el);
    html1 = el.innerHTML;
    assert.isOk(html1 === el.innerHTML);
  });
});

describe('getCounter', function() {
  var logList = []
  beforeEach(function() { 
    function mockLog(arg) {
      logList.push(arg);
    }
    var log = console.log;
    console.log = mockLog;
  });
  afterEach(function() {
    console.log = log;
  });
  it('is a function', function() {
    assert.isOk(typeof getCounter === 'function');
  }); it('returns object', function() {
    assert.isOk(typeof getCounter(0) === 'object');
  });
  it('implements chain of responsibility pattern', function() {
    var c = getCounter(5);
    c.add(4).add(3).add(7).add(1).reset().add(5);
    assert.isOk(c.valueOf() === 5);
    c.log();
    assert.isOk(logList[0] === 5);
  });
});
