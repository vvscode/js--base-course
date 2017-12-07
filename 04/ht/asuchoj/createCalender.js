(function () {
    var createCalenderForm = document.querySelector('#create_calender_form');
    var createCalenderShow = document.querySelector('.create_calender_show');

    var changeMonth = document.querySelector('#change_month');
    var addTasks = document.querySelector('#add_tasks');
    var removeTasks = document.querySelector('#remove_tasks');
    var showMonthAndYear = document.querySelector('#show_month_year');

    var addDateValue = document.querySelector('#add_data_value');

    new ShowCalender ({
      el:'.create_calender_show',
      allowChangeMonth: false,
      allowAddTasks: false,
      allowRemoveTasks: false,
      showMonth: false,
      year: new Date(),
      month: new Date()
    })



    createCalenderForm.addEventListener('change', function (ev) {
        var target = ev.target;

        if( target.getAttribute("type") === 'checkbox' ){
            if( !target.hasAttribute('checked') ){
                target.setAttribute('checked', 'checked')
            } else {
                target.removeAttribute('checked', 'checked')
            }
        }

        while (createCalenderShow.firstElementChild) {
          createCalenderShow.removeChild(createCalenderShow.firstElementChild);
        }

        new ShowCalender ({
          el:'.create_calender_show',
          allowChangeMonth: changeMonth.hasAttribute('checked'),
          allowAddTasks: addTasks.hasAttribute('checked'),
          allowRemoveTasks: removeTasks.hasAttribute('checked'),
          showMonth: showMonthAndYear.hasAttribute('checked'),
          year: new Date(),
          month: new Date()
        })
    });
})();