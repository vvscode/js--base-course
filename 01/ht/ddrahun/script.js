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
    function GetDividersAndIsItDivided(dividend, ...dividers) {
        var dividersAndIsItDivided = {};
        for (let i of dividers) {
            dividersAndIsItDivided[i] = dividend % i == 0;
        }

        var allDividers = dividers.join('');
        var isDividedByAllDividers = Object.values(dividersAndIsItDivided).indexOf(false) === -1;
        dividersAndIsItDivided[allDividers] = isDividedByAllDividers;

        return dividersAndIsItDivided;
    }

    var printer = {
        3: function () {
            log(`Fizz`);
        },
        5: function () {
            log(`Buzz`)
        },
        35: function () {
            log(`FizzBuzz`)
        },
        "undefined": function (number) {
            log(number)
        },
    }

    for (var i = 1; i <= 100; i++) {
        var dividers = GetDividersAndIsItDivided(i, 3, 5);
        var indexOfDivider = Object.values(dividers).lastIndexOf(true);
        var divider = Object.keys(dividers)[indexOfDivider];
        printer[divider](i);
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
    var strArray = Array.from(textString.toLowerCase());
    var reversedArray = strArray.reverse();
    var reversedString = reversedArray.join('');
    return textString == reversedString;
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

    function GetLastDayOfMonth(year, month) {
        for (var i = 28; i <= 31; i++) {
            if (new Date(year, month, i).getMonth() > month)
                return i - 1;
        }
    }

    function GetCalendarTable(year, jsMonth, lastDateNumber) {
        var table = document.createElement('table');
        table.setAttribute("border", 1)
        var header = table.appendChild(document.createElement('tr'));
        for (var key in daysOfWeek) {
            var th = document.createElement('th');
            th.textContent = daysOfWeek[key];
            header.appendChild(th);
        }
        var rowsNumber = GetNumberOfRows(year, jsMonth, lastDateNumber)
        for (var i = 0; i < rowsNumber; i++) {
            table.appendChild(document.createElement('tr'));
        }
        return table;
    }

    function GetNumberOfRows(year, jsMonth, lastDateNumber) {
        var firstDayOfWeek = new Date(year, jsMonth, 1)
        var positionInWeek = firstDayOfWeek.getDay();
        var allCells = lastDateNumber + positionInWeek;
        var allRows = allCells / 7;
        return (allCells % 7 > 0) ? allRows + 1 : allRows;
    }

    function AddTd(row, text) {
        var td = document.createElement('td');
        td.innerHTML = text;
        row.appendChild(td);
    }

    var daysOfWeek = {
        0: "ВС",
        1: "ПН",
        2: "ВТ",
        3: "СР",
        4: "ЧТ",
        5: "ПТ",
        6: "СБ"
    }
    var jsMonth = month - 1;
    var lastDayNumber = GetLastDayOfMonth(year, jsMonth);
    var table = GetCalendarTable(year, jsMonth, lastDayNumber);
    var rowsNumber = table.getElementsByTagName('tr').length;
    var firstDayOfWeek = new Date(year, jsMonth, 1).getDay();

    for (var i = 1, day = 1; i < rowsNumber; i++) {
        var row = table.children[i];

        for (var cell = 0; cell < Object.keys(daysOfWeek).length; cell++) {
            if (day > lastDayNumber) break;
            if (cell < firstDayOfWeek && day == 1) {
                AddTd(row, "");
            }
            else {
                AddTd(row, day);
                day++;
            }
        }
    }
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

    function AreObjects(objA, objB) {
        return typeof (objA) == 'object' && typeof (objB) == 'object' && !Array.isArray(objA) && !Array.isArray(objB);
    }

    function AreArrays(objA, objB) {
        return Array.isArray(objA) && Array.isArray(objB);
    }

    function AreObjectsEqual(objA, objB) {
        if (Object.keys(objA).length !== Object.keys(objB).length)
            return false;
        for (var key in objA) {
            if (key in objB) {
                if (AreObjects(objA[key], objB[key]) || AreArrays(objA[key], objB[key])) {
                    AreObjectsEqual(objA[key], objB[key]);
                }
                else {
                    if (objA[key] == objB[key])
                        continue;
                    else return false;
                }
            }
            else {
                return false;
            }
        }
        return true;
    }

    return (!AreArrays(objA, objB) && !AreObjects(objA, objB)) ? objA == objB : AreObjectsEqual(objA, objB);
}
