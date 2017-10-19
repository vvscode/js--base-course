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
    var rez = [0, "Fizz", "Buzz", "FizzBuzz"];
    for (var i = 1; i <= 100; i++) {
        var index = !(i % 3)  + !(i % 5) * 2; 
        log(rez[index] || i);
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
    var reverseString = textString.toUpperCase().split('').reverse().join('');
    return (textString === reverseString);
 
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
    var firstDayMonth = new Date(year, month - 1);
    var nextMonth = new Date(year, month, 0)
    var table = '<table><caption>Calendar</caption><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
    function changeNumOfDay(numDay)//для воскресенья меняем с 0 на 7
    {
        if (numDay === 0) { numDay = 7 };
        return numDay;
    }

    for (var i = 1; i < changeNumOfDay(firstDayMonth.getDay()); i++)//заполнение первой строчки
    {
        table += '<td></td>';
    }
    for (var i = 1; i <= nextMonth.getDate(); i++) {
        table += '<td>' + i + '</td>';
        if (changeNumOfDay(firstDayMonth.getDay()) == 7) {
            table += '</tr><tr>';
        }
        firstDayMonth.setDate(firstDayMonth.getDate() + 1);
    }
   
    if (changeNumOfDay(firstDayMonth.getDay()) <7)//если первое число следующего месяца не понедельник
    {
        for (var i = changeNumOfDay(firstDayMonth.getDay()); i < 7; i++) {
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
    if (typeof (objA) !== typeof (objB)) return false;
    if (typeof (objA) !== 'object') return objA === objB;
    if (Array.isArray(objA) != Array.isArray(objB)) return false;
    if (Object.keys(objA).length !== Object.keys(objB).length) return false;
    for (var key in objA) {
        if (!isDeepEqual(objA[key], objB[key])) return false;
    }
    return true;
}
