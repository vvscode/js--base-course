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
	for (var i= 1; i <= 100; i++) {
		
		i % 3 == 0 && i % 5 == 0 && log('FizzBuzz') ||
		i % 3 == 0 && log('Fizz') ||
		i % 5 ===0 && log('Buzz') ||
		
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

	if (textString == textString.split("").reverse().join("")) {
			return true;
		}
	else {
 			return false;
 }
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
    
        var jsMonth = month - 1;
        var date = new Date(year, jsMonth, 1);
        var tdCountBeforeFirst = date.getDay() - 1;
        var lastDay = new Date(year, month, 0);
        var daysCount = lastDay.getDate();
        var lastWeekDay = lastDay.getDay();
        if (lastDay.getDay() === 0) {
          lastWeekDay = 7;
        };
        var tdCountAfterLast = 7 - lastWeekDay;
        var totalCellCount = tdCountBeforeFirst + tdCountAfterLast + daysCount;
        var calendar = document.createElement('div');
        
        calendar.insertAdjacentHTML('beforeEnd', '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr></table>');
        var cell, n = 1 - tdCountBeforeFirst;
    
        for (var i = 0; i < totalCellCount / 7; i++ ) {
          
            calendar.lastChild.lastChild.insertAdjacentHTML('beforeEnd', '<tr></tr>');
    
            for (var j = 0; j < 7; j++) {
                if (n > 0 && n <= daysCount) {
                    cell = '<td>' + n + '</td>';
                } else {
                    cell = '<td></td>';
                }; 
                calendar.lastChild.lastChild.lastChild.insertAdjacentHTML('beforeEnd', cell);
                n++; 
            }
        };
        htmlEl.innerHTML = '';
        htmlEl.appendChild(calendar);
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
    if (typeof objA === 'object' && typeof objB === 'object') {
        if (objA === null || objB === null) {
            return objA === objB;
        }

        if (Object.keys(objA).length !== Object.keys(objB).length) {
            return false;
        }

        for (var key in objA) {
            if (!objB.hasOwnProperty(key) || !isDeepEqual(objA[key], objB[key])) {
                return false;
            }
        }

        return true;
    }

    if (typeof objA === 'function' && typeof objB === 'function') {
        return objA.toString() === objB.toString();
    }

    if (typeof objA === 'number'&& typeof objB === 'number' && isNaN(objA) && isNaN(objB)) {
        return true;
    }

    return objA === objB;
}
