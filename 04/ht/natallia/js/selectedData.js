function selectedData() {
  var month = document.querySelector('select[name="month"]');
  var year = document.querySelector('select[name="year"]');
  var numMonth = month.querySelectorAll('option');
  var selectYear = year.querySelectorAll('option');

  numMonth.forEach(function(el) {
    if (currentMonth == el.getAttribute('value')) {
      el.setAttribute('selected', 'selected');
    }
  });

  selectYear.forEach(function(el) {
    if (currentYear == el.getAttribute('value')) {
      el.setAttribute('selected', 'selected');
    }
  });
}
