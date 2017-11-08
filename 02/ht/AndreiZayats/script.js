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
  if (objA !== objA && objB !== objB) return true; // Проверка на NaN
  if (typeof objA !== typeof objB) return false; // Сначала проверяем объекты
  if (typeof(objA) === 'object' && typeof(objB) === 'object') // Проверка вложенных объектов
  {
    if(objA.length !== objB.length)	return false;
    for(var key in objA)
    {
      if (objA == objA[key] && objB == objB[key]) break;
      if (!isDeepEqual(objA[key], objB[key])) return false;
    }
    return true;
  }
  if (objA !== "object" || objB !== "object") return ( objA == objB ); // Проверка основных типов данных
};



/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind (func, context) {
  return function () {
    return func.apply(context, arguments);
  };
};

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function (context) {
  return bind (this, context);
};

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
var o = {
  set magicProperty (arg) {
    var time = new Date();
    console.log(arg + " " + time.getHours() + ":" + time.getMinutes());
  }
};



/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
  function User1(name, age) {
    this.name;
    this.age;
  };
    User1.prototype.askName = function(){
      this.name = prompt("input name:", "name1");
      return this;
    };
    User1.prototype.askAge = function(){
      this.age = prompt("nput age:", "13");
      return this;
    };
    User1.prototype.showAgeInConsole = function(){
      console.log(this.age);
      return this;
    };
    User1.prototype.showNameInAlert = function(){
      alert(this.name);
      return this;
    };


/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(method) {
  /* put your code here */
  return function(a) {
    return function(b) {
      return eval(a + method + b);
    };
  };
};

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
  if (!Singleton.instance) Singleton.instance = this;
  return Singleton.instance;
};

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c) {
  if ( this instanceof ForceContructor) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
  else {
    return new ForceContructor(a,b,c);
  }
};

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
// Получаем текущие дату месяц
var tmpMonth = new Date().getMonth();
var tmpYear = new Date().getFullYear();
// Рисуем календарь
drawCalendar(tmpYear,tmpMonth,document.body);
function prevClick(){
    if (tmpMonth==1)
    {
        tmpMonth = 12;
        tmpYear--;
    }
    else tmpMonth--;
    drawCalendar(tmpYear,tmpMonth,document.body); 
}
function nextClick(){
    if (tmpMonth==12)
    {
        tmpMonth = 1;
        tmpYear++;
    }
    else tmpMonth++;
    drawCalendar(tmpYear,tmpMonth,document.body); 
}
function drawCalendar(year, month, htmlEl) {
  /* Календарь из предыдущего урока */
  var monthNumber = month-1; // Перевод номера месяца без изменения глобального значения
  var monthName = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  var currentMonth = new Date(year,monthNumber);
  var monthDayTotal = new Date(currentMonth.getFullYear(),currentMonth.getMonth()+1,0).getDate(); // Количество дней месяца
  var monthDayLastName = new Date(currentMonth.getFullYear(),currentMonth.getMonth(),monthDayTotal).getDay(); // День недели последнего дня месяца
  var monthDayFirstName = new Date(currentMonth.getFullYear(),currentMonth.getMonth(),1).getDay(); // День недели первого дня месяца
  var calendarTable = ("<table><tr>");
  calendarTable += ("<p><button id='prevButton' onclick='prevClick()'><</button><b>"+monthName[monthNumber]+" "+year+"</b><button id='nextButton' onclick='nextClick()'>></button></p>"); // Собираем таблицу
  calendarTable += ("<td width=30>"+"Пн"+"</td>");
  calendarTable += ("<td width=30>"+"Вт"+"</td>");
  calendarTable += ("<td width=30>"+"Ср"+"</td>");
  calendarTable += ("<td width=30>"+"Чт"+"</td>");
  calendarTable += ("<td width=30>"+"Пт"+"</td>");
  calendarTable += ("<td width=30>"+"Сб"+"</td>");
  calendarTable += ("<td width=30>"+"Вс"+"</td></tr>");
  calendarTable += ("<tr>");
  if (monthDayFirstName!=0) // Добавляем пустые ячейки в начале месяца
  {
      for(var i=1; i<monthDayFirstName; i++)
      {
          calendarTable += ("<td/>");
      }
  }
  else // Если первый день воскресенье добавляем полную строку
  {
      for(var i=1; i<7; i++)
      {
          calendarTable += ("<td/>");
      }
  }
  for (var i = 1; i <= monthDayTotal; i++) // заполняем таблицу днями
  {
      calendarTable += ("<td width=30>"+i+"</td>");
      if (new Date(currentMonth.getFullYear(),currentMonth.getMonth(),i).getDay() == 0)
      {
          calendarTable += ("</tr><tr>"); // Если день недели Воскресенье - перевод строки
      }
  }
  calendarTable += ("</tr></table>"); // Закрываем таблицу
  htmlEl.innerHTML = calendarTable;
}
// Не потребовалось...
function drawInteractiveCalendar(el) {}
