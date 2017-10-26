/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Функция вывода строк для работы в fizzBuzz
 * @param {*} a
 */

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
 /* Ваше решение */

 for (var i = 1; i <= 100; i++) {

   var item = !(i % 15) && 'FizzBuzz' || !(i % 3) && 'Fizz' || !(i % 5) && 'Buzz' || i;

        log(item);
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
 /* Ваше решение */

    return textString == textString.split('').reverse().join('');

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
  var elem = document.getElementById(htmlElem);

  var myMonth = month - 1;
  var myDate = new Date(year, myMonth);
  var daysOfTheWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  var table = "<table border=\"1\" cellspacing=\"0\" cellpadding=\"2\" align=\"center\">";
  //заполняем первую строку днями недели
  table += "<tr>";
  for (var i = 0; i < daysOfTheWeek.length; i++) {
    table += "<td>" + daysOfTheWeek[i] + "</td>";
  }
  table += "</tr>";

  //заполняем первый ряд пустыми ячейками от  понедельника и до дня первого числа месяца

  for (var i = 0; i < getDay(myDate); i++) {
    table += "<td></td>";
  }

  //заполняем ячейки календаря датами

  while (myDate.getMonth() === myMonth) {

    table += "<td>" + myDate.getDate() + "</td>";

    if (getDay(myDate) % 7 === 6) {
      table += "<tr></tr>";
    }
    myDate.setDate(myDate.getDate() + 1);
  }

  //заполняем оставшиеся дни пустыми ячейками,если нужно
  if (getDay(myDate) !== 0) {
    for (var i = getDay(myDate); i < 7; i++) {
      table += "<td></td>";
    }
  }

  //закрыли таблицу
  table += "</tr></table>";

  elem.innerHTML = table;

}

function getDay(date) {
  var day = date.getDay();
  if (day === 0) day = 7;

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
  if(typeof(objA) !== typeof(objB)) return false;
  if(typeof(objA) !== 'Object') return objA === objB;

  if(Array.isAraray(objA).length !== Array.isAraray(objB))
    return false;
  if(Oject.keys(objA).length !== Object.keys(objB).length)
    return false;

    for(var key in objA){
      if(!isDeepEqual(objA[key],objB[key]))
        return false;
    }
    return true;

}
