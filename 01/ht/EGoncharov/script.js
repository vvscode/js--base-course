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
	for (var i=1; i<=100; i++) {
    	i%3 == 0 && i%5 == 0 && log("FizzBuzz") ||
    	i%3 == 0 && log("Fizz") ||
    	i%5 == 0 && log("Buzz") ||
    	log(i);
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
	var result = true;
	for(var i=0, j=parseInt(textString.length/2), k=textString.length-1; i<j; i++, k--) {
		if(textString.charAt(i) != textString.charAt(k)) {
		result = false;
		break;
		}
	}
	return result;
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
    var mon = month - 1;
    var d = new Date(year, mon);
    var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
    for (var i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    while (d.getMonth() == mon) {
        table += '<td>' + d.getDate() + '</td>';
        if (getDay(d) % 7 == 6) {
          table += '</tr><tr>';
        }
        d.setDate(d.getDate() + 1);
    }

    if (getDay(d) != 0) {
        for (var i = getDay(d); i < 7; i++) {
          table += '<td></td>';
        }
    }

    table += '</tr></table>';
    htmlEl.innerHTML = table;
}

function getDay(date) {
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
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
	var result = false;
	if (objA === objB) {
		return true;
	} else if (objA === null || objB === null) {
		return false;
	} else {
		if (typeof(objA) === "object" || typeof(objB) === "object") {
			for (var key in objA) {
	    		if (JSON.stringify(objA[key]) === JSON.stringify(objB[key])) {
	      			result = true;
	    		} else {
	      			return false;
	    		}
	  		};
	  		return result;
		}
	}
}
