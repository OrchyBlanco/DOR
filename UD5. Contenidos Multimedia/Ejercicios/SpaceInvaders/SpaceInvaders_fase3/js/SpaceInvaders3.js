//Los siguientes parametros son: ancho,alto,Metodo de rederizado(AUTO,CANVAS,WEBGL),ID del canvas,Nombres de las funciones de Carga,Inicio y actualizacion(loop)
var ancho=700;
var alto= 600;
var rnd=Math.floor((Math.random() * ancho-ancho*0.1) + 1);
var game=new Phaser.Game(ancho,alto,Phaser.CANVAS,null,{preload:preload,create:create,update:update});

var marciano;

var nave;

var disparo;
var tiempoDisparo = 0;

var explosions;
var explotarACME;
//----------------------------------//

//--------------------------------//
var score=0;
var scoreText;
var scoreString="Puntuacion: ";
function preload() {
  game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlingHorizontally=true;
  game.scale.pageAlingVertically=true;

  game.stage.backgroundColor='#000';
  game.load.image('nave','img/nave.jpg');
  game.load.image('marciano','img/alien1a.jpg');
  game.load.image('disparo','img/disparob.jpg');
  game.load.spritesheet('explosion','img/explosion.png',96,96,24);
}
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //-- Marciano --//
  //marciano=game.add.group();
  marciano=game.add.sprite(rnd,alto*0.1,'marciano');
  game.physics.enable(marciano,Phaser.Physics.ARCADE);
  marciano.body.velocity.set(0,70);


//-- Nave --//
  nave=game.add.sprite(ancho*0.5,alto*0.95,'nave');

  game.physics.enable(nave,Phaser.Physics.ARCADE);
  nave.anchor.setTo(0.5);
  nave.body.collideWorldBounds = true;//No salir del canvas
  nave.body.bounce.set(1);

//---Disparos--//
  disparos=game.add.group();
  disparos.enableBody=true;
  disparos.physicsBodyType=Phaser.Physics.ARCADE;
  disparos.createMultiple(30,'disparo');
  disparos.setAll('anchor.x', 0.5);
  disparos.setAll('anchor.y', 1);
  disparos.setAll('outOfBoundsKill', true);
  disparos.setAll('checkWorldBounds', true);
  //-- CONTROLES --//
  cursors = game.input.keyboard.createCursorKeys();

  //-- Explosiones --//
   //VER matarMarciano();


  //-- SCORE --//
  scoreText=game.add.text(5,3,scoreString+score,{font: "32px Arial", fill:"#4AFF00"});

}

function update() {

    //---------MOVIMIENTO----------//

      if (cursors.left.isDown)
      {
          nave.body.velocity.x = -200;
      }
      else if (cursors.right.isDown)
      {
          nave.body.velocity.x = 200;
      }
      else if (cursors.up.isDown) {
          disparar();
      }
      else {
        nave.body.velocity.x=0;
      }
    //---------Colision----------//
    game.physics.arcade.overlap(marciano, disparo, matarMarciano);
    //---Game OVER---//
    if (marciano.body.y>alto) {
      window.alert("¡LOS MARCIANOS HAN GANADO!");

      marciano=game.add.sprite(rnd,alto*0.1,'marciano');
    }
}


//--------------------------*--------------------------//

function matarMarciano(marciano,disparo) {
  //--EXPLOSION--//
  explosions=game.add.sprite(marciano.x,marciano.y,'explosion');
  explotarACME=explosions.animations.add('explotarACME');
  explosions.animations.play('explotarACME',24,false,true);

  marciano.kill();
  disparo.kill();

  score+=100;
  scoreText.text=scoreString+score;

}

function setupMarciano(marciano) {
  marciano.anchor.x=0.5;
  marciano.anchor.y=0.5;
  marciano.animations.add('explosion');
}

function disparar() {
  if (game.time.now > tiempoDisparo)
    {
        //  Grab the first bullet we can from the pool
        disparo = disparos.getFirstExists(false);

        if (disparo)
        {
            //  And fire it
            disparo.reset(nave.x, nave.y + 8);
            disparo.body.velocity.y = -400;
            tiempoDisparo = game.time.now + 200;
        }
    }
}
