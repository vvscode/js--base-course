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
  if (objA === objB) {
    return true;
  }
  if (typeof objA == 'object' && typeof objB == 'object') {
    var aKeys = Object.keys(objA);
    var bKeys = Object.keys(objB);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    for (var prop in objA) {
      if (!(objA[prop] === objA && objB[prop] === objB)) {
        if (!isDeepEqual(objA[prop], objB[prop])) {
          return false;
        }
      }
    }
  }
  else if (typeof (objA) === "number" && typeof (objB) === "number") {
    return isNaN(objA) && isNaN(objB);
  } else {
    return false;
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
 * @param {*} context значение для this
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
var o = { };
Object.defineProperty(o, 'magicProperty', {
  set: function (val) { 
    this.value = val;
    console.log(new Date() + ' ' + '--' + val);
  },
  get: function () { 
    return ++this.value;
  }
});
o.magicProperty = 5;
o.magicProperty = 5; // 'Sat Mar 24 2018 13:48:47 GMT+0300 (+03) -- 5'
console.log(o.magicProperty); // 6
console.log(o.magicProperty); // 7
console.log(o.magicProperty); // 8
/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function Hedgehog() { }
Hedgehog.prototype.construtor = Hedgehog;
Hedgehog.prototype.askName = function () { 
  this.name = prompt('What is your name?', 'name');
  return this;
};
Hedgehog.prototype.askAge = function () { 
  this.age = prompt('How old are you?', 'age');
  return this;
};
Hedgehog.prototype.showAgeInConsole = function () { 
  console.log(this.age);
  return this;
};
Hedgehog.prototype.showNameInAlert = function () { 
  alert(this.name);
  return this;
};

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate() {
  var actions = {
    '+': function (a) { 
      return function (b) {
        return a + b;
      };
    },
    '-': function (a) { 
      return function (b) {
        return a - b;
      };
    },
    '*': function (a) { 
      return function (b) {
        return a * b;
      };
    },
    '/': function (a) { 
      return function (b) {
        return a / b;
      };
    }
  };
  return actions[arguments[0]];
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
var Singleton = (function () { 
  var obj = null;
  return function() {
    if (!obj) {
      obj = this;
    }
    return obj;
  };
})();

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
  }
  else return new ForceContructor(a, b, c);
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
  function finalSum(a) { 
    return sum(firstArg + (a || 0));
  }
  finalSum.toString = function () { 
    return firstArg;
  };
  return finalSum; 
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
function curry(func) {}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
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
function drawInteractiveCalendar(el) {}