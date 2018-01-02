document.body.addEventListener(`click`, function (e) {
  if (!e.target.matches(`a`)) return;
  e.preventDefault();
  if (e.target.innerText === `Main`) {
    window.location.hash = ``;
    return;
  }
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
let request = document.querySelector(`.head.request`);
let search = document.querySelector(`.head.search`);
let main = document.querySelector(`main`);
let footer = document.querySelector(`footer`);
route.routes = [
  {
    name: `about`,
    match: `About`,
    onEnter: function() {
    }
  },
  {
    name: `athor`,
    match: `Athor`,
    onEnter: function() {
    }
  },
{
  name: `index`,
  match: ``,
  onEnter: function() {
    fetch(`https://api.userinfo.io/userinfos`, {method: `GET`}).then(function (response) {
      return response.text();
    }, function (response) {alert(`Ошибка ${response.status}`)}).then(function (result) {
      let data = JSON.parse(result);
      stage.coords = [data.position.latitude, data.position.longitude];
      stage.zoom = 10;
      refreshCoords();
    });
  }
},
  {
    name: `main`,
    match: /(-?\d+.?\d*),(-?\d+.?\d*)&zoom=(\d+)/,
    onEnter: function(arr) {
      stage.coords = [+arr[1], +arr[2]];
      stage.zoom = +arr[3];
      request.style.opacity = `1`;
      search.classList.remove(`hide`);
      main.classList.remove(`hide`);
      footer.classList.remove(`hide`);
      if (!myMap) {
        ymaps.ready(init).then(function () {
          requestWeather();
          requestCityName();
        });
      } else {
        refreshMap();
      }
    },
    onBefore: function () {
      
    },
    onLeave: function () {
      request.style.opacity = `0`;
      search.classList.add(`hide`);
      main.classList.add(`hide`);
      footer.classList.add(`hide`);
    }
  },
  // {
  //   name: `about`,
  //   match: ``,
  //   onEnter: function() {
  //
  //   },
  //   onLeave: function() {
  //
  //   }
  // },
  // {
  //   name: `author`,
  //   match: ``,
  //   onEnter: function() {
  //
  //   },
  //   onLeave: function() {
  //
  //   }
  // }
];

route.start();
