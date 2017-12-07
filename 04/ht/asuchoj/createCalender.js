(function () {

    let createCalenderForm = document.querySelector('#create_calender_form');
    let createCalenderShow = document.querySelector('.create_calender_show');

    let changeMonth = document.querySelector('#change_month');
    let addTasks = document.querySelector('#add_tasks');
    let removeTasks = document.querySelector('#remove_tasks');
    let showMonthAndYear = document.querySelector('#show_month_year');
    let addDateValue = document.querySelector('#add_date_value');


    showCalender ();
    addCodCalender();

    createCalenderForm.addEventListener('change', function (ev) {

        while ( createCalenderShow.firstElementChild ) {
            createCalenderShow.removeChild( createCalenderShow.firstElementChild );
        }

        /*let target = ev.target;*/

        /*if( target.getAttribute("type") === 'checkbox' ){
            if( !target.hasAttribute('checked') ){
                target.setAttribute('checked', 'checked')
            } else {
                target.removeAttribute('checked', 'checked')
            }
        }*/

        showCalender ();
        addCodCalender();

    });

    function showCalender () {
        new ShowCalender({
         el: '.create_calender_show',
         allowChangeMonth: changeMonth.checked,
         allowAddTasks: addTasks.checked,
         allowRemoveTasks: removeTasks.checked,
         showMonth: showMonthAndYear.checked,
         date: addDateValue.value,
        });
    }

    function addCodCalender(){

        let createCalenderScript = document.querySelector('#create_calender_script');

        createCalenderScript.innerText = ['<script src="https://cdn.rawgit.com/asuchoj/js--base-course/04/04/ht/asuchoj/shouCalender.js"></script>',
            '<script>',
            '(function() {',
                'var id = "calendar' +  getRandomInt(1, 1000000) + '"',
                'document.write(\'<div id=\"\' + id + \'\"></div>\');',
                'new ShowCalender({',
                    'el: "#" + id,' ,
                    'allowChangeMonth:' + changeMonth.checked + ',',
                    'allowAddTasks:' + addTasks.checked + ',',
                    'allowRemoveTasks:' + removeTasks.checked + ',',
                    'showMonth:' + showMonthAndYear.checked + ',',
                    'date:' + null || addDateValue.value,
                '})',
            '})();',
        '</script>'].join('\n');
    }
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

})();

