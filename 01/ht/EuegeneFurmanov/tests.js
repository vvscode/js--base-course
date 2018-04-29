describe('spiral', function() {
    var arr = [[4, 5], [6, 7]];

    it('функция', function() {
        assert.equal(typeof spiral === 'function', true);
    });
    it('принимает на вход массив', function() {
        assert.equal(Array.isArray(arr), true);
    });
    it('принимает на вход многомерный массив', function() {
        function getTypeEl(el) {
            return Array.isArray(el);
        }
        return assert.equal(arr.every(getTypeEl) === true, true);
    });
    it('возвращает массив', function() {
        return assert.equal(Array.isArray(spiral(arr)), true);
    });
    it('принимает на вход массив из 2 массивов и возвращает одномерный спиральный массив', function() {
        assert.equal(spiral([[4, 5], [6, 7]]).join(), [4, 5, 7, 6].join());
    });
    it('принимает на вход массив из 3 массивов и возвращает одномерный спиральный массив', function() {
        assert.equal(
            spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).join(),
            [1, 2, 3, 6, 9, 8, 7, 4, 5].join()
        );
    });
    it('принимает на вход массив из 4 массивов и возвращает одномерный спиральный массив', function() {
        assert.equal(
            spiral([
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
                [11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20]
            ]).join(),
            [ 1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12 ].join()
        );
    });
});


describe('quadraticEquation', function() {
    it('функция', function() {
        return assert.equal(typeof quadraticEquation === 'function', true);
    });
    it('принимает 3 аргумента', function() {
        assert.equal(quadraticEquation.length, 3);
    });
    it('возвращает массив', function() {
        return Array.isArray(quadraticEquation(1, -8, 72)) === true;
    });
    it('возвращает массив с квадратными корнями', function() {
        assert.equal(quadraticEquation(1, -8, 72).join(), [].join());
        assert.equal(quadraticEquation(1, 12, 36).join(), [-6].join());
        assert.equal(
            quadraticEquation(1, 6, 1).join(),
            [-0.1715728752538097, -5.82842712474619].join()
        );
    });
});