var CalendarConfiguration = (function(Calendar) {
    function CalendarConfiguration(el) {
        this.el = document.getElementById(el);
        this.options = {
            el: '#smallCalendar',
            showMonth: true,
            allowAdd: true,
            allowRemove: true,
            allowChangeMonth: true,
            date: [2017, 12],
        };
        this.render();
        document.forms['options'].addEventListener('change', (ev) => {
            this.fillOptionsFromForm();
            var div = document.getElementsByClassName('calendarDemonstration')[0];
            div.innerHTML = this.getScriptText();
            div.innerHTML += '<div id="#smallCalendar" class="calendar"></div>';

            new Calendar(this.options);
        });
    }

    CalendarConfiguration.prototype.render = function() {
        var form = '<div class="formOptions"><form name="options"><fieldset><legend>Configure Calendar</legend>';
        form += `<input type="checkbox" name="showMonth" ${this.options.showMonth ? 'checked' : ''}>show month<br>`;
        form += `<input type="checkbox" name="allowAdd" ${this.options.allowAdd ? 'checked' : ''}>allow add<br>`;
        form += `<input type="checkbox" name="allowRemove" ${this.options.allowRemove ? 'checked' : ''}>allow remove<br>`;
        form += `<input type="checkbox" name="allowChangeMonth" ${this.options.allowChangeMonth ? 'checked' : ''}>allow change month<br>`;
        form += `Year <input type="text" name="year" value="${this.options.date[0]}">`;
        form += `Month <input type="text" name="month" value="${this.options.date[1]}">`;
        form += `</fieldset></form></div><div class="calendarDemonstration">${this.getScriptText()}`;
        form += '<div id="#smallCalendar" class="calendar"></div></div>';

        this.el.innerHTML = form;
        new Calendar(this.options);
    };

    CalendarConfiguration.prototype.getScriptText = function() {
        return `<div class="calendarScript"><pre>
        &lt;script src="localStorage.js"&gt;&lt;/script&gt;
        &lt;script src="calendar.js"&gt;&lt;/script&gt;
        &ltscript&gt;
            (function() {
                var id = 'calendar' +  Math.random();
                document.write('&lt;div id="' + id + '"&gt;&lt;/div&gt;');
                new Calendar({
                    el: id,
                    showMonth: ${this.options.showMonth},
                    allowAdd: ${this.options.allowAdd},
                    allowRemove: ${this.options.allowRemove},
                    allowChangeMonth: ${this.options.allowChangeMonth},
                    date: ${this.options.date ? '[' + [this.options.date[0], this.options.date[1]] + ']' : null}
                })
            })();
        &lt;/script&gt;
        </pre></div>`;
    };

    CalendarConfiguration.prototype.fillOptionsFromForm = function() {
        var $$ = document.forms['options'];
        this.options.showMonth = $$.showMonth.checked;
        this.options.allowAdd = $$.allowAdd.checked;
        this.options.allowRemove = $$.allowRemove.checked;
        this.options.allowChangeMonth = $$.allowChangeMonth.checked;
        this.options.date = $$.year.value && $$.month.value ? [$$.year.value, $$.month.value] : null;
    };

    return CalendarConfiguration;
})(Calendar);
