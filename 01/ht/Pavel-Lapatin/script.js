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
    var result ='';
    for (var i = 1; i<=100; i++){
        y=''; 
        i%3 ||  (y+='Fizz'); 
        i%5 || (y+='Buzz');
        y || (y=i);    
        result +=y+'\n';
    }    
    log(result);    
}
        
/**    
* реализовать фукнцию  `isPolindrom`,     
* которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),    
* является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет 
* @param {string} textString 
* @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
*/
function isPolindrom(textString) {
    var textStringUpperCase = textString.toUpperCase();
    var reversString = textStringUpperCase.split("").reverse().join("");   
    return textStringUpperCase === reversString;
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
    htmlEl.innerHTML = "";    
    var daysOfWeek = {1: "пн", 2: "вт", 3: "ср", 4: "чт", 5: "пт", 6: "сб", 7: "вс"}    
    var daysCount = (32 - new Date(year, --month, 32).getDate());
    var currDay = (new Date(year, month)).getDay() || 7;  
    
    //Create a table
    
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    //Create table header
    
    var row = document.createElement("tr");    
    for (var j = 1; j <= 7; j++) {
        var cell = document.createElement("td");
        cell.innerText = (daysOfWeek[j]);
        row.appendChild(cell);
    }
    tblBody.appendChild(row);
    
        //Create cells
    var i = -currDay+2;
    while (i<=daysCount){
        var row = document.createElement("tr");    
        for (var j = 0; j < 7; j++) {
            var cell = document.createElement("td");
            cell.innerText = (i<1 || i>daysCount ? "" : i);
            i++;
            row.appendChild(cell);
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    htmlEl.appendChild(tblBody);
    //tbl.setAttribute("border", "1");    
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
    if (typeof(objA) ===  'object'){
        if(Object.keys(objA).length !== Object.keys(objB).length){
            return false;
        }
        for (var keyA in objA){ 
            if(keyA in objB){
                if(!isDeepEqual(objA[keyA], objB[keyA])) {
                    return false;
                } 
            } else {return false}
        }
        return true;
    } else {
        return objA == objB;
    }
}
