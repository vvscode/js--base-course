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
    var a;
    for (var i = 1; i <= 100; i++) {
        ((i % 3) === 0) && ((i % 5) === 0) && (a = "FizzBuzz") || ((i % 5) === 0) && (a = "Buzz") || ((i % 3) === 0) && (a = "Fizz") || (a = i);

        log(a);
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
    var polindrom = textString.toLowerCase();
    polindrom = polindrom.split(" ").join('');
    var bool;
    for (var i = 0; i <= polindrom.length; i++) {
        if (polindrom[i] === (polindrom[polindrom.length - i - 1] )) {
            bool = true;
        } else {
            bool = false;
            break;
        }
    }
    return bool;
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
    var calendar = "<table>" +
        "<tr>" +
        "<th>Понедельник</th>" +
        "<th>Вторник</th>" +
        "<th>Среда</th>" +
        "<th>Четверг</th>" +
        "<th>Пятница</th>" +
        "<th>Субота</th>" +
        "<th>Воскресение</th>" +
        "</tr>";
    var date = new Date(year, month - 1);

    outer: while (month === (date.getMonth() + 1)) {

        for (var i = 0; i <= 6; i++) {
            i === 0 ? calendar += "<tr>" : false;

            if (date.getDay()  === i && (month === (date.getMonth() + 1))) {
                calendar += "<td>" + date.getDate() + "</td>";
                date.setDate(date.getDate() + 1);
            } else {
                calendar += "<td></td>";
            }

            if (i === 6) {
                calendar += "</tr>";
                continue outer;
            }
        }
    }

    htmlEl.innerHTML = calendar;
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
    var value;

    if (objA === objB) {
        value = true;
    } else value = false;

    return value;

}
