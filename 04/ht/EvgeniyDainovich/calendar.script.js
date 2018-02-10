var promptGetUserInfo = {
    getDateInfo: () => Promise.resolve(prompt("Add info", "Granny's birthday") || '')
};
var CalendarModule = (function (window, IStorage, IGetInfo) {
    var linkCSS = document.createElement("link");
    linkCSS.rel = "stylesheet";
    linkCSS.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    document.head.appendChild(linkCSS);

    return function Calendar(params) {
        var x = document.getElementById(params.element);
        x.innerHTML = "<div class='tableHeader'></div><div class='tableContent'></div>";
        if (params.showDate) {
            var divHeader = x.querySelector('.tableHeader');
            divHeader.innerHTML += '<table class="table"><tr><th id="backward' + params.element +
                '"></th><th colspan="5" id="datePlace' + params.element +
                '" style="width:100%;text-align:center"></th><th id="forward' + params.element + '"></th></tr></table>';
            var datePlace = document.getElementById("datePlace" + params.element);
            datePlace.innerHTML = params.month + "/" + params.year;
            if (params.changeMonth) {
                var btnBackward = document.getElementById("backward" + params.element);
                btnBackward.innerHTML = '<span class="glyphicon glyphicon-triangle-left backward"></span>'
                var btnForward = document.getElementById("forward" + params.element);
                btnForward.innerHTML = '<span class="glyphicon glyphicon-triangle-right forward"></span>'
            }
        }
        var divTableCalendar = x.querySelector('.tableContent');
        addChangeMonth(divHeader, divTableCalendar, params);
        addNotes(divTableCalendar, params, IStorage, IGetInfo);
        drawCalendar(params.year, params.month, divTableCalendar);
        if (params.addTask) {
            addInfo(divTableCalendar.firstChild.firstChild, params, IStorage);
        }
    }
})(window, lsStorage, promptGetUserInfo);

var drawCalendar = function (year, month, htmlEl) {
    var calendarContent = '<table class="table table-bordered"><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr>';
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
            calendarContent += '<td class=' + month + '-' + beginDate.getDate() + '>'
            calendarContent += beginDate.getMonth() == month - 1 ? beginDate.getDate() : '' + '</td>';
            beginDate.setDate(beginDate.getDate() + 1);
        }
        calendarContent += '</tr>';
    }
    calendarContent += '</table>';
    htmlEl.innerHTML = calendarContent;
};

var addInfo = function (table, params, IStorage) {
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        for (var j = 0; j < row.cells.length; j++) {
            if (+row.cells[j].innerHTML > 0) {
                let cell = row.cells[j];
                var keyToStorage = params.element + params.year + cell.className;
                IStorage.getData(keyToStorage)
                    .then(result => {
                        if (result) {
                            var notes = result.split('|');
                            var resString = '';
                            for (var i = 0; i < notes.length - 1; i++) {
                                resString += '<br> <span class="bg-info">' + notes[i] +
                                    (params.removeTask ? '<span class="glyphicon glyphicon-remove">' : '') + '</span></span>';
                            }
                            cell.innerHTML += resString;
                        }
                    });
            }
        }
    }
}
var addRemoveNotes = function (event, params, IStorage) {
    if (event.target.matches('.glyphicon-remove')) {
        var cell = event.target.closest("td");
        var keyToStorage = params.element + params.year + cell.className;
        let parent = event.target.closest(".bg-info");
        IStorage.getData(keyToStorage)
            .then(result => {
                var content = parent.textContent + "|";
                return result.split(content).join("");
            })
            .then(result => {
                IStorage.setData(keyToStorage, result);
                var notes = result.split('|');
                var resString = '';
                for (var i = 0; i < notes.length - 1; i++) {
                    resString += '<br> <span class="bg-info">' + notes[i] +
                        (params.removeTask ? '<span class="glyphicon glyphicon-remove">' : '') + '</span></span>';
                }
                var position = cell.innerHTML.indexOf('<br>');
                var newValue = cell.innerHTML.slice(0, position);
                cell.innerHTML = newValue + resString;
            })
    }
}

var addChangeMonth = function (headerElement, calendarElement, params) {
    if (headerElement) {
        headerElement.addEventListener('click', (event) => {
            if (params.changeMonth) {
                if (event.target.matches('.glyphicon')) {
                    params.month += event.target.matches('.backward') ? -1 : 1;
                    if (params.month <= 0) {
                        params.month = 12;
                        params.year--;
                    } else if (params.month >= 13) {
                        params.month = 1;
                        params.year++;
                    }
                    if (params.showDate) {
                        var datePlace = document.getElementById("datePlace" + params.element);
                        datePlace.innerHTML = params.month + "/" + params.year;
                    }
                    drawCalendar(params.year, params.month, calendarElement);
                    addInfo(calendarElement.firstChild.firstChild, params, IStorage);
                }
            }
        });
    }
};
var addNotes = function (element, params, IStorage, IGetInfo) {
    if (params.addTask) {
        element.addEventListener('click', (event) => {
            if (event.target.matches('td') && +event.target.innerHTML.length > 0) {
                var keyToStorage = params.element + params.year + event.target.className;
                IGetInfo.getDateInfo()
                    .then(result => {
                        if (event.target.innerHTML.indexOf('>' + result + '<') != -1) {
                            return '';
                        }
                        let resultToElement = result !== '' ? ('<br> <span class="bg-info">' + result
                            + (params.removeTask ? '<span class="glyphicon glyphicon-remove">' : '') + '</span></span>') : "";
                        event.target.innerHTML += resultToElement;
                        return result !== '' ? result : "";
                    })
                    .then(result => result !== "" ? IStorage.addData(keyToStorage, result + '|') : "");
            }
            if (params.removeTask) {
                addRemoveNotes(event, params, IStorage);
            }
        });
    }
};