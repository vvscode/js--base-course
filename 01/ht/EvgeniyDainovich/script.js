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
    for (var i = 1; i < 101; i++) {
        i % 15 == 0 && log("FizzBuzz");
        i % 5 == 0 && i % 3 != 0 && log("Buzz");
        i % 3 == 0 && i % 5 != 0 && log("Fizz");
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
    return textString.split('').reverse().join("") === textString;
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
    month--;
    var date = new Date(year, month);
    var strToHtml = "<table><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr><tr>";
    var deltai = (date.getDay() + 6) % 7;
    for (var i = 0; i < deltai; i++) {
        strToHtml += "<td> </td>";
    }
    while (date.getMonth() == month) {
        strToHtml += "<td>" + date.getDate() + "</td>";
        date.setDate(date.getDate() + 1);
        if (date.getDay() == 1) {
            strToHtml += "</tr><tr>";
        }
    };
    strToHtml += "</tr>";
    htmlEl.innerHTML = strToHtml;
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
    if (typeof (objA) != "object") {
        return (objA === objB);
    }
    else {
        if (objA.length != objB.length) {
            return false;
        }
        else {
            for (var key in objA) {
                if (typeof (objA[key]) == 'object') {
                    if (!isDeepEqual(objA[key], objB[key])) {
                        return false;
                    }
                }
                else {
                    if (objA[key] !== objB[key]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}