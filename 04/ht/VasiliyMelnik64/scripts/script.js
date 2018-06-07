/**
 * @function
 * @param {Object} elem - html element, on which adds eventListener
 * @param {String} event - type of the event
 * @param {Object} cb - function-callback / eventListener
 *
 * add eventListeners for different versions of web-browsers
 */

function runEvent(elem, event, cb) {
  if (addEventListener) {
    elem.addEventListener(event, cb, false);
  } else if (attachEvent) {
    elem.attachEvent("on" + event, cb);
  } else {
    elem["on" + event] = cb;
  }
}

/**
 * adding eventlisteners
 */
runEvent(document.body, "click", activateLink);
runEvent(window, "hashchange", chooseCathegory);
runEvent(window, "load", createCalendar);
runEvent(base.getBody(), "click", addActivity);
runEvent(base.getForm(), "change", activateInputs);