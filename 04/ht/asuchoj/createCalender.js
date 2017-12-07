(function () {

    let createCalenderForm = document.querySelector('#create_calender_form');
    let createCalenderShow = document.querySelector('.create_calender_show');

    let changeMonth = document.querySelector('#change_month');
    let addTasks = document.querySelector('#add_tasks');
    let removeTasks = document.querySelector('#remove_tasks');
    let showMonthAndYear = document.querySelector('#show_month_year');
    let addDateValue = document.querySelector('#add_date_value');


    showCalender ();

    createCalenderForm.addEventListener('change', function (ev) {

        let target = ev.target;

        if( target.getAttribute("type") === 'checkbox' ){
            if( !target.hasAttribute('checked') ){
                target.setAttribute('checked', 'checked')
            } else {
                target.removeAttribute('checked', 'checked')
            }
        }

        alert(addDateValue.value)

        showCalender ();

    });

    function showCalender () {
      while ( createCalenderShow.firstElementChild ) {
        createCalenderShow.removeChild( createCalenderShow.firstElementChild );
      }

      new ShowCalender ({
        el:'.create_calender_show',
        allowChangeMonth: changeMonth.hasAttribute('checked'),
        allowAddTasks: addTasks.hasAttribute('checked'),
        allowRemoveTasks: removeTasks.hasAttribute('checked'),
        showMonth: showMonthAndYear.hasAttribute('checked'),
        date: addDateValue.value,
      })
    }

    /*вставка кода*/






})();


