
// создание таска
document.querySelector('body').addEventListener('dblclick', function (ev) {
  var click2 = document.querySelector('#allowAdd').checked;
  if (click2) {
    ev.target.matches('td') && addTask(ev.target);
  }
});

function addTask(result) {
  if (result.innerHTML === '') {
    return null;
  }
  var task = prompt('type a task', '');
  var point = document.createElement('div');
  point.className = 'newTask';
  result.appendChild(point).innerHTML = `${task} <button id = "remove" title = "Delete the task">x</button>`;
  return result;
}


// удаление таска
document.querySelector('body').addEventListener('click', function (ev) {
  var click3 = document.querySelector('#allowRemove').checked;
  if (click3) {
    ev.target.matches('#remove') && removeTask(ev.target);
  }
});

function removeTask(el) {
  var confirmation = confirm('Are you sure you want to delete this task?');
  if (confirmation) {
    el.parentNode.classList.add('delete');
  }
}

// листание месяцев
function plusMonth() {
  calendar.drawCalendar(document.querySelector('#currentDate').dataset.year, parseFloat(document.querySelector('#currentDate').dataset.month) + 1);
}
function minusMonth() {
  calendar.drawCalendar(document.querySelector('#currentDate').dataset.year, parseFloat(document.querySelector('#currentDate').dataset.month) - 1);
}

document.querySelector('body').addEventListener('click', function (ev) {
  var click1 = document.querySelector('#allowChange').checked;
  if (click1) {
    (ev.target.matches('#R') && plusMonth()) || (ev.target.matches('#L') && minusMonth());
  }
});
