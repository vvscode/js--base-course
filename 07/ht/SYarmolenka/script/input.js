import {lifeGame, eb} from "./router";
import {session} from "./main";

class Input {
  constructor (where) {
    this.elem = where;
  };
  create () {
    this.elem.innerHTML = `
      <div id="width" class="input">
        <div class="minus">-</div><input type="text"><div class="plus">+</div>
      </div>
      <div id="height" class="input">
        <div class="minus">-</div><input type="text"><div class="plus">+</div>
      </div>
      <button id="create">Create</button>`;
  };
  delete () {
    this.elem.innerHTML = ``;
  };
};

let count = (elem) => {
  let input = elem.parentNode.querySelector(`input`);
  if (elem.classList.contains(`plus`)) {
    if (input.value === ``) input.value = 1;
    input.value = +input.value + 1;
  }
  if (elem.classList.contains(`minus`)) {
    if (input.value === ``) input.value = 1;
    input.value = +input.value - 1;
    if (+input.value < 1) input.value = 1;
  }
};

let checkAndCreate = _ => {
  let inputs = document.querySelectorAll(`.input input`);
  if (+inputs[0].value > 1 && +inputs[1].value > 1) {
    lifeGame.clearHistory();
    lifeGame.createArr(+inputs[0].value, +inputs[1].value);
    lifeGame.x = +inputs[0].value;
    lifeGame.y = +inputs[1].value;
    session(`field`, [lifeGame.x, lifeGame.y]);
    eb.trigger(`createField`);
    inputs[0].value = inputs[1].value = ``;
  }
};

document.body.addEventListener(`change`, (e) => {
  if (!e.target.closest(`.input`) && !e.target.matches(`input`)) return;
  if (!(Number.isInteger(+e.target.value) && +e.target.value > 0)) {
    e.target.value = ``;
  }
});
document.body.addEventListener(`click`, (e) => {
  if (!(e.target.classList.contains(`plus`) || e.target.classList.contains(`minus`))) return;
  e.target.onselectstart = () => false;
  e.target.onmousedown = () => false;
  count(e.target);
});
document.body.addEventListener(`keypress`, (e) => {
  if (e.keyCode !== 13) return;
  checkAndCreate();
});
document.body.addEventListener(`click`, (e) => {
  if (!e.target.matches(`#create`)) return;
  checkAndCreate();
});

export {Input};
