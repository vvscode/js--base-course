/* eslint-disable require-jsdoc,no-array-constructor,valid-jsdoc,no-extend-native,prefer-rest-params,semi,space-before-function-paren */
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
    if (Array.isArray(objA) && Array.isArray(objB)) {
        return objA.toString() === objB.toString();
    } else if (typeof objA === 'object' && typeof objB === 'object') {
        if (objA.length !== objB.length) return false;
        else if (JSON.stringify(objA) === JSON.stringify(objB)) {
          return true;
        } else {
for (var key in objA) {
            if (!isDeepEqual(objA[key], objB[key])) return false;
}
            return JSON.stringify(objA) === JSON.stringify(objB);
        }
    } else if (typeof objA === 'number' && typeof objB === 'number' && Number.isNaN(objA) === Number.isNaN(objB)) {
        return true;
    } else {
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

let o = {
  set x(value) {
    count = value;
    return console.log(new Date() + ' -- ' + value);
  },
  get x() {
    count++;
    return count;
  },
};
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

let us = {
    askName: function() {
        this.name = prompt('Введите имя');
        return this;
    },
    askAge: function() {
        this.age = prompt('Введите возраст');
        return this;
    },
    showAgeInConsole: function() {
        console.log('Ваш возраст: ' + this.age);
        return this;
    },
    showNameInAlert: function() {
        alert('Вас зовут ' + this.name);
        return this;
    },
};
us.askName().askAge().showAgeInConsole().showNameInAlert();

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */

function calculate(operation) {
  var solution = 0;
    switch (operation) {
      case '+':
        return function(a) {
          return function(b) {
              solution = a + b;
              return solution;
          };
        };
    case '-':
        return function(a) {
            return function(b) {
                solution = a - b;
                return solution;
            };
        };
    case '*':
        return function(a) {
            return function(b) {
                solution = a * b;
                return solution;
            };
        };
    case '/':
        return function(a) {
            return function(b) {
                solution = a / b;
                return solution;
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
};

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
    currentSum =+ a;
    function sumFunc(b) {
        if (b === undefined) {
            b = 0;
            }
        currentSum += b;
        return sumFunc;
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
var curry = function (func) {
    var addFunc = function (arg) {
        return curry(parseInt(arg + '', 10) == arg ? func + arg : func);
    };
    addFunc.valueOf = function () {
        return func;
    };
    return addFunc();
};
function target1(a, b, c, d) {
 return a + b + c + d;
}
function target2(a, b) {
 return a + b
}
curry(target1)(1)(2)(3)(4)
/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
function User() {}
function PreUser() {}
User.prototype = Object.create(Array.prototype);
PreUser.prototype = Object.create(Array.prototype);
User.prototype = Object.create(PreUser.prototype);
let u = new User();

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


