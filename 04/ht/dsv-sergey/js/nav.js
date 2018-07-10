window.onhashchange = goLink;
setEvent('nav', 'click', goLink);
/**
 * @function
 */
function goLink() {
    if (location.hash == "#calendar") {
        showCalendar({
            el : "calendar",
            showMonth : true,
            allowChange : true,
            allowAdd : true,
            allowRemove : true,
            date : [JSON.parse(localStorage['date'])[1], JSON.parse(localStorage['date'])[0]],
            });
    }
    if (location.hash == "#create") {
        createCalendar("create", 
            {
                allowChange: true,
                allowAdd: true,
                allowRemove: true,
                showMonth: true,
                date: [setDate('year'), setDate('month')],
                el: calendar
            })
        }
    if (location.hash == "#about") {
        goToAbout("about");
    }
}

/**
 * @function
 * @param {string} idEl 
 */
function createCalendar(idEl, setting) {
    var htmlEl = document.getElementById(idEl),
        elCalendar = document.getElementById("calendar"),
        elAbout = document.getElementById("about");
    if (!elCalendar.hasAttribute("class")) {
        elCalendar.setAttribute("class", "hidden");
        elCalendar.innerHTML = "";
    }
    if (!elAbout.hasAttribute("class")) {
        elAbout.setAttribute("class", "hidden");
    }
    htmlEl.removeAttribute("class", "hidden");
    htmlEl.setAttribute("class", "createWrap");
	year = ((localStorage.date != null) ? (JSON.parse(localStorage.getItem("date")))[1] : obj.date[0]);
	month = ((localStorage.date != null) ? (JSON.parse(localStorage.getItem("date")))[0] : obj.date[1]);
    setEvent('form', 'change', displayCreate);
    drawInteractiveCalendar("preShowCalendar", year, month, setting);
    displayCreate();
}
/**
 * @function
 * @param {string} idEl 
 */
function goToAbout(idEl) {
    var htmlEl = document.getElementById(idEl),
        elCalendar = document.getElementById("calendar"),
        elCreate = document.getElementById("create");
        elCreate.removeAttribute("class", "createWrap");
    if (!elCalendar.hasAttribute("class")) {
        elCalendar.setAttribute("class", "hidden");
        elCalendar.innerHTML = "";
    }
    if (!elCreate.hasAttribute("class")) {
        elCreate.setAttribute("class", "hidden");
    }
    htmlEl.removeAttribute("class", "hidden");
}
