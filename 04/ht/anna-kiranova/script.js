'use strict';

// подписка на событие изменения url
window.onhashchange = function() {
    showPage(window.location.hash || '#calendar');
}

// при открытии окна показываем выбранную или дефолтную страницу
showPage(window.location.hash || '#calendar');




// выбрать и отобразить страницу в зависимости от хэша
function showPage(hash) {
    if (hash == '#calendar') {
        showCalendarPage();
    } else if (hash == '#create') {
        showCreatePage();
    } else if (hash == '#author') {
        showAuthorPage();
    }
}

// показывает страницу календаря
function showCalendarPage() {
    // очистим страницу
    var content = document.getElementById('content');
    content.innerHTML = '';
    
    // создадим элемент
    var cal = document.createElement('div');
    cal.id = 'calendar';
    content.appendChild(cal);

    // создадим календарь
    var c = new Calendar({
        el: '#calendar',
        changeMonth: true,
        addTasks: true,
        removeTasks: true,
        showMonth: true,
    });
}

// показывает страницу создания
function showCreatePage() {
    var content = document.getElementById('content');

    var createContent = document.getElementById('createContent');
    // копирование подготовленной разметки страницы создания
    content.innerHTML = createContent.innerHTML;

    // объект с параметрами для создания календаря
    var params = {
        el: '#calSettings',
        changeMonth: true,
        addTasks: true,
        removeTasks: true,
        showMonth: true,
    };

    // обработчики onchange для всех чекбоксов
    content.querySelector('#changeMonth').onchange = function(e) {
        params.changeMonth = e.target.checked;
        new Calendar(params);
        showCode();
    };
    content.querySelector('#addTasks').onchange = function(e) {
        params.addTasks = e.target.checked;
        new Calendar(params);
        showCode();
    }
    content.querySelector('#removeTasks').onchange = function(e) {
        params.removeTasks = e.target.checked;
        new Calendar(params);
        showCode();
    }
    content.querySelector('#showMonth').onchange = function(e) {
        params.showMonth = e.target.checked;
        new Calendar(params);
        showCode();
    }

    new Calendar(params);
    showCode();

    function showCode() {
        var code = document.getElementById('code');
        code.innerText = 'var cal = new Calendar({\n' +
            '    el: "' + params.el + '",\n' +
            '    changeMonth: ' + params.changeMonth + ',\n' +
            '    addTasks: ' + params.addTasks + ',\n' +
            '    removeTasks: ' + params.removeTasks + ',\n' +
            '    showMonth: ' + params.showMonth + ',\n' + 
            '});'
    }
}

// показывает страницу об авторе
function showAuthorPage() {
    var content = document.getElementById('content');
    var about = document.getElementById('about');
    content.innerHTML = about.innerHTML;
}

/**
 * Конструктор календаря
 * @param {object} opts объект настроек календаря
 */
function Calendar(opts) {
    // найдем элемент
    var htmlEl = document.querySelector(opts.el);
    // строка с кнопками и месяцем / годом
    var table = '<table><thead><tr><td class="left-button"><button class="left">&lt;</button></td>' +
    '<td class="month" colspan="3"></td><td class="year" colspan="2"></td><td class="right-button">' +
    '<button class="right">&gt;</button></td></tr>';
    // строка дней недели 
    table += '<tr><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></tr></thead>';
    // место для дней месяца
    table += '<tbody></tbody>';
    // создание пустой таблицы
    htmlEl.innerHTML = table + '</table>';
    
    var tbody = htmlEl.querySelector('tbody');

    var cal = new Date();
    cal.setDate(1);
    // место месяца в td
    var month = htmlEl.querySelector('td.month');
    // место года в td
    var year = htmlEl.querySelector('td.year');
    // массив отображаемых названий месяцев
    var mnames = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    
    // загрузка созданных ранее заметок из localStorage
    var storage;
    var storageJSON = localStorage.getItem('calendar' + opts.el);
    if (storageJSON) {
        storage = JSON.parse(storageJSON);
    } else {
        storage = {};
    }

    // отображаем дни текущего выбранного месяца
    drawDays();
    
    
    function drawDays() {
        // скопируем текущую отображаемую дату (обозначает месяц)
        var d = new Date(cal);
        // сбрасываем дату на первое число месяца
        d.setDate(1);
        if (opts.showMonth) {
            // отображаем текущий месяц и год
            month.innerText = mnames[d.getMonth()];
            year.innerText = d.getFullYear();
        }

        // содержимое таблицы
        var table = '';

        // до первого дня, если не понедельник
        if (d.getDay() != 1) {
            table += '<tr>';
            var last = d.getDay() || 7;
            for (var i = 1; i < last; i++) {
                table += '<td></td>';
            }
        }
        // пока не вышли из текущего месяца
        while (d.getMonth() == cal.getMonth()) {
            if (d.getDay() == 1) {
                table += '<tr>'; // открываем строку до понедельника
            }
            table += '<td day="' + d.getDate() + '">' + d.getDate() + '</td>';
            if (d.getDay() == 0) {
                table += '</tr>'; // закрываем строку после воскресенья
            }
            d.setDate(d.getDate() + 1);
        }

        if (d.getDay() != 1) {
            while(d.getDay() != 1) {
                table += '<td class = "nmonth">' + d.getDate() + '</td>';
                d.setDate(d.getDate() + 1);
            }
        }

        // если понедельник, значит после воскресенья строка закрыта
        if (d.getDay() != 1) {
            table += '</tr>';
        }
        // отобразим таблицу дней
        tbody.innerHTML = table;
        // отображение сохраненных ранее заметок в таблице
        for (var time in storage) {
            // создание даты (день) по миллисекундам
            var today  = new Date(+time);
            // если день в нашем отображаемом месяце
            if (today.getFullYear() == cal.getFullYear() && today.getMonth() == cal.getMonth()) {
                // заметки дня надо отобразить в нужный td
                var td = tbody.querySelector('td[day="' + today.getDate() +'"]');
                var notes = td.querySelector('div');
                if (!notes) {
                    notes = document.createElement('div');
                    td.appendChild(notes);
                }
                // получим список заметок текущего дня
                var notesList = storage[time];
                for (var i = 0; i < notesList.length; i++) {
                    var p = createNote(notesList[i], time, i);
                    notes.appendChild(p);
                }
            }
        }
    }

    if (opts.changeMonth) {
        // по клику на левую кнопку
        htmlEl.querySelector('button.left').onclick = function() {
            // переключаемся на предыдущий месяц
            cal.setMonth(cal.getMonth() - 1);
            // отображаем календарь для измененного месяца 
            drawDays();
        };
        // по клику на правую кнопку
        htmlEl.querySelector('button.right').onclick = function() {
            cal.setMonth(cal.getMonth() + 1);
            drawDays();
        }; 
    } else {
        // иначе спрячем кнопки
        htmlEl.querySelector('button.left').style.display = 'none';
        htmlEl.querySelector('button.right').style.display = 'none';
    }

    // обрабатываем двойное нажатие мышью по всему календарю
    tbody.addEventListener('dblclick', function(e) {
        if (!opts.addTasks) {
            return;
        }
        // получаем текст значения из ячейки
        var day = +e.target.getAttribute("day");
        // проверяем, что ячейка содержит числовое значение
        if (day) {
            var notes = e.target.querySelector('div');
            if (!notes) {
                notes = document.createElement('div');
                e.target.appendChild(notes);
            }
            
            var noteUser = prompt('Что запланировано на этот день?');
            if (!noteUser) {
                return;
            }
            // составим дату текущего дня
            var today = new Date(cal.getFullYear(), cal.getMonth(), day);

            // находим или создаем список заметок в этот день
            var notesList = storage[today.getTime()];
            if (!notesList) {
                notesList = [];
                storage[today.getTime()] = notesList;
            }
            // добавляем заметку в конец списка
            notesList.push(noteUser);
            var p = createNote(noteUser, today.getTime(), notesList.length - 1);
            notes.appendChild(p);

            localStorage.setItem('calendar' + opts.el, JSON.stringify(storage));
        }
    });

    function createNote(text, time, index) {
        var p = document.createElement('p');
        p.innerText = text;
        if (opts.removeTasks) {
            var a = document.createElement('a');
            a.innerText = 'x';
            a.href = '#';
            a.className = 'del';
            a.onclick = function() {
                if (confirm('Удалить заметку?')) {
                    p.parentNode.removeChild(p);
                    // нашли все заметки за нужный день
                    var notesListDel = storage[time];
                    // удаляем нужную заметку
                    notesListDel.splice(index, 1);
                    // обновили localStorage
                    localStorage.setItem('calendar' + opts.el, JSON.stringify(storage));
                }
                return false;
            };
            p.appendChild(a);
        }
        return p;
    }
}
