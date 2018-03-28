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
    var arg1, arg2;
    return function (){
        return func.call(context, arg1, arg2);

    }
}
/**
 it("Пробрасывает параметры контекстом", function() {
 bind(function() {
 assert.isOk(arguments.length === 0);
 }, {})();
 bind(function() {
 assert.isOk(arguments.length === 1);
 assert.isOk(arguments[0] === 1);
 }, {})(1);
 bind(function() {
 assert.isOk(arguments.length === 3);
 assert.isOk(arguments[0] === 1);
 assert.isOk(arguments[1] === 2);
 assert.isOk(arguments[2] === "три");
 }, {})(1, 2, "три");
 });
 });
 */

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
var allFunction = {
    myBind: function(){
        return function(){
         return func.call(context, arg1)
        }
    }
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
var o = {
    magicProperty: function(){
        console.log(new Data);
    }
};
/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */
/**
var u = {
    askName: function(){
        this.name = prompt("Вaше имя?", "Bob");
    }
    askAge: function(){
        this.age = prompt("Ваш возраст?", "0");
    }
    showAgeInConsole: function(){
        console.log(this.age);
    }
    showNameInAlert: function(){
        console.log(this.name);
    }
};
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate() {
  /* put your code here */
    operator();
    function operator(a){
        if (this.a === '+'){
            return function(b){
                return function(c){
                    return (b + c);
                }
            }
        }
        if (this.a === '-'){
            return function(b){
                return function(c){
                    return(b - c);
                }
            }
        }
        if (this.a === '*'){
            return function(b){
                return function(c){
                    return(b * c);
                }
            }
        }
        if (this.a === '/'){
            return function(b){
                return function(c){
                    return(b / c);
                }
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
    throw "undefined";
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
function curry(func) {}

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
function drawInteractiveCalendar(el) {}
