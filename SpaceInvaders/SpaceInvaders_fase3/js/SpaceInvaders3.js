var juego= new Phaser.Game(300,300,Phaser.AUTO,null,{preload:preload,create:create,update:update});

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#225970';
}

function create() {

}
//Actualizamos cada Frame
function update() {

}
