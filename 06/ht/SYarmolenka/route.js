document.body.addEventListener(`click`, function (e) {
  if (!e.target.matches(`.route`)) return;
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
  change: function (oldHash, newHash) {
    let iroute = route.interpret(oldHash);
    if (!iroute) return console.error(`interpret(oldHash) не нашёл route!`);
    if (typeof iroute.onLeave === `function`) {
      Promise.resolve(iroute.param).then(iroute.onLeave);
    }
    iroute = route.interpret(newHash);
    if (!iroute) return console.error(`interpret(newHash) не нашёл route!`);
    if (typeof iroute.onEnter === `function`) {
      Promise.resolve(iroute.param).then(iroute.onEnter);
    }
    if (typeof iroute.onBefore === `function`) {
      Promise.resolve(iroute.param).then(iroute.onBefore);
    }
  }
};
let allHideElem =document.querySelectorAll(`.hide`);
console.log(allHideElem);
let about = document.querySelector(`.about`);
let author = document.querySelector(`.author`);
route.routes = [
  {
    name: `about`,
    match: `About`,
    onEnter: function () {
      about.innerText = `
        Данное веб-приложение поможет вам узнать погоду в любом месте и по всему миру.

        В верхней части вы увидите кнопки перехода по приложению (About, Main, Author), переключатель режима HTTP-запроса (с помощью объекта XMLHttpRequest или метода fetch) и окно поиска объектов на карте.
        В центральной части отображается Яндекс карта. Перемещение по карте производится с помощью мыши с зажатой левой кнопкой, зумирование - колесо мыши или палзунок в левой части экрана. Кнопка "звездочка" - добавляет населенный пункт в блок "избранное".
        В нижней части приложения вы увидите три блока - "история поиска", прогноз погоды и "избранное". Блок "история поиска" отображает список последних пяти найденных населенных пунктов. Блок прогноза погоды отображает населенный пункт, расположенный в центре карты и текущую погоду этого населенного пунка. Блок "избранное" отображает населенные пункты, отмеченные пользователем.
        Также поддерживается поиск города через url, для этого необходимо в конце url добавить строку "#city(любой символ)название_города", для примера "#city&Minsk". Это сработает аналогичным образом, как и через окно поиска объектов на карте.

        Спасибо компаниям Yandex и Google за предоставление API maps и данных геолокации, а также сайту darksky.net за предоставление данных прогноза погоды.
      `;
    },
    onLeave: function () {
      about.innerHTML = ``;
    }
  },
  {
    name: `author`,
    match: `Author`,
    onEnter: function () {
      author.innerHTML = `
        <span>Автор: Сергей Ермоленко</span>
        <img src="pics/ava.jpg" alt="">
        <ul>
          <li>
            <a href="https://github.com/SYarmolenka" class="gh"></a>
          </li>
          <li>
            <a href="https://www.facebook.com/jibickih" class="fb"></a>
          </li>
          <li>
            <a href="https://vvscode.slack.com/messages/D7YRE6JV9/" class="sl"></a>
          </li>
        </ul>
      `;
    },
    onLeave: function () {
      author.innerHTML = ``;
    }
  },
{
  name: `cityName`,
  match: /city\W(\b\w+\b)/,
  onEnter: function (arr) {
    requestCoords (arr[1]);
  }
},
  {
    name: `main`,
    match: /(-?\d+.?\d*),(-?\d+.?\d*)&zoom=(\d+)/,
    onEnter: function(arr) {
      stage.coords = [+arr[1], +arr[2]];
      stage.zoom = +arr[3];
      allHideElem.forEach(function (elem) {
        elem.classList.remove(`hide`);
      });
      if (!myMap) {
        ymaps.ready(init).then(function () {
          requestWeather();
          requestCityName();
        });
      } else {
        refreshMap();
      }
    },
    onLeave: function () {
      allHideElem.forEach(function (elem) {
        elem.classList.add(`hide`);
      });
    }
  },
  {
    name: `index`,
    match: function (hash) { return hash === ``; },
    onEnter: function () {
      fetch(`https://api.userinfo.io/userinfos`, {method: `GET`}).then(function (response) {
        return response.text();
      }, function (response) {alert(`Ошибка ${response.status}`)}).then(function (result) {
        let data = JSON.parse(result);
        stage.coords = [data.position.latitude, data.position.longitude];
        stage.zoom = 10;
        refreshCoords();
      });
    }
  }
];

route.start();
