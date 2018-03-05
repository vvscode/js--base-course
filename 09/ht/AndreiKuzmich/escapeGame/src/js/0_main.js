const FIELD_WIDTH = window.innerWidth;
const FIELD_HEIGHT = window.innerHeight;
var audio;
var startDate, endDate;
var intervals = {
  int: '', int1: '', int2: '', int3: '', int4: '',int5: '',int6: '',int7: '',int8: '',
};

var timeouts = {
  time: '', time1: '', time2: '', time3: '', time4: '',time5: '',time6: '',time7: '',
};

$('#start').on('click',function () {
  historyArray.splice(0);
  historyArray1.splice(0);
  historyArray2.splice(0);
  historyArray3.splice(0);
  historyArray4.splice(0);
  historyArray5.splice(0);
  historyArray6.splice(0);
  historyArray7.splice(0);
  historyArray8.splice(0);
  $('#content').hide();
  new Game();
  startDate = new Date().getTime();
});



// воспроизведение игры
$('#play')
  .on('click', () => {
    if (document.querySelector('.list')) {
      $('#content').hide();
      let canvas = document.querySelector('canvas');
      canvas = document.createElement('canvas');
      canvas.width = FIELD_WIDTH;
      canvas.height = FIELD_HEIGHT;
      document.body.appendChild(canvas);
      intervals.int = setInterval(new Person().backPlay,10, historyArray, 'pic/1__1.png', 'pic/1__2.png');
      intervals.int1 = setInterval(new Person().backPlay,10, historyArray1, 'pic/2__1.png');
      intervals.int2 = setInterval(new Person().backPlay,10, historyArray2, 'pic/2__1.png', 'pic/2__2.png');
      intervals.int3 = setInterval(new Person().backPlay,10, historyArray3, 'pic/3__1.png', 'pic/3__2.png');
      intervals.int4 = setInterval(new Person().backPlay,10, historyArray4, 'pic/3__1.png', 'pic/3__2.png');
      intervals.int5 = setInterval(new Person().backPlay,10, historyArray5, 'pic/2__1.png');
      intervals.int6 = setInterval(new Person().backPlay,10, historyArray6, 'pic/2__1.png');
      intervals.int7 = setInterval(new Person().backPlay,10, historyArray7, 'pic/2__1.png');
      intervals.int8 = setInterval(new Person().backPlay,10, historyArray8, 'pic/3__1.png', 'pic/3__2.png');
    }
  });
