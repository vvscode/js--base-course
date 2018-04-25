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
  if (typeof objA === "string" && typeof objB === "string") {
    return objA === objB;
  }
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return objA.toString() === objB.toString();
  }
  if (
    typeof objA === "number" &&
    typeof objB === "number" &&
    !Number.isNaN(objA)
  ) {
    return objA === objB;
  }
  if (
    typeof objA === "number" &&
    typeof objB === "number" &&
    Number.isNaN(objA) === Number.isNaN(objB)
  ) {
    return true;
  }
  if (typeof objA === "object" && typeof objB === "object") {
    if (JSON.stringify(objA) === JSON.stringify(objB)) {
      return true;
    } else {
      for (var i in objA) {
        if (!(i in objB) || !isDeepEqual(objA[i], objB[i])) {
          return false;
        }
      }
    }
    for (var i in objA) {
      if (objA.hasOwnProperty(i) !== objB.hasOwnProperty(i)) {
        return false;
      }
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

function magicProperty() {
  var count;
  return {
    set x(value) {
      count = value;
      return console.log(new Date() + " -- " + value);
    },
    get x() {
      count++;
      return count;
    }
  };
}

var o = magicProperty();
o.x = 5;
console.log(o.x);
console.log(o.x);
console.log(o.x);

/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */

function UserBot() {
  return {
    askName: function() {
      this.name = prompt("Введите имя");
      return this;
    },
    askAge: function() {
      this.age = prompt("Введите возраст");
      return this;
    },
    showAgeInConsole: function() {
      console.log("Ваш возраст: " + this.age);
      return this;
    },
    showNameInAlert: function() {
      alert("Вас зовут " + this.name);
      return this;
    },
  };
}

var us = new UserBot();

us
  .askName()
  .askAge()
  .showAgeInConsole()
  .showNameInAlert();

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */

function calculate(operation) {
  switch (operation) {
    case "+":
      return function(a) {
        return function(b) {
          return a + b;
        };
      };
    case "-":
      return function(a) {
        return function(b) {
          return a - b;
        };
      };
    case "*":
      return function(a) {
        return function(b) {
          return a * b;
        };
      };
    case "/":
      return function(a) {
        return function(b) {
          return a / b;
        };
      };
  }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
var Singleton = new function() {
  var instance;
  function Singleton() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  return Singleton;
}();

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
function sum(a) {
  var currentSum;
  if (a === undefined) {
    a = 0;
  }
  currentSum = +a;
  function sumFunc(b) {
    if (b === undefined) {
      b = 0;
    }
    return sum(currentSum + b);
  }
  sumFunc.valueOf = function() {
    return currentSum;
  };
  return sumFunc;
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
  var arr = [],
    counter = func.length;
  return function fn() {
    if (arguments.length > 1) {
      for (var n = 0; n < arguments.length; n++) {
        arr = arr.concat(arguments[n]);
      }
    } else {
      arr.push(arguments[0]);
    }
    if (counter == arr.length) {
      return func.apply(null, arr);
    } else {
      return fn;
    }
  };
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
function User() {}
function PreUser() {}
PreUser.prototype = Object.create(Array.prototype);
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

/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el) {}

/* создать функцию, которая не может работать как конструктор (работать с `new`, и покрыть ее тестами
NotContructor

 */
function NotContructor() {
  if (this instanceof NotContructor) {
    throw new TypeError('"NotContructor" is not a constructor.');
  }
}
/*
    Написать реализацию метода `.myCall`, который будет работать аналогично системному `.call` и
покрыть реализацию тестами
*/

Function.prototype.myCall = function(context, arg) {
    this.context = context;
    return function () {
        
    };
};

/*
    Написать реализацию функций [debounce](http://underscorejs.ru/#debounce) и [throttle]
(http://underscorejs.ru/#throttle) и покрыть реализации тестами ( Если ваше имя начинается
 с гласной - `debounce`, иначе - `throttle`. А лучше - обе ). Функции должны с сигнатурой
 `debounce(fun, delay)` / `throttle(fun, delay)`

 */

function throttle(fun, delay) {
    var throttled = false,
        args,
        context;
    function wrapper() {
        if (throttled) {
            args = arguments;
            context = this;
            return;
        }
        fun.apply(this, arguments);
        throttled = true;
        setTimeout(function() {
            throttled = false;
            if (args) {
                fun.apply(context, args);
                context = args = null;
            }
        }, delay);
    }
    return wrapper;
}

/*
К генератору листаемого календаря добавить функционал: под календарем добавить блок.
 При клике на ячейку даты ( но не на пустую ячейку календаря ) в блоке должна добавляться запись о том,
  по какой ячейке кликнули. Можно добавить запрос описания даты от пользователя
   ( с помощью функции `prompt` и выводить это описание там же). История дат и список,
   по которым пользоатель кликал, должны сохраняться между перезагрузками страницы.
   Для сохранения использовать [LocalStorage]
   (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
   Интерфейс работы с данными (чтение/запись) лучше сделать асинхронным
 */
// calendar.js
/*
Создать синхронную функцию `sleep(seconds)` так, чтобы работал код

```javascript
console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
sleep(9);
console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)
```
 */

function sleep(seconds) {
    var time = new Date().getSeconds() + seconds,
        newTime = 0;
    while (time > newTime) {
        newTime = new Date().getSeconds();
    };
}

/*
Написать функцию `getCounter` и покрыть ее тестами, так, чтобы работал следующий код

```javascript
var c = getCounter(5);
c
  .log() // 5
  .add(4)
  .log() // 9
  .add(3)
  .log() // 12
  .reset()
  .log() // 0
  .add(8)
  .log(); // 8
```
 */

var getCounter = function(arr) {
    var counter = 0;
    if (arr != 'undefined') {
        counter = arr;
    };
    return {
        log: function() {
            console.log(counter);
            return this;
        },
        add: function(a) {
            counter += a;
            return this;
        },
        reset: function() {
            counter =0;
            return this;
        },
    };
};
