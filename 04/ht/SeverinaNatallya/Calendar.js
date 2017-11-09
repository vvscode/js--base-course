var IStorage = {//
    setData: (key, value) => new Promise(function (resolve, reject) { window.localStorage.setItem(key, value); resolve([key,value]); }),
    getData: key => new Promise(function (resolve, reject) {
        let value = window.localStorage.getItem(key);
        if (value) resolve(value);
    })
};
var IAskUser = {
    setNote: (dayElem) => new Promise(function (resolve, reject) {
        let value = prompt("Текст заметки");
        if (value) {
            resolve(value);
        }
    })
};

(function (window, storage,askUser) {
    var nameOfMonth = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
    /**
 * конструктор календаря
 * @param {*} options объект с настройками
 */
    function Calendar(options) {
        this.options = {};
        this.options.htmlEl = options.htmlEl;
        this.options.showMonth = options.showMonth;
        this.options.allowChange = options.allowChange;
        this.options.allowAddNotes = options.allowAddNotes;
        this.options.allowRemoveNotes = options.allowRemoveNotes;
        this.options.startMonth = options.startMonth;
        this.options.startYear = options.startYear;
        drawCalendar(this.options);
    }
 /**
 * Функция рисующая календарь и добавляющая обработчики событий
 * @param {*} options объект с настройками
 */
    function drawCalendar(options) {
        drawControlCalendar(options);
        drawTableOfDays(options.htmlEl);
        if (options.allowAddNotes == true) drawNoteToCalendar(options.htmlEl, options.allowRemoveNotes);
        if (options.allowAddNotes == true) options.htmlEl.ondblclick = function (event) { dblClickCalendarHandler(event,options) } ;
       if (options.allowChange == true) options.htmlEl.onclick = function (event) { clickCalendarHandler(event, options) };
       
       
        
    }
/**
 * Функция рисующая органы управления календарем
 * @param {*} options объект с настройками
 */
function drawControlCalendar(options) {
    let year = options.startYear;
    let month = options.startMonth;
    let divCalendar = document.createElement("div");
    divCalendar.className = "innerDiv";
    options.htmlEl.appendChild(divCalendar);
    if (options.allowChange == true) {
        let btnPrev = document.createElement("button");
        btnPrev.className = "btnPrev";
        btnPrev.innerHTML = "[<]";
        divCalendar.appendChild(btnPrev);
    }
    let lblMonth = document.createElement("label");
    lblMonth.className = "lblMonth";
    lblMonth.innerHTML = nameOfMonth[month];
    divCalendar.appendChild(lblMonth);
    let lblYear = document.createElement("label");
    lblYear.className = "lblYear";
    lblYear.innerHTML = " / " + year;
    divCalendar.appendChild(lblYear);
    if (options.showMonth == false) {
        lblYear.setAttribute("hidden", "true");
        lblMonth.setAttribute("hidden", "true");
    }
    if (options.allowChange == true) {
    let btnNext = document.createElement("button");
    btnNext.className = "btnNext";
    btnNext.innerHTML = "[>]";
    divCalendar.appendChild(btnNext);
    }
}
/**
 * Функция перерисовывющая таблицу дней календаря
 * @param {*} htmlEl элемент календарь
 */
function drawTableOfDays(htmlEl) {
    if (htmlEl.getElementsByClassName('tableCalendar').length > 0) htmlEl.getElementsByClassName('tableCalendar')[0].remove();
    var table = '<table class="tableCalendar"><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';
    let firstDayMonth = new Date(getYear(htmlEl), getNumOfSelectedMonth(htmlEl));
    let nextMonth = new Date(getYear(htmlEl), +getNumOfSelectedMonth(htmlEl) + 1, 0);
    for (var i = 1; i < changeNumOfDay(firstDayMonth.getDay()); i++)//заполнение первой строчки
    {
        table += '<td></td>';
    }
    for (var i = 1; i <= nextMonth.getDate(); i++) {
        table += '<td class="tdDay">' + i+" " + '</td>';
        if (changeNumOfDay(firstDayMonth.getDay()) == 7) {
            table += '</tr><tr>';
        }
        firstDayMonth.setDate(firstDayMonth.getDate() + 1);
    }
    if (changeNumOfDay(firstDayMonth.getDay()) < 7)//если первое число следующего месяца не понедельник
    {
        for (var i = changeNumOfDay(firstDayMonth.getDay()); i < 7; i++) {
            table += '<td></td>';
        }
    }
    table += '</tr></table>';
    htmlEl.innerHTML += table;
}
  /**
 * Функция добавляет заметки 
 * @param {*} htmlEl элемент календарь
    * @param {*} allowRemoveNotes булево значение можно ли удалять заметки
 */
function drawNoteToCalendar(htmlEl, allowRemoveNotes) {
      
    let days = htmlEl.getElementsByClassName('tdDay');
    for (let i = 0; i < days.length; i++) {
        let key = days[i].innerHTML.split(' ')[0] + '.' + getNumOfSelectedMonth(htmlEl) + '.' + getYear(htmlEl);
        storage.getData(key).then(function (result) {
            if (allowRemoveNotes == false) {
                drawNoteToDayWithoutDelBtn(days[i], result);
            }
            else {
                drawNoteToDay(days[i], result);
                days[i].onclick = btnDeleteClickHandler.bind(days[i], key)
            }
        });
    }
}
 /**
 * Функция обработка клика 
 * @param {*} event элемент клика
  * @param {*} options объект с настройками
 */
function clickCalendarHandler(event, options) {
       let htmlEl = options.htmlEl;
        let month = getNumOfSelectedMonth(htmlEl);
        let year = getYear(htmlEl);
        if (event.target.className == 'btnNext') {
            if (month == 11) { month = 0; year++; }
            else month++;
            htmlEl.getElementsByClassName('lblMonth')[0].innerHTML = nameOfMonth[month];
            htmlEl.getElementsByClassName('lblYear')[0].innerHTML = " / " + year;
            drawTableOfDays(htmlEl);
           if (options.allowAddNotes) drawNoteToCalendar(htmlEl, options.allowRemoveNotes);
            
        }
        if (event.target.className == 'btnPrev') {
            if (month == 0) { month = 11; year--; }
            else month--;
            htmlEl.getElementsByClassName('lblMonth')[0].innerHTML = nameOfMonth[month];
            htmlEl.getElementsByClassName('lblYear')[0].innerHTML = " / " + year;
            drawTableOfDays(htmlEl);
            if (options.allowAddNotes) drawNoteToCalendar(htmlEl, options.allowRemoveNotes);
        }
    }
 /**
 * Функция обработка двойного клика 
 * @param {*} event элемент двойного клика
  * @param {*} options объект с настройками
 */
function dblClickCalendarHandler(event, options) {
    if (event.target.className == "tdDay") {
        let dayElem = event.target;
        let selectedDay = dayElem.innerHTML.split(' ')[0];
        let key = selectedDay + '.' + getNumOfSelectedMonth(options.htmlEl) + '.' + getYear(options.htmlEl);
        askUser.setNote(dayElem).then(function (result) {
            storage.setData(key, result).then(function (result) {
                if (options.allowRemoveNotes == false) {
                    drawNoteToDayWithoutDelBtn(dayElem, result[1]);
                }
                else {
                    drawNoteToDay(dayElem, result[1]);
                    dayElem.onclick = btnDeleteClickHandler.bind(dayElem, result[0]);
                }
            });
        });
    }
};

/**
 * Функция обработка удаления записи 
 * @param {*} key ключ записи
   */
function btnDeleteClickHandler(key) {
    if (event.target.className == "btnDelete") {
        storage.setData(key, "").then(this.removeChild(this.querySelector('div')));
    }
}
 /**
 * Функция рисует заметки без возможности их удалить 
 * @param {*} dayElem элемент день в который добавляется заметка
    * @param {*} value текст
 */
function drawNoteToDayWithoutDelBtn(dayElem, value) {
    let note = dayElem.innerHTML.split(' ')[0] + ' <div class="divNote"><label class="lblNote">' + value + '</label></div >';
    dayElem.innerHTML = note;
}
 /**
 * Функция рисует заметки 
 * @param {*} dayElem элемент день в который добавляется заметка
    * @param {*} value текст
 */
function drawNoteToDay(dayElem,value) {
    let note = dayElem.innerHTML.split(' ')[0] + ' <div class="divNote"><label class="lblNote">' + value + '</label><button class="btnDelete">X</button ></div >';
    dayElem.innerHTML = note;
}

function changeNumOfDay(numDay)//для воскресенья меняем с 0 на 7
    {
        if (numDay === 0) { numDay = 7 };
        return numDay;
}
function getNumOfSelectedMonth(htmlEl) {
    let numMonth = nameOfMonth.indexOf(htmlEl.getElementsByClassName('lblMonth')[0].innerHTML);
    return numMonth;
}
function getYear(htmlEl) {
    let year = htmlEl.getElementsByClassName('lblYear')[0].innerHTML.split('').splice(3, 4).join('');
    return year;
}
        window.Calendar = Calendar;
})(window, IStorage,IAskUser)



