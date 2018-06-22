window.onload = initCalendar;
/**
 * @function
 * init calendar
 */
function initCalendar() {
    authorization();
    new Promise(resolve => {
        setTimeout(() => {
            hiddenPreloader("preloader");
            resolve();
        }, 5000);
    });
    location.hash = "#calendar";
    showCalendar({
        el: "calendar",
        showMonth: true,
        allowChange: true,
        allowAdd: true,
        allowRemove: true,
        date: [setDate("year"), setDate("month")]
    });
    initNote(setDate("month"), setDate("year"));
}
/**
 * @function
 * authorization new user and id old user
 */
function authorization() {
    if (!localStorage.getItem("name")) {
        var name,
            random1 = Math.floor(Math.random() * 1000),
            random2 = Math.floor(Math.random() * 1000);
        name = JSON.stringify({
            id: random1 + random2 + ": " + new Date()
        });
        localStorage.setItem("name", name);
    } else {
        var author = JSON.parse(localStorage.getItem("name"));
    }
}
/**
 * @function
 * @param {string} id
 * unmount preloader
 */
function hiddenPreloader(id) {
    document.getElementById(id).setAttribute("class", "hidden");
}
/**
 * @function
 * @param {string} classEl
 * @param {string} event
 * @param {function} fn
 * add listener
 */
function setEvent(classEl, event, fn) {
    var elements = document.querySelectorAll(classEl);
    [].forEach.call(elements, function(el) {
        el.addEventListener(event, fn);
    });
}
/**
 * @function
 * @param {number} year
 * @param {number} month
 * saving the date used
 */
function setStorageItem(year, month) {
    date = [month, year];
    localStorage.setItem("date", JSON.stringify(date));
}
/**
 * @function
 * @param {string} x
 * define today's date on request
 */
function setDate(x) {
    var today = new Date(),
        year = +today.getFullYear(),
        month = +today.getMonth() + 1;
    if (x == "year") {
        return year;
    } else {
        return month;
    }
}
/**
 * @function
 * @param {object} setting
 * show calendar with settings
 */
function showCalendar(setting) {
    var htmlEl = document.getElementById(setting.el),
        elCreate = document.getElementById("create"),
        elAbout = document.getElementById("about");
    elCreate.removeAttribute("class", "createWrap");
    if (!elCreate.hasAttribute("class")) {
        elCreate.setAttribute("class", "hidden");
        preShowCalendar.innerHTML = "";
    }
    if (!elAbout.hasAttribute("class")) {
        elAbout.setAttribute("class", "hidden");
    }
    htmlEl.removeAttribute("class", "hidden");
    year =
        localStorage.date != null
            ? JSON.parse(localStorage.getItem("date"))[1]
            : setting.date[0];
    month =
        localStorage.date != null
            ? JSON.parse(localStorage.getItem("date"))[0]
            : setting.date[1];
    drawInteractiveCalendar(setting.el, year, month, setting);
    initNote(month, year);
}
/**
 * @function
 * @param {object} ev
 * show messajes
 */
function showMessages(ev) {
    var target = ev.target,
        idMessages = target.id,
        messages = JSON.parse(localStorage.getItem("note"))[idMessages],
        htmlEl = document.getElementById("modalWindow"),
        notes = "";
    notes +=
        "<h1>" +
        idMessages +
        "<span class='closeModalWindow'>          \u274C</span></h1><ul>";
    [].forEach.call(messages, function(el) {
        notes +=
            "<li class=" +
            idMessages +
            "><span class='remove'>\u274C   </span>" +
            el +
            "</li>";
    });
    notes += "</ul>";
    htmlEl.innerHTML = notes;
    htmlEl.removeAttribute("class", "hidden");
    htmlEl.setAttribute("class", "modalWindowShow");
    setEvent(".closeModalWindow", "click", closeMessages);
    setEvent(".remove", "click", removeNote);
}
/**
 * @function
 * @param {object} ev
 * close modal.window;
 */
function closeMessages(ev) {
    var target = ev.target;
    html = document.getElementsByClassName("modalWindowShow");
    html[0].setAttribute("class", "hidden");
}
/**
 * @function
 * @param {number} year
 * @param {number} month
 * @param {object} htmlEl
 * adding functionality to the calendar
 */
function addHtmlElements(year, month, htmlEl, setting) {
    var caption = document.createElement("caption"),
        captionText = "",
        table = document.getElementById("myCalendar"),
        selectItem = document.querySelectorAll(".day"),
        setting = setting;
    monthRU = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
    ];
    if (setting.allowChange && setting.showMonth) {
        captionText =
            "<div style='display: flex; flex-direction: row; justify-content: space-between'>" +
            "<button id='earlyMonth'><</button><h3 id='captionDate' style='width: auto'> --- " +
            monthRU[month - 1] +
            "  " +
            year +
            " --- </h3><button id='nextMonth'>></button></div>";
        caption.innerHTML = captionText;
        table.insertBefore(caption, table.firstChild);

        earlyMonth.onclick = function() {
            if (month == 1) {
                drawCalendar(year - 1, 12, htmlEl, setting);
                addHtmlElements(year - 1, 12, htmlEl, setting);
                initNote(12, year - 1);
            } else {
                drawCalendar(year, month - 1, htmlEl, setting);
                addHtmlElements(year, month - 1, htmlEl, setting);
                initNote(month - 1, year);
            }
        };

        nextMonth.onclick = function() {
            if (month == 12) {
                drawCalendar(year + 1, 1, htmlEl, setting);
                addHtmlElements(year + 1, 1, htmlEl, setting);
                initNote(1, year + 1);
            } else {
                drawCalendar(year, month + 1, htmlEl, setting);
                addHtmlElements(year, month + 1, htmlEl, setting);
                initNote(month + 1, year);
            }
        };
    } else if (setting.allowChange) {
        captionText =
            "<div style='display: flex; flex-direction: row; justify-content: space-between'>" +
            "<button id='earlyMonth'><</button><button id='nextMonth'>></button></div>";
        caption.innerHTML = captionText;
        table.insertBefore(caption, table.firstChild);

        earlyMonth.onclick = function() {
            if (month == 1) {
                drawCalendar(year - 1, 12, htmlEl, setting);
                addHtmlElements(year - 1, 12, htmlEl, setting);
                initNote(12, year - 1);
            } else {
                drawCalendar(year, month - 1, htmlEl, setting);
                addHtmlElements(year, month - 1, htmlEl, setting);
                initNote(month - 1, year);
            }
        };

        nextMonth.onclick = function() {
            if (month == 12) {
                drawCalendar(year + 1, 1, htmlEl, setting);
                addHtmlElements(year + 1, 1, htmlEl, setting);
                initNote(1, year + 1);
            } else {
                drawCalendar(year, month + 1, htmlEl, setting);
                addHtmlElements(year, month + 1, htmlEl, setting);
                initNote(month + 1, year);
            }
        };
    } else if (setting.showMonth) {
        captionText =
            "<div style='display: flex; flex-direction: row; justify-content: space-between'>" +
            "<h3 id='captionDate' style='width: auto'> --- " +
            monthRU[month - 1] +
            "  " +
            year +
            " --- </h3></div>";
    }

    if (setting.allowAdd) {
        [].forEach.call(selectItem, function(el) {
            el.addEventListener("click", addNote);
        });
    }
}
/**
 *@function
 * @param {*} idEl
 * @param {*} year
 * @param {*} month
 */
function drawInteractiveCalendar(idEl, year, month, setting) {
    var htmlEl = document.getElementById(idEl),
        // var arrMonth = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        // allowChange = document.getElementById("changeMonth").checked,
        // allowAdd = document.getElementById("addTasks").checked,
        // allowRemove = document.getElementById("removeTasks").checked,
        // showMonth = document.getElementById("showDate").checked,
        // date = [arrMonth.indexOf(document.getElementById("monthSel").value) + 1, document.getElementById("yearSel").value],
        // el = document.querySelector("input#tagId").value || "calendar";
        setting = setting;
    drawCalendar(year, month, htmlEl, setting);
    addHtmlElements(year, month, htmlEl, setting);
    initNote(month, year);
}
/**
 *@function
 * @param {number} year
 * @param {number} month
 * @param {object} htmlEl
 */
function drawCalendar(year, month, htmlEl, setting) {
    var date = new Date(year, month - 1),
        today = date.getDate(),
        storage = JSON.parse(localStorage.getItem("name")),
        // noteYear = [].forEach.call(storage, function(el) {
        //     el.parse;
        // }),
        noteMonth = storage,
        noteDay = storage,
        firstDayMonth = new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        ).getDay(),
        firstDay = firstDayMonth === 0 ? 7 : firstDayMonth, // Определения дня недели 1-го числа
        dayRU = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        calendar =
            "<table id='myCalendar'>" +
            "<tr bgcolor='rgb(187, 252, 135)'><th>" +
            dayRU[1] +
            "</th><th>" +
            dayRU[2] +
            "</th><th>" +
            dayRU[3] +
            "</th><th>" +
            dayRU[4] +
            "</th><th>" +
            dayRU[5] +
            "</th><th>" +
            dayRU[6] +
            "</th><th>" +
            dayRU[0] +
            "</th></tr>",
        dayInMonth =
            33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate(), // Определение количества дней в месяце, с 32 в Сафари баг
        countDay = 1;
    setStorageItem(year, month);

    for (var i = 1; i <= 6; i++) {
        // Цикл по неделям
        calendar = calendar + "<tr>";
        for (var k = 1; k <= 7; k++) {
            // Цикл по дням недели
            if (i === 1 && k !== firstDay && countDay === 1) {
                calendar = calendar + "<td class='empty'></td>";
            } else {
                if (countDay <= dayInMonth) {
                    calendar =
                        calendar +
                        "<td id=" +
                        countDay +
                        " class='day' style='cursor: pointer'>" +
                        countDay +
                        "</td>"; // Запись числа в день недели
                    countDay++; // Глобальный счетчик
                } else calendar = calendar + "<td class='empty'></td>";
            }
        }
        calendar = calendar + "</tr>";
    }
    calendar = calendar + "</table>";
    htmlEl.innerHTML = calendar;
}
/**
 * @function
 * @param {object} event
 * adding notes in storage and modal window
 */
function addNote(event) {
    if (event.target.className != "day") {
        return;
    }
    var target = event.target,
        parse = JSON.parse(localStorage.getItem("note")),
        clickOutput,
        note = prompt("Введите заметку:") || [],
        noteText,
        dayClick = target.id,
        month = JSON.parse(localStorage.getItem("date"))[0];
    year = JSON.parse(localStorage.getItem("date"))[1];
    key =
        (dayClick < 10 ? "0" + dayClick : dayClick) +
            "." +
            (month < 10 ? "0" + month : month) +
            "." +
            year || [];
    if (note == "") {
        note = "Нет заметок";
    }
    if (!parse) {
        noteText = parse || {};
        noteText[key] = noteText[key] || [];
        noteText[key].push(note);
        localStorage.setItem("note", JSON.stringify(noteText));
    } else {
        noteText = parse || {};
        noteText[key] = noteText[key] || [];
        noteText[key].push(note);
        localStorage.setItem("note", JSON.stringify(noteText));
    }
    clickOutput = document.createElement("span");
    clickOutput.id = key;
    clickOutput.className = "message";
    clickOutput.innerHTML = "\u2611";
    target.innerHTML += clickOutput.outerHTML;
    setEvent(".message", "click", showMessages);
    // var block = document.getElementsByClassName("messages");
    // block[0].appendChild(clickOutput);
}
/**
 * @function
 * @param {object} ev
 */
function removeNote(ev) {
    var setting = JSON.parse(localStorage.getItem("setting"));
    if ((location.hash == "#calendar") ? true : setting.allowRemove) {
        var target = ev.target,
            htmlEl = target.parentElement,
            storage = JSON.parse(localStorage.getItem("note"));
        if (htmlEl.parentElement.childElementCount == 1) {
            var marckUp = document.getElementById(htmlEl.className)
                .parentElement;
            marckUp.innerHTML = marckUp.id;
        }
        storage[htmlEl.className].splice(
            storage[htmlEl.className].indexOf(htmlEl.innerText.slice(2)),
            1
        );
        localStorage.setItem("note", JSON.stringify(storage));
        htmlEl.remove();
    }
}
/**
 * @function
 * @param {number} month
 * @param {number} year
 */
function initNote(month, year) {
    var note = JSON.parse(localStorage.getItem("note")) || [],
        days = document.getElementsByClassName("day") || [],
        month = month,
        clickOutput;
    [].forEach.call(days, function(dat) {
        var html = dat;
        var day = dat.id;
        var key =
            (day < 10 ? "0" + day : day) +
            "." +
            (month < 10 ? "0" + month : month) +
            "." +
            year;
        if (note.hasOwnProperty(key)) {
            [].forEach.call(note[key], function(i) {
                var output = i;
                clickOutput = document.createElement("span");
                clickOutput.id = key;
                clickOutput.className = "message";
                clickOutput.innerHTML = "\u2611";
                html.innerHTML += clickOutput.outerHTML;
                setEvent(".message", "click", showMessages);
            });
        }
    });
}
