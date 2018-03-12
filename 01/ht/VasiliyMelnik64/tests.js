/* Написать тесты на функции spiral и quadraticEquation */
describe("spiral", function() {
    it("функция", function() {
      return assert.isOk(typeof spiral === "function");
    });
    it("возвращает массив", function() {
      return assert.isOk(Array.isArray(spiral([])) === true);
    });
    it("[[4, 5], [6, 7]] по спирали - [4,5,7,6]", function() {
      return assert.isOk(spiral([[4, 5], [6, 7]]).toString() === [4,5,7,6].toString());
    });
    it("[[1, 2, 3], [4, 5, 6], [7, 8, 9]] по спирали - [1,2,3,6,9,8,7,4,5]", function() {
        return assert.isOk(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).toString() === [1,2,3,6,9,8,7,4,5].toString());
    });
    it("spiral([[1, 2, 3, 4, 5],[6, 7, 8, 9, 10],[11, 12, 13, 14, 15],[16, 17, 18, 19, 20]]) по спирали - [1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12]", function() {
        return assert.isOk(spiral([
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20]
          ]).toString() === [1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12].toString());
    });


  });