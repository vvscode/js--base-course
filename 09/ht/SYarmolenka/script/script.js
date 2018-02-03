import {hero} from "./route";

let randomNumber = (from, to) => {
  return Math.round(from + Math.random() * (to - from));
};

let checkRandomForHero = (from, to, axis) => {
  let random = randomNumber(from, to);
  if (axis === `x`) {
    if (random > (hero.x - 100) && random < (hero.x + 100)) {
      return checkRandomForHero(from, to, `x`);
    } else return random;
  };
  if (axis === `y`) {
    if (random > (hero.y - 100) && random < (hero.y + 100)) {
      return checkRandomForHero(from, to, `y`);
    } else return random;
  };
};

let getCornerByPoints = (x1, x2, y1, y2) => {
  let corner;
  let dX = x1 - x2;
  let dY = y1 - y2;
  let atg = Math.abs(Math.atan(dY / dX) * 180 / Math.PI);
  if (dX <= 0 && dY >= 0) corner = atg;
  if (dX > 0 && dY >= 0) corner = 180 - atg;
  if (dX >= 0 && dY < 0) corner = 180 + atg;
  if (dX < 0 && dY < 0) corner = 360 - atg;
  return corner;
};

export {getCornerByPoints, checkRandomForHero, randomNumber};
