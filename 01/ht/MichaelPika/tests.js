/* Написать тесты на функции spiral и quadraticEquation */
describe("spiral", function () {

    it("функция", function () {
        assert.isFunction(spiral);
    });

    it("возвращает одномерный массив из 2x2 массива", function () {
        assert.deepEqual(spiral([[4, 5], [6, 7]]), [ 4, 5, 7, 6 ]);
    });

    it("принимает на вход трёхмерный массив и возвращает одномерный массив с элементами", function () {
        assert.deepEqual(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [ 1,2,3,6,9,8,7,4,5 ]);
    });

    it("принимает на вход массив 5х4 и возвращает одномерный массив с элементами", function () {
        assert.deepEqual(spiral([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]),
            [ 1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12 ]);
    });
});
describe("quadraticEquation", function(){
    it("функция", function(){
        assert.isFunction(quadraticEquation);
    });

    it ("возвращает пустое значение при дискриминанте < 0", function(){
        assert.deepEqual(quadraticEquation(1, -8, 72),[]);
    });

    it ("возвращает один корень при дискриминанте = 0", function(){
        assert.deepEqual(quadraticEquation(1, 12, 36), [-6]);
    });

    it ("возвращает два значения при дискриминанте > 0", function(){
        assert.deepEqual(quadraticEquation(1, 6, 1), [-0.1715728752538097, -5.82842712474619]);
    });
});