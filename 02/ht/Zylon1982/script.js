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
    var tempArr = [];
    var res = function f(objA, objB) {

        if (objA === objB) {
            return true;
        } else if (Object.keys(objA).length !== Object.keys(objB).length) {
            return false;
        }

        for (var key in objA) {
            if (tempArr.hasOwnProperty(objA[key])) return true;
            if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
                tempArr.push(objA[key]);
                return f(objA[key], objB[key]);
            }
        };
        if (JSON.stringify(objA) === JSON.stringify(objB)) {
            return true;
        }
        return false;
    };
    return res(objA, objB);
}


/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {

    return function(){
        func.apply(context, arguments);
    };
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

// Function.prototype means for all functions
Function.prototype.myBind = function (context) {
    return bind(this, context);
}

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/

var o ={
    set magicProperty(val) {
        var time = new Date();
        console.log('Значение: ' + val + ', время присвоения: ' + time.toLocaleTimeString());
    }
}

/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/

function HumanValues() {
    this.askName = function () {
        this.name = prompt('What'+"'"+'s your name?');
        return this;
    };
    this.askAge = function () {
        this.age = prompt('How old are you?');
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

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */

//I know that eval function is Evil but here's it looks nice )
function calculate(operand) {
    return function(firstDigit) {
        return function(secondDigit) {
            return eval(firstDigit + operand + secondDigit);
        };
    };
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = (function() {
    var value;
    return function() {
        if (value) {
            return value;
        }
        value = this;
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
    }
    else {
        return new ForceContructor(a, b, c);
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

    var currentSum = arguments[0] || 0;

    function funcSum(b) {
        return sum(currentSum + (b || 0))
    }

    funcSum.toString = function () {
        return currentSum;
    };

    return funcSum;
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
    var countArgs = func.length;
    var arrayArg = [];

    return function add(arg) {
        arrayArg.push(arg);
        countArgs--;
        if(countArgs){
            return add.bind(null)
        }
        return func.apply(null, arrayArg);
    }
}


// function curry(func) {
//     return function add(a) {
//         return function(b) {
//             if (typeof b !== 'undefined') {
//                 a = a + b;
//                 return arguments.callee;
//             } else {
//                 return a;
//             }
//         };
//     }
// }


/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/

function User() {}
function PreUser() {}
User.prototype = PreUser.prototype = Array();

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


/*
К генератору листаемого календаря добавить функционал: под календарем добавить блок.
При клике на ячейку даты ( но не на пустую ячейку календаря ) в блоке должна добавляться запись о том,
по какой ячейке кликнули. Можно добавить запрос описания даты от пользователя ( с помощью функции prompt
и выводить это описание там же). История дат и список, по которым пользоатель клика, должны сохраняться
между перезагрузками страницы. Для сохранения использовать LocalStorage. Интерфейс работы с данными
(чтение/запись) лучше сделать асинхронным
 */

function displayUserInformation(el) {
    var userForm = document.querySelector('#mainForm');
    var name = userForm.querySelector("#name").value;
    var city = userForm.querySelector('#city').value;
    var comment = userForm.querySelector('#city').value;
    var gender = userForm.gender.value;

    el.innerHTML = 'Имя: ' + name + '<br> Город: ' + city
        + '<br> Пол: ' + gender + '<br> Коментарий: ' + comment;

    userForm.reset();
}

window.onload = function initializeForm(){
    var el = document.getElementById('userInformation');
    var button = document.getElementById('submit');
    button.addEventListener('click', displayUserInformation.bind(null, el));
}

function drawInteractiveCalendar(el, year, month) {
    el.innerHTML = null;
    document.getElementById('calendar-list').innerHTML = localStorage.getItem('noteList') || null;
    var calendar = document.createElement('div');
    calendar.id = 'calendar';
    var calendarHead = document.createElement('div');
    calendarHead.id = 'calendar-head';
    var prevMonthBtn = document.createElement('button');
    prevMonthBtn.innerHTML = '<span class="fa fa-angle-double-left"></span>';
    prevMonthBtn.id = 'prev';
    var nextMonthBtn = document.createElement('button');
    nextMonthBtn.innerHTML = '<span class="fa fa-angle-double-right"></span>';
    nextMonthBtn.id = 'next';
    var current = document.createElement('div');
    current.id = 'current';
    calendarHead.appendChild(prevMonthBtn);
    calendarHead.appendChild(current);
    calendarHead.appendChild(nextMonthBtn);
    calendar.appendChild(calendarHead);
    el.appendChild(calendar);
    drawCalendar(calendar, year, month);
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    prev.addEventListener('click', function () {
        drawInteractiveCalendar(calendarWrap, calendarCurrentDate.getFullYear(), calendarCurrentDate.getMonth() - 1)
    });
    next.addEventListener('click', function () {
        drawInteractiveCalendar(calendarWrap, calendarCurrentDate.getFullYear(), calendarCurrentDate.getMonth() + 1)
    });

    function addDateToList(calendarCell, noteComment) {
        var newNote = document.createElement('div');
        newNote.innerHTML = '<b>' + calendarCell.innerHTML + '.' + month + '.' + year + '</b> : <br>' + noteComment;
        newNote.className += 'note';
        document.getElementById('calendar-list').appendChild(newNote);
    }

    calendar.addEventListener('click', function (event) {
        var target = event.target;
        if (target.tagName === 'TD' && target.innerHTML) {
            var noteComment = prompt('Напишите комментарий', '');
            if (noteComment === '') {
                addDateToList(target, "Пустая заметка. Нажмите, чтобы удалить.");
            }
            if (noteComment) addDateToList(target, noteComment + '<br>Нажмите, чтобы удалить.');
        };
        localStorage.noteList = document.getElementById('calendar-list').innerHTML;
     });
}

var noteListContainer = document.getElementById('calendar-list');
noteListContainer.addEventListener('click', function (event) {
    var target = event.target;
    if (target.className === 'note' && confirm('Удалить запись "' + target.innerText + '"?')) {
        target.remove();
    }
    localStorage.noteList = document.getElementById('calendar-list').innerHTML;
});

function drawCalendar(htmlEl, year, month) {
    if (month < 1) {
        var mon = 11 + month;
        var d = new Date((year - 1), mon);
    } else if (!year || !month) {
        var d = new Date();
        var mon = d.getMonth();
    } else {
        var mon = month - 1;
        var d = new Date(year, mon);
    };

    var table = '<table><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr><tr>';

    for (var i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    while (d.getMonth() == mon) {
        table += '<td>' + d.getDate() + '</td>';

        if (getDay(d) % 7 == 6) {
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

    if (getDay(d) != 0) {
        for (var i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }

    table += '</tr></table>';
    if (mon === 11) {
        current.innerText = 12 + ' / ' + (d.getFullYear() - 1);
    } else current.innerText = d.getMonth() + ' / ' + +d.getFullYear();
    htmlEl.innerHTML += table;
    calendarCurrentDate = d;
}

function getDay(date) {
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}

var calendarWrap = document.getElementById('calendar-wrap');
var calendarCurrentDate;
var year = new Date().getFullYear();
var month = new Date().getMonth()+1;
drawInteractiveCalendar(calendarWrap, year, month);

/*
Написать реализацию функций debounce и throttle и покрыть реализации тестами ( Если ваше имя
начинается с гласной - debounce, иначе - throttle. А лучше - обе ). Функции должны с сигнатурой
debounce(fun, delay) / throttle(fun, delay)
*/

function debounce(fun, delay) {
    var timer;
    return function() {
        var args = Array.prototype.slice.call(arguments, 0);

        clearTimeout(timer);
        timer = setTimeout(function() {
            timer = null;
            fun.apply(null, args);
        }, delay);
    };
}

function throttle(fun, delay) {
    var state;
    return function() {
        if (state) {
            return;
        }
        var args = Array.prototype.slice.call(arguments, 0);
        fun.apply(this, args);
        state = true;
        setTimeout(function() {
            state = false;
        }, delay);
    };
}


/*
Создать синхронную функцию sleep(seconds) так, чтобы работал код
console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
sleep(9);
console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)
*/

function sleep(seconds) {
    var start = Date.now(),
        end = Date.now() + seconds * 1000;
    while (Date.now() < end) {};
}