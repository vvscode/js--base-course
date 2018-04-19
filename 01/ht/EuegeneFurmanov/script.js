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

/* Разместите ваш код ниже */

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
    for (var a = 1; a <= 100; a++) {
        ((a % 3) === 0 && (a % 5) === 0 && log('FizzBuzz')) ||
        (a % 3) === 0 && log('Fizz') ||
        (a % 5) === 0 && log('Buzz') ||
        log(a);
    }
}

/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинаково читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(str) {
    var isEqual = str.split('').reverse().join('');
    if (isEqual === str) {
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
    var countOfDaysInMonth = {
        0: 31,
        1: 28,
        2: 31,
        3: 30,
        4: 31,
        5: 30,
        6: 31,
        7: 31,
        8: 30,
        9: 31,
        10: 30,
        11: 31
    };

    var calendar =
        '<table>' +
            '<tr>' +
                '<td>пн</td>' +
                '<td>вт</td>' +
                '<td>ср</td>' +
                '<td>чт</td>' +
                '<td>пт</td>' +
                '<td>сб</td>' +
                '<td>вс</td>' +
            '</tr>';

    var date = new Date(year, month);
    var daysInMonth;

    // проверка года на високосность
    var isLeapYear = (date.getFullYear() % 4 == 0) && (date.getFullYear() % 100 != 0) ||
    (date.getFullYear() % 400 == 0) ? true : false;

    // рассчет количества дней в заданном месяце
    for (var key in countOfDaysInMonth) {
        if (key == (date.getMonth() - 1)) {
            daysInMonth = countOfDaysInMonth[key];
            break;
        }
    }

    // если выбран февраль и год високосный, то увеличить до 29 дней
    if (date.getMonth() == 2 && isLeapYear) {
        daysInMonth++;
    }

    // построение таблицы с календарем
    calendar += '<tr>';
    for (var i = 1; i <= daysInMonth; i++) {

        calendar += '<td>' + i + '</td>';

        if (i % 7 == 0) {
            calendar += '</tr><tr>';
        }
    }

    return htmlEl.innerHTML = calendar + '</table>';
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

    if (typeof objA === typeof objB) {
        if (typeof objA === 'object' && typeof objB === 'object') {
            if (objA.length === objB.length) {
                for (var key in objA) {
                    if (!isDeepEqual(objA[key], objB[key])) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        return objA === objB;
    }

}

/**
* Написать тесты и саму функцию spiral, которая принимает на вход двумерный массив
* и возвращает одномерный массив с элементами расположенными по спирали.
* Матрица не обязательно имеет одинаковые размеры по обеим сторонам. 
*/

function spiral(arr) {

	var width = arr[0].length;
	var height = arr.length;

	var resultArray = [];
	var index = 0;

	while (true)
	{
	    // слева направо
	    for (var i = 0; i < width; i++) {
	        resultArray[index++] = arr[0][i];
	    }
	    arr.splice(0,1);
	    if (!--height) { break; }

		// сверху вниз
	    for (var i = 0; i < height; i++) {
	        resultArray[index++] = arr[i][width - 1];
	        arr[i].splice(width - 1, 1);
	    }
	    if (!--width) { break; }

	    // справа налево
	    for (var i = 0; i < width; i++) {
	        resultArray[index++] = arr[height - 1][width - (i + 1)];
	    }
	    arr.splice(height - 1, 1);
	    if (!--height) { break; }

	    // снизу вверх
	    for (var i = 0; i < height; i++) {
	        resultArray[index++] = arr[height - (i + 1)][0];
	        arr[height - (i + 1)].splice(0, 1);
	    }
	    if (!--width) { break; }
	}

	return resultArray;
}


/**
* Написать тесты и саму функцию quadraticEquation, которая на вход принимает коэффициенты
* квадратного уравнения, а возвращает массив с вещественными корнями этого уравнения (если они есть).
*/

function quadraticEquation(a, b, c) {
    var result = [];
	var d = Math.pow(b, 2) - 4 * a * c;

	if (d < 0) {
	    return result;
	} else if (d === 0) {
        result[0] = (-b + Math.sqrt(d)) / 2 * a;
	} else {
	    result[0] = (-b + Math.sqrt(d)) / 2 * a;
	    result[1] = (-b - Math.sqrt(d)) / 2 * a;
	}

	return result;
}