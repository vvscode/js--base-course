var CanvasRender = function(){

}

CanvasRender.prototype.render = function(currState){



    var canvas = document.getElementById("canvasId");
    canvas.width  = 500;
    canvas.height = 400;
    canvas.style.width  = '500px';
    canvas.style.height = '400px';


    var gDrawingContext = canvas.getContext("2d");
    var kPixelWidth = 20 * currState[0].length;
    var kPieceWidth=20;
    var kPieceHeight=20;
    var kPixelHeight = 20 * currState.length;

    gDrawingContext.beginPath();
    /* вертикальные линии */
    for (var x = 0; x <= kPixelWidth; x += kPieceWidth) {
        gDrawingContext.moveTo(0.5 + x, 0);
        gDrawingContext.lineTo(0.5 + x, kPixelHeight);
    }
    /* горизонтальные линии */
    for (var y = 0; y <= kPixelHeight; y += kPieceHeight) {
        gDrawingContext.moveTo(0, 0.5 + y);
        gDrawingContext.lineTo(kPixelWidth, 0.5 +  y);
    }
    /* рисуем их! */
    gDrawingContext.strokeStyle = "#ccc";
    gDrawingContext.stroke();


    var gameField = document.getElementById('gameFieldId');
    var rowNum = currState.length;
    var colNum = currState[0].length;
    var cellLength = 19.5;

    for(var i = 0; i < rowNum; i++ ){
        for(var j = 0; j < colNum; j++ ){
            var xStart = j * 20 + 0.5;
            var yStart = i * 20 + 0.5;
            if(currState[i][j] === 1){
                gDrawingContext.fillStyle="#000000";
            } else{
                gDrawingContext.fillStyle="#ffffff";
            }
            gDrawingContext.fillRect(xStart, yStart, cellLength, cellLength);
        }
    }
}