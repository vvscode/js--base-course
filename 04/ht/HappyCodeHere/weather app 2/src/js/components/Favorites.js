
class Favorites {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.eventBus.on('favorites:add', onFavoritesAdd);
    this.eventBus.on('favorites:remove', onFavoritesRemove);
    this.eventBus.on('coordinates:changed', onCoordinatesChange);
  }

  onFavoritesAdd(coords) {
    // - onFavoritesRemove / onFavoritesAdd - обновить список + сохранитьв ls + renderFavorites

    this.renderFavorites();
  }

  onFavoritesRemove(coords) {

    this.renderFavorites();
  }

  onCoordinatesChange(coords) {
    // - onCoordinatesChange - проверить координаты в списке избранного и сгенерировать событие `favorites:is-active`, (true|false)
    this.eventBus.trigger('favorites:is-active', true);
  }

  renderFavorites() {
    // - renderFavorites - сгенерировать DOM
    const favoritesBlock = document.querySelector(this.element);
  }
}

export default Favorites;
