var calendarPreview;

function drawSettingsLayout() {

    if (calendarPreview == null) {
        calendarPreview = new CalendarObject(1, 1, 1, 1, new Date(), 444444);
    }
    else {
        calendarPreview.drawInterectiveCalendar();
    }
    var section = document.createElement('section');
    section.setAttribute('id', 'scriptBar');
    section.appendChild(document.getElementById(calendarPreview.calendarId));
    document.body.appendChild(section);

    drawSettingsArea();
    drawScriptArea();
}

function drawSettingsArea() {
    var settingsArea = document.createElement('div');
    settingsArea.setAttribute('id', 'settingsArea');
    document.body.insertBefore(settingsArea, document.getElementById(calendarPreview.calendarId).parentNode);
    settingsArea.innerHTML = '<fieldset><legend>Configure Calendar</legend></fieldset>';
    var fieldset = document.getElementsByTagName("fieldset")[0];
    fieldset.appendChild(createElement('checkbox', 'allowChangeMonth', 'allowChange_Month', 'Allow change month', calendarPreview.allowChangeMonth));
    fieldset.innerHTML += '<br/>';
    fieldset.appendChild(createElement('checkbox', 'allowAddTasks', 'allowAdd_Tasks', 'Allow add tasks', calendarPreview.allowAddTasks));
    fieldset.innerHTML += '<br/>';
    fieldset.appendChild(createElement('checkbox', 'allowRemoveTasks', 'allowRemove_Tasks', 'Allow remove tasks', calendarPreview.allowRemoveTasks));
    fieldset.innerHTML += '<br/>';
    fieldset.appendChild(createElement('checkbox', 'showMonthYear', 'show_MonthYear', 'Show month & year', calendarPreview.showMonthYear));
    fieldset.innerHTML += '<br/>';

    var month = createElement('number', 'currMonth', 'currMonth', 'month');
    month.firstChild.setAttribute('min', '1');
    month.firstChild.setAttribute('max', '12');
    month.firstChild.setAttribute('value', calendarPreview.currentDate.getMonth() + 1);
    fieldset.appendChild(month);

    var year = createElement('number', 'currYear', 'currYear', 'year');
    year.firstChild.setAttribute('min', '1900');
    year.firstChild.setAttribute('value', calendarPreview.currentDate.getFullYear());
    fieldset.appendChild(year);

    settingAreaChangeHandler1(document.getElementById('settingsArea'));
}

function settingAreaChangeHandler1(settingArea) {
    settingArea.addEventListener('change', function (event) {
        var target = event.target;
        if (target.tagName != "INPUT") return;
        if (target.id == 'allowChange_Month') {
            calendarPreview.allowChangeMonth = +target.checked;
        }
        if (target.id == 'allowAdd_Tasks') {
            calendarPreview.allowAddTasks = +target.checked;
        }
        if (target.id == 'allowRemove_Tasks') {
            calendarPreview.allowRemoveTasks = +target.checked;
        }
        if (target.id == 'show_MonthYear') {
            calendarPreview.showMonthYear = +target.checked;
        }
        if (target.id == 'currMonth') {
            calendarPreview.currentDate = new Date(calendarPreview.currentDate.getFullYear(), target.value - 1, 2);
        }
        if (target.id == 'currYear') {
            calendarPreview.currentDate = new Date(target.value, calendarPreview.currentDate.getMonth(), 2);
        }
        setCalendarOptionsToLocalStorage(calendarPreview);

        var temp = document.getElementById(calendarPreview.calendarId);
        temp.parentNode.removeChild(temp);
        calendarPreview.drawInterectiveCalendar();
        document.getElementById('scriptBar').appendChild(document.getElementById(calendarPreview.calendarId));
        document.getElementsByTagName('TEXTAREA')[0].value = generateCalendarScript(calendarPreview);
    });
}

function drawScriptArea() {
    var scriptArea = document.createElement('div');
    scriptArea.setAttribute('id', 'scriptArea');
    var element = document.createElement('textarea');
    element.setAttribute('readonly', 'true');
    element.setAttribute('rows', '10');
    element.setAttribute('cols', '40');
    element.value = generateCalendarScript(calendarPreview);
    scriptArea.appendChild(element);
    document.getElementById('scriptBar').insertBefore(scriptArea, document.getElementById(calendarPreview.calendarId));
}

function generateCalendarScript(calendarObject) {
    //generate calendar script
    var id = "calendar"+Math.floor(Math.random() * 10000);
    var newCalendarScript ='<script src="https://rawgit.com/DimaLauraniuk/js--base-course/master/04/ht/DimaLauraniuk/calendarForm.js"></script>\n'
    +'<link rel ="stylesheet" href="https://rawgit.com/DimaLauraniuk/js--base-course/master/04/ht/DimaLauraniuk/style.css"></link>\n'
    +'<script>\n'
    +'(function(){\n'
    +'  var id = "calendar"+Math.floor(Math.random() * 10000); \n'
    +'  document.write(<div id ="'+id+'"></div>); \n'
    +'  new CalendarObject(' + calendarObject.allowChangeMonth + ','
    + calendarObject.allowAddTasks + ',' + calendarObject.allowRemoveTasks + ','
    + calendarObject.showMonthYear + ',' + 'new Date(' + calendarObject.currentDate.getFullYear() + ','
    + calendarObject.currentDate.getMonth() + ',' + '1)); \n'
    + '})(); \n'
    +'</script>';
    return newCalendarScript;
}

function createElement(type, name, id, label, isChecked) {
    var label1 = document.createElement('label');
    var input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.setAttribute('id', id);
    if (type == 'checkbox' && isChecked == 1) {
        input.setAttribute('checked', 'true');
    }
    label1.appendChild(input);
    label1.innerHTML += label;
    return label1;
}