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
  change: function(oldHash, newHash) {
    let iroute = route.interpret(oldHash);
    if (!iroute) return console.error(`The interpret(oldHash) didn't find a route!`);
    if (typeof iroute.onLeave === `function`) {
      Promise.resolve(iroute.param).then(iroute.onLeave);
    }
    iroute = route.interpret(newHash);
    if (!iroute) return console.error(`The interpret(newHash) didn't find a route!`);
    if (typeof iroute.onEnter === `function`) {
      Promise.resolve(iroute.param).then(iroute.onEnter);
    }
    if (typeof iroute.onBefore === `function`) {
      Promise.resolve(iroute.param).then(iroute.onBefore);
    }
  }
};
