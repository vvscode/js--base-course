/* добавить тесты */
"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */


describe("drawInteractiveCalendar", function () {
    beforeEach(function () {
        document.getElementById('calendar-block').style.display = "none";
        var rightButton = document.getElementById('rightButton');
        var leftButton = document.getElementById('leftButton');
        var table = document.getElementsByTagName('table')[0];
        var calendar = document.getElementById('calendar');
    });
    it("drawInteractiveCalendar - функция", function () {
        return assert.isOk(typeof drawInteractiveCalendar == 'function');
    });
    it("drawCalendar - функция", function () {
        return assert.isOk(typeof drawCalendar == 'function');
    });
    it("элемент календарь создан на странице", function () {
        drawInteractiveCalendar(calendar);
        return assert.isOk(calendar.firstElementChild !== null);
    });
    it("корректно выводит дату", function () {
        drawInteractiveCalendar(calendar);

        var date = document.getElementById('date').innerHTML;
        var monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        var monthIndex = +new Date().getMonth();
        var year = +new Date().getFullYear();

        assert.isOk(~date.indexOf(monthes[monthIndex]));
        assert.isOk(~date.indexOf(year));
    });
    it("корректно выводит дату при клике на кнопку 'Назад'", function () {
        drawInteractiveCalendar(calendar);
        leftButton.click();
     
        var date = document.getElementById('date').innerHTML;
        var monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        var monthIndex = +new Date().getMonth() - 1;
        var year = +new Date().getFullYear();

        assert.isOk(~date.indexOf(monthes[monthIndex]));
        assert.isOk(~date.indexOf(year));
    });
    it("корректно выводит дату при клике на кнопку 'Вперед'", function () {
        drawInteractiveCalendar(calendar);
        for (var i = 0; i < 5; i++) {
            rightButton.click();
        }
        var date = document.getElementById('date').innerHTML;
        var monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        var monthIndex = +new Date().getMonth() + i;
        var year = +new Date().getFullYear();
        

        assert.isOk(~date.indexOf(monthes[monthIndex]));
        assert.isOk(~date.indexOf(year));
    });

    it("генерирует разный html для разных месяцев", function() {
        drawInteractiveCalendar(calendar);
        var html1 = calendar.innerHTML;
        rightButton.click();
        var html2 = calendar.innerHTML;
        assert.isOk(html1 !== html2);
        rightButton.click();
        rightButton.click();
        rightButton.click();
        html2 = calendar.innerHTML;
        assert.isOk(html1 !== html2);
        rightButton.click();
        rightButton.click();
        html2 = calendar.innerHTML;
        assert.isOk(html1 !== html2);
    });

});

     