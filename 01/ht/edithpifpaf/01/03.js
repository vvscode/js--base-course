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
    var tableClassName = document.querySelector('input[name=class-name]').value;
  
    if (tableClassName) {
      myTable.setAttribute('class', tableClassName);
    }
  
    var checkHead = document.getElementById("table-head");
        if (checkHead.checked === true) {
        table.setAttribute("th", "Header");  
        }
    var rows = document.getElementById('rowNumber').value;
    var columns = document.getElementById('colNumber').value;
    
    for (var r = 0; r < rows; r++){
       var tr = myTable.insertRow();
          if (document.getElementById("table-head").checked){
            var th = document.createElement("th");
            tr.appendChild(th);
          }  
    for (var c = 0; c < columns; c++){
       var td = tr.insertCell();
       }
    }
  
    if (document.getElementById("caption").checked) {
      var caption = document.createElement("caption");
      caption.innerHTML = "Caption";
      myTable.appendChild(caption);
    }
    tableId.innerHTML='';
  
    tableId.appendChild(myTable);
    showCode(); 
}

function showCode () {
    var tableCode = document.createElement("textarea");
    tableCode.value = document.getElementById('table').innerHTML;
    var tableCodeDiv = document.getElementById('textarea');
    tableCodeDiv.innerHTML='';
    tableCodeDiv.appendChild(tableCode);
}

function cellClick () {
    var cellClass = prompt('Choose a class', 'red / blue / green');
    if (cellClass) {
      event.target.setAttribute('class', cellClass);
      showCode();
    }
}

table.onclick = function(event) {
  if (event.target.tagName === 'TD' || event.target.tagName === 'TH') {
   cellClick(event);
  }
}