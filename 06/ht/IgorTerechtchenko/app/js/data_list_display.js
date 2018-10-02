export default function DataListDisplay(el, bus, name, allowRemoval=false) {
  this.el = el;
  this.bus = bus;
  this.name = name;
  this.allowRemoval = allowRemoval;
  this.dataListDisplayWrapper = document.createElement('div');
  this.dataListDisplayWrapper.className = 'dataListDisplayWrapper' + this.name;
}

DataListDisplay.prototype = {
  render: function() {
    this.dataListDisplayWrapper.innerHTML += '<h2>' + this.name + '</h2>';
    this.listEl = document.createElement('ul');
    this.listEl.className = 'listEl';
    this.dataListDisplayWrapper.appendChild(this.listEl);
    this.el.appendChild(this.dataListDisplayWrapper);
    this.addEventListeners();
  },
  addItem: function(name, value) {
    var listItem = document.createElement('li');
    listItem.innerHTML = name;
    listItem.setAttribute('data-value', JSON.stringify(value));
    listItem.className = this.name + 'ListItem';
    if(this.allowRemoval) {
      var button = document.createElement('button');
      button.innerHTML = 'X';
      button.className = 'removeListItem';
      listItem.appendChild(button);
    }
    this.listEl.appendChild(listItem);
  },
  addEventListeners: function() {
    this.dataListDisplayWrapper.addEventListener('click', e => {
      if(e.target.tagName.toLowerCase() === 'button') {
        this.bus.trigger('removeStorageItem', e.target.parentElement.innerHTML.split('<')[0]);
        this.listEl.removeChild(e.target.parentElement);
      }
      if(e.target.tagName.toLowerCase() === 'li') {
        console.log(JSON.parse(e.target.dataset.value));
        this.bus.trigger('clickStorageItem', JSON.parse(e.target.dataset.value));
      }
    });
  },
  clear: function() {
    this.listEl.innerHTML = '';
  },
}
