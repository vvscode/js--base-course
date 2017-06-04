window.onload = function load() {
    var id = {'rowsNumber': 10,
     'colsNumber': 10
    }
    for (i = 0; i < Object.keys(id).length; i++) {
        var dgebi = document.getElementById(Object.keys(id)[i]);
        for (var j = 1; j <= id[Object.keys(id)[i]]; j++) {
            var option = new Option;
            option.text = j;
            option.value = j;
            dgebi.options[j] = option;
        }
    }
};

function createTable() {
    var tbl = document.createElement('table');
    var rows = document.getElementById('rowsNumber').value
    var columns = document.getElementById('colsNumber').value
    var tableDiv = document.getElementById('table');
    var tableName = document.querySelector('input[name=tname]').value;
    var tableCaption = document.getElementById('caption-check').checked;
    var tableHead = document.getElementById('table-head').checked;
    var captionName = document.getElementById('caption-name').value;

    if (tableHead) {
        var tr = tbl.insertRow();
        for (var i = 0; i < columns; i++) {
            var th = document.createElement("th");
            tr.appendChild(th)
        }
        rows = rows - 1;
    }
    for (var i = 0; i < rows; i++){
        var tr = tbl.insertRow();
        for (var j = 0; j < columns; j++){
            var td = tr.insertCell();
        }
    }
    if (tableName) {
        tbl.setAttribute('class', tableName);
    }
    if (tableCaption) {
        var cap = tbl.createCaption();
        cap.innerHTML = captionName;
    }
    tableDiv.appendChild(tbl);
};

var tableCellClick = function(ev) {
    var tableCellClass = prompt('Enter class name');
    if (tableCellClass) {
        ev.target.setAttribute('class', tableCellClass)
    }
};

var createTableButton = document.getElementById('create-table');
createTableButton.addEventListener('click', function() {
    if (document.getElementById('rowsNumber').value > 0 && document.getElementById('colsNumber').value > 0) {
        createTable();
    } else {
        document.getElementById('table').innerHTML = 'Wrong parameters';
    }
});

document.getElementById('table').addEventListener('click', function (ev) {
    if (ev.target.tagName === 'TD' || ev.target.tagName === 'TH') {
        tableCellClick(ev);
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