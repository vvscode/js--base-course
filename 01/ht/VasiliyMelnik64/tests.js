/* Написать тесты на функции spiral и quadraticEquation */
describe("spiral", function() {
    it("функция", function() {
      return assert.isOk(typeof spiral === "function");
    });
    it("возвращает массив", function() {
      return assert.isOk(Array.isArray(spiral([])));
    });
    it("[[4, 5], [6, 7]] по спирали - [4,5,7,6]", function() {
      return assert.deepEqual(spiral([[4, 5], [6, 7]]), [4,5,7,6]);
    });
    it("[[1, 2, 3], [4, 5, 6], [7, 8, 9]] по спирали - [1,2,3,6,9,8,7,4,5]", function() {
        return assert.deepEqual(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1,2,3,6,9,8,7,4,5]);
    });
    it("spiral([[1, 2, 3, 4, 5],[6, 7, 8, 9, 10],[11, 12, 13, 14, 15],[16, 17, 18, 19, 20]]) по спирали - [1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12]", function() {
        return assert.deepEqual(spiral([
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20]
          ]), [1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12]);
    });
});
  
describe("quadraticEquation", function() {
    it("функция", function() {
      return assert.isOk(typeof quadraticEquation === "function");
    });
    it("возвращает массив", function() {
        return assert.isOk(Array.isArray(quadraticEquation(1, 2, 3)));
    });
    it("квадратное уравнение x^2 - 8*x + 72 корней не имеет", function() {
      return assert.isOk(quadraticEquation(1, -8, 72).length === 0);
    });
    it("корень квадратного уравнения x^2 + 12*x + 36 единственный и равен -6", function() {
        return assert.isOk(quadraticEquation(1, 12, 36)[0] === -6);
    });
    it("корни квадратного уравнения 1*x^2 + 6*x + 1 равны -0.1715728752538097 и -5.82842712474619", function() {
        return assert.isOk(quadraticEquation(1, 6, 1)[0] === -0.1715728752538097 && quadraticEquation(1, 6, 1)[1] === -5.82842712474619);
      });
  });