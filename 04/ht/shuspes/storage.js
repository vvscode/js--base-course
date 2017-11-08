var Storage = (function(calendarId) {
    function createGuid() {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
        };
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    };
    function getCalendarStorageObj() {
        var calendarObjectString = localStorage.getItem(calendarId);
        if(!calendarObjectString) return {};
        return JSON.parse(calendarObjectString);
    };
    function setCalendarStorageObj(obj) {
        if(!obj) return;
        var calendarObjectString = JSON.stringify(obj);
        localStorage.setItem(calendarId, calendarObjectString);
    };
    function setCalendarData(calendarData) {
        if(!calendarData) return;
        var calendarObj = getCalendarStorageObj();
        calendarObj["calendarData"] = calendarData;
        setCalendarStorageObj(calendarObj);
    };
    function getCalendarData() {
        return getCalendarStorageObj()["calendarData"] || {};
    };
    function getNotesInRange(firstDate, lastDate) {
        var calendarData = getCalendarData();
        var utcFirstDate = Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
        var utcLastDate = Date.UTC(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());

        Object.keys(calendarData).filter(function(date) {
            return date >= utcFirstDate && date <= utcLastDate;
        }).forEach(function(date) {
            var notes = calendarData[date]["notes"] || {};
            var notesArray = Object.keys(notes).map(function(noteId) {
                var noteObject = notes[noteId];
                noteObject["noteId"] = noteId;
                return noteObject;
            });
            calendarData[date] = notesArray;
        });
        return calendarData
    }

    return {
        setNote: function(date, message) {
            if(!date) return;
            message = message || "";

            var calendarData = getCalendarData();
            var dateData = calendarData[date] || {};
            var dateNotes = dateData["notes"] || {};
            var noteId = createGuid(); 
            var noteObject = { message: message, noteId: noteId };
            dateNotes[noteId] = noteObject;

            dateData["notes"] = dateNotes;
            calendarData[date] = dateData;

            setCalendarData(calendarData);
            return noteObject;
        },
        deleteNote: function(date, noteId) {
            var result = false;
            if(!date || !noteId) return result;
            
            var calendarData = getCalendarData();
            var dateData = calendarData[date];
            if(!dateData) return result;
            var dateNotes = dateData["notes"];
            if(!dateNotes) return result;

            result = delete dateNotes[noteId];
            if(result) {
                calendarData[date]["notes"] = dateNotes;
                setCalendarData(calendarData);            
            }
            return result;
        },
        getMonthNotes: function(year, month) {
            var firstDate = new Date(year, month, 1);
            var lastDate = new Date(firstDate);
            while (lastDate.getMonth() === month) {
                lastDate.setDate(lastDate.getDate() + 1);
            }
            lastDate.setDate(lastDate.getDate() + 5); //NOTE: for display next month notes
            firstDate.setDate(firstDate.getDate() - 5); //NOTE: for display previous month notes            
            return getNotesInRange(firstDate, lastDate);
        }
    }
})(calendarId);