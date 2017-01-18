var cajaSVG=document.getElementById('svg');
var cx=20;
var cy=20;
var r=19;

var circulo=document.createElement("CIRCLE");
circulo.cx=cx;
circulo.cy=cy;
circulo.r=r;
  for (var i = 0; i < 4; i++) {

      circulo.cx+=cx;
      circulo.cy+=cy;
      circulo.r=r;
      circulo.classList.add("reserva");
      cajaSVG.appendChild(circulo);

  }
