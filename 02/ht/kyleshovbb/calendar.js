"use strict";

let date = new Date;
let descriptions = "";
let year = date.getFullYear();
let month = date.getMonth() + 1;
let htmlEl = document.getElementById("calendar");

let description = document.createElement("div");
description.setAttribute("id", "description");
htmlEl.after(description);

if (window.localStorage['description']) {
    descriptions = window.localStorage['description'].slice(0,-1).split(" ;");
    descriptions.forEach((item) => {
        description.innerHTML += `<br>${item}`;
    });
}

drawInteractiveCalendar(htmlEl);

htmlEl.onclick = (e) => {
    let target = e.target;
    let rows = target.closest(".rows");
    let td = target.closest("td");

    if (rows === document.getElementById("left")) {
        month = month - 1;
        checkMonth();
        drawInteractiveCalendar(htmlEl);
    }
    else if (rows === document.getElementById("right")) {
        month = month + 1;
        checkMonth();
        drawInteractiveCalendar(htmlEl);
    }
    else if (td.textContent) {
        setTimeout(() => {
            let key = `${year}:${month}:${td.textContent}`;
            if (!window.localStorage['description']) {
                window.localStorage['description'] = "";
            }
            window.localStorage['description'] += key + " - " + prompt("Введите описания выбранной даты", "хороший денёк ;");
            descriptions = window.localStorage['description'].slice(0,-1).split(' ;');
            description.innerHTML += `<br>${descriptions[descriptions.length - 1]}`;
        }, 0);
    }
};

function drawInteractiveCalendar(htmlEl) {
    let interactiveCalendar = "<table><tr>" +
        "<th id='left' class='rows'>[<]</th>" +
        "<th colspan='5'>" + month + "/" + year + "</th>" +
        "<th id='right' class='rows'>[>]</th></tr>";
    drawCalendar(year, month, htmlEl);

    function drawCalendar(year, month, htmlEl) {
        let dateOnCalendar = new Date(year, month - 1);
        interactiveCalendar += "<tr>" +
            "<th>Понедельник</th>" +
            "<th>Вторник</th>" +
            "<th>Среда</th>" +
            "<th>Четверг</th>" +
            "<th>Пятница</th>" +
            "<th>Субота</th>" +
            "<th>Воскресение</th>" +
            "</tr>";

        outer: while (month === (dateOnCalendar.getMonth() + 1)) {

            for (let i = 1; i <= 7; i++) {
                if (i === 1) interactiveCalendar += "<tr>";

                if (checkDay() === i && (month === (dateOnCalendar.getMonth() + 1))) {
                    interactiveCalendar += "<td>" + dateOnCalendar.getDate() + "</td>";
                    dateOnCalendar.setDate(dateOnCalendar.getDate() + 1);
                } else {
                    interactiveCalendar += "<td></td>";
                }

                if (i === 7) {
                    interactiveCalendar += "</tr>";
                    continue outer;
                }
            }
        }
        interactiveCalendar += "</table>";

        htmlEl.innerHTML = interactiveCalendar;

        function checkDay() {
            let day;
            switch (dateOnCalendar.getDay()) {
                case 0:
                    day = 7;
                    break;
                case 7:
                    day = 1;
                    break;
                default:
                    day = dateOnCalendar.getDay();
                    break;
            }
            return day;
        }
    }
}

let checkMonth = () => {
    switch (month) {
        case 0:
            month = 12;
            year -= 1;
            break;
        case 13:
            month = 1;
            year += 1;
            break;
    }
};
