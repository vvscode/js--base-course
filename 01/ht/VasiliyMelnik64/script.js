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
    var arrayFizzBuzz = [];
    for(var i = 1; i <= 100; i++) {
        while(i % 3 != 0) {
            while(i % 5!= 0) {
                arrayFizzBuzz.push(i);
                break;
            }
            while(i % 5 == 0) {
                arrayFizzBuzz.push('Buzz');
                break;
            }
            break;
        }
        while(i % 3 == 0) {
            while(i % 5 == 0) {
                arrayFizzBuzz.push('FizzBuzz');
                break;
            }
            while(i % 5 != 0) {
                arrayFizzBuzz.push('Fizz');
                break;
            }
            break;
        }
    }
    arrayFizzBuzz.forEach(log);
}
/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
    var l = textString.length, i = 0;
    while (i < l) {
        while(textString[i] !== textString[l - 1 - i++]) return false;
    }
    return true;    
}
var isPalindrom = (str) => str == str.split('').reverse().join('');
/**
 * Реализовать фукнцию `drawCalendar` , 
 * которая принимает три аргумента - год, месяц, htmlElement 
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).  
 * @param {number} year 
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl 
 */
function drawCalendar (year, month, htmlEl) {
    
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
    function eqObj(objA, objB) {
        if (objA === objB) return true;
        if (Object.keys(objA).length !== Object.keys(objB).length) return false;
        for (var prop in objA) {
            if (!isDeepEqual(objA[prop], objB[prop])) return false;
        }
        return true;
    }
    if (objA == objB) return true;
    if (typeof objA !== typeof objB) return false;
    if (typeof objA === 'number' && typeof objB === 'number') {
        if (isNaN(objA) && isNaN(objB)) return true;
        return objA === objB;
    }
    if ((typeof objA === 'string' && typeof objB === 'string') ||
        (Array.isArray(objA) && Array.isArray(objB))) {
        if (objA.length !== objB.length) return false;
        for (var i = 0; i < objB.length; i++) if (objA[i] !== objB[i]) return false;
    }
    return eqObj(objA, objB);
    
}
