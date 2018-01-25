"use strict";
let addClass = document.getElementById("addClass");
let addTasks = document.getElementById("addTasks");
let selectYear = document.getElementById("selectYear");
let selectMonth = document.getElementById("selectMonth");
let removeTasks = document.getElementById("removeTasks");
let allowChangeMonth = document.getElementById("showArrows");
let showMonthAndYear = document.getElementById("monthAndYear");

document.querySelector("#form").addEventListener("change", startDrawCalendar);
/**
 * Создание настроек календаря, при запуске страницы без копирования блока с JS кодом в HTML документ
 * @param {object} elem - HTML элемент в который будет добавляться календарь
 * @returns {object} settings - Настройки календаря
 * @returns {string} settings.el - ID для календаря
 * @returns {boolean} settings.allowChangeMonth - Будут ли отображаться стрелки для листания месяцев
 * @returns {boolean} settings.addTasks - Будут ли добавляться описания к дате в календарь
 * @returns {boolean} settings.removeTasks - Будут ли удаляться описания из даты в календаре
 * @returns {boolean} settings.showMonthAndYear - Будут ли отображаться месяц и год в календаре
 * @returns {array} settings.date - Год и месяц в календаре
 * @returns {string} settings.tableCstringlass - Класс, который будет добавлен для календаря
 */
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
/**
 * Начало создания календаря при запуске страницы без копирования блока с JS кодом в HTML документ
 */
function startDrawCalendar() {
    let calendars = document.querySelectorAll("div[id*='calendar']");

    if (calendars.length) {
        calendars.forEach(function (item) {
            let settings = createSettings(item);
            new Calendar(settings);
        });
    } else {
        let myCalendar = document.createElement("div");
        myCalendar.setAttribute("id", 'calendar');
        let settings = createSettings(myCalendar);
        document.body.appendChild(myCalendar);
        new Calendar(settings);
    }
}