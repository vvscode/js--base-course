// 6. Сделать форму поиска
// - создать конструтор (eventBus, element)
//   - при сабмите изменить ссылку и очистить форма

class Search {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector('header .search input');
    const value = input.value;
    window.location.hash = `city=${value}`;
    // value.innerHTML = '';
  }

  renderSearch() {
    const search = document.querySelector(this.element);
    search.innerHTML = `
      <form>
        <div class="col-md-offset-3 col-md-3">
          <div class="form-group search">
            <input type="text" class="form-control" placeholder="Enter a city..." autofocus>
          </div>
        </div>
        <div class="col-md-2">
          <button type="submit" class="btn btn-warning">Get forecast!</button>
        </div>
      </form>
    `
    search.addEventListener('submit', this.handleSubmit);

  }
}

export default Search;
