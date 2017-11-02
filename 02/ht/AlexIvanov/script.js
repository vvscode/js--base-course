/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/*1 - почти*
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA 
 * @param {*} objB 
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {
    if( typeof objA !== typeof objB ) return false;
    if( isNaN(objA) && typeof objA !== 'string' && typeof objA !== 'object' ) return true;
    if( typeof objA === 'string' || typeof objA === 'number' ) return objA === objB;
    if(Object.keys(objA).length !== Object.keys(objB).length) return false;

    for (var key in objA) {
        if ( objA[key] === objA && objA[key] === objB  ) continue;
        if (!isDeepEqual(objA[key], objB[key])) return false;
    }
    return true;
}

/*2 - сделано*
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */

function bind(func, context) {
  return function(){
    func.apply(context, arguments)
  }
}

/*3 - сделано*
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

Function.prototype.myBind = function (context) {
    return bind(this, context)
}

/* 4 - сделано *
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/

var o = {},
    magicPropValue,
    date = new Date;
Object.defineProperty(o, 'magicProperty', {
    set: function (val) {
        console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ', magicProperty = ' + val);
        magicPropValue = val;
    },
    get: function () {
        return magicPropValue;
    }
});


/* 5 - сделано*
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*
* u.askName()
* u.askAge()
* u.showAgeInConsole()
* u.showNameInAlert();
*/

function GetNameAndAge() {
    this.askName = function(){
        this.name = prompt('Введите имя', 'name');
        return this;
    };

    this.askAge = function () {
        this.age = prompt('Введите возраст', 'age');
        return this;
    };

    this.showAgeInConsole = function () {
        console.log(this.age);
        return this;
    };

    this.showNameInAlert = function () {
        alert(this.name);
        return this;
    }
}


/* 6 - сделано*
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */

function calculate(mathSymbol) {
  return function (firstNumber) {
      return function (secondNumber) {
          return eval(firstNumber + mathSymbol + secondNumber)
      }
  }
}

/* 7 - cделано*
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
    if (Singleton.instance) {
        return Singleton.instance
    }
    Singleton.instance = this;
}

/* 8 - сделано*
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c) {
    if (!(this instanceof ForceContructor)) { //если this не объекта ForceContructor
        return new ForceContructor(a, b, c); // вызываем рекурсивно функцию снова с методом new
    }
    this.a = a;
    this.b = b;
    this.c = c;
}

/* 9 - сделано*
 * Написать фукнцию сумматор, которая будет работать 
 * var s = sum();
 * log(s); // 0
 * log(s(1)); // 1
 * log(s(1)(2)); //3
 * log(s(3)(4)(5)); // 12
 * Число вызовов может быть неограниченым
 */

function sum() {
    var arg1 = arguments[0] || 0;
    function func(b) {
        return sum(arg1 + (b || 0));
    }
    func.toString = function () {
        return arg1
    };
    return func
}

function log(x) {
  console.log(+x);
}

/* 10 - сделано*
 * Написать каррирующую функцию и покрыть ее тестами
 * Функция должна поддерживать каррирование функций с 2,3,4,5 параметрами
 * пример работы  функции
 * 
 * function target1(userForm,b,c,d) { return userForm + b + c + d }
 * function target2(userForm,b) { return userForm + b }
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
    var funcArg = [];
    return function f(a) {
        funcArg.push(a);
        if( funcArg.length === func.length){
            return func.apply(this, funcArg)
        }
        return f.bind(null)
    }

}
function target1(a,b,c,d) {
    return a + b + c + d;
}
function target2(a,b) {
    return a + b;
}
/* 11 - сделано *
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/

function PreUser() {
}

function User() {
}

PreUser.prototype = User.prototype = [];

// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true


/* 12  *
Создать веб страницу. Добавить на нее форму с полями 
- имя (строкое поле), 
- родной город (Выпадающий список), 
- Комментарий (многострочное поле), пол (radiobutton). 
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, 
после чего поля очистить.
*/

/* 13  *
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el) {}
