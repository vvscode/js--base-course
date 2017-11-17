/*
Используя функцию drawCalendar из прошлого урока
создать функцию drawInteractiveCalendar(el)
Которая выводит календарь, в шапке которого отображается
[<] месяц / год [>]
При клике по кнопкам [<] / [>] нужно реализовать листание календаря
Добавть на страницу index.html вызов календаря
*/
var arr31days = [0, 2, 4, 6, 7, 9, 11];
var arr30days = [3, 5, 8, 10];
var februaryNumber = 1;
var leapYearFebDays = 29;
var usualYearFebDay = 28;
var daysInWeek = 7;


function Calendar(options) {
    var drawService = new DrawService();
    var calendarDiv = document.getElementById(options.calendarDivId);
    drawService.drawInteractiveCalendar(calendarDiv, options);
}

function createDemoCalenadar(){
    var demoCalendar = document.querySelector('#calendar3');
    demoCalendar.style.visibility = 'visible';

    var options = {
        calendarDivId: 'calendar3',
        showMonth: true,
        allowChangeMonth: true,
        allowAdd: true,
        allowRemove: true,
        date: new Date(document.getElementById("yearSelectId").value ,
            document.getElementById("monthSelectId").value -1)
    }
    new Calendar(options);
    addListenersToDivWithOptions(options);

}

function addLinksListners() {
    document.body.addEventListener('click', (ev) => {

        if(!ev.target.matches('a')) {
            return;
        }

        ev.preventDefault();
        let url = ev.target.getAttribute('href');
        window.location.hash = url;
        if(ev.target.text === 'Demo'){
            // hidden all divs
            setStateForAllCalendarDivs('hidden');

            // make demo elements active
            var options = document.body.querySelector('#optionsDivId');
            var demoCalendar = document.querySelector('#calendar3');
            options.className = 'optionDivActive';
            demoCalendar.className = 'demoTableActive';

            createDemoCalenadar();

        }

        if(ev.target.text === 'Calendar'){
            // make active all div
            setStateForAllCalendarDivs('visible');
            var demoCalendar = document.querySelector('#calendar3');
            var optionsDiv = document.querySelector('#optionsDivId');

            // make demo elements inactive
            var options = document.body.querySelector('#optionsDivId');
            var demoCalendar = document.querySelector('#calendar3');
            options.className = 'optionDivInactive';
            demoCalendar.className = 'demoTableInactive';

        }
    });
}

function setStateForAllCalendarDivs(state){
    var coll = document.querySelectorAll("div");
    for (var i = 0, len = coll.length; i < len; i++) {
        if (coll[i].matches(".calendar")) {
            coll[i].style.visibility = state;
        }

    }
}


