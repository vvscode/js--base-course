import {IndexPage} from '../components/indexPage'
let indexP = new IndexPage();
let index = {
  name: "index",
  match: "",
  onBeforeEnter: () => {
    document.querySelector('header').innerHTML='';
    document.querySelector('.workPlace').innerHTML='';
    document.querySelector('footer').innerHTML='';
  },
  onEnter: () => {
    indexP.initPage();
  },
  onLeave: () => {
    document.querySelector('header').innerHTML='' || 0;
    //document.querySelector('.buttonPlace').innerHTML='' || 0;
    document.querySelector('.workPlace').innerHTML='' || 0;
    document.querySelector('footer').innerHTML='' || 0;
    //indexP.removeEventOnClick();
  }
};

export { index };
