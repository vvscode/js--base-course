var element = document.getElementById("calendar");    
var calendarId = element.id;    
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

document.addEventListener("DOMContentLoaded", function(event) { //NOTE: move to router file
    console.log("Calendar", Calendar);  
    Calendar.drawCalendar();  
});