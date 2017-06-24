class Timer {
  constructor(element, eventBus) {
    this.element = element;
    this.eventBus = eventBus;

    this.runTimer = this.runTimer.bind(this);

    this.eventBus.on('game:start', this.runTimer);
    this.eventBus.on('game:finished', () => {
      clearInterval(this.timer);

      const timerBlock = document.querySelector(this.element);

      timerBlock.innerHTML = `
        Congrats, you have ${this.timer} points, want play again?
      `
    })
  }

  runTimer() {
    const timerBlock = document.querySelector(this.element);
    timerBlock.innerHTML = '';
    this.timer = setInterval(() => {
      timerBlock.innerHTML = +(timerBlock.innerHTML) + 1;
    }, 1);
  }
}

export default Timer;
