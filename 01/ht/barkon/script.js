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
	var msg = ["", "Fizz", "Buzz", "FizzBuzz"];
	for (var i = 1; i<=100; i++) {
		var chck = !(i % 3) * 1 + !(i % 5) *2
		log(msg[chck] || i);
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
 /* Ваше решение */
	var string = textString.toLowerCase();
	var plndrm = string.split('').reverse().join('');
	return (string === plndrm);
// return undefined;
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
	var day = new Date(year, month -1, 1);
	var newday = new Date(year, month, 0);
	
	function fixDays(weekday) {
		if (weekday == 0) {
			weekday =7;
		}
		return weekday - 1;
	}
	
	var table = '<table><tr>';
	
	if (fixDays(day.getDay()) > 1) {
		for (var i = 1; i < fixDays(day.getDay()); i++) {
			table += '<td>' + "*" + '</td>';
		}
	}
	
	for (var i = 1; i<=newday.getDate(); i++) {
		table += '<td>' + i + '</td>';
		if (fixDays(day.getDay()) == 7) {
			table += '</tr><tr>';
		}
		day.setDate(day.getDay() + 1);
	}

	if (fixDays(newday.getDay()) < 7) {
		for (var i = fixDays(newday.getDay()); i < 7; i++) {
			table += '<td>' + "*" + '</td>';
		}
	}
	
	htmlEl.innerHTML = table + '</tr></table>';
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
	if (typeof(objA) !== typeof(objB)) return false;
	if (typeof(objA) !== 'object') return objA === objB;
	if (Array.isArray(objA) != Array.isArray(objB)) return false;
	if (Object.keys(objA).length !== Object.keys(objB).length) return false;
	for (var key in objA) {
		if (!isDeepEqual(objA[key], objB[key])) return false
	}
	return true;
 //return undefined;
}
