var Storage = (function() {
    function createGuid() {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
        };
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    };
    function getCalendarStorageObj(calendarId) {
        var calendarObjectString = localStorage.getItem(calendarId);
        if(!calendarObjectString) return {};
        return JSON.parse(calendarObjectString);
    };
    function setCalendarStorageObj(calendarId, obj) {
        if(!obj) return;
        var calendarObjectString = JSON.stringify(obj);
        localStorage.setItem(calendarId, calendarObjectString);
    };
    function setCalendarData(calendarId, calendarData) {
        if(!calendarData) return;
        var calendarObj = getCalendarStorageObj(calendarId);
        calendarObj["calendarData"] = calendarData;
        setCalendarStorageObj(calendarId, calendarObj);
    };
    function getCalendarData(calendarId) {
        return getCalendarStorageObj(calendarId)["calendarData"] || {};
    };
    function getNotesInRange(calendarId, firstDate, lastDate) {
        var calendarData = getCalendarData(calendarId);
        var numFirstDate = firstDate.getTime();
        var numLastDate = lastDate.getTime();

        Object.keys(calendarData).filter(function(date) {
            return date >= numFirstDate && date <= numLastDate;
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
        setNote: function(calendarId, date, message) {
            if(!date) return;
            message = message || "";

            var calendarData = getCalendarData(calendarId);
            var dateData = calendarData[date] || {};
            var dateNotes = dateData["notes"] || {};
            var noteId = createGuid(); 
            var noteObject = { message: message, noteId: noteId };
            dateNotes[noteId] = noteObject;

            dateData["notes"] = dateNotes;
            calendarData[date] = dateData;

            setCalendarData(calendarId, calendarData);
            return noteObject;
        },
        deleteNote: function(calendarId, date, noteId) {
            var result = false;
            if(!date || !noteId) return result;
            
            var calendarData = getCalendarData(calendarId);
            var dateData = calendarData[date];
            if(!dateData) return result;
            var dateNotes = dateData["notes"];
            if(!dateNotes) return result;

            result = delete dateNotes[noteId];
            if(result) {
                calendarData[date]["notes"] = dateNotes;
                setCalendarData(calendarId, calendarData);            
            }
            return result;
        },
        getMonthNotes: function(calendarId, year, month) {
            var firstDate = new Date(year, month, 1);
            var lastDate = new Date(firstDate);
            while (lastDate.getMonth() === month) {
                lastDate.setDate(lastDate.getDate() + 1);
            }
            lastDate.setDate(lastDate.getDate() + 5); //NOTE: for display next month notes
            firstDate.setDate(firstDate.getDate() - 5); //NOTE: for display previous month notes            
            return getNotesInRange(calendarId, firstDate, lastDate);
        }
    }
})();