
export const about = {
  name: 'about',
  match: 'about',
  onEnter: () => {
    const mainContentDiv = document.querySelector('section .main');
    mainContentDiv.innerHTML = 'Hello, it will be cool about page';
  },
};
