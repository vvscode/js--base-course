function drawInterectiveCalendar(htmlEl) {
    htmlEl.innerHTML = null;
    var date = new Date();
    var monthSelected = date.getMonth();
    var yearSelected = date.getFullYear();
    var el = htmlEl;
    document.getElementById('calendar-notes').innerHTML = localStorage.getItem('dayComment') || null;
    drawCalendar(yearSelected, monthSelected, el);

    var modalWindow = document.getElementById("modalWindow");
    var comment = document.getElementById("comment");
    var okModalWindow = document.getElementById("ok");
    var cancelModalWindow = document.getElementById("cancel");
    var dayComment = "";
    htmlEl.addEventListener('click',function (event) {
        var target = event.target;
        if (target.tagName === 'TD' && target.innerHTML) {
            modalWindow.style.display = "block";
            okModalWindow.onclick = function () {
                dayComment = comment.value;

                if (dayComment === '') {
                    addDateComment(target, 'No comments');
                }
                else {
                    addDateComment(target, dayComment);
                }
                localStorage.dayComment = document.getElementById('calendar-notes').innerHTML;
                modalWindow.style.display = "none";
                comment.value = "";
            }

            cancelModalWindow.onclick = function () {
                modalWindow.style.display = "none";
            }
        }
        if (target.tagName = 'button') {
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
            drawCalendar(yearSelected, monthSelected, el);
        }
    });
    

    function addDateComment(selectedDay, dayComment) {
        var newComment = document.createElement('div');
        newComment.innerHTML = selectedDay.innerHTML + '.' + (monthSelected + 1) + '.' + yearSelected + ': ' + dayComment;
        document.getElementById('calendar-notes').appendChild(newComment);
    }

}
function drawCalendar(year, month, element) {
    var firstDayOfMonth = new Date(year, month);
    var lastDayOfMonth = new Date(year, month + 1, 0);
    var numberOfSunday = 7;
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var table = '<table><tr><button class ="prevMonth"><</button>' + monthNames[month] + ' ' + year + '<button class ="nextMonth">></button></tr>';

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
        table += '<td>' + i + '</td>';
        if (changeDayNumberIfSunday(firstDayOfMonth.getDay()) == numberOfSunday) {
            table += '</tr><tr>';
        }
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    table += '</tr></table>';
    element.innerHTML = table;
}
