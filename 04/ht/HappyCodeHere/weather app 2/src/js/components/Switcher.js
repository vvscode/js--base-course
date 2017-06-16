

class Switcher {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.renderSwitcher = this.renderSwitcher.bind(this);

  }

  renderSwitcher() {
    let isFetchRequest = true;

    const switcher = document.querySelector(this.element);
    const text = `
      <div class="col-md-4 switcher">
        Request type: <span>Fetch</span>
        <label class="switch">
          <input type="checkbox" checked>
          <div class="slider round"></div>
        </label>
      </div>
    `

    switcher.innerHTML = text;

    switcher.addEventListener('change', (event) => {
      const { checked } = event.target;
      const requestType = document.querySelector('.switcher span');

      if (checked) {
        isFetchRequest = true;
        requestType.innerHTML = 'Fetch';
      } else {
        isFetchRequest = false;
        requestType.innerHTML = 'XHR';
      }
    })
  }
}

export default Switcher;
