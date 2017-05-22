## Создайте калькулятор

Создайте объект calculator с тремя методами:

read() запрашивает prompt два значения и сохраняет их как свойства объекта
sum() возвращает сумму этих двух значений
mul() возвращает произведение этих двух значений

```javascript
var calculator = {
  ...ваш код...
}

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );
```

#### Решение:

```javascript

var calculator = {
  a: null,
  b: null,

  read: function() {
    this.a = +prompt('Число 1:', 0);
    this.b = +prompt('Число 2:', 0);
  },

  sum: function() {
    return this.a + this.b;
  },

  mul: function() {
    return this.a * this.b;
  }
}
```

## Цепочка вызовов

Есть объект «лестница» ladder:

```javascript
var ladder = {
  step: 0,
  up: function() { // вверх по лестнице
    this.step++;
  },
  down: function() { // вниз по лестнице
    this.step--;
  },
  showStep: function() { // вывести текущую ступеньку
    alert( this.step );
  }
};
```

Сейчас, если нужно последовательно вызвать несколько методов объекта, это можно сделать так:

```javascript
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
```

Модифицируйте код методов объекта, чтобы вызовы можно было делать цепочкой, вот так:

```javascript
ladder.up().up().down().up().down().showStep(); // 1
```

Как видно, такая запись содержит «меньше букв» и может быть более наглядной.

Такой подход называется «чейнинг» (chaining) и используется, например, во фреймворке jQuery.

#### Решение:

```javascript
var ladder = {
  step: 0,
  up: function() { // вверх по лестнице
    this.step++;
    return this;
  },
  down: function() { // вниз по лестнице
    this.step--;
    return this;
  },
  showStep: function() { // вывести текущую ступеньку
    alert( this.step );
    return this;
  }
};
```
