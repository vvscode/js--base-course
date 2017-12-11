const about = {
  name: "about",
  match: "about",
  onEnter: () => {
    let divApp = document.querySelector("#app");
    divApp.innerHTML = `
      <h3>hello my dear friend</h3>
      <p>It's realy good app</p>
    `;
  }
};

export { about };
