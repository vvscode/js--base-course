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
function isDeepEqual(objA, objB, arrayObjectProperties) {
  if (typeof objA === 'object' && typeof objB === 'object') {
    if (objA === null || objB === null) {
      return objA === objB;
    }

    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }

    arrayObjectProperties = arrayObjectProperties || [];

    arrayObjectProperties.push([objA, objB]);

    for (var key in objA) {
      if (objB.hasOwnProperty(key)) {
        var recursiveEqualLinks = arrayObjectProperties.some(function(el) {
          return (el[0] === objA[key] && el[1] === objB[key]) || (el[0] === objB[key] && el[1] === objA[key]);
        });

        if ((objA[key] === objB[key]) || recursiveEqualLinks || isDeepEqual(objA[key], objB[key], arrayObjectProperties)) {
          continue;
        }
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
	return function() { // (*)
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
* создать объект с волшебным свойством, 
* чтобы при присвоении ему значения, в консоль выводилась текущая дата и значение, которое присваиваем. 
* А при чтении всегда выводилось число на 1 больше предыдущего
* o.magicProperty = 5; // 'Sat Mar 24 2018 13:48:47 GMT+0300 (+03) -- 5'
* console.log(o.magicProperty); // 6
* console.log(o.magicProperty); // 7
* console.log(o.magicProperty); // 8
*/
var o = {
	counter: 0,
	get magicProperty(){
		return this.counter++;
	},
	set magicProperty (value){
		this.counter = value;
		var date = new Date();
    console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()+'--'+value);
  		},
	
};




/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function Person (){
		
	};

	Person.prototype.askName = function (){
		this.name = prompt('Введите ваше имя');
		return this; 
	}; 
	Person.prototype.askAge = function(){
		this.age = prompt('Введите ваш возраст');
		return this;
	};
	Person.prototype.showAgeInConsole = function(){
		console.log(this.age);
		return this;
	};
	Person.prototype.showNameInAlert = function(){
		alert (this.name);
	};

	var u = new Person();

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
 function calculate (operator){
		return function (a){
			return function (b){
				if (operator == '+'){ return a + b };
				if (operator == '*'){ return a * b };
				if (operator == '-'){ return a - b }; 
				if (operator == '/'){ return a / b };
			};
		};
	};

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
function Singleton() {
	if (Singleton.ins) {
		return Singleton.ins
	}
	Singleton.ins = this;
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
function sum (s){
      s = s || 0;

      function foo(q){
        
        return sum(s + (q||0));
      }; 
      foo.valueOf = function (){
        return s;
      };
      return foo;
   };
   var s = sum();

  function log(call) {
  console.log(+call);
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
function curry (fun) {
			var depth = arguments[0].length;
			var arr = [];
			function depthInDown (){
				arr.push(arguments[0]);
				 depth --;
				 return depth == 0;
			}
			function start (){
				return fun.apply(this, arr);
			}
			return function(a) {
				if (depthInDown(a)){return start()}
		 		return function (b){
		 			if (depthInDown(b)){return start()}
		 			return function (c){
		 				if (depthInDown(c)){return start()}
		 				return function (d){
		 					if (depthInDown(d)){return start()}
		 						return function (e){
		 							if (depthInDown(e)){return start()}
		 						};
		 					};
		 				};
		 	 		};
				};
			};
/*
Написать код, который для объекта созданного с помощью конструктора будет показывать, 
что объект является экземпляром двух классов
*/
function User (){
		};
function PreUser (){
		};
User.prototype = PreUser.prototype = Array.prototype;
var u = new PreUser();
// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true

/**
 * Написать фукнцию debounce(fun, delay)
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

/**
 * Написать фукнцию throttle(fun, delay)
 */
function throttle(fun, delay) {
	var state;
	return function() {
    if (state) {
      return;
    }
    var args = Array.prototype.slice.call(arguments, 0);
    fun.apply(this, args);
    state = true;
    setTimeout(function() {
       state = false;
    }, delay);
	};
}


/**
 * Написать фукнцию sleep(seconds)
 */
function sleep (time){
		var sec = new Date().getSeconds();
		if ((sec + time) > 60){
			sec = sec +time - 60; 
		}else{
			sec = sec + time;
		}
	
		while(sec != new Date().getSeconds()){

			}
		};

/*
/**
Написать myCall
**/
function mycall (obg, fun){
			if(!obg){obg = window}
			var p = 'prop';
			for (key in obg){
				if (key == p){
					p += '1';
				}
				
			}
			obg[p] = fun;
		return obg[p]();
	};
/*
/**
Написать  getCounter
**/	
function getCounter (x){
		var number = x;
		return {
			log: function (){
				console.log(number);
				return number;
			},
			add: function (e){
				number+=e;
				
			},
			reset: function (){
				number = 0;
				 
			}
		}
	};