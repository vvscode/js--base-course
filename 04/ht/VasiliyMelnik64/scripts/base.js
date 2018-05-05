/**
 * Module, which return an object with
 * links on the DOM-elements
 * @module base
 * @returns {getFieldset, getCode, getCalendarElement, getForm,  getAbout, getSelects, getMonthes}
 */

var base = (function () {
  var fieldset = document.getElementsByTagName("fieldset")[0];
  var code = document.getElementById("code");
  var calendarElement = document.getElementById("calendar");
  var form = document.forms[0];
  var about = document.getElementById("about");
  var selects = document.querySelectorAll("select");
  var monthes = [
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
  ];
  var wrapper = document.querySelector('.wrapper');
  var preloader = document.querySelector('.preloader');

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
    }
  };
})();