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

/* Вариант 1
     for( var i=1; i<=100; i++ ) {
        while( i%3 == 0 && i%5 == 0 ){
            log('FizzBuzz');
            break;
        }
        while( i%3 == 0 && i%5 !== 0 ){
            log(`Fizz`);
            break
        }
        while( i%5 == 0 && i%3 !== 0 ){
            log(`Buzz`);
            break;
        }
        while( (i%3 !== 0) && (i%5 !==0 ) ){
            log(i);
            break;
        }
    }
   Вариант 2  */

    var msg = ["", "Fizz", "Buzz", "FizzBuzz"];
    for (var i = 1; i <= 100; i++) {
        var check = !(i % 3) * 1 + !(i % 5) * 2; // this gives 0, 1, 2, 3
        log(msg[check] || i);
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
    var valueConversely = textString.split('').reverse().join('');
    return valueConversely === textString;
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

}














