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

	if ( typeof(objA) !== typeof(objB) ) {
		return false;
	}

	if ( typeof(objA) === null || typeof(objB) !== 'object' ) {
     if ( objA === objA && objB === objB ) {
         return objA === objB;
     } else {
     		 return true;
     }
  }

	if ( typeof(objB) === 'object' || typeof(objB) === 'function') {
					if (Object.keys(objA).length !== Object.keys(objB).length) {
					 	return false;
				 	} else {
  			 		for ( var key in objA) {
							if (!(objA[key] === objA && objB[key] === objB)) {
								if ( !isDeepEqual( objA[key], objB[key] ) ) {
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
		func.apply(context, arguments);
	};
}

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

var o = {
	magicProperty: function(x) {
		console.log(x);
	}
};

/**
* Создать конструктор с методами, так,
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
	function User() {
		this.name;
		this.age;
	}

	User.prototype.askName = function () {
		this.name = prompt('Введите имя','');
		return this;
	};

	User.prototype.askAge = function () {
		this.age = prompt('Введите возраст', '');
		return this;
	};

	User.prototype.showAgeInConsole = function () {
		console.log(this.age);
		return this;
	};

	User.prototype.showNameInAlert = function () {
		alert(this.name);
		return this;
	};

	var u = new User();
	u.askName().askAge().showAgeInConsole().showNameInAlert();


/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */

	function calculate(operator) {
		return function(arg1) {
			return function(arg2) {
				return eval(arg1 + operator + arg2);
			}
		}
	}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

	function getSingleton() {
		var instance;
		return function() {
			if (!instance) {
				instance = this;
			}
			return instance;
		};
	}

	var Singleton = new getSingleton();

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c) {
  if ( !(this instanceof ForceContructor) ) {
		return new ForceContructor(a, b, c);
	}
	this.a = a;
	this.b = b;
	this.c = c;
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

function sum(calc) {

	calc = calc || 0;

	function func(num) {
		num = num || 0;
		return sum(calc + num);
	}

	func.toString = function() {
		return calc;
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
function curry(func) {

}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать,
что объект является экземпляром двух классов
*/
/* Тут ваш код */

function PreUser() {}
PreUser.prototype = Object.create(Array.prototype);

function User() {}
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
	function getInfoFromForm(el) {

		var uform = document.forms.uform;
		var name = uform.name.value;
		var city = uform.city.value;
		var sex = uform.sex.value;
		var comments = uform.comments.value;

		el.innerHTML = "Имя: " + name + "<br> Город: " + city + "<br> Пол: " + sex + "<br> Коммент: " + comments;

		uform.reset();

	}

	function printData() {
		var el = document.getElementById('resultData');
		var btn = document.getElementById('btn');
		btn.addEventListener( 'click', getInfoFromForm.bind(null, el) );
	}
/*
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
function drawInteractiveCalendar(el) {}
