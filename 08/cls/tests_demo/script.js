mocha.setup('bdd');
const assert = chai.assert;

// CODE
const dummyDebounc = (func, delay) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  }
};

// TESTS below
describe('Simple tests', () => {
  it('0 is equal to 0', () => assert.equal(0, 0, 'should be equal')); // http://chaijs.com/api/assert/#method_equal
  it('Math.random is function', () => assert.isFunction(Math.random)); // http://chaijs.com/api/assert/#method_isfunction
});

// https://mochajs.org/#asynchronous-code
describe('dummyDebounce', () => {
  it('dummyDebounc is function', () => assert.isFunction(dummyDebounc));
  it('dummyDebounc returns function', () => assert.isFunction(dummyDebounc(() => null, 0)));
  it('call function with delay', (done) => {
    let counter = 0;
    let debouncedFunc = dummyDebounc(() => counter++, 0);
    debouncedFunc();
    assert.equal(counter, 0, 'should not incremenet counter');
    setTimeout(() => {
      assert.equal(counter, 1, 'should incremenet counter');
      done();
    }, 100)
  });
  it('call function twice cancel previous call', (done) => {
    // http://sinonjs.org/releases/v2.3.6/spies/
    let spy = sinon.spy();
    let debouncedFunc = dummyDebounc(spy, 0);
    debouncedFunc();
    // http://chaijs.com/api/assert/#method_isnotok
    assert.notOk(spy.called, 'should not be called');
    debouncedFunc();
    // http://chaijs.com/api/assert/#method_isok
    assert.isOk(spy.notCalled, 'should not be called');
    setTimeout(() => {
      // assert.isOk(spy.called, 'should be called');
      assert.equal(spy.callCount, 1, 'should be called once');
      done();
    }, 100)
  });
});

describe('Simple mock usage', () => {
  let eventBus;
  let element;
  let clicker;

  // https://mochajs.org/#hooks
  beforeEach(() => {
    eventBus = new EventBus();
    element = document.createElement('div');
  });

  it('should trigger event on click', () => {
    // http://sinonjs.org/releases/v2.0.0/spies/
    let spy = sinon.spy(eventBus, 'trigger');

    clicker = new Clicker(element, 0, eventBus);
    element.querySelector('button').click();
    assert.isOk(spy.called);
  });
});

mocha.run();