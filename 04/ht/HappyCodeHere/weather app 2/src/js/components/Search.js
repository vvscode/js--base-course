// 6. Сделать форму поиска
// - создать конструтор (eventBus, element)
//   - при сабмите изменить ссылку и очистить форма

class Search {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;


  }

  renderSearch() {
    const search = document.querySelector(this.element);
  }
}

export default Search;
