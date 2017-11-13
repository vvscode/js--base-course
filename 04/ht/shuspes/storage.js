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

    return {
        setNote: function(calendarId, numDate, message) {
            if(!numDate) return;
            message = message || "";

            var date = new Date(+numDate);
            var year = date.getFullYear();
            var month = date.getMonth();

            var calendarData = getCalendarData(calendarId);
            var monthData = calendarData[`${year}-${month}`] || {};
            var dateData = monthData[numDate] || {};
            var dateNotes = dateData["notes"] || {};
            var noteId = createGuid(); 
            var noteObject = { message: message, noteId: noteId };
            dateNotes[noteId] = noteObject;

            dateData["notes"] = dateNotes;
            monthData[numDate] = dateData;
            calendarData[`${year}-${month}`] = monthData;

            setCalendarData(calendarId, calendarData);
            return noteObject;
        },
        deleteNote: function(calendarId, numDate, noteId) {
            var result = false;
            if(!numDate || !noteId) return result;

            var date = new Date(+numDate);
            var year = date.getFullYear();
            var month = date.getMonth();
            
            var calendarData = getCalendarData(calendarId);
            var monthData = calendarData[`${year}-${month}`];        
            if(!monthData) return result;            
            var dateData = monthData[numDate];
            if(!dateData) return result;
            var dateNotes = dateData["notes"];
            if(!dateNotes) return result;

            result = delete dateNotes[noteId];
            if(result) {
                calendarData[`${year}-${month}`][numDate]["notes"] = dateNotes;
                setCalendarData(calendarId, calendarData);            
            }
            return result;
        },
        getMonthNotes: function(calendarId, year, month, getNearby = false) { //FIXME: use year-month keys
            var calendarData = getCalendarData(calendarId) || {};
            var monthNotes = calendarData[`${year}-${month}`] || {}; 
            if(getNearby) {
                var date = new Date(year, month);
                date.setMonth(month - 1);
                var previousMonthNotes = calendarData[`${date.getFullYear()}-${date.getMonth()}`];                
                date.setMonth(month + 1);
                var nextMonthNotes = calendarData[`${date.getFullYear()}-${date.getMonth()}`];
                Object.assign(monthNotes, previousMonthNotes, nextMonthNotes);
            }
            Object.keys(monthNotes).forEach(function(date) {
                var notes = monthNotes[date]["notes"] || {};
                var notesArray = Object.keys(notes).map(function(noteId) {
                    var noteObject = notes[noteId];
                    noteObject["noteId"] = noteId;
                    return noteObject;
                });
                monthNotes[date] = notesArray;
            });
            return monthNotes;
        }
    }
})();