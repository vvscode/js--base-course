describe(`curry`, () => {
  it (`The function`, () => {
    assert.equal(typeof curry, `function`);
  });
  it (`Retun number`, () => {
    assert.equal(curry((a, b) => a + b)()(), 0);
  });
  it (`Work with 2 arguments`, () => {
    assert.equal(curry((a, b) => a + b)(1)(2), 3);
  });
  it (`Work with 3 arguments`, () => {
    assert.equal(curry((a, b, c) => a + b + c)(10)(20)(30), 60);
  });
  it (`Work with 4 arguments`, () => {
    assert.equal(curry((a, b, c, d) => a + b + c + d)(4)(5)(6)(7), 22);
  });
  it (`Work with 5 arguments`, () => {
    assert.equal(curry((a, b, c, d, e) => a + b + c + d + e)(4)(5)(6)(7)(8), 30);
  });
  it (`Work with missing arguments`, () => {
    assert.equal(curry((a, b, c, d, e) => a + b + c + d + e)()(false)(undefined)(null)(1), 1);
  });
  it (`Work with stringify arguments`, () => {
    assert.equal(curry((a, b, c) => a + b + c)('1')('5')('9'), 15);
  });
})