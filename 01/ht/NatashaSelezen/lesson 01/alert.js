var el = document.getElementById("create-table");
 
el.addEventListener("click", createTable, false);

function оutputTableCode() {
  var tableCode = document.querySelector("textarea");
  tableCode.value = document.querySelector("#table").innerHTML;
  tableCode.style.display = "block";
}

function createTable() {
	
	var myTableDiv = document.getElementById("table");

	var colNumber = document.getElementById("colNumber");
	var colNumberValue = colNumber.options[colNumber.selectedIndex].value;

	var rowsNumber = document.getElementById("rowsNumber");
	var rowsNumberValue = rowsNumber.options[rowsNumber.selectedIndex].value;

	var table = document.createElement("TABLE");
	table.border='1';

	var tableBody = document.createElement("TBODY");
	table.appendChild(tableBody);
	
	for (var i=0; i < colNumberValue; i++) {
		var tr = document.createElement("TR");
		tableBody.appendChild(tr);

		for (var j=0; j < rowsNumberValue; j++) {
			var td = document.createElement("TD");
			td.width='75';
			td.appendChild(document.createTextNode("Cell " + i + "," + j));
			tr.appendChild(td);
		}
	}

	debugger;
	myTableDiv.appendChild(table);
  оutputTableCode();
   
}


window.onload = function() {
    var tabSelect = {"rowsNumber": 100, "colNumber": 20}
    for (i = 0; i < Object.keys(tabSelect).length; i++) {
        var tab = document.getElementById(Object.keys(tabSelect)[i]);
        for (var j = 1; j <= tabSelect[Object.keys(tabSelect)[i]]; j++) {
            var option = new Option;
            option.text = j;
            option.value = j;
            tab.options[j] = option;
        }
    }
};

var cellClick = function(ev) {
    var cellClass = prompt("Enter the class for this table cell");
    if (cellClass) {
        ev.target.setAttribute("class", cellClass)
        оutputTableCode();
    }
};

document.getElementById("table").addEventListener("click", function (ev) {
    if (ev.target.tagName === "TD" || ev.target.tagName === "TH") {
        cellClick(ev);
    }
});

