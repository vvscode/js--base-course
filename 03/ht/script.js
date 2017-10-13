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

    var aKeys = Object.keys(objA);

    for(var i = 0; i < aKeys.length; i++) {
        var propKey = aKeys[i];
        var propValA = objA[propKey];
        var propValB = objB[propKey];
        if (typeof propValA === 'object' && typeof propValB === 'object') {
            if (!isEqual(propValA, propValB)) {
                return false;
            }
        } else {
            if (propValA !== propValB) {
                return false;
            }
        }
    }

    var bKeys = Object.keys(objB);
    for(var u = 0; u < bKeys.length;u++) {
        var propKeyB = bKeys[u];
        var propValAb = objA[propKey];
        var propValBb = objB[propKey];
        if (typeof propValAb === 'object' && typeof propValBb === 'object') {
            if (!isEqual(propValAb, propValBb)) {
                return false;
            }
        } else {
            if (propValAb !== propValBb) {
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

function myBind(funct) {
        return function() {
            return func.apply(context, arguments);
        };
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

var date = new Date();

var o = {
  magicProperty: function alertTime(number) {
      console.log(number + date.getDay())
  }
};

 /* реализовать фукнцию  `isPolindrom`,
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {

       	if(textString == textString.split("").reverse().join("")) {
       			return true;
       		}
   	else {
        		return false;
       }
   }

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/

function getMagicProp(property) {
   	var o = {

      magicProperty: function() {
      	var val = property;

      		if(val === 3) {
      			return (val + " " +  new Date());
      		}
      }
   	};
   	console.log(o.magicProperty());
}
getMagicProp(3);

/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/



/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(firstVar, secondVar) {
    var values = firstVar && secondVar;
    var firstVar;
    var secondVar;
    var result;

    switch (values) {
    case '+':
        result = firstVar + secondVar;
        console.log(result);
        break;
    case '-':
        result = firstVar - secondVar;
        console.log(result);
        break;
    case '*':
        result = firstVar * secondVar;
        console.log(result);
        break;
    case '/':
        result = firstVar/secondVar;
        console.log(result);
        break;
    default:
        console.log( 'Я таких значений не знаю' );
    }

    return result;
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
  throw "undefined";
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
function sum() {
  throw "undefined";
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
function curry(func) {}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
/* Тут ваш код */
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


function drawCalendar(year, month, htmlEl) {

var date = new Date(year, month - 1);

function getDay(date) {
        var day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
    }

var table = '<table><tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr><tr>';

    for (var i = 0; i < getDay(date); i++) {
        table += '<td></td>';
    }

    while (date.getMonth() == month - 1) {

     table += '<td>' + date.getDate() + '</td>';

     if (getDay(date) % 7 == 6) {
         table += '</tr><tr>';
     }

    date.setDate(date.getDate() + 1);
    }

    if (getDay(date) != 0) {

    for (var a = getDay(date); a < 7; a++) {
        table += '<td></td>';
    }
    }

    table += '</tr></table>';

    htmlEl.innerHTML = table;

}