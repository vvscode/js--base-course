class HistoryComponent {
  constructor(element, eventBus) {
    this.history = [];
    this.eventBus = eventBus;
    this.element = element;
    this.historyApplet = document.createElement('ul');
    this.historyApplet.id = 'history';
    this.element.appendChild(this.historyApplet);
    this.eventBus.on('search:success', (city) => {
      this.addCity(city);
      this.renderHistory();
    });
  }
  addCity(city) {
    if (this.history.length < 5) {
      this.history.unshift(city);
    } else {
      this.history.pop();
      this.history.unshift(city);
    }
  }
  renderHistory() {
    this.historyApplet.innerHTML = this.history
      .map((element) => `<li>${element}</li>`)
      .join('\n');
  }
}

export { HistoryComponent };
