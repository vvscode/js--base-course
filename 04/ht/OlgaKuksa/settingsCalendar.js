var previewCalendar;

function drawLayout() {
    if (previewCalendar == null) previewCalendar = new Calendar(1, 1, 1, 1, new Date(), 130985);
    else previewCalendar.drawIntCalendar();
    elemSpan = document.createElement("section");
    elemSpan.setAttribute("id", "CalScript")
    elemSpan.appendChild(document.getElementById(previewCalendar.calendarID));
    document.body.appendChild(elemSpan);
    drawSettingsBar();
    drawScriptBar();
}


//draws settings bar
function drawSettingsBar() {
    var elem = document.createElement("div");
    elem.setAttribute('id', 'settingsBar');
    document.body.insertBefore(elem, document.getElementById(previewCalendar.calendarID).parentNode);
    elem.innerHTML = "<fieldset><legend>Configure Calendar</legend></fieldset>";
    var fieldset = document.getElementsByTagName("fieldset")[0];
    fieldset.appendChild(createElement("checkbox", "allowChangeMonth", "cb_allowPrevNext", "allow change month", previewCalendar.allowPrevNext));
    fieldset.innerHTML += "<br/>";
    fieldset.appendChild(createElement("checkbox", "allowAddTasks", "cb_allowAddTasks", "allow add tasks", previewCalendar.allowAddTask));
    fieldset.innerHTML += "<br/>";
    fieldset.appendChild(createElement("checkbox", "allowRemoveTasks", "cb_allowRemoveTasks", "allow remove tasks", previewCalendar.allowRemoveTask));
    fieldset.innerHTML += "<br/>"; fieldset.appendChild(createElement("checkbox", "showMonthYear", "cb_showMonthYear", "show month/year", previewCalendar.showMonthYear));
    fieldset.innerHTML += "<br/>";
    var month = createElement("number", "defMonth", "defMonth", "month");
    month.firstChild.setAttribute("min", "1");
    month.firstChild.setAttribute("max", "12");
    month.firstChild.setAttribute("value", previewCalendar.defDate.getMonth() + 1);
    fieldset.appendChild(month);
    var year = createElement("number", "defYear", "defYear", "year");
    year.firstChild.setAttribute("min", "0");
    year.firstChild.setAttribute("value", previewCalendar.defDate.getFullYear());
    fieldset.appendChild(year);
    //adding event listeners
    addingEvListToSettingsBar(document.getElementById("settingsBar"));
}
//adds event listeners to settings bar
function addingEvListToSettingsBar(settBar) {
    settBar.addEventListener("change", function (event) {
        var target = event.target;
        if (target.tagName != "INPUT") return;
        if (target.id == "cb_allowPrevNext") previewCalendar.allowPrevNext = +target.checked;
        if (target.id == "cb_allowAddTasks") previewCalendar.allowAddTask = +target.checked;
        if (target.id == "cb_allowRemoveTasks") previewCalendar.allowRemoveTask = +target.checked;
        if (target.id == "cb_showMonthYear") previewCalendar.showMonthYear = +target.checked;
        if (target.id == "defMonth") previewCalendar.defDate = new Date(previewCalendar.defDate.getFullYear(), target.value - 1, 2);
        if (target.id == "defYear") previewCalendar.defDate = new Date(target.value, previewCalendar.defDate.getMonth(), 2);
        //savingnew calendar state
        setState(previewCalendar);
        //removing calendar and all it's event listeners
        var calToDel = document.getElementById(previewCalendar.calendarID);
        calToDel.parentNode.removeChild(calToDel);
        //drawing new calendar with new settings
        previewCalendar.drawIntCalendar();
        document.getElementById('CalScript').appendChild(document.getElementById(previewCalendar.calendarID));
        document.getElementsByTagName("TEXTAREA")[0].value = genScript(previewCalendar);
    });

}

//draws textarea for script output
function drawScriptBar() {

    var divElem = document.createElement("div");
    divElem.setAttribute("id", "scriptArea");
    var elem = document.createElement("textarea");
    elem.setAttribute("readonly", "true");
    elem.setAttribute("rows", "10");
    elem.setAttribute("cols", "30");
    elem.setAttribute("class", "calendar-settings-textarea")
    elem.value = genScript(previewCalendar);
    divElem.appendChild(elem);
    document.getElementById("CalScript").insertBefore(divElem, document.getElementById(previewCalendar.calendarID));

}

/**
 * returns string,
 * @param calendarObj - calendar object to be generated into script
 */
function genScript(calendarObj) {
    return `<script src='dataGetSetSend.js'></script>
    <script src='calendar.js'></script>
    <script src='addCalendarCSS.js'></script>
    <script>
    new Calendar(${previewCalendar.showMonthYear}, ${previewCalendar.allowPrevNext}, ${previewCalendar.allowAddTask}, ${previewCalendar.allowRemoveTask},
    new Date(${previewCalendar.defDate.getFullYear()}, ${previewCalendar.defDate.getMonth()}, 1))
    </script>`;
}
/**
 * creates input DOM element and returns it
 * @param type
 * @param name
 * @param id
 * @param labelText
 * @param checked
 * @returns {HTMLLabelElement | HTMLElement}
 */
function createElement(type, name, id, labelText, checked) {
    var lb1 = document.createElement("label");
    var cb1 = document.createElement("input");
    cb1.setAttribute('type', type);
    cb1.setAttribute('name', name);
    cb1.setAttribute('id', id);
    if (type == "checkbox" && checked == 1) cb1.setAttribute("checked", "true");
    lb1.appendChild(cb1);
    lb1.innerHTML += labelText;
    return lb1;
}


