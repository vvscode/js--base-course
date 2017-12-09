function ShowCalender ( {el, allowChangeMonth, allowAddTasks, allowRemoveTasks, showMonth, date } ) {

 // если введена дата, то введенное значение, если нет - текущая дата
    if( date === ''){
        this.date = new Date()
    } else {
        this.date = new Date(date)
    }

    let year = this.date.getFullYear();
    let month = this.date.getMonth();
    let numder = getRandomInt(1, 10e10); // рандомное число для создание классов и id для текущего календаря

/*создаем и вставляем оболочку для календаря*/
    let calender = CreateElement ( el, 'div', 'calendar', 'calendar' + numder );

/*создаем и вставляем кнопки управления*/
    let butPrev = CreateElement ( el, 'button', 'prev__button', 'prev_button' + numder );
    let butNext = CreateElement ( el, 'button', 'next__button', 'next_button' + numder );

    createCalendar("calendar" + numder, year, month);
    testLocalStorageKey();

    function testLocalStorageKey() {
        for (let key in localStorage){
            if( key === year + ", " + month){
               return document.querySelector(el + ' table').innerHTML = localStorage.getItem(key);
            }
        }
    }
    


    showMonthInCalender (showMonth);

    function showMonthInCalender (showMonth) {
        if ( !showMonth ){
            document.querySelector( el + ' h2').style.display = 'none';
        }
    }

    if ( !allowChangeMonth){
        butPrev.style.display = 'none';
        butNext.style.display = 'none';
    }

    if( !allowChangeMonth && !showMonth ) {
        document.querySelector( el + ' thead').style.display = 'none';
    }

    butPrev.innerHTML = '<';
    butNext.innerHTML = '>';

/*обрабботчики для кнопок управления*/

    butPrev.addEventListener('click', function() {
        createCalendar("calendar" + numder, year, --month);
        showMonthInCalender (showMonth);
        testLocalStorageKey();
    });

    butNext.addEventListener('click', function() {
        createCalendar("calendar" + numder, year, ++month);
        showMonthInCalender (showMonth);
        testLocalStorageKey();
    });

    calender.addEventListener('dblclick', addNewDescriptionDate, false); // при двойном клике - записать комент
    calender.addEventListener('click', deleteDescription, false); // удалить комент

    /*создание календаря*/
    function createCalendar( el, year, month) {
        let daysOfLastMonth = '', daysOfThisMonth = '', daysNextMonth = '';
        let elem = document.getElementById(el);

        let dataInCalenderNow = new Date(year, month);
        const THISMONTH = dataInCalenderNow.getMonth();

        /*шапка календаря*/
        let calenderHead = "<thead><tr><td colspan='7'><h2>" + addNameMonth(THISMONTH) + ' ' + dataInCalenderNow.getFullYear() + "</h2></td></tr></thead>";

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
        addClassTd ( allTd, 'days_Of_Last_Month', 'days_Of_This_Month', 'days_name' );
    }

    /*функция получения номера дня недели от 0(пн) до 6(вс)*/
    /* по стандарту 0(вс) до 6(сб)*/
    function getNumDay(date) {
        let day = date.getDay();
        if (day === 0) {
            day = 7; //если вс = 0 - по стандарту, приравниваем к 7, возвращаем =6!
        }
        return day - 1; // если пн = 1 - по стандарту, становиться 0 по функции
    }

    /*функция добавления классов в ячейки*/
    function addClassTd(arrTD, className1, className2, className3, ) {
        arrTD.forEach(function(a) {
            if (a.innerHTML.valueOf() > 0 && a.innerHTML.valueOf() < 32) {
                a.className = className2
            } else if (isNaN(a.innerHTML.valueOf())) {
                a.className = className3
            } else {
                a.className = className1
            }
        })
    }

    /*функция получения названия месяца*/
    function addNameMonth(month) {
        let nameMonth = '';
        let arrNameMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        arrNameMonth.forEach(function(item, i) {
            if (month === i) {
                nameMonth += item;
            }
        });
        return nameMonth;
    }

    /*конструктор элементов помещаемых на страницу*/
    function CreateElement (el, nameElem, classNameEl, idNameEl) {
        let element = document.createElement(nameElem);
        element.className = classNameEl;
        element.id = idNameEl;
        return document.querySelector(el).appendChild(element);
    }

    // добавить коментарий
    function addNewDescriptionDate() {

        if( !allowAddTasks ) return;

        let daysOfThisMonth = document.querySelectorAll('.days_Of_This_Month');
        let nameMonth = document.querySelector('#calendar' + numder + 'table h2');
        let target = event.target;

        [].forEach.call( daysOfThisMonth, function(clickDate) {
            if (target === clickDate) {
                createNewDescriptionDate(clickDate, nameMonth);
            }
        })
    }

    // создать коментарий
    function createNewDescriptionDate() {

        let boxDescription = document.createElement('div');
        boxDescription.className = 'box_description';

        let newDescription = document.createElement('div');
        newDescription.className = 'new_description';

        let deleteButton = document.createElement('div');
        deleteButton.className = 'delete_description';
        deleteButton.innerHTML = "Х";

        let userDescription = prompt('Отметить день', 'коментарий к дате');

        newDescription.innerHTML = '<p>' + userDescription + '</p>';

        if (userDescription) {
            event.target.appendChild(boxDescription);
            boxDescription.appendChild(newDescription);
            boxDescription.appendChild(deleteButton);
        }

        var kkkkkk = year + ', ' + month;
        localStorage.setItem( kkkkkk, document.querySelector(el + ' table').innerHTML )
    }

    // удаление коментария
    function deleteDescription() {
        if( !allowRemoveTasks ) return;

        let delDescriptionButton = document.getElementsByClassName('delete_description');
        let target = event.target;

        [].forEach.call(delDescriptionButton, function(clickDate) {
            if (target === clickDate) {
                if( confirm('Вы уверены что хотите удали коментарий?') ) {
                    clickDate.closest('.box_description').remove();
                    localStorage.removeItem(year + ', ' + month);
                }
            }
        });
    }

    // получить рандомное число для прибавление его к id и class
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}