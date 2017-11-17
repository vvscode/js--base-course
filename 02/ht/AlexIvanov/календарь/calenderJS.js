let firstDate = new Date();
let firstYear =  firstDate.getFullYear();
let firstMonth = firstDate.getMonth();

function createCalendar(id, year, month) {
    let daysOfLastMonth = '', daysOfThisMonth = '', daysNextMonth = '';

    let elem = document.getElementById(id);

    let dataInCalenderNow = new Date(year, month);

    const THISMONTH = dataInCalenderNow.getMonth();


    let calenderHead = '<div><h2>'+ addNameMonth(THISMONTH) + ' ' + dataInCalenderNow.getFullYear() + '</h2><hr></div>';
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
// только одно присваивание innerHTML
    elem.innerHTML = calenderHead + nameDays + daysOfLastMonth + daysOfThisMonth + daysNextMonth + '</tr></table>';

    let allTd = document.querySelectorAll('td');
    addClassTd(allTd, 'days_Of_Last_Month', 'days_Of_This_Month', 'days_name');
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
function addClassTd(arr, className1, className2, className3 ) {
    arr.forEach(function(a){
        if ( a.innerHTML.valueOf() > 0 && a.innerHTML.valueOf() < 32){
            a.className = className2
        } else if ( isNaN(a.innerHTML.valueOf()) ) {
            a.className = className3
        } else {
            a.className = className1
        }
    })
}

/*функция получения названия месяца*/
function addNameMonth(month) {
    let nameMonth = '';
    let arrNameMonth = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    arrNameMonth.forEach(function(item, i){
        if( month === i ){
           nameMonth += item ;
        }
    });
    return nameMonth;
}






