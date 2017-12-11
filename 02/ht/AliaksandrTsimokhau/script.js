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

   if(typeof(objA) !== typeof(objB)) return false;
   if(typeof(objA) !== 'Object') return objA === objB;

   if(Array.isAraray(objA) !== Array.isAraray(objB))
     return false;
   if(Object.keys(objA).length !== Object.keys(objB).length)
     return false;

     for (var key in objA) {
	            if (objA.hasOwnProperty(key)) {
	                if (key in objB && typeof objA[key] == "object" && typeof objB[key] == "object") {
	                  return  isDeepEqual(objA[key], objB[key])
	                } else {
	                    objB[key] === objA[key];
	                }
	            }
	        }

     for(var key in objA){
       if(!isDeepEqual(objA[key],objB[key]))
         return false;
     };
     return true;


 }

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
 function bind(func, context) {
   var bindArguments = [].slice.call(arguments, 2);
   return function () {
     var funcArguments = [].slice.call(arguments);
     return func.apply(context, bindArguments.concat(funcArguments));
   };
 }

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
 Function.prototype.myBind = function (oThis) {

   var aArgs = Array.prototype.slice.call(arguments, 1),
     fToBind = this,
     fNOP = function () {},
     fBound = function () {
       return fToBind.apply(this instanceof fNOP && oThis ?
         this :
         oThis,
         aArgs.concat(Array.prototype.slice.call(arguments)));
     };

   fNOP.prototype = this.prototype;
   fBound.prototype = new fNOP();

   return fBound;
 };

/**
* Создать объект o так, чтобы каждый раз когда в коде написано
* o.magicProperty = 3 // (любое значение)
* в консоль выводилось значение, которое присваивается и текущее время
*/
var o = {},
  magicPropValue,
  date = new Date;
Object.defineProperty(o, 'magicProperty', {
  set: function (val) {
    console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ', magicProperty = ' + val);
    magicPropValue = val;
  },
  get: function () {
    return magicPropValue;
  }
})
/**
* Создать конструктор с методами, так,
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
/*
function AskConstructor(){

  this.askName = function(){
    this.name = prompt('Имя?');
    return this;
  };

  this.askAge = function(){
    this.age = prompt('Возраст?');
    return this;
  };

  this.showAgeInConsole(){
    console.log(this.age);
    return this;
  };

  this.showNameInAlert(){
    alert(this.name);
    return this;
  };
}
*/
/**
 * Написать фукнцию-
 калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate() {
  var operand = [].slice.call(arguments, 0);
  return function (a) {

    return function (b) {
    return eval(a + operand + b);
    };

  }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
 function Singleton() {
   if (Singleton.instance) {
     return Singleton.instance
   }
   Singleton.instance = this;
 }

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
  function ForceConstructor(a, b, c) {
    if (this.instanceof.ForceConstructor) {
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
 function sum() {

   var a = +[].slice.call(arguments, 0);
   var currentSum = a;

   function func(b) {
     if (b) {
       currentSum += b;
       return func;
     } else return func;
   }

   func.toString = function () {
     var result = currentSum;
     if (currentSum !== a) {
       currentSum = a;
     }
     return result;
   };

   return func;
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

    var parameters = Array.prototype.slice.call(arguments, 1);
    return function() {
      return uncurried.apply(this, parameters.concat(
        Array.prototype.slice.call(arguments, 0)
      ));
    };
  };

  var summator = function(a, b, c, d) {
    return a+b+c+d;
  };

  var target1 = curryIt(summator, 1, 2, 3, 4);
  target1(5);

  var target2 = curryIt(summator, 1, 2);
  alert (target2(3, 4));


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

function webForm(){

  var outDiv = document.getElementById('output');
  outDiv.innerHTML = null;
  var yourName = document.getElementById('name').value;
  var nativeCity = document.getElementById('city').value;
  var comment = document.getElementById('comment').value;
    if(document.getElementById('gender').checked){
      var gender = 'Мужской';
    }
    else {
      gender = 'Женский';
    }

    var outHtml = 'Ваше имя:' + name + ';' + '<br>Родина:' + city + ';' + '<br>Ваш комментарий:' + comment + '<br>Ваш пол:' + gender;
    outDiv.insertAdjacentHTML('afterBegin', outHtml);
    document.getElementById('mainForm').reset();
};
/*
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el, year, month) {
  el.innerHTML = null;
  var calendar = document.createElement('div');
  calendar.id = 'calendar';
  var calendarHead = document.createElement('div');
  calendarHead.id = 'calendar-head';
  var prevBtn = document.createElement('button');
  prevBtn.innerText = '[<]';
  prevBtn.id = 'prev';
  var nextBtn = document.createElement('button');
  nextBtn.innerText = '[>]';
  nextBtn.id = 'next';
  var current = document.createElement('div');
  current.id = 'current';
  calendarHead.appendChild(prevBtn);
  calendarHead.appendChild(current);
  calendarHead.appendChild(nextBtn);
  calendar.appendChild(calendarHead);
  el.appendChild(calendar);
  drawCalendar(calendar, year, month);
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  prev.addEventListener('click', function(){drawInteractiveCalendar(calendarWrap, calendarCurrentDate.getFullYear(), calendarCurrentDate.getMonth() - 1)});
  next.addEventListener('click', function(){drawInteractiveCalendar(calendarWrap, calendarCurrentDate.getFullYear(), calendarCurrentDate.getMonth() + 1)});
}

function drawCalendar(htmlEl, year, month) {


    if (!year) {
        var myDate  = new Date();
        var myMonth = myDate.getMonth();
    } else {
        var myMonth = month - 1;
        var myDate = new Date(year, myMonth);
    };
    var daysOfTheWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    var table = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"2\" align=\"center\">";
    //заполняем первую строку днями недели
    table += "<tr>";
    for (var i = 0; i < daysOfTheWeek.length; i++) {
      table += "<td>" + daysOfTheWeek[i] + "</td>";
    }
    table += "</tr>";

    //заполняем первый ряд пустыми ячейками от  понедельника и до дня первого числа месяца

        for (var i = 0; i < getDay(myDate); i++) {
          table += '<td></td>';
        }

        while (myDate.getMonth() === myMonth) {
          table += '<td>' + myDate.getDate() + '</td>';

          if (getDay(myDate) % 7 == 6) {
            table += '</tr><tr>';
          }

          myDate.setDate(myDate.getDate() + 1);
        }
//заполняем оставшиеся дни пустыми ячейками,если нужно

        if (getDay(myDate) !== 0) {
          for (var i = getDay(myDate); i < 7; i++) {
            table += '<td></td>';
          }
        }
//закрыли таблицу
        table += '</tr></table>';

        if (myMonth == 11) {
          current.innerText =  12 + ' / ' + (myDate.getFullYear() - 1);
          if (month == 12) {
            myDate.setMonth(0);
          } else {
          myDate.setMonth(11);
          myDate.setFullYear(myDate.getFullYear() - 1);
          }
        } else current.innerText = (myDate.getMonth()) + ' / ' + +myDate.getFullYear();
        htmlEl.innerHTML += table;
        calendarCurrentDate = myDate;
      }


      function getDay(date) {
        var day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
      }

var calendarWrap = document.getElementById('calendar-wrap');
var calendarCurrentDate;
drawInteractiveCalendar(calendarWrap, 2017, 10);

//Написать реализацию функций debounce и throttle

function debounce(fun, delay, immediate){
    var timeout;
    return function () {
      var context = this,
          args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

//throttle

function throttle(fun, delay) {

  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    fun.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, delay);
  }

  return wrapper;
}


//Создать синхронную функцию sleep(seconds) так, чтобы работал код
//console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
//sleep(9);
//console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)

function sleep(seconds){

  let sec = seconds * 1000;
  console.log(new Date());
  let delay = new Date().getTime() + sec;
  while (new Date().getTime() < delay) {
    console.log('delay');
}
return console.log(new Date());

}

sleep(3);
