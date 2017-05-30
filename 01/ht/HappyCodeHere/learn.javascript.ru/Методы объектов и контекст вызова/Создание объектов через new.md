## Создать Calculator при помощи конструктора

Напишите функцию-конструктор Calculator, которая создает объект с тремя методами:

Метод read() запрашивает два значения при помощи prompt и запоминает их в свойствах объекта.
Метод sum() возвращает сумму запомненных свойств.
Метод mul() возвращает произведение запомненных свойств.
Пример использования:

```javascript
var calculator = new Calculator();
calculator.read();

alert( "Сумма=" + calculator.sum() );
alert( "Произведение=" + calculator.mul() );
```

#### Решение:

```javascript
function Calculator() {
}

Calculator.prototype.read = function() {
  this.number1 = +prompt('Число 1:');
  this.number2 = +prompt('Число 2:');
}

Calculator.prototype.sum = function() {
  return this.number1 + this.number2;
}

Calculator.prototype.mul = function() {
  return this.number1 * this.number2;
}
```

## Создать Accumulator при помощи конструктора

Напишите функцию-конструктор Accumulator(startingValue). Объекты, которые она создает, должны хранить текущую сумму и прибавлять к ней то, что вводит посетитель.

Более формально, объект должен:

Хранить текущее значение в своём свойстве value. Начальное значение свойства value ставится конструктором равным startingValue.
Метод read() вызывает prompt, принимает число и прибавляет его к свойству value.
Таким образом, свойство value является текущей суммой всего, что ввел посетитель при вызовах метода read(), с учетом начального значения startingValue.

Ниже вы можете посмотреть работу кода:

```javascript
var accumulator = new Accumulator(1); // начальное значение 1
accumulator.read(); // прибавит ввод prompt к текущему значению
accumulator.read(); // прибавит ввод prompt к текущему значению
alert( accumulator.value ); // выведет текущее значение
```

#### Решение:

```javascript
function Accumulator(startingValue) {
  this.value = startingValue;
}

Accumulator.prototype.read = function() {
  this.value += +prompt('Добавить число:');
}
```

## Создайте калькулятор

Напишите конструктор Calculator, который создаёт расширяемые объекты-калькуляторы.

Эта задача состоит из двух частей, которые можно решать одна за другой.

Первый шаг задачи: вызов calculate(str) принимает строку, например «1 + 2», с жёстко заданным форматом «ЧИСЛО операция ЧИСЛО» (по одному пробелу вокруг операции), и возвращает результат. Понимает плюс + и минус -.

Пример использования:

```javascript
var calc = new Calculator;

alert( calc.calculate("3 + 7") ); // 10
```

Второй шаг – добавить калькулятору метод addMethod(name, func), который учит калькулятор новой операции. Он получает имя операции name и функцию от двух аргументов func(a,b), которая должна её реализовывать.

Например, добавим операции умножить *, поделить / и возвести в степень **:

```javascript
var powerCalc = new Calculator;
powerCalc.addMethod("*", function(a, b) {
  return a * b;
});
powerCalc.addMethod("/", function(a, b) {
  return a / b;
});
powerCalc.addMethod("**", function(a, b) {
  return Math.pow(a, b);
});

var result = powerCalc.calculate("2 ** 3");
alert( result ); // 8
```

1. Поддержка скобок и сложных математических выражений в этой задаче не требуется.
2. Числа и операции могут состоять из нескольких символов. Между ними ровно один пробел.
3. Предусмотрите обработку ошибок. Какая она должна быть – решите сами.

#### Решение:

```javascript
function Calculator() {

  this.operations = {
    '+': function(a, b) {
      return a + b;
    },
    '-': function(a, b) {
      return a - b;
    },
    '*': function(a, b) {
      return a * b;
    },
    '/': function(a, b) {
      return a / b;
    },
  };
}

Calculator.prototype.calculate = function(str) {
  str = str.split(' ');

  this.a = +str[0];
  this.b = +str[2];

  this.action = str[1];

  return this.operations[this.action](this.a, this.b);
}

Calculator.prototype.addMethod = function(name, func) {
  this.operations[name] = func;
}
```
