function getUser() {
  var input = document.getElementsByTagName('input');
  var button = document.getElementById('button');
  var age = document.getElementsByTagName('select');
  var bio = document.getElementsByTagName('textarea');
  var form = document.getElementById('form');
  return { 'name' : input[0].value,
           'gender': input[1].checked ? 'male' : 'female',
           'age': age[0].value,
           'drivinglicense': input[3].checked ? 'yes' : 'no',
           'bio': bio[0].value
  }
}

function displayUser(el) {
  var userInfoArea = document.getElementById('out');
  var user = getUser();
  var text = '<div> name: ' + user.name + ' <br>' +
      'gender: ' + user.gender + ' <br>' + 
      'age: ' + user.age + '<br>' +
      'license: ' + user.drivingLicense + ' <br>' +
      'bio : ' + user.bio + 
      '</div>';
  userInfoArea.innerHTML = text;
}

form.addEventListener('submit', displayUser, false);
form.addEventListener('submit', function(el) {el.preventDefault();})
