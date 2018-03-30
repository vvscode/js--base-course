/* Написать тесты на функции spiral и quadraticEquation */
describe("spiral", () => {
    it("isFunction", () => {
          assert.isOk(typeof spiral === "function");
    });
    it("back array", function() {
         assert.isOk(Array.isArray(spiral([])));
    });
    it("correctly", () => {
        assert.deepEqual(spiral([1, 2, 3, 4]), [1, 2, 4, 3]);
        assert.deepEqual(spiral([[[4, 8, 2, 11, 1]], [[8, 7, 6, 3, 10]]]), [1, 2, 11, 3, 4, 10, 6, 7, 8, 8]);   
        assert.deepEqual(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [ 1, 2, 9, 3, 4, 8, 5, 6, 7]);
        assert.deepEqual(spiral([[1, 2, 3, 4, 5, 6], [7, 8, 9 , 10, 11, 12]]), [1, 2, 12, 3, 4, 11, 5, 6, 10, 7, 8, 9]);
     });
});
  
describe("quadraticEquation", () => {
  it("isFunction", () => {
        assert.isOk(typeof spiral === "function");
  });
  it("back array", function() {
       assert.isOk(Array.isArray(spiral([])));
  });
  it("correctly", () => {
    assert.isOk(quadraticEquation(1, -8, 72).length === 0);
    assert.isOk(quadraticEquation(1, 12, 36)[0] === -6);
    assert.isOk(quadraticEquation(1, 6, 1)[0] === -0.1715728752538097 && quadraticEquation(1, 6, 1)[1] === -5.82842712474619);
   });
});
