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
    for(let i = 1; i <= 100; i++)
    {
        log(i % 3 === 0 && i % 5 === 0 && 'FizzBuzz' ||
            i % 3 === 0 && 'Fizz' ||
            i % 5 === 0 && 'Buzz' || i);
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
 let lastIndex = textString.length - 1;
 for(let i = 0; i < lastIndex/2; i++)
 {
     if(!(textString[i].toLowerCase() === textString[lastIndex-i].toLowerCase()))
     {
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
function drawCalendar(year, month, htmlEl) {
    /* Ваше решение */
    const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let numberOfDays = month === 2 && isLeapYear(year) ? 29 : monthLengths[month-1];
    let date = new Date(Date.UTC(year, month-1, 1));
    let offset = date.getDay();

    renderCalendar(numberOfDays, offset, htmlEl);
}

function isLeapYear(n)
{
    return n % 400 === 0 || (n % 4 === 0 && n % 100 != 0);
}

function formatNumber(n)
{
    if (n < 10) return "&nbsp;"+n;
    return n;
}

function renderCalendar(numberOfDays, offset, htmlEl)
{
    htmlEl.innerHTML = "ПН ВТ СР ЧТ ПТ СБ ВС <br>";
    let position = 0;
    for (let i = 0; i < offset; i++)
    {
        htmlEl.innerHTML += "&nbsp;&nbsp;&nbsp;";
        position++;
    }

    for (let i = 1; i <= numberOfDays; i++)
    {
        htmlEl.innerHTML += formatNumber(i) + "&nbsp;";
        position++;
        if (position >= 7)
        {
            position = 0;
            htmlEl.innerHTML += "<br>";
        }
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
 /* Ваше решение */
  if (typeof(objA)==="object" && objA != null && typeof(objB) === "object" && objB != null)
  {
      if (Object.values(objA).length != Object.values(objB).length)
      {
          return false;
      }

      for(let prop in objA)
      {
          if (!isDeepEqual(objA[prop], objB[prop]))
          {
              return false;
          }
      }

      return true;
  }

  // primitive types comparison
  return objA == objB;
}
