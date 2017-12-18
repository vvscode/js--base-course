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
    var textFB;
 for (var i=1;i<=100;i++)
 {
     textFB=((i%3==0)&&(i%5==0)&&(textFB="FizzBuzz"))||((i%3==0)&&(textFB="Fizz"))||((i%5==0)&&(textFB="Buzz"))||i;
     log(textFB);
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
    /*textString=textString.toLowerCase();
    return (textString==textString.split("").reverse().join(""));*/

    var textToTest=textString.toLowerCase();
    var textLength=textToTest.length;
    for (var i=0;(textLength-i)>=i;i++)
    {
        if (textToTest[i]!==textToTest[textLength-i-1]) return false;
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
    var numberOfDays=([4,6,9,11].includes(month))?30:31;
    if (month==2) numberOfDays=(year%4==0)?29:28;
    var date=new Date(year, month-1,1);
    var dayOfWeek1=date.getDay();
    var calendarTable="<table><tr>"+month+"/"+year+"</tr>";
    //caption
    calendarTable+="<tr><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td><td>Su</td></tr><tr>";

    //sunday =7
    if (dayOfWeek1==0) dayOfWeek1=7;
    //filling prev month with empty spaces
    for (var i=1;i<dayOfWeek1;i++)
        calendarTable+="<td></td>";

    for (var i=1;i<=numberOfDays;i++) {
        calendarTable +="<td>"+i+"</td>";
        //going to next line
        if ((dayOfWeek1+i-1) % 7 == 0&&i!=numberOfDays) calendarTable += "</tr><tr>"
    }
    calendarTable+="</tr></table>";
    htmlEl.innerHTML=calendarTable;
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

    if (objA==null&&objB==null) return true;
    if (typeof objA!="object"||typeof objB!="object") return objA===objB;

    var keysA=Object.keys(objA);
    var keysB=Object.keys(objB);

    if (keysA.length!=keysB.length) return false;

    return keysA.every(function(key)
        {if (!keysB.includes(key)) return false;
        return isDeepEqual(objA[key], objB[key]);
    });
}
