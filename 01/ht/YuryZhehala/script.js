/*
Реализовать фукнцию `fizzBuzz`
которая выводит числа от 1 до 100.
Если число кратно 3 - вместо числа вывести `Fizz`.
Если кратно 5 - вывести вместо числа `Buzz`.
Если число кратно и 3 и 5 - вывести вместо числа `FizzBuzz`.
Для вывода использовать фукнцию `log` (аналогично заданию в классе).
В теле функции нельзя использовать  `if`, `switch`, тернарный оператор `? :`
*/

let arr = [];
function fizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        arr[i] = i;
    }
    for (i = 3; i <= 100; i += 3) {
        arr[i] = 'Fizz';
    }
    for (i = 5; i <= 100; i += 5) {
        arr[i] = 'Buzz';
    }
    for (i = 15; i <= 100; i += 15) {
        arr[i] = 'FizzBuzz';
    }
    return arr;
}
console.log(fizzBuzz());

/*
Реализовать фукнцию  `isPalindrom`,
которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
*/

str = prompt ('Введите слово','');
function isPalindrome(str) {
    let strReverse = str.split('').reverse().join('');
    if (strReverse.toLowerCase()=== str.toLowerCase()) {
        return true;
    } else {
        return false;
    }
}
console.log(isPalindrome(str));

/*
Реализовать фукнцию `drawCalendar` ,
которая принимает три аргумента - год, месяц, htmlElement
и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).
*/

y = prompt('Введите год', '');
m = prompt('Введите месяц', '');
function drawCalendar(year, month, id) {
    var elem = document.getElementById(id);
    var month = month - 1;
    let d = new Date(year, month);
    var table = '<table><tr>' +
        '<th>пн</th>' +
        '<th>вт</th>' +
        '<th>ср</th>' +
        '<th>чт</th>' +
        '<th>пт</th>' +
        '<th>сб</th>' +
        '<th>вс</th></tr><tr>';
    for (let i = 1; i < getDay(d); i++) {
        table += '<td></td>';
    }
    while (d.getMonth() === month) {
        table += '<td>' + d.getDate() + '</td>';
        if (getDay(d) === 7) {
            table += '</tr><tr>';
        }
        d.setDate(d.getDate() + 1);
    }
    if (getDay(d) !== 1) {
        for (let i = getDay(d); i <= 7; i++) {
            table += '<td></td>';
        }
    }
    table += '</tr></table>';
    elem.innerHTML = table;
}
function getDay(date) {
    let day = date.getDay();
    if (day === 0) day = 7;
    return day;
}
drawCalendar(y, m, 'calendar');

/*
Написать функцию `isDeepEqual`
которая принимает на вход двe переменных
и проверяет идентичны ли они по содержимому.
*/

function isDeepEqual(a, b) {
    return isDeepEqualOne(a, b) && isDeepEqualOne(b, a);
}
function isDeepEqualOne(a, b) {
    if (['string' ,'number' , 'boolean' , 'undefined'].includes(typeof a)) {
        if (typeof a==='number' && typeof b==='number' && isNaN(a) && isNaN(b)) {
            return true;
        }
        return a === b;
    }
    if (typeof a === 'object') {
        if (a === null) {
            return a === b;
        }
        for (var key in a) {
            if (!isDeepEqualOne(a[key], b[key])) {
                return false;
            }
        }
    }
    return true;
}
var a = { prop1: 1, list: [1, 2, 3], o: { x: 2 } };
var b = { list: [1, 2, 3], o: { x: 2 } };
console.log(isDeepEqual(a, b));

/*
Написать тесты и саму функцию `spiral`, которая принимает на вход
двумерный массив и возвращает одномерный массив с элементами расположенными по спирали.
Матрица не обязательно имеет одинаковые размеры по обеим сторонам.
*/

function spiral(array) {
    var newArr = [];
    var x = 0;
    var y = 0;
    var row = array[0];
    var xMax = row.length - 1;
    var yMax = array.length - 1;
    while (x <= xMax && y <= yMax) {
        for (let i = x; i < xMax; i++) {
            newArr.push(array[y][i]);
        }
        for (let i = y; i < yMax; i++) {
            newArr.push(array[i][xMax]);
        }
        for (let i = xMax; i > x; i--) {
            newArr.push(array[yMax][i]);
        }
        for (let i = yMax; i > y; i--) {
            newArr.push(array[i][x]);
        }
        x = x + 1;
        y = y + 1;
        xMax = xMax - 1;
        yMax = yMax - 1;
    }
    if ((row.length == array.length) && (array.length % 2) != 0) {
        var central = Math.floor(array.length / 2);
        newArr.push(array[central][central]);
    }
    return (newArr);
}
console.log(spiral([[1, 2, 3, 4, 5], [1, 2, 3, 4, 5]]));

/*
Написать тесты и саму функцию quadraticEquation, которая на вход принимает
коэффициенты квадратного уравнения, а возвращает массив с вещественными
корнями этого уравнения (если они есть).
*/

let a=prompt('Введите a','');
let b=prompt('Введите b','');
let c=prompt('Введите c','');
function quadraticEquation(a,b,c) {
    let result = [];
    let d=(Math.pow(b, 2)-4*a*c);
    if (d > 0){
        result[0] = (-b + Math.sqrt(d)) / 2 * a;
        result[1] = (-b - Math.sqrt(d)) / 2 * a;
    } else if (d === 0){
        result[0] = (-b + Math.sqrt(d)) / 2 * a;
        result[1] = result[0];
    } else if (d < 0){
        result.push('Нет корней');
    }
    return result;
}
console.log(quadraticEquation(a,b,c));
