import AboutPage from "../components/aboutPage";
let about = {
  name: "about",
  match: text => text == "about",
  onBeforeEnter: () => {},
  onEnter: () => {
    let about = new AboutPage();
    about.renderingPage();
  },
  onLeave: () => {}
};

export { about };
