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
    if (objB !== objB && objA !== objA){ 
        return true; 
    } 
    if (typeof (objA) !== typeof (objB)){ 
        return false; 
    } 
    if (typeof (objA) !== 'object') { 
        return objA === objB; 
    } 
    if (Array.isArray(objA) != Array.isArray(objB)) { 
        return false; 
    } 
    if (Object.keys(objA).length !== Object.keys(objB).length) { 
        return false; 
    } 
    for (var key in objA) { 
        if (objA == objA[key] && objB == objB[key]) { 
            break; 
        } 
        if (!isDeepEqual(objA[key], objB[key])) { 
            return false; 
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
       return func.apply(context,arguments);
    };
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.__proto__.myBind = function(context){
    return bind(this,context);

}

/**
* Создать объект o так, чтобы каждый раз когда в коде написано 
* o.magicProperty = 3 // (любое значение) 
* в консоль выводилось значение, которое присваивается и текущее время
*/
function createMagic() {
	var o = new createMagic();
}
createMagic.prototype.magicProperty(val) {
	 console.log(val);
}
 createMagic();

/**
* Создать конструктор с методами, так, 
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function peopleAsk(){
    this.a;
    this.b;
}
peopleAsk.__proto__.askName = function(){
    this.a = prompt('Как зовут?', 'Михаил');
    return this; 
}

peopleAsk.__proto__.askAge= function(){
    this.b = prompt('Сколько лет?', '19');
    return this; 
},
    peopleAsk.__proto__.showAgeInConsole= function(){
    console.log(this.a);
    return this; 
},
    peopleAsk.__proto__.showNameInAlert= function(){
    alert(this.b);
    return this; 

}



/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate() {
    var signs = arguments;
    return function(numFirst) {
        return function(numSecond) {
            switch(signs[0]) {
                case '*' :
                    return numFirst*numSecond;
                case '+' :
                    return numFirst+numSecond;
                case '-' :
                    return numFirst-numSecond;
                case '/' :
                    return numFirst/numSecond;

            }
        }
    }

}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */

function Singleton() {
    if(Singleton.obj) {
        return Singleton.obj;
    }
    return Singleton.obj = this;
}

/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */

function ForceContructor(a, b, c) {
    if(this instanceof ForceContructor) {
        this.a=a;
        this.b=b;
        this.c=c;
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



function sum(a) {
    var currentSum = a || 0;
    function f(b) {
        return sum(currentSum + (b || 0));
    }
    f.valueOf = function () {
        return currentSum;
    };
    return f;
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
/* Тут ваш код */
// User === PreUser; // false
// u instanceof User; // true
// u instanceof Array; // true
// u instanceof PreUser; // true
function User(){};
function PreUser(){};
PreUser.prototype =Object.create(Array.prototype);
User.prototype =Object.create(PreUser.prototype);


var u = new User();

/*

Создать веб страницу. Добавить на нее форму с полями 
- имя (строкое поле), 
- родной город (Выпадающий список), 
- Комментарий (многострочное поле), пол (radiobutton). 
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, 
после чего поля очистить.
*/
document.getElementById("assemble").onclick = function(e) {
    var name = document.getElementById('name').value,
        city = document.getElementById('city').value,
        comment = document.getElementById('comment').value,
        radio = document.querySelector('input[type=radio]:checked').value;

    document.getElementById('output').innerHTML = name+' '+city+' '+comment+' '+radio;

    document.getElementById('name').value='';
    document.getElementById('comment').value='';

}




/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/

//  - Создать синхронную функцию `sleep(seconds)` так, чтобы работал код
// 
//  console.log(new Date()); // Sun Oct 08 2017 10:44:34 GMT+0300 (+03)
//  sleep(9);
//  console.log(new Date()); // Sun Oct 08 2017 10:44:43 GMT+0300 (+03)

function sleep(seconds) {
    var start = Date.now(),
        end = Date.now() + seconds * 1000;
    while (Date.now() < end) {
        //работает этот код!
    };
}






function debounce(f,ms) {
    var timer = null;

    return function(...args) {

        function complite(){
            f.apply(this,args);
            timer= null;
        }
        if(timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(complite,ms);
    }
}



function throttle(f,ms) {
    var isThrottled = false,
        savedArgs,
        savedThis; 
    function wrap(...arg) {
        if(isThrottled) {
            savedArgs = arg;
            savedThis = this;
            return;  
        }  

        f.apply(this,arg);  
        isThrottled = true;
        
        setTimeout(function(){
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }

        },ms);


    } 
    return wrap;
}













