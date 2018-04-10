
function drawCalendar(year, month) {
    /* Ваше решение */

    var theDesiredMonth = month - 1;
    var theDesiredDate = new Date(year, theDesiredMonth);
    var table =
        "<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>";

    function getDayNumber(date) {
        var day = date.getDay();
        if (day === 0) {
            day = 7;
        }
        return day - 1;
    }
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
    return table;
    // htmlEl.innerHTML = table;
}

function drawInteractiveCalendar() {
    var date = new Date();
    var month = date.getMonth();
    var year = date.getFullYear();
    body = document.getElementsByTagName("body")[0];
    div = document.createElement("div");
    body.appendChild(div);
    div.setAttribute("id", "calendar");
    var tableCalenadar = document.createElement("table");
    div.appendChild(tableCalenadar);

    function insertButton(obj, text) {
        var button = document.createElement("Button");
        button = insertNodeText(button, text);
        button.onclick = controlButton;
        obj.appendChild(button);
    }

    var row = tableCalenadar.insertRow(-1);
    row.setAttribute("id", "first-child");

    var cellLeft = row.insertCell(-1);
    cellLeft = insertButton(cellLeft, "<");

    var cellCenter = row.insertCell(-1);

    var cellRight = row.insertCell(-1);
    cellRight = insertButton(cellRight, ">");

    function insertNodeText(obj, text) {
        var txt = document.createTextNode(text);
        obj.appendChild(txt);
        return obj;
    }

    function controlButton() {
        if (this.lastChild.nodeValue === "<") {
            var monthCurrent1 = month === 0 ? 11 : month - 1;
            var yearCurrent1 = monthCurrent1 === 11 ? year - 1 : year;
            year = date.setFullYear(yearCurrent1);
            month = date.setMonth(monthCurrent1);
        } else if (this.lastChild.nodeValue === ">") {
            var monthCurrent2 = month === 11 ? 0 : month + 1;
            var yearCurrent2 = monthCurrent2 === 0 ? year + 1 : year;
            year = date.setFullYear(yearCurrent2);
            month = date.setMonth(monthCurrent2);
        }
        generateCalendar(drawCalendar(year, month));
    }
    function generateCalendar(elem) {
        var wrapper = document.getElementById("calendar");
        var theadCalendar = wrapper.getElementsByTagName("table")[0];
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
        theadCalendar.rows[0].cells[1].innerHTML =
            months[date.getMonth()] + " " + date.getFullYear();
        theadCalendar.rows[1].innerHTML = elem;              //тут отправляю сгенерированные дни в таблице, можно так?
    }
}

