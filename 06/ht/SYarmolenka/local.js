let history = document.querySelector(`#history`);
let favorite = document.querySelector(`#favorite`);
let session = window.sessionStorage.getItem('history');
let local = window.localStorage.getItem('favorite');
history.innerHTML = (session !== null) ? session : `История поиска:`;
favorite.innerHTML = (local !== null) ? local : `Избранное:`;

document.body.addEventListener(`click`, function (e) {
  if (!e.target.closest(`#star`)) return;
  e.preventDefault();
  if (stage.city && stage.city !== `None`) {
    deleteSameFavorite(stage.city);
    addFavorite(stage.city);
    checkQuantity(document.querySelectorAll(`.favorite`));
  }
});
document.body.addEventListener(`click`, function (e) {
  if (!e.target.matches(`.close`)) return;
  e.preventDefault();
  let elem = e.target.parentNode;
  elem.parentNode.removeChild(elem);
  window.localStorage.setItem('favorite', favorite.innerHTML);
});

document.body.addEventListener(`click`, function (e) {
  if (e.target.closest(`.favorite`) && !e.target.matches(`.close`)) {
    e.preventDefault();
    requestCoords(e.target.closest(`.favorite`).innerHTML.match(/<span>(.+?)<\/span>/)[1]);
  }
  if (e.target.matches(`.history`)) {
    e.preventDefault();
    requestCoords(e.target.innerText);
  }
});

function addFavorite (city) {
  let div = document.createElement(`div`);
  div.classList.add(`favorite`);
  div.innerHTML = `<span>${city}</span> <button class="close">&#215;</button>`;
  favorite.insertBefore(div, favorite.firstElementChild);
  window.localStorage.setItem('favorite', favorite.innerHTML);
};

function checkQuantity (elements) {
  if (elements.length > 5) {
    let last = elements[elements.length - 1];
    last.parentNode.removeChild(last);
  }
};

function deleteSameFavorite (str) {
  let favorites = document.querySelectorAll(`.favorite`);
  if (favorites.length > 0) {
    favorites.findIndex = [].findIndex;
    let index = favorites.findIndex(function (favorite) {
      let result = favorite.innerHTML.match(/<span>(.+?)<\/span>/)[1];
      if (result === str) return 1;
    });
    if (index !== -1) {
      favorites[index].parentNode.removeChild(favorites[index]);
    };
  }
};

function addCityInHistory (city) {
  let histories = document.querySelectorAll(`.history`);
  let div = document.createElement(`div`);
  if (histories.length > 0) {
    histories.findIndex = [].findIndex;
    let index = histories.findIndex(function (elem) {
      if (elem.innerText === city) return 1;
    });
    if (index !== -1) {
      histories[index].parentNode.removeChild(histories[index]);
    };
  }
  div.classList.add(`history`);
  div.innerText = city;
  history.insertBefore(div, history.firstElementChild);
  checkQuantity(document.querySelectorAll(`.history`));
  window.sessionStorage.setItem('history', history.innerHTML);
};
