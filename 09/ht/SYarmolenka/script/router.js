export class Router {
  constructor (route) {
    this.route = route;
  };
  interpret (hash) {
    let result;
    this.route.forEach(iroute => {
      if (typeof iroute.match === `string` && iroute.match === hash) result = iroute;
      if (typeof iroute.match === `object` && iroute.match instanceof RegExp && hash.match(iroute.match) !== null) {
        iroute.param = hash.match(iroute.match);
        result = iroute;
      };
      if (typeof iroute.match === `function` && iroute.match(hash)) {
        iroute.param = hash;
        result = iroute;
      };
    });
    return result;
  };
  change (oldHash, newHash) {
    let iroute = this.interpret(oldHash);
    if (!iroute) {
      console.error(`interpret(oldHash) didn't find iroute!`);
      iroute = this.interpret(``);
    };
    if (typeof iroute.onLeave === `function`) {
      Promise.resolve(iroute.param).then(iroute.onLeave);
    };
    iroute = this.interpret(newHash);
    if (!iroute) {
      console.error(`interpret(newHash) didn't find iroute!`);
      iroute = this.interpret(``);
    };
    if (typeof iroute.onEnter === `function`) {
      Promise.resolve(iroute.param).then(iroute.onEnter);
    }
    if (typeof iroute.onBefore === `function`) {
      Promise.resolve(iroute.param).then(iroute.onBefore);
    }
  };
  start () {
    window.addEventListener(`hashchange`, e => {
      let oldHash = e.oldURL.match(/#(.+)/);
      let newHash = e.newURL.match(/#(.+)/);
      if (oldHash !== null) { oldHash = oldHash[1]; } else { oldHash = ``; };
      if (newHash !== null) { newHash = newHash[1]; } else { newHash = ``; };
      this.change.call(this, oldHash, newHash);
    });
    this.change(``, window.location.hash.slice(1));
  };
};
