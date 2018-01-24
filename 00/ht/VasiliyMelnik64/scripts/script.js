window.onload = init;
function init () {
  const VELCOMINGBLOCK = document.getElementsByClassName("mainBlock")[0],
    FORMNAME = document.getElementById('formName'),
    FORMAGE = document.getElementById('formAge'),
    CLOSING_ELEMENT = document.getElementsByClassName("greetingBlock__close")[0],
    BODY = document.body,
    BUTTON = document.getElementsByClassName("greetingBlockButton")[0];
    HIDDEN = document.getElementsByClassName("greetingBlock__hidden")[0];

  if (addEventListener) BODY.addEventListener('click', activateModal, false);
  else if (attachEvent) BODY.attachEvent('onclick', activateModal);
  else BODY.onclick = activateModal;

  function activateModal(e) {
    e.preventDefault();
    if (e.target == CLOSING_ELEMENT) deleteModal();
    if (e.target == BUTTON) getAnswer();
  }

  function getAnswer() {
    if (failValidate(FORMNAME, FORMAGE)) {
      clearForm();
      showMistake();
      return false;
    }

    let phrase = FORMAGE.value < 18 ? 'Здарова, ' + beautyName(FORMNAME.value) +
      '! Как ' + countYears(FORMAGE.value, false) + '?' : 'Приветствую, ' + beautyName(FORMNAME.value)
      + '. Уж ' + FORMAGE.value + countYears(FORMAGE.value, true) + '!';

    deleteModal();
    createMessage(phrase, BODY);
  }

  function clearForm () {
    FORMNAME.value = FORMAGE.value = '';
  }
  function deleteModal() {
    BODY.removeChild(VELCOMINGBLOCK);
  }
}

function failValidate(name, age) {
  return name.value == "" ||
    name.value.indexOf(" ") !== -1 ||
    age.value == "" ||
    age.value.indexOf(" ") !== -1 ||
    isNaN(+age.value) ||
    age.value > 122 ||  //приблизительный максимальный возраст человека
    age.value <= 0 ||
    wrongABC(name.value);
}

function wrongABC (word) {
  const UPPERCASE_ENGLISH_FIRSTLETTER_UNICODE = 65;
  const UPPERCASE_ENGLISH_LASTLETTER_UNICODE = 90;
  const LOWERCASE_ENGLISH_FIRSTLETTER_UNICODE = 97;
  const LOWERCASE_ENGLISH_LASTLETTER_UNICODE = 122;
  const UPPERCASE_RUSSIAN_FIRSTLETTER_UNICODE = 1040;
  const LAST_LETTER_UNICODE = 1105; // юникод буквы ё

  for (let i = 0; i < word.length; i++) {
    let letter = word.charCodeAt(i);
      if(letter > LAST_LETTER_UNICODE ||
	 letter < UPPERCASE_ENGLISH_FIRSTLETTER_UNICODE || 
	 letter > LOWERCASE_ENGLISH_LASTLETTER_UNICODE && letter < UPPERCASE_RUSSIAN_FIRSTLETTER_UNICODE || 
	 letter > UPPERCASE_ENGLISH_LASTLETTER_UNICODE && letter < LOWERCASE_ENGLISH_FIRSTLETTER_UNICODE) return true; 
  }
  return false;
}

function beautyName(name) {
  if(!name) return;
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
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
function createMessage (phrase, container) {
  let newElement = document.createElement('p');
  newElement.innerHTML = phrase;
  newElement.setAttribute('class','outputText outputText-decor')
  container.appendChild(newElement);
}
