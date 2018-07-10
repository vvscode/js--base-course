
var form = document.getElementsByName("reg")[0];
setEvent('reg', 'change', displayCreate);

/**
 * @function
 * @param {object} ev 
 */
function displayCreate(ev) {
    var arrMonth = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        allowChange = document.getElementById("changeMonth").checked,
        allowAdd = document.getElementById("addTasks").checked,
        allowRemove = document.getElementById("removeTasks").checked,
        showMonth = document.getElementById("showDate").checked,
        date = [arrMonth.indexOf(document.getElementById("monthSel").value) + 1, + document.getElementById("yearSel").value],
        el = document.querySelector("input#tagId").value || "calendar";
	var showCode = document.getElementById("code");
    showCode.value = '<link href="https://cdn.rawgit.com/dsv-sergey/dsv-sergey.github.io/b16f79c9/projects/calendar/styles/css/reset.css" rel="stylesheet" type="text/css">\n' +
    '<link href="https://cdn.rawgit.com/dsv-sergey/dsv-sergey.github.io/b16f79c9/projects/calendar/fonts/Neucha/Neucha.ttf" rel="stylesheet" type="application/x-font-ttf">\n' +
    '<link href="https://cdn.rawgit.com/dsv-sergey/dsv-sergey.github.io/b16f79c9/projects/calendar/styles/css/fonts.css" rel="stylesheet" type="text/css">\n' +
    '<link href="https://cdn.rawgit.com/dsv-sergey/dsv-sergey.github.io/b16f79c9/projects/calendar/styles/css/main.css" rel="stylesheet" type="text/css">\n' +
    "<script href='https://cdn.rawgit.com/dsv-sergey/dsv-sergey.github.io/b16f79c9/projects/calendar/js/script.js'></script>\n" +
        "<script>\n" +
            "showCalendar({\n" +
                "    allowChange: " + allowChange + ",\n" +
                "    allowAdd: " + allowAdd +",\n" +
                "    allowRemove: " + allowRemove + ",\n" +
                "    showMonth: " + showMonth + ",\n" +
                "    date: [" + date +  "],\n" +
                "    el: " + el +
            "})\n" +
        "</script>";
    var setting = {
        allowChange: allowChange,
        allowAdd: allowAdd,
        allowRemove: allowRemove,
        showMonth: showMonth,
        date: date,
        el: el
    };
    localStorage.setItem("setting", JSON.stringify(setting));
    drawInteractiveCalendar("preShowCalendar", setting.date[1], setting.date[0], setting);
}