/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Функция вывода строк для работы в fizzBuzz
 * @param {*} a 
 */


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
    for (var index = 1; index < 101; index++) {

        (index % 3 == 0 && index % 5 == 0) && log("FizzBuzz");
        (index % 3 == 0 && index % 5 != 0) && log("Fizz");
        (index % 5 == 0 && index % 3 != 0) && log("Buzz");
        (index % 5 != 0 && index % 3 != 0) && log(index);


    }
}


/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom (textString) {
			
			var arr = textString.split("");
			arr.reverse();
			var textString2 = arr.join('');
			
				return (textString == textString2);
			}


/**
 * Реализовать фукнцию `drawCalendar` , 
 * которая принимает три аргумента - год, месяц, htmlElement 
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).  
 * @param {number} year 
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl 
 */
function drawCalendar (year, month, htmlEl){
var date1 = new Date(year, month, 0);
var amountOfdays = date1.getDate();
var date2 = new Date(year, (month - 1), 1);
var dayOftheweek = date2.getDay()

if (dayOftheweek == 0) {
    dayOftheweek += 7;
}
var tableWrite = '<tr>';
var cell = 1;

for (var calendarSize = 42; calendarSize >= cell; cell++) {

    if (dayOftheweek == cell) {
        for (var number = 1; amountOfdays >= number; number++) {
            if (cell % 7 == 0) {
                if (amountOfdays == number) {
                    tableWrite += '<td>' + String(number) + '</td>';
                    break;
                }

                tableWrite += '<td>' + String(number) + '</td></tr><tr>';

                number++
                cell++;

            }

            tableWrite += '<td>' + String(number) + '</td>';
            cell++;
        }
    }
    if (cell % 35 == 0 && (dayOftheweek + amountOfdays - 1) == cell) {

        break;
    }
    if (cell % 35 == 0) {
        tableWrite += '<td></td>';
        break;
    }

    tableWrite += '<td></td>';

}
tableWrite += '</tr>';
 htmlEl.innerHTML = tableWrite;
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
    if (typeof(objA) !== typeof(objB)) return false;
    if (typeof(objA) !== 'object') return objA === objB;
    if (Array.isArray(objA) != Array.isArray(objB)) return false;
    if (Object.keys(objA).length !== Object.keys(objB).length) return false;
    for (var key in objA) {
        if (!isDeepEqual(objA[key], objB[key])) return false;
    }
    return true;
};
