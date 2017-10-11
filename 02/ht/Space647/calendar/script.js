let months, years;
function addEventListner() {
    document.querySelector('.forvard').addEventListener('click', () => forwardMonth(months, years, htmlEl));
    document.querySelector('.back').addEventListener('click', () => backMonth(months, years, htmlEl));
}
function forwardMonth(months, years, htmlEl) {
    months = months + 1;
    if (months === 12) {
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
    let table = `<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>`;
    for (let i = 0; i < getDay(d); i++) {
        table += '<td></td>';
    }
    while (d.getMonth() == mon) {
        table += '<td>' + d.getDate() + '</td>';
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
let htmlEl = document.querySelector('.table');
drawCalendar(2017, 10, htmlEl);
addEventListner(htmlEl);
