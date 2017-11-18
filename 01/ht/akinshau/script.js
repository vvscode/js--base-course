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
	for(i=1;i<=100;i++){
		log(	( i%3 === 0 && i%5 === 0 && 'FizzBuzz' ) ||
				( i%3 === 0 && 'Fizz' ) ||
				( i%5 === 0 && 'Buzz' ) ||
				  i );
	}
}


/**
 * реализовать фукнцию  `isPalindrom`,
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
		function isPalindrom(textString) {

			var original = textString.toLowerCase();
 			var reversed = textString.toLowerCase().split('').reverse().join('');

 			var check = (original === reversed);

 			return check;

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


    var correctedMonth = month - 1;
    var date = new Date(year, correctedMonth, 1);
    var daysInMonth = new Date(year, month, 0).getDate();
    var initialDay = date.getDay();

    if (initialDay === 0) {
      initialDay += 7;
    }

    var numberOfRowsToPrint;
    var numberOfCellsToPrint = initialDay + daysInMonth - 1;

    if( numberOfCellsToPrint <= 28 ){
      numberOfRowsToPrint = 4;
    } else if ( numberOfCellsToPrint <= 35 ) {
      numberOfRowsToPrint = 5;
    } else {
      numberOfRowsToPrint = 6;
    }

    document.write('<table border=1 cellpadding=5 id="MyCalendar">');

    for(i=1;i<=numberOfRowsToPrint;i++){
      document.write('<tr>');
      for(j=1;j<=7;j++){
        document.write('<td></td>');
      }
      document.write('</tr>');
    }

    document.write('</table>');

    var tableCells = document.getElementsByTagName('td');

    var startingTd = initialDay - 1;
    var numberOfLastNeededCell = startingTd + daysInMonth - 1;
    for(j=startingTd;j<=numberOfLastNeededCell;j++){
      tableCells[j].innerHTML = '<td>' + ( j - startingTd + 1) + '</td>';
    }

    htmlEL = document.getElementById('MyCalendar');
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
 return undefined;
}
