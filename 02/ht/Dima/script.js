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
  if (typeof objA === 'object' && typeof objB === 'object') {
    if (objA === null || objB === null) {
      return objA === objB;
    }

    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }

    for (var key in objA) {

      if (objB.hasOwnProperty(key) && ((objA[key] === objB[key]) || (objA[key] === objB && objB[key] === objA) || (objA[key] === objA && objB[key] === objB) || isDeepEqual(objA[key], objB[key]))) {
        continue;
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
var obj = {
  x: null,
  set magickProperty (val) {
    this.x = val;
    console.log(this.x + ' ' + (new Date()).toLocaleTimeString());
  }
};

/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function User (name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.askName = function() {
  this.name = prompt('name', '');
  return this;
}

User.prototype.askAge = function () {
  this.age = prompt('age', '');
  return this;
};

User.prototype.showAgeInConsole = function () {
  console.log(this.age);
  return this;
};

User.prototype.showNameInAlert= function () {
  alert(this.name);
  return this;
};
 
var u = new User();
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(operand) {
  if (operand === '+') {
    return function (a) {
      return function (b) {
        return a + b;
      };
    };
  }
  if (operand === '-') {
    return function (a) {
      return function (b) {
        return a - b;
      };
    };
  }
  if (operand === '/') {
    return function (a) {
      return function (b) {
        return a / b;
      };
    };
  }
  if (operand === '*') {
    return function (a) {
      return function (b) {
        return a * b;
      };
    };
  }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = (function() {
  var instance;

  function Singleton() {
    if ( !instance )
    instance = this;
    else return instance;
  }
  
  return Singleton;
  })()
/*
function Singleton () {
  if (Singleton.instance) {
    return Singleton.instance;
  }
  Singleton.instance = this;
}
*/
/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c) {
  if ( this instanceof ForceContructor ) {
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
function sum(number) {

  var total = number || 0;
  
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
/*
var curry = function (target) {
  var argumentNumber = target.length;
  if (argumentNumber === 2) {
    return function (a) {
      return function (b) {
        return target(a, b);
      };
    };
  } else if (argumentNumber === 3) {
    return function (a) {
      return function (b) {
        return function (c) {
          return target(a, b, c);
        };
      };
    };
  } else if (argumentNumber === 4) {
    return function (a) {
      return function (b) {
        return function (c) {
          return function (d) {
            return target(a, b, c, d);
          };          
        };
      };
    };
  }
};
*/

function curry(func) {

  var argsNumber = func.length;
  var args = [];

  return function f(x) {
    args.push(x);
    argsNumber--;
    if (!argsNumber) {
      return func.apply(null, args);
    }

    return f.bind(null);

  };
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/

function PreUser () {}
function User () {}

User.__proto__ = PreUser.__proto__ = Array;

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

  //файлы myForm.html и myScript.js
  
}

/*
- Написать реализацию функций [debounce](http://underscorejs.ru/#debounce) 
и [throttle](http://underscorejs.ru/#throttle)  и покрыть реализации тестами 
( Если ваше имя начинается с гласной  - `debounce`, иначе - `throttle`. А лучше - обе ). 
Функции должны с сигнатурой `debounce(fun, delay)` / `throttle(fun, delay)`
- К генератору листаемого календаря добавить функционал: под календарем добавить блок. 
При клике на ячейку даты ( но не на пустую ячейку календаря ) в блоке должна добавляться 
запись о том, по какой ячейке кликнули. Можно добавить запрос описания даты от пользователя 
( с помощью функции `prompt` и выводить это описание там же). История дат и список, 
по которым пользоатель клика, должны сохраняться между перезагрузками страницы. 
Для сохранения использовать 
[LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). 
Интерфейс работы с данными (чтение/запись) лучше сделать асинхронным
- Создать синхронную функцию `sleep(seconds)` так, чтобы работал код
```javascript
console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
sleep(9);
console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)
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

function throttle(fun, delay) {

  var isTrottle;
  
	return function() {
    if (isTrottle) {
      return;
    }

    var args = Array.prototype.slice.call(arguments, 0);

    fun.apply(this, args);

    isTrottle = true;

    setTimeout(function() {
      isTrottle = false;
    }, delay);
	};
}


function sleep(seconds) {

  var start = performance.now();

  while (performance.now() <= start + seconds*1000);
  
}