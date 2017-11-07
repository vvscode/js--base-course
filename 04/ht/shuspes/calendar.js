var Calendar = (function(storage, config) {
    //save config to storage (localStorage)
    var rootElement = config["element"];
    if(!rootElement) return;
    var calendarId = config["calendarId"] || rootElement.id;
    if(!calendarId) return;
    var initDate = config["date"];
    if(!initDate) {
        initDate = { 
            month: new Date().getMonth(), 
            year: new Date().getFullYear() 
        };
    };
    var isForDemonstration = Boolean(config["isForDemonstration"]);
    var showCaption = Boolean(config["showCaption"]);
    var allowNavigation = Boolean(config["allowNavigation"]);
    var allowAddNotes = Boolean(config["allowAddNotes"]);
    var allowRemoveNotes = Boolean(config["allowRemoveNotes"]);

    var weekFormat = [1, 2, 3, 4, 5, 6, 0]; //NOTE: move to configuration
    var weekDaysConf = {0: "Вс", 1: "Пн", 2: "Вт", 3: "Ср", 4: "Чт", 5: "Пт", 6: "Сб"};    
    var monthNotes = storage.getAllNotes(); //NOTE: move to init calendar method. storage methods should return new object
    
    function drawCalendar() { //NOTE: maybay use this! method for outside
        prepareEnvironment();
        drawCalendarHeader();
        drawCalendarWeekDays();
        var date = new Date(initDate["year"], initDate["month"]);
        drawCalendarCaption(date);
        drawCalendarBody(date);
    }

    function prepareEnvironment() { //VARIABLES: rootElement
        var calemdarTemplate = [
            '<div class="css-calendar-container">',
            '<div class="css-calendar-header">',
            '</div>',            
            '<div class="css-calendar-body">',
            '</div>',
            '</div>'
        ].join("");
        rootElement.innerHTML = calemdarTemplate;
    }
    
    function drawCalendarHeader() { //VARIABLES: allowNavigation, showCaption, rootElement
        var calendarHeader = [];
        if(allowNavigation) {
            var leftButton = [
                '<div class="css-calendar-header-leftButton">',
                '<button class="css-button leftButton"><</button>',
                '</div>'
            ].join("");
            calendarHeader.push(leftButton);
        }
        if(showCaption) calendarHeader.push('<div class="css-calendar-header-caption"></div>');
        if(allowNavigation) {
            var rightButton = [
                '<div class="css-calendar-header-rightButton">',
                '<button class="css-button rightButton">></button>',
                '</div>'
            ].join("");
            calendarHeader.push(rightButton);
        }
        var headerEl = rootElement.getElementsByClassName("css-calendar-header")[0];
        headerEl.innerHTML = calendarHeader.join("");
    }

    function drawCalendarWeekDays() { //VARIABLES: rootElement, weekFormat, weekDaysConf 
        var bodyEl = rootElement.getElementsByClassName("css-calendar-body")[0];
        var weekDays = ['<div class="css-calendar-body-weekDays">'];
        var calendarWeekDays = weekFormat.forEach(function(day) {
            weekDays.push(`<div class="css-weekDay">${weekDaysConf[day]}</div>`);
        });
        weekDays.push('</div>');
        bodyEl.insertAdjacentHTML("afterbegin", weekDays.join(""));
    }

    function drawCalendarCaption(date) { //VARIABLES: showCaption, rootElement
        if(showCaption) {
            var captionEl = rootElement.querySelector(".css-calendar-header .css-calendar-header-caption");  
            var caption = date.toLocaleString("ru", {month: 'long', year: 'numeric'});
            captionEl.innerHTML = caption;
        }      
    }

    function drawCalendarBody(referenceDate) { //VARIABLES: rootElement, weekFormat 
        var referenceDateMonth = referenceDate.getMonth();
        var referenceDateWeekDay = referenceDate.getDay();        
        var dayIndex = weekFormat.indexOf(referenceDateWeekDay);
        var previousMonthDaysCount = weekFormat.slice(0, dayIndex).length;

        var monthInStringFormat = '<div class="css-calendar-body-month">'; //NOTE: open month
        var day; //NOTE: variable for every next day
        while(previousMonthDaysCount > 0) { //NOTE: render previous month days
            day = new Date(referenceDate);
            day.setDate(day.getDate() - previousMonthDaysCount);  
            monthInStringFormat += renderDay(day, true); 
            previousMonthDaysCount--;
        }
        day = new Date(referenceDate);
        while(referenceDateMonth == day.getMonth()) { //NOTE: render current month
            monthInStringFormat += renderDay(day);
            day.setDate(day.getDate() + 1);
        }
        if(day.getDay() !== weekFormat[weekFormat.length - 1]) { //NOTE: should close week
            dayIndex = weekFormat.indexOf(day.getDay());
            var nextMonthDaysCount = weekFormat.slice(dayIndex).length;
            while(nextMonthDaysCount > 0) { //NOTE: render next month days
                monthInStringFormat += renderDay(day, true); 
                day.setDate(day.getDate() + 1);            
                nextMonthDaysCount--;
            }
        }
        monthInStringFormat += "</div>"; //NOTE: close month
        var bodyEl = rootElement.getElementsByClassName("css-calendar-body")[0];        
        bodyEl.insertAdjacentHTML("beforeend", monthInStringFormat);        
    }
    
    function renderDay(day, isAnotherMonth) { //VARIABLES: weekFormat, monthNotes
        if(!day) return "";
        isAnotherMonth = Boolean(isAnotherMonth); //NOTE: current moth by default
        var result = [];
        if(day.getDay() === weekFormat[0]) {
            result.push('<div class="css-calendar-body-week">'); //NOTE: open week
        }
        var dayNotes = monthNotes[Date.UTC(day.getFullYear(), day.getMonth(), day.getDate())];
        result.push(
            `<div class="css-calendar-body-day">
                <div class="css-calendar-body-dayNumber ${isAnotherMonth ? "anotherMonth" : ""}">${day.getDate()}</div>
                <div class="css-calendar-body-dayNotes ${isAnotherMonth ? "anotherMonth" : ""}">
                        ${renderDayNotes(dayNotes)}
                </div>
            </div>`
        );
        if(day.getDay() === weekFormat[weekFormat.length - 1]) {
            result.push('</div>'); //NOTE: close week
        }
        return result.join("");
    }

    function renderDayNotes(notes) { //VARIABLES: allowRemoveNotes, isForDemonstration
        if(!notes || notes.length === 0) return "";
        return `<div class="css-calendar-body-note">
                    ${notes.map(function(noteObj) {
                        var message = noteObj[message];
                        return `<span class="css-calendar-body-note-text" title="${message}">${message}</span>
                        ${allowRemoveNotes && !isForDemonstration ? '<span class="css-button close css-calendar-body-note-deleteButton"></span>' : ""}`;
                    }).join("")}
                </div>`
    }

    return {
        drawCalendar: drawCalendar
    }

    // function drawInteractiveCalendar(el) {
    //     var currentDate = new Date(); 
    //     var belWeekFormat = [1, 2, 3, 4, 5, 6, 0];
    //     drawCalendar(el, currentDate, belWeekFormat);
    //   }
      
    //   function drawCalendar(element, initDate, weekFormat) {  
    //     var drawHeader = function() {  
    //       var weekDays = {0: "Вс", 1: "Пн", 2: "Вт", 3: "Ср", 4: "Чт", 5: "Пт", 6: "Сб"};    
    //       var calendarWeekDays = weekFormat.map(function(day) {
    //         return `<th>${weekDays[day]}</th>`;
    //       }).join("");
        
    //       element.innerHTML = [
    //         '<span style="cursor: pointer" id="previousMonth">[<]</span>',
    //         '<span id="caption"></span>',
    //         '<span style="cursor: pointer" id="nextMonth">[>]</span>',
    //         '<div>',
    //         calendarWeekDays,
    //         '</div>',
    //         '<div id="calendarTable"></div>',
    //         '<div id="calsendarHistory"></div>'
    //       ].join("");
    //     }
      
    //     var drawBody = function(year, month) {    
    //       var day = new Date(year, month);
    //       var currentMonth = day.toLocaleString("ru", {month: 'long'});
    //       var currentYear = day.getFullYear();
      
    //       var calendarBody = "<tr>";
    //       for(var i = 0; weekFormat[i] != day.getDay(); i++) {
    //         calendarBody += "<td></td>";
    //       }
      
    //       while(month == day.getMonth()) {
    //         if(day.getDay() == weekFormat[0]) calendarBody += "<tr>";
    //           calendarBody += `<td data-date="${day}">${day.getDate()}</td>`;
    //         if(day.getDay() == weekFormat[weekFormat.length - 1]) calendarBody += "</tr>";
    //         day.setDate(day.getDate() + 1);
    //       }
    //       if(day.getDay() !== weekFormat[weekFormat.length - 1]) calendarBody += "</tr>";
          
    //       document.getElementById("caption").innerHTML = `${currentMonth} / ${currentYear}`;
    //       document.getElementById("calendarTable").innerHTML = `<table>${calendarBody}</table>`;
    //     }
      
    //     var initNavigateButtons = function(year, month, calendarRender) {
    //       var day = new Date(year, month); 
          
    //       var navigate = function(monthStep, initDate, calendarRender) {
    //         var month = initDate.getMonth();
    //         var date = initDate;
          
    //         return function(direction) {
    //           if(direction === "+") {
    //             date.setMonth(month + monthStep);
                
    //           } else if(direction === "-") {
    //             date.setMonth(month - monthStep);
    //           }
          
    //           month = date.getMonth();
              
    //           calendarRender(date.getFullYear(), month);
    //         }
    //       }
      
    //       var navigation = navigate.call(null, 1, day, calendarRender);
        
    //       document.getElementById("previousMonth").addEventListener("click", function() {
    //         navigation("-");
    //       });
        
    //       document.getElementById("nextMonth").addEventListener("click", function() {
    //         navigation("+");
    //       })
    //     }
      
    //     var initNoteFunctionality = function() {
    //       var calendarId = element.id;
      
    //       var updateNoteStorage = function(notes) {
    //         localStorage.setItem(calendarId, JSON.stringify(notes));
    //       };
      
    //       var getNotesFromStorage = function() {
    //         return JSON.parse(localStorage.getItem(calendarId));      
    //       }
      
    //       var initStorage = function() {
    //         updateNoteStorage([]);
    //       };
      
    //       var displayNote = function(noteString) {
    //         var calendarHistory = document.getElementById("calsendarHistory"); //NOTE: use element.querySelector for insert some string to element
    //         var history = calendarHistory.innerHTML;
    //         calendarHistory.innerHTML = calendarHistory.innerHTML + noteString + "<br>";
    //       }
      
    //       var notes = getNotesFromStorage();
    //       if(notes) {
    //         notes.forEach(function(note) {
    //           displayNote(note);
    //         });
    //       } else {
    //         initStorage();      
    //       }
      
    //       var addNote = function(date, question) {
    //         question = question || "Input note.";
    //         var note = prompt(question).trim();
    //         if(note) {
    //           var noteString = createNote(note, date);
    //           displayNote(noteString); 
    //           saveNote(noteString);
    //           return;       
    //         }
    //         addNote(date, "Note cannot be empty or whitespace. Please, input correct note.");
    //       };
      
    //       var createNote = function(note, date) {
    //         return `${note} - ${date.toLocaleString("ru")}`;
    //       }
      
    //       var saveNote = function(noteString) {
    //         var notes = getNotesFromStorage();
    //         notes.push(noteString);
    //         updateNoteStorage(notes);
    //       }
      
    //       document.getElementById("calendarTable").addEventListener("click", function(event) {
    //         var dataset = event.target.dataset;
    //         if(dataset) {
    //           var date = dataset["date"];
    //           if(date) {
    //             addNote(date);
    //           }
    //         }
    //       })
    //     }
      
    //     drawHeader();
    //     var year = initDate.getFullYear();
    //     var month = initDate.getMonth();
    //     initNavigateButtons(year, month, drawBody);
    //     drawBody(year, month);
    //     initNoteFunctionality();
    //   }







})(Storage, config);