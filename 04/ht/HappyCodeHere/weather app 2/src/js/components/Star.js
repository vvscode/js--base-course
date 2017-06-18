import { getUrlHashParams } from '../utils/helpers';


class Star {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.handleStarClick = this.handleStarClick.bind(this);
    // this.handleFavoritesActive = this.handleFavoritesActive.bind(this);

    // this.eventBus.on('favorites:is-active', this.handleFavoritesActive);
  }

  // handleFavoritesActive(active) {
  //   const star = document.querySelector(this.element);
  //
  //   if (active) {
  //     star.classList.add('star-active');
  //   } else {
  //     star.classList.remove('star-active');
  //   }
  // }

  handleStarClick() {
   const star = document.querySelector(this.element + ' span');

   const { lat, lng } = getUrlHashParams();

   if (star.classList.contains('active')) {
     this.eventBus.trigger('favorites:remove', {lat, lng});
     star.classList.remove('active');
   } else {
     this.eventBus.trigger('favorites:add', {lat, lng});
     star.classList.add('active');
   }
  }

  renderStar() {
    const star = document.querySelector(this.element);
    star.innerHTML = '<span></span>';
    star.addEventListener('click', this.handleStarClick);
  }
}

export default Star;
