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
  var showed = false;
  var i;
  for (i = 1; i <= 100; i++) {
    showed = false;
    while (i % 3 === 0 && i % 5 === 0) {
      log('FizzBuzz');
      showed = true;
      break;
    }

    while (!showed && i % 3 === 0) {
      log('Fizz');
      showed = true;
      break;
    }

    while (!showed && i % 5 === 0) {
      log('Buzz');
      showed = true;
      break;
    }
    while (!showed) {
      log(i);
      break;
    }
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
  return (
    textString ===
    textString
      .split('')
      .reverse()
      .join('')
  );
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
  var calendar = new Date(year, month);
  var weekday=["Mo","Tu","We","Th","Fr","Sa", "Su"];
  var months=["Jan", "Feb","Mar","Apr","May","Jun","Jul", "Aug","Sep","Oct","Nov","Dec"];
  


  console.log(calendar);

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

  result =result.concat(spiral(tmp_array))
  console.log(typeof(result))
  return result
}

//console.log(spiral([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // [1,2,3,6,7,8,7,4,5]
