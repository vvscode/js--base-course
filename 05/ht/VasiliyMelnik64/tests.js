describe('compileTemplate', function () {
  var p = document.createElement('p');
  p.innerHTML = 'Hello! My name is {{name}}. I am {{age}}';
  p.style.display = 'none';
  document.body.insertBefore(p, document.body.firstElementChild);
  var tpl = p.innerHTML;
  var template = compileTemplate(tpl);

  template(document.querySelector('p'), {
    name: 'Bob',
    age: 33
  });

  it('функция', function () {
    return assert.isOk(typeof compileTemplate === 'function');
  });
  it('возвращает функцию', function () {
    return assert.isOk(typeof compileTemplate(null) === 'function');
  });

  it('возвращает преобразованную в текст строку', function () {
    p.innerHTML = 'Hello! My name is {{name}}.I am {{age}}';
    tpl = p.innerHTML;
    template = compileTemplate(tpl);
    template(document.querySelector('p'), {
      name: 'Bob',
      age: 33
    });
    return assert.isOk(p.innerHTML.indexOf('{') === -1 && p.innerHTML.indexOf('}') === -1);
  });

  it('работает только с шаблонами в фигурных скобках', function () {
    p.innerHTML = 'Hello! My name is [[name]].I am [[age]]';
    tpl = p.innerHTML;
    template = compileTemplate(tpl);
    template(document.querySelector('p'), {
      name: 'Bob',
      age: 33
    });
    return assert.isOk(tpl.indexOf('Bob') === -1);
  });
  it('работает только с шаблонами в двойных фигурных скобках', function () {
    p.innerHTML = 'Hello! My name is {name}.I am {age}';
    tpl = p.innerHTML;
    template = compileTemplate(tpl);
    template(document.querySelector('p'), {
      name: 'Bob',
      age: 33
    });
    return assert.isOk(tpl.indexOf('Bob') === -1);
  });
});
describe('EventBus', function () {
  var evBus = new EventBus();
  it('функция', function () {
    return assert.isOk(typeof EventBus === 'function');
  });

  it('добавляет события с обработчиками на каждое', function () {
    evBus.on('click', function () {
      return 1;
    });
    evBus.on('click', function () {
      return 2;
    });
    evBus.on('click', function () {
      return 3;
    });
    evBus.on('customProp', function () {
      return 1;
    });
    evBus.on('customProp', function () {
      return 2;
    });

    return assert.isOk(evBus.handlers['click'].length == 3);
    return assert.isOk(evBus.handlers['customProp'].length == 2);
  });

  it('удаляет события (по ссылке)', function () {
    function foo() {
      return 4;
    }
    evBus.on('foo', foo);
    assert.isOk(evBus.handlers['foo'].length == 1);
    evBus.off('foo', foo);
    assert.isOk(evBus.handlers['foo'].length == 0);
  });

  it('вызывает имеющиеся события', function () {
    var trig = 0;
    evBus.on('trig', function () {
      trig = 1;
    });
    evBus.trigger('trig');

    assert.isOk(trig == 1);
  });

  it('вызывает событие лишь 1 раз', function () {
    var count = 0;
    evBus.once('count', function () {
      count++;
    });
    evBus.trigger('count');
    evBus.trigger('count');
    evBus.trigger('count');
    evBus.trigger('count');
    evBus.trigger('count');

    assert.isOk(count == 1);
  });
});
