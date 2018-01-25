import {lifeGame, eb} from "./router";

class Life {
  constructor () {
    this.history = [];
    this.interval = 340;
    this.run = false;
  };
  createArr (x, y) {
    let arr = [];
    for (let i = 0; i < y; i++) {
      arr[i] = [];
      for (let j = 0; j < x; j++) {
        arr[i][j] = 0;
      }
    }
    this.currentArr = arr;
    output();
  };
  addHistory (obj) {
    if (JSON.stringify(obj) === JSON.stringify(this.history[this.history.length - 1])) {
      if (this.run) this.stop();
      return;
    };
    this.history.push(obj);
  };
  clearHistory () {
    this.history = [];
  };
  stop () {
    eb.trigger(`play`, this.run = false);
    clearTimeout(this.timer);
  };
  start () {
    if (!this.currentArr) return;
    eb.trigger(`play`, this.run = true);
    let recur = () => {
      this.timer = setTimeout(recur, this.interval);
      this.stepGame();
    };
    this.timer = setTimeout(recur, this.interval);
  };
  stepGame () {
    this.addHistory(this.currentArr);
    this.countGeneration();
    output();
  };
  countGeneration () {
    let arr = this.currentArr;
    let countAround = (arr, i, j) => {
      let count = 0;
      for (let x = i - 1; x <= i + 1; x++) {
        if (!arr[x]) continue;
        for (let y = j - 1; y <= j + 1; y++) {
          if (!arr[x][y]) continue;
          if (x === i && y === j) continue;
          if (arr[x][y] === 1) {
            count++;
          }
        }
      }
      return count;
    };

    let newArr = arr.slice();
    for (let i = 0; i < arr.length; i++) {
      newArr[i] = arr[i].slice();
      for (let j = 0; j < arr[i].length; j++) {
        newArr[i][j] = arr[i][j];
        if (arr[i][j] === 1 && (countAround(arr, i, j) < 2 || countAround(arr, i, j) > 3)) {
          newArr[i][j] = 0;
        }
        if (arr[i][j] === 0 && countAround(arr, i, j) === 3) {
          newArr[i][j] = 1;
        }
      }
    }
    this.currentArr = newArr;
  };
};

document.body.addEventListener(`click`, function (e) {
  if (!(e.target.matches(`#text`) || e.target.matches(`#canvas`) || e.target.closest(`#svg`))) return;
  let field = e.target.closest(`#field`).children[0];
  let coords = field.getBoundingClientRect();
  let cellWidth = coords.width / lifeGame.x;
  let cellHeight = coords.height / lifeGame.y;
  let i = Math.floor((e.clientY - coords.y) / cellHeight);
  let j = Math.floor((e.clientX - coords.x) / cellWidth);
  if (lifeGame.run) lifeGame.stop();
  lifeGame.clearHistory();
  lifeGame.currentArr[i][j] = lifeGame.currentArr[i][j] === 0 ? 1 : 0;
  output();
});

let output = () => {
  session(`lastArray`, lifeGame.currentArr);
  session(`field`, [lifeGame.x, lifeGame.y]);
  eb.trigger(`changeArr`, lifeGame.currentArr);
};

let session = (name, obj) => {
  if (name && obj) {
    let str = JSON.stringify(obj);
    Promise.resolve(str).then(str => {
      window.sessionStorage.setItem(name, str);
    });
  }
  if (name && !obj) {
    return Promise.resolve(name).then(name => {
      if (window.sessionStorage.getItem(name) !== null) {
        return JSON.parse(window.sessionStorage.getItem(name));
      }
    });
  };
};

export {Life, session, output};
