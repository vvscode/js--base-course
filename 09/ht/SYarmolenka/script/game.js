import {field, result} from "./script";
import {Hero} from "./hero";
import {Zombie1} from "./zombie1";
import {Zombie2} from "./zombie2";
import {Thing} from "./thing";
import {Message} from "./message";

export class Game {
  constructor (interval, zone, speed) {
    this.interval = interval;
    this.all = [];
    this.tick = 0;
  }
  init () {
    this.all.push(new Hero(
      this.randomNumber(100, field.width - 100),
      this.randomNumber(100, field.height - 100),
      this.randomNumber(0, 360),
      this.randomNumber(5, 8),
      this.tick));
    field.draw(this.all[0], this.tick);
    this.tick++;
    this.events();
  };
  start () {
    this.timer = setInterval(_ => {
      field.refresh();
      this.addZombie();
      this.addThing();
      this.all.forEach((obj, i, arr) => {
        if (obj.step) obj.step();
        field.draw(obj, this.tick, this.zombieActionZone);
        if (obj.name !== `thing` && obj.name !== `hero`) obj.check(arr[0], _ => this.stop());
        if (obj.name === `thing`) obj.check(arr[0]);
        if (obj.name === `hero`) obj.check(null, field.forseIndicate);
      });
      this.tick++;
    }, this.interval);
  }
  events () {
    document.addEventListener(`keydown`, e => {
      if (e.keyCode < 37 && e.keyCode > 40) return;
      if (!this.run) {
        this.start();
        this.run = `go`;
        return;
      }
      if (this.run === `go`) {
        let hero = this.all[0];
        if (e.keyCode === 39) hero.turn(`right`);
        if (e.keyCode === 37) hero.turn(`left`);
        if (e.keyCode === 38) hero.turn(`up`);
        if (e.keyCode === 40) hero.turn(`down`);
        if (e.keyCode === 27) this.stop();
      };
    });
    field.buttons.addEventListener(`mousedown`, e => {
      if (!e.target.classList.contains(`mobile`)) return;
      e.preventDefault();
      if (!this.run) {
        this.start();
        this.run = `go`;
        return;
      }
      let hero = this.all[0];
      if (e.target.classList.contains(`right`)) hero.turn(`right`);
      if (e.target.classList.contains(`left`)) hero.turn(`left`);
      if (e.target.classList.contains(`up`)) hero.turn(`up`);
      if (e.target.classList.contains(`down`)) hero.turn(`down`);
    });
  };
  stop () {
    this.run = `stop`;
    clearInterval(this.timer);
    new Message(this.tick * this.interval);
    result.addHistory(this.all, this.tick);
  };
  replay () {
    this.play = [];
    Promise.resolve()
      .then(_ => result.local(`game`))
      .then(arr => {
        this.total = arr[0];
        arr.shift();
        let play = () => {
          field.refresh();
          arr.forEach(obj => {
            if (obj.tick === this.tick) {
              let hist = obj.history[0];
              if (obj.name === `hero`) this.play.push(new Hero(hist.x, hist.y, hist.corner, hist.speed, obj.tick));
              if (obj.name === `zombie1`) this.play.push(new Zombie1(hist.x, hist.y, hist.corner, hist.speed, obj.tick));
              if (obj.name === `zombie2`) this.play.push(new Zombie2(hist.x, hist.y, hist.corner, hist.speed, obj.tick));
              if (obj.name === `thing`) this.play.push(new Thing(hist.x, hist.y, obj.tick));
              obj.history.shift();
              this.play[this.play.length - 1].replay = obj.history;
            }
          });
          this.play.forEach(obj => {
            field.draw(obj, this.tick, this.zombieActionZone);
            obj.play();
          });
          this.tick++;
          if (this.tick === this.total) {
            clearInterval(this.timer);
            window.location.hash = `history`;
          };
          this.timer = setTimeout(play, this.interval);
        };
        this.timer = setTimeout(play, this.interval);
      });
  };
  addZombie () {
    let param = [
      this.checkRandomForHero(0, field.width, `x`),
      this.checkRandomForHero(0, field.height, `y`),
      this.randomNumber(0, 360),
      this.randomNumber(1, 5),
      this.tick];
    if (this.tick !== 0 && this.tick % 49 === 0) {
      this.all.push(new Zombie1(...param));
    };
    if (this.tick !== 0 && this.tick % 111 === 0) {
      this.all.push(new Zombie2(...param));
    };
  };
  addThing () {
    if (this.tick !== 0 && this.tick % 189 === 0) {
      this.all.push(new Thing(this.randomNumber(0, field.width), this.randomNumber(0, field.height), this.tick));
    };
  };
  randomNumber (from, to) {
    return Math.round(from + Math.random() * (to - from));
  };
  checkRandomForHero (from, to, axis) {
    let random = this.randomNumber(from, to);
    if (axis === `x`) {
      if (random > (this.all[0].x - 100) && random < (this.all[0].x + 100)) {
        return this.checkRandomForHero(from, to, `x`);
      } else return random;
    };
    if (axis === `y`) {
      if (random > (this.all[0].y - 100) && random < (this.all[0].y + 100)) {
        return this.checkRandomForHero(from, to, `y`);
      } else return random;
    };
  };
};
