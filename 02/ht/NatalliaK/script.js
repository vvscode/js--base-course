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
	var arr = [];

	if (typeof objA !== typeof objB) return false;

	if (Object.keys(objA).length !== Object.keys(objB).length) return false;

	if (typeof(objA) === 'object' && typeof(objB) === 'object') {
		if(objA.length !== objB.length)	return false;

		for (var key in objA) {
			if (arr.indexOf(objA[key]) !== 1) return true;
			if (arr.indexOf(objA[key]) === -1) {
				arr.push(objA[key]);
			}
		}
		for (key in objB) {
			if (arr.indexOf(objB[key]) !== 1) return false; /* здесь все равно ерунда получается. Не проходят тесты строки 24 и 47 (проверка на разные массивы и объекты). Что-то я не уловила алгоритм проверки*/
		}
		return true;
	}

	if (!(objA !== objA) && !(objB !== objB)) {

		if ((typeof objA !== 'object' || typeof objB !== 'object') ||
			(Array.isArray(objA) !== Array.isArray(objB)))

			return objA === objB;
	}

	if (objA !== objA && objB !== objB) return true;
}

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
	return function() {
		arguments = Object.create(arguments);
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
}
/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/

function getMagicProp(prop) {
	var o = {

		magicProperty: function() {
			var value = prop;

			if(value === 3) {
				return (value + "; " +  new Date());
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

function showPersonInfo() {

	this.askName = function() {
		return this.name = prompt("Как твое имя?", "");
	};

	this.askAge = function() {
		return this.age = prompt("Напиши свой возраст", "");
	};

	this.showAgeInConsole = function() {
		console.log(this.age);
	};

	this.showNameInAlert = function() {
		alert(this.name);
	}
}

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(calc) {
	switch(calc) {
		case "+":
			return function(num1) {
				return function(num2) {
					return num1 + num2;
				}
			};
			break;

		case "-":
			return function(num1) {
				return function(num2) {
					return num1 - num2;
				}
			};
			break;

		case "*":
			return function(num1) {
				return function(num2) {
					return num1 * num2;
				}
			};
			break;

		case "/":
			return function(num1) {
				return function(num2) {
					return num1 / num2;
				}
			};
	}
}
/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
	if (Singleton.instance) {
		return Singleton.instance;
	} else this.obj = {};
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
		this.c = c;
		this.a = a;
		this.b = b;
	}
	else return new ForceContructor(a, b, c);
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
	if (arguments.length === 0) {
		var value = 0;
	} else value = arguments[0];

	var result = value;
	var len = arguments.length;

	function calcSum(b) {

		if (b || null) {
			result += b || 0;
			return calcSum;
		} else return result;
	}

	calcSum.toString = function() {
		var num = result;
		result = value;
		return num;
	};
	return calcSum;
	}


function log(x) {
  console.log(+x);
}

/* Здесь не проходит проверка на добавление 0 по умолчанию - стр 285 и на независимые сумматоры - стр 294*/

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

function curry(target) {
	var len = target.length;

	return function f1() {
		var args = Array.prototype.slice.call(arguments, 0);
		if (args.length >= len) {
			return target.apply(null, args);
		}
		else {
			return function f2() {
				var args2 = Array.prototype.slice.call(arguments, 0);
				return f1.apply(null, args.concat(args2));
			}
		}
	};
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/


var PreUser = function () {};
//PreUser.__proto__ = Array;

var User = function(){};
//User.__proto__ = PreUser();*/

/*Здесь не проходит тест на правильное дерево наследования - стр 327*/

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
function drawInteractiveCalendar(id) {

}