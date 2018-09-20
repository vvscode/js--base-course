export default function renderAuthor(content) {
  let author = document.querySelector('.content > .authorWrapper');
  let about = document.querySelector('.content > .aboutWrapper');
  if(author) {
    content.removeChild(author);
  }
  if(about) {
    content.removeChild(about);
  }
  var authorWrapper = document.createElement('div');
  authorWrapper.innerHTML = `
    <h1> Igor Terechtchenko, 2018 </h1>
    <h1><a href="https://github.com/IgorTerechtchenko">GitHub</a></h1>
  `;
  authorWrapper.className = 'authorWrapper';
  content.appendChild(authorWrapper);
}
