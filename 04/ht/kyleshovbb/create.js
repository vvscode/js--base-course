"use strict";
let months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
/**
 * Начало создания календаря и запись настроек в localStorage
 * @param {object} settings - Настройки календаря, которые указаны в блоке с JS кодом
 * @param {string} settings.el - Задаём ID для календаря
 * @param {boolean} settings.allowChangeMonth - Указываем, будут ли отображаться стрелки для листания месяцев
 * @param {boolean} settings.addTasks - Указываем, будут ли добавляться описания к дате в календарь
 * @param {boolean} settings.removeTasks - Указываем, будут ли удаляться описания из даты в календаре
 * @param {boolean} settings.showMonthAndYear - Указываем, будут ли отображаться месяц и год в календаре
 * @param {array} settings.date - Задаём год и месяц
 * @param {string} settings.tableCstringlass - Указываем класс, который будет добавлен для календаря
 */
function Calendar(settings) {
    this.el = settings.el;
    this.allowChangeMonth = settings.allowChangeMonth;
    this.addTasks = settings.addTasks;
    this.removeTasks = settings.removeTasks;
    this.showMonthAndYear = settings.showMonthAndYear;
    this.date = settings.date;
    this.tableClass = settings.tableClass;

    let htmlElement = document.querySelector(settings.el);

    this.drawCalendar(+settings.date[0], +settings.date[1], htmlElement, settings);
    setTimeout(() => {
        localStorage['calendarSettings'] = JSON.stringify(settings);
    }, 0);
}

Calendar.prototype = {
    /**
     * Создание календаря
     * @param {number} year - Год который будет отображаться в календаре
     * @param {number} month - Месяц который будет отображаться в календаре
     * @param {object} htmlEl - HTML элемент в который будет добавляться календарь
     * @param {object} settings - Настройки календаря, которые указаны в блоке с JS кодом
     */
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

                if (this.checkDay(dateOnCalendar) === i && (month === (dateOnCalendar.getMonth() + 1))) {
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
        this.checkTask(year, month, settings);

        let self = this;
        htmlEl.onclick = function (e) {
            let target = e.target;
            let rows = target.closest(".rows");
            let td = target.matches("td") && target.closest("td");
            let button = target.matches(".closeTask") && target.closest(".closeTask");

            if (rows === document.querySelector(".left") &&
                settings.allowChangeMonth) {
                month -= 1;
                checkMonth();
                self.drawCalendar(year, month, htmlEl, settings);
            }
            else if (rows === document.querySelector(".right") &&
                settings.allowChangeMonth) {
                month += 1;
                checkMonth();
                self.drawCalendar(year, month, htmlEl, settings);
            }
            else if (settings.removeTasks && button) {
                let parentButton = button.parentElement;
                self.removeTask(parentButton, settings);
                parentButton.remove();
            }
            else if (settings.addTasks && td.firstChild) {
                let calendarNumber = td.childNodes["0"].textContent;
                self.createDescriptions(year, month, calendarNumber, settings, htmlEl);
            }
        };
        /**
         * Проверка на выход календаря за пределы месяца
         */
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
    /**
     * Проверка на выход дня недели за пределы количества дней недели
     * @param {object} dateOnCalendar - Дата, которая указана в календаре
     */
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
    /**
     * Добавление описания дня недели в календарь и обновление календаря
     * @param {number} year - Год, который отображается в календаре
     * @param {number} month - Месяц, который отображается в календаре
     * @param {number} day - День, который отображается в календаре
     * @param {object} htmlEl - HTML элемент в который будет добавляться календарь
     * @param {object} settings - Настройки календаря, которые указаны в блоке с JS кодом
     */
    createDescriptions(year, month, day, settings, htmlEl) {
        let descriptionMonth = "0" + month;
        descriptionMonth = descriptionMonth.slice(-2);
        let descriptionDay = "0" + day;
        descriptionDay = descriptionDay.slice(-2);
        let descriptionYear = year;
        let description = prompt("Введите описания выбранной даты", "хорошо проведенное время");
        if (!description) return;
        let descriptionLS = `${descriptionYear}:${descriptionMonth}:${descriptionDay} ${description} ;;`;

        setTimeout(() => {
            if (!localStorage['descriptions' + settings.el]) {
                localStorage.setItem('descriptions' + settings.el, descriptionLS);
            } else {
                localStorage['descriptions' + settings.el] += descriptionLS;
            }
            this.drawCalendar(year, month, htmlEl, settings);
        },0)
    },
    /**
     * Преобразование описания дня недели из localStorage в удобный для работы формат и запуск
     * добавления описаний в каленарь
     * @param {number} year - Год, который отображается в календаре
     * @param {number} month - Месяц, который отображается в календаре
     * @param {object} settings - Настройки календаря, которые указаны в блоке с JS кодом
     */
    checkTask(year, month, settings) {
        if (!!localStorage['descriptions' + settings.el]) {
            let descriptions = localStorage['descriptions' + settings.el];
            descriptions = descriptions.slice(0, -3).split(' ;;');
            descriptions.forEach((item, i) => {
                let taskYear = +item.slice(0, 4);
                let taskMonth = +item.slice(5, 7);
                let taskDay = +item.slice(8, 10);
                let taskDescription = item.slice(11);
                this.addTask(taskYear, taskMonth, taskDay, i, taskDescription, year, month);
            });
        }
    },
    /**
     * Добавление описаний в календарь после проверки на соответствие даты создания описания
     * с датой в календаре
     * @param {number} taskYear - Год, в который было создано описания дня недели
     * @param {number} taskMonth - Месяц, в который было создано описания дня недели
     * @param {number} taskDay - День, в который было создано описания дня недели
     * @param {number} index - Индекс описания дня недели в массиве
     * @param {string} taskDescription - Описание дня недели
     * @param {number} year - Год, который отображается в календаре
     * @param {number} month - Месяц, который отображается в календаре
     */
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
    /**
     * Удаление описания даты календаря из localStorage
     * @param {object} parentButton - HTML элемент, где находится описание дня недели и кнопка удаления
     * @param {object} settings - Настройки календаря, которые указаны в блоке с JS кодом
     * @param {string} settings.el - Задаём ID для календаря
     * @param {boolean} settings.allowChangeMonth - Указываем, будут ли отображаться стрелки для листания месяцев
     * @param {boolean} settings.addTasks - Указываем, будут ли добавляться описания к дате в календарь
     * @param {boolean} settings.removeTasks - Указываем, будут ли удаляться описания из даты в календаре
     * @param {boolean} settings.showMonthAndYear - Указываем, будут ли отображаться месяц и год в календаре
     * @param {array} settings.date - Задаём год и месяц в календаре
     * @param {string} settings.tableCstringlass - Указываем класс, который будет добавлен для календаря
     */
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