import weatherPages from "../components/weatherPages";
let weather = {
  name: "weather",
  match: text => text == text,
  onBeforeEnter: () => {},
  onEnter: () => {
    let weather = new weatherPages();
    weather.doneWeatherPageToWork();
  },
  onLeave: () => {}
};

export { weather };
