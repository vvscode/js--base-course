describe(`Check a spiral function`, () => {
  it(`The function`, () => {
    assert.equal(typeof spiral, `function`);
  });
  it(`Return array without arguments`, () => {
    assert.equal(Array.isArray(spiral()), true);
  });
  it(`Return array with any arguments`, () => {
    assert.equal(Array.isArray(spiral(null)), true);
    assert.equal(Array.isArray(spiral(undefined)), true);
    assert.equal(Array.isArray(spiral(NaN)), true);
    assert.equal(Array.isArray(spiral(1)), true);
    assert.equal(Array.isArray(spiral(`1`)), true);
    assert.equal(Array.isArray(spiral({})), true);
  });
  it(`Work correctly`, () => {
    assert.equal(spiral([1, 2]).join(), [1, 2].join());
    assert.equal(spiral([[4, 5], [6, 7]]).join(), [4,5,7,6].join());
    assert.equal(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).join(), [1,2,3,6,9,8,7,4,5].join());
    assert.equal(spiral([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20]
    ]).join(), [1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12].join());
  });
});

describe(`Check a quadraticEquation function`, () => {
  it(`The function`, () => {
    assert.equal(typeof quadraticEquation, `function`);
  });
  it(`Return array`, () => {
    assert.equal(Array.isArray(quadraticEquation()), true);
    assert.equal(Array.isArray(quadraticEquation(1, 2, 3)), true);
    assert.equal(Array.isArray(quadraticEquation(0, 0, 0)), true);
  });
  it(`Work correctly`, () => {
    assert.equal(quadraticEquation(1, -8, 72).join(), ``);
    assert.equal(quadraticEquation(1, 12, 36).join(), `-6`);
    assert.equal(((quadraticEquation(1, 6, 1)[0] === -0.1715728752538097 || -5.82842712474619) && (quadraticEquation(1, 6, 1).length === 2)), true);
  });
});