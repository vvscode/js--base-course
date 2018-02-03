import {eb, field} from "./route";
import {checkRandomForHero, randomNumber} from "./script";
import {Zombie1} from "./zombie1";
import {Zombie2} from "./zombie2";
import {Message} from "./message";

class Game {
  constructor (interval, zone, speed) {
    this.interval = interval;
    this.zombieActionZone = zone;
    this.zombieTurboSpeed = speed;
    this.allObject = [];
    this.allReplayObject = [];
    this.tick = 0;
  }
  refresh () {
    field.ctx.clearRect(0, 0, field.width, field.height);
    eb.trigger(`tick`);
    this.tick++;
  }
  start () {
    this.time = Date.now();
    let run = _ => {
      this.timer = setTimeout(run, this.interval);
      this.refresh();
    };
    this.timer = setTimeout(run, this.interval);
    this.run = 1;
    eb.on(`tick`, this.addZombie.bind(this));
  };
  stop () {
    clearTimeout(this.timer);
    eb.off(`tick`);
    this.run = 0;
    this.tick = 0;
    if (this.play !== `replay`) {
      new Message(Date.now() - this.time);
      this.field = [field.width, field.height];
    };
  };
  addZombie () {
    if (this.tick !== 0 && this.tick % 60 === 0) {
      if (this.play === `replay`) {
        let first = this.replay.zombie1[0][0];
        this.allReplayObject.push(new Zombie1([first.x, first.y, first.corner, first.speed]));
        this.replay.zombie1.shift();
      } else {
        this.allObject.push(new Zombie1([checkRandomForHero(0, field.width, `x`), checkRandomForHero(0, field.height, `y`), randomNumber(0, 360), randomNumber(2, 10)]));
      };
    };
    if (this.tick !== 0 && this.tick % 110 === 0) {
      if (this.play === `replay`) {
        let first = this.replay.zombie2[0][0];
        this.allReplayObject.push(new Zombie2([first.x, first.y, first.corner, first.speed]));
        this.replay.zombie2.shift();
      } else {
        this.allObject.push(new Zombie2([checkRandomForHero(0, field.width, `x`), checkRandomForHero(0, field.height, `y`), randomNumber(0, 360), randomNumber(2, 6)]));
      }
    };
  };
}

export {Game};
