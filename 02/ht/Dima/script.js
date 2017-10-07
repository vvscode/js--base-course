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
  this.askName = function () {
    var name = prompt('mane', '');
    this.name = name;
    return this;
  };
  this.askAge = function () {
    var age = prompt('age', '');
    this.age = age;
    return this;
  };
  this.showAgeInConsole = function () {
    console.log(this.age);
    return this;
  };
  this.showNameInAlert= function () {
    alert(this.name);
    return this;
  };
}

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
function Singleton () {
  if (Singleton.instance) {
    return Singleton.instance;
  }
  Singleton.instance = this;
}

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

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/

function PreUser () {}
function User () {}

PreUser.__proto__ = Array;
User.__proto__ = PreUser;

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

