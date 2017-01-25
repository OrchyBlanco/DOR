var svgns = "http://www.w3.org/2000/svg";
var cajaSVG = document.getElementById('svg');
var cx = 20;
var cy = 20;
var r = 19;

var nButacas=4;
var svgNButacas=50*nButacas;
var butaca=50;

var nReservas = document.getElementById('nReservas').value;
var buttonRefresco = document.getElementById('refrescar');
var reservasAsignadas = 0;

buttonRefresco.addEventListener("click", function() {
    nReservas = document.getElementById('nReservas').value;
    console.log(nReservas);
});
for (var x = butaca; x <= svgNButacas; x += butaca) {
    for (var y = butaca; y <= svgNButacas; y += butaca) {
        var circle = document.createElementNS(svgns, 'circle');
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', r);
        circle.classList.add("noAsignado");
        circle.id=""+x/50+"|"+y/50+"";
        pintarAsignados(x,y);
        if (circle.classList.contains("noAsignado") || circle.classList.contains("Asignado")) {

            circle.addEventListener("click", cambiarAsignado);
        }
        cajaSVG.appendChild(circle);
    }
}

function cambiarAsignado(e) {

        if (nReservas !== "" &&
            reservasAsignadas < nReservas &&
            this.classList.contains("noAsignado")) {
            this.classList.remove("noAsignado");
            this.classList.add("Asignado");
            reservasAsignadas++;

    } else if (this.classList.contains("Asignado")) {
        this.classList.add("noAsignado");
        this.classList.remove("Asignado");
        reservasAsignadas--;
    }


}

function pintarAsignados(x,y) {
  var rnd1=Math.floor((Math.random() * 4) + 1);
  var rnd2=Math.floor((Math.random() * 4) + 1);
  var rnd3=Math.floor((Math.random() * 16) + 1);
  for (var i = 0; i <= rnd3; i++) {
    if (x == butaca*rnd1 && y == butaca*rnd2&& circle.classList.contains("noAsignado") ) {
        circle.classList.remove("noAsignado");
        circle.classList.add("reserva");

    }
    if (circle.classList.contains("Asignado")) {
      i--;
    }
    rnd1=Math.floor((Math.random() * 4) + 1);
    rnd2=Math.floor((Math.random() * 4) + 1);
  }
/*  if (x == butaca*1 && y == butaca*1) {
      circle.classList.remove("noAsignado");
      circle.classList.add("reserva");
  }
  if (x == butaca*2 && y == butaca*1) {
      circle.classList.remove("noAsignado");
      circle.classList.add("reserva");
  }
  if (x ==butaca*2 && y == butaca*2) {
      circle.classList.remove("noAsignado");
      circle.classList.add("reserva");
  }
  if (x == butaca*4 && y == butaca*4) {
      circle.classList.remove("noAsignado");
      circle.classList.add("reserva");
  }*/
}
