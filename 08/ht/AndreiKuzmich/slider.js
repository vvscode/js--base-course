var slider = new Slider({
  elem: document.getElementById('slider'),
});

function Slider(options) {
  var elem = options.elem;
  var thumbElem = elem.querySelector('.thumb');

  var sliderCoords,
    thumbCoords,
    shiftX,
    shiftY;

  elem.ondragstart = function () {
    return false;
  };

  elem.onmousedown = function (event) {
    if (event.target.closest('.thumb')) {
      startDrag(event.clientX, event.clientY);
      return false;
    }
  };

  function startDrag(startClientX, startClientY) {
    thumbCoords = thumbElem.getBoundingClientRect();
    shiftX = startClientX - thumbCoords.left;
    shiftY = startClientY - thumbCoords.top;

    sliderCoords = elem.getBoundingClientRect();

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
  }

  function moveTo(clientX) {
    var newLeft = clientX - shiftX - sliderCoords.left;

    if (newLeft < 0) {
      newLeft = 0;
    }
    var rightEdge = elem.offsetWidth - thumbElem.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    thumbElem.style.left = `${newLeft}px`;

    newLeft <= 50 ? delay = 3000 :
      (newLeft > 50 && newLeft <= 100) ? delay = 2000 :
        (newLeft > 100 && newLeft <= 150) ? delay = 1000 :
          (newLeft > 150 && newLeft <= 200) ? delay = 500 : delay = 100;
  }

  function onDocumentMouseMove(e) {
    moveTo(e.clientX);
  }

  function onDocumentMouseUp() {
    endDrag();
  }

  function endDrag() {
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
  }
}
