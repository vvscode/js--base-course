describe("spiral", function () {
    let testArr;
    beforeEach(() => {
        testArr = [
            [77, 88],
            [11, 33, 99],
            [22, 44, 55, 66],
        ]
    });

    it('функция', function () {
        return assert.isOk(typeof spiral === 'function');
    });
    it('принимает в качестве параметра произвольный двумерный массив', function () {
        return assert.equal(testArr.every(el => {
            return Array.isArray(el);
        }), true);
    })
    it('возвращает массив', function () {
        return assert.equal(Array.isArray(spiral(testArr)), true);
    });
    it('принимает в качестве параметра двумерный массив из 3-х числовых массивов произвольного размера и возвращает одномерный массив с элементами расположенными по спирали', function () {
        assert.equal(spiral(testArr).join(), [77, 88, 99, 66, 55, 44, 22, 11, 33].join());
    });
    it('принимает в качестве параметра двумерный массив из 5-и символьных массивов произвольного размера и возвращает одномерный массив с элементами расположенными по спирали', function () {
        assert.equal(spiral([
            ['Aa', 'Bb', 'Cc', 'Dd', 'Ee', 'Ff', 'Gg', 'Hh', 'Ii', 'Jj'],
            ['Ww', 'Xx', 'Kk'],
            ['Vv', 'Yy', 'Ll'],
            ['Uu', 'Zz', 'Mm'],
            ['Tt', 'Ss', 'Rr', 'Qq', 'Pp', 'Oo', 'Nn']
        ]).join(), ["Aa", "Bb", "Cc", "Dd", "Ee", "Ff", "Gg", "Hh", "Ii", "Jj", "Kk", "Ll", "Mm", "Nn", "Oo", "Pp", "Qq", "Rr", "Ss", "Tt", "Uu", "Vv", "Ww", "Xx", "Yy", "Zz"].join());
    });
});

describe("quadraticEquation", function () {
    let a, b, c;

    beforeEach(() => {
        a = 2; b = 10; c = 12;
    });

    it('функция', function () {
        return assert.isOk(typeof quadraticEquation === 'function');
    });
    it('функция ожидает три аргумента', function () {
        return assert.equal(quadraticEquation.length, 3);
    });
    it('возвращает массив', function () {
        return assert.equal(Array.isArray(quadraticEquation(a, b, c)), true);
    });
    it('если дискриминант меньше нуля (D < 0), функция возвращает пустой массив', function () {
        return assert.equal(quadraticEquation(1, -8, 72).length, 0);
    });
    it('если дискриминант равен нулю (D === 0), функция возвращает массив с единственным значением', function () {
        return assert.equal(quadraticEquation(1, 12, 36).length, 1);
    });
    it('если дискриминант больше нуля (D > 0), функция возвращает массив с 2-мя значениями', function () {
        return assert.equal(quadraticEquation((a, b, c)).length, 2);
    });
});