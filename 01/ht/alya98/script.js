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
    for (i=1; i<=100; i++) {
        (i%15)===0 && log('FizzBuzz') || (i%3)===0 && log('Fizz')|| (i%5)===0 && log('Buzz')||log(i);
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
    var str2=textString.split('').reverse().join('');
 return textString===str2;
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
    var date=new Date(year, month-1);
    var table='<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr>';
    var day=(date.getDay()+6)%7;
    for (var i=0; i<day; i++) {
        table+='<td></td>';
    }
    while (date.getMonth()===month-1) {
        table+='<td>'+date.getDate()+'</td>';
        date.setDate(date.getDate()+1);
        if (date.getDay()===1)
            table+='</tr><tr>';

    }
    table += '</tr></table>';
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
        if (typeof objA !== typeof objB) return false;
        if (typeof objA !== 'object') return objA === objB;
        else {
            if (objA.length!==objB.length) return false;
            for (var key in objA) {
                if (typeof objA[key] !== 'object') {
                    if (!isDeepEqual(objA[key], objB[key])) return false;
                }
            }
        }
    return true;
}
