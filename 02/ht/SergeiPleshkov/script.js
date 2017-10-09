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

var cache = [];

function isDeepEqual(objA, objB) {
  if (objA === objB) {
    return true;
  } else if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (var key in objA) {
    if (cache.hasOwnProperty(objA[key])) return true;
    if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
      cache.push(objA[key]);
      return isDeepEqual(objA[key], objB[key]);
    }
  }
  if (JSON.stringify(objA) === JSON.stringify(objB)) {
    return true;
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
function NameAgeConstructor() {
  this.askName = function () {
    this.name = prompt('Name?');
    return this;
  };
  this.askAge = function () {
    this.age = prompt('Age?');
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

function sum() {

  var currentSum = arguments[0] || 0;

  function func(b) {
	  return sum(currentSum + (b || 0))
  }

  func.toString = function () {
	  return currentSum;
  };

  return func;
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
  if (func.length === 4) {
    return function (a) {
      return function (b) {
        return function (c) {
          return function (d) {
            return func.call(null, a, b, c, d);
          }
        }
      }
    }
  } else if (func.length === 3) {
    return function (a) {
      return function (b) {
        return function (c) {
          return func.call(null, a, b, c);
        }
      }
    }
  } else if (func.length === 2) {
    return function (a) {
      return function (b) {
        return func.call(null, a, b);
      }
    }
  } else if (func.length === 1) {
    return function (a) {
      return a;
    }
  }
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
function PreUser() {}

function User() {}
User.prototype = PreUser.prototype = [];

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
var submitButton = document.getElementById('submit');
submitButton.addEventListener('click', postInfoAndResetForm);

function postInfoAndResetForm() {
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = null;
  var name = document.getElementById('name').value;
  var city = document.getElementById('city').value;
  var comment = document.getElementById('comment').value;
  if (document.getElementById('male').checked) {
    var gender = 'Мужской';
  } else gender = 'Женский';
  var outputHTML = 'Имя:' + name + ';' + '<br>Родина: ' + city + ';' + '<br>Ваш комментарий: ' + comment + '<br>Пол: ' + gender;
  outputDiv.insertAdjacentHTML('afterBegin', outputHTML);
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
	document.getElementById('calendar-list').innerHTML = localStorage.getItem('noteList') || null;
  var calendar = document.createElement('div');
  calendar.id = 'calendar';
  var calendarHead = document.createElement('div');
  calendarHead.id = 'calendar-head';
  var prevMnthBtn = document.createElement('button');
  prevMnthBtn.innerText = '[ < ]';
  prevMnthBtn.id = 'prev';
  var nextMnthBtn = document.createElement('button');
  nextMnthBtn.innerText = '[ > ]';
  nextMnthBtn.id = 'next';
  var current = document.createElement('div');
  current.id = 'current';
  calendarHead.appendChild(prevMnthBtn);
  calendarHead.appendChild(current);
  calendarHead.appendChild(nextMnthBtn);
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
	newNote.innerHTML = calendarCell.innerHTML + '.' + month + '.' + year + ' : ' + noteComment;
	newNote.className += 'note';
	document.getElementById('calendar-list').appendChild(newNote);
}

calendar.onclick = function(event) {
	var target = event.target;
	if (target.tagName === 'TD' && target.innerHTML) {
		var noteComment = prompt('Напишите комментарий', 'Опять пьянка');
		if (noteComment !== null) addDateToList(target, noteComment);
	};
	localStorage.noteList = document.getElementById('calendar-list').innerHTML;
	
}
}

var noteListContainer = document.getElementById('calendar-list');
noteListContainer.onclick = function(event) {
	var target = event.target;	
	if (target.className === 'note' && confirm('Удалить запись "' + target.innerHTML + '"?')) target.remove();
	localStorage.noteList = document.getElementById('calendar-list').innerHTML;
}

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

  var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

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
drawInteractiveCalendar(calendarWrap, 2017, 10);



// ---
//  - Написать реализацию функций [debounce](http://underscorejs.ru/#debounce) и 
//[throttle](http://underscorejs.ru/#throttle)  и покрыть реализации тестами ( Если ваше имя начинается с гласной  -
// `debounce`, иначе - `throttle`. А лучше - обе ). 
//Функции должны с сигнатурой `debounce(fun, delay)` / `throttle(fun, delay)`




//  - К генератору листаемого календаря добавить функционал: под календарем добавить блок. При клике на ячейку даты 
//( но не на пустую ячейку кnfr b алендаря ) в блоке должна добавляться запись о том, по какой ячейке кликнули. Можно добавить 
//запрос описания даты от пользователя ( с помощью функции `prompt` и выводить это описание там же). История дат и список, 
// по которым пользоатель клика, должны сохраняться между перезагрузками страницы. Для сохранения использовать 
//[LocalStorage] (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Интерфейс работы с данными (чтение/запись) 
//лучше сделать асинхронным



//  - Создать синхронную функцию `sleep(seconds)` так, чтобы работал код
// 
//  console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
//  sleep(9);
//  console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)

function sleep(seconds) {
  var start = Date.now(),
	  end = Date.now() + seconds*1000;
	  while (Date.now() < end) {
	  };
  }