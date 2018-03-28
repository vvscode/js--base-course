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
  if (typeof objA === `string` && objA === objB) return true;
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return objA.toLocaleString() === objB.toLocaleString() ? true : false;
  };
  if (typeof objA === `number` && objA === objB) return true;
  if (typeof objA === `object` && typeof objB === `object`) {
    const equalObject = (objA, objB) => {
      for (let key in objA) {
        if (objA[key] === objA || objB[key] === objB) return true;
        if (typeof objA[key] === 'number' && isNaN(objA[key]) && isNaN(objB[key])) return true;
        if (typeof objA[key] === `object` && typeof objB[key] === `object`) {
          if (!equalObject(objA[key], objB[key])) return false;
        } else {
          if (objA[key] !== objB[key]) return false;
        };
      };
      return true;
    };
    return equalObject(objA, objB);
  };
  if (typeof objA === 'number' && isNaN(objA) && isNaN(objB)) return true;
  return false;
};

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
  context = context ? context : window;
  return function () {
    return func.apply(context, arguments);
  }
};

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

Function.prototype.myBind = function() {
  const func = this;
  const args = [].slice.call(arguments);
  const context = args.shift();
  return function () {
    return func.apply(context, args.concat([].slice.call(arguments)));
  }
};

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
const o = {
  set magicProperty (value) {
    this.magic = value;
    console.log(value, new Date());
  },
  get magicProperty () { 
    return ++this.magic;
  }
};
 
/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function AskShow () {};
AskShow.prototype.askName = function () {
  this.name = prompt('What is your name?', '');
  return this;
};
AskShow.prototype.askAge = function () {
  this.age = prompt('How old are you?', '');
  return this;
};
AskShow.prototype.showAgeInConsole = function () {
  console.log(this.age);
  return this;
};
AskShow.prototype.showNameInAlert = function () {
  alert(this.name);
};
const u = new AskShow ();
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(math) {
    return function (a) {
      return function (b) {
        if (math === '+') return a + b;
        if (math === '-') return a - b;
        if (math === '*') return a * b;
        if (math === '/') return a / b;
      }
    }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
const Singleton = (function () {
  let singleton;
  function Singleton () {
    if (singleton) return singleton;
    singleton = this;
  };
  return Singleton;
}) ();

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c) {
  //Maybe you meant ForceCon's'tructor
  if (!this || this === window) {
    return new ForceContructor(a, b, c);
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
function sum(result) {
  if (!result) result = 0;
  function s (arg) {
    if (!arg) arg = 0;
    return sum(result + arg);
  };
  s.valueOf = function () {
    return result;
  };
  return s;
};

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
  const arr = [];
  let count = 0;
  return function sum () {
    (!arguments[0] || isNaN(+arguments[0])) ? arr.push(0) : arr.push(+arguments[0]);
    count++;
    return count === func.length ? func.apply(null, arr) : sum;
  };
};

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true
function User () {};
function PreUser () {};
PreUser.prototype = Object.create(Array.prototype);
PreUser.prototype.constructor = Array;
User.prototype = Object.create(PreUser.prototype);
User.prototype.constructor = PreUser;

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

const sleep = (add) => {
  const date = Date.now() + add * 1000;
  while (Date.now() < date) {
    1 === 1;
  };
};

let getCounter = (value) => {
  getCounter.valueOf = () => {
    return value;
  };
  getCounter.log = () => {
    console.log(+getCounter);
    return getCounter;
  };
  getCounter.add = (value) => {
    const result = value + getCounter;
    getCounter.valueOf = () => {
      return result;
    };
    return getCounter;
  };
  getCounter.reset = () => {
    getCounter.valueOf = () => 0;
    return getCounter;
  };
  return getCounter;
};

const debounce = (fun, delay) => {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fun, delay, ...args);
  };
};

const throttle = (fun, delay) => {
  let timer, args;
  return function (...arr) {
    args = arr;
    if (timer) return;
    fun(...args);
    args = false;
    timer = setInterval(_ => {
      if (!args) {
        clearInterval(timer);
        timer = 0;
      } else {
        fun(...args);
        args = false;
      };
    }, delay);
  };
};

function notConstructor () {
  if (this !== window && this !== undefined) {throw new Error(`You have called the function with 'new'!
  There are not allow to call this function with 'new'!`)};
};

Function.prototype.myCall = function(context, ...args) {
  if (!context) { context = window };
  const secret = Symbol();
  context[secret] = this;
  return context[secret](...args);
};

// show: https://react-nf8lyk.stackblitz.io
// develop: https://stackblitz.com/edit/react-nf8lyk

function drawCalendar(year, month, htmlEl) {
  if (htmlEl.querySelector(`.Calendar`)) {htmlEl.removeChild(htmlEl.querySelector(`.Calendar`))};
  const weekdays = new Array(7).fill(1).map((e, i) => (`<th>${new Date(2018, 2, 12 + i).toLocaleString('ru', {weekday: 'short'}).toUpperCase()}</th>`));
  let firstDay = new Date(year, month - 1).getDay() - 1;
  firstDay = firstDay < 0 ? 6 : firstDay;
  const emptyBefore = new Array(firstDay).fill(`<td></td>`);
  const insertDays = new Array(31).fill(1).map((e, i) => {
    if (new Date(year, month - 1, i + 1).getMonth() === month - 1) return `<td>${i + 1}</td>`;
  }).filter(elem => elem);
  let calendar = [...emptyBefore, ...insertDays];
  while (calendar.length < Math.ceil(calendar.length / 7) * 7) {calendar.push(`<td></td>`)};
  calendar = calendar.map((e, i, arr) => {
    if (i === 0 || i % 7 === 0) return `<tr>${e}`;
    if (i % 7 === 0 || i === arr.length - 1) return `${e}</tr>`;
    return e;
  });
  const table = document.createElement('table');
  table.className = `Calendar`;
  table.innerHTML = `<thead><tr>${weekdays.join(``)}</tr></thead><tbody>${calendar.join(``)}</tbody>`;
  htmlEl.appendChild(table);
};

class Calendar {
  constructor (htmlEl) {
    this.number = document.body.querySelectorAll('.Calendar').length || 0;
    this.elem = document.createElement('div');
    this.elem.classList.add(`calendar${Math.round(Math.random() * 10000000000)}`);
    this.message = document.createElement('div');
    this.message.id = 'message';
    htmlEl.appendChild(this.elem);
    htmlEl.appendChild(this.message);
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.refreshCalendar();
  };
  refreshCalendar () {
    this.elem.innerHTML = '';
    this.drawCalendar();
    this.addHead();
    this.addButton();
  };
  drawCalendar () {
    drawCalendar(this.year, this.month, this.elem);
    this.table = this.elem.querySelector('.Calendar');
  };
  addHead () {
    const monthName = new Date(this.year, this.month - 1).toLocaleString(`ru`, {month: 'long'}).toUpperCase();
    this.table.querySelector('thead').innerHTML = `<th class='prev'>&#8656</th><th colspan='5'>${monthName}</th><th class='next'>&#8658</th>${this.table.querySelector('thead').innerHTML}`;
    this.table.addEventListener('click', e => this.clickEvents(e.target));
  };
  addButton () {
    const button = document.createElement('button');
    button.innerText = 'Показать список';
    button.onclick = _ => this.showList();
    this.elem.appendChild(button);
  };
  clickEvents (elem) {
    if (elem.matches('.prev')) {
      this.month--;
      if (this.month < 1) {
        this.year--;
        this.month = 12;
      };
      this.refreshCalendar();
    };
    if (elem.matches('.next')) {
      this.month++;
      if (this.month > 12) {
        this.year++;
        this.month = 1;
      };
      this.refreshCalendar();
    };
    if (elem.closest('tbody') && elem.innerText) {
      const data = window.prompt('Добавить заметку');
      if (data) this.handlerData(elem.innerText, data);
    };
  };
  handlerData (day, data) {
    const date = new Date(this.year, this.month - 1, +day).toLocaleString(`ru`, {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
    this.local({[`${date}`]: data});
    this.message.innerText = date+': '+data+'\n';
  };
  local (data) {
    const getData = () => {
      return new Promise((resolve, reject) => {
        let data = window.localStorage.getItem(`calendar${this.number}`) || '{}';
        data = JSON.parse(data);
        resolve(data);
      });
    };
    const setData = (newData) => {
      getData().then(data => {
        data = Object.assign(data, newData);
        window.localStorage.setItem(`calendar${this.number}`, JSON.stringify(data));
        return 'Ready!';
      }).then(console.log);
    };
    if (!data) {
      return getData();
    } else {
      setData(data);
    };
  };
  showList () {
    this.local().then(data => {
      let str = '';
      for (let key in data) {
        str +=
        `${key}: ${data[key]}\n`;
      };
      window.alert(str);
    });
  };
};

function drawInteractiveCalendar(el) {
  new Calendar(el);
};

drawInteractiveCalendar(document.body);
drawInteractiveCalendar(document.body)