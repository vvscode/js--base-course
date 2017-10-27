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
 for(i=1; i <= 100; i++){
     var fBuzz = !(i % 15) && 'FizzBuzz' || !(i % 3) && 'Fizz' || !(i % 5) && 'Buzz' || i;
     log(fBuzz);
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
    //make array, then reverse and back make a string
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
    var month = month - 1;
    var day = new Date(year, month);
    var table = `<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>`;
    for (var i = 0; i < getDay(day); i++) {
        table += "<td></td>";
    }
    while (day.getMonth() === month) {
        table += "<td>" + day.getDate() + "</td>";
        if (getDay(day) % 7 === 6) {
            table += "</tr><tr>";
        }
        day.setDate(day.getDate() + 1);
    }
    if (getDay(day) != 0) {
        for (var i = getDay(day); i < 7; i++) {
            table += "<td></td>";
        }
    }
    table += "</tr></table>";
    htmlEl.innerHTML = table;
}
function getDay(date) {
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
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
    if(JSON.stringify(objA) === JSON.stringify(objB)){
        return true;
    }
    
    else if (Object.keys(objA).length !== Object.keys(objB).length) {
        return false;
    }

    for (var key in objA) {
        if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
            return isDeepEqual(objA[key], objB[key]);
        }
    }
 return false;
}