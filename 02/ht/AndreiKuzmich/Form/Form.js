




function getFormData() {
    var form = document.forms.my; 
  
    var elem = form.elements.guestName; 
    var elem_1 = form.elements.town;
    var elem_2 = form.elements.text;
    var elem_3 = form.elements.gender;
  
    var output = document.getElementById("result");
    output.innerHTML = ('<b>Name: </b>'+ elem.value + '<br>' +'<b>Native town: </b>'+ elem_1.value 
    + '<br>' + '<b>Comment: </b>' + elem_2.value + '<br>' + '<b>Gender: </b>' + elem_3.value);
} 

window.onload=function(){ 
  var res = document.getElementById("butt");
  res.addEventListener( "click", getFormData); }
