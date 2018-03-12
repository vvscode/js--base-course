/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */

/**
 * Функция вывода строк для работы в fizzBuzz
 * @param {*} a 
 */
function log(a) {
    console.log(a);
};

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
    for (let i = 1; i <= 100; i++) {
        i%3 && i%5 && i%15 && log(i);
        i%3 || i%15 && log(`Fizz`);
        i%5 || i%15 && log(`Buzz`);
        i%15 || log(`FizzBuzz`);
    };
};
/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
    const str = textString.replace(` `, ``);
    for (let i = 0; i <= str.length/2; i++) {
        return (str[i] !== str[str.length - 1 - i]) ? false : true;
    }
    return undefined;
};


/**
 * Реализовать фукнцию `drawCalendar` , 
 * которая принимает три аргумента - год, месяц, htmlElement 
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).  
 * @param {number} year 
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl 
 */
function drawCalendar(year, month, htmlEl) {
    if (htmlEl.querySelector(`.Calendar`)) {
        htmlEl.removeChild(htmlEl.querySelector(`.Calendar`));
    }
    const weekdays = () => {
        let str = ``;
        for (let i = 0; i < 7; i++) {
            str += `<th>${new Date(2018, 2, 12 + i).toLocaleString('ru', {weekday: 'short'}).toUpperCase()}</th>`;
        };
        return str;
    }
    const calendar = [];
    const emptyBefore = () => {
        const firstDay = new Date(year, month - 1).getDay() || 7;
        for (let i = 1; i < firstDay; i++) {
            calendar.push(`<td></td>`);
        };
    };
    const insertDays = () => {
        for (let i = 1; i < 29; i++) {
            calendar.push(`<td>${i}</td>`);
        };
        for (let i = 29; i < 32; i++) {
            if (new Date(year, month - 1, i).getMonth() === month - 1) {
                calendar.push(`<td>${i}</td>`);
            };
        };
    };
    emptyBefore();
    insertDays();
    const calendarBody = () => {
        let str = '';
        let index = 0;
        let max = Math.ceil(calendar.length / 7) * 7;
        while (index <= max) {
            str += '<tr>';
            for (let i = 0; i < 7; i++) {
                str += calendar[index] || `<td></td>`;
                index++;
            };
            str += '</tr>';
        };
        return str;
    };
    const table = document.createElement('table');
    table.className = `Calendar`;
    table.innerHTML = `<thead><tr>${weekdays()}</tr></thead><tbody>${calendarBody()}</tbody>`;
    htmlEl.appendChild(table);
};
/**
 * Написать функцию `isDeepEqual`
 * которая принимает на вход двe переменных
 * и проверяет идентичны ли они по содержимому. Например
 * @param {*} objA 
 * @param {*} objB 
 * @return {boolean} идентичны ли параметры по содержимому
 */
function isDeepEqual(objA, objB) {
    if (typeof objA === `string` && objA === objB) return true;
    if (Array.isArray(objA) && Array.isArray(objB)) {
      return objA.toLocaleString() === objB.toLocaleString() ? true : false;
    };
    if (typeof objA === `number` && objA === objB) return true;
    if (typeof objA === `object` && typeof objB === `object`) {
      let equalObject = (objA, objB) => {
        for (let key in objA) {
          if (typeof objA[key] === `object` && typeof objB[key] === `object`) {
            if (!equalObject(objA[key], objB[key])) return false;
          } else {
            if (objA[key] !== objB[key]) return false;
          };
        };
        return true;
      };
      return equalObject(objA, objB);
    };
    return false;
    return undefined;
};

let spiral = (arr) => {
let newArr = [];
if (Array.isArray(arr)) {
    if (!Array.isArray(arr[0])) return arr;
    let buffArr = JSON.parse(JSON.stringify(arr));
    let up;
    let cycle = () => {
    for (let i = 0; i < buffArr.length; i++) {
        if (i === 0) {
        buffArr[i].forEach(elem => {
            newArr.push(elem);
        });
        buffArr.shift();
        };
        if (i < buffArr.length - 1) {
        buffArr[i].forEach((elem, i, arr) => {
            if (i === arr.length - 1) newArr.push(elem);
        });
        buffArr[i].pop();
        };
        if (i === buffArr.length - 1) {
        for (let j = buffArr[i].length - 1; j >= 0; j--) {
            newArr.push(buffArr[i][j]);
        };
        up = 1;
        buffArr.pop();
        };
        if (up) {
        for (let i = buffArr.length - 1; i >= 0; i--) {
            newArr.push(buffArr[i][0]);
            buffArr[i].shift();
        }
        up = 0;
        };
    };
    if (buffArr.length > 0) cycle();
    };
    cycle();
};
return newArr;
};

let quadraticEquation = (a, b, c) => {
    if (a && b && c) {
        const descr = b * b - 4 * a * c;
        if (descr > 0) return [(- b + Math.sqrt(descr)) / 2 * a,(- b - Math.sqrt(descr)) / 2 * a];
        if (descr === 0) return [-b / 2 * a];
    };
    return [];
};
