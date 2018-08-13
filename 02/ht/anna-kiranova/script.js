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

    // проверка на одинаковость типов
    if (typeof objA != typeof objB) {
        return false;
    }

    // проверяем примитивные типы
    if (typeof objA == 'string' || typeof objA == 'number' || typeof objA == 'boolean') {
        if (objA == objB || (typeof objA == 'number' && isNaN(objA) && isNaN(objB))) {
            return true;
        } else {
            return false;
        }
    }

    // проверка на массив
    if (Array.isArray(objA) && Array.isArray(objB)) {
        if (objA.length != objB.length) {
            return false;
        }
        for (var i = 0; i <= objA.length; i++) {
            if (isDeepEqual(objA[i], objB[i]) == false) {
                return false;
            }
        }
        return true;
    }

    // проверка на объект
    if (typeof objA == 'object') {
        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);
        if (keysA.length != keysB.length) {
            return false;
        }
        keysA.sort();
        keysB.sort();
        for (var i = 0; i < keysA.length; i++) {
            if (keysA[i] != keysB[i]) {
                return false;
            }
            var valueA = objA[keysA[i]];
            var valueB = objB[keysB[i]];
            if (isDeepEqual(valueA, valueB) == false) {
                return false;
            }
        }
        return true;
    }
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
    };
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function(context) {
    return bind(this, context);
}

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
    get magicProperty() {
        return ++this.value;
    },
    set magicProperty(value) {
        console.log(new Date() + ' -- ' + value);
        this.value = value;
    },
};
o.magicProperty = 5; // setter
console.log(o.magicProperty); // getter
console.log(o.magicProperty);
console.log(o.magicProperty);

/**
* Создать конструктор с методами, так,
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function Things() {
}

Things.prototype = {
    askName: function() {
        this.name = prompt("Please enter your name",'');
        return this;
    },
    askAge: function() {
        this.age = prompt("Please enter your age",'');
        return this;
    },
    showAgeInConsole: function() {
        console.log("Your age is " + this.age);
        return this;
    },
    showNameInAlert: function() {
        alert("Your name is " + this.name);
        return this;
    }
};

var u = new Things();

// u.askName().askAge().showAgeInConsole().showNameInAlert();

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(s) {
    return function(n1) {
        return function(n2) {
            if (s == '+') {
                return n1 + n2;
            } else if (s == '-') {
                return n1 - n2;
            } else if (s == '*') {
                return n1 * n2;
            } else if (s == '/') {
                return n1 / n2;
            } else {
                throw 'unknown operator';
            }
        };
    };
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
var instance;
function Singleton() {
    if (instance) {
        return instance;
    } else {
        instance = this;
        return instance;
    }
}

Singleton.prototype = {};

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
    } else {
        return new ForceContructor(a, b, c);
    }
}

var abc = new ForceContructor(1, 2, 3);
var cba = ForceContructor(1, 2, 3);
console.log(abc);
console.log(cba);

/**
 * Написать фукнцию сумматор, которая будет работать 
 * var s = sum();
   * log(s); // 0
   * log(s(1)); // 1
   * log(s(1)(2)); //3
   * log(s(3)(4)(5)); // 12
   * Число вызовов может быть неограниченым
   */
  function sum(val) {
    var initial = val || 0;
    var func = function(val) {
        return sum(initial + (val || 0));
    };
    func.valueOf = function() {
        return initial;
    }
    return func;
}

function log(x) {
    console.log(+x);
}

var s = sum();
log("s: " + s);

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
 * @return {*} func
 */
function curry(func) {
    var arr = [];
    var call = function(arg) {
        if (arr.length < func.length) {
            arr.push(arg);
        }
        if (arr.length == func.length) {
            return func(...arr);
        } else {
            return call;
        }
    };
    return call;
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
class PreUser extends Array {}
class User extends PreUser {}

var u = new User();
console.log(u instanceof User);
console.log(u instanceof Array);
console.log(u instanceof PreUser);

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
//function drawInteractiveCalendar(el) {}

/**создать функцию, которая не может работать как конструктор
 *  (работать с new, и покрыть ее тестами)
 */

function ForbiddenContructor(a, b, c) {
    if (this instanceof ForbiddenContructor) {
        throw "forbidden";
    }
}

//var abc = new ForbiddenContructor(1, 2, 3);

/**Написать реализацию метода .myCall, 
 * который будет работать аналогично системному .call 
 * и покрыть реализацию тестами
 */
Function.prototype.myCall = function(context) {
    var args = Array.from(arguments);
    args.shift();
    return this.apply(context, args);
}

/**
 * Написать реализацию функции debounce и throttle и покрыть реализации тестами
 * Если ваше имя начинается с гласной - debounce. 
 * Функция должна быть с сигнатурой debounce(fun, delay)
 */
function debounce(fun, delay) {
    var timer = null;

    return function (...args) {
        var t = this;
        function onComplete() {
            fun.apply(t, args);
            timer = null;
        }

        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(onComplete, delay);
    };
}


/** 
 * Создать синхронную функцию sleep(seconds)
 */
function sleep(sec) {
    var ms = sec * 1000;
    var time = new Date().getTime();
    while (new Date() < time + ms){}
}
//console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
//sleep(9);
//console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)

/**
 * Написать функцию getCounter и покрыть ее тестами, так, чтобы работал следующий код
 * var c = getCounter(5);
 * c
 * .log() // 5
 * 1.add(4)
 * .log() // 9
 * .add(3)
 * .log() // 12
 * .reset()
 * .log() // 0
 * .add(8)
 * .log(); // 8
 */

function getCounter(num) {
    var o = {};
    o.log = function() {
        return console.log(num);
    };
    o.add = function(num2) {
        return console.log(num += num2);
    };
    o.reset = function() {
        return console.log(num = 0);
    }
    return o;
}
 
 var c = getCounter(5);
 c.log();
 c.add(4);
 c.reset();
