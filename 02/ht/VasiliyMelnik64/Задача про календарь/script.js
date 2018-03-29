function drawCalendar(year, month, el) { 
    var date = new Date(year, month-1);
    function defineDayOfTheWeek(date) { 
        var dayOfTheWeek = date.getDay();
        if (dayOfTheWeek == 0) {
            dayOfTheWeek = 7;
        }
        return dayOfTheWeek - 1;
    }
    var table = '<table><tr><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr><tr>';
    for (var i = 0; i < defineDayOfTheWeek(date); i++) {
        table += '<td></td>';
    }
    while (date.getMonth() == month - 1) {
        table += '<td>' + date.getDate() + '</td>';
        if (defineDayOfTheWeek(date) % 7 == 6) {
            table += '</tr><tr>';
        }
        date.setDate(date.getDate() + 1);
    }
    if (defineDayOfTheWeek(date) != 0) {
        for (i = defineDayOfTheWeek(date); i < 7; i++) {
            table += '<td></td>';
        }
    }
    table += '</td></table>';
    el.innerHTML = '';
    el.innerHTML = table;
}

function drawInteractiveCalendar(el) {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var calendarBlock = document.getElementById('calendar-block');
    var tasks = document.getElementById('tasks');
    var clear = document.getElementById('clearStorage');
 
    if (addEventListener) {
        calendarBlock.addEventListener('click', addActivity, false);
        clear.addEventListener('click', clearStorage);
        window.addEventListener('load', fillTasks);
    }
    else if (attachEvent) {
        calendarBlock.attachEvent('onclick', addActivity);
        clear.attachEvent('onclick', clearStorage);
        window.attachEvent('onload', fillTasks);
    }
    else {
        calendarBlock.onclick = addActivity;
        clear.onclick = clearStorage;
        window.onload = fillTasks;
    }
    writeDate(month, year);

    function addActivity(e) {
        if (e.target.tagName == 'BUTTON') { 
            addListing(e.target);
        }
        if (e.target.tagName == 'TD' && +e.target.innerHTML > 0) { 
            addData(e.target);
        }
        writeDate(month, year);
    }

    function addListing(button) {
        var step = +button.getAttribute("data-step");
        writeDate(month, year);
        month += step;  
        if (month > 12) { 
            month = 1;
            year++;
        }
        if (month < 1) { 
            month = 12;
            year--;
        }
        drawCalendar(year, month, el);
    }

    function fillTasks() {
        var keys = Object.keys(localStorage);
        keys.forEach(function (elem, i, arr) { 
            tasks.innerHTML += '<p>' + localStorage.getItem(elem) + '</p>';
        });
    }
    function clearStorage() { 
        for (var prop in localStorage) {
            localStorage.removeItem(prop);
        }
        location.reload();
    }

    function addData(elem) {
        var tasks = document.getElementById('tasks');
        var day = elem.innerHTML;
        var property = (day < 10 ? '0'+ day : day) + '.' + (month < 10 ? '0'+ month : month) + '.' + year;
        var message = prompt('Введите сообщение: ');
        if (message === null || message === '') {
            return;
        }
        localStorage.setItem(property, property+': '+message);
        var note = '<p>' + localStorage.getItem(property) + '</p>';
        tasks.innerHTML += note;
        
    } 
    function writeDate(month, year) { 
        var elementWithDate = document.getElementById('date');
        var monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        elementWithDate.innerHTML = monthes[month - 1] + ' ' + year;

    }
    drawCalendar(year, month, el);
}