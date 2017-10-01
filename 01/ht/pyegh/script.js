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
    // initialization
    var delimeter = ',';
    var n = 100;
    var arr = [];
    var tempResult = '';
    for (i = 1; i < n + 1; i++) {
        arr[i - 1] = i;
    }

    // get all FizzBuzz
    for (i = 1; i < n + 1; i++) {
        arr[i - 1] = (i % 5 === 0 && i % 3 === 0) || arr[i - 1];
    }
    tempResult = arr.join(delimeter);
    arr = tempResult.replace(new RegExp('true', 'g'), "FizzBuzz").split(delimeter);

    // get all Fizz
    for (i = 1; i < n + 1; i++) {
        arr[i - 1] = (i % 5 !== 0 && i % 3 === 0) || arr[i - 1];
    }
    tempResult = arr.join(delimeter);
    arr = tempResult.replace(new RegExp('true', 'g'), "Fizz").split(delimeter);

    // get all Buzz
    for (i = 1; i < n + 1; i++) {
        arr[i - 1] = (i % 5 === 0 && i % 3 !== 0) || arr[i - 1];
    }
    tempResult = arr.join(delimeter);
    arr = tempResult.replace(new RegExp('true', 'g'), "Buzz").split(delimeter);

    // log
    for (i = 0; i < n; i++) {
        log(arr[i]);
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
    return textString === textString.split('').reverse().join('');
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
    month -= 1;
    var arr31days = [0, 2, 4, 6, 7, 9, 11];
    var arr30days = [3, 5, 8, 10];
    var februaryNumber = 1;
    var leapYearFebDays = 29;
    var usualYearFebDay = 28;
    var daysInWeek = 7;

    var daysInMonth;
    if (arr31days.indexOf(month) >= 0) {
        daysInMonth = 31;
    } else if (arr30days.indexOf(month) >= 0) {
        daysInMonth = 30;
    } else {
        var testDate = new Date(year, month, leapYearFebDays);
        // check if current year is leap-year
        daysInMonth = testDate.getMonth() === month ? leapYearFebDays : usualYearFebDay;
    }

    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var resultArr = [];

    // Count first day of week from the first day of month
    var dayOfWeek = new Date(year, month, 1).getDay();

    for (i = 0; i < daysInMonth; i++) {
        dayOfWeek = dayOfWeek % daysInWeek >= 0 ? dayOfWeek % daysInWeek : dayOfWeek;
        resultArr[i] = i + 1 + "(" + days[dayOfWeek] + ")";
        dayOfWeek++;
    }

    htmlEl.innerHTML = resultArr.join(' ');
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
    // 1.check for null
    if (objA === null || objB === null) {
        return (objA === null && objB === null);
    }

    if (typeof objA == 'string' || typeof objB == 'string') {
        return objA === objB;
    }

    if (typeof objA == 'number' || typeof objB == 'number') {
        return objA === objB;
    }

    // 2.check if objects has the same property number
    if (Object.keys(objA).length === Object.keys(objB).length) {
        for (key in objA) {
            var hasBTheSameWithAProperty = key in objB;
            if (!hasBTheSameWithAProperty) { // 3. check that object B has the same property with A object
                return false;
            }
            if (typeof objA[key] !== typeof objB[key]) { // 4.check that the same properties values have the same type
                return false;
            }
            if (typeof objA[key] === 'object') {
                if (!isDeepEqual(objA[key], objB[key])) { // 5. if properties are objects function calls itself check one more time
                    return false;
                }
            } else {
                if (objA[key] !== objB[key]) { // 6. check equality of properties (primitives check)
                    return false;
                }
            }
        }
    } else {
        return false;
    }
    return true;
}