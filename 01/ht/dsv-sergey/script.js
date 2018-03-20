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
    var Num;
    for (var i =1; i<=100; i++) {
        Num = i;
        while (i % 3 === 0) {
            Num = 'Fizz';
            while (i % 5 === 0) {
                Num = Num + 'Buzz';
                break;
            }
            break;
        }
        while (i % 5 === 0 && Num != 'FizzBuzz') {
            Num = 'Buzz';
            break;
        }
        log(Num);
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
    var testString = '',
        i = 0;
    while (i < textString.length) {
        testString = testString + textString[textString.length - 1 - i];
        i++;
    }
    return testString === textString;
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
    var date = new Date(year,month-1), //Приведение месяца к нумерации с 0
        firstDay = (date.getDay() == 0) ? 7 : date.getDay(), //Определения дня недели 1-го числа
        monthRU = {0:'Январь',1:'Февраль',2:'Март',3:'Апрель',4:'Май',5:'Июнь',6:'Июль',7:'Август',8:'Сентябрь',9:'Октябрь', 10:'Ноябрь',11:'Декабрь'},
        dayRU = {0:'Вс',1:'Пн',2:'Вт',3:'Ср',4:'Чт',5:'Пт',6:'Сб'},
        calendar = '<table><caption>monthRU[date.getMonth()-1] + " " + date.getFullYear()</caption>' +
            '<tr><th>dayRU[1]</th><th>dayRU[2]</th><th>dayRU[3]</th><th>dayRU[4]</th><th>dayRU[5]</th><th>dayRU[6]</th><th>dayRU[0]</th></tr>',
        dayInMonth = 33 - new Date(year,month-1,33).getDate(),  //Определение количества дней в месяце, с 32 в Сафари баг
        countDay = 1;
    for (var i = 1; i <= 5; i++) {   // Цикл по неделям
        calendar = calendar + '<tr>';
        for (var k = 1; k <= 7; k++) {   //Цикл по дням недели
            if (i == 1 && k != firstDay && countDay == 1) {
                calendar = calendar + '<td></td>';
            } else { if (countDay <= dayInMonth) {
                    calendar = calendar + '<td>' + countDay + '</td>';  //Запись числа в день недели
                    countDay++;  //Глобальный счетчик
                } else calendar = calendar + '<td></td>';
                }
        }
        calendar = calendar + '</tr>';
    }
    calendar = calendar + '</table>';
    htmlEl.innerHTML = calendar;
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
    if (Array.isArray(objA) && Array.isArray(objB)) {
        return objA.toString() === objB.toString();
    } else if (typeof objA === 'object' && typeof objB === 'object') {
            if (objA.length !== objB.length) return false;
            else if (JSON.stringify(objA) === JSON.stringify(objB)) return true;
                else {
                    for (var key in objA) {
                        if (!isDeepEqual(objA[key], objB[key])) return false;
                    }
                    return true;
                }
    } else {
        return objA === objB;
    }
}
