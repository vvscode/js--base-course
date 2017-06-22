
const index = {
    name: 'index',
    match: '',
    onEnter: () => {
      const contentBlock = document.querySelector('section.main .content');
      contentBlock.classList.remove('col-md-12');
      contentBlock.classList.add('col-md-offset-2', 'col-md-8');
      contentBlock.innerHTML = `
        <h2>Welcome to cool weather app.</h2>
        <p>Enter your city to get a latest forecast!</p>
      `;
      fetch(`https://api.userinfo.io/userinfos`)
        .then(responce => responce.json())
        .then(data => {
          const { name } = data.city;

          contentBlock.innerHTML += `
            <br />
            Or check weather for
            <a href="#city=${name}">${name}</a> ;)
          `;
        });
    },
}

export { index };
