if (window.location.hash == "") {
    window.location.hash = "#calendar";
} else {
    onHashChange();
}

window.onhashchange = onHashChange;

function onHashChange() {
    if(document.getElementById('scriptBar')){
        document.getElementById('scriptBar').parentNode.removeChild(document.getElementById('scriptBar'));
    }
    var elements = document.getElementsByTagName('div');
    while(elements[0]){
        elements[0].parentNode.removeChild(elements[0]);
    }
    if(location.hash == '#calendar'){
        new CalendarObject(1, 1, 1, 1, new Date(2017,11,13), 123456);
        document.getElementById('scriptBar');
    }
    if(location.hash == '#createCalendar'){
        drawSettingsLayout();
    }

}