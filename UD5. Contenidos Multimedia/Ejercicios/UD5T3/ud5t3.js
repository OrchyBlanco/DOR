var svgns = "http://www.w3.org/2000/svg";
var cajaSVG = document.getElementById('svg');
var cx = 20;
var cy = 20;
var r = 19;

var nButacas = 4;
var svgNButacas = 70 * nButacas;
var butaca = 70;

var nReservas = document.getElementById('nReservas').value;
var buttonRefresco = document.getElementById('refrescar');
var reservasAsignadas = 0;

var txtButacas = document.getElementById('txtJson');

//--------JSON-------------//
//A:Asignado R:Reservado L: Libre

var Butacas = {
    "filas": [{
            "fila": ["L", "R", "L", "R"]
        },
        {
            "fila": ["R", "R", "L", "L"]
        },
        {
            "fila": ["L", "L", "R", "L"]
        },
        {
            "fila": ["L", "L", "L", "L"]
        }
    ]
};

//------------------------//
txtButacas.value = JSON.stringify(Butacas.filas);
setInterval(function() {

    jsonToSvg();
    pintarButacas();
},500);

function jsonToSvg() {
    Butacas.filas=JSON.parse(txtButacas.value);
}

function MostrarDatos() {
    var resultado = "";
    for (var i in Butacas.filas) {
      resultado+="\n";
        for (var j in Butacas.filas[i].fila) {
        resultado += Butacas.filas[i].fila[j] ;

    }}
    return resultado;
}



buttonRefresco.addEventListener("click", function() {
    nReservas = document.getElementById('nReservas').value;
    console.log(nReservas);
});
function pintarButacas() {
reservasAsignadas=0;
  for (var x = butaca; x <= svgNButacas; x += butaca) {
      for (var y = butaca; y <= svgNButacas; y += butaca) {
          var circle = document.createElementNS(svgns, 'circle');
          circle.setAttributeNS(null, 'cx', x + 60);
          circle.setAttributeNS(null, 'cy', y + 90);
          circle.setAttributeNS(null, 'r', r);
          circle.id = "" + x / butaca + "|" + y / butaca + "";

          switch (Butacas.filas[y/70-1].fila[x/70-1]) {
              case "L":
                  circle.classList.add("noAsignado");
                  circle.classList.remove("Asignado");
                  circle.classList.remove("reserva");
                  break;
              case "A":
                  circle.classList.add("Asignado");
                  reservasAsignadas++;
                  circle.classList.remove("noAsignado");
                  circle.classList.remove("reserva");
                  break;
              case "R":
                  circle.classList.add("reserva");
                  circle.classList.remove("Asignado");
                  circle.classList.remove("noAsignado");
                  break;
              default:
              circle.classList.add("noAsignado");
              circle.classList.remove("Asignado");
              circle.classList.remove("reserva");
          }
          /*switch (circle.classList[0]) {
            case "noAsignado":
                Butacas.filas[y/70-1].fila[x/70-1]="L";
                break;
            case "Asignado":
                Butacas.filas[y/70-1].fila[x/70-1]="A";
                break;
            case "reserva":
                Butacas.filas[y/70-1].fila[x/70-1]="R";
                break;
            default:
          }
          */

          if (circle.classList.contains("noAsignado") || circle.classList.contains("Asignado")) {

              circle.addEventListener("click", cambiarAsignado);
          }
          cajaSVG.appendChild(circle);
      }
  }
}

function cambiarAsignado() {
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

function pintarJSON(elm,x,y) {

            switch (Butacas.filas[x-1].fila[y-1]) {
                case "L":
                    circle.className= "noAsignado";
                    break;
                case "A":
                    circle.className = "Asignado";
                    break;
                case "R":
                    circle.className = "Reservado";
                    break;
                default:
            }

}
