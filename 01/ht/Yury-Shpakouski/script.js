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
	var str=i;
	for(j=1;j>i%3;j--){
	str="Fizz";
	}
	for(j=1;j>i%5;j--){
	str="Buzz";
	}
	for(j=1;j>i%3 && j>i%5;j--){
	str="FizzBuzz";
	}
	log(str);
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
 var rev = textString.split("").reverse().join("");
 if (rev == textString) return true;
 else return false;
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
   var elem = document.external:HTMLElement(htmlEl);

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

      elem.innerHTML = table;
    }

    function getDay(date) { 
      var day = date.getDay();
      if (day == 0) day = 7;
      return day - 1;
    }



    drawCalendar("calendar", 2012, 9)
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
