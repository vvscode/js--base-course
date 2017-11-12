const main = {
  name: "main",
  match: "",
  onEnter: () => {
    let divApp = document.querySelector("#app");
    fetch("https://api.userinfo.io/userinfos")
      .then(res => res.json())
      .then(coordinates => {
        window.location.hash = `coordinates/latitude=${coordinates.position
          .latitude}&longitude=${coordinates.position.longitude}`;
      });
  }
};

export { main };
