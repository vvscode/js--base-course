(function storage(calendarId) {
    function createGuid() {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
        };
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    };
    function getCalendarStorageObj() {
        var calendarObjectString = localStorage.getItem(calendarId) || {};
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
    }

    return {
        setNote: function(date, message) {
            if(!date) return;
            message = message || "";

            var calendarData = getCalendarData();
            var dateData = calendarData[date] || {};
            var dateNotes = dateData["notes"] || {};
            var noteId = createGuid();            
            dateNotes[noteId] = { message };

            dateData["notes"] = dateNotes;
            calendarData[date] = dateData;

            setCalendarData(calendarData);
            return noteId;
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
        getDateNotes: function(date) {
            if(!date) return;

            var calendarData = getCalendarData();
            var dateData = calendarData[date] || {};
            return dateData["notes"] || {};
        },
        getAllNotes: function() {
            var calendarData = getCalendarData();
            var existsDates = Object.keys(calendarData);
            existsDates.forEach(function(date) {
              var notes = obj[date]["notes"] || {};
              var notesArray = Object.keys(notes).map(function(noteId) {
                var noteObject = notes[noteId];
                noteObject["noteId"] = noteId;
                return noteObject;
              });
              calendarData[date] = notesArray;
            });
            return calendarData
        }
    }
})(calendarId);