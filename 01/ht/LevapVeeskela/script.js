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
    var stringNameFizz = 'Fizz';
    var stringNameBuzz = 'Buzz';
    var stringNameFrizzBuzz = 'FizzBuzz';
    var startInicializetion = 1;
    (function processing() {
        for (startInicializetion; startInicializetion <= 100; startInicializetion++) {
            var a = (startInicializetion % 3) === 0;
            var b = (startInicializetion % 5) === 0;
            var c = a && b;
            (a && !b) && log(stringNameFizz);
            (b && !a) && log(stringNameBuzz);
            c && log(stringNameFrizzBuzz);
            (!a && !b) && log(startInicializetion);
        }
    }
    )();
}


/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
    /** one version

    var polindrom = '';
    textString.split('').forEach((result) => {
         polindrom = result + polindrom;
     });
    return polindrom == textString;
    */

    /** two version
       return textString.split('').reverse().join('');
    */

    /** three version  */
    var linght = textString.length;
    for (var i = 0; i < linght; i++) {
        if (!(textString[i] === textString[linght - 1])) {
            return false;
        } else {
            linght--;
        }
    }
    return true;
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
    var arrayDaysMonth = Array.apply(null, { length: daysInMonth(year, month) }).map(Function.call, Number);
    var tempArrayMonth = new Array("<tr><td></td>", "<td></td>", "<td></td>", "<td></td>", "<td></td>", "<td></td>", "<td></td></tr>");
    var newArrayMonth = [];
    for (var i = 0; i < arrayDaysMonth.length; i++) {
        var numberArrayDay = new Date(year, month - 1, i).getDay();
        if (numberArrayDay === 0) {
            tempArrayMonth[numberArrayDay] = ("<tr><td>" + (i + 1) + "</td>");
        }
        else if (numberArrayDay === 6) {
            tempArrayMonth[numberArrayDay] = ("<td>" + (i + 1) + "</td></tr>");
            newArrayMonth.push(tempArrayMonth);
            tempArrayMonth = new Array("<tr><td></td>", "<td></td>", "<td></td>", "<td></td>", "<td></td>", "<td></td>", "<td></td></tr>");
        } else {
            i === arrayDaysMonth.length - 1 ? (() => {
                tempArrayMonth[numberArrayDay] = ("<td>" + (i + 1) + "</td>");
                newArrayMonth.push(tempArrayMonth);
            })() : tempArrayMonth[numberArrayDay] = ("<td>" + (i + 1) + "</td>");
        }
    }
    var arrayWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var table = '<table border="1", cellpadding="0", cellspacing="0", width="500px">';
    table += '<tr>' + arrayWeekDays.map(day => { return "<td>" + day + "</td>"; }).join("") + '</tr>';
    table += flatten(newArrayMonth).join("");
    table += '</table>';
    htmlEl.innerHTML = table;
    function daysInMonth(year, month) {
        return 32 - new Date(year, month - 1, 32).getDate();
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
    var stringObject = "object";
    // /* Ваше решение */
    if (Array.isArray(objA) && Array.isArray(objB)) {
        return Array(objA).join('') === Array(objB).join('');
    }
    else if (typeof (objA) === stringObject && typeof (objB) === stringObject) {
        return (JSON.stringify(objA) === JSON.stringify(objB)) || compareObjects(objA, objB);
    }
    else {
        return objA === objB;
    }
}

function compareObjects(objA, objB) {
    var resultArray = [];
    var firstArrayKeys = Object.keys(objA);
    var secondArrayKeys = Object.keys(objB);
    var firstArrayValues = Object.values(objA);
    var secondArrayValues = Object.values(objB);
    if (firstArrayKeys.length === secondArrayKeys.length) {
        for (var i = 0; i < firstArrayKeys.length; i++) {
            if (secondArrayKeys.some(elem => elem === firstArrayKeys[i])) {
                resultArray.push(isDeepEqual(firstArrayValues[i], secondArrayValues[secondArrayKeys.indexOf(firstArrayKeys[i])]))
            } else {
                resultArray.push(false);
            }
        }
        return resultArray.every(elem => elem === true);
    } else {
        return false;
    }
}




function spiral(array) {
    var countValues = flatten(array).length;
    return flatten(getSpiralArray(array));
    function getSpiralArray(arrayCurrent) {
        console.log("-------------------------");
        var n = arrayCurrent.length;
        var m = arrayCurrent[0].length;
        var newArray = [];
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < m; j++) {
                if (i === 0) {
                    newArray.push(arrayCurrent[i].shift() || arrayCurrent.shift());
                    console.log("up");
                }
                if ((j === arrayCurrent[i].length - 1 && i !== 0 && i !== n - 1 && arrayCurrent[i].length != 1)) {
                    newArray.push(arrayCurrent[i][j] || arrayCurrent[i]);
                    arrayCurrent[i].splice(j, 1);
                    if (newArray[i].length === 0) {
                        arrayCurrent.splice(i, 1);
                    }
                    console.log("right");
                }
                if (i === arrayCurrent.length - 1 && arrayCurrent[i].length > 0) {
                    console.log("down");
                    newArray.push(arrayCurrent[i].pop() || arrayCurrent.pop());

                    if (arrayCurrent[i].length === 0) {
                        if (arrayCurrent[i - 1].length > 0) {
                            newArray.push(getSpiralArray(arrayCurrent));
                        }
                        arrayCurrent.splice(i, 1);
                    }
                }
            }
        }
        return newArray;
    }
}

//метод преобразующий через рекурсию массив любой глубины в одномерный массив
function flatten(array) {
    var arrayFlatten = [];
    for (var i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
            arrayFlatten = arrayFlatten.concat(flatten(array[i]));
        } else {
            arrayFlatten.push(array[i]);
        }
    }
    return arrayFlatten;
}


function quadraticEquation(a, b, c) {
    var result = [];
    var d = Math.pow(b, 2) - 4 * a * c;
    try {
        if (d > 0) {
            result.push((-b + Math.pow(d, 0.5)) / (2 * a));
            result.push((-b - Math.pow(d, 0.5)) / (2 * a));
        }
        else if (d === 0) {
            result.push((-b + Math.pow(d, 0.5)) / (2 * a));
        }
    } catch (ex) {
        throw ("mistake of input, please, check arguments... text error: " + ex);
    }
    return result;
}