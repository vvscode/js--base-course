/* eslint-disable semi */
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
  /* Ваше решение */
    if (typeof objA !== typeof objB) return false;
    if (typeof objA !== 'object') {
        return (objA === objB)? true: (typeof objA === 'number' && typeof objB === 'number')?isNaN(objA) && isNaN(objB):false;
} else {
        if (objA.length!==objB.length) return false;
        for (var key in objA) {
            if (typeof objA[key] !== 'object') {
                if (!isDeepEqual(objA[key], objB[key])) return false;
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
Function.prototype.myBind=function(context) {
  return bind(this, context);
};
/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
var o={
    set magickProperty(value) {
        var date=new Date();
        console.log(value+' '+date.getTime());
    },
};
o.magickProperty=3;
/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*///
function User(name, age) {}
User.prototype.askName=function() {
    this.name=prompt('Ваше имя?', 'Алина');
    return this;
};
User.prototype.askAge=function() {
    this.age=prompt('Ваш возраст?', '19');
    return this;
};
User.prototype.showAgeInConsole=function() {
    console.log(this.age);
    return this;
};
User.prototype.showNameInAlert=function() {
    alert(this.name);
    return this;
};
// var u=new User();
// u.askName().askAge().showAgeInConsole().showNameInAlert();
/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(sign) {
  /* put your code here */
  // можно было через case
  return function(a) {
      return function(b) {
          if (sign==='+') return a+b;
          if (sign==='*') return a*b;
          if (sign==='-') return a-b;
          if (sign==='/') return a/b;
      };
  };
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
var Singleton = (function() {
    var instance;

    return function constructSingleton() {
        if (instance) {
            return instance;
        }
        if (this && this.constructor === constructSingleton) {
            instance = this;
        } else {
            return new constructSingleton();
        }
    }
}());

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c) {
  if (this instanceof ForceContructor) {
      this.a=a;
      this.b=b;
      this.c=c;
      return this;
  } else return new ForceContructor(a, b, c);
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
    var s=a||0;

    function f(b) {
        return sum(s+(b||0));
    }
    f.valueOf=function() {
        return s;
    }
    return f;
}

function log(x) {
  console.log(+x);
}

/*
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
    var newargs=[];
    function newf(a) {
        newargs.push(a);
        if (newargs.length<func.length) return newf;
        else return func(...newargs);
    };
    return newf;
}
/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
function User() {};
function PreUser() {};
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
// смотреть form.html
/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el) {}


// debounce

function debounce(f, ms) {
    var timer = null;
    return function(...rest) {
        var onComplete = function() {
            f.apply(this, rest);
            timer = null;
        }
        if (timer) clearTimeout(timer);
        timer = setTimeout(onComplete, ms);
    };
}
