/**
 * generates key for localStorage
 * to store taksks for single month and speific calendar
 * @param date - object date to get month out of it
 * @param calendarID - calendarID
 * @returns {string} - returnks key in LocalStorage
 */
function genKey(date,calendarID)
{
    return calendarID+"-"+date.getMonth()+"/"+date.getFullYear();
}

//receives list of tasks from storage or DB
/**
 * @param calendarObj - calendar with date to get month tasks
 * for month in calendarObj.defDate
 */
function getData(calendarObj)
{
    var data=JSON.parse(localStorage.getItem(genKey(calendarObj.defDate,calendarObj.calendarID)));
  if (data!=null) calendarObj.monthTasks = data;
  else calendarObj.monthTasks=Array(32).fill("");
};

//sends list of tasks to storage
function setData(calendarObj, date){
localStorage.setItem(genKey(date,calendarObj.calendarID),JSON.stringify(calendarObj.monthTasks));
};


function setState(calendarObj){
    localStorage.setItem(calendarObj.calendarID+"Options",JSON.stringify(calendarObj));
}

function getState(calendarObj){
    var cal=JSON.parse(localStorage.getItem(calendarObj.calendarID+"Options"));
   if (cal==null) {setState(calendarObj);return;}
   calendarObj.defDate=new Date(cal.defDate);
    Object.keys(cal).forEach(function(key) {
        if(key!="defDate") calendarObj[key] = cal[key];
    });
}


/**sends list of tasks to calendar from 1st to last days
 *
 * @param first - first day to update
 * @param last - last day to update + 1 (since strict < in cycle)
 * @calendarObj - calendar
 */
function sendDataToCalendar(first, last, calendarObj){
    for (var i=first;i<last;i++)
{
    if (calendarObj.monthTasks[i]=='') continue;
    var tasksToDraw=calendarObj.monthTasks[i].split('\u0283');
    tasksToDraw.forEach(function (task) {
        drawTaskInDay(task,i,calendarObj);
    });
}
};


//sends single received task to be displayed in calendar
//or removed the task
function addDayTask(task, date, calendarObj){
    if (calendarObj.monthTasks[date.getDate()]=='') calendarObj.monthTasks[date.getDate()]=task;
    else calendarObj.monthTasks[date.getDate()]+='\u0283'+task;
}

function removeDayTask(task,day, calendarObj)
{
    var pos=calendarObj.monthTasks[day].indexOf(task);
    if(pos) calendarObj.monthTasks[day]=calendarObj.monthTasks[day].replace('\u0283'+task,"");
    else calendarObj.monthTasks[day]=calendarObj.monthTasks[day].replace(task,'');
    if (calendarObj.monthTasks[day].indexOf('\u0283')==0) calendarObj.monthTasks[day]=calendarObj.monthTasks[day].slice(1);
}

function getTask(date)
{
    return prompt("Add task for "+date.toLocaleDateString("EN-us",{ year: 'numeric', month: 'long', day: 'numeric'}));
}


function confirmTaskRemoval(task,date)
{
    return confirm("Are you sure you want to remove \""+task+"\" scheduled for "+date.toLocaleDateString("EN-us",{ year: 'numeric', month: 'long', day: 'numeric'})+"?");
}
