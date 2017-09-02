import indexPage from "../components/indexPage";
let index = {
  name: "index",
  match: "",
  onBeforeEnter: () => {},
  onEnter: () => {
    let index = new indexPage();
    index.indexPage();
  },
  onLeave: () => {}
};

export { index };
