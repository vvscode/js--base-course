export default function AboutPage(el) {
  this.el = el;
  this.aboutWrapper = document.createElement('div');
  this.aboutWrapper.className = 'aboutWrapper';
  this.el.appendChild(this.aboutWrapper);
}

AboutPage.prototype.render = function() {
  this.clearElements();
  this.aboutWrapper.innerHTML =  `<ul>
                                  <li>Conway's  Game of Life SPA by Igor Terechtchenko, 2018</li>
                                  <li> <a href=https://en.wikipedia.org/wiki/Conway's_Game_of_Life>Background and rules</a></li>
                                  <li> <a href=https://github.com/IgorTerechtchenko/js--base-course/tree/08/08/ht/IgorTerechtchenko> App's github page </li>
                                  </ul>`;
}

AboutPage.prototype.clearElements = function() {
  var divs = this.el.querySelectorAll('div');
  divs.forEach((div) => {
    div.innerHTML = '';
  });
}
