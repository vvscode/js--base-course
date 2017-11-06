var previewCalendar;

function drawLayout() {
    if (previewCalendar == null) previewCalendar=new Calendar(1,1,1,1,new Date(),130985);
    else previewCalendar.drawIntCalendar();
    elemSpan=document.createElement("section");
    elemSpan.setAttribute("id","CalScript")
    elemSpan.appendChild(document.getElementById(previewCalendar.calendarID));
    document.body.appendChild(elemSpan);
    drawSettingsBar();
    drawScriptBar();
}



function drawSettingsBar() {
    var elem=document.createElement("div");
    elem.setAttribute('id','settingsBar');
    document.body.insertBefore(elem,document.getElementById(previewCalendar.calendarID).parentNode);
    elem.innerHTML="<fieldset><legend>Configure Calendar</legend></fieldset>";
    var fieldset=document.getElementsByTagName("fieldset")[0];
    fieldset.appendChild(createElement("checkbox","allowChangeMonth","cb_allowPrevNext","allow change month",previewCalendar.allowPrevNext));
    fieldset.innerHTML+="<br/>";
    fieldset.appendChild(createElement("checkbox","allowAddTasks","cb_allowAddTasks","allow add tasks",previewCalendar.allowAddTask));
    fieldset.innerHTML+="<br/>";
    fieldset.appendChild(createElement("checkbox","allowRemoveTasks","cb_allowRemoveTasks","allow remove tasks",previewCalendar.allowRemoveTask));
    fieldset.innerHTML+="<br/>";
    var month=createElement("number","defMonth","defMonth","month");
    month.firstChild.setAttribute("min","1");
    month.firstChild.setAttribute("max","12");
    month.firstChild.setAttribute("value",new Date().getMonth()+1);
    fieldset.appendChild(month);
    var year=createElement("number","defYear","defYear","year");
    year.firstChild.setAttribute("min","0");
    year.firstChild.setAttribute("value",new Date().getFullYear());
    fieldset.appendChild(year);
}


function drawScriptBar()
{
    var divelem=document.createElement("div");
    divelem.setAttribute("id","scriptArea");
    var elem=document.createElement("textarea");
    elem.innerText="hello";

    divelem.appendChild(elem);
    document.getElementById("CalScript").insertBefore(divelem,document.getElementById(previewCalendar.calendarID));
}



function createElement(type,name,id,labelText,checked)
{
    var lb1=document.createElement("label");
    var Cb1=document.createElement("input");
    Cb1.setAttribute('type',type);
    Cb1.setAttribute('name',name);
    Cb1.setAttribute('id',id);
    if (type="checkbox") Cb1.setAttribute("checked",checked);
    lb1.appendChild(Cb1);
    lb1.innerHTML+=labelText;
    return lb1;
}
