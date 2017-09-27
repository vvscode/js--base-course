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
    var divided3 = 'Fizz';
    var divided5 = 'Buzz';
    var result;

    for (var i = 1; i <= 100; i++) {
        result = (!(i % 3) && !(i % 5) && (divided3 + divided5))
            || (!(i % 3) && divided3)
            || (!(i % 5) && divided5)
            || i;

        log(result);
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
    var reversedText = textString.split('').reverse().join('');
    
    return textString === reversedText;
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
    htmlEl.innerHTML = '';
    var calendar = getCalendar(year, month - 1);
    var LAST_DAY_WEEK = 7;
    calendar[0] = [undefined, 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    var tbl = document.createElement('table');
    var tbdy = document.createElement('tbody');
    for (var week = 0; week < calendar.length; week++) {
        var tr = document.createElement('tr');
        for (var day = 1; day <= LAST_DAY_WEEK; day++) {
            var td = document.createElement('td');
            var tdValue = !!calendar[week][day] ? calendar[week][day] : ''; 
            td.appendChild(document.createTextNode(tdValue))
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    htmlEl.appendChild(tbl);
}

/**
 * Фукнцию `getCalendar`, 
 * которая принимает два аргумента - год, месяц, 
 * и возвращает массив calendar[week][day].  
 * @param {number} year 
 * @param {number} month - номер месяца, начиная с 0
 * @return {array} calendar[week][day] - массив, где первый индекс номер недели начиная с 1, 
 * второй - номер дня недели начиная с 1
 */
function getCalendar(year, month) {
    var date = new Date(year, month);
    var LAST_DAY_WEEK = 7;
    var calendar = [];
    var week = 1;

    calendar[week] = [];
    while (date.getMonth() === month) {
        if (!(date.getDay() % LAST_DAY_WEEK)) {
            calendar[week++][LAST_DAY_WEEK] = date.getDate();
            calendar[week] = [];
        }
        else {
            calendar[week][date.getDay()] = date.getDate();
        }
        date.setDate(date.getDate() + 1);
    }

    return calendar;
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
    if (typeof objA === 'object' && typeof objB === 'object') {

        if (Object.keys(objA).length !== Object.keys(objB).length) {
            return false;
        }

        for (var key in objA) {
            if (!objB.hasOwnProperty(key) || !isDeepEqual(objA[key], objB[key])) {
                return false;
            }
        }

        return true;
    }

    return objA === objB;
}
