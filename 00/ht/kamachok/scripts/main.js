function setName(){
	var myName = prompt('Enter your name.');
	localStorage.setItem('name', myName);
}

function setAge(){
	var myAge = prompt('Enter your age.');
	localStorage.setItem('age', myAge);
}

function hello(){
	age = localStorage.getItem('age'); 
	name = localStorage.getItem('name');
	if (age < 18){
		return "Здарова, " + name + ". Как твои " + age + "?"
	}else {
		return "Привествую, " + name + ". Уж " + age + "лет прошло"
	}
}

while(!localStorage.getItem('name')){
	setName();
}

while(!localStorage.getItem('age')){
	setAge();
}

alert(hello());
