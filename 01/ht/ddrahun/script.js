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
  var printer = {
    "3": () => {
      log(`Fizz`);
    },
    "5": () => {
      log(`Buzz`);
    },
    "35": () => {
      log(`FizzBuzz`);
    },
    undefined: number => {
      log(number);
    }
  };

  for (var i = 1; i <= 100; i++) {
    var dividers = getDividersAndIsItDivided(i, 3, 5);
    var indexOfDivider = Object.values(dividers).lastIndexOf(true);
    var divider = Object.keys(dividers)[indexOfDivider];
    printer[divider](i);
  }

  function getDividersAndIsItDivided(dividend, ...dividers) {
    var dividersAndIsItDivided = {};

    for (let i of dividers) {
      dividersAndIsItDivided[i] = dividend % i === 0;
    }

    var allDividers = dividers.join("");
    var isDividedByAllDividers = !Object.values(
      dividersAndIsItDivided
    ).includes(false);
    dividersAndIsItDivided[allDividers] = isDividedByAllDividers;

    return dividersAndIsItDivided;
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
  var elNumber = textString.length - 1;

  for (var i = elNumber; i > elNumber / 2; i--) {
    if (textString[i] !== textString[elNumber - i]) return false;
  }
  return true;
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
  var daysOfWeek = {
    0: "ВС",
    1: "ПН",
    2: "ВТ",
    3: "СР",
    4: "ЧТ",
    5: "ПТ",
    6: "СБ"
  };
  var jsMonth = month - 1;
  var lastDayNumber = getLastDayOfMonth(year, jsMonth);
  var table = getCalendarTable(year, jsMonth, lastDayNumber);
  var rowsNumber = table.getElementsByTagName("tr").length;
  var firstDayOfWeek = new Date(year, jsMonth, 1).getDay();

  for (var i = 1, day = 1; i < rowsNumber; i++) {
    var row = table.children[i];

    for (var cell = 0; cell < Object.keys(daysOfWeek).length; cell++) {
      if (day > lastDayNumber) break;
      if (cell < firstDayOfWeek && day == 1) {
        addTd(row, "");
      } else {
        addTd(row, day);
        day++;
      }
    }
  }

  htmlEl.innerHTML = table.outerHTML;

  function getLastDayOfMonth(year, month) {
    for (var i = 28; i <= 31; i++) {
      if (new Date(year, month, i).getMonth() > month) return i - 1;
    }
    return i - 1;
  }

  function getCalendarTable(year, jsMonth, lastDateNumber) {
    var table = document.createElement("table");
    table.style.border = 1;
    var header = table.appendChild(document.createElement("tr"));
    var rowsNumber = getNumberOfRows(year, jsMonth, lastDateNumber);

    for (var key in daysOfWeek) {
      var th = document.createElement("th");
      th.textContent = daysOfWeek[key];
      header.appendChild(th);
    }

    for (var i = 0; i < rowsNumber; i++) {
      table.appendChild(document.createElement("tr"));
    }

    return table;

    function getNumberOfRows(year, jsMonth, lastDateNumber) {
      var firstDayOfWeek = new Date(year, jsMonth, 1);
      var positionInWeek = firstDayOfWeek.getDay();
      var allCells = lastDateNumber + positionInWeek;
      var allRows = allCells / 7;

      return allCells % 7 > 0 ? allRows + 1 : allRows;
    }
  }

  function addTd(row, text) {
    var td = document.createElement("td");
    td.innerHTML = text;
    row.appendChild(td);
  }
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
  return !areArrays(objA, objB) && !areObjects(objA, objB)
    ? objA == objB
    : areObjectsEqual(objA, objB);

  function areObjects(objA, objB) {
    return (
      typeof objA == "object" &&
      typeof objB == "object" &&
      !Array.isArray(objA) &&
      !Array.isArray(objB)
    );
  }

  function areArrays(objA, objB) {
    return Array.isArray(objA) && Array.isArray(objB);
  }

  function areObjectsEqual(objA, objB) {
    if (Object.keys(objA).length !== Object.keys(objB).length) return false;
    for (var key in objA) {
      if (key in objB) {
        if (
          areObjects(objA[key], objB[key]) ||
          areArrays(objA[key], objB[key])
        ) {
          areObjectsEqual(objA[key], objB[key]);
        } else {
          if (objA[key] === objB[key]) continue;
          else return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }
}
/**
 * Написать функцию `quadraticEquation`
 * которая на вход принимает коэффициенты квадратного уравнения,
 * а возвращает массив с вещественными корнями этого уравнения (если они есть)
 * @param {number}
 * @param {number}
 * @param {number}
 * @return {array}
 */
function quadraticEquation(a, b, c) {
  var array = [];
  var discriminant = Math.pow(b, 2) - 4 * a * c;

  if (discriminant > 0) {
    array.push((-b + Math.sqrt(discriminant)) / (2 * a));
    array.push((-b - Math.sqrt(discriminant)) / (2 * a));
  } else if (discriminant === 0) {
    array.push(-b / (2 * a));
  }

  return array;
}
/**
 * Написать функцию `spiral`
 * которая принимает на вход двумерный массив и возвращает
 * одномерный массив с элементами расположенными по спирали.
 * Матрица не обязательно имеет одинаковые размеры по обеим сторонам.
 * @param {multiDimensionalArray}
 * @return {oneDimensionalArray}
 */

function spiral(arr) {
  var res = [];

  while (arr.length > 0) {
    PuOneDimArray(arr, true);
    if (arr.length == 0) break;
    PutLastElements(arr);
    if (arr.length == 0) break;
    PuOneDimArray(arr, false);
    if (arr.length == 0) break;
    PutFirstElements(arr);
  }

  return res;

  function PuOneDimArray(multiDimArr, isFirst) {
    var array = isFirst ? multiDimArr.shift() : multiDimArr.pop().reverse();

    for (let i = 0; i < array.length; i++) {
      res.push(array[i]);
    }
  }

  function PutLastElements(multiDimArr) {
    for (let i = 0; i < multiDimArr.length; i++) {
      var lastElement = multiDimArr[i].pop();
      res.push(lastElement);
    }
  }

  function PutFirstElements(multiDimArr) {
    for (let i = multiDimArr.length - 1; i >= 0; i--) {
      var firstElement = multiDimArr[i].shift();
      res.push(firstElement);
    }
  }
}
