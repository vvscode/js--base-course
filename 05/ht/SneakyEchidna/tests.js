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
  });
  describe('once', () => {
    it('once is a EventBus method', () => {
      assert.isOk(typeof new EventBus().once === 'function');
    });
  });
});

mocha.run();
