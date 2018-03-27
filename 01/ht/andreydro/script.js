/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Функция вывода строк для работы в fizzBuzz
 * @param {*} a 
 */
function log(a) {
    console.log(a);
}

/* Раместите ваш код ниже */

/**
 * реализовать фукнцию `fizzBuzz` 
 * которая выводит числа от 1 до 100. 
 * Если число кратно 3 - вместо числа вывести `Fizz`. 
 * Если кратно 5 - вывести вместо числа `Buzz`. 
 * Если число кратно и 3 и 5 - вывести вместо числа `FizzBuzz`. 
 * Для вывода использовать фукнцию `log` (аналогично заданию в классе). 
 * В теле функции нельзя использовать  `if`, `switch`, тернарный оператор `? :`
 */

function fizzBuzz() {
    var array = [];
    for (var a = 1; a <= 100; a++) {
        while (a % 3 != 0) {
            while (a % 5 != 0) {
                array.push(a);
                break;
            }
            while (a % 5 == 0) {
                array.push('Buzz');
                break;
            }
            break;
        }
        while (a % 3 == 0) {
            while (a % 5 == 0) {
                array.push('FizzBuzz');
                break;
            }
            while (a % 5 != 0) {
                array.push('Fizz');
                break;
            }
            break;
        }
    }
    array.forEach(log);
}

/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
    if (textString[0] == textString[textString.length - 1]) {
        return true;
    } else if (textString === "") {
        return true;
    } else {
        return false;
    }
}

/**
 * Реализовать фукнцию `drawCalendar` , 
 * которая принимает три аргумента - год, месяц, htmlElement 
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).  
 * @param {number} year 
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl 
 */
function drawCalendar(year, month, htmlEl) {
    /* Ваше решение */
}

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
        for (var property in objA) {
            if (!isDeepEqual(objA[property], objB[property])) {
                return false;
            }
        }
        return true;
    }
    return equalObject(objA, objB);
}


function spiral(array) {
    if (array.length === 1) {
        return array[0];
    }
    var result = [];
    var counter = 0;
    var newArray = [];
    for (var i in array) {
        counter += array[i].length;
    }

    result = result.concat(array[0]);

    for (var i = 1; i <= array.length - 2; i++) {
        result = result.concat(array[i][array[i].length - 1]);
    }
    result = result.concat(array[array.length - 1].reverse());

    if (result.length === counter) {
        return result;
    }

    for (var i = array.length - 2; i > 0; i--) {
        result = result.concat(array[i][0]);
    }

    for (var i = 1; i < array.length - 1; i++) {
        newArray.push(array[i].slice(1, array[i].length - 1));
    }

    result = result.concat(spiral(newArray));
    return result;
}

function quadraticEquation(a, b, c) {
    var roots = [];
    var discr = b * b - 4 * a * c;
    if (discr < 0) {
        return roots;
    }
    if (discr === 0) {
        roots.push(-1 * b / 2 * a);
        return roots;
    } else {
        roots.push((-1 * b + Math.sqrt(discr)) / 2 * a);
        roots.push((-1 * b - Math.sqrt(discr)) / 2 * a);
    }
    return roots;
}