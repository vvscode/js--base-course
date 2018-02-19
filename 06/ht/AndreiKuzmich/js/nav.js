// добавляет координаты места в хэш
function addCoordsToHash(lat, lng, city) {
  window.location.hash = 2;
  window.location.hash += `/${city}/@${lat},${lng}`;
}

// показ/скрытие блоков
function showMain() {
  document.querySelector('#main').style.display = 'block';
  document.querySelector('#author').style.display = 'none';
  document.querySelector('#about').style.display = 'none';
}
function showAuthor() {
  document.querySelector('#author').style.display = 'block';
  document.querySelector('#main').style.display = 'none';
  document.querySelector('#about').style.display = 'none';
}
function showAbout() {
  document.querySelector('#about').style.display = 'block';
  document.querySelector('#main').style.display = 'none';
  document.querySelector('#author').style.display = 'none';
}

function saveStateOnUpdate() {
  var currentPage = window.location.hash;
  switch (currentPage) {
    case '#1':
      showAbout();
      break;
    case '#2':
      showMain();
      break;
    case '#3':
      showAuthor();
      break;
    default:
      showMain();
  }
}

window.addEventListener('hashchange', saveStateOnUpdate, false);

document.querySelector('#aboutMe').addEventListener('click', showAbout);
document.querySelector('#mainInfo').addEventListener('click', showMain && start);
document.querySelector('#pageAuthor').addEventListener('click', showAuthor);







