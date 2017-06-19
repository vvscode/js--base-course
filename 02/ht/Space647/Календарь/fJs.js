var id;
var showControls;
var allowAddEvents;
var allRemoveEvents;
var t = new Date();
var mont = t.getMonth();
var yer = t.getFullYear();
var cal = document.querySelector(`${id}`);
var div;
var div2;
function FunctiontConfig() {
    id = text.value;
    showControls = check1.checked;
    allowAddEvents = check2.checked;
    allRemoveEvents = check3.checked;
    div = document.createElement('div');
    div.className = id;
    document.body.appendChild(div);
    div2 = document.createElement('div');
    div2.id = id + 1;
    document.body.appendChild(div2);
    document.querySelector('textarea').value += FunctiontConfig;
    createButton(showControls);
    createCalendar(id, yer, mont);
}
start.addEventListener('click', FunctiontConfig);
