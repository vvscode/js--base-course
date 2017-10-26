function drawInterectiveCalendar(year, month, htmlEl) {
    htmlEl.innerHTML = null;
    //document.getElementById()
    document.getElementById('calendar-notes').innerHTML = localStorage.getItem('dayComment') || null;
    var calendar = document.createElement('div');
    calendar.id = 'calendar';

    var calendarCaption = document.createElement('tr');
    calendarCaption.id = 'calendar-caption';

    var prev = document.createElement('td');
    var btnPrevMonth = document.createElement('button');
    btnPrevMonth.id = 'prev';
    btnPrevMonth.innerText = '<';
    prev.appendChild(btnPrevMonth);

    var next = document.createElement('td');
    var btnNextMonth = document.createElement('button');
    btnNextMonth.id = 'next';
    btnNextMonth.innerText = '>';
    next.appendChild(btnNextMonth);

    var currentMonth = document.createElement('td');
    currentMonth.id = 'current-month';
    currentMonth.style.textAlign = 'center';

    calendarCaption.appendChild(prev);
    calendarCaption.appendChild(currentMonth);
    calendarCaption.appendChild(next);
    calendar.appendChild(calendarCaption);
    htmlEl.appendChild(calendar);
    drawCalendar(year, month, calendar);
    var btnPrevMonthAction = document.getElementById('prev');
    btnPrevMonthAction.addEventListener('click', function () {
        drawInterectiveCalendar(currentDate.getFullYear(), currentDate.getMonth() - 1, calendarWrapper)
    });
    var btnNextMonthAction = document.getElementById('next');
    btnNextMonthAction.addEventListener('click', function () {
        drawInterectiveCalendar(currentDate.getFullYear(), currentDate.getMonth() + 1, calendarWrapper)
    });

    calendar.onclick = function (event) {
        var target = event.target;
        if (target.tagName === 'TD' && target.innerHTML) {
            var dayComment = prompt('Write comment for selected day');
            if (dayComment === '') {
                addDateComment(target, 'No comments');
            }
            else {
                addDateComment(target, dayComment);
            }
        }
        localStorage.dayComment = document.getElementById('calendar-notes').innerHTML;
    }

    function addDateComment(selectedDay, dayComment) {
        var newComment = document.createElement('div');
        newComment.innerHTML = selectedDay.innerHTML + '.' + month + '.' + year + ': ' + dayComment;
        document.getElementById('calendar-notes').appendChild(newComment);
    }

}
function drawCalendar(year, month, htmlEl) {
    var firstDayOfMonth = new Date(year, month - 1);
    var lastDayOfMonth = new Date(year, month, 0);
    var numberOfSunday = 7;
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var table = '<table><tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';
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
        table += '<td>' + i + '</td>';
        if (changeDayNumberIfSunday(firstDayOfMonth.getDay()) == numberOfSunday) {
            table += '</tr><tr>';
        }
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    table += '</tr></table>';
    var curMonthInCaption = document.getElementById('current-month')
    curMonthInCaption.innerText = monthNames[month - 1] + ' ' + year;
    currentDate = firstDayOfMonth;
    htmlEl.innerHTML += table;
}
var currentDate;
var calendarWrapper = document.getElementById('calendar-wrapper');
drawInterectiveCalendar(2017, 10, calendarWrapper);