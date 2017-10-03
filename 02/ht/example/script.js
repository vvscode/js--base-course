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
    // check for null
    if (objA == null || objB == null) {
        return (objA == null && objB == null);
    }

    if (Number.isNaN(objA) || Number.isNaN(objB)) {
        return Number.isNaN(objA) && Number.isNaN(objB);
    }

    if (typeof objA == 'string' || typeof objB == 'string') {
        return objA === objB;
    }

    if (typeof objA == 'number' || typeof objB == 'number') {
        return objA === objB;
    }

    // check if objects has the same property number
    if (Object.keys(objA).length === Object.keys(objB).length) {
        for (key in objA) {
            var hasBTheSameWithAProperty = key in objB;
            if (!hasBTheSameWithAProperty) { // check that object B has the same property with A object
                return false;
            }
            if (typeof objA[key] !== typeof objB[key]) { // check that the same properties values have the same type
                return false;
            }
            if (typeof objA[key] === 'object') {
                if (!isDeepEqual(objA[key], objB[key])) { // if properties are objects function calls itself check one more time
                    return false;
                }
            } else if (Number.isNaN(objA[key])) { // check for NaN
                if (!Number.isNaN(objB[key])) {
                    return false;
                }
            } else if (objA[key] !== objB[key]) { // primes check
                return false;
            }
        }
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
    return function() {
        return func.apply(context, arguments);
    }
}

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = /*Function.prototype.bind*/ function(context) {

    var func = this; // get  function, from which current method was called
    var f =  function() {
        // usage a method from previous task:
        // 1. function which should be binded we took from Function.prototype.myBind contxet
        // 2. context s transfered though params
        return bind(func, context);
    }
    return f();
}

/**
 * Создать объект o так, чтобы каждый раз когда в коде написано
 * o.magicProperty = 3 // (любое значение)
 * в консоль выводилось значение, которое присваивается и текущее время
 */
function objectCretionDemo() {
    var o = {    };

    Object.defineProperty(o, "magicProperty", {
        set: function(value) {
           console.log(value + " " + new Date());
        }
    });

    o.magicProperty = null;
    o.magicProperty = NaN;
    o.magicProperty = 2;
    o.magicProperty = '132123123123123';
    o.magicProperty = {};
    o.magicProperty = new Boolean(false);
    o.magicProperty = new Boolean(true);

}


/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */
function constructorDemo(){
    function User(){
        this.name = '';
        this.age = 0;

        this.askName = function(){
            this.name = prompt('Whhat is your name?','');
            return this;
        };
        this.askAge  = function(){
            this.age = prompt('Whhat is your age?',0);
            return this;
        };
        this.showAgeInConsole = function(){
            console.log('Age ' + this.age);
            return this;
        }
        this.showNameInAlert = function(){
            alert('Name ' + this.name);
            return this;
        }
    };

    var u = new User();
    u.askName().askAge().showAgeInConsole().showNameInAlert();
}


/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate() {
    var operation = arguments[0];

    return function(){
        return function(){
            var firstOperand = arguments[0];
            return function(){
                var secondOperand = arguments[0];
                var resultFunc = new Function("return " + firstOperand + operation + secondOperand + ";");
                return resultFunc();
            }
        }
    }()
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
    if (Singleton.instance){
        return Singleton.instance;
    }
    Singleton.instance = this;
}

/**
 * Создайте функцию ForceConstructor
 * которая работает как конструктор независимо от того,
 * вызвана она с new или без
 * и сохраняет параметры в создаваемый объект с именами параметров
 */
function ForceContructor(a, b, c) {

    // в this пишем свойства, методы
    this.a = a;
    this.b = b;
    this.c = c;

    return this;
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
    throw "undefined";
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
function drawInteractiveCalendar(el) {
}
