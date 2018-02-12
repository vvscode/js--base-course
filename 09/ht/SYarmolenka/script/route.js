import {Header} from "./header";
import {Field} from "./field";
import {Game} from "./game";
import {EventBus} from "./eb";
import {Hero} from "./hero";
import {randomNumber} from "./script";
import {Leaders} from "./leaders";

let route = {
  routes: [],
  interpret: function (hash) {
    let result;
    this.routes.forEach(function (iroute) {
      if (typeof iroute.match === `string` && iroute.match === hash) {
        result = iroute;
      }
      if (typeof iroute.match === `object` && iroute.match instanceof RegExp && hash.match(iroute.match) !== null) {
        iroute.param = hash.match(iroute.match);
        result = iroute;
      }
      if (typeof iroute.match === `function` && iroute.match(hash)) {
        route.param = hash;
        result = iroute;
      }
    });

    return result;
  },
  start: function () {
    window.addEventListener(`hashchange`, function (e) {
      let oldHash = e.oldURL.match(/#(.+)/);
      let newHash = e.newURL.match(/#(.+)/);
      if (oldHash !== null) { oldHash = oldHash[1]; } else { oldHash = ``; };
      if (newHash !== null) { newHash = newHash[1]; } else { newHash = ``; };
      route.change(oldHash, newHash);
    });
    this.change(``, window.location.hash.slice(1));
  },
  change: function (oldHash, newHash) {
    let iroute = route.interpret(oldHash);
    if (!iroute) {
      console.error(`interpret(oldHash) не нашёл route!`);
      iroute = route.interpret(``);
    };
    if (typeof iroute.onLeave === `function`) {
      Promise.resolve(iroute.param).then(iroute.onLeave);
    }
    iroute = route.interpret(newHash);
    if (!iroute) {
      console.error(`interpret(newHash) не нашёл route!`);
      iroute = route.interpret(``);
    };
    this.position = newHash;
    if (typeof iroute.onEnter === `function`) {
      Promise.resolve(iroute.param).then(iroute.onEnter);
    }
    if (typeof iroute.onBefore === `function`) {
      Promise.resolve(iroute.param).then(iroute.onBefore);
    }
  }
};

new Header();
export let eb = new EventBus();
export let field, game, hero, leaders;
leaders = new Leaders();
game = new Game(75, 100, 5);
let run, run2, div;

route.routes = [
  {
    name: `index`,
    match: function (hash) { return hash === ``; },
    onEnter: function () {
      window.location.hash = `main`;
    }
  },
  {
    name: `main`,
    match: `main`,
    onEnter () {
      div = document.createElement(`div`);
      div.innerText = `Description and rules of the game`
      document.body.appendChild(div);
    },
    onLeave: function () {
      document.body.removeChild(div);
    }
  },
  {
    name: `game`,
    match: `game`,
    onEnter: function () {
      field = new Field();
      hero = new Hero([randomNumber(0, 1000), randomNumber(0, 500), randomNumber(0, 360), 6]);
      document.addEventListener(`keydown`, run = (e) => {
        if (e.keyCode < 37 || e.keyCode > 40) return;
        if (!game.run) {
          game.start();
          document.removeEventListener(`keydown`, run);
        };
      });
      document.body.addEventListener(`click`, run2 = (e) => {
        if (!e.target.classList.contains(`mobile`)) return;
        if (!game.run) {
          game.start();
          document.removeEventListener(`click`, run2);
        };
      });
    },
    onLeave: function () {
      if (game.run === 1) game.stop();
      document.removeEventListener(`keydown`, run);
      document.body.removeEventListener(`click`, run2);
      field.delete();
      eb.off(`tick`);
      game.allObject.forEach(obj => { obj = null; });
      field = null;
      hero = null;
    }
  },
  {
    name: `history`,
    match: `history`,
    onEnter: function () {
      leaders.showTable();
    },
    onLeave: function () {
      leaders.deleteTable();
    }
  },
  {
    name: `play`,
    match: `play`,
    onEnter: function () {
      Promise.resolve(leaders.local(`field`)).then(arr => {
        field = new Field(arr[0], arr[1]);
      });
      Promise.resolve(leaders.local(`game`)).then(obj => {
        game.replay = obj;
        let first = game.replay.hero[0][0];
        hero = new Hero([first.x, first.y, first.corner, first.speed, 1]);
        game.replay.hero[0].shift();
        hero.history = game.replay.hero[0];
      });
    },
    onBefore: function () {
      game.play = `replay`;
      if (!game.run) game.start();
    },
    onLeave: function () {
      game.stop();
      eb.off(`tick`);
      field.delete();
      game.allReplayObject.forEach(obj => { obj = null; });
      game.play = undefined;
      field = null;
      hero = null;
    }
  }
];

route.start();
