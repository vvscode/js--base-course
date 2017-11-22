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

  for (var a = 1; a <= 100; a++) {
    var c = (a % 15 === 0) && 'FizzBuzz' ||
      (a % 3 === 0) && 'Fizz' ||
      (a % 5 === 0) && 'Buzz' ||
      a;
    log(c)
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

    for(var i = 0; i <= textString.length / 2; i++){
        if( textString.charAt(i) !== textString.charAt( (textString.length - 1) - i) ) { // проверяем первую и последнюю буквы
            result = false;
            break;
        }
    }

    return result;
}

/*
 Реализовать фукнцию `drawCalendar` , 
 которая принимает три аргумента - год, месяц, htmlElement 
 и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).  
 @param {number} year 
 @param {number} month - номер месяца, начиная с 1
 @param {external:HTMLElement} htmlEl 
 */

function drawCalendar(year, month, htmlEl) {
  var date = new Date(year, (month - 1), 1);
  var dateInMonth = new Date(year, month, 0);
  var str =
    "<h4>Заголовки в таблице:</h4>" +
    '<table>' +
    '<tr>' +
    '<th>Пн</th>' +
    '<th>Вт</th>' +
    '<th>Ср</th>' +
    '<th>Чт</th>' +
    '<th>Пт.</th>' +
    '<th>Сб</th>' +
    '<th>Вс</th>' +
    '</tr>';

  var day = date.getDay();

  if (day === 0) {
    day = 7;
  }

  if (day !== 1) {
    str += "<tr>";
    for (var i = 1; i < day; i++) {
      str += "<td></td>";
    }
  }

  for (var index = 1; index <= dateInMonth.getDate(); index++) {

    switch (date.getDay()) {
      case 1: {
        str += "<tr><td>" + date.getDate() + "</td>";
        date.setDate(index + 1);
        break;
      }
      case 0: {
        str += "<td>" + date.getDate() + "</td></tr>";
        date.setDate(index + 1);
        break;
      }
      default: {
        str += "<td>" + date.getDate() + "</td>";
        date.setDate(index + 1)
      }
        break;
    }
  }

  if (dateInMonth.getDay() === 0) {
    str += "</table>";
  } else {
    str += "</tr></table>";
  }

  htmlEl.innerHTML = str;
}

/*
 Написать функцию `isDeepEqual`
 которая принимает на вход двe переменных
 и проверяет идентичны ли они по содержимому. Например
 @param {*} objA 
 param {*} objB 
 @return {boolean} идентичны ли параметры по содержимому
 */

function isDeepEqual(objA, objB) {

  if (typeof(objA) !== 'object' && typeof(objB) !== 'object') {
    return objA === objB;
  }

  if (objA === objB && objA === null) {
    return true;
  }

  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (var key in objA) {
    if (!isDeepEqual(objA[key], objB[key])) {
      return false;
    }
  }


  
  return true;
}

