"@fixture calendar";
"@page https://vasiliymelnik64.github.io/projects/interactiveCalendar/index.html#Calendar_1";


"@test"["testing navigation"] = {
    '1.Click link "Calendar"': function() {
        act.click("[name='Calendar_0'].item__link");
    },
    "2.Assert": function() {
        ok(getComputedStyle(document.querySelector("#about")).display == 'none');
    },
    '3.Click link "Create"': function() {
        act.click("[name='Calendar_1'].item__link");
    },
    "4.Assert": function() {
        ok(getComputedStyle(document.querySelector("#code")).display != 'none');
        ok(getComputedStyle(document.querySelector("fieldset")).display != 'none');
    },
    '5.Click link "About"': function() {
        act.click("[name='About'].item__link");
    },
    "6.Assert": function() {
        ok(getComputedStyle(document.querySelector("#about")).display != 'none');
        ok(getComputedStyle(document.querySelector("#code")).display == 'none');
        ok(getComputedStyle(document.querySelector("fieldset")).display == 'none');
    }
};

"@test"["testing form"] = {
    '1.Change the checkbox "Allow change month"': function () {
        act.click("[data-change='_allowChange']");
    },
    "2.Assert": function() {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('allowChange : true;'));
    },
    '3.Change the checkbox "Allow add tasks"': function () {
        act.click("[data-change='_allowAdd']");
    },
    "4.Assert": function() {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('allowAdd : true;'));
    },
    '5.Change the checkbox "Allow remove tasks"': function () {
        act.click("[data-change='_allowRemove']");
    },
    "6.Assert": function() {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('allowRemove : true;'));
    },
    '7.Change the checkbox "Show month / year"': function () {
        act.click("[data-change='_showMonth']");
    },
    "8.Assert": function() {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('showMonth : true;'));
    }
};