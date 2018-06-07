/* добавить тесты */
"use strict";

describe("curry", function() {
    var target1, target2, target3, target4;
    beforeEach(function() {
        target1 = function(a, b, c, d) { return a + b + c + d; }
        target2 = function(a, b) { return a + b; }
        target3 = function(a, b, c) { return a + b + c; }
        target4 = function(a) { return a; }
    });
    it("функция", function() {
        return assert.isOk(typeof curry === "function");
    });
    it("curry(target1) берет 4 аргумента (1,2,3,4) и возвращает 10", function() {
        return assert.equal(curry(target1)(1)(2)(3)(4), 10);
    });
    it("curry(target2) берет 2 аргумента (5,8) и возвращает 13", function() {
        return assert.equal(curry(target2)(5)(8), 13);
    });
    it("curry(target3)берет 3 аргумента (2,3,4) и возвращает 9", function() {
        return assert.equal(curry(target3)(2)(3)(4), 9);
    });
    it("curry(target4) берет 1 аргумент (4) и возвращает 4", function() {
        return assert.equal(curry(target4)(4), 4);
    });
});