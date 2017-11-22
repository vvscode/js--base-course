var calendarsStorage = {};
var currTableForCalendars = {};

function getCurrDateValue(calendarId){
    var dateValue = calendarsStorage[calendarId];
    if(!dateValue){
        var options = arguments[1];
        if(options){
            dateValue = {
                month: options.date.getMonth() + 1,
                year: options.date.getFullYear()
            };
        } else{
            dateValue = {
                month: (new Date()).getMonth(),
                year: (new Date()).getFullYear()
            };
        }
        this.fillCalendarData(calendarId, dateValue);
    }
    return dateValue;
}

function changeOptions(calendarId, options) {
    var dateValue = getCurrDateValue(calendarId);
    dateValue.options = options;
    if(options.date){
        dateValue.month = options.date.getMonth() + 1;
        dateValue.year = options.date.getFullYear();

    }
    setCurrDateValue(calendarId, dateValue);
}


/**
 * Object stores calendarId and current month and year for this calendar
 * @type {{}}
 */
function fillCalendarData(calendarId, dateValue){
    calendarsStorage[calendarId] = dateValue;
}

function setCurrDateValue(calendarId, currDateValue){
    calendarsStorage[calendarId] = currDateValue;
}

function getCurrentMonth(calendarId){
    return getCurrDateValue(calendarId).month;
}

function getCurrentYear(calendarId){
    return getCurrDateValue(calendarId).year;
}

function constructTable(year, month, calendarDiv){
    var calendarId = calendarDiv.id;
    var tableId = calendarId + '_' + month + '_' + year;
    var newTbl = document.createElement('table');
    newTbl.className = 'calendarTable';
    newTbl.innerHTML = createTableHTML(year, month, calendarDiv);
    newTbl.id = tableId;

    var currCalendarState = getCurrDateValue(calendarId);
    var allowAdd = currCalendarState.options.allowAdd;
    var allowRemove = currCalendarState.options.allowRemove;

    if(allowAdd){
        newTbl.addEventListener("dblclick" , handleUserDoubleClick);
    }
    if(allowRemove){
        newTbl.addEventListener("click" , handleUserClick);
    }

    return newTbl;
}
/*
* We suppore that el is a method which draw just calendar
* Header and log area will be drawn outside this method
*
*/

function drawCalendarHeader(calendarDiv, options){
    // year / month area
    var calendarId = calendarDiv.id;
    var currDateValue = getCurrDateValue(calendarId);
    var showMonth = currDateValue.options.showMonth;
    var allowChangeMonth = currDateValue.options.allowChangeMonth;
    if(showMonth){
        var actualMonthYearArea = this.createMonthArea(calendarId);
    }
    // Calendar header
    var calendarHeaderId = calendarId  + 'HeaderId';
    var calendarHeader = document.getElementById(calendarHeaderId);
    if(!calendarHeader){
        calendarHeader = document.createElement('div');
        calendarHeader.id = calendarHeaderId;

        if(allowChangeMonth) {
            var buttonDecreaseId = calendarId + 'buttonDecrease';
            var buttonDecrease = createNavigationButton({
                id: buttonDecreaseId,
                value: '<',
                elemClass: 'buttonDecrease',
                clickListener: decreaseMonth
            });
            calendarHeader.appendChild(buttonDecrease);
        }
        if(showMonth){
            calendarHeader.appendChild(actualMonthYearArea);
        }
        if(allowChangeMonth){
            var buttonDecreaseId = calendarId + 'buttonIncrease';
            var buttonIncrease = createNavigationButton({
                id: buttonDecreaseId,
                value: '>',
                elemClass: 'buttonIncrease',
                clickListener: increaseMonth
            });
            calendarHeader.appendChild(buttonIncrease);
        }



    } else{
        if(showMonth) {
            var monthYearArea = calendarHeader.getElementsByClassName('monthYearArea')[0];
            if(monthYearArea){
                calendarHeader.replaceChild(actualMonthYearArea, monthYearArea);
            } else{
                calendarHeader.appendChild(actualMonthYearArea);
            }
        } else{
            var monthYearArea = calendarHeader.getElementsByClassName('monthYearArea')[0];
            if(monthYearArea){
                monthYearArea.remove();
            }
        }

        if(allowChangeMonth){
            var calendarAlreadyHaveButtons = calendarHeader.getElementsByClassName('buttonDecrease').length > 0;
            if(!calendarAlreadyHaveButtons){
                var buttonDecreaseId = calendarId + 'buttonDecrease';
                var buttonDecrease = createNavigationButton({
                    id: buttonDecreaseId,
                    value: '<',
                    elemClass: 'buttonDecrease',
                    clickListener: decreaseMonth
                });
                calendarHeader.appendChild(buttonDecrease);
                var buttonDecreaseId = calendarId + 'buttonIncrease';
                var buttonIncrease = createNavigationButton({
                    id: buttonDecreaseId,
                    value: '>',
                    elemClass: 'buttonIncrease',
                    clickListener: increaseMonth
                });
                calendarHeader.appendChild(buttonIncrease);
            }

        } else{
            var buttonDecrease = calendarHeader.getElementsByClassName('buttonDecrease')[0];
            if(buttonDecrease){
                buttonDecrease.remove();
            }
            var buttonIncrease = calendarHeader.getElementsByClassName('buttonIncrease')[0];
            if(buttonIncrease){
                buttonIncrease.remove();
            }
        }

    }

    // Add calendar header
    calendarDiv.appendChild(calendarHeader);
}

function drawCalendarBody(calendarDiv, options) {

    var currDateValue = getCurrDateValue(calendarDiv.id, options);
    var showMonth = currDateValue.options.showMonth;
    var allowChangeMonth = currDateValue.options.allowChangeMonth;

    var year = currDateValue.year;
    var month = currDateValue.month - 1;
    var calendarId = calendarDiv.id;
    var tableId = calendarId + '_' + month + '_' + year;

    var newTbl = constructTable(year, month, calendarDiv);

    // remove non actual table
    var oldTableId;
    if(currTableForCalendars[calendarId] &&
        currTableForCalendars[calendarId].hasOwnProperty('month') &&
        currTableForCalendars[calendarId].hasOwnProperty('year')){
        oldTableId = calendarId + '_' + currTableForCalendars[calendarId].month + '_' + currTableForCalendars[calendarId].year;
    }
    var oldTable = document.getElementById(oldTableId);
    if(oldTable){
        oldTable.remove();
    }

    // add redrwawed table
    calendarDiv.appendChild(newTbl);

    // update actual month and year for currne table
    currTableForCalendars[calendarId] = {
        month: month,
        year: year
    };
}

function createMonthArea(calendarId){
    var monthYearArea = document.createElement('div');
    monthYearArea.id = "monthYearAreaId";
    monthYearArea.innerHTML = getCurrentYear(calendarId) + ' / ' + getCurrentMonth(calendarId); // add + 1 because it influence on view
    monthYearArea.className = 'monthYearArea';

    return monthYearArea;
}

function createNavigationButton(options){
    var btn = document.createElement("input");
    btn.setAttribute("type", "button");
    btn.setAttribute("id", options['id']);
    btn.setAttribute("value", options['value']);
    btn.className = options['elemClass'];
    btn.addEventListener("click" , options['clickListener']);
    return btn;
}

function createTableHTML(year, month, calendarDiv){
    var daysInMonth = this.definNumberOfDayInMonth(month, year);
    var calendarId = calendarDiv.id;
    var tableId = calendarId + '_' + month + '_' + year;
    var tableHTML = '<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Th</th><th>Fr</th><th>Sat</th><th>Sun</th></tr><tr>';

    // Count first day of week from the first day of month
    var date = new Date(year, month, 1);
    //Pay atention here that day in month starts from 0, not from 1
    var dayOfWeek = date.getDay();

    // 1. Fill the beggining of table with empty cells (the beggining of month)
    var dayOfWeekNumber  = date.getDay() === 0 ?  daysInWeek - 1 : date.getDay() - 1;
    for (var i = 0; i < dayOfWeekNumber; i++) {
        tableHTML += '<td></td>';
    }

    // 2. Fill calendar cells with days
    var dao = new DAO(localStorage);
    for (i = 0; i < daysInMonth; i++) {
        dayOfWeek = dayOfWeek % daysInWeek >= 0 ? dayOfWeek % daysInWeek : dayOfWeek;
        var cellId = tableId + '_' + (i+1);

        tableHTML += '<td>' + '<div id=' + cellId + '>' + '<div class="dateArea">' +(i+1) + '</div>';

        var cellNotesList = dao.getCellNotes(cellId);
        if(cellNotesList){
            for( var j=0; j< cellNotesList.length ; j++){
                var userNoteWrapper = this.getUserNoteWrapper(cellNotesList[j]);
                userNoteWrapper.setAttribute('positionInListOfNotes', j);
                var userNoteHtml = getUserNoteHtml(userNoteWrapper);
                tableHTML += userNoteHtml;
            }

        }

        tableHTML +=  '</div>' + '</td>';

        if( dayOfWeek % daysInWeek === 0 ){
            tableHTML += '</tr>' + '<tr>'
        }
        dayOfWeek++;
    }

    // 3. Fill the rest of table with empty cells (the end of month)
    if(dayOfWeek !== 1){
        for (dayOfWeek; dayOfWeek < 7 + 1; dayOfWeek++) {
            tableHTML += '<td></td>';
        }
    }

    // Close table
    tableHTML += '</tr>' + '</table>';
    return tableHTML;
}

function getUserNoteWrapper (userNoteText){
    var noteAreaService = new NoteAreaService();
    var userNoteDiv = noteAreaService.constuctNote(userNoteText);
    var closeDiv = noteAreaService.constructCloseArea();

    var userNoteWrapper = document.createElement('div');
    userNoteWrapper.className = 'userWrapper';
    userNoteWrapper.appendChild(userNoteDiv);
    userNoteWrapper.appendChild(closeDiv);

    return userNoteWrapper;
}

function getUserNoteHtml(userNoteWrapper){
    var div = document.createElement('div');
    div.appendChild(userNoteWrapper);
    return div.innerHTML;

}

function definNumberOfDayInMonth (month, year){
    if (arr31days.indexOf(month) >= 0) {
        return 31;
    } else if (arr30days.indexOf(month) >= 0) {
        return 30;
    } else {
        var testDate = new Date(year, month, leapYearFebDays);
        // check if current year is leap-year
        return testDate.getMonth() === month ? leapYearFebDays : usualYearFebDay;
    }
}

function handleUserClick(){
    var target = event.target;

    // цикл двигается вверх от target к родителям до table
    while (target.tagName !== 'TABLE') {
        if(target.className == 'closeArea'){
            var noteAreaService = new NoteAreaService();
            noteAreaService.deleteNote(target);
            return;
        }
        target = target.parentNode;
    }
}

function handleUserDoubleClick(){
    var target = event.target;

    // цикл двигается вверх от target к родителям до table
    while (target.tagName !== 'TABLE') {
        if (target.tagName === 'TD' && target.hasChildNodes()) {
            var noteAreaService = new NoteAreaService();
            noteAreaService.addNote(target);
            return;
        }
        target = target.parentNode;
    }
}


function increaseMonth(){
    var buttonId = event.target.id;
    var calendarId = buttonId.substr(0,  buttonId.indexOf('buttonIncrease'));

    var currDateValue = getCurrDateValue(calendarId);

    currDateValue.month += 1;
    if(currDateValue.month > 12){
        currDateValue.month = 1;
        currDateValue.year += 1;
    }
    setCurrDateValue(calendarId, currDateValue);
    drawInteractiveCalendar(document.getElementById(calendarId));
}

function decreaseMonth(){
    var buttonId = event.target.id;
    var calendarId = buttonId.substr(0,  buttonId.indexOf('buttonDecrease'));

    var currDateValue = getCurrDateValue(calendarId);
    var currYear = currDateValue.year;
    var currMonth = currDateValue.month;

    currDateValue.month -= 1;
    if(currDateValue.month < 1){
        currDateValue.month = 12;
        currDateValue.year -= 1;
    }
    setCurrDateValue(calendarId, currDateValue);
    drawInteractiveCalendar(document.getElementById(calendarId))
}

function drawInteractiveCalendar (calendarDiv, options) {
    drawCalendarHeader(calendarDiv, options);
    drawCalendarBody(calendarDiv, options);
}



function DrawService(){
    this.noteAreaService = new NoteAreaService();

    this.drawInteractiveCalendar = function(calendarDiv, options){
        var calendarDivId = options.calendarDivId;
        var currDataValue = getCurrDateValue(calendarDivId, options);
        changeOptions(calendarDivId, options);
        drawInteractiveCalendar (calendarDiv, options);
    }
}

