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
 /* Ваше решение */
    var array = ['', 'Fizz', 'Buzz', 'FizzBuzz'];
    for (var i = 1; i < 101; i++) {
        var index = !(i % 3 !== 0) * 1 + !(i % 5 !== 0) * 2;
        log(array[index] || i);
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
    inputString = textString.toLowerCase();
    reverseString = inputString.split('').reverse().join('');
 return inputString === reverseString;
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
    var monthStart = new Date(year, month - 1);
    var monthEnd = new Date(year, month, 0);
    var sunday = 7;
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    var table = '<table><caption>' + months[month - 1] +
    '</caption><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';

    function fixWeekStart(dayNumber) {
        if (dayNumber === 0) {
            dayNumber = sunday;
        }
        return dayNumber;
    }

    for (var i = 1; i < fixWeekStart(monthStart.getDay()); i++) {
         table += '<td></td>';
    }

    for (var i = 1; i <= monthEnd.getDate(); i++) {
        table += '<td>' + i + '</td>';
        if (fixWeekStart(monthStart.getDay()) == sunday) {
            table += '</tr><tr>';
        }
        monthStart.setDate(monthStart.getDate() + 1);
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
 /* Ваше решение */
 if (typeof(objA) !== typeof(objB)) return false;
 if (typeof(objA) !== 'object') return objA === objB;
 if (Array.isArray(objA) !== Array.isArray(objB)) return false;
 if (Object.keys(objA).length !== Object.keys(objB).length) return false;
 for (var key in objA) {
     if (!isDeepEqual(objA[key], objB[key])) return false;
 }
 return true;
}
