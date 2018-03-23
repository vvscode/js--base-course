/* Написать тесты на функции spiral и quadraticEquation */
'use strict';

// тесты функции spiral

describe('spiral', function() {
    it('is function', function() {
      return assert.isOk(typeof spiral === 'function');
    });
    it('should return [4, 5, 7, 6] for [[4, 5], [6, 7]]', function() {
        return assert.deepEqual(spiral([[4, 5], [6, 7]]), [4, 5, 7, 6]);
    });
    it('should return [1, 2, 3, 6, 9, 8, 7, 4, 5] for [[1, 2, 3], [4, 5, 6], [7, 8, 9]]', function() {
        return assert.deepEqual(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5]);
    });
    it('should return [1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12] for [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]', function() {
        return assert.deepEqual(spiral([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]), [1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12]);
    });
});

// тесты функции quadraticEquation

describe('quadraticEquation', function() {
    it('is function', function() {
      return assert.isOk(typeof quadraticEquation === 'function');
    });
    it('should return [] for quadraticEquation(1, -8, 72)', function() {
        return assert.deepEqual(quadraticEquation(1, -8, 72), []);
    });
    it('should return [-6] for quadraticEquation(1, 12, 36)', function() {
        return assert.deepEqual(quadraticEquation(1, 12, 36), [-6]);
    });
    it('should return [-5.82842712474619, -0.1715728752538097] for quadraticEquation(1, 6, 1);', function() {
        return assert.deepEqual(quadraticEquation(1, 6, 1), [-5.82842712474619, -0.1715728752538097]);
    });
});
