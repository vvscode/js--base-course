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
