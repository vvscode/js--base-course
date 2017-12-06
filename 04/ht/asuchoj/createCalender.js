(function () {
    var createCalenderForm = document.querySelector('#create_calender_form');
    var changeMonth = document.querySelector('#change_month');
    var addTasks = document.querySelector('#add_tasks');
    var removeTasks = document.querySelector('#remove_tasks');
    var showMonthAndYear = document.querySelector('#show_month_year');

    createCalenderForm.addEventListener('change', function (ev) {
        var target = ev.target;

        if( target.getAttribute("type") === 'checkbox' ){
            alert( target.getAttribute('id') );

            if( !target.hasAttribute('checked') ){
                target.setAttribute('checked', 'checked')
            } else {
                target.removeAttribute('checked', 'checked')
            }
        }

        new ShowCalender('.create_calender_show',
          null || new Date().getFullYear(),
          null || new Date().getMonth(),
          a = changeMonth.hasAttribute('checked'),
          b = addTasks.hasAttribute('checked'),
          c = removeTasks.hasAttribute('checked'),
          d = showMonthAndYear.hasAttribute('checked'),);

    })
})();