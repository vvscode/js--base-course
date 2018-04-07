/* Написать тесты на функции spiral и quadraticEquation */
describe("spiral", () => {
    it("isFunction", () => {
          assert.isOk(typeof spiral === "function");
    });
    it("back array", function() {
         assert.isOk(Array.isArray(spiral([])));
    });
    it("correctly", () => {
        assert.deepEqual(spiral([
            [4, 5], 
            [6, 7]]), [4,5,7,6]);
        assert.deepEqual(spiral([
            [1, 2, 3], 
            [4, 5, 6],
            [7, 8, 9]]), [1,2,3,6,9,8,7,4,5]);   
        assert.deepEqual(spiral( 
            [1,  2,  3,  4,   5],
            [6,  7,  8,  9,  10],
            [11, 12, 13, 14, 15],
            [16, 17, 18, 19, 20]), [1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12]);
     });
});
  
describe("quadraticEquation", () => {
  it("isFunction", () => {
        assert.isOk(typeof quadraticEquation === "function");
  });
  it("back array", function() {
       assert.isOk(Array.isArray(quadraticEquation([])));
  });
  it("correctly", () => {
    assert.isOk(quadraticEquation(1, -8, 72).length === 0);
    assert.isOk(quadraticEquation(1, 12, 36)[0] === -6);
    assert.isOk(quadraticEquation(1, 6, 1)[0] === -0.1715728752538097 && quadraticEquation(1, 6, 1)[1] === -5.82842712474619);
   });
});
