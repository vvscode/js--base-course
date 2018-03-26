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
    var arrayFizzBuzz = [];
    for(var i = 1; i <= 100; i++) {
        while(i % 3 != 0) {
            while(i % 5!= 0) {
                arrayFizzBuzz.push(i);
                break;
            }
            while(i % 5 == 0) {
                arrayFizzBuzz.push('Buzz');
                break;
            }
            break;
        }
        while(i % 3 == 0) {
            while(i % 5 == 0) {
                arrayFizzBuzz.push('FizzBuzz');
                break;
            }
            while(i % 5 != 0) {
                arrayFizzBuzz.push('Fizz');
                break;
            }
            break;
        }
    }
    arrayFizzBuzz.forEach(log);
}
/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
    var l = textString.length, i = 0;
    while (i < l / 2) {
        while (textString[i] !== textString[l - 1 - i++]) {
            return false;
        }
    }
    return true;    
}
var isPalindrom = (str) => str == str.split('').reverse().join('');
/**80296737128
 * Реализовать фукнцию `drawCalendar` , 
 * которая принимает три аргумента - год, месяц, htmlElement 
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).  
 * @param {number} year 
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl 
 */
function drawCalendar (year, month, htmlEl) {
    var date = new Date(year, month-1);
    function defineDayOfTheWeek(date) { 
        var dayOfTheWeek = date.getDay();
        if (dayOfTheWeek == 0) {
            dayOfTheWeek = 7;
        }
        return dayOfTheWeek - 1;
    }
    var table = '<table style="border: 1px solid black;border-collapse:collapse"><tr style="border: 1px solid black;border-collapse:collapse;"><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr><tr>';
    for (var i = 0; i < defineDayOfTheWeek(date); i++) {
      table += '<td></td>';
    }
    while (date.getMonth() == month - 1) {
      table += '<td>' + date.getDate() + '</td>';
      if (defineDayOfTheWeek(date) % 7 == 6) {
        table += '</tr><tr>';
      }
      date.setDate(date.getDate() + 1);
    }
    if (defineDayOfTheWeek(date) != 0) {
      for (i = defineDayOfTheWeek(date); i < 7; i++) {
        table += '<td></td>';
      }
    }
    table += '</td></table>';
    htmlEl.innerHTML = '';
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
    function eqObj(objA, objB) {
        if (objA === objB) {
            return true;
        }
        if (Object.keys(objA).length !== Object.keys(objB).length) {
            return false;
        }
        for (var prop in objA) {
            if (!isDeepEqual(objA[prop], objB[prop])) {
                return false;
            }
        }
        return true;
    }
    if (objA == objB) {
        return true;
    }
    if (typeof objA !== typeof objB) {
        return false;
    }
    if (typeof objA === 'number' && typeof objB === 'number') {
        if (isNaN(objA) && isNaN(objB)) {
            return true;
        }
        return objA === objB;
    }
    if ((typeof objA === 'string' && typeof objB === 'string') ||
        (Array.isArray(objA) && Array.isArray(objB))) {
        if (objA.length !== objB.length) {
            return false;
        }
        for (var i = 0; i < objB.length; i++) {
            if (objA[i] !== objB[i]) {
                return false;
            }
        }
    }
    return eqObj(objA, objB);
}
/**
 * Реализовать фукнцию `spiral` , которая принимает  на вход двумерный массив 
 * и возвращает одномерный массив с элементами расположенными по спирали. 
 * Матрица не обязательно имеет одинаковые размеры по обеим сторонам.  
 * @param {object} arr - двумерный массив
 */
function spiral (arr) {
    var answer = [];
    function isEmpty(arr) {
      return arr == undefined || arr.length == 0;
    }
    function horisonatalSplicing(arr, parentArr, method) {
        while (!isEmpty(arr)) {
            answer.push(arr[method]());
        }
        if (isEmpty(arr)) {
            parentArr.splice(parentArr.indexOf(arr), 1);
        }
    }
    while(!isEmpty(arr)) {
      horisonatalSplicing(arr[0], arr, 'shift');
      arr.forEach(function (elem) {
        answer.push(elem.pop());
      });
      horisonatalSplicing(arr[arr.length - 1], arr, 'pop');
        for (var i = arr.length - 1; i >= 0; i--) {
            answer.push(arr[i].shift());
        }
    }
    return  answer;
}
/**
 * Написать тесты и саму функцию `quadraticEquation`, которая на вход
 * принимает коэффициенты квадратного уравнения, а возвращает массив с
 * вещественными корнями этого уравнения (если они есть).
 * @param {number} a - коэффициент
 * @param {number} b - коэффициент
 * @param {number} c - коэффициент
 */
function quadraticEquation(a, b, c) { 
    function getAnswer(sign) { 
        return parseFloat((-b + sign * 1 * Math.sqrt(discriminant)) / (2 * a))
    }
    var answers = [];
    if (a === 0) {
        return answers;
    }
    var discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return answers;
    }
    if (discriminant == 0) {
        answers.push(parseFloat(-b / (2 * a)));
    }
    else {
        answers.push(getAnswer(1), getAnswer(-1));
    }
    return answers;
}