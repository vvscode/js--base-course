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
 for ( i=1; i<=100; i++ )
 {
     ( i%3 === 0 && i%5 === 0 ) && log('FizzBuzz');
     ( i%3 === 0 && i%5 !== 0 ) && log('Fizz');
     ( i%3 !==0 && i%5 === 0 ) && log('Buzz');
     ( i%3 !== 0 && i%5 !==0) && log(i);
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
 var textStringRevers = textString.split('').reverse().join('');
 return (textStringRevers==textString);
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
    var monthNumber = month-1; // Перевод номера месяца без изменения глобального значения
    var monthName = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    var currentMonth = new Date(year,monthNumber);
    var monthDayTotal = new Date(currentMonth.getFullYear(),currentMonth.getMonth()+1,0).getDate(); // Количество дней месяца
    var monthDayLastName = new Date(currentMonth.getFullYear(),currentMonth.getMonth(),monthDayTotal).getDay(); // День недели последнего дня месяца
    var monthDayFirstName = new Date(currentMonth.getFullYear(),currentMonth.getMonth(),1).getDay(); // День недели первого дня месяца
    var calendarTable = ("<table><tr>");
    calendarTable += ("<p><b>"+monthName[monthNumber]+" "+year+"</b></p>"); // Собираем таблицу
    calendarTable += ("<td width=35>"+"Пн"+"</td>");
    calendarTable += ("<td width=35>"+"Вт"+"</td>");
    calendarTable += ("<td width=35>"+"Ср"+"</td>");
    calendarTable += ("<td width=35>"+"Чт"+"</td>");
    calendarTable += ("<td width=35>"+"Пт"+"</td>");
    calendarTable += ("<td width=35>"+"Сб"+"</td>");
    calendarTable += ("<td width=35>"+"Вс"+"</td></tr>");
    calendarTable += ("<tr>");
    if (monthDayFirstName!=0) // Добавляем пустые ячейки в начале месяца
    {
        for(var i=1; i<monthDayFirstName; i++)
        {
            calendarTable += ("<td/>");
        }
    }
    else // Если первый день воскресенье добавляем полную строку
    {
        for(var i=1; i<7; i++)
        {
            calendarTable += ("<td/>");
        }
    }
    for (var i = 1; i <= monthDayTotal; i++) // заполняем таблицу днями
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
 /* Ваше решение */
    if (typeof objA !== typeof objB) return false; // Сначала проверяем объекты
    if (typeof(objA) === 'object' && typeof(objB) === 'object') // Проверка вложенных объектов
    {
        if(objA.length !== objB.length)	return false;
        for(var key in objA)
        {
            if (!isDeepEqual(objA[key], objB[key])) return false;
        }
		return true;
	}
    if (objA !== "object" || objB !== "object") return ( objA == objB ); // Проверка основных типов данных
}