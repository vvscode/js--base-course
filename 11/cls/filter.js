// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// https://codepen.io/vvscode/pen/PKbvro?editors=1010
mocha.setup('bdd');
const assert = chai.assert;

// todo: remove this one and implement method by yourself
Array.prototype.myFilter = Array.prototype.filter;

describe('.myFilter', () => {
  it('is function', () => assert.isFunction([].myFilter));
  
  it('needs cb as first param', () => {
    let ok = true;
    try {
      [].myFilter();
    } catch(e) {
      ok = false;
    }
    assert.equal(ok, false);
  });
  
  it('return list', () => assert.ok([].myFilter(() => true) instanceof Array));
  
  it('returns empty list for falsy cb', () => assert.ok([1, 2,3].myFilter(() => false).length === 0));
  it('returns copy list for truthly cb', () => assert.deepEqual([1, 2,3].myFilter(() => true), [1,2,3]));
  it('returns copy list for truthly cb', () => assert.deepEqual([1, 2,3].myFilter(() => 'some truthly param'), [1,2,3]));
  it('returns filtered list', () => assert.deepEqual([1, 2,3].myFilter((i) => i % 2), [1,3]));

  it('calls passed cb', () => {
    var list = [1, 2, 3];
    let spy = sinon.spy();
    list.myFilter(spy);
    assert.equal(spy.callCount, list.length);
  });
  
  it('calls passed cb only for existing values', () => {
    var list = [1,,, 3];
    let spy = sinon.spy();
    list.myFilter(spy);
    assert.equal(spy.callCount, 2);
  });
  
  it('calls cb with params', () => {
    var list = [1, 2, 3];
    let spy = sinon.spy();
    list.myFilter(spy);
    
    assert.equal(spy.args.length, list.length);
    list.forEach((item, index) => assert.deepEqual(spy.args[index], [item, index, list]));
  });
  
  it('use passed thisArgs', () => {
    let that;
    
    let context = { name: 'fake object '};
    [1].myFilter(function() {
      that = this;
    }, context);
    assert.equal(that, context);
  });
  
  it('use `undefined` as thisArgs by default', () => {
    let that = 1;
    [1].myFilter(function() {
      that = this;
    });
    assert.isUndefined(that);
  });
  
  it('call cb only on initial state of list', () => {
    let list = [1,2,3]
    let initialLength = list.length;
    let counter = 0;

    list.myFilter(() => {
      counter ++;
      list.push(1);
    });
    assert.equal(counter, initialLength);
  });
 });

mocha.run();