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
	var a;
 for (var i = 1; i <= 100; i++) {
 	a = i;
	 (i % 3 === 0) && (a = 'Fizz');
	 (i % 5 === 0) && (a = 'Bizz');
	 (i % 3 === 0) && (i % 5 === 0) && (a = 'FizzBizz');
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

/**
 * function isPolindrom(textString) {
 *	var textStr = textString.toLowerCase();
 * var reverseTextStr = textStr.split('').reverse().join('');
 * return (textStr === reverseTextStr);
 *}
 */

/**
 * Сразу второй вариант)))
 */

 function isPolindrom(textString) {
 	var textStr = textString.toLowerCase();
 	var halfLength = textStr.length / 2;
 	for (var i = 0; i < halfLength; i++) {
 		var result = textStr[i] === textStr[textStr.length - 1 - i];
 		if (!result) {
 			return false;
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
// function drawCalendar(year, month, htmlEl) {
// 	var d = new Date(year, month);
// 	var topRow = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
// 	var rows = [topRow];
// 	var mon = d.getMonth() || new Date().getMonth();
// 	var year = d.getFullYear() || new Date().getFullYear();
// 	var row = [];
// 	var numDaysOfMonth = 0;
// 	var i = 0;
//
// 	rows.push(row);
//
// 	while (i < getDay(d)) {
// 		row.push(null);
// 		i++;
// 	}
//
// 	while (i < 7) {
// 		row.push(d.getDate());
// 		d.setDate(d.getDate() + 1);
// 		i++;
// 		numDaysOfMonth++;
// 	}
//
// 	while (mon == d.getMonth()) {
// 		i = 0;
//
// 		if (i % 7 === 0) {
// 			var nextRow = [];
// 			rows.push(nextRow);
//
// 			while (i < 7 && mon == d.getMonth()) {
// 				d.setDate(d.getDate() + 1);
// 				numDaysOfMonth++;
// 				nextRow.push(numDaysOfMonth);
// 				i++;
// 			}
//
// 			while (i < 7) {
// 				nextRow.push(null);
// 				i++;
// 			}
// 		}
// 	}
// 	console.log(rows);
// 	return rows;
// }
//
// function getDay(date) {
// 	var day = date.getDay();
//
// 	if (day === 0) {
// 		day = 7;
// 		return day - 1;
// 	}
// }
//
// drawCalendar();

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
