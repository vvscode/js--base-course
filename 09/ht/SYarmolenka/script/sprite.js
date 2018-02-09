import {promises} from "./script";

export class Sprite {
  add (name, url, amount, position) {
    promises.push(new Promise((resolve, reject) => {
      this[name] = {img: new Image(), amount: amount, position: position};
      this[name].img.src = url;
      this[name].img.onload = e => {
        this[name].width = e.target.width;
        this[name].height = e.target.height;
        this[name].spriteWidth = e.target.width / amount;
        this[name].spriteHeight = e.target.height / this[name].position;
        resolve();
      };
    }));
  };
  coords (name, direction, count) {
    if (direction === undefined && count === undefined) {
      return [this[name].spriteWidth, this[name].spriteHeight];
    } else {
      let posX = count % this[name].amount * this[name].spriteWidth;
      let posY;
      if (direction === `none`) {
        posY = 0;
        posX = 3 * this[name].spriteWidth;
      }
      if (direction === `up` || direction === `none`) posY = 0;
      if (direction === `left`) posY = this[name].spriteHeight;
      if (direction === `down`) posY = this[name].spriteHeight * 2;
      if (direction === `right`) posY = this[name].spriteHeight * 3;
      return [this[name].img, posX, posY, this[name].spriteWidth, this[name].spriteHeight];
    }
  }
};
