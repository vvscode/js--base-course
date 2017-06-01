var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var cal = document.querySelector('#calendar');
var obj = {};

function calend(year, month) {
    var d = new Date(year, month - 1);
    var mon = month - 1;
    var table = '<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>';
    for (var i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }
    while (d.getMonth() === mon) {
        table += '<td>' + d.getDate() + '</td>';
        if (d.getDay() === 0) {
            table += '</tr><tr>'
        }
        d.setDate(d.getDate() + 1);
    }

    table += '</tr></table>';
    cal.innerHTML = table;
    document.getElementById('info').innerHTML = year + ' / ' + month;

    var tableEv = cal.querySelector('table');
    tableEv.addEventListener('dblclick', addEvent);
    tableEv.addEventListener('click', delEvent);
}
calend(year, month);

function getDay(d) {
    var day = d.getDay();
    if (day === 0) {
        day = 7;
    }
    return day - 1;
}

function back() {
    --month;
    check()
}
function next() {
    ++month;
    check()
}
function check() {
    if (month === 13) {
        ++year;
        month = 1;
    }
    if (month === 0) {
        --year;
        month = 12;
    }
    return calend(year, month);
}

function addEvent(e) {
    var target = e.target;
    var date;
    if (target.tagName !== 'TD') return;
    var from = target.innerHTML.search('<div');
    if (from > 0) {
        date = target.innerHTML.substring(0, from) + '_' + month + '_' + year;
    }
    else{
        date = target.innerHTML + '_' + month + '_' + year;
    }
    var q = prompt('What will you do?', 'eat');
    if (!q) return;
    target.innerHTML += '<div id="events">' + q + '<button class="cross">[x]</button>' + '</div>';
    addEventLS(date, q);
}

function delEvent(e) {
    var target = e.target;
    if (target.tagName !== 'BUTTON') return;
    target.parentNode.remove();
}

function addEventLS(date, text) {
    if (obj[date]){
        obj[date].push(text);
    }
    else {
        var arr = [];
        arr.push(text);
        obj[date] = arr;
    }
    localStorage.setItem('myCalendar', JSON.stringify(obj));
}
function loadFromLS() {
    var recObj = JSON.parse(localStorage.getItem('myCalendar'));

}