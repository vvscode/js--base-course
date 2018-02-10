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
    if (!(this instanceof ForceContructor)) return new ForceContructor(a, b, c);

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
        if (arreyLength) return anyFunction;
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

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
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

function sleep(time) {
    var timer = (time * 1000) + new Date().getTime();
    while (timer > new Date().getTime()) {}
}

/*
 Используя функцию drawCalendar из прошлого урока
 создать функцию drawInteractiveCalendar(el)
 Которая выводит календарь, в шапке которого отображается
 [<] месяц / год [>]
 При клике по кнопкам [<] / [>] нужно реализовать листание календаря
 Добавть на страницу index.html вызов календаря
 */

"use strict";

function drawInteractiveCalendar(el) {

    let date = new Date;
    let descriptions = "";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;

    let description = document.createElement("div");
    description.setAttribute("id", "description");
    htmlEl.after(description);

    if (window.localStorage['description']) {
        descriptions = window.localStorage['description'].slice(0,-1).split(" ;");
        descriptions.forEach((item) => {
            description.innerHTML += `<br>${item}`;
        });
    }

    startDrawInteractiveCalendar(el);

    htmlEl.onclick = (e) => {
        let target = e.target;
        let rows = target.closest(".rows");
        let td = target.closest("td");

        if (rows === document.getElementById("left")) {
            month = month - 1;
            checkMonth();
            startDrawInteractiveCalendar(el);
        }
        else if (rows === document.getElementById("right")) {
            month = month + 1;
            checkMonth();
            startDrawInteractiveCalendar(el);
        }
        else if (td.textContent) {
            setTimeout(() => {
                let key = `${year}:${month}:${td.textContent}`;
                if (!window.localStorage['description']) {
                    window.localStorage['description'] = "";
                }
                window.localStorage['description'] += key + " - " + prompt("Введите описания выбранной даты", "хороший денёк ;");
                descriptions = window.localStorage['description'].slice(0,-1).split(' ;');
                description.innerHTML += `<br>${descriptions[descriptions.length - 1]}`;
            }, 0);
        }
    };

    function startDrawInteractiveCalendar(htmlEl) {
        let interactiveCalendar = "<table><tr>" +
            "<th id='left' class='rows'>[<]</th>" +
            "<th colspan='5'>" + month + "/" + year + "</th>" +
            "<th id='right' class='rows'>[>]</th></tr>";
        drawCalendar(year, month, htmlEl);

        function drawCalendar(year, month, htmlEl) {
            let dateOnCalendar = new Date(year, month - 1);
            interactiveCalendar += "<tr>" +
                "<th>Понедельник</th>" +
                "<th>Вторник</th>" +
                "<th>Среда</th>" +
                "<th>Четверг</th>" +
                "<th>Пятница</th>" +
                "<th>Субота</th>" +
                "<th>Воскресение</th>" +
                "</tr>";

            outer: while (month === (dateOnCalendar.getMonth() + 1)) {

                for (let i = 1; i <= 7; i++) {
                    if (i === 1) interactiveCalendar += "<tr>";

                    if (checkDay() === i && (month === (dateOnCalendar.getMonth() + 1))) {
                        interactiveCalendar += "<td>" + dateOnCalendar.getDate() + "</td>";
                        dateOnCalendar.setDate(dateOnCalendar.getDate() + 1);
                    } else {
                        interactiveCalendar += "<td></td>";
                    }

                    if (i === 7) {
                        interactiveCalendar += "</tr>";
                        continue outer;
                    }
                }
            }
            interactiveCalendar += "</table>";

            htmlEl.innerHTML = interactiveCalendar;

            function checkDay() {
                let day;
                switch (dateOnCalendar.getDay()) {
                    case 0:
                        day = 7;
                        break;
                    case 7:
                        day = 1;
                        break;
                    default:
                        day = dateOnCalendar.getDay();
                        break;
                }
                return day;
            }
        }
    }

    let checkMonth = () => {
        switch (month) {
            case 0:
                month = 12;
                year -= 1;
                break;
            case 13:
                month = 1;
                year += 1;
                break;
        }
    };
}