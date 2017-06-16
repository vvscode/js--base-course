
class History {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.history = [];

    this.onHistoryAdd = this.onHistoryAdd.bind(this);

    this.eventBus.on('history:add', this.onHistoryAdd);

    this.loadHistoryFromStorage(localStorage);
  }

  loadHistoryFromStorage(storage) {
    const savedHistory = storage.getItem('forecast');
    this.history = JSON.parse(savedHistory) || [];
  }

  saveHistoryToStorage(storage) {
    storage.setItem('forecast', JSON.stringify(this.history));
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

    this.saveHistoryToStorage(localStorage);
    this.renderHistory();
  }

  renderHistory() {
    const historyBlock = document.querySelector(this.element);

    const historyTitle = document.createElement('h3');
    historyTitle.innerHTML = 'Resently watched:';

    const historyUl = document.createElement('ul');
    historyUl.classList.add('list-group');

    this.history.map(item => {
      historyUl.innerHTML += `<li class="list-group-item"><a href="#city=${item}">${item}</a></li>`
    });

    historyBlock.innerHTML = `${historyTitle.outerHTML} ${historyUl.outerHTML}`;
  }
}

export default History;
