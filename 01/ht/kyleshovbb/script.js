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
        ((i % 3) === 0) && ((i % 5) === 0) && (a = "FizzBuzz") ||
        ((i % 5) === 0) && (a = "Buzz") ||
        ((i % 3) === 0) && (a = "Fizz") ||
        (a = i);

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
    var value = true;
    var polindrom = textString.toLowerCase();
    polindrom = polindrom.split(" ").join('');

    for (var i = 0; i < polindrom.length / 2; i++) {
        if (!(polindrom[i] === (polindrom[polindrom.length - i - 1] ))) {
            value = false;
            break;
        }
    }

    return value;
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

        for (var i = 1; i <= 7; i++) {
            i === 1 ? calendar += "<tr>" : false;

            if (checkDay() === i && (month === (date.getMonth() + 1))) {
                calendar += "<td>" + date.getDate() + "</td>";
                date.setDate(date.getDate() + 1);
            } else {
                calendar += "<td></td>";
            }

            if (i === 7) {
                calendar += "</tr>";
                continue outer;
            }
        }
    }

    htmlEl.innerHTML = calendar;

    function checkDay() {
        var day;
        switch (date.getDay()) {
            case 0:
                day = 7;
                break;
            case 7:
                day = 1;
                break;
            default:
                day = date.getDay();
                break;
        }
        return day;
    }
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
    var value = value || false;

    if (typeof objA !== 'object' && typeof objB !== 'object') {
        value = JSON.stringify(objA) === JSON.stringify(objB);
    }

    if (Array.isArray(objA) && Array.isArray(objB)) {
        if (objA.length === objB.length) {
            for (var i = 0; i < objA.length; i++) {
                value = isDeepEqual(objA[i], objB[i]);
                if (!value) break;
            }
        }
        return value;
    }

    if (objA instanceof Object && objB instanceof Object) {
        if (Object.keys(objA).length === Object.keys(objB).length) {
            for (var key in objA) {
                value = isDeepEqual(objA[key], objB[key]);
                if (!value) break;
            }
        }
        return value;
    }

    return value;
}
