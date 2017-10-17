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
	for(var i = 1; i <= 100; i++) {
		var message = i % 5 == 0 && i % 3 == 0 && "FizzBuzz" || i % 3 == 0 && "Fizz" || i % 5 == 0 && "Buzz" || i;
		log(message);
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
	var revertedString = textString.split('').reverse().join('');
	return textString.toLowerCase() === revertedString.toLowerCase();
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
	var belWeek = [1, 2, 3, 4, 5, 6, 0];
	var weekDays = {0: "Вс", 1: "Пн", 2: "Вт", 3: "Ср", 4: "Чт", 5: "Пт", 6: "Сб"};

	var day = new Date(year, month - 1);
	var caption = day.toLocaleString("ru", {month: 'long'});
	var calendarHeader = belWeek.map(function(day) { return `<th>${weekDays[day]}</th>`}).join("");

	var calendarBody = "<tr>";
	for(var i = 0; belWeek[i] != day.getDay(); i++) {
		calendarBody += "<td></td>";
	}

	while(month - 1 == day.getMonth()) {
		if(day.getDay() == 1) calendarBody += "<tr>";
  		calendarBody += `<td>${day.getDate()}</td>`;
		if(day.getDay() == 0) calendarBody += "</tr>";
		day.setDate(day.getDate() + 1);
  	}

  	if(day.getDay() !== 0) calendarBody += "</tr>";

	htmlEl.innerHTML = `<table><caption>${caption}</caption><tr>${calendarHeader}</tr>${calendarBody}</table>`;
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
	if(objA === objB) return true;
	if (objA == null && objB == null) return true;
	if (objA == null || objB == null) return false;
	if(typeof objA !== "object" && typeof objB !== "object") return objA === objB;

	var objAKeys = Object.keys(objA);
	var objBKeys = Object.keys(objB);

	if(objAKeys.length !== objBKeys.length) return false;

	return !objAKeys.some(function(key) {
		if(!objBKeys.includes(key)) return true;
		return !isDeepEqual(objA[key], objB[key]);
	});
}
