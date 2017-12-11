class Search {
  handlerEvent() {
    let input = document.querySelector(".search__input");
    document.querySelector(".right").addEventListener("submit", ev => {
      ev.preventDefault();
      if (!input.value) {
        return;
      }
      window.location.hash = `city=${input.value}`;
      input.value = "";
    });
  }
}

export default Search;
