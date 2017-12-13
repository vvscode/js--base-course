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
 function isDeepEqual (objA, objB) {
   if (objA.toString() === `[object Object]` && objB.toString() === `[object Object]`) {
     let x, y;
     x = y = 0;
     for (let key in objA) { x++ };
     for (let key in objB) { y++ };
     if (x !== y) { return false };
     for (let key in objA) {
       if (typeof objA[key] === `object` && typeof objB[key] === `object`) {
         if (objA === objA[key] || objB === objB[key]) { return (objA === objA[key] && objB === objB[key]) };
         if (!isDeepEqual(objA[key], objB[key])) { return false };
       } else if (objA[key] !== objB[key] && objA[key].toString() !== `NaN`) { return false };
       if (objA[key].toString() === `NaN` && objB[key].toString() === `NaN`) { return true };
     }
     return true;
   } else { return objA.toString() === objB.toString() };
 }

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
 function bind (func, context) {
   return function() {
     return func.apply(context, arguments);
   }
 }

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function (context) {
  let func = this;
  return function() {
    return func.apply(context, arguments);
  }
}

/**
* Создать объект o так, чтобы каждый раз когда в коде написано
* o.magicProperty = 3 // (любое значение)
* в консоль выводилось значение, которое присваивается и текущее время
*/
let o = Object.create(Object.prototype, {
  magicProperty: {
    set: function(value) {
      console.log(`Value: ${value} Time: ${new Date().toLocaleString(`en`, {hour:`numeric`, minute:`numeric`, second:`numeric`})}`);
    }
  }
});

/**
* Создать конструктор с методами, так,
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function ObjectU() {};
ObjectU.prototype.askName = function() {
  this.name = prompt(`Enter your name`);
  return this;
};
ObjectU.prototype.askAge = function() {
  this.age = prompt(`Enter your age`);
  return this;
};
ObjectU.prototype.showAgeInConsole = function() {
  console.log(this.age);
  return this;
}
ObjectU.prototype.showNameInAlert = function() {
  alert(this.name);
}
let u = new ObjectU();

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
 function calculate (operation) {
   return function (x) {
     return function (y) {
       if (operation === `+`) {return(x + y)};
       if (operation === `-`) {return(x - y)};
       if (operation === `*`) {return(x * y)};
       if (operation === `/`) {return(x / y)};
     }
   }
 }

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
 let Singleton = (function() {
   let singleton;
   return function Singleton() {
     if (singleton) {
       return singleton
     }
     singleton = this;
     return singleton;
   }
 }) ();

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
  function ForceContructor(a, b, c) {
    if (this === window || this === undefined) {
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
 function sum(a) {
   if (!a) a = 0;
   function func(b) {
     if (!b) b = 0;
     return sum(a+b);
   }
   func.valueOf = function() {return a}
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
   let leng = func.length;
   let i = 0;
   let arr = [];

   function cycle(a) {
     if (i < leng) {
       i++;
       arr.push(a);
       if (i === leng) {
         return func.apply(null, arr);
       }
       return cycle;
     }
   }
   return cycle;
 }

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать,
что объект является экземпляром двух классов
*/
function User() {};
function PreUser() {};
PreUser.prototype = new Array();
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
//../page/index.html
//../page/script.js

/*
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el) {
  let year, month;
  if (!document.querySelector(`.Calendar`)) {
    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
  }

  function writeData(key, value) {
    let table = document.querySelector(`.Calendar`);
    if (!table.objectData) {table.objectData = {}}
    table.objectData[key] = value;
    console.log(table.objectData);
  }
  function addHead(year, month) {
    if (!document.querySelector(`.Calendar`)) {
      return
    };
    let monthName = new Date(year, month - 1).toLocaleString(`ru`, {
      month: 'long'
    }).toUpperCase();
    let thead = document.querySelector(`.Calendar`).querySelector(`thead`);
    let tr = document.createElement(`tr`);
    for (let i = 0; i < 3; i++) {
      let th = document.createElement(`th`);
      if (i === 0) {
        th.innerHTML = '&#8656';
        th.classList.add(`back`);
      }
      if (i === 1) {
        th.setAttribute(`colspan`, `5`, 0);
        th.innerText = `${monthName}/${year}`;
      }
      if (i === 2) {
        th.innerHTML = '&#8658';
        th.classList.add(`next`);
      }
      tr.appendChild(th);
    }
    thead.insertBefore(tr, thead.querySelector(`tr`));
  }
  drawCalendar(year, month, el);
  addHead(year, month);

  document.body.onclick = function(e) {
    if (e.target.closest(`TABLE`)) {
      if (document.querySelectorAll(`.data`)[1]) {
        let comment = document.querySelectorAll(`.data`)[1];
        if (comment.value !== ``) {
          writeData(comment.saveDate, comment.value);
        }
      }
      while (document.querySelector(`.data`)) {
        let elem = document.querySelector(`.data`);
        elem.parentNode.removeChild(elem);
      }
    }
    if (e.target.closest('TH') && e.target.className === `back`) {
      if (month === 1) {
        year--;
        month = 12;
      } else {
        month--
      }
      drawCalendar(year, month, el);
      addHead(year, month);
    }
    if (e.target.closest('TH') && e.target.className == `next`) {
      if (month === 12) {
        year++;
        month = 1;
      } else {
        month++
      }
      drawCalendar(year, month, el);
      addHead(year, month);
    }
    if (e.target.closest('TD') && e.target.closest('TD').innerText !== ``) {
      let day = new Date(year, month-1, e.target.closest('TD').innerText).toLocaleString(`ru`, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      let div = document.createElement(`div`);
      let comment = document.createElement(`textarea`);
      div.classList.add(`data`);
      comment.classList.add(`data`);
      comment.saveDate = new Date(year, month-1, e.target.closest('TD').innerText).toLocaleString(`en`, {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
      div.innerText = day;
      document.body.appendChild(div);
      document.body.appendChild(comment);
    }
  }
}


function debounce(fun, delay) {
  let timer;
  return function() {
    debounce.argts = arguments;
    if (timer > 0) clearTimeout(timer);
    timer = setTimeout(function() {
      fun.apply(fun, debounce.argts)
    }, delay);
    return fun.bind(fun);
  }
}

function throttle(fun, delay) {
  let timer;
  let timeCall;
  return function() {
    timeCall = Date.now();
    throttle.argts = arguments;
    if (!timer) {
      fun.apply(fun, throttle.argts);
    } else {
      return fun.bind(fun);
    }
    timer = setTimeout(function time() {
      fun.apply(fun, throttle.argts);
      timer = setTimeout(time, delay);
      if ((Date.now() - timeCall) > delay) {
        clearTimeout(timer)
      }
    }, delay);
    return fun.bind(fun);
  }
}

let sleep = function(time) {
  let oldDate = Date.now();
  let newDate = Date.now();
  while (newDate-oldDate<time*1000) {
    newDate = Date.now();
  }
  return
}
