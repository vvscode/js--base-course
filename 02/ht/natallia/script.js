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
  if (typeof objA === typeof objB) {
    if (typeof objA === 'object' && typeof objB === 'object') {
      if (!(objA.length === objB.length)) {
        return false;
      } else {
        for (var key in objA) {
          if (objA[key] === objA || objB[key] === objB) return true;
          if (!isDeepEqual(objA[key], objB[key])) return false;
        }
        return true;
      }
    }

    if (objA !== objA && objB !== objB) return true;
    return objA === objB;
  }
}

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
  var arg = [].slice.call(arguments, 2);
  return function() {
    var allArg = [].slice.call(arguments);
    return func.apply(context, arg.concat(allArg));
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

/** создать объект с волшебным свойством, чтобы при присвоении ему значения, в консоль выводилась текущая дата и значение, которое присваиваем.
 *А при чтении всегда выводилось число на 1 больше предыдущего

 *```javascript
* o.x = 5; // 'Sat Mar 24 2018 13:48:47 GMT+0300 (+03) -- 5'
* console.log(o.x); // 6
* console.log(o.x); // 7
* console.log(o.x); // 8
* ```
 */

var o = {
  set x(value) {
    this.y = value;
    console.log(this.y + new Date());
    return this.y;
  },

  get x() {
    return ++this.y;
  }
};
o.x = 5;
console.log(o.x);
console.log(o.x);

/**
 * Создать конструктор с методами, так,
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */

function GetPersonInfo() {}

GetPersonInfo.prototype.askName = function() {
  this.name = prompt('Ваше имя?', '');
  return this;
};

GetPersonInfo.prototype.askAge = function() {
  this.age = prompt('Ваш возраст?', '');
  return this;
};

GetPersonInfo.prototype.showAgeInConsole = function() {
  console.log('Ваш возраст ' + this.age);
  return this;
};

GetPersonInfo.prototype.showNameInAlert = function() {
  alert('Ваше имя ' + this.name);
  return this;
};

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(calc) {
  switch (calc) {
    case '+':
      return function(num1) {
        return function(num2) {
          return num1 + num2;
        };
      };
      break;

    case '-':
      return function(num1) {
        return function(num2) {
          return num1 - num2;
        };
      };
      break;

    case '*':
      return function(num1) {
        return function(num2) {
          return num1 * num2;
        };
      };
      break;

    case '/':
      return function(num1) {
        return function(num2) {
          return num1 / num2;
        };
      };
      break;
  }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = (function() {
  var instance;
  function Singleton() {
    if (instance) {
      return instance;
    } else {
      return (instance = this);
    }
  }
  return Singleton;
})();

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
  if (arguments.length === 0) {
    var result = 0;
  } else {
    result = a;
  }

  function calcSum(b) {
    if (!b) {
      b = 0;
      result += b;
    }
    return sum(result + b);
  }
  calcSum.valueOf = function() {
    return result;
  };
  return calcSum;
}

function log(s) {
  console.log(+s);
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
  var len = func.length;

  return function f1() {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= len) {
      return func.apply(null, args);
    } else {
      return function f2() {
        var args2 = Array.prototype.slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2));
      };
    }
  };
}

/**
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true

var PreUser = function() {};
PreUser.prototype = Object.create(Array.prototype);

var User = function() {};
User.prototype = new PreUser();

var u = new User();

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

/** Создать синхронную функцию `sleep(seconds)`*/

// function sleep(sec) {
//   var date = new Date();
//   var date2;
//   do {
//     date2 = new Date();
//   } while (date2 - date < sec * 1000);
// }
// console.log(new Date());
// sleep(9);
// console.log(new Date());

/**создать функцию, которая не может работать как конструктор (работать с `new`, и покрыть ее тестами*/
function isConsructor() {
  if (new.target)
    throw new TypeError('function isConstructor is not a constructor');
}

/**написать функцию throttle*/

function throttle(func, delay) {
  var isThroggled;
  return function() {
    if (isThroggled) {
      return;
    }
    var args = Array.prototype.slice.call(arguments, 0);
    func.apply(this, args);
    isThroggled = true;
    setTimeout(function() {
      isThroggled = false;
    }, delay);
  };
}

/**Написать функцию `getCounter`*/
function getCounter(num) {
  var initNum = num;
  var result = num;
  return {
    log: function() {
      console.log(result);
      return this;
    },
    add: function(addNum) {
      result += addNum;
      return this;
    },
    reset: function() {
      result = initNum;
      return this;
    }
  };
}

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
