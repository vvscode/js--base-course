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
  pushItem: function (name, item, date) {
    return this.getItem("base").then(base => {
      if (date) {
        var dataBase = base || {};
        dataBase[date] = dataBase[date] || {};
        dataBase[date][name] = dataBase[date][name] || [];
        dataBase[date][name].push(item);
        localStorage.setItem("base", JSON.stringify(dataBase));
      } else {
        localStorage.setItem(name, JSON.stringify(item));
      }
    });
  },

  getItem: function (name) {
    return Promise.resolve(JSON.parse(localStorage.getItem(name)));
  },

  /**
   * @function
   * @param {Object} date - date in the property calendar of object actions
   * @param {Object} td - active table cell
   * @param {number} index - index in array of current cell
   *
   * update oblect "base" in the localStorage
   */
  removeItem: function (date, td, index) {
    this.getItem("base").then(base => {
      var base = base;
      var month = base[date];
      var elem = month[td.firstElementChild.innerHTML];
      if (elem.length == 1) {
        elem.length = 0;
      } else elem.splice(index, 1);
      localStorage.removeItem("base");
      this.pushItem("base", base); //во второй then?
    });
  },

  /**
   * @function
   * clear localStorage
   */
  clearAll: function () {
    localStorage.clear();
  }
};