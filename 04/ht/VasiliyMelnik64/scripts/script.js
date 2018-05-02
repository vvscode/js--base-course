/**
 * @function
 * @param {Object} elem - html element, on which adds eventListener
 * @param {String} event - type of the event
 * @param {Object} cb - function-callback / eventListener
 *
 * add eventListeners for different versions of web-browsers
 */

function goingEvent(elem, event, cb) {
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
goingEvent(document.body, "click", activateLink);
goingEvent(window, "hashchange", chooseCathegory);
goingEvent(window, "load", createCalendar);
goingEvent(base.getCalendarElement(), "click", addActivity);
goingEvent(base.getForm(), "change", activateInputs);
