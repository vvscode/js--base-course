window.location.hash = 'calendar';

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

var pages = {
    code: handleCodePage,
    calendar: handleCalendarPage
}

Calendar(calendarParams);

//обработчик клика по ссылкам

window.addEventListener('hashchange', (ev) => {
    let hash = window.location.hash.split('#')[1];
    (pages[hash] || handleCalendarPage)();

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
    var strFormControl;
    strFormControl = ['<legend>Configure calendar</legend>',
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
    //Добавление селектора дат
    var selectMonth = document.createElement('select');
    selectMonth.className = "form-form-control selectMonth";
    for (var index = 1; index <= 12; index++) {
        var elementOption = document.createElement('option');
        elementOption.value = index;
        elementOption.innerHTML = index;
        selectMonth.appendChild(elementOption);
    }

    var selectYear = document.createElement('select');
    selectYear.className = "form-form-control selectYear";
    for (var index = 1900; index <= 2050; index++) {
        var elementOption = document.createElement('option');
        elementOption.value = index;
        elementOption.innerHTML = index;
        selectYear.appendChild(elementOption);
    }
    divDate.appendChild(selectYear);
    group.appendChild(divDate);
    divDate.appendChild(selectMonth);
    var selectedOption = selectMonth.querySelector('[value= "' + calendarParams.month + '"]');
    selectedOption.selected = true;
    selectedOption = selectYear.querySelector('[value= "' + calendarParams.year + '"]');
    selectedOption.selected = true;
}




function handleCodePage() {

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

        Calendar(calendarParams);
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
    divForTextArea.innerHTML += '<span>*If you want to add two inentical calendars generate new ID</span><br>';
    divForTextArea.innerHTML += '<button class="btn btn-default" onclick="buttonNewIdHandler()">Generate new ID</button>'


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
    Calendar(calendarParams);

    //поместить сгенерированный код в textarea
    var codeCalendar = document.querySelector(".codeCalendar");
    codeCalendar.value = generateScript(calendarParams);



};

function handleCalendarPage() {
    window.document.title = "Calendar" + calendarParams.month + "/" + calendarParams.year;
    document.querySelector('.settings').innerHTML = "";
    calendarParams.element = 'maincalendar';
    Calendar(calendarParams);
};

function buttonNewIdHandler() {
    var codeCalendar = document.querySelector(".codeCalendar");
    codeCalendar.value = generateScript(calendarParams);
}

function generateScript(param) {
    return '<script src="https://cdn.rawgit.com/Citrinin/js--base-course/04/04/ht/Citrinin/calendar.script.js"></sc' + 'ript> \n\
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
    return "calendar" + Math.round((Math.random() * 1e16));
}