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
    if (objA == objB) {
        return true;
    }
    if (typeof objA !== typeof objB) {
        return false;
    }
    if (typeof objA === 'number' && typeof objB === 'number') {
        if (isNaN(objA) && isNaN(objB)) {
            return true;
        }
        return objA == objB;
    }

    if ((typeof objA === 'string' && typeof objB === 'string') || (Array.isArray(objA) && Array.isArray(objB))) {
        if (objA.length !== objB.length) {
            return false;
        }
        for (var i = 0; i < objB.length; i++) {
            if (objA[i] !== objB[i]) {
                return false;
            }
        }
    }

    function equalObject(objA, objB) {
        if (objA === objB) {
            return true;
        }
        if (Object.keys(objA).length !== Object.keys(objB).length) {
            return false;
        }
        for (var key in objA) {
            if (objA[key] === objA || objB[key] === objB) return true;
        }
        for (var property in objA) {
            if (!isDeepEqual(objA[property], objB[property])) {
                return false;
            }
        }
        return true;
    }
    return equalObject(objA, objB);
}

/**
 * Функция фиксации контекста
 * @param {*} func Функция для которой нужно зафиксировать контекст
 * @param {*} context значение для this
 * @return {function} функция с зафиксированным контекстом
 */
function bind(func, context) {
    return function() {
        return func.apply(context, arguments)
    };
}

/**
 * Реализовать метод .myBind для всех функций, 
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */

Function.prototype.myBind = function(someContext) {
    var thisIsSomeContext = this;
    return function() {
        return thisIsSomeContext.apply(someContext, arguments);
    }
}

/**
 * создать объект с волшебным свойством, 
 * чтобы при присвоении ему значения, в консоль выводилась текущая дата и значение, которое присваиваем. 
 * А при чтении всегда выводилось число на 1 больше предыдущего
 * o.magicProperty = 5; // 'Sat Mar 24 2018 13:48:47 GMT+0300 (+03) -- 5'
 * console.log(o.magicProperty); // 6
 * console.log(o.magicProperty); // 7
 * console.log(o.magicProperty); // 8
 */

var object = {};
Object.defineProperty(object, "magicalProp", {
    set: function(meaning) {
        this.value = meaning;
        console.log(new Date() + " " + "--" + meaning);
    },
    get: function() {
        return ++this.meaning;
    }
});

/**
 * Создать конструктор с методами, так, 
 * чтобы следующий код работал и делал соответствующие вещи
 * те запуск кода ниже должен делать то, что говорят методы
 * u.askName().askAge().showAgeInConsole().showNameInAlert();
 */

function ShowYourInfo() {};
ShowYourInfo.prototype.askName = function() {
    this.name = prompt("Please, tell me your name", "");
    return this;
};
ShowYourInfo.prototype.askAge = function() {
    this.age = prompt("Please, tell me how old are you?", "");
    return this;
};
ShowYourInfo.prototype.showAgeInConsole = function() {
    console.log(this.age);
    return this;
};
ShowYourInfo.prototype.showNameInAlert = function() {
    alert(this.name);
};
var letsAsk = new ShowYourInfo();

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate() {
    var methods = {
        "-": function(x, y) {
            return x - y;
        },
        "+": function(x, y) {
            return x + y;
        },
        "*": function(x, y) {
            return x * y;
        },
        "/": function(x, y) {
            return x / y;
        }
    };
    var options = arguments;
    return function(x) {
        return function(y) {
            return methods[options[0]](x, y);
        };
    };
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
var Singleton = (function() {
    var someObject = null;
    return function() {
        if (!someObject) {
            someObject = this;
        }
        return someObject;
    };
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
function sum(total) {
    if (!total) total = 0;

    function summarize(argument) {
        if (!argument) argument = 0;
        return sum(total + argument);
    };
    summarize.valueOf = function() {
        return total;
    };
    return summarize;
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
    var counter = func.length;
    var variables = [];
    return function rice(variable) {
        variables.push(variable);
        counter--;
        if (counter === 0) {
            return func.apply(null, variables);
        }
        return rice.bind(null);
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

function User() {};

function PreUser() {};
PreUser.prototype = Object.create(Array.prototype);
PreUser.prototype.constructor = Array;
User.prototype = Object.create(PreUser.prototype);
User.prototype.constructor = PreUser;

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