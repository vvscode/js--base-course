(function (){
    let createCalenderForm = document.querySelector('#create_calender_form');
    let createCalenderShow = document.querySelector('.create_calender_show');
    let changeMonth = document.querySelector('#change_month');
    let addTasks = document.querySelector('#add_tasks');
    let removeTasks = document.querySelector('#remove_tasks');
    let showMonthAndYear = document.querySelector('#show_month_year');
    let addDateValue = document.querySelector('#add_date_value');

    addCodCalender();  // код календаря по умолчанию
    showCalender(); // календарь по умолчанию

/* обработчик на форму настроек календаря */
    createCalenderForm.addEventListener('change', function () {

/*удаляет календарь и перестраивает с новыми настройками*/

        while ( createCalenderShow.firstElementChild ) {
            createCalenderShow.removeChild( createCalenderShow.firstElementChild );
        }

        if( event.target.getAttribute('checked') === 'checked' ){
            event.target.removeAttribute('checked')
        } else {
            event.target.setAttribute('checked', 'checked')
        }

        /*localStorage.setItem("object", document.querySelector('#create_calender_form').innerHTML);*/

        showCalender ();
        addCodCalender();
    });

/*вызываем конструктор календаря*/
    function showCalender () {
        let createCalenderScript = document.querySelector('#create_calender_show');
        let id = 'calendar' +  getRandomInt(1, 1000000);

/*создаем обвертку для вставляемого календаря, чтоб использовать несколько на странице*/
        let calenderAddBox = document.createElement('div');
        calenderAddBox.id = id;
        createCalenderScript.appendChild(calenderAddBox);

/*запускаем конструктор календаря*/

        new ShowCalender({
         /*el: '.create_calender_show',*/
         el: "#" + id,
         allowChangeMonth: changeMonth.checked,
         allowAddTasks: addTasks.checked,
         allowRemoveTasks: removeTasks.checked,
         showMonth: showMonthAndYear.checked,
         date: addDateValue.value,
        });


/*        createCalenderPage.innerHTML = localStorage.getItem('noteList') || null;*/

    }

    function addCodCalender(){

        let createCalenderScript = document.querySelector('#create_calender_script');

/* создаем строку с параметрами календаря для вставки*/
        createCalenderScript.innerText = ['<script src=" https://cdn.rawgit.com/asuchoj/js--base-course/04/04/ht/asuchoj/shouCalender.js "></script>',
            '<script>',
            '(function() {',
                'var id = "calendar' +  getRandomInt(1, 1000000) + '"',
                'document.write(\'<div class=\"calendarBox\" id=\"\' + id + \'\"> </div>\');',
                'new ShowCalender({',
                    'el: "#" + id,' ,
                    'allowChangeMonth:' + changeMonth.checked + ',',
                    'allowAddTasks:' + addTasks.checked + ',',
                    'allowRemoveTasks:' + removeTasks.checked + ',',
                    'showMonth:' + showMonthAndYear.checked + ',',
                    'date:' + ( addDateValue.value === '' ? null : addDateValue.value ) ,
                '})',
            '})();',
        '</script>'].join('\n');
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
})();