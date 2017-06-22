
const about = {
  name: 'about',
  match: 'about',
  onEnter: () => {
    const contentBlock = document.querySelector('section.main .content');
    contentBlock.classList.remove('col-md-12');
    contentBlock.classList.add('col-md-offset-2', 'col-md-8');
    contentBlock.innerHTML = `
      <h2>Hello, it will be cool about page</h2>
      <p>...but haven't idea what to write here</p>
    `;
  },
};

export { about };
