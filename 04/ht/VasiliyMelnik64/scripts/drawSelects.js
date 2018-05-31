/**
 * this IIFE function fill two selects with needed options, when DOMContentLoaded
 */

(function () {
  base.getMonthes().forEach(elem => {
    var option = (base.getMonthes().indexOf(elem) == new Date().getMonth()) ?
      "<option value=" + elem + " selected>" + elem + "</option>" :
      "<option value=" + elem + ">" + elem + "</option>";
    base.getSelects()[0].innerHTML += option;
  });
  for (var i = 2050; i >= 1950; i--) {
    var option = (i == new Date().getFullYear()) ?
      "<option value=" + i + " selected>" + i + "</option>" :
      "<option value=" + i + ">" + i + "</option>";
    base.getSelects()[1].innerHTML += option;
  }
})();