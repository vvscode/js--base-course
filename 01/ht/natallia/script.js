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
  var a;
  for (var i = 1; i <= 100; i++) {
    a = i;
    i % 3 === 0 && (a = 'Fizz');
    i % 5 === 0 && (a = 'Buzz');
    i % 3 === 0 && i % 5 === 0 && (a = 'FizzBuzz');
    log(a);
  }
}

/**
 * реализовать фукнцию  `isPolindrom`,
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */

/**
 * function isPolindrom(textString) {
 *	var textStr = textString.toLowerCase();
 * var reverseTextStr = textStr.split('').reverse().join('');
 * return (textStr === reverseTextStr);
 *}
 */

/**
 * Сразу второй вариант)))
 */

function isPolindrom(textString) {
  var textStr = textString.toLowerCase();
  var halfLength = textStr.length / 2;
  for (var i = 0; i < halfLength; i++) {
    if (textStr[i] !== textStr[textStr.length - 1 - i]) {
      return false;
    }
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

var calendar = document.querySelector('#calendar');

function createCalendar(year, month) {
  var rows = [];
  --month;
  var d = new Date(year, month);
  var topRow = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  rows = [topRow];
  var mon = d.getMonth();
  var row = [];
  var numDaysOfMonth = 0;
  var i = 0;

  rows.push(row);

  while (i < getDay(d)) {
    row.push(null);
    i++;
  }

  while (i < 7) {
    row.push(d.getDate());
    d.setDate(d.getDate() + 1);
    i++;
    numDaysOfMonth++;
  }

  while (mon == d.getMonth()) {
    i = 0;

    if (i % 7 === 0) {
      var nextRow = [];
      rows.push(nextRow);

      while (i < 7 && mon == d.getMonth()) {
        d.setDate(d.getDate() + 1);
        numDaysOfMonth++;
        nextRow.push(numDaysOfMonth);
        i++;
      }

      while (i < 7) {
        nextRow.push(null);
        i++;
      }
    }
  }
  return rows;
}

function drawCalendar(year, month, htmlEl) {
  var result;
  var count = 0;
  var rows = createCalendar(year, month);
  result =
    '<table id="table" class="calendar__table"><tr class="calendar__row calendar__row--header">';

  rows.forEach(function(elem) {
    if (count === 0) {
      elem.forEach(function(el) {
        result +=
          '<th class="calendar__cell calendar__cell--header">' + el + '</th>';
      });
      result += '</tr>';
    } else {
      result += '<tr class="calendar__row">';
      elem.forEach(function(el) {
        if (!el) {
          result += '<td class="calendar__cell"></td>';
        } else {
          result += '<td class="calendar__cell">' + el + '</td>';
        }
      });
      result += '</tr>';
    }
    count++;
  });

  result += '</tr>';

  result += '</table>';
  htmlEl.innerHTML = result;
}

function getDay(date) {
  var day = date.getDay();

  if (day === 0) {
    day = 7;
    return day - 1;
  }
}

drawCalendar(2017, 9, calendar);

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
      if (!(objA.length === objB.length)) {
        return false;
      } else {
        for (var key in objA) {
          if (!isDeepEqual(objA[key], objB[key])) return false;
        }
        return true;
      }
    }
    return objA === objB;
  }
}

function spiral(arr) {
  var newArr = [];

  while (arr.length > 0) {
    var res = getSpiral(arr);
    res.forEach(function(el) {
      newArr.push(el);
    });
  }
  return newArr;
}

function getSpiral(arr) {
  var result = [];
  var a = [];
  result = result.concat(arr[0]);
  var del = arr.shift();
  if (arr.length > 0) {
    arr.forEach(function(elem) {
      if (elem !== arr[arr.length - 1] && elem.length > 0) {
        result.push(elem[elem.length - 1]);
        elem.length = elem.length - 1;
        a = a.concat(elem.splice(0, 1));
      }
      if (elem === arr[arr.length - 1] && arr.length > 0) {
        arr[arr.length - 1].reverse();
        result = result.concat(elem);
        arr.length = arr.length - 1;
      }
    });
    result = result.concat(a.reverse());
  }
  return result;
}

// function getSpiral(arr) {
//   var count = 0;
//   var result = [];
//
//   arr.forEach(function(elem) {
//     var len = elem.length;
//
//     if (count === 0 && len !== 0 && arr.length !== 1) {
//       elem.forEach(function(el) {
//         result.push(el);
//       });
//       count++;
//     } else if (count < arr.length - 1 && len !== 0) {
//       result.push(elem[len - 1]);
//       count++;
//       var a = elem.pop();
//     } else if (count === arr.length - 1 && len !== 0) {
//       var reverse = elem.reverse();
//       reverse.forEach(function(el) {
//         result.push(el);
//       });
//       count--;
//
//       while (count > 0) {
//         result.push(arr[count][0]);
//         var b = arr[count].shift();
//         count--;
//       }
//       arr.pop();
//       arr.shift();
//     } else {
//       result.push(arr[0]);
//       arr.pop();
//     }
//   });
//   return result;
// }

function quadraticEquation(a, b, c) {
  var arr = [];
  var d = Math.pow(b, 2) - 4 * a * c;

  if (d > 0) {
    var x1 = (-b + Math.sqrt(d)) / 2 * a;
    var x2 = (-b - Math.sqrt(d)) / 2 * a;
    arr.push(x1);
    arr.push(x2);
  } else if (d === 0) {
    var x1 = -b / 2 * a;
    arr.push(x1);
  }
  return arr;
}
