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
    this.favorites.push(coords);
    this.onCoordinatesChange(coords);
    this.saveFavoritesToStorage(localStorage);
    this.renderFavorites();
  }

  onFavoritesRemove(coords) {
    this.favorites.map((item, i) => {
      if (item.lat === coords.lat) {
        this.favorites.splice(i, 1);
      }
    })
    if (this.favorites.length > 5) {
      this.favorites = [];
    }

    this.eventBus.trigger('star:is-active', false);
    this.saveFavoritesToStorage(localStorage);
    this.renderFavorites();
  }

  onCoordinatesChange(coords) {
    this.favorites.map(item => {
      if (item.lat === coords.lat) {
        this.eventBus.trigger('star:is-active', true);
      }
    })
  }

  renderFavorites() {
    const favoritesBlock = document.querySelector(this.element);

    const favoritesTitle = document.createElement('h3');
    favoritesTitle.innerHTML = 'Your favorites:';

    const favoritesUl = document.createElement('ul');
    favoritesUl.classList.add('list-group');

    this.favorites.map(item => {
      const { lat, lng } = item;
      favoritesUl.innerHTML += `<li class="list-group-item"><a href="#coordinates?lat=${lat}&lng=${lng}">${(+lat).toFixed(2)} / ${(+lng).toFixed(2)}</a></li>`;
    });

    favoritesBlock.innerHTML = `${favoritesTitle.outerHTML} ${favoritesUl.outerHTML}`;
  }
}

export default Favorites;
