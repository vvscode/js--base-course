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
    var value = value || false;

    if (typeof objA !== 'object' && typeof objB !== 'object') {
        value = JSON.stringify(objA) === JSON.stringify(objB);
    }

    if (Array.isArray(objA) && Array.isArray(objB)) {
        if (objA.length === objB.length) {
            for (var i = 0; i < objA.length; i++) {
                value = isDeepEqual(objA[i], objB[i]);
                if (!value) break;
            }
        }
        return value;
    }

    if (objA instanceof Object && objB instanceof Object) {
        if (Object.keys(objA).length === Object.keys(objB).length) {
            for (var key in objA) {
                if (objA[key] === objA && objB[key] === objB) {
                    value = true;
                    break;
                } else if (objA[key] === objA || objB[key] === objB) {
                    value = false;
                    break;
                }

                value = isDeepEqual(objA[key], objB[key]);
                if (!value) break;
            }
        }
        return value;
    }

    return value;
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

var o = {
    set magicProperty(value) {
        var date = new Date;
        console.log(value + " time: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    }
};

o.magicProperty = 1234;

/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */

function ShowAgeAndName(name, age) {
    this.name = name || "Вова";
    this.age = age || 20;
    this.askName = function () {
        this.name = prompt("Введите Ваше имя", "Вася");
    }
}

ShowAgeAndName.prototype = {
    askName: function () {
        this.name = prompt("Введите Ваше имя", "Вася");
    },
    askAge: function () {
        this.age = prompt("Введите Ваш возраст", "20");
    },
    showAgeInConsole: function () {
        console.log(this.age + "лет");
    },
    showNameInAlert: function () {
        alert(this.name);
    }
};

var u = new ShowAgeAndName();

u.showAgeInConsole();

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(operand) {
    return function (a) {
        return function (b) {
            switch (operand) {
                case "+":
                    return a + b;
                    break;
                case "-":
                    return a - b;
                    break;
                case "/":
                    return a / b;
                    break;
                case "*":
                    return a * b;
                    break;
            }
        }
    }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
var Singleton = (function () {
    var instance;

    function Singleton() {
        if (instance) return instance;
        instance = this;
    }

    return Singleton;
})();

/**
 * Создайте функцию ForceConstructor
 * которая работает как конструктор независимо от того,
 * вызвана она с new или без
 * и сохраняет параметры в создаваемый объект с именами параметров
 */
function ForceContructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;

    if (!(this instanceof ForceContructor)) return new ForceContructor(a, b, c);
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
    var summa = a || 0;

    function summator(b) {
        b = b || 0;
        return sum(summa + b);
    }

    summator.valueOf = function () {
        return summa;
    };
    return summator
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
    var arreyLength = func.length;
    var array = [];

    return function anyFunction(arguments) {
        array.push(arguments);
        arreyLength--;
        if (arreyLength) return anyFunction.bind(null);
        return func.apply(null, array);
    }
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

function User() {
}

function PreUser() {
}

PreUser.prototype = Array.prototype;
User.prototype = PreUser.prototype;

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

function debounce (func, delay)
{ var shouldExecute=0;

    return function () {
        if (shouldExecute) return;
        func.apply(this, arguments);
        shouldExecute = 1;
        setTimeout(function () {
            shouldExecute = 0
        }, delay);
    }
}

function throttle(func, wait) {

    var isThrottled = false;
    var args;
    var savedThis;

    return function wrapp() {
        if (isThrottled) {
            args = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (args) {
                wrapp.apply(savedThis, args);
                args = savedThis = null;
            }
        }, wait);
    }
}
