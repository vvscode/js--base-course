
(function drawStartBtn() {
  var canvas = document.querySelector('#startBtn').getContext('2d');
  canvas.beginPath();
  canvas.moveTo(18,10);
  canvas.lineTo(3,2);
  canvas.lineTo(3,18);
  canvas.fillStyle = 'white';
  canvas.fill();
})();

(function drawForwardBtn() {
  var canvas = document.querySelector('#forwardBtn').getContext('2d');
  canvas.beginPath();
  canvas.moveTo(9,8);
  canvas.lineTo(1,2);
  canvas.lineTo(1,14);
  canvas.fillStyle = 'white';
  canvas.fill();
  canvas.beginPath();
  canvas.moveTo(20,8);
  canvas.lineTo(12,2);
  canvas.lineTo(12,14);
  canvas.fillStyle = 'white';
  canvas.fill();
})();

(function drawPrevBtn() {
  var canvas = document.querySelector('#prevBtn').getContext('2d');
  canvas.beginPath();
  canvas.moveTo(1,8);
  canvas.lineTo(9,2);
  canvas.lineTo(9,14);
  canvas.fillStyle = 'white';
  canvas.fill();
  canvas.beginPath();
  canvas.moveTo(12,8);
  canvas.lineTo(20,2);
  canvas.lineTo(20,14);
  canvas.fillStyle = 'white';
  canvas.fill();
})();

(function drawPauseBtn() {
  var canvas = document.querySelector('#pauseBtn').getContext('2d');
  canvas.fillStyle = 'white';
  canvas.fillRect(2, 1, 5, 15);
  canvas.fillRect(12, 1, 5, 15);
})();


