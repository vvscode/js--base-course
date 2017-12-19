(function (){
    let createCalenderForm = document.querySelector('#create_calender_form');
    let createCalenderShow = document.querySelector('.create_calender_show');
    let changeMonth = document.querySelector('#change_month');
    let addTasks = document.querySelector('#add_tasks');
    let removeTasks = document.querySelector('#remove_tasks');
    let showMonthAndYear = document.querySelector('#show_month_year');
    let addDateValue = document.querySelector('#add_date_value');
    let addClassCalender = document.querySelector('#add_class_calender');

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

        showCalender ();
        addCodCalender();
    });

/*вызываем конструктор календаря*/
    function showCalender () {
        let createCalenderScript = document.querySelector('#create_calender_show');
        let idForCalender = 'preview';

/*создаем обвертку для вставляемого календаря, чтоб использовать несколько на странице*/
        let calenderAddBox = document.createElement('div');
        calenderAddBox.id = idForCalender;
        createCalenderScript.appendChild(calenderAddBox);

/*запускаем конструктор календаря*/
        new Calender({
             el: "#" + idForCalender,
             allowChangeMonth: changeMonth.checked,
             allowAddTasks: addTasks.checked,
             allowRemoveTasks: removeTasks.checked,
             showMonth: showMonthAndYear.checked,
             date: addDateValue.value,
        });
    }

    function addCodCalender(){

        let createCalenderScript = document.querySelector('#create_calender_script');

        let nameIdCalender;

        if(addClassCalender.value === ''){
            nameIdCalender = 'calender' + getRandomInt(1, 50);
        } else {
            nameIdCalender = addClassCalender.value;
        }

/* создаем строку с параметрами календаря для вставки*/
        createCalenderScript.innerText = ['<script src=" https://cdn.rawgit.com/asuchoj/js--base-course/04/04/ht/asuchoj/calenderConstructor.js "></script>',
            '<script>',
            '(function() {',
                'var id = "' +  nameIdCalender + '";',
                'document.write(\'<div class=\"calendarBox\" id=\"\' + id + \'\"> </div>\');',
                'new Calender({',
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