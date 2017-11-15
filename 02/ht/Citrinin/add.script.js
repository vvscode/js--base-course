var element = document.querySelector("#calendar")
drawInteractiveCalendar(element);

function drawInteractiveCalendar(el) {
    var date = new Date();
    var calendarTable;
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    el.innerHTML = [
        "<button id=\"backward\"><</button>",
        "<span id=\"date\">", month,
        " / ", , year, "</span>",
        "<button id=\"forward\">></button>",
        "<br />",
        "<div id=\"calendarTable\"> </div>",
        "<div id=\"calendarHistory\"> </div>",
    ].join("");
    //localStorage.clear();
    var infoContent = localStorage.getItem("calendarHistory", infoContent);

    var infoBlock = element.querySelector("#calendarHistory");
    // infoContent = infoContent === null ? "" : infoContent;
    infoBlock.innerHTML = infoContent;

    element.addEventListener('click', function(el) {
        if (el.target.matches('button')) {
            var diff = el.target.matches('#backward') ? -1 : 1;
            month += diff;
            if (month <= 0) {
                month = 12;
                year--;
            } else if (month >= 13) {
                month = 1;
                year++;
            }
            var textMonth = element.querySelector("#date");
            textMonth.innerHTML = [month, ' / ', year].join("");
            var x = element.querySelector("#calendarTable");
            drawCalendar(year, month, calendarTable);
        }
        if (el.target.matches('td')) {
            var x = el.target.innerHTML;
            if (x) {
                var infoContent = localStorage.getItem("calendarHistory", infoContent) || "";

                var infoBlock = element.querySelector("#calendarHistory");
                //var infoContent = infoBlock.innerHTML;
                var userinfo = prompt("Add info", "Granny's birthday");
                infoContent += x + "/" + month + "/" + year + (userinfo || "") + "<br>";
                infoBlock.innerHTML = infoContent;
                localStorage.setItem("calendarHistory", infoContent);
            }

        }
    });
    calendarTable = document.querySelector("#calendarTable");
    drawCalendar(year, month, calendarTable);
}



function drawCalendar(year, month, htmlEl) {
    /* Ваше решение */

    var calendarContent = '<table border="1"><tr><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></td>';
    var beginDate = new Date(year, month - 1, 1);

    var diff = 2 - beginDate.getDay();
    if (diff == 2) {
        beginDate.setDate(-5);
    } else {
        beginDate.setDate(diff);
    }

    for (var w = 1; w <= 6; w++) {
        calendarContent += '<tr>';
        for (var d = 1; d <= 7; d++) {
            calendarContent += '<td>'
            calendarContent += beginDate.getMonth() == month - 1 ? beginDate.getDate() : '';
            calendarContent += '</td>'
            beginDate.setDate(beginDate.getDate() + 1);
        }
        calendarContent += '</tr>';
    }
    calendarContent += '</table>';
    htmlEl.innerHTML = calendarContent;
}