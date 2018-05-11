/**
 * @function
 * @param {Object} e - event object
 * stops followings a links
 *
 */
function activateLink(e) {
  if (e.target.tagName !== "A") {
    return;
  }
  e.preventDefault();
  location.hash = e.target.name;
}

/**
 * @function
 * oveerides followings a links by the value of the location.hash
 *
 */
function chooseCathegory() {
  var action = location.hash.slice(1).split("_");
  actions["draw" + action[0]](action[1]);
}

/**
 * @function
 * @param {Object} e - event object
 * determines the behavior of the page by clicked element
 */

var addActivity = (function () {
  var tempClosingElementLink;
  return function (e) {
    if (e.target.tagName === "BUTTON") {
      if (e.target.innerHTML == 'Add' || e.target.innerHTML == 'Cancel') {
        switch (e.target.innerHTML) {
          case 'Add':
            {
              var cell = document.querySelector('td[data-test="' + e.target.getAttribute('data-add') + '"]');
              var val = e.target.parentElement.firstElementChild.firstElementChild.value;
              actions.calendar.changeValue(cell, val);
            };
            break;
          case 'Cancel':
            {
              e.target.parentElement.remove();
              return;
            };
            break;
        }
      }
      if (e.target.id == '0' || e.target.id == '1') {
        actions.showModalWindow();
        if (e.target.id == '1') {
          var cell = tempClosingElementLink.parentElement.parentElement;
          var childrenArray = [].slice.call(cell.children);
          var index = childrenArray.indexOf(tempClosingElementLink.parentElement);
          var date = actions.calendar.date;
          var td = cell.tagName === "TD" ? cell : cell.parentElement;

          storage.removeItem(date, td, index);
          tempClosingElementLink.parentNode.removeChild(tempClosingElementLink.previousSibling);
          tempClosingElementLink.parentNode.removeChild(tempClosingElementLink);
        }
        return;
      }
      actions.calendar.addListing(e.target);
      return;
    }
    if (e.target.tagName === "TD" && e.target.innerHTML) {
      actions.calendar.addData(e.target);
      return;
    }
    if (e.target.classList.contains("tableItem__close") && actions.calendar.allowRemove) {
      actions.showModalWindow(e.target.previousSibling.textContent);
      tempClosingElementLink = e.target;
    }
    return;
  }
})();

/**
 * @function
 * creates virtual calendar,
 * render main blocks of the app on the page,
 * reset the form,
 * update localStorage base,
 */
function hidePreloader() {
  base.getWrapper().style.display = 'block';
  base.getPreloader().style.display = 'none';
}

function createCalendar() {
  hidePreloader();
  location.hash = "#Calendar_1";
  actions.calendar = new Calendar({
    el: "#calendar",
    showMonth: false,
    allowChange: false,
    allowAdd: false,
    allowRemove: false,
    date: [new Date().getFullYear(), new Date().getMonth() + 1],
    toString: function () {
      var str = "<pre class='code g-font'>    (function () {<br />";
      for (var prop in this) {
        if (typeof this[prop] !== "function") {
          str += "       " + prop + " : " + this[prop] + ";<br />";
        }
      }
      str += "    }) ();</pre>";
      return str;
    }
  });
  actions.hideElements(base.getAbout());
  base.getForm().reset();
  base.getCode().innerHTML = actions.calendar;
}

/**
 * @function
 * @param {Object} e - event object
 * determines the behavior of the page by value of the target input or value of data-change attribute
 */
function activateInputs(e) {
  switch (e.target.tagName.toLowerCase()) {
    case "textarea":
      {
        /*some work with the value of textArea */
        e.target.value = "";
      }
      break;
    case "select":
      {
        actions.calendar.date = [
          base.getSelects()[1].value,
          base.getMonthes().indexOf(base.getSelects()[0].value) + 1
        ];
        actions.calendar.drawCalendar(+actions.calendar.date[0], +actions.calendar.date[1],
          actions.calendar.el
        );
        base.getCode().innerHTML = actions.calendar;
      }
      break;
    default:
      {
        var data = e.target
          .getAttribute("data-change")
          .slice(1)
          .toString();
        actions.calendar[data] = e.target.checked;
        actions.calendar.drawCalendar(+actions.calendar.date[0], +actions.calendar.date[1],
          actions.calendar.el
        );
        base.getCode().innerHTML = actions.calendar;
      }
      break;
  }
}