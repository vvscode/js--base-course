/* Написать тесты на функции spiral и quadraticEquation */

describe("spiral", function () {
    it("функция", function () {
        return assert.isOk(typeof spiral === "function");
    });

    it("  двумерный правильно раскручен", function () {
        let a = spiral([[4, 5], [6, 7]]);
        let b = [4, 5, 7, 6];
        return assert.isOk(isDeepEqual(a, b) === true);
    });

    it( "трёхмерный правильно раскручен", function () {
        let a = spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
        let b = [1, 2, 3, 6, 9, 8, 7, 4, 5];
        return assert.isOk(isDeepEqual(a, b) === true);
    });
    it(" четырёхместный правильно раскручен", function () {

        let a = spiral([
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20]
        ]);
        let b = [1, 2, 3, 4, 5, 10, 15, 20, 19, 18, 17, 16, 11, 6, 7, 8, 9, 14, 13, 12];
        return assert.isOk(isDeepEqual(a, b) === true);
    });

    it(" работает c  7x3 массивом", function () {

        let a = spiral([[1,2,3,4,5,6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20,21]]);
        let b = [1,2,3,4,5,6,7,14,21,20,19,18,17,16,15,8,9,10,11,12,13];
        return assert.isOk(isDeepEqual(a, b) === true);
    });

    it(" работает c 2х4 массивом", function () {

        let a = spiral([[1,2],[3,4],[5,6],[7,8]]);
        let b = [1,2,4,6,8,7,5,3];
        return assert.isOk(isDeepEqual(a, b) === true);
    });

});

describe("quadraticEquation", function () {
    it("функция", function () {
        return assert.isOk(typeof quadraticEquation === "function");
    });

    it("0, 2, 18 - решает линейные уравнения", function () {
        let a = quadraticEquation(0, 2, 18);
        let b = [-9];
        return assert.isOk(isDeepEqual(a, b) === true);
    });

    it("1, -8, 72 - корней нет", function () {
        let a = quadraticEquation(1, -8, 72);
        let b = [];
        return assert.isOk(isDeepEqual(a, b) === true);
    });

    it("1, 12, 36 - один корень -6", function () {
        let a = quadraticEquation(1, 12, 36);
        let b = [-6];
        return assert.isOk(isDeepEqual(a, b) === true);
    });
    it("1, 6, 1- правильный результат ( 2 корня)", function () {
        let a = quadraticEquation(1, 6, 1);
        let b = [-0.1715728752538097, -5.82842712474619];
        let c = [-5.82842712474619, -0.1715728752538097];
        return assert.isOk((isDeepEqual(a, b) || isDeepEqual(a, c)) === true);
    });

});
