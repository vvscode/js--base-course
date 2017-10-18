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
function fizzBuzz(a) {
    /* Ваше решение */
    for (var i = 1; i <= 100; i++) {
        a = i;

        (i % 3 === 0) && (a = 'Fizz');
        (i % 5 === 0) && (a = 'Buzz');
        ((i % 3 === 0) && (i % 5 === 0)) && (a = 'FizzBuzz');

        log(a);
    }
}


/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
    /* Ваше решение */
    var textStringReverse = textString.split("").reverse().join("");
    return (textString === textStringReverse)
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
    month = month - 1;

    var date = new Date(year, month);
    var day = date.getDay();

    var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

    for (var i = 0; i < day; i++) {
        table += '<td></td>';
    }

    while (date.getMonth() === month) {
        table += '<td>' + date.getDate() + '</td>';

        if (day % 7 === 6) {
            table += '</tr><tr>';
        }

        if (day === 0) {
            day = 7;
        } else {
            day = -1;
        }

        date.setDate(date.getDate() + 1);
    }

    if (day !== 0) {
        for (i = day; i < 7; i++) {
            table += '<td></td>';
        }
    }

    table += '</tr></table>';

    htmlEl.innerHTML = table;
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
    if (isNaN(objA) == "undefined" && isNaN(objB) == "undefined")
        return true;

    if (typeof (objA) == "object" && typeof (objB) == "object") {
        if (objA.length != objB.length)
            return false;
        for (key in objA)
            if (!isDeepEqual(objA[key], objB[key]))
                return false;
        return true;
    }

    return objA == objB;
}