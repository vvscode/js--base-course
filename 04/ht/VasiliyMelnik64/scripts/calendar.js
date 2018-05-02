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
  constructor: Calendar,

  /**
   * @function
   * @param {number} year
   * @param {number} month
   * @param {string} el - DOM-element`s id
   *
   * renders calendar in the html-element on the web-page
   * update the base of the localStorage
   */
  drawCalendar: function(year, month, el) {
    if (!~el.indexOf("calendar")) {
      return;
    }
    var date = new Date(year, month - 1);

    /**
     * @function
     * @param {number} date
     * @return {number}
     * define a number of the of the week in format from 1 to 7
     */
    function defineDayOfTheWeek(date) {
      var dayOfTheWeek = date.getDay();
      if (dayOfTheWeek == 0) {
        dayOfTheWeek = 7;
      }
      return dayOfTheWeek - 1;
    }
    var showMonthValue = this.showMonth ? "" : "hidden";
    var allowChangeValue = this.allowChange ? "" : "hidden";
    var table =
      '<table><tr><th colspan="7"><button id="leftButton" style="visibility:' +
      allowChangeValue +
      '">&#9664</button><button id="rightButton" style="visibility:' +
      allowChangeValue +
      '">&#9654</button>' +
      '<span style="visibility:' +
      showMonthValue +
      '">' +
      base.getMonthes()[this.date[1] - 1] +
      " " +
      this.date[0] +
      "</span>" +
      "</th></tr><tr><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th> <th>ПТ</th><th>СБ</th><th>ВС</th> </tr><tr>";
    for (var i = 0; i < defineDayOfTheWeek(date); i++) {
      table += '<td><span class="corner"></span></td>';
    }
    while (date.getMonth() == month - 1) {
      table +=
        '<td><span class="corner">' +
        date.getDate() +
        '</span><div class="cellContent"></div></td>';
      if (defineDayOfTheWeek(date) % 7 == 6) {
        table += "</tr><tr>";
      }
      date.setDate(date.getDate() + 1);
    }
    if (defineDayOfTheWeek(date) != 0) {
      for (i = defineDayOfTheWeek(date); i < 7; i++) {
        table += "<td></td>";
      }
    }
    table += "</td></table>";
    var elem = document.querySelector(el);
    elem.innerHTML = "";
    elem.innerHTML = table;
    storage.updateStorage(elem, this.date);
  },

  /**
   * @function
   * @param {Object} elem - DOM-element/list of DOM-elements
   * update the viewing of the calendar and the block with js-code on the web-page, based on clicking on the buttons
   */
  addListing: function(elem) {
    elem.id == "rightButton" ? this.date[1]++ : this.date[1]--;
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
  addData: function(el) {
    if (!el.children[0].innerHTML || !this.allowAdd) {
      return;
    }
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    el.appendChild(input);
    el.style.padding = 0;
    goingEvent(input, "blur", this.changeValue);
  },

  /**
   * @function
   * @param {Object} e - object of the event
   * update the viewing of the calendar and the block with js-code on the web-page, based on clicking on the buttons;
   * push data in the localStorage
   */
  changeValue: function(e) {
    var date = actions.calendar.date;
    var val = this.value;
    var span = document.createElement("span");
    span.innerHTML = "<br />" + val + '<span class="close">&times</span><br />';
    var cellContent = this.parentNode.getElementsByClassName("cellContent")[0];
    cellContent.appendChild(span);
    this.parentNode.style.paddingBottom = "15px";
    this.parentNode.style.paddingTop = "15px";
    this.parentNode.removeChild(this);
    storage.pushItem(
      cellContent.parentNode.firstElementChild.innerHTML,
      cellContent.lastElementChild.innerHTML,
      actions.calendar.date
    );
  }
};
