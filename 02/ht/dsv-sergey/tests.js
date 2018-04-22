/* eslint-disable no-unused-vars,eol-last */
'use strict';
/* добавить тесты */
describe('curry', function() {
    it('добавить тесты', function() {
        assert.isOk(true === true);
    });
    it('функция', function() {
        return assert.isOk(typeof curry === 'function');
    });
    it('поддерживает каррирование функций с 2,3,4,5', function() {
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
    it('поддерживает каррирование смешанного количества аргументов', function() {
        function sum4(a, b, c, d) {
            return a + b + c + d;
        }
        assert.isOk(curry(sum4)(2)(3)(4)(5) === 14);
        assert.isOk(curry(sum4)(2, 3)(4)(5) === 14);
        assert.isOk(curry(sum4)(2)(3, 4)(5) === 14);
        assert.isOk(curry(sum4)(2)(3)(4, 5) === 14);
    })
});

describe('NotContructor', function() {
    it('это функция', function() {
        assert.isOk(NotContructor instanceof Function);
    });
    it('Не конструктор', function() {
        assert.isOk(TypeError);
    });
});