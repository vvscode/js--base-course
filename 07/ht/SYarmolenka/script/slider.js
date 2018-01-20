import {lifeGame} from "./router";
class Slider {
  constructor(where) {
    this.elem = where;
  };
  create () {
    this.elem.innerHTML = `<div id="line"><div id="clit"></div></div>`;
  };
  delete () {
    this.elem.innerHTML = ``;
  }
};

document.body.addEventListener(`mousedown`, (e) => {
  if (!e.target.matches(`#clit`)) return;
  e.preventDefault();
  let clit = e.target;
  let line = document.querySelector(`#line`);
  let coordsLine = line.getBoundingClientRect();
  let coordsClit = clit.getBoundingClientRect();
  let leftLimit = coordsLine.left + window.pageXOffset;
  let rightLimit = coordsLine.right - coordsClit.width + window.pageXOffset;
  let offset = e.clientX - coordsClit.x;
  clit.style.position = `absolute`;
  clit.style.left = e.clientX - offset + window.pageXOffset + `px`;
  document.onmousemove = (ev) => {
    let x = ev.clientX - offset + window.pageXOffset;
    if (x < leftLimit) x = leftLimit;
    if (x > rightLimit) x = rightLimit;
    clit.style.left = `${x}px`;
    let interval = (x - leftLimit + 40) / (coordsLine.width - coordsClit.width) * 1000;
    lifeGame.interval = interval;
  };
  document.addEventListener(`mouseup`, () => {
    let coordsClit = clit.getBoundingClientRect();
    let coordsLine = line.getBoundingClientRect();
    clit.style.position = `relative`;
    clit.style.left = coordsClit.left - coordsLine.left + `px`;
    document.onmousemove = null;
  });
  return false;
});

export {Slider};
