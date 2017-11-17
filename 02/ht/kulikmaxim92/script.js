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
function isDeepEqual(objA, objB, arrayObjectProperties) {
  if (typeof objA === 'object' && typeof objB === 'object') {
    if (objA === null || objB === null) {
      return objA === objB;
    }

    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }

    arrayObjectProperties = arrayObjectProperties || [];

    arrayObjectProperties.push([objA, objB]);

    for (var key in objA) {
      if (objB.hasOwnProperty(key)) {
        var recursiveEqualLinks = arrayObjectProperties.some(function(el) {
          return (el[0] === objA[key] && el[1] === objB[key]) || (el[0] === objB[key] && el[1] === objA[key]);
        });

        if ((objA[key] === objB[key]) || recursiveEqualLinks || isDeepEqual(objA[key], objB[key], arrayObjectProperties)) {
          continue;
        }
      }

      return false;
    }

    return true;
  }

  if (typeof objA === 'function' && typeof objB === 'function') {
    return objA.toString() === objB.toString();
  }

  if (typeof objA === 'number' && typeof objB === 'number' && isNaN(objA) && isNaN(objB)) {
    return true;
  }

  return objA === objB;
}

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
  return function() {
    var args = Array.prototype.slice.call(arguments, 0);
    return func.apply(context, args);
  };
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
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
  set magicProperty(value) {
    var date = new Date();
    console.log(value + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
  },
};
/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function Questionnaire(name, age) {
  this.name = name;
  this.age = age;
}

Questionnaire.prototype.askName = function() {
  this.name = prompt('Введите свое имя');

  return this;
};

Questionnaire.prototype.askAge = function() {
  this.age = prompt('Введите свой возраст');

  return this;
};

Questionnaire.prototype.showAgeInConsole =function() {
  console.log(this.age);

  return this;
};

Questionnaire.prototype.showNameInAlert = function() {
  alert(this.name);

  return this;
};

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(sign) {
  return function(firstNumber) {
    return function(secondNumber) {
      return operations[sign](firstNumber, secondNumber);
    };
  };
}
var operations = {
  '+': function(a, b) {
    return a + b;
  },
  '-': function(a, b) {
    return a - b;
  },
  '/': function(a, b) {
    return a / b;
  },
  '*': function(a, b) {
    return a * b;
  },
};
/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function wrapper() {
  var instance;
  return function() {
    if (!instance) {
      instance = this;
    }

    return instance;
  };
}
 var Singleton = wrapper();
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
  } else {
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
function sum(total) {
  total = total || 0;
  function func(number) {
    return sum(total + (number || 0));
  }

  func.valueOf = function() {
    return total;
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
 * function target1(userForm,b,c,d) { return userForm + b + c + d }
 * function target2(userForm,b) { return userForm + b }
 * curry(target1)(1)(2)(3)(4) // 10
 * curry(target2)(5)(8) // 13
 * 
 * Примеры тестов смотреть в файле тестов
 * 
 * Читать
 * http://prgssr.ru/development/vvedenie-v-karrirovanie-v-javascript.html
 * @param {*} func 
 * @return {*} ddd
 */
function curry(func) {
  var counter = func.length;
  var args = [];
  return function f(arg) {
    args.push(arg);
    counter--;
    if (!counter) {
      return func.apply(null, args);
    }

    return f.bind(null);
  };
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
function PreUser() {}
PreUser.prototype = Object.create(Array.prototype);

function User() {}
User.prototype = Object.create(PreUser.prototype);
// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true

/**
 * Написать фукнцию debounce(fun, delay)
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

/**
 * Написать фукнцию throttle(fun, delay)
 */
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

/**
 * Написать фукнцию sleep(seconds)
 */
function sleep(seconds) {
  var stopTime = new Date().getTime() + seconds*1000;
  while (new Date().getTime() < stopTime) {};
}

/*
Создать веб страницу. Добавить на нее форму с полями 
- имя (строкое поле), 
- родной город (Выпадающий список), 
- Комментарий (многострочное поле), пол (radiobutton). 
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, 
после чего поля очистить.
*/
function displayUserInformation(el) {
  var userForm = document.forms.userForm;
  var name = userForm.name.value;
  var city = userForm.city.value;
  var comment = userForm.comment.value;
  var sex = userForm.sex.value;

  el.innerHTML = 'Имя: ' + name + '<br> Город: ' + city
    + '<br> Пол: ' + sex + '<br> Коментарий: ' + comment;

  userForm.reset();
}

function initializeForm(){
  var el = document.getElementById('userInformation');
  var button = document.getElementById('btn');
  button.addEventListener('click', displayUserInformation.bind(null, el));
}

/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
var LAST_DAY_WEEK = 7;
var storageName = 'Notes';

function Note(dateString, comment){
  this.dateString = dateString;
  this.comment = comment;
}

function drawCalendar(year, month, htmlEl) {
  htmlEl.innerHTML = '';
  var date = new Date(year, month - 1);

  var tbl = document.createElement('table');
  var tbdy = document.createElement('tbody');

  drawHeadOfCalendar(tbdy, date, htmlEl);
  drawBodyOfCalendar(tbdy, date);

  tbl.appendChild(tbdy);
  tbl.addEventListener('click', (ev) => ev.target.tagName === 'A' && addNote(ev.target.innerHTML));
  htmlEl.appendChild(tbl);
}

function drawHeadOfCalendar(tableBody, date, htmlEl) {
  var months = ['Янв', 'Фев', 'Мрт', 'Апр', 'Май', 'Инь', 'Иль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
  var daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  var head = document.createElement('tr');

  var left = document.createElement('td');
  var leftButton = document.createElement("input");
  leftButton.id = 'previous';
  leftButton.type = 'button';
  leftButton.value = '<';
  leftButton.addEventListener('click',
    drawCalendar.bind(this, date.getFullYear(), date.getMonth(), htmlEl));

  left.appendChild(leftButton);
  head.appendChild(left);

  var center = document.createElement('td');
  center.id = 'monthAndYear';
  center.colSpan = 5;
  center.style.textAlign = 'center';
  center.appendChild(document.createTextNode(months[date.getMonth()] + '/' + date.getFullYear()));
  head.appendChild(center);

  var right = document.createElement('td');
  var rightButton = document.createElement('input');
  rightButton.id = 'next';
  rightButton.type = 'button';
  rightButton.value = '>';
  rightButton.addEventListener('click',
    drawCalendar.bind(this, date.getFullYear(), date.getMonth() + 2, htmlEl));

  right.appendChild(rightButton);
  head.appendChild(right);
  tableBody.appendChild(head);

  var days = document.createElement('tr');
  for (var i = 0; i < daysOfWeek.length; i++) {
    var td = document.createElement('th');
    td.appendChild(document.createTextNode(daysOfWeek[i]));
    days.appendChild(td);
  }
  tableBody.appendChild(days);
}

function drawBodyOfCalendar(tableBody, date) {
  var calendar = getCalendar(date);
  for (var week = 1; week < calendar.length; week++) {
    var tr = document.createElement('tr');
    for (var day = 1; day <= LAST_DAY_WEEK; day++) {
      var td = document.createElement('td');

      if (!!calendar[week][day]) {
        var link = document.createElement('a');
        link.href = '#';
        link.appendChild(document.createTextNode(calendar[week][day]));
        td.appendChild(link);
      } else {
        td.appendChild(document.createTextNode(''));
      }
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  }
}

function getCalendar(date) {
  var tempDate = new Date(date.getFullYear(), date.getMonth())
  var calendar = [];
  var week = 1;

  calendar[week] = [];
  while (tempDate.getMonth() === date.getMonth()) {
    if (!(tempDate.getDay() % LAST_DAY_WEEK)) {
      calendar[week++][LAST_DAY_WEEK] = tempDate.getDate();
      calendar[week] = [];
    } else {
      calendar[week][tempDate.getDay()] = tempDate.getDate();
    }
    tempDate.setDate(tempDate.getDate() + 1);
  }

  return calendar;
}

function addNote(day){
  var comment = prompt('Введите заметку к дате');
  var dateString = day + ' ' + document.getElementById('monthAndYear').innerHTML;
  setTimeout(() => addIformationToStorage(new Note(dateString, comment)), 0);
  var notes = document.getElementById('notes');
  setTimeout(() => fillBlockNotes(notes), 0);
}

function fillBlockNotes(element){
  element.innerHTML = '';
  var arr = JSON.parse(localStorage.getItem(storageName)) || [];
  var ul = document.createElement('ul');
  for (var i = 0; i < arr.length; i++) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(arr[i].dateString + ' ' + arr[i].comment));
    ul.appendChild(li);
  }
  element.appendChild(ul);
}

function addIformationToStorage(note){
  var arr = JSON.parse(localStorage.getItem(storageName)) || [];
  arr.push(note);
  localStorage.setItem(storageName, JSON.stringify(arr));
}

function drawInteractiveCalendar(el) {
  var currentDate = new Date();
  drawCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1, el);
}

function initializeCalendar(){
  var calendar = document.getElementById('calendar');
  drawInteractiveCalendar(calendar);
  var notes = document.getElementById('notes');
  document.addEventListener('DOMContentLoaded', () => setTimeout(() => fillBlockNotes(notes), 0));
}

/**
 * Страничка с поиском и подсказками
 */
function getSuggestions(text, cb) {
  var len = 20 - ('' + text).length;
  var ret = [];
  for (var i = 0; i < len; i++) {
    ret.push(text + ' ' + i);
  }
  setTimeout(cb, len*100, ret);
}

function showSuggestions(list) {
  document.querySelector('pre').innerHTML = list.join('\n');
}

function initializeSearch() {
  var inp = document.getElementsByTagName('input')[0];
  inp.addEventListener('keyup', debounce(() => getSuggestions(inp.value, showSuggestions), 500));
}