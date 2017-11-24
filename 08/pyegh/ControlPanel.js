var ControlPanel = function(game){
    this.game = game;
}


ControlPanel.prototype.pause = function(){
    game.stop();
}

ControlPanel.prototype.continue = function(){
    game.play();
}