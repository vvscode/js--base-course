window.onload = function() {
    var selectIds = {'rowsNumber': 100, 'colNumber': 20}
    for (i = 0; i < Object.keys(selectIds).length; i++) {
        var ddl = document.getElementById(Object.keys(selectIds)[i]);
        for (var j = 1; j <= selectIds[Object.keys(selectIds)[i]]; j++) {
            var option = new Option;
            option.text = j;
            option.value = j;
            ddl.options[j] = option;
        }
    }
};

var createTableButton = document.getElementById('create-table');

createTableButton.addEventListener('click', function() {
    if (tableIsVaild()) {
        createTable();
    } else {
        document.getElementById('table').innerHTML = 'Wrong parameters!';
    }
});


function enableCaption() {
    var captionCheck = document.getElementById('caption-check')
    var input = document.getElementById('caption-name'); 
    if (captionCheck.checked) {
        input.disabled = false; 
        input.focus(); 
    } else {
        input.disabled = true;
    }
};

function tableIsVaild() {
    return document.getElementById('rowsNumber').value > 0 && document.getElementById('colNumber').value > 0;
}

function postTableCode() {
    var tableCodeDiv = document.getElementById('table-code');
    var tableCode = document.createElement('textarea');
    tableCodeDiv.innerHTML = "";
    tableCode.value = document.getElementById('table').innerHTML;
    tableCodeDiv.appendChild(tableCode);
}

function createTable() {
    var tbl = document.createElement('table');
    var rows = document.getElementById('rowsNumber').value
    var columns = document.getElementById('colNumber').value
    var tableDiv = document.getElementById('table');
    var tableClassName = document.querySelector('input[name=class-name]').value;
    var tableCaption = document.getElementById('caption-check').checked;
    var tableHead = document.getElementById('table-head').checked;
    var captionName = document.getElementById('caption-name').value;
    tableDiv.innerHTML = "";
    if (tableHead) {
        var tr = tbl.insertRow();
        for (var i = 0; i < columns; i++) {
            var th = document.createElement("th");
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
        ev.target.setAttribute('class', tableCellClass)
        postTableCode();
    }
};

document.getElementById('table').addEventListener('click', function (ev) {
    if (ev.target.tagName === 'TD' || ev.target.tagName === 'TH') {
        tableCellClick(ev);
    }
});
