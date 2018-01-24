window.onload = init;
function init () {
  const VELCOMINGBLOCK = document.getElementsByClassName("mainBlock")[0],
							FORMNAME = document.getElementById('formName'),
							FORMAGE  = document.getElementById('formAge'),
			 CLOSING_ELEMENT = document.getElementsByClassName("greetingBlock__close")[0],
									BODY = document.body,
							  BUTTON = document.getElementsByClassName("greetingBlock__button")[0];
  						  HIDDEN = document.getElementsByClassName("greetingBlock__hidden")[0];

	if (addEventListener) BODY.addEventListener ('click', activateModal, false);
	else if (attachEvent) BODY.attachEvent ('onclick', activateModal);
	else BODY.onclick = activateModal;
	
	function activateModal (e) {
	  e.preventDefault();
	  if (e.target == CLOSING_ELEMENT) deleteModal();
	  if (e.target == BUTTON) getAnswer();
	  return false;
    }
	function deleteModal() {
	  BODY.removeChild(VELCOMINGBLOCK);
	  return false;
    }
	function getAnswer () {
	  if( failValidate() ) {
      clearForm();
      showMistake();
	    return false;
	  }
	  let phrase = FORMAGE.value < 18 ? 'Здарова, ' + beautyName(FORMNAME.value)
			+ '! Как ' + countYears(FORMAGE.value, false) + '?' : 'Приветствую, '+
			beautyName(FORMNAME.value) + '. Уж ' + FORMAGE.value + countYears(FORMAGE.value, true) + '!';
	  deleteModal();
	  createMessage(phrase);
	  
	  function failValidate() {
			return FORMNAME.value == "" ||
						 FORMNAME.value.indexOf(" ") !== -1 ||
						 FORMAGE.value  == "" ||
						 FORMAGE.value.indexOf(" ") !== -1 ||
						 isNaN(+formAge.value) ||
						 FORMAGE.value > 122 ||  //приблизительный максимальный возраст человека
						 FORMAGE.value <= 0 ||
						 wrongABC(FORMNAME.value);
	  }
	  function wrongABC (word) {
		  for(let i = 0; i < word.length; i++) {
			let letter = word.charCodeAt(i);
			if(letter > 1105 || // 1105 - юникод буквы ё, все последующие юникоды после 1105 не включают буквы русского либо английского алфавитов
			   letter < 65 ||   // 65 - юникод прописной А на английском языке, символы, имеющие юникод меньше данного, не входят в русский либо английский алфавиты
			   letter > 122 && letter < 1040 || //диапазон юникодов символов, не включающий буквы русского и английского алфавитов (122 - юникод буквы z)
			   letter > 90 && letter < 97) return true; //диапазон юникодов символов, не включающий буквы русского и английского алфавитов (90 - юникод буквы Z, 97 - a)
		  }
		  return false;
	  }
	  function beautyName(name) {
	    if(!name) return;
	    return name[0].toUpperCase() + name.slice(1).toLowerCase();
    }
    function clearForm () {
      FORMNAME.value = FORMAGE.value = '';
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