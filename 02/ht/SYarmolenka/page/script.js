function Run () {}
Run.prototype.start = function() {
  this.name = document.forms[0].name.value;
  function choose (elemArr) {
    for (let i=0; i<elemArr.length; i++) {
      if (elemArr[i].selected || elemArr[i].checked) {
        return elemArr[i].value;
      }
    }
    return `Не выбран`;
  }
  this.city = choose(document.forms[0].city.options);
  this.sex = choose(document.forms[0].querySelectorAll(`.sex`));
  this.comment = document.forms[0].comment.value;
}
Run.prototype.show = function() {
  let div = document.body.querySelector(`#message`);
  if (div) {div.parentNode.removeChild(div)}
  div = document.createElement(`div`);
  div.id = `message`
  div.innerHTML = `Имя: ${this.name} <br> Город: ${this.city} <br> Пол: ${this.sex} <br> Комментарий: ${this.comment}`;
  document.body.appendChild(div);
}
Run.prototype.clear = function() {
  document.forms[0].name.value = ``;
  document.forms[0].city.selectedIndex = -1;
  document.forms[0].querySelectorAll(`.sex`)[0].checked = false;
  document.forms[0].querySelectorAll(`.sex`)[1].checked = false;
  document.forms[0].comment.value = ``;
}
let run = new Run();

document.forms[0].onsubmit = function() {return false};
document.body.onclick = function(e) {
  if (e.target.id !== `button`) {return};
  run.start();
  run.show();
  run.clear();
}
