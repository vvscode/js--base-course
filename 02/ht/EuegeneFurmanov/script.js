/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/** Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */

function bind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

Function.prototype.myBind = function(context) {
  var functionContext = this;
  return function() {
    return functionContext.apply(context, arguments);
  };
};

/**
 * создать объект с волшебным свойством,
 * чтобы при присвоении ему значения, в консоль выводилась текущая дата и значение, которое присваиваем.
 * А при чтении всегда выводилось число на 1 больше предыдущего
 * o.magicProperty = 5; // 'Sat Mar 24 2018 13:48:47 GMT+0300 (+03) -- 5'
 * console.log(o.magicProperty); // 6
 * console.log(o.magicProperty); // 7
 * console.log(o.magicProperty); // 8
 */

var o = {
  set magicProperty(value) {
    this.currentValue = value;
    this.currentData = new Date();
    console.log(this.currentData + " -- " + this.currentValue);
  },
  get magicProperty() {
    return ++this.currentValue;
  }
};

/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */

function User() {}

User.prototype.askName = function() {
  this.name = prompt("what is your name?");
  return this;
};
User.prototype.askAge = function() {
  this.age = prompt("what is your age?");
  return this;
};
User.prototype.showAgeInConsole = function() {
  console.log("your age is " + this.age);
  return this;
};
User.prototype.showNameInAlert = function() {
  alert("your name is " + this.name);
};

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */

function calculate(operator) {
  return function(operand1) {
    return function(operand2) {
      switch(operator) {
        case '+':
          return operand1 + operand2;
        case '-':
          return operand1 - operand2;
        case '*':
          return operand1 * operand2;
        case '/':
          return operand1 / operand2;
      }
    };
  };
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = (function() {
  var instance;
  function Singleton() {
    if (instance) return instance;
      instance = this;
  }
  return Singleton;
})();

/**
 * Создайте функцию ForceConstructor
 * которая работает как конструктор независимо от того,
 * вызвана она с new или без
 * и сохраняет параметры в создаваемый объект с именами параметров
 */

function ForceConstructor(a, b, c) {
  if (this instanceof ForceConstructor) {
    this.a = a;
    this.b = b;
    this.c = c;
  } else {
    return new ForceConstructor(a, b, c);
  }
}

/**
 * Написать фукнцию сумматор, которая будет работать
 * var s = sum();
 * log(s); // 0
 * log(s(1)); // 1
 * log(s(1)(2)); //3
 * log(s(3)(4)(5)); // 12
 * Число вызовов может быть неограниченым
 */

function sum() {
  var firstArg = arguments[0] || 0;
  function result(a) {
    return sum(firstArg + (a || 0));
  }
  result.valueOf = function() {
    return firstArg;
  };
  return result;
}

function log(x) {
  console.log(+x);
}

/**
 * Написать каррирующую функцию и покрыть ее тестами
 * Функция должна поддерживать каррирование функций с 2,3,4,5 параметрами
 * пример работы  функции
 *
 * function target1(a,b,c,d) { return a + b + c + d }
 * function target2(a,b) { return a + b }
 * curry(target1)(1)(2)(3)(4) // 10
 * curry(target2)(5)(8) // 13
 *
 * Примеры тестов смотреть в файле тестов
 *
 * Читать
 * http://prgssr.ru/development/vvedenie-v-karrirovanie-v-javascript.html
 * @param {*} func
 */

function curry(targetFunction) {
  var numOfArgs = targetFunction.length;
  return function fn() {
    if (arguments.length < numOfArgs) {
      return fn.bind(null, ...arguments);
    } else {
      return targetFunction.apply(null, arguments);
    }
  };
}

/**
* Написать код, который для объекта созданного с помощью конструктора будет показывать,
* что объект является экземпляром двух классов
*/

function PreUser() {}
function User() {}

PreUser.prototype = Object.create(Array.prototype);
PreUser.prototype.constructor = PreUser;
User.prototype = Object.create(PreUser.prototype);
User.prototype.constructor = User;

/**
* Создать веб страницу. Добавить на нее форму с полями
* - имя (строкое поле),
* - родной город (выпадающий список),
* - комментарий (многострочное поле),
* - пол (radiobutton).
* При нажатии на кнопку - нужно собрать данные, введенные в поля и вывести их в блоке под формой,
* после чего поля очистить.
*/

/* решение задачи представлено в файле form.html */

/**
* Используя функцию drawCalendar из прошлого урока
* создать функцию drawInteractiveCalendar(el)
* Которая выводит календарь, в шапке которого отображается
* [<] месяц / год [>]
* При клике по кнопкам [<] / [>] нужно реализовать листание календаря
* Добавить на страницу index.html вызов календаря
*/

/* решение задачи представлено в файле calendar.html */


/**
 * создать функцию, которая не может работать как конструктор
 * (работать с new), и покрыть ее тестами
 */

function isConstructor() {
  if (new.target) {
    throw new TypeError("function can not be a constructor");
  }
  console.log("function is not constructor");
}
