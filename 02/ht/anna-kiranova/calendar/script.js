/**
 * Реализовать фукнцию `drawCalendar` ,
 * которая принимает три аргумента - год, месяц, htmlElement
 * и выводит в этот элемент календарь на месяц (дни недели начинаются с понедельника ).
 * @param {number} year
 * @param {number} month - номер месяца, начиная с 1
 * @param {external:HTMLElement} htmlEl
 */
function drawCalendar(year, month, htmlEl) {
    // строка дней недели
    var table = '<table><tr><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr>';
    var d = new Date(year, month - 1);

    // до первого дня, если не понедельник
    if (d.getDay() != 1) {
        table += '<tr>';
        var last = d.getDay() || 7;
        for (var i = 1; i < last; i++) {
            table += '<td></td>';
        }
    }

    // с первого и до последнего дня месяца
    while (d.getMonth() == month - 1) {
        if (d.getDay() == 1) {
            table += '<tr>'; // открываем строку до понедельника
        }
        table += '<td>' + d.getDate() + '</td>';
        if (d.getDay() == 0) {
            table += '</tr>'; // закрываем строку после воскресенья
        }
        d.setDate(d.getDate() + 1);
    }

    // если понедельник, значит после воскресенья строка закрыта
    if (d.getDay() != 1) {
        table += '</tr>';
    }

    htmlEl.innerHTML = table + '</table>';
}
/** int
 * @param  {} el
 * @returns lkjl
 */
function drawInteractiveCalendar(el) {
    // создаем 2 div элемента: 1 - div c кнопочками, отображением названия месяца/года, 2 - div отображает сам календарь
    el.innerHTML = '<div><button class="left">&lt;</button><span class="month">&nbsp;</span>&nbsp;/&nbsp;<span class="year"></span><button class="right">&gt;</button></div>' +
    '<div class="cal"></div>' +
    '<div class="note"></div>';
    var d = new Date();
    // div для таблицы календаря
    var cal = el.querySelector('div.cal');
    // span для отображения месяца
    var month = el.querySelector('span.month');
    // span для отображения года
    var year = el.querySelector('span.year');
    // массив отображаемых названий месяцев
    var mnames = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
    // div для заметки по выбранному дню
    var note = el.querySelector('div.note');
    // получаем значение из localStorage
    note.innerHTML = localStorage.getItem('calendar') || '';

    // отображаем текущий месяц и год
    month.innerText = mnames[d.getMonth()];
    year.innerText = d.getFullYear();
    // отрисовываем текущий месяц
    drawCalendar(d.getFullYear(), d.getMonth() + 1, cal);
    
    
    // по клику на левую кнопку
    el.querySelector('button.left').onclick = function() {
        // переключаемся на предыдущий месяц
        d.setMonth(d.getMonth() - 1);
        // отображаем название месяца
        month.innerText = mnames[d.getMonth()];
        // отображаем год
        year.innerText = d.getFullYear();
        // отображаем календарь для измененного месяца 
        drawCalendar(d.getFullYear(), d.getMonth() + 1, cal);
    };
    // по клику на правую кнопку
    el.querySelector('button.right').onclick = function() {
        d.setMonth(d.getMonth() + 1);
        month.innerText = mnames[d.getMonth()];
        year.innerText = d.getFullYear();
        drawCalendar(d.getFullYear(), d.getMonth() + 1, cal);
    };

    // обрабатываем нажатие мышью по всему календарю
    cal.addEventListener('click', function(e) {
        // проверяем что событие пришло от правильной ячейки (td)
        if (e.target instanceof HTMLTableCellElement) {
            // получаем текст значения из ячейки
            var day = +e.target.innerText;
            // проверяем, что ячейка содержит числовое значение
            if (day) {
                
                var p = document.createElement('p');
                var noteUser = prompt('Что интересного произошло в выбранный день?');
                p.innerText = 'выбран день ' + day + ', месяц ' + mnames[d.getMonth()] + ' : ' + noteUser;
                note.appendChild(p);
                localStorage.setItem('calendar', note.innerHTML);
                //console.log(localStorage.getItem('calendar') || '');
                //note.innerHTML = localStorage.getItem('calendar') || '';
            }
        }
       // console.log(e.target, e.target instanceof HTMLTableCellElement, e.target.innerText);})
    });
}
