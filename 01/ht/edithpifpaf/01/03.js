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

function addTable() {
    var myTable = document.createElement("table");
    var numRows = document.getElementById("rowNumber");
    var numColumns = document.getElementById("colNumber");
    var rows = numRows.value;
    var columns = numColumns.value;
    var checkHead = document.getElementById("table-head");
        if (checkHead.checked === true) {
        table.setAttribute("th", "Header");  
      }
    var checkCaption = document.getElementById("caption");
        if (checkCaption.checked === true) {
        table.setAttribute("h3", "Caption");
}
    var tableId = document.getElementById("table");
    tableId.innerHTML="";

    for (var r = 0; r < rows; i++){
      var tr = myTable.insertRow();
    for (var c = 0; c < columns; j++){
      var td = tr.insertCell();
    }
   }
}

function showTableCode() {
    var tableCode = document.getElementById('my-table-code');
    tableCode.value = document.getElementById('table').innerHTML;
}