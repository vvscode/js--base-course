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
  if(objA === objB) return true;
  if (objA == null && objB == null) return true;
  if (objA == null || objB == null) return false;
  if (typeof objA === 'number' && typeof objB === 'number' && isNaN(objA) && isNaN(objB)) return true;
  if(typeof objA !== "object" && typeof objB !== "object") return objA === objB;

  var objAKeys = Object.keys(objA);
  var objBKeys = Object.keys(objB);
  
  if(objAKeys.length !== objBKeys.length) return false;

  return !objAKeys.some(function(key) {
    if(!objBKeys.includes(key)) return true;
    if(objA === objA[key] && objB === objB[key]) return false;
    return !isDeepEqual(objA[key], objB[key]);
  });
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

Function.prototype.myBind = function(newContext) {
  return bind(this, newContext);
}

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/

var o = {};
Object.defineProperty(o, "magicProperty", {
  set: function(value) {
    console.log(value, new Date());
  }
});

// o.magicProperty = 3;

/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/

function User() {
  this.askName = function() {
    this.name = prompt('Insert your name');
    return this;
  }

  this.askAge = function() {
    this.age = prompt('Insert your age');    
    return this;
  }

  this.showAgeInConsole = function() {
    console.log(this.age);
    return this;
  }

  this.showNameInAlert = function() {
    alert(this.name);
    return this;
  }
}

var u = new User();
// u.askName().askAge().showAgeInConsole().showNameInAlert();

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */

function calculate(operator) {
  return function(firstValue) {
    return function(secondValue) {
      var result;
      switch(operator) {
        case "+":
          result = firstValue + secondValue;
          break;
        case "-":
          result = firstValue - secondValue;
          break;
        case ":":
        case "/":
          result = firstValue / secondValue;
          break;
        case "*":
          result = firstValue * secondValue;
          break;
        default:
          result = 0;
      }
      return result;
    }
  }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = (function() {
  var instance;
  return function () {return instance || (instance = this)};
}())

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */

function ForceContructor(a, b, c) {
  if(this instanceof ForceContructor) {
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

function sum(value) {
  value = value || 0;

  function sumIt(anotherValue) {
    anotherValue = anotherValue || 0;
    return sum(value + anotherValue);
  }

  sumIt.toString = function() {
    return value;
  };

  return sumIt;
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
  return function(variable) {
    return func.length > 1 ? curry(func.bind(this, variable)) : func.call(this, variable);
  }
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */

function PreUser() {};
PreUser.prototype = new Array();

function User() {};
User.prototype = new PreUser();

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
function drawInteractiveCalendar(el) {
  var currentDate = new Date(); 
  var belWeekFormat = [1, 2, 3, 4, 5, 6, 0];
  drawCalendar(el, currentDate, belWeekFormat);
}

function drawCalendar(element, initDate, weekFormat) {  
  var drawHeader = function() {  
    var weekDays = {0: "Вс", 1: "Пн", 2: "Вт", 3: "Ср", 4: "Чт", 5: "Пт", 6: "Сб"};    
    var calendarWeekDays = weekFormat.map(function(day) {
      return `<th>${weekDays[day]}</th>`;
    }).join("");
  
    element.innerHTML = [
      '<span style="cursor: pointer" id="previousMonth">[<]</span>',
      '<span id="caption"></span>',
      '<span style="cursor: pointer" id="nextMonth">[>]</span>',
      '<div>',
      calendarWeekDays,
      '</div>',
      '<div id="calendarTable"></div>',
      '<div id="calsendarHistory"></div>'
    ].join("");
  }

  var drawBody = function(year, month) {    
    var day = new Date(year, month);
    var currentMonth = day.toLocaleString("ru", {month: 'long'});
    var currentYear = day.getFullYear();

    var calendarBody = "<tr>";
    for(var i = 0; weekFormat[i] != day.getDay(); i++) {
      calendarBody += "<td></td>";
    }

    while(month == day.getMonth()) {
      if(day.getDay() == weekFormat[0]) calendarBody += "<tr>";
        calendarBody += `<td data-date="${day}">${day.getDate()}</td>`;
      if(day.getDay() == weekFormat[weekFormat.length - 1]) calendarBody += "</tr>";
      day.setDate(day.getDate() + 1);
    }
    if(day.getDay() !== weekFormat[weekFormat.length - 1]) calendarBody += "</tr>";
    
    document.getElementById("caption").innerHTML = `${currentMonth} / ${currentYear}`;
    document.getElementById("calendarTable").innerHTML = `<table>${calendarBody}</table>`;
  }

  var initNavigateButtons = function(year, month, calendarRender) {
    var day = new Date(year, month); 
    
    var navigate = function(monthStep, initDate, calendarRender) {
      var month = initDate.getMonth();
      var date = initDate;
    
      return function(direction) {
        if(direction === "+") {
          date.setMonth(month + monthStep);
          
        } else if(direction === "-") {
          date.setMonth(month - monthStep);
        }
    
        month = date.getMonth();
        
        calendarRender(date.getFullYear(), month);
      }
    }

    var navigation = navigate.call(null, 1, day, calendarRender);
  
    document.getElementById("previousMonth").addEventListener("click", function() {
      navigation("-");
    });
  
    document.getElementById("nextMonth").addEventListener("click", function() {
      navigation("+");
    })
  }

  var initNoteFunctionality = function() {
    this.calendarId = element.id;

    var updateNoteStorage = function(notes) {
      setTimeout(function(notes) {
        localStorage.setItem(this.calendarId, JSON.stringify(notes));
      }, 0, notes);
    };

    var getNotesFromStorage = function() {
      return JSON.parse(localStorage.getItem(this.calendarId));            
    }

    var initStorage = function() {
      updateNoteStorage([]);
    };

    var displayNote = function(noteString) {
      var calendarHistory = document.getElementById("calsendarHistory"); //NOTE: use element.querySelector for insert some string to element
      var history = calendarHistory.innerHTML;
      calendarHistory.innerHTML = calendarHistory.innerHTML + noteString + "<br>";
    }
    
    setTimeout(function() {
      var notes = getNotesFromStorage();
      if(notes) {
        notes.forEach(function(note) {
          displayNote(note);
        });
      } else {
        initStorage();      
      }
    }, 0);

    var addNote = function(date, question) {
      question = question || "Input note.";
      var note = prompt(question).trim();
      if(note) {
        var noteString = createNote(note, date);
        displayNote(noteString); 
        setTimeout(saveNote(noteString), 0, noteString);
        return;       
      }
      addNote(date, "Note cannot be empty or whitespace. Please, input correct note.");
    };

    var createNote = function(note, date) {
      return `${note} - ${date.toLocaleString("ru")}`;
    }

    var saveNote = function(noteString) {
      var notes = getNotesFromStorage();
      notes.push(noteString);
      updateNoteStorage(notes);
    }

    document.getElementById("calendarTable").addEventListener("click", function(event) {
      var dataset = event.target.dataset;
      if(dataset) {
        var date = dataset["date"];
        if(date) {
          addNote(date);
        }
      }
    })
  }

  drawHeader();
  var year = initDate.getFullYear();
  var month = initDate.getMonth();
  initNavigateButtons(year, month, drawBody);
  drawBody(year, month);
  initNoteFunctionality();
}

function throttle(fun, delay) {
  var timerId;

  return function() {    
    if(timerId) {
      return;
    } else {
      var args = Array.prototype.slice.call(arguments);
      fun.apply(this, args);
      timerId = setTimeout(function() {timerId = null;}, delay);  
    } 
  }
}

function debounce(fun, delay) {
  var timerId;

  function calling() {
    if(timerId) {
      clearTimeout(timerId);
    }
    var args = Array.prototype.slice.call(arguments);
    timerId = setTimeout(function() {fun.apply(this, args)}, delay);   
    return calling;   
  }

  return calling;
}

function sleep(seconds) {
  var sleepTime = new Date().getTime() + seconds * 1000;  
  while(new Date().getTime() < sleepTime) {}
}
// console.warn("sleep function");
// console.log(new Date());
// sleep(9);
// console.log(new Date());
