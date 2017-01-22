var svgns="http://www.w3.org/2000/svg";
var cajaSVG=document.getElementById('svg');
var cx=20;
var cy=20;
var r=19;

var numeroReservas= document.getElementById('nReservas').value;
for (var x = 50; x < 250; x += 50) {
    for (var y = 50; y < 250; y += 50) {
        var circle = document.createElementNS(svgns, 'circle');
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', r);
        circle.classList.add("noAsignado");

        if (x==50&&y==50) {
          circle.classList.remove("noAsignado");
          circle.classList.add("reserva");
        }
       if (circle.classList.contains("noAsignado")) {
         circle.addEventListener("click",function() {
           this.classList.remove("noAsignado");
           this.classList.remove("Asignado");
         });
        }
        cajaSVG.appendChild(circle);
    }
}

function cambiarAsignado(e) {
  this.classList.remove("noAsignado");
  this.classList.remove("Asignado");
}
