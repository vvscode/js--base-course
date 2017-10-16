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
    if (objA.length !== objB.length) return false;
    let tmp = 0;
    for (let i = 0; i < objA.length; i++) {
      if (objA[i] === objB[i]) {
        tmp++;
      }
    }
    return tmp === objA.length;
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
  return function() {
    func.apply(context, arguments);
  };
}

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function(context) {
  return bind(this, context);
};

/**
 * Создать объект o так, чтобы каждый раз когда в коде написано
 * o.magicProperty = 3 // (любое значение)
 * в консоль выводилось значение, которое присваивается и текущее время
 */
function objCreate() {
  let o = new Object();
  Object.defineProperty(o, "magicProperty", {
    set: function(value) {
      console.log(value + " " + new Date());
    }
  });
  o.magicProperty = 3;
}

/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */
function U() {
  this.name = "";
  this.age = 0;

  U.prototype.askName = () => {
    this.name = prompt("Введите имя", "Andrey");
    return this;
  };
  U.prototype.askAge = () => {
    this.age = prompt("Введите возраст", "21");
    return this;
  };
  U.prototype.showAgeInConsole = () => {
    console.log(this.age);
    return this;
  };
  U.prototype.showNameInAlert = () => {
    alert(this.name);
    return this;
  };
}
let u = new U();

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(mark) {
  return function(arg1) {
    return function(arg2) {
      return eval(arg1 + mark + arg2);
    };
  };
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = (function() {
  var instance;
  return function() {
    if (instance) {
      return instance;
    }
    instance = this;
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
  let res = arguments[0] || 0;

  function summator(a) {
    return sum(res + (a || 0));
  }
  summator.toString = () => {
    return res;
  };
  return summator;
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
function curry(func) {
  let countArgs = func.length;
  let massArg = [];

  return function func1(arg) {
    massArg.push(arg);
    countArgs--;
    if (countArgs) return func1.bind(null);
    return func.apply(null, massArg);
  };
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать,
что объект является экземпляром двух классов
*/

function User() {}
function PreUser() {}
PreUser.prototype = Object.create(Array.prototype);
User.prototype = Object.create(PreUser.prototype);

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

// В отдельных файлах (form.html, jsForForm.js)

/*
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/

// В отдельных файлах (calendar.html, jsForCalendar.js)

function debounce(func, ms) {
  let state = null;
  return () => {
    if (state) return;
    func.apply(this, arguments);
    state = true;
    setTimeout(() => (state = null), ms);
  };
}

function func() {
  console.log("called");
}
let f = debounce(func, 1000);
f();
f();
setTimeout(f, 1100);

function sleep(seconds) {
  let time = new Date().getTime() + seconds * 1000;
  while (new Date().getTime() < time) {
    //some doing
  }
}
