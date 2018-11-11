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
    const limit = 100;

    let testValue = {
       true: 'Fizz',
       false: 0
    }

    for(let i = 1; i <= limit; i++) {
       let result = i;
       testValue['false'] = i;

       testValue['true'] = 'Fizz';
       result = testValue[(i % 3 == 0) && (i % 15 != 0)];
       testValue['false'] = result;

       testValue['true'] = 'Buzz';
       result = testValue[(i % 5 == 0) && (i % 15 != 0)]
       testValue['false'] = result;

       testValue['true'] = 'FizzBuzz';
       result = testValue[(i % 15 == 0)]
       testValue['false'] = result;

       log(result)
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
 reversedString = textString.split("").reverse().join("");
 return reversedString == textString;
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
   let monthNumber = month-1;
   let currentMonth = new Date(year,monthNumber);
   let daysInMonth = new Date(currentMonth.getFullYear(),currentMonth.getMonth()+1,0).getDate(); // Количество дней месяца
   let monthDayLastName = new Date(currentMonth.getFullYear(),currentMonth.getMonth(),daysInMonth).getDay(); // День недели последнего дня месяца
   let monthDayFirstName = new Date(currentMonth.getFullYear(),currentMonth.getMonth(),1).getDay(); // День недели первого дня месяца
   let calendarTable = ("<table><tr>");

    if (monthDayFirstName!=0) // Добавляем пустые ячейки в начале месяца
    {
        for(let i=1; i<monthDayFirstName; i++)
        {
            calendarTable += ("<td/>");
        }
    }
    else // Если первый день воскресенье добавляем полную строку
    {
        for(let i=1; i<7; i++)
        {
            calendarTable += ("<td/>");
        }
    }
    for (let i = 1; i <= daysInMonth; i++) // заполняем таблицу днями
    {
        calendarTable += ("<td width=35>"+i+"</td>");
        if (new Date(currentMonth.getFullYear(),currentMonth.getMonth(),i).getDay() == 0)
        {
            calendarTable += ("</tr><tr>"); // Если день недели Воскресенье - перевод строки
        }
    }
    calendarTable += ("</tr></table>"); // Закрываем таблицу
    htmlEl.innerHTML = calendarTable;
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
   if (typeof objA !== typeof objB) return false;
   if(typeof objA != "object") return objA == objB;
   if(objA.length !== objB.length) return false;
   for(let key in objA) {
      if(!isDeepEqual(objA[key], objB[key])) return false;
   }
   return true;
}

/*
Написать тесты и саму функцию spiral, которая принимает на вход двумерный массив
и возвращает одномерный массив с элементами расположенными по спирали.
Матрица не обязательно имеет одинаковые размеры по обеим сторонам.
*/

function spiral(matrix) {
   let newArray = [];
   let dirrection = 0; // Направление: 0 - влево, 1 - вниз, 2 - влево, 3 - вверх
   let totallength = matrix.length * matrix[0].length; // Общее количество элементов
   let i = 0;
   let j = 0;
   while(newArray.length < totallength) {
      if(matrix[j][i] != undefined) {
         newArray.push(matrix[j][i]);
      }
      matrix[j][i] = undefined; // На место извлеченного элемента ставим undefined

      newI = i;
      newJ = j;

      // Меняем координаты на основании направления
      switch (dirrection) {
         case 0:
            newI++;
            break;
         case 1:
            newJ++;
            break;
         case 2:
            newI--;
            break;
         case 3:
            newJ--;
            break;
      }

      // Если вышли за пределы массива - меняем направление на следующее, иначе - меняем координаты
      if((newI < 0) || (newI >= matrix[0].length)
         || (newJ < 0) || (newJ >= matrix.length)
         || (matrix[newJ][newI] == undefined)
      ) {
         dirrection = (dirrection + 1) % 4;
      } else {
         i = newI;
         j = newJ;
      }

   }
   return newArray;
}

function quadraticEquation(a,b,c) {
   let d = b*b - 4*a*c;
   if(d < 0) return [];
   if(d == 0) return[-b/2*a];

   root1 = (- b + Math.sqrt(d)) / (2*a);
   root2 = (- b - Math.sqrt(d)) / (2*a);

   return [root1, root2];

}
