export default function renderAbout(el) {
  var aboutWrapper = document.createElement('div');
  var p = document.createElement('p1');
  aboutWrapper.className = 'aboutWrapper';
  p.innerHTML = 'life game SPA by Igor Terechtchenko, 2018';
  aboutWrapper.appendChild(p);
  var divs = el.querySelectorAll('div');
  divs.forEach((div) => {
    div.innerHTML = '';
  });
  el.appendChild(aboutWrapper);
}
