/* добавить тесты */
"use strict";

/* eslint no-var: "off" */
/* eslint no-unused-vars: "off" */
/* eslint max-len: "off" */
/*describe("EmptyConstructor", function() {
    it("функция", function() {
        return assert.isOk(typeof EmptyConstructor === "function");
    });
    it("не является конструктором", function () {
        try {
            new EmptyConstructor(1, 2, 3);
        } catch (e) { 
            var name = e.name;
            var message = e.message;
        }
        return assert.isOk(name === "Error" && message === "Функция не может быть конструктором");
    });
});

describe("getCounter", function () {
    var methods = ['log', 'add', 'reset'];
    var simpleObject = getCounter();
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        it(methods[i] + " - функция", function() {
            return assert.isOk(typeof simpleObject[method] === 'function');
        });
        it(methods[i] + " возвращает ссылку на объект", function () {
            return assert.isOk(simpleObject === simpleObject[method]());
        });
    }
});

describe("drawCalendar", function() {

    it("функция", function() {
      return assert.isOk(typeof drawCalendar === "function");
    });
    it("заполняет innerHTML у элемента (третий аргумент)", function () {
        alert(el);
      drawCalendar(2017, 9, el);
      assert.isOk(el.innerHTML.trim() !== "");
    });
    it("генерирует разный html для разных месяцев", function() {
      drawCalendar(2017, 9, el);
      var html1 = el.innerHTML;
      drawCalendar(2017, 10, el);
      var html2 = el.innerHTML;
      assert.isOk(html1 !== html2);
    });
    it("правильно определяет число дней в месяце", function() {
      drawCalendar(2017, 9, el);
      var html = el.innerHTML;
      assert.isOk(html.indexOf("30") > 0);
      assert.isOk(html.indexOf("31") < 0);
  
      drawCalendar(2017, 2, el);
      var html = el.innerHTML;
      assert.isOk(html.indexOf("28") > 0);
      assert.isOk(html.indexOf("29") < 0);
      assert.isOk(html.indexOf("30") < 0);
      assert.isOk(html.indexOf("31") < 0);
    });

  });*/





describe("drawInteractiveCalendar", function () {
    beforeEach(function () {
        document.getElementById('calendar-block').style.display = "none";
        var rightButton = document.getElementById('rightButton');
        var leftButton = document.getElementById('leftButton');
        var clearStorage = document.getElementById('clearStorage');
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

});

     