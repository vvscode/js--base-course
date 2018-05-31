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
    let tempDate = new Date(year, month, 0), // узнаем последний день
        lastDay = tempDate.getDate(),        // текущего месяца
        endMonth = false,
        currDate = new Date(year, --month, 1),
        weekDay = currDate.getDay() - 1, // чтобы начинались с Пн.
        daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        th = '',
        table = '';

    for (let j = 0; j < daysOfWeek.length; j++) {
        th += '<th>' + daysOfWeek[j] + '</th>';
    }
    table = '<table>' + th;

    if (weekDay < 0) { weekDay = 6; }

    while (currDate.getMonth() === month) {
        let tr = '<tr>',
            i = 0;

        while (i < 7) {
            let td = '<td>';

            if (i < weekDay) {
                td += '</td>';
            } else {
                if (endMonth) {
                    td += '</td>';
                    break;
                } else {
                    td += currDate.getDate() + '</td>';
                }
                if (currDate.getDate() === lastDay) { endMonth = true; }
                currDate.setDate(currDate.getDate() + 1);
            }
            tr += td;
            i++;
        }
        weekDay = 0;
        tr += '</tr>';
        table += tr;
    }
    table += '</table>';
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

/**
 * Написать тесты и саму функцию spiral, которая принимает на вход двумерный массив
 * и возвращает одномерный массив с элементами расположенными по спирали. Матрица
 * не обязательно имеет одинаковые размеры по обеим сторонам.
 * @param {array} matrix произвольный двумерный массив
 * @return {array} одноменый массив
 */
function spiral(matrix) {
    let result = [],
        temp;

    while (matrix.length > 0) {
        // 1: left --> right
        result = result.concat(...matrix.splice(0, 1));
        // 2: up --> down
        for (let i = 0; i < matrix.length; i++) {
            result = result.concat(...matrix[i].splice(-1, 1));
        }
        // 3: right --> left
        temp = matrix.splice(-1, 1).reverse();
        if (temp.length > 0) {
            result = result.concat(temp[0].reverse());
        }
        // 4: down --> up
        for (let i = matrix.length - 1; i >= 0; i--) {
            result = result.concat(...matrix[i].splice(0, 1));
        }
    }
    return result;
}

/**
 * Написать тесты и саму функцию quadraticEquation, которая на вход принимает
 * коэффициенты квадратного уравнения, а возвращает массив с вещественными
 * корнями этого уравнения (если они есть).
 * @param {number} a коэффициент
 * @param {number} b коэффициент
 * @param {number} c коэффициент
 * @return {array} одномерный массив
 */
function quadraticEquation(a, b, c) {
    let result = [],
        D = b * b - 4 * a * c,
        x1,
        x2;

    if (D < 0) {
        return result;
    } else if (D === 0) {
        result.push(-b / (2 * a));
        return result;
    }

    x1 = (-b + Math.sqrt(D)) / (2 * a);
    x2 = (-b - Math.sqrt(D)) / (2 * a);
    result.push(x1);
    result.push(x2);

    return result;
}
