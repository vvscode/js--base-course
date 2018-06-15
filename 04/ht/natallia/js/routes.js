var routes = {
  '': function() {
    document.querySelector('#createCalendar').innerHTML = '';
    document.querySelector('#about').innerHTML = '';

    var value = {
      el: 'calendar',
      changeMonth: true,
      allowAdd: true,
      allowRemove: true,
      year: currentYear,
      month: currentMonth,
      database: 'localStorage'
    };

    drawInteractiveCalendar(value);
    getStorageValue(value);
  },
  calendar: function() {
    document.querySelector('#createCalendar').innerHTML = '';
    document.querySelector('#about').innerHTML = '';

    var value = {
      el: calendar,
      changeMonth: true,
      allowAdd: true,
      allowRemove: true,
      year: currentYear,
      month: currentMonth,
      database: 'localStorage'
    };

    drawInteractiveCalendar(value);
    getStorageValue(value);
  },
  createCalendar: function() {
    calendar.innerHTML = '';

    if (document.querySelector('#calendar-header')) {
      document.querySelector('#calendar-header').remove();
    }

    document.querySelector('#about').innerHTML = '';

    createForm();
    selectedData();
    settingsCalendar();
  },
  about: function() {
    calendar.innerHTML = '';

    if (document.querySelector('#calendar-header')) {
      document.querySelector('#calendar-header').remove();
    }

    document.querySelector('#createCalendar').innerHTML = '';
    aboutMe();
  }
};

function handleUrl() {
  var url = window.location.hash.replace('#', '');
  routes[url]();
}

window.addEventListener('hashchange', handleUrl);

handleUrl();
