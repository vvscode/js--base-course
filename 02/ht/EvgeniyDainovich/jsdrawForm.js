/* 
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/

drawCalendarPattern(document.querySelector("#calendar"));

function drawCalendarPattern(element) {
    var initDate = new Date();

    element.innerHTML = "<button id= 'dec'>-</button> <span id='mnth'>" + (initDate.getMonth() + 1) + "</span>" + "/" + " <span id='year'>" + initDate.getFullYear() +
        "</span>" + "<button id='inc'>+</button><br><div id=\"calendarContent\"></div>";

    drawCalendarContent(document.querySelector("#calendarContent"), initDate.getFullYear(), initDate.getMonth());
    var spanMonth = element.querySelector('#mnth');
    var spanYear = element.querySelector('#year');
    var localStorageDates = localStorage.getItem("holidayDates") || "";
    var holidayElement = document.getElementById("listDates");
    holidayElement.innerHTML = localStorageDates;
    element.addEventListener("click", function (el) {
        if (el.target.matches('button')) {
            if (el.target.matches('#inc')) {
                initDate.setMonth(initDate.getMonth() + 1);
            }
            else if (el.target.matches('#dec')) {
                initDate.setMonth(initDate.getMonth() - 1);
            }
        }
        else if (el.target.matches('td')) {
            var selectedDate = el.target.innerHTML + "/" + (initDate.getMonth() + 1) + "/" + initDate.getFullYear();
            localStorageDates += "<span>" + selectedDate + "-" + prompt(selectedDate, "ДЗ по JS") + "</span><br>";
            holidayElement.innerHTML = localStorageDates;
        }
        spanMonth.innerHTML = initDate.getMonth() + 1;
        spanYear.innerHTML = initDate.getFullYear();
        drawCalendarContent(document.querySelector("#calendarContent"), initDate.getFullYear(), initDate.getMonth());
        localStorage.setItem("holidayDates", localStorageDates);
    });
}

function drawCalendarContent(htmlEl, year, month) {
    var date = new Date(year, month);
    var strToHtml = "<table><tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr><tr>";
    var deltai = (date.getDay() + 6) % 7;
    for (var i = 0; i < deltai; i++) {
        strToHtml += "<td> </td>";
    }
    while (date.getMonth() == month) {
        strToHtml += "<td >" + date.getDate() + "</td>";
        date.setDate(date.getDate() + 1);
        if (date.getDay() == 1) {
            strToHtml += "</tr><tr>";
        }
    };
    strToHtml += "</tr>";
    htmlEl.innerHTML = strToHtml;
}

/*
Создать веб страницу. Добавить на нее форму с полями 
- имя (строкое поле), 
- родной город (Выпадающий список), 
- Комментарий (многострочное поле), пол (radiobutton). 
При нажатии на кнопку - нужно собрать данные введенные в поля и вывести их в блоке под формой, 
после чего поля очистить.
*/

var element = document.getElementById("insert");
var cities = ["Minsk", "Gomel", "Grodno", "Brest", "Mogilev", "Vitebsk"];
var inputString = "<form> <table width='30%' cellspacing='0' cellpadding='6'><tr><td align='right'>Name</td><td><input id='nameInput'></input></td></tr><tr><td align='right'>City</td><td><select id='citiesList'>";
for (var i = 0; i < cities.length; i++) {
    inputString += "<option>" + cities[i] + "</option>";
};
inputString += "</select></td></tr><tr><td align='right'>Comment</td> <td><textarea id='commentTextArea' rows='2'></textarea></td></tr>";
inputString += "<tr><td align='right'> Sex</td><td><input type='radio' name='sex' value='female'><label>female </label><input type='radio' name='sex' value='male' checked='checked'><label>male</label></td></tr>";
inputString += "<tr><td align='right'> Load</td><td><button id='loadButton'>Enter</button></td></tr></form>"
element.innerHTML = inputString;

var butElement = document.getElementById("loadButton");
butElement.addEventListener('click', function () {
    var element = document.getElementById("insert");
    var str = element.innerHTML;
    str += "<div> name: " + document.getElementById('nameInput').value + "</div>";
    str += "<div> city: " + document.getElementById('citiesList').value + "</div>";
    str += "<div> comment: " + document.getElementById('commentTextArea').value + "</div>";
    var sex = document.getElementsByName('sex');
    for (var i = 0; i < sex.length; i++) {
        if (sex[i].type === 'radio' && sex[i].checked) {
            str += "<div> sex: " + sex[i].value + "</div>";
        }
    }
    element.innerHTML = str;
});