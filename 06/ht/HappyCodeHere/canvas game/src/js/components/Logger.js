class Logger {
  constructor(element, eventBus) {
    console.log(element);
    this.element = element;
    this.eventBus = eventBus;

    this.handleNewEvent = this.handleNewEvent.bind(this);
  }

  handleNewEvent(event) {
    const loggerUl = this.element.querySelector('ul');

    loggerUl.innerHTML += `<li>${event}</li>`;
  }

  renderLogger() {
    this.element.innerHTML = `
      <ul></ul>
    `;

    this.eventBus.on('game:logger', this.handleNewEvent);
  }
}

export default Logger;
