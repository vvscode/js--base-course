/**
 * Module, which return an object with links on the DOM-elements
 * 
 * @module base
 * @param  {HTMLFieldSetElement} fieldset
 * @param  {HTMLDivElement} code
 * @param  {HTMLDivElement} calendarElement
 * @param  {HTMLFormElement} form
 * @param  {HTMLDivElement} about
 * @param  {NodeList} selects (HTMLSelectElements)
 * @param  {Array} monthes
 * @param  {HTMLDivElement} wrapper
 * @param  {HTMLDivElement} preloader
 * @param  {HTMLDivElement} modalWindow
 * 
 * @returns {getFieldset, getCode, getCalendarElement, getForm,  getAbout, getSelects, getMonthes}
 */
var base = (function (
  fieldset,
  code,
  calendarElement,
  form,
  about,
  selects,
  monthes,
  wrapper,
  preloader,
  modalWindow,
  body,
  addingInput
) {
  return {
    getFieldset: function () {
      return fieldset;
    },
    getCode: function () {
      return code;
    },
    getCalendarElement: function () {
      return calendarElement;
    },
    getForm: function () {
      return form;
    },
    getAbout: function () {
      return about;
    },
    getSelects: function () {
      return selects;
    },
    getMonthes: function () {
      return monthes;
    },
    getPreloader: function () {
      return preloader;
    },
    getWrapper: function () {
      return wrapper;
    },
    getModalWindow: function () {
      return modalWindow;
    },
    getBody: function () {
      return body;
    },
    getAddingInput: function () {
      return addingInput;
    }
  }
})(
  document.getElementsByTagName("fieldset")[0],
  document.getElementById("code"),
  document.getElementById("calendar"),
  document.forms[0], document.getElementById("about"),
  document.querySelectorAll("select"), [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  document.querySelector('.wrapper'),
  document.querySelector('.preloader'),
  document.querySelector('.modalWindow'),
  document.body,
  document.getElementsByClassName('addingForm__input')[0]
)