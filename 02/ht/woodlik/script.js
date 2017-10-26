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
  if (objB !== objB && objA !== objA) return true;
  if (typeof (objA) !== typeof (objB)) return false;
  if (typeof (objA) !== 'object') return objA === objB;
  if (Array.isArray(objA) != Array.isArray(objB)) return false;
  if (Object.keys(objA).length !== Object.keys(objB).length) return false;

  for (var key in objA) {
    if (objA == objA[key] && objB == objB[key]) break;
    if (!isDeepEqual(objA[key], objB[key])) return false;
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
    arguments = Object.create(arguments);
    return func.apply(context, arguments);
  }
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function (context) {
  return bind(this, context);
}

/**
 * Создать объект o так, чтобы каждый раз когда в коде написано 
 * o.magicProperty = 3 // (любое значение) 
 * в консоль выводилось значение, которое присваивается и текущее время
 */
var o = {
  magicProperty: function (value) {
    return (value + ': ' + new Date());
  }
};
console.log(o.magicProperty(4));

/**
 * Создать конструктор с методами, так, 
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */
function PersonInfo(name, age) {
  this.name = name;
  this.age = age;
}

PersonInfo.prototype.askName = function () {
  return this.name = prompt('Name?', '');
}
PersonInfo.prototype.askAge = function () {
  return this.age = prompt('Age', '');
}
PersonInfo.prototype.showAgeInConsole = function () {
  return console.log(this.age);
}
PersonInfo.prototype.showNameInAlert = function () {
  return alert(this.name);
}
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(calc) {
  /* put your code here */
  switch (calc) {
    case '+':
      {
        return function (num1) {
          return function (num2) {
            return num1 + num2;
          }
        }
      }
      break;

    case '-':
      {
        return function (num1) {
          return function (num2) {
            return num1 - num2;
          }
        }
      }
      break;

    case '*':
      {
        return function (num1) {
          return function (num2) {
            return num1 * num2;
          }
        }
      }
      break;

    case '/':
      {
        return function (num1) {
          return function (num2) {
            return num1 / num2;
          }
        }
      }
      break;
  }
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
  var instance;
  if (Singleton.instance) {
    return Singleton.instance;
  } else {
    this.instance = {};
  }
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
function sum(num1) {
  if (arguments.length === 0) {
    var res = 0;
  } else {
    res = arguments[0];
  }

  function calcSum(num2) {
    if (typeof num2 === 'undefined') {
      num2 = 0;
      res += num2;

    }
    return sum(res + num2);
  };
  calcSum.valueOf = function () {
    return res;
  };
  return calcSum;
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
  var args = [];
  return function fun(a) {
    args.push(a);
    if (args.length == func.length) {
      return func.apply(null, args);

    }
    return fun.bind(null);
  };
}



/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
var PreUser = function () {};
PreUser.prototype = Object.create(Array.prototype);
var User = function () {};
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
var submitButton = document.getElementById('submit');
submitButton.addEventListener('click', postInfoAndResetForm);

function postInfoAndResetForm() {
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = null;
  var name = document.getElementById('name').value;
  var city = document.getElementById('city').value;
  var comment = document.getElementById('comment').value;
  if (document.getElementById('male').checked) {
    var gender = 'Мужской';
  } else gender = 'Женский';
  var outputHTML = 'Имя:' + name + ';' + '<br>Родина: ' + city + ';' + '<br>Ваш комментарий: ' + comment + '<br>Пол: ' + gender;
  outputDiv.insertAdjacentHTML('afterBegin', outputHTML);
  var newDiv = document.createElement(outputDiv);
  document.getElementById('form').reset();
};
/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el) {}