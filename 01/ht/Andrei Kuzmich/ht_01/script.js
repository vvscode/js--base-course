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
 /* Ваше решение */
 for (i=1; i<101; i++){
    
    var FB = i%15;
    var B = i%5;
    var F = i%3;
    log(((FB===0 && 'FizzBuzz') || (F===0 && 'Fizz') || (B===0 && 'Buzz') || i));
 }
}
//fizzBuzz();


/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
 
     var letters = textString.split(''); 
     var revLetters = textString.split('').reverse();
 
     var Str = textString.split('').reverse().join("");
     return textString == Str;
 
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
        
        var mon = month - 1; 
        var d = new Date(year, mon);
  
        var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
  
        
         for (var i = 0; i < getDay(d); i++) {
          table += '<td></td>';
        }
  
       
        while (d.getMonth() === mon) {
          table += '<td>' + d.getDate() + '</td>';
  
          if (getDay(d) % 7 === 6) { 
            table += '</tr><tr>';
          }
  
          d.setDate(d.getDate()+1);
        }
  
       
        if (getDay(d) != 0) {
          for (var i = getDay(d); i < 7; i++) {
            table += '<td></td>';
          }
        }
  
       
        table += '</tr></table>';
  
       
        htmlEl.innerHTML = table;
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
/*function isDeepEqual(objA, objB) {
 
 return undefined;
}}*/


function isDeepEqual(objA, objB) {
  if (typeof (objA) !== "object" && objA === null && 
      typeof (objB) !== "object" && objB === null){
         return false;
               }
   if (objA===objB) {
       return true;
   }
 
       var objAcounter = 0, objBcounter = 0;
   for (var prop in objA) {
       objAcounter ++;
        
   }
   for (var prop in objB) {
       objBcounter ++;
       
       if (!(prop in objA) || (!isDeepEqual(objA[prop], objB[prop]))) {
           return false;        
       }
   }        
   return objAcounter=== objBcounter;
}

