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
let arr = [];
for (let i=1; i<=100; i++) {
	arr[i-1]=i;
}
for (let i=3; i<=100; i=i+3) {
	arr[i-1]=`Fizz`;
}
for (let i=5; i<=100; i=i+5) {
	arr[i-1]=`Buzz`;
}
for (let i=15; i<=100; i=i+15) {
	arr[i-1]=`FizzBuzz`;
}
arr.forEach(function(elem) {
	log(elem);
});
}


/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
 	let polin=``;
	for (let i=textString.length-1; i>=0; i--) {
		polin+=textString[i];
	} 
	return textString===polin;
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
	let table = document.createElement(`table`); // create table
	table.innerHTML = `<thead><tr></tr></thead><tbody><tr></tr></tbody>`; // with head and body
	let thead = table.querySelector(`thead>tr`);
  let tbody = table.querySelector(`tbody`).lastElementChild;

	for (let i=0; i<7; i++) { // write in head days of week
		let th = document.createElement(`th`);
		let date = new Date (2017,10,13+i);
		let op = {weekday: 'short'}
		date.toLocaleString(`RU`,op);
		th.innerText = date.toLocaleString(`ru`,op).toUpperCase();
		thead.appendChild(th);
	}
	function checkTr() { // if a string of table is more 7 cells then create the next string of the table 
		if (tbody.querySelectorAll(`td`).length===7) {
			let tr = document.createElement(`tr`);
			table.querySelector(`tbody`).appendChild(tr);
			tbody = table.querySelector(`tbody`).lastElementChild;
		}
	}
  let date = new Date (year, month-1,1);
  let limit = date.getDay()>0 ? date.getDay() : 7; 
  for (let i=1; i<limit; i++) { //insert empty cells until first day of month
  	let td = document.createElement(`td`);
  	tbody.appendChild(td);
  }
  for (let i=1; i<32; i++) { //write days of month
  	let date = new Date (year, month-1,i);
  	if (date.getMonth()==month-1) {
  		let td = document.createElement(`td`);
  		td.innerText = date.getDate();
  		checkTr();
  		tbody.appendChild(td);
  	}
  }
  if (tbody.querySelectorAll(`td`).length<7) { //insert empty cells until the string end
  	for (let i=tbody.querySelectorAll(`td`).length; i<7 ;i++) {
  		let td = document.createElement(`td`);
  		tbody.appendChild(td);
  	}
  }
  htmlEl.appendChild(table); //paste table in DOM
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
