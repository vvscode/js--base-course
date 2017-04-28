var rowSelect = document.getElementById("rowNumber");
    for (var i = 1; i <= 100; i++) {
        var rowOpt = document.createElement("option");
        rowOpt.text = i;
        rowOpt.value = i;
        rowSelect.add(rowOpt);
    }

var colSelect = document.getElementById("colNumber");
    for (var i = 1; i <= 20; i++) {
        var colOpt = document.createElement("option");
        colOpt.text = i;
        colOpt.value = i;
        colSelect.add(colOpt);
    }

var createTableButton = document.getElementById('create-table');
createTableButton.addEventListener('click', addTable, false);

function addTable() {
    var myTable = document.createElement("table");
    var tableId = document.getElementById("table");
    var checkHead = document.getElementById("table-head");
        if (checkHead.checked === true) {
        table.setAttribute("th", "Header");  
        }
    var rows = document.getElementById('rowNumber').value;
    var columns = document.getElementById('colNumber').value;
    
  
    for (var r = 0; r < rows; r++){
       var tr = myTable.insertRow();
    for (var c = 0; c < columns; c++){
       var td = tr.insertCell();
       }
    }
  
    var checkCaption = document.getElementById("caption");
        if (checkCaption.checked === true) {
        table.setAttribute("h3", "Caption");
        }

    tableId.appendChild(myTable);
  
    var tableCode = document.createElement("textarea");
    tableCode.value = document.getElementById('table').innerHTML;
    var tableCodeDiv = document.getElementById('textarea');
    tableCodeDiv.appendChild(tableCode);
}