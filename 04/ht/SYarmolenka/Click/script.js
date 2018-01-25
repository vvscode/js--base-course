function getPos (obj) {
  let coor = obj.getBoundingClientRect();
  return [coor.left + coor.width / 2, coor.top + coor.height / 2, coor];
};

document.addEventListener(`click`, function (e) {
  if (e.target.id !== `btn`) return;
  if (e.target.innerText === `Go`) {
    e.target.innerText = `Click`;
    movie(e);
    run(true);
  } else {
    e.target.innerText = `Go`;
    run(false);
  }
});

function checkDuration (posC, posB) {
  if (posC[0] > posB[0] - 10 && posC[0] < posB[0] + 10) {
    if (posC[1] < posB[1]) return [0, 1];
    if (posC[1] > posB[1]) return [0, -1];
  }
  if (posC[1] > posB[1] - 5 && posC[1] < posB[1] + 5) {
    if (posC[0] < posB[0]) return [1, 0];
    if (posC[0] > posB[0]) return [-1, 0];
  }
  if (posC[0] > posB[0] && posC[1] > posB[1]) return [-1, -1];
  if (posC[0] < posB[0] && posC[1] < posB[1]) return [1, 1];
  if (posC[0] > posB[0] && posC[1] < posB[1]) return [-1, 1];
  if (posC[0] < posB[0] && posC[1] > posB[1]) return [1, -1];
};

function checkLimit (x, y, elem) {
  let div = document.querySelector(`#border`).getBoundingClientRect();
  if (x < div.left) x = div.left + 2 * elem.width;
  if (x + elem.width > div.right) x = div.right - 3 * elem.width;
  if (y < div.top) y = div.top + 2 * elem.height;
  if (y + elem.height > div.bottom) y = div.bottom - 3 * elem.height;
  return [x, y];
};

function offset (duration, elem) {
  let btn = getPos(elem);
  let top = btn[2].top + duration[1] * btn[2].height;
  let left = btn[2].left + duration[0] * btn[2].width;
  let limit = checkLimit(left, top, btn[2]);
  elem.style.top = limit[1] + `px`;
  elem.style.left = limit[0] + `px`;
};

function movie (e) {
  if (e.target.id !== `btn`) return;
  offset(checkDuration([e.clientX, e.clientY], getPos(e.target)), e.target);
};

function run (turn) {
  turn ? document.addEventListener(`mouseover`, movie) : document.removeEventListener(`mouseover`, movie);
};
