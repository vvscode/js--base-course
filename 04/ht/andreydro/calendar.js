function Calendar(options) {
    var htmlElement = document.querySelector(options.element);

    var table =
        '<table><thead><tr><td class="left-button"><button class="left">&lt;</button></td>' +
        '<td class="month" colspan="3"></td><td class="year" colspan="2"></td><td class="right-button">' +
        '<button class="right">&gt;</button></td></tr>';
    table +=
        "<tr><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr></thead>";

    table += "<tbody></tbody>";

    htmlElement.innerHTML = table + "</table>";

    var tbody = htmlElement.querySelector("tbody");

    var calendar = new Date();
    calendar.setDate(1);
    var month = htmlElement.querySelector("td.month");
    var year = htmlElement.querySelector("td.year");

    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    var storage;
    var asyncStorage = {
        getItem: function(key) {
            return new Promise(resolve => {
                resolve(localStorage.getItem(key));
            });
        },
        setItem: function(key, value) {
            return new Promise(resolve => {
                setTimeout(
                    () => resolve(localStorage.setItem(key, value)),
                    1000
                );
            });
        }
    };
    if (asyncStorage) {
        storage = asyncStorage;
    } else {
        storage = {};
    }

    addDays();

    function addDays() {
        var date = new Date(calendar);
        date.setDate(1);
        if (options.showMonth) {
            month.innerText = months[date.getMonth()];
            year.innerText = date.getFullYear();
        }

        var table = "";

        if (date.getDay() != 1) {
            table += "<tr>";
            var last = date.getDay() || 7;
            for (var i = 1; i < last; i++) {
                table += "<td></td>";
            }
        }

        while (date.getMonth() == calendar.getMonth()) {
            if (date.getDay() == 1) {
                table += "<tr>";
            }
            table +=
                '<td day="' + date.getDate() + '">' + date.getDate() + "</td>";
            if (date.getDay() == 0) {
                table += "</tr>";
            }
            date.setDate(date.getDate() + 1);
        }

        if (date.getDay() != 1) {
            while (date.getDay() != 1) {
                table += '<td class="months">' + date.getDate() + "</td>";
                date.setDate(date.getDate() + 1);
            }
        }

        if (date.getDay() != 1) {
            table += "</tr>";
        }

        tbody.innerHTML = table;

        for (var time in storage) {
            var today = new Date(+time);

            if (
                today.getFullYear() == calendar.getFullYear() &&
                today.getMonth() == calendar.getMonth()
            ) {
                var td = tbody.querySelector(
                    'td[day="' + today.getDate() + '"]'
                );

                var notes = td.querySelector("div");
                if (!notes) {
                    notes = document.createElement("div");
                    td.appendChild(notes);
                }

                var notesList = storage[time];
                for (var i = 0; i < notesList.lenght; i++) {
                    var p = createNote(notesList[i], time, i);
                    notes.appendChild(p);
                }
            }
        }
    }

    if (options.changeMonth) {
        htmlElement.querySelector("button.left").onclick = function() {
            calendar.setMonth(calendar.getMonth() - 1);
            addDays();
        };
        htmlElement.querySelector("button.right").onclick = function() {
            calendar.setMonth(calendar.getMonth() + 1);
            addDays();
        };
    } else {
        htmlElement.querySelector("button.left").style.display = "none";
        htmlElement.querySelector("button.right").style.display = "none";
    }

    tbody.addEventListener("dblclick", function(e) {
        if (!options.addNotes) {
            return;
        }

        var day = +e.target.getAttribute("day");
        if (day) {
            var notes = e.target.querySelector("div");
            if (!notes) {
                notes = document.createElement("div");
                e.target.appendChild(notes);
            }

            var noteUser = prompt("What do you want to do?");
            if (!noteUser) {
                return;
            }

            var today = new Date(
                calendar.getFullYear(),
                calendar.getMonth(),
                day
            );

            var notesList = storage[today.getTime()];
            if (!notesList) {
                notesList = [];
                storage[today.getTime()] = notesList;
            }

            notesList.push(noteUser);
            var p = createNote(noteUser, today.getTime(), notesList.length - 1);
            notes.appendChild(p);

            asyncStorage.setItem(
                "calendar" + options.element,
                JSON.stringify(storage)
            );
        }
    });

    function createNote(text, time, index) {
        var p = document.createElement("p");
        p.innerText = text;
        if (options.removeNotes) {
            var a = document.createElement("a");
            a.innerText = "x";
            a.href = "#";
            a.className = "del";
            a.onclick = function() {
                if (confirm("Do you want to delete the note? ")) {
                    p.parentNode.removeChild(p);
                    var notesListDel = storage[time];
                    notesListDel.splice(index, 1);
                    asyncStorage.setItem(
                        "calendar" + options.element,
                        JSON.stringify(storage)
                    );
                }
                return false;
            };
            p.appendChild(a);
        }
        return p;
    }
}