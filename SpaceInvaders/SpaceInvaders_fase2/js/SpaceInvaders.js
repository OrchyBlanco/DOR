var canvas = document.getElementById("zonajuego");
var ctx = canvas.getContext("2d");
var rnd = Math.floor((Math.random() * 300));

var marcianoX = rnd;
var marcianoY = 5;

var naveX = 5;
var naveY = 285;

var disparoX = 15;
var disparoY = 265;

var velX = 5;
var velY = 2;


function marciano() {

    ctx.beginPath();
    ctx.rect(marcianoX, marcianoY, 10, 10); //parametros: ejeX,ejeY,Ancho,Alto
    ctx.fillStyle = "#0F0";
    ctx.fill();

    marcianoY += velY;
    if (marcianoY > canvas.height) {
        marcianoY = 0;
        marcianoX = rnd;
    }
}

function nave() {
    ctx.beginPath();
    ctx.rect(naveX, naveY, 20, 10);
    ctx.rect(naveX + 7, naveY - 10, 5, 10);
    ctx.fillStyle = "#F00";
    ctx.fill();
}


function disparo() {
  do {
    ctx.beginPath();
    ctx.moveTo(disparoX, disparoY);
    ctx.lineTo(disparoX - 5, disparoY + 5);
    ctx.lineTo(disparoX + 5, disparoY + 5);
    ctx.fillStyle = "yellow";
    ctx.fill();

    disparoY -= velY;
  } while (disparoY==canvas.height);

    if (disparoY + velY < 0) {
        disparoY = 265;

    }
}

function jugar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    marciano();
    nave();

}
window.addEventListener("keypress", function(e) {
    controles(e);
});

function controles(e) {
    var x = e.which || e.keyCode;

    switch (x) {
        case 37://Izquierda
              if (naveX>0) {
                  naveX-=velX;
              }

            break;
        case 39://Derecha
        if (naveX<canvas.width-20) {
            naveX+=velX;
        }
            break;

        case 38://Arriba
          setInterval(disparo,30);
            break;

    }
}



setInterval(jugar, 30);
