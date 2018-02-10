class Game {
  constructor() {
    this.makeField();
    this.addMusic();
    this.char = new Char(130,10);
    this.person = new Person(130,10);
    this.person.startPosition();
    $(document).on('keydown', (e) => {
      clearInterval(intervals.int);
      var interval = setInterval(this.char.movement, 15, e);
      intervals.int = interval;
    });

    this.cop = new Cop(300,this.getRandomNumber(0,FIELD_HEIGHT - 68));
    this.cop2 = new Cop(300,this.getRandomNumber(0,FIELD_HEIGHT - 68));
    this.cop3 = new Cop(300,this.getRandomNumber(0,FIELD_HEIGHT - 68));
    this.cop4 = new Cop(300,this.getRandomNumber(0,FIELD_HEIGHT - 68));
    this.cop5 = new Cop(300,this.getRandomNumber(0,FIELD_HEIGHT - 68));
    this.firstLevelCopRun();
    this.secondLeveleCop = new SecondLevelCop(300,this.getRandomNumber(0,FIELD_HEIGHT - 68));
    this.secondLeveleCop2 = new SecondLevelCop(300,this.getRandomNumber(0,FIELD_HEIGHT - 68));
    this.secondLeveleCop3 = new SecondLevelCop(300,this.getRandomNumber(0,FIELD_HEIGHT - 68));
    this.secondLevelCopRun();
  }
  getRandomNumber(min, max) {
    return (Math.floor(Math.random() * (max - min) + min));
  }
  firstLevelCopRun() {
    timeouts.time = setTimeout(() => {
      intervals.int1 = setInterval(this.cop2.movement2, 20);
    }, 500);
    timeouts.time1 = setTimeout(() => {
      intervals.int2 = setInterval(this.cop.movement, 20);
    }, 2000);
    timeouts.time2 = setTimeout(() => {
      intervals.int5 = setInterval(this.cop3.movement3, 20);
    }, 7000);
    timeouts.time3 = setTimeout(() => {
      intervals.int6 = setInterval(this.cop4.movement4, 20, historyArray6);
    }, 12000);
    timeouts.time4 = setTimeout(() => {
      intervals.int7 = setInterval(this.cop5.movement4, 20, historyArray7);
    }, 13000);
  }
  secondLevelCopRun() {
    timeouts.time5 = setTimeout(() => {
      intervals.int3 = setInterval(this.secondLeveleCop.movement, 20, historyArray3);
    }, 2000);
    timeouts.time6 = setTimeout(() => {
      intervals.int4 = setInterval(this.secondLeveleCop2.movement2, 20, historyArray4);
    }, 4000);
    timeouts.time7 = setTimeout(() => {
      intervals.int8 = setInterval(this.secondLeveleCop3.movement2, 20, historyArray8);
    }, 6000);
  }


  addMusic() {
    audio = new Audio();
    audio.src = 'start.mp3';
    audio.volume = 0.2;
    audio.autoplay = true;
  }
  makeField() {
    let canvas = document.createElement('canvas');
    canvas.width = FIELD_WIDTH;
    canvas.height = FIELD_HEIGHT;
    canvas.style.border = '1px solid black';
    document.body.appendChild(canvas);
  }
}








