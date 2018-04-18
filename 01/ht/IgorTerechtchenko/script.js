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
  for (var i=1;i<=100;i++) {
    log(!(i%15)&&'FizzBuzz'||!(i%5)&&'Buzz'||!(i%3)&&'Fizz'||i);
  for (var i = 1; i <= 100; i++) {
    log(
      (!(i % 15) && 'FizzBuzz') ||
        (!(i % 5) && 'Buzz') ||
        (!(i % 3) && 'Fizz') ||
        i
    );
  }
}

/**
 * реализовать фукнцию  `isPolindrom`,
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */

//palindrome for O(n)
function isPolindrom(textString) {
  for(var i=0; i<textString.length; i++) {
    if (textString[i] !== textString[textString.length - i - 1]) { return false; }
  }
  return true
  for (var i = 0; i < textString.length; i++) {
    if (textString[i] !== textString[textString.length - i - 1]) {
      return false;
    }
  }
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
    //using linux 'cal' as an example
    var table = '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>';
    
    var date = new Date(year, month - 1);

    //filling in extra weekdays, if not starting with monday
    if (date.getDay() != 1) {
        table += '<tr>';
        for (var i = 1; i < date.getDay(); i++) {
            table += '<td></td>';
        }
    }

    while (date.getMonth() == month - 1) {
    //starting a row before monday
        if (date.getDay() == 1) {
            table += '<tr>';  
        }
        table += '<td>' + date.getDate() + '</td>';
    //closing a row after sunday 
        if (date.getDay() == 0) {
            table += '</tr>'; //
        }
        date.setDate(date.getDate() + 1);
    }

    //closing last row if last day wasn't monday
    if (date.getDay() != 1) {
        table += '</tr>';
    }

    htmlEl.innerHTML = table + '</table>';
  //using linux 'cal' as an example
  var table =
    '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>';

  var date = new Date(year, month - 1);

  //filling in extra weekdays, if not starting with monday
  if (date.getDay() != 1) {
    table += '<tr>';
    for (var i = 1; i < date.getDay(); i++) {
      table += '<td></td>';
    }
  }

  while (date.getMonth() == month - 1) {
    //starting a row before monday
    if (date.getDay() == 1) {
      table += '<tr>';
    }
    table += '<td>' + date.getDate() + '</td>';
    //closing a row after sunday
    if (date.getDay() == 0) {
      table += '</tr>'; //
    }
    date.setDate(date.getDate() + 1);
  }

  //closing last row if last day wasn't monday
  if (date.getDay() != 1) {
    table += '</tr>';
  }

  htmlEl.innerHTML = table + '</table>';
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
  if (objA.length !== objB.length) {
    return false;
  }

  if (typeof objA !== 'object') {
    return objA === objB;
  }

  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (var i in objA) {
    if (!isDeepEqual(objA[i], objB[i])) {
      return false;
    }
  }
  return true;
}

function spiral(array) {
  if(array.length === 1) {
    return array[0]
  }
  var result = []
  var array_element_count = 0
  var tmp_array = []
  for(var i in array) {array_element_count += array[i].length;}

  result = result.concat(array[0])

  //last element of every row, except first
  for(var i = 1; i <= array.length - 2; i++) {
    result = result.concat(array[i][array[i].length - 1])
  }
  result = result.concat(array[array.length-1].reverse())

  //checking if done
  if (result.length === array_element_count) {
    return result
  }

  //first element of every row, starting from last
  for(var i = array.length - 2; i > 0; i --) {
    result = result.concat(array[i][0])
  }
  //getting inner matrix for recursive call
  for(var i = 1; i < array.length - 1; i++) {
    tmp_array.push(array[i].slice(1,array[i].length-1))
  }

  result = result.concat(spiral(tmp_array))
  return result
}

function quadraticEquation(a, b, c) {
  var roots = []
  var discriminant = b * b - 4*a*c
  if(discriminant < 0) {
    return roots
  }
  if(discriminant === 0) {
    roots.push(-1 * b / 2 * a)
    return roots
  } else {
    roots.push((-1 * b + Math.sqrt(discriminant)) / 2 * a)
    roots.push((-1 * b - Math.sqrt(discriminant)) / 2 * a)
  }
  return roots
  if (array.length === 1) {
    return array[0];
  }
  var result = [];
  var array_element_count = 0;
  var tmp_array = [];
  for (var i in array) {
    array_element_count += array[i].length;
  }

  result = result.concat(array[0]);

  //last element of every row, except first
  for (var i = 1; i <= array.length - 2; i++) {
    result = result.concat(array[i][array[i].length - 1]);
  }
  result = result.concat(array[array.length - 1].reverse());

  //checking if done
  if (result.length === array_element_count) {
    return result;
  }

  //first element of every row, starting from last
  for (var i = array.length - 2; i > 0; i--) {
    result = result.concat(array[i][0]);
  }
  //getting inner matrix for recursive call
  for (var i = 1; i < array.length - 1; i++) {
    tmp_array.push(array[i].slice(1, array[i].length - 1));
  }

  result = result.concat(spiral(tmp_array));
  return result;
}

function quadraticEquation(a, b, c) {
  var roots = [];
  var discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return roots;
  }
  if (discriminant === 0) {
    roots.push(-1 * b / 2 * a);
    return roots;
  } else {
    roots.push((-1 * b + Math.sqrt(discriminant)) / 2 * a);
    roots.push((-1 * b - Math.sqrt(discriminant)) / 2 * a);
  }
  return roots;
}
