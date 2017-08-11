class Statistics {
  constructor(element, eventBus) {
    this.element = element;
    this.eventBus = eventBus;
    this.data = [];

    this.updateStats = this.updateStats.bind(this);

    this.eventBus.on('stats:update', this.updateStats);
  }

  updateStats(newStats) {
    console.log(newStats);
    this.data = newStats;

    this.renderStatistics();
  }

  renderStatistics() {
    this.element.classList.add('list-group');
    this.element.innerHTML = '';

    // debugger;

    if (!this.data.length) {
      this.element.innerHTML = '<li>You haven\'t got any statistics</li>';
      return;
    };

    for (var i = 0; i < this.data.length; i++) {
      this.element.innerHTML += `<li class="list-group-item">${this.data[i]}</li>`
    }
  }
}


export default Statistics;
