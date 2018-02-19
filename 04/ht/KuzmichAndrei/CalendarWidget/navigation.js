function showCalendar() {
  document.querySelector('.main').style.display = 'block';
  document.querySelector('section').style.display = 'none';
  document.querySelector('.about').style.display = 'none';
}
function showCalendarCreater() {
  document.querySelector('section').style.display = 'block';
  document.querySelector('.main').style.display = 'none';
  document.querySelector('.about').style.display = 'none';
}
function showAbout() {
  document.querySelector('.about').style.display = 'block';
  document.querySelector('.main').style.display = 'none';
  document.querySelector('section').style.display = 'none';
}

function saveStateOnUpdate() {
  var currentPage = window.location.hash;
  switch (currentPage) {
    case '#1':
      showCalendar();
      break;
    case '#2':
      showCalendarCreater();
      break;
    case '#3':
      showAbout();
      break;
    default:
    showCalendar();
  }
}

window.onload = function () {
  saveStateOnUpdate()
};

document.querySelector('#calendar').addEventListener('click', showCalendar);
document.querySelector('#create').addEventListener('click', showCalendarCreater);
document.querySelector('#about').addEventListener('click', showAbout);






