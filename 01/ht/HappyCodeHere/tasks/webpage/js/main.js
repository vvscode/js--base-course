var name, city, comment, gender;

var form = document.querySelector('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  name = document.getElementById('name').value;
  city = document.getElementById('city').value;
  comment = document.getElementById('comment').value;
  gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : 'Не указано';

  var data = {
    'Имя': name,
    'Город': city,
    'Коммент': comment,
    'Пол': gender
  }

  showOutput(data);
}


function showOutput(data) {
  var output = document.querySelector('.output');

  for (var key in data) {

    var el = document.createElement('p');
    el.innerHTML = `${key}: ${data[key] || 'Не указано'}`;

    output.appendChild(el);
  }
  form.reset();
}
