var promptGetUserInfo = {
    getDateInfo: () => Promise.resolve(prompt("Add task "))
}

var lsStorage = {
    getData: (key) => Promise.resolve(localStorage.getItem(key)),
    setData: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    addData: (key, value) => Promise.resolve(localStorage.setItem(key, (localStorage.getItem(key) ? localStorage.getItem(key) : '') + value))
}

function CalendarObject(allowChangeMonth, allowAddTasks, allowRemoveTasks, showMonthYear, currentDate, calendarId) {
    this.calendarId = "calendarId" + calendarId || "calendarId" + Math.floor(Math.random() * 10000);
    this.allowChangeMonth = allowChangeMonth;
    this.allowAddTasks = allowAddTasks;
    this.allowRemoveTasks = allowRemoveTasks;
    this.showMonthYear = showMonthYear;
    this.currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.monthTasks;

    this.drawInterectiveCalendar();

}

CalendarObject.prototype.drawInterectiveCalendar = function () {
    var htmlElem = document.getElementById(this.calendarId);
    if (!htmlElem) {
        htmlElem = document.createElement('div');
        htmlElem.setAttribute('id', this.calendarId);
        htmlElem.setAttribute('class', 'calendar-container');
        document.body.appendChild(htmlElem);
    }

    setCalendarOptionsFromLocalStorageToCalendarObj(this);
    drawCalendar(this, htmlElem);
    if (this.allowAddTasks) {
        processTaskAdd(this, htmlElem);
    }
    if (this.allowChangeMonth) {
        processMonthChange(this, htmlElem);
    }
    if (this.allowRemoveTasks) {
        processTaskRemove(this, htmlElem);
    }
};

function processTaskAdd(calendarObject, htmlElem) {
    htmlElem.addEventListener('dblclick', function (event) {
        if (event.target.className != 'dayTask' && event.target.parentNode.className != 'dayTask') {
            return;
        }
        var target = event.target;
        var selectedDay;
        if (target.tagName != 'TD') {
            selectedDay = target.parentNode.firstChild.innerHTML;
        }
        else {
            selectedDay = target.firstChild.innerHTML;
        }
        var date = new Date(calendarObject.currentDate.getFullYear(), calendarObject.currentDate.getMonth(), selectedDay);
        /*var task = getTask();
        if (task != '' && task != null) {
            addTaskToDayInMonthTasksInCalendarObj(task.trim(), date, calendarObject);
            setDataToLocalStorage(calendarObject, date);
            drawTaskInCell(task.trim(), date.getDate(), calendarObject);
        }*/
        promptGetUserInfo.getDateInfo().then(result => {
            addTaskToDayInMonthTasksInCalendarObj(result.trim(), date, calendarObject);
            setMonthTasksToLocalStorage(calendarObject, date);
            drawTaskInCell(result.trim(), date.getDate(), calendarObject);
        });

    }.bind(calendarObject));
}

function processMonthChange(calendarObject, htmlElem) {
    htmlElem.addEventListener('click', function (event) {
        if (event.target.className != 'prevMonth' && event.target.className != 'nextMonth') {
            return;
        }
        var target = event.target;
        var monthSelected = calendarObject.currentDate.getMonth();
        var yearSelected = calendarObject.currentDate.getFullYear();
        if (target.className == 'prevMonth') {
            if (monthSelected == 0) {
                monthSelected = 11;
                yearSelected -= 1;
            }
            else {
                monthSelected -= 1;
            }

        }
        if (target.className == 'nextMonth') {
            if (monthSelected == 11) {
                monthSelected = 0;
                yearSelected += 1;
            }
            else {
                monthSelected += 1;
            }
        }
        this.currentDate.setFullYear(yearSelected, monthSelected, 1);
        setCalendarOptionsToLocalStorage(calendarObject);
        drawCalendar(calendarObject, htmlElem);
    }.bind(calendarObject));
}

function processTaskRemove(calendarObject, htmlElem) {
    htmlElem.addEventListener('click', function (event) {
        if (event.target.className != 'removeIcon') {
            return;
        }
        var dayNumber = parseInt(event.target.parentNode.parentNode.firstChild.innerHTML);
        var taskText = event.target.parentNode.innerText;
        taskText = taskText.substring(0, taskText.length - 1);
        var removeDate = new Date(calendarObject.currentDate.getFullYear(), calendarObject.currentDate.getMonth(), dayNumber);
        var confirmRemove = confirmTaskRemove(taskText, removeDate);
        if (confirmRemove) {
            removeDayTask(taskText, dayNumber, calendarObject);
            setMonthTasksToLocalStorage(calendarObject, removeDate);
            refreshCell(dayNumber, calendarObject);
        }
        else {
            return;
        }
    }.bind(calendarObject));
}


function setCalendarOptionsFromLocalStorageToCalendarObj(calendarObj) {
    lsStorage.getData(calendarObj.calendarId + "Options").then(result => {
        var cal = JSON.parse(result);
        if (cal == null) { setCalendarOptionsToLocalStorage(calendarObj); return; }    
        calendarObj.currentDate = new Date(cal.currentDate);
        Object.keys(cal).forEach(function (key) {
            if (key != "currentDate") calendarObj[key] = cal[key];
        });
    });
}

function setCalendarOptionsToLocalStorage(calendarObj) {
    lsStorage.setData(calendarObj.calendarId + "Options", JSON.stringify(calendarObj));
}

function setMonthTasksFromLocalStorageToCalendarObj(calendarObj) {
    lsStorage.getData(generateKey(calendarObj.currentDate, calendarObj.calendarId)).then(result =>{
        var data = JSON.parse(result);
        if (data != null) calendarObj.monthTasks = data;
        else calendarObj.monthTasks = Array(32).fill("");
        DrawTasksDataInCalendar(1, calendarObj.monthTasks.length, calendarObj);
    });
}

function setMonthTasksToLocalStorage(calendarObj, date) {
    lsStorage.setData(generateKey(date, calendarObj.calendarId), JSON.stringify(calendarObj.monthTasks));
}

function addTaskToDayInMonthTasksInCalendarObj(task, day, calendarObject) {
    if (calendarObject.monthTasks[day.getDate()] == '') {
        calendarObject.monthTasks[day.getDate()] = task;
    }
    else {
        calendarObject.monthTasks[day.getDate()] += '\u0195' + task;
    }
}

function removeDayTask(task, day, calendarObject) {
    var taskPosition = calendarObject.monthTasks[day].indexOf(task);
    if (!taskPosition) {
        calendarObject.monthTasks[day] = calendarObject.monthTasks[day].replace(task, '');
    } else {
        calendarObject.monthTasks[day] = calendarObject.monthTasks[day].replace('\u0195' + task, '');
    }
}

function refreshCell(day, calendarObject) {
    var tdCellsOfMonth = document.getElementById(calendarObject.calendarId).getElementsByClassName('dayTask');
    for (var i = 0; i < tdCellsOfMonth.length; i++) {
        if (tdCellsOfMonth[i].firstChild.innerHTML == day) {
            tdCellOfDay = tdCellsOfMonth[i];
            while (tdCellOfDay.firstChild != tdCellOfDay.lastChild) {
                tdCellOfDay.removeChild(tdCellOfDay.lastChild);
            }
        }
    }
    DrawTasksDataInCalendar(day, day + 1, calendarObject);
}

function drawTaskInCell(task, day, calendarObject) {
    if (task == '') {
        return;
    }
    var taskToAdd = document.createElement('div');
    taskToAdd.className = 'addedTask';
    var taskText = document.createTextNode(task);
    taskToAdd.appendChild(taskText);
    if (calendarObject.allowRemoveTasks) {
        var removeIcon = document.createElement('span');
        removeIcon.innerHTML = 'x';
        removeIcon.setAttribute('class', 'removeIcon');
        taskToAdd.appendChild(removeIcon);
    }
    var tdCellsOfMonth = document.getElementById(calendarObject.calendarId).getElementsByClassName('dayTask');
    for (var i = 0; i < tdCellsOfMonth.length; i++) {
        if (tdCellsOfMonth[i].firstChild.innerHTML == day) {
            tdCellsOfMonth[i].appendChild(taskToAdd);
            return;
        }
    }
};

function generateKey(date, calendarId) {
    return calendarId + "-" + date.getMonth() + "/" + date.getFullYear();
};

function DrawTasksDataInCalendar(firstDayOfMonth, lastDayOfMonth, calendarObject) {
    for (var i = firstDayOfMonth; i < lastDayOfMonth; i++) {
        if (calendarObject.monthTasks[i] == '') {
            continue;
        }
        var taskToDraw = calendarObject.monthTasks[i].split('\u0195');
        taskToDraw.forEach(function (task) {
            drawTaskInCell(task, i, calendarObject);
        });
    }

}

function getTask() {
    return prompt("Add task ");
}




function confirmTaskRemove(task, date) {
    return confirm("Are you sure you want to remove \"" + task + "\" scheduled for " + date.toLocaleDateString("EN-us", { year: 'numeric', month: 'long', day: 'numeric' }) + "?");
}

function drawCalendar(calendarObject, element) {
    var currentDate = calendarObject.currentDate;
    var firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth());
    var lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    var numberOfSunday = 7;
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var table = '<table><p>';
    if (calendarObject.allowChangeMonth) {
        table += '<button class ="prevMonth"><</button><button class ="nextMonth">></button>';
    }
    if (calendarObject.showMonthYear) {
        table += monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
    }
    table += '</p>';
    table += '<tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';
    function changeDayNumberIfSunday(dayNumber) {
        // if Sunday then 0 will be transfer in changeDayNumberIfSunday function as a parameter
        if (dayNumber === 0) { dayNumber = numberOfSunday };
        return dayNumber;
    }

    //fill the table with empty cells, which are accepted for the previous month days
    for (var i = 1; i < changeDayNumberIfSunday(firstDayOfMonth.getDay()); i++) {
        table += '<td></td>';
    }
    //fill the table with current month days
    for (var i = 1; i <= lastDayOfMonth.getDate(); i++) {
        table += '<td class = "dayTask"><span>' + i + '</span></td>';
        if (changeDayNumberIfSunday(firstDayOfMonth.getDay()) == numberOfSunday) {
            table += '</tr><tr>';
        }
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    table += '</tr></table>';
    element.innerHTML = table;
    if (calendarObject.allowAddTasks || calendarObject.allowRemoveTasks) {
        setMonthTasksFromLocalStorageToCalendarObj(calendarObject);
        
    }
}