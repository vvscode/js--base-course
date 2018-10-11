"use strict";

describe("drawInteractiveCalendar", function () {
    var calendar = document.getElementById('calendar');
    
    it("функция", function () {
        return assert.isFunction(drawInteractiveCalendar);
    });
    it("календарь создаётся", function () {
        drawInteractiveCalendar(calendar);
        return assert.isOk(calendar.innerHTML !== '');
    });

    function checkYearMonth(date) {
        var month = calendar.querySelector('.month').innerText;
        var mnames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
        assert.equal(month, mnames[date.getMonth()]);

        var year = calendar.querySelector('.year').innerText;
        assert.equal(year, date.getFullYear());
    }

    it("месяц/год правильные при создании", function () {
        drawInteractiveCalendar(calendar);
        checkYearMonth(new Date());
    });

    it("кнопка влево работает", function () {
        drawInteractiveCalendar(calendar);
        var left = calendar.querySelector('.left');
        left.click();
        
        var now = new Date();
        var prev = new Date(now.getFullYear(), now.getMonth() - 1);
        checkYearMonth(prev);
    });
    it("кнопка вправо работает", function () {
        drawInteractiveCalendar(calendar);
        var right = calendar.querySelector('.right');
        right.click();

        var now = new Date();
        var next = new Date(now.getFullYear(), now.getMonth() + 1);
        checkYearMonth(next);
    });
});
