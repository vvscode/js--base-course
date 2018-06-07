var assert = require("assert");

describe("isDeepEqual", function() {
  it("function", function() {
    return assert(typeof isDeepEqual === "function", true);
  });
  it("return true/false", function() {
    return assert(typeof isDeepEqual("", "") === "boolean", true);
  });
  it("recognize same strings", function() {
    return assert(isDeepEqual("hello", "hello") === true, true);
  });
  it("recognize different strings", function() {
    return assert(isDeepEqual("hi", "hello") === false, true);
  });
  it("recognize different arrays", function() {
    return assert(isDeepEqual([1, 4, 2], [1, 2, 4]) === false, true);
  });
  it("recognize same arrays", function() {
    return assert(isDeepEqual([1, 2, 4, 3], [1, 2, 4, 3]) === true, true);
  });
  var a = { prop1: 1, list: [1, 2, 3], o: { x: 2 } };
  var b = { list: [1, 2, 3], o: { x: 2 } };
  it("recognize different objects", function() {
    return assert(isDeepEqual(a, b) === false, true);
  });
  it("recognize same objects", function() {
    b.prop1 = 1;
    return assert(isDeepEqual(a, b) === true, true);
  });
  it("recognize same numbers", function() {
    var a = 1;
    var b = 1.0;
    return assert(isDeepEqual(a, b) === true, true);
  });
  it("recognize different numbers", function() {
    let a = 1;
    let b = 2;
    return assert(isDeepEqual(a, b) === false, true);
  });
});

