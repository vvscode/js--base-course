function setClass(val) {
  document.getElementById("table1").classList.add(val);
}

var rowSelect = document.getElementById("rowNum");
var colSelect = document.getElementById("colNum");

for (var i = 1; i <= 100; i++) {
  var rowOption = document.createElement("option");
  rowOption.text = i;
  rowOption.value = i;
  rowSelect.add(rowOption);
}

for (var i = 1; i <= 20; i++) {
  var colOption = document.createElement("option");
  colOption.text = i;
  colOption.value = i;
  colSelect.add(colOption);
}

function createHeader() {
 if (document.getElementById("setHeader")){
   var h1= document.createElement("h1");
   var header = document.getElementById("header");
   }
}

function generateTable () {

  if (document.getElementById("enableHeader").checked){
     var h1= document.createElement("h1");
     var header = document.getElementById("header");
       header.innerHTML = "Here's our header";
       header.appendChild(h1);
  }

  var table = document.createElement("table");
    table.setAttribute("class", document.getElementById("class").value);
  var tableDiv = document.getElementById("tableDiv");
  var rows = document.getElementById("rowNum").value;
  var columns = document.getElementById("colNum").value;
    tableDiv.innerHTML = "";

  for (var i = 0; i < rows; i++){
    var tr = table.insertRow();

  for (var j = 0; j < columns; j++){
    var td = tr.insertCell();
    td.addEventListener('click', function (event) {
      event.target.className = prompt("Выбери класс", "turq/yel/bl");

    var fullTable = document.getElementById("fullTable");
    var tableCode = document.getElementById("tableCode");
    tableCode.innerHTML = fullTable.innerHTML;
  })
      }
  }

  tableDiv.appendChild(table);

  if (document.getElementById("enableCaption").checked){
    var p = document.createElement("p");
    var caption = document.getElementById("caption");
    caption.innerHTML = "Here's our caption";
    caption.appendChild(p);
  }

  var fullTable = document.getElementById("fullTable");
  var tableCode = document.getElementById("tableCode");
  tableCode.innerHTML = fullTable.innerHTML;

}
