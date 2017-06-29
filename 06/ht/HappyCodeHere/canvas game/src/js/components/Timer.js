// import { saveToStorage } from '../utils/helpers';

class Timer {
  constructor(element, eventBus) {
    this.element = element;
    this.eventBus = eventBus;

    this.time = 0;

    this.runTimer = this.runTimer.bind(this);

    this.eventBus.on('game:start', this.runTimer);
    this.eventBus.on('game:finished', () => {
      clearInterval(this.timer);
      this.eventBus.trigger('game:logger', [`Congrats, you have ${(this.time / 100).toFixed(2)} seconds, want play again?`, 'game-finished']);
      // saveToStorage(this.time / 100, localStorage);
      this.time = 0;
    });
  }

  runTimer() {
    const timerBlock = document.querySelector(this.element);
    timerBlock.innerHTML = '';
    this.timer = setInterval(() => {
      this.time += 1;
      timerBlock.innerHTML = (this.time / 100).toFixed(2);
    }, 10);
  }
}

export default Timer;
