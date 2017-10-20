let months = new Date().getMonth() + 1;
let years = new Date().getFullYear();
let htmlEl = document.querySelector('.table');
function drawPage() {
    Promise.resolve()
    .then(()=>drawCalendar(years, months, htmlEl))
    .then(()=>loadDB())
    .then(data => drawItemsFromDB(data))
}
function drawItemsFromDB(items) {
        if (items.length === 0) return;
        let table;
        for (let i = 0; i < items.length; i++) {
           table  += `${fixDate(items[i])} <br>`;
        }
        document.querySelector('.tableClick').innerHTML=table;
}
function addEventListner() {
    document.querySelector('.forvard').addEventListener('click', () => forwardMonth(months, years, htmlEl));
    document.querySelector('.back').addEventListener('click', () => backMonth(months, years, htmlEl));
    document.querySelector('.table').addEventListener('click', () => ClickCell(months, years, event));
}
function forwardMonth(months, years, htmlEl) {
    months = months + 1;
    if (months === 13) {
        years = years + 1;
        months = 1;
    }
    drawCalendar(years, months, htmlEl);
}
function backMonth(months, years, htmlEl) {
    months = months - 1;
    if (months === 0) {
        years = years - 1;
        months = 12;
    }
    drawCalendar(years, months, htmlEl);
}
function drawCalendar(year, month, htmlEl) {
    document.querySelector('.mont').innerHTML = `${year}/${month}`;
    let mon = month - 1;
    let d = new Date(year, mon);
    let table = `<table><tr><td>пн</td><td>вт</td><th>ср</td><th>чт</td><th>пт</td><td>сб</td><th>вс</td></tr><tr>`;
    for (let i = 0; i < getDay(d); i++) {
        table += '<td> </td>';
    }
    while (d.getMonth() == mon) {
        table += `<td class="d${d.getDate()}_${month}_${year}">${d.getDate()}</td>`;
        if (getDay(d) % 7 == 6) {
            table += '</tr><tr>';
        }
        d.setDate(d.getDate() + 1);
    }
    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<td></td>';
        }
    }
    table += '</tr></table>';
    htmlEl.innerHTML = table;
    months = month;
    years = year;
}
function getDay(date) {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}
function ClickCell(months, years, event) {
    let target = event.target;
    if (target.tagName !== 'TD' || target.className == '') return;
    document.querySelector('.tableClick').innerHTML += `${fixDate(target.className)}<br>`;
    writeDB(target.className);
}
function fixDate(date) {
    let t = date.split('_').join(' ').split('');
    t.splice(0, 1);
    return t.join('');
}
function writeDB(item) {
    let db = JSON.parse(localStorage.getItem('db')) || [];
    db.push(item);
    Promise.resolve(localStorage.setItem('db', JSON.stringify(db)));
}
function loadDB() {
    let db = JSON.parse(localStorage.getItem('db')) || [];
    return Promise.resolve(db);
}
drawPage();
console.log(loadDB());
addEventListner(htmlEl);
