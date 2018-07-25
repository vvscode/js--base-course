import { eventBus } from '../index';

export default class Controls {
  constructor(htmlEl) {
    this.htmlEl = htmlEl;
    this.timer;
    eventBus.on('controls: playGame', this.playGame.bind(this));
    eventBus.on('controls: stopGame', this.stopGame.bind(this));

    this.htmlEl.querySelector('#btn-play').addEventListener('click', e => {
      let parentEl = e.target.parentNode;
      if (e.target.id === 'play') {
        parentEl.innerHTML =
          '<img id="pause" src="img/pause.png" class="controls__img">';
        eventBus.trigger('controls: playGame', this.setSpeedGame());
      } else if ((e.target.id = 'pause')) {
        parentEl.innerHTML =
          '<img id="play" src="img/play.png" class="controls__img">';
        eventBus.trigger('controls: stopGame');
      }
    });

    this.htmlEl.querySelector('#btn-next').addEventListener('click', _ => {
      eventBus.trigger('controls: stopGame');
      eventBus.trigger('field: nextStep');
    });

    this.htmlEl.querySelector('#btn-back').addEventListener('click', _ => {
      eventBus.trigger('controls: stopGame');
      eventBus.trigger('field: prevStep');
    });

    this.htmlEl.addEventListener('change', e => {
      if (e.target.tagName === 'SELECT') {
        eventBus.trigger(
          'field: changeSizeGameField',
          this.setSizeField.bind(this)
        );
      } else if (
        e.target.id === 'speed' &&
        this.htmlEl.querySelector('#pause')
      ) {
        eventBus.trigger('controls: stopGame');
        eventBus.trigger('controls: playGame', this.setSpeedGame());
      }
    });
  }

  setSizeField() {
    this.widthField = this.htmlEl.querySelector('#x').options[
      this.htmlEl.querySelector('#x').selectedIndex
    ].value;
    this.heightField = this.htmlEl.querySelector('#y').options[
      this.htmlEl.querySelector('#y').selectedIndex
    ].value;
    return { col: this.widthField, row: this.heightField };
  }

  setSpeedGame() {
    this.speed = this.htmlEl.querySelector('#speed').value;
    return this.speed;
  }

  playGame(speed) {
    this.timer = setInterval(_ => {
      eventBus.trigger('field: nextStep');
    }, 1000 * 1.5 / speed);
  }

  stopGame() {
    clearInterval(this.timer);
  }
}
