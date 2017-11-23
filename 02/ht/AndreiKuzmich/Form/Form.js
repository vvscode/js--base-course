




function getFormData() {
    var form = document.forms.my; 
  
    var userName = form.elements.guestName; 
    var userTown = form.elements.town;
    var userComment = form.elements.text;
    var userGender = form.elements.gender;
  
    var output = document.getElementById("result");
    output.innerHTML = ('<b>Name: </b>'+ userName.value + '<br>' +'<b>Native town: </b>'+ userTown.value 
    + '<br>' + '<b>Comment: </b>' + userComment.value + '<br>' + '<b>Gender: </b>' + userGender.value);
} 

window.onload=function(){ 
  var res = document.getElementById("butt");
  res.addEventListener( "click", getFormData); }
