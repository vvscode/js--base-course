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
    for (var i = 1; i <= 100; i++) {
        var x = true;
        while((i % 3) == 0 && (i % 5) == 0) {
            log("FizzBuzz");
            x = false;
            break;
        }
        while (x && (i % 3) == 0) {
            log("Fizz");
            x = false;
            break;
        }
        while (x && (i % 5) == 0) {
            log("Buzz");
            x = false;
            break;
        }
        while (x) {
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
    for (var i = 0; i < textString.length / 2; i++) {
        if (textString[i] == textString[textString.length - 1 - i]) {
            continue;
        } else {
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
    // строка дней недели
    var table = '<table><tr><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr>';
    
    var d = new Date(year, month - 1);

    // до первого дня, если не понедельник
    if (d.getDay() != 1) {
        table += '<tr>';
        for (var i = 1; i < d.getDay(); i++) {
            table += '<td></td>';
        }
    }

    // с первого и до последнего дня месяца
    while (d.getMonth() == month - 1) {
        if (d.getDay() == 1) {
            table += '<tr>'; // открываем строку до понедельника
        }
        table += '<td>' + d.getDate() + '</td>';
        if (d.getDay() == 0) {
            table += '</tr>'; // закрываем строку после воскресенья
        }
        d.setDate(d.getDate() + 1);
    }

    // если понедельник, значит после воскресенья строка закрыта
    if (d.getDay() != 1) {
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

    // проверка на одинаковость типов
    if (typeof objA != typeof objB) {
        return false;
    }
    // проверяем примитивные типы
    if (typeof objA == "string" || typeof objA == "number" || typeof objA == "boolean") {
        if (objA == objB) {
            return true;
        } else {
            return false;
        }
    }
    
    // проверка на массив
    if (Array.isArray(objA) && Array.isArray(objB)) {
        if (objA.length != objB.length) {
            return false;
        }
        for (var i = 0; i <= objA.length; i++) {
            if (isDeepEqual(objA[i], objB[i]) == false) {
                return false;
            }
        }
        return true;
    }

    //проверка на объект
    if (typeof objA == "object") {
        var keysA = Object.keys(objA);
        var keysB = Object.keys(objB);
        if (keysA.length != keysB.length) {
            return false;
        }
        keysA.sort();
        keysB.sort();
        for (var i = 0; i < keysA.length; i++) {
            if (keysA[i] != keysB[i]) {
                return false;
            }
            valueA = objA[keysA[i]];
            valueB = objB[keysB[i]];
            if (isDeepEqual(valueA, valueB) == false) {
                return false;
            }
        }
        return true;
    }
}
