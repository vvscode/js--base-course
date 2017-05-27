var TIME_LIMIT = 20;
var dict = [];

var dictCopy;
var timer;
var lastLetter;
var gameOver = false;
var form = document.getElementById('userForm');
var input = document.querySelector('#userInput');
var gameField = document.querySelector('#game');
var timerOut = document.querySelector('#timer');
var resetBtn = document.querySelector('.reset-btn');

var getRandomWord = () => dictCopy[Math.floor(Math.random() * dictCopy.length)];

var putStep = (userName, word) => {
  var length = word.length;
  dictCopy = dictCopy.filter((i) => i !== word);
  lastLetter = word[length - 1] === 'ь' ? word[length - 2] : word[length - 1];
  gameField.innerHTML += `<b>${userName}:</b> ${word}<br />`;
};

var handleVictory = (winner) => {
  resetBtn.classList.remove('hidden');
  clearInterval(timer);
  putStep(winner, 'WON');
}

var resetTimer = () => {
  var counter = 0;
  clearInterval(timer);
  timer = setInterval(() => {
    if (counter >= TIME_LIMIT) {
      gameOver = true;
      handleVictory('Computer');
    }
    timerOut.innerHTML = counter++;
  }, 1000);
}

var handleUserIput = () => {
  var userInput = input.value.trim();
  if(!userInput) {
    return;
  }
  if (gameOver) {
    return;
  }
  if (userInput[0] !== lastLetter) {
    return;
  }
  if (dictCopy.indexOf(userInput) < 0) {
    return;
  }
  input.value = '';
  putStep('user', userInput);

  var computerWord = getWordByLetter(lastLetter);
  if (computerWord) {
    putStep('computed', computerWord);
  } else {
    handleVictory('User');
  }
}

var getWordByLetter = (letter) => dictCopy.find((i) => i[0] === letter);

resetBtn.addEventListener('click', run);


function run() {
  resetBtn.classList.add('hidden');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    handleUserIput();
  });  

  var firstWord = getRandomWord();
  putStep('computed', firstWord);
  resetTimer();
}

fetch('dict.txt')
  .then((resp) => resp.text())
  .then((text) => {
    dict = text.split('\n');
    dictCopy = [].concat(dict);
  })
  .then(() => run());