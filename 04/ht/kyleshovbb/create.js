"use strict";
let months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

function calendar(options) {
    let id = 'calendar' + Math.random();

    options.el = options.el || "#" + id;
    options.allowChangeMonth = options.allowChangeMonth || showArrows.checked;
    options.addTasks = options.addTasks || addTasks.checked;
    options.removeTasks = options.removeTasks || removeTasks.checked;
    options.showMonthAndYear = options.showMonthAndYear || showMonthAndYear.checked;
    options.date = options.date || [selectYear.value, selectMonth.value];
    options.tableClass = options.tableClass || addClass.value;

    let settings = options;
    let idElement = settings.el.slice(1);
    let htmlElement = document.getElementById(idElement);

    calendar.prototype.drawCalendar(+settings.date[0], +settings.date[1], htmlElement, settings);
    setTimeout(function () {
        window.localStorage['calendarSettings'] = JSON.stringify(settings);
    }, 0);
}

calendar.prototype = {
    drawCalendar (year, month, htmlEl, settings) {

        let interactiveCalendar = `<table class="${settings.tableClass}"><tr>`;
        if (settings.allowChangeMonth) {
            interactiveCalendar += `<th class='rows left'>\◀</th>`;
            if (settings.showMonthAndYear) {
                interactiveCalendar += `<th colspan='5'>${months[month - 1]} ${year}</th><th class=' right rows'>\▶</th></tr>`;
            } else {
                interactiveCalendar += `<th colspan='5'></th><th class='rows right'>\▶</th></tr>`
            }
        }
        else if (settings.showMonthAndYear) {
            interactiveCalendar += `<th></th><th colspan='5'>${months[month - 1]} ${year}</th><th></th></tr>`;
        } else {
            interactiveCalendar += `<th></th><th colspan='5'></th><th></th></tr>`
        }

        let dateOnCalendar = new Date(year, month - 1);
        interactiveCalendar += "<tr>" +
            "<th>Monday</th>" +
            "<th>Tuesday</th>" +
            "<th>Wednesday</th>" +
            "<th>Thursday</th>" +
            "<th>Friday</th>" +
            "<th>Saturday</th>" +
            "<th>Sunday</th>" +
            "</tr>";

        outer: while (month === (dateOnCalendar.getMonth() + 1)) {

            for (let i = 1; i <= 7; i++) {
                if (i === 1) interactiveCalendar += "<tr>";

                if (calendar.prototype.checkDay(dateOnCalendar) === i && (month === (dateOnCalendar.getMonth() + 1))) {
                    interactiveCalendar += `<td data-content> ${dateOnCalendar.getDate()}</td>`;
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

        calendar.prototype.checkTask(year, month, settings);

        htmlEl.onclick = function (e) {
            let target = e.target;
            let rows = target.closest(".rows");
            let td = target.matches("td") && target.closest("td");
            let button = target.matches(".closeTask") && target.closest(".closeTask");

            if (rows === document.querySelector(".left") &&
                settings.allowChangeMonth) {
                month -= 1;
                checkMonth();
                calendar.prototype.drawCalendar(year, month, htmlEl, settings);
            }
            else if (rows === document.querySelector(".right") &&
                settings.allowChangeMonth) {
                month += 1;
                checkMonth();
                calendar.prototype.drawCalendar(year, month, htmlEl, settings);
            }
            else if (settings.removeTasks && button) {
                let parentButton = button.parentElement;
                calendar.prototype.removeTask(parentButton, settings);
                parentButton.remove();
            }
            else if (settings.addTasks && td.firstChild) {
                let calendarNumber = td.childNodes["0"].textContent;
                calendar.prototype.createDescriptions(year, month, calendarNumber, settings, htmlEl);
            }
        };

        function checkMonth() {
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
        }
    },

    checkDay(dateOnCalendar) {
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
    },

    createDescriptions(year, month, day, settings, htmlEl) {
        let descriptionMonth = "0" + month;
        descriptionMonth = descriptionMonth.slice(-2);
        let descriptionDay = "0" + day;
        descriptionDay = descriptionDay.slice(-2);
        let descriptionYear = year;
        let description = prompt("Введите описания выбранной даты", "хорошо проведенное время");
        if (!description) return;
        let descriptionLS = `${descriptionYear}:${descriptionMonth}:${descriptionDay} ${description} ;;`;

        if (!localStorage['descriptions' + settings.el]) {
            localStorage.setItem('descriptions' + settings.el, descriptionLS);
        } else {
            localStorage['descriptions' + settings.el] += descriptionLS;
        }
        calendar.prototype.drawCalendar(year, month, htmlEl, settings);
    },

    checkTask(year, month, settings) {
        if (!!localStorage['descriptions' + settings.el]) {
            let descriptions = localStorage['descriptions' + settings.el];
            descriptions = descriptions.slice(0, -3).split(' ;;');
            descriptions.forEach((item, i) => {
                let taskYear = +item.slice(0, 4);
                let taskMonth = +item.slice(5, 7);
                let taskDay = +item.slice(8, 10);
                let taskDescription = item.slice(11);
                calendar.prototype.addTask(taskYear, taskMonth, taskDay, i, taskDescription, year, month);
            });
        }
    },

    addTask(taskYear, taskMonth, taskDay, index, taskDescription, year, month) {
        if (taskYear === year && taskMonth === month) {
            let cells = document.querySelectorAll("div[id*='calendar'] td[data-content]");
            cells.forEach((item) => {
                let calendarNumber = item.childNodes["0"].textContent;
                if (taskDay === +calendarNumber) {
                    let task = document.createElement("div");
                    task.setAttribute("data-task", index);
                    task.className = "task";
                    task.innerText = taskDescription;

                    let closeTask = document.createElement("button");
                    closeTask.className = "closeTask";
                    closeTask.textContent = "×";
                    task.append(closeTask);
                    item.append(task);
                }
            });
        }
    },

    removeTask(parentButton, settings) {
        let dataTask = parentButton.getAttribute("data-task");
        let descriptions = localStorage['descriptions' + settings.el];
        descriptions = descriptions.slice(0, -3).split(' ;;');
        descriptions.splice(dataTask, 1);
        localStorage['descriptions' + settings.el] = "";
        descriptions.forEach((item) => {
            localStorage['descriptions' + settings.el] += item + " ;;";
        });
    }
};