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
            var c = !!(a && b);
            while (a && !b) {
                log(stringNameFizz);
                break;
            }
            while (b && !a) {
                log(stringNameBuzz);
                break;
            }
            while (c) {
                log(stringNameFrizzBuzz);
                break;
            }
            while (!a && !b) {
                log(startInicializetion);
                break;
            }
        }
    })();

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
    return !!(polindrom == textString);
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
    else if (typeof(objA) === stringObject && typeof (objB) === stringObject) {
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
    if(firstArrayKeys.length === secondArrayKeys.length){
        for(var i = 0; i < firstArrayKeys.length ; i++){
            if(secondArrayKeys.some(elem => elem === firstArrayKeys[i])){
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


function spiral(array){
    console(array);
    return fibo(array.chain().join().value());
}

function fibo(arraySort) {
    console.log(arraySort);
   //  return fibs = lazy([0, 1])(_ => fibs[_ - 1] + fibs[_ - 2]);
}
