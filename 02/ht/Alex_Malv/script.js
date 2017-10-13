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
    if (typeof(objA) === "string" && typeof(objB) === "string") { return objA === objB; }
    if (objA instanceof Array && objB instanceof Array) {
        if (objA.length !== objB.length) return false;
        var tmp = 0;
        for (var i = 0; i < objA.length; i++) {
            for (var j = 0; j < objB.length; j++) {
                if (objA[i] === objB[i]) {
                    tmp++;
                }
                break;
            }
        }
        return tmp === objA.length;
    }
    if (objA instanceof Object && objB instanceof Object) {
        return Object.keys(objA).length === Object.keys(objB).length;
    }
    if (isNaN(objA) && isNaN(objB)) {
        return true
    }
    return objA === objB
}


/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
    return function() {
        func.apply(context, arguments)
    }
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function(context) {
    return bind(this, context)
}

/**
 * Создать объект o так, чтобы каждый раз когда в коде написано 
 * o.magicProperty = 3 // (любое значение) 
 * в консоль выводилось значение, которое присваивается и текущее время
 */
var o = {
    set magicProperty(value) {
        var date = new Date();
        console.log(value + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    },
};

/**
 * Создать конструктор с методами, так, 
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */
function questions() {
    this.name = "";
    this.age = 0;
    this.askName = () => {
        this.name = prompt("Введите имя", "Alexey");
        return this;
    };
    this.askAge = () => {
        this.age = prompt("Введите возраст", "21");
        return this;
    };
    this.showAgeInConsole = () => {
        console.log(this.age);
        return this;
    };
    this.showNameInAlert = () => {
        alert(this.name);
        return this;
    };
}
var u = new questions();
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(operand) {
    return function(number1) {
        return function(number2) {
            if (operand == '/' && number2 == 0) {
                return "Делим на 0";
            } else return eval(number1 + operand + number2);
        }
    }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
    if (Singleton.instance) { return Singleton.instance; }
    //При первом вызове new Singletone в свойство Singletone.instance запишется конструируемый объект, а при последующих будет возвращаться ссылка на него.
    Singleton.instance = this;
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

    } else {
        forse = new ForceContructor(a, b, c);
        return forse;

    }
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
function curry(target) {
    var length = target.length;

    return function f1() {
        var args = Array.prototype.slice.call(arguments, 0);
        if (args.length >= length) {
            return target.apply(null, args);
        } else {
            return function f2() {
                var args2 = Array.prototype.slice.call(arguments, 0);
                return f1.apply(null, args.concat(args2));
            }
        }
    }
}


/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
function PreUser() {}
PreUser.prototype = Object.create(Array.prototype);

function User() {}
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

/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
//Calendar.html

function debounce(fun, delay) {
    let time;
    return function() {
        var args = Array.prototype.slice.call(arguments, 0);
        timer = setTimeout(function() {
            timer = null;
            fun.apply(null, args);
        }, delay);
    }
}