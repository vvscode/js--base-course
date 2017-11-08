/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA 
 * @param {*} objB 
 * @return {boolean} идентичны ли параметры по содержимому
 */

function isDeepEqual(objA, objB) {
  if (typeof objA === "string" && typeof objB === "string") {
    return objA === objB;
  }
  if (objA instanceof Array && objB instanceof Array) {
    if (objA.length !== objB.length) {
      return false;
    }
    else {
      var counter = 0;
      for (var i = 0; i < objA.length; i++) {
        if (objA[i] === objB[i]) {
          counter++;
        }
      }
      return counter === objA.length;
    }
  }
  if (objA instanceof Object && objB instanceof Object) {
    for (var key in objA) {
      if (objB.hasOwnProperty(key)) {
        if (
          (objA[key] === objA && objB[key] === objA) ||
          (objB[key] === objB && objB[key] === objA) ||
          (objA[key] === objB && objB[key] === objA) ||
          (objA[key] === objA && objB[key] === objB) ||
          isDeepEqual(objA[key], objB[key])
        ) {
          continue;
        }
      }
      return false;
    }
    return true;
  }

  if (isNaN(objA) && isNaN(objB)) {
    return true;
  }

  return objA === objB;
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
  return bind(this, context);
};

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
var o = {}
Object.defineProperty(o, "magicProperty", {
  get: function () {
    return magicProperty;
  },
  set: function (value) {
    var currentDate = new Date();
    console.log(`${value} ${currentDate.getHours()}.${currentDate.getMinutes()}.${currentDate.getSeconds()}`);
    magicProperty = value;
  }
});

/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function askNameAge() {
  this.name = "";
  this.age = 0;

  askNameAge.prototype.askName = function () {
    this.name = prompt("What is your name?");
    return this;
  };
  askNameAge.prototype.askAge = function () {
    this.age = prompt("What is your age?");
    return this;
  };
  askNameAge.prototype.showAgeInConsole = function () {
    console.log(this.age);
    return this;
  };
  askNameAge.prototype.showNameInAlert = function () {
    alert(this.name);
    return this;
  };
}

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(operator) {
  return function (argA) {
    return function (argB) {
      return eval(argA + operator + argB);
    };
  };
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = (function () {
  var instance;
  return function () {
    if (!instance) {
      instance = this;
    }
    return instance;
  };
}());

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c) {
  if (!(this instanceof ForceContructor)) {
    return new ForceContructor(a, b, c);
  }
  this.a = a;
  this.b = b;
  this.c = c;
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

  var currentSum = arguments[0] || 0;

  function f(b) {
    return sum(currentSum + (b || 0));
  }

  f.toString = function () {
    return currentSum;
  };

  return f;
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
function curry(func) {
  var length = func.length;
  var args = [];
  return function f() {
    args.push.apply(args, arguments);
    if (args.length < length) {
      return f;
    } else {
      return func.apply(this, args);
    }
  }
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
function PreUser() { }
PreUser.prototype = new Array();

function User() { }
User.prototype = new PreUser();

// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true

/*
Создать веб страницу. Добавить на нее форму с полями 
- имя (строкое поле), 
- родной город (Выпадающий список), 
- Комментарий (многострочное поле), пол (radiobutton). 
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, 
после чего поля очистить.
*/

/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
//function drawInteractiveCalendar(el) { }

/* Создать синхронную функцию sleep(seconds) так, чтобы работал код
console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
sleep(9);
console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)
*/

function sleep(seconds) {
  var delayedDateTime = Date.now() + seconds * 1000;
  while (Date.now() < delayedDateTime) { }
}

function debounce(fun, delay) {
  var condition = false;
  return function () {
    if (condition) {
      return;
    }
    fun.apply(this, arguments);
    condition = true;
    setTimeout(function () {
      condition = false;
    }, delay);
  }
}

function throttle(fun, delay) {

  var condition = false;
  var args;
  var context;

  function wrap() {

    if (condition) {
      args = arguments;
      context = this;
      return;
    }

    fun.apply(this, arguments);
    condition = true;

    setTimeout(function () {
      condition = false;
      if (args) {
        wrap.apply(context, args);
        args = null;
        context = null;
      }
    }, delay);
  }

  return wrap;
}