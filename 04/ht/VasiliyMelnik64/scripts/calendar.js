/**
 * @constructor
 * @param {Object} props
 * return exemplars with calendar and render it on the web-page
 */

function Calendar(props) {
  Object.assign(this, props);
  this.drawCalendar(+this.date[0], +this.date[1], this.el);
}
Calendar.prototype = {
  /**
   * @function
   * @param {number} date
   * @return {number}
   * define a number of the of the week in format from 1 to 7
   */
  defineDayOfTheWeek: function (date) {
    var dayOfTheWeek = date.getDay();
    if (dayOfTheWeek == 0) {
      dayOfTheWeek = 7;
    }
    return dayOfTheWeek - 1;
  },

  /**
   * @function
   * @param {number} year
   * @param {number} month
   * @param {string} el - DOM-element`s id
   *
   * renders calendar in the html-element on the web-page
   * update the base of the localStorage
   */
  drawCalendar: function (year, month, el) {
    if (!~el.indexOf("calendar")) {
      return;
    }
    var date = new Date(year, month - 1);
    var showMonthValue = this.showMonth ? "" : "hidden";
    var allowChangeValue = this.allowChange ? "" : "hidden";
    var table =
      '<table class="table"><tr><th colspan="7" class="table__item tableHead"><button id="leftButton" class="tableHead__button tableHead__button--left" style="visibility:' +
      allowChangeValue +
      '">&#9664</button><button id="rightButton" class="tableHead__button tableHead__button--right" style="visibility:' +
      allowChangeValue +
      '">&#9654</button>' +
      '<span style="visibility:' +
      showMonthValue +
      '">' +
      base.getMonthes()[this.date[1] - 1] +
      " " +
      this.date[0] +
      "</span>" +
      "</th></tr><tr><th class='table__item'>ПН</th><th class='table__item'>ВТ</th><th class='table__item'>СР</th><th class='table__item'>ЧТ</th> <th class='table__item'>ПТ</th><th class='table__item'>СБ</th><th class='table__item'>ВС</th> </tr><tr>";
    for (var i = 0; i < this.defineDayOfTheWeek(date); i++) {
      table +=
        '<td class="table__item table__item--hover"><span class="corner"></span></td>';
    }
    var testingValue = 1;
    while (date.getMonth() == month - 1) {
      table +=
        '<td class="table__item  table__item--hover tableItem" data-test="' + testingValue++ + '"><span class="tableItem__corner">' +
        date.getDate() +
        '</span><div class="tableItem__cellContent"></div></td>';
      if (this.defineDayOfTheWeek(date) % 7 == 6) {
        table += "</tr><tr>";
      }
      date.setDate(date.getDate() + 1);
    }
    if (this.defineDayOfTheWeek(date) != 0) {
      for (i = this.defineDayOfTheWeek(date); i < 7; i++) {
        table += "<td class='table__item table__item--hover'></td>";
      }
    }
    table += "</td></table>";
    var elem = document.querySelector(el);
    elem.classList.add("calendar__item");
    elem.innerHTML = "";
    elem.innerHTML = table;
    actions.renderTasks(elem, this.date);
  },

  /**
   * @function
   * @param {Object} elem - DOM-element/list of DOM-elements
   * update the viewing of the calendar and the block with js-code on the web-page, based on clicking on the buttons
   */
  addListing: function (elem) {
    switch (elem.id) {
      case "rightButton":
        this.date[1]++;
        break;
      case "leftButton":
        this.date[1]--;
        break;
    }

    if (this.date[1] > 12) {
      this.date[1] = 1;
      this.date[0]++;
    }
    if (this.date[1] < 1) {
      this.date[1] = 12;
      this.date[0]--;
    }
    this.drawCalendar(this.date[0], this.date[1], "#calendar");
    base.getCode().innerHTML = actions.calendar;
  },

  /**
   * @function
   * @param {Object} elem - DOM-element/list of DOM-elements
   * create temporary input in the ative cell of the table and add notes in it
   */
  addData: function (el) {
    if (!el.children[0].innerHTML || !this.allowAdd) {
      return;
    }
    var div = '<div class="calendar__addingForm addingForm"><p>Add some note: <input type="text" class="addingForm__input"></p><button class="addingForm__item" data-add="' + el.getAttribute('data-test') + '">Add</button><button class="addingForm__item" style="margin-left: 5%;">Cancel</button></div>';
    base.getCalendarElement().innerHTML += div;
  },

  /**
   * @function
   * @param {object} cell - active cell of the table
   * @param {string} val - text note for adding to the calendar
   * update the viewing of the calendar and the block with js-code on the web-page, based on clicking on the buttons;
   * push data in the localStorage
   */
  changeValue: function (cell, val) {
    var date = actions.calendar.date;
    var span = document.createElement("span");
    span.innerHTML = "<br />" + val + '<span class="tableItem__close">&times</span><br />';
    cell.appendChild(span);
    cell.parentNode.style.paddingBottom = "15px";
    cell.parentNode.style.paddingTop = "15px";
    storage.pushItem(
      cell.firstElementChild.innerHTML,
      cell.lastElementChild.innerHTML,
      actions.calendar.date
    ).then(() => {
      this.drawCalendar(this.date[0], this.date[1], "#calendar");
    });
  }
};