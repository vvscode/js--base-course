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
            var a = !!((startInicializetion % 3) === 0);
            var b = !!((startInicializetion % 5) === 0);
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
    var polindrom = '';
    textString.split('').forEach((result) => {
        polindrom = result + polindrom;
    });
    return polindrom == textString;
    // return textString.split('').reverse().join(''); // или

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
    var arrayWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var arrayDaysMonth = Array.apply(null, { length: daysInMonth(year, month) }).map(Function.call, Number);
    var tempArrayMonth = [];
    arrayDaysMonth.forEach(day => {
        tempArrayMonth.push({day , getDayWeek(day)});
    });
    var table = '<table border="1", cellpadding="0", cellspacing="0", width="500px">';
    table +='<tr>' + arrayWeekDays.map(day => { return "<td>" + day + "</td>"; }).join("") + '</tr>';
    for(var i = 0; i < tempArrayMonth.length; i++){
        if(getDayWeek(i) === arrayWeekDays[6]){
            table += '<tr>'+'</tr>'
        } else {

        }

    }

   // new Date(2018,2, i).getDay()

    table +='</table>';
    function daysInMonth(year, month) {
        return 33 - new Date(year, month - 1, 33).getDate();
    }
    function getDayWeek(day) {
        switch (day) {
            case 0:
                return "Monday";
                break;
            case 1:
                return "Tuesday";
                break;
            case 2:
                return "Wednesday";
                break;
            case 3:
                return "Thursday";
                break;
            case 4:
                return "Friday";
                break;
            case 5:
                return "Saturday";
                break;
            case 6:
                return "Sunday";
                break;
        }
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
    var newArray = flatten(array);
    return getSpiralArray(newArray.sort((a, b) => {
        return a - b;
    }));
}

function getSpiralArray(array, spin) {
    var countAllValues = array.length;
    var arraySpiral = [];
    var spinValueDefoult = 3;
    var countSpin = Math.floor(array.length / ((spin) ? spin : spinValueDefoult)); // количество витков(min 3)
    for (var i = 1; i < countAllValues + 1; i++) {
        if (i % spinValueDefoult === 0) {
            arraySpiral.push(array.pop());
        } else {
            arraySpiral.push(array.shift());
        }
    }
    return arraySpiral;
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
        throw "mistake of input, please, check arguments... text error: ${ex}";
    }
    return result;
}