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

// Решение 1:
// function fizzBuzz() {
//     for (var i = 1; i <= 100; i++) {
//         if (i % 3 === 0 && i % 5 === 0) {
//             console.log("FizzBuzz");
//         } else if (i % 5 === 0) {
//             console.log("Buzz");
//         } else if (i % 3 === 0) {
//             console.log("Fizz");
//         } else {
//             log(i);
//         }
//     }
// }

// Решение 2:
function fizzBuzz() {
    var a;
    for (var i = 1; i <= 100; i++) {
        a = i;
        !(i % 3) && (a = 'Fizz');
        !(i % 5) && (a = 'Buzz');
        (!(i % 3) && !(i % 5)) && (a = "FizzBuzz");
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
// Решение 1:
// function isPolindrom(textString) {
//     if (textString.length === 1) return true;
//
//     var end = textString.length - 1;
//
//     for (var i = 0; i <= (textString.length - 1); i++) {
//         if (end === i) break;
//         if (textString[end] === textString[i]) end--;
//         else return false;
//     }
//     return true;
// }

// Решение 2:
function isPolindrom(textString) {
    var strReverse = textString.split('').reverse().join('');
    return strReverse === textString;
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
    var tempDate = new Date(year, month + 1, 0),
        lastDay = tempDate.getDate(),
        endMonth = false,
        currDate = new Date(year, month, 1),
        weekDay = currDate.getDay() - 1, // чтобы начинались с Пн.
        daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    for (var j = 0; j < daysOfWeek.length; j++) {
        var th = document.createElement('th');
        th.innerHTML = daysOfWeek[j];
        htmlEl.appendChild(th);
    }

    if (weekDay < 0) weekDay = 6;

    while (currDate.getMonth() === month) {
        var tr = document.createElement('tr'),
            i = 0;

        while (i < 7) {
            var td = document.createElement('td');

            if (i < weekDay) {
                td.innerHTML = '';
            } else {

                if (endMonth) {
                    td.innerHTML = '';
                } else {
                    td.innerHTML = currDate.getDate();
                }

                if (currDate.getDate() === lastDay) endMonth = true;
                currDate.setDate(currDate.getDate() + 1);
            }
            tr.appendChild(td);
            i++;
        }

        weekDay = 0;
        htmlEl.appendChild(tr);
    }
    document.getElementById('calendar-wrap').appendChild(htmlEl);
}

drawCalendar(2018, 1, document.createElement('table'));


/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA
 * @param {*} objB
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {
    if (typeof objA === typeof objB) {
        if (typeof objA === 'object' && typeof objB === 'object') {

            if (!(objA.length === objB.length)) return false;

            for (var key in objA) {
                if (!isDeepEqual(objA[key], objB[key])) return false;
            }
            return true;
        }
        return objA === objB;
    }
}
