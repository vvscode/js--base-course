var config = {
    element: element,
    calendarId: calendarId,
    date: { 
        month: new Date().getMonth(), 
        year: new Date().getFullYear() 
    },
    showCaption: true,
    allowNavigation: true,
    allowAddNotes: true,
    allowRemoveNotes: true
};
 
var calendar = new Calendar(config);
calendar.drawCalendar();  