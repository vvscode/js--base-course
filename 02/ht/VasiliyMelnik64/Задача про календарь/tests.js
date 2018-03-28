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
        var calendar = document.getElementById('alendar');
    });
    it("drawInteractiveCalendar - функция", function () {
        return assert.isOk(typeof drawInteractiveCalendar == 'function');
    });
    it("drawCalendar - функция", function () {
        return assert.isOk(typeof drawCalendar == 'function');
    });
    it("элемент календарь создан на странице", function () {
        return assert.isOk(calendar.firstElementChild !== null);
    });
    it("корректно выводит дату", function () {
        return assert.isOk(document.getElementById('date').innerHTML === 'Март 2018');
    });
    it("корректно выводит дату при клике на кнопку 'Назад'", function () {
        leftButton.click();
        return assert.isOk(document.getElementById('date').innerHTML === 'Февраль 2018');
    });
    it("корректно выводит дату при клике на кнопку 'Вперед'", function () {
        rightButton.click();
        return assert.isOk(document.getElementById('date').innerHTML === 'Март 2018');
    });
    it("корректно меняет года вперед", function () {
        for (var i = 0; i < 10; i++) { 
            rightButton.click();
        }
        return assert.isOk(document.getElementById('date').innerHTML === 'Январь 2019');
    });
    it("корректно меняет года назад", function () {
        for (var i = 0; i < 15; i++) { 
            leftButton.click();
        }
        return assert.isOk(document.getElementById('date').innerHTML === 'Октябрь 2017');
    });
    it("корректно вычисляет високосный год", function () {
        for (var i = 0; i < 20; i++) { 
            leftButton.click();
        }
        var tableContent = document.getElementsByTagName('table')[0].innerHTML;
        return assert.isOk(~tableContent.indexOf('29'));
    });
    it("корректно выводит любые даты", function () {
        for (var i = 0; i < 33; i++) { 
            rightButton.click();
        }
        assert.isOk(document.getElementById('date').innerHTML === 'Ноябрь 2018');
        for (i = 0; i < 100; i++) { 
            leftButton.click();
        }
        assert.isOk(document.getElementById('date').innerHTML === 'Июль 2010');
        for (i = 0; i < 56; i++) { 
            rightButton.click();
        }
        assert.isOk(document.getElementById('date').innerHTML === 'Март 2015');
        for (i = 0; i < 36; i++) { 
            rightButton.click();
        }
        assert.isOk(document.getElementById('date').innerHTML === 'Март 2018');
    });
    it("генерирует разный html для разных месяцев", function() {

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

     