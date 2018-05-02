/**
 * object for working with localStorage
 */

var storage = {
  /**
   * @function
   * @param {String} name - name of the pushing item
   * @param {Object} item - htmlElement
   * @param {Object} date - array with date
   *
   * push items (htmlElement in String format) in the property of localStorage ("base") named by predetermined date
   */
  pushItem: function(name, item, date) {
    if (date) {
      var base = this.getItem("base") || {};
      base[date] = base[date] || {};
      base[date][name] = base[date][name] || [];
      base[date][name].push(item);
      localStorage.setItem("base", JSON.stringify(base));
    } else {
      localStorage.setItem(name, JSON.stringify(item));
    }
  },

  getItem: function(name) {
    return JSON.parse(localStorage.getItem(name));
  },

  /**
   * @function
   * @param {Object} date - date in the property calendar of object actions
   * @param {Object} td - active table cell
   * @param {number} index - index in array of current cell
   *
   * update oblect "base" in the localStorage
   */
  removeItem: function(date, td, index) {
    var base = this.getItem("base");
    var month = base[date];
    var elem = month[td.firstElementChild.innerHTML];
    if (elem.length == 1) {
      elem.length = 0;
    } else elem.splice(index, 1);
    localStorage.removeItem("base");
    this.pushItem("base", base);
  },

  /**
   * @function
   * clear localStorage
   */
  clearAll: function() {
    localStorage.clear();
  },

  /**
   * @function
   * @param {elem} - element with calendar
   * @param {date} - current date from Calendar
   * @var {allChildren} - array with rows of cells of the table (trs)
   *
   * push data into database (in property of object, named as number of date of the day and contaons array of notes)
   */
  updateStorage: function(elem, date) {
    var baseDate = storage.getItem("base");
    if (!baseDate) {
      return;
    }
    var currentMonth = baseDate[date];
    if (!currentMonth) {
      return;
    }
    var allChildren = [].slice.call(elem.children[0].children[0].children);
    for (var i = 2; i < allChildren.length; i++) {
      var line = allChildren[i].cells;

      for (var j = 0; j < line.length; j++) {
        var dateNumber = line[j].firstElementChild;

        if (
          !dateNumber ||
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
};