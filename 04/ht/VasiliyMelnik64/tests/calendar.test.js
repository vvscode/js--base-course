"@fixture calendar";
"@page https://vasiliymelnik64.github.io/projects/interactiveCalendar/index.html#Calendar_1";



"@test" ["testing navigation"] = {
    '1.Click link "Calendar"': function () {
        act.click("[name='Calendar_0'].item__link");
    },
    "2.Assert": function () {
        ok(getComputedStyle(document.querySelector("#about")).display == 'none');
    },
    '3.Click link "Create"': function () {
        act.click("[name='Calendar_1'].item__link");
    },
    "4.Assert": function () {
        ok(getComputedStyle(document.querySelector("#code")).display != 'none');
        ok(getComputedStyle(document.querySelector("fieldset")).display != 'none');
    },
    '5.Click link "About"': function () {
        act.click("[name='About'].item__link");
    },
    "6.Assert": function () {
        ok(getComputedStyle(document.querySelector("#about")).display != 'none');
        ok(getComputedStyle(document.querySelector("#code")).display == 'none');
        ok(getComputedStyle(document.querySelector("fieldset")).display == 'none');
    }
};

"@test" ["testing interaction between the form and the blocks with the object with the code and with the calendar"] = {
    '1.Change the checkbox "Allow change month"': function () {
        act.click("[data-change='_allowChange']");
    },
    "2.Assert": function () {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('allowChange : true;'));
        ok(~document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('button'));
        ok(document.getElementsByClassName('table')[0].getElementsByTagName('BUTTON'.length === 2));
    },
    '3.Change the checkbox "Show month / year"': function () {
        act.click("[data-change='_showMonth']");
    },
    "4.Assert": function () {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('showMonth : true;'));
        ok(~document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('May 2018'));
    },
    '5.Change monthes forward': function () {
        act.click("button[id='rightButton']");
    },
    "6.Assert": function () {
        ok(~document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('June 2018'));
        ok(!~document.querySelector('.table').innerHTML.indexOf('31'));
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,6;'));
    },
    '7.Change monthes back': function () {
        act.click("button[id='leftButton']");
    },
    "8.Assert": function () {
        ok(~document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('May 2018'));
        ok(~document.querySelector('.table').innerHTML.indexOf('31'));
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,5;'));
    },
    '9.Change a select with monthes': function () {
        act.click("select[name='month']");
    },
    "10.Assert": function () {
        ok(~document.getElementsByTagName('select')[0].innerHTML.indexOf('January'));
    },
    '11.Change a select with year': function () {
        act.click("option[value='January']");
    },
    "12.Assert": function () {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,1;'));
        ok(~document.querySelector('.table').innerHTML.indexOf('31'));
    },
    '13.Change the checkbox "Show month / year (month)"': function () {
        act.click("select[name='month']");
    },
    "14.Assert": function () {
        ok(~document.getElementsByTagName('select')[0].innerHTML.indexOf('August'));
    },
    '15.Change the checkbox "Show month / year (month)"': function () {
        act.click("option[value='August']");
    },
    "16.Assert": function () {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,8;'));
        ok(~document.querySelector('.table').innerHTML.indexOf('31'));
    },
    '17.Change the checkbox "Show month / year (year)"': function () {
        act.click("select[name='year']");
    },
    "18.Assert": function () {
        ok(~document.getElementsByTagName('select')[1].innerHTML.indexOf('2050'));
    },
    '19.Change the checkbox "Show month / year (year)"': function () {
        act.click("option[value='2050']");
    },
    "20.Assert": function () {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2050,8;'));
    },
    '21.Change the checkbox "Show month / year (year)"': function () {
        act.click("select[name='year']");
    },
    "22.Assert": function () {
        ok(~document.getElementsByTagName('select')[1].innerHTML.indexOf('2035'));
    },
    '23.Change the checkbox "Show month / year (year)"': function () {
        act.click("option[value='2035']");
    },
    "24.Assert": function () {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2035,8;'));
    }
};

"@test" ["testing process of adding notes in the localStorage"] = {
    '1.Change the checkbox "Allow add tasks"': function () {
        act.click("[data-change='_allowAdd']");
    },
    "2.Assert": function () {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('allowAdd : true;'));
    },
    '3.Change the checkbox "Allow remove tasks"': function () {
        act.click("[data-change='_allowRemove']");
    },
    "4.Assert": function () {
        ok(~document.getElementsByTagName('pre')[0].innerHTML.indexOf('allowRemove : true;'));
    },
    '5.Add first task': function () {
        act.click("[data-test='1']");
    },
    "6.Assert": function () {
        ok(document.querySelector("td[data-test='1']").lastElementChild.value = 'test');
    },
    '7.Add first task': function () {
        act.click("[id='code']");
    },
    "8.Assert": function () {
        ok(true == true);
    },
    '9.Add first task': function () {
        act.click("[class='tableItem__close']");
    },
    "10.Assert": function () {
        ok
    }

    /**
     * добавление
     * тесты - что, куда, тэги, атрибуты, значения, стили
     * листание
     * тесты
     * релоад
     * тесты
     * удаление
     * тесты
     */
};