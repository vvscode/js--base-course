
const about = {
  name: 'about',
  match: 'about',
  onEnter: () => {
    const contentDiv = document.querySelector('section.main .content');
    contentDiv.innerHTML = '<h2>Hello, it will be cool about page</h2>';
  },
};

export { about };
