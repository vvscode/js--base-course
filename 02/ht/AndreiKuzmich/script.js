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
  if (objA===objB){
    return true;
  }else if(objA!==objA && objB !==objB){
    return true;
  }else if(typeof (objA) === "object" && objA !== null && 
           typeof (objB) === "object" && objB !== null && 
           Object.keys(objA).length===Object.keys(objB).length){
    if(Array.isArray(objA)===Array.isArray(objB)){
      for(var prop in objA){
        if(prop in objB){
          if ((objA[prop] === objA && objB[prop] === objA)
          || (objB[prop] === objB && objB[prop] === objA)
          || (objA[prop] === objB && objB[prop] === objA)
          || (objA[prop] === objA && objB[prop] === objB)){
            continue;
          }
          if (!isDeepEqual(objA[prop],objB[prop])){
            return false;
          }
        }else{
          return false
        }
      }
      return true;
    }
  }
  return false;
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
  };
}
/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 * 
 */
Function.prototype.myBind = function(context) {
  return bind(this, context);
};

 
/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/

var o = {
   set magicProperty(value){
     
     var date = new Date();
     var curretTime = date.getHours() + " часов " + date.getMinutes() + ' минут';
     console.log('Значение, которое присваивается: ' + value + '; текущее время: ' + curretTime)
     
   }  
 }

/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/

function Data (name, age){
  
  this.askName = function(){
    name = prompt('What is your name?');
    return this
  }
  this.askAge = function(){
    while(isNaN(age)){
      age = prompt('How old R U?');
    };
    return this
  }
  this.showNameInAlert = function(){
    alert ('Your name is ' + name);
    return this
  }
  this.showAgeInConsole = function(){
    console.log('Your age is ' + age)  
  }  
}

var u = new Data()



/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(param_0) {
  return function(param_1){
    return function(param_2){
      if(param_0==='+'){ 
        return(param_1 + param_2);
        }
       else if(param_0 === '-'){
          return(param_1 - param_2);
        }else if(param_0 === '*'){
          return(param_1 * param_2);
        }else if(param_0 === '/'){
          return(param_1 / param_2);
        }else {
          return('undefined');
        }
    }
  }
}


/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
var Singleton = (function(){
  var instance;
  function Singleton(){
    if(typeof instance === 'object'){
      return instance;
    }else{
      instance = this;
    }
  }
  return Singleton;
}());


/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */



function ForceContructor(a, b, c) {
  if (!(this instanceof ForceContructor)) {
    return new ForceContructor(a,b,c);
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

function sum () {
  
    var currentSum =arguments[0] || 0;
    function f(b) {
        return sum(currentSum + (b || 0));
    }
     f.valueOf = function() {
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

function curry (func) {
  var arity = func.length

  return function f1(...args) {
    if (args.length >= arity) {
      return func(...args)
    } else {
      return function f2(...moreArgs) {
        var newArgs = args.concat(moreArgs)
        return f1(...newArgs)
      }
    }
  }
}

function target1(a, b) {
  return a + b 
}
function target2(a, b, c) {
  return a + b + c
}
function target3(a, b, c, d) {
  return a + b + c + d
}
function target4(a, b, c, d, e) {
  return a + b + c + d + e
}



/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
function User(){};
function PreUser(){};

User.prototype = PreUser.prototype = [];
var u = new User();
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
//в папке interctiveCalendar




function debounce(func, delay) { 
  var timeout;            
  return function() {
      var context = this;   
      clearTimeout(timeout);   
      timeout = setTimeout(function(args) {
          func.apply(context, args);     
      }, delay); 
   }; 
};







function sleep(n){
  var beforeSleep = new Date().getTime();
  n *=1000;
  var afterSleep;
  do{
    afterSleep = new Date().getTime(); 
  } while(afterSleep - beforeSleep < n); 
}
console.log(new Date())
sleep(4)
console.log(new Date())