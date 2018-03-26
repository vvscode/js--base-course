/* Написать тесты на функции spiral и quadraticEquation */
describe("spiral", function () {

    it("функция", function () {
        assert.isFunction(spiral);
    });

    it("возвращает массив", function () {
        var a = [4, 5];
        var b = [6, 7];
        assert.isOk(Array.isArray(spiral([a, b])) === true);
    });

    it("возвращает одномерный массив из 2x2 массивов", function () {
        var a = [[4, 5], [6, 7]];
        assert.deepEqual(spiral(a), [ 4, 5, 7, 6 ]);
    });
});
describe("quadraticEquation", function(){
    it("функция", function(){
        assert.isFunction(quadraticEquation);
    });

    it ("возвращает пустое значение при дискриминанте < 0", function(){
        assert.equal(quadraticEquation(1, -8, 72),('') );
    });

    it ("возвращает один корень при дискриминанте = 0", function(){
        assert.equal(quadraticEquation((1, 12, 36), -6));
    });

    it ("возвращает два значения при дискриминанте > 0", function(){
        assert.equal(quadraticEquation((1, 6, 1), (-0.1715728752538097, -5.82842712474619)));
    });
});