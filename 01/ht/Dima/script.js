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

for (var i = 1 ; i <= 100; i++) {
		
	if ( i % 3 === 0 && i % 5 === 0) {
		log('FizzBuzz');
	} else if ( i % 3 === 0 ) {
		log('Fizz');
	} else if ( i % 5 === 0) {
		log('Buzz');
	} else {
		log(i);
	}

};

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
	for (var i = 1; i <= 100 ; i++) {
		( i % 3 === 0 && i % 5 === 0 ) && log('FizzBuzz');
		( i % 3 === 0 && i % 5 !== 0 ) && log('Fizz');
		( i % 5 === 0 && i % 3 !== 0 ) && log('Buzz');
		( i % 3 !== 0 && i % 5 !== 0 ) && log(i);
	};
};




/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {

	var textRevers = textString.split('').reverse().join('');

	if (textString === textRevers) {
		return true;
	} else {
		return false;
	}
 return undefined;
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

	var el = document.createElement(htmlEl);
	document.body.appendChild(el);

	var date = new Date(year, month - 1);

	function getDay(date) { 
		var day = date.getDay();
		if (day == 0) day = 7;
		return day - 1;
	};

	var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

	for (var i = 0; i < getDay(date); i++) {
		table += '<td></td>';
	}

	while (date.getMonth() == month - 1) {

		table += '<td>' + date.getDate() + '</td>';

		if (getDay(date) % 7 == 6) {
			table += '</tr><tr>';
		}

		date.setDate(date.getDate() + 1);
	}

	if (getDay(date) != 0) {

		for (var i = getDay(date); i < 7; i++) {
			table += '<td></td>';
		}
	}

	table += '</tr></table>';

	return el.innerHTML = table;

};





/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA 
 * @param {*} objB 
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {

	if (JSON.stringify( objA )===JSON.stringify( objB )) {
		return true;
	} else {
		return false;
	}

return undefined;
}
