var getById = document.getElementById.bind(document);

window.onload = function() {
    var selectIds = {'rowsNumber': 100, 'colNumber': 20}
    for (i = 0; i < Object.keys(selectIds).length; i++) {
        var ddl = getById(Object.keys(selectIds)[i]);
        for (var j = 1; j <= selectIds[Object.keys(selectIds)[i]]; j++) {
            var option = new Option;
            option.text = j;
            option.value = j;
            ddl.options[j] = option;
        }
    }
};

var createTableButton = getById('create-table');

createTableButton.addEventListener('click', function() {
    if (tableIsVaild()) {
        createTable();
    } else {
        getById('table').innerHTML = 'Wrong parameters!';
        var tableCode = getById('table-code');
        tableCode.value = "";
        getById('table-code-div').setAttribute('class', 'hidden');
    }
});


function enableCaption() {
    var captionCheck = getById('caption-check')
    var input = getById('caption-name'); 
    if (captionCheck.checked) {
        input.disabled = false; 
        input.focus(); 
    } else {
        input.disabled = true;
    }
};

function tableIsVaild() {
    return getById('rowsNumber').value > 0 && getById('colNumber').value > 0;
}

function postTableCode() {
    var tableCode = getById('table-code');
    tableCode.value = getById('table').innerHTML;
    getById('table-code-div').setAttribute('class', '');
}

function createTable() {
    var tbl = document.createElement('table');
    var rows = getById('rowsNumber').value;
    var columns = getById('colNumber').value;
    var tableDiv = getById('table');
    var tableClassName = document.querySelector('input[name=class-name]').value;
    var tableCaption = getById('caption-check').checked;
    var tableHead = getById('table-head').checked;
    var captionName = getById('caption-name').value;
    tableDiv.innerHTML = '';
    if (tableHead) {
        var tr = tbl.insertRow();
        for (var i = 0; i < columns; i++) {
            var th = document.createElement('th');
            tr.appendChild(th)
        }
        rows -= 1;
    }
    for (var i = 0; i < rows; i++){
        var tr = tbl.insertRow();
        for (var j = 0; j < columns; j++){
            var td = tr.insertCell();
        }
    }
    if (tableClassName) {
        tbl.setAttribute('class', tableClassName);
    }
    if (tableCaption) {
        var cap = tbl.createCaption();
        cap.innerHTML = captionName;
    }
    tableDiv.appendChild(tbl);
    postTableCode();
}

var tableCellClick = function(ev) {
    var tableCellClass = prompt('Assign a class name for this table cell');
    if (tableCellClass) {
        ev.target.setAttribute('class', tableCellClass);
        postTableCode();
    }
};

getById('table').addEventListener('click', function (ev) {
    if (ev.target.tagName === 'TD' || ev.target.tagName === 'TH') {
        tableCellClick(ev);
    }
});
