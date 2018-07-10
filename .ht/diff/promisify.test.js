/* global mocha, chai, describe, it  */
/* global promisify, Hr, beforeEach */
mocha.setup({
  ui: 'bdd',
  bail: true,
});
const assert = chai.assert;

describe('promisify', () => {
  it('is a function', () => assert.equal(typeof promisify, 'function'));
  it('returns function', () => {
    assert.equal(typeof promisify(() => null), 'function');
  });
  it('result calls original function', () => {
    var x = 0;
    var fn = (_) => x++;
    var pFn = promisify(fn);
    assert.equal(x, 0);
    pFn();
    assert.equal(x, 1);
  });
  it('passes params into original function', () => {
    var x = 0;
    var fn = (y) => (x += y);
    var pFn = promisify(fn);
    assert.equal(x, 0);
    pFn(2);
    assert.equal(x, 2);
  });
  it('passes callback to original function', () => {
    var list = [];
    promisify((cb) => list.push(cb))();
    promisify((x, cb) => list.push(cb))(1);
    promisify((x, y, cb) => list.push(cb))(1, 2);
    promisify((x, y, z, c, a, b, cb) => list.push(cb))(1, 2, 3, 4, 5, 6);
    assert.equal(list.length, 4);
    list.forEach((i) => assert.isFunction(i));
  });
  it('calls original function in correct context', () => {
    var o = { name: 'Bob' };
    var x = null;
    var fn = function() {
      x = this;
    };
    o.pfn = promisify(fn);
    o.pfn();
    assert.equal(x, o);
  });
  describe('promisified', () => {
    it('returns promise', () => {
      var fn = () => null;
      assert.isOk(promisify(fn)() instanceof Promise);
    });
    it('rejects promise on error and pass error', (done) => {
      promisify((cb) => cb('xxx'))().catch((err) => {
        assert.equal(err, 'xxx');
        done();
      });
    });
    it('resolves promise on success and pass data', (done) => {
      promisify((cb) => cb(null, 'data'))().then((data) => {
        assert.equal(data, 'data');
        done();
      });
    });
  });
});

mocha.run();
