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
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('allowChange : true;') !== -1);
        ok(document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('button') !== -1);
        ok(document.getElementsByClassName('table')[0].getElementsByTagName('BUTTON'.length === 2));
    },
    '3.Change the checkbox "Show month / year"': function () {
        act.click("[data-change='_showMonth']");
    },
    "4.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('showMonth : true;') !== -1);
        ok(document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('May 2018') !== -1);
    },
    '5.Change monthes forward': function () {
        act.click("button[id='rightButton']");
    },
    "6.Assert": function () {
        ok(document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('June 2018') !== -1);
        ok(document.querySelector('.table').innerHTML.indexOf('31') === -1);
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,6;') !== -1);
    },
    '7.Change monthes back': function () {
        act.click("button[id='leftButton']");
    },
    "8.Assert": function () {
        ok(document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('May 2018') !== -1);
        ok(document.querySelector('.table').innerHTML.indexOf('31') !== -1);
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,5;') !== -1);
    },
    '9.Change a select with monthes': function () {
        act.click("select[name='month']");
    },
    "10.Assert": function () {
        ok(document.getElementsByTagName('select')[0].innerHTML.indexOf('January') !== -1);
    },
    '11.Change a select with year': function () {
        act.click("option[value='January']");
    },
    "12.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,1;') !== -1);
        ok(document.querySelector('.table').innerHTML.indexOf('31') !== -1);
    },
    '13.Change the checkbox "Show month / year (month)"': function () {
        act.click("select[name='month']");
    },
    "14.Assert": function () {
        ok(document.getElementsByTagName('select')[0].innerHTML.indexOf('August') !== -1);
    },
    '15.Change the checkbox "Show month / year (month)"': function () {
        act.click("option[value='August']");
    },
    "16.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,8;') !== -1);
        ok(document.querySelector('.table').innerHTML.indexOf('31') !== -1);
    },
    '17.Change the checkbox "Show month / year (year)"': function () {
        act.click("select[name='year']");
    },
    "18.Assert": function () {
        ok(document.getElementsByTagName('select')[1].innerHTML.indexOf('2050') !== -1);
    },
    '19.Change the checkbox "Show month / year (year)"': function () {
        act.click("option[value='2050']");
    },
    "20.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2050,8;') !== -1);
    },
    '21.Change the checkbox "Show month / year (year)"': function () {
        act.click("select[name='year']");
    },
    "22.Assert": function () {
        ok(document.getElementsByTagName('select')[1].innerHTML.indexOf('2035') !== -1);
    },
    '23.Change the checkbox "Show month / year (year)"': function () {
        act.click("option[value='2035']");
    },
    "24.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2035,8;') !== -1);
    }
};

"@test" ["testing process of adding notes in the localStorage"] = {
    '1.Change the checkbox "Allow add tasks"': function () {
        act.click("[data-change='_allowAdd']");
    },
    "2.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('allowAdd : true;') !== -1);
    },
    '3.Change the checkbox "Allow remove tasks"': function () {
        act.click("[data-change='_allowRemove']");
    },
    "4.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('allowRemove : true;') !== -1);
    },
    '5.Add first task': function () {
        act.click("[data-test='1']");
    },
    "6.Assert": function () {
        ok(document.querySelector('.addingForm__input').value = 'test_1');
    },
    '7.Add first task in the table': function () {
        act.click(document.querySelectorAll('.addingForm__item')[0]);
    },
    "8.Assert": function () {
        ok(document.querySelector('td[data-test="1"]').innerHTML.indexOf('test_1') !== -1);
    },
    '9.Remove first task': function () {
        act.click("[class='tableItem__close']");
    },
    "10.Assert": function () {
        ok(getComputedStyle(document.querySelector('.modalWindow')).display === 'block');
    },
    '11.Checking first task': function () {
        act.click("[id='1']");
    },
    "12.Assert": function () {
        ok(getComputedStyle(document.querySelector('.modalWindow')).display === 'none');
        ok(document.querySelector('td[data-test="1"]').innerHTML.indexOf('test_1') == -1);
    },
    '13.Add multiply task': function () {
        act.click("[data-test='5']");
    },
    "14.Assert": function () {
        ok(document.querySelector('.addingForm__input').value = 'test_5');
    },
    '15.Add first task in the table': function () {
        act.click(document.querySelectorAll('.addingForm__item')[0]);
    },
    "16.Assert": function () {
        ok(document.querySelector('td[data-test="5"]').innerHTML.indexOf('test_5') !== -1);
    },
    '17.Add multiply task': function () {
        act.click("[data-test='7']");
    },
    "18.Assert": function () {
        ok(document.querySelector('.addingForm__input').value = 'test_7');
    },
    '19.Add second task in the table': function () {
        act.click(document.querySelectorAll('.addingForm__item')[0]);
    },
    "20.Assert": function () {
        ok(document.querySelector('td[data-test="7"]').innerHTML.indexOf('test_7') !== -1);
    },
    '21.Add multiply task': function () {
        act.click("[data-test='25']");
    },
    "22.Assert": function () {
        ok(document.querySelector('.addingForm__input').value = 'test_25');
    },
    '23.Add third task in the table': function () {
        act.click(document.querySelectorAll('.addingForm__item')[0]);
    },
    "24.Assert": function () {
        ok(document.querySelector('td[data-test="25"]').innerHTML.indexOf('test_25') !== -1);
    },
    '25.Change the checkbox "Allow change month"': function () {
        act.click("[data-change='_allowChange']");
    },
    "26.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('allowChange : true;') !== -1);
        ok(document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('button') !== -1);
        ok(document.getElementsByClassName('table')[0].getElementsByTagName('BUTTON'.length === 2));
    },
    '27.Change the checkbox "Show month / year"': function () {
        act.click("[data-change='_showMonth']");
    },
    "28.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('showMonth : true;') !== -1);
        ok(document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('May 2018') !== -1);
    },
    '29.Change monthes forward': function () {
        act.click("button[id='rightButton']");
    },
    "30.Assert": function () {
        ok(document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('June 2018') !== -1);
        ok(document.querySelector('.table').innerHTML.indexOf('31') === -1);
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,6;') !== -1);
    },
    '31.Change monthes back': function () {
        act.click("button[id='leftButton']");
    },
    "32.Assert": function () {
        ok(document.querySelector('.table').firstElementChild.firstElementChild.firstElementChild.innerHTML.indexOf('May 2018') !== -1);
        ok(document.querySelector('.table').innerHTML.indexOf('31') !== -1);
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,5;') !== -1);
    },
    '33.Change a select with monthes': function () {
        act.click("select[name='month']");
    },
    "34.Assert": function () {
        ok(document.getElementsByTagName('select')[0].innerHTML.indexOf('January') !== -1);
    },
    '35.Change a select with year': function () {
        act.click("option[value='January']");
    },
    "36.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,1;') !== -1);
        ok(document.querySelector('.table').innerHTML.indexOf('31') !== -1);
    },
    '37.Assert': function () {
        act.click("select[name='month']");
    },
    "38.Assert": function () {
        ok(document.getElementsByTagName('select')[0].innerHTML.indexOf('January') !== -1);
    },
    '39.Assert': function () {
        act.click("option[value='May']");
    },
    "40.Assert": function () {
        ok(document.getElementsByTagName('pre')[0].innerHTML.indexOf('date : 2018,5;') !== -1);
        ok(document.querySelector('.table').innerHTML.indexOf('31') !== -1);
    },
    '41.Remove first task': function () {
        act.click(document.querySelectorAll('.tableItem__close')[0]);
    },
    "42.Assert": function () {
        ok(getComputedStyle(document.querySelector('.modalWindow')).display === 'block');
    },
    '43.Checking first task': function () {
        act.click("[id='1']");
    },
    "44.Assert": function () {
        ok(getComputedStyle(document.querySelector('.modalWindow')).display === 'none');
        ok(document.querySelector('td[data-test="5"]').innerHTML.indexOf('test_5') === -1);
    },
    '45.Remove second task': function () {
        act.click(document.querySelectorAll('.tableItem__close')[0]);
    },
    "46.Assert": function () {
        ok(getComputedStyle(document.querySelector('.modalWindow')).display === 'block');
    },
    '47.Checking second task': function () {
        act.click("[id='1']");
    },
    "48.Assert": function () {
        ok(getComputedStyle(document.querySelector('.modalWindow')).display === 'none');
        ok(document.querySelector('td[data-test="7"]').innerHTML.indexOf('test_7') === -1);
    },
    '49.Remove third task': function () {
        act.click(document.querySelectorAll('.tableItem__close')[0]);
    },
    "50.Assert": function () {
        ok(getComputedStyle(document.querySelector('.modalWindow')).display === 'block');
    },
    '51.Checking third task': function () {
        act.click("[id='1']");
    },
    "52.Assert": function () {
        ok(getComputedStyle(document.querySelector('.modalWindow')).display === 'none');
        ok(document.querySelector('td[data-test="25"]').innerHTML.indexOf('test_25') === -1);
        localStorage.clear();
    }
};