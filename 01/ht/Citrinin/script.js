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
    for (var i = 1; i <= 100; i++) {
        i % 15 != 0 || log("FizzBuzz");
        i % 3 == 0 && i % 5 != 0 && log("Fizz");
        i % 5 == 0 && i % 3 != 0 && log("Buzz");
        i % 3 != 0 && i % 5 != 0 && log(i);
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
    return (textString.split("").reverse().join("") == textString);
}


/**
 * Реализовать фукнцию `drawCalendar` , 
 * которая принимает три аргумента - год, месяц, htmlElement 
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).  
 * @param {number} year 
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl 
 **/
function drawCalendar(year, month, htmlEl) {
    /* Ваше решение */

    var calendarContent = '<table border="1"><tr><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></td>';
    var beginDate = new Date(year, month - 1, 1);

    var diff = 1 - beginDate.getDay();
    if (diff == 1) {
        beginDate.setDate(-5);
    } else {
        beginDate.setDate(diff);
    }

    for (var w = 1; w <= 6; w++) {
        calendarContent += '<tr>';
        for (var d = 1; d <= 7; d++) {
            calendarContent += '<td>'
            calendarContent += beginDate.getMonth() == month - 1 ? beginDate.getDate() : '';
            calendarContent += '</td>'
            beginDate.setDate(beginDate.getDate() + 1);
        }
        calendarContent += '</tr>';
    }
    calendarContent += '</table>';
    htmlEl.innerHTML = calendarContent;
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
    if (typeof(objA) != "object") {
        return objA === objB;
    }
    if (objA.length !== objB.length) {
        return false;
    }
    for (var key in objA) {
        if (typeof(objA[key]) == "object") {
            if (!isDeepEqual(objA[key], objB[key])) {
                return false;
            } else {
                continue;
            }
        }
        if (objB[key] !== objA[key]) {
            return false;
        }
    }
    return true;
}