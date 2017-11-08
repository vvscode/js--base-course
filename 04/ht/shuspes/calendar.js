var Calendar = (function(storage) {
    //save config to storage (localStorage)
    //TODO: add js- classes to elements
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
        var isForDemonstration = Boolean(config["isForDemonstration"]);
        var showCaption = Boolean(config["showCaption"]);
        var allowNavigation = Boolean(config["allowNavigation"]);
        var allowAddNotes = Boolean(config["allowAddNotes"]);
        var allowRemoveNotes = Boolean(config["allowRemoveNotes"]);

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
            monthNotes = storage.getMonthNotes(date.getFullYear(), date.getMonth()); //NOTE: move to init calendar method. storage methods should return new object    
            drawCalendarCaption(date);
            drawCalendarBody(date);
        }

        function initCalendarActions(initDate) { //VARIABLES: rootElement, allowRemoveNotes, isForDemonstration, allowNavigation
            var navigationFunction = allowNavigation ? navigation(initDate) : function(){};
            rootElement.addEventListener("click", function(event) {
                var targetClassList = event.target.classList;
                if(targetClassList.contains("js-event-openRemoveNoteForm")) {
                    //NOTE: openRemoveNoteForm
                    openRemoveNoteForm(event.target);
                } else if(targetClassList.contains("js-event-removeNote") && allowRemoveNotes && !isForDemonstration) {
                    //NOTE: removeNote
                    removeNote(event.target);
                    closeNoteModal();
                } else if(targetClassList.contains("js-event-closeNoteModal")) {
                    //NOTE: closeNoteModal
                    closeNoteModal();
                } else if(targetClassList.contains("js-event-addNote")) {
                    //NOTE: addNote
                    addNote(event.target);
                    closeNoteModal();
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
            rootElement.getElementsByClassName("js-content-note-form")[0].innerHTML = "";
        }

        function openNoteModal(modalContent) {
            Array.prototype.forEach.call(rootElement.getElementsByClassName("css-calendar-note"), function(noteEl) {
                noteEl.classList.toggle("visible");
            });
            rootElement.getElementsByClassName("js-content-note-form")[0].innerHTML = modalContent;        
        }

        function openAddNoteForm(target) {
            var utcDate = getDataAttr(target, "utcdate");
            if(utcDate) {
                var content = renderAddNoteForm(utcDate);
                openNoteModal(content);
            }
        }

        function openRemoveNoteForm(target) {
            var noteId = getDataAttr(target, "noteid");
            var utcDate = getDataAttr(target, "utcdate");
            if(noteId && utcDate) {
                var content = renderRemoveNoteForm(utcDate, noteId);
                openNoteModal(content);                
            }
        }

        function renderAddNoteForm(utcDate) {
            return [
                '<textarea class="js-calendar-noteForm-text css-calendar-note-form-text" placeholder="Задача"></textarea>',
                '<span class="js-calendar-noteForm-noteValidation css-validation css-calendar-note-form-validation"></span>',            
                '<div class="css-calendar-note-form-buttonsBlock">',
                '<button class="js-event-closeNoteModal css-button secondary css-calendar-note-form-button">Отмена</button>',
                `<button data-utcDate="${utcDate}" class="js-event-addNote css-button primary css-calendar-note-form-button">Добавить задачу</button>`,
                '</div>'
            ].join("");
        }

        function renderRemoveNoteForm(utcDate, noteId) {
            return [
                '<div class="css-calendar-note-form-buttonsBlock">',
                '<button class="js-event-closeNoteModal css-button secondary css-calendar-note-form-button">Отмена</button>',
                `<button data-noteId="${noteId}" data-utcDate="${utcDate}" class="js-event-removeNote css-button primary css-calendar-note-form-button">Удалить задачу</button>`,
                '</div>'
            ].join("");
        }

        function addNote(target) { //VARIABLES: rootElement
            var noteText = rootElement.getElementsByClassName("js-calendar-noteForm-text")[0].value.trim();
            if(noteText === "") {
                rootElement.getElementsByClassName("js-calendar-noteForm-noteValidation")[0].innerHTML = "Note cannot be empty or whitespace. Please, input correct note.";
                return;
            }
            var utcDate = getDataAttr(target, "utcdate");
            if(utcDate) {
                var noteObj = storage.setNote(utcDate, noteText);
                if(!noteObj) return;
                addDayNoteToHtml(utcDate, noteObj);            
            }
        }

        function removeNote(target) {
            var noteId = getDataAttr(target, "noteid");
            var utcDate = getDataAttr(target, "utcdate");
            if(noteId && utcDate) {
                var result = storage.deleteNote(utcDate, noteId);
                if(result) {
                    removeNoteFromHtml(utcDate, noteId);
                }
            }
        }

        function addDayNoteToHtml(utcDay, noteObj) {
            var newNote = renderNote(utcDay, noteObj);
            var dayNotesContainer = rootElement
                    .querySelector(`[data-utcdate="${utcDay}"].js-content-day`)
                    .querySelector('.js-content-calendar-dayNotes');
            dayNotesContainer.insertAdjacentHTML("afterbegin", newNote);
        }

        function removeNoteFromHtml(utcDay, noteId) {
            var note = rootElement
                    .querySelector(`[data-utcdate="${utcDay}"].js-content-day`)
                    .querySelector('.js-content-calendar-dayNotes')
                    .querySelector(`[data-noteId="${noteId}"]`);
            note.parentNode.removeChild(note);
        }

        function getDataAttr(target, attrName) {
            if(!target || !attrName) return;
            var dataset = target.dataset;
            return dataset ? dataset[attrName] : null;  
        }

        function prepareEnvironment() { //VARIABLES: rootElement
            var calemdarTemplate = [
                '<div class="css-calendar-container">',
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
                `<div data-utcdate="${utcDate}" class="js-event-openAddNoteForm js-content-day css-calendar-body-day">
                    <div data-utcdate="${utcDate}" class="js-event-openAddNoteForm css-calendar-body-dayNumber ${isAnotherMonth ? "anotherMonth" : ""}">${day.getDate()}</div>
                    <div class="js-content-calendar-dayNotes css-calendar-body-dayNotes ${isAnotherMonth ? "anotherMonth" : ""}">
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
            return `<div data-noteId="${noteObj["noteId"]}" class="css-calendar-body-note">
                        <span class="css-calendar-body-note-text" title="${noteText}">${noteText}</span>
                        ${allowRemoveNotes ? `<span data-noteId="${noteObj["noteId"]}" data-utcDate="${utcDate}" class="js-event-openRemoveNoteForm css-button close css-calendar-body-note-deleteButton"></span>` : ""}
                    </div>`; 
        }
    }
})(Storage);