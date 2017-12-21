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
  if (typeof objA === 'number' && typeof objB === 'number' &&
      isNaN(objA) && isNaN(objB)) return true;
  if (typeof(objA) !== typeof(objB)) return false;
  if (typeof(objA) !== 'object') return objA === objB;
  if (Array.isArray(objA) !== Array.isArray(objB)) return false;
  if (Object.keys(objA).length !== Object.keys(objB).length) return false;
  if (typeof objA === 'number' && typeof objB === 'number' &&
      isNaN(objA) && isNaN(objB)) return true;
  for (var key in objA) {
    if (!(objA[key] === objA && objB[key] === objB)) {
      if (!isDeepEqual(objA[key], objB[key])) return false;
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
  return function() {
    return func.apply(context, arguments);
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
    console.log(value + ' ' + date);
  },
};
/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function Greeter(name, age) {
  this.name = name;
  this.age = age;
}
Greeter.prototype.askName = function() {
  this.name = prompt('Please enter your name');
  return this;
};
Greeter.prototype.askAge = function() {
  this.age = prompt('Please enter your age');
  return this;
};
Greeter.prototype.showAgeInConsole = function() {
  console.log('The age is ' + this.age);
  return this;
};
Greeter.prototype.showNameInAlert = function() {
  alert(this.name);
  return this;
};
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(operator) {
  return function(firstOperand) {
    return function(secondOperand) {
      return operations[operator](firstOperand, secondOperand);
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
  '*': function(a, b) {
    return a * b;
  },
  '/': function(a, b) {
    return a / b;
  },
};

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
  if (Singleton.instance) return Singleton.instance;
  this.foo = 123;
  return Singleton.instance = this;
}

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
  function adder(operand) {
    return sum(total + (operand || 0));
  }

  adder.valueOf = function() {
    return total;
  }
  return adder;
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
/* Тут ваш код */
function PreUser() {}
PreUser.prototype = Object.create(Array.prototype);

function User() {}
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
function showUserInfo(el) {
  var form = document.forms.userForm;
  var name = form.name.value;
  var city = form.city.value;
  var comment = form.comment.value;
  var sex = form.sex.value;

  el.innerHTML = 'Name: ' + name + '<br> Hometown: ' + city
  + '<br> Sex: ' + sex + '<br> Comment: ' + comment;

  form.reset();
}

function initialize(){
  var el = document.getElementById('userInformation');
  var button = document.getElementById('btn');
  button.addEventListener('click', showUserInfo.bind(null, el));
}
/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el) {
  var date = new Date()
  var thisYear = date.getFullYear();
  var thisMonth = date.getMonth();
  var monthsTable = document.createElement('div');
  var months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
  var caption = document.createElement('text');
  caption.innerText = thisYear + ' / ' + date.toLocaleString('en', {month: 'long'});
  
  var prevMnthBtn = document.createElement('button');
	prevMnthBtn.innerText = '[ < ]';
  prevMnthBtn.id = 'prev';
  
	var nextMnthBtn = document.createElement('button');
	nextMnthBtn.innerText = '[ > ]';
  nextMnthBtn.id = 'next';
  
  el.appendChild(prevMnthBtn);
  el.appendChild(caption);
  el.appendChild(nextMnthBtn);
  el.appendChild(monthsTable);
  drawCalendar(thisYear, thisMonth, monthsTable)

  function drawCaption(year, month) {
    caption.innerText = year + '/' + months[month];
  }

  prevMnthBtn.addEventListener("click", function() {
		--thisMonth;
		if (thisMonth < 0) {
			thisMonth = 11;
			thisYear -= 1;
    }
    drawCaption(thisYear, thisMonth);
		drawCalendar(thisYear, thisMonth, monthsTable);
  });
  
  nextMnthBtn.addEventListener("click", function() {
		++thisMonth;
		if (thisMonth > 11) {
			thisMonth = 0;
			thisYear += 1;
		}
    drawCaption(thisYear, thisMonth);
		drawCalendar(thisYear, thisMonth, monthsTable);
	});
}
function drawCalendar(year, month, htmlEl) {

  var monthStart = new Date(year, month);
  var monthEnd = new Date(year, month, 0);
  var sunday = 7;
  var table = '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';
  var calendar = document.createElement('div');
  calendar.setAttribute('id','table')
  function fixWeekStart(dayNumber) {
      if (dayNumber === 0) {
          dayNumber = sunday;
      }
      return dayNumber;
  }

  for (var i = 1; i < fixWeekStart(monthStart.getDay()); i++) {
       table += '<td></td>';
  }

  for (var i = 1; i <= monthEnd.getDate(); i++) {
      table += '<td>' + i + '</td>';
      if (fixWeekStart(monthStart.getDay()) == sunday) {
          table += '</tr><tr>';
      }
      monthStart.setDate(monthStart.getDate() + 1);
  }

  table += '</tr></table>';

  htmlEl.innerHTML = table;
}

function initializeCalendar(){
  var calendar = document.getElementById('calendar');
  drawInteractiveCalendar(calendar);
 
}
