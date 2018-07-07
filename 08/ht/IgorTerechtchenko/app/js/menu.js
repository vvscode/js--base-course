export default function Menu(element, eventBus, routes) {
  this.routes = routes; 
  this.eventBus = eventBus;
  this.element = element;
  this.menuEl = document.createElement('div');
}

Menu.prototype = {
  render: function() {
    var tmp;
    for(var key in this.routes) {
      tmp = document.createElement('button'); 
      tmp.setAttribute('class', 'link:' + key);
      tmp.innerHTML = this.routes[key];
      this.menuEl.appendChild(tmp);
    }
    this.element.appendChild(this.menuEl);
  },
  addListener: function() {
    this.menuEl.addEventListener('click', function(e) {
      if(e.target.tagName.toLowerCase() === 'button') {
        var newHash = e.target.getAttribute('class').split(':')[1];
        window.location.hash = newHash;
      }
    });
  }
}
