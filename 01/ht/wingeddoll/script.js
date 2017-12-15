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
    for (var i = 1; i < 101; i++) {
        (i % 3 === 0 && i % 5 === 0) && log("FizzBuzz"); // && - возвращает true, если операнды истинны
        (i % 3 === 0 && i % 5 !== 0) && log("Fizz");
        (i % 3 !== 0 && i % 5 === 0) && log("Buzz");
        (i % 3 !== 0 && i % 5 !== 0) && log(i); // если хоть один из операндов false, то дальше не выполнится
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
    var text = textString.toLowerCase(); // преобразует строку к нижнему регистру
    var invertText = text.split("").reverse().join(""); // переворачивает строку
    return text === invertText; // сравнивает две строки
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
    var date = new Date(year, (month - 1), 1); // первое число нужного месяца (month - 1, так как январь = 0)
    var days = new Date(year, month, 0); // последний день месяца
    var calendar = "<table border = '2' width = '250 px'>" +
        "<tr>" +
        "<th>Пн</th>" +
        "<th>Вт</th>" +
        "<th>Ср</th>" +
        "<th>Чт</th>" +
        "<th>Пт</th>" +
        "<th>Сб</th>" +
        "<th>Вс</th>" +
        "</tr>"; // создаем шапку календаря


    var day = date.getDay()
    if (day === 0)
        day = 7;
    if (day !== 1) {
        calendar += "<tr>"
        for (var i = 1; i < day; i++) {
            calendar += "<td></td>";
        } // создаем новый ряд и заполняем пустыми ячейками все дни до первого дня месяца, если такие есть
    }
    // Создаем таблицу календаря и заполняем числами соответственно дням
    // Цикл повторяется по количеству дней в месяце и расределяет даты по дням недели
    for (var j = 1; j <= days.getDate(); j++) {

        switch (date.getDay()) {
            case 1:
                {
                    calendar += "<tr><td>" + date.getDate() + "</td>"; // если понедельник, открывает новый ряд
                    date.setDate(j + 1)

                    break;
                }
            case 0:
                {
                    calendar += "<td>" + date.getDate() + "</td></tr>"; // если воскресенье, закрывает ряд
                    date.setDate(j + 1)

                    break;
                }

            default:
                {
                    calendar += "<td>" + date.getDate() + "</td>"; // остальные дни 
                    date.setDate(j + 1)
                }
                break;
        }
    }

    if (days.getDay() === 0) {
        calendar += "</table>";
    } else {
        var g = 7 - days.getDay();
        for (var d = 1; d <= g; d++) { calendar += "<td></td>" };
        calendar += "</tr></table>"; // заполняет таблицу пустыми ячейками до конца недели и завершает таблицу

    }

    htmlEl.innerHTML = calendar; // выводит календарь в htmlEl
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
    if (typeof(objA) === "object" && typeof(objB) === "object") { // Сработает только для типа объект

        var keysObjA = Object.keys(objA); // возьмет ключи, создаст массив
        var keysObjB = Object.keys(objB);
        if (keysObjA.length != keysObjB.length) { return false; } // сравнит длину
        return !keysObjA.filter(function(key) { //оператор "!" нужнен для того, чтобы вернуть логическое значение
            if (typeof objA[key] === "object" || Array.isArray(objA[key])) {
                return !isDeepEqual(objA[key], objB[key]); // если ключ объект или массив вызовет саму себя для сравнения
            } else {
                return objA[key] !== objB[key];
            } //если не объект и не массив сравнит и выдаст противоположное значение, которое на выходе поменяет оператор "!"
        }).length;
    } else {
        return JSON.stringify(objA) === JSON.stringify(objB); // Сработает для всего остального
    }
}



/*function isDeepEqual(objA, objB) {
    if (Object.keys(objA).length !== Object.keys(objB).length) return false; // сравнивает длину объектов
    for (var key in objA) { // проходит через перечисляемые свойства объекта
        if (typeof objA[key] === "object" && typeof objB[key] === "object") {
            return isDeepEqual(objA[key], objB[key]);
            //  если объект содержит внутри объект, то выполняет сравнение 
        }
    }
    return JSON.stringify(objA) === JSON.stringify(objB);
    // преобразует значение JavaScript в строку JSON и возвращает результат сравнения двух строк
} */