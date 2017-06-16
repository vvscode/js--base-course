import { getUrlParams } from '../utils/helpers';

class Star {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleFavoritesActive = this.handleFavoritesActive.bind(this);

    this.eventBus.on('favorites:is-active', this.handleFavoritesActive);
  }

  handleFavoritesActive(active) {
    const star = document.querySelector(this.element);

    if (active) {
      star.classList.add('star-active');
    } else {
      star.classList.remove('star-active');
    }
  }



  handleStarClick() {
    // const { lat, lng } = getUrlParams();
    // const cords = {lat, lng};

    let data = {};

    window.location.hash.split('?')[1].split('&').map(item => {
      let items = item.split('=');
      data[items[0]] = items[1];
    })
    const { lat, lng } = data;

   const star = document.querySelector(this.element);

  //  this.eventBus.trigger('favorites:add', {});

  //  this.eventBus.trigger('star:is-active', data);

  // debugger;

    if (star.classList.contains('star-active')) {
      this.eventBus.trigger('favorites:remove', data);
      star.classList.remove('star-active');
    } else {
      this.eventBus.trigger('favorites:add', data);
      star.classList.add('star-active');
    }

    // .classList.toggle
  }

  renderStar() {
    const star = document.querySelector(this.element);
    star.innerHTML = '<img src="https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-132_star_off-512.png"/>';
    star.addEventListener('click', this.handleStarClick);

    // this.eventBus.on('star:is-active', () => {
    //   star.style.backgroundColor = 'red';
    // })
  }
}

export default Star;
