/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/*  ЗАДАНИЕ 1* +
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA
 * @param {*} objB
 * @return {boolean} идентичны ли параметры по содержимому
 */

function isDeepEqual(objA, objB) {

  if (typeof(objA) !== 'object' && typeof(objB) !== 'object') {
    if (typeof(objA) === "number" && isNaN(objA) && isNaN(objB)) {
      return true;
    } else {
      return objA === objB;
    }
  }

  if (objA === objB && objA === null) {
    return true;
  }

  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (var key in objA) {

    if(objA[key] === objA) continue;

    if (!isDeepEqual(objA[key], objB[key])) {
        return false;
    }
  }
  return true;
}

/*  ЗАДАНИЕ 2* +
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */

function bind (func, context) {
  return function () {
    return func.apply(context, arguments);
  }
}

/*  ЗАДАНИЕ 3* +
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

Function.prototype.myBind = function (context) {
  return bind (this, context);
};

/*  ЗАДАНИЕ 4* +
* Создать объект o так, чтобы каждый раз когда в коде написано
* o.magicProperty = 3 // (любое значение)
* в консоль выводилось значение, которое присваивается и текущее время
*/

var o = {};

Object.defineProperty(o,'magicProperty',{
  get: function (valueMagicProperty) {
    return this.magicProperty = valueMagicProperty;
  },
  set: function (){
    console.log( new Date)
  }
});


/*  ЗАДАНИЕ 5* +
* Создать конструктор с методами, так,
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/

function Form () {

}

Form.prototype.askName = function () {
    this.name = prompt( 'введите имя','ALEX' );
    return this;
};
Form.prototype.askAge = function () {
    this.age = prompt( 'введите возраст', 18 );
    return this;
};
Form.prototype.showAgeInConsole = function () {
    console.log( this.age );
    return this;
};
Form.prototype.showNameInAlert = function () {
    alert( this.name );
    return this;
};

/*  ЗАДАНИЕ 6* +
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */

function calculate(operator) {
  return function (firstNum) {
    return function (secondNum) {
      return eval(firstNum + operator + secondNum);
    }
  }
}

/*  ЗАДАНИЕ 7* +
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = new function () {
  var instance;
  return function () {
    if(instance){
      return instance
    }
    instance = this;
    return instance;
  }
};

/*  ЗАДАНИЕ 8 *  +
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */

function ForceContructor(a, b, c) {
  if( !(this instanceof ForceContructor) ){
    return new ForceContructor(a, b, c);
  }
  this.presence = a;
  this.b = b;
  this.c = c;
}

/*  ЗАДАНИЕ 9 * +
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
    return sum( currentSum + ( b || 0 ));
  }
  f.valueOf = function() {
    return currentSum;
  };
  return f;
}

/*  ЗАДАНИЕ 10 * +
 * Написать каррирующую функцию и покрыть ее тестами
 * Функция должна поддерживать каррирование функций с 2,3,4,5 параметрами
 * пример работы  функции
 *
 * */
function target1(a,b,c,d) { return a + b + c + d }
function target2(a,b) { return a + b }
curry(target1)(1)(2)(3)(4);
curry(target2)(5)(8) ;

/*function curry(f, that){
    var args = Array(f.length), n = 0;
    return function f_curried(){
        for(var i=0; i<arguments.length; ++i) args[i + n] = arguments[i];
        n += arguments.length;
        return n >= f.length ? f.apply(that, args) : f_curried;
    };
}*/

function curry(func){

    var argumentsInFunction = func.length;
    var count = 0;
    var arr = [];

    function addArg(){
      arr.forEach.call( arguments, function (g){
        arr.push(g);
        count++
      });
      return count >= argumentsInFunction ? func.apply(arguments, arr) : addArg;
    }

    return addArg;
}

/*  ЗАДАНИЕ 11* +
Написать код, который для объекта созданного с помощью конструктора будет показывать,
что объект является экземпляром двух классов
*/

function PreUser() {}
function User() {}
PreUser.prototype = Object.create(Array.prototype);
User.prototype = Object.create(PreUser.prototype);

// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true



/*  ЗАДАНИЕ 12* +
Создать веб страницу. Добавить на нее форму с полями
- имя (строкое поле),
- родной город (Выпадающий список),
- Комментарий (многострочное поле), пол (radiobutton).
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой,
после чего поля очистить.
*/

/*  ЗАДАНИЕ 13* + В отдельной папке
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el) {}

/*Задание 14
Написать реализацию функций debounce и throttle и покрыть
реализации тестами ( Если ваше имя начинается с гласной - debounce,
иначе - throttle. А лучше - обе ). Функции должны с сигнатурой
debounce(fun, delay) / throttle(fun, delay)
* */

function debounce (fun, delay) {

  let timer;
  return function () {
    var saveA = [].slice.call(arguments, 0);
    clearInterval(timer);
    timer = setTimeout(function () {
      fun.apply(this, saveA)
    }, delay);
  }
}

function throttle (fun, delay) {
  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper () {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    fun.apply(this, arguments);
    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, delay);
  }

  return wrapper;
}

  /*Задание 15
   Создать синхронную функцию sleep(seconds) так, чтобы работал код
   console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
   sleep(9);
   console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)*/

  function sleep (seconds) {
    var finish = Date.now() + seconds * 1000;
    while (Date.now() < finish) {}
  }


