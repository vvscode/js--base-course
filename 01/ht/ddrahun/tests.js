describe("quadraticEquation", function() {
  it("функция", function() {
    return assert.isOk(typeof quadraticEquation === "function");
  });
  it("если дискриминант < 0, то количество корней равно 0", function() {
    var result = quadraticEquation(1, -8, 72).length;
    assert.isOk(result == 0);
  });
  it("если дискриминант > 0, то возвращает правильные корни", function() {
    var expectedResult = [-0.1715728752538097, -5.82842712474619];
    var result = quadraticEquation(1, 6, 1);
    assert.isTrue(areNumberArraysEqual(expectedResult, result));
  });
  it("если дискриминант = 0, то возвращает 1 корень", function() {
    var expectedResult = [-6];
    var result = quadraticEquation(1, 12, 36);
    assert.isTrue(areNumberArraysEqual(expectedResult, result));
  });
});

describe("spiral", function() {
  it("функция", function() {
    return assert.isOk(typeof spiral === "function");
  });
  it("если матрица имеет одинаковые размеры, то возвращает правильный результат", function() {
    var expectedResult = [1, 2, 3, 6, 9, 8, 7, 4, 5];
    var result = spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    console.log(result);
    assert.isOk(areNumberArraysEqual(result, expectedResult));
  });
  it("если матрица имеет разные размеры, то возвращает правильный результат", function() {
    var expectedResult = [
      1,
      2,
      3,
      4,
      5,
      10,
      15,
      20,
      19,
      18,
      17,
      16,
      11,
      6,
      7,
      8,
      9,
      14,
      13,
      12
    ];
    var result = spiral([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20]
    ]);
    console.log(result);
    assert.isOk(areNumberArraysEqual(result, expectedResult));
  });
});

function areNumberArraysEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.sort().every(function(value, index) {
      return value === array2.sort()[index];
    })
  );
}
