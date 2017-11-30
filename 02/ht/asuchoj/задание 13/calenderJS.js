let firstDate = new Date();
let firstYear = firstDate.getFullYear();
let firstMonth = firstDate.getMonth();
let calender = document.querySelector('#calendar');
let rowInformation = document.getElementById('rowinformation');

function createCalendar(id, year, month) {
  let daysOfLastMonth = '', daysOfThisMonth = '', daysNextMonth = '';
  let elem = document.getElementById(id);
  let dataInCalenderNow = new Date(year, month);
  const THISMONTH = dataInCalenderNow.getMonth();
  let calenderHead = '<div><h2>' + addNameMonth(THISMONTH) + ' ' + dataInCalenderNow.getFullYear() + '</h2><hr></div>';
  let nameDays = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

  // заполнить первый ряд от понедельника и до дня, с которого начинается месяц * * * | 1  2  3  4
  for (let i = 0; i < getNumDay(dataInCalenderNow); i++) {
    daysOfLastMonth += '<td></td>';
  }

  // ячейки календаря с датами
  while (dataInCalenderNow.getMonth() === THISMONTH) {
    daysOfThisMonth += '<td>' + dataInCalenderNow.getDate() + '</td>';
    if (getNumDay(dataInCalenderNow) % 7 === 6) { // вс, последний день - перевод строки
      daysOfThisMonth += '</tr><tr>';
    }
    dataInCalenderNow.setDate(dataInCalenderNow.getDate() + 1);
  }

  // добить таблицу пустыми ячейками, если нужно
  if (getNumDay(dataInCalenderNow) !== 0) {
    for (let i = getNumDay(dataInCalenderNow); i < 7; i++) {
      daysNextMonth += '<td></td>';
    }
  }

  elem.innerHTML = calenderHead + nameDays + daysOfLastMonth + daysOfThisMonth + daysNextMonth + '</tr></table>';

  let allTd = document.querySelectorAll('td');

  addClassTd(allTd, 'days_Of_Last_Month', 'days_Of_This_Month', 'days_name');

  rowInformation.innerHTML = localStorage.getItem('noteList') || null;
}

createCalendar("calendar", firstYear, firstMonth); // запуск нужной пользователю даты (точка отсчета)

let prev = document.getElementById('prev_button');
let next = document.getElementById('next_button');

prev.addEventListener('click', function() {
  createCalendar("calendar", firstYear, --firstMonth);
});
next.addEventListener('click', function() {
  createCalendar("calendar", firstYear, ++firstMonth);
});

/*функция получения номера дня недели от 0(пн) до 6(вс)*/
/* по стандарту 0(вс) до 6(сб)*/

function getNumDay(date) {
  let day = date.getDay();
  if (day === 0) {
    day = 7; //если вс = 0 - по стандарту, приравниваем к 7, возвращаем =6!
  }
  return day - 1; // если пн = 1 - по стандарту, становиться 0 по функции
}

/*функция добавления классов в ячейки*/
function addClassTd(arrTD, className1, className2, className3, ) {
  arrTD.forEach(function(a) {
    if (a.innerHTML.valueOf() > 0 && a.innerHTML.valueOf() < 32) {
      a.className = className2
    } else if (isNaN(a.innerHTML.valueOf())) {
      a.className = className3
    } else {
      a.className = className1
    }
  })
}

/*функция получения названия месяца*/
function addNameMonth(month) {
  let nameMonth = '';
  let arrNameMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  arrNameMonth.forEach(function(item, i) {
    if (month === i) {
      nameMonth += item;
    }
  });
  return nameMonth;
}

/*К генератору листаемого календаря добавить функционал: под календарем добавить блок.
 При клике на ячейку даты ( но не на пустую ячейку календаря ) в блоке должна добавляться
 запись о том, по какой ячейке кликнули. Можно добавить запрос описания даты от пользователя
 с помощью функции prompt и выводить это описание там же). История дат и список, по которым
 пользоатель клика, должны сохраняться между перезагрузками страницы. Для сохранения использоват
 LocalStorage. Интерфейс работы с данными (чтение/запись) лучше сделать асинхронным*/

calender.addEventListener('click', addNewDescriptionDate, false)

function addNewDescriptionDate() {

  let daysOfThisMonth = document.querySelectorAll('.days_Of_This_Month');
  let nameMonth = document.querySelector('.calendar div h2');
  let target = event.target;

  [].forEach.call(daysOfThisMonth, function(clickDate) {
    if (target === clickDate) {
      createNewDescriptionDate(clickDate, nameMonth);
      localStorage.noteList = rowInformation.innerHTML;
    }
  })
}

function createNewDescriptionDate(date, month) {

  let boxDescription = document.createElement('div');
  boxDescription.className = 'box_description';

  let newDescription = document.createElement('div');
  newDescription.className = 'new_description';

  let deleteButton = document.createElement('div');
  deleteButton.className = 'delete_description';
  deleteButton.innerHTML = "Х";

  let userDescription = prompt('Отметить день', 'коментарий к дате');

  newDescription.innerHTML = '<h2>' + date.innerHTML + ' ' + month.innerHTML + '</h2> <p>' + userDescription + '</p>';

  if (userDescription) {
    rowInformation.appendChild(boxDescription);
    boxDescription.appendChild(newDescription);
    boxDescription.appendChild(deleteButton);
  }
}

rowInformation.addEventListener('click', deleteDescription, false);

function deleteDescription() {
  let delDescriptionButton = document.getElementsByClassName('delete_description');
  let target = event.target;

  [].forEach.call(delDescriptionButton, function(clickDate) {
    if (target === clickDate) {
      clickDate.closest('.box_description').remove();
    }
  })
  localStorage.noteList = rowInformation.innerHTML;
}