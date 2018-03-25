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
  if (typeof objA === `string` && objA === objB) return true;
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return objA.toLocaleString() === objB.toLocaleString() ? true : false;
  };
  if (typeof objA === `number` && objA === objB) return true;
  if (typeof objA === `object` && typeof objB === `object`) {
    const equalObject = (objA, objB) => {
      for (let key in objA) {
        if (objA[key] === objA || objB[key] === objB) return true;
        if (typeof objA[key] === 'number' && isNaN(objA[key]) && isNaN(objB[key])) return true;
        if (typeof objA[key] === `object` && typeof objB[key] === `object`) {
          if (!equalObject(objA[key], objB[key])) return false;
        } else {
          if (objA[key] !== objB[key]) return false;
        };
      };
      return true;
    };
    return equalObject(objA, objB);
  };
  if (typeof objA === 'number' && isNaN(objA) && isNaN(objB)) return true;
  return false;
};

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
  context = context ? context : window;
  return function () {
    return func.apply(context, arguments);
  }
};

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

Function.prototype.myBind = function() {
  const func = this;
  arguments.slice = [].slice;
  const args = arguments.slice();
  const context = args.pop();
  return function () {
    arguments.slice = [].slice;
    return func.apply(context, args.concat(arguments.slice()));
  }
};

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
const o = {
  set magicProperty (value) {
    this.magic = value;
    console.log(value, new Date());
  },
  get magicProperty () {
    return this.magic + 1;
  }
};
 
/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function AskShow () {};
AskShow.prototype.askName = function () {
  this.name = prompt('What is your name?', '');
  return this;
};
AskShow.prototype.askAge = function () {
  this.age = prompt('How old are you?', '');
  return this;
};
AskShow.prototype.showAgeInConsole = function () {
  console.log(this.age);
  return this;
};
AskShow.prototype.showNameInAlert = function () {
  alert(this.name);
};
const u = new AskShow ();
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(math) {
    return function (a) {
      return function (b) {
        if (math === '+') return a + b;
        if (math === '-') return a - b;
        if (math === '*') return a * b;
        if (math === '/') return a / b;
      }
    }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
const Singleton = (function () {
  let singleton;
  function Singleton () {
    if (singleton) return singleton;
    singleton = this;
  };
  return Singleton;
}) ();

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c) {
  //Maybe you meant ForceCon's'tructor
  if (!this || this === window) {
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
function sum(result) {
  if (!result) result = 0;
  function s (arg) {
    if (!arg) arg = 0;
    return sum(result + arg);
  };
  s.valueOf = function () {
    return result;
  };
  return s;
};

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
function curry(func) {
  const arr = [];
  let count = 0;
  return function sum () {
    (!arguments[0] || isNaN(+arguments[0])) ? arr.push(0) : arr.push(+arguments[0]);
    count++;
    return count === func.length ? func.apply(null, arr) : sum;
  };
};

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true
function User () {};
function PreUser () {};
PreUser.prototype = Object.create(Array.prototype);
PreUser.prototype.constructor = Array;
User.prototype = Object.create(PreUser.prototype);
User.prototype.constructor = PreUser;

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

const sleep = (add) => {
  const realDate = Date;
  Date = function () {
    return new realDate(realDate.now() + add * 1000);
  };
};

let getCounter = (value) => {
  getCounter.valueOf = () => {
    return value;
  };
  getCounter.log = () => {
    console.log(+getCounter);
    return getCounter;
  };
  getCounter.add = (value) => {
    const result = value + getCounter;
    getCounter.valueOf = () => {
      return result;
    };
    return getCounter;
  };
  getCounter.reset = () => {
    getCounter.valueOf = () => 0;
    return getCounter;
  };
  return getCounter;
};

const debounce = (fun, delay) => {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fun, delay, ...args);
  };
};

