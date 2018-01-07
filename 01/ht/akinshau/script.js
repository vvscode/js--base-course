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
    var date = new Date(year, month - 1, 1);
    var numOfDaysInMonth = new Date(year, month, 0).getDate();
    var initialDay = date.getDay() - 1;

    if(initialDay === -1) {
        initialDay = 6;
    }

    var numOfCalendarRows = Math.ceil( (initialDay + numOfDaysInMonth)/7 );
    var numOfCalendarCells = numOfCalendarRows * 7;
    var arrOfCalendarCells = [];

    for(var z=0; z<numOfCalendarCells; z++){
        arrOfCalendarCells[z] = "<td></td>"
    }

    for( var x=initialDay; x<numOfCalendarCells; x++ ){
        if ( (x - initialDay) < numOfDaysInMonth ) {
            var day = x - initialDay + 1;
            arrOfCalendarCells[x] = "<td>" + day + "</td>";
        }
    }

    var resultCalendarMatrix = [];

    for(i=0; i<numOfCalendarRows; i++){
        var week = arrOfCalendarCells.splice(0, 7).join("");
        resultCalendarMatrix[i] = "<tr>" + week + "</tr>";
    }
    resultCalendarMatrix = resultCalendarMatrix.join("");
    htmlEl.innerHTML = "<table cellpadding=5 border=1>" + resultCalendarMatrix + "</table>";
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
  var A = objA;
  var B = objB;

  if (typeof(A) !== typeof(B)) {
    return false;
  } else if (typeof(A) === typeof(B) && typeof(A !== 'object') || typeof(A === 'function')) {
    return A === B;
  } else if (typeof(A) === typeof(B) && typeof(A === 'object')) {
    if (Object.keys(A).length === Object.keys(B).length){
      for (var key in A) {
        if (!isDeepEqual(A[key], B[key])) return false;
 	    }
    }
  }
}
