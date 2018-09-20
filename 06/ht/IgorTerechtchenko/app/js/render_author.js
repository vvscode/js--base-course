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
    <div> Igor Terechtchenko, 2018 </div>
    <a href="https://github.com/IgorTerechtchenko">GitHub</a>
  `;
  authorWrapper.className = 'authorWrapper';
  content.appendChild(authorWrapper);
}
