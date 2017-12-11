"use strict";
let addClass = document.getElementById("addClass");
let addTasks = document.getElementById("addTasks");
let selectYear = document.getElementById("selectYear");
let selectMonth = document.getElementById("selectMonth");
let removeTasks = document.getElementById("removeTasks");
let allowChangeMonth = document.getElementById("showArrows");
let showMonthAndYear = document.getElementById("monthAndYear");

document.querySelector("#form").addEventListener("change", startDrawCalendar);

function createSettings(elem) {
    let settings = {
        el: "#" + elem.getAttribute("id"),
        allowChangeMonth: allowChangeMonth.checked,
        addTasks: addTasks.checked,
        removeTasks: removeTasks.checked,
        showMonthAndYear: showMonthAndYear.checked,
        date: [selectYear.value, selectMonth.value],
        tableClass: addClass.value
    }

    return settings;
}

function startDrawCalendar() {
    let calendars = document.querySelectorAll("div[id*='calendar']");

    if (calendars.length) {
        calendars.forEach(function (item) {
            let settings = createSettings(item);
            calendar(settings);
        });
    } else {
        let myCalendar = document.createElement("div");
        myCalendar.setAttribute("id", 'calendar');
        let settings = createSettings(myCalendar);
        document.body.appendChild(myCalendar);
        calendar(settings);
    }
}