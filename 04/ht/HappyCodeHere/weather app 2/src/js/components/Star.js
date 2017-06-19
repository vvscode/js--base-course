import { getUrlHashParams } from '../utils/helpers';


class Star {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.handleStarClick = this.handleStarClick.bind(this);
    // this.handleFavoritesActive = this.handleFavoritesActive.bind(this);

    this.eventBus.on('favorites:is-active', this.handleFavoritesActive);
  }

  handleFavoritesActive(isActive) {
    const star = document.querySelector(this.element + ' span');

    if (isActive) {
      star.classList.add('star-active');
    } else {
      star.classList.remove('star-active');
    }
  }

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
    star.innerHTML = '<h5>Add this to your favorites!</h5>'
    star.innerHTML += '<span></span>';
    star.querySelector('span').addEventListener('click', this.handleStarClick);
  }
}

export default Star;
