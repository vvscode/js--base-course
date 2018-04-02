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
    if (typeof objA === "number" && typeof objB === "number") {
        if(isNaN(objA) && isNaN(objB)) {
            return true;
        }
        else if (objA !== objB) {
            return false;
        }
    }
    if (typeof objA === "string" && typeof objB === "string") {
        if (objA.length !== objB.length) {
            return false;
        }
        for (var j = 0; j < objA.length; j++) {
            if (objA.charAt(j) !== objB.charAt(j)) {
                return false;
            }
        }
    }
    if (Array.isArray(objA) && Array.isArray(objB)) {
        if (objA.length !== objB.length) {
            return false;
        } else {
            for (var k = 0; k < objA.length; k++) {
                if (objA[k] !== objB[k]) {
                    return false;
                }
            }
            return true;
        }
    }
    if (typeof objA === "object" && typeof objB === "object") {
        if (Object.keys(objA).length !== Object.keys(objB).length) {
            return false;
        }
        for (var key in objA) {
            if (objA.hasOwnProperty(key)) {
                if (objB.hasOwnProperty(key)) {
                    if (objA === objA[key] && objB === objB[key]){
                        return true;
                    }
                    else if (typeof objA[key] === "object") {
                        if (!isDeepEqual(objA[key], objB[key])) {
                            return false;
                        }
                    }
                    else if(isNaN(key) && isNaN(objA[key])){
                        return true;
                    }
                    else if (objA[key] !== objB[key]) {
                        return false;
                    }
                }
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
    return function (){
        return func.apply(context, arguments);
    }
}
 /**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
 Function.prototype.myBind = function(context){
     return bind(this, context);
 };
/**
 * создать объект с волшебным свойством,
 * чтобы при присвоении ему значения, в консоль выводилась текущая дата и значение, которое присваиваем.
 * А при чтении всегда выводилось число на 1 больше предыдущего
 * o.magicProperty = 5; // 'Sat Mar 24 2018 13:48:47 GMT+0300 (+03) -- 5'
 * console.log(o.magicProperty); // 6
 * console.log(o.magicProperty); // 7
 * console.log(o.magicProperty); // 8
 */
var original = function(){
    this.magicProperty = function () {
        var currentCount = this.magicProperty;
        return function() {
            return currentCount++;
        }
    };
};
o.__proto__ = original;

var o = function() {
    this.magicProperty = function (i) {
        var date = new Date();
        console.log(date + 'i');
        original.magicProperty = i;
        delete o.magicProperty;
    };
};
/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */
var U = function(){
    this.askName = function() {
        this.name = prompt("Вaше имя?", "Bob");
    };
    this.askAge = function(){
        this.age = prompt("Ваш возраст?", "0");
    };
    this.showAgeInConsole = function(){
        console.log(this.age);
    };
    this.showNameInAlert = function(){
        console.log(this.name);
    };
    var u = new U();
};
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(a) {
    /* put your code here */
    return function (b) {
        return function (c) {
            if (a === '+') {
                return (b + c);
            }
            else if (a === '-') {
                return (b - c);
            }
            else if (a === '*') {
                return (b * c);
            }
            else if (a === '/') {
                return (b / c);
            }
        }
    }
}
/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
    throw "undefined";
}

/**
 * Создайте функцию ForceConstructor
 * которая работает как конструктор независимо от того,
 * вызвана она с new или без
 * и сохраняет параметры в создаваемый объект с именами параметров
 */
function ForceContructor(a, b, c) {
    if (this instanceof ForceContructor){
        this.a = a;
        this.b = b;
        this.c = c;
    }
    else{
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
    var parameters = Array.prototype.slice.call(arguments, 0);
    return function back() {
        if (parameters.length >= func.length) {
            return func.apply(this, parameters);
        } else {
            return function() {
                return back.apply(
                    this,
                    parameters.concat(Array.prototype.slice.call(arguments, 0))
                );
            };
        }
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

var User = function() {};
var PreUser = function() {};
PreUser.prototype = Object.create(Array.prototype);
User.prototype = new PreUser();
var u = new User();

/*
 Cоздать форму и ее обработчик.
 На форме поля ввода - Имя пользователя( строка ), возраст (выпадающий список), пол - radio-button,
 есть ли водительские права - чекбокс, о себе - многострочное поле. Все поля обязательные.
 При отправке формы, если все заполнено - под формой вывести информацию собранную от пользователя.
 */

/*
 Cоздать генератор листаемого календаря и покрыть его тестами. В
 шапку календаря из прошлго ДЗ добавить кнопки для листания вправо/влево,
 которые позволяют изменыть отображаемый месяц. Тесты должны проверять весь функционал
 Используя функцию drawCalendar из прошлого урока
 создать функцию drawInteractiveCalendar(el)
 Которая выводит календарь, в шапке которого отображается
 [<] месяц / год [>]
 При клике по кнопкам [<] / [>] нужно реализовать листание календаря
 Добавть на страницу index.html вызов календаря
 */
function drawInteractiveCalendar(el) {}

/*
 Написать реализацию метода .myCall, который будет работать аналогично системному .call и покрыть реализацию тестами
 */
Function.prototype.myCall = function(context){
    return function (){
        return this.call(context, arg1, arg2)
    }
};
/*
 Написать реализацию функций debounce и throttle и покрыть реализации тестами
 ( Если ваше имя начинается с гласной - debounce, иначе - throttle. А лучше - обе ).
  Функции должны с сигнатурой debounce(fun, delay) / throttle(fun, delay)
 */
function debounce(fun, delay{

}
function throttle(fun, delay){

}
/*
К генератору листаемого календаря добавить функционал: под календарем добавить блок.
При клике на ячейку даты ( но не на пустую ячейку календаря ) в блоке должна добавляться запись о том,
по какой ячейке кликнули. Можно добавить запрос описания даты от пользователя
( с помощью функции prompt и выводить это описание там же).
История дат и список, по которым пользоатель кликал, должны сохраняться между перезагрузками страницы.
Для сохранения использовать LocalStorage.
Интерфейс работы с данными (чтение/запись) лучше сделать асинхронным
 */
/*
 Создать синхронную функцию sleep(seconds) так, чтобы работал код
 console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
 sleep(9);
 console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)
 */
function sleep(seconds){
    var date = new Date();
    var dateSec = date.getSeconds();
    while(dateSec < dateSec + seconds * 1000){
        date = new Date();
        dateSec = date.getSeconds();
    }
}
/*
 Написать функцию getCounter и покрыть ее тестами, так, чтобы работал следующий код
 var c = getCounter(5);
 c
 .log() // 5
 .add(4)
 .log() // 9
 .add(3)
 .log() // 12
 .reset()
 .log() // 0
 .add(8)
 .log(); // 8
 */

function getCounter(number) {
    var value = number;
    return function () {
        function log() {
            return value;
        }
        function add(addNumber) {
            return (value = value + addNumber);
        }
        function reset() {
            return (value = 0);
        }
    }
}

