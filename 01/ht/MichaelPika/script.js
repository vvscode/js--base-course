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
        while (a % 3 === 0 && a % 5 === 0) {
            a = `FizzBuzz`;
        }
        while (a % 3 === 0) {
            a = `Fizz`;
        }
        while (a % 5 === 0) {
            a = `Buzz`;
        }
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
    var table = "<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>";

    function getDayNumber(date) {
        var day = date.getDay();
        if (day == 0){
            day = 7;
        }
        return day - 1;
    }
    for (var i = 0; i < getDayNumber(theDesiredDate); i++) {
        table = table + "<td></td>";
    }
    while (theDesiredDate.getMonth() == theDesiredMonth) {
        table = table + "<td>" + theDesiredDate.getDate() + "</td>";
        if (getDayNumber(theDesiredDate) % 7 == 6) {
            table = table + "</tr><tr>";
        }
        theDesiredDate.setDate(theDesiredDate.getDate() + 1);
    }
    if (getDayNumber(theDesiredDate) != 0) {
        for (var i = getDayNumber(theDesiredDate); i < 7; i++) {
            table = table + "<td></td>";
        }
    }
    table = table + "</tr></table>";
    htmlEl.innerHTML = table;
}
//
 //   document.write('<table id="fc" style="position:absolute;border-collapse:collapse;background:#FFFFFF;border:1px solid #FFD088;display:none;-moz-user-select:none;-khtml-user-select:none;user-select:none;" cellpadding="2">');
 //   document.write('<tr style="font:bold 13px Arial" onselectstart="return false"><td style="cursor:pointer;font-size:15px" onclick="upmonth(-1)">&laquo;</td><td colspan="5" id="mns" align="center"></td><td align="right" style="cursor:pointer;font-size:15px" onclick="upmonth(1)">&raquo;</td></tr>');
  //  document.write('<tr style="background:#FF9900;font:12px Arial;color:#FFFFFF"><td align=center>П</td><td align=center>В</td><td align=center>С</td><td align=center>Ч</td><td align=center>П</td><td align=center>С</td><td align=center>В</td></tr>');
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
    var keys1 = Object.keys(objA),
        i = 0,
        prop1,
        value1;
    var keys2 = Object.keys(objB),
        prop2,
        value2;

    if (typeof objA === "number" && typeof objB === "number") {
        if (objA !== objB) {
            return false;
        }
    }
    if (keys1.length !== keys2.length) {
        return false;
    } else {
        while (i < keys1.length) {
            prop1 = keys1[i];
            prop2 = keys2[i];
            if (prop1 !== prop2) {
                return false;
            }
            value1 = objA[prop1]; // {x: 5}  a = {a: 1, b: {x: 5}, c: 2};
            value2 = objB[prop2];
            if (value1 !== value2) {
                return false;
            }
            /**else if (typeof value1 === "object" && typeof value2 === "object") {
                var keysValue1 = Object.keys(value1); //=x
                var keysValue2 = Object.keys(value2); //=x
                if (keysValue1.length === keysValue2.length) {
                    return true;
                } else {
                    var j = 0;
                    while (j < keysValue1.length) {
                        if (keysValue1[j] !== keysValue2[j]) {
                            return false;
                        }
                        if (prop1[value1] !== prop2[value2]) {
                            return false;
                        }
                        j++;
                    }
                }
            }
             */
            i++;
        }
    }
    return true;
}
/**
 * Написать функцию `spiral`
 * которая принимает на вход двумерный массив
 * а возвращает одномерный массив с элементами расположенными по спирали.
 * Матрица не обязательно имеет одинаковые размеры по обеим сторонам.
 * Например
 * spiral([[4, 5], [6, 7]]); // [4,5,7,6]
 * spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // [1,2,3,6,7,8,7,4,5]
 * spiral([
 * [1, 2, 3, 4, 5],
 * [6, 7, 8, 9, 10],
 * [11, 12, 13, 14, 15],
 * [16, 17, 18, 19, 20]
 * ]); // [1,2,3,4,5,10,15,20,19,18,17,16,11,6,7,8,9,14,13,12]
 *
 */
function spiral(arr) {
    var resultArr = [];
    var arrLength = arr[0];
    for (var j = 0; j < arr.length / 2; j++) {
        for (var valRight = j; valRight < arrLength.length - j; valRight++) {
            resultArr.push(arr[j][valRight]);
        }
        for (var valDown = j + 1; valDown <= arr.length - 1 - j; valDown++) {
            resultArr.push(arr[valDown][arrLength.length - 1 - j]);
        }
        for (var valLeft = arrLength.length - 1 - j; valLeft !== j; valLeft--) {
            resultArr.push(arr[arr.length - 1 - j][valLeft - 1]);
        }
        if (arr.length - 1 - j - 1 !== j) {
            for (var valUp = arr.length - 1 - j - 1; valUp > 0; valUp--) {
                resultArr.push(arr[valUp][j]);
            }
        }
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
    if (discriminant < 0) {
        return [];
    } else if (discriminant > 0) {
        x1 = (-b + Math.sqrt(discriminant)) / 2 * a;
        x2 = (-b - Math.sqrt(discriminant)) / 2 * a;
        return [x1, x2];
    } else if (discriminant === 0) {
        x1 = -b / 2 * a;
        return [x1];
    }
}
