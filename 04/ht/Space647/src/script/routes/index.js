import indexPage from "../components/indexPage";
import weatherPages from "../components/weatherPages";
let index = {
  name: "index",
  match: "",
  onBeforeEnter: () => {},
  onEnter: () => {
    let index = new indexPage();
    let weather = new weatherPages();
    index.indexPage();
    weather.enterButtonHandlerForSentCity();
  },
  onLeave: () => {}
};

export { index };
