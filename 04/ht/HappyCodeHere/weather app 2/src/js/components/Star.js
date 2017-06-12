import { getUrlParams } from '../utils/helpers';

class Star {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.handleStarClick = this.handleStarClick.bind(this);
  }

  handleStarClick() {
    const { lat, lng } = getUrlParams();
    const cords = {lat, lng};

    if (this.element.classList.contains('star-active')) {
      this.eventBus.trigger('favorites:remove', cords);
      this.element.classList.remove('star-active');
    } else {
      this.eventBus.trigger('favorites:add', cords);
      this.element.classList.add('star-active');
    }

    // .classList.toggle
  }

  renderStar() {
    const star = document.querySelector(this.element);
    star.innerHTML = '<img src="https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-132_star_off-512.png"/>';
    star.addEventListener('click', this.handleStarClick);
  }
}

export default Star;
