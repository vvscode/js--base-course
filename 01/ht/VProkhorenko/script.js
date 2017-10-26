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

// оператор && вычисляет операнды слева направо до первого «ложного» и возвращает его, а если все истинные – то последнее значение
// оператор || вычисляет операнды слева направо до первого «истинного» и возвращает его, а если все ложные – то последнее значение.
// https://learn.javascript.ru/logical-ops
function fizzBuzz() {
    for(var i = 1; i <= 100; i++)
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
    return (textString === textString.split("").reverse().join(""));
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

    var mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
    var d = new Date(year, mon);

    var table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

    // заполнить первый ряд от понедельника
    // и до дня, с которого начинается месяц
    // * * * | 1  2  3  4
    for (var i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }

    // ячейки календаря с датами
    while (d.getMonth() == mon) {
        table += '<td>' + d.getDate() + '</td>';

        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
            table += '</tr><tr>';
        }

        d.setDate(d.getDate() + 1);
    }

    // добить таблицу пустыми ячейками, если нужно
    if (getDay(d) != 0) {
        for (var i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }

    // закрыть таблицу
    table += '</tr></table>';

    // только одно присваивание innerHTML
    htmlEl.innerHTML = table;

    function getDay(date) { // получить номер дня недели, от 0(пн) до 6(вс)
        var day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
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
    if (typeof(objA)==="object" && objA != null && typeof(objB) === "object" && objB != null) //ищем объект,но не null, т.к typeof(null)="object"
    {
        if (Object.values(objA).length != Object.values(objB).length) // распознает массивы разной длины и объекты с разным количеством ключ:значение
        {
            return false;
        }

        for(var prop in objA) // у равных по длине массивов и объектов сравнивает попорядку все значения и находит несовпадения
        {
            if (!isDeepEqual(objA[prop], objB[prop]))
            {
                return false;
            }
        }
        return true; //если несовпадений не найдено
    }
    return objA == objB; //остальные проверки(пустые строки, строки, числа)

}
