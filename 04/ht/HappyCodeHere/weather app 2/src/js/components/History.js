
class History {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.history = [];

    this.onHistoryAdd = this.onHistoryAdd.bind(this);

    this.eventBus.on('history:add', this.onHistoryAdd);
  }

  onHistoryAdd(city) {
    if (this.history[0] === city) return;
    if (this.history.indexOf(city) > 0) {
       this.history.splice(this.history.indexOf(city), 1);
    }
    if (this.history.length > 4) {
      this.history.pop();
    }
    this.history.unshift(city);

    localStorage.setItem('forecast-history', JSON.stringify(this.history));

    this.renderHistory();
  }

  renderHistory() {
    const historyUl = document.querySelector(this.element);
    historyUl.innerHTML = '';

    for (var i = 0; i < this.history.length; i++) {
      historyUl.innerHTML += `<li class="list-group-item"><a href="#${this.history[i]}">${this.history[i]}</a></li>`;
    }
  }
}

export default History;
