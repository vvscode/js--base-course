/* Написать тесты на функции spiral и quadraticEquation */
describe("spiral", () => {
    it("isFunction", () => {
          assert.isOk(typeof spiral === "function");
    });
    it("back array", function() {
         assert.isOk(Array.isArray(spiral([])));
    });
    it("correctly", () => {
        assert.deepEqual(spiral([1, 2, 3, 5]), [5, 1, 2, 3]);
        assert.deepEqual(spiral([[[4, 8, 2, 11, 1]], [[8, 7, 6, 3, 10]]]), [11, 1, 2, 10, 3, 4, 8, 6, 7, 8]);   
        assert.deepEqual(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [9, 1, 2, 8, 3, 4, 7, 5, 6]);
        assert.deepEqual(spiral([[1, 2, 3, 4, 5, 6], [7, 8, 9 , 10, 11, 12]]), [12, 1, 2, 11, 3, 4, 10, 5, 6, 9, 7, 8]);
     });
});
  