const main = {
  name: "main",
  match: "",
  onEnter: () => {
    let divApp = document.querySelector("#app");
    divApp.innerHTML = `<h1>MAIN</h1>`;
  }
};

export { main };
