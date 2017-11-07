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

    var arrWithObjectsAsProerties = [];
    // check for null
    if (objA === null || objB === null) {
        return (objA === null && objB === null);
    }

    if (Number.isNaN(objA) || Number.isNaN(objB)) {
        return Number.isNaN(objA) && Number.isNaN(objB);
    }

    if (typeof objA === 'string' || typeof objB === 'string') {
        return objA === objB;
    }

    if (typeof objA === 'number' || typeof objB === 'number') {
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
                if(arrWithObjectsAsProerties.indexOf(objA[key]) > -1){
                    arrWithObjectsAsProerties.push(objA[key]);
                    if (!isDeepEqual(objA[key], objB[key])) { // if properties are objects function calls itself check one more time
                        return false;
                    }
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
    return bind(func, context);
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
    };

    User.prototype.askName = function(){
        this.name = prompt('Whhat is your name?','');
        return this;
    };
    User.prototype.askAge  = function(){
        this.age = prompt('Whhat is your age?',0);
        return this;
    };
    User.prototype.showAgeInConsole = function(){
        console.log('Age ' + this.age);
        return this;
    };
    User.prototype.showNameInAlert = function(){
        alert('Name ' + this.name);
        return this;
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
        return function(firstOperand){
            return function(secondOperand){
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
function createSingletone() {
    var instance;
    var getInnstance = function() {
        if (!instance) {
            instance = this;
        }

        return instance;
    };

    return getInnstance;
}
var Singleton = createSingletone();

/**
 * Создайте функцию ForceConstructor
 * которая работает как конструктор независимо от того,
 * вызвана она с new или без
 * и сохраняет параметры в создаваемый объект с именами параметров
 */
function ForceConstructor(a, b, c) {

    if (this instanceof ForceConstructor) {
        this.a = a;
        this.b = b;
        this.c = c;
    } else {
        return new ForceConstructor(a, b, c);
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
function sum(sumFromPreviousIterations) {
    var currentSum = sumFromPreviousIterations || 0;

    function f(b) {
        b = b || 0;
        return sum(currentSum + b);
    }

    f.toString = function() {
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
 *
 *1) var func = function(a){
	console.log(a);
}

 curry(func)('1')(3);
 * Читать
 * http://prgssr.ru/development/vvedenie-v-karrirovanie-v-javascript.html
 * @param {*} func
 */

function curry(func) {
    var paramNumber = func.length;
    var args = [];

    return function handleParam(arg) {
        // add param to array
        args.push(arg);
        paramNumber--;

        if (!paramNumber) { // in case all params were handled call initial function with set of collected params
            return func.apply(null, args);
        }

        // otherwise continue handeling of params
        return handleParam.bind();
    };
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
function PreUser(surname) {
    this.surname = surname;
}

function User(name) {
    this.name = name;
    this.superConstructor = PreUser;
    this.superConstructor();
}

User.prototype = new PreUser();
var u = new User();
console.log(User === PreUser); // false
console.log(u instanceof PreUser); // true
console.log(u instanceof User); // true

/*
Создать веб страницу. Добавить на нее форму с полями
- имя (строкое поле),
- родной город (Выпадающий список),
- Комментарий (многострочное поле), пол (radiobutton).
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой,
после чего поля очистить.
*/
function addEvenListenerForSubmitFormButton(){

    var submitFormButton = document.getElementById("submitFormButton");
    submitFormButton.addEventListener("click" ,clearFormAndDrawEnteredDataUnderForm);

}

function clearFormAndDrawEnteredDataUnderForm(){
    var userName = document.getElementsByName('userName')[0].value;
    var city = document.getElementsByName('city')[0].value;
    var sex = document.getElementById('maleRb').checked ? document.getElementById('maleRb').value : document.getElementById('femaleRb').value;
    var comment = document.getElementsByName('comment')[0].value;


    var formData = document.createElement('div');
    formData.innerHTML = 'Name: ' + userName + '\n' + "City: " + city + '\n' + 'Sex: ' + sex + '\n' + 'Comment: ' + comment;
    document.body.appendChild(formData);
}

/*
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/

var currMonth = (new Date()).getMonth() + 1;
var currYear = (new Date()).getFullYear();
var buttonIncrease = createIncreaseButton();
var buttonDecrease = createDecreaseButton();
var logAreaId= 'logAreaId';

function increaseMonth(){
    currMonth++;
    if(currMonth > 12){
        currMonth = 1;
        currYear += 1;
    }
    drawInteractiveCalendar(document.getElementById('calendar'));
}

function decreaseMonth(){
    currMonth--;
    if(currMonth < 1){
        currMonth = 12;
        currYear -= 1;
    }
    drawInteractiveCalendar(document.getElementById('calendar'))
}

function createIncreaseButton(){
    // > Button
    var buttonIncrease = document.createElement("input");
    buttonIncrease.setAttribute("type", "button");
    buttonIncrease.setAttribute("id", "increaseButton");
    buttonIncrease.setAttribute("value", ">");
    buttonIncrease.addEventListener("click" ,increaseMonth);
    return buttonIncrease;
}

function createDecreaseButton(){
    // < Button
    var buttonDecrease = document.createElement("input");
    buttonDecrease.setAttribute("type", "button");
    buttonDecrease.setAttribute("id", "decreaseButton");
    buttonDecrease.setAttribute("value", "<");
    var buttonDecreaseStyle = buttonDecrease.style;
    buttonDecreaseStyle.float = "left";
    buttonDecrease.addEventListener("click" ,decreaseMonth);
    return buttonDecrease;
}

function createLogArea(innerHTML){
    logArea = document.createElement('div');
    logArea.id = logAreaId;
    logArea.style.width = '223px';
    logArea.style.background = '#d3d3d3';
    logArea.innerHTML = innerHTML;

    return logArea;
}

function addDateToLogArea(event){
    var target = event.target;
    var logArea = document.getElementById(logAreaId);
    if(!logArea){
        logArea = createLogArea('User clicks history');
        document.getElementById('tableId').parentNode.appendChild(logArea);
    }

    while (target != 'TABLE') {
        if(target){
            if (target.tagName == 'TD') {
                // нашли элемент, который нас интересует!
                var day = target.innerText;
                if(day.length > 0){
                    var logRecord = day + '/' + currMonth + '/' + currYear;
                    logArea = document.getElementById(logAreaId);
                    logArea.innerHTML += '</br>' + logRecord;
                    localStorage.setItem('logArea' , logArea.innerHTML);
                }
                return;
            }
            target = target.parentNode;
        } else{
            return;
        }

    }
}

/*
* We suppore that el is a method which draw just calendar
* Header and log area will be drawn outside this method
*
*/
function drawInteractiveCalendar(el) {

    // year / month area
    var monthYearArea = document.createElement('div');
    monthYearArea.id = "monthYearAreaId";
    monthYearArea.innerHTML = currYear + ' / ' + currMonth;
    var monthYearAreaStyle = monthYearArea.style;
    monthYearAreaStyle.float = "left";
    monthYearAreaStyle.paddingLeft = "10px";
    monthYearAreaStyle.paddingRight = "10px";

    // Calendar header
    var calendarHeader = document.getElementById('calenderHeaderId');
    if(!calendarHeader){
        calendarHeader = document.createElement('div');
        calendarHeader.id = 'calenderHeaderId';
        calendarHeader.appendChild(buttonDecrease);
        calendarHeader.appendChild(monthYearArea);
        calendarHeader.appendChild(buttonIncrease);
    } else{
        calendarHeader.replaceChild(monthYearArea, calendarHeader.childNodes[1]);
    }

    // drawing a calendar/ EL - calendar content
    drawCalendar(currYear, currMonth, el);

    // Add drawCalendar before calendar body
    var calendarTableParent = el.parentElement;
    calendarTableParent.insertBefore(calendarHeader, el);

    // insert calendar before log area if logArea exists .
    var logArea = document.getElementById(logAreaId);
    if (logArea) {
        var logAreaParentElement = logArea.parentElement;
        logAreaParentElement.insertBefore(calendarDiv, logArea);
    } else if(localStorage.getItem('logArea')) {
        logArea = createLogArea(localStorage.getItem('logArea'));
        document.getElementById('tableId').parentNode.appendChild(logArea);
    }

    // add listner
    var calendarTable = document.getElementById('tableId') ? document.getElementById('tableId') : calendarDiv.getElementsByTagName('table')[0];
    if(calendarTable){
        calendarTable.addEventListener("click" , addDateToLogArea);
    }
}

function drawCalendar(year, month, htmlEl) {

    // Constants and initialization
    month -= 1;
    var table = '<table border=' + '1px' + ' id="tableId"><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Th</th><th>Fr</th><th>Sat</th><th>Sun</th></tr><tr>';
    var arr31days = [0, 2, 4, 6, 7, 9, 11];
    var arr30days = [3, 5, 8, 10];
    var februaryNumber = 1;
    var leapYearFebDays = 29;
    var usualYearFebDay = 28;
    var daysInWeek = 7;
    var daysInMonth;

    // Count the number of days in month
    if (arr31days.indexOf(month) >= 0) {
        daysInMonth = 31;
    } else if (arr30days.indexOf(month) >= 0) {
        daysInMonth = 30;
    } else {
        var testDate = new Date(year, month, leapYearFebDays);
        // check if current year is leap-year
        daysInMonth = testDate.getMonth() === month ? leapYearFebDays : usualYearFebDay;
    }

    // Count first day of week from the first day of month
    var date = new Date(year, month, 1);

    //Pay atention here that day in month starts from 0, not from 1
    var dayOfWeek = date.getDay();

    // 1. Fill the beggining of table with empty cells (the beggining of month)
    var dayOfWeekNumber  = date.getDay() === 0 ?  daysInWeek - 1 : date.getDay() - 1;
    for (var i = 0; i < dayOfWeekNumber; i++) {
        table += '<td></td>';
    }

    // 2. Fill calendar cells with days
    for (i = 0; i < daysInMonth; i++) {
        dayOfWeek = dayOfWeek % daysInWeek >= 0 ? dayOfWeek % daysInWeek : dayOfWeek;
        table += '<td>' + (i+1) +'</td>';

        if( dayOfWeek % daysInWeek === 0 ){
            table += '</tr>' + '<tr>'
        }

        dayOfWeek++;
    }

    // 3. Fill the rest of table with empty cells (the end of month)
    if(dayOfWeek !== 1){
        for (dayOfWeek; dayOfWeek < 7 + 1; dayOfWeek++) {
            table += '<td></td>';
        }
    }

    // Close table
    table += '</tr>' + '</table>'
    htmlEl.innerHTML = table;
}

/**
 * Function is analogue of lodash throttle
 * @param func
 * @param delayInMs
 */
function throttle(func, delayInMs) {

    var delayInProgress = false;

    function executeFunction() {

        if (delayInProgress) { // if delay is not finished do not execute function
            return;
        }

        func.apply(this, arguments); // Otherwise execute function
        delayInProgress = true; // then change flage state (forbid execution of function during other calls)
        setTimeout(function () { // and after delay passed change flag (allow execution of function during other calls)
                delayInProgress = false;
            },
            delayInMs);
    }

    return executeFunction;
}


function sleep(delayInSec){
    var start = new Date();
    var end = start.getTime() + delayInSec * 1000;
    while(new Date().getTime() < end){

    }
}