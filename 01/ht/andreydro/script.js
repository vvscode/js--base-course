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
    for (var a = 1; a <= 100; a++) {
        log(
            (!(a % 15) && 'FizzBuzz') ||
            (!(a % 5) && 'Buzz') ||
            (!(a % 3) && 'Fizz') ||
            a
        );
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
    for (var a = 0, s = textString.length - 1; a < s; a++, s--) {
        if (textString[a] != textString[s]) {
            return false;
        }
    }
    return true;
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
    var date = new Date(year, month - 1);

    function checkWeekDay(date) {
        var WeekDay = date.getDay();
        if (WeekDay == 0) {
            WeekDay = 7;
        }
        return WeekDay - 1;
    }
    var table = '<table style="border: 1px solid black;border-collapse:collapse"><tr style="border: 1px solid black;border-collapse:collapse;"><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr><tr>';
    for (var i = 0; i < checkWeekDay(date); i++) {
        table += '<td></td>';
    }
    while (date.getMonth() == month - 1) {
        table += '<td>' + date.getDate() + '</td>';
        if (checkWeekDay(date) % 7 == 6) {
            table += '</tr><tr>';
        }
        date.setDate(date.getDate() + 1);
    }
    if (checkWeekDay(date) != 0) {
        for (i = checkWeekDay(date); i < 7; i++) {
            table += '<td></td>';
        }
    }
    table += '</td></table>';
    htmlEl.innerHTML = '';
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
    } else if (discr === 0) {
        roots.push(-1 * b / 2 * a);
    } else {
        roots.push((-1 * b + Math.sqrt(discr)) / 2 * a);
        roots.push((-1 * b - Math.sqrt(discr)) / 2 * a);
    }
    return roots;
}