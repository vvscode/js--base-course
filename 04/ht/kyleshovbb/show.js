"use strict";

function show(page) {
    let indexDiv = document.querySelector("#index");
    let aboutDiv = document.querySelector("div[id='aboutDiv']");
    let calendar = document.querySelector("div[id|='calendar']");

    switch (page) {
        case "calendar":
            if (calendar) {
                calendar.style.display = "block";
            }
            hideCreate();
            hideAbout();
            break;
        case "index":
            if (calendar) {
                calendar.style.display = "block";
            }
            indexDiv.style.display = "block";
            hideAbout();
            break;
        case "about":
            if (aboutDiv) {
                aboutDiv.style.display = "block";
            }
            if (calendar){
                calendar.style.display = "none";
            }
            hideCreate();
            break;
    }

    function hideCreate() {
        indexDiv.style.display = "none";
    }

    function hideAbout() {
        if (aboutDiv) {
            aboutDiv.style.display = "none";
        }
    }
}