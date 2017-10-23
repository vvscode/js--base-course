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
        log(((i % 5 === 0 && i % 3 === 0) && "FizzBuzz") || (i % 5 === 0 && "Buzz") || (i % 3 === 0 && "Fizz") || i);
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
    var textRevers = textString.split('').reverse().join('');
    return textString === textRevers;
    /*
    для очень длинных строк нашел такой алгоритм
    textString = textString.toLowerCase().replace(/[^a-zA-Zа-яА-Я]/g, ''); 
    var textStringLen = textString.length; 
    for (var i = 0, l = Math.ceil(textStringLen / 2); i <l; i += 1) { 
        if (textString.charAt(i) !== textString.charAt(textStringLen-(1+i))) { 
            return false;
        }
    }
    return true;
    */
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
    var firstDayOfMonth = new Date(year, month - 1);
    var lastDayOfMonth = new Date(year, month, 0);
    var numberOfSunday = 7;
    var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    var table = '<table><caption>'+monthNames[month-1]+'</caption><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';
    function changeDayNumberIfSunday(dayNumber)
    {
         // if Sunday then 0 will be transfer in changeDayNumberIfSunday function as a parameter
        if (dayNumber === 0) { dayNumber = numberOfSunday };
        return dayNumber;
    }

    //fill the table with empty cells, which are accepted for the previous month days
    for (var i = 1; i < changeDayNumberIfSunday(firstDayOfMonth.getDay()); i++)
    {
        table += '<td></td>';
    }
    //fill the table with current month days
    for (var i = 1; i <= lastDayOfMonth.getDate(); i++) {
        table += '<td>' + i + '</td>';
        if (changeDayNumberIfSunday(firstDayOfMonth.getDay()) == numberOfSunday) {
            table += '</tr><tr>';
        }
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
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
    if ((typeof objA == "object" && objA != null) && (typeof objB == "object" && objB != null)) {
        if (Object.keys(objA).length != Object.keys(objB).length)
            return false;
        for (var prop in objA) {
            if (objB.hasOwnProperty(prop)) {
                if (!isDeepEqual(objA[prop], objB[prop]))
                    return false;
            }
            else
                return false;
        }
        return true;
    }
    else if (objA !== objB)
        return false;
    else
        return true;
}
