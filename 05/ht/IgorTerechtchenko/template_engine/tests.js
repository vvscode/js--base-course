'use strict';

describe('compileTemplate', function() {
  var template;
  var el;
  var data;
  beforeEach(function() {
    template = '{{name}} is {{age}} years old'; 
    el = document.createElement('div');
    data = { name: 'Bob', age: 33 }; 
  });
  afterEach(function() {
    el.innerHTML = '';
  });

  it('is a function', function() {
    return assert.isOk(typeof compileTemplate === 'function');
  });
  it('returns a function', function() {
    return assert.isOk(typeof compileTemplate() === 'function');
  });
  it('returns a function with two arguments', function() {
    return assert.isOk(compileTemplate().length === 2);
  });
  it('returns a function which edits el.innerHTML according to specified template and data', function() {
    compileTemplate(template)(el, data);
    return assert.isOk(el.innerHTML === 'Bob is 33 years old'); 
  });
});
