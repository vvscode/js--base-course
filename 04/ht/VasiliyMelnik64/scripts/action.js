/**
 * Object actions link on the calendar and methods, which rendering structural elements of the web page
 */

var actions = {
  /**
   * contains a link on the exemplar of calendar
   */
  calendar: null,

  /**
   * @function
   * shows block with calendar
   * @param {number to boolean} - influences on viewing
   * of the blocks of application (single calendar,
   * calendar with options, about me)
   */
  drawCalendar: function (action) {
    if (+action) {
      this.hideElements(base.getAbout());
    } else {
      this.hideElements(base.getFieldset(), base.getCode(), base.getAbout());
    }
  },

  /**
   * @function
   * shows deleting note in modal window
   * @param {string} - note
   */
  showModalWindow: function (note) {
    if (note == undefined) {
      base.getBody().classList.remove('g-overflow-hidden');
      base.getModalWindow().style.display = 'none';
      return;
    }
    base.getBody().classList.add('g-overflow-hidden');
    base.getModalWindow().style.display = 'block';
    base.getModalWindow().firstElementChild.firstElementChild.innerHTML = 'Вы, действительно хотите удалить запись "' + note + '"?';
  },

  /**
   * @function
   * shows block with information about author
   * and hide othe blocks
   */
  drawAbout: function () {
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
  hideElements: function () {
    var args = [].slice.call(arguments);
    var elems = [
      base.getFieldset(),
      base.getCalendarElement(),
      base.getCode(),
      base.getAbout()
    ];
    elems.forEach(function (elem) {
      elem.classList.remove("g-hide");
    });
    args.forEach(function (el) {
      el.classList.add("g-hide");
    });
  },

  /**
   * @function
   * @param {elem} - element with calendar
   * @param {date} - current date from Calendar
   * @var {allChildren} - array with rows of cells of the table (trs)
   *
   * renders tasks on the calendar with data from database
   */
  renderTasks: function (elem, date) {
    storage.getItem("base").then((base) => {
      var baseDate = base;
      if (baseDate && baseDate[date]) {
        var currentMonth = baseDate[date];
        var allChildren = [].slice.call(elem.children[0].children[0].children);
        for (var i = 2; i < allChildren.length; i++) {
          var line = allChildren[i].cells;

          for (var j = 0; j < line.length; j++) {
            var dateNumber = line[j].firstElementChild;

            if (!dateNumber ||
              !dateNumber.innerHTML ||
              !currentMonth[dateNumber.innerHTML]
            ) {
              continue;
            }
            var div = line[j].getElementsByTagName("div")[0];
            var dateContent = currentMonth[dateNumber.innerHTML];

            for (var k = 0; k < dateContent.length; k++) {
              div.innerHTML += dateContent[k];
            }
          }
        }
      }
    });
  }
};