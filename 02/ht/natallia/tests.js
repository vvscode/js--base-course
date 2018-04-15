'use strict';

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
mocha.setup('bdd');
var assert = chai.assert;

describe('curry', function() {
  function target1(a, b) {
    return a + b;
  }
  function target2(a, b, c) {
    return a + b + c;
  }
  function target3(a, b, c, d) {
    return a + b + c + d;
  }
  function target4(a, b, c, d, e) {
    return a + b + c + d + e;
  }

  it('функция', function() {
    assert.isOk(typeof curry === 'function');
  });
  it('функция с 2 параметрами вернет верное значение', function() {
    assert.isOk(curry(target1)(5)(8) === 13);
  });
  it('функция с 3 параметрами вернет верное значение', function() {
    assert.isOk(curry(target2)(5)(8)(10) === 23);
  });
  it('функция с 4 параметрами вернет верное значение', function() {
    assert.isOk(curry(target3)(5)(8)(10)(12) === 35);
  });
  it('функция с 5 параметрами вернет верное значение', function() {
    assert.isOk(curry(target4)(1)(2)(3)(4)(5) === 15);
  });
});

describe('isConstructor', function() {
  it('функция', function() {
    assert.isOk(typeof isConsructor === 'function');
  });
  it('возвращает ошибку при вызове с new', function() {
    var error;
    try {
      var newConst = new isConsructor();
    } catch (e) {
      if (e instanceof TypeError) {
        error = e.message;
      }
    }
    assert.isOk(error === 'function isConstructor is not a constructor');
  });
  it('не вызывает ошибку с вызовом без new', function() {
    var error;
    try {
      var constr = isConsructor();
    } catch (e) {
      if (e instanceof TypeError) {
        assert.isOk(error === undefined);
      }
    }
  });
});

describe('getCounter', function() {
  it('функция', function() {
    assert.isOk(typeof getCounter === 'function');
  });
  it('методы являются функциями', function() {
    assert.isOk(typeof getCounter(5).log === 'function');
    assert.isOk(typeof getCounter(5).add === 'function');
    assert.isOk(typeof getCounter(5).reset === 'function');
  });
  it('методы работают корректно', function() {
    var log = console.log;
    var logValue = [];

    console.log = function() {
      logValue.push.apply(logValue, arguments);
      log.apply(console, arguments);
    };

    var s = getCounter(4);
    s.log();
    assert.equal(logValue.join(), '4', 'правильно отрабатывает .log');

    logValue = [];
    s.add(3).log();
    assert.equal(logValue.join(), '7', 'правильно отрабатывает .add');

    logValue = [];
    s.reset().log();
    assert.equal(logValue.join(), '4', 'правильно отрабатывает .reset');
  });
  it('цепочка методов, вызванная друг за другом, работает корректно', function() {
    var log = console.log;
    var logValue = [];

    console.log = function() {
      logValue.push.apply(logValue, arguments);
      log.apply(console, arguments);
    };

    var c = getCounter(5);
    c
      .log()
      .add(4)
      .log()
      .add(3)
      .log()
      .reset()
      .log()
      .add(8)
      .log();
    assert.equal(logValue.join(), '5,9,12,5,13');
  });
});

describe('throttle(func, delay)', function() {
  var value = 0;
  function func(a) {
    value += a;
  }
  var testThrottle = throttle(func, 200);

  it('функция', function() {
    assert.isOk(typeof throttle === 'function');
  });
  it('первый вызов без задержки сработал', function() {
    testThrottle(1);
    assert.equal(value, 1);
  });
  it('преждевременный второй вызов не сработал', function() {
    setTimeout(function() {
      testThrottle(1);
    }, 50);
    assert.equal(value, 1);
  });
  it('второй вызов после истечения указанного времени сработал', function() {
    setTimeout(function() {
      assert.equal(value, 2);
    }, 200);
  });
  it('третий вызов сработал', function() {
    setTimeout(function() {
      testThrottle(1);
    }, 200);
  });
});

describe('drawInteractiveCalendar', function() {
  var monthAdjustment = -1;
  var el, elHeader;
  beforeEach(function() {
    el = document.createElement('div');
    elHeader = document.createElement('div');
  });
  it('функция', function() {
    assert.isOk(typeof drawInteractiveCalendar === 'function');
  });
  it('принимает html-элемент аргументом', function() {
    drawInteractiveCalendar(el, 2018, 1, elHeader);
    assert.isOk(el.innerHTML.trim() !== '');
  });
  it('возвращает разный html для разных месяцев', function() {
    drawInteractiveCalendar(el, 2018, 1, elHeader);
    var el1 = el.innerHTML;
    drawInteractiveCalendar(el, 2018, 2, elHeader);
    var el2 = el.innerHTML;
    assert.isOk(el1 !== el2);
  });
  it('возвращает правильную дату', function() {
    drawInteractiveCalendar(el, 2018, 4, elHeader);
    assert.isOk(el.innerHTML.indexOf('30') > 1);
    assert.isOk(el.innerHTML.indexOf('31') < 1);
    drawInteractiveCalendar(el, 2018, 2, elHeader);
    assert.isOk(el.innerHTML.indexOf('28') > 1);
    assert.isOk(el.innerHTML.indexOf('29') < 1);
  });
  it('Отображаемая дата соответствует дате в календаре', function() {
    drawInteractiveCalendar(el, 2018, 4, elHeader);
    var date = new Date(2018, 4 + monthAdjustment);
    var span = elHeader.querySelector('.calendar-header__span');
    var writeMonth = date.toLocaleString('ru', { month: 'long' });
    var writeYear = date.toLocaleString('ru', { year: 'numeric' });
    assert.isOk(span.innerHTML === writeMonth + ' ' + writeYear);
  });
  it('нажатие кнопки "назад" отображает предыдущий месяц', function() {
    drawInteractiveCalendar(el, 2018, 3, elHeader);
    elHeader.querySelector('button[data-btn="prev"]').click();
    assert.isOk(el.innerHTML.indexOf('28') > 1);
    assert.isOk(el.innerHTML.indexOf('29') < 1);
  });
  it('при нажатии кнопки "назад" дата в календаре соответствует дате в заголовке', function() {
    drawInteractiveCalendar(el, 2018, 4, elHeader);
    elHeader.querySelector('button[data-btn="prev"]').click();
    var date = new Date(2018, 4 - 1 + monthAdjustment);
    var writeMonth = date.toLocaleString('ru', { month: 'long' });
    var writeYear = date.toLocaleString('ru', { year: 'numeric' });
    assert.equal(
      elHeader.querySelector('span').innerHTML,
      writeMonth + ' ' + writeYear
    );

    drawInteractiveCalendar(el, 2018, 1, elHeader);
    elHeader.querySelector('button[data-btn="prev"]').click();
    date = new Date(2018, 1 - 1 + monthAdjustment);
    writeMonth = date.toLocaleString('ru', { month: 'long' });
    writeYear = date.toLocaleString('ru', { year: 'numeric' });
    assert.equal(
      elHeader.querySelector('span').innerHTML,
      writeMonth + ' ' + writeYear
    );
  });
  it('при нажатии кнопки "назад" возвращает правильную дату', function() {
    drawInteractiveCalendar(el, 2018, 3, elHeader);
    elHeader.querySelector('button[data-btn="prev"]').click();
    assert.isOk(el.innerHTML.indexOf('28') > 1);
    assert.isOk(el.innerHTML.indexOf('29') < 1);
  });
  it('нажатие кнопки "вперед" отображает следующий месяц', function() {
    drawInteractiveCalendar(el, 2018, 1, elHeader);
    elHeader.querySelector('button[data-btn="next"]').click();
    assert.isOk(el.innerHTML.indexOf('28') > 1);
    assert.isOk(el.innerHTML.indexOf('29') < 1);
  });
  it('при нажатии кнопки "вперед" дата в календаре соответствует дате в заголовке', function() {
    drawInteractiveCalendar(el, 2018, 4, elHeader);
    elHeader.querySelector('button[data-btn="next"]').click();
    var date = new Date(2018, 4 + 1 + monthAdjustment);
    var writeMonth = date.toLocaleString('ru', { month: 'long' });
    var writeYear = date.toLocaleString('ru', { year: 'numeric' });
    assert.equal(
      elHeader.querySelector('span').innerHTML,
      writeMonth + ' ' + writeYear
    );

    drawInteractiveCalendar(el, 2017, 11, elHeader);
    elHeader.querySelector('button[data-btn="next"]').click();
    elHeader.querySelector('button[data-btn="next"]').click();
    date = new Date(2017, 11 + 2 + monthAdjustment);
    writeMonth = date.toLocaleString('ru', { month: 'long' });
    writeYear = date.toLocaleString('ru', { year: 'numeric' });
    assert.equal(
      elHeader.querySelector('span').innerHTML,
      writeMonth + ' ' + writeYear
    );
  });
  it('при нажатии кнопки "вперед" возвращает правильную дату', function() {
    drawInteractiveCalendar(el, 2018, 1, elHeader);
    elHeader.querySelector('button[data-btn="next"]').click();
    assert.isOk(el.innerHTML.indexOf('28') > 1);
    assert.isOk(el.innerHTML.indexOf('29') < 1);
  });
});
