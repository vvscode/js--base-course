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
    /* Ваше решение */

    if (typeof(objA) != "object") {
        if (typeof(objA) == "number" && isNaN(objA) && isNaN(objB)) {
            return true;
        } else {
            return objA === objB;
        }
    }
    if (objA.length !== objB.length) {
        return false;
    }

    for (var key in objA) {
        if (!(objA[key] == objA && objB == objB[key])) {
            if (!isDeepEqual(objA[key], objB[key])) {
                return false;
            }
        }
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

Function.prototype.myBind = function(context) {
    return bind(this, context);
}


/**
 * Создать объект o так, чтобы каждый раз когда в коде написано 
 * o.magicProperty = 3 // (любое значение) 
 * в консоль выводилось значение, которое присваивается и текущее время
 */

o = {
    set magicProperty(value) {
        console.log(Date())
    }
}

/**
 * Создать конструктор с методами, так, 
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */

function User() {
    this.age;
    this.name;
}

User.prototype.askAge = function() {
    this.age = +prompt("How old are you?", 18);
    return this;
};

User.prototype.askName = function() {
    this.name = prompt("What is your name?", "Fluffy");
    return this;
};

User.prototype.showAgeInConsole = function() {
    console.log("You are " + this.age + " years old");
    return this;
};
User.prototype.showNameInAlert = function() {
    alert("Your name is " + this.name);
    return this;
}

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(sign) {
    /* put your code here */
    return function(a) {
        return function(b) {
            switch (sign) {
                case '+':
                    return a + b;
                case '-':
                    return a - b;
                case '/':
                    return a / b;
                case '*':
                    return a * b;
                default:
                    return NaN;
            }
        }
    }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = (function() {
    var instance;

    function Singleton() {
        if (!instance) {
            instance = this;
        }
        return instance;
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
    if (!(this instanceof ForceContructor)) {
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
function sum(a) {
    var resSum = a || 0;

    function fun(b) {
        return sum(resSum + (b || 0));
    }
    fun.valueOf = function() {
        return resSum
    };
    return fun;
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
function target5(a, b, c, d, e) { return a + b + c + d + e };

function target4(a, b, c, d) { return a + b + c + d };

function target3(a, b, c) { return a + b + c };

function target2(a, b) { return a + b };

function curry(func) {
    var params = [];

    function curred(number) {
        params.push(number);
        if (params.length != func.length) {
            return curred;
        } else {
            return func.apply(null, params);
        }
    }
    return curred;
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
function PreUser() {};
PreUser.prototype = Object.create(Array.prototype);

function User() {};

User.prototype = Object.create(PreUser.prototype);

u = new User();


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
var element = document.querySelector("#calendar")
drawInteractiveCalendar(element);

function drawInteractiveCalendar(el) {
    var date = new Date();
    var calendarTable;
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    el.innerHTML = [
        "<button id=\"backward\"><</button>",
        "<span id=\"date\">", month,
        " / ", , year, "</span>",
        "<button id=\"forward\">></button>",
        "<br />",
        "<div id=\"calendarTable\"> </div>"
    ].join("");
    element.addEventListener('click', function(el) {
        if (!el.target.matches('button')) { return };
        var diff = el.target.matches('#backward') ? -1 : 1;
        month += diff;
        if (month <= 0) {
            month = 12;
            year--;
        } else if (month >= 13) {
            month = 1;
            year++;
        }
        var textMonth = element.querySelector("#date");
        textMonth.innerHTML = [month, ' / ', year].join("");
        var x = element.querySelector("#calendarTable");
        drawCalendar(year, month, calendarTable);

    });
    calendarTable = document.querySelector("#calendarTable");
    drawCalendar(year, month, calendarTable);
}



function drawCalendar(year, month, htmlEl) {

    var calendarContent = '<table border="1"><tr><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></td>';
    var beginDate = new Date(year, month - 1, 1);

    var diff = 2 - beginDate.getDay();
    if (diff == 2) {
        beginDate.setDate(-5);
    } else {
        beginDate.setDate(diff);
    }

    for (var w = 1; w <= 6; w++) {
        calendarContent += '<tr>';
        for (var d = 1; d <= 7; d++) {
            calendarContent += '<td>'
            calendarContent += beginDate.getMonth() == month - 1 ? beginDate.getDate() : '';
            calendarContent += '</td>'
            beginDate.setDate(beginDate.getDate() + 1);
        }
        calendarContent += '</tr>';
    }
    calendarContent += '</table>';
    htmlEl.innerHTML = calendarContent;
}


function throttle(fun, delay) {
    var busy = false;
    return function() {
        if (busy) return;
        fun.apply(this, arguments);
        busy = true;
        setTimeout(() => { busy = false }, delay);
    }
}


function debounce(func, delay) {
    var timerID;
    return function() {
        var self = this;
        var params = arguments;
        clearTimeout(timerID);
        timerID = setTimeout(function() {
            return func.apply(self, params);
        }, delay);
    }
}



function sleep(seconds) {
    var beginDate = new Date();
    var mseconds = seconds * 1000;
    while (new Date() - beginDate < mseconds) {}
}