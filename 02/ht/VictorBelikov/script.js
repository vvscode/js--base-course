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
    if (isNaN(objA) && isNaN(objB) &&
        typeof objA === 'number' && typeof objB === 'number') {
        return true;
    }

    if (typeof objA === typeof objB) {
        if (typeof objA === 'object' && typeof objB === 'object') {

            if (!(objA.length === objB.length)) return false;

            for (var key in objA) {
                if (typeof objA[key] === 'object' && typeof objB[key] === 'object'
                    && objA[key] === objA && objB[key] === objB) {
                    return true;
                }
                if (!isDeepEqual(objA[key], objB[key])) { return false; }
            }
            return true;
        }
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
    return function () {
        return func.apply(context, arguments);
    };
}

/**
 * Реализовать метод .myBind для всех функций,
 * который работает так же как оригинальный .bind но не использует его внутри
 * (можно использовать фукнцию выше)
 */
Function.prototype.myBind = function (context, ...args) {
    const callContext = this;
    return function (...restArgs) {
        return callContext.apply(context, args.concat(restArgs));
    };
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
// Решение 1.
// function O() {
//     let _value = 0; // инкапсулирована

//     Object.defineProperty(this, 'magicProperty', {
//         get: () => {
//             return ++_value;
//         },

//         set: value => {
//             _value = value;
//             console.log(new Date());
//         }
//     });
// }
// let o = new O();

// Решение 2.
let o = {
    value: 0,

    get magicProperty() {
        return ++this.value;
    },

    set magicProperty(value) {
        this.value = value;
        console.log(new Date());
    }
};

/**
* Создать конструктор с методами, так,
* чтобы следующий код работал и делал соответствующие вещи
* те запуск кода ниже должен делать то, что говорят методы
* u.askName().askAge().showAgeInConsole().showNameInAlert();
*/
function Metrics() {
    this.name;
    this.age;
}

Metrics.prototype.askName = function () {
    this.name = prompt('Как Вас зовут?', '');
    return this;
};

Metrics.prototype.askAge = function () {
    while (true) {
        this.age = prompt('Сколько Вам лет?', '');
        if (!isNaN(parseFloat(this.age)) && isFinite(this.age)) {
            return this;
        }
    }
};

Metrics.prototype.showAgeInConsole = function () {
    console.log(this.age);
    return this;
};

Metrics.prototype.showNameInAlert = function () {
    alert(this.name);
};

let u = new Metrics();

/**
 * Написать фукнцию-калькулятор, которая работает следующим образом
 * calculate('+')(1)(2); // 3
 * calculate('*')(2)(3); // 6
 * Допустимые операции : + - * /
 */
function calculate(operator) {
    return function (a) {
        return function (b) {
            // switch (operator) {
            //     case '*':
            //         return a * b;
            //     case '+':
            //         return a + b;
            //     case '/':
            //         return a / b;
            //     case '-':
            //         return a - b;
            //     default:
            //         return 'incorrect operator';
            // }
            return eval(a + '' + operator + b);
        };
    };
}

/**
 * Создайте конструктор-синглтон? Что такое синглтон?
 * new Singleton() === new Singleton
 */
// Синглтон - pattern javascript. Подразумевает объект, который может иметь только один экземпляр.
const Singleton = (function () {
    let _instance; // в замыкании

    return function () {
        if (!_instance) {
            _instance = this;
        } else {
            return _instance;
        }
    };
}());


/**
  * Создайте функцию ForceConstructor
  * которая работает как конструктор независимо от того,
  * вызвана она с new или без
  * и сохраняет параметры в создаваемый объект с именами параметров
  */
function ForceContructor(a, b, c) {
    // Решение 1.
    // let obj = {};
    // obj.a = a;
    // obj.b = b;
    // obj.c = c;
    // obj.__proto__ = ForceContructor.prototype;
    // return obj;

    // Решение 2.
    if (this instanceof ForceContructor) { // если через new
        this.a = a;
        this.b = b;
        this.c = c;
    } else {
        return new ForceContructor(a, b, c); // recursion
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
    let result = a || 0;

    function summator(b) {
        // if (typeof b === 'undefined') { b = 0; }
        // result += b;
        // если возвр. сама себя, то сумматор зависимый, т.к. остается в одном контексте вызова
        // return summator;
        return sum(result + (b || 0));
    }

    summator.valueOf = function () {
        return result;
    };
    return summator;
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
// Решение 1.
// function curry(func, ...args) {
//     return function (...restArgs) {
//         const allArgs = args.concat(restArgs);
//         if (func.length <= allArgs.length) {
//             return func(...allArgs);
//         }
//         return curry(func, ...allArgs);
//     };
// }

// Решение 2.
function curry(func) {
    return function help(...args) {
        if (func.length > args.length) {
            return help.bind(null, ...args);
        }
        return func(...args);
    };
}

/*
Написать код, который для объекта созданного с помощью конструктора будет показывать,
что объект является экземпляром двух классов
*/
// Решение 1.
// class PreUser extends Array { }
// class User extends PreUser { }

// Решение 2.
function PreUser() { }
function User() { }

PreUser.prototype = [];
Object.defineProperty(PreUser.prototype, 'constructor', {
    enumerable: false, // не перечислять в for-in
    value: PreUser,
    writable: false
});

User.prototype = new PreUser();
Object.defineProperty(User.prototype, 'constructor', {
    enumerable: false, // не перечислять в for-in
    value: User,
    writable: false
});
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

// РЕШЕНИЕ НАХОДИТСЯ В ФАЙЛЕ SimpleForm.html


/*
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/

// РЕШЕНИЕ И ТЕСТЫ НАХОДЯТСЯ В ФАЙЛЕ interactiveCalendar.html


/**
 * создать функцию, которая не может работать как конструктор (работать с `new`), и покрыть ее тестами
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/new.target
 * */
function NotConstructor() {
    if (new.target) {
        throw new TypeError('Cannot be called with "new". Isn\'t a constructor.');
    }
}


/*
Написать функцию getCounter и покрыть ее тестами, так, чтобы работал следующий код
var c = getCounter(5);
c
  .log() // 5
  .add(4)
  .log() // 9
  .add(3)
  .log() // 12
  .reset()
  .log() // 0
  .add(8)
  .log(); // 8
*/
function getCounter(num) {
    return {
        log() {
            console.log(num);
            return this;
        },

        add(addNum) {
            num += addNum;
            return this;
        },

        reset() {
            num = 0;
            return this;
        }
    };
}
