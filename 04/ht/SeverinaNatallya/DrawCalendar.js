var options = {};
options.htmlEl = document.getElementsByClassName("parent")[0];
options.showMonth = true;
options.allowChange = true;
options.allowAddNotes=true;
options.allowRemoveNotes=true;
options.startMonth = 10;
options.startYear = 2017;
new window.Calendar(options);
document.getElementsByClassName("centered")[0].addEventListener('click', (ev) => {
    ev.preventDefault();
    let url = ev.target.getAttribute('href');
    window.location.hash = url;
    document.getElementsByClassName('parent')[0].innerHTML = "";
    let mainCalendar = new window.Calendar(options);
   });
document.getElementsByClassName("line")[0].addEventListener('click', (ev) => {
    ev.preventDefault();
    let url = ev.target.getAttribute('href');
    window.location.hash = url;
    document.getElementsByClassName('parent')[0].innerHTML = "";
    let userSettings = new UserSettings();
    });
