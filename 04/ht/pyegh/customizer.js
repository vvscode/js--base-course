function addListenersToDivWithOptions(options){
	var optionsDiv = document.getElementById("optionsDivId");
	optionsDiv.addEventListener('change', handleOptionActions);

	// setting of default form state
    if(options.showMonth){
        document.getElementById('showMonth').checked = true;
    }
    if(options.allowChangeMonth){
        document.getElementById('allowChangeMonth').checked = true;
    }
    if(options.allowAdd){
        document.getElementById('allowAddNotes').checked = true;
    }
    if(options.allowRemove){
        document.getElementById('allowRemoveNotes').checked = true;
    }

}

function handleOptionActions(){
    var target = event.target;
    var currOptions = getCurrentOptions();

    if(target.id === 'showMonth'){
        currOptions.showMonth = target.checked;
    } else if(target.id === 'allowChangeMonth'){
        currOptions.allowChangeMonth = target.checked;
    } else if(target.id === 'allowAddNotes'){
        currOptions.allowAddNotes = target.checked;
    } else if(target.id === 'allowRemoveNotes'){
        currOptions.allowRemoveNotes = target.checked;
    } else if(target.id === 'monthSelectId'){
        var mothSelect = document.getElementById("monthSelectId").value -1;
        currOptions.monthSelect = mothSelect;
    } else if(target.id === 'yearSelectId'){
        currOptions.yearSelect = document.getElementById("yearSelectId").value;
    } else{
        return;
    }
    new Calendar({
        calendarDivId: 'calendar3',
        showMonth: currOptions.showMonth ,
        allowChangeMonth: currOptions.allowChangeMonth,
        allowAdd: currOptions.allowAddNotes,
        allowRemove: currOptions.allowRemoveNotes ,
        date: new Date(currOptions.yearSelect, currOptions.monthSelect)
    });

}

function getCurrentOptions(){
    return {
        showMonth: document.getElementById("showMonth").checked,
        allowChangeMonth: document.getElementById("allowChangeMonth").checked,
        allowAddNotes: document.getElementById("allowAddNotes").checked,
        allowRemoveNotes: document.getElementById("allowRemoveNotes").checked,
        monthSelect: document.getElementById("monthSelectId").value - 1,
        yearSelect: document.getElementById("yearSelectId").value
    }
}
	