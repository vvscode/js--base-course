var CreatePage = (function(Calendar) {
    return function CreatePage(element) {
        this.calendarConfig = {};

        this.render = function() {
            prepareEnvironment();
            initDefaultCalendarConfig(".js-content-demoCalendar");
            drawCreatePageChangeSet();
            renderConfigForm();            
            initFormObserver();
        }

        function drawCreatePageChangeSet() {
            renderCalendar();
            renderScriptBlock();
        }

        function prepareEnvironment() {
            var template = [
                '<div class="css-createPage-container">',
                '<div class="js-content-configForm css-createPage-configForm">',
                '</div>',
                '<div class="css-createPage-widgets">',
                '<div class="js-content-generatedScript css-createPage-generatedScript">',
                '</div>',
                '<div id="demonstrationCalendar" class="js-content-demoCalendar css-createPage-demoCalendar">',
                '</div>',
                '</div>',
                '</div>'
            ].join("");
            element.innerHTML = template;
        }

        function initDefaultCalendarConfig(selector) {
            var calendarEl = element.querySelector(selector);
            this.calendarConfig = {
                element: calendarEl,
                date: { 
                    month: new Date().getMonth(), 
                    year: new Date().getFullYear() 
                },
                showCaption: true,
                allowNavigation: true,
                allowAddNotes: true,
                allowRemoveNotes: true,
                allowDisplayCurrentDay: true,
                userClassName: ""
            }
        }

        function renderCalendar() {
            var calendar = new Calendar(this.calendarConfig);
            calendar.drawCalendar();
        }

        function renderConfigForm() {
            var template = [
                '<form name="calendarConfigForm">',
                    '<fieldset>',
                        '<legend>Configure Calendar</legend>',
                        `<input type="checkbox" name="showCaption" ${this.calendarConfig.showCaption ? 'checked' : ''}>show caption<br>`,
                        `<input type="checkbox" name="allowNavigation" ${this.calendarConfig.allowNavigation ? 'checked' : ''}>allow navigation<br>`,
                        `<input type="checkbox" name="allowAddNotes" ${this.calendarConfig.allowAddNotes ? 'checked' : ''}>allow add<br>`,
                        `<input type="checkbox" name="allowRemoveNotes" ${this.calendarConfig.allowRemoveNotes ? 'checked' : ''}>allow remove<br>`,
                        `<input type="checkbox" name="allowDisplayCurrentDay" ${this.calendarConfig.allowDisplayCurrentDay ? 'checked' : ''}>display current day<br>`,                                                
                        `Year <input type="text" name="year" value="${this.calendarConfig.date["year"]}">`,
                        `Month <input type="text" name="month" value="${this.calendarConfig.date["month"] + 1}">`,    
                        `Class name <input type="text" name="userClassName" value="${this.calendarConfig.userClassName}">`,           
                    '</fieldset>',
                '</form>'
            ].join("");
            element.querySelector(".js-content-configForm").innerHTML = template;
        }

        function renderScriptBlock() {
            var template = 
                `<pre>
                &lt;script src="https://rawgit.com/shuspes/js--base-course/04/04/ht/shuspes/storage.js"&gt;&lt;/script&gt;
                &lt;script src="https://rawgit.com/shuspes/js--base-course/04/04/ht/shuspes/calendar.js"&gt;&lt;/script&gt;
                &lt;link rel="stylesheet" href="https://rawgit.com/shuspes/js--base-course/04/04/ht/shuspes/calendar.css"&gt;&lt;/link&gt;
                &lt;script&gt;
                    (function() {
                        var id = 'calendar' +  Math.round(Math.random() * 1000);
                        document.write('&lt;div id="' + id + '"&gt;&lt;/div&gt;');
                        var element = document.querySelector("#" + id);
                        var calendar = new Calendar({
                            element: element,
                            showCaption: ${this.calendarConfig.showCaption},
                            allowAddNotes: ${this.calendarConfig.allowAddNotes},
                            allowRemoveNotes: ${this.calendarConfig.allowRemoveNotes},
                            allowNavigation: ${this.calendarConfig.allowNavigation},
                            allowDisplayCurrentDay: ${this.calendarConfig.allowDisplayCurrentDay},
                            date: {month: ${this.calendarConfig.date["month"]}, year: ${this.calendarConfig.date["year"]}},
                            userClassName: "${this.calendarConfig.userClassName}"
                        });
                        calendar.drawCalendar();                         
                    })();
                &lt;/script&gt;
                </pre>`
            element.querySelector(".js-content-generatedScript").innerHTML = template;            
        }

        function initFormObserver() {
            document.forms['calendarConfigForm'].addEventListener("change", changedConfigForm.bind(this));
        }

        function changedConfigForm() {
            var newCalendarConfig = createCalendarConfigByForm();
            this.calendarConfig = newCalendarConfig;
            drawCreatePageChangeSet();
        }

        function createCalendarConfigByForm() {
            var calendarConfigForm = document.forms['calendarConfigForm'];
            return {
                element: this.calendarConfig.element,
                date: { 
                    month: `${calendarConfigForm.month.value - 1}`, 
                    year: `${calendarConfigForm.year.value}`
                },
                showCaption: calendarConfigForm.showCaption.checked,
                allowNavigation: calendarConfigForm.allowNavigation.checked,
                allowAddNotes: calendarConfigForm.allowAddNotes.checked,
                allowRemoveNotes: calendarConfigForm.allowRemoveNotes.checked,
                allowDisplayCurrentDay: calendarConfigForm.allowDisplayCurrentDay.checked,
                userClassName: calendarConfigForm.userClassName.value.trim()
            }
        }
    }
})(Calendar);