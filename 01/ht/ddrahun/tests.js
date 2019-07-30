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

  function areNumberArraysEqual(array1, array2) {
    return (
      array1.length === array2.length &&
      array1.sort().every(function(value, index) {
        return value === array2.sort()[index];
      })
    );
  }
});
