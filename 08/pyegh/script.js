function setUpHandlersAndInitialStates(){
    var textRenderer = new TextRenderer();
    var canvasRenderer = new CanvasRender();
    //var svgRenderer = new TextRenderer();
    var preRenderer = new PreRenderer();
    var game = new GameLife(textRenderer, 1000);


    var playButton = document.getElementById('playId');
    playButton.addEventListener('click', function(){
        if(playButton.value === 'Play'){
            playButton.value = 'Stop';
            game.play();
        } else{
            playButton.value = 'Play';
            game.stop();
        }
    });

    var backButton = document.getElementById('prevStepId');
    backButton.addEventListener('click', () => {
        if(playButton.value === 'Stop'){
        // user can not use back/next buttons when game is in progress
        //alert('You are at the last step. Press play to continue the game');
        return;
    } else{
        if(game.currStateIndex > 0){
            game.currStateIndex -= 1;
            game.drawCurrentStep();
        } else{
            alert('You are at the first step. You can not move backward anymore');
        }
    }
});

    var nextButton = document.getElementById('nextStepId');
    nextButton.addEventListener('click', () => {
        if(playButton.value === 'Stop'){
        // user can not use back/next buttons when game is in progress
        return;
    } else{
        if(game.currStateIndex < game.state.length - 1){
            game.currStateIndex += 1;
            game.drawCurrentStep();
        } else{
            alert('You are at the last step. You can not move forward anymore');
        }
    }
});

    var speedInput = document.getElementById('speedInputId');
    speedInput.addEventListener('input', () => {
        var speed = speedInput.value;
    game.interval = speed;
});

    var xSelect = document.getElementById('sizeXSelect');
    xSelect.addEventListener("change", () => {
        var x = xSelect.options[xSelect.selectedIndex].value;
    game.changeRowsNumber(x);
    game.drawCurrentStep();
});

    var ySelect = document.getElementById('sizeYSelect');
    ySelect.addEventListener("change", () => {
        var y = ySelect.options[ySelect.selectedIndex].value;
    game.changeColumnsNumber(y);
    game.drawCurrentStep();
});

    var tableArea = document.getElementById('gameFieldId');
    tableArea.addEventListener('click', (event) => {

        if(event.target.tagName === 'TD'){
        var id = event.target.id;
        var indexes = id.split('_');
        i = indexes[0];
        j = indexes[1];

        game.changeCellState(i, j);
        game.drawCurrentStep();
    }

});

    var canvasArea = document.getElementById('canvasId');
    canvasArea.addEventListener('click', (event) => {
        var x = event.clientX;
        var y = event.clientY;

        var x0 = event.target.offsetLeft;
        var y0 = event.target.offsetTop;

        var j = parseInt((x - x0) / 20);
        var i = parseInt((y - y0) / 20);

        game.changeCellState(i, j);
        game.drawCurrentStep();
    });

    var pre = document.getElementsByTagName('pre')[0];
    pre.addEventListener('click', function(){

        var x = event.clientX;
        var y = event.clientY;

        var x0 = event.target.offsetLeft;
        var y0 = event.target.offsetTop;

        var preHeight = event.target.offsetHeight;
        var preWidth = event.target.offsetWidth;

        var rowNum = game.getCurrState().length;
        var colNum = game.getCurrState()[0].length;

        var cellWidth  = preWidth / colNum;
        var cellHeight = preHeight / rowNum;

        var j = parseInt((x - x0) / cellWidth);
        var i = parseInt((y - y0) / cellHeight);

        game.changeCellState(i, j);
        game.drawCurrentStep();
    });

    location.hash = '/textView';
    var routes = [
        {
            name: 'textView',
            match: /[/]textView/,
            onBeforeEnter: (params) => {
            var tableField = document.getElementById('gameFieldId');
    tableField.className = '';

    game.setRenderer(textRenderer);
    game.drawCurrentStep();
},
    onEnter: () => console.log(`onEnter textView}`),
        onLeave: () => {
        var tableField = document.getElementById('gameFieldId');
        tableField.className = 'displayNone';
    }
},
    {
        name: 'canvasView',
            match: /[/]canvasView/,
        onBeforeEnter: (params) => {
        var canvasField = document.getElementById('canvasId');
        canvasField.className = '';

        game.setRenderer(canvasRenderer);
        game.drawCurrentStep();
    },
        onEnter: () => console.log(`onEnter canvasView`),
        onLeave: () => {
        var canvasField = document.getElementById('canvasId');
        canvasField.className = 'displayNone';
    }
    },
    {
        name: 'svgView',
            match: /[/]svgView/,
        onBeforeEnter: (params) => {
            var preField = document.getElementById('preDivId');
            preField.className = 'lineBlock';

            game.setRenderer(preRenderer);
            game.drawCurrentStep();
        },
        onEnter: () => console.log(`onEnter svgView`),
        onLeave: () => {
            var preField = document.getElementById('preDivId');
            preField.className = 'lineBlock displayNone';
        }
    },
    {
        name: 'about',
            match: /[/]about/,
        onBeforeEnter: () => {

        var controlPantel = document.getElementById('controls');
        controlPantel.className = 'displayNone';

        var controlPantel = document.getElementById('aboutId');
        controlPantel.className = '';

        game.stop();
        playButton.value = 'Play';
    },
        onEnter: () => console.log(`onEnter about`),
        onLeave: () => {
        var controlPantel = document.getElementById('controls');
        controlPantel.className = '';

        var controlPantel = document.getElementById('aboutId');
        controlPantel.className = 'displayNone';
    }
    }
];

    var options = {
        routes: routes
    }
    var router = new Router(options);
}