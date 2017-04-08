/* Что такое алгоритм? Из чего состоит программа? */

/* Что такое переменная? Как ее создать / изменить? */
// var a;
// var b = 2; 
// a = 3;
// b = 4;

/* Что такое "тип данных"? Какие типы данных есть в js ? Как узнать тип значения? */
// typeof

/* Что такое оператор? Что такое выражение? */
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Expressions_and_Operators

/* Виды условных операторов? */
// if / if else / switch

/* Виды циклов? */
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/%D0%A6%D0%B8%D0%BA%D0%BB%D1%8B_%D0%B8_%D0%B8%D1%82%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8

/* Логические операции? */
// &&  / ||

/* Как обойтись без логических операций? */
// Использование && / || для замены if / if not

/* Что такое функция? 3 способа объявления функции? Аргументы функции ? */
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions
// function f1(a, b) {
//     return a + b;
// }
// var f2 = function(a, b) {
//     return a + b;
// };
// var f3 = new Function(['a', 'b'], 'return a + b;');

/* Что возвращает функция? */
// return value / undefined / new object

/* Ввод / вывод в JS */
// console.log('Some message');
// console.info('Console info');
// console.error('Some error');
// document.write('Some text for page');
// document.body.innerHTML = document.body.innerHTML + "<h1>Cool</h1>";
// alert('Some alert');
// confirm('Are you sure?');
// prompt("Some question", "default answer");

/* Что такое замыкание? Пример замыкания? */
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// var a = function() {
//     var b = 0;
//     // var c = 3;
//     var d = 5;
//     return function() {
//         b = b + 1;
//         return b;
//     };
// };
// // var c = a();
// // console.log(c());
// // console.log(c());

// for(var i = 0; i < 3; i++) {
//     // (function(i) {
//         setTimeout(function() {
//             console.log(i);
//         }, 3000);
//     // })(i);
// }
// console.log(i);

/* Рекурсия ? Виды рекурсии ? Важные моменты при работе с рекурсией ? */
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Functions#Рекурсия
// function fact(i) {
//     var ret;
//     if (i > 1){
//         ret = i * fact(i - 1);
//     } else {
//       ret = 1;
//     }
//     return ret;
// }
// fact(3);

/* Что такое объект? */
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Working_with_Objects
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Details_of_the_Object_Model
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures#Объекты
// var o1 = {
//     a: 1,
//     'some prop': 2
// };
// console.log(o1.a);
// console.log(o1['some prop']);

/* Что такое "наследование" ? ООП модель в JS ? "Классы" */
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
// var O = function(word) {
//     this.name = 23;
//     this['name2'] = "some prop";
//     this.name3 = word;
// };
// O.prototype = {
//     commonProp: 123
// };

// var o2 = new O('Hey');
// console.log(o1, o2);
// function C1(name) {
//     this.method = function() {
//         alert(name);
//     };
// }
// function C2(name) {
//     this.name = name;
// }
// C2.prototype.method = function() {
//     alert(this.name);
// };  

// Наследование на примере самолета / бомбардировщика
// function Plane(name) {
//   this.name = name;
//   this.fly();
// };
// Plane.prototype = {
//   model: 'Plane',
//   speed: 17000,
//   fly: function() {
//     alert('Fly Forest Fly ' +  this.model);
//   }
// };

// // var p1 = new Plane();
// // console.log(p1);

// function BomberPlane() {
//    Plane.apply(this, arguments);
//   // новая логика
// };

// // BomberPlane.prototype = new Plane();
// BomberPlane.prototype = Object.create(Plane.prototype);
// BomberPlane.prototype.model = 'BomberPlane';
// BomberPlane.prototype.fly = function() {
//   alert('Fly and bomb Forest');
// }

// var b1 = new BomberPlane('Belarus', 911);
// console.log(b1);

/* Проверить объект на принадлежность к "классу" */
// instanceof

/* Какие "стандартные классы" есть в js? */
// Number, String, Array, Function 
// Встроенные объекты языка
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects
// Классы и объекты, доступные при работе в браузере
// https://developer.mozilla.org/ru/docs/Web/API

/* this? */
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/this
// function a(arg1, arg2) {
//   console.log('a', this, arg1, arg2);
// }
// a(); // window

// function b() {
//   'use strict';
//   console.log('b', this);
// }
// b(); // undefined - использован use strict

// var o = {
//   someMethod: function() {
//     console.log('someMethod', this);
//   }
// }
// o.someMethod(); // o - при вызове на объекте

// var someMethod = o.someMethod;
// someMethod(); // window / undefined - когда вызываем без объекта, тоже что и в обычной функции

// var o1 = {
//   name: 3
// }
// o1.method = someMethod;
// o1.method(); // o1 - тк вызываем на объекте

// Вызов в нужном контексте
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/call
// a.call(o1, 1, 2);
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
// a.apply(o1, [1, 2]);

// Создание функции с зафиксированным контекстом
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// var a1 = a.bind(o1);
// a1(3, 4);