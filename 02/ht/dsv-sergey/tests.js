/* eslint-disable no-unused-vars */
'use strict';
/* добавить тесты */
describe('curry', function() {
    it('функция', function() {
        return assert.isOk(typeof curry === 'function');
    });
    it('поддерживает каррирование функций с 2,3,4,5', function() {
        let target0 = curry();
        assert.isOk(target0(a, b, c, d, e) === a + b + c + d + e);
        assert.isOk(target0(a, b, c, d) === a + b + c + d);
        assert.isOk(target0(a, b) === a + b);
        assert.isOk(target0(1, 2, 3, 4) === 10);
    });
});

