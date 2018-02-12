import {game} from "./route";

export class Leaders {
  constructor () {
    Promise.resolve(this.local(`leaders`)).then(res => {
      this.leaderList = res === null ? [] : res;
    });
  };
  newResult (arr) {
    this.leaderList.push(arr);
    this.leaderList.sort((a, b) => b.time - a.time);
    window.location.hash = `history`;
    if (arr === this.leaderList[0] && game.play !== `replay`) this.local(`game`, this.prepareData(game.allObject));
    this.local(`leaders`, this.leaderList);
    this.local(`field`, game.field);
  }
  prepareData (arr) {
    let data = {};
    for (let obj of arr) {
      if (obj.name in data) {
        data[obj.name].push(obj.history);
      } else {
        data[obj.name] = [obj.history];
      }
    }
    return data;
  };
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
  showTable () {
    this.main = document.createElement(`main`);
    this.main.id = `leaders`;
    this.main.innerHTML = `
    <div id="list">
      <h1>Best Results</h1>
    </div>`;
    document.body.appendChild(this.main);
    let list = document.querySelector(`#list`);
    Promise.resolve().then(_ => {
      this.leaderList.forEach((obj, i) => {
        let div = document.createElement(`div`);
        div.innerText = `${obj.name}:
        ${obj.time / 1000} seconds`;
        if (i === 0) div.className = `leader`;
        list.appendChild(div);
      });
    });
    this.main.addEventListener(`click`, e => {
      if (!e.target.matches(`.leader`)) return;
      window.location.hash = `play`;
    });
  };
  deleteTable () {
    this.main.parentNode.removeChild(this.main);
  }
};
