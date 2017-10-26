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
   
    if (objB !== objB && objA !== objA) return true;
    if (typeof (objA) !== typeof (objB)) return false;
    if (typeof (objA) !== 'object') return objA === objB;
    if (Array.isArray(objA) != Array.isArray(objB)) return false;
    if (Object.keys(objA).length !== Object.keys(objB).length) return false;
    
    for (var key in objA) {
       if (objA == objA[key] && objB == objB[key]) break;
       if (!isDeepEqual(objA[key], objB[key])) return false;        
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
    return function () {
          return func.apply(context, arguments);
    }
}


/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function (context) { return bind(this, context); }
/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
var o = {
    set magicProperty(value) {
        var currentDate = new Date();
        console.log('присвоено ' + value + ' текущее время ' + currentDate.getHours + ':' + currentDate.getMinutes);
    }
}
/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function peopleQuiz(name, age)
{
    this.name = name;
    this.age = age;
}
peopleQuiz.prototype.askName = function () {
    this.name = prompt('enter your name');
    return this;
}
peopleQuiz.prototype.askAge = function () {
    this.age = prompt('enter your age');
    return this;
}
peopleQuiz.prototype.showAgeInConsole = function () {
    console.log(this.age);
    return this;
}
peopleQuiz.prototype.showNameInAlert = function () {
    alert(this.name);
    return this;
}
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate() {

    var operator = [].slice.call(arguments, 0);
    return function (a) { return function (b) { return eval(a + operator + b); } }
}


/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
var Singleton = (function () {
    var instance;

    return function CreateInstance() {
        if (instance) {
            return instance;
        }
        if (this && this.constructor === CreateInstance) {
            instance = this;
        } else {
            return new CreateInstance();
        }
    }
}());


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
    else   return new ForceContructor(a, b, c);
        
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
    function f(b) {
        return sum(currentSum + (b || 0));
    }
    f.valueOf = function () {
        return currentSum;
    };
    return f;
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
    var funcArguments = [];
    return function f(a) {
        funcArguments.push(a);
        if (funcArguments.length == func.length)
            return func.apply(this, funcArguments);
        return f.bind(null);
    }

}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
function PreUser() { };
PreUser.prototype = [];
function User() { };
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
function setPersonInfo() {
    el = document.querySelector('div');
    var personForm = document.forms.formID;
    el.innerHTML = 'Имя: ' + personForm.txtName.value + ' Город: ' + personForm.sCity.value + ' Пол: ' + personForm.rMail.value + ' Комментарий: ' + personForm.txtComment.value;
    personForm.reset();
}
var btnSubmit = document.getElementById('send');
if (btnSubmit) btnSubmit.addEventListener('click', setPersonInfo);
/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawCalendar(year, month, htmlEl) {
    var firstDayMonth = new Date(year, month - 1);
    var nextMonth = new Date(year, month, 0)
    var table = '<button id="btnPrev">[<]</button><label id="lblMonth">' + month+'/'+year+'</label><button id="btnNext">[>]</button> <br /> <table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
    function changeNumOfDay(numDay)//для воскресенья меняем с 0 на 7
    {
        if (numDay === 0) { numDay = 7 };
        return numDay;
    }

    for (var i = 1; i < changeNumOfDay(firstDayMonth.getDay()); i++)//заполнение первой строчки
    {
        table += '<td></td>';
    }
    for (var i = 1; i <= nextMonth.getDate(); i++) {
        table += '<td id="tdId">' + i + '</td>';
        if (changeNumOfDay(firstDayMonth.getDay()) == 7) {
            table += '</tr><tr>';
        }
        firstDayMonth.setDate(firstDayMonth.getDate() + 1);
    }

    if (changeNumOfDay(firstDayMonth.getDay()) < 7)//если первое число следующего месяца не понедельник
    {
        for (var i = changeNumOfDay(firstDayMonth.getDay()); i < 7; i++) {
            table += '<td></td>';
        }
    }
    table += '</tr></table>';

    htmlEl.innerHTML = table;
     var prevYear = nextMonth.getFullYear();
    var prevMonth = nextMonth.getMonth();
    if (prevMonth == 0) { prevYear--; prevMonth = 12; }
    document.getElementById('btnPrev').addEventListener('click', drawCalendar.bind(null, prevYear, prevMonth, htmlEl));
    if ((+month + 1) == 13) {
        year++; month=0;
    }
    document.getElementById('btnNext').addEventListener('click', drawCalendar.bind(null, year, (+month + 1), htmlEl));
    htmlEl.onclick = clickDate.bind(this, month, year);
    document.getElementById("notes").innerHTML = localStorage.getItem("notes");
}

var btnDrawCalendar = document.getElementById('btnDrawCalendar');
var element = document.getElementById('Calendar');

function drawInteractiveCalendar(el) {
    var today = new Date();
    drawCalendar(today.getFullYear(), +today.getMonth()+1, el);
}
btnDrawCalendar.addEventListener('click', drawInteractiveCalendar.bind(null, element));
function clickDate(month,year) {
    if (event.target.id == "tdId") {
        var day = event.target.innerHTML + '.' + month + '.' + year + '; ';

        setTimeout(createNoteAboutDate, 100, day);
    }
};

function createNoteAboutDate(day) {
    var inputText = document.getElementById("notes").innerHTML;
    inputText += day;
    document.getElementById("notes").innerHTML = inputText;
    localStorage.setItem('notes', inputText);
}




//////////////////////////////////////////////////
 var throttle= function (func, ms) {

    var isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

function sleep(seconds) {
    var  end = Date.now() + seconds * 1000;
    while (Date.now() < end) { };
 }
///////////////////////////////////////
function counter(htmlEl, initValue) {

    var htmlCode = '<span>';
    htmlCode += initValue || 0;
    htmlCode += '</span><button id="b1">-</button><button id="b2">+</button>';
    htmlEl.innerHTML = htmlCode;
   
    var btnPlus = htmlEl.querySelector("#b2");
    btnPlus.onclick = function () {
        +initValue++;
        var span = htmlEl.querySelector('span').innerHTML = initValue;
    }
    var btnMin = htmlEl.querySelector("#b1");
    btnMin.onclick = function () {
        +initValue--;
        var span = htmlEl.querySelector('span').innerHTML = initValue;
    }

}
counter(document.getElementById("counter1"), 0);
counter(document.getElementById("counter2"), 4);
