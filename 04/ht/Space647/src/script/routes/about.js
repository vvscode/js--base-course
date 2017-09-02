import aboutPage from "../components/aboutPage";
let about = {
  name: "about",
  match: text => text == "about",
  onBeforeEnter: () => {},
  onEnter: () => {
    let about = new aboutPage();
    about.renderingPage();
  },
  onLeave: () => {}
};

export { about };
