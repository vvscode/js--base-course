import Weather from "../components/Weather";

const main = {
  name: "main",
  match: "",
  onEnter: () => {
    let divApp = document.querySelector("#app");
    fetch("https://api.userinfo.io/userinfos")
      .then(res => res.json())
      .then(coordinates => {
        new Weather().getWeather(coordinates.position, "fetch");
        console.log(coordinates.position);
      });
  }
};

export { main };
