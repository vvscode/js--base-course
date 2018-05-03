/**
 * Object actions link on the calendar and methods, which rendering structural elements of the web page
 */

var actions = {
  /**
   * contains a link on the exemplar of calendar
   */
  calendar: storage.getItem(calendar) || null,

  /**
   * @function
   * shows block with calendar
   * @param {number to boolean} - influences on viewing
   * of the blocks of application (single calendar,
   * calendar with options, about me)
   */
  drawCalendar: function(action) {
    if (+action) {
      this.hideElements(base.getAbout());
    } else {
      this.hideElements(base.getFieldset(), base.getCode(), base.getAbout());
    }
  },

  /**
   * @function
   * shows block with information about author
   * and hide othe blocks
   */
  drawAbout: function() {
    this.hideElements(
      base.getFieldset(),
      base.getCode(),
      base.getCalendarElement()
    );
  },

  /**
   * @function
   * @argument {Object} - DOM-element/list of DOM-elements
   * hide temporary  unnecessary elements
   */
  hideElements: function() {
    var args = [].slice.call(arguments);
    var elems = [
      base.getFieldset(),
      base.getCalendarElement(),
      base.getCode(),
      base.getAbout()
    ];
    elems.forEach(function(elem) {
      elem.classList.remove("g-hide");
    });
    args.forEach(function(el) {
      el.classList.add("g-hide");
    });
  }
};
