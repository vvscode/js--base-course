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
});

describe('myCall', () => {
  it ('The function', () => {
    assert.isTrue(typeof Function.prototype.myCall === 'function');
  });
  it ('Call origin function', () => {
    let abc;
    (_ => { abc = 123 }).myCall(this);
    assert.isTrue(abc === 123);
  });
  it ('Return result of origin function', () => { 
    assert.isTrue((_ => 123456).myCall(this) === 123456);
  });
  it ('If context is falsy, then will call with window', () => {
    assert.isTrue((_ => this).myCall() === window);
    assert.isTrue((_ => this).myCall(null) === window);
  });
  it ('Call the function with the transmitted context', () => { 
    assert.equal((function () {return this.name}).myCall({name: 'Sergey'}), 'Sergey');
  });
  it ('Transfer arguments', () => { 
    assert.equal(((a, b, c) => a + b * c).myCall(null, 2, 2, 2), 6);
    assert.equal(((a, b, c) => (a + b) * c).myCall(null, 3, 4, 5), 35);
  });
});

describe(`don't work with 'new'`, () => {
  it ('The function', () => {
    assert.isTrue(typeof notConstructor === 'function');
  });
  it (`Do not work with 'new'`, () => {
    let abc;
    try {
      abc = new notConstructor();
    }
    catch(e) {
      assert.isTrue(typeof e === 'object');
    };
    assert.isFalse(typeof abc === 'object');
  });
});

describe('getCounter', () => {
  it ('The function', () => {
    assert.isTrue(typeof getCounter === 'function');
  });
  it ('Return wrapper of function', () => {
    assert.isTrue(typeof getCounter() === 'function');
  });
  it ('Has .log, .add, .reset methods', () => {
    assert.isTrue(getCounter.hasOwnProperty('log'));
    assert.isTrue(getCounter.hasOwnProperty('add'));
    assert.isTrue(getCounter.hasOwnProperty('reset'));
  });
  it ('All methods are working', () => {
    const defaultLog = console.log;
    const arr = [];
    console.log = (value) => arr.push(value);
    getCounter(1)
      .log()
      .add(1)
      .add(2)
      .add(3)
      .log()
      .reset()
      .log()
      .add(5)
      .log()
      .log()
      .reset()
      .log();
    console.log = defaultLog;
    assert.equal(arr.toLocaleString(), `1,7,0,5,5,0`);
  });
  it ('Has a chain of calls', () => {
    let error;
    try {
      var c = getCounter(5);
      c.log()
        .add(4)
        .log()
        .add(3)
        .log()
        .reset()
        .log()
        .add(8)
        .log();
    }
    catch(e) {
      error = e;
    }
    assert.isTrue(!error);
    assert.equal(c, 8);
  });
});
