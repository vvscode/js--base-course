(function() {
    var page = getPage();
    if(page === "") {
        page = "Calendar";
        window.location.hash = page;
    }
    loadPage(page);            
})();

function getPage() {
    return window.location.hash.split('#').pop();
}

document.body.addEventListener('click', (ev) => {
    if(!ev.target.matches('a')) {
        return;
    }
    ev.preventDefault();
    var url = ev.target.getAttribute('href');
    window.location.hash = url;
});

window.addEventListener('hashchange', () => handleUrl());

function handleUrl() {
    var page = getPage();
    loadPage(page);
}

function loadCalendar() {
    var element = document.getElementById("main");  
    if(element) {  
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
            allowRemoveNotes: true,
            allowDisplayCurrentDay: true,
            userClassName: ""
        };
        
        var calendar = new Calendar(config);
        calendar.drawCalendar(); 
    }
}

function loadCreatePage() {
    var element = document.getElementById("main");  
    if(element) { 
        var createPage = new CreatePage(element);
        createPage.render();
    }
}

function loadPage(page) {
    document.getElementById("main").innerHTML = "";
    if(page === "Calendar") {
        loadCalendar();
    } else if(page === "Create") {
        loadCreatePage();
    }
}