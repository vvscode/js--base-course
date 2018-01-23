window.onload = init;
function init () {
	   let velcomingBlock = document.getElementsByClassName ("mainBlock")[0],
				 formName = document.getElementById('formName'),
				 formAge  = document.getElementById('formAge');
	const CLOSING_ELEMENT = document.getElementsByClassName ("greetingBlock__close")[0],
					 BODY = document.body,
				   BUTTON = document.getElementsByClassName ("greetingBlock__button")[0];
				   HIDDEN = document.getElementsByClassName ("greetingBlock__hidden")[0];

	if (addEventListener)BODY.addEventListener ('click', activateModal, false);
	else if (attachEvent)BODY.attachEvent ('onclick', activateModal);
	else BODY.onclick = activateModal;
	
	function activateModal (e) {
	  e.preventDefault();
	  if (e.target == CLOSING_ELEMENT) deleteModal();
	  if (e.target == BUTTON) getAnswer();
	  return false;
    }
	function deleteModal() {
	  BODY.removeChild (velcomingBlock);
	  return false;
    }
	function getAnswer () {
	  if(failValidate()) {
      clearForm();
      showMistake();
	  	return false;
	  }
	  let phrase = formAge.value < 18 ? 'Здарова, ' + beautyName(formName.value) + '! Как ' + countYears(formAge.value, false) + '?' : 'Приветствую, '+ beautyName(formName.value) + '. Уж ' + formAge.value + countYears(formAge.value, true) + '!';
	  deleteModal();
	  createMessage(phrase);
	  
	  function failValidate() {
	  return formName.value == "" ||
	         formName.value.indexOf(" ")!==-1 ||
	         formAge.value  == "" ||
			     formAge.value.indexOf(" ") !==-1 ||
			     isNaN(+formAge.value) ||
			     formAge.value > 122 ||
			     formAge.value <= 0 ||
			     wrongABC(formName.value);
	  }
	  function wrongABC (word) {
		  for(let i = 0; i < word.length; i++) {
			let letter = word.charCodeAt(i);
			if(letter > 1105 ||
			   letter < 65 ||
			   letter > 122 && letter < 1040 ||
			   letter > 90 && letter < 97) return true;
		  }
		  return false;
	  }
	  function beautyName(name) {
	    if(!name)return;
	    return name[0].toUpperCase() + name.slice(1).toLowerCase();
    }
    function clearForm () {
      formName.value = formAge.value = '';
    }
    function showMistake() {
	    HIDDEN.style.visibility = 'visible';
	    setTimeout(function() {
        HIDDEN.style.visibility = 'hidden';
      }, 7000)
    }
	  function countYears (age, elder) {
		  let countOfYears = age;
		  age %= 100;
		  if (age > 19) age %= 10;
		  switch(age) {
			case 1:  return (elder) ? ' год прошел'  : ' твой ' + countOfYears + ' год';
			case 2: 
			case 3:
			case 4:  return (elder) ? ' года прошло' : ' твои ' + countOfYears + ' года';
			default: return (elder) ? ' лет прошло'  : ' твои ' + countOfYears + ' лет';
		  }
	  }
	  function createMessage (phrase) {
		  let newElement = document.createElement('p');
	    newElement.innerHTML = phrase;
	    newElement.setAttribute('class','outputText')
	    BODY.appendChild(newElement);
	  }
	}
}