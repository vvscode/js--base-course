mocha.setup('bdd');
let assert = chai.assert;

describe('template', () => {
  let el;
  let template;
  let tpl = '{{name}} is {{age}} years old';
  beforeEach(() => {
    el = document.createElement('div');
    template = compileTemplate(tpl);
  });

  it('compileTemplate is a function', () => {
    assert.isOk(typeof template === 'function');
  });
  it('заменяет разметку на данные', () => {
    template(el, { name: 'Bob', age: 33 });
    assert.isOk(el.innerHTML === 'Bob is 33 years old');
  });
  it('может быть вызвана больше одного раза', () => {
    template(el, { name: 'Bob', age: 33 });
    template(el, { name: 'John', age: 33 });
    assert.isOk(el.innerHTML === 'John is 33 years old');
  });
});

describe('EventBus', () => {
  beforeEach(() => {
    eb = new EventBus();
  });
  it('is a function', () => {
    assert.isOk(typeof EventBus === 'function');
  });
  describe('trigger', () => {
    it('trigger is a EventBus method', () => {
      assert.isOk(typeof new EventBus().trigger === 'function');
    });
    it('trigger launches cb', () => {
      let a = 0;
      eb.on('someEvent', () => a++);
      eb.trigger('someEvent');
      assert.isOk(a === 1);
    });
    it('trigger launches cb with params', () => {
      let c;
      eb.on('someEvent', (a, b) => (c = a + b));
      eb.trigger('someEvent', 2, 3);
      assert.isOk(c === 5);
    });
    it('trigger works with different events', () => {
      let a = 0;
      let b = 0;
      eb.on('someEvent', (x) => (a = a + x));
      eb.on('otherEvent', (x) => (b = b + x));
      eb.trigger('someEvent', 1);
      eb.trigger('otherEvent', 1);
      assert.isOk(a === 1 && b === 1);
    });
  });
  describe('on', () => {
    it('on is a EventBus method', () => {
      assert.isOk(typeof new EventBus().on === 'function');
    });
    it('accepts two arguments', () => {
      assert.isOk(eb.on.length === 2);
    });
  });
  describe('off', () => {
    it('off is a EventBus method', () => {
      assert.isOk(typeof new EventBus().off === 'function');
    });
    it('off unsubscribes from event', () => {
      let a = 0;
      eb.on('someEvent', () => a++);
      eb.off('someEvent');
      eb.trigger('someEvent');
      assert.isOk(a === 0);
    });
  });
  describe('once', () => {
    it('once is a EventBus method', () => {
      assert.isOk(typeof new EventBus().once === 'function');
    });
    it('once launches callback only once', () => {
      let a = 0;
      eb.once('someEvent', (b) => (a += a + b));
      eb.trigger('someEvent', 1);
      eb.trigger('someEvent', 1);
      assert.isOk(a === 1);
    });
  });
});

mocha.run();
