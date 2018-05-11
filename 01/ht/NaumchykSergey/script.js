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
  for (var i = 1; i <= 100; i++) {
    log(getFizzBuzz(i));
  }
}

function getFizzBuzz(i) {
  var arr3 = { 0: "" };
  var arr5 = { 0: "" };
  var arr0 = { Fizz: "", Buzz: "", FizzBuzz: "", "": i };
  arr3[i % 3] = "Fizz";
  arr5[i % 5] = "Buzz";

  var result = arr3[0] + arr5[0];
  result += arr0[result];
  return result;
}

/**
 * реализовать фукнцию  `isPolindrom`,
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
  var arr = textString.toString().split("");
  while (arr.length <= 1 || arr.shift() === arr.pop()) {
    while (arr.length <= 1) {
      return true;
    }
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
  month -= 1;
  var table =
    "<tr><td>пн</td><td>вт</td><td>ср</td><td>чт</td><td>пт</td><td>сб</td><td>вс</td></tr>";
  var i;
  var d = new Date(year, month, 1);

  while (+d.getMonth() === +month) {
    var start = +d.getDate() === 1 ? getRealDay(d) : 1;
    table += "<tr>";
    for (i = 1; i <= 7; i++) {
      table +=
        "<td>" +
        (+d.getMonth() === +month && i >= start ? d.getDate() : "") +
        "</td>";
      if (+d.getMonth() === +month && i >= start) {
        d.setDate(d.getDate() + 1);
      }
    }
    table += "</tr>";
  }
  table = "<table>" + table + "</table>";
  htmlEl.innerHTML = table;
}

function getRealDay(date) {
  return +date.getDay() === 0 ? 7 : +date.getDay();
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
  return isDeepEqualOne(objA, objB) && isDeepEqualOne(objB, objA);
}

function isDeepEqualOne(a, b) {
  switch (typeof a) {
    case "undefined":
      return typeof b === "undefined";
    case "boolean":
      return a === b;
    case "number":
      return a === b;
    case "string":
      return a === b;
    case "object":
      if (a === null && b !== null) return false;
      for (var key in a) if (!isDeepEqualOne(a[key], b[key])) return false;
  }
  return true;
}

/**
 * проходится по спирали многомерного массива
 * и возвращает одномерный
 * @param inputArr
 * @returns {Array}
 */
function spiral(inputArr) {
  var arr = Object.assign(inputArr);
  var result = [];

  while (arr.length >= 1) {
    arr.shift().forEach(function(v) {
      result.push(v);
    });
    if (arr.length === 0) return result;
    arr.forEach(function(v) {
      result.push(v.pop());
    });
    if (arr.length === 0) return result;
    while (arr[arr.length - 1].length > 0) {
      result.push(arr[arr.length - 1].pop());
    }
    arr.pop();

    for (var i = arr.length - 1; i >= 0; i--) {
      result.push(arr[i].shift());
    }
    if (arr[0] && arr[0].length === 0) return result;
  }

  return result;
}

function quadraticEquation(a, b, c) {
  if (a === 0) return [-(c / b)];

  let D = Math.pow(b, 2) - 4 * a * c;
  if (D < 0) return [];
  else if (D === 0) return [-b / (2 * a)];
  else if (D > 0)
    return [-(b + Math.sqrt(D)) / (2 * a), -(b - Math.sqrt(D)) / (2 * a)];
}
