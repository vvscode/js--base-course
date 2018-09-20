export default function Menu(el, bus) {
  this.bus = bus;
  this.el = el;
  this.menuWrapper = document.createElement('div');
  this.menuWrapper.className = 'menuWrapper';
}

Menu.prototype = {
  render: function() {
    var aboutButton = document.createElement('button');
    var mainButton = document.createElement('button');
    var authorButton = document.createElement('button');
    aboutButton.innerHTML = 'about';
    mainButton.innerHTML = 'main';
    authorButton.innerHTML = 'author';
    aboutButton.className = 'aboutButton about';
    mainButton.className = 'mainButton main';
    authorButton.className = 'authorButton author';
    this.menuWrapper.appendChild(aboutButton); 
    this.menuWrapper.appendChild(mainButton); 
    this.menuWrapper.appendChild(authorButton); 
    this.el.appendChild(this.menuWrapper);
    this.menuWrapper.addEventListener('click', (e) => {
      if(e.target.tagName.toLowerCase() === 'button') {
        this.menuWrapper.querySelectorAll('button').forEach((button) => {
          return button.classList.remove('current');
        });
        e.target.classList.add('current');
        var newHash = e.target.className.split(' ')[1];
        window.location.hash = newHash;
      }
    });
  }
}
