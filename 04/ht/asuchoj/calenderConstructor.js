function ShowCalender ( {el, allowChangeMonth, allowAddTasks, allowRemoveTasks, showMonth, date } ) {

    // если введена дата, то введенное значение, если нет - текущая дата по умолчанию
    let dateInCalender;

    if( date === ''){
        dateInCalender = new Date();
    } else {
        dateInCalender = new Date(date);
    }

    let year = dateInCalender.getFullYear();
    let month = dateInCalender.getMonth();

/*создаем и вставляем оболочку для календаря*/
    let calender = CreateElement ( el, 'div', 'calendar', el + 'calendar');

/*создаем и вставляем кнопки управления*/
    let butPrev = CreateElement ( el, 'button', 'prev__button', el + 'prev_button');
    let butNext = CreateElement ( el, 'button', 'next__button', el + 'next_button');
    butPrev.innerHTML = '<';
    butNext.innerHTML = '>';

/*отрисовка календаря*/
    createCalendar( el + 'calendar' , year, month);

/*убираем элементы, которые не нужно (из настроек)*/
    testCheckBox();

/*обрабботчики для кнопок управления*/
    butPrev.addEventListener('click', function() {
        createCalendar(el + 'calendar', year, --month);
        testCheckBox();
    });

    butNext.addEventListener('click', function() {
        createCalendar(el + 'calendar', year, ++month);
        testCheckBox();
    });

    calender.addEventListener('dblclick', addNewDescriptionDate, false); // при двойном клике - записать комент
    calender.addEventListener('click', deleteDescription, true); // удалить коментарий

/*функция создание календаря*/
    function createCalendar( element, year, month) {
        let daysOfLastMonth = '', daysOfThisMonth = '', daysNextMonth = '';

        let elem = document.getElementById(element);
        let dataInCalenderNow = new Date(year, month);
        const THISMONTH = dataInCalenderNow.getMonth();

        /*шапка календаря*/
        let calenderHead = "<thead><tr><th colspan='7'><h2>" + addNameMonth(THISMONTH) + ' ' + dataInCalenderNow.getFullYear() + "</h2></th></tr></thead>";

        /*тело календаря*/
        let nameDays = '<tbody><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th>' +
            '<th>вс</th></tr><tr>';

        // заполнить первый ряд от понедельника и до дня, с которого начинается месяц * * * | 1  2  3  4
        for (let i = 0; i < getNumDay(dataInCalenderNow); i++) {
            daysOfLastMonth += '<td></td>';
        }

        // ячейки календаря с датами
        while (dataInCalenderNow.getMonth() === THISMONTH) {

            daysOfThisMonth += '<td>' + dataInCalenderNow.getDate() + '</td>';
            if (getNumDay(dataInCalenderNow) % 7 === 6) { // вс, последний день - перевод строки
                daysOfThisMonth += '</tr><tr>';
            }
            dataInCalenderNow.setDate(dataInCalenderNow.getDate() + 1);
        }

        // добить таблицу пустыми ячейками, если нужно
        if (getNumDay(dataInCalenderNow) !== 0) {
            for (let i = getNumDay(dataInCalenderNow); i < 7; i++) {
                daysNextMonth += '<td></td>';
            }
        }
        //собираем таблицу
        elem.innerHTML = '<table>' + calenderHead + nameDays + daysOfLastMonth + daysOfThisMonth + daysNextMonth + '</tr></tbody></table>';

        let allTd = document.querySelectorAll('td');
        addClassTd ( allTd, 'empty_field', 'days_Of_This_Month');

        addAllDescriptionDate();

    }

    function addNameLocalStorageKey(param) {
        return a = el + '_' + year + '_' + month + '_' + param;
    }

    function addAllDescriptionDate () {
        let td = document.querySelectorAll( el + ' .days_Of_This_Month');

        [].forEach.call(td, function (element) {
            for( let key in localStorage ){
                if( key === addNameLocalStorageKey( parseInt('' + element.innerHTML) ) ){
                    element.innerHTML = localStorage.getItem( addNameLocalStorageKey( parseInt('' + element.innerHTML) ));
                }
            }
        })
    }

/*функция добавления классов в ячейки*/
    function addClassTd(arrTD, className1, className2) {
        arrTD.forEach(function(el) {
            if ( parseInt(el.innerHTML) ) {
                el.className = className2
            } else {
                el.className = className1
            }
        })
    }

/*функция получения номера дня недели от 0(пн) до 6(вс)(по стандарту 0(вс) до 6(сб))*/
    function getNumDay(date) {
        let day = date.getDay();
        if (day === 0) {
            day = 7; //если вс = 0 - по стандарту, приравниваем к 7, возвращаем =6!
        }
        return day - 1; // если пн = 1 - по стандарту, становиться 0 по функции
    }

/*функция получения названия месяца*/
    function addNameMonth(month) {
        let nameMonth = '';
        let arrNameMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        arrNameMonth.forEach( function(item, i) {
            if (month === i) {
                nameMonth += item;
            }
        });
        return nameMonth;
    }

/*конструктор элементов помещаемых на страницу*/
    function CreateElement (parentElId, nameElem, classNameEl, idNameEl) {
        let newElement = document.createElement(nameElem);
        newElement.className = classNameEl;
        newElement.id = idNameEl;
        return document.querySelector(parentElId).appendChild(newElement);
    }

// добавить коментарий
    function addNewDescriptionDate() {
        if( !allowAddTasks ) return;
        let daysOfThisMonth = document.querySelectorAll('.days_Of_This_Month');
        let target = event.target;

        [].forEach.call( daysOfThisMonth, function(clickDate) {
            if (target === clickDate) {
                return createNewDescriptionDate(clickDate);
            }
        })
    }

    // создать коментарий
    function createNewDescriptionDate(element) {

        let boxDescription = document.createElement('div');
        boxDescription.className = 'box_description';

        let newDescription = document.createElement('div');
        newDescription.className = 'new_description';

        let deleteButton = document.createElement('div');
        deleteButton.className = 'delete_description';
        deleteButton.innerHTML = "Х";

        let userDescription = prompt('Отметить день', 'коментарий к дате');

        newDescription.innerHTML = '<p>' + userDescription + '</p>';

        if ( userDescription ) {
            event.target.appendChild(boxDescription);
            boxDescription.appendChild(newDescription);
            boxDescription.appendChild(deleteButton);
        }

        localStorage.setItem( addNameLocalStorageKey( parseInt('' + element.innerHTML) ), element.innerHTML );
    }

    // удаление коментария
    function deleteDescription() {
        if( !allowRemoveTasks ) return;
        let delDescriptionButton = document.getElementsByClassName('delete_description');
        let target = event.target;
        [].forEach.call(delDescriptionButton, function(clickDate) {
            if (target === clickDate) {
                if( confirm('Вы уверены что хотите удали коментарий?') ) {

                    localStorage.removeItem( addNameLocalStorageKey( parseInt(clickDate.parentNode.parentNode.innerHTML ) ) );
                    clickDate.closest('.box_description').remove();
                 }
            }
        });
    }

    function testCheckBox () {
        if ( !showMonth ){
            document.querySelector( el + ' h2').style.display = 'none';
        }
        if ( !allowChangeMonth){
            butPrev.style.display = 'none';
            butNext.style.display = 'none';
        }
        if( !allowChangeMonth && !showMonth ) {
            document.querySelector( el + ' thead').style.display = 'none';
        }
    }
}