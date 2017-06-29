class Logger {
  constructor(element, eventBus) {
    this.element = element;
    this.eventBus = eventBus;

    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.clear = this.clear.bind(this);
  }

  handleNewEvent(event, className) {
    const loggerUl = this.element.querySelector('ul');

    loggerUl.innerHTML += `<li class=${className || ''}>${event}</li>`;
  }

  clear() {
    const loggerUl = this.element.querySelector('ul');
    loggerUl.innerHTML = '';
  }

  renderLogger() {
    this.element.innerHTML += `
      <ul></ul>
    `;

    this.element.classList.add('logger');

    this.eventBus.on('game:logger', this.handleNewEvent);
    this.eventBus.on('game:logger-clear', this.clear)
  }
}

export default Logger;
