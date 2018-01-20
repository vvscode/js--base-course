(function (window, Calendar) {
        
    function UserSettings() {
        this.fillHtml();
        let options = {
            htmlEl : document.getElementsByClassName('demoCalendar')[0],
            showMonth : true,
            allowChange : true,
            allowAddNotes : true,
            allowRemoveNotes: true,
            startMonth : 10,
            startYear : 2017,
        };
        fillCode(options);
        new Calendar(options);
        document.forms[0].addEventListener('change', function (ev) {
            userSettingsForm = document.forms[0];
            var userSettingsForm = document.forms[0];
            options.showMonth = userSettingsForm.showMonth.checked;
            options.allowChange = userSettingsForm.allowChange.checked;
            options.allowAddNotes = userSettingsForm.allowAdd.checked;
            options.allowRemoveNotes = userSettingsForm.allowRemove.checked;
            if (userSettingsForm.startMonth.value > 0 && userSettingsForm.startMonth.value <= 12) options.startMonth = +userSettingsForm.startMonth.value - 1;
            if (userSettingsForm.startYear.value > 1970) options.startYear = userSettingsForm.startYear.value;
            fillCode(options);
            document.getElementsByClassName('innerDiv')[0].remove();
            new Calendar(options);
        });

    }
    //формирование разметки
    UserSettings.prototype.fillHtml = function () {
        let str = '<form class="userSettings"><fieldset><legend>Configure Calendar</legend>';
        str += '<label> <input type="checkbox" checked name="allowChange" /> allow change month</label><br />';
        str += '<label > <input type="checkbox" checked name="allowAdd" /> allow add task</label > <br />';
        str += '<label><input type="checkbox" checked name="allowRemove" /> allow remove task</label><br /><label>';
        str += '<input type= "checkbox" checked name= "showMonth" /> show month/ year</label > <br />';
        str += '<input type="text" value="11" name="startMonth"></input>';
        str += '<input type="text" value="2017" name="startYear"></input></fieldset></form>';
        str += '<div class="codeCalendar"></div><div class="demoCalendar"></div>';
        document.querySelector('div').innerHTML = str;
    };
    /**
 * Функция формирующая код
 * @param {*} options объект с выбранными настройками
 */
    function fillCode (options) {
        var userSettingsForm = document.forms[0];
        let srt = '&lt; script src="https://github.com/NatallyaSeverina/js--base-course/blob/04ht/04/ht/SeverinaNatallya/Calendar.js"&gt;&lt;/script&gt;';
        srt += '&ltscript&gt;';
        srt +='(function(){';
        srt +='var id = "calendar" + Math.random();';
        srt +='divElem = document.createElement(div);';
        srt +='divElem.id = id;';
        srt +='let optionCalendar = {};';
        srt +='optionCalendar.htmlEl = divElem;';
        srt +='optionCalendar.showMonth =' + options.showMonth + ';';
        srt +='optionCalendar.allowChange =' + options.allowChange + ';';
        srt +='optionCalendar.allowAddNotes =' + options.allowAddNotes + ';';
        srt += 'optionCalendar.allowRemoveNotes =' + options.allowRemoveNotes + ';';
        srt +='optionCalendar.startMonth =' + options.startMonth + ';';
        srt +='optionCalendar.startYear =' + options.startYear + ';';
        srt += 'new window.Calendar(optionCalendar);';
        srt += '})();';
        srt +=' &lt;/script&gt;'
        document.getElementsByClassName('codeCalendar')[0].innerHTML = srt;
   };
    window.UserSettings = UserSettings;
})(window, window.Calendar)
