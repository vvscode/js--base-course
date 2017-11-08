var Calendar = (function(storage, config) {
    //save config to storage (localStorage)
    //TODO: add js- classes to elements
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
        drawCalendarChangeSet(date);
        initCalendarActions(date);
    }

    function drawCalendarChangeSet(date) {
        drawCalendarCaption(date);
        drawCalendarBody(date);
    }

    function initCalendarActions(initDate) { //VARIABLES: rootElement, allowRemoveNotes, isForDemonstration, allowNavigation
        var navigationFunction = allowNavigation ? navigation(initDate) : function(){};
        rootElement.addEventListener("click", function(event) {
            var targetClassList = event.target.classList;
            if(targetClassList.contains("js-event-removeNote") && allowRemoveNotes && !isForDemonstration) {
                //NOTE: removeNote
                console.log("removeNote");
                removeNote(event.target);
            } else if(targetClassList.contains("js-event-closeAddNoteForm")) {
                //NOTE: closeAddNoteForm
                console.log("closeAddNoteForm");
                closeAddNoteForm();
            } else if(targetClassList.contains("js-event-addNote")) {
                //NOTE: addNote
                var result = addNote(event.target);
                if(result) {
                    closeAddNoteForm();
                }
            } else if(targetClassList.contains("js-event-calendarNavigation") && allowNavigation && !isForDemonstration) {
                //NOTE: navigation
                if(targetClassList.contains("leftButton")) {
                    navigationFunction("-");                    
                } else if(targetClassList.contains("rightButton")) {
                    navigationFunction("+");                    
                }
            }
        });
        rootElement.addEventListener("dblclick", function(event) {
            var targetClassList = event.target.classList;        
            if(targetClassList.contains("js-event-openAddNoteForm") && allowAddNotes && !isForDemonstration) {
                //NOTE: openAddNoteForm
                var dataset = event.target.dataset;
                if(dataset) {
                    var utcDate = dataset["utcdate"];
                    if(utcDate) {
                        rootElement.getElementsByClassName("js-content-addNote")[0].dataset["utcdate"] = utcDate;
                        Array.prototype.forEach.call(rootElement.getElementsByClassName("css-calendar-note"), function(noteEl) {
                            noteEl.classList.toggle("visible");
                        });
                    }
                }
            }
        });
    }

    function navigation(initDate) { 
        var month = initDate.getMonth();
        var date = initDate;

        return function(direction) {
            if(direction === "+") {
                date.setMonth(month + 1);
            } else if(direction === "-") {
                date.setMonth(month - 1);
            }
            month = date.getMonth();
            drawCalendarChangeSet(date);
        }
    }

    function closeAddNoteForm() { //VARIABLES: rootElement
        Array.prototype.forEach.call(rootElement.getElementsByClassName("css-calendar-note"), function(noteEl) {
            noteEl.classList.toggle("visible");
        });
        rootElement.getElementsByClassName("js-calendar-noteForm-noteValidation")[0].innerHTML = "";
        rootElement.getElementsByClassName("js-calendar-noteForm-text")[0].value = "";
    }

    function addNote(target) { //VARIABLES: rootElement
        var result = false;
        var noteText = rootElement.getElementsByClassName("js-calendar-noteForm-text")[0].value.trim();
        if(noteText === "") {
            rootElement.getElementsByClassName("js-calendar-noteForm-noteValidation")[0].innerHTML = "Note cannot be empty or whitespace. Please, input correct note.";
            return result;
        }
        var dataset = target.dataset;
        if(dataset) {
            var utcDate = dataset["utcdate"];
            if(utcDate) {
                var noteId = storage.setNote(utcDate, noteText);
                if(!noteId) return result;
                result = true;
                var noteObj = {message: noteText};
                // monthNotes = newMonthNotes;
                return result;            

            }
        }
    }

    function removeNote(target) {
        var dataset = target.dataset;
        if(dataset) {
            var noteId = dataset["noteid"];
            var utcDate = dataset["utcdate"];
            if(noteId && utcDate) {
                storage.deleteNote(utcDate, noteId);
            }
        }
    }

    function updateDayNotes(utcDay, note) {

    }

    function prepareEnvironment() { //VARIABLES: rootElement
        var calemdarTemplate = [
            '<div class="css-calendar-container">',
            '<div class="css-calendar-header">',
            '</div>',            
            '<div class="css-calendar-body">',
            '</div>',
            '<div class="css-calendar-note css-calendar-note-form">',
            '<textarea class="js-calendar-noteForm-text css-calendar-note-form-text" placeholder="Задача"></textarea>',
            '<span class="js-calendar-noteForm-noteValidation css-validation css-calendar-note-form-validation"></span>',            
            '<div class="css-calendar-note-form-buttonsBlock">',
            '<button class="js-event-closeAddNoteForm css-button secondary css-calendar-note-form-button">Отмена</button>',
            '<button class="js-event-addNote js-content-addNote css-button primary css-calendar-note-form-button">Добавить задачу</button>',
            '</div>',
            '</div>',
            '<div class="js-event-closeAddNoteForm css-calendar-note css-calendar-note-background">',
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
                '<button class="js-event-calendarNavigation css-button navigation leftButton"><</button>',
                '</div>'
            ].join("");
            calendarHeader.push(leftButton);
        }
        if(showCaption) calendarHeader.push('<div class="css-calendar-header-caption"></div>');
        if(allowNavigation) {
            var rightButton = [
                '<div class="css-calendar-header-rightButton">',
                '<button class="js-event-calendarNavigation css-button navigation rightButton">></button>',
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
        var monthEl = rootElement.getElementsByClassName("js-content-calendar-month")[0];                        
        if(!monthEl) {        
            var bodyEl = rootElement.getElementsByClassName("css-calendar-body")[0];
            bodyEl.insertAdjacentHTML("beforeend", '<div class="js-content-calendar-month css-calendar-body-month"></div>');
            monthEl = rootElement.getElementsByClassName("js-content-calendar-month")[0];  
        }
        var referenceDateMonth = referenceDate.getMonth();
        var referenceDateWeekDay = referenceDate.getDay();        
        var dayIndex = weekFormat.indexOf(referenceDateWeekDay);
        var previousMonthDaysCount = weekFormat.slice(0, dayIndex).length;

        var monthInStringFormat = '';
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
        monthEl.innerHTML = monthInStringFormat;
    }
    
    function renderDay(day, isAnotherMonth) { //VARIABLES: weekFormat, monthNotes
        if(!day) return "";
        isAnotherMonth = Boolean(isAnotherMonth); //NOTE: current moth by default
        var result = [];
        if(day.getDay() === weekFormat[0]) {
            result.push('<div class="css-calendar-body-week">'); //NOTE: open week
        }
        var utcDate = Date.UTC(day.getFullYear(), day.getMonth(), day.getDate());
        var dayNotes = monthNotes[utcDate];
        result.push(
            `<div data-utcdate="${utcDate}" class="js-event-openAddNoteForm css-calendar-body-day">
                <div data-utcdate="${utcDate}" class="js-event-openAddNoteForm css-calendar-body-dayNumber ${isAnotherMonth ? "anotherMonth" : ""}">${day.getDate()}</div>
                <div class="css-calendar-body-dayNotes ${isAnotherMonth ? "anotherMonth" : ""}">
                        ${renderDayNotes(utcDate, dayNotes)}
                </div>
            </div>`
        );
        if(day.getDay() === weekFormat[weekFormat.length - 1]) {
            result.push('</div>'); //NOTE: close week
        }
        return result.join("");
    }

    function renderDayNotes(utcDate, notes) {
        if(!notes || notes.length === 0) return "";
        return notes.map(function(noteObj) {
            return renderNote(utcDate, noteObj);
        }).join("");
    }

    function renderNote(utcDate, noteObj) { //VARIABLES: allowRemoveNotes
        var noteText = noteObj["message"];
        return `<div class="css-calendar-body-note">
                    <span class="css-calendar-body-note-text" title="${noteText}">${noteText}</span>
                    ${allowRemoveNotes ? `<span data-noteId="${noteObj["noteId"]}" data-utcDate="${utcDate}" class="js-event-removeNote css-button close css-calendar-body-note-deleteButton"></span>` : ""}
                </div>`; 
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