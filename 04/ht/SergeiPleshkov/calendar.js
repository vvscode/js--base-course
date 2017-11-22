var Calendar = (function(storageDB) {
    var storage = Symbol('storage');
    var askNote = Symbol('askNote');
    var monthNotes = Symbol('monthNotes');
    var init = Symbol('init');
    var addNote = Symbol('addNote');
    var deleteNote = Symbol('deleteNote');
    var getRemoveButton = Symbol('getRemoveButton');
    var confirmDeletion = Symbol('confirmDeletion');
    var curDate = Symbol('curDate');


    function Calendar(options) {
        this.options = options;
        this.element = document.getElementById(this.options.el);
        this[curDate] = new Date(this.options.date[0], this.options.date[1] - 1);
        this[storage] = storageDB;
        this[init]();

        if (this.options.allowAdd) {
            this.element.addEventListener('dblclick', (event) => {
                if (event.target.hasAttribute('data-day')) {
                    this[askNote]()
                        .then((note) => {
                            var day = +event.target.getAttribute('data-day');
                            this[addNote](day, note);
                            this[init]();
                        });
                }
            });
        }

        this.element.addEventListener('click', (event) => {
            if (event.target.hasAttribute('data-btnDeleteId')) {
                this[confirmDeletion]()
                    .then(() => {
                        var args = event.target.getAttribute('data-btnDeleteId').split('/');
                        this[deleteNote](+args[0], +args[1]);
                        this[init]();
                    });
            }

            if (event.target.hasAttribute('data-btnNavId')) {
                var nextMonth = event.target.getAttribute('data-btnNavId') === 'next'
                    ? this[curDate].getMonth() + 1 : this[curDate].getMonth() - 1;
                this[curDate] = new Date(this[curDate].getFullYear(), nextMonth);

                this[init]();
            }
        });
    }

    Calendar.prototype[init] = function() {
        this[storage].getData(`${this.options.el}/${this[curDate].getFullYear()}/${this[curDate].getMonth()}`)
            .then((data) => {
                this[monthNotes] = data || [];
                this.render();
            });
    };

    Calendar.prototype.render = function() {
        this.element.innerHTML = '';
        var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        var tempDate = new Date(this[curDate].getTime());
        var lastDayOfWeek = 7;

        var table = `<table class="allScreen"><tr>`;
        table += `<td><input type="button" value="<" data-btnNavId="previous" ${!this.options.allowChangeMonth ? 'class="invisible"' : ''} /></td>`;
        table += `<td colspan="5"><div ${!this.options.showMonth ? 'class="invisible"' : ''}>${months[tempDate.getMonth()]} ${tempDate.getFullYear()}</div></td>`;
        table += `<td><input type="button" value=">" data-btnNavId="next" ${!this.options.allowChangeMonth ? 'class="invisible"' : ''} /></td></tr>`;
        table += '<tr><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr><tr>';

        for (var i = 1; i < (tempDate.getDay() || lastDayOfWeek); i++) {
            table += '<td></td>';
        }

        while (tempDate.getMonth() === this[curDate].getMonth()) {
            table += `<td data-day="${tempDate.getDate()}">${tempDate.getDate()}`;
            var dayWithNotes = this[monthNotes].find((el) => el.day === tempDate.getDate());
            if (dayWithNotes) {
                table += '<div class="notes">';
                for (var i = 0; i < dayWithNotes.notes.length; i++) {
                    table += `<div>${dayWithNotes.notes[i]}${this[getRemoveButton](tempDate.getDate(), i)}</div>`;
                }
                table += '</div>';
            }
            table += '</td>';

            if (tempDate.getDay() === 0) {
                table += '</tr><tr>';
            }

            tempDate.setDate(tempDate.getDate() + 1);
        }

        table += '</tr></table>';

        this.element.innerHTML = table;
    };

    Calendar.prototype[askNote] = function() {
        return new Promise((resolve, reject) => {
            var note = prompt('Введите вашу заметку');
            if (!note) {
                return reject();
            }

            return resolve(note);
        });
    };

    Calendar.prototype[addNote] = function(day, note) {
        this[monthNotes] = this[monthNotes] || [];
        var dayWithNotes = this[monthNotes].find((el) => el.day === day);

        if (dayWithNotes) {
            dayWithNotes.notes.push(note);
        } else {
            this[monthNotes].push({day: day, notes: [note]});
        }

        return this[storage]
            .setData(`${this.options.el}/${this[curDate].getFullYear()}/${this[curDate].getMonth()}`, this[monthNotes]);
    };

    Calendar.prototype[deleteNote] = function(day, noteNumber) {
        var dayWithNotes = this[monthNotes].find((el) => el.day === day);
        dayWithNotes.notes.splice(noteNumber, 1);

        return this[storage].setData(`${this.options.el}/${this[curDate].getFullYear()}/${this[curDate].getMonth()}`
            , this[monthNotes]);
    };

    Calendar.prototype[getRemoveButton] = function(day, noteNumber) {
        var noteId = `${day}/${noteNumber}`;
        var visibility = !this.options.allowRemove ? 'class="invisible"' : '';
        var btn = `<input type="button" value="x" data-btnDeleteId="${noteId}" ${visibility}>`;

        return btn;
    };

    Calendar.prototype[confirmDeletion] = function() {
        return new Promise((resolve, reject) => {
            if (confirm('Вы подтверждаете удаление заметки?')) {
                return resolve();
            }

            return reject();
        });
    };

    return Calendar;
})(localStorageDB);
