import { getCoordinatesByName } from './services';
class Search {
  constructor(element, eventBus) {
    this.eventBus = eventBus;
    this.element = element;
    this.searchbox = document.createElement('input');
    this.searchbox.type = 'text';
    this.searchbox.id = 'search';
    this.element.appendChild(this.searchbox);
    this.addEvent();
  }
  addEvent() {
    this.element.addEventListener('keydown', () => {
      if (event.key === 'Enter') {
        this.searchPlace(this.searchbox.value);
        this.searchbox.value = '';
      }
    });
  }
  searchPlace(address) {
    let coordinates = getCoordinatesByName(address).then((data) => {
      if (data[3] === 'OK') {
        this.eventBus.trigger('map:centerMoved', [data[0], data[1]]);
        this.eventBus.trigger('search:success', data[2]);
      }
    });
  }
}
export { Search };
