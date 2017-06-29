class Switcher {
  constructor(eventBus, element) {
    this.eventBus = eventBus;
    this.element = element;

    this.handleSwitcherChange = this.handleSwitcherChange.bind(this);
    this.renderSwitcher = this.renderSwitcher.bind(this);
  }

  handleSwitcherChange(event) {

      let isFetchRequest = true;
      // передать через ивент бас

      const { checked } = event.target;
      const requestType = document.querySelector('.switcher span');

      if (checked) {
        isFetchRequest = true;
        requestType.innerHTML = 'Fetch';
      } else {
        isFetchRequest = false;
        requestType.innerHTML = 'XHR';
      }
  }

  renderSwitcher() {
    const switcher = document.querySelector(this.element);

    switcher.outerHTML = `
      <div class="switcher">
        Request type: <span>Fetch</span>
        <label class="switch">
          <input type="checkbox" checked>
          <div class="slider round"></div>
        </label>
      </div>
    `

    switcher.addEventListener('change', this.handleSwitcherChange);
  }
}

export default Switcher;
