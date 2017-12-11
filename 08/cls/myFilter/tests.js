'use strict';
mocha.setup('bdd');
let assert = chai.assert;
describe('.myFilter', function() {
  it('is function', function() {
    return assert.isFunction([].myFilter);
  });

  it('needs cb as first param', function() {
    let ok = true;
    try {
      [].myFilter();
    } catch (e) {
      ok = false;
    }
    assert.equal(ok, false);
  });

  it('return list', function() {
    return assert.ok(
      [].myFilter(function() {
        return true;
      }) instanceof Array
    );
  });

  it('returns empty list for falsy cb', function() {
    return assert.ok(
      [1, 2, 3].myFilter(function() {
        return false;
      }).length === 0
    );
  });
  it('returns copy list for truthly cb', function() {
    return assert.deepEqual(
      [1, 2, 3].myFilter(function() {
        return true;
      }),
      [1, 2, 3]
    );
  });
  it('returns copy list for truthly cb', function() {
    return assert.deepEqual(
      [1, 2, 3].myFilter(function() {
        return 'some truthly param';
      }),
      [1, 2, 3]
    );
  });
  it('returns filtered list', function() {
    return assert.deepEqual(
      [1, 2, 3].myFilter(function(i) {
        return i % 2;
      }),
      [1, 3]
    );
  });

  it('calls passed cb', function() {
    let list = [1, 2, 3];
    let spy = sinon.spy();
    list.myFilter(spy);
    assert.equal(spy.callCount, list.length);
  });

  it('calls passed cb only for existing values', function() {
    let list = [1, , , 3];
    let spy = sinon.spy();
    list.myFilter(spy);
    assert.equal(spy.callCount, 2);
  });

  it('calls cb with params', function() {
    let list = [1, 2, 3];
    let spy = sinon.spy();
    list.myFilter(spy);

    assert.equal(spy.args.length, list.length);
    list.forEach(function(item, index) {
      return assert.deepEqual(spy.args[index], [item, index, list]);
    });
  });

  it('use passed thisArgs', function() {
    let that = undefined;

    let context = {name: 'fake object '};
    [1].myFilter(function() {
      that = this;
    }, context);
    assert.equal(that, context);
  });

  it('use `undefined` as thisArgs by default', function() {
    let that = 1;
    [1].myFilter(function() {
      that = this;
    });
    assert.isUndefined(that);
  });

  it('call cb only on initial state of list', function() {
    let list = [1, 2, 3];
    let initialLength = list.length;
    let counter = 0;

    list.myFilter(function() {
      if (list.length < 4) {
        list.push(1);
      }
      counter++;
    });
    assert.equal(counter, initialLength);
  });
});

mocha.run();
