//стартовый календарь
var calendarParams = {
    element: 'maincalendar',
    changeMonth: true,
    addTask: true,
    removeTask: true,
    showDate: true,
    year: (new Date()).getFullYear(),
    month: (new Date()).getMonth() + 1
};
CalendarModule(calendarParams);

//обработчик клика по ссылкам
document.body.addEventListener('click', (ev) => {
    if (!ev.target.matches('a')) return;
    ev.preventDefault();
    let url = ev.target.getAttribute('href');
    window.location.hash = url;
    urlHandle(url);
});

//Функция для создания настроек календаря
function drawCreationWindow(htmlElement) {
    var mainDiv = document.createElement('div');
    mainDiv.className = "col-md-6 col-md-offset-3";
    htmlElement.appendChild(mainDiv);
    var formControl = document.createElement('form');
    mainDiv.appendChild(formControl);
    var group = document.createElement('fieldset');
    group.class = "scheduler-border";
    formControl.appendChild(group);
    var strFormControl = ['<legend>Configure calendar</legend>',
        "<div class=\"checkbox\"> <label><input type=\"checkbox\" value=\"changeMonth\"",
        calendarParams.changeMonth ? " checked " : "",
        "> Allow change month </label></div>",
        "<div class=\"checkbox\"> <label><input type=\"checkbox\" value=\"addTask\"",
        calendarParams.addTask ? " checked " : "",
        " > Allow add tasks </label></div>",
        "<div class=\"checkbox\"> <label><input type=\"checkbox\" value=\"removeTask\"",
        calendarParams.removeTask ? " checked " : "",
        " > Allow remove tasks </label></div>",
        "<div class=\"checkbox\"> <label><input type=\"checkbox\" value=\"showDate\"",
        calendarParams.showDate ? " checked " : "",
        " > Show month / year </label></div>"
    ].join("");

    group.innerHTML = strFormControl;

    var divDate = document.createElement('div');
    var currentDate = new Date();
    //Добавление месяцев
    var selectMonth = document.createElement('select');
    selectMonth.className = "form-form-control selectMonth";
    for (var month = 1; month <= 12; month++) {
        var elementOption = document.createElement('option');
        if (month == currentDate.getMonth() + 1) {
            elementOption.selected = "selected";
        }
        elementOption.innerHTML = month;
        selectMonth.appendChild(elementOption);
    }
    divDate.appendChild(selectMonth);
    var selectYear = document.createElement('select');
    selectYear.className = "form-form-control selectYear";
    for (var year = 1900; year <= 2050; year++) {
        var elementOption = document.createElement('option');
        if (year === currentDate.getFullYear()) {
            elementOption.selected = "selected";
        }
        elementOption.innerHTML = year;
        selectYear.appendChild(elementOption);
    }
    divDate.appendChild(selectYear);
    group.appendChild(divDate);
}

function urlHandle(url) {
    if (url === "code") {
        window.document.title = "Create calendar!";
        document.querySelector("#maincalendar").innerHTML = "";
        var codeElement = document.querySelector(".settings");
        codeElement.innerHTML = "";
        var settingsDiv = document.createElement('div');
        codeElement.appendChild(settingsDiv);
        drawCreationWindow(settingsDiv);

        settingsDiv.addEventListener('click', (event) => {
            if (event.target.matches("[type=checkbox]")) {
                calendarParams[event.target.value] = event.target.checked;
            } else if (event.target.matches(".selectMonth")) {
                calendarParams.month = event.target.value;
            } else if (event.target.matches(".selectYear")) {
                calendarParams.year = event.target.value;
            }

            CalendarModule(calendarParams);
            var codeCalendar = document.querySelector(".codeCalendar");
            codeCalendar.value = generateScript(calendarParams);


        });

        //Превью календаря и исходный код
        //код
        var codeText = document.createElement('textarea');
        codeText.rows = 10;
        codeText.className = "form-control noresize codeCalendar";
        var divForTextArea = document.createElement('div');
        divForTextArea.className = "col-md-6";
        divForTextArea.appendChild(codeText);

        //превью календаря
        var divCalendarPreview = document.createElement('div');
        divCalendarPreview.className = "control-label col-md-6";
        divCalendarPreview.id = "calendarPreview";
        //контейнер для кода и превью
        var bottomDiv = document.createElement('div');
        bottomDiv.className = "form-group";
        bottomDiv.appendChild(divForTextArea);
        bottomDiv.appendChild(divCalendarPreview);
        codeElement.appendChild(bottomDiv);

        //поместить сгенерированный календарь в превью
        calendarParams.element = "calendarPreview";
        CalendarModule(calendarParams);

        //поместить сгенерированный код в textarea
        var codeCalendar = document.querySelector(".codeCalendar");
        codeCalendar.value = generateScript(calendarParams);

    } else if (url === "calendar") {
        window.document.title = "Calendar" + calendarParams.month + "/" + calendarParams.year;
        document.querySelector('.settings').innerHTML = "";
        calendarParams.element = 'maincalendar';
        CalendarModule(calendarParams);
    }
};


function generateScript(param) {
    return '<script src="https://cdn.rawgit.com/zenby/js--base-course/04/04/ht/EvgeniyDainovich/calendar.script.js"></sc' + 'ript> \n\
<script> \n\t(function(){ \n\
\t\tvar id = "' + getCalendarKey() + '"; \n\
\t\tdocument.write("<div id= " + id + "></div>"); \n\
\t\tnew Calendar({ \n\
\t\telement: id,  \n\
\t\tshowDate:' + param.showDate + ' , \n\
\t\tchangeMonth: ' + param.changeMonth + ', \n\
\t\taddTask: ' + param.addTask + ', \n\
\t\tremoveTask: ' + param.removeTask + ', \n\
\t\tyear: ' + param.year + ' ,\n\
\t\tmonth: ' + param.month + '\n\
\t\t}) \n\
\t})(); \n\
</sc' + 'ript>';
}

function getCalendarKey() {
    return "calendar" + Math.random();
}
