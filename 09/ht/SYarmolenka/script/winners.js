import {game} from "./script";

export class Result {
  constructor () {
    this.local(`winners`).then(res => {
      this.winners = res === null ? [] : res;
    });
  };
  newResult (arr) {
    Promise.resolve().then(_ => {
      return this.local(`winners`);
    }).then(res => {
      this.winners = res === null ? [] : res;
      this.winners.push(arr);
      this.winners.sort((a, b) => b.time - a.time);
      window.location.hash = `history`;
      if (arr === this.winners[0]) this.local(`game`, this.history);
      this.local(`winners`, this.winners);
    });
  }
  addHistory (arr, tick) {
    this.history = [];
    for (let obj of arr) {
      this.history.push({name: obj.name, history: obj.history, tick: obj.tick});
    };
    this.history.unshift(tick);
    return this.history;
  }
  local (name, obj) {
    if (name && obj) {
      let str = JSON.stringify(obj);
      Promise.resolve().then(_ => {
        window.localStorage.setItem(name, str);
      });
    };
    if (!obj && name) {
      return Promise.resolve().then(_ => {
        let result = JSON.parse(window.localStorage.getItem(name));
        return result;
      });
    };
  };
  addSlider (param) {
    let main = document.querySelector(`main`);
    let div = document.createElement(`div`);
    div.className = `slider`;
    div.innerHTML = `<input id="slider" type="range" min="5" max="100">`;
    main.appendChild(div);
    div.children[0].addEventListener(`input`, e => {
      game.interval = 105 - e.target.value;
    });
  };
};
