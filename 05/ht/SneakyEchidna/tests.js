mocha.setup('bdd');
let assert = chai.assert;

describe('template', function() {
  let el;
  let template;
  let tpl = '{{name}} is {{age}} years old';
  beforeEach(function() {
    el = document.createElement('div');
    template = compileTemplate(tpl);
  });

  it('compileTemplate is a function', function() {
    return assert.isOk(typeof template === 'function');
  });
  it('заменяет разметку на данные', function() {
    template(el, { name: 'Bob', age: 33 });
    return assert.isOk(el.innerHTML === 'Bob is 33 years old');
  });
});

mocha.run();
