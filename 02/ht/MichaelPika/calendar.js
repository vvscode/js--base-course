drawInteractiveCalendar();

function drawInteractiveCalendar() {                //главная
    var dateNow = new Date();
    var monthNow = dateNow.getMonth();
    var yearNow = dateNow.getFullYear();
    createCalendar(yearNow, monthNow);
}

function createCalendar(yearNow, monthNow) {
    var body = document.getElementsByTagName("body")[0];
    var div = document.createElement("div");
    body.appendChild(div);
    div.setAttribute("id", "calendar");
    var table = document.createElement("table");
    div.appendChild(table);
    drawCalendar(yearNow, monthNow);
}

function createHeadCalendar(table, monthNow, yearNow) {
    var row = table.insertRow(0);                   //добавляет новую строку в таблицу и возвращает на неё ссылку.
    row.setAttribute("id", "first-child");
    var cellLeft = row.insertCell(-1);
    var buttonLeft = document.createElement("Button");
    buttonLeft = insertNodeText(buttonLeft, "<");
    buttonLeft.onclick = controlButton;
    cellLeft.appendChild(buttonLeft);
    var cellCenter = row.insertCell(-1);
    cellCenter.setAttribute("colspan", "5");
    cellCenter.setAttribute("align", "center");
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec"
    ];
    var txtCenter = document.createTextNode(months[monthNow] + " " + yearNow);
    cellCenter.appendChild(txtCenter);

    var cellRight = row.insertCell(-1);
    var buttonRight = document.createElement("Button");
    buttonRight = insertNodeText(buttonRight, ">");
    buttonRight.onclick = controlButton;
    cellRight.appendChild(buttonRight);
}
function insertNodeText(obj, text) {
    var txt = document.createTextNode(text);
    obj.appendChild(txt);
    return obj;
}

function controlButton() {                          //обработчик нажатия на кнопку
    var date = new Date();
    var monthNew = date.getMonth();
    var yearNew = date.getFullYear();
    if (this.lastChild.nodeValue === "<") {
        var monthCurrent1 = monthNew === 0 ? 11 : monthNew - 1;
        var yearCurrent1 = monthCurrent1 === 11 ? yearNew - 1 : yearNew;
        date.setFullYear(yearCurrent1);
        date.setMonth(monthCurrent1);
    } else if (this.lastChild.nodeValue === ">") {
        var monthCurrent2 = monthNew === 11 ? 0 : monthNew + 1;
        var yearCurrent2 = monthCurrent2 === 0 ? yearNew + 1 : yearNew;
        date.setFullYear(yearCurrent2);
        date.setMonth(monthCurrent2);
    }
    monthNew = date.getMonth();
    yearNew = date.getFullYear();
    drawCalendar(yearNew, monthNew);
}

function drawCalendar(year, month) {
    var newTable = document.getElementsByTagName("table")[0];
    var theDesiredMonth = month;
    var theDesiredDate = new Date(year, theDesiredMonth);
    var table =
        "<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>";
    for (var k = 0; k < getDayNumber(theDesiredDate); k++) {
        table = table + "<td></td>";
    }
    while (theDesiredDate.getMonth() === theDesiredMonth) {
        table = table + "<td>" + theDesiredDate.getDate() + "</td>";
        if (getDayNumber(theDesiredDate) % 7 === 6) {
            table = table + "</tr><tr>";
        }
        theDesiredDate.setDate(theDesiredDate.getDate() + 1);
    }
    if (getDayNumber(theDesiredDate) !== 0) {
        for (var i = getDayNumber(theDesiredDate); i < 7; i++) {
            table = table + "<td></td>";
        }
    }
    table = table + "</tr>";
    newTable.innerHTML = table;
    createHeadCalendar(newTable, month, year);
}

function getDayNumber(date) {
    var day = date.getDay();
    if (day === 0) {
        day = 7;
    }
    return day - 1;
}
