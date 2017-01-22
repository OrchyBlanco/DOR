
var canvas = document.getElementById("zonajuego");
var ctx = canvas.getContext("2d");
var marcianoX = 5;
var marcianoY = 5;

var disparoX=15;
var disparoY=265;

var velX=2;
var velY=2;






function marciano() {

  ctx.beginPath();
  ctx.rect(marcianoX,marcianoY,10,10);//parametros: ejeX,ejeY,Ancho,Alto
  ctx.fillStyle="#0F0";
  ctx.fill();

  marcianoY+=velY;
  if (marcianoY>canvas.height) {
    marcianoY=0;
  }
}
function nave() {
  ctx.beginPath();
  ctx.rect(5,285,20,10);
  ctx.rect(12,275,5,10);
  ctx.fillStyle="#F00";
  ctx.fill();
}
function disparo() {
  ctx.beginPath();
  ctx.moveTo(disparoX,disparoY);
  ctx.lineTo(disparoX-5,disparoY+5);
  ctx.lineTo(disparoX+5,disparoY+5);
  ctx.fillStyle="yellow";
  ctx.fill();

  disparoY-=velY;
  if (disparoY+velY<0) {
    disparoY=265;

  }
}
function dibujar() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
marciano();
nave();
disparo();

}

setInterval(dibujar, 30);
