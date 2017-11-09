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
  if (typeof (objA) != "object") {
    if (objA === objB) {
      return true;
    }
    else
      if (typeof (objA) === "number" && typeof (objB) === "number") {
        return isNaN(objA) && isNaN(objB);
      }
      else {
        return false;
      }
  }
  else {
    if (objA.length != objB.length) {
      return false;
    }
    else {
      for (var key in objA) {
        if (!(objA[key] === objA && objB[key] === objB)) {
          if (!isDeepEqual(objA[key], objB[key])) {
            return false;
          }
        }
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
  return function () {
    return func.apply(context, arguments);
  };
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function (context) {
  return bind(this, context);
};

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
function O() {
  magicProperty = 0;
  Object.defineProperty(this, "magicProperty", {
    set: function (value) {
      magicProperty = value;
      alert(value + "  " + new Date().toLocaleTimeString());
    },
    get: function () {
      return this.magicProperty;
    }
  });
}

/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
AgeNameAsker.prototype.askName = function () {
  this.name = prompt("What is your name", "Vitek");
  return this;
};
AgeNameAsker.prototype.askAge = function () {
  this.age = prompt("What is your age", "12");
  return this;
};
AgeNameAsker.prototype.showAgeInConsole = function () {
  alert("age: " + this.age);
  return this;
};
AgeNameAsker.prototype.showNameInAlert = function () {
  alert("name: " + this.name);
  return this;
};

function AgeNameAsker() {
  var name;
  var age;
}

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(opr) {
  return function (b) {
    return function (a) {
      switch (opr) {
        case '+':
          {
            return a + b;
          }
          break;
        case '*':
          {
            return a * b;
          }
          break;
        case '-':
          {
            return b - a;
          }
          break;
        case '/':
          {
            return b / a;
          }
          break;
      }
    }
  }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

var Singleton = (function () {
  var instance;
  return function () {
    if (instance) {
      return instance;
    }
    instance = this;
  }
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
    return this;
  }
  else {
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
function sum(m) {
  var sumNow = m || 0;

  function func(n) {
    return sum(sumNow + (n || 0));
  }
  func.toString = function () {
    return sumNow;
  };
  return func;
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
  var count = func.length;
  var params = [];
  function retfunc(a) {
    params.push(a);
    if (params.length < count) {
      return retfunc;
    }
    else {
      return func.apply(null, params);
    }
  };
  return retfunc;
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
function User() { };
function PreUser() { };
PreUser.prototype = Object.create(Array.prototype);
User.prototype = Object.create(PreUser.prototype);
var u = new User();

/*
Создать веб страницу и календарь. См. jsdrawform.js
*/



