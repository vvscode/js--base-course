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
    /* Ваше решение */
    for (var i = 1; i < 101; i++) {
        var a = i;
        ((a % 3 === 0) && (a % 5 === 0) && (a = "FizzBuzz")) ||
        ((a % 3 === 0) && (a = "Fizz")) || ((a % 5 === 0) && (a = "Buzz")) || (a = i);
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
    /* Ваше решение */
    if (textString[0] === textString[textString.length - 1]) {
        return textString.length <= 1 ? true : isPolindrom(textString.slice(1, -1));
    }
    return false;
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
    /* Ваше решение */

    var theDesiredMonth = month - 1;
    var theDesiredDate = new Date(year, theDesiredMonth);
    var table =
        "<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>";

    function getDayNumber(date) {
        var day = date.getDay();
        if (day === 0) {
            day = 7;
        }
        return day - 1;
    }
    for (var k = 0; k < getDayNumber(theDesiredDate); k++) {
        table = table + "<td></td>";
    }
    while (theDesiredDate.getMonth() === theDesiredMonth) {
        table = table + "<td>" + theDesiredDate.getDate() + "</td>";
        if (getDayNumber(theDesiredDate) % 7 === 6) {
            table = table + "</tr><tr>";
        }
        theDesiredDate.setDate(theDesiredDate.getDate() + 1);
    }
    if (getDayNumber(theDesiredDate) !== 0) {
        for (var i = getDayNumber(theDesiredDate); i < 7; i++) {
            table = table + "<td></td>";
        }
    }
    table = table + "</tr></table>";
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
    /* Ваше решение */
    if (typeof objA === "number" && typeof objB === "number") {
        if (objA !== objB) {
            return false;
        }
    }
    if (typeof objA === "string" && typeof objB === "string") {
        if (objA.length !== objB.length) {
            return false;
        }
        for (var j = 0; j < objA.length; j++) {
            if (objA.charAt(j) !== objB.charAt(j)) {
                return false;
            }
        }
    }
    if (Array.isArray(objA) && Array.isArray(objB)) {
        if (objA.length !== objB.length) {
            return false;
        } else {
            for (var k = 0; k < objA.length; k++) {
                if (objA[k] !== objB[k]) {
                    return false;
                }
            }
            return true;
        }
    }
    if (typeof objA === "object" && typeof objB === "object") {
        if (Object.keys(objA).length !== Object.keys(objB).length) {
            return false;
        }
        for (var key in objA) {
            if (objA.hasOwnProperty(key)) {
                if (objB.hasOwnProperty(key)) {
                    if (typeof objA[key] === "object") {
                        if (!isDeepEqual(objA[key], objB[key])) {
                            return false;
                        }
                    }
                    else if (objA[key] !== objB[key]) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}
/**
 * Написать функцию `spiral`
 * которая принимает на вход двумерный массив
 * а возвращает одномерный массив с элементами расположенными по спирали.
 * Матрица не обязательно имеет одинаковые размеры по обеим сторонам.
 */
function spiral(arr) {
    var resultArr = [];
    var arrLength = arr[0], j = 0;
    var counter = arrLength.length * arr[arr.length ];
    while(j < arr.length / 2){
        for (var valRight = j; valRight < arrLength.length - j && counter !== 0; valRight++) {
            resultArr.push(arr[j][valRight]);
            counter--;
        }
        for (var valDown = j + 1; valDown <= arr.length - 1 - j && counter !== 0; valDown++) {
            resultArr.push(arr[valDown][arrLength.length - 1 - j]);
            counter--;
        }
        for (var valLeft = arrLength.length - 1 - j; valLeft !== j && counter !== 0; valLeft--){
            resultArr.push(arr[arr.length - 1 - j][valLeft - 1]);
            counter--;
        }
        for (var valUp = arr.length - 1 - j - 1; valUp > 2 * j && counter !== 1; valUp--) {
            resultArr.push(arr[valUp][j]);
            counter--;
        }
        j++;
    }
    return resultArr;
}
/**
 * Написать функцию `quadraticEquation`
 * которая принимает на вход коэффициенты квадратного уравнения
 * а возвращает массив с вещественными корнями этого уравнения (если они есть). Например
 * quadraticEquation(1, -8, 72); // x^2 - 8*x + 72 -> []
 * quadraticEquation(1, 12, 36); // x^2 + 12*x + 36 -> [-6]
 * quadraticEquation(1, 6, 1); // 1*x^2 + 6*x + 1 -> [-0.1715728752538097, -5.82842712474619]
 * @return []
 *
 */
function quadraticEquation(a, b, c) {
    var discriminant = b * b - 4 * a * c;
    var x1, x2;
    var result = [];
    if (discriminant < 0) {
        return result;
    } else if (discriminant > 0) {
        x1 = (-b + Math.sqrt(discriminant)) / 2 * a;
        x2 = (-b - Math.sqrt(discriminant)) / 2 * a;
<<<<<<< HEAD
        result.push (x1);
        result.push (x2);
        return result;
    } else if (discriminant === 0) {
        x1 = -b / 2 * a;
        result.push (x1);
=======
        result.push(x1);
        result.push(x2);
        return result;
    } else if (discriminant === 0) {
        x1 = -b / 2 * a;
        result.push(x1);
>>>>>>> b085b860e865330e3ed776550f34edbb93c6211e
        return result;
    }
}