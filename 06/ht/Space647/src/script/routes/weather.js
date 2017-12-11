import WeatherPage from "../components/weatherPage";
let weather = {
  name: "weather",
  match: text => text == text,
  onBeforeEnter: () => {},
  onEnter: () => {
    let weather = new WeatherPage();
    weather.initPage();
  },
  onLeave: () => {}
};

export { weather };
