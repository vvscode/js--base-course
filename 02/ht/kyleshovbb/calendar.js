

function drawCalendar(year, month, htmlEl) {
    var calendar = "<table>" +
        "<tr>" +
        "<th>Понедельник</th>" +
        "<th>Вторник</th>" +
        "<th>Среда</th>" +
        "<th>Четверг</th>" +
        "<th>Пятница</th>" +
        "<th>Субота</th>" +
        "<th>Воскресение</th>" +
        "</tr>";
    var date = new Date(year, month - 1);

    outer: while (month === (date.getMonth() + 1)) {

        for (var i = 1; i <= 7; i++) {
            i === 1 ? calendar += "<tr>" : false;

            if (checkDay() === i && (month === (date.getMonth() + 1))) {
                calendar += "<td>" + date.getDate() + "</td>";
                date.setDate(date.getDate() + 1);
            } else {
                calendar += "<td></td>";
            }

            if (i === 7) {
                calendar += "</tr>";
                continue outer;
            }
        }
    }

    htmlEl.innerHTML = calendar;

    function checkDay() {
        var day;
        switch (date.getDay()) {
            case 0:
                day = 7;
                break;
            case 7:
                day = 1;
                break;
            default:
                day = date.getDay();
                break;
        }
        return day;
    }
}
