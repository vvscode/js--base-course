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
  const arr = [];
  for (let i = 1; i <= 100; i++) {
    arr.push(i);
  };
  for (let i = 3; i <= 100; i = i + 3) {
    arr[i - 1] = (`Fizz`);
  };
  for (let i = 5; i <= 100; i = i + 5) {
    arr[i - 1] = (`Buzz`);
  };
  for (let i = 15; i <= 100; i = i + 15) {
    arr[i - 1] = (`FizzBuzz`);
  };
  arr.forEach(log);
};
/**
 * реализовать фукнцию  `isPolindrom`, 
 * которая принимает на вход строку и возвращает результат проверки (`true`/ `false` ),
 * является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 * @param {string} textString 
 * @return {boolean} Является строка полндромом (одинакого читается с лева на право и с права на лево ) или нет
 */
function isPolindrom(textString) {
  const str = textString.replace(/ /g, ``);
  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) return false;
  };
  return true;
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
  if (htmlEl.querySelector(`.Calendar`)) {htmlEl.removeChild(htmlEl.querySelector(`.Calendar`))};
  const weekdays = new Array(7).fill(1).map((e, i) => (`<th>${new Date(2018, 2, 12 + i).toLocaleString('ru', {weekday: 'short'}).toUpperCase()}</th>`));
  const firstDay = new Date(year, month - 1).getDay() && new Date(year, month - 1).getDay() - 1 || 0;
  const emptyBefore = new Array(firstDay).fill(`<td></td>`);
  const insertDays = new Array(31).fill(1).map((e, i) => {
    if (new Date(year, month - 1, i + 1).getMonth() === month - 1) return `<td>${i + 1}</td>`;
  }).filter(elem => elem);
  let calendar = [...emptyBefore, ...insertDays];
  while (calendar.length < Math.ceil(calendar.length / 7) * 7) {calendar.push(`<td></td>`)};
  calendar = calendar.map((e, i, arr) => {
    if (i === 0 || i % 7 === 0) return `<tr>${e}`;
    if (i % 7 === 0 || i === arr.length - 1) return `${e}</tr>`;
    return e;
  });
  const table = document.createElement('table');
  table.className = `Calendar`;
  table.innerHTML = `<thead><tr>${weekdays.join(``)}</tr></thead><tbody>${calendar.join(``)}</tbody>`;
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
    const equalObject = (objA, objB) => {
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
};

const recursForSpiral = (buffArr, up, newArr) => {
  buffArr.forEach((el, i, bufferArr) => {
    if (i === 0) {
      el.forEach(elem => newArr.push(elem));
      buffArr.shift();
    };
    if (i < buffArr.length - 1) {
      buffArr[i].forEach((elem, i, arr) => {if (i === arr.length - 1) newArr.push(elem)});
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
      };
      up = 0;
    };
  });
  if (buffArr.length > 0) recursForSpiral(buffArr, up, newArr);
};

const spiral = (arr) => {
  const newArr = [];
  if (Array.isArray(arr)) {
    if (!Array.isArray(arr[0])) return arr;
    let buffArr = JSON.parse(JSON.stringify(arr));
    let up;
    recursForSpiral(buffArr, up, newArr);
  };
  return newArr;
};

const quadraticEquation = (a, b, c) => {
  const des = b * b - 4 * a * c;
  if (des > 0) return [(-b + Math.sqrt(des)) / 2 * a, (-b - Math.sqrt(des)) / 2 * a];
  if (des === 0) return [-b / 2 * a];
  return [];
};
