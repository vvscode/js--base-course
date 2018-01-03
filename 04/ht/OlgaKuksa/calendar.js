
//var currCalendar=new Calendar(1,1,1,1,new Date(2017,10,1),111);



function Calendar(showMonthYear, allowPrevNext, allowAddTask, allowRemoveTask, defDate, calendarID) {
this.calendarID = "calendar" + calendarID || "calendar" + Math.floor(Math.random() * 10000);
    this.showMonthYear = showMonthYear;
    this.allowPrevNext = allowPrevNext;
    this.allowAddTask = allowAddTask;
    this.allowRemoveTask = allowRemoveTask;
    this.defDate = new Date(defDate.getFullYear(), defDate.getMonth(), 1);
    this.monthTasks=[];
    //calling function to draw calendar
    this.drawIntCalendar();
}

Calendar.prototype.drawIntCalendar = function () {
    var elem = document.getElementById(this.calendarID);
    if (!elem) {
        elem = document.createElement("div");
        elem.setAttribute("id", this.calendarID);
        elem.setAttribute("class", "calendar");
        document.body.appendChild(elem);
    }
    getState(this);
    this.drawCalendar(elem);
    // if add is enabled set EventListener with date cell
    if (this.allowAddTask) {
        elem.addEventListener("dblclick", addTask.bind(this));
    }
    //EventListeners for PrevNext
    if (this.allowPrevNext) {
        elem.addEventListener("click", showPrevNext.bind(this));
    }
    // event listener to call function to remove task
    if (this.allowRemoveTask)
        elem.addEventListener("click", removeTask.bind(this));

};
//draws calendar template
Calendar.prototype.drawCalendar=function(elem) {
    var date = this.defDate;
    var numberOfDays = ([3, 5, 8, 10].includes(date.getMonth())) ? 30 : 31;
    if (date.getMonth() == 1) numberOfDays = (date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0) ? 29 : 28;
    var dayOfWeek1 = date.getDay();
    var calendarTable = "<table  class='calendar-table' style='empty-cells: hide'>";
    //configurable header
    if (this.allowPrevNext) calendarTable += "<caption><button class='prevMonth'><</button>";
    else calendarTable += "<caption>";
    if (this.showMonthYear) calendarTable += (date.getMonth() + 1) + "/" + date.getFullYear();
    if (this.allowPrevNext) calendarTable += "<button class='nextMonth'>></button></caption>";
    else calendarTable += "</caption>"
    //caption - filling days of week cells
    calendarTable += "<tr bgcolor='#e6e6fa'><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr>";
    //sunday =7
    if (dayOfWeek1 == 0) dayOfWeek1 = 7;
    // filling date cells
    //filling prev month with empty spaces
    for (var i = 1; i < dayOfWeek1; i++)
        calendarTable += "<td></td>";
    for (var i = 1; i <= numberOfDays; i++) {
        calendarTable += "<td class='calendar-cell'><span class='calendar-day'>" + i + "</span></td>";
        //going to next line
        if ((dayOfWeek1 + i - 1) % 7 == 0 && i != numberOfDays) calendarTable += "</tr><tr>"
    }
    calendarTable += "</tr></table>";
    elem.innerHTML = calendarTable;
    if (this.allowAddTask || this.allowRemoveTask) {
        getData(this);
        sendDataToCalendar(1, this.monthTasks.length, this);
    }
};

function drawTaskInDay(task, day, calendarObj) {
    if (task == "") return;
    var taskToAdd = document.createTextNode(task);
    var elemToAdd = document.createElement("div");
    elemToAdd.className = "calendar-cell-text";
    elemToAdd.appendChild(taskToAdd);
    if (calendarObj.allowRemoveTask) {
        var iconToDel = document.createElement("span");
        iconToDel.setAttribute("class", "delIcon");
        iconToDel.innerHTML = "x";
        elemToAdd.appendChild(iconToDel);
    }
    var cellsToAddTo = document.getElementById(calendarObj.calendarID).getElementsByClassName("calendar-cell");
    for (var i = 0; i < cellsToAddTo.length; i++) {
        if (cellsToAddTo[i].firstChild.innerHTML == day) {
            cellsToAddTo[i].appendChild(elemToAdd);
            return;
        }
    }
};

function refreshCell(day, calendarObj) {

    var cellsToClear = document.getElementById(calendarObj.calendarID).getElementsByClassName("calendar-cell");
    for (var i = 0; i < cellsToClear.length; i++) {
        if (cellsToClear[i].firstChild.innerHTML == day) {
            var tdCell = cellsToClear[i];
            while (tdCell.firstChild != tdCell.lastChild) tdCell.removeChild(tdCell.lastChild);
        }
    }
    sendDataToCalendar(day, day + 1, calendarObj);
}

function addTask(event) {
    if (event.target.className != 'calendar-cell' && event.target.parentNode.className != 'calendar-cell') return;
    var target = event.target;
    var day;
    if (target.tagName != "TD") day = target.parentNode.firstChild.innerHTML;
    else {
        day = target.firstChild.innerHTML;
    }
    var date = new Date(this.defDate.getFullYear(), this.defDate.getMonth(), day);
    var task = getTask(date);
    if (task != "" && task != null) {
        addDayTask(task.trim(), date, this);
        setData(this, date);
        drawTaskInDay(task.trim(), date.getDate(), this);
    };
}

function showPrevNext(event) {
    if (event.target.className != "prevMonth" && event.target.className != "nextMonth") return;
    var elem = document.getElementById(this.calendarID);
    var month = this.defDate.getMonth();
    var year = this.defDate.getFullYear();

    if (event.target.className == "prevMonth") {
        if (month == 0) {
            month = 11;
            year -= 1;
        }
        else month -= 1;
    }
    if (event.target.className == "nextMonth") {
        if (month == 11) {
            month = 0;
            year += 1;
        }
        else month += 1;
    }
    this.defDate.setFullYear(year, month, 1);
    setState(this);
    this.drawCalendar(elem);
}

function removeTask(event) {
    var target = event.target;
    if (target.className != 'delIcon') return;
    var day = parseInt(target.parentNode.parentNode.firstChild.innerHTML);
    var task = target.parentNode.innerText;
    task = task.substring(0, task.length - 1);
    var remDate = new Date(this.defDate.getFullYear(), this.defDate.getMonth(), day);
    var shouldRemove = confirmTaskRemoval(task, remDate);
    if (!shouldRemove) return;
    removeDayTask(task, day, this);
    setData(this, remDate);
    refreshCell(day, this);
}