var now = new Date();
var year = now.getFullYear();
var month = now.getMonth() + 1;
var cal = document.querySelector('#calendar');

function calend(year, month) {
    var d = new Date(year, month - 1);
    var mon = month - 1;
    var table = '<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>';
    for (var i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }
    while (d.getMonth() === mon) {
        table += `<td class="d${d.getDate()}_${month}_${year}">${d.getDate()}</td>`;
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
    loadFromLS();
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
    if (target.tagName !== 'TD') return;
    var date = target.className;
    var q = prompt('What will you do?', 'eat');
    if (!q) return;
    target.innerHTML += `<div id="events">${q}<button class="cross">[x]</button></div>`;
    addEventLS(date, q);
}

function delEvent(e) {
    var target = e.target;
    if (target.tagName !== 'BUTTON') return;
    var text = target.parentNode.innerHTML.slice(0, -34);
    var date = target.parentNode.parentNode.className;
    target.parentNode.remove();
    var LS = JSON.parse(localStorage.getItem('myCalendar'));
    var index = LS[date].indexOf(text);
    console.log(index);
    LS[date].splice(index, 1);
    if (LS[date].length === 0) delete LS[date];
    localStorage.setItem('myCalendar', JSON.stringify(LS));
}

function addEventLS(date, text) {
    var LS = JSON.parse(localStorage.getItem('myCalendar')) || {};
    LS[date] = LS[date] || [];
    LS[date].push(text);
    localStorage.setItem('myCalendar', JSON.stringify(LS));
}

function loadFromLS() {
    var recObj = JSON.parse(localStorage.getItem('myCalendar'));
    for (key in recObj) {
        var res = cal.querySelector(`.${key}`);
        if (res != null){
            if (recObj[key].length - 1 == 0){
                res.innerHTML += `<div id="events">${recObj[key]}<button class="cross">[x]</button></div>`;
            }
            else {
                for (var i = 0; i < recObj[key].length; i++){
                    var dbArr = recObj[key];
                    res.innerHTML += `<div id="events">${dbArr[i]}<button class="cross">[x]</button></div>`;
                }
            }
        }
    }
}