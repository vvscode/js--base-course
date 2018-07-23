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
    this.menuEl.addEventListener('click', (e) => {
      if(e.target.tagName.toLowerCase() === 'button') {
        this.menuEl.querySelectorAll('button').forEach((button) => button.classList.remove('current'));
        e.target.classList.add('current');
        var newHash = e.target.getAttribute('class').split(':')[1].split(' ')[0];
        window.location.hash = newHash;
      }
    });
  }
}
