document.body.addEventListener(`click`, function (e) {
  if (!e.target.matches(`a`)) return;
  e.preventDefault();
  window.location.hash = e.target.innerText;
});
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
        if (oldHash !== null) {oldHash = oldHash[1]} else {oldHash = ``};
        if (newHash !== null) {newHash = newHash[1]} else {newHash = ``};
        route.change(oldHash, newHash);
    });
    this.change(``, window.location.hash.slice(1));
  },
  change: function () {
    let iroute = route.interpret(arguments[0]);
    if (typeof iroute.onLeave === `function`) {
      Promise.resolve(iroute.param).then(iroute.onLeave);
    }
    iroute = route.interpret(arguments[1]);
    if (typeof iroute.onEnter === `function`) {
      Promise.resolve(iroute.param).then(iroute.onEnter);
    }
    if (typeof iroute.onBefore === `function`) {
      Promise.resolve(iroute.param).then(iroute.onBefore);
    }
  }
};

function Figure(figure, match) {
  this.name = figure;
  this.match = match;
}
Figure.prototype.onEnter = function (arr) {
  let div = document.querySelector(`.${arr[1]}.${arr[2]}`);
  div.style.display = ``;
}
Figure.prototype.onBefore = function (arr) {
  let div = document.querySelector(`.${arr[1]}.${arr[2]}`);
  setTimeout(function (div) {div.style.display = `none`}, 250, div);
  setTimeout(function (div) {div.style.display = ``}, 300, div);
}
Figure.prototype.onLeave = function (arr) {
  let div = document.querySelector(`.${arr[1]}.${arr[2]}`);
  div.style.display = `none`;
}
route.routes = [{
    name: `index`,
    match: ``,
    onEnter: function () {
      let divs = document.querySelectorAll(`div`);
      divs.forEach(function (div) {
        div.style.display = ``;
      })
    },
    onLeave: function () {
      let divs = document.querySelectorAll(`div`);
      divs.forEach(function (div) {
        div.style.display = `none`;
      })
    }
  },
  new Figure(`square`, /(square) is (.+)/),
  new Figure(`circle`, /(circle) is (.+)/)
];

route.start();
