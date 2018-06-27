"use strict"

describe("Calendar", function() {
    beforeEach(function() {
        new Calendar(params);
    });
    var months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

    var params = {
        element: "#calendarSettings",
        changeMonth: true,
        addNotes: true,
        removeNotes: true,
        showMonth: true
    };

    it("Calendar is a function", function() {
        return assert.isOk(typeof Calendar === "function");
    });

    it("displayCalendar is a function", function() {
        return assert.isOk(typeof displayCalendar === "function");
    });

    it("displayPage is a function", function() {
        return assert.isOk(typeof displayPage === "function");
    });

    it("displayAuthor is a function", function() {
        return assert.isOk(typeof displayAuthor === "function");
    });

    it("displayCreate is a function", function() {
        return assert.isOk(typeof displayCreate === "function");
    });

    it("Element calendar is created", function() {
        displayCalendar();
        return assert.isOk(calendar.firstElementChild !== null);
    });

    it("Element createCode is created", function() {
        displayCreate();
        return assert.isOk(createCode.firstElementChild !== null);
    });

    it("Element about is created", function() {
        displayAuthor();
        return assert.isOk(about.firstElementChild !== null);
    })

    it("Check the class of elements", function() {
        return assert.isOk(getComputedStyle(document.querySelector("#about")).display == 'none');
        return assert.isOk(getComputedStyle(document.querySelector("#createCode")).display == 'none');
    })

    it("Show the date correctly", function() {
        var date = document.getElementById("calendarSettings").innerHTML;
        
        var monthIndex = +new Date().getMonth();
        var year = +new Date().getFullYear();

        assert.isOk(~date.indexOf(months[monthIndex]));
        assert.isOk(~date.indexOf(year));
    });

    it("Show the date correctly when press Back button", function() {
        var leftButton = document.querySelector(".left");
        leftButton.click();

        var date = document.getElementById("calendarSettings").innerHTML;
        
        var monthIndex = +new Date().getMonth() - 1;
        var year = +new Date().getFullYear();

        assert.isOk(~date.indexOf(months[monthIndex]));
        assert.isOk(~date.indexOf(year));
    });

    it("Show the date correctly when press Forward button", function() {
        var rightButton = document.querySelector(".right");
        rightButton.click();

        var date = document.getElementById("calendarSettings").innerHTML;
        
        var monthIndex = +new Date().getMonth() + 1;
        var year = +new Date().getFullYear();

        assert.isOk(~date.indexOf(months[monthIndex]));
        assert.isOk(~date.indexOf(year));
    });

    it("Generates different html for different months", function() {
        var rightButton = document.querySelector(".right");
        var html1 = document.getElementById("calendarSettings").innerHTML;
        rightButton.click();
        var html2 = document.getElementById("calendarSettings").innerHTML;
        assert.isOk(html1 !== html2);
        rightButton.click();
        rightButton.click();
        rightButton.click();
        var html2 = document.getElementById("calendarSettings").innerHTML;
        assert.isOk(html1 !== html2);
        rightButton.click();
        rightButton.click();
        var html2 = document.getElementById("calendarSettings").innerHTML;
        assert.isOk(html1 !== html2);
    })

})