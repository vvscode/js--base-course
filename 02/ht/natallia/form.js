var result = document.querySelector('#result');
var btn = document.querySelector('#button');

btn.addEventListener('click', showInfo);

function showInfo() {
  var name = document.getElementById('name').value;
  var about = document.getElementById('about').value;
  var age = document.getElementById('age').value;
  var checkedSex = document.querySelector('input[type = "radio"]:checked')
    .value;
  var checkDriverLisense = document.querySelector(
    'input[type = "checkbox"]:checked'
  )
    ? 'да'
    : 'нет';
  if (name.length > 0 && about.length > 0) {
    result.innerHTML =
      '<p>Ваше имя: ' +
      name +
      '</p><p>Ваш возраст: ' +
      age +
      '</p><p>Ваш пол: ' +
      checkedSex +
      '</p><p>Есть ли водительские права: ' +
      checkDriverLisense +
      '</p><p>Краткая информация: ' +
      about +
      '</p>';
    document.querySelector('#form').reset();
  }
}
