
class Favorites {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.favorites = [];


    this.onFavoritesAdd = this.onFavoritesAdd.bind(this);
    this.onFavoritesRemove = this.onFavoritesRemove.bind(this);
    this.onCoordinatesChange = this.onCoordinatesChange.bind(this);

    this.eventBus.on('favorites:add', this.onFavoritesAdd);
    this.eventBus.on('favorites:remove', this.onFavoritesRemove);
    this.eventBus.on('coordinates:changed', this.onCoordinatesChange);

    this.loadFavoritesFromStorage(localStorage);
  }

  loadFavoritesFromStorage(storage) {
    const savedFavorites = storage.getItem('forecast-favorites');
    this.favorites = JSON.parse(savedFavorites) || [];
  }

  saveFavoritesToStorage(storage) {
    storage.setItem('forecast-favorites', JSON.stringify(this.favorites));
  }

  onFavoritesAdd(coords) {
    console.error(coords);
    this.favorites.push(coords);
    this.saveFavoritesToStorage(localStorage);
    this.renderFavorites();
  }

  onFavoritesRemove(coords) {
    // как то удалить
    this.favorites.map((item, i) => {
      if (item.lat === coords.lat) {
        this.favorites.splice(i, 1);
      }
    })
    if (this.favorites.length === 5) {
      this.favorites = [];
    }
    this.saveFavoritesToStorage(localStorage);
    this.renderFavorites();
  }

  onCoordinatesChange(coords) {
    console.error(coords);
    // - onCoordinatesChange - проверить координаты в списке избранного и сгенерировать событие `favorites:is-active`, (true|false)

    this.favorites.map((item, i) => {
      if (item.lat === coords.lat) {
        this.eventBus.trigger('favorites:is-active', true);
      }
      else {
        this.eventBus.trigger('favorites:is-active', false);
      }
    })
  }

  renderFavorites() {
    const favoritesBlock = document.querySelector(this.element);

    const favoritesTitle = document.createElement('h3');
    favoritesTitle.innerHTML = 'Your favorites';

    const favoritesUl = document.createElement('ul');
    favoritesUl.classList.add('list-group');

    this.favorites.map((item, i) => {
      const { lat, lng } = item;
      favoritesUl.innerHTML += `<li class="list-group-item"><a href="#coordinates?lat=${lat}&lng=${lng}">${item.lat} / ${item.lng}</a></li>`;
    });

    favoritesBlock.innerHTML = `${favoritesTitle.outerHTML} ${favoritesUl.outerHTML}`;

    // window.addEventListener('hashchange', () => {
    //   let data = {};
    //
    //   window.location.hash.split('?')[1].split('&').map(item => {
    //     let items = item.split('=');
    //     data[items[0]] = items[1];
    //   })
    //
    //   console.log(data);
    //
    //
    //   this.onCoordinatesChange(data)
    // })
  }
}

export default Favorites;
