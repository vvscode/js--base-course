


function getName(form){
var elems = form.elements;
if (!elems.name.value){
	alert('Tell me your name');
}else{
	showQuestion();
  }
}

function showQuestion(){
	var x = document.getElementById('age');
	x.style.display = "block";
}

function getAge(form){
  var elems = form.elements;
  if (!elems.age.value){
    alert('Tell me your age');
  }else if (elems.age.value < 18 && elems.age.value >0){
    alert('Здарова, ' + elems.name.value +  '. Как твои ' + elems.age.value + '?');
  }else if(elems.age.value > 17) {
    alert ('Привествую, ' + elems.name.value + '. Уж ' + elems.age.value + ' лет прошло');
  }else{
    alert ('Tell me your real age!!');
  }
  }
  