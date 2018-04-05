/* Написать тесты на функции spiral и quadraticEquation */
'use strict';
mocha.setup('bdd');
var assert = chai.assert;

describe('spiral', function() {
    it('функция', function() {
        return assert.isOk(typeof spiral === 'function');
    });
    it('работает с двухмерным массивом(2 элемента)', function() {
        return assert.isOk(isDeepEqual(spiral([[4,5], [6,7]]),[4,5,7,6]));
    });
    it('работает с двухмерным массивом(3 элемента)', function() {
        return assert.isOk(isDeepEqual(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5]));
    });
    it('работает с двухмерным массивом(4 элемента)', function() {
        return assert.isOk(isDeepEqual(spiral([[1, 2, 3, 4, 5],[6, 7, 8, 9, 10],[11, 12, 13, 14, 15],[16, 17, 18, 19, 20]]),[1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12]));
    });
});

describe('quadraticEquation', function() {
    it('функция', function() {
        return assert.isOk(typeof quadraticEquation === 'function');
    });
    it('пример 1 с вещественным корнем', function() {
        return assert.isOk(isDeepEqual(quadraticEquation(1, 12, 36),[-6]));
    });
    it('пример 2 с вещественными корнями', function() {
        return assert.isOk(isDeepEqual(quadraticEquation(1, 6, 1), [-0.1715728752538097, -5.82842712474619]));
    });
    it('пример 3 без вещественных корней', function() {
        return assert.isOk(isDeepEqual(quadraticEquation(1, -8, 72),[]));
    });
});

mocha.run();