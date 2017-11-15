var Calendar = (function(storage) {
    //save config to storage (localStorage)
    return function Calendar(config) {
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
        var userClassName = config["userClassName"].trim();
        var showCaption = Boolean(config["showCaption"]);
        var allowNavigation = Boolean(config["allowNavigation"]);
        var allowAddNotes = Boolean(config["allowAddNotes"]);
        var allowRemoveNotes = Boolean(config["allowRemoveNotes"]);
        var allowDisplayCurrentDay = Boolean(config["allowDisplayCurrentDay"]);

        var dayForHighlight = new Date();
        dayForHighlight = new Date(dayForHighlight.getFullYear(), dayForHighlight.getMonth());
        var weekFormat = [1, 2, 3, 4, 5, 6, 0]; //NOTE: move to configuration
        var weekDaysConf = {0: "Вс", 1: "Пн", 2: "Вт", 3: "Ср", 4: "Чт", 5: "Пт", 6: "Сб"}; 
        var monthNotes = {};  
        
        this.drawCalendar = function() {
            prepareEnvironment();
            drawCalendarHeader();
            drawCalendarWeekDays();
            var date = new Date(initDate["year"], initDate["month"]);
            drawCalendarChangeSet(date);
            initCalendarActions(date);
        }

        function drawCalendarChangeSet(date) {
            storage.getMonthNotes(calendarId, date.getFullYear(), date.getMonth(), true).then(function(loadedNotes) {
                monthNotes = loadedNotes;
            }).then(function() {
                displayCalendarNotes();
            });
            drawCalendarCaption(date);
            drawCalendarBody(date);
        }

        function displayCalendarNotes() { //VARIABLES: rootElement, monthNotes
            var monthNotesDates = Object.keys(monthNotes);
            if(monthNotesDates.length === 0) return;
            var monthContent = rootElement.querySelector(".js-content-calendar-month");
            if(!monthContent) return;

            monthNotesDates.forEach(function(numDate) {
                var dayNotes = monthNotes[numDate];
                if(dayNotes.length === 0) return;
                var day = monthContent.querySelector(`[data-numdate="${numDate}"].js-content-day`);
                if(!day) return;
                var dayNotesBlock = day.querySelector(".js-content-calendar-dayNotes");
                if(!dayNotesBlock) return;
                var dayNotesBlockContent = renderDayNotes(numDate, dayNotes);
                dayNotesBlock.innerHTML = dayNotesBlockContent;
            });
        }

        function initCalendarActions(initDate) { //VARIABLES: rootElement, allowRemoveNotes, allowNavigation
            var calendarContainer = rootElement.querySelector(".js-content-calendarContainer");
            var navigationFunction = allowNavigation ? navigation(initDate) : function(){};
            calendarContainer.addEventListener("click", function(event) {
                var targetClassList = event.target.classList;
                if(targetClassList.contains("js-event-openRemoveNoteForm")) {
                    openRemoveNoteForm(event.target);
                } else if(targetClassList.contains("js-event-removeNote") && allowRemoveNotes) {
                    removeNote(event.target);
                    closeNoteModal();
                } else if(targetClassList.contains("js-event-closeNoteModal")) {
                    closeNoteModal();
                } else if(targetClassList.contains("js-event-addNote")) {
                    var result = addNote(event.target);
                    if(result) closeNoteModal();
                } else if(targetClassList.contains("js-event-calendarNavigation") && allowNavigation) {
                    if(targetClassList.contains("leftButton")) {
                        navigationFunction("-");                    
                    } else if(targetClassList.contains("rightButton")) {
                        navigationFunction("+");                    
                    }
                }
            });
            calendarContainer.addEventListener("dblclick", function(event) {
                var targetClassList = event.target.classList;        
                if(targetClassList.contains("js-event-openAddNoteForm") && allowAddNotes) {
                    openAddNoteForm(event.target);
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

        function closeNoteModal() { //VARIABLES: rootElement
            Array.prototype.forEach.call(rootElement.getElementsByClassName("css-calendar-note"), function(noteEl) {
                noteEl.classList.toggle("visible");
            });
            rootElement.querySelector(".js-content-note-form").innerHTML = "";
        }

        function openNoteModal(modalContent) {
            Array.prototype.forEach.call(rootElement.getElementsByClassName("css-calendar-note"), function(noteEl) {
                noteEl.classList.toggle("visible");
            });
            rootElement.querySelector(".js-content-note-form").innerHTML = modalContent;        
        }

        function openAddNoteForm(target) {
            var numDate = getDataAttr(target, "numdate");
            if(numDate) {
                var content = renderAddNoteForm(numDate);
                openNoteModal(content);
            }
        }

        function openRemoveNoteForm(target) {
            var noteId = getDataAttr(target, "noteid");
            var numDate = getDataAttr(target, "numdate");
            if(noteId && numDate) {
                var content = renderRemoveNoteForm(numDate, noteId);
                openNoteModal(content);                
            }
        }

        function renderAddNoteForm(numDate) {
            return [
                '<textarea class="js-calendar-noteForm-text css-calendar-note-form-text" placeholder="Задача"></textarea>',
                '<span class="js-calendar-noteForm-noteValidation css-validation css-calendar-note-form-validation"></span>',            
                '<div class="css-calendar-note-form-buttonsBlock">',
                '<button class="js-event-closeNoteModal css-button secondary css-calendar-note-form-button">Отмена</button>',
                `<button data-numdate="${numDate}" class="js-event-addNote css-button primary css-calendar-note-form-button">Добавить задачу</button>`,
                '</div>'
            ].join("");
        }

        function renderRemoveNoteForm(numDate, noteId) {
            return [
                '<div class="css-calendar-note-form-buttonsBlock">',
                '<button class="js-event-closeNoteModal css-button secondary css-calendar-note-form-button">Отмена</button>',
                `<button data-noteId="${noteId}" data-numdate="${numDate}" class="js-event-removeNote css-button primary css-calendar-note-form-button">Удалить задачу</button>`,
                '</div>'
            ].join("");
        }

        function addNote(target) { //VARIABLES: rootElement
            var noteText = rootElement.querySelector(".js-calendar-noteForm-text").value.trim();
            if(noteText === "") {
                rootElement.querySelector(".js-calendar-noteForm-noteValidation").innerHTML = "Note cannot be empty or whitespace. Please, input correct note.";
                return false;
            }
            var numDate = getDataAttr(target, "numdate");
            if(numDate) {
                storage.setNote(calendarId, numDate, noteText).then(function(noteObj) {
                    if(noteObj) {
                        addDayNoteToHtml(numDate, noteObj);     
                    }
                });           
            }
            return true;
        }

        function removeNote(target) {
            var noteId = getDataAttr(target, "noteid");
            var numDate = getDataAttr(target, "numdate");
            if(noteId && numDate) {
                storage.deleteNote(calendarId, numDate, noteId).then(function() {
                    removeNoteFromHtml(numDate, noteId);
                });
            }
        }

        function addDayNoteToHtml(numDate, noteObj) {
            var newNote = renderNote(numDate, noteObj);
            var dayNotesContainer = rootElement
                    .querySelector(`[data-numdate="${numDate}"].js-content-day`)
                    .querySelector('.js-content-calendar-dayNotes');
            dayNotesContainer.insertAdjacentHTML("afterbegin", newNote);
        }

        function removeNoteFromHtml(numDate, noteId) {
            var note = rootElement
                    .querySelector(`[data-numdate="${numDate}"].js-content-day`)
                    .querySelector('.js-content-calendar-dayNotes')
                    .querySelector(`[data-noteId="${noteId}"]`);
            note.parentNode.removeChild(note);
        }

        function getDataAttr(target, attrName) {
            if(!target || !attrName) return;
            var dataset = target.dataset;
            return dataset ? dataset[attrName] : null;  
        }

        function prepareEnvironment() { //VARIABLES: rootElement, userClassName
            var calemdarTemplate = [
                `<div class="js-content-calendarContainer css-calendar-container ${userClassName}">`,
                '<div class="css-calendar-header">',
                '</div>',            
                '<div class="css-calendar-body">',
                '</div>',
                '<div class="js-content-note-form css-calendar-note css-calendar-note-form">',
                '</div>',
                '<div class="js-event-closeNoteModal css-calendar-note css-calendar-note-background">',
                '</div>',
                '</div>'
            ].join("");
            rootElement.innerHTML = calemdarTemplate;
        }
        
        function drawCalendarHeader() { //VARIABLES: allowNavigation, showCaption, rootElement
            var calendarHeader = [];
            var leftButton = [
                '<div class="css-calendar-header-leftButton">',
                `${allowNavigation ? '<button class="js-event-calendarNavigation css-button navigation leftButton"><</button>' : ""}`,
                '</div>'
            ].join("");
            calendarHeader.push(leftButton);

            if(showCaption) calendarHeader.push('<div class="css-calendar-header-caption"></div>');
            var rightButton = [
                '<div class="css-calendar-header-rightButton">',
                `${allowNavigation ? '<button class="js-event-calendarNavigation css-button navigation rightButton">></button>' : ""}`,
                '</div>'
            ].join("");
            calendarHeader.push(rightButton);

            var headerEl = rootElement.querySelector(".css-calendar-header");
            headerEl.innerHTML = calendarHeader.join("");
        }

        function drawCalendarWeekDays() { //VARIABLES: rootElement, weekFormat, weekDaysConf 
            var bodyEl = rootElement.querySelector(".css-calendar-body");
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
            var monthEl = rootElement.querySelector(".js-content-calendar-month");                        
            if(!monthEl) {        
                var bodyEl = rootElement.querySelector(".css-calendar-body");
                bodyEl.insertAdjacentHTML("beforeend", '<div class="js-content-calendar-month css-calendar-body-month"></div>');
                monthEl = rootElement.querySelector(".js-content-calendar-month");  
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
        
        function renderDay(day, isAnotherMonth) { //VARIABLES: weekFormat, monthNotes, allowDisplayCurrentDay
            if(!day) return "";
            isAnotherMonth = Boolean(isAnotherMonth); //NOTE: current moth by default
            var result = [];
            if(day.getDay() === weekFormat[0]) {
                result.push('<div class="css-calendar-body-week">'); //NOTE: open week
            }
            var numDate = day.getTime();
            var dayNotes = monthNotes[numDate];
            result.push(
                `<div data-numdate="${numDate}" class="js-event-openAddNoteForm js-content-day css-calendar-body-day ${day.getTime() === dayForHighlight.getTime() && allowDisplayCurrentDay ? "currentDay" : ""}">
                    <div data-numdate="${numDate}" class="js-event-openAddNoteForm css-calendar-body-dayNumber ${isAnotherMonth ? "anotherMonth" : ""}">${day.getDate()}</div>
                    <div class="js-content-calendar-dayNotes css-calendar-body-dayNotes ${isAnotherMonth ? "anotherMonth" : ""}">
                            ${renderDayNotes(numDate, dayNotes)}
                    </div>
                </div>`
            );
            if(day.getDay() === weekFormat[weekFormat.length - 1]) {
                result.push('</div>'); //NOTE: close week
            }
            return result.join("");
        }

        function renderDayNotes(numDate, notes) {
            if(!notes || notes.length === 0) return "";
            return notes.map(function(noteObj) {
                return renderNote(numDate, noteObj);
            }).join("");
        }

        function renderNote(numDate, noteObj) { //VARIABLES: allowRemoveNotes
            var noteText = noteObj["message"];
            return `<div data-noteId="${noteObj["noteId"]}" class="css-calendar-body-note">
                        <span class="css-calendar-body-note-text" title="${noteText}">${noteText}</span>
                        ${allowRemoveNotes ? `<span data-noteId="${noteObj["noteId"]}" data-numDate="${numDate}" class="js-event-openRemoveNoteForm css-button close css-calendar-body-note-deleteButton"></span>` : ""}
                    </div>`; 
        }
    }
})(Storage);