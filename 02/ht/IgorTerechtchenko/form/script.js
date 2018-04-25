var input = document.getElementsByTagName('input');
var button = document.getElementById('button');
var age = document.getElementsByTagName('select');
var bio = document.getElementsByTagName('textarea');
var userInfoArea = document.getElementById('out');
console.log(button)

function User() {
  this.name = input[0].value;
  this.gender = input[1].checked ? 'male' : 'female';
  this.age = age[0].value;
  this.drivingLicense = input[3].checked ? 'yes' : 'no';
  this.bio = bio[0].value;
}

button.addEventListener('click', displayUser, false);

function displayUser(el) {
  el.preventDefault();
  var user = new User();
  for(var field in user){
    if(!user[field]) {
      window.alert('fill in all fields');
      return
    }
  }
  var text = '<div> name: ' + user.name + ' <br>' +
      'gender: ' + user.gender + ' <br>' + 
      'age: ' + user.age + '<br>' +
      'license: ' + user.drivingLicense + ' <br>' +
      'bio : ' + user.bio + 
      '</div>';
  userInfoArea.innerHTML = text;
}
