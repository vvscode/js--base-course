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
 function isDeepEqual (objA, objB) {
   if (objA.toString() === `[object Object]` && objB.toString() === `[object Object]`) {
     let x, y;
     x = y = 0;
     for (let key in objA) { x++ };
     for (let key in objB) { y++ };
     if (x !== y) { return false };
     for (let key in objA) {
       if (typeof objA[key] === `object` && typeof objB[key] === `object`) {
         if (objA === objA[key] || objB === objB[key]) { return (objA === objA[key] && objB === objB[key]) };
         if (!isDeepEqual(objA[key], objB[key])) { return false };
       } else if (objA[key] !== objB[key] && objA[key].toString() !== `NaN`) { return false };
       if (objA[key].toString() === `NaN` && objB[key].toString() === `NaN`) { return true };
     }
     return true;
   } else { return objA.toString() === objB.toString() };
 }

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
 function bind (func, context) {
   return function() {
     return func.apply(context, arguments);
   }
 }

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function (context) {
  let func = this;
  return function() {
    return func.apply(context, arguments);
  }
}
/**
* Создать объект o так, чтобы каждый раз когда в коде написано
* o.magicProperty = 3 // (любое значение)
* в консоль выводилось значение, которое присваивается и текущее время
*/
function ObjectO() {
  let currentValue;
  this.magicProperty = undefined;
  this._timer = setInterval(function(object) {
    if (`magicProperty` in object) {
      if (currentValue !== object.magicProperty) {
        console.log(`Value: ${object.magicProperty} Time: ${new Date().toLocaleString(`en`, {hour:`numeric`, minute:`numeric`, second:`numeric`})}`);
        currentValue = object.magicProperty;
      } else {
        return;
      }
    } else {
      return;
    }
  }, 100, this);
  this._stop = function() {
    clearInterval(this._timer);
  }
}

let o = new ObjectO();
/**
* Создать конструктор с методами, так,
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function ObjectU() {
  this.askName = function() {
    this.name = prompt(`Enter your name`);
    return this;
  };
  this.askAge = function() {
    this.age = prompt(`Enter your age`);
    return this;
  };
  this.showAgeInConsole = function() {
    console.log(this.age);
    return this;
  }
  this.showNameInAlert = function() {
    alert(this.name);
  }
}

let u = new ObjectU();
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
 function calculate (operation) {
   return function (x) {
     return function (y) {
       if (operation === `+`) {return(x + y)};
       if (operation === `-`) {return(x - y)};
       if (operation === `*`) {return(x * y)};
       if (operation === `/`) {return(x / y)};
     }
   }
 }

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
 function Singleton() {
   if (`singleton` in Singleton) {
     return Singleton.singleton;
   } else(Singleton.singleton = this);
   // throw "undefined";
 }

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
  function ForceContructor(a, b, c) {
    if (this===window || this===undefined) {
      return new ForceContructor (a, b, c);
    }
    this.a = a;
    this.b = b;
    this.c = c;
    // throw "undefined";
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
 function sum(a) {
     let result = a || 0;
     function func(b) {
       result += b || 0;
       return func;
     }
     func.valueOf = function() {
       let temp = result;
       result = a || 0;
       return temp;
     }
     return func;
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
  let leng = func.length;
  let i = 0;
  let arr = [];

  function cycle(a) {
    if (i < leng) {
      return cycle;
    }
    cycle.valueOf = function() {
      return func.apply(null, arr);
    }
    return cycle;
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
