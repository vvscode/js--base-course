/* Написать тесты на функции spiral и quadraticEquation */
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});



describe("spiral", function() {
  it("функция", function() {
    return assert.isOk(typeof spiral === "function");
  });
  it("spiral([[4, 5], [6, 7]]) == [4,5,7,6]", function() {
    return assert.isOk(spiral([[4, 5], [6, 7]]).equals([4,5,7,6]));
  });

  it("spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == [1,2,3,6,9,8,7,4,5]", function() {
    return assert.isOk(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).equals([1,2,3,6,9,8,7,4,5]));
  });
  it("spiral([[1, 2, 3, 4, 5],[6, 7, 8, 9, 10],[11, 12, 13, 14, 15],[16, 17, 18, 19, 20]]) == [1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12] ", function() {
    return assert.isOk(spiral([[1, 2, 3, 4, 5],[6, 7, 8, 9, 10],[11, 12, 13, 14, 15],[16, 17, 18, 19, 20]]).equals([1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12]));
  });
});


describe("quadraticEquation", function() {
  it("функция", function() {
    return assert.isOk(typeof quadraticEquation === "function");
  });
  it("x^2 - 8*x + 72", function() {
    return assert.isOk(quadraticEquation(1, -8, 72).equals([]));
  });
  it("x^2 + 12*x + 36", function() {
    return assert.isOk(quadraticEquation(1, 12, 36).equals([-6]));
  });
  it("1*x^2 + 6*x + 1", function() {
    return assert.isOk(quadraticEquation(1, 6, 1).equals([-0.1715728752538097, -5.82842712474619]));
  });

});
