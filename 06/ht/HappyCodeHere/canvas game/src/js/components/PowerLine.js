class PowerLine {
  constructor(element, eventBus) {
    this.element = element;
    this.eventBus = eventBus;

    this.activate = this.activate.bind(this);
  }

  activate() {
    const progressBar = this.element.querySelector('.progress-bar');

    let width = 100;
    progressBar.style.width = width + '%';

    const timer = setInterval(() => {
      progressBar.style.width = width + '%';
      // width === 100 ? width -= 20 : width -= 10;
      width -= 10;
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
    }, 1000*10);
  }

  renderPowerLine() {
    this.element.innerHTML = `
      <h3>Power line</h3>
      <div class="progress">
        <div class="progress-bar progress-bar-warning" role="progressbar"
            aria-valuenow="60"
            aria-valuemin="0" aria-valuemax="100"></div>

      </div>
    `;

    this.eventBus.on('game:power', this.activate);
  }
}

export default PowerLine;
