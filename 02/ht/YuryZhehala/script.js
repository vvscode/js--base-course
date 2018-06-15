/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по aсодержимому. Например
 * @param {*} objA
 * @param {*} objB
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(a, b) {
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a !== 'object') {
    if (
      typeof a === 'number' &&
      typeof b === 'number' &&
      isNaN(a) &&
      isNaN(b)
    ) {
      return true;
    }
    return a === b;
  }
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (var key in a) {
    if (a[key] !== a && !isDeepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
  return function () {
    return func.apply(context, arguments);
  };
}

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function (context) {
  var functionContext = this;
  return function () {
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
    console.log(this.currentData + ' -- ' + this.currentValue);
  },
  get magicProperty() {
    return ++this.currentValue;
  },
};

/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */
function User() { }
User.prototype.askName = function () {
  this.name = prompt('What is your name?');
  return this;
};
User.prototype.askAge = function () {
  this.age = prompt('How old are you?');
  return this;
};
User.prototype.showAgeInConsole = function () {
  console.log('Your age is ' + this.age);
  return this;
};
User.prototype.showNameInAlert = function () {
  alert('Your name is ' + this.name);
};

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(operator) {
  return function (operand1) {
    return function (operand2) {
      switch (operator) {
        case "+":
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
var Singleton = (function () {
  var instance;
  function Singleton() {
    if (instance) return instance;
    instance = this;
  }
  return Singleton;
})();
function Singleton() {
  throw 'undefined';
}

/**
 * Создайте функцию ForceConstructor
 * которая работает как конструктор независимо от того,
 * вызвана она с new или без
 * и сохраняет параметры в создаваемый объект с именами параметров
 */
function ForceContructor(a, b, c) {
  if (this instanceof ForceContructor) {
    this.a = a;
    this.b = b;
    this.c = c;
  } else return new ForceContructor(a, b, c);
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
  result.valueOf = function () {
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

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true
function PreUser() { }
function User() { }
PreUser.prototype = Object.create(Array.prototype);
PreUser.prototype.constructor = PreUser;
User.prototype = Object.create(PreUser.prototype);
User.prototype.constructor = User;

/* 
Создать веб страницу. Добавить на нее форму с полями 
- имя (строкое поле), 
- родной город (Выпадающий список), 
- Комментарий (многострочное поле), пол (radiobutton). 
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, 
после чего поля очистить.
*/
// Решение задачи в файле form.html

/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el) { }
// Решение задачи в файле calendar.html

/* 
создать функцию, которая не может работать как конструктор (работать с new, и покрыть ее тестами)
*/
function EmptyConstructor(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  if (this instanceof EmptyConstructor) {
    throw new Error('Функция не может быть конструктором');
  }
}

/* 
Написать реализацию метода .myCall, который будет работать аналогично системному .call и покрыть 
реализацию тестами
*/
function mycall(obg, fun) {
  if (!obg) { obg = window }
  var p = 'prop';
  for (key in obg) {
    if (key == p) {
      p += '1';
    }

  }
  obg[p] = fun;
  return obg[p]();
};

/* 
Написать реализацию функций debounce и throttle и покрыть реализации тестами ( Если ваше имя начинается 
с гласной - debounce, иначе - throttle. А лучше - обе ). Функции должны с сигнатурой debounce(fun, 
delay) / throttle(fun, delay)
*/
function debounce(fun, delay) {
  var timer;
  return function () {
    var args = Array.prototype.slice.call(arguments, 0);
    clearTimeout(timer);
    timer = setTimeout(function () {
      timer = null;
      fun.apply(null, args);
    }, delay);
  };
}

function throttle(fun, delay) {
  var state;
  return function () {
    if (state) {
      return;
    }
    var args = Array.prototype.slice.call(arguments, 0);
    fun.apply(this, args);
    state = true;
    setTimeout(function () {
      state = false;
    }, delay);
  };
}

/* 
К генератору листаемого календаря добавить функционал: под календарем добавить блок. При клике на 
ячейку даты ( но не на пустую ячейку календаря ) в блоке должна добавляться запись о том, по какой 
ячейке кликнули. Можно добавить запрос описания даты от пользователя ( с помощью функции prompt и 
выводить это описание там же). История дат и список, по которым пользоатель кликал, должны 
сохраняться между перезагрузками страницы. Для сохранения использовать LocalStorage. Интерфейс 
работы с данными (чтение/запись) лучше сделать асинхронным
*/
// Решение задачи в файле calendar.html

/* 
Создать синхронную функцию sleep(seconds) так, чтобы работал код
console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
sleep(9);
console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)
*/
function sleep(time) {
  var sec = new Date().getSeconds();
  if ((sec + time) > 60) {
    sec = sec + time - 60;
  } else {
    sec = sec + time;
  }

  while (sec != new Date().getSeconds()) {

  }
};

/* 
Написать функцию getCounter и покрыть ее тестами, так, чтобы работал следующий код
var c = getCounter(5);
c
  .log() // 5
  .add(4)
  .log() // 9
  .add(3)
  .log() // 12
  .reset()
  .log() // 0
  .add(8)
  .log(); // 8
*/
function getCounter(x) {
  var number = x;
  return {
    log: function () {
      console.log(number);
      return number;
    },
    add: function (e) {
      number += e;

    },
    reset: function () {
      number = 0;

    }
  }
}; 