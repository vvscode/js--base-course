class Search {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const inputSearch = document.querySelector('header .search input');
    const value = inputSearch.value;
    window.location.hash = `city=${value}`;
    value.innerHTML = '';
  }

  renderSearch() {
    const search = document.querySelector(this.element);

    search.outerHTML = `
      <div class="search">
        <form>
          <div class="row">
            <div class="form-group col-md-8">
              <input type="text" class="form-control" placeholder="Enter a city..." autofocus>
            </div>
            <div class="col-md-4">
              <button type="submit" class="btn btn-warning">Get forecast!</button>
            </div>
          </div>
        </form>
      </div>
    `
    
    const formSearch = document.querySelector(`${this.element} form`);
    formSearch.addEventListener('submit', this.handleSubmit);
  }
}

export default Search;
