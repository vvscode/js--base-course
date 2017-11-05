//31 array for month tasks - 1 element for each day
var monthTasks;

function genKey(date,calendarID)
{
    return calendarID+"-"+date.getMonth()+"/"+date.getFullYear();
}

//receives list of tasks from storage or DB
function getData(date, calendarID)
{ var data=JSON.parse(localStorage.getItem(genKey(date,calendarID)));
  if (data!=null) monthTasks = data;
  else  monthTasks=Array(32).fill("");
};

//sends list of tasks to storage
function setData(date, monthTasks, calendID){
localStorage.setItem(genKey(date,calendID),JSON.stringify(monthTasks));
};

/**sends list of tasks to calendar from 1st to last days
 *
 * @param first - first day to update
 * @param last - last day to update + 1 (since strict < in cycle)
 */
function sendDataToCalendar(){
for (var i=1;i<monthTasks.length;i++)
{
    if (monthTasks[i]=='') continue;
    var tasksToDraw=monthTasks[i].split('\u0283');
    tasksToDraw.forEach(function (task) {
        drawTaskInDay(task,i);
    });
}
};


//sends single received task to be displayed in calendar
//or removed the task
function addDayTask(task, date){
    if (monthTasks[date.getDate()]=='') monthTasks[date.getDate()]=task;
    else monthTasks[date.getDate()]+='\u0283'+task;
}

function removeDayTask(task,day)
{

    monthTasks[day].replace(('\u0283'+task),"");

}

function getTask(date)
{
    return prompt("Add task for "+date.toLocaleDateString("EN-us",{ year: 'numeric', month: 'long', day: 'numeric'}));
}


function confirmTaskRemoval(task,date)
{
    return confirm("Are you sure you want to remove \""+task+"\" scheduled for "+date.toLocaleDateString("EN-us",{ year: 'numeric', month: 'long', day: 'numeric'})+"?");
}
// '\u0259' - разделитель