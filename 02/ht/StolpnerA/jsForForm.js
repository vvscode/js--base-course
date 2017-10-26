let $$ = text => document.querySelector(text);
let form = $$("form");
function init() {
  form.addEventListener("submit", handlerEvent);
}

function handlerEvent(ev) {
  ev.preventDefault();

  let name = $$(".name").value;
  let city = $$(".city").value;
  let comment = $$(".comment").value;
  let sex = $$(".male").checked ? "Male" : "Female";

  show(name, city, comment, sex);
}

function show(name, city, comment, sex) {
  $$(".info").innerHTML =
    name + "<br>" + city + "<br>" + comment + "<br>" + sex;
  form.reset();
}

init();
