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
	var string = textString.toLowerCase();
  	var gnirts = string.split('').reverse().join('');
  	if (string === gnirts) {
  		return true;
  	}
 	return false;
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
 	var d = new Date(year, month - 1, 1);
 	var n = new Date(year, month, 0);

 	function fixDays(weekday) { 
 		if (weekday == 0) {
 			weekday = 7;
 		} 
 		return weekday;
 	}

 	var table = '<table><tr>';

 	if (fixDays(d.getDay()) > 1) {
 		for (var i = 1; i < fixDays(d.getDay()); i++) {
 			table += '<td>' + "*" + '</td>';
 		}
 	}    

 	for (var i = 1; i <= n.getDate(); i++) {
 		table += '<td>' + i + '</td>';
 		if (fixDays(d.getDay()) == 7) {
 			table += '</tr><tr>';
 		}
 		d.setDate(d.getDate() + 1);
 	}


 	if (fixDays(n.getDay()) < 7) {
 		for (var i = fixDays(n.getDay()); i < 7; i++) {
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
 	if (typeof(objA) !== typeof(objB)) return false; 
 	if (typeof(objA) !== typeof({})) return objA === objB; 
 	if (Array.isArray(objA) != Array.isArray(objB)) return false; 
 	if (Object.keys(objA).length !== Object.keys(objB).length) return false; 
 	for(var key in objA) {
 		if (!isDeepEqual(objA[key], objB[key])) return false;
 	}
 	return true;
}
