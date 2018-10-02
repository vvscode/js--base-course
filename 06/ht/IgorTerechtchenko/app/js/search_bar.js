export default function SearchBar(element, bus) {
  this.bus = bus;
  this.element = element;  
  this.searchBarWrapper = document.createElement('div');
  this.searchBarWrapper.className = 'searchBarWrapper';
}

SearchBar.prototype = {
  render: function() {
    var searchField = document.createElement('input');
    searchField.type = 'text';
    searchField.className = 'searchField';
    searchField.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') {
        this.bus.trigger('searchBarEnter', searchField.value);
        searchField.value = '';
      }
    });
    this.element.appendChild(searchField);
  }
}
