import {lifeGame, eb} from "./router";
import {output} from "./main";

class Control {
  constructor (where) {
    this.elem = where;
    this.createButtons();
    this.insertButtons(lifeGame.run);
    let insertButtons = this.insertButtons.bind(this);
    eb.on(`play`, insertButtons);
  };
  createButtons () {
    let prev = `
        <svg version="1.1" id="prev" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 40" style="enable-background:new 0 0 60 40;" xml:space="preserve">
          <style type="text/css">.st0{fill:#FFFFFF;}</style>
          <path class="st0" d="M28.5,17.4L46,7.4c2-1.1,4.5,0.3,4.5,2.6l0,20c0,2.3-2.5,3.7-4.5,2.6l-17.5-10C26.5,21.5,26.5,18.6,28.5,17.4z"/>
          <path class="st0" d="M5.1,17.4l17.5-10c2-1.1,4.5,0.3,4.5,2.6l0,20c0,2.3-2.5,3.7-4.5,2.6l-17.5-10C3.1,21.5,3.1,18.6,5.1,17.4z"/>
        </svg>`;
    let play = `
        <svg version="1.1" id="play" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 40" style="enable-background:new 0 0 60 40;" xml:space="preserve">
          <style type="text/css">.st0{fill:#FFFFFF;}</style>
          <path class="st0" d="M42,17.4l-17.5-10C22.5,6.3,20,7.7,20,10v20c0,2.3,2.5,3.7,4.5,2.6l17.5-10C44,21.5,44,18.6,42,17.4z"/>
        </svg>`;
    let pause = `
        <svg version="1.1" id="pause" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 40" style="enable-background:new 0 0 60 40;" xml:space="preserve">
          <style type="text/css">.st0{fill:#FFFFFF;}</style>
          <path class="st0" d="M25,33L25,33c-1.7,0-3-1.3-3-3V10c0-1.6,1.3-3,3-3h0c1.6,0,3,1.3,3,3v20C28,31.7,26.7,33,25,33z"/>
          <path class="st0" d="M37,33L37,33c-1.7,0-3-1.3-3-3V10c0-1.6,1.3-3,3-3h0c1.6,0,3,1.3,3,3v20C40,31.7,38.7,33,37,33z"/>
        </svg>`;
    let next = `
        <svg version="1.1" id="next" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 40" style="enable-background:new 0 0 60 40;" xml:space="preserve">
          <style type="text/css">.st0{fill:#FFFFFF;}</style>
          <path class="st0" d="M31.5,17.4l-17.5-10c-2-1.1-4.5,0.3-4.5,2.6v20c0,2.3,2.5,3.7,4.5,2.6l17.5-10C33.5,21.5,33.5,18.6,31.5,17.4z"/>
          <path class="st0" d="M55,17.4l-17.5-10C35.5,6.3,33,7.7,33,10v20c0,2.3,2.5,3.7,4.5,2.6l17.5-10C57,21.5,57,18.6,55,17.4z"/>
        </svg>`;

    let createButton = (id, html) => {
      let button = document.createElement(`button`);
      button.id = id;
      button.className = `control`;
      button.innerHTML = html;
      return button;
    };
    [this.prev, this.play, this.pause, this.next] = [createButton(`prev`, prev), createButton(`play`, play), createButton(`pause`, pause), createButton(`next`, next)];
    this.events();
  };
  insertButtons (bool) {
    this.elem.innerHTML = ``;
    this.elem.appendChild(this.prev);
    bool ? this.elem.appendChild(this.pause) : this.elem.appendChild(this.play);
    this.elem.appendChild(this.next);
  };
  events () {
    this.elem.addEventListener(`click`, function (e) {
      if (!(e.target.closest(`#play`) || (e.target.closest(`#pause`)))) return;
      lifeGame.run ? lifeGame.stop() : lifeGame.start();
    });
    this.elem.addEventListener(`click`, function (e) {
      if (!e.target.closest(`#prev`) || lifeGame.run) return;
      if (!lifeGame.history || lifeGame.history.length < 1) return;
      lifeGame.currentArr = lifeGame.history[lifeGame.history.length - 1];
      output();
      lifeGame.history.splice(-1, 1);
    });
    this.elem.addEventListener(`click`, function (e) {
      if (!e.target.closest(`#next`) || lifeGame.run) return;
      if (!lifeGame.currentArr) return;
      lifeGame.stepGame();
    });
  };
};

export {Control}
